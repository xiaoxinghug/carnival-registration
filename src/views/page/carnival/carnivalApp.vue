<template>
  <div class="mainWarp">
      <!--头部-->
	    <div class="bg"><img src="./assets/bg.png" alt=""/></div>
      <!--内容-->
      <div></div>
      <!--底部fixed-->
      <div class="bottom">
         <div class="bottom-content">
            <div class="left"></div>
                        <div class="center"></div>
            <div class="right"></div>
         </div>
      </div>
  </div>
</template>

<script>
import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  data () {
    return {
     
    }
  },
  methods: {


  }
}
</script>

<style lang="less">

body {
  background-color: #fbf9fe;
}
.mainWarp{
  img{
    max-width:100%;
    display:block;
    border:none;
  }
  .bottom{
    position:fixed;
    height:45px;
    width:100%;
    bottom:0px;
    left:0px;
    background:url(./assets/bottom.png) no-repeat center;
    background-size:100%;
  }
  .bottom-content{
    display:flex;
    .left{
          height:43px;
    background:url(./assets/left.png) no-repeat center;
background-size:contain;
    }
     .center{
          height:43px;
    background:url(./assets/center.png) no-repeat center;
background-size:contain;
    }
    .right{
          height:43px;
    background:url(./assets/right.png) no-repeat center;
background-size:contain;
    }
    div{
      flex:1;
    }
  }
}
</style>
