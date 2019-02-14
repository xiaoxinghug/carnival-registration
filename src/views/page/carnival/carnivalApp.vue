<template>
  <div class="mainWarp">
      <!--头部-->
	    <div class="bg"><img src="./assets/bg.jpeg" alt=""/></div>
      <!--内容-->
      <div class="content" v-if="currentIndex == 1">
        <div class="step-1"  v-if="step ==1">
             <div class="step">
                <div class="item active">
                    <span>1</span>
                    <p>选择活动</p>
                </div>
                  <div class="item">
                      <span>2</span>
                      <p>选择场次</p>
                  </div>
                <div class="item">
                      <span>3</span>
                      <p>完善信息</p>
                </div>
          </div>
          <div class="list">
              <ul>
                <li @click="toStep(2)">
                  <div class="list-content">
                      <div class="title">
                        <span>画的不好怪我咯！</span>
                        <span style="text-align:right;">画的不好怪我咯！</span>
                      </div>
                      <div class="text">
                        <p>
                          由所有参与这个活动的小朋友，在老师的带领由所有参与这个活动的小朋友，在老师的带领由所有参与这个活动的小朋友，在老师的带领由所有参与这个活动的小朋友，在老师的带领由所有参与这个活动的小朋友，在老师的带领
                        </p>
                      </div>
                    </div>
                </li>

                <li @click="toStep(2)">
                  <div class="list-content">
                      <div class="title">
                        <span>画的不好怪我咯！</span>
                        <span style="text-align:right;">画的不好怪我咯！</span>
                      </div>
                      <div class="text">
                        <p>
                          由所有参与这个活动的小朋友，在老师的带领由所有参与这个活动的小朋友，在老师的带领由所有参与这个活动的小朋友，在老师的带领由所有参与这个活动的小朋友，在老师的带领由所有参与这个活动的小朋友，在老师的带领
                        </p>
                      </div>
                    </div>
                </li>

              </ul>
            </div>
        </div>
          <!--第二步-->
          <div class="step-2" v-if="step ==2">
            <div class="step">
              <div class="item active">
                  <span>1</span>
                  <p>选择活动</p>
              </div>
                <div class="item active">
                    <span>2</span>
                    <p>选择场次</p>
                </div>
              <div class="item">
                    <span>3</span>
                    <p>完善信息</p>
              </div>
            </div>
            
            <div class="scene">
                   <div class="tip">您选择了 <span style="color:#dd497b;">画得不好！怪我咯！</span>项目，请选择参加场次</div>
                   <van-radio-group v-model="radio">
                      <div class="cell">
                         <span class="left"><van-radio name="1" @click="toStep(3)"></van-radio></span> 
                         <span class="center">第一场：3月8日 09:00-09:30</span>
                         <span class="right">剩余2人</span>
                      </div>

                       <div class="cell">
                         <span class="left"><van-radio name="2" @click="toStep(3)"></van-radio></span> 
                         <span class="center">第一场：3月8日 09:00-09:30</span>
                         <span class="right">剩余3人</span>
                      </div>
            
                    </van-radio-group>
            </div>
          </div>

          <!--第三步-->
          <div class="step-3" v-if="step ==3">
             <div class="step">
                <div class="item active">
                    <span>1</span>
                    <p>选择活动</p>
                </div>
                  <div class="item active">
                      <span>2</span>
                      <p>选择场次</p>
                  </div>
                <div class="item active">
                      <span>3</span>
                      <p>完善信息</p>
                </div>
             </div>
            <!--完善信息-->
            <div class="information">
              
               <div class="input-list">
                   <van-cell-group>
                      <van-field v-model="value" placeholder="请输入宝贝姓名" />
                    </van-cell-group>
               </div>

               <div class="input-list">
                   <van-cell-group>
                      <van-field v-model="value" placeholder="请输入家长姓名" />
                    </van-cell-group>
               </div>

               <div class="input-list">
                   <van-cell-group>
                      <van-field v-model="value" placeholder="请输入联系地址" />
                    </van-cell-group>
               </div>

               <div class="input-list">
                   <van-cell-group>
                      <van-field v-model="value" placeholder="请输入联系电话" />
                    </van-cell-group>
               </div>

                <div class="input-list">
                   <van-cell-group>
                      <van-field v-model="value" placeholder="请输入小朋友的生日" />
                    </van-cell-group>
               </div>

               <div class="input-list">
                   <van-radio-group v-model="radio">
                        <div class="flex">
                          <span>小朋友性别：</span>
                          <span class="center"><van-radio name="1">男孩</van-radio></span> 
                          <span class="right"><van-radio name="0">女孩</van-radio></span> 
                        </div>
                 </van-radio-group>
               </div>


               <div class="input-list">
                  <div class="flex">
                       <div class="code">
                          <van-cell-group>
                            <van-field v-model="value" placeholder="请输入短信验证码" />
                          </van-cell-group>
                        </div>
                        
                        <div class="btn">
                          获取验证码
                        </div>
                  </div>
               </div>


               <div class="sure-btn">
                  确定预约
               </div>

            </div>
          </div>
          



      </div>
      <!--预约规则-->
      <div class="rule" v-if="currentIndex == 0">
        <div class="text">
          <p>活动时间：2019年3月8日</p>
          <p>活动地点：上海紫薇实验幼儿园</p>
          <p>招募人群：仅限紫薇实验幼儿园在读孩子（小班至大班）</p>
          <p>友情提示：2019年3月8日</p>
          <p style="color:red;">提醒：若是其他学校的孩子，不能参与本次专场活动</p>
          <p>报名时间：即日起至2月25日</p>
          <p>在活动期间，每个孩子可报名2场活动（非同一个时间段），每场活动同一时段仅限20个小朋友。
           </p>
          <p>★活动最终解释权归哈哈炫动卫视所有</p>
        </div>
         <div class="detail-btn">

         </div>
      </div>
      <!--我的门票-->
      <div class="ticket" v-if="currentIndex == 2">
        <ul>
          <li>
              <img src="./assets/ticket1.png">
          </li>
          <li class="colorBg">
            
             <img src="./assets/ticket2.png">
          </li>
        </ul>
      </div>
      <!--底部fixed-->
      <div class="bottom">
         <div class="bottom-content">
            <div class="left" @click="tabClick(0)" :class="{'tabActive':currentIndex == 0}"></div>
             <div class="center" @click="tabClick(1)" :class="{'tabActive':currentIndex == 1}"></div>
            <div class="right" @click="tabClick(2)" :class="{'tabActive':currentIndex == 2}"></div>
         </div>
      </div>
  </div>
