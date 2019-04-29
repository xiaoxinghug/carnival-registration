<template>
  <div class="container">
      <div class="rule">
          <img src="//hhxd.0797wx.cn/Public/member/static/img/rule-text.png" alt=""/>
      </div>
      <div class="content">
        <div class="text">
         <div>
           尊敬的会员：
            您好！欢迎加入哈哈家族的大家庭中，我们将竭力服务好您和您的孩子，陪伴他们一起“趣成长”！
            <br/>
        <h5>如何成为会员？</h5> 
          方式一            <br/>

          第一步：关注哈炫亲子微信服务号            <br/>

          第二步：前往会员中心注册即可成为会员。            <br/>

          方式二            <br/>

          第一步：关注哈炫亲子微信服务号            <br/>

          第二步：报名参加哈哈炫动卫视相关活动，填写相关信息，即可成为会员。            <br/>

          方式三            <br/>

          第一步：关注哈炫亲子微信服务号            <br/>

          第二步：在哈炫商城内购买支付，填写相关信息，即可成为会员。            <br/>

         <br/>
        <h5>会员福利</h5> 
          1、更优惠的价格（指定活动、课程可享受75折-95折）            <br/>

          2、更快捷的报名通道（指定项目可享受快速优先报名权）            <br/>

          3、限量活动、商品、课程等享受提前抢购名额机会            <br/>

          4、哈哈炫动卫视节目录制及活动体验优先考虑            <br/>

          5、默认加入哈哈炫动卫视所有赛事或节目录制海选活动加分名单            <br/>

          6、默认加入新产品体验候选名单（如：周边产品、试听课程、公益活动等）            <br/>

          7、优惠券、礼品兑换，会员消费积分可兑换礼品或者优惠券            <br/>

                    <br/>
        <h5>赚取哈币方式</h5>   
          1、 注册成为会员即可获得30个哈币            <br/>

          2、 “每日签到”可以获得1个哈币            <br/>

          3、 在“哈炫商城”内购买相关活动、课程、商品即可获得相应哈币。            <br/>

          4、报名哈哈炫动卫视海选活动、节目录制、赛事（须为指定活动）可以获得5个哈币。            <br/>

            <br/>
        <h5>注意事项</h5>   
          1、哈币商城兑换的优惠券、礼品，不折现，只可用哈炫亲子微信服务号会员积分兑换。            <br/>

          2、会员可以在哈炫亲子服务号上查询积分记录来源明细及兑换记录，积分有效期一般为两年， 到期后未兑换的，将对积分进行清零（短信或微信提示您本月或本年度将有多少积分将到期）。            <br/>


          注：以上会员细则，哈炫亲子服务号拥有最终解释权和变更权。            <br/>

         </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  data () {
    return {
     
    }
  },
  created(){
   
  },
  mounted(){

  },
  methods: {
    
  }
}
</script>

<style lang="less">
*{
  padding:0px;
  margin:0px;
}
body{
  background: url(./assets/rule-bg.png) repeat-y;
  background-size: contain;
  font-size:0.12rem;
}
.container{
  img{
    max-width: 100%;
    display:block;
    border:none;
  }
  .rule{
    position: relative;
    z-index: 1;
  }
  .content{
    position: relative;
    color:rgba(136,136,136,1);
    z-index:0;
    top:-80px;
    min-height:5rem;
    margin:0px 0.25rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 0.14rem 0px rgba(178,191,196,1);
    border-radius:0.5rem 0.5rem 0px 0px;
    .text{
      padding:80px 0.26rem 0.2rem 0.26rem;
      font-size:0.15rem;
      h5{
        font-size:0.16rem;
        color:red;
      }
      p{
        margin-bottom:0.2rem;
      }
    }
  }
}
</style>
