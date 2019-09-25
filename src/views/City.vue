<template>
  <div class="city">
      <div class="search_wrap">
          <div class="search">
              <i class="fa fa-search"></i>
              <input v-model="city_val" type="text" placeholder="输入城市名">
          </div>
          <button @click="$router.push({name:'address',params:{city:city}})">取消</button>
      </div>
      <div style="height:600px" v-if="searchList.length == 0">
          <div class="location">
              <Location :address="city" @click="selectCity({name:city})"></Location>
          </div>
          <Alphabet :cityInfo="cityInfo" :keys="keys" ref="allcities"
          @selectCity="selectCity"></Alphabet>
      </div>
      <div class="search_list">
        <ul>
          <li @click="selectCity(item)" v-for="(item,index) in searchList" :key="index">
            {{item.name}}
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import Location from '../components/Location'
import Alphabet from '../components/Alphabet'
export default {
    name:"City",
    data() {
        return {
            city_val:"",
            cityInfo:null,
            keys:[],
            allCities:[],//存放所有城市名的容器
            searchList:[]
        }
    },
    components:{
        Location,
        Alphabet
    },
    created(){
      this.getCityInfo();
    },
    watch: {
      city_val() {
        this.searchCity();
      }
    },
    methods:{
      getCityInfo(){
        //获取所有城市,得到一个数组
        this.$axios("/api/posts/cities")
        .then(res => {
          console.log(res.data);
          this.cityInfo = res.data;
          //处理Key,计算Key
          this.keys = Object.keys(res.data);
          // console.log(this.keys);
          //移除掉热门城市hotcities的key,pop()方法用于删除并返回数组的最后一个元素
          this.keys.pop();
          //keys 排序
          this.keys.sort();
          this.$nextTick(() => {
            this.$refs.allcities.useScroll();
          });
          // console.log(this.keys);
          //存储所有城市，用来过滤搜索
          this.keys.forEach(key => {
            // console.log(key);
            this.cityInfo[key].forEach(city => {
              this.allCities.push(city);
            })
          });
        })
        .catch(err =>{
          console.log(err);
        })
      },
      selectCity(city) {
        console.log(city);
        this.$router.push({name:"address" ,params:{city:city.name}});
      },
      searchCity() {
        if (!this.city_val) {
          //如果搜索框为空,searchList[]为空
          this.searchList = [];
        } else {
          //根据输入框的关键字检索城市名,并存入searchList[]中
          this.searchList = this.allCities.filter(item => {
            return item.name.indexOf(this.city_val) != -1;
          });
          // console.log(this.searchList);
        }
      }
    },
    computed: {
        city() {
        return this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province;
      }
    }
}
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  color: #009eef;
  border:none;
  background-color: #fff;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>