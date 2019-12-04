<template>
  <div id="detail">
     <detail-nav-bar class="detail-bar" @navClick="navclick" ></detail-nav-bar>
     <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods"  />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @imageLoad="detailimageload" />
        <detail-param-info ref="param" :param-info="paramInfo" />
        <detail-comment-info ref="comment" :comment-info="commentInfo" />
        <goods-list ref="goodslist" :goodslist="recommend" />
     </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

export default {
    name:"Detail",
    data(){
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            themeTopYs:[],
            recommend:[]
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList
    },
    created(){
        //通过$router.params可拿到get传参的参数
       
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(res => {
            console.log(res)
            const data = res.data.result;
            this.topImages = res.data.result.itemInfo.topImages
            
          //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        console.log(this.goods)
        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品详情数据
        this.detailInfo = data.detailInfo;

         //5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

         //6.取出评论信息
       if(data.rate.cRate !== 0){
           this.commentInfo = data.rate.list[0];
          
       }

       //7.请求推荐数据
       getRecommend().then(res => {
           this.recommend = res.data.data.list
           console.log(this.recommend)
          
       })
        })

      
      
    },
    methods:{
     detailimageload(){
        this.$refs.scroll.scroll.refresh()
         this.themeTopYs=[]
           this.themeTopYs.push(0)
           this.themeTopYs.push(this.$refs.param.$el.offsetTop)
           this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
           this.themeTopYs.push(this.$refs.goodslist.$el.offsetTop)
     },
     navclick(index){
         console.log(this.themeTopYs)
         this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index] + 44,200)
     }
    }
}
</script>

<style scoped>
    #detail{
        position:relative;
        z-index: 10;
        background-color: #fff;
        height: 100vh;
    }

    .detail-bar{
        position: relative;
        z-index: 11;
        background-color: #fff;
    }

    .content{
        
        height: calc(100% - 44px);
    }
</style>