<template>
  <div class="g-pop" v-show="showaddress.showaddress">
    <div class="adressBox" v-show="showaddress.showaddress">
      <div class="addressTitle"><span @click="confirm">确定</span></div>
      <picker :data='addressNow' :columns=3 v-model='addressValue' @on-change='change' ref="picker1"></picker>
    </div>
  </div>
</template>

<script>
  import {Picker} from 'vux';
  import axios from 'axios';
  export default {
    components: {
      Picker
    },
    methods: {
      change(value) {
        var that = this;
        that.addressValue = value;
        that.addressName = that.$refs.picker1.getNameValues();
      },
      confirm:function () {
        this.showaddress.showaddress = false;
        this.$emit('addressdata',{name:this.addressName,value:this.addressValue[2]});
      },
      initValue:function(){
        console.time("initValue");
        if(this.addressid){
          this.addressValue[2] = this.addressid+"";
          for(var i = 0,d=this.addressNow[i++];){
            if(d.value==this.addressValue[2]){
              this.addressValue[1] = d.parent;
              break;
            }
          }
          for(var i = 0,d=this.addressNow[i++];){
            if(d.value==this.addressValue[1]){
              this.addressValue[0] = d.parent;
              break;
            }
          }
        }
        
        console.timeEnd("initValue");
      }
    },
    props:['showaddress','addressid','addressDataUrl'],
    watch: {

    },
    /*
    created(){
      let that = this;
      let url = this.addressDataUrl||"https://src.davdian.com/data/region.1501055940.json";
      axios.get(url)
      .then(function(res){
        that.addressPre = res.data;
      })
    },
    */
    data() {
      return {
        addressNow: [
          {
            "value": "2",
            "name": "北京",
            "parent": 0
          },
          {
            "value": "52",
            "name": "北京",
            "parent": "2"
          },
          {
            "value": "500",
            "name": "东城区",
            "parent": "52"
          },
          {
            "value": "501",
            "name": "西城区",
            "parent": "52"
          },
          {
            "value": "502",
            "name": "海淀区",
            "parent": "52"
          },
          {
            "value": "503",
            "name": "朝阳区",
            "parent": "52"
          },
          {
            "value": "504",
            "name": "崇文区",
            "parent": "52"
          },
          {
            "value": "505",
            "name": "宣武区",
            "parent": "52"
          },
          {
            "value": "506",
            "name": "丰台区",
            "parent": "52"
          },
          {
            "value": "507",
            "name": "石景山区",
            "parent": "52"
          },
          {
            "value": "508",
            "name": "房山区",
            "parent": "52"
          },
          {
            "value": "509",
            "name": "门头沟区",
            "parent": "52"
          },
          {
            "value": "510",
            "name": "通州区",
            "parent": "52"
          },
          {
            "value": "511",
            "name": "顺义区",
            "parent": "52"
          },
          {
            "value": "512",
            "name": "昌平区",
            "parent": "52"
          },
          {
            "value": "513",
            "name": "怀柔区",
            "parent": "52"
          },
          {
            "value": "514",
            "name": "平谷区",
            "parent": "52"
          },
          {
            "value": "515",
            "name": "大兴区",
            "parent": "52"
          },
          {
            "value": "516",
            "name": "密云县",
            "parent": "52"
          },
          {
            "value": "517",
            "name": "延庆县",
            "parent": "52"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "52"
          },
          {
            "value": "3",
            "name": "安徽",
            "parent": 0
          },
          {
            "value": "36",
            "name": "安庆",
            "parent": "3"
          },
          {
            "value": "398",
            "name": "迎江区",
            "parent": "36"
          },
          {
            "value": "399",
            "name": "大观区",
            "parent": "36"
          },
          {
            "value": "400",
            "name": "宜秀区",
            "parent": "36"
          },
          {
            "value": "401",
            "name": "桐城市",
            "parent": "36"
          },
          {
            "value": "402",
            "name": "怀宁县",
            "parent": "36"
          },
          {
            "value": "403",
            "name": "枞阳县",
            "parent": "36"
          },
          {
            "value": "404",
            "name": "潜山县",
            "parent": "36"
          },
          {
            "value": "405",
            "name": "太湖县",
            "parent": "36"
          },
          {
            "value": "406",
            "name": "宿松县",
            "parent": "36"
          },
          {
            "value": "407",
            "name": "望江县",
            "parent": "36"
          },
          {
            "value": "408",
            "name": "岳西县",
            "parent": "36"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "36"
          },
          {
            "value": "37",
            "name": "蚌埠",
            "parent": "3"
          },
          {
            "value": "409",
            "name": "中市区",
            "parent": "37"
          },
          {
            "value": "410",
            "name": "东市区",
            "parent": "37"
          },
          {
            "value": "411",
            "name": "西市区",
            "parent": "37"
          },
          {
            "value": "412",
            "name": "郊区",
            "parent": "37"
          },
          {
            "value": "413",
            "name": "怀远县",
            "parent": "37"
          },
          {
            "value": "414",
            "name": "五河县",
            "parent": "37"
          },
          {
            "value": "415",
            "name": "固镇县",
            "parent": "37"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "37"
          },
          {
            "value": "38",
            "name": "巢湖",
            "parent": "3"
          },
          {
            "value": "416",
            "name": "居巢区",
            "parent": "38"
          },
          {
            "value": "417",
            "name": "庐江县",
            "parent": "38"
          },
          {
            "value": "420",
            "name": "和县",
            "parent": "38"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "38"
          },
          {
            "value": "39",
            "name": "池州",
            "parent": "3"
          },
          {
            "value": "421",
            "name": "贵池区",
            "parent": "39"
          },
          {
            "value": "422",
            "name": "东至县",
            "parent": "39"
          },
          {
            "value": "423",
            "name": "石台县",
            "parent": "39"
          },
          {
            "value": "424",
            "name": "青阳县",
            "parent": "39"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "39"
          },
          {
            "value": "40",
            "name": "滁州",
            "parent": "3"
          },
          {
            "value": "425",
            "name": "琅琊区",
            "parent": "40"
          },
          {
            "value": "426",
            "name": "南谯区",
            "parent": "40"
          },
          {
            "value": "427",
            "name": "天长市",
            "parent": "40"
          },
          {
            "value": "428",
            "name": "明光市",
            "parent": "40"
          },
          {
            "value": "429",
            "name": "来安县",
            "parent": "40"
          },
          {
            "value": "430",
            "name": "全椒县",
            "parent": "40"
          },
          {
            "value": "431",
            "name": "定远县",
            "parent": "40"
          },
          {
            "value": "432",
            "name": "凤阳县",
            "parent": "40"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "40"
          },
          {
            "value": "41",
            "name": "阜阳",
            "parent": "3"
          },
          {
            "value": "433",
            "name": "蚌山区",
            "parent": "41"
          },
          {
            "value": "434",
            "name": "龙子湖区",
            "parent": "41"
          },
          {
            "value": "435",
            "name": "禹会区",
            "parent": "41"
          },
          {
            "value": "436",
            "name": "淮上区",
            "parent": "41"
          },
          {
            "value": "437",
            "name": "颍州区",
            "parent": "41"
          },
          {
            "value": "438",
            "name": "颍东区",
            "parent": "41"
          },
          {
            "value": "439",
            "name": "颍泉区",
            "parent": "41"
          },
          {
            "value": "440",
            "name": "界首市",
            "parent": "41"
          },
          {
            "value": "441",
            "name": "临泉县",
            "parent": "41"
          },
          {
            "value": "442",
            "name": "太和县",
            "parent": "41"
          },
          {
            "value": "443",
            "name": "阜南县",
            "parent": "41"
          },
          {
            "value": "444",
            "name": "颖上县",
            "parent": "41"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "41"
          },
          {
            "value": "42",
            "name": "淮北",
            "parent": "3"
          },
          {
            "value": "445",
            "name": "相山区",
            "parent": "42"
          },
          {
            "value": "446",
            "name": "杜集区",
            "parent": "42"
          },
          {
            "value": "447",
            "name": "烈山区",
            "parent": "42"
          },
          {
            "value": "448",
            "name": "濉溪县",
            "parent": "42"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "42"
          },
          {
            "value": "43",
            "name": "淮南",
            "parent": "3"
          },
          {
            "value": "449",
            "name": "田家庵区",
            "parent": "43"
          },
          {
            "value": "450",
            "name": "大通区",
            "parent": "43"
          },
          {
            "value": "451",
            "name": "谢家集区",
            "parent": "43"
          },
          {
            "value": "452",
            "name": "八公山区",
            "parent": "43"
          },
          {
            "value": "453",
            "name": "潘集区",
            "parent": "43"
          },
          {
            "value": "454",
            "name": "凤台县",
            "parent": "43"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "43"
          },
          {
            "value": "44",
            "name": "黄山",
            "parent": "3"
          },
          {
            "value": "455",
            "name": "屯溪区",
            "parent": "44"
          },
          {
            "value": "456",
            "name": "黄山区",
            "parent": "44"
          },
          {
            "value": "457",
            "name": "徽州区",
            "parent": "44"
          },
          {
            "value": "458",
            "name": "歙县",
            "parent": "44"
          },
          {
            "value": "459",
            "name": "休宁县",
            "parent": "44"
          },
          {
            "value": "460",
            "name": "黟县",
            "parent": "44"
          },
          {
            "value": "461",
            "name": "祁门县",
            "parent": "44"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "44"
          },
          {
            "value": "45",
            "name": "六安",
            "parent": "3"
          },
          {
            "value": "462",
            "name": "金安区",
            "parent": "45"
          },
          {
            "value": "463",
            "name": "裕安区",
            "parent": "45"
          },
          {
            "value": "464",
            "name": "寿县",
            "parent": "45"
          },
          {
            "value": "465",
            "name": "霍邱县",
            "parent": "45"
          },
          {
            "value": "466",
            "name": "舒城县",
            "parent": "45"
          },
          {
            "value": "467",
            "name": "金寨县",
            "parent": "45"
          },
          {
            "value": "468",
            "name": "霍山县",
            "parent": "45"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "45"
          },
          {
            "value": "46",
            "name": "马鞍山",
            "parent": "3"
          },
          {
            "value": "469",
            "name": "雨山区",
            "parent": "46"
          },
          {
            "value": "470",
            "name": "花山区",
            "parent": "46"
          },
          {
            "value": "471",
            "name": "金家庄区",
            "parent": "46"
          },
          {
            "value": "472",
            "name": "当涂县",
            "parent": "46"
          },
          {
            "value": "3431",
            "name": "含山县",
            "parent": "46"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "46"
          },
          {
            "value": "47",
            "name": "宿州",
            "parent": "3"
          },
          {
            "value": "473",
            "name": "埇桥区",
            "parent": "47"
          },
          {
            "value": "474",
            "name": "砀山县",
            "parent": "47"
          },
          {
            "value": "475",
            "name": "萧县",
            "parent": "47"
          },
          {
            "value": "476",
            "name": "灵璧县",
            "parent": "47"
          },
          {
            "value": "477",
            "name": "泗县",
            "parent": "47"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "47"
          },
          {
            "value": "48",
            "name": "铜陵",
            "parent": "3"
          },
          {
            "value": "478",
            "name": "铜官山区",
            "parent": "48"
          },
          {
            "value": "479",
            "name": "狮子山区",
            "parent": "48"
          },
          {
            "value": "480",
            "name": "郊区",
            "parent": "48"
          },
          {
            "value": "481",
            "name": "铜陵县",
            "parent": "48"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "48"
          },
          {
            "value": "49",
            "name": "芜湖",
            "parent": "3"
          },
          {
            "value": "418",
            "name": "无为县",
            "parent": "49"
          },
          {
            "value": "482",
            "name": "镜湖区",
            "parent": "49"
          },
          {
            "value": "483",
            "name": "弋江区",
            "parent": "49"
          },
          {
            "value": "484",
            "name": "鸠江区",
            "parent": "49"
          },
          {
            "value": "485",
            "name": "三山区",
            "parent": "49"
          },
          {
            "value": "486",
            "name": "芜湖县",
            "parent": "49"
          },
          {
            "value": "487",
            "name": "繁昌县",
            "parent": "49"
          },
          {
            "value": "488",
            "name": "南陵县",
            "parent": "49"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "49"
          },
          {
            "value": "50",
            "name": "宣城",
            "parent": "3"
          },
          {
            "value": "489",
            "name": "宣州区",
            "parent": "50"
          },
          {
            "value": "490",
            "name": "宁国市",
            "parent": "50"
          },
          {
            "value": "491",
            "name": "郎溪县",
            "parent": "50"
          },
          {
            "value": "492",
            "name": "广德县",
            "parent": "50"
          },
          {
            "value": "493",
            "name": "泾县",
            "parent": "50"
          },
          {
            "value": "494",
            "name": "绩溪县",
            "parent": "50"
          },
          {
            "value": "495",
            "name": "旌德县",
            "parent": "50"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "50"
          },
          {
            "value": "51",
            "name": "亳州",
            "parent": "3"
          },
          {
            "value": "496",
            "name": "涡阳县",
            "parent": "51"
          },
          {
            "value": "497",
            "name": "蒙城县",
            "parent": "51"
          },
          {
            "value": "498",
            "name": "利辛县",
            "parent": "51"
          },
          {
            "value": "499",
            "name": "谯城区",
            "parent": "51"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "51"
          },
          {
            "value": "3401",
            "name": "合肥",
            "parent": "3"
          },
          {
            "value": "3402",
            "name": "庐阳区",
            "parent": "3401"
          },
          {
            "value": "3403",
            "name": "瑶海区",
            "parent": "3401"
          },
          {
            "value": "3404",
            "name": "蜀山区",
            "parent": "3401"
          },
          {
            "value": "3405",
            "name": "包河区",
            "parent": "3401"
          },
          {
            "value": "3406",
            "name": "长丰县",
            "parent": "3401"
          },
          {
            "value": "3407",
            "name": "肥东县",
            "parent": "3401"
          },
          {
            "value": "3408",
            "name": "肥西县",
            "parent": "3401"
          },
          {
            "value": "3430",
            "name": "经开区",
            "parent": "3401"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "3401"
          },
          {
            "value": "4",
            "name": "福建",
            "parent": 0
          },
          {
            "value": "53",
            "name": "福州",
            "parent": "4"
          },
          {
            "value": "518",
            "name": "鼓楼区",
            "parent": "53"
          },
          {
            "value": "519",
            "name": "台江区",
            "parent": "53"
          },
          {
            "value": "520",
            "name": "仓山区",
            "parent": "53"
          },
          {
            "value": "521",
            "name": "马尾区",
            "parent": "53"
          },
          {
            "value": "522",
            "name": "晋安区",
            "parent": "53"
          },
          {
            "value": "523",
            "name": "福清市",
            "parent": "53"
          },
          {
            "value": "524",
            "name": "长乐市",
            "parent": "53"
          },
          {
            "value": "525",
            "name": "闽侯县",
            "parent": "53"
          },
          {
            "value": "526",
            "name": "连江县",
            "parent": "53"
          },
          {
            "value": "527",
            "name": "罗源县",
            "parent": "53"
          },
          {
            "value": "528",
            "name": "闽清县",
            "parent": "53"
          },
          {
            "value": "529",
            "name": "永泰县",
            "parent": "53"
          },
          {
            "value": "530",
            "name": "平潭县",
            "parent": "53"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "53"
          },
          {
            "value": "54",
            "name": "龙岩",
            "parent": "4"
          },
          {
            "value": "531",
            "name": "新罗区",
            "parent": "54"
          },
          {
            "value": "532",
            "name": "漳平市",
            "parent": "54"
          },
          {
            "value": "533",
            "name": "长汀县",
            "parent": "54"
          },
          {
            "value": "534",
            "name": "永定县",
            "parent": "54"
          },
          {
            "value": "535",
            "name": "上杭县",
            "parent": "54"
          },
          {
            "value": "536",
            "name": "武平县",
            "parent": "54"
          },
          {
            "value": "537",
            "name": "连城县",
            "parent": "54"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "54"
          },
          {
            "value": "55",
            "name": "南平",
            "parent": "4"
          },
          {
            "value": "538",
            "name": "延平区",
            "parent": "55"
          },
          {
            "value": "539",
            "name": "邵武市",
            "parent": "55"
          },
          {
            "value": "540",
            "name": "武夷山市",
            "parent": "55"
          },
          {
            "value": "541",
            "name": "建瓯市",
            "parent": "55"
          },
          {
            "value": "542",
            "name": "建阳市",
            "parent": "55"
          },
          {
            "value": "543",
            "name": "顺昌县",
            "parent": "55"
          },
          {
            "value": "544",
            "name": "浦城县",
            "parent": "55"
          },
          {
            "value": "545",
            "name": "光泽县",
            "parent": "55"
          },
          {
            "value": "546",
            "name": "松溪县",
            "parent": "55"
          },
          {
            "value": "547",
            "name": "政和县",
            "parent": "55"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "55"
          },
          {
            "value": "56",
            "name": "宁德",
            "parent": "4"
          },
          {
            "value": "548",
            "name": "蕉城区",
            "parent": "56"
          },
          {
            "value": "549",
            "name": "福安市",
            "parent": "56"
          },
          {
            "value": "550",
            "name": "福鼎市",
            "parent": "56"
          },
          {
            "value": "551",
            "name": "霞浦县",
            "parent": "56"
          },
          {
            "value": "552",
            "name": "古田县",
            "parent": "56"
          },
          {
            "value": "553",
            "name": "屏南县",
            "parent": "56"
          },
          {
            "value": "554",
            "name": "寿宁县",
            "parent": "56"
          },
          {
            "value": "555",
            "name": "周宁县",
            "parent": "56"
          },
          {
            "value": "556",
            "name": "柘荣县",
            "parent": "56"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "56"
          },
          {
            "value": "57",
            "name": "莆田",
            "parent": "4"
          },
          {
            "value": "557",
            "name": "城厢区",
            "parent": "57"
          },
          {
            "value": "558",
            "name": "涵江区",
            "parent": "57"
          },
          {
            "value": "559",
            "name": "荔城区",
            "parent": "57"
          },
          {
            "value": "560",
            "name": "秀屿区",
            "parent": "57"
          },
          {
            "value": "561",
            "name": "仙游县",
            "parent": "57"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "57"
          },
          {
            "value": "58",
            "name": "泉州",
            "parent": "4"
          },
          {
            "value": "562",
            "name": "鲤城区",
            "parent": "58"
          },
          {
            "value": "563",
            "name": "丰泽区",
            "parent": "58"
          },
          {
            "value": "564",
            "name": "洛江区",
            "parent": "58"
          },
          {
            "value": "565",
            "name": "清濛开发区",
            "parent": "58"
          },
          {
            "value": "566",
            "name": "泉港区",
            "parent": "58"
          },
          {
            "value": "567",
            "name": "石狮市",
            "parent": "58"
          },
          {
            "value": "568",
            "name": "晋江市",
            "parent": "58"
          },
          {
            "value": "569",
            "name": "南安市",
            "parent": "58"
          },
          {
            "value": "570",
            "name": "惠安县",
            "parent": "58"
          },
          {
            "value": "571",
            "name": "安溪县",
            "parent": "58"
          },
          {
            "value": "572",
            "name": "永春县",
            "parent": "58"
          },
          {
            "value": "573",
            "name": "德化县",
            "parent": "58"
          },
          {
            "value": "574",
            "name": "金门县",
            "parent": "58"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "58"
          },
          {
            "value": "59",
            "name": "三明",
            "parent": "4"
          },
          {
            "value": "575",
            "name": "梅列区",
            "parent": "59"
          },
          {
            "value": "576",
            "name": "三元区",
            "parent": "59"
          },
          {
            "value": "577",
            "name": "永安市",
            "parent": "59"
          },
          {
            "value": "578",
            "name": "明溪县",
            "parent": "59"
          },
          {
            "value": "579",
            "name": "清流县",
            "parent": "59"
          },
          {
            "value": "580",
            "name": "宁化县",
            "parent": "59"
          },
          {
            "value": "581",
            "name": "大田县",
            "parent": "59"
          },
          {
            "value": "582",
            "name": "尤溪县",
            "parent": "59"
          },
          {
            "value": "583",
            "name": "沙县",
            "parent": "59"
          },
          {
            "value": "584",
            "name": "将乐县",
            "parent": "59"
          },
          {
            "value": "585",
            "name": "泰宁县",
            "parent": "59"
          },
          {
            "value": "586",
            "name": "建宁县",
            "parent": "59"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "59"
          },
          {
            "value": "60",
            "name": "厦门",
            "parent": "4"
          },
          {
            "value": "587",
            "name": "思明区",
            "parent": "60"
          },
          {
            "value": "588",
            "name": "海沧区",
            "parent": "60"
          },
          {
            "value": "589",
            "name": "湖里区",
            "parent": "60"
          },
          {
            "value": "590",
            "name": "集美区",
            "parent": "60"
          },
          {
            "value": "591",
            "name": "同安区",
            "parent": "60"
          },
          {
            "value": "592",
            "name": "翔安区",
            "parent": "60"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "60"
          },
          {
            "value": "61",
            "name": "漳州",
            "parent": "4"
          },
          {
            "value": "593",
            "name": "芗城区",
            "parent": "61"
          },
          {
            "value": "594",
            "name": "龙文区",
            "parent": "61"
          },
          {
            "value": "595",
            "name": "龙海市",
            "parent": "61"
          },
          {
            "value": "596",
            "name": "云霄县",
            "parent": "61"
          },
          {
            "value": "597",
            "name": "漳浦县",
            "parent": "61"
          },
          {
            "value": "598",
            "name": "诏安县",
            "parent": "61"
          },
          {
            "value": "599",
            "name": "长泰县",
            "parent": "61"
          },
          {
            "value": "600",
            "name": "东山县",
            "parent": "61"
          },
          {
            "value": "601",
            "name": "南靖县",
            "parent": "61"
          },
          {
            "value": "602",
            "name": "平和县",
            "parent": "61"
          },
          {
            "value": "603",
            "name": "华安县",
            "parent": "61"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "61"
          },
          {
            "value": "5",
            "name": "甘肃",
            "parent": 0
          },
          {
            "value": "62",
            "name": "兰州",
            "parent": "5"
          },
          {
            "value": "604",
            "name": "皋兰县",
            "parent": "62"
          },
          {
            "value": "605",
            "name": "城关区",
            "parent": "62"
          },
          {
            "value": "606",
            "name": "七里河区",
            "parent": "62"
          },
          {
            "value": "607",
            "name": "西固区",
            "parent": "62"
          },
          {
            "value": "608",
            "name": "安宁区",
            "parent": "62"
          },
          {
            "value": "609",
            "name": "红古区",
            "parent": "62"
          },
          {
            "value": "610",
            "name": "永登县",
            "parent": "62"
          },
          {
            "value": "611",
            "name": "榆中县",
            "parent": "62"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "62"
          },
          {
            "value": "63",
            "name": "白银",
            "parent": "5"
          },
          {
            "value": "612",
            "name": "白银区",
            "parent": "63"
          },
          {
            "value": "613",
            "name": "平川区",
            "parent": "63"
          },
          {
            "value": "614",
            "name": "会宁县",
            "parent": "63"
          },
          {
            "value": "615",
            "name": "景泰县",
            "parent": "63"
          },
          {
            "value": "616",
            "name": "靖远县",
            "parent": "63"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "63"
          },
          {
            "value": "64",
            "name": "定西",
            "parent": "5"
          },
          {
            "value": "617",
            "name": "临洮县",
            "parent": "64"
          },
          {
            "value": "618",
            "name": "陇西县",
            "parent": "64"
          },
          {
            "value": "619",
            "name": "通渭县",
            "parent": "64"
          },
          {
            "value": "620",
            "name": "渭源县",
            "parent": "64"
          },
          {
            "value": "621",
            "name": "漳县",
            "parent": "64"
          },
          {
            "value": "622",
            "name": "岷县",
            "parent": "64"
          },
          {
            "value": "623",
            "name": "安定区",
            "parent": "64"
          },
          {
            "value": "624",
            "name": "安定区",
            "parent": "64"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "64"
          },
          {
            "value": "65",
            "name": "甘南",
            "parent": "5"
          },
          {
            "value": "625",
            "name": "合作市",
            "parent": "65"
          },
          {
            "value": "626",
            "name": "临潭县",
            "parent": "65"
          },
          {
            "value": "627",
            "name": "卓尼县",
            "parent": "65"
          },
          {
            "value": "628",
            "name": "舟曲县",
            "parent": "65"
          },
          {
            "value": "629",
            "name": "迭部县",
            "parent": "65"
          },
          {
            "value": "630",
            "name": "玛曲县",
            "parent": "65"
          },
          {
            "value": "631",
            "name": "碌曲县",
            "parent": "65"
          },
          {
            "value": "632",
            "name": "夏河县",
            "parent": "65"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "65"
          },
          {
            "value": "66",
            "name": "嘉峪关",
            "parent": "5"
          },
          {
            "value": "633",
            "name": "嘉峪关市",
            "parent": "66"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "66"
          },
          {
            "value": "67",
            "name": "金昌",
            "parent": "5"
          },
          {
            "value": "634",
            "name": "金川区",
            "parent": "67"
          },
          {
            "value": "635",
            "name": "永昌县",
            "parent": "67"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "67"
          },
          {
            "value": "68",
            "name": "酒泉",
            "parent": "5"
          },
          {
            "value": "636",
            "name": "肃州区",
            "parent": "68"
          },
          {
            "value": "637",
            "name": "玉门市",
            "parent": "68"
          },
          {
            "value": "638",
            "name": "敦煌市",
            "parent": "68"
          },
          {
            "value": "639",
            "name": "金塔县",
            "parent": "68"
          },
          {
            "value": "640",
            "name": "瓜州县",
            "parent": "68"
          },
          {
            "value": "641",
            "name": "肃北",
            "parent": "68"
          },
          {
            "value": "642",
            "name": "阿克塞",
            "parent": "68"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "68"
          },
          {
            "value": "69",
            "name": "临夏",
            "parent": "5"
          },
          {
            "value": "643",
            "name": "临夏市",
            "parent": "69"
          },
          {
            "value": "644",
            "name": "临夏县",
            "parent": "69"
          },
          {
            "value": "645",
            "name": "康乐县",
            "parent": "69"
          },
          {
            "value": "646",
            "name": "永靖县",
            "parent": "69"
          },
          {
            "value": "647",
            "name": "广河县",
            "parent": "69"
          },
          {
            "value": "648",
            "name": "和政县",
            "parent": "69"
          },
          {
            "value": "649",
            "name": "东乡族自治县",
            "parent": "69"
          },
          {
            "value": "650",
            "name": "积石山",
            "parent": "69"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "69"
          },
          {
            "value": "70",
            "name": "陇南",
            "parent": "5"
          },
          {
            "value": "651",
            "name": "成县",
            "parent": "70"
          },
          {
            "value": "652",
            "name": "徽县",
            "parent": "70"
          },
          {
            "value": "653",
            "name": "康县",
            "parent": "70"
          },
          {
            "value": "654",
            "name": "礼县",
            "parent": "70"
          },
          {
            "value": "655",
            "name": "两当县",
            "parent": "70"
          },
          {
            "value": "656",
            "name": "文县",
            "parent": "70"
          },
          {
            "value": "657",
            "name": "西和县",
            "parent": "70"
          },
          {
            "value": "658",
            "name": "宕昌县",
            "parent": "70"
          },
          {
            "value": "659",
            "name": "武都区",
            "parent": "70"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "70"
          },
          {
            "value": "71",
            "name": "平凉",
            "parent": "5"
          },
          {
            "value": "660",
            "name": "崇信县",
            "parent": "71"
          },
          {
            "value": "661",
            "name": "华亭县",
            "parent": "71"
          },
          {
            "value": "662",
            "name": "静宁县",
            "parent": "71"
          },
          {
            "value": "663",
            "name": "灵台县",
            "parent": "71"
          },
          {
            "value": "664",
            "name": "崆峒区",
            "parent": "71"
          },
          {
            "value": "665",
            "name": "庄浪县",
            "parent": "71"
          },
          {
            "value": "666",
            "name": "泾川县",
            "parent": "71"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "71"
          },
          {
            "value": "72",
            "name": "庆阳",
            "parent": "5"
          },
          {
            "value": "667",
            "name": "合水县",
            "parent": "72"
          },
          {
            "value": "668",
            "name": "华池县",
            "parent": "72"
          },
          {
            "value": "669",
            "name": "环县",
            "parent": "72"
          },
          {
            "value": "670",
            "name": "宁县",
            "parent": "72"
          },
          {
            "value": "671",
            "name": "庆城县",
            "parent": "72"
          },
          {
            "value": "672",
            "name": "西峰区",
            "parent": "72"
          },
          {
            "value": "673",
            "name": "镇原县",
            "parent": "72"
          },
          {
            "value": "674",
            "name": "正宁县",
            "parent": "72"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "72"
          },
          {
            "value": "73",
            "name": "天水",
            "parent": "5"
          },
          {
            "value": "675",
            "name": "甘谷县",
            "parent": "73"
          },
          {
            "value": "676",
            "name": "秦安县",
            "parent": "73"
          },
          {
            "value": "677",
            "name": "清水县",
            "parent": "73"
          },
          {
            "value": "678",
            "name": "秦州区",
            "parent": "73"
          },
          {
            "value": "679",
            "name": "麦积区",
            "parent": "73"
          },
          {
            "value": "680",
            "name": "武山县",
            "parent": "73"
          },
          {
            "value": "681",
            "name": "张家川",
            "parent": "73"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "73"
          },
          {
            "value": "74",
            "name": "武威",
            "parent": "5"
          },
          {
            "value": "682",
            "name": "古浪县",
            "parent": "74"
          },
          {
            "value": "683",
            "name": "民勤县",
            "parent": "74"
          },
          {
            "value": "684",
            "name": "天祝",
            "parent": "74"
          },
          {
            "value": "685",
            "name": "凉州区",
            "parent": "74"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "74"
          },
          {
            "value": "75",
            "name": "张掖",
            "parent": "5"
          },
          {
            "value": "686",
            "name": "高台县",
            "parent": "75"
          },
          {
            "value": "687",
            "name": "临泽县",
            "parent": "75"
          },
          {
            "value": "688",
            "name": "民乐县",
            "parent": "75"
          },
          {
            "value": "689",
            "name": "山丹县",
            "parent": "75"
          },
          {
            "value": "690",
            "name": "肃南",
            "parent": "75"
          },
          {
            "value": "691",
            "name": "甘州区",
            "parent": "75"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "75"
          },
          {
            "value": "6",
            "name": "广东",
            "parent": 0
          },
          {
            "value": "76",
            "name": "广州",
            "parent": "6"
          },
          {
            "value": "692",
            "name": "从化市",
            "parent": "76"
          },
          {
            "value": "693",
            "name": "天河区",
            "parent": "76"
          },
          {
            "value": "694",
            "name": "东山区",
            "parent": "76"
          },
          {
            "value": "695",
            "name": "白云区",
            "parent": "76"
          },
          {
            "value": "696",
            "name": "海珠区",
            "parent": "76"
          },
          {
            "value": "697",
            "name": "荔湾区",
            "parent": "76"
          },
          {
            "value": "698",
            "name": "越秀区",
            "parent": "76"
          },
          {
            "value": "699",
            "name": "黄埔区",
            "parent": "76"
          },
          {
            "value": "700",
            "name": "番禺区",
            "parent": "76"
          },
          {
            "value": "701",
            "name": "花都区",
            "parent": "76"
          },
          {
            "value": "702",
            "name": "增城区",
            "parent": "76"
          },
          {
            "value": "703",
            "name": "从化区",
            "parent": "76"
          },
          {
            "value": "704",
            "name": "市郊",
            "parent": "76"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "76"
          },
          {
            "value": "77",
            "name": "深圳",
            "parent": "6"
          },
          {
            "value": "705",
            "name": "福田区",
            "parent": "77"
          },
          {
            "value": "706",
            "name": "罗湖区",
            "parent": "77"
          },
          {
            "value": "707",
            "name": "南山区",
            "parent": "77"
          },
          {
            "value": "708",
            "name": "宝安区",
            "parent": "77"
          },
          {
            "value": "709",
            "name": "龙岗区",
            "parent": "77"
          },
          {
            "value": "710",
            "name": "盐田区",
            "parent": "77"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "77"
          },
          {
            "value": "78",
            "name": "潮州",
            "parent": "6"
          },
          {
            "value": "711",
            "name": "湘桥区",
            "parent": "78"
          },
          {
            "value": "712",
            "name": "潮安县",
            "parent": "78"
          },
          {
            "value": "713",
            "name": "饶平县",
            "parent": "78"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "78"
          },
          {
            "value": "79",
            "name": "东莞",
            "parent": "6"
          },
          {
            "value": "714",
            "name": "南城区",
            "parent": "79"
          },
          {
            "value": "715",
            "name": "东城区",
            "parent": "79"
          },
          {
            "value": "716",
            "name": "万江区",
            "parent": "79"
          },
          {
            "value": "717",
            "name": "莞城区",
            "parent": "79"
          },
          {
            "value": "718",
            "name": "石龙镇",
            "parent": "79"
          },
          {
            "value": "719",
            "name": "虎门镇",
            "parent": "79"
          },
          {
            "value": "720",
            "name": "麻涌镇",
            "parent": "79"
          },
          {
            "value": "721",
            "name": "道滘镇",
            "parent": "79"
          },
          {
            "value": "722",
            "name": "石碣镇",
            "parent": "79"
          },
          {
            "value": "723",
            "name": "沙田镇",
            "parent": "79"
          },
          {
            "value": "724",
            "name": "望牛墩镇",
            "parent": "79"
          },
          {
            "value": "725",
            "name": "洪梅镇",
            "parent": "79"
          },
          {
            "value": "726",
            "name": "茶山镇",
            "parent": "79"
          },
          {
            "value": "727",
            "name": "寮步镇",
            "parent": "79"
          },
          {
            "value": "728",
            "name": "大岭山镇",
            "parent": "79"
          },
          {
            "value": "729",
            "name": "大朗镇",
            "parent": "79"
          },
          {
            "value": "730",
            "name": "黄江镇",
            "parent": "79"
          },
          {
            "value": "731",
            "name": "樟木头",
            "parent": "79"
          },
          {
            "value": "732",
            "name": "凤岗镇",
            "parent": "79"
          },
          {
            "value": "733",
            "name": "塘厦镇",
            "parent": "79"
          },
          {
            "value": "734",
            "name": "谢岗镇",
            "parent": "79"
          },
          {
            "value": "735",
            "name": "厚街镇",
            "parent": "79"
          },
          {
            "value": "736",
            "name": "清溪镇",
            "parent": "79"
          },
          {
            "value": "737",
            "name": "常平镇",
            "parent": "79"
          },
          {
            "value": "738",
            "name": "桥头镇",
            "parent": "79"
          },
          {
            "value": "739",
            "name": "横沥镇",
            "parent": "79"
          },
          {
            "value": "740",
            "name": "东坑镇",
            "parent": "79"
          },
          {
            "value": "741",
            "name": "企石镇",
            "parent": "79"
          },
          {
            "value": "742",
            "name": "石排镇",
            "parent": "79"
          },
          {
            "value": "743",
            "name": "长安镇",
            "parent": "79"
          },
          {
            "value": "744",
            "name": "中堂镇",
            "parent": "79"
          },
          {
            "value": "745",
            "name": "高埗镇",
            "parent": "79"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "79"
          },
          {
            "value": "80",
            "name": "佛山",
            "parent": "6"
          },
          {
            "value": "746",
            "name": "禅城区",
            "parent": "80"
          },
          {
            "value": "747",
            "name": "南海区",
            "parent": "80"
          },
          {
            "value": "748",
            "name": "顺德区",
            "parent": "80"
          },
          {
            "value": "749",
            "name": "三水区",
            "parent": "80"
          },
          {
            "value": "750",
            "name": "高明区",
            "parent": "80"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "80"
          },
          {
            "value": "81",
            "name": "河源",
            "parent": "6"
          },
          {
            "value": "751",
            "name": "东源县",
            "parent": "81"
          },
          {
            "value": "752",
            "name": "和平县",
            "parent": "81"
          },
          {
            "value": "753",
            "name": "源城区",
            "parent": "81"
          },
          {
            "value": "754",
            "name": "连平县",
            "parent": "81"
          },
          {
            "value": "755",
            "name": "龙川县",
            "parent": "81"
          },
          {
            "value": "756",
            "name": "紫金县",
            "parent": "81"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "81"
          },
          {
            "value": "82",
            "name": "惠州",
            "parent": "6"
          },
          {
            "value": "757",
            "name": "惠阳区",
            "parent": "82"
          },
          {
            "value": "758",
            "name": "惠城区",
            "parent": "82"
          },
          {
            "value": "759",
            "name": "大亚湾",
            "parent": "82"
          },
          {
            "value": "760",
            "name": "博罗县",
            "parent": "82"
          },
          {
            "value": "761",
            "name": "惠东县",
            "parent": "82"
          },
          {
            "value": "762",
            "name": "龙门县",
            "parent": "82"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "82"
          },
          {
            "value": "83",
            "name": "江门",
            "parent": "6"
          },
          {
            "value": "763",
            "name": "江海区",
            "parent": "83"
          },
          {
            "value": "764",
            "name": "蓬江区",
            "parent": "83"
          },
          {
            "value": "765",
            "name": "新会区",
            "parent": "83"
          },
          {
            "value": "766",
            "name": "台山市",
            "parent": "83"
          },
          {
            "value": "767",
            "name": "开平市",
            "parent": "83"
          },
          {
            "value": "768",
            "name": "鹤山市",
            "parent": "83"
          },
          {
            "value": "769",
            "name": "恩平市",
            "parent": "83"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "83"
          },
          {
            "value": "84",
            "name": "揭阳",
            "parent": "6"
          },
          {
            "value": "770",
            "name": "榕城区",
            "parent": "84"
          },
          {
            "value": "771",
            "name": "普宁市",
            "parent": "84"
          },
          {
            "value": "772",
            "name": "揭东县",
            "parent": "84"
          },
          {
            "value": "773",
            "name": "揭西县",
            "parent": "84"
          },
          {
            "value": "774",
            "name": "惠来县",
            "parent": "84"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "84"
          },
          {
            "value": "85",
            "name": "茂名",
            "parent": "6"
          },
          {
            "value": "775",
            "name": "茂南区",
            "parent": "85"
          },
          {
            "value": "776",
            "name": "茂港区",
            "parent": "85"
          },
          {
            "value": "777",
            "name": "高州市",
            "parent": "85"
          },
          {
            "value": "778",
            "name": "化州市",
            "parent": "85"
          },
          {
            "value": "779",
            "name": "信宜市",
            "parent": "85"
          },
          {
            "value": "780",
            "name": "电白县",
            "parent": "85"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "85"
          },
          {
            "value": "86",
            "name": "梅州",
            "parent": "6"
          },
          {
            "value": "781",
            "name": "梅县",
            "parent": "86"
          },
          {
            "value": "782",
            "name": "梅江区",
            "parent": "86"
          },
          {
            "value": "783",
            "name": "兴宁市",
            "parent": "86"
          },
          {
            "value": "784",
            "name": "大埔县",
            "parent": "86"
          },
          {
            "value": "785",
            "name": "丰顺县",
            "parent": "86"
          },
          {
            "value": "786",
            "name": "五华县",
            "parent": "86"
          },
          {
            "value": "787",
            "name": "平远县",
            "parent": "86"
          },
          {
            "value": "788",
            "name": "蕉岭县",
            "parent": "86"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "86"
          },
          {
            "value": "87",
            "name": "清远",
            "parent": "6"
          },
          {
            "value": "789",
            "name": "清城区",
            "parent": "87"
          },
          {
            "value": "790",
            "name": "英德市",
            "parent": "87"
          },
          {
            "value": "791",
            "name": "连州市",
            "parent": "87"
          },
          {
            "value": "792",
            "name": "佛冈县",
            "parent": "87"
          },
          {
            "value": "793",
            "name": "阳山县",
            "parent": "87"
          },
          {
            "value": "794",
            "name": "清新县",
            "parent": "87"
          },
          {
            "value": "795",
            "name": "连山",
            "parent": "87"
          },
          {
            "value": "796",
            "name": "连南",
            "parent": "87"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "87"
          },
          {
            "value": "88",
            "name": "汕头",
            "parent": "6"
          },
          {
            "value": "797",
            "name": "南澳县",
            "parent": "88"
          },
          {
            "value": "798",
            "name": "潮阳区",
            "parent": "88"
          },
          {
            "value": "799",
            "name": "澄海区",
            "parent": "88"
          },
          {
            "value": "800",
            "name": "龙湖区",
            "parent": "88"
          },
          {
            "value": "801",
            "name": "金平区",
            "parent": "88"
          },
          {
            "value": "802",
            "name": "濠江区",
            "parent": "88"
          },
          {
            "value": "803",
            "name": "潮南区",
            "parent": "88"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "88"
          },
          {
            "value": "89",
            "name": "汕尾",
            "parent": "6"
          },
          {
            "value": "804",
            "name": "城区",
            "parent": "89"
          },
          {
            "value": "805",
            "name": "陆丰市",
            "parent": "89"
          },
          {
            "value": "806",
            "name": "海丰县",
            "parent": "89"
          },
          {
            "value": "807",
            "name": "陆河县",
            "parent": "89"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "89"
          },
          {
            "value": "90",
            "name": "韶关",
            "parent": "6"
          },
          {
            "value": "808",
            "name": "曲江县",
            "parent": "90"
          },
          {
            "value": "809",
            "name": "浈江区",
            "parent": "90"
          },
          {
            "value": "810",
            "name": "武江区",
            "parent": "90"
          },
          {
            "value": "811",
            "name": "曲江区",
            "parent": "90"
          },
          {
            "value": "812",
            "name": "乐昌市",
            "parent": "90"
          },
          {
            "value": "813",
            "name": "南雄市",
            "parent": "90"
          },
          {
            "value": "814",
            "name": "始兴县",
            "parent": "90"
          },
          {
            "value": "815",
            "name": "仁化县",
            "parent": "90"
          },
          {
            "value": "816",
            "name": "翁源县",
            "parent": "90"
          },
          {
            "value": "817",
            "name": "新丰县",
            "parent": "90"
          },
          {
            "value": "818",
            "name": "乳源",
            "parent": "90"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "90"
          },
          {
            "value": "91",
            "name": "阳江",
            "parent": "6"
          },
          {
            "value": "819",
            "name": "江城区",
            "parent": "91"
          },
          {
            "value": "820",
            "name": "阳春市",
            "parent": "91"
          },
          {
            "value": "821",
            "name": "阳西县",
            "parent": "91"
          },
          {
            "value": "822",
            "name": "阳东县",
            "parent": "91"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "91"
          },
          {
            "value": "92",
            "name": "云浮",
            "parent": "6"
          },
          {
            "value": "823",
            "name": "云城区",
            "parent": "92"
          },
          {
            "value": "824",
            "name": "罗定市",
            "parent": "92"
          },
          {
            "value": "825",
            "name": "新兴县",
            "parent": "92"
          },
          {
            "value": "826",
            "name": "郁南县",
            "parent": "92"
          },
          {
            "value": "827",
            "name": "云安县",
            "parent": "92"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "92"
          },
          {
            "value": "93",
            "name": "湛江",
            "parent": "6"
          },
          {
            "value": "828",
            "name": "赤坎区",
            "parent": "93"
          },
          {
            "value": "829",
            "name": "霞山区",
            "parent": "93"
          },
          {
            "value": "830",
            "name": "坡头区",
            "parent": "93"
          },
          {
            "value": "831",
            "name": "麻章区",
            "parent": "93"
          },
          {
            "value": "832",
            "name": "廉江市",
            "parent": "93"
          },
          {
            "value": "833",
            "name": "雷州市",
            "parent": "93"
          },
          {
            "value": "834",
            "name": "吴川市",
            "parent": "93"
          },
          {
            "value": "835",
            "name": "遂溪县",
            "parent": "93"
          },
          {
            "value": "836",
            "name": "徐闻县",
            "parent": "93"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "93"
          },
          {
            "value": "94",
            "name": "肇庆",
            "parent": "6"
          },
          {
            "value": "837",
            "name": "肇庆市",
            "parent": "94"
          },
          {
            "value": "838",
            "name": "高要市",
            "parent": "94"
          },
          {
            "value": "839",
            "name": "四会市",
            "parent": "94"
          },
          {
            "value": "840",
            "name": "广宁县",
            "parent": "94"
          },
          {
            "value": "841",
            "name": "怀集县",
            "parent": "94"
          },
          {
            "value": "842",
            "name": "封开县",
            "parent": "94"
          },
          {
            "value": "843",
            "name": "德庆县",
            "parent": "94"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "94"
          },
          {
            "value": "95",
            "name": "中山",
            "parent": "6"
          },
          {
            "value": "844",
            "name": "石岐街道",
            "parent": "95"
          },
          {
            "value": "845",
            "name": "东区街道",
            "parent": "95"
          },
          {
            "value": "846",
            "name": "西区街道",
            "parent": "95"
          },
          {
            "value": "847",
            "name": "环城街道",
            "parent": "95"
          },
          {
            "value": "848",
            "name": "中山港街道",
            "parent": "95"
          },
          {
            "value": "849",
            "name": "五桂山街道",
            "parent": "95"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "95"
          },
          {
            "value": "96",
            "name": "珠海",
            "parent": "6"
          },
          {
            "value": "850",
            "name": "香洲区",
            "parent": "96"
          },
          {
            "value": "851",
            "name": "斗门区",
            "parent": "96"
          },
          {
            "value": "852",
            "name": "金湾区",
            "parent": "96"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "96"
          },
          {
            "value": "7",
            "name": "广西",
            "parent": 0
          },
          {
            "value": "97",
            "name": "南宁",
            "parent": "7"
          },
          {
            "value": "853",
            "name": "邕宁区",
            "parent": "97"
          },
          {
            "value": "854",
            "name": "青秀区",
            "parent": "97"
          },
          {
            "value": "855",
            "name": "兴宁区",
            "parent": "97"
          },
          {
            "value": "856",
            "name": "良庆区",
            "parent": "97"
          },
          {
            "value": "857",
            "name": "西乡塘区",
            "parent": "97"
          },
          {
            "value": "858",
            "name": "江南区",
            "parent": "97"
          },
          {
            "value": "859",
            "name": "武鸣县",
            "parent": "97"
          },
          {
            "value": "860",
            "name": "隆安县",
            "parent": "97"
          },
          {
            "value": "861",
            "name": "马山县",
            "parent": "97"
          },
          {
            "value": "862",
            "name": "上林县",
            "parent": "97"
          },
          {
            "value": "863",
            "name": "宾阳县",
            "parent": "97"
          },
          {
            "value": "864",
            "name": "横县",
            "parent": "97"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "97"
          },
          {
            "value": "98",
            "name": "桂林",
            "parent": "7"
          },
          {
            "value": "865",
            "name": "秀峰区",
            "parent": "98"
          },
          {
            "value": "866",
            "name": "叠彩区",
            "parent": "98"
          },
          {
            "value": "867",
            "name": "象山区",
            "parent": "98"
          },
          {
            "value": "868",
            "name": "七星区",
            "parent": "98"
          },
          {
            "value": "869",
            "name": "雁山区",
            "parent": "98"
          },
          {
            "value": "870",
            "name": "阳朔县",
            "parent": "98"
          },
          {
            "value": "871",
            "name": "临桂县",
            "parent": "98"
          },
          {
            "value": "872",
            "name": "灵川县",
            "parent": "98"
          },
          {
            "value": "873",
            "name": "全州县",
            "parent": "98"
          },
          {
            "value": "874",
            "name": "平乐县",
            "parent": "98"
          },
          {
            "value": "875",
            "name": "兴安县",
            "parent": "98"
          },
          {
            "value": "876",
            "name": "灌阳县",
            "parent": "98"
          },
          {
            "value": "877",
            "name": "荔浦县",
            "parent": "98"
          },
          {
            "value": "878",
            "name": "资源县",
            "parent": "98"
          },
          {
            "value": "879",
            "name": "永福县",
            "parent": "98"
          },
          {
            "value": "880",
            "name": "龙胜",
            "parent": "98"
          },
          {
            "value": "881",
            "name": "恭城",
            "parent": "98"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "98"
          },
          {
            "value": "99",
            "name": "百色",
            "parent": "7"
          },
          {
            "value": "882",
            "name": "右江区",
            "parent": "99"
          },
          {
            "value": "883",
            "name": "凌云县",
            "parent": "99"
          },
          {
            "value": "884",
            "name": "平果县",
            "parent": "99"
          },
          {
            "value": "885",
            "name": "西林县",
            "parent": "99"
          },
          {
            "value": "886",
            "name": "乐业县",
            "parent": "99"
          },
          {
            "value": "887",
            "name": "德保县",
            "parent": "99"
          },
          {
            "value": "888",
            "name": "田林县",
            "parent": "99"
          },
          {
            "value": "889",
            "name": "田阳县",
            "parent": "99"
          },
          {
            "value": "890",
            "name": "靖西县",
            "parent": "99"
          },
          {
            "value": "891",
            "name": "田东县",
            "parent": "99"
          },
          {
            "value": "892",
            "name": "那坡县",
            "parent": "99"
          },
          {
            "value": "893",
            "name": "隆林",
            "parent": "99"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "99"
          },
          {
            "value": "100",
            "name": "北海",
            "parent": "7"
          },
          {
            "value": "894",
            "name": "海城区",
            "parent": "100"
          },
          {
            "value": "895",
            "name": "银海区",
            "parent": "100"
          },
          {
            "value": "896",
            "name": "铁山港区",
            "parent": "100"
          },
          {
            "value": "897",
            "name": "合浦县",
            "parent": "100"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "100"
          },
          {
            "value": "101",
            "name": "崇左",
            "parent": "7"
          },
          {
            "value": "898",
            "name": "江州区",
            "parent": "101"
          },
          {
            "value": "899",
            "name": "凭祥市",
            "parent": "101"
          },
          {
            "value": "900",
            "name": "宁明县",
            "parent": "101"
          },
          {
            "value": "901",
            "name": "扶绥县",
            "parent": "101"
          },
          {
            "value": "902",
            "name": "龙州县",
            "parent": "101"
          },
          {
            "value": "903",
            "name": "大新县",
            "parent": "101"
          },
          {
            "value": "904",
            "name": "天等县",
            "parent": "101"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "101"
          },
          {
            "value": "102",
            "name": "防城港",
            "parent": "7"
          },
          {
            "value": "905",
            "name": "港口区",
            "parent": "102"
          },
          {
            "value": "906",
            "name": "防城区",
            "parent": "102"
          },
          {
            "value": "907",
            "name": "东兴市",
            "parent": "102"
          },
          {
            "value": "908",
            "name": "上思县",
            "parent": "102"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "102"
          },
          {
            "value": "103",
            "name": "贵港",
            "parent": "7"
          },
          {
            "value": "909",
            "name": "港北区",
            "parent": "103"
          },
          {
            "value": "910",
            "name": "港南区",
            "parent": "103"
          },
          {
            "value": "911",
            "name": "覃塘区",
            "parent": "103"
          },
          {
            "value": "912",
            "name": "桂平市",
            "parent": "103"
          },
          {
            "value": "913",
            "name": "平南县",
            "parent": "103"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "103"
          },
          {
            "value": "104",
            "name": "河池",
            "parent": "7"
          },
          {
            "value": "914",
            "name": "金城江区",
            "parent": "104"
          },
          {
            "value": "915",
            "name": "宜州市",
            "parent": "104"
          },
          {
            "value": "916",
            "name": "天峨县",
            "parent": "104"
          },
          {
            "value": "917",
            "name": "凤山县",
            "parent": "104"
          },
          {
            "value": "918",
            "name": "南丹县",
            "parent": "104"
          },
          {
            "value": "919",
            "name": "东兰县",
            "parent": "104"
          },
          {
            "value": "920",
            "name": "都安",
            "parent": "104"
          },
          {
            "value": "921",
            "name": "罗城",
            "parent": "104"
          },
          {
            "value": "922",
            "name": "巴马",
            "parent": "104"
          },
          {
            "value": "923",
            "name": "环江",
            "parent": "104"
          },
          {
            "value": "924",
            "name": "大化",
            "parent": "104"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "104"
          },
          {
            "value": "105",
            "name": "贺州",
            "parent": "7"
          },
          {
            "value": "925",
            "name": "八步区",
            "parent": "105"
          },
          {
            "value": "926",
            "name": "钟山县",
            "parent": "105"
          },
          {
            "value": "927",
            "name": "昭平县",
            "parent": "105"
          },
          {
            "value": "928",
            "name": "富川",
            "parent": "105"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "105"
          },
          {
            "value": "106",
            "name": "来宾",
            "parent": "7"
          },
          {
            "value": "929",
            "name": "兴宾区",
            "parent": "106"
          },
          {
            "value": "930",
            "name": "合山市",
            "parent": "106"
          },
          {
            "value": "931",
            "name": "象州县",
            "parent": "106"
          },
          {
            "value": "932",
            "name": "武宣县",
            "parent": "106"
          },
          {
            "value": "933",
            "name": "忻城县",
            "parent": "106"
          },
          {
            "value": "934",
            "name": "金秀",
            "parent": "106"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "106"
          },
          {
            "value": "107",
            "name": "柳州",
            "parent": "7"
          },
          {
            "value": "935",
            "name": "城中区",
            "parent": "107"
          },
          {
            "value": "936",
            "name": "鱼峰区",
            "parent": "107"
          },
          {
            "value": "937",
            "name": "柳北区",
            "parent": "107"
          },
          {
            "value": "938",
            "name": "柳南区",
            "parent": "107"
          },
          {
            "value": "939",
            "name": "柳江县",
            "parent": "107"
          },
          {
            "value": "940",
            "name": "柳城县",
            "parent": "107"
          },
          {
            "value": "941",
            "name": "鹿寨县",
            "parent": "107"
          },
          {
            "value": "942",
            "name": "融安县",
            "parent": "107"
          },
          {
            "value": "943",
            "name": "融水",
            "parent": "107"
          },
          {
            "value": "944",
            "name": "三江",
            "parent": "107"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "107"
          },
          {
            "value": "108",
            "name": "钦州",
            "parent": "7"
          },
          {
            "value": "945",
            "name": "钦南区",
            "parent": "108"
          },
          {
            "value": "946",
            "name": "钦北区",
            "parent": "108"
          },
          {
            "value": "947",
            "name": "灵山县",
            "parent": "108"
          },
          {
            "value": "948",
            "name": "浦北县",
            "parent": "108"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "108"
          },
          {
            "value": "109",
            "name": "梧州",
            "parent": "7"
          },
          {
            "value": "949",
            "name": "万秀区",
            "parent": "109"
          },
          {
            "value": "950",
            "name": "蝶山区",
            "parent": "109"
          },
          {
            "value": "951",
            "name": "长洲区",
            "parent": "109"
          },
          {
            "value": "952",
            "name": "岑溪市",
            "parent": "109"
          },
          {
            "value": "953",
            "name": "苍梧县",
            "parent": "109"
          },
          {
            "value": "954",
            "name": "藤县",
            "parent": "109"
          },
          {
            "value": "955",
            "name": "蒙山县",
            "parent": "109"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "109"
          },
          {
            "value": "110",
            "name": "玉林",
            "parent": "7"
          },
          {
            "value": "956",
            "name": "玉州区",
            "parent": "110"
          },
          {
            "value": "957",
            "name": "北流市",
            "parent": "110"
          },
          {
            "value": "958",
            "name": "容县",
            "parent": "110"
          },
          {
            "value": "959",
            "name": "陆川县",
            "parent": "110"
          },
          {
            "value": "960",
            "name": "博白县",
            "parent": "110"
          },
          {
            "value": "961",
            "name": "兴业县",
            "parent": "110"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "110"
          },
          {
            "value": "8",
            "name": "贵州",
            "parent": 0
          },
          {
            "value": "111",
            "name": "贵阳",
            "parent": "8"
          },
          {
            "value": "962",
            "name": "南明区",
            "parent": "111"
          },
          {
            "value": "963",
            "name": "云岩区",
            "parent": "111"
          },
          {
            "value": "964",
            "name": "花溪区",
            "parent": "111"
          },
          {
            "value": "965",
            "name": "乌当区",
            "parent": "111"
          },
          {
            "value": "966",
            "name": "白云区",
            "parent": "111"
          },
          {
            "value": "967",
            "name": "小河区",
            "parent": "111"
          },
          {
            "value": "968",
            "name": "金阳新区",
            "parent": "111"
          },
          {
            "value": "969",
            "name": "新天园区",
            "parent": "111"
          },
          {
            "value": "970",
            "name": "清镇市",
            "parent": "111"
          },
          {
            "value": "971",
            "name": "开阳县",
            "parent": "111"
          },
          {
            "value": "972",
            "name": "修文县",
            "parent": "111"
          },
          {
            "value": "973",
            "name": "息烽县",
            "parent": "111"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "111"
          },
          {
            "value": "112",
            "name": "安顺",
            "parent": "8"
          },
          {
            "value": "974",
            "name": "西秀区",
            "parent": "112"
          },
          {
            "value": "975",
            "name": "关岭",
            "parent": "112"
          },
          {
            "value": "976",
            "name": "镇宁",
            "parent": "112"
          },
          {
            "value": "977",
            "name": "紫云",
            "parent": "112"
          },
          {
            "value": "978",
            "name": "平坝县",
            "parent": "112"
          },
          {
            "value": "979",
            "name": "普定县",
            "parent": "112"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "112"
          },
          {
            "value": "113",
            "name": "毕节",
            "parent": "8"
          },
          {
            "value": "980",
            "name": "毕节市",
            "parent": "113"
          },
          {
            "value": "981",
            "name": "大方县",
            "parent": "113"
          },
          {
            "value": "982",
            "name": "黔西县",
            "parent": "113"
          },
          {
            "value": "983",
            "name": "金沙县",
            "parent": "113"
          },
          {
            "value": "984",
            "name": "织金县",
            "parent": "113"
          },
          {
            "value": "985",
            "name": "纳雍县",
            "parent": "113"
          },
          {
            "value": "986",
            "name": "赫章县",
            "parent": "113"
          },
          {
            "value": "987",
            "name": "威宁",
            "parent": "113"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "113"
          },
          {
            "value": "114",
            "name": "六盘水",
            "parent": "8"
          },
          {
            "value": "988",
            "name": "钟山区",
            "parent": "114"
          },
          {
            "value": "989",
            "name": "六枝特区",
            "parent": "114"
          },
          {
            "value": "990",
            "name": "水城县",
            "parent": "114"
          },
          {
            "value": "991",
            "name": "盘县",
            "parent": "114"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "114"
          },
          {
            "value": "115",
            "name": "黔东南",
            "parent": "8"
          },
          {
            "value": "992",
            "name": "凯里市",
            "parent": "115"
          },
          {
            "value": "993",
            "name": "黄平县",
            "parent": "115"
          },
          {
            "value": "994",
            "name": "施秉县",
            "parent": "115"
          },
          {
            "value": "995",
            "name": "三穗县",
            "parent": "115"
          },
          {
            "value": "996",
            "name": "镇远县",
            "parent": "115"
          },
          {
            "value": "997",
            "name": "岑巩县",
            "parent": "115"
          },
          {
            "value": "998",
            "name": "天柱县",
            "parent": "115"
          },
          {
            "value": "999",
            "name": "锦屏县",
            "parent": "115"
          },
          {
            "value": "1000",
            "name": "剑河县",
            "parent": "115"
          },
          {
            "value": "1001",
            "name": "台江县",
            "parent": "115"
          },
          {
            "value": "1002",
            "name": "黎平县",
            "parent": "115"
          },
          {
            "value": "1003",
            "name": "榕江县",
            "parent": "115"
          },
          {
            "value": "1004",
            "name": "从江县",
            "parent": "115"
          },
          {
            "value": "1005",
            "name": "雷山县",
            "parent": "115"
          },
          {
            "value": "1006",
            "name": "麻江县",
            "parent": "115"
          },
          {
            "value": "1007",
            "name": "丹寨县",
            "parent": "115"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "115"
          },
          {
            "value": "116",
            "name": "黔南",
            "parent": "8"
          },
          {
            "value": "1008",
            "name": "都匀市",
            "parent": "116"
          },
          {
            "value": "1009",
            "name": "福泉市",
            "parent": "116"
          },
          {
            "value": "1010",
            "name": "荔波县",
            "parent": "116"
          },
          {
            "value": "1011",
            "name": "贵定县",
            "parent": "116"
          },
          {
            "value": "1012",
            "name": "瓮安县",
            "parent": "116"
          },
          {
            "value": "1013",
            "name": "独山县",
            "parent": "116"
          },
          {
            "value": "1014",
            "name": "平塘县",
            "parent": "116"
          },
          {
            "value": "1015",
            "name": "罗甸县",
            "parent": "116"
          },
          {
            "value": "1016",
            "name": "长顺县",
            "parent": "116"
          },
          {
            "value": "1017",
            "name": "龙里县",
            "parent": "116"
          },
          {
            "value": "1018",
            "name": "惠水县",
            "parent": "116"
          },
          {
            "value": "1019",
            "name": "三都",
            "parent": "116"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "116"
          },
          {
            "value": "117",
            "name": "黔西南",
            "parent": "8"
          },
          {
            "value": "1020",
            "name": "兴义市",
            "parent": "117"
          },
          {
            "value": "1021",
            "name": "兴仁县",
            "parent": "117"
          },
          {
            "value": "1022",
            "name": "普安县",
            "parent": "117"
          },
          {
            "value": "1023",
            "name": "晴隆县",
            "parent": "117"
          },
          {
            "value": "1024",
            "name": "贞丰县",
            "parent": "117"
          },
          {
            "value": "1025",
            "name": "望谟县",
            "parent": "117"
          },
          {
            "value": "1026",
            "name": "册亨县",
            "parent": "117"
          },
          {
            "value": "1027",
            "name": "安龙县",
            "parent": "117"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "117"
          },
          {
            "value": "118",
            "name": "铜仁",
            "parent": "8"
          },
          {
            "value": "1028",
            "name": "铜仁市",
            "parent": "118"
          },
          {
            "value": "1029",
            "name": "江口县",
            "parent": "118"
          },
          {
            "value": "1030",
            "name": "石阡县",
            "parent": "118"
          },
          {
            "value": "1031",
            "name": "思南县",
            "parent": "118"
          },
          {
            "value": "1032",
            "name": "德江县",
            "parent": "118"
          },
          {
            "value": "1033",
            "name": "玉屏",
            "parent": "118"
          },
          {
            "value": "1034",
            "name": "印江",
            "parent": "118"
          },
          {
            "value": "1035",
            "name": "沿河",
            "parent": "118"
          },
          {
            "value": "1036",
            "name": "松桃",
            "parent": "118"
          },
          {
            "value": "1037",
            "name": "万山特区",
            "parent": "118"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "118"
          },
          {
            "value": "119",
            "name": "遵义",
            "parent": "8"
          },
          {
            "value": "1038",
            "name": "红花岗区",
            "parent": "119"
          },
          {
            "value": "1039",
            "name": "务川县",
            "parent": "119"
          },
          {
            "value": "1040",
            "name": "道真县",
            "parent": "119"
          },
          {
            "value": "1041",
            "name": "汇川区",
            "parent": "119"
          },
          {
            "value": "1042",
            "name": "赤水市",
            "parent": "119"
          },
          {
            "value": "1043",
            "name": "仁怀市",
            "parent": "119"
          },
          {
            "value": "1044",
            "name": "遵义县",
            "parent": "119"
          },
          {
            "value": "1045",
            "name": "桐梓县",
            "parent": "119"
          },
          {
            "value": "1046",
            "name": "绥阳县",
            "parent": "119"
          },
          {
            "value": "1047",
            "name": "正安县",
            "parent": "119"
          },
          {
            "value": "1048",
            "name": "凤冈县",
            "parent": "119"
          },
          {
            "value": "1049",
            "name": "湄潭县",
            "parent": "119"
          },
          {
            "value": "1050",
            "name": "余庆县",
            "parent": "119"
          },
          {
            "value": "1051",
            "name": "习水县",
            "parent": "119"
          },
          {
            "value": "1052",
            "name": "道真",
            "parent": "119"
          },
          {
            "value": "1053",
            "name": "务川",
            "parent": "119"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "119"
          },
          {
            "value": "9",
            "name": "海南",
            "parent": 0
          },
          {
            "value": "120",
            "name": "海口",
            "parent": "9"
          },
          {
            "value": "1054",
            "name": "秀英区",
            "parent": "120"
          },
          {
            "value": "1055",
            "name": "龙华区",
            "parent": "120"
          },
          {
            "value": "1056",
            "name": "琼山区",
            "parent": "120"
          },
          {
            "value": "1057",
            "name": "美兰区",
            "parent": "120"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "120"
          },
          {
            "value": "121",
            "name": "三亚",
            "parent": "9"
          },
          {
            "value": "3432",
            "name": "崖城镇",
            "parent": "121"
          },
          {
            "value": "3433",
            "name": "海棠湾镇",
            "parent": "121"
          },
          {
            "value": "3434",
            "name": "吉阳镇",
            "parent": "121"
          },
          {
            "value": "3435",
            "name": "凤凰镇",
            "parent": "121"
          },
          {
            "value": "3436",
            "name": "天涯镇",
            "parent": "121"
          },
          {
            "value": "3437",
            "name": "育才镇",
            "parent": "121"
          },
          {
            "value": "3438",
            "name": "河西区",
            "parent": "121"
          },
          {
            "value": "3439",
            "name": "河东区",
            "parent": "121"
          },
          {
            "value": "3440",
            "name": "南田农场",
            "parent": "121"
          },
          {
            "value": "3441",
            "name": "南新农场",
            "parent": "121"
          },
          {
            "value": "3442",
            "name": "南岛农场",
            "parent": "121"
          },
          {
            "value": "3443",
            "name": "立才农场",
            "parent": "121"
          },
          {
            "value": "3444",
            "name": "南滨农场",
            "parent": "121"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "121"
          },
          {
            "value": "122",
            "name": "白沙",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "122"
          },
          {
            "value": "123",
            "name": "保亭",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "123"
          },
          {
            "value": "124",
            "name": "昌江",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "124"
          },
          {
            "value": "125",
            "name": "澄迈县",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "125"
          },
          {
            "value": "126",
            "name": "定安县",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "126"
          },
          {
            "value": "127",
            "name": "东方",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "127"
          },
          {
            "value": "128",
            "name": "乐东",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "128"
          },
          {
            "value": "129",
            "name": "临高县",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "129"
          },
          {
            "value": "130",
            "name": "陵水",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "130"
          },
          {
            "value": "131",
            "name": "琼海",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "131"
          },
          {
            "value": "132",
            "name": "琼中",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "132"
          },
          {
            "value": "133",
            "name": "屯昌县",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "133"
          },
          {
            "value": "134",
            "name": "万宁",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "134"
          },
          {
            "value": "135",
            "name": "文昌",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "135"
          },
          {
            "value": "136",
            "name": "五指山",
            "parent": "9"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "136"
          },
          {
            "value": "137",
            "name": "儋州",
            "parent": "9"
          },
          {
            "value": "1058",
            "name": "市区",
            "parent": "137"
          },
          {
            "value": "1059",
            "name": "洋浦开发区",
            "parent": "137"
          },
          {
            "value": "1060",
            "name": "那大镇",
            "parent": "137"
          },
          {
            "value": "1061",
            "name": "王五镇",
            "parent": "137"
          },
          {
            "value": "1062",
            "name": "雅星镇",
            "parent": "137"
          },
          {
            "value": "1063",
            "name": "大成镇",
            "parent": "137"
          },
          {
            "value": "1064",
            "name": "中和镇",
            "parent": "137"
          },
          {
            "value": "1065",
            "name": "峨蔓镇",
            "parent": "137"
          },
          {
            "value": "1066",
            "name": "南丰镇",
            "parent": "137"
          },
          {
            "value": "1067",
            "name": "白马井镇",
            "parent": "137"
          },
          {
            "value": "1068",
            "name": "兰洋镇",
            "parent": "137"
          },
          {
            "value": "1069",
            "name": "和庆镇",
            "parent": "137"
          },
          {
            "value": "1070",
            "name": "海头镇",
            "parent": "137"
          },
          {
            "value": "1071",
            "name": "排浦镇",
            "parent": "137"
          },
          {
            "value": "1072",
            "name": "东成镇",
            "parent": "137"
          },
          {
            "value": "1073",
            "name": "光村镇",
            "parent": "137"
          },
          {
            "value": "1074",
            "name": "木棠镇",
            "parent": "137"
          },
          {
            "value": "1075",
            "name": "新州镇",
            "parent": "137"
          },
          {
            "value": "1076",
            "name": "三都镇",
            "parent": "137"
          },
          {
            "value": "1077",
            "name": "其他",
            "parent": "137"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "137"
          },
          {
            "value": "10",
            "name": "河北",
            "parent": 0
          },
          {
            "value": "138",
            "name": "石家庄",
            "parent": "10"
          },
          {
            "value": "1078",
            "name": "长安区",
            "parent": "138"
          },
          {
            "value": "1079",
            "name": "桥东区",
            "parent": "138"
          },
          {
            "value": "1080",
            "name": "桥西区",
            "parent": "138"
          },
          {
            "value": "1081",
            "name": "新华区",
            "parent": "138"
          },
          {
            "value": "1082",
            "name": "裕华区",
            "parent": "138"
          },
          {
            "value": "1083",
            "name": "井陉矿区",
            "parent": "138"
          },
          {
            "value": "1084",
            "name": "高新区",
            "parent": "138"
          },
          {
            "value": "1085",
            "name": "辛集市",
            "parent": "138"
          },
          {
            "value": "1086",
            "name": "藁城市",
            "parent": "138"
          },
          {
            "value": "1087",
            "name": "晋州市",
            "parent": "138"
          },
          {
            "value": "1088",
            "name": "新乐市",
            "parent": "138"
          },
          {
            "value": "1089",
            "name": "鹿泉市",
            "parent": "138"
          },
          {
            "value": "1090",
            "name": "井陉县",
            "parent": "138"
          },
          {
            "value": "1091",
            "name": "正定县",
            "parent": "138"
          },
          {
            "value": "1092",
            "name": "栾城县",
            "parent": "138"
          },
          {
            "value": "1093",
            "name": "行唐县",
            "parent": "138"
          },
          {
            "value": "1094",
            "name": "灵寿县",
            "parent": "138"
          },
          {
            "value": "1095",
            "name": "高邑县",
            "parent": "138"
          },
          {
            "value": "1096",
            "name": "深泽县",
            "parent": "138"
          },
          {
            "value": "1097",
            "name": "赞皇县",
            "parent": "138"
          },
          {
            "value": "1098",
            "name": "无极县",
            "parent": "138"
          },
          {
            "value": "1099",
            "name": "平山县",
            "parent": "138"
          },
          {
            "value": "1100",
            "name": "元氏县",
            "parent": "138"
          },
          {
            "value": "1101",
            "name": "赵县",
            "parent": "138"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "138"
          },
          {
            "value": "139",
            "name": "保定",
            "parent": "10"
          },
          {
            "value": "1102",
            "name": "新市区",
            "parent": "139"
          },
          {
            "value": "1103",
            "name": "南市区",
            "parent": "139"
          },
          {
            "value": "1104",
            "name": "北市区",
            "parent": "139"
          },
          {
            "value": "1105",
            "name": "涿州市",
            "parent": "139"
          },
          {
            "value": "1106",
            "name": "定州市",
            "parent": "139"
          },
          {
            "value": "1107",
            "name": "安国市",
            "parent": "139"
          },
          {
            "value": "1108",
            "name": "高碑店市",
            "parent": "139"
          },
          {
            "value": "1109",
            "name": "满城县",
            "parent": "139"
          },
          {
            "value": "1110",
            "name": "清苑县",
            "parent": "139"
          },
          {
            "value": "1111",
            "name": "涞水县",
            "parent": "139"
          },
          {
            "value": "1112",
            "name": "阜平县",
            "parent": "139"
          },
          {
            "value": "1113",
            "name": "徐水县",
            "parent": "139"
          },
          {
            "value": "1114",
            "name": "定兴县",
            "parent": "139"
          },
          {
            "value": "1115",
            "name": "唐县",
            "parent": "139"
          },
          {
            "value": "1116",
            "name": "高阳县",
            "parent": "139"
          },
          {
            "value": "1117",
            "name": "容城县",
            "parent": "139"
          },
          {
            "value": "1118",
            "name": "涞源县",
            "parent": "139"
          },
          {
            "value": "1119",
            "name": "望都县",
            "parent": "139"
          },
          {
            "value": "1120",
            "name": "安新县",
            "parent": "139"
          },
          {
            "value": "1121",
            "name": "易县",
            "parent": "139"
          },
          {
            "value": "1122",
            "name": "曲阳县",
            "parent": "139"
          },
          {
            "value": "1123",
            "name": "蠡县",
            "parent": "139"
          },
          {
            "value": "1124",
            "name": "顺平县",
            "parent": "139"
          },
          {
            "value": "1125",
            "name": "博野县",
            "parent": "139"
          },
          {
            "value": "1126",
            "name": "雄县",
            "parent": "139"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "139"
          },
          {
            "value": "140",
            "name": "沧州",
            "parent": "10"
          },
          {
            "value": "1127",
            "name": "运河区",
            "parent": "140"
          },
          {
            "value": "1128",
            "name": "新华区",
            "parent": "140"
          },
          {
            "value": "1129",
            "name": "泊头市",
            "parent": "140"
          },
          {
            "value": "1130",
            "name": "任丘市",
            "parent": "140"
          },
          {
            "value": "1131",
            "name": "黄骅市",
            "parent": "140"
          },
          {
            "value": "1132",
            "name": "河间市",
            "parent": "140"
          },
          {
            "value": "1133",
            "name": "沧县",
            "parent": "140"
          },
          {
            "value": "1134",
            "name": "青县",
            "parent": "140"
          },
          {
            "value": "1135",
            "name": "东光县",
            "parent": "140"
          },
          {
            "value": "1136",
            "name": "海兴县",
            "parent": "140"
          },
          {
            "value": "1137",
            "name": "盐山县",
            "parent": "140"
          },
          {
            "value": "1138",
            "name": "肃宁县",
            "parent": "140"
          },
          {
            "value": "1139",
            "name": "南皮县",
            "parent": "140"
          },
          {
            "value": "1140",
            "name": "吴桥县",
            "parent": "140"
          },
          {
            "value": "1141",
            "name": "献县",
            "parent": "140"
          },
          {
            "value": "1142",
            "name": "孟村",
            "parent": "140"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "140"
          },
          {
            "value": "141",
            "name": "承德",
            "parent": "10"
          },
          {
            "value": "1143",
            "name": "双桥区",
            "parent": "141"
          },
          {
            "value": "1144",
            "name": "双滦区",
            "parent": "141"
          },
          {
            "value": "1145",
            "name": "鹰手营子矿区",
            "parent": "141"
          },
          {
            "value": "1146",
            "name": "承德县",
            "parent": "141"
          },
          {
            "value": "1147",
            "name": "兴隆县",
            "parent": "141"
          },
          {
            "value": "1148",
            "name": "平泉县",
            "parent": "141"
          },
          {
            "value": "1149",
            "name": "滦平县",
            "parent": "141"
          },
          {
            "value": "1150",
            "name": "隆化县",
            "parent": "141"
          },
          {
            "value": "1151",
            "name": "丰宁",
            "parent": "141"
          },
          {
            "value": "1152",
            "name": "宽城",
            "parent": "141"
          },
          {
            "value": "1153",
            "name": "围场",
            "parent": "141"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "141"
          },
          {
            "value": "142",
            "name": "邯郸",
            "parent": "10"
          },
          {
            "value": "1154",
            "name": "从台区",
            "parent": "142"
          },
          {
            "value": "1155",
            "name": "复兴区",
            "parent": "142"
          },
          {
            "value": "1156",
            "name": "邯山区",
            "parent": "142"
          },
          {
            "value": "1157",
            "name": "峰峰矿区",
            "parent": "142"
          },
          {
            "value": "1158",
            "name": "武安市",
            "parent": "142"
          },
          {
            "value": "1159",
            "name": "邯郸县",
            "parent": "142"
          },
          {
            "value": "1160",
            "name": "临漳县",
            "parent": "142"
          },
          {
            "value": "1161",
            "name": "成安县",
            "parent": "142"
          },
          {
            "value": "1162",
            "name": "大名县",
            "parent": "142"
          },
          {
            "value": "1163",
            "name": "涉县",
            "parent": "142"
          },
          {
            "value": "1164",
            "name": "磁县",
            "parent": "142"
          },
          {
            "value": "1165",
            "name": "肥乡县",
            "parent": "142"
          },
          {
            "value": "1166",
            "name": "永年县",
            "parent": "142"
          },
          {
            "value": "1167",
            "name": "邱县",
            "parent": "142"
          },
          {
            "value": "1168",
            "name": "鸡泽县",
            "parent": "142"
          },
          {
            "value": "1169",
            "name": "广平县",
            "parent": "142"
          },
          {
            "value": "1170",
            "name": "馆陶县",
            "parent": "142"
          },
          {
            "value": "1171",
            "name": "魏县",
            "parent": "142"
          },
          {
            "value": "1172",
            "name": "曲周县",
            "parent": "142"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "142"
          },
          {
            "value": "143",
            "name": "衡水",
            "parent": "10"
          },
          {
            "value": "1173",
            "name": "桃城区",
            "parent": "143"
          },
          {
            "value": "1174",
            "name": "冀州市",
            "parent": "143"
          },
          {
            "value": "1175",
            "name": "深州市",
            "parent": "143"
          },
          {
            "value": "1176",
            "name": "枣强县",
            "parent": "143"
          },
          {
            "value": "1177",
            "name": "武邑县",
            "parent": "143"
          },
          {
            "value": "1178",
            "name": "武强县",
            "parent": "143"
          },
          {
            "value": "1179",
            "name": "饶阳县",
            "parent": "143"
          },
          {
            "value": "1180",
            "name": "安平县",
            "parent": "143"
          },
          {
            "value": "1181",
            "name": "故城县",
            "parent": "143"
          },
          {
            "value": "1182",
            "name": "景县",
            "parent": "143"
          },
          {
            "value": "1183",
            "name": "阜城县",
            "parent": "143"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "143"
          },
          {
            "value": "144",
            "name": "廊坊",
            "parent": "10"
          },
          {
            "value": "1184",
            "name": "安次区",
            "parent": "144"
          },
          {
            "value": "1185",
            "name": "广阳区",
            "parent": "144"
          },
          {
            "value": "1186",
            "name": "霸州市",
            "parent": "144"
          },
          {
            "value": "1187",
            "name": "三河市",
            "parent": "144"
          },
          {
            "value": "1188",
            "name": "固安县",
            "parent": "144"
          },
          {
            "value": "1189",
            "name": "永清县",
            "parent": "144"
          },
          {
            "value": "1190",
            "name": "香河县",
            "parent": "144"
          },
          {
            "value": "1191",
            "name": "大城县",
            "parent": "144"
          },
          {
            "value": "1192",
            "name": "文安县",
            "parent": "144"
          },
          {
            "value": "1193",
            "name": "大厂",
            "parent": "144"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "144"
          },
          {
            "value": "145",
            "name": "秦皇岛",
            "parent": "10"
          },
          {
            "value": "1194",
            "name": "海港区",
            "parent": "145"
          },
          {
            "value": "1195",
            "name": "山海关区",
            "parent": "145"
          },
          {
            "value": "1196",
            "name": "北戴河区",
            "parent": "145"
          },
          {
            "value": "1197",
            "name": "昌黎县",
            "parent": "145"
          },
          {
            "value": "1198",
            "name": "抚宁县",
            "parent": "145"
          },
          {
            "value": "1199",
            "name": "卢龙县",
            "parent": "145"
          },
          {
            "value": "1200",
            "name": "青龙",
            "parent": "145"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "145"
          },
          {
            "value": "146",
            "name": "唐山",
            "parent": "10"
          },
          {
            "value": "1201",
            "name": "路北区",
            "parent": "146"
          },
          {
            "value": "1202",
            "name": "路南区",
            "parent": "146"
          },
          {
            "value": "1203",
            "name": "古冶区",
            "parent": "146"
          },
          {
            "value": "1204",
            "name": "开平区",
            "parent": "146"
          },
          {
            "value": "1205",
            "name": "丰南区",
            "parent": "146"
          },
          {
            "value": "1206",
            "name": "丰润区",
            "parent": "146"
          },
          {
            "value": "1207",
            "name": "遵化市",
            "parent": "146"
          },
          {
            "value": "1208",
            "name": "迁安市",
            "parent": "146"
          },
          {
            "value": "1209",
            "name": "滦县",
            "parent": "146"
          },
          {
            "value": "1210",
            "name": "滦南县",
            "parent": "146"
          },
          {
            "value": "1211",
            "name": "乐亭县",
            "parent": "146"
          },
          {
            "value": "1212",
            "name": "迁西县",
            "parent": "146"
          },
          {
            "value": "1213",
            "name": "玉田县",
            "parent": "146"
          },
          {
            "value": "1214",
            "name": "唐海县",
            "parent": "146"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "146"
          },
          {
            "value": "147",
            "name": "邢台",
            "parent": "10"
          },
          {
            "value": "1215",
            "name": "桥东区",
            "parent": "147"
          },
          {
            "value": "1216",
            "name": "桥西区",
            "parent": "147"
          },
          {
            "value": "1217",
            "name": "南宫市",
            "parent": "147"
          },
          {
            "value": "1218",
            "name": "沙河市",
            "parent": "147"
          },
          {
            "value": "1219",
            "name": "邢台县",
            "parent": "147"
          },
          {
            "value": "1220",
            "name": "临城县",
            "parent": "147"
          },
          {
            "value": "1221",
            "name": "内丘县",
            "parent": "147"
          },
          {
            "value": "1222",
            "name": "柏乡县",
            "parent": "147"
          },
          {
            "value": "1223",
            "name": "隆尧县",
            "parent": "147"
          },
          {
            "value": "1224",
            "name": "任县",
            "parent": "147"
          },
          {
            "value": "1225",
            "name": "南和县",
            "parent": "147"
          },
          {
            "value": "1226",
            "name": "宁晋县",
            "parent": "147"
          },
          {
            "value": "1227",
            "name": "巨鹿县",
            "parent": "147"
          },
          {
            "value": "1228",
            "name": "新河县",
            "parent": "147"
          },
          {
            "value": "1229",
            "name": "广宗县",
            "parent": "147"
          },
          {
            "value": "1230",
            "name": "平乡县",
            "parent": "147"
          },
          {
            "value": "1231",
            "name": "威县",
            "parent": "147"
          },
          {
            "value": "1232",
            "name": "清河县",
            "parent": "147"
          },
          {
            "value": "1233",
            "name": "临西县",
            "parent": "147"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "147"
          },
          {
            "value": "148",
            "name": "张家口",
            "parent": "10"
          },
          {
            "value": "1234",
            "name": "桥西区",
            "parent": "148"
          },
          {
            "value": "1235",
            "name": "桥东区",
            "parent": "148"
          },
          {
            "value": "1236",
            "name": "宣化区",
            "parent": "148"
          },
          {
            "value": "1237",
            "name": "下花园区",
            "parent": "148"
          },
          {
            "value": "1238",
            "name": "宣化县",
            "parent": "148"
          },
          {
            "value": "1239",
            "name": "张北县",
            "parent": "148"
          },
          {
            "value": "1240",
            "name": "康保县",
            "parent": "148"
          },
          {
            "value": "1241",
            "name": "沽源县",
            "parent": "148"
          },
          {
            "value": "1242",
            "name": "尚义县",
            "parent": "148"
          },
          {
            "value": "1243",
            "name": "蔚县",
            "parent": "148"
          },
          {
            "value": "1244",
            "name": "阳原县",
            "parent": "148"
          },
          {
            "value": "1245",
            "name": "怀安县",
            "parent": "148"
          },
          {
            "value": "1246",
            "name": "万全县",
            "parent": "148"
          },
          {
            "value": "1247",
            "name": "怀来县",
            "parent": "148"
          },
          {
            "value": "1248",
            "name": "涿鹿县",
            "parent": "148"
          },
          {
            "value": "1249",
            "name": "赤城县",
            "parent": "148"
          },
          {
            "value": "1250",
            "name": "崇礼县",
            "parent": "148"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "148"
          },
          {
            "value": "11",
            "name": "河南",
            "parent": 0
          },
          {
            "value": "149",
            "name": "郑州",
            "parent": "11"
          },
          {
            "value": "1251",
            "name": "金水区",
            "parent": "149"
          },
          {
            "value": "1252",
            "name": "邙山区",
            "parent": "149"
          },
          {
            "value": "1253",
            "name": "二七区",
            "parent": "149"
          },
          {
            "value": "1254",
            "name": "管城区",
            "parent": "149"
          },
          {
            "value": "1255",
            "name": "中原区",
            "parent": "149"
          },
          {
            "value": "1256",
            "name": "上街区",
            "parent": "149"
          },
          {
            "value": "1257",
            "name": "惠济区",
            "parent": "149"
          },
          {
            "value": "1258",
            "name": "郑东新区",
            "parent": "149"
          },
          {
            "value": "1259",
            "name": "经济技术开发区",
            "parent": "149"
          },
          {
            "value": "1260",
            "name": "高新开发区",
            "parent": "149"
          },
          {
            "value": "1261",
            "name": "出口加工区",
            "parent": "149"
          },
          {
            "value": "1262",
            "name": "巩义市",
            "parent": "149"
          },
          {
            "value": "1263",
            "name": "荥阳市",
            "parent": "149"
          },
          {
            "value": "1264",
            "name": "新密市",
            "parent": "149"
          },
          {
            "value": "1265",
            "name": "新郑市",
            "parent": "149"
          },
          {
            "value": "1266",
            "name": "登封市",
            "parent": "149"
          },
          {
            "value": "1267",
            "name": "中牟县",
            "parent": "149"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "149"
          },
          {
            "value": "150",
            "name": "洛阳",
            "parent": "11"
          },
          {
            "value": "1268",
            "name": "西工区",
            "parent": "150"
          },
          {
            "value": "1269",
            "name": "老城区",
            "parent": "150"
          },
          {
            "value": "1270",
            "name": "涧西区",
            "parent": "150"
          },
          {
            "value": "1271",
            "name": "瀍河回族区",
            "parent": "150"
          },
          {
            "value": "1272",
            "name": "洛龙区",
            "parent": "150"
          },
          {
            "value": "1273",
            "name": "吉利区",
            "parent": "150"
          },
          {
            "value": "1274",
            "name": "偃师市",
            "parent": "150"
          },
          {
            "value": "1275",
            "name": "孟津县",
            "parent": "150"
          },
          {
            "value": "1276",
            "name": "新安县",
            "parent": "150"
          },
          {
            "value": "1277",
            "name": "栾川县",
            "parent": "150"
          },
          {
            "value": "1278",
            "name": "嵩县",
            "parent": "150"
          },
          {
            "value": "1279",
            "name": "汝阳县",
            "parent": "150"
          },
          {
            "value": "1280",
            "name": "宜阳县",
            "parent": "150"
          },
          {
            "value": "1281",
            "name": "洛宁县",
            "parent": "150"
          },
          {
            "value": "1282",
            "name": "伊川县",
            "parent": "150"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "150"
          },
          {
            "value": "151",
            "name": "开封",
            "parent": "11"
          },
          {
            "value": "1283",
            "name": "鼓楼区",
            "parent": "151"
          },
          {
            "value": "1284",
            "name": "龙亭区",
            "parent": "151"
          },
          {
            "value": "1285",
            "name": "顺河回族区",
            "parent": "151"
          },
          {
            "value": "1286",
            "name": "金明区",
            "parent": "151"
          },
          {
            "value": "1287",
            "name": "禹王台区",
            "parent": "151"
          },
          {
            "value": "1288",
            "name": "杞县",
            "parent": "151"
          },
          {
            "value": "1289",
            "name": "通许县",
            "parent": "151"
          },
          {
            "value": "1290",
            "name": "尉氏县",
            "parent": "151"
          },
          {
            "value": "1291",
            "name": "开封县",
            "parent": "151"
          },
          {
            "value": "1292",
            "name": "兰考县",
            "parent": "151"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "151"
          },
          {
            "value": "152",
            "name": "安阳",
            "parent": "11"
          },
          {
            "value": "1293",
            "name": "北关区",
            "parent": "152"
          },
          {
            "value": "1294",
            "name": "文峰区",
            "parent": "152"
          },
          {
            "value": "1295",
            "name": "殷都区",
            "parent": "152"
          },
          {
            "value": "1296",
            "name": "龙安区",
            "parent": "152"
          },
          {
            "value": "1297",
            "name": "林州市",
            "parent": "152"
          },
          {
            "value": "1298",
            "name": "安阳县",
            "parent": "152"
          },
          {
            "value": "1299",
            "name": "汤阴县",
            "parent": "152"
          },
          {
            "value": "1300",
            "name": "滑县",
            "parent": "152"
          },
          {
            "value": "1301",
            "name": "内黄县",
            "parent": "152"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "152"
          },
          {
            "value": "153",
            "name": "鹤壁",
            "parent": "11"
          },
          {
            "value": "1302",
            "name": "淇滨区",
            "parent": "153"
          },
          {
            "value": "1303",
            "name": "山城区",
            "parent": "153"
          },
          {
            "value": "1304",
            "name": "鹤山区",
            "parent": "153"
          },
          {
            "value": "1305",
            "name": "浚县",
            "parent": "153"
          },
          {
            "value": "1306",
            "name": "淇县",
            "parent": "153"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "153"
          },
          {
            "value": "154",
            "name": "济源",
            "parent": "11"
          },
          {
            "value": "1307",
            "name": "济源市",
            "parent": "154"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "154"
          },
          {
            "value": "155",
            "name": "焦作",
            "parent": "11"
          },
          {
            "value": "1308",
            "name": "解放区",
            "parent": "155"
          },
          {
            "value": "1309",
            "name": "中站区",
            "parent": "155"
          },
          {
            "value": "1310",
            "name": "马村区",
            "parent": "155"
          },
          {
            "value": "1311",
            "name": "山阳区",
            "parent": "155"
          },
          {
            "value": "1312",
            "name": "沁阳市",
            "parent": "155"
          },
          {
            "value": "1313",
            "name": "孟州市",
            "parent": "155"
          },
          {
            "value": "1314",
            "name": "修武县",
            "parent": "155"
          },
          {
            "value": "1315",
            "name": "博爱县",
            "parent": "155"
          },
          {
            "value": "1316",
            "name": "武陟县",
            "parent": "155"
          },
          {
            "value": "1317",
            "name": "温县",
            "parent": "155"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "155"
          },
          {
            "value": "156",
            "name": "南阳",
            "parent": "11"
          },
          {
            "value": "1318",
            "name": "卧龙区",
            "parent": "156"
          },
          {
            "value": "1319",
            "name": "宛城区",
            "parent": "156"
          },
          {
            "value": "1320",
            "name": "邓州市",
            "parent": "156"
          },
          {
            "value": "1321",
            "name": "南召县",
            "parent": "156"
          },
          {
            "value": "1322",
            "name": "方城县",
            "parent": "156"
          },
          {
            "value": "1323",
            "name": "西峡县",
            "parent": "156"
          },
          {
            "value": "1324",
            "name": "镇平县",
            "parent": "156"
          },
          {
            "value": "1325",
            "name": "内乡县",
            "parent": "156"
          },
          {
            "value": "1326",
            "name": "淅川县",
            "parent": "156"
          },
          {
            "value": "1327",
            "name": "社旗县",
            "parent": "156"
          },
          {
            "value": "1328",
            "name": "唐河县",
            "parent": "156"
          },
          {
            "value": "1329",
            "name": "新野县",
            "parent": "156"
          },
          {
            "value": "1330",
            "name": "桐柏县",
            "parent": "156"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "156"
          },
          {
            "value": "157",
            "name": "平顶山",
            "parent": "11"
          },
          {
            "value": "1331",
            "name": "新华区",
            "parent": "157"
          },
          {
            "value": "1332",
            "name": "卫东区",
            "parent": "157"
          },
          {
            "value": "1333",
            "name": "湛河区",
            "parent": "157"
          },
          {
            "value": "1334",
            "name": "石龙区",
            "parent": "157"
          },
          {
            "value": "1335",
            "name": "舞钢市",
            "parent": "157"
          },
          {
            "value": "1336",
            "name": "汝州市",
            "parent": "157"
          },
          {
            "value": "1337",
            "name": "宝丰县",
            "parent": "157"
          },
          {
            "value": "1338",
            "name": "叶县",
            "parent": "157"
          },
          {
            "value": "1339",
            "name": "鲁山县",
            "parent": "157"
          },
          {
            "value": "1340",
            "name": "郏县",
            "parent": "157"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "157"
          },
          {
            "value": "158",
            "name": "三门峡",
            "parent": "11"
          },
          {
            "value": "1341",
            "name": "湖滨区",
            "parent": "158"
          },
          {
            "value": "1342",
            "name": "义马市",
            "parent": "158"
          },
          {
            "value": "1343",
            "name": "灵宝市",
            "parent": "158"
          },
          {
            "value": "1344",
            "name": "渑池县",
            "parent": "158"
          },
          {
            "value": "1345",
            "name": "陕县",
            "parent": "158"
          },
          {
            "value": "1346",
            "name": "卢氏县",
            "parent": "158"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "158"
          },
          {
            "value": "159",
            "name": "商丘",
            "parent": "11"
          },
          {
            "value": "1347",
            "name": "梁园区",
            "parent": "159"
          },
          {
            "value": "1348",
            "name": "睢阳区",
            "parent": "159"
          },
          {
            "value": "1349",
            "name": "永城市",
            "parent": "159"
          },
          {
            "value": "1350",
            "name": "民权县",
            "parent": "159"
          },
          {
            "value": "1351",
            "name": "睢县",
            "parent": "159"
          },
          {
            "value": "1352",
            "name": "宁陵县",
            "parent": "159"
          },
          {
            "value": "1353",
            "name": "虞城县",
            "parent": "159"
          },
          {
            "value": "1354",
            "name": "柘城县",
            "parent": "159"
          },
          {
            "value": "1355",
            "name": "夏邑县",
            "parent": "159"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "159"
          },
          {
            "value": "160",
            "name": "新乡",
            "parent": "11"
          },
          {
            "value": "1356",
            "name": "卫滨区",
            "parent": "160"
          },
          {
            "value": "1357",
            "name": "红旗区",
            "parent": "160"
          },
          {
            "value": "1358",
            "name": "凤泉区",
            "parent": "160"
          },
          {
            "value": "1359",
            "name": "牧野区",
            "parent": "160"
          },
          {
            "value": "1360",
            "name": "卫辉市",
            "parent": "160"
          },
          {
            "value": "1361",
            "name": "辉县市",
            "parent": "160"
          },
          {
            "value": "1362",
            "name": "新乡县",
            "parent": "160"
          },
          {
            "value": "1363",
            "name": "获嘉县",
            "parent": "160"
          },
          {
            "value": "1364",
            "name": "原阳县",
            "parent": "160"
          },
          {
            "value": "1365",
            "name": "延津县",
            "parent": "160"
          },
          {
            "value": "1366",
            "name": "封丘县",
            "parent": "160"
          },
          {
            "value": "1367",
            "name": "长垣县",
            "parent": "160"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "160"
          },
          {
            "value": "161",
            "name": "信阳",
            "parent": "11"
          },
          {
            "value": "1368",
            "name": "浉河区",
            "parent": "161"
          },
          {
            "value": "1369",
            "name": "平桥区",
            "parent": "161"
          },
          {
            "value": "1370",
            "name": "罗山县",
            "parent": "161"
          },
          {
            "value": "1371",
            "name": "光山县",
            "parent": "161"
          },
          {
            "value": "1372",
            "name": "新县",
            "parent": "161"
          },
          {
            "value": "1373",
            "name": "商城县",
            "parent": "161"
          },
          {
            "value": "1374",
            "name": "固始县",
            "parent": "161"
          },
          {
            "value": "1375",
            "name": "潢川县",
            "parent": "161"
          },
          {
            "value": "1376",
            "name": "淮滨县",
            "parent": "161"
          },
          {
            "value": "1377",
            "name": "息县",
            "parent": "161"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "161"
          },
          {
            "value": "162",
            "name": "许昌",
            "parent": "11"
          },
          {
            "value": "1378",
            "name": "魏都区",
            "parent": "162"
          },
          {
            "value": "1379",
            "name": "禹州市",
            "parent": "162"
          },
          {
            "value": "1380",
            "name": "长葛市",
            "parent": "162"
          },
          {
            "value": "1381",
            "name": "许昌县",
            "parent": "162"
          },
          {
            "value": "1382",
            "name": "鄢陵县",
            "parent": "162"
          },
          {
            "value": "1383",
            "name": "襄城县",
            "parent": "162"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "162"
          },
          {
            "value": "163",
            "name": "周口",
            "parent": "11"
          },
          {
            "value": "1384",
            "name": "川汇区",
            "parent": "163"
          },
          {
            "value": "1385",
            "name": "项城市",
            "parent": "163"
          },
          {
            "value": "1386",
            "name": "扶沟县",
            "parent": "163"
          },
          {
            "value": "1387",
            "name": "西华县",
            "parent": "163"
          },
          {
            "value": "1388",
            "name": "商水县",
            "parent": "163"
          },
          {
            "value": "1389",
            "name": "沈丘县",
            "parent": "163"
          },
          {
            "value": "1390",
            "name": "郸城县",
            "parent": "163"
          },
          {
            "value": "1391",
            "name": "淮阳县",
            "parent": "163"
          },
          {
            "value": "1392",
            "name": "太康县",
            "parent": "163"
          },
          {
            "value": "1393",
            "name": "鹿邑县",
            "parent": "163"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "163"
          },
          {
            "value": "164",
            "name": "驻马店",
            "parent": "11"
          },
          {
            "value": "1394",
            "name": "驿城区",
            "parent": "164"
          },
          {
            "value": "1395",
            "name": "西平县",
            "parent": "164"
          },
          {
            "value": "1396",
            "name": "上蔡县",
            "parent": "164"
          },
          {
            "value": "1397",
            "name": "平舆县",
            "parent": "164"
          },
          {
            "value": "1398",
            "name": "正阳县",
            "parent": "164"
          },
          {
            "value": "1399",
            "name": "确山县",
            "parent": "164"
          },
          {
            "value": "1400",
            "name": "泌阳县",
            "parent": "164"
          },
          {
            "value": "1401",
            "name": "汝南县",
            "parent": "164"
          },
          {
            "value": "1402",
            "name": "遂平县",
            "parent": "164"
          },
          {
            "value": "1403",
            "name": "新蔡县",
            "parent": "164"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "164"
          },
          {
            "value": "165",
            "name": "漯河",
            "parent": "11"
          },
          {
            "value": "1404",
            "name": "郾城区",
            "parent": "165"
          },
          {
            "value": "1405",
            "name": "源汇区",
            "parent": "165"
          },
          {
            "value": "1406",
            "name": "召陵区",
            "parent": "165"
          },
          {
            "value": "1407",
            "name": "舞阳县",
            "parent": "165"
          },
          {
            "value": "1408",
            "name": "临颍县",
            "parent": "165"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "165"
          },
          {
            "value": "166",
            "name": "濮阳",
            "parent": "11"
          },
          {
            "value": "1409",
            "name": "华龙区",
            "parent": "166"
          },
          {
            "value": "1410",
            "name": "清丰县",
            "parent": "166"
          },
          {
            "value": "1411",
            "name": "南乐县",
            "parent": "166"
          },
          {
            "value": "1412",
            "name": "范县",
            "parent": "166"
          },
          {
            "value": "1413",
            "name": "台前县",
            "parent": "166"
          },
          {
            "value": "1414",
            "name": "濮阳县",
            "parent": "166"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "166"
          },
          {
            "value": "12",
            "name": "黑龙江",
            "parent": 0
          },
          {
            "value": "167",
            "name": "哈尔滨",
            "parent": "12"
          },
          {
            "value": "1415",
            "name": "道里区",
            "parent": "167"
          },
          {
            "value": "1416",
            "name": "南岗区",
            "parent": "167"
          },
          {
            "value": "1417",
            "name": "动力区",
            "parent": "167"
          },
          {
            "value": "1418",
            "name": "平房区",
            "parent": "167"
          },
          {
            "value": "1419",
            "name": "香坊区",
            "parent": "167"
          },
          {
            "value": "1420",
            "name": "太平区",
            "parent": "167"
          },
          {
            "value": "1421",
            "name": "道外区",
            "parent": "167"
          },
          {
            "value": "1422",
            "name": "阿城区",
            "parent": "167"
          },
          {
            "value": "1423",
            "name": "呼兰区",
            "parent": "167"
          },
          {
            "value": "1424",
            "name": "松北区",
            "parent": "167"
          },
          {
            "value": "1425",
            "name": "尚志市",
            "parent": "167"
          },
          {
            "value": "1426",
            "name": "双城市",
            "parent": "167"
          },
          {
            "value": "1427",
            "name": "五常市",
            "parent": "167"
          },
          {
            "value": "1428",
            "name": "方正县",
            "parent": "167"
          },
          {
            "value": "1429",
            "name": "宾县",
            "parent": "167"
          },
          {
            "value": "1430",
            "name": "依兰县",
            "parent": "167"
          },
          {
            "value": "1431",
            "name": "巴彦县",
            "parent": "167"
          },
          {
            "value": "1432",
            "name": "通河县",
            "parent": "167"
          },
          {
            "value": "1433",
            "name": "木兰县",
            "parent": "167"
          },
          {
            "value": "1434",
            "name": "延寿县",
            "parent": "167"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "167"
          },
          {
            "value": "168",
            "name": "大庆",
            "parent": "12"
          },
          {
            "value": "1435",
            "name": "萨尔图区",
            "parent": "168"
          },
          {
            "value": "1436",
            "name": "红岗区",
            "parent": "168"
          },
          {
            "value": "1437",
            "name": "龙凤区",
            "parent": "168"
          },
          {
            "value": "1438",
            "name": "让胡路区",
            "parent": "168"
          },
          {
            "value": "1439",
            "name": "大同区",
            "parent": "168"
          },
          {
            "value": "1440",
            "name": "肇州县",
            "parent": "168"
          },
          {
            "value": "1441",
            "name": "肇源县",
            "parent": "168"
          },
          {
            "value": "1442",
            "name": "林甸县",
            "parent": "168"
          },
          {
            "value": "1443",
            "name": "杜尔伯特",
            "parent": "168"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "168"
          },
          {
            "value": "169",
            "name": "大兴安岭",
            "parent": "12"
          },
          {
            "value": "1444",
            "name": "呼玛县",
            "parent": "169"
          },
          {
            "value": "1445",
            "name": "漠河县",
            "parent": "169"
          },
          {
            "value": "1446",
            "name": "塔河县",
            "parent": "169"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "169"
          },
          {
            "value": "170",
            "name": "鹤岗",
            "parent": "12"
          },
          {
            "value": "1447",
            "name": "兴山区",
            "parent": "170"
          },
          {
            "value": "1448",
            "name": "工农区",
            "parent": "170"
          },
          {
            "value": "1449",
            "name": "南山区",
            "parent": "170"
          },
          {
            "value": "1450",
            "name": "兴安区",
            "parent": "170"
          },
          {
            "value": "1451",
            "name": "向阳区",
            "parent": "170"
          },
          {
            "value": "1452",
            "name": "东山区",
            "parent": "170"
          },
          {
            "value": "1453",
            "name": "萝北县",
            "parent": "170"
          },
          {
            "value": "1454",
            "name": "绥滨县",
            "parent": "170"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "170"
          },
          {
            "value": "171",
            "name": "黑河",
            "parent": "12"
          },
          {
            "value": "1455",
            "name": "爱辉区",
            "parent": "171"
          },
          {
            "value": "1456",
            "name": "五大连池市",
            "parent": "171"
          },
          {
            "value": "1457",
            "name": "北安市",
            "parent": "171"
          },
          {
            "value": "1458",
            "name": "嫩江县",
            "parent": "171"
          },
          {
            "value": "1459",
            "name": "逊克县",
            "parent": "171"
          },
          {
            "value": "1460",
            "name": "孙吴县",
            "parent": "171"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "171"
          },
          {
            "value": "172",
            "name": "鸡西",
            "parent": "12"
          },
          {
            "value": "1461",
            "name": "鸡冠区",
            "parent": "172"
          },
          {
            "value": "1462",
            "name": "恒山区",
            "parent": "172"
          },
          {
            "value": "1463",
            "name": "城子河区",
            "parent": "172"
          },
          {
            "value": "1464",
            "name": "滴道区",
            "parent": "172"
          },
          {
            "value": "1465",
            "name": "梨树区",
            "parent": "172"
          },
          {
            "value": "1466",
            "name": "虎林市",
            "parent": "172"
          },
          {
            "value": "1467",
            "name": "密山市",
            "parent": "172"
          },
          {
            "value": "1468",
            "name": "鸡东县",
            "parent": "172"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "172"
          },
          {
            "value": "173",
            "name": "佳木斯",
            "parent": "12"
          },
          {
            "value": "1469",
            "name": "前进区",
            "parent": "173"
          },
          {
            "value": "1470",
            "name": "郊区",
            "parent": "173"
          },
          {
            "value": "1471",
            "name": "向阳区",
            "parent": "173"
          },
          {
            "value": "1472",
            "name": "东风区",
            "parent": "173"
          },
          {
            "value": "1473",
            "name": "同江市",
            "parent": "173"
          },
          {
            "value": "1474",
            "name": "富锦市",
            "parent": "173"
          },
          {
            "value": "1475",
            "name": "桦南县",
            "parent": "173"
          },
          {
            "value": "1476",
            "name": "桦川县",
            "parent": "173"
          },
          {
            "value": "1477",
            "name": "汤原县",
            "parent": "173"
          },
          {
            "value": "1478",
            "name": "抚远县",
            "parent": "173"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "173"
          },
          {
            "value": "174",
            "name": "牡丹江",
            "parent": "12"
          },
          {
            "value": "1479",
            "name": "爱民区",
            "parent": "174"
          },
          {
            "value": "1480",
            "name": "东安区",
            "parent": "174"
          },
          {
            "value": "1481",
            "name": "阳明区",
            "parent": "174"
          },
          {
            "value": "1482",
            "name": "西安区",
            "parent": "174"
          },
          {
            "value": "1483",
            "name": "绥芬河市",
            "parent": "174"
          },
          {
            "value": "1484",
            "name": "海林市",
            "parent": "174"
          },
          {
            "value": "1485",
            "name": "宁安市",
            "parent": "174"
          },
          {
            "value": "1486",
            "name": "穆棱市",
            "parent": "174"
          },
          {
            "value": "1487",
            "name": "东宁县",
            "parent": "174"
          },
          {
            "value": "1488",
            "name": "林口县",
            "parent": "174"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "174"
          },
          {
            "value": "175",
            "name": "七台河",
            "parent": "12"
          },
          {
            "value": "1489",
            "name": "桃山区",
            "parent": "175"
          },
          {
            "value": "1490",
            "name": "新兴区",
            "parent": "175"
          },
          {
            "value": "1491",
            "name": "茄子河区",
            "parent": "175"
          },
          {
            "value": "1492",
            "name": "勃利县",
            "parent": "175"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "175"
          },
          {
            "value": "176",
            "name": "齐齐哈尔",
            "parent": "12"
          },
          {
            "value": "1493",
            "name": "龙沙区",
            "parent": "176"
          },
          {
            "value": "1494",
            "name": "昂昂溪区",
            "parent": "176"
          },
          {
            "value": "1495",
            "name": "铁峰区",
            "parent": "176"
          },
          {
            "value": "1496",
            "name": "建华区",
            "parent": "176"
          },
          {
            "value": "1497",
            "name": "富拉尔基区",
            "parent": "176"
          },
          {
            "value": "1498",
            "name": "碾子山区",
            "parent": "176"
          },
          {
            "value": "1499",
            "name": "梅里斯达斡尔区",
            "parent": "176"
          },
          {
            "value": "1500",
            "name": "讷河市",
            "parent": "176"
          },
          {
            "value": "1501",
            "name": "龙江县",
            "parent": "176"
          },
          {
            "value": "1502",
            "name": "依安县",
            "parent": "176"
          },
          {
            "value": "1503",
            "name": "泰来县",
            "parent": "176"
          },
          {
            "value": "1504",
            "name": "甘南县",
            "parent": "176"
          },
          {
            "value": "1505",
            "name": "富裕县",
            "parent": "176"
          },
          {
            "value": "1506",
            "name": "克山县",
            "parent": "176"
          },
          {
            "value": "1507",
            "name": "克东县",
            "parent": "176"
          },
          {
            "value": "1508",
            "name": "拜泉县",
            "parent": "176"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "176"
          },
          {
            "value": "177",
            "name": "双鸭山",
            "parent": "12"
          },
          {
            "value": "1509",
            "name": "尖山区",
            "parent": "177"
          },
          {
            "value": "1510",
            "name": "岭东区",
            "parent": "177"
          },
          {
            "value": "1511",
            "name": "四方台区",
            "parent": "177"
          },
          {
            "value": "1512",
            "name": "宝山区",
            "parent": "177"
          },
          {
            "value": "1513",
            "name": "集贤县",
            "parent": "177"
          },
          {
            "value": "1514",
            "name": "友谊县",
            "parent": "177"
          },
          {
            "value": "1515",
            "name": "宝清县",
            "parent": "177"
          },
          {
            "value": "1516",
            "name": "饶河县",
            "parent": "177"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "177"
          },
          {
            "value": "178",
            "name": "绥化",
            "parent": "12"
          },
          {
            "value": "1517",
            "name": "北林区",
            "parent": "178"
          },
          {
            "value": "1518",
            "name": "安达市",
            "parent": "178"
          },
          {
            "value": "1519",
            "name": "肇东市",
            "parent": "178"
          },
          {
            "value": "1520",
            "name": "海伦市",
            "parent": "178"
          },
          {
            "value": "1521",
            "name": "望奎县",
            "parent": "178"
          },
          {
            "value": "1522",
            "name": "兰西县",
            "parent": "178"
          },
          {
            "value": "1523",
            "name": "青冈县",
            "parent": "178"
          },
          {
            "value": "1524",
            "name": "庆安县",
            "parent": "178"
          },
          {
            "value": "1525",
            "name": "明水县",
            "parent": "178"
          },
          {
            "value": "1526",
            "name": "绥棱县",
            "parent": "178"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "178"
          },
          {
            "value": "179",
            "name": "伊春",
            "parent": "12"
          },
          {
            "value": "1527",
            "name": "伊春区",
            "parent": "179"
          },
          {
            "value": "1528",
            "name": "带岭区",
            "parent": "179"
          },
          {
            "value": "1529",
            "name": "南岔区",
            "parent": "179"
          },
          {
            "value": "1530",
            "name": "金山屯区",
            "parent": "179"
          },
          {
            "value": "1531",
            "name": "西林区",
            "parent": "179"
          },
          {
            "value": "1532",
            "name": "美溪区",
            "parent": "179"
          },
          {
            "value": "1533",
            "name": "乌马河区",
            "parent": "179"
          },
          {
            "value": "1534",
            "name": "翠峦区",
            "parent": "179"
          },
          {
            "value": "1535",
            "name": "友好区",
            "parent": "179"
          },
          {
            "value": "1536",
            "name": "上甘岭区",
            "parent": "179"
          },
          {
            "value": "1537",
            "name": "五营区",
            "parent": "179"
          },
          {
            "value": "1538",
            "name": "红星区",
            "parent": "179"
          },
          {
            "value": "1539",
            "name": "新青区",
            "parent": "179"
          },
          {
            "value": "1540",
            "name": "汤旺河区",
            "parent": "179"
          },
          {
            "value": "1541",
            "name": "乌伊岭区",
            "parent": "179"
          },
          {
            "value": "1542",
            "name": "铁力市",
            "parent": "179"
          },
          {
            "value": "1543",
            "name": "嘉荫县",
            "parent": "179"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "179"
          },
          {
            "value": "13",
            "name": "湖北",
            "parent": 0
          },
          {
            "value": "180",
            "name": "武汉",
            "parent": "13"
          },
          {
            "value": "1544",
            "name": "江岸区",
            "parent": "180"
          },
          {
            "value": "1545",
            "name": "武昌区",
            "parent": "180"
          },
          {
            "value": "1546",
            "name": "江汉区",
            "parent": "180"
          },
          {
            "value": "1547",
            "name": "硚口区",
            "parent": "180"
          },
          {
            "value": "1548",
            "name": "汉阳区",
            "parent": "180"
          },
          {
            "value": "1549",
            "name": "青山区",
            "parent": "180"
          },
          {
            "value": "1550",
            "name": "洪山区",
            "parent": "180"
          },
          {
            "value": "1551",
            "name": "东西湖区",
            "parent": "180"
          },
          {
            "value": "1552",
            "name": "汉南区",
            "parent": "180"
          },
          {
            "value": "1553",
            "name": "蔡甸区",
            "parent": "180"
          },
          {
            "value": "1554",
            "name": "江夏区",
            "parent": "180"
          },
          {
            "value": "1555",
            "name": "黄陂区",
            "parent": "180"
          },
          {
            "value": "1556",
            "name": "新洲区",
            "parent": "180"
          },
          {
            "value": "1557",
            "name": "经济开发区",
            "parent": "180"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "180"
          },
          {
            "value": "181",
            "name": "仙桃",
            "parent": "13"
          },
          {
            "value": "1558",
            "name": "仙桃市",
            "parent": "181"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "181"
          },
          {
            "value": "182",
            "name": "鄂州",
            "parent": "13"
          },
          {
            "value": "1559",
            "name": "鄂城区",
            "parent": "182"
          },
          {
            "value": "1560",
            "name": "华容区",
            "parent": "182"
          },
          {
            "value": "1561",
            "name": "梁子湖区",
            "parent": "182"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "182"
          },
          {
            "value": "183",
            "name": "黄冈",
            "parent": "13"
          },
          {
            "value": "1562",
            "name": "黄州区",
            "parent": "183"
          },
          {
            "value": "1563",
            "name": "麻城市",
            "parent": "183"
          },
          {
            "value": "1564",
            "name": "武穴市",
            "parent": "183"
          },
          {
            "value": "1565",
            "name": "团风县",
            "parent": "183"
          },
          {
            "value": "1566",
            "name": "红安县",
            "parent": "183"
          },
          {
            "value": "1567",
            "name": "罗田县",
            "parent": "183"
          },
          {
            "value": "1568",
            "name": "英山县",
            "parent": "183"
          },
          {
            "value": "1569",
            "name": "浠水县",
            "parent": "183"
          },
          {
            "value": "1570",
            "name": "蕲春县",
            "parent": "183"
          },
          {
            "value": "1571",
            "name": "黄梅县",
            "parent": "183"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "183"
          },
          {
            "value": "184",
            "name": "黄石",
            "parent": "13"
          },
          {
            "value": "1572",
            "name": "黄石港区",
            "parent": "184"
          },
          {
            "value": "1573",
            "name": "西塞山区",
            "parent": "184"
          },
          {
            "value": "1574",
            "name": "下陆区",
            "parent": "184"
          },
          {
            "value": "1575",
            "name": "铁山区",
            "parent": "184"
          },
          {
            "value": "1576",
            "name": "大冶市",
            "parent": "184"
          },
          {
            "value": "1577",
            "name": "阳新县",
            "parent": "184"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "184"
          },
          {
            "value": "185",
            "name": "荆门",
            "parent": "13"
          },
          {
            "value": "1578",
            "name": "东宝区",
            "parent": "185"
          },
          {
            "value": "1579",
            "name": "掇刀区",
            "parent": "185"
          },
          {
            "value": "1580",
            "name": "钟祥市",
            "parent": "185"
          },
          {
            "value": "1581",
            "name": "京山县",
            "parent": "185"
          },
          {
            "value": "1582",
            "name": "沙洋县",
            "parent": "185"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "185"
          },
          {
            "value": "186",
            "name": "荆州",
            "parent": "13"
          },
          {
            "value": "1583",
            "name": "沙市区",
            "parent": "186"
          },
          {
            "value": "1584",
            "name": "荆州区",
            "parent": "186"
          },
          {
            "value": "1585",
            "name": "石首市",
            "parent": "186"
          },
          {
            "value": "1586",
            "name": "洪湖市",
            "parent": "186"
          },
          {
            "value": "1587",
            "name": "松滋市",
            "parent": "186"
          },
          {
            "value": "1588",
            "name": "公安县",
            "parent": "186"
          },
          {
            "value": "1589",
            "name": "监利县",
            "parent": "186"
          },
          {
            "value": "1590",
            "name": "江陵县",
            "parent": "186"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "186"
          },
          {
            "value": "187",
            "name": "潜江",
            "parent": "13"
          },
          {
            "value": "1591",
            "name": "潜江市",
            "parent": "187"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "187"
          },
          {
            "value": "188",
            "name": "神农架林区",
            "parent": "13"
          },
          {
            "value": "1592",
            "name": "神农架林区",
            "parent": "188"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "188"
          },
          {
            "value": "189",
            "name": "十堰",
            "parent": "13"
          },
          {
            "value": "1593",
            "name": "张湾区",
            "parent": "189"
          },
          {
            "value": "1594",
            "name": "茅箭区",
            "parent": "189"
          },
          {
            "value": "1595",
            "name": "丹江口市",
            "parent": "189"
          },
          {
            "value": "1596",
            "name": "郧县",
            "parent": "189"
          },
          {
            "value": "1597",
            "name": "郧西县",
            "parent": "189"
          },
          {
            "value": "1598",
            "name": "竹山县",
            "parent": "189"
          },
          {
            "value": "1599",
            "name": "竹溪县",
            "parent": "189"
          },
          {
            "value": "1600",
            "name": "房县",
            "parent": "189"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "189"
          },
          {
            "value": "190",
            "name": "随州",
            "parent": "13"
          },
          {
            "value": "1601",
            "name": "曾都区",
            "parent": "190"
          },
          {
            "value": "1602",
            "name": "广水市",
            "parent": "190"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "190"
          },
          {
            "value": "191",
            "name": "天门",
            "parent": "13"
          },
          {
            "value": "1603",
            "name": "天门市",
            "parent": "191"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "191"
          },
          {
            "value": "192",
            "name": "咸宁",
            "parent": "13"
          },
          {
            "value": "1604",
            "name": "咸安区",
            "parent": "192"
          },
          {
            "value": "1605",
            "name": "赤壁市",
            "parent": "192"
          },
          {
            "value": "1606",
            "name": "嘉鱼县",
            "parent": "192"
          },
          {
            "value": "1607",
            "name": "通城县",
            "parent": "192"
          },
          {
            "value": "1608",
            "name": "崇阳县",
            "parent": "192"
          },
          {
            "value": "1609",
            "name": "通山县",
            "parent": "192"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "192"
          },
          {
            "value": "193",
            "name": "襄阳",
            "parent": "13"
          },
          {
            "value": "1610",
            "name": "襄城区",
            "parent": "193"
          },
          {
            "value": "1611",
            "name": "樊城区",
            "parent": "193"
          },
          {
            "value": "1612",
            "name": "襄阳区",
            "parent": "193"
          },
          {
            "value": "1613",
            "name": "老河口市",
            "parent": "193"
          },
          {
            "value": "1614",
            "name": "枣阳市",
            "parent": "193"
          },
          {
            "value": "1615",
            "name": "宜城市",
            "parent": "193"
          },
          {
            "value": "1616",
            "name": "南漳县",
            "parent": "193"
          },
          {
            "value": "1617",
            "name": "谷城县",
            "parent": "193"
          },
          {
            "value": "1618",
            "name": "保康县",
            "parent": "193"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "193"
          },
          {
            "value": "194",
            "name": "孝感",
            "parent": "13"
          },
          {
            "value": "1619",
            "name": "孝南区",
            "parent": "194"
          },
          {
            "value": "1620",
            "name": "应城市",
            "parent": "194"
          },
          {
            "value": "1621",
            "name": "安陆市",
            "parent": "194"
          },
          {
            "value": "1622",
            "name": "汉川市",
            "parent": "194"
          },
          {
            "value": "1623",
            "name": "孝昌县",
            "parent": "194"
          },
          {
            "value": "1624",
            "name": "大悟县",
            "parent": "194"
          },
          {
            "value": "1625",
            "name": "云梦县",
            "parent": "194"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "194"
          },
          {
            "value": "195",
            "name": "宜昌",
            "parent": "13"
          },
          {
            "value": "1626",
            "name": "长阳",
            "parent": "195"
          },
          {
            "value": "1627",
            "name": "五峰",
            "parent": "195"
          },
          {
            "value": "1628",
            "name": "西陵区",
            "parent": "195"
          },
          {
            "value": "1629",
            "name": "伍家岗区",
            "parent": "195"
          },
          {
            "value": "1630",
            "name": "点军区",
            "parent": "195"
          },
          {
            "value": "1631",
            "name": "猇亭区",
            "parent": "195"
          },
          {
            "value": "1632",
            "name": "夷陵区",
            "parent": "195"
          },
          {
            "value": "1633",
            "name": "宜都市",
            "parent": "195"
          },
          {
            "value": "1634",
            "name": "当阳市",
            "parent": "195"
          },
          {
            "value": "1635",
            "name": "枝江市",
            "parent": "195"
          },
          {
            "value": "1636",
            "name": "远安县",
            "parent": "195"
          },
          {
            "value": "1637",
            "name": "兴山县",
            "parent": "195"
          },
          {
            "value": "1638",
            "name": "秭归县",
            "parent": "195"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "195"
          },
          {
            "value": "196",
            "name": "恩施",
            "parent": "13"
          },
          {
            "value": "1639",
            "name": "恩施市",
            "parent": "196"
          },
          {
            "value": "1640",
            "name": "利川市",
            "parent": "196"
          },
          {
            "value": "1641",
            "name": "建始县",
            "parent": "196"
          },
          {
            "value": "1642",
            "name": "巴东县",
            "parent": "196"
          },
          {
            "value": "1643",
            "name": "宣恩县",
            "parent": "196"
          },
          {
            "value": "1644",
            "name": "咸丰县",
            "parent": "196"
          },
          {
            "value": "1645",
            "name": "来凤县",
            "parent": "196"
          },
          {
            "value": "1646",
            "name": "鹤峰县",
            "parent": "196"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "196"
          },
          {
            "value": "14",
            "name": "湖南",
            "parent": 0
          },
          {
            "value": "197",
            "name": "长沙",
            "parent": "14"
          },
          {
            "value": "1647",
            "name": "岳麓区",
            "parent": "197"
          },
          {
            "value": "1648",
            "name": "芙蓉区",
            "parent": "197"
          },
          {
            "value": "1649",
            "name": "天心区",
            "parent": "197"
          },
          {
            "value": "1650",
            "name": "开福区",
            "parent": "197"
          },
          {
            "value": "1651",
            "name": "雨花区",
            "parent": "197"
          },
          {
            "value": "1652",
            "name": "开发区",
            "parent": "197"
          },
          {
            "value": "1653",
            "name": "浏阳市",
            "parent": "197"
          },
          {
            "value": "1654",
            "name": "长沙县",
            "parent": "197"
          },
          {
            "value": "1655",
            "name": "望城县",
            "parent": "197"
          },
          {
            "value": "1656",
            "name": "宁乡县",
            "parent": "197"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "197"
          },
          {
            "value": "198",
            "name": "张家界",
            "parent": "14"
          },
          {
            "value": "1657",
            "name": "永定区",
            "parent": "198"
          },
          {
            "value": "1658",
            "name": "武陵源区",
            "parent": "198"
          },
          {
            "value": "1659",
            "name": "慈利县",
            "parent": "198"
          },
          {
            "value": "1660",
            "name": "桑植县",
            "parent": "198"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "198"
          },
          {
            "value": "199",
            "name": "常德",
            "parent": "14"
          },
          {
            "value": "1661",
            "name": "武陵区",
            "parent": "199"
          },
          {
            "value": "1662",
            "name": "鼎城区",
            "parent": "199"
          },
          {
            "value": "1663",
            "name": "津市市",
            "parent": "199"
          },
          {
            "value": "1664",
            "name": "安乡县",
            "parent": "199"
          },
          {
            "value": "1665",
            "name": "汉寿县",
            "parent": "199"
          },
          {
            "value": "1666",
            "name": "澧县",
            "parent": "199"
          },
          {
            "value": "1667",
            "name": "临澧县",
            "parent": "199"
          },
          {
            "value": "1668",
            "name": "桃源县",
            "parent": "199"
          },
          {
            "value": "1669",
            "name": "石门县",
            "parent": "199"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "199"
          },
          {
            "value": "200",
            "name": "郴州",
            "parent": "14"
          },
          {
            "value": "1670",
            "name": "北湖区",
            "parent": "200"
          },
          {
            "value": "1671",
            "name": "苏仙区",
            "parent": "200"
          },
          {
            "value": "1672",
            "name": "资兴市",
            "parent": "200"
          },
          {
            "value": "1673",
            "name": "桂阳县",
            "parent": "200"
          },
          {
            "value": "1674",
            "name": "宜章县",
            "parent": "200"
          },
          {
            "value": "1675",
            "name": "永兴县",
            "parent": "200"
          },
          {
            "value": "1676",
            "name": "嘉禾县",
            "parent": "200"
          },
          {
            "value": "1677",
            "name": "临武县",
            "parent": "200"
          },
          {
            "value": "1678",
            "name": "汝城县",
            "parent": "200"
          },
          {
            "value": "1679",
            "name": "桂东县",
            "parent": "200"
          },
          {
            "value": "1680",
            "name": "安仁县",
            "parent": "200"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "200"
          },
          {
            "value": "201",
            "name": "衡阳",
            "parent": "14"
          },
          {
            "value": "1681",
            "name": "雁峰区",
            "parent": "201"
          },
          {
            "value": "1682",
            "name": "珠晖区",
            "parent": "201"
          },
          {
            "value": "1683",
            "name": "石鼓区",
            "parent": "201"
          },
          {
            "value": "1684",
            "name": "蒸湘区",
            "parent": "201"
          },
          {
            "value": "1685",
            "name": "南岳区",
            "parent": "201"
          },
          {
            "value": "1686",
            "name": "耒阳市",
            "parent": "201"
          },
          {
            "value": "1687",
            "name": "常宁市",
            "parent": "201"
          },
          {
            "value": "1688",
            "name": "衡阳县",
            "parent": "201"
          },
          {
            "value": "1689",
            "name": "衡南县",
            "parent": "201"
          },
          {
            "value": "1690",
            "name": "衡山县",
            "parent": "201"
          },
          {
            "value": "1691",
            "name": "衡东县",
            "parent": "201"
          },
          {
            "value": "1692",
            "name": "祁东县",
            "parent": "201"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "201"
          },
          {
            "value": "202",
            "name": "怀化",
            "parent": "14"
          },
          {
            "value": "1693",
            "name": "鹤城区",
            "parent": "202"
          },
          {
            "value": "1694",
            "name": "靖州",
            "parent": "202"
          },
          {
            "value": "1695",
            "name": "麻阳",
            "parent": "202"
          },
          {
            "value": "1696",
            "name": "通道",
            "parent": "202"
          },
          {
            "value": "1697",
            "name": "新晃",
            "parent": "202"
          },
          {
            "value": "1698",
            "name": "芷江",
            "parent": "202"
          },
          {
            "value": "1699",
            "name": "沅陵县",
            "parent": "202"
          },
          {
            "value": "1700",
            "name": "辰溪县",
            "parent": "202"
          },
          {
            "value": "1701",
            "name": "溆浦县",
            "parent": "202"
          },
          {
            "value": "1702",
            "name": "中方县",
            "parent": "202"
          },
          {
            "value": "1703",
            "name": "会同县",
            "parent": "202"
          },
          {
            "value": "1704",
            "name": "洪江市",
            "parent": "202"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "202"
          },
          {
            "value": "203",
            "name": "娄底",
            "parent": "14"
          },
          {
            "value": "1705",
            "name": "娄星区",
            "parent": "203"
          },
          {
            "value": "1706",
            "name": "冷水江市",
            "parent": "203"
          },
          {
            "value": "1707",
            "name": "涟源市",
            "parent": "203"
          },
          {
            "value": "1708",
            "name": "双峰县",
            "parent": "203"
          },
          {
            "value": "1709",
            "name": "新化县",
            "parent": "203"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "203"
          },
          {
            "value": "204",
            "name": "邵阳",
            "parent": "14"
          },
          {
            "value": "1710",
            "name": "城步",
            "parent": "204"
          },
          {
            "value": "1711",
            "name": "双清区",
            "parent": "204"
          },
          {
            "value": "1712",
            "name": "大祥区",
            "parent": "204"
          },
          {
            "value": "1713",
            "name": "北塔区",
            "parent": "204"
          },
          {
            "value": "1714",
            "name": "武冈市",
            "parent": "204"
          },
          {
            "value": "1715",
            "name": "邵东县",
            "parent": "204"
          },
          {
            "value": "1716",
            "name": "新邵县",
            "parent": "204"
          },
          {
            "value": "1717",
            "name": "邵阳县",
            "parent": "204"
          },
          {
            "value": "1718",
            "name": "隆回县",
            "parent": "204"
          },
          {
            "value": "1719",
            "name": "洞口县",
            "parent": "204"
          },
          {
            "value": "1720",
            "name": "绥宁县",
            "parent": "204"
          },
          {
            "value": "1721",
            "name": "新宁县",
            "parent": "204"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "204"
          },
          {
            "value": "205",
            "name": "湘潭",
            "parent": "14"
          },
          {
            "value": "1722",
            "name": "岳塘区",
            "parent": "205"
          },
          {
            "value": "1723",
            "name": "雨湖区",
            "parent": "205"
          },
          {
            "value": "1724",
            "name": "湘乡市",
            "parent": "205"
          },
          {
            "value": "1725",
            "name": "韶山市",
            "parent": "205"
          },
          {
            "value": "1726",
            "name": "湘潭县",
            "parent": "205"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "205"
          },
          {
            "value": "206",
            "name": "湘西",
            "parent": "14"
          },
          {
            "value": "1727",
            "name": "吉首市",
            "parent": "206"
          },
          {
            "value": "1728",
            "name": "泸溪县",
            "parent": "206"
          },
          {
            "value": "1729",
            "name": "凤凰县",
            "parent": "206"
          },
          {
            "value": "1730",
            "name": "花垣县",
            "parent": "206"
          },
          {
            "value": "1731",
            "name": "保靖县",
            "parent": "206"
          },
          {
            "value": "1732",
            "name": "古丈县",
            "parent": "206"
          },
          {
            "value": "1733",
            "name": "永顺县",
            "parent": "206"
          },
          {
            "value": "1734",
            "name": "龙山县",
            "parent": "206"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "206"
          },
          {
            "value": "207",
            "name": "益阳",
            "parent": "14"
          },
          {
            "value": "1735",
            "name": "赫山区",
            "parent": "207"
          },
          {
            "value": "1736",
            "name": "资阳区",
            "parent": "207"
          },
          {
            "value": "1737",
            "name": "沅江市",
            "parent": "207"
          },
          {
            "value": "1738",
            "name": "南县",
            "parent": "207"
          },
          {
            "value": "1739",
            "name": "桃江县",
            "parent": "207"
          },
          {
            "value": "1740",
            "name": "安化县",
            "parent": "207"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "207"
          },
          {
            "value": "208",
            "name": "永州",
            "parent": "14"
          },
          {
            "value": "1741",
            "name": "江华",
            "parent": "208"
          },
          {
            "value": "1742",
            "name": "冷水滩区",
            "parent": "208"
          },
          {
            "value": "1743",
            "name": "零陵区",
            "parent": "208"
          },
          {
            "value": "1744",
            "name": "祁阳县",
            "parent": "208"
          },
          {
            "value": "1745",
            "name": "东安县",
            "parent": "208"
          },
          {
            "value": "1746",
            "name": "双牌县",
            "parent": "208"
          },
          {
            "value": "1747",
            "name": "道县",
            "parent": "208"
          },
          {
            "value": "1748",
            "name": "江永县",
            "parent": "208"
          },
          {
            "value": "1749",
            "name": "宁远县",
            "parent": "208"
          },
          {
            "value": "1750",
            "name": "蓝山县",
            "parent": "208"
          },
          {
            "value": "1751",
            "name": "新田县",
            "parent": "208"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "208"
          },
          {
            "value": "209",
            "name": "岳阳",
            "parent": "14"
          },
          {
            "value": "1752",
            "name": "岳阳楼区",
            "parent": "209"
          },
          {
            "value": "1753",
            "name": "君山区",
            "parent": "209"
          },
          {
            "value": "1754",
            "name": "云溪区",
            "parent": "209"
          },
          {
            "value": "1755",
            "name": "汨罗市",
            "parent": "209"
          },
          {
            "value": "1756",
            "name": "临湘市",
            "parent": "209"
          },
          {
            "value": "1757",
            "name": "岳阳县",
            "parent": "209"
          },
          {
            "value": "1758",
            "name": "华容县",
            "parent": "209"
          },
          {
            "value": "1759",
            "name": "湘阴县",
            "parent": "209"
          },
          {
            "value": "1760",
            "name": "平江县",
            "parent": "209"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "209"
          },
          {
            "value": "210",
            "name": "株洲",
            "parent": "14"
          },
          {
            "value": "1761",
            "name": "天元区",
            "parent": "210"
          },
          {
            "value": "1762",
            "name": "荷塘区",
            "parent": "210"
          },
          {
            "value": "1763",
            "name": "芦淞区",
            "parent": "210"
          },
          {
            "value": "1764",
            "name": "石峰区",
            "parent": "210"
          },
          {
            "value": "1765",
            "name": "醴陵市",
            "parent": "210"
          },
          {
            "value": "1766",
            "name": "株洲县",
            "parent": "210"
          },
          {
            "value": "1767",
            "name": "攸县",
            "parent": "210"
          },
          {
            "value": "1768",
            "name": "茶陵县",
            "parent": "210"
          },
          {
            "value": "1769",
            "name": "炎陵县",
            "parent": "210"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "210"
          },
          {
            "value": "15",
            "name": "吉林",
            "parent": 0
          },
          {
            "value": "211",
            "name": "长春",
            "parent": "15"
          },
          {
            "value": "1770",
            "name": "朝阳区",
            "parent": "211"
          },
          {
            "value": "1771",
            "name": "宽城区",
            "parent": "211"
          },
          {
            "value": "1772",
            "name": "二道区",
            "parent": "211"
          },
          {
            "value": "1773",
            "name": "南关区",
            "parent": "211"
          },
          {
            "value": "1774",
            "name": "绿园区",
            "parent": "211"
          },
          {
            "value": "1775",
            "name": "双阳区",
            "parent": "211"
          },
          {
            "value": "1776",
            "name": "净月潭开发区",
            "parent": "211"
          },
          {
            "value": "1777",
            "name": "高新技术开发区",
            "parent": "211"
          },
          {
            "value": "1778",
            "name": "经济技术开发区",
            "parent": "211"
          },
          {
            "value": "1779",
            "name": "汽车产业开发区",
            "parent": "211"
          },
          {
            "value": "1780",
            "name": "德惠市",
            "parent": "211"
          },
          {
            "value": "1781",
            "name": "九台市",
            "parent": "211"
          },
          {
            "value": "1782",
            "name": "榆树市",
            "parent": "211"
          },
          {
            "value": "1783",
            "name": "农安县",
            "parent": "211"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "211"
          },
          {
            "value": "212",
            "name": "吉林",
            "parent": "15"
          },
          {
            "value": "1784",
            "name": "船营区",
            "parent": "212"
          },
          {
            "value": "1785",
            "name": "昌邑区",
            "parent": "212"
          },
          {
            "value": "1786",
            "name": "龙潭区",
            "parent": "212"
          },
          {
            "value": "1787",
            "name": "丰满区",
            "parent": "212"
          },
          {
            "value": "1788",
            "name": "蛟河市",
            "parent": "212"
          },
          {
            "value": "1789",
            "name": "桦甸市",
            "parent": "212"
          },
          {
            "value": "1790",
            "name": "舒兰市",
            "parent": "212"
          },
          {
            "value": "1791",
            "name": "磐石市",
            "parent": "212"
          },
          {
            "value": "1792",
            "name": "永吉县",
            "parent": "212"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "212"
          },
          {
            "value": "213",
            "name": "白城",
            "parent": "15"
          },
          {
            "value": "1793",
            "name": "洮北区",
            "parent": "213"
          },
          {
            "value": "1794",
            "name": "洮南市",
            "parent": "213"
          },
          {
            "value": "1795",
            "name": "大安市",
            "parent": "213"
          },
          {
            "value": "1796",
            "name": "镇赉县",
            "parent": "213"
          },
          {
            "value": "1797",
            "name": "通榆县",
            "parent": "213"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "213"
          },
          {
            "value": "214",
            "name": "白山",
            "parent": "15"
          },
          {
            "value": "1798",
            "name": "江源区",
            "parent": "214"
          },
          {
            "value": "1799",
            "name": "八道江区",
            "parent": "214"
          },
          {
            "value": "1800",
            "name": "长白",
            "parent": "214"
          },
          {
            "value": "1801",
            "name": "临江市",
            "parent": "214"
          },
          {
            "value": "1802",
            "name": "抚松县",
            "parent": "214"
          },
          {
            "value": "1803",
            "name": "靖宇县",
            "parent": "214"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "214"
          },
          {
            "value": "215",
            "name": "辽源",
            "parent": "15"
          },
          {
            "value": "1804",
            "name": "龙山区",
            "parent": "215"
          },
          {
            "value": "1805",
            "name": "西安区",
            "parent": "215"
          },
          {
            "value": "1806",
            "name": "东丰县",
            "parent": "215"
          },
          {
            "value": "1807",
            "name": "东辽县",
            "parent": "215"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "215"
          },
          {
            "value": "216",
            "name": "四平",
            "parent": "15"
          },
          {
            "value": "1808",
            "name": "铁西区",
            "parent": "216"
          },
          {
            "value": "1809",
            "name": "铁东区",
            "parent": "216"
          },
          {
            "value": "1810",
            "name": "伊通",
            "parent": "216"
          },
          {
            "value": "1811",
            "name": "公主岭市",
            "parent": "216"
          },
          {
            "value": "1812",
            "name": "双辽市",
            "parent": "216"
          },
          {
            "value": "1813",
            "name": "梨树县",
            "parent": "216"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "216"
          },
          {
            "value": "217",
            "name": "松原",
            "parent": "15"
          },
          {
            "value": "1814",
            "name": "前郭尔罗斯",
            "parent": "217"
          },
          {
            "value": "1815",
            "name": "宁江区",
            "parent": "217"
          },
          {
            "value": "1816",
            "name": "长岭县",
            "parent": "217"
          },
          {
            "value": "1817",
            "name": "乾安县",
            "parent": "217"
          },
          {
            "value": "1818",
            "name": "扶余县",
            "parent": "217"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "217"
          },
          {
            "value": "218",
            "name": "通化",
            "parent": "15"
          },
          {
            "value": "1819",
            "name": "东昌区",
            "parent": "218"
          },
          {
            "value": "1820",
            "name": "二道江区",
            "parent": "218"
          },
          {
            "value": "1821",
            "name": "梅河口市",
            "parent": "218"
          },
          {
            "value": "1822",
            "name": "集安市",
            "parent": "218"
          },
          {
            "value": "1823",
            "name": "通化县",
            "parent": "218"
          },
          {
            "value": "1824",
            "name": "辉南县",
            "parent": "218"
          },
          {
            "value": "1825",
            "name": "柳河县",
            "parent": "218"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "218"
          },
          {
            "value": "219",
            "name": "延边",
            "parent": "15"
          },
          {
            "value": "1826",
            "name": "延吉市",
            "parent": "219"
          },
          {
            "value": "1827",
            "name": "图们市",
            "parent": "219"
          },
          {
            "value": "1828",
            "name": "敦化市",
            "parent": "219"
          },
          {
            "value": "1829",
            "name": "珲春市",
            "parent": "219"
          },
          {
            "value": "1830",
            "name": "龙井市",
            "parent": "219"
          },
          {
            "value": "1831",
            "name": "和龙市",
            "parent": "219"
          },
          {
            "value": "1832",
            "name": "安图县",
            "parent": "219"
          },
          {
            "value": "1833",
            "name": "汪清县",
            "parent": "219"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "219"
          },
          {
            "value": "16",
            "name": "江苏",
            "parent": 0
          },
          {
            "value": "220",
            "name": "南京",
            "parent": "16"
          },
          {
            "value": "1834",
            "name": "玄武区",
            "parent": "220"
          },
          {
            "value": "1835",
            "name": "鼓楼区",
            "parent": "220"
          },
          {
            "value": "1836",
            "name": "白下区",
            "parent": "220"
          },
          {
            "value": "1837",
            "name": "建邺区",
            "parent": "220"
          },
          {
            "value": "1838",
            "name": "秦淮区",
            "parent": "220"
          },
          {
            "value": "1839",
            "name": "雨花台区",
            "parent": "220"
          },
          {
            "value": "1840",
            "name": "下关区",
            "parent": "220"
          },
          {
            "value": "1841",
            "name": "栖霞区",
            "parent": "220"
          },
          {
            "value": "1842",
            "name": "浦口区",
            "parent": "220"
          },
          {
            "value": "1843",
            "name": "江宁区",
            "parent": "220"
          },
          {
            "value": "1844",
            "name": "六合区",
            "parent": "220"
          },
          {
            "value": "1845",
            "name": "溧水县",
            "parent": "220"
          },
          {
            "value": "1846",
            "name": "高淳县",
            "parent": "220"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "220"
          },
          {
            "value": "221",
            "name": "苏州",
            "parent": "16"
          },
          {
            "value": "1847",
            "name": "沧浪区",
            "parent": "221"
          },
          {
            "value": "1848",
            "name": "金阊区",
            "parent": "221"
          },
          {
            "value": "1849",
            "name": "平江区",
            "parent": "221"
          },
          {
            "value": "1850",
            "name": "虎丘区",
            "parent": "221"
          },
          {
            "value": "1851",
            "name": "吴中区",
            "parent": "221"
          },
          {
            "value": "1852",
            "name": "相城区",
            "parent": "221"
          },
          {
            "value": "1853",
            "name": "园区",
            "parent": "221"
          },
          {
            "value": "1854",
            "name": "新区",
            "parent": "221"
          },
          {
            "value": "1855",
            "name": "常熟市",
            "parent": "221"
          },
          {
            "value": "1856",
            "name": "张家港市",
            "parent": "221"
          },
          {
            "value": "1857",
            "name": "玉山镇",
            "parent": "221"
          },
          {
            "value": "1858",
            "name": "巴城镇",
            "parent": "221"
          },
          {
            "value": "1859",
            "name": "周市镇",
            "parent": "221"
          },
          {
            "value": "1860",
            "name": "陆家镇",
            "parent": "221"
          },
          {
            "value": "1861",
            "name": "花桥镇",
            "parent": "221"
          },
          {
            "value": "1862",
            "name": "淀山湖镇",
            "parent": "221"
          },
          {
            "value": "1863",
            "name": "张浦镇",
            "parent": "221"
          },
          {
            "value": "1864",
            "name": "周庄镇",
            "parent": "221"
          },
          {
            "value": "1865",
            "name": "千灯镇",
            "parent": "221"
          },
          {
            "value": "1866",
            "name": "锦溪镇",
            "parent": "221"
          },
          {
            "value": "1867",
            "name": "开发区",
            "parent": "221"
          },
          {
            "value": "1868",
            "name": "吴江市",
            "parent": "221"
          },
          {
            "value": "1869",
            "name": "太仓市",
            "parent": "221"
          },
          {
            "value": "3409",
            "name": "昆山市",
            "parent": "221"
          },
          {
            "value": "3411",
            "name": "姑苏区",
            "parent": "221"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "221"
          },
          {
            "value": "222",
            "name": "无锡",
            "parent": "16"
          },
          {
            "value": "1870",
            "name": "崇安区",
            "parent": "222"
          },
          {
            "value": "1871",
            "name": "北塘区",
            "parent": "222"
          },
          {
            "value": "1872",
            "name": "南长区",
            "parent": "222"
          },
          {
            "value": "1873",
            "name": "锡山区",
            "parent": "222"
          },
          {
            "value": "1874",
            "name": "惠山区",
            "parent": "222"
          },
          {
            "value": "1875",
            "name": "滨湖区",
            "parent": "222"
          },
          {
            "value": "1876",
            "name": "新区",
            "parent": "222"
          },
          {
            "value": "1877",
            "name": "江阴市",
            "parent": "222"
          },
          {
            "value": "1878",
            "name": "宜兴市",
            "parent": "222"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "222"
          },
          {
            "value": "223",
            "name": "常州",
            "parent": "16"
          },
          {
            "value": "1879",
            "name": "天宁区",
            "parent": "223"
          },
          {
            "value": "1880",
            "name": "钟楼区",
            "parent": "223"
          },
          {
            "value": "1881",
            "name": "戚墅堰区",
            "parent": "223"
          },
          {
            "value": "1882",
            "name": "郊区",
            "parent": "223"
          },
          {
            "value": "1883",
            "name": "新北区",
            "parent": "223"
          },
          {
            "value": "1884",
            "name": "武进区",
            "parent": "223"
          },
          {
            "value": "1885",
            "name": "溧阳市",
            "parent": "223"
          },
          {
            "value": "1886",
            "name": "金坛市",
            "parent": "223"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "223"
          },
          {
            "value": "224",
            "name": "淮安",
            "parent": "16"
          },
          {
            "value": "1887",
            "name": "清河区",
            "parent": "224"
          },
          {
            "value": "1888",
            "name": "清浦区",
            "parent": "224"
          },
          {
            "value": "1889",
            "name": "楚州区",
            "parent": "224"
          },
          {
            "value": "1890",
            "name": "淮阴区",
            "parent": "224"
          },
          {
            "value": "1891",
            "name": "涟水县",
            "parent": "224"
          },
          {
            "value": "1892",
            "name": "洪泽县",
            "parent": "224"
          },
          {
            "value": "1893",
            "name": "盱眙县",
            "parent": "224"
          },
          {
            "value": "1894",
            "name": "金湖县",
            "parent": "224"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "224"
          },
          {
            "value": "225",
            "name": "连云港",
            "parent": "16"
          },
          {
            "value": "1895",
            "name": "新浦区",
            "parent": "225"
          },
          {
            "value": "1896",
            "name": "连云区",
            "parent": "225"
          },
          {
            "value": "1897",
            "name": "海州区",
            "parent": "225"
          },
          {
            "value": "1898",
            "name": "赣榆县",
            "parent": "225"
          },
          {
            "value": "1899",
            "name": "东海县",
            "parent": "225"
          },
          {
            "value": "1900",
            "name": "灌云县",
            "parent": "225"
          },
          {
            "value": "1901",
            "name": "灌南县",
            "parent": "225"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "225"
          },
          {
            "value": "226",
            "name": "南通",
            "parent": "16"
          },
          {
            "value": "1902",
            "name": "崇川区",
            "parent": "226"
          },
          {
            "value": "1903",
            "name": "港闸区",
            "parent": "226"
          },
          {
            "value": "1904",
            "name": "经济开发区",
            "parent": "226"
          },
          {
            "value": "1905",
            "name": "启东市",
            "parent": "226"
          },
          {
            "value": "1906",
            "name": "如皋市",
            "parent": "226"
          },
          {
            "value": "1907",
            "name": "通州市",
            "parent": "226"
          },
          {
            "value": "1908",
            "name": "海门市",
            "parent": "226"
          },
          {
            "value": "1909",
            "name": "海安县",
            "parent": "226"
          },
          {
            "value": "1910",
            "name": "如东县",
            "parent": "226"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "226"
          },
          {
            "value": "227",
            "name": "宿迁",
            "parent": "16"
          },
          {
            "value": "1911",
            "name": "宿城区",
            "parent": "227"
          },
          {
            "value": "1912",
            "name": "宿豫区",
            "parent": "227"
          },
          {
            "value": "1913",
            "name": "宿豫县",
            "parent": "227"
          },
          {
            "value": "1914",
            "name": "沭阳县",
            "parent": "227"
          },
          {
            "value": "1915",
            "name": "泗阳县",
            "parent": "227"
          },
          {
            "value": "1916",
            "name": "泗洪县",
            "parent": "227"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "227"
          },
          {
            "value": "228",
            "name": "泰州",
            "parent": "16"
          },
          {
            "value": "1917",
            "name": "海陵区",
            "parent": "228"
          },
          {
            "value": "1918",
            "name": "高港区",
            "parent": "228"
          },
          {
            "value": "1919",
            "name": "兴化市",
            "parent": "228"
          },
          {
            "value": "1920",
            "name": "靖江市",
            "parent": "228"
          },
          {
            "value": "1921",
            "name": "泰兴市",
            "parent": "228"
          },
          {
            "value": "1922",
            "name": "姜堰市",
            "parent": "228"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "228"
          },
          {
            "value": "229",
            "name": "徐州",
            "parent": "16"
          },
          {
            "value": "1923",
            "name": "云龙区",
            "parent": "229"
          },
          {
            "value": "1924",
            "name": "鼓楼区",
            "parent": "229"
          },
          {
            "value": "1925",
            "name": "九里区",
            "parent": "229"
          },
          {
            "value": "1926",
            "name": "贾汪区",
            "parent": "229"
          },
          {
            "value": "1927",
            "name": "泉山区",
            "parent": "229"
          },
          {
            "value": "1928",
            "name": "新沂市",
            "parent": "229"
          },
          {
            "value": "1929",
            "name": "邳州市",
            "parent": "229"
          },
          {
            "value": "1930",
            "name": "丰县",
            "parent": "229"
          },
          {
            "value": "1931",
            "name": "沛县",
            "parent": "229"
          },
          {
            "value": "1932",
            "name": "铜山县",
            "parent": "229"
          },
          {
            "value": "1933",
            "name": "睢宁县",
            "parent": "229"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "229"
          },
          {
            "value": "230",
            "name": "盐城",
            "parent": "16"
          },
          {
            "value": "1934",
            "name": "城区",
            "parent": "230"
          },
          {
            "value": "1935",
            "name": "亭湖区",
            "parent": "230"
          },
          {
            "value": "1936",
            "name": "盐都区",
            "parent": "230"
          },
          {
            "value": "1937",
            "name": "盐都县",
            "parent": "230"
          },
          {
            "value": "1938",
            "name": "东台市",
            "parent": "230"
          },
          {
            "value": "1939",
            "name": "大丰市",
            "parent": "230"
          },
          {
            "value": "1940",
            "name": "响水县",
            "parent": "230"
          },
          {
            "value": "1941",
            "name": "滨海县",
            "parent": "230"
          },
          {
            "value": "1942",
            "name": "阜宁县",
            "parent": "230"
          },
          {
            "value": "1943",
            "name": "射阳县",
            "parent": "230"
          },
          {
            "value": "1944",
            "name": "建湖县",
            "parent": "230"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "230"
          },
          {
            "value": "231",
            "name": "扬州",
            "parent": "16"
          },
          {
            "value": "1945",
            "name": "广陵区",
            "parent": "231"
          },
          {
            "value": "1946",
            "name": "维扬区",
            "parent": "231"
          },
          {
            "value": "1947",
            "name": "邗江区",
            "parent": "231"
          },
          {
            "value": "1948",
            "name": "仪征市",
            "parent": "231"
          },
          {
            "value": "1949",
            "name": "高邮市",
            "parent": "231"
          },
          {
            "value": "1950",
            "name": "江都市",
            "parent": "231"
          },
          {
            "value": "1951",
            "name": "宝应县",
            "parent": "231"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "231"
          },
          {
            "value": "232",
            "name": "镇江",
            "parent": "16"
          },
          {
            "value": "1952",
            "name": "京口区",
            "parent": "232"
          },
          {
            "value": "1953",
            "name": "润州区",
            "parent": "232"
          },
          {
            "value": "1954",
            "name": "丹徒区",
            "parent": "232"
          },
          {
            "value": "1955",
            "name": "丹阳市",
            "parent": "232"
          },
          {
            "value": "1956",
            "name": "扬中市",
            "parent": "232"
          },
          {
            "value": "1957",
            "name": "句容市",
            "parent": "232"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "232"
          },
          {
            "value": "17",
            "name": "江西",
            "parent": 0
          },
          {
            "value": "233",
            "name": "南昌",
            "parent": "17"
          },
          {
            "value": "1958",
            "name": "东湖区",
            "parent": "233"
          },
          {
            "value": "1959",
            "name": "西湖区",
            "parent": "233"
          },
          {
            "value": "1960",
            "name": "青云谱区",
            "parent": "233"
          },
          {
            "value": "1961",
            "name": "湾里区",
            "parent": "233"
          },
          {
            "value": "1962",
            "name": "青山湖区",
            "parent": "233"
          },
          {
            "value": "1963",
            "name": "红谷滩新区",
            "parent": "233"
          },
          {
            "value": "1964",
            "name": "昌北区",
            "parent": "233"
          },
          {
            "value": "1965",
            "name": "高新区",
            "parent": "233"
          },
          {
            "value": "1966",
            "name": "南昌县",
            "parent": "233"
          },
          {
            "value": "1967",
            "name": "新建县",
            "parent": "233"
          },
          {
            "value": "1968",
            "name": "安义县",
            "parent": "233"
          },
          {
            "value": "1969",
            "name": "进贤县",
            "parent": "233"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "233"
          },
          {
            "value": "234",
            "name": "抚州",
            "parent": "17"
          },
          {
            "value": "1970",
            "name": "临川区",
            "parent": "234"
          },
          {
            "value": "1971",
            "name": "南城县",
            "parent": "234"
          },
          {
            "value": "1972",
            "name": "黎川县",
            "parent": "234"
          },
          {
            "value": "1973",
            "name": "南丰县",
            "parent": "234"
          },
          {
            "value": "1974",
            "name": "崇仁县",
            "parent": "234"
          },
          {
            "value": "1975",
            "name": "乐安县",
            "parent": "234"
          },
          {
            "value": "1976",
            "name": "宜黄县",
            "parent": "234"
          },
          {
            "value": "1977",
            "name": "金溪县",
            "parent": "234"
          },
          {
            "value": "1978",
            "name": "资溪县",
            "parent": "234"
          },
          {
            "value": "1979",
            "name": "东乡县",
            "parent": "234"
          },
          {
            "value": "1980",
            "name": "广昌县",
            "parent": "234"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "234"
          },
          {
            "value": "235",
            "name": "赣州",
            "parent": "17"
          },
          {
            "value": "1981",
            "name": "章贡区",
            "parent": "235"
          },
          {
            "value": "1982",
            "name": "于都县",
            "parent": "235"
          },
          {
            "value": "1983",
            "name": "瑞金市",
            "parent": "235"
          },
          {
            "value": "1984",
            "name": "南康市",
            "parent": "235"
          },
          {
            "value": "1985",
            "name": "赣县",
            "parent": "235"
          },
          {
            "value": "1986",
            "name": "信丰县",
            "parent": "235"
          },
          {
            "value": "1987",
            "name": "大余县",
            "parent": "235"
          },
          {
            "value": "1988",
            "name": "上犹县",
            "parent": "235"
          },
          {
            "value": "1989",
            "name": "崇义县",
            "parent": "235"
          },
          {
            "value": "1990",
            "name": "安远县",
            "parent": "235"
          },
          {
            "value": "1991",
            "name": "龙南县",
            "parent": "235"
          },
          {
            "value": "1992",
            "name": "定南县",
            "parent": "235"
          },
          {
            "value": "1993",
            "name": "全南县",
            "parent": "235"
          },
          {
            "value": "1994",
            "name": "宁都县",
            "parent": "235"
          },
          {
            "value": "1995",
            "name": "兴国县",
            "parent": "235"
          },
          {
            "value": "1996",
            "name": "会昌县",
            "parent": "235"
          },
          {
            "value": "1997",
            "name": "寻乌县",
            "parent": "235"
          },
          {
            "value": "1998",
            "name": "石城县",
            "parent": "235"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "235"
          },
          {
            "value": "236",
            "name": "吉安",
            "parent": "17"
          },
          {
            "value": "1999",
            "name": "安福县",
            "parent": "236"
          },
          {
            "value": "2000",
            "name": "吉州区",
            "parent": "236"
          },
          {
            "value": "2001",
            "name": "青原区",
            "parent": "236"
          },
          {
            "value": "2002",
            "name": "井冈山市",
            "parent": "236"
          },
          {
            "value": "2003",
            "name": "吉安县",
            "parent": "236"
          },
          {
            "value": "2004",
            "name": "吉水县",
            "parent": "236"
          },
          {
            "value": "2005",
            "name": "峡江县",
            "parent": "236"
          },
          {
            "value": "2006",
            "name": "新干县",
            "parent": "236"
          },
          {
            "value": "2007",
            "name": "永丰县",
            "parent": "236"
          },
          {
            "value": "2008",
            "name": "泰和县",
            "parent": "236"
          },
          {
            "value": "2009",
            "name": "遂川县",
            "parent": "236"
          },
          {
            "value": "2010",
            "name": "万安县",
            "parent": "236"
          },
          {
            "value": "2011",
            "name": "永新县",
            "parent": "236"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "236"
          },
          {
            "value": "237",
            "name": "景德镇",
            "parent": "17"
          },
          {
            "value": "2012",
            "name": "珠山区",
            "parent": "237"
          },
          {
            "value": "2013",
            "name": "昌江区",
            "parent": "237"
          },
          {
            "value": "2014",
            "name": "乐平市",
            "parent": "237"
          },
          {
            "value": "2015",
            "name": "浮梁县",
            "parent": "237"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "237"
          },
          {
            "value": "238",
            "name": "九江",
            "parent": "17"
          },
          {
            "value": "2016",
            "name": "浔阳区",
            "parent": "238"
          },
          {
            "value": "2017",
            "name": "庐山区",
            "parent": "238"
          },
          {
            "value": "2018",
            "name": "瑞昌市",
            "parent": "238"
          },
          {
            "value": "2019",
            "name": "九江县",
            "parent": "238"
          },
          {
            "value": "2020",
            "name": "武宁县",
            "parent": "238"
          },
          {
            "value": "2021",
            "name": "修水县",
            "parent": "238"
          },
          {
            "value": "2022",
            "name": "永修县",
            "parent": "238"
          },
          {
            "value": "2023",
            "name": "德安县",
            "parent": "238"
          },
          {
            "value": "2024",
            "name": "星子县",
            "parent": "238"
          },
          {
            "value": "2025",
            "name": "都昌县",
            "parent": "238"
          },
          {
            "value": "2026",
            "name": "湖口县",
            "parent": "238"
          },
          {
            "value": "2027",
            "name": "彭泽县",
            "parent": "238"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "238"
          },
          {
            "value": "239",
            "name": "萍乡",
            "parent": "17"
          },
          {
            "value": "2028",
            "name": "安源区",
            "parent": "239"
          },
          {
            "value": "2029",
            "name": "湘东区",
            "parent": "239"
          },
          {
            "value": "2030",
            "name": "莲花县",
            "parent": "239"
          },
          {
            "value": "2031",
            "name": "芦溪县",
            "parent": "239"
          },
          {
            "value": "2032",
            "name": "上栗县",
            "parent": "239"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "239"
          },
          {
            "value": "240",
            "name": "上饶",
            "parent": "17"
          },
          {
            "value": "2033",
            "name": "信州区",
            "parent": "240"
          },
          {
            "value": "2034",
            "name": "德兴市",
            "parent": "240"
          },
          {
            "value": "2035",
            "name": "上饶县",
            "parent": "240"
          },
          {
            "value": "2036",
            "name": "广丰县",
            "parent": "240"
          },
          {
            "value": "2037",
            "name": "玉山县",
            "parent": "240"
          },
          {
            "value": "2038",
            "name": "铅山县",
            "parent": "240"
          },
          {
            "value": "2039",
            "name": "横峰县",
            "parent": "240"
          },
          {
            "value": "2040",
            "name": "弋阳县",
            "parent": "240"
          },
          {
            "value": "2041",
            "name": "余干县",
            "parent": "240"
          },
          {
            "value": "2042",
            "name": "波阳县",
            "parent": "240"
          },
          {
            "value": "2043",
            "name": "万年县",
            "parent": "240"
          },
          {
            "value": "2044",
            "name": "婺源县",
            "parent": "240"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "240"
          },
          {
            "value": "241",
            "name": "新余",
            "parent": "17"
          },
          {
            "value": "2045",
            "name": "渝水区",
            "parent": "241"
          },
          {
            "value": "2046",
            "name": "分宜县",
            "parent": "241"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "241"
          },
          {
            "value": "242",
            "name": "宜春",
            "parent": "17"
          },
          {
            "value": "2047",
            "name": "袁州区",
            "parent": "242"
          },
          {
            "value": "2048",
            "name": "丰城市",
            "parent": "242"
          },
          {
            "value": "2049",
            "name": "樟树市",
            "parent": "242"
          },
          {
            "value": "2050",
            "name": "高安市",
            "parent": "242"
          },
          {
            "value": "2051",
            "name": "奉新县",
            "parent": "242"
          },
          {
            "value": "2052",
            "name": "万载县",
            "parent": "242"
          },
          {
            "value": "2053",
            "name": "上高县",
            "parent": "242"
          },
          {
            "value": "2054",
            "name": "宜丰县",
            "parent": "242"
          },
          {
            "value": "2055",
            "name": "靖安县",
            "parent": "242"
          },
          {
            "value": "2056",
            "name": "铜鼓县",
            "parent": "242"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "242"
          },
          {
            "value": "243",
            "name": "鹰潭",
            "parent": "17"
          },
          {
            "value": "2057",
            "name": "月湖区",
            "parent": "243"
          },
          {
            "value": "2058",
            "name": "贵溪市",
            "parent": "243"
          },
          {
            "value": "2059",
            "name": "余江县",
            "parent": "243"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "243"
          },
          {
            "value": "18",
            "name": "辽宁",
            "parent": 0
          },
          {
            "value": "244",
            "name": "沈阳",
            "parent": "18"
          },
          {
            "value": "2060",
            "name": "沈河区",
            "parent": "244"
          },
          {
            "value": "2061",
            "name": "皇姑区",
            "parent": "244"
          },
          {
            "value": "2062",
            "name": "和平区",
            "parent": "244"
          },
          {
            "value": "2063",
            "name": "大东区",
            "parent": "244"
          },
          {
            "value": "2064",
            "name": "铁西区",
            "parent": "244"
          },
          {
            "value": "2065",
            "name": "苏家屯区",
            "parent": "244"
          },
          {
            "value": "2066",
            "name": "东陵区",
            "parent": "244"
          },
          {
            "value": "2067",
            "name": "沈北新区",
            "parent": "244"
          },
          {
            "value": "2068",
            "name": "于洪区",
            "parent": "244"
          },
          {
            "value": "2069",
            "name": "浑南新区",
            "parent": "244"
          },
          {
            "value": "2070",
            "name": "新民市",
            "parent": "244"
          },
          {
            "value": "2071",
            "name": "辽中县",
            "parent": "244"
          },
          {
            "value": "2072",
            "name": "康平县",
            "parent": "244"
          },
          {
            "value": "2073",
            "name": "法库县",
            "parent": "244"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "244"
          },
          {
            "value": "245",
            "name": "大连",
            "parent": "18"
          },
          {
            "value": "2074",
            "name": "西岗区",
            "parent": "245"
          },
          {
            "value": "2075",
            "name": "中山区",
            "parent": "245"
          },
          {
            "value": "2076",
            "name": "沙河口区",
            "parent": "245"
          },
          {
            "value": "2077",
            "name": "甘井子区",
            "parent": "245"
          },
          {
            "value": "2078",
            "name": "旅顺口区",
            "parent": "245"
          },
          {
            "value": "2079",
            "name": "金州区",
            "parent": "245"
          },
          {
            "value": "2080",
            "name": "开发区",
            "parent": "245"
          },
          {
            "value": "2081",
            "name": "瓦房店市",
            "parent": "245"
          },
          {
            "value": "2082",
            "name": "普兰店市",
            "parent": "245"
          },
          {
            "value": "2083",
            "name": "庄河市",
            "parent": "245"
          },
          {
            "value": "2084",
            "name": "长海县",
            "parent": "245"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "245"
          },
          {
            "value": "246",
            "name": "鞍山",
            "parent": "18"
          },
          {
            "value": "2085",
            "name": "铁东区",
            "parent": "246"
          },
          {
            "value": "2086",
            "name": "铁西区",
            "parent": "246"
          },
          {
            "value": "2087",
            "name": "立山区",
            "parent": "246"
          },
          {
            "value": "2088",
            "name": "千山区",
            "parent": "246"
          },
          {
            "value": "2089",
            "name": "岫岩",
            "parent": "246"
          },
          {
            "value": "2090",
            "name": "海城市",
            "parent": "246"
          },
          {
            "value": "2091",
            "name": "台安县",
            "parent": "246"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "246"
          },
          {
            "value": "247",
            "name": "本溪",
            "parent": "18"
          },
          {
            "value": "2092",
            "name": "本溪",
            "parent": "247"
          },
          {
            "value": "2093",
            "name": "平山区",
            "parent": "247"
          },
          {
            "value": "2094",
            "name": "明山区",
            "parent": "247"
          },
          {
            "value": "2095",
            "name": "溪湖区",
            "parent": "247"
          },
          {
            "value": "2096",
            "name": "南芬区",
            "parent": "247"
          },
          {
            "value": "2097",
            "name": "桓仁",
            "parent": "247"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "247"
          },
          {
            "value": "248",
            "name": "朝阳",
            "parent": "18"
          },
          {
            "value": "2098",
            "name": "双塔区",
            "parent": "248"
          },
          {
            "value": "2099",
            "name": "龙城区",
            "parent": "248"
          },
          {
            "value": "2100",
            "name": "喀喇沁左翼蒙古族自治县",
            "parent": "248"
          },
          {
            "value": "2101",
            "name": "北票市",
            "parent": "248"
          },
          {
            "value": "2102",
            "name": "凌源市",
            "parent": "248"
          },
          {
            "value": "2103",
            "name": "朝阳县",
            "parent": "248"
          },
          {
            "value": "2104",
            "name": "建平县",
            "parent": "248"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "248"
          },
          {
            "value": "249",
            "name": "丹东",
            "parent": "18"
          },
          {
            "value": "2105",
            "name": "振兴区",
            "parent": "249"
          },
          {
            "value": "2106",
            "name": "元宝区",
            "parent": "249"
          },
          {
            "value": "2107",
            "name": "振安区",
            "parent": "249"
          },
          {
            "value": "2108",
            "name": "宽甸",
            "parent": "249"
          },
          {
            "value": "2109",
            "name": "东港市",
            "parent": "249"
          },
          {
            "value": "2110",
            "name": "凤城市",
            "parent": "249"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "249"
          },
          {
            "value": "250",
            "name": "抚顺",
            "parent": "18"
          },
          {
            "value": "2111",
            "name": "顺城区",
            "parent": "250"
          },
          {
            "value": "2112",
            "name": "新抚区",
            "parent": "250"
          },
          {
            "value": "2113",
            "name": "东洲区",
            "parent": "250"
          },
          {
            "value": "2114",
            "name": "望花区",
            "parent": "250"
          },
          {
            "value": "2115",
            "name": "清原",
            "parent": "250"
          },
          {
            "value": "2116",
            "name": "新宾",
            "parent": "250"
          },
          {
            "value": "2117",
            "name": "抚顺县",
            "parent": "250"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "250"
          },
          {
            "value": "251",
            "name": "阜新",
            "parent": "18"
          },
          {
            "value": "2118",
            "name": "阜新",
            "parent": "251"
          },
          {
            "value": "2119",
            "name": "海州区",
            "parent": "251"
          },
          {
            "value": "2120",
            "name": "新邱区",
            "parent": "251"
          },
          {
            "value": "2121",
            "name": "太平区",
            "parent": "251"
          },
          {
            "value": "2122",
            "name": "清河门区",
            "parent": "251"
          },
          {
            "value": "2123",
            "name": "细河区",
            "parent": "251"
          },
          {
            "value": "2124",
            "name": "彰武县",
            "parent": "251"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "251"
          },
          {
            "value": "252",
            "name": "葫芦岛",
            "parent": "18"
          },
          {
            "value": "2125",
            "name": "龙港区",
            "parent": "252"
          },
          {
            "value": "2126",
            "name": "南票区",
            "parent": "252"
          },
          {
            "value": "2127",
            "name": "连山区",
            "parent": "252"
          },
          {
            "value": "2128",
            "name": "兴城市",
            "parent": "252"
          },
          {
            "value": "2129",
            "name": "绥中县",
            "parent": "252"
          },
          {
            "value": "2130",
            "name": "建昌县",
            "parent": "252"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "252"
          },
          {
            "value": "253",
            "name": "锦州",
            "parent": "18"
          },
          {
            "value": "2131",
            "name": "太和区",
            "parent": "253"
          },
          {
            "value": "2132",
            "name": "古塔区",
            "parent": "253"
          },
          {
            "value": "2133",
            "name": "凌河区",
            "parent": "253"
          },
          {
            "value": "2134",
            "name": "凌海市",
            "parent": "253"
          },
          {
            "value": "2135",
            "name": "北镇市",
            "parent": "253"
          },
          {
            "value": "2136",
            "name": "黑山县",
            "parent": "253"
          },
          {
            "value": "2137",
            "name": "义县",
            "parent": "253"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "253"
          },
          {
            "value": "254",
            "name": "辽阳",
            "parent": "18"
          },
          {
            "value": "2138",
            "name": "白塔区",
            "parent": "254"
          },
          {
            "value": "2139",
            "name": "文圣区",
            "parent": "254"
          },
          {
            "value": "2140",
            "name": "宏伟区",
            "parent": "254"
          },
          {
            "value": "2141",
            "name": "太子河区",
            "parent": "254"
          },
          {
            "value": "2142",
            "name": "弓长岭区",
            "parent": "254"
          },
          {
            "value": "2143",
            "name": "灯塔市",
            "parent": "254"
          },
          {
            "value": "2144",
            "name": "辽阳县",
            "parent": "254"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "254"
          },
          {
            "value": "255",
            "name": "盘锦",
            "parent": "18"
          },
          {
            "value": "2145",
            "name": "双台子区",
            "parent": "255"
          },
          {
            "value": "2146",
            "name": "兴隆台区",
            "parent": "255"
          },
          {
            "value": "2147",
            "name": "大洼县",
            "parent": "255"
          },
          {
            "value": "2148",
            "name": "盘山县",
            "parent": "255"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "255"
          },
          {
            "value": "256",
            "name": "铁岭",
            "parent": "18"
          },
          {
            "value": "2149",
            "name": "银州区",
            "parent": "256"
          },
          {
            "value": "2150",
            "name": "清河区",
            "parent": "256"
          },
          {
            "value": "2151",
            "name": "调兵山市",
            "parent": "256"
          },
          {
            "value": "2152",
            "name": "开原市",
            "parent": "256"
          },
          {
            "value": "2153",
            "name": "铁岭县",
            "parent": "256"
          },
          {
            "value": "2154",
            "name": "西丰县",
            "parent": "256"
          },
          {
            "value": "2155",
            "name": "昌图县",
            "parent": "256"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "256"
          },
          {
            "value": "257",
            "name": "营口",
            "parent": "18"
          },
          {
            "value": "2156",
            "name": "站前区",
            "parent": "257"
          },
          {
            "value": "2157",
            "name": "西市区",
            "parent": "257"
          },
          {
            "value": "2158",
            "name": "鲅鱼圈区",
            "parent": "257"
          },
          {
            "value": "2159",
            "name": "老边区",
            "parent": "257"
          },
          {
            "value": "2160",
            "name": "盖州市",
            "parent": "257"
          },
          {
            "value": "2161",
            "name": "大石桥市",
            "parent": "257"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "257"
          },
          {
            "value": "19",
            "name": "内蒙古",
            "parent": 0
          },
          {
            "value": "258",
            "name": "呼和浩特",
            "parent": "19"
          },
          {
            "value": "2162",
            "name": "回民区",
            "parent": "258"
          },
          {
            "value": "2163",
            "name": "玉泉区",
            "parent": "258"
          },
          {
            "value": "2164",
            "name": "新城区",
            "parent": "258"
          },
          {
            "value": "2165",
            "name": "赛罕区",
            "parent": "258"
          },
          {
            "value": "2166",
            "name": "清水河县",
            "parent": "258"
          },
          {
            "value": "2167",
            "name": "土默特左旗",
            "parent": "258"
          },
          {
            "value": "2168",
            "name": "托克托县",
            "parent": "258"
          },
          {
            "value": "2169",
            "name": "和林格尔县",
            "parent": "258"
          },
          {
            "value": "2170",
            "name": "武川县",
            "parent": "258"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "258"
          },
          {
            "value": "259",
            "name": "阿拉善盟",
            "parent": "19"
          },
          {
            "value": "2171",
            "name": "阿拉善左旗",
            "parent": "259"
          },
          {
            "value": "2172",
            "name": "阿拉善右旗",
            "parent": "259"
          },
          {
            "value": "2173",
            "name": "额济纳旗",
            "parent": "259"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "259"
          },
          {
            "value": "260",
            "name": "巴彦淖尔盟",
            "parent": "19"
          },
          {
            "value": "2174",
            "name": "临河区",
            "parent": "260"
          },
          {
            "value": "2175",
            "name": "五原县",
            "parent": "260"
          },
          {
            "value": "2176",
            "name": "磴口县",
            "parent": "260"
          },
          {
            "value": "2177",
            "name": "乌拉特前旗",
            "parent": "260"
          },
          {
            "value": "2178",
            "name": "乌拉特中旗",
            "parent": "260"
          },
          {
            "value": "2179",
            "name": "乌拉特后旗",
            "parent": "260"
          },
          {
            "value": "2180",
            "name": "杭锦后旗",
            "parent": "260"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "260"
          },
          {
            "value": "261",
            "name": "包头",
            "parent": "19"
          },
          {
            "value": "2181",
            "name": "昆都仑区",
            "parent": "261"
          },
          {
            "value": "2182",
            "name": "青山区",
            "parent": "261"
          },
          {
            "value": "2183",
            "name": "东河区",
            "parent": "261"
          },
          {
            "value": "2184",
            "name": "九原区",
            "parent": "261"
          },
          {
            "value": "2185",
            "name": "石拐区",
            "parent": "261"
          },
          {
            "value": "2186",
            "name": "白云矿区",
            "parent": "261"
          },
          {
            "value": "2187",
            "name": "土默特右旗",
            "parent": "261"
          },
          {
            "value": "2188",
            "name": "固阳县",
            "parent": "261"
          },
          {
            "value": "2189",
            "name": "达尔罕茂明安联合旗",
            "parent": "261"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "261"
          },
          {
            "value": "262",
            "name": "赤峰",
            "parent": "19"
          },
          {
            "value": "2190",
            "name": "红山区",
            "parent": "262"
          },
          {
            "value": "2191",
            "name": "元宝山区",
            "parent": "262"
          },
          {
            "value": "2192",
            "name": "松山区",
            "parent": "262"
          },
          {
            "value": "2193",
            "name": "阿鲁科尔沁旗",
            "parent": "262"
          },
          {
            "value": "2194",
            "name": "巴林左旗",
            "parent": "262"
          },
          {
            "value": "2195",
            "name": "巴林右旗",
            "parent": "262"
          },
          {
            "value": "2196",
            "name": "林西县",
            "parent": "262"
          },
          {
            "value": "2197",
            "name": "克什克腾旗",
            "parent": "262"
          },
          {
            "value": "2198",
            "name": "翁牛特旗",
            "parent": "262"
          },
          {
            "value": "2199",
            "name": "喀喇沁旗",
            "parent": "262"
          },
          {
            "value": "2200",
            "name": "宁城县",
            "parent": "262"
          },
          {
            "value": "2201",
            "name": "敖汉旗",
            "parent": "262"
          },
          {
            "value": "3421",
            "name": "新城区",
            "parent": "262"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "262"
          },
          {
            "value": "263",
            "name": "鄂尔多斯",
            "parent": "19"
          },
          {
            "value": "2202",
            "name": "东胜区",
            "parent": "263"
          },
          {
            "value": "2203",
            "name": "达拉特旗",
            "parent": "263"
          },
          {
            "value": "2204",
            "name": "准格尔旗",
            "parent": "263"
          },
          {
            "value": "2205",
            "name": "鄂托克前旗",
            "parent": "263"
          },
          {
            "value": "2206",
            "name": "鄂托克旗",
            "parent": "263"
          },
          {
            "value": "2207",
            "name": "杭锦旗",
            "parent": "263"
          },
          {
            "value": "2208",
            "name": "乌审旗",
            "parent": "263"
          },
          {
            "value": "2209",
            "name": "伊金霍洛旗",
            "parent": "263"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "263"
          },
          {
            "value": "264",
            "name": "呼伦贝尔",
            "parent": "19"
          },
          {
            "value": "2210",
            "name": "海拉尔区",
            "parent": "264"
          },
          {
            "value": "2211",
            "name": "莫力达瓦",
            "parent": "264"
          },
          {
            "value": "2212",
            "name": "满洲里市",
            "parent": "264"
          },
          {
            "value": "2213",
            "name": "牙克石市",
            "parent": "264"
          },
          {
            "value": "2214",
            "name": "扎兰屯市",
            "parent": "264"
          },
          {
            "value": "2215",
            "name": "额尔古纳市",
            "parent": "264"
          },
          {
            "value": "2216",
            "name": "根河市",
            "parent": "264"
          },
          {
            "value": "2217",
            "name": "阿荣旗",
            "parent": "264"
          },
          {
            "value": "2218",
            "name": "鄂伦春自治旗",
            "parent": "264"
          },
          {
            "value": "2219",
            "name": "鄂温克族自治旗",
            "parent": "264"
          },
          {
            "value": "2220",
            "name": "陈巴尔虎旗",
            "parent": "264"
          },
          {
            "value": "2221",
            "name": "新巴尔虎左旗",
            "parent": "264"
          },
          {
            "value": "2222",
            "name": "新巴尔虎右旗",
            "parent": "264"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "264"
          },
          {
            "value": "265",
            "name": "通辽",
            "parent": "19"
          },
          {
            "value": "2223",
            "name": "科尔沁区",
            "parent": "265"
          },
          {
            "value": "2224",
            "name": "霍林郭勒市",
            "parent": "265"
          },
          {
            "value": "2225",
            "name": "科尔沁左翼中旗",
            "parent": "265"
          },
          {
            "value": "2226",
            "name": "科尔沁左翼后旗",
            "parent": "265"
          },
          {
            "value": "2227",
            "name": "开鲁县",
            "parent": "265"
          },
          {
            "value": "2228",
            "name": "库伦旗",
            "parent": "265"
          },
          {
            "value": "2229",
            "name": "奈曼旗",
            "parent": "265"
          },
          {
            "value": "2230",
            "name": "扎鲁特旗",
            "parent": "265"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "265"
          },
          {
            "value": "266",
            "name": "乌海",
            "parent": "19"
          },
          {
            "value": "2231",
            "name": "海勃湾区",
            "parent": "266"
          },
          {
            "value": "2232",
            "name": "乌达区",
            "parent": "266"
          },
          {
            "value": "2233",
            "name": "海南区",
            "parent": "266"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "266"
          },
          {
            "value": "267",
            "name": "乌兰察布市",
            "parent": "19"
          },
          {
            "value": "2234",
            "name": "化德县",
            "parent": "267"
          },
          {
            "value": "2235",
            "name": "集宁区",
            "parent": "267"
          },
          {
            "value": "2236",
            "name": "丰镇市",
            "parent": "267"
          },
          {
            "value": "2237",
            "name": "卓资县",
            "parent": "267"
          },
          {
            "value": "2238",
            "name": "商都县",
            "parent": "267"
          },
          {
            "value": "2239",
            "name": "兴和县",
            "parent": "267"
          },
          {
            "value": "2240",
            "name": "凉城县",
            "parent": "267"
          },
          {
            "value": "2241",
            "name": "察哈尔右翼前旗",
            "parent": "267"
          },
          {
            "value": "2242",
            "name": "察哈尔右翼中旗",
            "parent": "267"
          },
          {
            "value": "2243",
            "name": "察哈尔右翼后旗",
            "parent": "267"
          },
          {
            "value": "2244",
            "name": "四子王旗",
            "parent": "267"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "267"
          },
          {
            "value": "268",
            "name": "锡林郭勒盟",
            "parent": "19"
          },
          {
            "value": "2245",
            "name": "二连浩特市",
            "parent": "268"
          },
          {
            "value": "2246",
            "name": "锡林浩特市",
            "parent": "268"
          },
          {
            "value": "2247",
            "name": "阿巴嘎旗",
            "parent": "268"
          },
          {
            "value": "2248",
            "name": "苏尼特左旗",
            "parent": "268"
          },
          {
            "value": "2249",
            "name": "苏尼特右旗",
            "parent": "268"
          },
          {
            "value": "2250",
            "name": "东乌珠穆沁旗",
            "parent": "268"
          },
          {
            "value": "2251",
            "name": "西乌珠穆沁旗",
            "parent": "268"
          },
          {
            "value": "2252",
            "name": "太仆寺旗",
            "parent": "268"
          },
          {
            "value": "2253",
            "name": "镶黄旗",
            "parent": "268"
          },
          {
            "value": "2254",
            "name": "正镶白旗",
            "parent": "268"
          },
          {
            "value": "2255",
            "name": "正蓝旗",
            "parent": "268"
          },
          {
            "value": "2256",
            "name": "多伦县",
            "parent": "268"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "268"
          },
          {
            "value": "269",
            "name": "兴安盟",
            "parent": "19"
          },
          {
            "value": "2257",
            "name": "乌兰浩特市",
            "parent": "269"
          },
          {
            "value": "2258",
            "name": "阿尔山市",
            "parent": "269"
          },
          {
            "value": "2259",
            "name": "科尔沁右翼前旗",
            "parent": "269"
          },
          {
            "value": "2260",
            "name": "科尔沁右翼中旗",
            "parent": "269"
          },
          {
            "value": "2261",
            "name": "扎赉特旗",
            "parent": "269"
          },
          {
            "value": "2262",
            "name": "突泉县",
            "parent": "269"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "269"
          },
          {
            "value": "20",
            "name": "宁夏",
            "parent": 0
          },
          {
            "value": "270",
            "name": "银川",
            "parent": "20"
          },
          {
            "value": "2263",
            "name": "西夏区",
            "parent": "270"
          },
          {
            "value": "2264",
            "name": "金凤区",
            "parent": "270"
          },
          {
            "value": "2265",
            "name": "兴庆区",
            "parent": "270"
          },
          {
            "value": "2266",
            "name": "灵武市",
            "parent": "270"
          },
          {
            "value": "2267",
            "name": "永宁县",
            "parent": "270"
          },
          {
            "value": "2268",
            "name": "贺兰县",
            "parent": "270"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "270"
          },
          {
            "value": "271",
            "name": "固原",
            "parent": "20"
          },
          {
            "value": "2269",
            "name": "原州区",
            "parent": "271"
          },
          {
            "value": "2270",
            "name": "海原县",
            "parent": "271"
          },
          {
            "value": "2271",
            "name": "西吉县",
            "parent": "271"
          },
          {
            "value": "2272",
            "name": "隆德县",
            "parent": "271"
          },
          {
            "value": "2273",
            "name": "泾源县",
            "parent": "271"
          },
          {
            "value": "2274",
            "name": "彭阳县",
            "parent": "271"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "271"
          },
          {
            "value": "272",
            "name": "石嘴山",
            "parent": "20"
          },
          {
            "value": "2275",
            "name": "惠农县",
            "parent": "272"
          },
          {
            "value": "2276",
            "name": "大武口区",
            "parent": "272"
          },
          {
            "value": "2277",
            "name": "惠农区",
            "parent": "272"
          },
          {
            "value": "2278",
            "name": "陶乐县",
            "parent": "272"
          },
          {
            "value": "2279",
            "name": "平罗县",
            "parent": "272"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "272"
          },
          {
            "value": "273",
            "name": "吴忠",
            "parent": "20"
          },
          {
            "value": "2280",
            "name": "利通区",
            "parent": "273"
          },
          {
            "value": "2281",
            "name": "中卫县",
            "parent": "273"
          },
          {
            "value": "2282",
            "name": "青铜峡市",
            "parent": "273"
          },
          {
            "value": "2283",
            "name": "中宁县",
            "parent": "273"
          },
          {
            "value": "2284",
            "name": "盐池县",
            "parent": "273"
          },
          {
            "value": "2285",
            "name": "同心县",
            "parent": "273"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "273"
          },
          {
            "value": "274",
            "name": "中卫",
            "parent": "20"
          },
          {
            "value": "2286",
            "name": "沙坡头区",
            "parent": "274"
          },
          {
            "value": "2287",
            "name": "海原县",
            "parent": "274"
          },
          {
            "value": "2288",
            "name": "中宁县",
            "parent": "274"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "274"
          },
          {
            "value": "21",
            "name": "青海",
            "parent": 0
          },
          {
            "value": "275",
            "name": "西宁",
            "parent": "21"
          },
          {
            "value": "2289",
            "name": "城中区",
            "parent": "275"
          },
          {
            "value": "2290",
            "name": "城东区",
            "parent": "275"
          },
          {
            "value": "2291",
            "name": "城西区",
            "parent": "275"
          },
          {
            "value": "2292",
            "name": "城北区",
            "parent": "275"
          },
          {
            "value": "2293",
            "name": "湟中县",
            "parent": "275"
          },
          {
            "value": "2294",
            "name": "湟源县",
            "parent": "275"
          },
          {
            "value": "2295",
            "name": "大通",
            "parent": "275"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "275"
          },
          {
            "value": "276",
            "name": "果洛",
            "parent": "21"
          },
          {
            "value": "2296",
            "name": "玛沁县",
            "parent": "276"
          },
          {
            "value": "2297",
            "name": "班玛县",
            "parent": "276"
          },
          {
            "value": "2298",
            "name": "甘德县",
            "parent": "276"
          },
          {
            "value": "2299",
            "name": "达日县",
            "parent": "276"
          },
          {
            "value": "2300",
            "name": "久治县",
            "parent": "276"
          },
          {
            "value": "2301",
            "name": "玛多县",
            "parent": "276"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "276"
          },
          {
            "value": "277",
            "name": "海北",
            "parent": "21"
          },
          {
            "value": "2302",
            "name": "海晏县",
            "parent": "277"
          },
          {
            "value": "2303",
            "name": "祁连县",
            "parent": "277"
          },
          {
            "value": "2304",
            "name": "刚察县",
            "parent": "277"
          },
          {
            "value": "2305",
            "name": "门源",
            "parent": "277"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "277"
          },
          {
            "value": "278",
            "name": "海东",
            "parent": "21"
          },
          {
            "value": "2306",
            "name": "平安县",
            "parent": "278"
          },
          {
            "value": "2307",
            "name": "乐都县",
            "parent": "278"
          },
          {
            "value": "2308",
            "name": "民和",
            "parent": "278"
          },
          {
            "value": "2309",
            "name": "互助",
            "parent": "278"
          },
          {
            "value": "2310",
            "name": "化隆",
            "parent": "278"
          },
          {
            "value": "2311",
            "name": "循化",
            "parent": "278"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "278"
          },
          {
            "value": "279",
            "name": "海南",
            "parent": "21"
          },
          {
            "value": "2312",
            "name": "共和县",
            "parent": "279"
          },
          {
            "value": "2313",
            "name": "同德县",
            "parent": "279"
          },
          {
            "value": "2314",
            "name": "贵德县",
            "parent": "279"
          },
          {
            "value": "2315",
            "name": "兴海县",
            "parent": "279"
          },
          {
            "value": "2316",
            "name": "贵南县",
            "parent": "279"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "279"
          },
          {
            "value": "280",
            "name": "海西",
            "parent": "21"
          },
          {
            "value": "2317",
            "name": "德令哈市",
            "parent": "280"
          },
          {
            "value": "2318",
            "name": "格尔木市",
            "parent": "280"
          },
          {
            "value": "2319",
            "name": "乌兰县",
            "parent": "280"
          },
          {
            "value": "2320",
            "name": "都兰县",
            "parent": "280"
          },
          {
            "value": "2321",
            "name": "天峻县",
            "parent": "280"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "280"
          },
          {
            "value": "281",
            "name": "黄南",
            "parent": "21"
          },
          {
            "value": "2322",
            "name": "同仁县",
            "parent": "281"
          },
          {
            "value": "2323",
            "name": "尖扎县",
            "parent": "281"
          },
          {
            "value": "2324",
            "name": "泽库县",
            "parent": "281"
          },
          {
            "value": "2325",
            "name": "河南蒙古族自治县",
            "parent": "281"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "281"
          },
          {
            "value": "282",
            "name": "玉树",
            "parent": "21"
          },
          {
            "value": "2326",
            "name": "玉树县",
            "parent": "282"
          },
          {
            "value": "2327",
            "name": "杂多县",
            "parent": "282"
          },
          {
            "value": "2328",
            "name": "称多县",
            "parent": "282"
          },
          {
            "value": "2329",
            "name": "治多县",
            "parent": "282"
          },
          {
            "value": "2330",
            "name": "囊谦县",
            "parent": "282"
          },
          {
            "value": "2331",
            "name": "曲麻莱县",
            "parent": "282"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "282"
          },
          {
            "value": "3423",
            "name": "格尔木",
            "parent": "21"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "3423"
          },
          {
            "value": "22",
            "name": "山东",
            "parent": 0
          },
          {
            "value": "283",
            "name": "济南",
            "parent": "22"
          },
          {
            "value": "2332",
            "name": "市中区",
            "parent": "283"
          },
          {
            "value": "2333",
            "name": "历下区",
            "parent": "283"
          },
          {
            "value": "2334",
            "name": "天桥区",
            "parent": "283"
          },
          {
            "value": "2335",
            "name": "槐荫区",
            "parent": "283"
          },
          {
            "value": "2336",
            "name": "历城区",
            "parent": "283"
          },
          {
            "value": "2337",
            "name": "长清区",
            "parent": "283"
          },
          {
            "value": "2338",
            "name": "章丘市",
            "parent": "283"
          },
          {
            "value": "2339",
            "name": "平阴县",
            "parent": "283"
          },
          {
            "value": "2340",
            "name": "济阳县",
            "parent": "283"
          },
          {
            "value": "2341",
            "name": "商河县",
            "parent": "283"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "283"
          },
          {
            "value": "284",
            "name": "青岛",
            "parent": "22"
          },
          {
            "value": "2342",
            "name": "市南区",
            "parent": "284"
          },
          {
            "value": "2343",
            "name": "市北区",
            "parent": "284"
          },
          {
            "value": "2344",
            "name": "城阳区",
            "parent": "284"
          },
          {
            "value": "2345",
            "name": "四方区",
            "parent": "284"
          },
          {
            "value": "2346",
            "name": "李沧区",
            "parent": "284"
          },
          {
            "value": "2347",
            "name": "黄岛区",
            "parent": "284"
          },
          {
            "value": "2348",
            "name": "崂山区",
            "parent": "284"
          },
          {
            "value": "2349",
            "name": "胶州市",
            "parent": "284"
          },
          {
            "value": "2350",
            "name": "即墨市",
            "parent": "284"
          },
          {
            "value": "2351",
            "name": "平度市",
            "parent": "284"
          },
          {
            "value": "2352",
            "name": "胶南市",
            "parent": "284"
          },
          {
            "value": "2353",
            "name": "莱西市",
            "parent": "284"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "284"
          },
          {
            "value": "285",
            "name": "滨州",
            "parent": "22"
          },
          {
            "value": "2354",
            "name": "滨城区",
            "parent": "285"
          },
          {
            "value": "2355",
            "name": "惠民县",
            "parent": "285"
          },
          {
            "value": "2356",
            "name": "阳信县",
            "parent": "285"
          },
          {
            "value": "2357",
            "name": "无棣县",
            "parent": "285"
          },
          {
            "value": "2358",
            "name": "沾化县",
            "parent": "285"
          },
          {
            "value": "2359",
            "name": "博兴县",
            "parent": "285"
          },
          {
            "value": "2360",
            "name": "邹平县",
            "parent": "285"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "285"
          },
          {
            "value": "286",
            "name": "德州",
            "parent": "22"
          },
          {
            "value": "2361",
            "name": "德城区",
            "parent": "286"
          },
          {
            "value": "2362",
            "name": "陵县",
            "parent": "286"
          },
          {
            "value": "2363",
            "name": "乐陵市",
            "parent": "286"
          },
          {
            "value": "2364",
            "name": "禹城市",
            "parent": "286"
          },
          {
            "value": "2365",
            "name": "宁津县",
            "parent": "286"
          },
          {
            "value": "2366",
            "name": "庆云县",
            "parent": "286"
          },
          {
            "value": "2367",
            "name": "临邑县",
            "parent": "286"
          },
          {
            "value": "2368",
            "name": "齐河县",
            "parent": "286"
          },
          {
            "value": "2369",
            "name": "平原县",
            "parent": "286"
          },
          {
            "value": "2370",
            "name": "夏津县",
            "parent": "286"
          },
          {
            "value": "2371",
            "name": "武城县",
            "parent": "286"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "286"
          },
          {
            "value": "287",
            "name": "东营",
            "parent": "22"
          },
          {
            "value": "2372",
            "name": "东营区",
            "parent": "287"
          },
          {
            "value": "2373",
            "name": "河口区",
            "parent": "287"
          },
          {
            "value": "2374",
            "name": "垦利县",
            "parent": "287"
          },
          {
            "value": "2375",
            "name": "利津县",
            "parent": "287"
          },
          {
            "value": "2376",
            "name": "广饶县",
            "parent": "287"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "287"
          },
          {
            "value": "288",
            "name": "菏泽",
            "parent": "22"
          },
          {
            "value": "2377",
            "name": "牡丹区",
            "parent": "288"
          },
          {
            "value": "2378",
            "name": "曹县",
            "parent": "288"
          },
          {
            "value": "2379",
            "name": "单县",
            "parent": "288"
          },
          {
            "value": "2380",
            "name": "成武县",
            "parent": "288"
          },
          {
            "value": "2381",
            "name": "巨野县",
            "parent": "288"
          },
          {
            "value": "2382",
            "name": "郓城县",
            "parent": "288"
          },
          {
            "value": "2383",
            "name": "鄄城县",
            "parent": "288"
          },
          {
            "value": "2384",
            "name": "定陶县",
            "parent": "288"
          },
          {
            "value": "2385",
            "name": "东明县",
            "parent": "288"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "288"
          },
          {
            "value": "289",
            "name": "济宁",
            "parent": "22"
          },
          {
            "value": "2386",
            "name": "市中区",
            "parent": "289"
          },
          {
            "value": "2387",
            "name": "任城区",
            "parent": "289"
          },
          {
            "value": "2388",
            "name": "曲阜市",
            "parent": "289"
          },
          {
            "value": "2389",
            "name": "兖州市",
            "parent": "289"
          },
          {
            "value": "2390",
            "name": "邹城市",
            "parent": "289"
          },
          {
            "value": "2391",
            "name": "微山县",
            "parent": "289"
          },
          {
            "value": "2392",
            "name": "鱼台县",
            "parent": "289"
          },
          {
            "value": "2393",
            "name": "金乡县",
            "parent": "289"
          },
          {
            "value": "2394",
            "name": "嘉祥县",
            "parent": "289"
          },
          {
            "value": "2395",
            "name": "汶上县",
            "parent": "289"
          },
          {
            "value": "2396",
            "name": "泗水县",
            "parent": "289"
          },
          {
            "value": "2397",
            "name": "梁山县",
            "parent": "289"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "289"
          },
          {
            "value": "290",
            "name": "莱芜",
            "parent": "22"
          },
          {
            "value": "2398",
            "name": "莱城区",
            "parent": "290"
          },
          {
            "value": "2399",
            "name": "钢城区",
            "parent": "290"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "290"
          },
          {
            "value": "291",
            "name": "聊城",
            "parent": "22"
          },
          {
            "value": "2400",
            "name": "东昌府区",
            "parent": "291"
          },
          {
            "value": "2401",
            "name": "临清市",
            "parent": "291"
          },
          {
            "value": "2402",
            "name": "阳谷县",
            "parent": "291"
          },
          {
            "value": "2403",
            "name": "莘县",
            "parent": "291"
          },
          {
            "value": "2404",
            "name": "茌平县",
            "parent": "291"
          },
          {
            "value": "2405",
            "name": "东阿县",
            "parent": "291"
          },
          {
            "value": "2406",
            "name": "冠县",
            "parent": "291"
          },
          {
            "value": "2407",
            "name": "高唐县",
            "parent": "291"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "291"
          },
          {
            "value": "292",
            "name": "临沂",
            "parent": "22"
          },
          {
            "value": "2408",
            "name": "兰山区",
            "parent": "292"
          },
          {
            "value": "2409",
            "name": "罗庄区",
            "parent": "292"
          },
          {
            "value": "2410",
            "name": "河东区",
            "parent": "292"
          },
          {
            "value": "2411",
            "name": "沂南县",
            "parent": "292"
          },
          {
            "value": "2412",
            "name": "郯城县",
            "parent": "292"
          },
          {
            "value": "2413",
            "name": "沂水县",
            "parent": "292"
          },
          {
            "value": "2414",
            "name": "苍山县",
            "parent": "292"
          },
          {
            "value": "2415",
            "name": "费县",
            "parent": "292"
          },
          {
            "value": "2416",
            "name": "平邑县",
            "parent": "292"
          },
          {
            "value": "2417",
            "name": "莒南县",
            "parent": "292"
          },
          {
            "value": "2418",
            "name": "蒙阴县",
            "parent": "292"
          },
          {
            "value": "2419",
            "name": "临沭县",
            "parent": "292"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "292"
          },
          {
            "value": "293",
            "name": "日照",
            "parent": "22"
          },
          {
            "value": "2420",
            "name": "东港区",
            "parent": "293"
          },
          {
            "value": "2421",
            "name": "岚山区",
            "parent": "293"
          },
          {
            "value": "2422",
            "name": "五莲县",
            "parent": "293"
          },
          {
            "value": "2423",
            "name": "莒县",
            "parent": "293"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "293"
          },
          {
            "value": "294",
            "name": "泰安",
            "parent": "22"
          },
          {
            "value": "2424",
            "name": "泰山区",
            "parent": "294"
          },
          {
            "value": "2425",
            "name": "岱岳区",
            "parent": "294"
          },
          {
            "value": "2426",
            "name": "新泰市",
            "parent": "294"
          },
          {
            "value": "2427",
            "name": "肥城市",
            "parent": "294"
          },
          {
            "value": "2428",
            "name": "宁阳县",
            "parent": "294"
          },
          {
            "value": "2429",
            "name": "东平县",
            "parent": "294"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "294"
          },
          {
            "value": "295",
            "name": "威海",
            "parent": "22"
          },
          {
            "value": "2430",
            "name": "荣成市",
            "parent": "295"
          },
          {
            "value": "2431",
            "name": "乳山市",
            "parent": "295"
          },
          {
            "value": "2432",
            "name": "环翠区",
            "parent": "295"
          },
          {
            "value": "2433",
            "name": "文登市",
            "parent": "295"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "295"
          },
          {
            "value": "296",
            "name": "潍坊",
            "parent": "22"
          },
          {
            "value": "2434",
            "name": "潍城区",
            "parent": "296"
          },
          {
            "value": "2435",
            "name": "寒亭区",
            "parent": "296"
          },
          {
            "value": "2436",
            "name": "坊子区",
            "parent": "296"
          },
          {
            "value": "2437",
            "name": "奎文区",
            "parent": "296"
          },
          {
            "value": "2438",
            "name": "青州市",
            "parent": "296"
          },
          {
            "value": "2439",
            "name": "诸城市",
            "parent": "296"
          },
          {
            "value": "2440",
            "name": "寿光市",
            "parent": "296"
          },
          {
            "value": "2441",
            "name": "安丘市",
            "parent": "296"
          },
          {
            "value": "2442",
            "name": "高密市",
            "parent": "296"
          },
          {
            "value": "2443",
            "name": "昌邑市",
            "parent": "296"
          },
          {
            "value": "2444",
            "name": "临朐县",
            "parent": "296"
          },
          {
            "value": "2445",
            "name": "昌乐县",
            "parent": "296"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "296"
          },
          {
            "value": "297",
            "name": "烟台",
            "parent": "22"
          },
          {
            "value": "2446",
            "name": "芝罘区",
            "parent": "297"
          },
          {
            "value": "2447",
            "name": "福山区",
            "parent": "297"
          },
          {
            "value": "2448",
            "name": "牟平区",
            "parent": "297"
          },
          {
            "value": "2449",
            "name": "莱山区",
            "parent": "297"
          },
          {
            "value": "2450",
            "name": "开发区",
            "parent": "297"
          },
          {
            "value": "2451",
            "name": "龙口市",
            "parent": "297"
          },
          {
            "value": "2452",
            "name": "莱阳市",
            "parent": "297"
          },
          {
            "value": "2453",
            "name": "莱州市",
            "parent": "297"
          },
          {
            "value": "2454",
            "name": "蓬莱市",
            "parent": "297"
          },
          {
            "value": "2455",
            "name": "招远市",
            "parent": "297"
          },
          {
            "value": "2456",
            "name": "栖霞市",
            "parent": "297"
          },
          {
            "value": "2457",
            "name": "海阳市",
            "parent": "297"
          },
          {
            "value": "2458",
            "name": "长岛县",
            "parent": "297"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "297"
          },
          {
            "value": "298",
            "name": "枣庄",
            "parent": "22"
          },
          {
            "value": "2459",
            "name": "市中区",
            "parent": "298"
          },
          {
            "value": "2460",
            "name": "山亭区",
            "parent": "298"
          },
          {
            "value": "2461",
            "name": "峄城区",
            "parent": "298"
          },
          {
            "value": "2462",
            "name": "台儿庄区",
            "parent": "298"
          },
          {
            "value": "2463",
            "name": "薛城区",
            "parent": "298"
          },
          {
            "value": "2464",
            "name": "滕州市",
            "parent": "298"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "298"
          },
          {
            "value": "299",
            "name": "淄博",
            "parent": "22"
          },
          {
            "value": "2465",
            "name": "张店区",
            "parent": "299"
          },
          {
            "value": "2466",
            "name": "临淄区",
            "parent": "299"
          },
          {
            "value": "2467",
            "name": "淄川区",
            "parent": "299"
          },
          {
            "value": "2468",
            "name": "博山区",
            "parent": "299"
          },
          {
            "value": "2469",
            "name": "周村区",
            "parent": "299"
          },
          {
            "value": "2470",
            "name": "桓台县",
            "parent": "299"
          },
          {
            "value": "2471",
            "name": "高青县",
            "parent": "299"
          },
          {
            "value": "2472",
            "name": "沂源县",
            "parent": "299"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "299"
          },
          {
            "value": "23",
            "name": "山西",
            "parent": 0
          },
          {
            "value": "300",
            "name": "太原",
            "parent": "23"
          },
          {
            "value": "2473",
            "name": "杏花岭区",
            "parent": "300"
          },
          {
            "value": "2474",
            "name": "小店区",
            "parent": "300"
          },
          {
            "value": "2475",
            "name": "迎泽区",
            "parent": "300"
          },
          {
            "value": "2476",
            "name": "尖草坪区",
            "parent": "300"
          },
          {
            "value": "2477",
            "name": "万柏林区",
            "parent": "300"
          },
          {
            "value": "2478",
            "name": "晋源区",
            "parent": "300"
          },
          {
            "value": "2479",
            "name": "高新开发区",
            "parent": "300"
          },
          {
            "value": "2480",
            "name": "民营经济开发区",
            "parent": "300"
          },
          {
            "value": "2481",
            "name": "经济技术开发区",
            "parent": "300"
          },
          {
            "value": "2482",
            "name": "清徐县",
            "parent": "300"
          },
          {
            "value": "2483",
            "name": "阳曲县",
            "parent": "300"
          },
          {
            "value": "2484",
            "name": "娄烦县",
            "parent": "300"
          },
          {
            "value": "2485",
            "name": "古交市",
            "parent": "300"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "300"
          },
          {
            "value": "301",
            "name": "长治",
            "parent": "23"
          },
          {
            "value": "2486",
            "name": "城区",
            "parent": "301"
          },
          {
            "value": "2487",
            "name": "郊区",
            "parent": "301"
          },
          {
            "value": "2488",
            "name": "沁县",
            "parent": "301"
          },
          {
            "value": "2489",
            "name": "潞城市",
            "parent": "301"
          },
          {
            "value": "2490",
            "name": "长治县",
            "parent": "301"
          },
          {
            "value": "2491",
            "name": "襄垣县",
            "parent": "301"
          },
          {
            "value": "2492",
            "name": "屯留县",
            "parent": "301"
          },
          {
            "value": "2493",
            "name": "平顺县",
            "parent": "301"
          },
          {
            "value": "2494",
            "name": "黎城县",
            "parent": "301"
          },
          {
            "value": "2495",
            "name": "壶关县",
            "parent": "301"
          },
          {
            "value": "2496",
            "name": "长子县",
            "parent": "301"
          },
          {
            "value": "2497",
            "name": "武乡县",
            "parent": "301"
          },
          {
            "value": "2498",
            "name": "沁源县",
            "parent": "301"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "301"
          },
          {
            "value": "302",
            "name": "大同",
            "parent": "23"
          },
          {
            "value": "2499",
            "name": "城区",
            "parent": "302"
          },
          {
            "value": "2500",
            "name": "矿区",
            "parent": "302"
          },
          {
            "value": "2501",
            "name": "南郊区",
            "parent": "302"
          },
          {
            "value": "2502",
            "name": "新荣区",
            "parent": "302"
          },
          {
            "value": "2503",
            "name": "阳高县",
            "parent": "302"
          },
          {
            "value": "2504",
            "name": "天镇县",
            "parent": "302"
          },
          {
            "value": "2505",
            "name": "广灵县",
            "parent": "302"
          },
          {
            "value": "2506",
            "name": "灵丘县",
            "parent": "302"
          },
          {
            "value": "2507",
            "name": "浑源县",
            "parent": "302"
          },
          {
            "value": "2508",
            "name": "左云县",
            "parent": "302"
          },
          {
            "value": "2509",
            "name": "大同县",
            "parent": "302"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "302"
          },
          {
            "value": "303",
            "name": "晋城",
            "parent": "23"
          },
          {
            "value": "2510",
            "name": "城区",
            "parent": "303"
          },
          {
            "value": "2511",
            "name": "高平市",
            "parent": "303"
          },
          {
            "value": "2512",
            "name": "沁水县",
            "parent": "303"
          },
          {
            "value": "2513",
            "name": "阳城县",
            "parent": "303"
          },
          {
            "value": "2514",
            "name": "陵川县",
            "parent": "303"
          },
          {
            "value": "2515",
            "name": "泽州县",
            "parent": "303"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "303"
          },
          {
            "value": "304",
            "name": "晋中",
            "parent": "23"
          },
          {
            "value": "2516",
            "name": "榆次区",
            "parent": "304"
          },
          {
            "value": "2517",
            "name": "介休市",
            "parent": "304"
          },
          {
            "value": "2518",
            "name": "榆社县",
            "parent": "304"
          },
          {
            "value": "2519",
            "name": "左权县",
            "parent": "304"
          },
          {
            "value": "2520",
            "name": "和顺县",
            "parent": "304"
          },
          {
            "value": "2521",
            "name": "昔阳县",
            "parent": "304"
          },
          {
            "value": "2522",
            "name": "寿阳县",
            "parent": "304"
          },
          {
            "value": "2523",
            "name": "太谷县",
            "parent": "304"
          },
          {
            "value": "2524",
            "name": "祁县",
            "parent": "304"
          },
          {
            "value": "2525",
            "name": "平遥县",
            "parent": "304"
          },
          {
            "value": "2526",
            "name": "灵石县",
            "parent": "304"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "304"
          },
          {
            "value": "305",
            "name": "临汾",
            "parent": "23"
          },
          {
            "value": "2527",
            "name": "尧都区",
            "parent": "305"
          },
          {
            "value": "2528",
            "name": "侯马市",
            "parent": "305"
          },
          {
            "value": "2529",
            "name": "霍州市",
            "parent": "305"
          },
          {
            "value": "2530",
            "name": "曲沃县",
            "parent": "305"
          },
          {
            "value": "2531",
            "name": "翼城县",
            "parent": "305"
          },
          {
            "value": "2532",
            "name": "襄汾县",
            "parent": "305"
          },
          {
            "value": "2533",
            "name": "洪洞县",
            "parent": "305"
          },
          {
            "value": "2534",
            "name": "吉县",
            "parent": "305"
          },
          {
            "value": "2535",
            "name": "安泽县",
            "parent": "305"
          },
          {
            "value": "2536",
            "name": "浮山县",
            "parent": "305"
          },
          {
            "value": "2537",
            "name": "古县",
            "parent": "305"
          },
          {
            "value": "2538",
            "name": "乡宁县",
            "parent": "305"
          },
          {
            "value": "2539",
            "name": "大宁县",
            "parent": "305"
          },
          {
            "value": "2540",
            "name": "隰县",
            "parent": "305"
          },
          {
            "value": "2541",
            "name": "永和县",
            "parent": "305"
          },
          {
            "value": "2542",
            "name": "蒲县",
            "parent": "305"
          },
          {
            "value": "2543",
            "name": "汾西县",
            "parent": "305"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "305"
          },
          {
            "value": "306",
            "name": "吕梁",
            "parent": "23"
          },
          {
            "value": "2544",
            "name": "离石市",
            "parent": "306"
          },
          {
            "value": "2545",
            "name": "离石区",
            "parent": "306"
          },
          {
            "value": "2546",
            "name": "孝义市",
            "parent": "306"
          },
          {
            "value": "2547",
            "name": "汾阳市",
            "parent": "306"
          },
          {
            "value": "2548",
            "name": "文水县",
            "parent": "306"
          },
          {
            "value": "2549",
            "name": "交城县",
            "parent": "306"
          },
          {
            "value": "2550",
            "name": "兴县",
            "parent": "306"
          },
          {
            "value": "2551",
            "name": "临县",
            "parent": "306"
          },
          {
            "value": "2552",
            "name": "柳林县",
            "parent": "306"
          },
          {
            "value": "2553",
            "name": "石楼县",
            "parent": "306"
          },
          {
            "value": "2554",
            "name": "岚县",
            "parent": "306"
          },
          {
            "value": "2555",
            "name": "方山县",
            "parent": "306"
          },
          {
            "value": "2556",
            "name": "中阳县",
            "parent": "306"
          },
          {
            "value": "2557",
            "name": "交口县",
            "parent": "306"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "306"
          },
          {
            "value": "307",
            "name": "朔州",
            "parent": "23"
          },
          {
            "value": "2558",
            "name": "朔城区",
            "parent": "307"
          },
          {
            "value": "2559",
            "name": "平鲁区",
            "parent": "307"
          },
          {
            "value": "2560",
            "name": "山阴县",
            "parent": "307"
          },
          {
            "value": "2561",
            "name": "应县",
            "parent": "307"
          },
          {
            "value": "2562",
            "name": "右玉县",
            "parent": "307"
          },
          {
            "value": "2563",
            "name": "怀仁县",
            "parent": "307"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "307"
          },
          {
            "value": "308",
            "name": "忻州",
            "parent": "23"
          },
          {
            "value": "2564",
            "name": "忻府区",
            "parent": "308"
          },
          {
            "value": "2565",
            "name": "原平市",
            "parent": "308"
          },
          {
            "value": "2566",
            "name": "定襄县",
            "parent": "308"
          },
          {
            "value": "2567",
            "name": "五台县",
            "parent": "308"
          },
          {
            "value": "2568",
            "name": "代县",
            "parent": "308"
          },
          {
            "value": "2569",
            "name": "繁峙县",
            "parent": "308"
          },
          {
            "value": "2570",
            "name": "宁武县",
            "parent": "308"
          },
          {
            "value": "2571",
            "name": "静乐县",
            "parent": "308"
          },
          {
            "value": "2572",
            "name": "神池县",
            "parent": "308"
          },
          {
            "value": "2573",
            "name": "五寨县",
            "parent": "308"
          },
          {
            "value": "2574",
            "name": "岢岚县",
            "parent": "308"
          },
          {
            "value": "2575",
            "name": "河曲县",
            "parent": "308"
          },
          {
            "value": "2576",
            "name": "保德县",
            "parent": "308"
          },
          {
            "value": "2577",
            "name": "偏关县",
            "parent": "308"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "308"
          },
          {
            "value": "309",
            "name": "阳泉",
            "parent": "23"
          },
          {
            "value": "2578",
            "name": "城区",
            "parent": "309"
          },
          {
            "value": "2579",
            "name": "矿区",
            "parent": "309"
          },
          {
            "value": "2580",
            "name": "郊区",
            "parent": "309"
          },
          {
            "value": "2581",
            "name": "平定县",
            "parent": "309"
          },
          {
            "value": "2582",
            "name": "盂县",
            "parent": "309"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "309"
          },
          {
            "value": "310",
            "name": "运城",
            "parent": "23"
          },
          {
            "value": "2583",
            "name": "盐湖区",
            "parent": "310"
          },
          {
            "value": "2584",
            "name": "永济市",
            "parent": "310"
          },
          {
            "value": "2585",
            "name": "河津市",
            "parent": "310"
          },
          {
            "value": "2586",
            "name": "临猗县",
            "parent": "310"
          },
          {
            "value": "2587",
            "name": "万荣县",
            "parent": "310"
          },
          {
            "value": "2588",
            "name": "闻喜县",
            "parent": "310"
          },
          {
            "value": "2589",
            "name": "稷山县",
            "parent": "310"
          },
          {
            "value": "2590",
            "name": "新绛县",
            "parent": "310"
          },
          {
            "value": "2591",
            "name": "绛县",
            "parent": "310"
          },
          {
            "value": "2592",
            "name": "垣曲县",
            "parent": "310"
          },
          {
            "value": "2593",
            "name": "夏县",
            "parent": "310"
          },
          {
            "value": "2594",
            "name": "平陆县",
            "parent": "310"
          },
          {
            "value": "2595",
            "name": "芮城县",
            "parent": "310"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "310"
          },
          {
            "value": "24",
            "name": "陕西",
            "parent": 0
          },
          {
            "value": "311",
            "name": "西安",
            "parent": "24"
          },
          {
            "value": "2596",
            "name": "莲湖区",
            "parent": "311"
          },
          {
            "value": "2597",
            "name": "新城区",
            "parent": "311"
          },
          {
            "value": "2598",
            "name": "碑林区",
            "parent": "311"
          },
          {
            "value": "2599",
            "name": "雁塔区",
            "parent": "311"
          },
          {
            "value": "2600",
            "name": "灞桥区",
            "parent": "311"
          },
          {
            "value": "2601",
            "name": "未央区",
            "parent": "311"
          },
          {
            "value": "2602",
            "name": "阎良区",
            "parent": "311"
          },
          {
            "value": "2603",
            "name": "临潼区",
            "parent": "311"
          },
          {
            "value": "2604",
            "name": "长安区",
            "parent": "311"
          },
          {
            "value": "2605",
            "name": "蓝田县",
            "parent": "311"
          },
          {
            "value": "2606",
            "name": "周至县",
            "parent": "311"
          },
          {
            "value": "2607",
            "name": "户县",
            "parent": "311"
          },
          {
            "value": "2608",
            "name": "高陵县",
            "parent": "311"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "311"
          },
          {
            "value": "312",
            "name": "安康",
            "parent": "24"
          },
          {
            "value": "2609",
            "name": "汉滨区",
            "parent": "312"
          },
          {
            "value": "2610",
            "name": "汉阴县",
            "parent": "312"
          },
          {
            "value": "2611",
            "name": "石泉县",
            "parent": "312"
          },
          {
            "value": "2612",
            "name": "宁陕县",
            "parent": "312"
          },
          {
            "value": "2613",
            "name": "紫阳县",
            "parent": "312"
          },
          {
            "value": "2614",
            "name": "岚皋县",
            "parent": "312"
          },
          {
            "value": "2615",
            "name": "平利县",
            "parent": "312"
          },
          {
            "value": "2616",
            "name": "镇坪县",
            "parent": "312"
          },
          {
            "value": "2617",
            "name": "旬阳县",
            "parent": "312"
          },
          {
            "value": "2618",
            "name": "白河县",
            "parent": "312"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "312"
          },
          {
            "value": "313",
            "name": "宝鸡",
            "parent": "24"
          },
          {
            "value": "2619",
            "name": "陈仓区",
            "parent": "313"
          },
          {
            "value": "2620",
            "name": "渭滨区",
            "parent": "313"
          },
          {
            "value": "2621",
            "name": "金台区",
            "parent": "313"
          },
          {
            "value": "2622",
            "name": "凤翔县",
            "parent": "313"
          },
          {
            "value": "2623",
            "name": "岐山县",
            "parent": "313"
          },
          {
            "value": "2624",
            "name": "扶风县",
            "parent": "313"
          },
          {
            "value": "2625",
            "name": "眉县",
            "parent": "313"
          },
          {
            "value": "2626",
            "name": "陇县",
            "parent": "313"
          },
          {
            "value": "2627",
            "name": "千阳县",
            "parent": "313"
          },
          {
            "value": "2628",
            "name": "麟游县",
            "parent": "313"
          },
          {
            "value": "2629",
            "name": "凤县",
            "parent": "313"
          },
          {
            "value": "2630",
            "name": "太白县",
            "parent": "313"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "313"
          },
          {
            "value": "314",
            "name": "汉中",
            "parent": "24"
          },
          {
            "value": "2631",
            "name": "汉台区",
            "parent": "314"
          },
          {
            "value": "2632",
            "name": "南郑县",
            "parent": "314"
          },
          {
            "value": "2633",
            "name": "城固县",
            "parent": "314"
          },
          {
            "value": "2634",
            "name": "洋县",
            "parent": "314"
          },
          {
            "value": "2635",
            "name": "西乡县",
            "parent": "314"
          },
          {
            "value": "2636",
            "name": "勉县",
            "parent": "314"
          },
          {
            "value": "2637",
            "name": "宁强县",
            "parent": "314"
          },
          {
            "value": "2638",
            "name": "略阳县",
            "parent": "314"
          },
          {
            "value": "2639",
            "name": "镇巴县",
            "parent": "314"
          },
          {
            "value": "2640",
            "name": "留坝县",
            "parent": "314"
          },
          {
            "value": "2641",
            "name": "佛坪县",
            "parent": "314"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "314"
          },
          {
            "value": "315",
            "name": "商洛",
            "parent": "24"
          },
          {
            "value": "2642",
            "name": "商州区",
            "parent": "315"
          },
          {
            "value": "2643",
            "name": "洛南县",
            "parent": "315"
          },
          {
            "value": "2644",
            "name": "丹凤县",
            "parent": "315"
          },
          {
            "value": "2645",
            "name": "商南县",
            "parent": "315"
          },
          {
            "value": "2646",
            "name": "山阳县",
            "parent": "315"
          },
          {
            "value": "2647",
            "name": "镇安县",
            "parent": "315"
          },
          {
            "value": "2648",
            "name": "柞水县",
            "parent": "315"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "315"
          },
          {
            "value": "316",
            "name": "铜川",
            "parent": "24"
          },
          {
            "value": "2649",
            "name": "耀州区",
            "parent": "316"
          },
          {
            "value": "2650",
            "name": "王益区",
            "parent": "316"
          },
          {
            "value": "2651",
            "name": "印台区",
            "parent": "316"
          },
          {
            "value": "2652",
            "name": "宜君县",
            "parent": "316"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "316"
          },
          {
            "value": "317",
            "name": "渭南",
            "parent": "24"
          },
          {
            "value": "2653",
            "name": "临渭区",
            "parent": "317"
          },
          {
            "value": "2654",
            "name": "韩城市",
            "parent": "317"
          },
          {
            "value": "2655",
            "name": "华阴市",
            "parent": "317"
          },
          {
            "value": "2656",
            "name": "华县",
            "parent": "317"
          },
          {
            "value": "2657",
            "name": "潼关县",
            "parent": "317"
          },
          {
            "value": "2658",
            "name": "大荔县",
            "parent": "317"
          },
          {
            "value": "2659",
            "name": "合阳县",
            "parent": "317"
          },
          {
            "value": "2660",
            "name": "澄城县",
            "parent": "317"
          },
          {
            "value": "2661",
            "name": "蒲城县",
            "parent": "317"
          },
          {
            "value": "2662",
            "name": "白水县",
            "parent": "317"
          },
          {
            "value": "2663",
            "name": "富平县",
            "parent": "317"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "317"
          },
          {
            "value": "318",
            "name": "咸阳",
            "parent": "24"
          },
          {
            "value": "2664",
            "name": "秦都区",
            "parent": "318"
          },
          {
            "value": "2665",
            "name": "渭城区",
            "parent": "318"
          },
          {
            "value": "2666",
            "name": "杨陵区",
            "parent": "318"
          },
          {
            "value": "2667",
            "name": "兴平市",
            "parent": "318"
          },
          {
            "value": "2668",
            "name": "三原县",
            "parent": "318"
          },
          {
            "value": "2669",
            "name": "泾阳县",
            "parent": "318"
          },
          {
            "value": "2670",
            "name": "乾县",
            "parent": "318"
          },
          {
            "value": "2671",
            "name": "礼泉县",
            "parent": "318"
          },
          {
            "value": "2672",
            "name": "永寿县",
            "parent": "318"
          },
          {
            "value": "2673",
            "name": "彬县",
            "parent": "318"
          },
          {
            "value": "2674",
            "name": "长武县",
            "parent": "318"
          },
          {
            "value": "2675",
            "name": "旬邑县",
            "parent": "318"
          },
          {
            "value": "2676",
            "name": "淳化县",
            "parent": "318"
          },
          {
            "value": "2677",
            "name": "武功县",
            "parent": "318"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "318"
          },
          {
            "value": "319",
            "name": "延安",
            "parent": "24"
          },
          {
            "value": "2678",
            "name": "吴起县",
            "parent": "319"
          },
          {
            "value": "2679",
            "name": "宝塔区",
            "parent": "319"
          },
          {
            "value": "2680",
            "name": "延长县",
            "parent": "319"
          },
          {
            "value": "2681",
            "name": "延川县",
            "parent": "319"
          },
          {
            "value": "2682",
            "name": "子长县",
            "parent": "319"
          },
          {
            "value": "2683",
            "name": "安塞县",
            "parent": "319"
          },
          {
            "value": "2684",
            "name": "志丹县",
            "parent": "319"
          },
          {
            "value": "2685",
            "name": "甘泉县",
            "parent": "319"
          },
          {
            "value": "2686",
            "name": "富县",
            "parent": "319"
          },
          {
            "value": "2687",
            "name": "洛川县",
            "parent": "319"
          },
          {
            "value": "2688",
            "name": "宜川县",
            "parent": "319"
          },
          {
            "value": "2689",
            "name": "黄龙县",
            "parent": "319"
          },
          {
            "value": "2690",
            "name": "黄陵县",
            "parent": "319"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "319"
          },
          {
            "value": "320",
            "name": "榆林",
            "parent": "24"
          },
          {
            "value": "2691",
            "name": "榆阳区",
            "parent": "320"
          },
          {
            "value": "2692",
            "name": "神木县",
            "parent": "320"
          },
          {
            "value": "2693",
            "name": "府谷县",
            "parent": "320"
          },
          {
            "value": "2694",
            "name": "横山县",
            "parent": "320"
          },
          {
            "value": "2695",
            "name": "靖边县",
            "parent": "320"
          },
          {
            "value": "2696",
            "name": "定边县",
            "parent": "320"
          },
          {
            "value": "2697",
            "name": "绥德县",
            "parent": "320"
          },
          {
            "value": "2698",
            "name": "米脂县",
            "parent": "320"
          },
          {
            "value": "2699",
            "name": "佳县",
            "parent": "320"
          },
          {
            "value": "2700",
            "name": "吴堡县",
            "parent": "320"
          },
          {
            "value": "2701",
            "name": "清涧县",
            "parent": "320"
          },
          {
            "value": "2702",
            "name": "子洲县",
            "parent": "320"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "320"
          },
          {
            "value": "25",
            "name": "上海",
            "parent": 0
          },
          {
            "value": "321",
            "name": "上海",
            "parent": "25"
          },
          {
            "value": "2703",
            "name": "长宁区",
            "parent": "321"
          },
          {
            "value": "2704",
            "name": "闸北区",
            "parent": "321"
          },
          {
            "value": "2705",
            "name": "闵行区",
            "parent": "321"
          },
          {
            "value": "2706",
            "name": "徐汇区",
            "parent": "321"
          },
          {
            "value": "2707",
            "name": "浦东新区",
            "parent": "321"
          },
          {
            "value": "2708",
            "name": "杨浦区",
            "parent": "321"
          },
          {
            "value": "2709",
            "name": "普陀区",
            "parent": "321"
          },
          {
            "value": "2710",
            "name": "静安区",
            "parent": "321"
          },
          {
            "value": "2711",
            "name": "卢湾区",
            "parent": "321"
          },
          {
            "value": "2712",
            "name": "虹口区",
            "parent": "321"
          },
          {
            "value": "2713",
            "name": "黄浦区",
            "parent": "321"
          },
          {
            "value": "2714",
            "name": "南汇区",
            "parent": "321"
          },
          {
            "value": "2715",
            "name": "松江区",
            "parent": "321"
          },
          {
            "value": "2716",
            "name": "嘉定区",
            "parent": "321"
          },
          {
            "value": "2717",
            "name": "宝山区",
            "parent": "321"
          },
          {
            "value": "2718",
            "name": "青浦区",
            "parent": "321"
          },
          {
            "value": "2719",
            "name": "金山区",
            "parent": "321"
          },
          {
            "value": "2720",
            "name": "奉贤区",
            "parent": "321"
          },
          {
            "value": "2721",
            "name": "崇明县",
            "parent": "321"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "321"
          },
          {
            "value": "26",
            "name": "四川",
            "parent": 0
          },
          {
            "value": "322",
            "name": "成都",
            "parent": "26"
          },
          {
            "value": "2722",
            "name": "青羊区",
            "parent": "322"
          },
          {
            "value": "2723",
            "name": "锦江区",
            "parent": "322"
          },
          {
            "value": "2724",
            "name": "金牛区",
            "parent": "322"
          },
          {
            "value": "2725",
            "name": "武侯区",
            "parent": "322"
          },
          {
            "value": "2726",
            "name": "成华区",
            "parent": "322"
          },
          {
            "value": "2727",
            "name": "龙泉驿区",
            "parent": "322"
          },
          {
            "value": "2728",
            "name": "青白江区",
            "parent": "322"
          },
          {
            "value": "2729",
            "name": "新都区",
            "parent": "322"
          },
          {
            "value": "2730",
            "name": "温江区",
            "parent": "322"
          },
          {
            "value": "2731",
            "name": "高新区",
            "parent": "322"
          },
          {
            "value": "2732",
            "name": "高新西区",
            "parent": "322"
          },
          {
            "value": "2733",
            "name": "都江堰市",
            "parent": "322"
          },
          {
            "value": "2734",
            "name": "彭州市",
            "parent": "322"
          },
          {
            "value": "2735",
            "name": "邛崃市",
            "parent": "322"
          },
          {
            "value": "2736",
            "name": "崇州市",
            "parent": "322"
          },
          {
            "value": "2737",
            "name": "金堂县",
            "parent": "322"
          },
          {
            "value": "2738",
            "name": "双流县",
            "parent": "322"
          },
          {
            "value": "2739",
            "name": "郫县",
            "parent": "322"
          },
          {
            "value": "2740",
            "name": "大邑县",
            "parent": "322"
          },
          {
            "value": "2741",
            "name": "蒲江县",
            "parent": "322"
          },
          {
            "value": "2742",
            "name": "新津县",
            "parent": "322"
          },
          {
            "value": "2743",
            "name": "都江堰市",
            "parent": "322"
          },
          {
            "value": "2744",
            "name": "彭州市",
            "parent": "322"
          },
          {
            "value": "2745",
            "name": "邛崃市",
            "parent": "322"
          },
          {
            "value": "2746",
            "name": "崇州市",
            "parent": "322"
          },
          {
            "value": "2747",
            "name": "金堂县",
            "parent": "322"
          },
          {
            "value": "2748",
            "name": "双流县",
            "parent": "322"
          },
          {
            "value": "2749",
            "name": "郫县",
            "parent": "322"
          },
          {
            "value": "2750",
            "name": "大邑县",
            "parent": "322"
          },
          {
            "value": "2751",
            "name": "蒲江县",
            "parent": "322"
          },
          {
            "value": "2752",
            "name": "新津县",
            "parent": "322"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "322"
          },
          {
            "value": "323",
            "name": "绵阳",
            "parent": "26"
          },
          {
            "value": "2753",
            "name": "涪城区",
            "parent": "323"
          },
          {
            "value": "2754",
            "name": "游仙区",
            "parent": "323"
          },
          {
            "value": "2755",
            "name": "江油市",
            "parent": "323"
          },
          {
            "value": "2756",
            "name": "盐亭县",
            "parent": "323"
          },
          {
            "value": "2757",
            "name": "三台县",
            "parent": "323"
          },
          {
            "value": "2758",
            "name": "平武县",
            "parent": "323"
          },
          {
            "value": "2759",
            "name": "安县",
            "parent": "323"
          },
          {
            "value": "2760",
            "name": "梓潼县",
            "parent": "323"
          },
          {
            "value": "2761",
            "name": "北川县",
            "parent": "323"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "323"
          },
          {
            "value": "324",
            "name": "阿坝",
            "parent": "26"
          },
          {
            "value": "2762",
            "name": "马尔康县",
            "parent": "324"
          },
          {
            "value": "2763",
            "name": "汶川县",
            "parent": "324"
          },
          {
            "value": "2764",
            "name": "理县",
            "parent": "324"
          },
          {
            "value": "2765",
            "name": "茂县",
            "parent": "324"
          },
          {
            "value": "2766",
            "name": "松潘县",
            "parent": "324"
          },
          {
            "value": "2767",
            "name": "九寨沟县",
            "parent": "324"
          },
          {
            "value": "2768",
            "name": "金川县",
            "parent": "324"
          },
          {
            "value": "2769",
            "name": "小金县",
            "parent": "324"
          },
          {
            "value": "2770",
            "name": "黑水县",
            "parent": "324"
          },
          {
            "value": "2771",
            "name": "壤塘县",
            "parent": "324"
          },
          {
            "value": "2772",
            "name": "阿坝县",
            "parent": "324"
          },
          {
            "value": "2773",
            "name": "若尔盖县",
            "parent": "324"
          },
          {
            "value": "2774",
            "name": "红原县",
            "parent": "324"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "324"
          },
          {
            "value": "325",
            "name": "巴中",
            "parent": "26"
          },
          {
            "value": "2775",
            "name": "巴州区",
            "parent": "325"
          },
          {
            "value": "2776",
            "name": "通江县",
            "parent": "325"
          },
          {
            "value": "2777",
            "name": "南江县",
            "parent": "325"
          },
          {
            "value": "2778",
            "name": "平昌县",
            "parent": "325"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "325"
          },
          {
            "value": "326",
            "name": "达州",
            "parent": "26"
          },
          {
            "value": "2779",
            "name": "通川区",
            "parent": "326"
          },
          {
            "value": "2780",
            "name": "万源市",
            "parent": "326"
          },
          {
            "value": "2781",
            "name": "达县",
            "parent": "326"
          },
          {
            "value": "2782",
            "name": "宣汉县",
            "parent": "326"
          },
          {
            "value": "2783",
            "name": "开江县",
            "parent": "326"
          },
          {
            "value": "2784",
            "name": "大竹县",
            "parent": "326"
          },
          {
            "value": "2785",
            "name": "渠县",
            "parent": "326"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "326"
          },
          {
            "value": "327",
            "name": "德阳",
            "parent": "26"
          },
          {
            "value": "2786",
            "name": "旌阳区",
            "parent": "327"
          },
          {
            "value": "2787",
            "name": "广汉市",
            "parent": "327"
          },
          {
            "value": "2788",
            "name": "什邡市",
            "parent": "327"
          },
          {
            "value": "2789",
            "name": "绵竹市",
            "parent": "327"
          },
          {
            "value": "2790",
            "name": "罗江县",
            "parent": "327"
          },
          {
            "value": "2791",
            "name": "中江县",
            "parent": "327"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "327"
          },
          {
            "value": "328",
            "name": "甘孜",
            "parent": "26"
          },
          {
            "value": "2792",
            "name": "康定县",
            "parent": "328"
          },
          {
            "value": "2793",
            "name": "丹巴县",
            "parent": "328"
          },
          {
            "value": "2794",
            "name": "泸定县",
            "parent": "328"
          },
          {
            "value": "2795",
            "name": "炉霍县",
            "parent": "328"
          },
          {
            "value": "2796",
            "name": "九龙县",
            "parent": "328"
          },
          {
            "value": "2797",
            "name": "甘孜县",
            "parent": "328"
          },
          {
            "value": "2798",
            "name": "雅江县",
            "parent": "328"
          },
          {
            "value": "2799",
            "name": "新龙县",
            "parent": "328"
          },
          {
            "value": "2800",
            "name": "道孚县",
            "parent": "328"
          },
          {
            "value": "2801",
            "name": "白玉县",
            "parent": "328"
          },
          {
            "value": "2802",
            "name": "理塘县",
            "parent": "328"
          },
          {
            "value": "2803",
            "name": "德格县",
            "parent": "328"
          },
          {
            "value": "2804",
            "name": "乡城县",
            "parent": "328"
          },
          {
            "value": "2805",
            "name": "石渠县",
            "parent": "328"
          },
          {
            "value": "2806",
            "name": "稻城县",
            "parent": "328"
          },
          {
            "value": "2807",
            "name": "色达县",
            "parent": "328"
          },
          {
            "value": "2808",
            "name": "巴塘县",
            "parent": "328"
          },
          {
            "value": "2809",
            "name": "得荣县",
            "parent": "328"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "328"
          },
          {
            "value": "329",
            "name": "广安",
            "parent": "26"
          },
          {
            "value": "2810",
            "name": "广安区",
            "parent": "329"
          },
          {
            "value": "2811",
            "name": "华蓥市",
            "parent": "329"
          },
          {
            "value": "2812",
            "name": "岳池县",
            "parent": "329"
          },
          {
            "value": "2813",
            "name": "武胜县",
            "parent": "329"
          },
          {
            "value": "2814",
            "name": "邻水县",
            "parent": "329"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "329"
          },
          {
            "value": "330",
            "name": "广元",
            "parent": "26"
          },
          {
            "value": "2815",
            "name": "利州区",
            "parent": "330"
          },
          {
            "value": "2816",
            "name": "元坝区",
            "parent": "330"
          },
          {
            "value": "2817",
            "name": "朝天区",
            "parent": "330"
          },
          {
            "value": "2818",
            "name": "旺苍县",
            "parent": "330"
          },
          {
            "value": "2819",
            "name": "青川县",
            "parent": "330"
          },
          {
            "value": "2820",
            "name": "剑阁县",
            "parent": "330"
          },
          {
            "value": "2821",
            "name": "苍溪县",
            "parent": "330"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "330"
          },
          {
            "value": "331",
            "name": "乐山",
            "parent": "26"
          },
          {
            "value": "2822",
            "name": "峨眉山市",
            "parent": "331"
          },
          {
            "value": "2823",
            "name": "乐山市",
            "parent": "331"
          },
          {
            "value": "2824",
            "name": "犍为县",
            "parent": "331"
          },
          {
            "value": "2825",
            "name": "井研县",
            "parent": "331"
          },
          {
            "value": "2826",
            "name": "夹江县",
            "parent": "331"
          },
          {
            "value": "2827",
            "name": "沐川县",
            "parent": "331"
          },
          {
            "value": "2828",
            "name": "峨边",
            "parent": "331"
          },
          {
            "value": "2829",
            "name": "马边",
            "parent": "331"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "331"
          },
          {
            "value": "332",
            "name": "凉山",
            "parent": "26"
          },
          {
            "value": "2830",
            "name": "西昌市",
            "parent": "332"
          },
          {
            "value": "2831",
            "name": "盐源县",
            "parent": "332"
          },
          {
            "value": "2832",
            "name": "德昌县",
            "parent": "332"
          },
          {
            "value": "2833",
            "name": "会理县",
            "parent": "332"
          },
          {
            "value": "2834",
            "name": "会东县",
            "parent": "332"
          },
          {
            "value": "2835",
            "name": "宁南县",
            "parent": "332"
          },
          {
            "value": "2836",
            "name": "普格县",
            "parent": "332"
          },
          {
            "value": "2837",
            "name": "布拖县",
            "parent": "332"
          },
          {
            "value": "2838",
            "name": "金阳县",
            "parent": "332"
          },
          {
            "value": "2839",
            "name": "昭觉县",
            "parent": "332"
          },
          {
            "value": "2840",
            "name": "喜德县",
            "parent": "332"
          },
          {
            "value": "2841",
            "name": "冕宁县",
            "parent": "332"
          },
          {
            "value": "2842",
            "name": "越西县",
            "parent": "332"
          },
          {
            "value": "2843",
            "name": "甘洛县",
            "parent": "332"
          },
          {
            "value": "2844",
            "name": "美姑县",
            "parent": "332"
          },
          {
            "value": "2845",
            "name": "雷波县",
            "parent": "332"
          },
          {
            "value": "2846",
            "name": "木里",
            "parent": "332"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "332"
          },
          {
            "value": "333",
            "name": "眉山",
            "parent": "26"
          },
          {
            "value": "2847",
            "name": "东坡区",
            "parent": "333"
          },
          {
            "value": "2848",
            "name": "仁寿县",
            "parent": "333"
          },
          {
            "value": "2849",
            "name": "彭山县",
            "parent": "333"
          },
          {
            "value": "2850",
            "name": "洪雅县",
            "parent": "333"
          },
          {
            "value": "2851",
            "name": "丹棱县",
            "parent": "333"
          },
          {
            "value": "2852",
            "name": "青神县",
            "parent": "333"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "333"
          },
          {
            "value": "334",
            "name": "南充",
            "parent": "26"
          },
          {
            "value": "2853",
            "name": "阆中市",
            "parent": "334"
          },
          {
            "value": "2854",
            "name": "南部县",
            "parent": "334"
          },
          {
            "value": "2855",
            "name": "营山县",
            "parent": "334"
          },
          {
            "value": "2856",
            "name": "蓬安县",
            "parent": "334"
          },
          {
            "value": "2857",
            "name": "仪陇县",
            "parent": "334"
          },
          {
            "value": "2858",
            "name": "顺庆区",
            "parent": "334"
          },
          {
            "value": "2859",
            "name": "高坪区",
            "parent": "334"
          },
          {
            "value": "2860",
            "name": "嘉陵区",
            "parent": "334"
          },
          {
            "value": "2861",
            "name": "西充县",
            "parent": "334"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "334"
          },
          {
            "value": "335",
            "name": "内江",
            "parent": "26"
          },
          {
            "value": "2862",
            "name": "市中区",
            "parent": "335"
          },
          {
            "value": "2863",
            "name": "东兴区",
            "parent": "335"
          },
          {
            "value": "2864",
            "name": "威远县",
            "parent": "335"
          },
          {
            "value": "2865",
            "name": "资中县",
            "parent": "335"
          },
          {
            "value": "2866",
            "name": "隆昌县",
            "parent": "335"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "335"
          },
          {
            "value": "336",
            "name": "攀枝花",
            "parent": "26"
          },
          {
            "value": "2867",
            "name": "东  区",
            "parent": "336"
          },
          {
            "value": "2868",
            "name": "西  区",
            "parent": "336"
          },
          {
            "value": "2869",
            "name": "仁和区",
            "parent": "336"
          },
          {
            "value": "2870",
            "name": "米易县",
            "parent": "336"
          },
          {
            "value": "2871",
            "name": "盐边县",
            "parent": "336"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "336"
          },
          {
            "value": "337",
            "name": "遂宁",
            "parent": "26"
          },
          {
            "value": "2872",
            "name": "船山区",
            "parent": "337"
          },
          {
            "value": "2873",
            "name": "安居区",
            "parent": "337"
          },
          {
            "value": "2874",
            "name": "蓬溪县",
            "parent": "337"
          },
          {
            "value": "2875",
            "name": "射洪县",
            "parent": "337"
          },
          {
            "value": "2876",
            "name": "大英县",
            "parent": "337"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "337"
          },
          {
            "value": "338",
            "name": "雅安",
            "parent": "26"
          },
          {
            "value": "2877",
            "name": "雨城区",
            "parent": "338"
          },
          {
            "value": "2878",
            "name": "名山县",
            "parent": "338"
          },
          {
            "value": "2879",
            "name": "荥经县",
            "parent": "338"
          },
          {
            "value": "2880",
            "name": "汉源县",
            "parent": "338"
          },
          {
            "value": "2881",
            "name": "石棉县",
            "parent": "338"
          },
          {
            "value": "2882",
            "name": "天全县",
            "parent": "338"
          },
          {
            "value": "2883",
            "name": "芦山县",
            "parent": "338"
          },
          {
            "value": "2884",
            "name": "宝兴县",
            "parent": "338"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "338"
          },
          {
            "value": "339",
            "name": "宜宾",
            "parent": "26"
          },
          {
            "value": "2885",
            "name": "翠屏区",
            "parent": "339"
          },
          {
            "value": "2886",
            "name": "宜宾县",
            "parent": "339"
          },
          {
            "value": "2887",
            "name": "南溪县",
            "parent": "339"
          },
          {
            "value": "2888",
            "name": "江安县",
            "parent": "339"
          },
          {
            "value": "2889",
            "name": "长宁县",
            "parent": "339"
          },
          {
            "value": "2890",
            "name": "高县",
            "parent": "339"
          },
          {
            "value": "2891",
            "name": "珙县",
            "parent": "339"
          },
          {
            "value": "2892",
            "name": "筠连县",
            "parent": "339"
          },
          {
            "value": "2893",
            "name": "兴文县",
            "parent": "339"
          },
          {
            "value": "2894",
            "name": "屏山县",
            "parent": "339"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "339"
          },
          {
            "value": "340",
            "name": "资阳",
            "parent": "26"
          },
          {
            "value": "2895",
            "name": "雁江区",
            "parent": "340"
          },
          {
            "value": "2896",
            "name": "简阳市",
            "parent": "340"
          },
          {
            "value": "2897",
            "name": "安岳县",
            "parent": "340"
          },
          {
            "value": "2898",
            "name": "乐至县",
            "parent": "340"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "340"
          },
          {
            "value": "341",
            "name": "自贡",
            "parent": "26"
          },
          {
            "value": "2899",
            "name": "大安区",
            "parent": "341"
          },
          {
            "value": "2900",
            "name": "自流井区",
            "parent": "341"
          },
          {
            "value": "2901",
            "name": "贡井区",
            "parent": "341"
          },
          {
            "value": "2902",
            "name": "沿滩区",
            "parent": "341"
          },
          {
            "value": "2903",
            "name": "荣县",
            "parent": "341"
          },
          {
            "value": "2904",
            "name": "富顺县",
            "parent": "341"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "341"
          },
          {
            "value": "342",
            "name": "泸州",
            "parent": "26"
          },
          {
            "value": "2905",
            "name": "江阳区",
            "parent": "342"
          },
          {
            "value": "2906",
            "name": "纳溪区",
            "parent": "342"
          },
          {
            "value": "2907",
            "name": "龙马潭区",
            "parent": "342"
          },
          {
            "value": "2908",
            "name": "泸县",
            "parent": "342"
          },
          {
            "value": "2909",
            "name": "合江县",
            "parent": "342"
          },
          {
            "value": "2910",
            "name": "叙永县",
            "parent": "342"
          },
          {
            "value": "2911",
            "name": "古蔺县",
            "parent": "342"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "342"
          },
          {
            "value": "27",
            "name": "天津",
            "parent": 0
          },
          {
            "value": "343",
            "name": "天津",
            "parent": "27"
          },
          {
            "value": "2912",
            "name": "和平区",
            "parent": "343"
          },
          {
            "value": "2913",
            "name": "河西区",
            "parent": "343"
          },
          {
            "value": "2914",
            "name": "南开区",
            "parent": "343"
          },
          {
            "value": "2915",
            "name": "河北区",
            "parent": "343"
          },
          {
            "value": "2916",
            "name": "河东区",
            "parent": "343"
          },
          {
            "value": "2917",
            "name": "红桥区",
            "parent": "343"
          },
          {
            "value": "2918",
            "name": "东丽区",
            "parent": "343"
          },
          {
            "value": "2919",
            "name": "津南区",
            "parent": "343"
          },
          {
            "value": "2920",
            "name": "西青区",
            "parent": "343"
          },
          {
            "value": "2921",
            "name": "北辰区",
            "parent": "343"
          },
          {
            "value": "2922",
            "name": "塘沽区",
            "parent": "343"
          },
          {
            "value": "2923",
            "name": "汉沽区",
            "parent": "343"
          },
          {
            "value": "2924",
            "name": "大港区",
            "parent": "343"
          },
          {
            "value": "2925",
            "name": "武清区",
            "parent": "343"
          },
          {
            "value": "2926",
            "name": "宝坻区",
            "parent": "343"
          },
          {
            "value": "2927",
            "name": "经济开发区",
            "parent": "343"
          },
          {
            "value": "2928",
            "name": "宁河县",
            "parent": "343"
          },
          {
            "value": "2929",
            "name": "静海县",
            "parent": "343"
          },
          {
            "value": "2930",
            "name": "蓟县",
            "parent": "343"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "343"
          },
          {
            "value": "28",
            "name": "西藏",
            "parent": 0
          },
          {
            "value": "344",
            "name": "拉萨",
            "parent": "28"
          },
          {
            "value": "2931",
            "name": "城关区",
            "parent": "344"
          },
          {
            "value": "2932",
            "name": "林周县",
            "parent": "344"
          },
          {
            "value": "2933",
            "name": "当雄县",
            "parent": "344"
          },
          {
            "value": "2934",
            "name": "尼木县",
            "parent": "344"
          },
          {
            "value": "2935",
            "name": "曲水县",
            "parent": "344"
          },
          {
            "value": "2936",
            "name": "堆龙德庆县",
            "parent": "344"
          },
          {
            "value": "2937",
            "name": "达孜县",
            "parent": "344"
          },
          {
            "value": "2938",
            "name": "墨竹工卡县",
            "parent": "344"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "344"
          },
          {
            "value": "345",
            "name": "阿里",
            "parent": "28"
          },
          {
            "value": "2939",
            "name": "噶尔县",
            "parent": "345"
          },
          {
            "value": "2940",
            "name": "普兰县",
            "parent": "345"
          },
          {
            "value": "2941",
            "name": "札达县",
            "parent": "345"
          },
          {
            "value": "2942",
            "name": "日土县",
            "parent": "345"
          },
          {
            "value": "2943",
            "name": "革吉县",
            "parent": "345"
          },
          {
            "value": "2944",
            "name": "改则县",
            "parent": "345"
          },
          {
            "value": "2945",
            "name": "措勤县",
            "parent": "345"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "345"
          },
          {
            "value": "346",
            "name": "昌都",
            "parent": "28"
          },
          {
            "value": "2946",
            "name": "昌都县",
            "parent": "346"
          },
          {
            "value": "2947",
            "name": "江达县",
            "parent": "346"
          },
          {
            "value": "2948",
            "name": "贡觉县",
            "parent": "346"
          },
          {
            "value": "2949",
            "name": "类乌齐县",
            "parent": "346"
          },
          {
            "value": "2950",
            "name": "丁青县",
            "parent": "346"
          },
          {
            "value": "2951",
            "name": "察雅县",
            "parent": "346"
          },
          {
            "value": "2952",
            "name": "八宿县",
            "parent": "346"
          },
          {
            "value": "2953",
            "name": "左贡县",
            "parent": "346"
          },
          {
            "value": "2954",
            "name": "芒康县",
            "parent": "346"
          },
          {
            "value": "2955",
            "name": "洛隆县",
            "parent": "346"
          },
          {
            "value": "2956",
            "name": "边坝县",
            "parent": "346"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "346"
          },
          {
            "value": "347",
            "name": "林芝",
            "parent": "28"
          },
          {
            "value": "2957",
            "name": "林芝县",
            "parent": "347"
          },
          {
            "value": "2958",
            "name": "工布江达县",
            "parent": "347"
          },
          {
            "value": "2959",
            "name": "米林县",
            "parent": "347"
          },
          {
            "value": "2960",
            "name": "墨脱县",
            "parent": "347"
          },
          {
            "value": "2961",
            "name": "波密县",
            "parent": "347"
          },
          {
            "value": "2962",
            "name": "察隅县",
            "parent": "347"
          },
          {
            "value": "2963",
            "name": "朗县",
            "parent": "347"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "347"
          },
          {
            "value": "348",
            "name": "那曲",
            "parent": "28"
          },
          {
            "value": "2964",
            "name": "那曲县",
            "parent": "348"
          },
          {
            "value": "2965",
            "name": "嘉黎县",
            "parent": "348"
          },
          {
            "value": "2966",
            "name": "比如县",
            "parent": "348"
          },
          {
            "value": "2967",
            "name": "聂荣县",
            "parent": "348"
          },
          {
            "value": "2968",
            "name": "安多县",
            "parent": "348"
          },
          {
            "value": "2969",
            "name": "申扎县",
            "parent": "348"
          },
          {
            "value": "2970",
            "name": "索县",
            "parent": "348"
          },
          {
            "value": "2971",
            "name": "班戈县",
            "parent": "348"
          },
          {
            "value": "2972",
            "name": "巴青县",
            "parent": "348"
          },
          {
            "value": "2973",
            "name": "尼玛县",
            "parent": "348"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "348"
          },
          {
            "value": "349",
            "name": "日喀则",
            "parent": "28"
          },
          {
            "value": "2974",
            "name": "日喀则市",
            "parent": "349"
          },
          {
            "value": "2975",
            "name": "南木林县",
            "parent": "349"
          },
          {
            "value": "2976",
            "name": "江孜县",
            "parent": "349"
          },
          {
            "value": "2977",
            "name": "定日县",
            "parent": "349"
          },
          {
            "value": "2978",
            "name": "萨迦县",
            "parent": "349"
          },
          {
            "value": "2979",
            "name": "拉孜县",
            "parent": "349"
          },
          {
            "value": "2980",
            "name": "昂仁县",
            "parent": "349"
          },
          {
            "value": "2981",
            "name": "谢通门县",
            "parent": "349"
          },
          {
            "value": "2982",
            "name": "白朗县",
            "parent": "349"
          },
          {
            "value": "2983",
            "name": "仁布县",
            "parent": "349"
          },
          {
            "value": "2984",
            "name": "康马县",
            "parent": "349"
          },
          {
            "value": "2985",
            "name": "定结县",
            "parent": "349"
          },
          {
            "value": "2986",
            "name": "仲巴县",
            "parent": "349"
          },
          {
            "value": "2987",
            "name": "亚东县",
            "parent": "349"
          },
          {
            "value": "2988",
            "name": "吉隆县",
            "parent": "349"
          },
          {
            "value": "2989",
            "name": "聂拉木县",
            "parent": "349"
          },
          {
            "value": "2990",
            "name": "萨嘎县",
            "parent": "349"
          },
          {
            "value": "2991",
            "name": "岗巴县",
            "parent": "349"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "349"
          },
          {
            "value": "350",
            "name": "山南",
            "parent": "28"
          },
          {
            "value": "2992",
            "name": "乃东县",
            "parent": "350"
          },
          {
            "value": "2993",
            "name": "扎囊县",
            "parent": "350"
          },
          {
            "value": "2994",
            "name": "贡嘎县",
            "parent": "350"
          },
          {
            "value": "2995",
            "name": "桑日县",
            "parent": "350"
          },
          {
            "value": "2996",
            "name": "琼结县",
            "parent": "350"
          },
          {
            "value": "2997",
            "name": "曲松县",
            "parent": "350"
          },
          {
            "value": "2998",
            "name": "措美县",
            "parent": "350"
          },
          {
            "value": "2999",
            "name": "洛扎县",
            "parent": "350"
          },
          {
            "value": "3000",
            "name": "加查县",
            "parent": "350"
          },
          {
            "value": "3001",
            "name": "隆子县",
            "parent": "350"
          },
          {
            "value": "3002",
            "name": "错那县",
            "parent": "350"
          },
          {
            "value": "3003",
            "name": "浪卡子县",
            "parent": "350"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "350"
          },
          {
            "value": "29",
            "name": "新疆",
            "parent": 0
          },
          {
            "value": "351",
            "name": "乌鲁木齐",
            "parent": "29"
          },
          {
            "value": "3004",
            "name": "天山区",
            "parent": "351"
          },
          {
            "value": "3005",
            "name": "沙依巴克区",
            "parent": "351"
          },
          {
            "value": "3006",
            "name": "新市区",
            "parent": "351"
          },
          {
            "value": "3007",
            "name": "水磨沟区",
            "parent": "351"
          },
          {
            "value": "3008",
            "name": "头屯河区",
            "parent": "351"
          },
          {
            "value": "3009",
            "name": "达坂城区",
            "parent": "351"
          },
          {
            "value": "3010",
            "name": "米东区",
            "parent": "351"
          },
          {
            "value": "3011",
            "name": "乌鲁木齐县",
            "parent": "351"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "351"
          },
          {
            "value": "352",
            "name": "阿克苏",
            "parent": "29"
          },
          {
            "value": "3012",
            "name": "阿克苏市",
            "parent": "352"
          },
          {
            "value": "3013",
            "name": "温宿县",
            "parent": "352"
          },
          {
            "value": "3014",
            "name": "库车县",
            "parent": "352"
          },
          {
            "value": "3015",
            "name": "沙雅县",
            "parent": "352"
          },
          {
            "value": "3016",
            "name": "新和县",
            "parent": "352"
          },
          {
            "value": "3017",
            "name": "拜城县",
            "parent": "352"
          },
          {
            "value": "3018",
            "name": "乌什县",
            "parent": "352"
          },
          {
            "value": "3019",
            "name": "阿瓦提县",
            "parent": "352"
          },
          {
            "value": "3020",
            "name": "柯坪县",
            "parent": "352"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "352"
          },
          {
            "value": "353",
            "name": "阿拉尔",
            "parent": "29"
          },
          {
            "value": "3021",
            "name": "阿拉尔市",
            "parent": "353"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "353"
          },
          {
            "value": "354",
            "name": "巴音郭楞",
            "parent": "29"
          },
          {
            "value": "3022",
            "name": "库尔勒市",
            "parent": "354"
          },
          {
            "value": "3023",
            "name": "轮台县",
            "parent": "354"
          },
          {
            "value": "3024",
            "name": "尉犁县",
            "parent": "354"
          },
          {
            "value": "3025",
            "name": "若羌县",
            "parent": "354"
          },
          {
            "value": "3026",
            "name": "且末县",
            "parent": "354"
          },
          {
            "value": "3027",
            "name": "焉耆",
            "parent": "354"
          },
          {
            "value": "3028",
            "name": "和静县",
            "parent": "354"
          },
          {
            "value": "3029",
            "name": "和硕县",
            "parent": "354"
          },
          {
            "value": "3030",
            "name": "博湖县",
            "parent": "354"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "354"
          },
          {
            "value": "355",
            "name": "博尔塔拉",
            "parent": "29"
          },
          {
            "value": "3031",
            "name": "博乐市",
            "parent": "355"
          },
          {
            "value": "3032",
            "name": "精河县",
            "parent": "355"
          },
          {
            "value": "3033",
            "name": "温泉县",
            "parent": "355"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "355"
          },
          {
            "value": "356",
            "name": "昌吉",
            "parent": "29"
          },
          {
            "value": "3034",
            "name": "呼图壁县",
            "parent": "356"
          },
          {
            "value": "3035",
            "name": "米泉市",
            "parent": "356"
          },
          {
            "value": "3036",
            "name": "昌吉市",
            "parent": "356"
          },
          {
            "value": "3037",
            "name": "阜康市",
            "parent": "356"
          },
          {
            "value": "3038",
            "name": "玛纳斯县",
            "parent": "356"
          },
          {
            "value": "3039",
            "name": "奇台县",
            "parent": "356"
          },
          {
            "value": "3040",
            "name": "吉木萨尔县",
            "parent": "356"
          },
          {
            "value": "3041",
            "name": "木垒",
            "parent": "356"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "356"
          },
          {
            "value": "357",
            "name": "哈密",
            "parent": "29"
          },
          {
            "value": "3042",
            "name": "哈密市",
            "parent": "357"
          },
          {
            "value": "3043",
            "name": "伊吾县",
            "parent": "357"
          },
          {
            "value": "3044",
            "name": "巴里坤",
            "parent": "357"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "357"
          },
          {
            "value": "358",
            "name": "和田",
            "parent": "29"
          },
          {
            "value": "3045",
            "name": "和田市",
            "parent": "358"
          },
          {
            "value": "3046",
            "name": "和田县",
            "parent": "358"
          },
          {
            "value": "3047",
            "name": "墨玉县",
            "parent": "358"
          },
          {
            "value": "3048",
            "name": "皮山县",
            "parent": "358"
          },
          {
            "value": "3049",
            "name": "洛浦县",
            "parent": "358"
          },
          {
            "value": "3050",
            "name": "策勒县",
            "parent": "358"
          },
          {
            "value": "3051",
            "name": "于田县",
            "parent": "358"
          },
          {
            "value": "3052",
            "name": "民丰县",
            "parent": "358"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "358"
          },
          {
            "value": "359",
            "name": "喀什",
            "parent": "29"
          },
          {
            "value": "3053",
            "name": "喀什市",
            "parent": "359"
          },
          {
            "value": "3054",
            "name": "疏附县",
            "parent": "359"
          },
          {
            "value": "3055",
            "name": "疏勒县",
            "parent": "359"
          },
          {
            "value": "3056",
            "name": "英吉沙县",
            "parent": "359"
          },
          {
            "value": "3057",
            "name": "泽普县",
            "parent": "359"
          },
          {
            "value": "3058",
            "name": "莎车县",
            "parent": "359"
          },
          {
            "value": "3059",
            "name": "叶城县",
            "parent": "359"
          },
          {
            "value": "3060",
            "name": "麦盖提县",
            "parent": "359"
          },
          {
            "value": "3061",
            "name": "岳普湖县",
            "parent": "359"
          },
          {
            "value": "3062",
            "name": "伽师县",
            "parent": "359"
          },
          {
            "value": "3063",
            "name": "巴楚县",
            "parent": "359"
          },
          {
            "value": "3064",
            "name": "塔什库尔干",
            "parent": "359"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "359"
          },
          {
            "value": "360",
            "name": "克拉玛依",
            "parent": "29"
          },
          {
            "value": "3065",
            "name": "克拉玛依市",
            "parent": "360"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "360"
          },
          {
            "value": "361",
            "name": "克孜勒苏",
            "parent": "29"
          },
          {
            "value": "3066",
            "name": "阿图什市",
            "parent": "361"
          },
          {
            "value": "3067",
            "name": "阿克陶县",
            "parent": "361"
          },
          {
            "value": "3068",
            "name": "阿合奇县",
            "parent": "361"
          },
          {
            "value": "3069",
            "name": "乌恰县",
            "parent": "361"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "361"
          },
          {
            "value": "362",
            "name": "石河子",
            "parent": "29"
          },
          {
            "value": "3070",
            "name": "石河子市",
            "parent": "362"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "362"
          },
          {
            "value": "363",
            "name": "图木舒克",
            "parent": "29"
          },
          {
            "value": "3071",
            "name": "图木舒克市",
            "parent": "363"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "363"
          },
          {
            "value": "364",
            "name": "吐鲁番",
            "parent": "29"
          },
          {
            "value": "3072",
            "name": "吐鲁番市",
            "parent": "364"
          },
          {
            "value": "3073",
            "name": "鄯善县",
            "parent": "364"
          },
          {
            "value": "3074",
            "name": "托克逊县",
            "parent": "364"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "364"
          },
          {
            "value": "365",
            "name": "五家渠",
            "parent": "29"
          },
          {
            "value": "3075",
            "name": "五家渠市",
            "parent": "365"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "365"
          },
          {
            "value": "366",
            "name": "伊犁",
            "parent": "29"
          },
          {
            "value": "3078",
            "name": "伊宁市",
            "parent": "366"
          },
          {
            "value": "3080",
            "name": "奎屯市",
            "parent": "366"
          },
          {
            "value": "3084",
            "name": "伊宁县",
            "parent": "366"
          },
          {
            "value": "3086",
            "name": "霍城县",
            "parent": "366"
          },
          {
            "value": "3088",
            "name": "巩留县",
            "parent": "366"
          },
          {
            "value": "3092",
            "name": "新源县",
            "parent": "366"
          },
          {
            "value": "3096",
            "name": "昭苏县",
            "parent": "366"
          },
          {
            "value": "3097",
            "name": "特克斯县",
            "parent": "366"
          },
          {
            "value": "3098",
            "name": "尼勒克县",
            "parent": "366"
          },
          {
            "value": "3099",
            "name": "察布查尔",
            "parent": "366"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "366"
          },
          {
            "value": "3412",
            "name": "塔城地区",
            "parent": "29"
          },
          {
            "value": "3413",
            "name": "额敏县",
            "parent": "3412"
          },
          {
            "value": "3414",
            "name": "和布克赛尔县",
            "parent": "3412"
          },
          {
            "value": "3415",
            "name": "沙湾县",
            "parent": "3412"
          },
          {
            "value": "3416",
            "name": "塔城市",
            "parent": "3412"
          },
          {
            "value": "3417",
            "name": "托里县",
            "parent": "3412"
          },
          {
            "value": "3418",
            "name": "乌苏市",
            "parent": "3412"
          },
          {
            "value": "3419",
            "name": "裕民县",
            "parent": "3412"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "3412"
          },
          {
            "value": "3429",
            "name": "阿勒泰地区",
            "parent": "29"
          },
          {
            "value": "3076",
            "name": "阿勒泰市",
            "parent": "3429"
          },
          {
            "value": "3079",
            "name": "布尔津县",
            "parent": "3429"
          },
          {
            "value": "3083",
            "name": "富蕴县",
            "parent": "3429"
          },
          {
            "value": "3085",
            "name": "福海县",
            "parent": "3429"
          },
          {
            "value": "3089",
            "name": "哈巴河县",
            "parent": "3429"
          },
          {
            "value": "3091",
            "name": "青河县",
            "parent": "3429"
          },
          {
            "value": "3095",
            "name": "吉木乃县",
            "parent": "3429"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "3429"
          },
          {
            "value": "30",
            "name": "云南",
            "parent": 0
          },
          {
            "value": "367",
            "name": "昆明",
            "parent": "30"
          },
          {
            "value": "3100",
            "name": "盘龙区",
            "parent": "367"
          },
          {
            "value": "3101",
            "name": "五华区",
            "parent": "367"
          },
          {
            "value": "3102",
            "name": "官渡区",
            "parent": "367"
          },
          {
            "value": "3103",
            "name": "西山区",
            "parent": "367"
          },
          {
            "value": "3104",
            "name": "东川区",
            "parent": "367"
          },
          {
            "value": "3105",
            "name": "安宁市",
            "parent": "367"
          },
          {
            "value": "3106",
            "name": "呈贡县",
            "parent": "367"
          },
          {
            "value": "3107",
            "name": "晋宁县",
            "parent": "367"
          },
          {
            "value": "3108",
            "name": "富民县",
            "parent": "367"
          },
          {
            "value": "3109",
            "name": "宜良县",
            "parent": "367"
          },
          {
            "value": "3110",
            "name": "嵩明县",
            "parent": "367"
          },
          {
            "value": "3111",
            "name": "石林县",
            "parent": "367"
          },
          {
            "value": "3112",
            "name": "禄劝",
            "parent": "367"
          },
          {
            "value": "3113",
            "name": "寻甸",
            "parent": "367"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "367"
          },
          {
            "value": "368",
            "name": "怒江",
            "parent": "30"
          },
          {
            "value": "3114",
            "name": "兰坪",
            "parent": "368"
          },
          {
            "value": "3115",
            "name": "泸水县",
            "parent": "368"
          },
          {
            "value": "3116",
            "name": "福贡县",
            "parent": "368"
          },
          {
            "value": "3117",
            "name": "贡山",
            "parent": "368"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "368"
          },
          {
            "value": "369",
            "name": "普洱",
            "parent": "30"
          },
          {
            "value": "3118",
            "name": "宁洱",
            "parent": "369"
          },
          {
            "value": "3119",
            "name": "思茅区",
            "parent": "369"
          },
          {
            "value": "3120",
            "name": "墨江",
            "parent": "369"
          },
          {
            "value": "3121",
            "name": "景东",
            "parent": "369"
          },
          {
            "value": "3122",
            "name": "景谷",
            "parent": "369"
          },
          {
            "value": "3123",
            "name": "镇沅",
            "parent": "369"
          },
          {
            "value": "3124",
            "name": "江城",
            "parent": "369"
          },
          {
            "value": "3125",
            "name": "孟连",
            "parent": "369"
          },
          {
            "value": "3126",
            "name": "澜沧",
            "parent": "369"
          },
          {
            "value": "3127",
            "name": "西盟",
            "parent": "369"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "369"
          },
          {
            "value": "370",
            "name": "丽江",
            "parent": "30"
          },
          {
            "value": "3128",
            "name": "古城区",
            "parent": "370"
          },
          {
            "value": "3129",
            "name": "宁蒗",
            "parent": "370"
          },
          {
            "value": "3130",
            "name": "玉龙",
            "parent": "370"
          },
          {
            "value": "3131",
            "name": "永胜县",
            "parent": "370"
          },
          {
            "value": "3132",
            "name": "华坪县",
            "parent": "370"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "370"
          },
          {
            "value": "371",
            "name": "保山",
            "parent": "30"
          },
          {
            "value": "3133",
            "name": "隆阳区",
            "parent": "371"
          },
          {
            "value": "3134",
            "name": "施甸县",
            "parent": "371"
          },
          {
            "value": "3135",
            "name": "腾冲县",
            "parent": "371"
          },
          {
            "value": "3136",
            "name": "龙陵县",
            "parent": "371"
          },
          {
            "value": "3137",
            "name": "昌宁县",
            "parent": "371"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "371"
          },
          {
            "value": "372",
            "name": "楚雄",
            "parent": "30"
          },
          {
            "value": "3138",
            "name": "楚雄市",
            "parent": "372"
          },
          {
            "value": "3139",
            "name": "双柏县",
            "parent": "372"
          },
          {
            "value": "3140",
            "name": "牟定县",
            "parent": "372"
          },
          {
            "value": "3141",
            "name": "南华县",
            "parent": "372"
          },
          {
            "value": "3142",
            "name": "姚安县",
            "parent": "372"
          },
          {
            "value": "3143",
            "name": "大姚县",
            "parent": "372"
          },
          {
            "value": "3144",
            "name": "永仁县",
            "parent": "372"
          },
          {
            "value": "3145",
            "name": "元谋县",
            "parent": "372"
          },
          {
            "value": "3146",
            "name": "武定县",
            "parent": "372"
          },
          {
            "value": "3147",
            "name": "禄丰县",
            "parent": "372"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "372"
          },
          {
            "value": "373",
            "name": "大理",
            "parent": "30"
          },
          {
            "value": "3148",
            "name": "大理市",
            "parent": "373"
          },
          {
            "value": "3149",
            "name": "祥云县",
            "parent": "373"
          },
          {
            "value": "3150",
            "name": "宾川县",
            "parent": "373"
          },
          {
            "value": "3151",
            "name": "弥渡县",
            "parent": "373"
          },
          {
            "value": "3152",
            "name": "永平县",
            "parent": "373"
          },
          {
            "value": "3153",
            "name": "云龙县",
            "parent": "373"
          },
          {
            "value": "3154",
            "name": "洱源县",
            "parent": "373"
          },
          {
            "value": "3155",
            "name": "剑川县",
            "parent": "373"
          },
          {
            "value": "3156",
            "name": "鹤庆县",
            "parent": "373"
          },
          {
            "value": "3157",
            "name": "漾濞",
            "parent": "373"
          },
          {
            "value": "3158",
            "name": "南涧",
            "parent": "373"
          },
          {
            "value": "3159",
            "name": "巍山",
            "parent": "373"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "373"
          },
          {
            "value": "374",
            "name": "德宏",
            "parent": "30"
          },
          {
            "value": "3160",
            "name": "潞西市",
            "parent": "374"
          },
          {
            "value": "3161",
            "name": "瑞丽市",
            "parent": "374"
          },
          {
            "value": "3162",
            "name": "梁河县",
            "parent": "374"
          },
          {
            "value": "3163",
            "name": "盈江县",
            "parent": "374"
          },
          {
            "value": "3164",
            "name": "陇川县",
            "parent": "374"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "374"
          },
          {
            "value": "375",
            "name": "迪庆",
            "parent": "30"
          },
          {
            "value": "3165",
            "name": "香格里拉县",
            "parent": "375"
          },
          {
            "value": "3166",
            "name": "德钦县",
            "parent": "375"
          },
          {
            "value": "3167",
            "name": "维西",
            "parent": "375"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "375"
          },
          {
            "value": "376",
            "name": "红河",
            "parent": "30"
          },
          {
            "value": "3168",
            "name": "泸西县",
            "parent": "376"
          },
          {
            "value": "3169",
            "name": "蒙自县",
            "parent": "376"
          },
          {
            "value": "3170",
            "name": "个旧市",
            "parent": "376"
          },
          {
            "value": "3171",
            "name": "开远市",
            "parent": "376"
          },
          {
            "value": "3172",
            "name": "绿春县",
            "parent": "376"
          },
          {
            "value": "3173",
            "name": "建水县",
            "parent": "376"
          },
          {
            "value": "3174",
            "name": "石屏县",
            "parent": "376"
          },
          {
            "value": "3175",
            "name": "弥勒县",
            "parent": "376"
          },
          {
            "value": "3176",
            "name": "元阳县",
            "parent": "376"
          },
          {
            "value": "3177",
            "name": "红河县",
            "parent": "376"
          },
          {
            "value": "3178",
            "name": "金平",
            "parent": "376"
          },
          {
            "value": "3179",
            "name": "河口",
            "parent": "376"
          },
          {
            "value": "3180",
            "name": "屏边",
            "parent": "376"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "376"
          },
          {
            "value": "377",
            "name": "临沧",
            "parent": "30"
          },
          {
            "value": "3181",
            "name": "临翔区",
            "parent": "377"
          },
          {
            "value": "3182",
            "name": "凤庆县",
            "parent": "377"
          },
          {
            "value": "3183",
            "name": "云县",
            "parent": "377"
          },
          {
            "value": "3184",
            "name": "永德县",
            "parent": "377"
          },
          {
            "value": "3185",
            "name": "镇康县",
            "parent": "377"
          },
          {
            "value": "3186",
            "name": "双江",
            "parent": "377"
          },
          {
            "value": "3187",
            "name": "耿马",
            "parent": "377"
          },
          {
            "value": "3188",
            "name": "沧源",
            "parent": "377"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "377"
          },
          {
            "value": "378",
            "name": "曲靖",
            "parent": "30"
          },
          {
            "value": "3189",
            "name": "麒麟区",
            "parent": "378"
          },
          {
            "value": "3190",
            "name": "宣威市",
            "parent": "378"
          },
          {
            "value": "3191",
            "name": "马龙县",
            "parent": "378"
          },
          {
            "value": "3192",
            "name": "陆良县",
            "parent": "378"
          },
          {
            "value": "3193",
            "name": "师宗县",
            "parent": "378"
          },
          {
            "value": "3194",
            "name": "罗平县",
            "parent": "378"
          },
          {
            "value": "3195",
            "name": "富源县",
            "parent": "378"
          },
          {
            "value": "3196",
            "name": "会泽县",
            "parent": "378"
          },
          {
            "value": "3197",
            "name": "沾益县",
            "parent": "378"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "378"
          },
          {
            "value": "379",
            "name": "文山",
            "parent": "30"
          },
          {
            "value": "3198",
            "name": "文山县",
            "parent": "379"
          },
          {
            "value": "3199",
            "name": "砚山县",
            "parent": "379"
          },
          {
            "value": "3200",
            "name": "西畴县",
            "parent": "379"
          },
          {
            "value": "3201",
            "name": "麻栗坡县",
            "parent": "379"
          },
          {
            "value": "3202",
            "name": "马关县",
            "parent": "379"
          },
          {
            "value": "3203",
            "name": "丘北县",
            "parent": "379"
          },
          {
            "value": "3204",
            "name": "广南县",
            "parent": "379"
          },
          {
            "value": "3205",
            "name": "富宁县",
            "parent": "379"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "379"
          },
          {
            "value": "380",
            "name": "西双版纳",
            "parent": "30"
          },
          {
            "value": "3206",
            "name": "景洪市",
            "parent": "380"
          },
          {
            "value": "3207",
            "name": "勐海县",
            "parent": "380"
          },
          {
            "value": "3208",
            "name": "勐腊县",
            "parent": "380"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "380"
          },
          {
            "value": "381",
            "name": "玉溪",
            "parent": "30"
          },
          {
            "value": "3209",
            "name": "红塔区",
            "parent": "381"
          },
          {
            "value": "3210",
            "name": "江川县",
            "parent": "381"
          },
          {
            "value": "3211",
            "name": "澄江县",
            "parent": "381"
          },
          {
            "value": "3212",
            "name": "通海县",
            "parent": "381"
          },
          {
            "value": "3213",
            "name": "华宁县",
            "parent": "381"
          },
          {
            "value": "3214",
            "name": "易门县",
            "parent": "381"
          },
          {
            "value": "3215",
            "name": "峨山",
            "parent": "381"
          },
          {
            "value": "3216",
            "name": "新平",
            "parent": "381"
          },
          {
            "value": "3217",
            "name": "元江",
            "parent": "381"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "381"
          },
          {
            "value": "382",
            "name": "昭通",
            "parent": "30"
          },
          {
            "value": "3218",
            "name": "昭阳区",
            "parent": "382"
          },
          {
            "value": "3219",
            "name": "鲁甸县",
            "parent": "382"
          },
          {
            "value": "3220",
            "name": "巧家县",
            "parent": "382"
          },
          {
            "value": "3221",
            "name": "盐津县",
            "parent": "382"
          },
          {
            "value": "3222",
            "name": "大关县",
            "parent": "382"
          },
          {
            "value": "3223",
            "name": "永善县",
            "parent": "382"
          },
          {
            "value": "3224",
            "name": "绥江县",
            "parent": "382"
          },
          {
            "value": "3225",
            "name": "镇雄县",
            "parent": "382"
          },
          {
            "value": "3226",
            "name": "彝良县",
            "parent": "382"
          },
          {
            "value": "3227",
            "name": "威信县",
            "parent": "382"
          },
          {
            "value": "3228",
            "name": "水富县",
            "parent": "382"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "382"
          },
          {
            "value": "31",
            "name": "浙江",
            "parent": 0
          },
          {
            "value": "383",
            "name": "杭州",
            "parent": "31"
          },
          {
            "value": "3229",
            "name": "西湖区",
            "parent": "383"
          },
          {
            "value": "3230",
            "name": "上城区",
            "parent": "383"
          },
          {
            "value": "3231",
            "name": "下城区",
            "parent": "383"
          },
          {
            "value": "3232",
            "name": "拱墅区",
            "parent": "383"
          },
          {
            "value": "3233",
            "name": "滨江区",
            "parent": "383"
          },
          {
            "value": "3234",
            "name": "江干区",
            "parent": "383"
          },
          {
            "value": "3235",
            "name": "萧山区",
            "parent": "383"
          },
          {
            "value": "3236",
            "name": "余杭区",
            "parent": "383"
          },
          {
            "value": "3237",
            "name": "市郊",
            "parent": "383"
          },
          {
            "value": "3238",
            "name": "建德市",
            "parent": "383"
          },
          {
            "value": "3239",
            "name": "富阳市",
            "parent": "383"
          },
          {
            "value": "3240",
            "name": "临安市",
            "parent": "383"
          },
          {
            "value": "3241",
            "name": "桐庐县",
            "parent": "383"
          },
          {
            "value": "3242",
            "name": "淳安县",
            "parent": "383"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "383"
          },
          {
            "value": "384",
            "name": "湖州",
            "parent": "31"
          },
          {
            "value": "3243",
            "name": "吴兴区",
            "parent": "384"
          },
          {
            "value": "3244",
            "name": "南浔区",
            "parent": "384"
          },
          {
            "value": "3245",
            "name": "德清县",
            "parent": "384"
          },
          {
            "value": "3246",
            "name": "长兴县",
            "parent": "384"
          },
          {
            "value": "3247",
            "name": "安吉县",
            "parent": "384"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "384"
          },
          {
            "value": "385",
            "name": "嘉兴",
            "parent": "31"
          },
          {
            "value": "3248",
            "name": "南湖区",
            "parent": "385"
          },
          {
            "value": "3249",
            "name": "秀洲区",
            "parent": "385"
          },
          {
            "value": "3250",
            "name": "海宁市",
            "parent": "385"
          },
          {
            "value": "3251",
            "name": "嘉善县",
            "parent": "385"
          },
          {
            "value": "3252",
            "name": "平湖市",
            "parent": "385"
          },
          {
            "value": "3253",
            "name": "桐乡市",
            "parent": "385"
          },
          {
            "value": "3254",
            "name": "海盐县",
            "parent": "385"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "385"
          },
          {
            "value": "386",
            "name": "金华",
            "parent": "31"
          },
          {
            "value": "3255",
            "name": "婺城区",
            "parent": "386"
          },
          {
            "value": "3256",
            "name": "金东区",
            "parent": "386"
          },
          {
            "value": "3257",
            "name": "兰溪市",
            "parent": "386"
          },
          {
            "value": "3258",
            "name": "市区",
            "parent": "386"
          },
          {
            "value": "3259",
            "name": "佛堂镇",
            "parent": "386"
          },
          {
            "value": "3260",
            "name": "上溪镇",
            "parent": "386"
          },
          {
            "value": "3261",
            "name": "义亭镇",
            "parent": "386"
          },
          {
            "value": "3262",
            "name": "大陈镇",
            "parent": "386"
          },
          {
            "value": "3263",
            "name": "苏溪镇",
            "parent": "386"
          },
          {
            "value": "3264",
            "name": "赤岸镇",
            "parent": "386"
          },
          {
            "value": "3265",
            "name": "东阳市",
            "parent": "386"
          },
          {
            "value": "3266",
            "name": "永康市",
            "parent": "386"
          },
          {
            "value": "3267",
            "name": "武义县",
            "parent": "386"
          },
          {
            "value": "3268",
            "name": "浦江县",
            "parent": "386"
          },
          {
            "value": "3269",
            "name": "磐安县",
            "parent": "386"
          },
          {
            "value": "3410",
            "name": "义乌市",
            "parent": "386"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "386"
          },
          {
            "value": "387",
            "name": "丽水",
            "parent": "31"
          },
          {
            "value": "3270",
            "name": "莲都区",
            "parent": "387"
          },
          {
            "value": "3271",
            "name": "龙泉市",
            "parent": "387"
          },
          {
            "value": "3272",
            "name": "青田县",
            "parent": "387"
          },
          {
            "value": "3273",
            "name": "缙云县",
            "parent": "387"
          },
          {
            "value": "3274",
            "name": "遂昌县",
            "parent": "387"
          },
          {
            "value": "3275",
            "name": "松阳县",
            "parent": "387"
          },
          {
            "value": "3276",
            "name": "云和县",
            "parent": "387"
          },
          {
            "value": "3277",
            "name": "庆元县",
            "parent": "387"
          },
          {
            "value": "3278",
            "name": "景宁",
            "parent": "387"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "387"
          },
          {
            "value": "388",
            "name": "宁波",
            "parent": "31"
          },
          {
            "value": "3279",
            "name": "海曙区",
            "parent": "388"
          },
          {
            "value": "3280",
            "name": "江东区",
            "parent": "388"
          },
          {
            "value": "3281",
            "name": "江北区",
            "parent": "388"
          },
          {
            "value": "3282",
            "name": "镇海区",
            "parent": "388"
          },
          {
            "value": "3283",
            "name": "北仑区",
            "parent": "388"
          },
          {
            "value": "3284",
            "name": "鄞州区",
            "parent": "388"
          },
          {
            "value": "3285",
            "name": "余姚市",
            "parent": "388"
          },
          {
            "value": "3286",
            "name": "慈溪市",
            "parent": "388"
          },
          {
            "value": "3287",
            "name": "奉化市",
            "parent": "388"
          },
          {
            "value": "3288",
            "name": "象山县",
            "parent": "388"
          },
          {
            "value": "3289",
            "name": "宁海县",
            "parent": "388"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "388"
          },
          {
            "value": "389",
            "name": "绍兴",
            "parent": "31"
          },
          {
            "value": "3290",
            "name": "越城区",
            "parent": "389"
          },
          {
            "value": "3291",
            "name": "上虞市",
            "parent": "389"
          },
          {
            "value": "3292",
            "name": "嵊州市",
            "parent": "389"
          },
          {
            "value": "3293",
            "name": "绍兴县",
            "parent": "389"
          },
          {
            "value": "3294",
            "name": "新昌县",
            "parent": "389"
          },
          {
            "value": "3295",
            "name": "诸暨市",
            "parent": "389"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "389"
          },
          {
            "value": "390",
            "name": "台州",
            "parent": "31"
          },
          {
            "value": "3296",
            "name": "椒江区",
            "parent": "390"
          },
          {
            "value": "3297",
            "name": "黄岩区",
            "parent": "390"
          },
          {
            "value": "3298",
            "name": "路桥区",
            "parent": "390"
          },
          {
            "value": "3299",
            "name": "温岭市",
            "parent": "390"
          },
          {
            "value": "3300",
            "name": "临海市",
            "parent": "390"
          },
          {
            "value": "3301",
            "name": "玉环县",
            "parent": "390"
          },
          {
            "value": "3302",
            "name": "三门县",
            "parent": "390"
          },
          {
            "value": "3303",
            "name": "天台县",
            "parent": "390"
          },
          {
            "value": "3304",
            "name": "仙居县",
            "parent": "390"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "390"
          },
          {
            "value": "391",
            "name": "温州",
            "parent": "31"
          },
          {
            "value": "3305",
            "name": "鹿城区",
            "parent": "391"
          },
          {
            "value": "3306",
            "name": "龙湾区",
            "parent": "391"
          },
          {
            "value": "3307",
            "name": "瓯海区",
            "parent": "391"
          },
          {
            "value": "3308",
            "name": "瑞安市",
            "parent": "391"
          },
          {
            "value": "3309",
            "name": "乐清市",
            "parent": "391"
          },
          {
            "value": "3310",
            "name": "洞头县",
            "parent": "391"
          },
          {
            "value": "3311",
            "name": "永嘉县",
            "parent": "391"
          },
          {
            "value": "3312",
            "name": "平阳县",
            "parent": "391"
          },
          {
            "value": "3313",
            "name": "苍南县",
            "parent": "391"
          },
          {
            "value": "3314",
            "name": "文成县",
            "parent": "391"
          },
          {
            "value": "3315",
            "name": "泰顺县",
            "parent": "391"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "391"
          },
          {
            "value": "392",
            "name": "舟山",
            "parent": "31"
          },
          {
            "value": "3316",
            "name": "定海区",
            "parent": "392"
          },
          {
            "value": "3317",
            "name": "普陀区",
            "parent": "392"
          },
          {
            "value": "3318",
            "name": "岱山县",
            "parent": "392"
          },
          {
            "value": "3319",
            "name": "嵊泗县",
            "parent": "392"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "392"
          },
          {
            "value": "393",
            "name": "衢州",
            "parent": "31"
          },
          {
            "value": "3320",
            "name": "衢州市",
            "parent": "393"
          },
          {
            "value": "3321",
            "name": "江山市",
            "parent": "393"
          },
          {
            "value": "3322",
            "name": "常山县",
            "parent": "393"
          },
          {
            "value": "3323",
            "name": "开化县",
            "parent": "393"
          },
          {
            "value": "3324",
            "name": "龙游县",
            "parent": "393"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "393"
          },
          {
            "value": "32",
            "name": "重庆",
            "parent": 0
          },
          {
            "value": "394",
            "name": "重庆",
            "parent": "32"
          },
          {
            "value": "3325",
            "name": "合川区",
            "parent": "394"
          },
          {
            "value": "3326",
            "name": "江津区",
            "parent": "394"
          },
          {
            "value": "3327",
            "name": "南川区",
            "parent": "394"
          },
          {
            "value": "3328",
            "name": "永川区",
            "parent": "394"
          },
          {
            "value": "3329",
            "name": "南岸区",
            "parent": "394"
          },
          {
            "value": "3330",
            "name": "渝北区",
            "parent": "394"
          },
          {
            "value": "3331",
            "name": "万盛区",
            "parent": "394"
          },
          {
            "value": "3332",
            "name": "大渡口区",
            "parent": "394"
          },
          {
            "value": "3333",
            "name": "万州区",
            "parent": "394"
          },
          {
            "value": "3334",
            "name": "北碚区",
            "parent": "394"
          },
          {
            "value": "3335",
            "name": "沙坪坝区",
            "parent": "394"
          },
          {
            "value": "3336",
            "name": "巴南区",
            "parent": "394"
          },
          {
            "value": "3337",
            "name": "涪陵区",
            "parent": "394"
          },
          {
            "value": "3338",
            "name": "江北区",
            "parent": "394"
          },
          {
            "value": "3339",
            "name": "九龙坡区",
            "parent": "394"
          },
          {
            "value": "3340",
            "name": "渝中区",
            "parent": "394"
          },
          {
            "value": "3341",
            "name": "黔江开发区",
            "parent": "394"
          },
          {
            "value": "3342",
            "name": "长寿区",
            "parent": "394"
          },
          {
            "value": "3343",
            "name": "双桥区",
            "parent": "394"
          },
          {
            "value": "3344",
            "name": "綦江县",
            "parent": "394"
          },
          {
            "value": "3345",
            "name": "潼南县",
            "parent": "394"
          },
          {
            "value": "3346",
            "name": "铜梁县",
            "parent": "394"
          },
          {
            "value": "3347",
            "name": "大足县",
            "parent": "394"
          },
          {
            "value": "3348",
            "name": "荣昌县",
            "parent": "394"
          },
          {
            "value": "3349",
            "name": "璧山县",
            "parent": "394"
          },
          {
            "value": "3350",
            "name": "垫江县",
            "parent": "394"
          },
          {
            "value": "3351",
            "name": "武隆县",
            "parent": "394"
          },
          {
            "value": "3352",
            "name": "丰都县",
            "parent": "394"
          },
          {
            "value": "3353",
            "name": "城口县",
            "parent": "394"
          },
          {
            "value": "3354",
            "name": "梁平县",
            "parent": "394"
          },
          {
            "value": "3355",
            "name": "开县",
            "parent": "394"
          },
          {
            "value": "3356",
            "name": "巫溪县",
            "parent": "394"
          },
          {
            "value": "3357",
            "name": "巫山县",
            "parent": "394"
          },
          {
            "value": "3358",
            "name": "奉节县",
            "parent": "394"
          },
          {
            "value": "3359",
            "name": "云阳县",
            "parent": "394"
          },
          {
            "value": "3360",
            "name": "忠县",
            "parent": "394"
          },
          {
            "value": "3361",
            "name": "石柱",
            "parent": "394"
          },
          {
            "value": "3362",
            "name": "彭水",
            "parent": "394"
          },
          {
            "value": "3363",
            "name": "酉阳",
            "parent": "394"
          },
          {
            "value": "3364",
            "name": "秀山",
            "parent": "394"
          },
          {
            "value": -1,
            "name": "其它地区",
            "parent": "394"
          }
        ],
        addressName:"",
        addressValue: [],
        addressPre:[]
      }
    },
    computed: {
      /*遍历*/
      /*
     addressNow: function () {
       var that = this;
       var addressNos = [];
       console.time("ctime")
       for (var i = 0; i < that.addressPre.length; i++) {
         let prvince = {};
         prvince.value = that.addressPre[i][0];
         prvince.name = that.addressPre[i][1];
         prvince.parent = 0;
         addressNos.push(prvince);
         for(var m = 0;m<that.addressPre[i][2].length;m++){
           let city = {};
           city.value = that.addressPre[i][2][m][0];
           city.name = that.addressPre[i][2][m][1];
           city.parent = that.addressPre[i][0];
           addressNos.push(city);
           for(var n = 0;n<that.addressPre[i][2][m][2].length;n++) {
             let desc = {};
             desc.value = that.addressPre[i][2][m][2][n][0];
             desc.name = that.addressPre[i][2][m][2][n][1];
             desc.parent = that.addressPre[i][2][m][0];
             addressNos.push(desc);
           }
         }
       }
       console.timeEnd("ctime");
       return addressNos;
     }
     */
    }
  }
</script>
<style scoped>
  .adressBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    max-width: 640px;
    background-color: rgba(251, 250, 250, 0.93);
    animation: g-pop-show-animation 0.5s;
  }

  .addressTitle {
    width: 100%;
    height: 44px;
    text-align: right;
    border-bottom: 1px solid rgba(153, 153, 153, 0.38);
    background-color: #FFFFFF;
  }

  .addressTitle span {
    font-size: 16px;
    background-color: rgba(255, 74, 125, 0.7);
    color: #FFF;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 9px;
    margin-right: 10px;
  }

  .g-pop {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    max-width: 640px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    transition: all 1s;
  }
  @keyframes g-pop-show-animation {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

</style>
