<template>
  <div class="home">
      <div class="header">
        <div class="address_map" @click="$router.push({name:'address',params: {city: city}})">
          <i class="fa fa-map-marker"></i>
          <span>{{address}}</span>
          <i class="fa fa-sort-desc"></i>
        </div>
      </div>
      <div class="search_wrap">
         <div class="shop_search">
          <i class="fa fa-search"></i>
          搜索商家 商家名称
        </div>
      </div>
      <div id="container">
        <mt-swipe :auto="4000" class="swiper">
          <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
            <img :src="img" alt="">
          </mt-swipe-item>       
        </mt-swipe>
      </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
    name:"home",
    data(){
      return {
        swipeImgs: []
      }
    },
    computed: {
      address() {
        return this.$store.getters.address;
      },
      city() {
        console.log(this.$store.getters.location.addressComponent.province);
        console.log(this.$store.getters.location.addressComponent.city);
        return this.$store.getters.location.addressComponent.province
        ||
        this.$store.getters.location.addressComponent.city;
      }
    },
    created(){
      this.getData();
    },
    methods:{
      getData() {
        this.$axios("/api/profile/shopping").then(res => {
          // console.log(res.data);
          this.swipeImgs = res.data.swipeImgs;
        })
      }
    }
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.search_wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}
</style>
