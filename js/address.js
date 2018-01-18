new Vue({
    el:".container",
    data:{
        limitNum:3,
        currentIndex:0,
        shippingIndex:1,
        addressList:[]
    },
    mounted:function (){
        this.$nextTick(function () {
            this.getAddressList();
         });
    },
    filters:{

    },
    computed:{
        filerAddressList:function () {
            return this.addressList.slice(0,this.limitNum);//slice  截取后返回一个全新的数组
        }
    },
    methods:{
        getAddressList:function () {
            var _this=this;
            this.$http.get("data/address.json").then(function (res) {
                _this.addressList=res.data.result;
            })
        },
        loadMore:function () {
            this.limitNum=this.addressList.length
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (value, index) {
                if(addressId==value.addressId){
                    value.isDefault=true;
                }else{
                    value.isDefault=false;
                }
            })
        }
    }

});