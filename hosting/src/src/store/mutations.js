
export const current_page = (state, page) => {
  state.current_page = page;

  console.log('mutation: current_page = ' + page);
}


export const toggle_loader = (state) => {
  state.loader = !state.loader;

  console.log('mutation: toggle_loader = ' + state.loader);
}


export const clear = (state) => {
  state._unsubscribe && state._unsubscribe();
  state.messages = [];
  state.message = state.loading;
  state._user_box = null;

  console.log('mutation: cleared');
}


export const connect_to_box = (state, email) => {
  state._user_box = state._db.collection('MAILBOXES').doc(email + state._hosting.suffix).collection('INBOX');

  console.log('mutation: connect_to_box');
}


export const append_messages = (state, msg) => {

  state.messages.unshift(msg);

  console.log('mutation: append_messages');
}


export const remove_messages = (state, msg_key) => {
  state.messages.forEach((_v, _id, _ar) => { _v.key === msg_key && _ar.splice(_id, 1) });

  console.log('mutation: remove_messages ' + msg_key);
}


export const hydrate_message = (state, msg) => {
  state.message = msg;

  console.log('mutation: hydrate_message');
}
