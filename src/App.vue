<template>
  <div id="app">
    <HeaderBox></HeaderBox>
    <div class="conBox">
      <LeftMenu></LeftMenu>
      <RightCon></RightCon>
    </div>
     
  </div>
</template>

<script>
import HeaderBox from "./components/Header.vue";
import LeftMenu from "./components/LeftMenu.vue";
import RightCon from "./components/RightCon.vue";
export default {
  name: 'app',
  components:{
    HeaderBox,LeftMenu,RightCon
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
body{
  background: #ebeef3;
  overflow-x: hidden;
  list-style: none
}
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
.conBox{
  clear: both;
}

</style>
