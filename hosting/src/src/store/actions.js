
export const clear = ({ commit, state }, params) => {
  console.info( 'action: clear' );

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

  state._unsubscribe = state._user_box.orderBy("created_at").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var res = doc.data();
      res.key = doc.id;

      commit('append_messages', res);
    });
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
    message.bodyHtml = state.notFound.bodyHtml;
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
