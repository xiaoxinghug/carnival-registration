<template>
  <div class="mainWarp">
      <!--头部-->
	    <div class="bg"><img src="//hhxd.0797wx.cn/public/static/img/bg.jpeg" alt=""/></div>
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
                <li v-for="(list,index) in programData" 
                :key="index" 
                :class="{'listActive':currentListIndex==index}"
                @click="activeClick(list,index)">
                  <div class="list-content">
                      <div class="title">
                        <span style="font-size:0.15rem;">{{list.title}}</span>
                        <span style="text-align:right;">{{list.ptype}}</span>
                      </div>
                      <div class="text">
                        <p>
                          {{list.remark}}
                        </p>
                      </div>
                    </div>
                </li>
              </ul>
            </div>

            <div class="step-btn"  @click="toStep(2)">下一步</div>
        </div>
          <!--第二步-->
          <div class="step-2" v-if="step ==2">
            <div class="step">
              <div class="item active" @click="toStep(1)">
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
                   <div class="tip">您选择了 <span style="color:#dd497b;">{{stepTwoTitle}}</span>项目，请选择参加场次</div>
                   <van-radio-group v-model="cid">
                      <div class="cell" v-for="(list,index) in clist" :key="index">
                         <span class="left"><van-radio :name="list.id"></van-radio></span> 
                         <span class="center">第 {{list.id}} 场：{{list.cdate}}</span>
                         <span class="right">剩余{{list.nums}}人</span>
                      </div>
                    </van-radio-group>
            </div>

            <div class="step-btn"  @click="toStep(3)">下一步</div>

          </div>

          <!--第三步-->
          <div class="step-3" v-if="step ==3">
             <div class="step">
                <div class="item active" @click="toStep(1)">
                    <span>1</span>
                    <p>选择活动</p>
                </div>
                  <div class="item active" @click="toStep(2)">
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
                   <!-- <van-cell-group> -->
                      <van-field v-model="bbname" placeholder="请输入宝贝姓名" />
                    <!-- </van-cell-group> -->
               </div>

               <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="jzname" placeholder="请输入家长姓名" />
                    <!-- </van-cell-group> -->
               </div>

               <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="address" placeholder="请输入联系地址" />
                    <!-- </van-cell-group> -->
               </div>

               <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="mobile" placeholder="请输入联系电话" />
                    <!-- </van-cell-group> -->
               </div>

                <div class="input-list" @click="showTime = true">
                   <!-- <van-cell-group> -->
                      <van-field v-model="birthday" disabled placeholder="请选择小朋友的生日" />
                    <!-- </van-cell-group> -->
               </div>

               <div class="input-list">
                   <van-radio-group v-model="sex">
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
                          <!-- <van-cell-group> -->
                            <van-field v-model="yzcode" placeholder="请输入短信验证码" />
                          <!-- </van-cell-group> -->
                        </div>
                        
                        <div class="btn" @click="getCode">
                          {{codeText}}
                        </div>
                  </div>
               </div>


               <div class="sure-btn" @click="doRegister">
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
          <p>友情提示：报名前请仔细阅读活动介绍，个别活动需要父母参与</p>
          <p style="color:red;">提醒：若是其他学校的孩子，不能参与本次专场活动</p>
          <p>报名时间：即日起至2月25日</p>
          <p>在活动期间，<span style="color:red">每个孩子可报名2场活动</span>（非同一个时间段），每场活动同一时段仅限20个小朋友。
           </p>
          <p>★活动最终解释权归哈哈炫动卫视所有</p>
        </div>
         <div class="detail-btn">

         </div>
      </div>
      <!--我的门票-->
      <div class="ticket" v-if="currentIndex == 2">
        <div style="text-align: center;margin-top: 1rem;" v-if="registerInfor.length ==0">您还没有预约任何项目，赶快报名吧！</div>
        <ul v-if="registerInfor.length>0">
          <li>
              <div class="text">
                   <div class="title"><span>{{registerInfor[0].jzname}}</span> <span>{{registerInfor[0].mobile}}</span></div>
                    <p><span>活动名称：{{registerInfor[0].ptitle}}</span></p>
                    <p><span>场次时间：{{registerInfor[0].cdate}}</span></p>
              </div>
              <img src="//hhxd.0797wx.cn/public/static/img/ticket1.png">
          </li>
          <li v-if="registerInfor.length>1">
             <div class="text">
                   <div class="title"><span>{{registerInfor[1].jzname}}</span> <span>{{registerInfor[1].mobile}}</span></div>
                    <p><span>活动名称：{{registerInfor[1].ptitle}}</span></p>
                    <p><span>场次时间：{{registerInfor[1].cdate}}</span></p>
              </div>
             <img src="//hhxd.0797wx.cn/public/static/img/ticket2.png">
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

      <!--时间选择-->
    <van-popup v-model="showTime" position="bottom">
        <van-datetime-picker
            v-model="currentDateTime"
            type="date"
            :max-date="maxDate"
            @cancel="cancelTime"
            @confirm="confirmTime"
          />
    </van-popup>
  </div>
