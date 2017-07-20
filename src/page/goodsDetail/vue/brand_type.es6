import { Group, Cell, Panel } from 'vux';

const BrandType = {
    components: {
        Panel: Panel,
        Group: Group,
        Cell: Cell,
    },
    data () {
        return {
            brandType: '1',
        }
    },
    props: ['brandlist'],
    methods: {
    }
};
export default BrandType;
