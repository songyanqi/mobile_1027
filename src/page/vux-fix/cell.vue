<template>
    <div class="weui-cell" :class="{'vux-tap-active': isLink || !!link, 'weui-cell_access': isLink || !!link}" @click="onClick">
        <div class="weui-cell__hd">
            <slot name="icon"></slot>
        </div>
        <div class="vux-cell-bd" :class="{'vux-cell-primary':primary==='title'}">
            <p>
                <label class="vux-label" :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title">{{title}}</label>
                <slot name="after-title"></slot>
            </p>
            <inline-desc v-html="inlineDesc"></inline-desc>
        </div>
        <div class="weui-cell__ft" :class="{'vux-cell-primary':primary==='content'}">
            {{value}}
      <slot name="value"></slot>
            <slot></slot>
        </div>
        <slot name="child"></slot>
    </div>
</template>

<script>
    import InlineDesc from '../../node_modules/vux/src/components/inline-desc'
    import { go } from '../../node_modules/vux/src/libs/router'

    export default {
        components: {
            InlineDesc
        },
        props: {
            title: String,
            value: [String, Number, Array],
            isLink: Boolean,
            inlineDesc: [String, Number],
            primary: {
                type: String,
                default: 'title'
            },
            link: {
                type: [String, Object]
            }
        },
        methods: {
            onClick () {
                go(this.link, this.$router)
            }
        }
    }
</script>

<style lang="less">
    @import '../../../node_modules/vux/src/styles/variable.less';
    @import '../../../node_modules/vux/src/styles/tap.less';
    @import '../../../node_modules/vux/src/styles/weui/base/mixin/setArrow.less';
    @import '../../../node_modules/vux/src/styles/weui/widget/weui_cell/weui_cell_global';

    .vux-cell-primary {
        flex: 1;
    }
    .vux-label {
        display: block;
        word-wrap: break-word;
        word-break: break-all;
    }
</style>
