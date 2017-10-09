define(function (require, exports, module) {
    var $ = require("$"),
        tools = require("../../../c/js/toolsSocket");
    require("../../../c/js/jquery.pager");
    require('../../../c/js/registerHelper');
    require("../../../c/static/h-ui/js/H-ui");

    require("../../../c/js/bootstrap-datetimepicker");
    require("../../../c/js/bootstrap-datetimepicker.zh-CN");
    require("../../../c/js/jquery.provincesCity2");

    var queryBoxTmp = require("./queryBoxTmp.handlebars");
    var listTmp = require("./listTmp.handlebars");
    var picter = require("./picter.handlebars");
    var dayormonth = 2;
    var main = {
        init: function () {
            var self = this;
            $("#picter").html(picter());
            tools.displaynavbar();
            tools.customerParentInit();
            //导入搜索栏
            self.setDatetimepicker(1);
            //初始化地址选择控件
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
            self.data = {
                pageIndex: 1,
                pageSize: 10,
            }
            self.getList(self.data);
            self.initEvents();
        },

        setDatetimepicker: function () {
            var self = this;
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
            $("body").find("#starmonth_time").datetimepicker({
                format: "yyyy-mm",//选择日期后，文本框显示的日期格式
                language: "zh-CN",//汉化 
                startView: 3,
                minView: 3,
                autoclose: true,
                todayBtn: 1
            });
            $("body").find("#endmonth_time").datetimepicker({
                format: "yyyy-mm",//选择日期后，文本框显示的日期格式
                language: "zh-CN",//汉化 
                startView: 3,
                minView: 3,
                autoclose: true,
                todayBtn: 1
            });
            //时间框点击事件
            $("body").on("click", "#startTime", function () {
                $("body").find("#startTime").datetimepicker("show");
                console.log(dayormonth)
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
                console.log($(".startTime").val().length)
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    dayormonth: dayormonth,
                    _startTime: $(".startTime").val().length > 0 ? $(".startTime").val() + "" + "" : "",
                    _endTime: $(".endTime").val().length > 0 ? $(".endTime").val() + "" + "" : ""
                    // borrowerName:$("#searchText").val().trim()
                }
                self.getList(self.data);
            });
            $("body").find('.endTime').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log("changeDate")
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    dayormonth: dayormonth,
                    _startTime: $(".startTime").val().length > 0 ? $(".startTime").val() + "" + "" : "",
                    _endTime: $(".endTime").val().length > 0 ? $(".endTime").val() + "" + "" : ""
                    // borrowerName:$("#searchText").val().trim()
                }
                self.getList(self.data);
            });
            //
            $("body").on("click", "#starmonth_time", function () {
                $("body").find("#starmonth_time").datetimepicker("show");
            });
            $("body").on("click", "#endmonth_time", function () {
                $("body").find("#endmonth_time").datetimepicker("show");
            });
            $("body").find('.starmonth_time').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log("changeDate")
                $('.endmonth_time').datetimepicker('setStartDate', $('.starmonth_time').val() - 1);
                if ($.trim($(".endmonth_time").val()).length <= 0) {
                    $(".endmonth_time").val($('.starmonth_time').val());
                }
                console.log($(".starmonth_time").val().length)
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    dayormonth: dayormonth,
                    _startTime: $(".starmonth_time").val().length > 0 ? $(".starmonth_time").val() + "" + "" : "",
                    _endTime: $(".endmonth_time").val().length > 0 ? $(".endmonth_time").val() + "" + "" : ""
                    // borrowerName:$("#searchText").val().trim()
                }
                self.getList(self.data);
            });
            $("body").find('.endmonth_time').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log("changeDate")
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    dayormonth: dayormonth,
                    _startTime: $(".starmonth_time").val().length > 0 ? $(".starmonth_time").val() + "" + "" : "",
                    _endTime: $(".endmonth_time").val().length > 0 ? $(".endmonth_time").val() + "" + "" : ""
                    // borrowerName:$("#searchText").val().trim()
                }
                self.getList(self.data);
            });
        },
        initEvents: function () {
            var self = this;
            $('body').on('click', '#closeBtn', function (e) {
                self.getList(self.data);
            });
            $("body").on("click", ".close", function () {
                /*window.location.reload();*/
                self.getList(self.data);
            });
            //详情按钮点击事件
            $("body").on("click", ".detailBtn", function () {
                console.log("click")
                setTimeout(function () {
                    console.log("已刷新");
                    //获取初始化列表
                    self.getList(self.data);
                }, 3000);
            });
            $(document).on("change", "#dayOrMonth", function () {
                var daymonstatu = $("#dayOrMonth").val()
                if (daymonstatu == 1) {
                    console.log(55)
                    dayormonth = 1
                    $("body").find("#daypicker").addClass("active")
                    $("body").find("#monthpicker").removeClass("active")
                } else {
                    dayormonth = 2
                    $("body").find("#monthpicker").addClass("active")
                    $("body").find("#daypicker").removeClass("active")
                }
            });
            //地区选择改变事件
            $("#city,#province").on("change", function () {
                self.province = $("#province").val();
                self.city = $("#city").val();
                //.log(province+","+city);
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "01:01:01:001" : "",
                    _endTime: $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "23:59:59:999" : "",
                    status: self.status,
                    province: self.province,
                    city: self.city,
                    borrowerName: $("#searchText").val().trim()
                }
                self.getList(self.data);
                //获取门店名称列表
                var data = {
                    province: self.province,
                    city: self.city
                }
                //.log(data);
                self.getStoreNameList(data);
            });
            //门店名称选择事件
            $("#storeNameSelect").on("change", function () {
                self.storeName = $(this).val();

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
            //状态按钮点击事件
            $("#statusSelect input[type=button]").on("click", function () {
                self.status = $(this).data("status");
                $(this).removeClass("btn-link").addClass("primary");
                $(this).siblings(".btn").removeClass("primary").addClass("btn-link");

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
            //搜索按钮点击事件（根据客户姓名搜索）
            $("#searchIcon").on("click", function () {
                self.searchText = $("#searchText").val();
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "01:01:01:001" : "",
                    _endTime: $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "23:59:59:999" : "",
                    status: self.status,
                    province: self.province,
                    city: self.city,
                    companyName: self.storeName,
                    borrowerName: self.searchText.trim()
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
                url: '/headShop/clientRecharge.json',
                success: function (data) {
                    //.log(data);
                    if (data.code == 0) {
                        console.log(data)
                        var list = data.list;
                        var countval = data.obj;
                        self.list.html(listTmp(list));

                        self.lists.html(queryBoxTmp(countval));

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
            $("#pager").pager({
                pagenumber: self.data.pageIndex,
                pagecount: Math.ceil(totalcount / self.data.pageSize),
                totalcount: totalcount,
                //回调函数
                buttonClickCallback: function (pageclickednumber) {
                    self.data.pageIndex = pageclickednumber;
                    self.getList(self.data);
                }
            });
        },
    };
    main.init();
});