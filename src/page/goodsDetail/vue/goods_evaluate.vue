<template>
    <div v-if = "commentobj.commentList && commentobj.commentList.length"
         class = "goodsEvaluate">
        <group style = "padding: 0 10px;background: #fff;">
            <cell-box class = "evaluate_title"
                      @click.native = "handleComment"
                      >
                <span class = "evaluate_title_left">Ta 在说 <span style = "display: inline-block;margin-left: 3px;">({{ commentobj.commentNum }})</span></span>
                <span class = "evaluate_title_right" style = "-webkit-flex: 1;">好评率 <span style = "color: #FF4A7D;">{{ commentobj.commentRate }}%</span></span>
                <span class = "commentIcon"></span>
            </cell-box>
            <group
                    class = "evaluteCont"
                    :class = "{ evaluteFCont: index == 0,evaluteLCont: index == commentobj.commentList.length - 1 }"
                    v-for = '(item,index) in commentobj.commentList'>
                <cell
                        :title="item.commentUserName">
                    <img
                            slot="icon"
                            class = "eva_icon"
                            :src='item.commentUserAvatar'>
                    <div>
                        <span v-for = "item of Number(item.commentRate)">
                            <span class = "useStar"><span style = "display: none;">{{ item }}</span></span>
                        </span><span v-for = "item of item.commentUnRate">
                            <span class = "unUserStar"><span style = "display: none;">{{ item }}</span></span>
                        </span>
                    </div>
                </cell>
                <div class = "evalute_list">{{ item.commentInfo }}</div>
            </group>
        </group>
    </div>
</template>

<script>
    import GoodsEvaluate from './goods_evaluate.es6';
    export default GoodsEvaluate;
</script>
