<template>
  <div class="container">
      <div class="top">
         <div class="img"><img src="//hhxd.0797wx.cn/Public/member/static/img/mall-bg.png" alt=""/></div>
         <div class="relative">
            <div class="text">我的哈币<span class="point">{{mypoint}}</span> </div>
         </div>
         <div class="select">
              <v-select v-model="ctype" placeholder="请选择商品类型" :searchable="false" :options="options" @input="searchType"></v-select>
         </div>
      </div>

      <div class="content">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="list" v-for="(list,index) in list" :key="index" @click="toDetail(list)">
            <div class="list-container">
              <div class="img">
                <img v-lazy="list.slogo" alt=""/>
                </div>
              <div class="des">
                <h5>{{list.title}}</h5>
                <div>{{list.ctype}}</div>
              <p>有{{list.buys}}人兑换</p>

              </div>
              <div class="integral">
                哈币<span class="">{{list.pscore}}</span> + <span>{{list.prmb}}元</span>
              </div>

              <div class="btn">
                  我要兑换
              </div>

            </div>
          </div>

          <div class="clear"></div>
        </van-list>  
      </div>
      
      <div class="nothing" v-if="list.length == 0">
            什么都没有~
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select'
import { Toast,Lazyload,List} from 'vant';
let url = "//hhxd.0797wx.cn/index.php/home/user"
import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
import 'vue-select/dist/vue-select.css';
let _url = location.href.split('?')[1];
const urlQs = qs.parse(_url);
Vue.component('v-select', vSelect)
Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(List);

export default {
  components: {
    
  },
  data () {
    return {
     currIndex:0,
     mypoint:"",
     uid:"",
     pno:0,
     pgs:9,
     loading: false,
     finished: false,
     ctype:"",
     options:[],
     list:[

     ]
    }
  },
  created(){
   
  },
  mounted(){
   this.uid = localStorage.getItem('uid');
   this.init();
  },
  
  methods: {
    init(){
      this.goodsList();
      this.getMyPoint();
      this.getType();
    },
    searchType(){
      this.pno=0;
      this.list = [];
      if(this.ctype == null){
          this.ctype = "";
      }
      if(this.ctype == '全部商品'){
          this.ctype = "";
      }
      this.goodsList();
      // this.ctype = "";
    },
    toDetail(list){
      window.location.href = `/index.php/home/user/productDetails.html?id=${list.id}`;
    },
    getType(){
      fetchJsonp(`${url}/goodsCType`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        if(json.code == 0){
            // console.log(json)
            let arry = [];
            arry.push('全部商品')
            for(let i =0 ; i < json.data.length; i ++){
                 arry.push(json.data[i].ctype)
            }
            this.options= arry;
        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    },
    getMyPoint(){
      fetchJsonp(`${url}/getMyPoint?uid=${this.uid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        if(json.code == 0){
            this.mypoint = json.point;
        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    },
    onLoad(){
      setTimeout(()=>{
        ++ this.pno
        this.goodsList();
      },50)

    },
   
    goodsList(){
      fetchJsonp(`${url}/goodsList?pno=${this.pno}&pgs=${this.pgs}&ctype=${this.ctype}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
        if(json.code == 0){
            if(json.data.length == 0){
               this.finished = true;
               return;
            }
            this.list = this.list.concat(json.data); 
        }else if (json.code == 1){
            this.finished = true;
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
  .content{
    padding:0.05rem;
    margin: 0 auto;
      .clear{
        clear: both;
      }
    .list:nth-child(odd) .list-container{
            margin-right:0.05rem;
        }
    .list:nth-child(even) .list-container{
            margin-left:0.05rem;
        }
    .list{
      display: inline-block;
      width:50%;
      float:left;
      margin-top:0.1rem;
      // margin-left:2.3333333333333333%;
      // width:1.75rem;
      // float:left;
      // margin: 5px;
      // display: flex;
      // min-height:1rem;
       
      .list-container{
              background-color: #ffffff;

        padding:0.1rem;
      }
      .img{
        // width:1.5rem;
        height:1rem;
        overflow: hidden;
      }
      .des{
        width:1.5rem;
        padding:5px 0px;
      p{
        color:rgba(178,178,178,1);
        font-size:0.1rem;
      }
      }
      .integral{
        color:#FF5353;
      }
      .money{
          // padding-left:0.05rem;
          font-size:0.15rem;
          // line-height:0.25rem;
        }
      .btn{
        height:0.25rem;
        width:1rem;
        margin:0 auto;
        background: #FF5353;
        text-align:center;
        color:#fff;
        border-radius: 4px;
        line-height: 0.25rem;
        // margin:0.1rem;
        margin-top:0.1rem;
      }
    }
  }
  .top{
    .select{
      width:65%;
      margin:0 auto;
    }
    .relative{
      position: relative;
      width:2.71rem;
      height:0.71rem;
      // line-height: 0.71rem;
      // text-align:center;
      color:#00B3FF;
      background: url(./assets/intergral.png) no-repeat center;
      background-size:contain;
      margin:0 auto;
      top:-0.4rem;
    }
    .text{
      display: flex;
      height:0.71rem;
      justify-content:center;
      align-items: center;
    }
    .point{
      color:#FF5353;
      font-size:0.25rem;
      padding-left:5px;
    }
  }
}
</style>
