<template>
  <div class="container">
      <div class="top">
         <div class="img relative">
            <img src="//hhxd.0797wx.cn/Public/member/static/img/top.png" alt="图片加载中..."/>
            <div class="top-content absolute">
               <div class="head absolute"> 
                  <img :src="headerImg"  alt="头像加载中..."/>
                  <div class="name">{{name}} <span v-if="hasReg" style="background:#fbd03d;">会员</span> <span v-if="!hasReg" style="background:rgb(204, 204, 204)">非会员</span> </div>
                  <div class="infor" @click="fillInfor" v-if="!hasReg">注册信息，赢30哈币</div>
                  <div class="infor" @click="showregInforToast = true" v-if="hasReg">{{name}}您好 点击这里，修改个人信息</div>
               </div>
            </div>
            <div class="bottom absolute">
              <div class="sigin flex">
                  <div>可使用哈币</div>
                  <div class="center">{{point}}</div>
                  <div class="right" @click="doSign" v-if="cansign ==1">签到领哈币</div>
                  <div class="right" v-if="cansign ==0" style="background:#ccc;">今天已经签到</div>
              </div>
            </div>
         </div>
      </div>
      <div class="content">
          <ul>
            <div>
              <li>
               <a href="/index.php/home/user/integralMall.html">
                  <img src="./assets/1.png" alt=""/>
                  <span>哈币商城</span>
                </a>
              </li>
              <li>
                <a href="/index.php/home/user/integralRecord.html">
                  <img src="./assets/2.png" alt=""/>
                  <span>我的哈币</span>
                </a>
              </li>
                <li>
                  <a href="/index.php/home/user/orderList.html">
                    <img src="./assets/3.png" alt=""/>
                    <span>我的订单</span>
                  </a>
                </li>
            </div>

             <div>
                <li>
                    <a href="/index.php/home/user/vipRule.html">
                      <img src="./assets/4.png" alt=""/>
                      <span>会员规则</span>
                    </a>
                  </li>
                  <li>
                    <a href="/index.php/home/user/consultation.html">
                      <img src="./assets/5.png" alt=""/>
                      <span>我要咨询</span>
                    </a>
                  </li>
                    <li>
                     <a href="//hhxd.0797wx.cn/index.php/home/index">
                        <img src="./assets/6.png" alt=""/>
                        <span>哈炫地图</span>
                      </a>
                    </li>
             </div>
             <div>
                <li>
                    <a href="/index.php/home/user/rank.html">
                      <img src="./assets/7.png" alt=""/>
                      <span>开卡享好礼</span>
                    </a>
                    </li>
                    <li @click="contentClcik">
                    <!-- <a href="/index.php/home/user/rank.html"> -->
                      <img src="./assets/8.png" alt=""/>
                      <span>我要献爱心</span>
                    <!-- </a> -->
                    </li>
                    <li @click="contentClcik">
                    <!-- <a href="/index.php/home/user/rank.html"> -->
                      <img src="./assets/9.png" alt=""/>
                      <span>健康小剧场</span>
                    <!-- </a> -->
                    </li>
             </div>
                
          </ul>
      </div>

      <div class="footer">
        <div class="img">
          <a href="//hhxd.0797wx.cn/index.php/home/index/actlist">
                    <img src="//hhxd.0797wx.cn/Public/member/static/img/bottom.jpeg" alt="图片加载中..."/>
          </a>
        </div>
      </div>

      <!--注册表格-->
      <van-popup v-model="showregInforToast">
        <div class="regInfor">
          <div class="close" @click="close"><img src="./assets/close.png" alt="图片加载中..."/></div>
          <h5 v-if="!hasReg">哈炫亲子会员注册</h5>
          <h5 v-if="hasReg">哈炫亲子会员修改</h5>
           <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="cname" placeholder="请输入孩子姓名" />
                    <!-- </van-cell-group> -->
               </div>

               <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="jzname" placeholder="请输入法定监护人姓名" />
                    <!-- </van-cell-group> -->
               </div>
              
              <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="mobile" placeholder="请输入法定监护人手机" />
                    <!-- </van-cell-group> -->
               </div>
               <div class="input-list" @click="showAreaClick">
                      <van-field v-model="area" disabled placeholder="请选择所在区域" />
               </div>

               <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="address" placeholder="请输入联系地址" />
                    <!-- </van-cell-group> -->
               </div>
               
               <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="school" placeholder="请输入就读学校" />
                    <!-- </van-cell-group> -->
               </div>

                <div class="input-list" @click="showTime = true">
                      <van-field v-model="birthday" disabled placeholder="请输入孩子生日" />
               </div>
               

               <div class="input-list">
                   <van-radio-group v-model="sex">
                        <div class="flex" style="padding-left: 0.12rem;">
                          <span>性别：</span>
                          <span class="center"><van-radio name="1">男孩</van-radio></span> 
                          <span class="right"><van-radio name="0">女孩</van-radio></span> 
                        </div>
                 </van-radio-group>
               </div>


               <div class="input-list" style="padding-right:15px;">
                  <div class="flex">
                       <div class="code">
                            <van-field v-model="yzcode" placeholder="请输入短信验证码" />
                        </div>
                        
                        <div class="btn" @click="getCode">
                          {{codeText}}
                        </div>
                  </div>
               </div>
           
                <div class="sure-btn" @click="doRegister()" v-if="!hasReg">
                  确定注册
                </div>
                <div class="sure-btn" @click="doRegister()" v-if="hasReg">
                  确定修改
                </div>
        </div>
      </van-popup>

      <!--签到弹窗-->
      <van-popup v-model="show">
        <div class="toast">
          <div class="close" @click="close"><img src="./assets/close.png" alt="图片加载中..."/></div>
           <div class="toast-img">
             <img src="./assets/sigin.png" alt="图片加载中..."/>
          </div>
          <div class="btn" @click="close">
            <div style="padding-top:0.06rem">签到成功</div>
            <div style="display:inline-block;font-size:0.1rem;">+{{adpoint}}哈币</div>
          </div>
        </div>
      </van-popup>

      <!--注册成功弹窗-->
      <van-popup v-model="showregToast">
        <div class="toast">
          <div class="close" @click="close"><img src="./assets/close.png" alt="图片加载中..."/></div>
           <div class="toast-img">
             <img src="./assets/reg-sucess.png" alt="图片加载中..."/>
          </div>
          <div class="btn" @click="close">
            <div style="padding-top:0.06rem">注册成功</div>
            <div style="display:inline-block;font-size:0.1rem;">+30哈币</div>
          </div>
        </div>
      </van-popup>

        <!--时间选择-->
      <van-popup v-model="showTime" position="bottom">
          <van-datetime-picker
              v-model="currentDateTime"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              @cancel="cancelTime"
              @confirm="confirmTime"
            />
      </van-popup>

      <!--地区选择-->
        <awesome-picker
        ref="picker"
        :data="areaList"
        @cancel="cancelArea"
        @confirm="confirmArea">
        </awesome-picker>


      <div class="memberCenter-loading" v-show="loading">
            <van-loading color="#dd497b"/>
      </div>
  </div>
