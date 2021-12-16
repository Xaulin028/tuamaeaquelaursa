
export const clear = ({ commit, state }) => {
  console.info( 'action: clear' );

  commit('clear');
}



export const connect_to_box = ({ commit, state }) => {
  console.info( 'action: connect_to_box' );

  if ( state._user_box === null )
    commit('connect_to_box');
}



export const hydrate_messages = ({ commit, state }, params) => {
  console.info( 'action: hydrate_messages' );

  if ( state._user_box === null )
    throw 'user_box undefined.';

  if ( state.messages.length !== 0 )
    return;

  var recipient = (params.email + state._hosting.suffix).toLowerCase();

  state._unsubscribe = state._user_box
    .where('recipient', '==', recipient)
    .onSnapshot((querySnapshot) => {

      querySnapshot.docChanges().forEach((change) => {
        var res = change.doc.data();
        res.key = change.doc.id;

        commit(`${change.type}_messages`, res);
      });

      commit('sort_messages');
    });
}
