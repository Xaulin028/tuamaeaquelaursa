import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


import { hostingConfig, firebaseConfig } from '@/../config/app.js';
import router from '@/router';

Vue.use(Vuex);

const state = {
  notFound: {
    from: 'Tua mãe, aquela ursa',
    subject: 'Correspondências não encontrada',
    bodyHtml: '<center><pre>conteúdo não encontrado\n(~_~;)</pre><center>',
    created_at: Date.now(),
  },
  loading: {
    from: 'Tua mãe, aquela ursa',
    subject: 'Buscando correspondências',
    bodyHtml: '<center><pre>...</pre></center>',
    created_at: Date.now(),
  },
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

state.message = state.loading;

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
