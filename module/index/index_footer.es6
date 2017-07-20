export default{
    props: ['data'],
    data(){
        return{
            msg:'hello vue',
            page:window.tj_path
        }
    },
    computed:{
        active: function () {
            return this.data.active || 0
        },
        cart: function () {
            return this.data.cart || 0
        }
    },
    components:{
    }
}