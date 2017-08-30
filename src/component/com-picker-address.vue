<template>
  <div class="g-pop" v-show="showaddress.showaddress">
    <div class="adressBox" v-show="showaddress.showaddress">
      <div class="addressTitle"><span @click="confirm">确定</span></div>
      <picker :data='addressNow' :columns=3 v-model='addressValue' @on-change='change' ref="picker1"></picker>
    </div>
  </div>
</template>

<script>
  import {Picker} from 'vux';
  import axios from 'axios';
  export default {
    components: {
      Picker
    },
    methods: {
      change(value) {
        var that = this;
        that.addressValue = value;
        that.addressName = that.$refs.picker1.getNameValues();
      },
      confirm:function () {
        this.showaddress.showaddress = false;
        this.$emit('addressdata',{name:this.addressName,value:this.addressValue});
      },
      initValue:function(){
        let that = this;
        console.time("initValue");
        if(this.addressid){
          this.addressValue[2] = this.addressid+"";
          this.addressName = "";
          for(var i = 0,d;d=this.addressNow[i++];){
            if(d.value==this.addressValue[2]){
              this.addressValue[1] = d.parent;
              this.addressName=d.name;
              break;
            }
          }
          for(var i = 0,d;d=this.addressNow[i++];){
            if(d.value==this.addressValue[1]){
              this.addressValue[0] = d.parent;
              this.addressName=d.name+" "+this.addressName;
              break;
            }
          }
          for(var i = 0,d;d=this.addressNow[i++];){
            if(d.value==this.addressValue[0]){
              this.addressName=d.name+" "+this.addressName;
              break;
            }
          }
        }
        that.initData();
        console.timeEnd("initValue");
      },
      initData(){
        let that = this;
        if(that.addressNameList.length&&that.addressid){
          that.addressValue = that.addressValueList[that.addressid];
          that.addressName = that.addressNameList[that.addressid];
          that.confirm();
        }
      }
    },
    props:['showaddress','addressid','addressDataUrl'],
    watch: {
      addressPre:function(v,o){
        var that = this;
        var addressNow = [],addressNameList=[],addressValueList=[];
        console.time("ctime")
        for (var i0 = 0,d0; d0=that.addressPre[i0++];) {
         addressNow.push({value:d0[0],name:d0[1],parent:0});
         for(var i1 = 0,d1;d1=d0[2][i1++];){
          if(d1[0]==-1){
            d1[0]=d0[0]+"-1"
          }
           addressNow.push({value:d1[0],name:d1[1],parent:d0[0]});
           for(var i2 = 0,d2;d2=d1[2][i2++];) {
            if(d2[0]==-1){
              d2[0]=d0[0]+"-"+d1[0]+"-1"
            }
             addressNow.push({value:d2[0],name:d2[1],parent:d1[0]});
             addressNameList[d2[0]]=d0[1]+" "+d1[1]+" "+d2[1];
             addressValueList[d2[0]]= [d0[0],d1[0],d2[0]];
           }
         }
       }
       console.log("addressNow",addressNow);
       that.addressNow = addressNow;
       that.addressValueList = addressValueList;
       that.addressNameList = addressNameList;
       that.initData();
       
       console.timeEnd("ctime");
     },
     addressid:function(){
        this.initData();
     }
   },
    
    created(){
      let that = this;
      that.initValue();
      
      let url = this.addressDataUrl||"//src.davdian.com/data/region.1501055940.json";
      axios.get(url)
      .then(function(res){
        that.netData = res.data;
        that.addressPre = that.netData;
      })
      
    },
    
    data() {
      return {
        addressNow:[],
        addressValue: [],
        addressPre:[],
        addressNameList:[]
      }
    }
  }
</script>
<style scoped>
  .adressBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    max-width: 640px;
    background-color: rgba(251, 250, 250, 0.93);
    animation: g-pop-show-animation 0.5s;
  }

  .addressTitle {
    width: 100%;
    height: 44px;
    text-align: right;
    border-bottom: 1px solid rgba(153, 153, 153, 0.38);
    background-color: #FFFFFF;
  }

  .addressTitle span {
    font-size: 16px;
    background-color: rgba(255, 74, 125, 0.7);
    color: #FFF;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 9px;
    margin-right: 10px;
  }

  .g-pop {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    max-width: 640px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    transition: all 1s;
  }
  @keyframes g-pop-show-animation {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

</style>