</template>

<script>
import { RadioGroup, Radio,Field} from 'vant';
import Vue from 'vue';
import 'vant/lib/radio/style';
import 'vant/lib/radio-group/style';
import 'vant/lib/field/style';
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Field);
import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  data () {
    return {
     currentIndex:1,
     value:"",
     radio:1,
     step:1,
    }
  },
  methods: {
    tabClick(index){
      this.currentIndex = index;
    },
    toStep(index){
      setTimeout(()=>{
        this.step = index;
      },800)
    }

  }
}
</script>

<style lang="less">

body {
  background-color: #fbf9fe;
  // font-size:1;
}
.active{
  opacity: 1 !important;
}
.van-radio__icon--checked .van-icon{
  border-color: #dd497b !important; 
    background-color: #dd497b !important;
}
.van-radio__icon .van-icon{
      border: 1px solid #dd497b !important;

}
.tabActive{
  height: 0.45rem !important;
}
.flex{
        display: flex;
      }
.mainWarp{
  .content{
    margin-bottom:0.55rem;
  }
  .information{
    padding:0.1rem 0.3rem;
    .sure-btn{
      width:1.2rem;
      text-align:center;
      color:#fff;
      border-radius: 5px;
      margin:0.2rem auto;
      background-color: #dd497b;
      padding:8px;
    }
    .input-list{
      margin-top:0.15rem;
      .right{
        margin-left:0.2rem;
      }
      .code{
        flex:1;
      }
      .btn{
        height:44px;
        width:1rem;
        text-align:center;
        color:#fff;
        background-color: #dd497b;
        line-height:44px;
        margin-left:0.12rem;
      }
    }
  }
  .scene{
    padding:0.15rem 0.35rem;
     .tip{
        text-align:center;
        font-size:0.12rem;
        border:1px solid #dd497b;
        border-radius:4px;
        padding:5px 0px;
      }
    .cell{
      line-height: 0.25rem;
      margin-top:0.15rem;
      display:flex;
              font-size:0.1rem;

      .center{
        flex:1;
        text-align:center;
      }
      .right{
        width:0.5rem;
        height:0.25rem;
        text-align:center;
        line-height:0.25rem;
        background-color:#dd497b;
        color:#fff;
        border-radius: 10px;
      }
    }
  }
  .ticket{
    li{
      height:1.05rem;
      width:90%;
      margin:0 auto;
      //  background:url(./assets/ticket1.png) no-repeat center;
      //   background-size:contain;
        margin-top:0.2rem;
    }
    .colorBg{
            //  background:url(./assets/ticket2.png) no-repeat center;
            //          background-size:contain;

    }
  }
  .rule{
    padding:0.3rem;
    p{
      line-height:0.22rem;
    }
    .detail-btn{
      width:1.6rem;
      height:0.4rem;
      margin:0 auto;
      margin-top:0.3rem;
       background:url(./assets/detail_btn.png) no-repeat center;
        background-size:contain;
    }
  }
  img{
    max-width:100%;
    display:block;
    border:none;
  }
  .step{
    display: flex;
    margin-top:0.15rem;
    .item{
      flex:1;
      text-align:center;
      opacity: 0.6;
      span{
        display:inline-block;
        width:25px;
        height:25px;
        border-radius: 15px;
        background-color:#dd497b;
        color:#fff;
        line-height:25px;
        // margin-top:5px;
      }
      p{
        margin-top:0.05rem;
        text-align:center;
      }
    }
  }
  .list{
      li{
        height:0.85rem;
        background:url(./assets/border.png) no-repeat center;
        background-size:contain;
                overflow: hidden;
        margin-top:0.1rem;
        // background: #e1e1e1;
        p{
          font-size:0.12rem;
          color:#cfcfcf;
                  padding:0px 0.1rem;

        }
        .title{
          padding:0px 0.1rem;
          display: flex;
          span{
            flex:1;
          }
        }
      }
      .list-content{
        padding:0.1rem;
      }
    }
  .bottom{
    position:fixed;
    height:0.45rem;
    width:100%;
    bottom:0px;
    left:0px;
    background:url(./assets/bottom.png) no-repeat center;
    background-size:100%;
  }
  .bottom-content{
    display:flex;
    .left{
          height:0.4rem;
    background:url(./assets/left.png) no-repeat center;
background-size:contain;
    }
     .center{
          height:0.4rem;
    background:url(./assets/center.png) no-repeat center;
background-size:contain;
    }
    .right{
          height:0.4rem;
    background:url(./assets/right.png) no-repeat center;
background-size:contain;
    }
    div{
      flex:1;
    }
  }
}
</style>
