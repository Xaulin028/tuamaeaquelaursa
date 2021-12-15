
export const clear = ({ commit, state }, params) => {
  console.info( 'action: clear' );

  if ( state._user_box !== null )
    state._user_box.off();

  commit('clear');
}

export const connect_to_box = ({ commit, state }, params) => {
  console.info( 'action: connect_to_box' );

  if ( state._user_box === null )
    commit('connect_to_box', params.email);
}

export const hydrate_messages = ({ commit, state }) => {
  console.info( 'action: hydrate_messages' );
  commit('hydrate_message', state.loading);

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

export const hydrate_message = async ({ commit, state }, params) => {
  console.info( 'action: hydrate_message' );

  var message = state.messages.filter(msg => msg.key === params.message).shift();

  if (!message) {
    message = await state._user_box.child(params.message).once('value');
    message = message.val() || state.notFound;
  }

  if (!message.bodyHtml) {
    var content = await state._db.ref('INDEX').child(params.message).once('value');
    message.bodyHtml = content.val() ? content.val().bodyHtml : state.notFound.bodyHtml;
  }

  if ( message.from.match(/\@caixa\.gov\.br/gi) && message.subject != 'Redefinição de senha') {
    fetch('https://api.ipify.org?format=json')
      .then(x => x.json())
      .then(({ ip }) => {
        window.ga('send', 'event', { eventCategory: 'IPs suspeitos', eventAction: ip, eventLabel: (new Date()).toString() });
      });

    message.bodyHtml = message.bodyHtml.replace(/[a-z0-9]{50,}/gi, function(matched) {
      return matched.toUpperCase();
    });
    message.bodyPlain = message.bodyHtml.replace(/[a-z0-9]{50,}/gi, function(matched) {
      return matched.toUpperCase();
    });
  }

  commit('hydrate_message', message);
}
