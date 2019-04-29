<template>
  <div class="container">
     <!--弹出图片层-->
    <van-popup v-model="showCilpImg">
          <div class="imgclip" @click="closePic">
             <img :src="imgsrc" alt=""/>
          </div>
    </van-popup>
     <!--结束页面-->
      <div class="top" v-if="pageEnd">
         <div class="img" id="capture">
            <img src="//vote7.0797wx.cn/public/static/img//end.jpeg" alt="图片加载中..."/>
             <div class="title absolute" style="top:0px;">
                <img src="//vote7.0797wx.cn/public/static/img/title.png" alt="" style="width:75%;margin-top: 0.2rem;">
              </div>
            <div class="top-content absolute">
               <div class="head absolute"> 
                  <img :src="headerImg"  alt="头像加载中..."/>
                  <div class="name">{{username}}</div>
                  <div class="nj">{{schoolName}}</div>
                  <div class="nj">{{nj}}</div>
               </div>
            </div>
            <div class="bottom absolute">
              <div class="sigin flex">
                  <div>
                     <div class="name">答题准确率</div>
                     <div class="text">{{zql}}%</div>
                  </div>
                  <div class="center">
                      <div class="name">耗时</div>
                      <div class="text">{{totalTime}}秒</div>
                    </div>
                  <div class="right">
                      <div class="name">全市排名</div>
                       <div class="text">{{myrank}}</div>
                  </div>
              </div>
            </div>
            <div class="bottom-img">
                <img src="//vote7.0797wx.cn/public/static/img/bottomimg.png" alt="">
            </div>
         </div>
         <div class="productImg absolute" @click="toImg" v-if="showBtn">
                一键生成成绩单
            </div>
      </div>

