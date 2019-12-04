<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="clickback">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="conter" class="title">
             
              <div class="childtitle" v-for="(item,index) in titles" 
              :key="index"
              :class="{active:index === currentIndex}" @click="titleClick(index)">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
 import NavBar from 'components/common/navbar/NavBar'

export default {
    name:"DetailNavBar",
     data(){
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    components:{
        NavBar
    },
   
    methods:{
        clickback(){
            this.$router.back()
        },
        titleClick(index){
            this.currentIndex = index
            this.$emit('navClick',index)
        }
    }
}
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 12px;
    }
    .childtitle{
        flex:1;
    }

    .active {
        color: var(--color-high-text)
    }
    .back img{
        margin-top: 12px;
    }
</style>