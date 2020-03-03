
export const clear = ({ commit, state }, params) => {
  console.log( 'action: clear' );

  if ( state._user_box !== null )
    state._user_box.off();

  commit('clear');
}

export const connect_to_box = ({ commit, state }, params) => {
  console.log( 'action: connect_to_box' );

  if ( state._user_box === null )
    commit('connect_to_box', params.email);
}

export const hydrate_messages = ({ commit, state }) => {
  console.log( 'action: hydrate_messages' );

  if ( state._user_box === null )
    throw 'user_box undefined.';

  if ( state.messages.length !== 0 )
    return;

  commit('toggle_loader');

  state._user_box.limitToFirst(1).once('value', (snap) => {
    setTimeout(() => {
      commit('toggle_loader');
    }, 1000);
  });

  state._user_box.on('child_added', (snapshot) => {
    var res = snapshot.val();
    res.key = snapshot.key;

    commit('append_messages', res);
  });

  state._user_box.on('child_removed', (snapshot) => {
    commit('remove_messages', snapshot.key);
  });
}

export const hydrate_message = ({ commit, state }, params) => {
  console.log( 'action: hydrate_message' );

  if ( state._user_box === null )
    throw 'user_box undefined.';

  if ( state.messages.length === 0 ) {
    state._user_box.child(params.message).once('value', (snapshot) => {
      var res = snapshot.val();
      res.key = snapshot.key;

      console.log( 'commit: fresh request' );
      commit('hydrate_message', res);
    });
  } else {
    console.log( 'commit: from cached array' );
    commit('hydrate_message', state.messages.filter(msg => msg.key === params.message).shift());
  }
}
