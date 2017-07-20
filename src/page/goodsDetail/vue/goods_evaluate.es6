/**
 * create by dony in 2017.03.13
 **/
import { Group, Cell, CellBox } from 'vux';

const GoodsEvaluate = {
    components: {
        Group: Group,
        Cell: Cell,
        CellBox: CellBox,
    },
    data () {
        return {
        }
    },
    methods: {
        handleComment () {
            location.href = this.commentobj.commentUrl;
        }
    },
    props: ['commentobj'],
};
export default GoodsEvaluate;

