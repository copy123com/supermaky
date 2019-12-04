<template>
  <swiper class="detailswiper">
      <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item" alt="">
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:"DetailSwiper",
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
                Swiper,
                SwiperItem
            },
    created(){
        console.log(this.topImages)
    }
}
</script>

<style scoped>
    .detailswiper{
        height: 230px;
        overflow: hidden;
    }
</style>