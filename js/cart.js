var vm = new Vue({
    el: "#app",
    data: {
        totloManay: 0,
        productList: [],
        checkAllFlag: false,
        delFlag:false,
        curProduct:null
    },
    filters: {
        //定义局部过滤器
        formatManey: function (value) {
            return "￥" + value.toFixed(2);//两位小数
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.cartView();
        })
    },
    methods: {
        cartView: function () {
            var _this = this;
            //获取数据，post等  then 函数是个回调
            this.$http.get("data/cartData.json", {id: 123}).then(function (res) {
                _this.productList = res.data.result.list
            })
        },
        changmaney: function (prodact, way) {
            if (way > 0) {
                prodact.productQuantity++;
            } else {
                prodact.productQuantity--;
                if (prodact.productQuantity < 1) {
                    prodact.productQuantity = 1
                }
            }
            this.calcTotalPrice()
        },
        checkProduct: function (product) {
            if (typeof product.checked == "undefined") {/*判断变量的属性存在不存在 如果不存在就加上属性，并且设值，*/
                Vue.set(product, "checked", true);//通过Vue的全局注册，给product变量里面注册一个checked属性
                //this.$set(product,"checked",true);//局部注册
            } else {//当变量的属性存在之后再有点击就是取反操作了
                product.checked = !product.checked;
            }
            this.calcTotalPrice()
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;//checkAllFlag 全局变量
            var _this=this;
            this.productList.forEach(function (product, index) {
                if (typeof product.checked == "undefined") {/*判断变量的属性存在不存在 如果不存在就加上属性，并且设值，*/
                    Vue.set(product, "checked", _this.checkAllFlag);//通过Vue的全局注册，给product变量里面注册一个checked属性
                } else {//当变量的属性存在之后再有点击就是取反操作了
                    product.checked = _this.checkAllFlag;
                }
            })
            this.calcTotalPrice()
        },
        calcTotalPrice:function () {
            var _this=this;
            _this.totloManay=0;
            this.productList.forEach(function (product, index) {
                if(product.checked){
                    _this.totloManay +=product.productPrice * product.productQuantity
                }
            })
        },
        delConfirm:function (product) {
            this.delFlag=true;
            this.curProduct=product;
        },
        delProduct:function () {
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);//从当前下标元素删除一个
            this.delFlag=false;
            this.calcTotalPrice()
        }

    }
});
//全局过滤器
Vue.filter("maney", function (value, type) {
    return "￥" + value.toFixed(2) + type;//两位小数
});