</template>

<script>
const currentUrl = location.href;
let url = "//hhxd.0797wx.cn/index.php/home/user";
import qs from 'qs';
let _url = location.href.split('?')[1];
const urlQs = qs.parse(_url);
import fetchJsonp from 'fetch-jsonp';
import provinceList from './city.js';
import { RadioGroup, Radio,Field,DatetimePicker,Popup,Toast,Dialog,Loading} from 'vant';
import Vue from 'vue';
import AwesomePicker from 'vue-awesome-picker';
import 'vant/lib/radio/style';
import 'vant/lib/radio-group/style';
import 'vant/lib/field/style';
import 'vant/lib/popup/style';
import 'vant/lib/toast/style';
import 'vant/lib/dialog/style';
import 'vant/lib/loading/style';
import 'vant/lib/datetime-picker/style';
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(DatetimePicker);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(AwesomePicker);

// Vue.use(Area)
// import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  data () {
    return {
     show:false,
     adpoint:"",
     regadpoint:"",
     showregToast: false,
     showregInforToast: false,
     showTime: false,
     showArea:false,
     currentDateTime:"",
     codeText:"获取验证码",
     cname:"",
     jzname:"",//家长姓名
     school:"",//学校
     nj:"",//年级
     bj:"",//班级
     address:"",//联系地址
     yzcode: "",
     mobile:"",
     birthday:"",
     sex:"",
     area:"",
     uid:"",
     headerImg:"",
     maxDate:new Date(),
     minDate:new Date(2000, 0, 1),
     name:"",
     point:'0',
     cansign:1,
     btnActive:true,
     loading:false,
     hasReg:false,
     areaList:[]
    }
  },
  created(){
   if(!!urlQs.register){
     this.showregInforToast = true;
   }
  },
  mounted(){
     this.init();
  },
  methods: {
    init(){
       if(this.uid == ""){
        let tId = setInterval(() => {
            this.uid = sessionStorage.getItem('uid') || ""
              if (this.uid != "") {
                  localStorage.setItem('uid',this.uid);
                  this.getUserInfor();
                  clearInterval(tId);
              }
          }, 10);
        }else{
          this.getUserInfor();
          localStorage.setItem('uid',this.uid);
            // this.uid = sessionStorage.getItem('uid') || ""
        }
      this.areaList = provinceList
    },
    cancelArea(){
      // this.showArea = false;
    },
    confirmArea(val){
      this.showArea = false;
      this.area = val[2].value;
    },
    showAreaClick(){
      this.$refs.picker.show();
    },
    cancelTime(){
      this.showTime = false
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
    close(){
      this.show = false;
      this.showregToast = false;
      this.showregInforToast = false;
    },
    contentClcik(){
      Toast('开发中...')
    },
    getUserInfor(){
      this.loading = true;
      fetchJsonp(`${url}/getUserInfo?uid=${this.uid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
        this.headerImg = json.headerimg;
        this.name = json.nickname
        if(json.code == 0){
          this.point = json.point;
          this.cansign = json.cansign;
           this.cname = json.cname;
           this.jzname = json.jzname;
           this.school = json.school;
           this.address = json.address;
           this.mobile = json.mobile;
           this.birthday = json.birthday;
           this.sex = json.sex;
           this.area = json.area;
          this.hasReg = true;
        }
      }).catch(function(ex) {
        this.loading = false;
        console.log('parsing failed', ex)
      });
      
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
    fillInfor(){
      this.sureRegister();
    },
    sureRegister(){
     
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
                  this.showregInforToast = true;
            // this.doRegister();
        }).catch(() => {
          // on cancel
        });
       
    },
    doRegister(){
       if(!this.cname){
        Toast('请输入学生姓名')
        return
      }else if(!this.jzname){
        Toast('请输入法定监护人姓名')
        return
      }else if(!this.school){
        Toast('请输入就读学校')
        return
      }else if(!this.address){
        Toast('请输入地址')
        return
      }else if(!this.birthday){
        Toast('请选择宝宝生日时间')
        return
      }else if(!this.area){
         Toast('请选择所在区域')
        return
      }else if(!this.sex){
        Toast('请选择小朋友的性别')
        return
      }else if(!this.yzcode){
        Toast('请输入验证码')
        return;
      }
      if(!/^1[3456789]\d{9}$/.test(this.mobile)){
        Toast('请输入正确的联系电话~')
        return;
      }
      if(this.loading == true){
        return;
      }
      
      let obj={
        cname:this.cname,
        jzname:this.jzname,
        school:this.school,
        nj:this.nj,
        bj:this.bj,
        address:this.address,
        mobile:this.mobile,
        birthday:this.birthday,
        sex:this.sex,
        yzcode:this.yzcode,
        area:this.area,
      }
      
      const data = this.parseData(obj);
        Toast.loading({
          duration: 0,
          forbidClick: true, // 禁用背景点击
          message: '请求中...'
         });
      // this.loading = true
      fetchJsonp(`${url}/doRegister?uid=${this.uid}${data}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
                  Toast.clear();
          this.showregInforToast = false;
          this.hasReg =true;
          if(json.code ==0){
             this.showregToast = true;
             if(!!json.adpoint){
               this.point = json.adpoint;
               this.regadpoint = json.adpoint;
             }
          }else{
             Toast(json.message)
          }
        }).catch(function(ex) {
                  Toast.clear();

          console.log('parsing failed', ex)
        });
    },
    doSign(){
      if(this.loading == true){
        return;
      }
      this.loading = true;
      fetchJsonp(`${url}/doSign?uid=${this.uid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
        if(json.code ==0){
          this.cansign = 0;
          this.adpoint = json.adpoint;
          this.point = parseInt(this.point) + parseInt(json.adpoint);
          this.show = true;
        }else if(json.code == 2){
           Dialog.confirm({
            title: '提示信息',
            message: json.message
           }).then(() => {
            this.showregInforToast = true;
          }).catch(() => {
            // on cancel
          });
        }else{
          Toast(json.message);
        }
      }).catch((ex) =>{
        this.loading = false;
        console.log('parsing failed', ex)
      });
    },
    getCode(){
      if(!/^1[3456789]\d{9}$/.test(this.mobile)){
        Toast('请输入正确的法定监护人手机号码~')
        return;
      }
      if(!this.btnActive){
        return;
      }
      this.loading = true
      fetchJsonp(`${url}/getMobileCode?mobile=${this.mobile}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          this.loading = false
          this.countDown()
        }).catch(function(ex) {
          this.loading = false
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
.van-field__control:disabled{
  color:#323233 !important;
}
.van-radio__icon--checked .van-icon{
  border-color: #dd497b !important; 
    background-color: #dd497b !important;
}
img{
  max-width: 100%;
  border:none;
  display: block;
}
.input-list:after{
    content:"";
     position:absolute;
  -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    border-bottom: 1px solid #ebedf0;
    width:90%;
    margin: 0px 5%;
    left:0px;
}
.memberCenter-loading{
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
.flex{
  display: flex;
}
.relative{
  position: relative;
}
.absolute{
  position: absolute;
}
.container{
  .sure-btn{
    background: #dd497b;
    border-radius:4px;
    color:#fff;
    height:0.44rem;
    line-height:0.44rem;
    width:80%;
    margin:0.1rem auto;
    // font-size:0.15rem;
  }
  .input-list{
      margin-top:0.1rem;
      position: relative;
      height:0.44rem;
      line-height: 0.44rem;
      .right{
        margin-left:0.2rem;
      }
      .code{
        flex:1;
      }
      .btn{
        height:0.44rem;
        width:1rem;
        text-align:center;
        color:#fff;
        background-color: #17d2f7;
        line-height:0.44rem;
        margin-left:0.12rem;
      }
    }
  .regInfor{
    width:3.3rem;
    position: relative;
    text-align:center;
    h5{
      font-size:0.15rem;
      margin-top:0.15rem;
    }
    .close{
       position:absolute;
      right:0.1rem;
      width:0.18rem;
      height:0.18rem;
      top:0rem;
    }
  }
  .toast{
    width:2.10rem;
    height:2.26rem;
    border-radius: 4px;
    position:relative;
    .btn{
      width:80%;
      margin:0 auto;
      height:0.45rem;
      background:url(./assets/btn.png)no-repeat center;
      background-size:contain;
      color:#fff;
      text-align:center;
      margin-top:0.25rem;
    }
    .close{
      position:absolute;
      right:0.1rem;
      width:0.15rem;
      height:0.15rem;
      top:0.1rem;
    }
  }
  .toast-img{
    width:40%;
    margin:0 auto;
    padding-top:0.5rem;
  }
  .top-content{
    width:100%;
    top:50%;
    .head{
      top:50%;
      left:50%;
      text-align: center;
      transform:translate(-50%,-50%);
      .name{
        font-size:0.15rem;
        position: relative;
        span{
          color:#fff;
          font-size:0.12rem;
          padding:0px 3px;
          position: absolute;
          margin-left: 10px;
          top: 2px;
        }
      }
      img{
        height: 0.75rem;
        width: 0.75rem;
        border-radius: 0.4rem;
        margin:0 auto;
        margin-bottom:0.1rem;
      }
      .infor{
        color:#fff;
        font-size:0.13rem;
        background: #fbd03d;
        padding:5px 0.05rem;
        border-radius: 4px;
        // width:100%;
        min-width: 2.4rem;
        // width:120%;
        // margin-top:0.1rem;
      }
    }
  }
  .content{
    // min-height:3.45rem;
    margin:0.15rem 0.15rem;
    border-radius:5px;
    background-color:#fff;
    padding:0.1rem 0rem;
    div{
      display: flex;
          align-items: flex-end;

      li{
        flex:1;
        text-align:center;
        margin-bottom:0.2rem;
        img{
          display: block;
          border:none;
          margin:0 auto;
          width:0.7rem;
        }
        span{
          display:block;
          margin-top:0.2rem;
        }
      }
    }
  }
  .top{
    .bottom{
       width:90%;
       margin:0px 5%;
       background: #fff;
       height:0.45rem;
       line-height: 0.45rem;
       border-radius: 5px;
       bottom:0px;
    }
    .sigin{
      padding:0px 0.15rem;
      justify-content:space-between;
      .center{
        width:1.2rem;
        color:#f7abda;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size:0.14rem;
      }
      .right{
        background: #f7abda;
        color:#fff;
        height:0.25rem;
        line-height: 0.25rem;
        margin-top:0.1rem;
        border-radius: 4px;
        padding:0px 0.15rem;
      }
    }
  }

}
</style>
