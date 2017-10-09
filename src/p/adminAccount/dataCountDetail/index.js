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
    var picter = require("./picter.handlebars");
    var source = '';
    var queryDateType = 1;
    var companyName = '';
    var starttime = '';
    var endtime = '';
    var dd = new Date();
    var seperator1 = "-";
    dd.setDate(dd.getDate() - 60);
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0  
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0  
    var currentdate = y + seperator1 + m + seperator1 + d
    console.log(currentdate)
    var bb = new Date();
    var seperator1 = "-";
    bb.setDate(bb.getDate());
    var y1 = bb.getFullYear();
    var m1 = (bb.getMonth() + 1) < 10 ? "0" + (bb.getMonth() + 1) : (bb.getMonth() + 1);//获取当前月份的日期，不足10补0  
    var d1 = bb.getDate() < 10 ? "0" + bb.getDate() : bb.getDate();//获取当前几号，不足10补0  
    var currentdate1 = y1 + seperator1 + m1 + seperator1 + d1
    var main = {
        init: function () {
            var self = this;

            //导入搜索栏
            $("#queryBoxID").html(queryBoxTmp());
            $("#picter").html(picter());
            self.setYear();
            //初始化地址选择控件
            // self.setDatetimepicker();

            $("#address").ProvinceCity2();

            //获取门店名称列表
            var province = $("#province").val();
            var city = $("#city").val();
            var data = {

            }
            //.log(data);
            // self.getStoreNameList(data);
            self.list = $("#tableBox");
            self.lists = $("#queryBoxID");

            // var starttime = currentdate;
            // var endtime = currentdate1;
            self.data = {
                pageIndex: 1,
                pageSize: 10,
                source: source,
                start: starttime ? starttime : currentdate,
                end: endtime ? endtime : currentdate1,
                companyName: companyName,
                queryDateType: queryDateType,
                companyId: tools.getUrlParam("companyId")
            }
            self.getList(self.data);
            self.initEvents();
            self.getStoreNameList(self.data);
            //excel导出
            $(document).on("click", "#deleveval", function () {
                var dstart=starttime ? starttime : currentdate;
                var dend=endtime ? endtime : currentdate1;
                var comId=tools.getUrlParam("companyId")
                $(this).attr("href", "/company/count/companyCountExport.json?" + "start=" + dstart + "&end=" + dend + "&queryDateType=" + queryDateType + "&companyName=" + companyName + "&source=" + source+"&companyId="+comId)
            });

            //门店名称选择事件
            $("#storeNameSelect").on("change", function () {
                companyName = $(this).val();
                console.log(currentdate)
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    source: source,
                    start: starttime ? starttime : currentdate,
                    end: endtime ? endtime : currentdate1,
                    companyName: companyName,
                    queryDateType: queryDateType,
                    companyId: tools.getUrlParam("companyId")
                }
                self.getList(self.data);
            });

            // 以月查询数据 

            $("body").find("#starmonth_time").datetimepicker({
                format: "yyyy-mm",//选择日期后，文本框显示的日期格式
                language: "zh-CN",//汉化 
                startView: 3,
                minView: 3,
                autoclose: true,
                todayBtn: 1
            });
            $("body").find("#endmonth_time").datetimepicker({
                minViewMode: 2,
                format: "yyyy-mm",//选择日期后，文本框显示的日期格式
                language: "zh-CN",//汉化 
                startView: 3,
                minView: 3,
                autoclose: true,
                todayBtn: 1
            });
            $("body").on("click", "#starmonth_time", function () {
                $("body").find("#starmonth_time").datetimepicker("show");
            });
            $("body").on("click", "#endmonth_time", function () {
                $("body").find("#endmonth_time").datetimepicker("show");
            });
            $("body").find('.starmonth_time').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log($('.starmonth_time').val())
                $('.endmonth_time').datetimepicker('setStartDate', $('.starmonth_time').val() - 1);
                if ($.trim($(".endmonth_time").val()).length <= 0) {
                    $(".endmonth_time").val($('.starmonth_time').val());
                }
                starttime = $(".starmonth_time").val().length > 0 ? $(".starmonth_time").val() + "" + "" : ""
                endtime = $(".endmonth_time").val().length > 0 ? $(".endmonth_time").val() + "" + "" : ""
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    source: source,
                    start: starttime ? starttime : currentdate,
                    end: endtime ? endtime : currentdate1,
                    companyName: companyName,
                    queryDateType: queryDateType,
                    companyId: tools.getUrlParam("companyId")
                }
                self.getList(self.data);
            });
            $("body").find('.endmonth_time').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log("changeDate")
                starttime = $(".starmonth_time").val().length > 0 ? $(".starmonth_time").val() + " " + "" : ""
                endtime = $(".endmonth_time").val().length > 0 ? $(".endmonth_time").val() + " " + "" : ""
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    source: source,
                    start: starttime ? starttime : currentdate,
                    end: endtime ? endtime : currentdate1,
                    companyName: companyName,
                    queryDateType: queryDateType,
                    companyId: tools.getUrlParam("companyId")
                }
                self.getList(self.data);
            });

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
                starttime = $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "" : "",
                    endtime = $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "" : "",

                    self.data = {
                        pageIndex: 1,
                        pageSize: 10,
                        source: source,
                        start: starttime,
                        end: endtime,
                        companyName: companyName,
                        queryDateType: queryDateType,
                        companyId: tools.getUrlParam("companyId"),
                    }
                self.getList(self.data);
            });
            $("body").find('.endTime').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                starttime = $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "" : "",
                    endtime = $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "" : "",
                    self.data = {
                        pageIndex: 1,
                        pageSize: 10,
                        source: source,
                        start: starttime,
                        end: endtime,
                        companyName: companyName,
                        queryDateType: queryDateType,
                        companyId: tools.getUrlParam("companyId")
                    }
                self.getList(self.data);
            });

            $("#jiekou").on("change", function () {
                source = $(this).val();
                console.log(source)
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    source: source,
                    start: starttime ? starttime : currentdate,
                    end: endtime ? endtime : currentdate1,
                    companyName: companyName,
                    queryDateType: queryDateType,
                    companyId: tools.getUrlParam("companyId")
                }
                self.getList(self.data);
            });
            $(document).on("change", "#dayOrMonth", function () {
                var daymonstatu = $("#dayOrMonth").val()
                if (daymonstatu == 1) {
                    queryDateType = 2
                    $("body").find("#daypicker").addClass("active")
                    $("body").find("#monthpicker").removeClass("active")
                } else {
                    queryDateType = 1
                    $("body").find("#monthpicker").addClass("active")
                    $("body").find("#daypicker").removeClass("active")
                }
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
            // $("#storeNameSelect").on("change", function () {
            //     self.storeName = $(this).val();
            //     self.data = {
            //         pageIndex: 1,
            //         pageSize: 10,
            //         source: source,
            //         start: starttime,
            //         end: endtime,
            //         companyName: companyName,
            //         queryDateType: queryDateType,
            //         companyId: tools.getUrlParam("companyId")
            //     }
            //     self.getList(self.data);
            // });
            //年份选择事件
            $("#yearSelect").on("change", function () {
                self.year = $(this).val();
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    source: source,
                    start: starttime ? starttime : currentdate,
                    end: endtime ? endtime : currentdate1,
                    companyName: companyName,
                    queryDateType: queryDateType,
                    companyId: tools.getUrlParam("companyId")
                }
                self.getList(self.data);
            });
            //搜索按钮点击事件（根据客户姓名搜索）
            $("#searchIcon").on("click", function () {
                var searchText = $("#searchText").val();
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    source: source,
                    start: starttime ? starttime : currentdate,
                    end: endtime ? endtime : currentdate1,
                    companyName: companyName,
                    queryDateType: queryDateType,
                    companyId: tools.getUrlParam("companyId")
                }
                self.getList(self.data);
            });
        },
        getStoreNameList: function (data) {
            $.ajax({
                data: data,
                cache: false,
                type: "post",
                url: '/company/count/companyList.json',
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
                url: '/company/count/companyCount.json',
                success: function (data) {
                    //.log(data);
                    if (data.code == 0) {
                        var list = data
                        console.log(list)
                        self.list.html(listTmp(list));
                        self.lists.html(queryBoxTmp(list.obj.total));
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