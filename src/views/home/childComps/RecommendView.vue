<template>
  <div class="recommend">
      <div v-for="item in recommends" :key="item.title" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
    .recommend{
        width: 100%;
        display: flex;
        font-size: 15px;
        padding: 10px 0 20px;
        border-bottom: 8px solid #eee
    }
    .recommend-item{
        flex: 1;
        text-align: center
    }
    .recommend img{
        width: 65px;
        height: 65px;
        margin-bottom: 5px;
    }
</style>