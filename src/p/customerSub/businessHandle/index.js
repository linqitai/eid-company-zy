define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../../c/js/toolsSocket");
    require("../../../c/js/jquery.pager");
    require('../../../c/js/registerHelper');
    require("../../../c/static/h-ui/js/H-ui");

    var queryBoxTmp = require("./queryBoxTmp.handlebars");
    var listTmp = require("./listTmp.handlebars");

    var main = {
        init:function(){
            var self = this;
            tools.displaynavbar();
            tools.customerParentInit();
            //导入搜索栏
            $(".table").before(queryBoxTmp());
            self.list = $("table.table");
            self.data = {
                pageIndex:1,
                pageSize:10,
                companyName:"",
                borrowerName:""
            }
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
            //搜索按钮点击事件（根据客户姓名搜索）
            $("#searchIcon").on("click",function () {
                var searchText = $("#searchText").val();
                self.data = {
                    pageIndex:1,
                    pageSize:10,
                    borrowerName:searchText.trim()
                }
                console.log(self.data);
                self.getList(self.data);
            });
        },
        getList:function (data) {
            var self = this;
            $.ajax({
                data:data,
                cache: false,
                type: "post",
                url: '/subShop/business/view.json',
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