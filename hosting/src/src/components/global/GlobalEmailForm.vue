<template>
  <div class="email-section">
    <form class="email-section-form email-section-create-email" v-if="!$route.params.email" v-on:submit.prevent="openMessageList" :action="randomName">
      <input class="email-section-field email-section-input-email" v-model="randomName">
      <div   class="email-section-field email-section-input-suffix">{{_hosting.suffix}}</div>
      <button class="email-section-field email-section-submit-button" type="submit">Criar email</button>
    </form>

    <form class="email-section-form email-section-copy-email" v-if="$route.params.email" v-on:submit.prevent="copyEmail">
      <input class="email-section-field email-section-input-email" :value="$route.params.email + _hosting.suffix" readonly>
      <button class="email-section-field email-section-submit-button" type="submit">Copiar</button>
    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'GlobalEmailForm',
    computed: mapState([ 'current_page', '_hosting' ]),
    data () {
      return {
        randomName: '',
      }
    },
    mounted () {
      this.randomName = this.generateRandomName().toString();
    },
    methods: {
      copyEmail (action) {
        action.srcElement.querySelector('.email-section-input-email').select();
        document.execCommand('copy');
      },
      openMessageList() {
        this.$router.push( this.randomName );
      },
      generateRandomName () {
        var Leite = require('leite');
        var leite = new Leite();
        var name = leite.pessoa.nome({sexo: 'Feminino'}).toLowerCase().replace(/\s+/g, '-').replace("'", '') + '-' + Math.floor(Math.random() * 90 + 10);

        if ( name.normalize )
          name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        return name;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/_color.scss';

  .email-section {
    padding: 0 0 1rem;
    background-color: $app-background;

    &-field {
      margin: 0;
      padding: 0.5rem 0;
      outline: none;
      border: none;
      // box-sizing: border-box;
      display: inline-block;
      text-align: center;
      width: 100%;
    }

    &-input-email {
      color: lighten($dark-text, 20%);
      text-overflow: ellipsis;
    }
    &-input-suffix {
      color: lighten($dark-text, 30%);
      background-color: $background;
    }
    &-submit-button {

      padding: 0.5rem 1rem;

      text-decoration: none;
      text-transform: none;

      border: 1px solid darken($cta-base, 10%);
      background: $cta-base;
      color: $cta-base-text;

      &:hover, &:focus {
        border: 1px solid $cta-hover;
        background: $cta-hover;
        color: $cta-hover-text;
      }
    }

    &-form {
      border-radius: .5rem;
      overflow: hidden;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    &-create-email {}

    &-copy-email {
      &-input-box { display: flex; }
      &-input-email { flex: 1; }
      &-input-suffix { cursor: pointer; color: $bright-text; background-color: $black; }
    }
  }

  @media only screen and (min-width:700px) {
    .email-section {
      &-form { display: flex; }

      &-field { flex: 1; }

      &-input-email   { flex-grow: 2.25; }
      &-input-suffix  { flex-grow: 2.00; }
      &-submit-button { flex-grow: 0.75; }
    }
  }
</style>
