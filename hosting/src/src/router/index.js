import Vue from 'vue';
import Router from 'vue-router';
import ga from 'vue-ga';
import store from '@/store';
import CreateEmail from '@/components/createEmail.vue';
import MessageList from '@/components/messageList.vue';
import MessageDetail from '@/components/messageDetail.vue';

Vue.use(Router);

const RouteBeforeEnter = (to, from, next) => {
  if ( to.path === '/' )
    store.dispatch('clear');
  else
    store.dispatch('connect_to_box', to.params);

  store.commit('current_page', to.name);

  next();
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: CreateEmail,
      beforeEnter: RouteBeforeEnter,
    },
    {
      path: '/:email',
      name: 'MessageList',
      component: MessageList,
      beforeEnter: RouteBeforeEnter,
    },
    {
      path: '/:email/:message',
      name: 'MessageDetail',
      component: MessageDetail,
      beforeEnter: RouteBeforeEnter,
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

ga(router, 'UA-126612006-1');

export default router
