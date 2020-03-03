import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import * as firebase from "firebase/app";
import 'firebase/database';

import { hostingConfig, firebaseConfig } from '@/../config/app.js';
import router from '@/router';

Vue.use(Vuex);

const state = {
  messages: [],
  message:  {},
  current_page: null,
  loader : false,
  _hosting : hostingConfig,
  _user_hash: null,
  _user_box: null,
  _db : firebase.initializeApp(firebaseConfig).database(),
}
// firebase.database.enableLogging(true);

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});


router.beforeEach((to, from, next) => {
  if ( to.path === '/' )
    store.dispatch('clear');
  else
    store.dispatch('connect_to_box', to.params);

  store.commit('current_page', to.name);

  next();
});

export default store
