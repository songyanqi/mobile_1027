/**
 *
 * create by dony in 2017.03.16
 */
import { CellBox, Cell, Group } from 'vux';

const GoodsParams = {
    components: {
        CellBox: CellBox,
        Group: Group,
        Cell: Cell,
    },
    props: ['goodsparamobj','isprompt','isapp'],
    data () {
        return {
            windowHeight: 0,
        }
    },
    mounted () {
        this.windowHeight = window.screen.height;
    },
    methods: {

    }
};

export default GoodsParams;
