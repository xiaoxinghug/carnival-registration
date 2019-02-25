<template>
  <div class="container">
      <div class="top">
         <div class="img relative">
            <img src="//hhxd.0797wx.cn/Public/member/static/img/top.png" alt="图片加载中..."/>
            <div class="top-content absolute">
               <div class="head absolute"> 
                  <img :src="headerImg"  alt="头像加载中..."/>
                  <div class="name">{{name}}</div>
                  <div class="infor" @click="showregInforToast = true" v-if="!hasReg">完善信息，赢20积分</div>
                  <div class="infor" @click="showregInforToast = true" v-if="hasReg">{{name}}您好 点击这里，修改个人信息</div>
               </div>
            </div>
            <div class="bottom absolute">
              <div class="sigin flex">
                  <div>可使用积分</div>
                  <div class="center">{{point}}</div>
                  <div class="right" @click="doSign" v-if="cansign ==1">签到领积分</div>
                  <div class="right" v-if="cansign ==0" style="background:#ccc;">今天已经签到</div>
              </div>
            </div>
         </div>
      </div>
      <div class="content" @click="contentClcik">
          <img src="//hhxd.0797wx.cn/Public/member/static/img/content-bg.jpg" alt="图片加载中..."/>
      </div>

      <div class="footer">
        <div class="img">
          <a href="//hhxd.0797wx.cn/index.php/home/api1/carnival">
                    <img src="//hhxd.0797wx.cn/Public/member/static/img/bottom.png" alt="图片加载中..."/>
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
                      <van-field v-model="jzname" placeholder="请输入家长姓名" />
                    <!-- </van-cell-group> -->
               </div>

               <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="school" placeholder="请输入就读学校" />
                    <!-- </van-cell-group> -->
               </div>

               <!-- <div class="input-list">
                      <van-field v-model="nj" placeholder="请输入年级" />
               </div>
               <div class="input-list">
                      <van-field v-model="bj" placeholder="请输入班级" />
               </div> -->

               <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="mobile" placeholder="请输入家长手机" />
                    <!-- </van-cell-group> -->
               </div>
                 <div class="input-list">
                   <!-- <van-cell-group> -->
                      <van-field v-model="address" placeholder="请输入联系地址" />
                    <!-- </van-cell-group> -->
               </div>

                <div class="input-list" @click="showTime = true">
                   <!-- <van-cell-group> -->
                      <van-field v-model="birthday" disabled placeholder="请输入孩子生日" />
                    <!-- </van-cell-group> -->
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
                          <!-- <van-cell-group> -->
                            <van-field v-model="yzcode" placeholder="请输入短信验证码" />
                          <!-- </van-cell-group> -->
                        </div>
                        
                        <div class="btn" @click="getCode">
                          {{codeText}}
                        </div>
                  </div>
               </div>
           
                <div class="sure-btn" @click="doRegister" v-if="!hasReg">
                  确定注册
                </div>
                <div class="sure-btn" @click="doRegister" v-if="hasReg">
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
            <div style="display:inline-block;font-size:0.1rem;">+10积分</div>
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
            <div style="display:inline-block;font-size:0.1rem;">+20积分</div>
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

   <div class="memberCenter-loading" v-show="loading">
         <van-loading color="#dd497b"/>
   </div>
  </div>
</template>

<script>
const currentUrl = location.href;
let url = "//hhxd.0797wx.cn/index.php/home/user"
import fetchJsonp from 'fetch-jsonp';
import { RadioGroup, Radio,Field,DatetimePicker,Popup,Toast,Dialog,Loading} from 'vant';
import Vue from 'vue';
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
// import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  data () {
    return {
     show:false,
     showregToast: false,
     showregInforToast: false,
     showTime: false,
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
     uid:"",
     headerImg:"",
     maxDate:new Date(),
     minDate:new Date(2000, 0, 1),
     name:"",
     point:'0',
     cansign:1,
     btnActive:true,
     loading:false,
     hasReg:false
    }
  },
  created(){
   
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
                  this.getUserInfor();
                  clearInterval(tId);
              }
          }, 10);
        }else{
          this.getUserInfor();
            // this.uid = sessionStorage.getItem('uid') || ""
        }
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
    doRegister(){
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
        yzcode:this.yzcode
      }
      if(!this.cname){
        Toast('请输入学生姓名')
        return
      }else if(!this.jzname){
        Toast('请输入家长姓名')
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
      const data = this.parseData(obj);
      this.loading = true
      fetchJsonp(`${url}/doRegister?uid=${this.uid}${data}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          this.loading = false;
          this.showregInforToast = false;
          this.hasReg =true;
          if(json.code ==0){
             this.showregToast = true;
             if(!!json.adpoint){
               this.point = json.adpoint;
             }
          }else{
             Toast(json.message)
          }
        }).catch(function(ex) {
          this.loading = false
          console.log('parsing failed', ex)
        });
    },
    doSign(){
      this.loading = true;
      fetchJsonp(`${url}/doSign?uid=${this.uid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
        if(json.code ==0){
          this.cansign = 0;
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
      }).catch(function(ex) {
        this.loading = false;
        console.log('parsing failed', ex)
      });
    },
    getCode(){
      if(!/^1[3456789]\d{9}$/.test(this.mobile)){
        Toast('请输入正确的家长手机号码~')
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

body {
  background-color: #f0f0f0;
  font-size:0.12rem;
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
        font-size:0.1rem;
        background: #fbd03d;
        padding:3px 0.05rem;
        border-radius: 4px;
        margin-top:0.1rem;
      }
    }
  }
  .content{
    min-height:3.45rem;
    padding:0.15rem 0.2rem;
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
