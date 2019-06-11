<template>
  <div class="container">
      <div class="rank">
        <img src="//hhxd.0797wx.cn/Public/member/static/img/brank_index.jpg" alt=""/>
      </div>
      <div class="btn-click" @click="show=true">

      </div>

       <!--好礼兑换弹窗-->
      <van-popup v-model="show">
        <div class="toast">
          <div class="close" @click="close"><img src="./assets/rank_close.png" alt="图片加载中..."/></div>
           <div class="toast-img">
             <img src="//hhxd.0797wx.cn/Public/member/static/img/toast_1.png" alt="图片加载中..."/>
             <div class="input" style="top:1.2rem;">
                <van-field v-model="phone" placeholder="请输入您的手机" />
             </div>
             <div class="input" style="top:1.7rem;">
                <van-field v-model="code" placeholder="请输入礼品兑换码" />
             </div>
              <div class="input" style="top:2.2rem;">
                <van-field type="textarea" v-model="address" placeholder="请输入您的地址…" />
             </div>
             <div class="input" style="top:3rem;color:#fff;">
                   请务必输入正确的收货地址
             </div>
          </div>

          <div class="btn" @click="toSure">
          </div>
        </div>
      </van-popup>
      <!--好礼兑换确定-->
      <van-popup v-model="showSure">
        <div class="toast">
          <div class="close" @click="close"><img src="./assets/rank_close.png" alt="图片加载中..."/></div>
           <div class="toast-img">
             <img src="//hhxd.0797wx.cn/Public/member/static/img/toast_2.png" alt="图片加载中..."/>
            <div class="content">
                <div class="list">
                   <span>手机号码：</span> <span>{{phone}}</span>
                </div>
                <div class="list">
                   <span>收件地址：</span> <span>{{address}}</span>
                </div>
            </div>
           </div>

          <div class="btn-sure" @click="toSuccess">
          </div>
        </div>
      </van-popup>
      <!--兑换成功弹窗-->
      <van-popup v-model="showSucess">
        <div class="toast">
          <div class="close" @click="close"><img src="./assets/rank_close.png" alt="图片加载中..."/></div>
           <div class="toast-img">
             <img src="//hhxd.0797wx.cn/Public/member/static/img/toast_3.png" alt="图片加载中..."/>
             <div class="text">
               <div class="list">
               您已成功兑换礼品！ 我们会在n个工作日内寄出，请注意查收
               </div>
             </div>
           </div>

          <div class="btn-know" @click="close">
          </div>
        </div>
      </van-popup>
      <!--二维码-->
        <van-popup v-model="showQr">
          <div class="qrcontainer">
               <div class="img">
                 <img src="//hhxd.0797wx.cn/Public/member/static/img/qr.jpeg" alt="">
              </div>
              <div class="text">请关注哈炫亲子俱乐部公众号，激活银行卡获取开卡礼</div>
          </div>
           
        </van-popup>


  </div>
</template>

