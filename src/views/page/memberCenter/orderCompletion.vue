<template>
  <div class="container">
      <div class="order-list" v-if="!!pageData">
          <div class="list">
              <div class="content">
                <div class="img"><img :src="pageData.fimg" alt=""/></div>
                <div class="des">
                  <p>
                    {{pageData.title}}
                  </p>
                  <p>{{pageData.ctype}}</p>
                  <div class="num">
                    数量：{{num}}
                  </div>
               </div>
               <div class="integral">
                  <span>哈币</span><span>{{pageData.pscore}}</span> + <span>{{pageData.prmb}}元</span>
               </div>
              </div>
          </div>
      </div>
       <div  v-for="(addressList,index) in list" :key="index">
        <van-radio-group v-model="maid">
           <div class="addressList">
              <div class="defaultText" style="position:absolute;right:0.15rem;top:5px;" v-if="index==0">默认收货地址</div>
              <div class="left">
                <van-radio :name="addressList.id"></van-radio>
              </div>
              <div class="center">
                    <div class="sjr">{{addressList.sjr}}</div>
                    <div class="area">{{addressList.address}}</div>
                    <div class="mobile">{{addressList.mobile}}</div>
              </div>
              <div class="right" @click="editAddress(addressList)"><van-icon name="edit" size="18px"/></div>
           </div>
      </van-radio-group>
       </div>
       <div class="address">
         <div class="left">
             收货地址
         </div>
         <div class="right">
            <span>添加收货地址</span>
            <span class="add" @click="toAddress"></span>
         </div>
       </div>
      <!-- <div class="nothing" v-if="list.length == 0">
            什么都没有~
      </div> -->

      <div class="fixed-btn">
        <div class="btn" :class="{'active':btnActive}" @click="sureExchange">确定兑换</div>
      </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Toast,Radio,RadioGroup,Dialog,Icon} from 'vant';
let url = "//hhxd.0797wx.cn/index.php/home/user"
import fetchJsonp from 'fetch-jsonp';
import 'vant/lib/radio/style';
import 'vant/lib/radio-group/style';
import 'vant/lib/dialog/style';

