<template>
  <div class="mainWarp">
      <!--头部-->
	    <div class="bg"><img src="./assets/bg.jpeg" alt=""/></div>
      <!--内容-->
      <div class="content" v-if="currentIndex == 1">
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
              <li>
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

              <li>
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
★活动最终解释权归哈哈炫动卫视所有</p>
        </div>
         <div class="detail-btn">

         </div>
      </div>
      <!--我的门票-->
      <div class="ticket" v-if="currentIndex == 2">
        <ul>
          <li>

          </li>
          <li class="colorBg">
            
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
import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  data () {
    return {
     currentIndex:1,
    }
  },
  methods: {
    tabClick(index){
      this.currentIndex = index;
    }

  }
}
</script>

<style lang="less">

body {
  background-color: #fbf9fe;
  font-size:12px;
}
.active{
  opacity: 1 !important;
}
.tabActive{
  height: 45px !important;
}
.mainWarp{
  .ticket{
    li{
      height:110px;
       background:url(./assets/ticket1.png) no-repeat center;
        background-size:contain;
        margin-top:20px;
    }
    .colorBg{
             background:url(./assets/ticket2.png) no-repeat center;
                     background-size:contain;

    }
  }
  .rule{
    padding:30px;
    .detail-btn{
      width:100px;
      height:30px;
      margin:0 auto;
      margin-top:30px;
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
    margin-top:15px;
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
        margin-top:5px;
        text-align:center;
      }
    }
  }
  .list{
      li{
        height:85px;
        background:url(./assets/border.png) no-repeat center;
        background-size:contain;
                overflow: hidden;
        margin-top:10px;
        // background: #e1e1e1;
        p{
          font-size:10px;
          color:#cfcfcf;
                  padding:0px 10px;

        }
        .title{
          padding:0px 10px;
          display: flex;
          span{
            flex:1;
          }
        }
      }
      .list-content{
        padding:10px;
      }
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
          height:40px;
    background:url(./assets/left.png) no-repeat center;
background-size:contain;
    }
     .center{
          height:40px;
    background:url(./assets/center.png) no-repeat center;
background-size:contain;
    }
    .right{
          height:40px;
    background:url(./assets/right.png) no-repeat center;
background-size:contain;
    }
    div{
      flex:1;
    }
  }
}
</style>
