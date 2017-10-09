define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../../c/js/toolsSocket");
    require("../../../c/js/jquery.pager");
    require('../../../c/js/registerHelper');
    require('../../../c/js/jquery.cookie');
    require("../../../c/static/h-ui/js/H-ui");

    //require("../../../c/js/provincesData");
    require("../../../c/js/jquery.provincesCity2");

    var queryBoxTmp = require("./queryBoxTmp.handlebars");
    var listTmp = require("./listTmp.handlebars");

    var main = {
        init:function(){
            var self = this;
            self.isVAgian = 0;
            tools.displaynavbar();
            tools.customerParentInit();
            //导入搜索栏
            $("#queryBoxID").html(queryBoxTmp());
            //初始化地址选择控件
            $("#address").ProvinceCity2();

            //获取门店名称列表
            var province = $("#province").val();
            var city = $("#city").val();
            var data = {
                province:province,
                city:city
            }

            self.getStoreNameList(data);

            self.list = $("#tableBox");
            self.data = {
                pageIndex:1,
                pageSize:10,
            }
            //获取初始化列表
            self.getList(self.data);

            self.initEvents();
        },
        initEvents:function () {
            var self = this;
            $('body').on('click','#closeBtn', function (e) {
                self.getList(self.data);
            });
            $("body").on("click",".close",function () {
                /*window.location.reload();*/
                self.getList(self.data);
            });
            //详情按钮点击事件
            $("body").on("click",".detailBtn",function () {
                console.log("click")
                setTimeout(function () {
                    console.log("已刷新");
                    //获取初始化列表
                    self.getList(self.data);
                },3000);
            });
            $("#city,#province").on("change",function () {
                console.log("--"+($("#searchText").val()).trim()+"--");
                var province = $("#province").val();
                var city = $("#city").val();
                //.log(province+","+city);
                self.data = {
                    pageIndex:1,
                    pageSize:10,
                    province:province,
                    city:city,
                    borrowerName:$("#searchText").val().trim()
                }
                self.getList(self.data);
                //获取门店名称列表
                var data = {
                    province:province,
                    city:city
                }
                //.log(data);
                self.getStoreNameList(data);
            });
            //门店名称选择事件
            $("#storeNameSelect").on("change",function () {
                self.companyId = $(this).val();
                self.data = {
                    pageIndex:1,
                    pageSize:10,
                    province:$("#province").val(),
                    city:$("#city").val(),
                    companyId:self.companyId,
                    borrowerName:$("#searchText").val().trim(),
                }
                self.getList(self.data);
            });
            //门店名称查询
            /*$("#storeNameSearchIcon").on("click",function () {
                var searchText = $("#storeNameText").val();
                //.log(searchText);
            });*/
            //搜索按钮点击事件（根据客户姓名搜索）
            $("#searchIcon").on("click",function () {
                console.log("you click me");
                self.searchText = $("#searchText").val();
                self.data = {
                    pageIndex:1,
                    pageSize:10,
                    province:$("#province").val(),
                    city:$("#city").val(),
                    companyId:self.companyId,
                    borrowerName:self.searchText.trim(),
                }
                self.getList(self.data);
            });
        },
        getStoreNameList:function (data) {
            $.ajax({
                data:data,
                cache: false,
                type: "post",
                url: '/headShop/subShop/dropdown.json',
                success: function(data){
                    //.log(data);
                    if(data.code==0){
                       var list = data.list;
                        $("#storeNameSelect").empty().append('<option value="">全部</option>')
                        for(var i=0;i<list.length;i++){
                            $("#storeNameSelect").append('<option value="'+list[i].companyId+'">'+list[i].companyName+'</option>')
                        }
                    }else{
                        tools.tusi(data.error);
                    }
                }
            });
        },
        getList:function (data) {
            var self = this;
            $.ajax({
                data:data,
                cache: false,
                type: "post",
                url: '/headShop/business/view.json',
                success: function(data){
                    //.log(data);
                    if(data.code==0){
                        var list = data.list;
                        self.list.html(listTmp(list));
                        self.pagerInit(data.count);
                    }else{
                        tools.tusi(data.error);
                    }
                }
            });
        },
        pagerInit:function(totalcount){
            var self = this;
            $("#loading").hide();
            if(totalcount>0){
                $("#pager").show();
            }else{
                $("#pager").hide();
            }
            $("#pager").pager({
                pagenumber: self.data.pageIndex,
                pagecount: Math.ceil(totalcount/self.data.pageSize),
                totalcount: totalcount,
                //回调函数
                buttonClickCallback: function(pageclickednumber) {
                    self.data.pageIndex = pageclickednumber;
                    self.getList(self.data);
                }
            });
        },
    };
    main.init();
});