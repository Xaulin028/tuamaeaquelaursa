import Vue from 'vue';
import Vuex from 'vuex';
import md5 from 'blueimp-md5';
import * as firebase from "firebase/app";
import 'firebase/database';

import { hostingConfig, firebaseConfig } from '@/../config/app.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    messages: [],
    message: {},
    current_page: null,
    _hosting : hostingConfig,
    _user_hash: null,
    _user_box: null,
    _db : firebase.initializeApp(firebaseConfig).database(),
  },
  getters: {
    messages: (state) => {
      return state.messages;
    },
    message: (state) => {
      return state.message;
    },
  },
  mutations: {
    current_page: (state, page) => {
      state.current_page = page;

      console.log('mutation: current_page = ' + page);
    },
    clear: (state) => {
      if ( state._user_box !== null )
        state._user_box.off();

      state.messages = [];
      state.message = {};
      state._user_hash = null;
      state._user_box = null;

      console.log('mutation: cleared');
    },
    connect_to_box: (state, email) => {
      state._user_hash = md5( email + hostingConfig.suffix );
      state._user_box  = state._db.ref(`INBOX/${state._user_hash}`);

      console.log('mutation: connect_to_box');
    },
    append_messages: (state, msg) => {
      state.messages.unshift(msg);

      console.log('mutation: append_messages');
    },
    remove_messages: (state, msg_key) => {
      state.messages.forEach((_v, _id, _ar) => { _v.key === msg_key && _ar.splice(_id, 1) });

      console.log('mutation: remove_messages ' + msg_key);
    },
    hydrate_message: (state, msg) => {
      state.message = msg;

      console.log('mutation: hydrate_message');
    },
  },
  actions: {
    clear: ({ commit, state }, params) => {
      console.log( 'action: clear' );

      commit('clear');
    },
    connect_to_box: ({ commit, state }, params) => {
      console.log( 'action: connect_to_box' );

      if ( state._user_box === null )
        commit('connect_to_box', params.email);
    },
    hydrate_messages: ({ commit, state }) => {
      console.log( 'action: hydrate_messages' );

      if ( state._user_box === null )
        throw 'user_box undefined.';

      if ( state.messages.length !== 0 )
        return;

      state._user_box.on('child_added', (snapshot) => {
        var res = snapshot.val();
        res.key = snapshot.key;

        commit('append_messages', res);
      });

      state._user_box.on('child_removed', (snapshot) => {
        commit('remove_messages', snapshot.key);
      });
    },
    hydrate_message: ({ commit, state }, params) => {
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
    },
  },
});

export default store
