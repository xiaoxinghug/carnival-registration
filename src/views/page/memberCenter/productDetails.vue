<template>
  <div class="container" v-if="!!pageData">
    <div class="img">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in pageData.images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- <img :src="pageData.slogo" alt=""/> -->
    </div>
    <!--内容-->
    <div class="content">
      <div class="des">
        <div class="num">
          数量：{{pageData.stocks}}
        </div>
      </div>
      <div class="integral">
              哈币 <span>{{pageData.pscore}}</span> + <span>{{pageData.prmb}}元</span>
      </div>
    </div>
   <!--end-->
   <!--商品标题-->
    <div class="title">
        <h5>{{pageData.title + '--'+pageData.ctype}}</h5>
        <p>{{pageData.remark}}</p>
        <!-- <p>价值98元</p> -->
    </div>
    <!-- <div class="nothing" v-if="list.length == 0">
          什么都没有~
    </div> -->

    <div class="fixed-btn">
      <div class="btn" @click="sureClick">确定</div>
    </div>

    <!--数量选择-->
    <van-popup v-model="show" position="bottom">
        <div class="bottom van-hairline--bottom">
            <h5>- 兑换提示 -</h5>
            <div class="bottom-content">
                <div class="pay">支付积分：<span style="color:#FF5353;">{{payScore}}</span>  支付金额:<span style="color:#FF5353;">{{payMoney}}元</span></div>
                <div class="num">数量：<span class="reduce" @click="reduce"></span><input type="number" v-model="num"><span class="add" @click="add"></span></div>
            </div>
            <div class="btn" @click="exchange">
                确定
            </div>
        </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast ,Popup,Swipe, SwipeItem,Lazyload,Dialog} from 'vant';
let url = "//hhxd.0797wx.cn/index.php/home/user"
import fetchJsonp from 'fetch-jsonp';
import 'vant/lib/swipe/style';
import 'vant/lib/swipe-item/style';
import 'vant/lib/popup/style';
import 'vant/lib/lazyload/style';

Vue.use(Toast);
Vue.use(Popup);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Dialog);

import qs from 'qs';
let _url = location.href.split('?')[1];
const urlQs = qs.parse(_url);

export default {
  components: {
    
  },
  data () {
    return {
     currIndex:0,
     show:false,
     num:0,
     gdid:"",
     uid:"",
     payScore:0,
     payMoney:0,
     pageData:null
    }
  },
  created(){
   
  },
  mounted(){
   this.init();
  },
  
  methods: {
    init(){
     this.gdid = urlQs.id || "";
     this.uid = localStorage.getItem('uid') || ""
     this.goodsDetail();
    },
    sureClick(){
      if(this.pageData.issw == 0){
           Dialog.confirm({
              title: '- 提示 -',
              message: `本次您将扣除${this.pageData.pscore}分，然后进入课程优惠购买页面。`
            }).then(() => {
              this.getGoods();
            }).catch(()=>{

            });
        return;
      }
      this.show = true;
    },
    getGoods(){
      Toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: ""
      });
       fetchJsonp(`${url}/getGoods1?uid=${this.uid}&gdid=${this.gdid}&damount=1&maid=0`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        Toast.clear();
        if(json.code == 0){
                        window.location.href = this.pageData.xurl;

        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
                Toast.clear();
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
          let images = this.pageData.slogo.split(',');
          let newImages =[];
              for(let i =0 ; i <= images.length; i++){
                 if(!!images[i]){
                   newImages.push(images[i])
                 }
              }
              
          this.pageData.images = newImages
          // console.log(this.pageData.images)
        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    },
    exchange(){
    if(this.num<=0){
      Toast('兑换数量不能为零~');
       return;
    }
        this.show = false;
     window.location.href = `/index.php/home/user/orderCompletion.html?id=${this.gdid}&num=${this.num}`;
    },
    computedScore(){
     this.payScore =  this.pageData.pscore * this.num
     this.payMoney = this.pageData.prmb * this.num
    },
    add(){
      this.num = this.num + 1;
      this.computedScore()
    },
    reduce(){
      if(this.num <= 0){
         this.computedScore()
         this.num = 0;
         return;
      }
      this.num = this.num - 1;
      this.computedScore();
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
  margin:0 auto;
}
.container{
  margin-bottom:0.8rem;
  .bottom{
    h5{
      padding:0.1rem 0px;
      text-align:center;
    }
    .bottom-content{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding:0.1rem;
      .reduce{
        display: inline-block;
        width:0.2rem;
        height:0.2rem;
        // line-height: 0.4rem;
        vertical-align: bottom;
        background: url(./assets/reduce.png) no-repeat center;
        background-size:contain;
        margin-top:5px;
        margin-right:0.15rem;
      }
      .add{
        display: inline-block;
        width:0.2rem;
                vertical-align: bottom;
        margin-left:0.15rem;
        height:0.2rem;
        background: url(./assets/add.png) no-repeat center;
        background-size:contain;
      }
      .num{
        input{
          width:0.3rem;
          background: #ddd;
          border:none;
          text-align:center;
        }
      }
    }
    .btn{
        margin:0.2rem;
        background:rgba(255,83,83,1);
        border-radius:4px;
        height:0.45rem;
        text-align:center;
        line-height: 0.45rem;
        color:#fff;
    }
  }
  .nothing{
    text-align:center;
    margin-top:1rem;
  }

  .fixed-btn{
       position:fixed;
       margin-top:0.3rem;
      width:100%;
      bottom:0px;
      .btn{
        margin:0px 0.2rem;
        background:rgba(255,83,83,1);
        border-radius:4px;
        height:0.45rem;
        text-align:center;
        line-height: 0.45rem;
        color:#fff;
      }
  }
  .img{
    min-height:0.3rem;
  }

  .title{
    margin-top:0.15rem;
    padding:0.125rem 0.1rem;
    background-color:#fff;
    p{
      color: #B2B2B2;
      font-size:0.12rem;
    }
  }

  .content{
      display:flex;
      background: #ffffff;
      padding:0.125rem 0.1rem;
      // align-items:flex-end
      .des{
        // padding:0px 0.1rem;
        // width:1.9rem;
        width:2.35rem;
        font-size:0.15rem;
        .num{
          color:rgba(178,178,178,1);
          font-size:0.12rem;
        }
      }
      .integral{
        color:#FF5353;
        // padding-top:0.35rem;
        flex:1;
              align-self:flex-end;
        text-align:right;
        .money{
          padding-left:0.05rem;
          font-size:0.25rem;
          line-height:0.25rem;
        }
      }
    }
}
</style>
