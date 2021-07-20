<template>
  <div id="app">
    <router-view></router-view>
    <!-- <div class="version">版权所有：大连允执科技有限公司 VERSION：{{version}}</div> -->
  </div>
</template>

<script>
var version = window.g.VERSION
export default {
  name: 'app',
  data: function() {
    return {
      version: version
    }
  }
}
</script>
