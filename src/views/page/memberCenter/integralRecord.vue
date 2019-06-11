<template>
  <div class="container">
      <div class="tab">
         <div class="content">
             <div class="left" @click="tabClick(0)">
                 <span :class="{'active':currIndex ==0}">哈币获取</span> 
               </div>
              <div class="right" @click="tabClick(1)">
                 <span :class="{'active':currIndex ==1}">哈币支出</span> 
                </div>
         </div>
      </div>
      <div class="list" v-if="list.length>0">
         <div class="li" v-for="(list,index) in list" :key="index">
           <div class="left">
             <h5>{{list.ctype}}</h5>
             <span class="time">{{list.intime}}</span>
           </div>
           <div class="right" v-if="st==0">
             <span>+{{list.point}}</span>
             <span><img src="./assets/habi.png" alt=""/></span>
           </div>
           <div class="right" v-if="st==1">
             <span>-{{list.point}}</span>
             <span><img src="./assets/habi.png" alt=""/></span>
           </div>
         </div>
      </div>
      <div class="nothing" v-if="list.length == 0">
               什么都没有~
         </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast} from 'vant';
let url = "//hhxd.0797wx.cn/index.php/home/user"
import fetchJsonp from 'fetch-jsonp';
Vue.use(Toast);

export default {
  components: {
    
  },
  data () {
    return {
     currIndex:0,
     uid:"",
     st:"0",
     list:[

     ]
    }
  },
  created(){
   
  },
  mounted(){
  //  this.uid = sessionStorage.getItem('uid') || ""
   this.init();
  },
  
  methods: {
    init(){
      if(this.uid == ""){
          let tId = setInterval(() => {
          this.uid = sessionStorage.getItem('uid') || ""
          if (this.uid != "") {
              clearInterval(tId);
              this.getPointRecord();
          }
         }, 10);
        }else{
          this.getPointRecord();
        }
    },
    getPointRecord(){
      fetchJsonp(`${url}/getPointRecord?uid=${this.uid}&st=${this.st}`)
      .then((response) =>{
        return response.json()
      }).then((json) =>{
        Toast.clear();
        if(json.code == 0){
            this.list = json.data
        }else{
          Toast(json.message)
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    },
    tabClick(index){
      this.currIndex = index;
      this.list = [];
      if(index == 0){
         this.st = 0;
          this.getPointRecord();
        
      }else{  
        this.st =1
        this.getPointRecord();
        // this.list = [];
      }
    }
  }
}
</script>

<style lang="less">
*{
  padding:0px;
  margin:0px;
}
.active{
  color:#FFC200;
  display: inline-block;
  border-bottom:2px solid #FFC200;
  height:0.38rem;
}
img{
    max-width: 100%;  
    display:block;
    border:none;
   }
 body {
  background-color: #f0f0f0;
  font-size:0.15rem;
}
.container{
  .nothing{
    text-align:center;
    margin-top:1rem;
  }
  .tab{
    background-color:#fff;
    // padding:0.13rem;
    height:0.4rem;
    line-height:0.4rem;
    .content{
     display: flex;

    }
    border-bottom:1px solid #EAEAEA;
    .right{
      border-left:1px solid #EAEAEA;
    }
    .left,.right{
      flex:1;
      text-align:center;
    }
  }
  .list{
   .li{
     display: flex;
     background-color: #ffffff;
     font-size:0.14rem;
     padding:0.08rem 0.15rem;
      align-items:flex-end;
      margin-bottom:0.1rem;
      justify-content: space-between;
     .right{
       font-size:0.15rem;
       span{
         width:0.15rem;
         height:0.15rem;
         display:inline-block;
        //  float:left;
         margin-left:0.15rem;
         color:#FF2121;
       }
     }
   }

  }
}
</style>