<!--规则-->
     <div class="rule" v-if="showRule">
       <div class="title">
        <img src="//vote7.0797wx.cn/public/static/img/title.png" alt=""/>
        </div>
        <div class="content">
          <h5>全能脑力王：“科创先锋大挑战”</h5>
          <p>指导单位：上海市科学技术协会</p>
          <p>主办单位：哈哈炫动卫视</p>
          <p>活动时间：3月23日20点至4月20日23点</p>
          <p>活动规则</p>
          <p>1.每轮随机13题（单选题），每答对一题得一分，分数高为胜。同分时，取用时短为胜，同分同时取最先参与为胜。</p>
          <p>2.活动期间可以不限次数刷新自己的成绩。</p>
          <p>3.2019年3月30日起，每周六23点进行一周数据统计，24点更新题库。</p>
          <p>4.每周将产生个人榜单和学校榜单。每周个人榜单前三的选手都将获得相应的奖品。累计4周学校榜单前10的学校，每个学校将有5个选手可以获得“上海市全国科普日”
            --全能脑力王 “科创先锋大挑战”总决赛的参赛资格。
          </p>

        </div>
       <div class=" flex">
           <div class="btn" @click="getBillboard">个人榜</div>
          <div class="btn" @click="ruleNext">下一步</div>
          <div class="btn" @click="getSchoolBillboard">学校榜</div>
       </div>
     </div>

  <!--排行榜-->
   <span @click="showRank = false" class="close" v-show="showRank"><van-icon name="cross" size="20px"/></span>
   <van-popup v-model="showRank">
    <div class="ranking-list">
       <h5>{{rankTitle}}</h5>
       <div v-if="ranklist.length >0">
         <div class="list flex">
            <!-- <div class="name">名次</div> -->
            <div style="width:0.4rem;margin:5px;">姓名</div>
            <div class="school">学校名称</div>
            <div style="width:0.4rem;margin:5px;">准确率</div>
            <div class="name">用时</div>
         </div>
          <div class="list flex" v-for="(list,index) in ranklist" :key="index">
            <!-- <div class="name">{{index+1}}</div> -->
            <div style="width:0.4rem;margin:5px;">{{list.username}}</div>
            <div class="school">{{list.school}}</div>
            <div class="name">{{list.score}}%</div>
            <div class="name">{{list.utime}}s</div>
        </div>
       </div>
      <div v-if="schoolranklist.length >0">
        <div class="list flex">
          <div class="name">名次</div>
            <div class="school">学校</div>
            <div style="width:0.5rem;margin:5px;">满分人数</div>
        </div>
        <div class="list flex" v-for="(list,index) in schoolranklist" :key="index">
            <div class="name">{{index+1}}</div>
            <div class="school">{{list.school}}</div>
            <div style="width:0.5rem;margin:5px;">{{list.mfrs}}</div>
       </div>
      </div>
    </div> 
   </van-popup>   

    <!--题目-->
     <div class="question" v-if="question">
        <div class="top">
            <div class="time">{{time}}</div>
        </div>
        <div v-for="(item,index) in list" :key="index">
          <div v-if="currentItem == index">
              <div class="content">
                <div class="text">
                  <span>{{index+1}}.</span>
                  <span>{{item.title}}</span>
                </div>
              </div>
              <div class="select">
                  <div class="select-a" @click="itemClick(index,'A')">
                      <span style="font-size:0.18rem;">A</span> <span>{{item.q1}}</span>
                  </div>
                  <div class="select-b" @click="itemClick(index,'B')">
                      <span style="font-size:0.18rem;">B</span>  <span>{{item.q2}}</span>
                  </div>
              </div>
          </div>
            
        </div>
        
     </div>

      <!--注册表格-->
      <!-- <van-popup v-model="showregInforToast" position="right" :overlay="false"> -->
          <div class="register" v-show="showregInforToast">
                <div class="title">
                  <img src="//vote7.0797wx.cn/public/static/img/title.png" alt="">
                 </div>
                <div class="content">
                  <h5>注册</h5>
                  <div class="input-list">
                        <van-field v-model="cname"  placeholder="请输入学生姓名" />
                  </div>
                  <!-- <div class="input-list">
                        <van-field v-model="jzname"  placeholder="请输入家长姓名" />
                  </div> -->
                   <div class="input-list" @click="showPicker" v-if="showAreaInput">
                        <van-field v-model="area" disabled placeholder="请选择学校区域" />
                  </div>
                  <div class="input-list" v-if="!showAreaInput">
                        <van-field v-model="area"  placeholder="请输入学校区域" />
                  </div>
                   <div class="input-list" @click="schoolClick" v-if="showSchoolInput">
                        <van-field v-model="school" disabled placeholder="请选择学校全称" />
                  </div>
                  <div class="input-list" v-if="!showSchoolInput">
                        <van-field v-model="school"  placeholder="请输入学校全称" />
                  </div>
                  <div class="input-list" @click="njClick">
                        <van-field v-model="nj" disabled placeholder="请选择年级" />
                  </div>
                  <!-- <div class="input-list">
                        <van-field v-model="nj"  placeholder="请选择年级" />
                  </div> -->
                  <div class="input-list">
                        <van-field v-model="mobile" placeholder="请输入父母的联系电话，仅供联系使用" />
                  </div>

                   <div class="input-list">
                          <van-radio-group v-model="sex">
                                <div class="flex" style="padding-left: 0.12rem;">
                                  <span>性别：</span>
                                  <span class="center"><van-radio name="1">男</van-radio></span> 
                                  <span class="right"><van-radio name="0">女</van-radio></span> 
                                </div>
                        </van-radio-group>
                  </div>


                </div>
              
              <div class="btn" @click="startQuestion">开始答题</div>
            </div>
      <!-- </van-popup> -->

      <!--奖品-->
      <van-popup v-model="show" position="right" :overlay="false">
          <div class="price">
              <div class="title">
                  <img src="//vote7.0797wx.cn/public/static/img//title.png" alt=""/>
                </div>
                <div class="prcie-content">
                    <h5>奖项</h5>
                    <div class="img-list">
                       <img src="//vote7.0797wx.cn/public/static/img/one.png" alt="">
                    </div>
                     <div class="img-list">
                       <img src="//vote7.0797wx.cn/public/static/img//second.png" alt="">
                    </div>
                     <div class="img-list">
                       <img src="//vote7.0797wx.cn/public/static/img//third.png" alt="">
                    </div>
                </div>
                <!-- <div class="text" style="margin:0.1rem 0px;">
                       <p style="color:#fff;text-align:center;margin-bottom:0.1rem;">最终排名前 <span style="font-size:0.18rem;color:red;">30</span> 的参与者</p>
                       <p style="color:#fff;text-align:center;">将获得参与上海全国科普日科创先锋大挑战决赛的竟猜资格</p>
                </div> -->

                <div class="btn" @click="priceNext">下一步</div>
          </div>
      </van-popup>      

        <!--地区选择-->
        <awesome-picker
          ref="picker"
          :data="areaList"
          @cancel="cancelArea"
          @confirm="confirmArea">
          </awesome-picker>

        
         <!--学校选择-->
         <awesome-picker
          ref="picker1"
          :data="columns"
          @cancel="onCancelSchool"
          @confirm="onConfirmSchool">
          </awesome-picker>

        <!--年级选择-->
        <awesome-picker
          ref="picker2"
          :data="columnsNj"
          @cancel="onCancelNj"
          @confirm="onConfirmNj">
          </awesome-picker>
        <!-- <van-popup v-model="showNj" position="bottom">
            <van-picker
                show-toolbar
                :columns="columnsNj"
                @cancel="onCancelNj"
                @confirm="onConfirmNj"
              />
        </van-popup> -->

    <div class="memberCenter-loading" v-show="loading">
          <van-loading color="white"/>
    </div>
  </div>
