import * as baseTitle from './baseTitle.vue';
export default {
    data(){
        return{
            phoneNumber:"",
            code:"",
            password:"",
            countdowning:false,
            time:60
        }
    },
    computed:{
        "all":function () {
            return this.phoneNumber.length&&this.code.length&&this.password.length
        }
    },
    methods:{
        testPhoneNumber(){
            let that = this;
            if(that.countdowning){
                return false;
            }
            if(!Units.isTel(that.phoneNumber)){
                bravetime.info("请输入正确的手机号");
                return false;
            }
            $.ajax({
                url:window.testPhoneNumberUrl,
                data:{
                    phoneNumber:this.phoneNumber
                },
                dataType:"json",
                success(result){
                    let {code,data,msg}=result;
                    bravetime.info(msg);
                    if(!code){
                        that.countdown();
                    }
                },error(){

                }
            })
        },
        countdown(){
            let that = this,timer;
            that.time=60;
            that.countdowning = true;
            timer = setInterval(function () {
                if(that.time>1){
                    that.time--;
                }else{
                    that.countdowning = false;
                    clearInterval(timer);
                }
            },1000);
        },
        submit(){
            let that = this;
            if(!that.all){
                return false;
            }
            $.ajax({
                url:window.submitUrl,
                data:{
                    phoneNumber:that.phoneNumber,
                    code:that.code,
                    password:that.password
                },
                dataType:"json",
                success(result){
                    let {code,msg} = result;
                    bravetime.info(msg);
                    if(!code){
                        bravetime.goto(window.dumpUrl);
                    }
                }
            });
        }
    },
    components:{
        baseTitle:baseTitle
    }
}