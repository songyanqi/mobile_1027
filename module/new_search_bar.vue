<template>
  <div>
    <div class="search_top clearfix">
      <a class="left_icon_container" @click="Nativeback">
        <span class="home_arrow"></span>
      </a>
      <form type="search" action="" target="nm_iframe" @submit="submits">
        <div class="search_con search_button april_border hairlines">
          <div class="border_inner"></div>
          <div class="search_input_con">
            <span class="search_icon"></span>
            <input type="search" name="q" :placeholder="placeholder" class="search_input"
                   v-model="search_input"
                   @input="searchLike" @keyup.enter="submits"
                   autocomplete="off">
            <input id="hiddenText" type="text" style="display:none"/>
          </div>
        </div>
        <a class="search_btn" data-dav-tj="" @click="submits">搜索</a>
      </form>
      <iframe name="nm_iframe" id="nm_iframe" style="display: none;"></iframe>
    </div>

  </div>
</template>

<style scoped>
  .search_top .search_con {
    padding-right: 54px;
    padding-left: 44px;
    height: 32px;
  }

  input[type="search"] {
    -webkit-appearance: none;
  }

  input::-webkit-search-cancel-button {
    display: none;
  }

  .search_top {
    position: relative;
    z-index: 2;
    background-color: #F0F0F0;
  }

  .search_top .search_con .search_input {
    color: #333333;
  }
</style>
<script>

  export default{
    data: function () {
      return {
        search_input: this.searchinput || '',
      }
    },
    props: ["placeholder", "searchinput"],
    components: {},
    mounted: function () {

    },
    methods: {
      // 输入时候向后台查询
      searchLike: function () {
        var scope = this;
        scope.$emit("transfersearchlike", scope.search_input);
      },
      //form提交或者点击搜索 通过子元素向父元素传递实现
      submits: function () {
        var scope = this;
        this.search_like = false;
        window.bravetime.tj.pvSend('search_search_input', scope.search_input);
        scope.$emit("transfersearchtext", scope.search_input);
      },
      searchs: function (msg) {
        var scope = this;
        scope.$emit("transfertsearchs2", msg);
        scope.search_like = false;
        scope.searchinput = msg;
      },
      Nativeback: function () {
        history.back();
      }
    },
    watch: {
      searchinput:function () {
        this.search_input = this.searchinput;
      }
    }
  }
</script>