import qs from 'qs';
let _url = location.href.split('?')[1];
const urlQs = qs.parse(_url);
Vue.use(Toast);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Dialog);
Vue.use(Icon);
export default {
  components: {
    
  },
  data () {
    return {
     currIndex:0,
     uid:"",
     gdid:"",
     num:0,
     maid:"",
     btnActive:false,
     pageData:null,
     list:[

     ]
    }
  },
  created(){
   
  },
  mounted(){
   this.uid = localStorage.getItem('uid') || ""
   this.init();
  },
  
  methods: {
    init(){
      this.gdid = urlQs.id || "";
      this.num = urlQs.num || "";
      this.goodsDetail();
      this.getAddressList();
    },
    jsApiCall(){
      console.log(1)
        WeixinJSBridge.invoke(
             'getBrandWCPayRequest',{
              "appId":this.appId,     //公众号名称，由商户传入     
              "timeStamp":this.timeStamp,         //时间戳，自1970年以来的秒数     
              "nonceStr":this.nonceStr, //随机串     
              "package":this.package,     
              "signType":this.signType,         //微信签名方式：     
              "paySign":this.paySign //微信签名 
            },
            function(res){
                WeixinJSBridge.log(res.err_msg);
                if(res.err_msg=="get_brand_wcpay_request:ok"){
                    window.location=`/index.php/home/user/orderList.html`;
                }else if(res.err_msg=="get_brand_wcpay_request:cancel"){
                    JUi_sysAlert("您取消了支付操作，可以重新提交支付申请。");
                }else if(res.err_msg=="get_brand_wcpay_request:fail"){
                    JUi_sysAlert("支付失败，请重新支付！");
                }
            }
        )
    },
    callpay(){
          if (typeof WeixinJSBridge == "undefined"){
              console.log(2);
              if( document.addEventListener ){
                  document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
              }else if (document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady', this.jsApiCall); 
                  document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
              }
          }else{
              this.jsApiCall();
          }
    },
    sureExchange(){
      this.getGoods();
    },
    editAddress(address){
      window.location.href = `/index.php/home/user/addressEdit.html?address=${address.id}&gdid=${this.gdid}&num=${this.num}`;
    },
    getGoods(){
       Toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: ""
      });
      if(!this.maid){
        Toast('请选择收获地址');
        return
      }
       fetchJsonp(`${url}/getGoods?uid=${this.uid}&gdid=${this.gdid}&damount=${this.num}&maid=${this.maid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        Toast.clear();
        if(json.code == 0){
          let data = JSON.parse(json.data)
          this.appId = data.appId;
          this.nonceStr = data.nonceStr;
          this.package = data.package;
          this.paySign = data.paySign;
          this.signType = data.signType;
          this.timeStamp = data.timeStamp;
          this.callpay();
        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
                Toast.clear();
        console.log('parsing failed', ex)
      });
    },
    toAddress(){
     if(this.list.length >=3){
       Toast('最多只能添加三个地址~')
       return;
     }
     window.location.href = `/index.php/home/user/addressEdit.html?gdid=${this.gdid}&num=${this.num}`;
    },
    getAddressList(){
      fetchJsonp(`${url}/myAddress?uid=${this.uid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        if(json.code == 0){
          this.btnActive = true;
          this.list = json.data;
          this.maid = this.list[0].id
        }else{
          this.btnActive = false;
          Toast(json.message)
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    },
    goodsDetail(){
      fetchJsonp(`${url}/goodsDetail?gdid=${this.gdid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        if(json.code == 0){
          this.pageData = json.data;
        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    },
  }
}
</script>

<style lang="less">
*{
  padding:0px;
  margin:0px;
}
.van-radio__icon--checked .van-icon{
  border-color: #ff5353 !important; 
    background-color: #ff5353 !important;
}
.active{
  background:rgba(255,83,83,1) !important;
}
body {
  background-color: #f0f0f0;
  font-size:0.13rem;
}
img{
  max-width: 100%;
  border:none;
  display: block;
}
.container{
  .nothing{
    text-align:center;
    margin-top:1rem;
  }
  .addressList{
    display: flex;
    background: #fff;
    padding:0.1rem 0.1rem;
    margin-bottom:0.1rem;
    align-items: center;
    position: relative;
    .center{
      flex:1;
      margin-left:0.18rem;
    }
    .right{
      width:0.3rem;
    }
  }
  .address{
    display: flex;
    align-items:center;
    background-color: #ffffff;
    padding:0.1rem 0.1rem;
    .left{
      font-size:0.16rem;
      font-weight:500;
      width:50%;
    }
    .right{
      width:50%;
      text-align:right;
      .add{
        display: inline-block;
        width:0.2rem;
        vertical-align: bottom;
        margin-left:0.15rem;
        height:0.2rem;
        background: url(./assets/add.png) no-repeat center;
        background-size:contain;
      }
    }
  }
  .fixed-btn{
       position:fixed;
       bottom:0.1rem;
      width:100%;
      .btn{
        margin:0px 0.2rem;
        background: #ccc;
        border-radius:4px;
        height:0.45rem;
        text-align:center;
        line-height: 0.45rem;
        color:#fff;
      }
  }

  .list{
    background-color:#ffffff;
    margin-bottom:0.15rem;
    .top{
      display: flex;
      height:0.44rem;
      line-height:0.44rem;
      justify-content: space-between;
      padding:0px 0.1rem;
        .right{
          color:#FF5353;
        }
      }
    .content{
      display:flex;
      padding:0.125rem 0.1rem;
      // align-items:flex-end;
      .img{
        width:0.65rem;
        height:0.65rem;
      }
      .des{
        padding:0px 0.1rem;
        width:1.6rem;
        font-size:0.15rem;
        .num{
          color:rgba(178,178,178,1);
          font-size:0.12rem;
        }
      }
      .integral{
        color:#FF5353;
        padding-top:0.2rem;
        // flex:1;
        display: flex;
        align-items:flex-end;
        // text-align:right;
        .money{
          padding-left:0.05rem;
          font-size:0.25rem;
          line-height:0.25rem;
        }
      }
    }
  }
}
</style>
