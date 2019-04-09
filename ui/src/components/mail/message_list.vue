<template>
    <vue-scroll :ops="vueScrollBarOps">
      <pulse-loader v-if="refreshing" class="loading"></pulse-loader>

      <table class="pure-table pure-table-horizontal" v-if="listOfMessages.length > 0">
        <tbody>
          <tr :class="rowCls(index)" v-for="(msg, index) in listOfMessages" :key="msg.url" @click="getMessage(msg.storage.url)">
            <td class="message-box">
              <div class="pure-g">
                <div class="pure-u-1 pure-u-md-3-8 message-from">{{getSenderName(msg.message.headers.from)}}</div>
                <div class="pure-u-1 pure-u-md-5-8 message-subject">{{(msg.message.headers.subject)}}</div>
              </div>
            </td>
            <td class="message-time">{{calculateTime(msg)}}</td>
          </tr>
        </tbody>
      </table>

      <div class="no-mails" v-if="listOfMessages.length == 0">
        <p>Tua mãe, aquela ursa, ainda não recebeu nenhum email =/</p>
      </div>
    </vue-scroll>
</template>

<script>
import NavBar from '../NavBar.vue'
import 'normalize.css'
import config from '@/../config/apiconfig.js'
import axios from 'axios'
import moment from 'moment'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'MessageList',
  data: () => {
    return {
      listOfMessages: [],
      vueScrollBarOps: {
        bar: {
          background: 'darkgrey'
        }
      },
      refreshing: false
    }
  },
  mounted () {
    let currentEmail = this.$route.params.email
    if (currentEmail === '') {
      this.$router.push({name: 'Kitten Land'})
    }

    this.getMessageList()

    this.retrieveMessage = window.setInterval(this.getMessageList, 10000)

    this.$eventHub.$on('refreshInbox', this.getMessageList)
    this.$eventHub.$on('refresh', this.getMessageList)
  },
  beforeDestroy () {
    window.clearInterval(this.retrieveMessage)

    this.$eventHub.$off('refreshInbox', this.getMessageList)
    this.$eventHub.$off('refresh', this.getMessageList)
  },
  methods: {
    refreshList () {
      this.refreshing = true
      this.getMessageList()
    },
    getMessageList () {
      this.refreshing = true
      let email = this.$route.params.email
      axios.get(config.apiUrl + '/list?recipient=' + email.toLowerCase())
        .then(res => {
          this.listOfMessages = res.data
          this.refreshing = false
        }).catch((e) => {
        this.refreshing = false
      })
    },
    changeInbox () {
      this.$router.push({
        params: {
          email: this.email
        }
      })
      this.emailContent = {}
      this.$eventHub.$emit('iframe_content', '')
      this.refreshList()
    },

    getMessage (url) {
      let [protocol, empty, host, ...uri] = url.split('/')
      let [region, ...remainingHost] = host.split('.')
      let mailkey = region + '-' + uri[uri.length - 1]
      this.$router.push({
        name: 'Detail',
        params: {
          key: mailkey
        }
      })

      this.$eventHub.$emit('getMessage', '')
    },

    //
    // Utility Functions
    //

    calculateTime (msg) {
      let now = moment()
      let theDate = moment(msg.timestamp * 1000)
      let diff = now.diff(theDate, 'day')
      if (diff === 0) {
        return theDate.format('hh:mm a')
      } else if (diff > 0) {
        return theDate.format('DD MMM')
      }
    },

    getSenderEmail (sender) {
      return sender.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)[0].replace(/(<|>)/g, '')
    },

    getSenderName (sender) {
      return sender.replace(/[^\s@]+@[^\s@]+\.[^\s@]+/, '').trim().trim('"')
    },

    rowCls (index) {
      return 'pure-table-' + ((index % 2 === 0) ? 'even' : 'odd')
    }
  },
  components: {
    NavBar: NavBar,
    PulseLoader: PulseLoader
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  table {
    width: 100%;

    tr {
      cursor: pointer;
    }
    .message-from {
      font-size: 80%;
    }
    .message-from,
    .message-subject {
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .message-time {
      text-align: right;
      width: 4.5em;
    }
  }
  @media screen and (min-width:48em){
    table {
      .message-from {
        font-size: 100%;
      }
    }
  }

  .loading {
    z-index:9;
    position:absolute;
    padding-top: 5rem;
    left:50%;
  }
</style>
