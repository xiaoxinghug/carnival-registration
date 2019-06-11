<template>
  <div class="mainWarp">
      <!--头部-->
	    <div class="bg" style="position:relative">
           <div style="position:absolute;color:#fff;background-color:#E95C4A;width:100%;">
              <div style="padding:5px 0.1rem;">{{title}}</div> 
             </div>
            <img src="//hhxd.0797wx.cn/public/static/img/bg.jpeg" alt=""/>
        </div>

       <div class="distance_time" v-if ="showDistanceTime && currentIndex == 1">
            <div style="font-size:0.25rem;padding-top:0.3rem;">离开始报名还有</div>
            <div style="font-size:0.2rem;margin-top:0.1rem;">{{distance_time}}</div>
       </div>
           <!--内容-->
          <div class="content" v-if="currentIndex == 1 && !showDistanceTime ">
            <div v-if ="!showOverTime && !forbidden">
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
                            <div v-for="(list,index) in clist" :key="index">
                              <div class="cell" v-if="list.id > 0">
                                  <span class="left"><van-radio :name="list.id" v-if="list.nums != 0"></van-radio></span> 
                                  <span class="center">{{list.cdate}}</span>
                                  <span class="right" v-if="list.nums !=0">剩余{{list.nums}}</span>
                                  <span class="right" v-if="list.nums == 0">已满</span>
                              </div>
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
                            <van-field v-model="jzname" placeholder="请输入法定监护人姓名" />
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

             <div class="distance_time" v-if ="showOverTime">
                    <div style="font-size:0.25rem;padding-top:0.3rem;">报名已结束</div>
              </div>
               <div class="distance_time" v-if ="forbidden">
                    <div style="font-size:0.25rem;padding-top:0.3rem;">活动未开启</div>
              </div>
          </div>
          <!--预约规则-->
          <div class="rule" v-if="currentIndex == 0">
            <div class="text" v-html="remark">
              
            </div>
          </div>
          <!--我的门票-->
          <div class="ticket" v-if="currentIndex == 2">
            <div style="text-align: center;margin-top: 1rem;color:#E95C4A" v-if="registerInfor.length ==0">您还没有预约任何项目，赶快报名吧！</div>
            <ul v-if="registerInfor.length>0">
              <li>
                  <div class="text">
                      <div class="title"><span>{{registerInfor[0].bbname}}</span> <span>{{registerInfor[0].mobile}}</span></div>
                        <p><span>活动名称：{{registerInfor[0].ptitle}}</span></p>
                        <p><span>场次时间：{{registerInfor[0].cdate}}</span></p>
                  </div>
                  <img src="//hhxd.0797wx.cn/public/static/img/ticket1.png">
              </li>
              <li v-if="registerInfor.length>1">
                <div class="text">
                      <div class="title"><span>{{registerInfor[1].bbname}}</span> <span>{{registerInfor[1].mobile}}</span></div>
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
const currentUrl = location.href;
let url = ""
if(/api1/.test(currentUrl)){
   url = '//hhxd.0797wx.cn/index.php/home/api1'
}else {
   url = '//hhxd.0797wx.cn/index.php/home/api'
}
let timeUrl = '//hhxd.0797wx.cn/index.php/home/user/getSerTime';
import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
let _url = location.href.split('?')[1];
const urlQs = qs.parse(_url);
if(!urlQs.eventid){
    urlQs.eventid = 1;
}
import { RadioGroup, Radio,Field,DatetimePicker,Popup,Toast,Dialog} from 'vant';
import Vue from 'vue';
import 'vant/lib/radio/style';
import 'vant/lib/radio-group/style';
import 'vant/lib/field/style';
import 'vant/lib/popup/style';
import 'vant/lib/toast/style';
import 'vant/lib/dialog/style';
import 'vant/lib/datetime-picker/style';
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(DatetimePicker);
Vue.use(Dialog);
// import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  data () {
    return {
     currentIndex:0,
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
     time:null,
     showTime:false,
     distance_time:"",
     showDistanceTime:false,
     showOverTime:false,
     forbidden:false,
     remark:"",
     title:""
          // showRule:false
    }
  },
  created(){
    // if(/api1/.test(currentUrl)){
    //   this.showRule = false;
    // }else {
    //   this.showRule = true;
    // }
  },
  mounted(){
     this.uid = sessionStorage.getItem('uid') || ""
     this.init();

  },
  methods: {
    init(){
        this.getProgramData();
        this.getSysconfig();
         if(this.uid == ""){
              let tId = setInterval(() => {
                  this.uid = sessionStorage.getItem('uid') || ""
                  if (this.uid != "") {
                      clearInterval(tId);
                      this.getRegister();
                  }
              }, 10);
            }else{
              this.getRegister();
            }

    },
    getSysconfig(){
       fetchJsonp(`${url}/getSysconfig?eventid=${urlQs.eventid}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          // this.registerInfor = json
          if(json.code == 0){
              this.remark = json.remark
              this.title = json.title
             if(json.sysatt == 1){
                let Time = json.time.replace(/-/g,'/');
                this.time = new Date(Time).getTime();
                if(json.opencounts>0){
                    let closetime = json.begintime.replace(/-/g,'/');
                    this.getDistanceTime(closetime);
                }
                if(json.isclose == 1){
                  this.showOverTime = true;
                }else{
                } 
             }else if(json.sysatt == 0){
                if(json.isclose == 1){
                  this.showOverTime = true;
                }else{
                  this.forbidden = true;
                } 
             }
          }
          // console.log(json);
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    cancelTime(){
      this.showTime = false
    },
    activeClick(list,index){
      this.currentListIndex = index;
      this.stepTwoTitle = list.title;
      this.pgid = list.id;
    },
    getDistanceTime(time_end){
      time_end = new Date(time_end);
      // over_time = new Date(over_time);

      time_end = time_end.getTime();
      // over_time = over_time.getTime();
      this.show_time(time_end)
    },
    show_time(time_end){
       let timerId = setInterval(()=>{
         this.time = this.time + 1000
         var time_now = this.time  // 获取当前时间
        var time_distance = time_end - time_now; // 结束时间减去当前时间
        var int_day, int_hour, int_minute, int_second;
        // console.log(time_distance)
        if(time_distance >= 0){
          // 天时分秒换算
          this.showDistanceTime = true;
          int_day = Math.floor(time_distance/86400000)
          time_distance -= int_day * 86400000;
          int_hour = Math.floor(time_distance/3600000)
          time_distance -= int_hour * 3600000;
          int_minute = Math.floor(time_distance/60000)
          time_distance -= int_minute * 60000;
          int_second = Math.floor(time_distance/1000)
          
          // 时分秒为单数时、前面加零站位
          if(int_hour < 10)
          int_hour = "0" + int_hour;
          if(int_minute < 10)
          int_minute = "0" + int_minute;
          if(int_second < 10)
          int_second = "0" + int_second;
          // 显示时间
          this.distance_time = `${int_day}天${int_hour}时${int_minute}分${int_second}秒`
        }else{
            
          this.showDistanceTime = false;
          // if(over_distance>0){
          //   this.showOverTime = true
          // }
          // if(overTime)
          // return;
          clearTimeout(timerId);
        }
       },1000);
    },
    getRegister(){
      fetchJsonp(`${url}/myRegister?uid=${this.uid}&eventid=${urlQs.eventid}`)
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
     
      return ret;
    },
    sureRegister(val){
       Dialog.confirm({
        title: '声明',
        confirmButtonText:'同意',
        messageAlign:'left',
        message: `<span style="font-weight:600;text-decoration:underline">欢迎您注册“哈炫亲子”会员。“哈炫亲子”将为您和您的孩子提供优质的亲子活动和节目录制等服务。为了保护您和您孩子的身心健康及合法权益，根据国家广播电视总局颁布的《未成年人节目管理规定》的要求，我们制定了下述《声明》，请您务必仔细阅读并透彻理解《声明》内容，如您点击“同意”按键，即表示您接受并同意作出下述《声明》。</span> <br>
        本人为XXX（即本人孩子的姓名，且本人确认填写会员信息时孩子的姓名与身份证明中的姓名一致，以下简称乙方）的【父亲/母亲】和法定监护人，不可撤销地同意接受上海炫动传播有限公司（以下简称甲方）的邀请，本人及乙方以表演者身份参加甲方旗下哈哈炫动卫视组织或参与的活动和相关的节目传播，录制和/或发行工作(以下统称 “活动”)。本人并代表乙方特此声明如下：<br>
我们同意：甲方独家以任何方式录制并传播本人及乙方参加上述“活动”的任何言论、表演及相关形象（以下统称“表演”），甲方是“活动”和本人及乙方的“表演”的著作权、肖像权、邻接权和相关权利的唯一权利所有者及使用者，并有权授权第三方使用。且将无需向本人及乙方支付任何费用。本人及乙方在此自愿放弃对甲方行使作为表演者享有的任何人身和财产方面的权利。无需经本人同意，甲方或者经甲方授权的第三方有权对“表演”在任何形式的电视、广播、网络、报刊、图书等媒体永久播出或出版该节目的内容。甲方或者经甲方授权的第三方有权对 “表演”进行编辑并在全球发行并以任何方式永久使用“表演”或其片段以及本人及乙方的姓名、声音和可能在“活动”期间提供的本人及乙方形象和个人资料，无论该“表演”是否已经被录制。<br>
本人已经或将自行承担费用，取得原始版权所有者（如表演节目的词曲作者等）的所有必要的许可。甲方无须就本人及乙方表演之节目向原始版权人支付任何费用。本人及乙方在“活动”中所发表的言论均为真实的且不会侵害或侵犯任何第三方的权利，由此引起的任何法律责任将由本人承担。本人不可撤销和无条件地放弃和永久免除本人（或者本人的受让方，代理人或者代表）及乙方可能有的针对甲方或其关联公司及其雇员、代理人或者代表，继承者和受让者的任何形式的已知或未知的责任主张、索赔和要求并同意承担甲方因该索赔或诉讼而产生的任何律师费和其它费用。<br>
 
我们确认：甲方已充分告知，为“活动”和“表演”投保相应的保险、保险内容以及金额，本人保证本人及乙方遵守甲方的拍摄要求，如出现伤害事故，甲方将仅在保险公司理赔范围内承担相关责任。本人及乙方放弃对甲方的其他追索权利。<br>
 
本人作为乙方的合法法定监护人，并已取得其他监护人之同意签署本声明。本人已向乙方充分解释本声明之内容。本声明自本人签署之日起生效并持续有效，本人和乙方均受以上所有条款的约束。
`
          }).then(() => {
            this.step = val;
            // this.doRegister();
        }).catch(() => {
           window.location.href = location.href;
          // on cancel
        });
    },
    doRegister(){
      if(!this.bbname){
          Toast('请输入宝宝姓名')
          return
        }else if(!this.jzname){
          Toast('请输入法定监护人姓名')
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
      
      const data = this.parseData(obj);
       Toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: '报名中...'
      });
      fetchJsonp(`${url}/doRegister?uid=${this.uid}&eventid=${urlQs.eventid}${data}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          // this.programData = json
          Toast.clear()
          if(json.code !=0){
            Toast(json.message)
          }else{
            if(this.registerInfor.length ==0){
              setTimeout(()=>{
                             Toast('报名成功！您可以再报预约一场')
              },500)
            }else{
               Toast('报名成功！')
            }
            this.currentIndex = 2;
            this.getRegister();
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    getProgramData(){
      fetchJsonp(`${url}/getProgramData?eventid=${urlQs.eventid}`)
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
      fetchJsonp(`${url}/getMobileCode?mobile=${this.mobile}&eventid=${urlQs.eventid}`)
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
      fetchJsonp(`${url}/getClist?uid=${this.uid}&pgid=${this.pgid}&eventid=${urlQs.eventid}`).then((response) =>{
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
    },
    getUserInfo(){
      fetchJsonp(`${url}/getUserInfo?uid=${this.uid}&eventid=${urlQs.eventid}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          if(json.code == 0){
              this.bbname = json.bbname;
              this.jzname = json.jzname;
              this.address = json.address;
              this.mobile = json.mobile;
              this.birthday = json.birthday;
              this.sex = json.sex;
              this.yzcode = json.yzcode;
          }
        // if(val == 0){
          this.doRegister()
        // }
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
       this.getClist();
      }
      if(index == 3){
        if(!this.cid){
           Toast('请先选择场次')
           return
        }
        if(this.registerInfor.length == 1){
            this.getUserInfo();
            return;
        }else{
                  this.sureRegister(index);
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

@media all and (orientation: portrait) {
  body {
    background-color: #f0f0f0;
    font-size:0.12rem;
  }
}
@media all and (orientation: landscape) { 
body {
    background-color: #f0f0f0;
    font-size:0.15rem;
    // max-width:500px;
    margin:0 auto;
  }
}
.active{
  opacity: 1 !important;
}
.listActive{
  border:2px solid #dd497b !important;
}
.van-radio__icon--checked .van-icon{
  border-color: #E95C4A !important; 
    background-color: #E95C4A !important;
}
.van-field__control:disabled{
  color:#323233 !important;
}
.van-radio__icon .van-icon{
      border: 1px solid #E95C4A !important;

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
  background-color: #E95C4A;
  line-height:0.3rem;
  border-radius: 5px;
  margin-top:0.25rem;
  // margin-left:0.12rem;
}
.mainWarp{
  .content{
    margin-bottom:0.55rem;
  }
  .distance_time{
    text-align:center;
    color:#E95C4A;
    font-size:0.15rem;
    margin-top:0.8rem;
  }
  .information{
    padding:0.1rem 0.3rem;
    .sure-btn{
      width:1.2rem;
      text-align:center;
      color:#fff;
      border-radius: 5px;
      margin:0.2rem auto;
      background-color: #E95C4A;
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
        background-color: #E95C4A;
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
        border:1px solid #E95C4A;
        border-radius:4px;
        padding:5px 0px;
      }
    .cell{
      line-height: 0.25rem;
      margin-top:0.15rem;
      display:flex;
              font-size:0.14rem;
      .left{
        width:0.2rem;
      }
      .center{
        flex:1;
        text-align:center;
      }
      .right{
        width:0.5rem;
        height:0.25rem;
        text-align:center;
        line-height:0.25rem;
        background-color:#E95C4A;
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
        margin-bottom: 0.5rem;

    p{
      line-height:0.22rem;
    }
    .detail-btn{
      width:1.6rem;
      height:0.4rem;
      margin:0 auto;
      margin-bottom:0.3rem;
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
        background-color:#E95C4A;
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
    background:url(./assets/bottom.jpeg) no-repeat center;
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