<script>
let url = "//hhxd.0797wx.cn/index.php/home/user";
import fetchJsonp from 'fetch-jsonp';
import Vue from 'vue';
import {Popup,Field,Toast,Dialog} from 'vant';
import 'vant/lib/popup/style';
import 'vant/lib/toast/style';
import 'vant/lib/field/style';
import 'vant/lib/dialog/style';
Vue.use(Popup);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Dialog);
export default {
  components: {
    
  },
  data () {
    return {
     show:false,
     showSure:false,
     showSucess:false,
     showQr:false,
     phone:"",
     code:"",
     address:"",
     uid:"",
    }
  },
  created(){
    this.uid = sessionStorage.getItem('uid') || ""
  },
  mounted(){
   this.getUserInfor();
  },
  methods: {
     close(){
      this.show = false;
      this.showSure = false;
      this.showSucess = false;
    },
    toSure(){
      if(!/^1[3456789]\d{9}$/.test(this.phone)){
        Toast('请输入正确的联系电话~')
        return;
      }
      if(!this.code){
        Toast('请输入礼品兑换码')
        return;
      }
        if(!this.address){
        Toast('请输入您的地址')
        return;
      }
      this.show = false;
      this.showSure = true;
    },
    toSuccess(){
       Toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: '请求中...'
      });
      fetchJsonp(`${url}/getCreditCard?uid=${this.uid}&yno=${this.code}&mobile=${this.phone}&address=${this.address}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        Toast.clear();
        if(json.code ==0){
           this.showSure = false;
           this.showSucess = true;
        }else if(json.code == 2){
          this.showSure = false;
          this.showQr = true;
        }else{
          Toast(json.message);
        }
      }).catch((ex) =>{
                Toast.clear();
      })
    },
    getUserInfor(){
      fetchJsonp(`${url}/getUserInfo?uid=${this.uid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.headerImg = json.headerimg;
        this.name = json.nickname
        if(json.code == 0){          
           this.address = json.address;
           this.phone = json.mobile;
        }else{
           Dialog.alert({
            title: '提示信息',
            message: '请前往哈炫亲子服务号会员中心注册成为会员，即可开卡激活兑换好礼。'
           }).then(() => {
            window.location.href = `/index.php/home/user/memberCenter?register=1`;
            // this.showregInforToast = true;
          }).catch(() => {
            // on cancel
          });
        }
      }).catch(function(ex) {

        console.log('parsing failed', ex)
      });
      
    },
    toIndex(){
      // window.location.href = `/index.php/home/user/memberCenter`;
    }
  }
}
</script>

<style lang="less">
*{
  padding:0px;
  margin:0px;
}
body{
  background-size: contain;
  font-size:0.12rem;
  background-color: #127FFE;
}
img{
  max-width: 100%;
  display: block;
  border:0;
}
.van-popup{
      background-color: transparent !important;
}
.van-cell{
  padding:5px 15px !important;
}
.qrcontainer{
  background-color: #fff;
  text-align: center;
  .text{
    padding:0px 0.1rem;
    padding-bottom:0.1rem;
  }
}
.container{
  .btn-click{
    width:1.44rem;
    height: 0.45rem;
    position: absolute;
    background:#fff;
    bottom:17%;
    background: url(./assets/button_dwdh.png) no-repeat center;
    background-size: contain;
    margin-left:30%;
  }
  .input{
    // position:absolute;

     width: 2rem;
    height: 0.38rem;
    margin-bottom: 0.2rem;
    position: absolute;
    margin-left:0.25rem;
  }
  .toast{
    position: relative;
    .toast-img{
      position: relative;
    }
    .content{
      background: #127FFE;
      position:absolute;
      width:2.24rem;
      top:1.3rem;
      margin-left:0.14rem;
      color:#fff;
      padding:0.15rem 0px;
      .list{
        padding:0px 0.1rem;
        margin-bottom:0.1rem;
      }

    }
    .text{
       position:absolute;
      width:2rem;
      top:1.1rem;
      margin-left:0.3rem;
      text-align: center;
      color:#fff;
      padding:0.15rem 0px;
    }
    width:2.5rem;
    .btn{
       width:1.44rem;
      height: 0.45rem;
      position:absolute;
      bottom:0.1rem;
      margin-left:0.5rem;
      background: url(./assets/button_dhhl.png) no-repeat center;
      background-size: contain;
    }
    .btn-sure{
       width:1.44rem;
      height: 0.45rem;
      position:absolute;
      bottom:0.1rem;
      margin-left:0.5rem;
      background: url(./assets/button_qrdh.png) no-repeat center;
      background-size: contain;
    }
    .btn-know{
      width:1.44rem;
      height: 0.45rem;
      position:absolute;
      bottom:0.1rem;
      margin-left:0.5rem;
      background: url(./assets/button_know.png) no-repeat center;
      background-size: contain;
    }
    .close{
      position:absolute;
      width:0.14rem;
      height: 0.14rem;
      top:0.5rem;
      right: 0.1rem;
          z-index: 1;

    }
  }
}
</style>
