<template>
 <div id="home">
    <nav-bar class="home-nav"><div slot="conter">购物街</div></nav-bar>
    <tab-control class="tabcontrol" ref="TabControl1" :titles="titles" @tabClick="tabClick" v-show="isTabFixed" />
    <scroll class="content" 
    ref="scroll" 
    :probeTypes="3" 
    @positions="positions"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control ref="TabControl2" :titles="titles" @tabClick="tabClick"/>
      <goods-list :goodslist="showgoods" />
    </scroll>
    <back-top @click.native="backtop" v-show="isshow" />
 </div>
 
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import {debounce} from 'common/utils'
import {getHomeMultidata,getHomeGoods} from "network/home"

  export default {
    name: "Home",
    data(){
      return{
       banners:[],
       recommends:[],
       titles:['新款','流行','精选'],
       goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]}
       },
       currentType:'pop',
       isshow:false,
       isTabFixed:false,
       saveY:0
      }
    },
    computed:{
      showgoods(){
        return this.goods[this.currentType].list
      }
    },
    //页面活跃时调用
    activated(){
      //BS组件里定位
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      //进行刷新
      this.$refs.scroll.refresh()
    },
    //离开页面时调用
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created(){
      //1.请求多个数据
     this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
       //3.监听item中图片加载完成
       const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('itemImageLoad',() => {
         refresh()
      })
    },
    methods:{
     
      tabClick(index){
       switch(index){
         case 0:
          this.currentType = 'pop'
          break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
       }
       //让两个TabControl栏点击的位置一致
       this.$refs.TabControl1.currentIndex = index;
       this.$refs.TabControl2.currentIndex = index;
      },
      backtop(){
        this.$refs.scroll.scrollTo(0,0)
      },

      getHomeMultidata(){
         getHomeMultidata().then(res =>{
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
         getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          //完成上拉加载更多
          this.$refs.scroll.scroll.finishPullUp()
        })
      },
      positions(position){
       this.isshow = -position.y > 1000
        this.isTabFixed = -position.y > 538
      },
      loadMore(){
        console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        console.log(this.$refs.TabControl2.$el.offsetTop)
      }
    }
  }
</script>

<style scoped>
  #home{
    position: relative;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 9; */
  }

  .tabcontrol{
    position: relative;
    z-index: 9;
    background: #fff
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
