define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../../c/js/toolsSocket");
    require("../../../c/js/jquery.pager");
    require('../../../c/js/registerHelper');
    require("../../../c/static/h-ui/js/H-ui");

    require("../../../c/js/jquery.provincesCity2");

    var queryBoxTmp = require("./queryBoxTmp.handlebars");
    var listTmp = require("./listTmp.handlebars");

    var main = {
        init:function(){
            var self = this;
            tools.displaynavbar();
            tools.customerParentInit();
            $("#queryBoxID").html(queryBoxTmp());
            //地区初始化
            $("#address").ProvinceCity2();
            var province = $("#province").val();
            var city = $("#city").val();
            var data = {
                province:province,
                city:city
            }
            //.log(data);
            self.getStoreNameList(data);
            self.body = $(".page");
            self.list = $("#tableBox");
            self.data = {
                pageIndex:1,
                pageSize:10,
            }
            self.getList(self.data);
            self.initEvents();
        },
        initEvents:function () {
            var self = this;

            $("#city,#province").on("change",function () {
                self.province = $("#province").val();
                self.city = $("#city").val();
                self.data = {
                    pageIndex:1,
                    pageSize:10,
                    province:self.province,
                    city:self.city,
                    companyId:self.storeName,
                    realName:$("#realName").val().trim(),
                    mobile:$("#mobile").val().trim()
                }
                self.getList(self.data);
                //获取门店名称列表
                var data = {
                    province:province,
                    city:city
                }
                self.getStoreNameList(data);
            });
            //门店名称选择事件
            $("#storeNameSelect").on("change",function () {
                self.storeName = $(this).val();
                self.data = {
                    pageIndex:1,
                    pageSize:10,
                    province:self.province,
                    city:self.city,
                    companyId:self.storeName,
                    realName:$("#realName").val().trim(),
                    mobile:$("#mobile").val().trim()
                }
                console.log("门店名称");
                self.getList(self.data);
                //.log(storeName);
            });
            //搜索按钮点击事件
            $(".searchIcon").on("click",function () {
                var searchText = $(this).parent().find("input").val();
                console.log("searchText:"+searchText);
                if($(this).data("searchtype")=="realName"){
                    self.data = {
                        pageIndex:1,
                        pageSize:10,
                        province:self.province,
                        city:self.city,
                        companyId:self.storeName,
                        realName:searchText.trim(),
                        mobile:$("#mobile").val().trim()
                    }
                }else{
                    self.data = {
                        pageIndex:1,
                        pageSize:10,
                        province:self.province,
                        city:self.city,
                        companyId:self.storeName,
                        realName:$("#realName").val().trim(),
                        mobile:searchText.trim()
                    }
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
                url: '/headShop/subShop/user.json',
                success: function(data){
                    self.list.empty();
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