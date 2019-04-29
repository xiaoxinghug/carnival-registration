<template>
  <div class="container">
      <div class="order-list" v-if="list.length>0">
          <div class="list" v-for="(list,index) in list" :key="index" @click="toDetail(list)">
              <div class="top van-hairline--bottom ">
                  <div class="left">兑换时间：{{list.buytime}}</div>
                  <!-- <div class="right">{{list.oatt}}</div> -->
              </div>
              <div class="content">
                <div class="img"><img v-lazy ="list.slogo" alt=""></div>
                <div class="des">
                  <p>
                    {{list.title}}
                  </p>
                  <p>{{list.ctype}}</p>
                  <div class="num">
                    数量：{{list.damount}}
                  </div>
               </div>
               <div class="integral">
                  <span>哈币</span> <span>{{list.pscore}}</span> + <span>{{list.prmb}}元</span>
               </div>
              </div>
          </div>
      </div>
      <div class="nothing" v-if="list.length == 0">
            什么都没有~
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast,Lazyload } from 'vant';
let url = "//hhxd.0797wx.cn/index.php/home/user"
import fetchJsonp from 'fetch-jsonp';
Vue.use(Toast);
Vue.use(Lazyload);
export default {
  components: {
    
  },
  data () {
    return {
     currIndex:0,
     uid:"",
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
     this.getMyOrder();
    },
    toDetail(list){
      window.location.href = `/index.php/home/user/orderDetail.html?orderId=${list.id}`;
    },
    getMyOrder(){
      fetchJsonp(`${url}/myOrder?uid=${this.uid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        Toast.clear();
        if(json.code == 0){
            this.list = json.data
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
        width:1.75rem;
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
