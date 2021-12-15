<template>
  <footer class="global-footer">
    <!-- <section class="footer-share"> -->
      <!-- <h3>Compartilhe tua mãe, aquela ursa, com seus amigos</h3> -->
    <!-- </section> -->
    <section class="footer-description">
      <div>Orgulhosamente desenvolvido por Ronaldo Fuzinato, Éderson T. Szlachta e Cassiano Calegari, inspirado no projeto <a href="https://github.com/uilicious/inboxkitten" target="_blank">uilicious/inboxkitten</a></div>
    </section>
  </footer>
</template>

<script>
  export default {
    name: 'GlobalFooter',
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/_color.scss';

  .global-footer {
    padding: 1rem;
  }

  .footer-description {
    color: $bright-text;
    font-size: .8rem;
    text-align: center;
    // margin-top: 2rem;
  }
</style>
