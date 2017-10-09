define(function (require, exports, module) {
    var $ = require("$"),
        tools = require("../../c/js/tools");
    require("../../c/js/jquery.pager");
    require('../../c/js/registerHelper');
    require("../../c/static/h-ui/js/H-ui");
    require("../../c/css/bootstrap.css");
    require("../../c/css/bootstrap-datetimepicker.css");
    require("../../c/js/bootstrap-datetimepicker");
    require("../../c/js/bootstrap-datetimepicker.zh-CN");

    var queryDateType = 1;
    var queryval = '';

    var dataCountMH = require('../../p/adminAccount/dataCountH/dataCountMH.handlebars');
    var dataCountTableH = require('../../p/adminAccount/dataCountH/dataCountTableH.handlebars');
    var picter = require('../../p/adminAccount/dataCountH/picter.handlebars');
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
    data = {
        pageIndex: 1,
        pageSize: 10,
        queryDateType: queryDateType,
        start: currentdate,
        end: currentdate1,
        year: $("#year").val()
    }
    var starttime = currentdate;
    var endtime = currentdate1;
    var dataCount = {
        init: function () {
            var self = this;

            $("#picter").html(picter());
            $("#datatitle").html(dataCountTableH());
            self.getAllYear();
            self.selectYearEvt();
            self.dataList();
            self.dataLists();
            self.searchData();
            self.setDatetimepicker();
        },

        setDatetimepicker: function () {
            var self = this;
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
                data.pageIndex = 1;
                data.companyName = $("#companyName").val();
                data.start = starttime,
                    data.source = queryval,
                    data.queryDateType = queryDateType,
                    data.end = endtime,
                    self.dataList(data);
            });
            $("body").find('.endmonth_time').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                console.log("changeDate")
                starttime = $(".starmonth_time").val().length > 0 ? $(".starmonth_time").val() + " " + "" : ""
                endtime = $(".endmonth_time").val().length > 0 ? $(".endmonth_time").val() + " " + "" : ""
                data.pageIndex = 1;
                data.companyName = $("#companyName").val();
                data.start = starttime,
                    data.source = queryval,
                    data.queryDateType = queryDateType,
                    data.end = endtime,
                    self.dataList(data);
            });

            $(document).on("click", "#deleveval", function () {
                console.log(2)
                var dd = $("#companyName").val();
                $(this).attr("href", "/company/count/listExport.json?" + "start=" + starttime + "&end=" + endtime + "&queryDateType=" + queryDateType + "&companyName=" + dd + "&source=" + queryval)
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

                    data.pageIndex = 1;
                data.companyName = $("#companyName").val();
                data.start = starttime,
                    data.source = queryval,
                    data.queryDateType = queryDateType,
                    data.end = endtime,
                    self.dataList(data);
            });
            $("body").find('.endTime').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                starttime = $(".startTime").val().length > 0 ? $(".startTime").val() + "" + "" : ""
                endtime = $(".endTime").val().length > 0 ? $(".endTime").val() + "" + "" : ""
                data.pageIndex = 1;
                data.companyName = $("#companyName").val();
                data.start = starttime,
                    data.source = queryval,
                    data.queryDateType = queryDateType,
                    data.end = endtime,
                    self.dataList(data);
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
            $(document).on("click", "#queryTime a", function () {
                var _this = $(this);
                queryval = _this.data("querytime")
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                data.companyName = $("#companyName").val();
                data.start = starttime,
                    data.source = queryval,
                    data.queryDateType = queryDateType,
                    data.end = endtime,
                    self.dataList(data);
            })
        },
        getAllYear: function () {
            var year = $("#year");
            $.ajax({
                type: "post",
                url: "/master/doGetYears.json",
                success: function (data, status, xhr) {
                    if (data.code == -1) {
                        alert(data.error);
                    } else {
                        for (var i = 0; i < data.list.length; i++) {
                            console.log(data.list[i]);
                            year.append("<option value='" + data.list[i] + "'>" + data.list[i] + "</option>");
                        }
                        // alert("恭喜你登录成功");
                    }
                },
                error: function (xhr, errorType, error) {
                    alert(error);
                }
            })
        },
        selectYearEvt: function () {
            var self = this;
            $("#year").on("change", function () {
                data.pageIndex = 1;
                data.year = $("#year").val();
                data.companyName = $("#companyName").val();
                console.log(data.year);
                self.dataList();
            })
        },
        dataList: function () {
            var self = this;
            $.ajax({
                type: "post",
                url: "/company/count/list.json",
                data: data,
                success: function (data, status, xhr) {
                    if (data.code == -1) {
                        alert(data.error);
                    } else {
                        console.log(data)
                        $("#datatitle").html(dataCountTableH(data));
                        $(".customerM").html(dataCountMH(data.obj.total));
                        self.pagerInit(data.count);
                    }
                },
                error: function (xhr, errorType, error) {
                    alert(error);
                }
            })
        },
        dataLists: function () {
            // var self = this;
            // $.ajax({
            //     type: "post",
            //     url: "/master/count/list.json",
            //     data: data,
            //     success: function (data, status, xhr) {
            //         if (data.code == -1) {
            //             alert(data.error);
            //         } else {
            //             $(".customerM").html(dataCountMH(data));
            //             self.pagerInit(data.count);
            //         }
            //     },
            //     error: function (xhr, errorType, error) {
            //         alert(error);
            //     }
            // })
        },
        pagerInit: function (totalcount) {
            var self = this;
            if (totalcount > 0) {
                $("#pager").show();
            } else {
                $("#pager").hide();
            }
            $("#pager").pager({
                pagenumber: data.pageIndex,
                pagecount: Math.ceil(totalcount / data.pageSize),
                totalcount: totalcount,
                //回调函数
                buttonClickCallback: function (pageclickednumber) {
                    data.pageIndex = pageclickednumber;
                    self.dataList(data);
                }
            });
        },
        searchData: function () {
            var self = this;
            var validate = $("#dataCount_searchForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,
                submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form   
                    data.pageIndex = 1;
                    data.companyName = $("#companyName").val();
                    data.start = starttime,
                        data.queryDateType = queryDateType,
                        data.end = endtime,
                         data.source = queryval,
                        self.dataList(data);
                }
                // rules:{                   
                //     companyName:{
                //         required:true
                //     }          
                // },
                // messages:{                    
                //     companyName:{
                //         required: "<i>*</i>客户名称不能为空，请输入"                   
                //     }                                             
                // }                          
            });
        }
    };
    module.exports = dataCount;
    // main.init();
});