<template>
  <div class="page">
    <div class="center">
      <img class="imgleft" src="../assets/404.png" alt="">
      <div class="right">
        <h1>404</h1>
        <h2>OH NO! 页面丢失</h2>
        <p>很抱歉，您访问的页面不存在！请仔细检查您输入的网址是否正确。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ErrorView',
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;


  .center {
    width: 800px;
    height: 340px;
  }

  .imgleft {
    display: block;
    float: left;
    height: 100%;
    width: 400px;
  }

  h1 {
    font-size: 7.5em;
    margin: 15px 0px;
  }
}
</style>