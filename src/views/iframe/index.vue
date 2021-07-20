<template>
  <div ref="page">
    <div v-if="url !== ''">
      <iframe id="iframeId" :src="url" frameborder="0" scrolling="auto" width="100%" :height="iframeheight"></iframe>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getQccToken } from '@/api/companys'
export default {
  components: {},
  data() {
    return {
      url: '',
      iframeheight: (document.documentElement.clientHeight - 53) + 'px'
    }
  },
  created() {
    this.urlqcc()
  },
  mounted() {
  },
  watch: {
  },
  methods: {
    urlqcc() {
      var _this = this
      getQccToken().then(response => {
        if (response.code === 'OK') {
          var token = encodeURIComponent(response.token)
          var url = "https://pro-plugin.qcc.com/plugin-login?key=0de138d0ca6311eb990b0c42a106ce72&token=" + token + "&returnUrl=/plugin-search"
          _this.url = url
        }
      })
    },
  }
}
</script>
<style>
</style>

