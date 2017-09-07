<!-- <template>
    <div>
        <div class="classification_wrap">
            <div v-for="(item, index) in list" class="classification clearfix mb_10">
                <ul class="classification_list">
                    <li>
                        <a  @click="dump(item.page_id,$event)">
                            <div>
                                <div class="classroom_imgss" v-if="item.page_type_id==1||item.page_type_id==2">
                                    <span class="playWhite" v-if="item.page_type_id==2"></span>
                                    <img :src="item.image">
                                </div>
                                <div class="img_container">
                                    <div class="img_container_inner" v-if="item.page_type_id==3||item.page_type_id==4">
                                        <img :src="item.image">
                                        <span class="playWhite2" v-if="item.page_type_id==3"></span>
                                    </div>
                                    <div :class="['classification_container','dav-small',item.page_type_id==3||item.page_type_id==4?'static_height':'p0']">
                                        <div class="classification_name" v-text="item.title"></div>
                                        <div class="classification_info">
                                            <span v-text="item.cat_name" v-if="!category"></span>
                                            <span class="strings" v-if="!category">|</span>
                                            <span>{{item.read_times}} 阅读数</span>
                                            <span class="strings" v-if="category">|</span>
                                            <span class="classification_date" v-text="item.ctime" v-if="category"></span>
                                            <span class="pull-right">
                                                <i :page-id="item.page_id" @click="praise(index)" :class="[item.has_been_like ? 'has_been_like' : 'not_point_praise',item.active_praise?'active_praise':'', 'point_praise']"></i>
                                                <i class="praise_num" v-text="item.thumb_up_num"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="refresh">
            <div v-if="hasMore" class="uil-default-css-normal"
                 style="-webkit-transform:scale(0.15);-moz-transform:scale(0.15);-webkit-transform-origin: 0 0;-moz-transform-origin: 0 0;width:30px;height: 30px;display: inline-block;">
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(0deg) translate(0,-60px);transform:rotate(0deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(30deg) translate(0,-60px);transform:rotate(30deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(60deg) translate(0,-60px);transform:rotate(60deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(90deg) translate(0,-60px);transform:rotate(90deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(120deg) translate(0,-60px);transform:rotate(120deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(150deg) translate(0,-60px);transform:rotate(150deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(180deg) translate(0,-60px);transform:rotate(180deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(210deg) translate(0,-60px);transform:rotate(210deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(240deg) translate(0,-60px);transform:rotate(240deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(270deg) translate(0,-60px);transform:rotate(270deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(300deg) translate(0,-60px);transform:rotate(300deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
                <div style="top:80px;left:93px;width:14px;height:40px;background:#333;-webkit-transform:rotate(330deg) translate(0,-60px);transform:rotate(330deg) translate(0,-60px);border-radius:10px;position:absolute;"></div>
            </div>
            <div v-if="hasMore">数据加载中...</div>
            <div v-else>没有更多</div>
        </div>
    </div>

</template> -->
<style>
.classification_list li .classification_container.p0{
    padding:0;
}

</style>
<script>
import * as bd_articles_1 from './component/bd_articles_1.vue'
import * as bd_articles_2 from './component/bd_articles_2.vue'
    export default{
        props: ['initList','hasMore','category'],
        data(){
            return{
                msg:'hello vue',
                list:this.initList,
                dev:location.href.indexOf("localhost")>-1
            }
        },
        watch:{
            initList:function(){
                this.list = this.initList;
            }
        },
        render: function (createElement) {
            var that = this;
            return createElement("section", this.list.map(function (item) {
                if(item.body != undefined){
                    return createElement(item.body.tplId, {
                        props:{
                        data: item
                      }
                    })
                }else if(item.body == undefined && item.title != undefined){
                    return createElement(item.title.tplId, {
                        props:{
                            data: item
                        },
                        on: {
                            refresh: that.refresh
                        }
                    })
                }
            }))
        },
        methods:{
            dump:function(page_id,event){
                var top = window.scrollY;
                if($(event.target).hasClass("point_praise")){

                }else{
                    if(this.dev){
                        bravetime.goto('./classroom_detail.html');
                    }else{
                        bravetime.goto('/class_detail-'+page_id+'.html');
                    }

                    this.$emit('top', top)
                }
            },
            praise(index){
                if(this.list[index]["has_been_like"]){
                        window.bravetime.info("您已经点过赞了");
                    }else{
                        this.send(+this.list[index].page_id);
                        if(window.is_login){
                            this.$emit('praise',index)
                        }
                    }

            },
            send(id){
                $.ajax({
                    url: window.praiseUrl,
                    dataType: "json",
                    data: {
                        id: id,
                        collect: 1
                    }, success: function (result) {
                        if (result["error"] == -1) {
                            window.nativeLoginFunction(result["url"]);
                        }
                    }, error: function () {
                        bravetime.ajaxError(36);
                    }
                });
            }
        },
        components:{
            bd_articles_1,
            bd_articles_2
        }
    }

</script>
