<template>
  <section class="message-details">
    <header class="message-details-header">
      <h1 class="message-details-header-subject">{{message.subject}}</h1>
      <div class="message-details-header-info">
        <div class="message-details-header-info-sender">{{message.from}}</div>
        <div class="message-details-header-info-date">{{fancy_date(message.timestamp)}}</div>
      </div>
    </header>
    <main class="message-details-body" v-html="message.bodyHtml"></main>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'MessageDetail',
    computed: mapState([ 'message' ]),
    beforeMount() {
      this.hydrate_message(this.$route.params);
    },
    mounted() {
    },
    methods: {
      ...mapActions(['hydrate_message']),
      fancy_date( date ) {
        let cur_date = new Date();
        let msg_date = new Date( date * 1000 );
        let options = {
          hour: 'numeric',
          minute: 'numeric'
        };

        if ( msg_date.getMonth() < cur_date.getMonth() ) {
          options.weekday = 'short';
          options.month = 'short';
          options.day = '2-digit';
        } else {
          if ( msg_date.getDate() < cur_date.getDate() ) {
            options.weekday = 'short';
            options.day = '2-digit';
          }

          if ( msg_date.getDate() == cur_date.getDate() )
            options.second = 'numeric';
        }

        return msg_date.toLocaleString(navigator.language, options);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/_color.scss';

  .message-details {
    &-header {
      border-bottom: 1px solid $app-background;
      padding-left: 1rem;
      padding-bottom: 1rem;
      padding-right: 1rem;

      &-subject {
        font-size: 1.25rem;
        // margin-top: 0;
      }

      &-info {
        display: flex;
        &-sender { flex: 1; }
        &-date {
          flex: 1;
          text-align: right;
          color: lighten($dark-text, 30%);
          font-size: .8rem;
        }
      }
    }
  }
</style>