</template>

<script>
import fetchJsonp from 'fetch-jsonp';
import { RadioGroup, Radio,Field,DatetimePicker,Popup,Toast} from 'vant';
import Vue from 'vue';
import 'vant/lib/radio/style';
import 'vant/lib/radio-group/style';
import 'vant/lib/field/style';
import 'vant/lib/popup/style';
import 'vant/lib/toast/style';
import 'vant/lib/datetime-picker/style';
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(DatetimePicker);
// import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  data () {
    return {
     currentIndex:1,
     currentListIndex:20,
     stepTwoTitle:"",
     value:"",
     pgid:"",
     cid:"",
     step:1,
     uid:"",
     showTime:false,
     programData:[],
     clist:[],
     maxDate:new Date(),
     currentDateTime:"",
     mobile:"",
     bbname:"",//宝宝姓名
     jzname:"",//家长姓名
     address:"",//联系地址
     birthday:"",
     sex:"",
     yzcode:"",
     btnActive:true,
     codeText:"获取验证码",
     registerInfor:[],
    }
  },
  mounted(){
     this.uid = sessionStorage.getItem('uid') || 5
     this.init();
  },
  methods: {
    init(){
        this.getProgramData();
        // console.log(this.uid)
        if(this.uid == ""){
          let tId = setInterval(() => {
              this.uid = sessionStorage.getItem('uid') || ""
              if (this.uid != "") {
                  clearInterval(tId);
                  this.getClist();
                  this.getRegister();
              }
          }, 10);
        }else{
           this.getClist();
           this.getRegister();
        }
        
        // this.doWxLogin();
        // this.onShare();
    },
    cancelTime(){
      this.showTime = false
    },
    activeClick(list,index){
      this.currentListIndex = index;
      this.stepTwoTitle = list.title;
      this.pgid = list.id;
    },
    // onShare(){
    //    fetchJsonp(`http://hhxd.0797wx.cn/index.php/home/api/doShare`)
    //     .then((response) =>{
    //       return response.json()
    //     }).then((json) =>{
    //         let _config ={
    //            appId: json.appId,
    //            timestamp: json.timestamp,
    //            nonceStr: json.nonceStr,
    //            signature: json.signature,
    //            jsApiList: [
    //                 'onMenuShareTimeline',
    //                 'onMenuShareAppMessage',
    //                 'onMenuShareQQ',
    //                 'onMenuShareWeibo'
    //               ]
    //             }
    //             wx.config(_config);
    //             wx.ready(function () {
    //               console.log('wx 注册成功')
    //                 let _shareConfig={
    //                   title:'“哈哈我喜欢”紫薇幼儿园专场', // 分享标题
    //                   desc:'好嗨哟~哈哈喊你来“游园”！9大主题活动，精彩玩不停！  这个做简介吧' , // 分享描述
    //                   link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //                   imgUrl: 'http://hhxd.0797wx.cn/public/img/sharelogo.jpg', // 分享图标
    //                   // type: 'link', // 分享类型,music、video或link，不填默认为link
    //                   success: function () {
    //                     console.log('分享成功')
    //                   },
    //                   cancel: function () {
    //                   }
    //                 }
    //                 wx.onMenuShareAppMessage(_shareConfig)
    //                 wx.onMenuShareTimeline(_shareConfig)
    //           });
    //           wx.error(function(res){
    //             console.log(res)
    //           });
    //       // this.registerInfor = json
    //     }).catch(function(ex) {
    //       console.log('parsing failed', ex)
    //     })
      
    // },
    getRegister(){
      fetchJsonp(`http://hhxd.0797wx.cn/index.php/home/api/myRegister?uid=${this.uid}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          this.registerInfor = json
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    confirmTime(val){
      this.showTime = false
      let dateVal = this.formatter(val);
      this.birthday = dateVal;
      // console.log(dateVal)
    },
    formatter(val){
      let year,month,date;
        if (!!val){ 
            year = val.getFullYear();
            month = val.getMonth()+1 > 9 ? val.getMonth()+1: `0${val.getMonth()+1}`;
            date = val.getDate() > 9 ? val.getDate() : `0${val.getDate()}`;
        }else {
          return 
        }
        return `${year}-${month}-${date}`;
    },
    parseData(data) {
      var ret = "";
      if(typeof data === "string") {
          ret = data;
      }else if(typeof data === "object") {
          for(var key in data) {
              ret += "&" + key + "=" + encodeURIComponent(data[key]);
          }
      }
      // 加个时间戳，防止缓存
      // ret += "&_time=" + this.now();
      // ret = ret.substr(1);
      return ret;
    },
    doRegister(){
      let obj={
        // Uid:this.uid,
        pgid:this.pgid || 1,
        cid:this.cid || 1,
        bbname:this.bbname,
        jzname:this.jzname,
        address:this.address,
        mobile:this.mobile,
        birthday:this.birthday,
        sex:this.sex,
        yzcode:this.yzcode
      }
      if(!this.bbname){
        Toast('请输入宝宝姓名')
        return
      }else if(!this.jzname){
        Toast('请输入家长姓名')
        return
      }else if(!this.address){
        Toast('请输入地址')
        return
      }else if(!this.birthday){
        Toast('请选择宝宝生日时间')
        return
      }else if(!this.sex){
        Toast('请选择小朋友的性别')
        return
      }else if(!this.yzcode){
        Toast('请输入验证码')
        return;
      }
      const data = this.parseData(obj);
      fetchJsonp(`http://hhxd.0797wx.cn/index.php/home/api/doRegister?uid=${this.uid}${data}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          // this.programData = json
          if(json.code !=0){
            Toast(json.message)
          }else{
            Toast('报名成功！')
            this.currentIndex = 2;
            this.getRegister();
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    getProgramData(){
      fetchJsonp('http://hhxd.0797wx.cn/index.php/home/api/getProgramData')
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          this.programData = json
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    getCode(){
      if(!/^1[3456789]\d{9}$/.test(this.mobile)){
        Toast('请输入正确的联系电话~')
        return;
      }
      if(!this.btnActive){
        return;
      }
      fetchJsonp(`http://hhxd.0797wx.cn/index.php/home/api/getMobileCode?mobile=${this.mobile}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          this.countDown()
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    countDown(){
      this.time = 60;
      this.btnActive = false;
      this.codeText = this.time + 's';
      let tId = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
              clearInterval(tId);
              this.btnActive = true;
              this.codeText = '获取验证码';
          } else {
              this.codeText = this.time + 's'
          }
      }, 1000);
    },
    getClist(){
      fetchJsonp(`http://hhxd.0797wx.cn/index.php/home/api/getClist?uid=${this.uid}`).then((response) =>{
          return response.json()
        }).then((json) =>{
          // console.log(json)
          this.clist = json
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    tabClick(index){
      this.currentIndex = index;
      this.step = 1;
      // console.log(ind)
      // if(index == 2){
                // this.getRegister();

      // }
    },
    register(){
      fetchJsonp(`//hhxd.0797wx.cn/index.php/home/api/doRegister?uid=${this.uid}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          // this.programData = json
          if(json.code !=0){
            Toast(json.message)
          }else{
            Toast('报名成功！')
            this.currentIndex = 2;
            this.getRegister();
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    toStep(index){
      if(index == 2){
        if(this.registerInfor.length ==2){
           Toast('您已经报名2场活动哦~')
           return
        }
         if(this.currentListIndex > this.programData.length){
           Toast('请先选择活动')
           return
         }
      }
      if(index == 3){
        if(!this.cid){
           Toast('请先选择场次')
           return
        }
        if(this.registerInfor.length == 1){
            this.register();
            return;
        }
      }
      setTimeout(()=>{
        this.step = index;
      },0)
    }

  }
}
</script>

<style lang="less">

body {
  background-color: #fbf9fe;
  font-size:0.12rem;
}
.active{
  opacity: 1 !important;
}
.listActive{
  border:1px solid #dd497b !important;
}
.van-radio__icon--checked .van-icon{
  border-color: #dd497b !important; 
    background-color: #dd497b !important;
}
.van-field__control:disabled{
  color:#323233 !important;
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
.step-btn{
  height:0.3rem;
  width:1rem;
  margin:0 auto;
  text-align:center;
  color:#fff;
  background-color: #dd497b;
  line-height:0.3rem;
  border-radius: 5px;
  margin-top:0.25rem;
  // margin-left:0.12rem;
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
              font-size:0.14rem;

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
    .text{
      position:absolute;
      width:100%;
      text-align:center;
      margin-top:0.25rem;
      font-size:0.12rem;
      .title{
        padding-left:0.6rem;
            padding-top: 0.03rem;

        // padding-bottom:0.05rem;
      }
      p{
        padding-left:0.90rem;
        margin:2px;
      }
    }

    li{
      height:1.05rem;
      width:90%;
      margin:0 auto;
     color:#fff;
        margin-top:0.2rem;
        position: relative;
    }
    .colorBg{

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
      opacity: 0.3;
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
        min-height:0.85rem;
        // background:url(./assets/border.png) no-repeat center;
        // background-size:contain;
        border:1px solid #88e9fc;
        border-radius:5px;
        margin:0px 0.15rem;
                // overflow: hidden;
        margin-top:0.1rem;
        background-color:#fff;
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
