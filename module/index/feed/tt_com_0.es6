import layout from "../layout.es6"
export default {
    data(){
        return {
            msg: 'hello vue',
        }
    },
    props:['data'],
    created:function () {

    },
    computed: {
        styleObject: function () {
            let scope = this;
            let bgColor = scope.data.title.bgColor;
            return {
                backgroundColor: "#" +
                bgColor.slice(2, 8)
            }
        },
        styleTop:function () {
            let scope = this;
            if(scope.data.body == undefined){
                return {
                    marginTop: scope.data.marginTop + 'px',
                    borderBottom:'none'
                }
            }
            if(scope.data.body.tplId == "bd_goods_2"){
                return {
                    marginTop:'0px'
                }
            }
        },
        show:function () {
            let scope = this;
            if(scope.data.title != undefined){
                if(scope.data.title.command != undefined){
                    if(scope.data.title.command.content != undefined){
                        return true;
                    }
                }
            }else {
                return false;
            }
        }
    },
    components: {

    },
    filter:{
        a:function () {
            if(this.data && this.data.title && this.data.title.btn && this.data.title.btn.name && this.data.title.btn.name == undefined){
                return true;
            }
        }
    },
    methods:{
        imgObject:function (imgSrc) {
            return{
                src: imgSrc || '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                error: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png',
                loading: '//pic.davdian.com/free/2016/12/28/519_360_fdc5daf1d2eab033a50af9f80246da60.png'
            }
        },
        clickAnalysis:function(e) {
            layout.clickAnalysis(e,this,'title');
        }
    }

}