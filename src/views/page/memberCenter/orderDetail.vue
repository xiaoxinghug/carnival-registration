<template>
  <div class="container">
      <div class="order-list" v-if="!!pageData">
          <div class="list">
              <div class="top van-hairline--bottom ">
                  <div class="left">兑换时间：{{pageData.buytime}}</div>
                  <!-- <div class="right">{{pageData.oatt}}</div> -->
              </div>
              <div class="content">
                <div class="img"><img :src="pageData.slogo" alt=""></div>
                <div class="des">
                   <p>
                    {{pageData.title}}
                  </p>
                  <p>{{pageData.ctype}}</p>
                  <div class="num">
                    数量：{{pageData.damount}}
                  </div>
               </div>
               <div class="integral">
                  <span>哈币</span> <span>{{pageData.pscore}}</span>  + <span>{{pageData.prmb}}元</span>
               </div>
              </div>
          </div>
      </div>
      <div class="infor" v-if="!!pageData">
          <div class="input-list">
            <van-field
                v-model="sjr"
                disabled
                label="收件人"
                placeholder="请输入收件人姓名"
              />
          </div>

          <div class="input-list">
            <van-field
                v-model="mobile"
                disabled
                label="手机号码"
                placeholder="请输入手机号码"
              />
          </div>
          <div class="input-list">
            <van-field
                v-model="addressDetail"
                disabled
                label="收货地址"
                placeholder="收货地址"
              />
          </div>
      </div>
      <div class="nothing" v-if="!pageData">
            什么都没有~
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast ,Field} from 'vant';
let url = "//hhxd.0797wx.cn/index.php/home/user"
import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
let _url = location.href.split('?')[1];
const urlQs = qs.parse(_url);
Vue.use(Toast);
Vue.use(Field);
export default {
  components: {
    
  },
  data () {
    return {
     currIndex:0,
     uid:"",
     orderid:"",
     pageData:null,
    mobile:"",
    sjr:"",
    addressDetail:"",
    }
  },
  created(){
   
  },
  mounted(){
  //  this.uid = sessionStorage.getItem('uid') || ""
   this.init();
  },
  
  methods: {
    init(){
     this.orderid  = urlQs.orderId || "";
     this.myOrderInfo();
    },
    myOrderInfo(){
      fetchJsonp(`${url}/myOrderInfo?orderid=${this.orderid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        if(json.code == 0){
            this.pageData = json.data;
            this.sjr = json.data.sjr;
            this.mobile = json.data.mobile;
            this.addressDetail = json.data.province + json.data.city + json.data.area + json.data.address
        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
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
.van-field__control:disabled{
  color:#323233 !important;
}
img{
  max-width: 100%;
  border:none;
  display: block;
}
.container{
  .input-list{
    margin-bottom:0.1rem;
  }
  .nothing{
    text-align:center;
    margin-top:1rem;
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
        width:1.7rem;
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
