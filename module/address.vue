<template>
  <div>
    <div class="input_wrap">

      <select v-model='province' style="background-color: #eae9e9;">
        <option value="">请选择省</option>
        <option v-for="(item,index) in provinces" :value="item[0]">{{item[1]}}</option>
      </select>

      <select v-model='city' style="background-color: #eae9e9;">
        <option value="">请选择市</option>
        <option v-for="(item,index) in citys" :value="item[0]">{{item[1]}}</option>
      </select>

      <select v-model='county' style="background-color: #eae9e9;">
        <option value="">请选择区</option>
        <option v-for="(item,index) in countys" :value="item[0]">{{item[1]}}</option>
      </select>

    </div>
  </div>
</template>
<style>
</style>
<script>
  export default {
    data() {
      return {
        addressData: "",
        province: "",
        city: "",
        county: "",
      }
    },
    created() {
      this.getAddressData();
    },
    beforeUpdate() {
      this.initData();
    },
    props: {
      initprovince: {
        type: String,
        default: ''
      },
      initcity: {
        type: String,
        default: ''
      },
      initcounty: {
        type: String,
        default: ''
      }
    },
    watch: {
      province: function (val, oldval) {
        if (val !== oldval) {
          this.city = ''
        }
        this.$emit('change', 'province', val);
      },
      city: function (val, oldval) {
        if (val !== oldval) {
          this.county = ''
        }
        this.$emit('change', 'city', val);

      },
      county: function (val, oldval) {
        this.$emit('change', 'county', val);

      }
    },
    computed: {
      provinces: function () {
        return this.addressData
      },
      citys: function () {
        var that = this;
        if (!this.addressData || !this.province)
          return;

        var currentProvince = this.provinces.filter(function (x) {
          return x[0] == that.province;
        });

        return currentProvince[0][2]
      },
      countys: function () {
        var that = this;
        if (!this.addressData || !this.city)
          return;

        var currentCity = this.citys.filter(function (x) {
          return x[0] == that.city;
        });
        return currentCity[0][2]

      },
    },
    methods: {
      initData() {
        var that = this;
        that.province = that.initprovince;
        this.$nextTick(function () {
          // 代码保证 this.$el 在 document 中
          that.city = that.initcity;
          this.$nextTick(function () {
            // 代码保证 this.$el 在 document 中
            that.county = that.initcounty;
          })
        })


      },
      getAddressData() {
        var that = this;
        $.ajax({
          url: window.addressStaticDataUrl,
          data: {},
          dataType: "json",
          success: function (result) {
            that.addressData = result;
          }, error: function () {
            bravetime.removeLoader();
            bravetime.info("网络异常,数据获取失败");
          }
        });
      }
    }
  }
</script>
