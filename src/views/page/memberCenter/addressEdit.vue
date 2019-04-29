<template>
  <div class="container">
     <div class="input-list">
       <van-field
          v-model="sjr"
          label="收件人"
          placeholder="请输入收件人姓名"
        />
     </div>

     <div class="input-list">
       <van-field
          v-model="mobile"
          label="手机号码"
          placeholder="请输入手机号码"
        />
     </div>

      <div class="input-list" @click="showArea">
        <van-field
            v-model="addressVal"
            label="所在区"
            disabled
            placeholder="请选择所在地区"
          />
      </div>

     <div class="input-list">
       <van-field
          v-model="address"
          label="详细地址"
          type="textarea"
          placeholder="请输入详细地址"
          rows="1"
          autosize
        />
     </div>

     <div class="input-list">
        <van-field
            v-model="yzcode"
            label="邮政编码"
            placeholder="填写您所在地区的邮编"
          />
      </div>

     <div class="bottom">
       <div class="bottom-btn" v-if="!aid" @click="saveEdit()">
            确定
       </div>
       <div class="bottom-btn" v-if="aid" @click="updAddress()">
            修改
       </div>
     </div>

     <!--地区选择-->
        <awesome-picker
        ref="picker"
        :data="areaList"
        @cancel="cancelArea"
        @confirm="confirmArea">
        </awesome-picker>

  </div>
</template>

<script>
import Vue from 'vue';
let url = "//hhxd.0797wx.cn/index.php/home/user"
import fetchJsonp from 'fetch-jsonp';
import { Field,Popup,Toast} from 'vant';
import AwesomePicker from 'vue-awesome-picker';
import provinceList from './city.js';
import qs from 'qs';
import { setTimeout } from 'timers';
let _url = location.href.split('?')[1];
const urlQs = qs.parse(_url);
Vue.use(Field);
Vue.use(Toast);
Vue.use(AwesomePicker);

export default {
  components: {
    
  },
  data () {
    return {
      uid:"",
     areaList:[],
     aid:"",
     province:"",
     city:"",
     sjr:"",
     mobile:"",
     address:"",
     area:"",
     yzcode:"",
     gdid:"",
     num:"",
     addressVal:""
    }
  },
  created(){
   this.aid = urlQs.address || "";
   this.gdid = urlQs.gdid || "";
   this.num = urlQs.num || "";
      this.uid = localStorage.getItem('uid') || "";
   this.getAddress();
  },
  mounted(){
    this.areaList = provinceList;
  },
  methods: {
    showArea(){
     this.$refs.picker.show();
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
    getAddress(){
      if(!this.aid){
        return;
      }  
      fetchJsonp(`${url}/getAddress?uid=${this.uid}&aid=${this.aid}`)
        .then((response) =>{
          return response.json()
        }).then((json) =>{
          if(json.code == 0){
            this.sjr = json.data.sjr
            this.mobile = json.data.mobile
            this.address = json.data.address
            this.yzcode = json.data.yzcode
            this.province = json.data.province;
            this.city = json.data.city;
            this.area = json.data.area;
            this.addressVal = json.data.province + json.data.city + json.data.area;
          }else{
           
            Toast(json.message)
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });
    },
    updAddress(){
       Toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: '地址修改中，请稍后...'
      });
      let obj={
        sjr:this.sjr,
        aid:this.aid,
        mobile:this.mobile,
        province:this.province,
        city:this.city,
        area:this.area,
        address:this.address,
        yzcode:this.yzcode,
      }
      if(!this.sjr){
        Toast('请输入收件人')
        return
      }else if(!/^1[3456789]\d{9}$/.test(this.mobile)){
         Toast('请输入正确的联系电话~')
        return;
      }else if(!this.area){
        Toast('请输入所在地区')
        return
      }else if(!this.address){
        Toast('请输入详细地址')
        return
      }
     
      const data = this.parseData(obj);
      fetchJsonp(`${url}/updAddress?uid=${this.uid}${data}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
            Toast.clear();

        if(json.code == 0){
          setTimeout(()=>{
                     window.location.href = `/index.php/home/user/orderCompletion.html?id=${this.gdid}&num=${this.num}`
          },50)

        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
            Toast.clear();

        console.log('parsing failed', ex)
      });
    },
    saveEdit(){
       Toast.loading({
        duration: 0,
        forbidClick: true, // 禁用背景点击
        message: '新增地址中，请稍后...'
      });
      let obj={
        sjr:this.sjr,
        mobile:this.mobile,
        province:this.province,
        city:this.city,
        area:this.area,
        address:this.address,
        yzcode:this.yzcode,
      }
      if(!this.sjr){
        Toast('请输入收件人')
        return
      }else if(!/^1[3456789]\d{9}$/.test(this.mobile)){
         Toast('请输入正确的联系电话~')
        return;
      }else if(!this.area){
        Toast('请输入所在地区')
        return
      }else if(!this.address){
        Toast('请输入详细地址')
        return
      }
     
      const data = this.parseData(obj);
      fetchJsonp(`${url}/addAddress?uid=${this.uid}${data}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
            Toast.clear();

        if(json.code == 0){
            setTimeout(()=>{
                  window.location.href = `/index.php/home/user/orderCompletion.html?id=${this.gdid}&num=${this.num}`
              },50)

        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
            Toast.clear();

        console.log('parsing failed', ex)
      });
    },
    confirmArea(val){
      this.province = val[0].value;
      this.city = val[1].value;
      this.area = val[2].value;
      this.addressVal = this.province +   this.city +  this.area;
    },
    cancelArea(){

    }
  }
}
</script>

<style lang="less">
*{
  padding:0px;
  margin:0px;
}
.van-field__control:disabled{
  color:#323233 !important;
}
 body {
  background-color: #f0f0f0;
  font-size:0.13rem;
}
img{
  max-width: 100%;
  display: block;
  border:none;
}
.container{
  .input-list{
    margin-bottom:0.1rem;
  }
  .bottom{
        position:fixed;
    bottom:0.1rem;

    width:100%;
  }
  .bottom-btn{
                  margin:0px 0.2rem;
    background:rgba(255,83,83,1);
    border-radius:4px;
    height:0.45rem;
    text-align:center;
    line-height: 0.45rem;
    color:#fff;

  }
}
</style>
