<template>
    <div class="bullshit">
      <div class="bullshit__oops">404!</div>
      <a href="/" class="bullshit__return-home">返回首页</a>
    </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    message() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bullshit {
    position: relative;
    text-align: center;
    overflow: hidden;
    padding-top: 100px;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      margin: 0 auto;
      display: block;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
</style>
