<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BSroll from 'better-scroll'

export default {
    name:"Scroll",
    data () {
        return {
            scroll:null,
        }
    },
    props:{
         probeTypes:{
                type:Number,
                default:0 
            },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        this.scroll = new BSroll(this.$refs.wrapper,{
           probeType:this.probeTypes,
           click:true,
           pullUpLoad:this.pullUpLoad
        })
       if(this.probeTypes ===2 || this.probeTypes === 3){
            this.scroll.on('scroll',(position) => {
            this.$emit('positions',position)
            })
       }
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',() =>{
            this.$emit('pullingUp')
        })
        }
    },
    methods:{
      scrollTo(x,y,time=500){
         this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
          this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
          console.log('刷新')
          this.scroll && this.scroll.refresh()
      },
      getScrollY(){
         //scroll.y可以获取当前滚动到哪个位置
          return this.scroll?this.scroll.y:0
      }
    }
    
}
</script>

<style scoped>

</style>