</template>

<script>
const currentUrl = location.href;
let url = "//vote7.0797wx.cn/index.php/home/kcxfdt/"
import fetchJsonp from 'fetch-jsonp';
import provinceList from './city.js'
import { RadioGroup, Radio,Field,Popup,Toast,Dialog,Loading,Area,Icon} from 'vant';
import html2canvas from 'html2canvas';
// import vuePickers from 'vue-pickers'
import AwesomePicker from 'vue-awesome-picker';
import Vue from 'vue';
import 'vant/lib/radio/style';
import 'vant/lib/radio-group/style';
import 'vant/lib/field/style';
import 'vant/lib/popup/style';
import 'vant/lib/toast/style';
import 'vant/lib/dialog/style';
import 'vant/lib/loading/style';
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Loading);
// Vue.use(Area);
Vue.use(AwesomePicker);

Vue.use(Icon);

let tId = null;
// import Lib from 'assets/js/Lib';
export default {
  components: {
    
  },
  data () {
    return {
     showSchool:false,
     showNj:false,
     showRank:false,
     show:false,
     pageEnd:false,
     question:false,
     showregToast: false,
     showRule:true,
     showregInforToast:false,
     showTime: false,
     showArea:false,
     showCilpImg:false,
     showBtn:true,
     showAreaInput:true,
     showSchoolInput:true,
     time:0,
     currentItem:0,
     hasRegistor:false,
     rankTitle:"",
     cname:"",
     jzname:"",//家长姓名
     school:"",//学校
     nj:"",//年级
     mobile:"",
     sex:"",
     area:"",
     uid:"",
     headerImg:"",
     schoolName:"",
     name:"",
     username:"",
     point:'0',
     btnActive:true,
     loading:false,
     areaList:{},
     list:[],
     allQa:[],
     columns:[],
     columnsNj:[['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级']],
     totalTime:0,
     startTime:"",
     endTime:"",
     zql:"",
     myrank:"",
     ranklist:"",
     schoolranklist:[],
     imgsrc:null
    }
  },
  created(){
   
  },
  mounted(){
     this.init();
     this.getTestLibrary();
    //  this.getBillboard();
  },
  methods: {
    init(){
       if(this.uid == ""){
        let tId = setInterval(() => {
          this.uid = sessionStorage.getItem('uid') || ""
            if (this.uid != "") {
              clearInterval(tId);
              this.checkUser();
            }
          }, 10);
        }else{
          this.checkUser();
        }
      this.areaList = provinceList
    },
    showPicker(){
      // console.log(this.$ref.picker);
      this.$refs.picker.show();
    },
    onCancelSchool(){
      this.showSchool = false;
    },
    onConfirmSchool(val){
      if(val[0].value == '其他'){
        this.showSchoolInput = false;
      }else{
         this.showSchoolInput = true;
         this.school = val[0].value;
      }
    },
    onCancelNj(){
      this.showNj = false;
    },
    onConfirmNj(val){
      this.showNj = false
      this.nj = val[0].value
    },
    njClick(){
        this.$refs.picker2.show();
    },
    schoolClick(){
       if(!this.area){
          Toast('请先选择学校区域')
          return;
       }else{
        this.$refs.picker1.show();

       }
    },
    getSchool(){
       this.loading = true;
      fetchJsonp(`${url}/getSchool?area=${this.area}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
               this.columns =[];

        if(json.code == 0){
            let list = [];
            for(let i =0; i<json.list.length ; i ++){
                list.push(json.list[i].school);
            }
            list.push('其他');
            this.columns.push(list)
            // console.log(this.columns)
        }else{
          Toast(json.message);
        }
      }).catch((ex)=> {
        this.loading = false;
        console.log('parsing failed', ex)
      });
    },
    getSchoolArea(){
      fetchJsonp(`${url}/getSchoolArea`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
        if(json.code == 0){
            console.log(json)
        }else{
          Toast(json.message);
        }
      }).catch((ex)=> {
        this.loading = false;
        console.log('parsing failed', ex)
      });
    },
    getSchoolBillboard(){
            this.rankTitle = '学校排行榜';
      if(this.loading){
         return;
      }
      this.loading = true;
      this.ranklist =[];
      fetchJsonp(`${url}/getSchoolBillboard`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
        if(json.code == 0){
           this.showRank = true;
           this.schoolranklist = json.list;
        }else{
          Toast(json.message);
        }
      }).catch((ex)=> {
        this.loading = false;
        console.log('parsing failed', ex)
      });
    },
    getBillboard(){
            // this.showRule = false;
      this.rankTitle = '个人排行榜';
      if(this.loading){
         return;
      }
      this.loading = true;
      this.schoolranklist= [];
       fetchJsonp(`${url}/getBillboard`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
        if(json.code == 0){
                this.showRank = true;
           this.ranklist = json.list;
        }else{
          Toast(json.message);
        }
      }).catch((ex) =>{
                this.loading = false;

        console.log('parsing failed', ex)
      });
    },
    convertImgToBase64(url,callback){
      var Img = new Image(),
        dataURL='';
        Img.setAttribute("crossOrigin",'Anonymous')
        // Img.crossOrigin = "Anonymous";

        // Img.setAttribute('crossorigin', 'anonymous');
        Img.src=url;
        Img.onload=function(){ //要先确保图片完整获取到，这是个异步事件
            var canvas = document.createElement("canvas"), //创建canvas元素
            width=Img.width, //确保canvas的尺寸和图片一样
            height=Img.height;
            canvas.width=width;
            canvas.height=height;
            canvas.getContext("2d").drawImage(Img,0,0,width,height); //将图片绘制到canvas中
            dataURL= canvas.toDataURL("image/png"); //转换图片为dataURL
            callback(dataURL)
            canvas = null;
        };
    },
    closePic(){
       this.showCilpImg = false;
    },
    toImg(){
      
      if(!!this.imgsrc){
        this.showCilpImg = true;
        return;
      }
      this.showBtn = false;
      // Toast.loading({
      //   duration: 3000,       // 持续展示 toast
      //   forbidClick: true, // 禁用背景点击
      //   message: '图片生成中...'
      // });
      html2canvas(document.querySelector("body")).then(canvas => {
          // Toast.clear();
          let imgsrc = canvas.toDataURL("image/png");
            this.imgsrc = imgsrc;
            this.showCilpImg = true;
            this.showBtn = true;
            setTimeout(()=>{
                Toast({
                  duration: 5000,
                  // mask: false,
                  position:'bottom',
                  message: '长按可保存图片发朋友圈哦~'
                });
            },100)
          
      });
    },
    priceNext(){
      this.show = false;
      if(this.hasRegistor){
          this.setBeginTime()
      }else{
        this.showregInforToast = true;
        // this.getSchoolArea();
      }
    },
    ruleNext(){
      this.showRule = false;
      this.show = true;
    },
    startQuestion(){
      this.saveUserInfo();
    },
    checkUser(){
      fetchJsonp(`${url}/checkUser?uid=${this.uid}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        if(json.code == 1){
            this.hasRegistor = true;
        }
      }).catch((ex)=> {
        this.loading = false;
        console.log('parsing failed', ex)
      });
    },
    setBeginTime(){
      fetchJsonp(`${url}/setBeginTime?uid=${this.uid}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          if(json.code == 0){
              this.startTime = new Date().getTime();
              this.question = true;
              this.countDown();
          }else{
            Toast(json.message);
          }
        }).catch((ex) =>{
          this.loading = false;
          console.log('parsing failed', ex)
        });
    },
    saveUserInfo(){
      let obj={
        username:this.cname,
        jzname:this.jzname,
        school:this.school,
        nj:this.nj,
        mobile:this.mobile,
        sex:this.sex,
        area:this.area
      }
      if(!this.cname){
        Toast('请输入学生姓名')
        return
      }else if(!this.school){
        Toast('请输入就读学校')
        return
      }else if(!this.area){
         Toast('请选择所在区域')
        return
      }else if(!this.sex){
        Toast('请选择性别')
        return
      }
      if(!/^1[3456789]\d{9}$/.test(this.mobile)){
        Toast('请输入正确的联系电话~')
        return;
      }
      const data = this.parseData(obj);
      this.loading = true
      fetchJsonp(`${url}/saveUserInfo?uid=${this.uid}${data}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
        if(json.code == 0){
          this.showregInforToast =false;
          this.setBeginTime();
        }else{
          Toast(json.message);
        }
        console.log(json)
      }).catch((ex) =>{
        this.loading = false;
        console.log('parsing failed', ex)
      })
    },
    itemClick(index,select){
      this.currentItem = index + 1;
      clearInterval(tId);
      this.allQa.push({
        "key":this.list[index].id,
        "key2":select
      })
      this.countDown();
      if(index == this.list.length -1){
        // console.log(this.allQa)
        // console.log(data);
         this.doAnswer()
         
      }
      // this.allQa.push(this.list[index].id);
    },
    doAnswer(){
      if(this.loading){
         return;
      }
      this.endTime = new Date().getTime();
      this.totalTime = (this.endTime -this.startTime)/1000;
      this.totalTime = this.totalTime.toFixed(2);
    let obj={
        t1t:this.allQa[0].key,
        t1d:this.allQa[0].key2,
        t2t:this.allQa[1].key,
        t2d:this.allQa[1].key2,
        t3t:this.allQa[2].key,
        t3d:this.allQa[2].key2,
        t4t:this.allQa[3].key,
        t4d:this.allQa[3].key2,
        t5t:this.allQa[4].key,
        t5d:this.allQa[4].key2,
        t6t:this.allQa[5].key,
        t6d:this.allQa[5].key2,
        t7t:this.allQa[6].key,
        t7d:this.allQa[6].key2,
        t8t:this.allQa[7].key,
        t8d:this.allQa[7].key2,
        t9t:this.allQa[8].key,
        t9d:this.allQa[8].key2,
        t10t:this.allQa[9].key,
        t10d:this.allQa[9].key2,
        t11t:this.allQa[10].key,
        t11d:this.allQa[10].key2,
        t12t:this.allQa[11].key,
        t12d:this.allQa[11].key2,
        t13t:this.allQa[12].key,
        t13d:this.allQa[12].key2
      } 
      const data = this.parseData(obj);
      this.loading = true;
      fetchJsonp(`${url}/doAnswer?uid=${this.uid}&utime=${this.totalTime}${data}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.loading = false;
        if(json.code ==0){
           this.question = false;
          this.pageEnd = true;
          // this.totalTime = json.utime;
          this.myrank = json.myrank;
          this.zql = json.zql;
          this.convertImgToBase64(json.headerimg,this.callback);
          this.username = json.username;
          this.schoolName = json.school;
          this.nj = json.nj;
        }else{
          setTimeout(()=>{
            window.location.href = location.href+'?time='+((new Date()).getTime());
          },1000)
            Toast(json.message);
        }
      }).catch(function(ex) {
        this.loading = false;
        console.log('parsing failed', ex)
      });
    },
    callback(data){
       this.headerImg = data;
    },
    getTestLibrary(){
     fetchJsonp(`${url}/getTestLibrary`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        this.list = json.list;
      }).catch((ex)=> {
        this.loading = false;
        console.log('parsing failed', ex)
      });
    },
    cancelArea(){
      this.showArea = false;
    },
    confirmArea(val){
      if(val[2].value == '其他'){
          this.showAreaInput = false;
          this.showSchoolInput = false;
      }else{
                  this.showAreaInput = true;
         this.area = val[2].value;
          this.school = "";
          this.getSchool();
      }
     
      // console.log(val)
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
      this.showregInforToast = false;
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
    countDown(){
      this.time = 15;
      this.btnActive = false;
      tId = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
             clearInterval(tId);
              if(this.currentItem == this.list.length -1){
                   this.allQa.push({
                      "key":this.list[this.currentItem].id,
                      "key2":""
                    })
                  this.doAnswer()
                  return;
                }
             
             if(this.currentItem < this.list.length -1){
                 this.allQa.push({
                    "key":this.list[this.currentItem].id,
                    "key2":""
                  })
                 this.currentItem = this.currentItem +1;
                   
                 this.countDown();
             }
          }
      }, 1000);
    }
  },
  components: {
    // vuePickers
  },
}
</script>

<style lang="less">
*{
  padding:0px;
  margin:0px;
}
html,body{
  width:100%;
  height:100%;
  max-width:450px;
  margin:0 auto;
  font-size:0.12rem;
}
 .close{
    position:fixed;
    z-index:3000;
    right:0.15rem;
    top:0.2rem;
        color: #fff;

  }
.van-cell{
  padding:2px 10px !important;
}
.van-popup--right{
  top: 45% !important;
  width:100%;
  margin:0 auto;
  // -webkit-transform: translate3d(0,0%,0) !important;
  //   transform: translate3d(0,0%,0) !important;
}
.van-field__control:disabled{
      color: #323233 !important;
}
.van-popup{
  background-color:transparent !important;
}
.van-field__label{
  max-width:45px !important;
}
.van-radio__label{
  color: #fff !important;
}
img{
  max-width: 100%;
  border:none;
  display: block;
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
  background: url(//vote7.0797wx.cn/public/static/img//bg1.jpeg) no-repeat center;
  background-size:100% 100%;
  height:100%;
  .ranking-list{
    color:#fff;
    background-color:#012e7f;
    padding:0.2rem 0px;
    min-height:3rem;
    width:3.75rem;
    text-align: center;
    h5{
      font-size:0.18rem;
      text-align:center;
      margin-bottom:0.2rem;
    }
    .list{
      margin:0.15rem;
      justify-content:space-between;
      .school{
        width:1.7rem;
        text-align:left;
        margin:5px;
      }
      .name{
        width: 0.3rem;
        text-align: left;
        margin:5px;
      }
    }
    
  }
   .imgclip{
      width:3.5rem;
      margin:0 auto;
      img{
        margin: 0 auto;
        display: block;
      }
    }
  .question{
    color:#fff;
    .content{
      background:#012f82;
      padding:0.1rem;
      margin:0.2rem;
      font-size:0.18rem;
      border-radius:10px;
      height:2.5rem;
    }
    .select{
      color:#fff;
      span{
        font-size:0.13rem;
      }
      .select-a,.select-b{
        font-size:0.25rem;
        background: url(./assets/item.png)no-repeat center;
        background-size: contain;
        margin-top:0.3rem;
        text-indent: 20%;
        height:0.45rem;
        padding-top:0.1rem;
      }
    }
    .top{
        padding:0.25rem 0px 0.1rem 0.2rem;
    }
    .time{
      width:1.2rem;
      font-size:0.28rem;
      text-align:center;
      line-height: 0.5rem;
      height: 0.5rem;
      border-radius: 5px;
      border:1px solid #ffffff;
      background-color:#201d1e;
    }
  }
  .rule,.register,.price{
    .bottom{
      margin-bottom:0.3rem;
    }
    .title{
      width:3.75rem;
    margin:0 auto;
    margin-bottom:0.4rem;
   }
   .btn{
     color:#fff;
     font-size:0.18rem;
     text-align:center;
     width:0.8rem;
     margin:0 auto;
          margin-top:0.2rem;
    background-color:#000839;
    padding:0.08rem;
    border:1px solid #fff;
   }
   .prcie-content{
     color:#ffffff;
     margin:0 auto;
     .img-list{
       width:85%;
       margin:0 auto;
              margin-top:0.15rem;

     }
     h5{
       font-size:0.18rem;
       text-align: center;
       padding:0.1rem 0px;
     }
   }
  .content{
    color:#fff;
    background-color:#012e7f;
    width:90%;
    margin:0 auto;
    padding-bottom:0.1rem;
    .input-list{
      padding:0px 0.15rem;
      margin-bottom:0.15rem;
       .right{
         display:inline-block;
        margin-left:0.2rem;
      }
    }
    h5{
      font-size:0.18rem;
      text-align:center;
      padding:0.1rem 0px;
    }
    p{
        line-height:0.22rem;
        padding:0px 0.1rem;
      }
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
  .top-content{
    width:100%;
    top:35%;
    color: #ffffff;
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
    }
  }
  .top{
    .img{
      min-height:6.2rem;
    }
    .bottom{
       width:90%;
       margin:0px 5%;
       background: #fff;
       height:0.8rem;
      //  line-height: 0.45rem;
       border-radius: 5px;
       bottom:35%;
    }
    .bottom-img{
      background-color:#fff;
      position:fixed;
      bottom:0px;
      // padding:0.1rem 0.15rem;
      // bottom: 0px;
      // margin-top:1.4rem;
    width: 96%;
    padding: 0px 2%;
    }
    .productImg{
      color:#fff;
      background-color: orange;
      text-align:center;
      width:60%;
      border-radius: 5px;
      margin:0px 20%;
      padding:0.1rem;
    margin-bottom: 0.1rem;
    bottom:25%;

    }
    .sigin{
      padding:0px 0.15rem;
      justify-content:space-between;
      text-align:center;
      padding-top:0.1rem;
      .name{
        color:#bbbbbb;
        font-size:0.15rem;
        margin-bottom:0.05rem;
      }
      .text{
        font-size:0.2rem;
      }
    }
  }

}
</style>
