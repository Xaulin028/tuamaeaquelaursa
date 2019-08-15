<template>
  <div class="landing-page">
    <div class="info-guide">
      <div class="features">
        <div class="feature-card">
          <h3 class="feature-card-h3">Evite SPAM</h3>
          <p>Precisa se cadastrar em um site ou baixar um ebook que requer email? Evite SPAM, utilize um email descartável. Ele dura algumas horas e você poderá receber o email de confirmação de cadastro/link de download</p>
        </div>
        <div class="feature-card">
          <h3 class="feature-card-h3">Irrite Marketeiros</h3>
          <p>Imagina só a reação do pessoal do marketing quando perceber que estão mandando emails para ”tua mãe, aquela ursa”. Bom, eles merecem, ninguém gosta de SPAM.</p>
        </div>
        <div class="feature-card">
          <h3 class="feature-card-h3">Emails autodestrutivos</h3>
          <p>Depois de algumas horas, o endereço de email e todos os emails que você recebeu vão pelos ares. Não se preocupe, utilizamos ingredientes orgânicos e todos os emails são reciclados.</p>
        </div>
      </div>

      <div class="share">
        <h3>Compartilhe tua mãe, aquela ursa, com seus amigos</h3>
        <div class="sharethis-inline-share-buttons"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import GlobalEmailForm from '@/components/global/GlobalEmailForm.vue';

  export default {
    name: 'CreateEmail',
    components: { GlobalEmailForm },
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/_color.scss';

  .landing-page {
    text-align: center;
  }

  .features {
    padding: 2rem;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-width: 90rem;
  }

  .feature-card {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    color: #818181;
    &-h3 {
      color: $dark-text;
    }
  }
  .share {
    padding-bottom: 1rem;
  }

  @media only screen and (max-width:800px) {
    .input-box,
    .submit-box {
      display: block;
    }
    .submit-box {
      margin: .5rem auto 0;
    }
    .input-email,
    .input-suffix,
    .submit-button {
      width: 100%;
    }

    .features {
      flex-direction:column;
    }
  }
</style>

