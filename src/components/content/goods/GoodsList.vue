<template>
   <div class="goods">
        <goods-list-item v-for="(item,index) in goodslist" :key="index" :goods-item="item" class="goodsitem" />
   </div>
  
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'
export default {
    name:"GoodsList",
    props:{
        goodslist:{
            type:Array,
            default(){
                return {}
            }
        }
    },
    components:{
        GoodsListItem
    }
}
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 8px
    }
</style>