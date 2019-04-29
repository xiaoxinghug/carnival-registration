<template>
  <div class="container">
     <div class="top">
        <div class="img">
          <img src="//hhxd.0797wx.cn/Public/member/static/img/erweima.png" alt=""/>
          <div class="text">扫描二维码联系客服 或在下方留言</div>
        </div>
     </div>
     <div class="textarea">
         <div class="title"><img src="./assets/liuyan.png" alt=""/></div>
         <van-field v-model="value" type ="textarea" :autosize="{ maxHeight: 200, minHeight: 150 }"  placeholder="输入您想说的话，字数限制100字内…" />
         <div class="text">({{value.length}}/100)</div>
     </div>
     <div class="bottom">
       <div class="bottom-btn" @click="doMessage">
                确定
       </div>
     </div>
  </div>
</template>

<script>
import Vue from 'vue';
let url = "//hhxd.0797wx.cn/index.php/home/user"
import fetchJsonp from 'fetch-jsonp';
import { Field,Popup,Toast,Dialog} from 'vant';
Vue.use(Field);
Vue.use(Dialog);
Vue.use(Toast);

export default {
  components: {
    
  },
  data () {
    return {
      uid:"",
     value:"",
    }
  },
  created(){
   
  },
  mounted(){
    
    //  this.init();
  },
  methods: {
    
    doMessage(){
      this.uid = sessionStorage.getItem('uid') || ""
      if(!this.value){
         Toast('还没填写留言信息哦~')
         return
      }
      if(this.value.length>100){
        Toast('最多输入100个字符哦~')
        return;
      }
      Toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: '请求中...'
      });
      fetchJsonp(`${url}/doMessage?uid=${this.uid}&message=${this.value}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        Toast.clear();
        if(json.code == 0){
            Dialog.alert({
              title: '- 提示 -',
              message: '您的留言上传成功~ 我们会尽快联系客服与您联系'
            }).then(() => {
              // on close
            });
        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
        this.loading = false;
        console.log('parsing failed', ex)
      });
    }
  }
}
</script>

<style lang="less">
*{
  padding:0px;
  margin:0px;
}
 body {
  background-color: #f0f0f0;
  font-size:0.13rem;
}
img{
  max-width: 100%;
  display: block;
  border:none;
}
.container{
  .top{
    padding-top:0.15rem;
    .text{
      color:rgba(136,136,136,1);
      width:1.08rem;
      margin:0 auto;
      font-size:0.12rem;
      text-align:center;
      margin-top:0.1rem;
    }
    img{
      height:1.2rem;
      // margin:0 auto;
      margin-left:35%;
    }
  }
  .textarea{
          padding:0.2rem;
    .title{
      img{
        width:0.78rem;
        margin:0 auto;
        margin-top:0.35rem;
        margin-bottom:0.15rem;
      }
    }
    border-radius:8px;
    .text{
      text-align:right;
      letter-spacing: 1px;
      margin-top:5px;
    }
  }
  .bottom{
        position:fixed;
    bottom:0.1rem;

    width:100%;
  }
  .bottom-btn{
                  margin:0px 0.2rem;
    background:rgba(255,83,83,1);
    border-radius:4px;
    height:0.45rem;
    text-align:center;
    line-height: 0.45rem;
    color:#fff;

  }
}
</style>
