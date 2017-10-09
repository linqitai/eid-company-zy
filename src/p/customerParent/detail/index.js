define(function (require, exports, module) {
    var $ = require("$"),
        tools = require("../../../c/js/toolsSocket.js");
    require("../../../c/js/jquery.pager");
    require('../../../c/js/registerHelper');
    require("../../../c/static/h-ui/js/H-ui");

    require("../../../c/js/bootstrap-datetimepicker");
    require("../../../c/js/bootstrap-datetimepicker.zh-CN");
    require("../../../c/js/jquery.provincesCity2");

    var queryBoxTmp = require("./queryBoxTmp.handlebars");
    var listTmp = require("./listTmp.handlebars");
    var companyId=tools.getUrlParam("companyId");
    var _start=tools.getUrlParam("start");
    var _end=tools.getUrlParam("end");
    var main = {
        init: function () {
            var self = this;
            tools.displaynavbar();
            tools.customerParentInit();
            //导入搜索栏
            $("#queryBoxID").html(queryBoxTmp());
            self.setYear();
            //初始化地址选择控件
            self.setDatetimepicker();
            $("#address").ProvinceCity2();

            //获取门店名称列表
            var province = $("#province").val();
            var city = $("#city").val();
            var data = {
                province: province,
                city: city
            }
            //.log(data);
            self.getStoreNameList(data);

            self.list = $("#tableBox");
             self.lists = $("#queryBoxID");
            var dd=new Date();
            var seperator1 = "-";
            dd.setDate(dd.getDate()-60);
            var y=dd.getFullYear();
            var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
            var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
            var currentdate = y + seperator1 + m + seperator1 + d
            console.log(currentdate)
             var bb=new Date();
            var seperator1 = "-";
            bb.setDate(bb.getDate());
            var y1=bb.getFullYear();
            var m1 = (bb.getMonth()+1)<10?"0"+(bb.getMonth()+1):(bb.getMonth()+1);//获取当前月份的日期，不足10补0  
            var d1 = bb.getDate()<10?"0"+bb.getDate():bb.getDate();//获取当前几号，不足10补0  
            var currentdate1 = y1 + seperator1 + m1 + seperator1 + d1
            console.log(currentdate1)
            self.data = {
                pageIndex: 1,
                pageSize: 10,
                start:_start?_start:currentdate,
                end:_end?_end:currentdate1,
                companyId: tools.getUrlParam("companyId"),
                queryDateType:tools.getUrlParam("queryDateType"),
                year: $("#yearSelect").val()
            }
            self.getList(self.data);

            self.initEvents();
        },

        setDatetimepicker: function () {
            // 以月查询数据 
            $("body").find("#startTime").datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm",
                startView: 2,
                minView: 2,
                autoclose: true,
                todayBtn: 1
            });
            $("body").find("#endTime").datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm",
                startView: 2,
                minView: 2,
                autoclose: true,
                todayBtn: 1
            });
            $("body").on("click", "#startTime", function () {
                console.log(1);
                $("body").find("#startTime").datetimepicker("show");
            });
            $("body").on("click", "#endTime", function () {
                $("body").find("#endTime").datetimepicker("show");
            });
            $("body").find('.startTime').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log("changeDate")
                $('.endTime').datetimepicker('setStartDate', $('.startTime').val());
                if ($.trim($(".endTime").val()).length <= 0) {
                    $(".endTime").val($('.startTime').val());
                }
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "01:01:01:001" : "",
                    _endTime: $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "23:59:59:999" : "",
                    status: self.status,
                    province: self.province,
                    city: self.city,
                    companyName: self.storeName,
                    borrowerName: $("#searchText").val().trim()
                }
                self.getList(self.data);
            });
            $("body").find('.endTime').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log("changeDate")
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "01:01:01:001" : "",
                    _endTime: $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "23:59:59:999" : "",
                    status: self.status,
                    province: self.province,
                    city: self.city,
                    companyName: self.storeName,
                    borrowerName: $("#searchText").val().trim()
                }
                self.getList(self.data);
            });

            ;

            // 以日查询数据 
            $("body").find("#startTime").datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm-dd",
                startView: 2,
                minView: 2,
                autoclose: true,
                todayBtn: 1
            });
            $("body").find("#endTime").datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm-dd",
                startView: 2,
                minView: 2,
                autoclose: true,
                todayBtn: 1
            });
            $("body").on("click", "#startTime", function () {
                $("body").find("#startTime").datetimepicker("show");
            });
            $("body").on("click", "#endTime", function () {
                $("body").find("#endTime").datetimepicker("show");
            });
            $("body").find('.startTime').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log("changeDate")
                $('.endTime').datetimepicker('setStartDate', $('.startTime').val());
                if ($.trim($(".endTime").val()).length <= 0) {
                    $(".endTime").val($('.startTime').val());
                }
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "01:01:01:001" : "",
                    _endTime: $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "23:59:59:999" : "",
                    status: self.status,
                    province: self.province,
                    city: self.city,
                    companyName: self.storeName,
                    borrowerName: $("#searchText").val().trim()
                }
                self.getList(self.data);
            });
            $("body").find('.endTime').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log("changeDate")
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "01:01:01:001" : "",
                    _endTime: $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "23:59:59:999" : "",
                    status: self.status,
                    province: self.province,
                    city: self.city,
                    companyName: self.storeName,
                    borrowerName: $("#searchText").val().trim()
                }
                self.getList(self.data);
            });
        },
        setYear: function () {
            var yearSelect = $("#yearSelect");
            var date = new Date();
            var currentYear = date.getFullYear();
            //.log(currentYear);
            for (var i = currentYear; i > currentYear - 7; i--) {
                yearSelect.append('<option value="' + i + '">' + i + '</option>')
            }
        },
        initEvents: function () {
            var self = this;

            $("#city,#province").on("change", function () {
                self.province = $("#province").val();
                self.city = $("#city").val();
                //.log(province+","+city);
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    province: self.province,
                    city: self.city,
                    year: $("#yearSelect").val()
                }
                self.getList(self.data);
                //获取门店名称列表
                var data = {
                    province: self.province,
                    city: self.city
                }
                console.log(data);
                self.getStoreNameList(data);
            });
            //门店名称选择事件
            $("#storeNameSelect").on("change", function () {
                self.storeName = $(this).val();
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    province: self.province,
                    city: self.city,
                    companyName: self.storeName,
                    year: self.year
                }
                self.getList(self.data);
            });
            //年份选择事件
            $("#yearSelect").on("change", function () {
                self.year = $(this).val();
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    province: self.province,
                    city: self.city,
                    companyName: self.storeName,
                    year: self.year
                }
                self.getList(self.data);
            });
            //搜索按钮点击事件（根据客户姓名搜索）
            $("#searchIcon").on("click", function () {
                var searchText = $("#searchText").val();
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    borrowerName: searchText.trim()
                }
                self.getList(self.data);
            });
        },
        getStoreNameList: function (data) {
            $.ajax({
                data: data,
                cache: false,
                type: "post",
                url: '/headShop/subShop/dropdown.json',
                success: function (data) {
                    //.log(data);
                    if (data.code == 0) {
                        var list = data.list;
                        $("#storeNameSelect").empty().append('<option value="">全部</option>')
                        for (var i = 0; i < list.length; i++) {
                            $("#storeNameSelect").append('<option value="' + list[i].companyName + '">' + list[i].companyName + '</option>')
                        }
                    } else {
                        tools.tusi(data.error);
                    }
                }
            });
        },
        getList: function (data) {
            var self = this;
            $.ajax({
                data: data,
                cache: false,
                type: "post",
                url: '/master/count/queryDetail.json',
                success: function (data) {
                    //.log(data);
                    if (data.code == 0) {
                        var list = data
                        console.log(list)
                        self.list.html(listTmp(list));
                        // self.lists.html(queryBoxTmp(list.obj.total));
                        self.pagerInit(data.count);
                    } else {
                        tools.tusi(data.error);
                    }
                }
            });
        },
        pagerInit: function (totalcount) {
            var self = this;
            $("#loading").hide();
            if (totalcount > 0) {
                $("#pager").show();
            } else {
                $("#pager").hide();
            }
            console.log(self.data.pageIndex),
            $("#pager").pager({
                pagenumber: self.data.pageIndex,
                pagecount: Math.ceil(totalcount / self.data.pageSize),
                totalcount: totalcount,
                //回调函数
                buttonClickCallback: function (pageclickednumber) {
                    console.log(4554)
                    console.log(pageclickednumber)
                    self.data.pageIndex = pageclickednumber;
                    self.getList(self.data);
                }
            });
        },
    };
    main.init();
});