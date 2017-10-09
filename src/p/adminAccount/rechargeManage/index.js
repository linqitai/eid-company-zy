define(function (require, exports, module) {
    var $ = require("$"),
        tools = require("../../../c/js/toolsSocket");
    require("../../../c/js/jquery.pager");
    require('../../../c/js/registerHelper');
    require("../../../c/static/h-ui/js/H-ui");
    //require("../../../c/js/echarts.min");
    require("../../../c/js/bootstrap-datetimepicker");
    require("../../../c/js/bootstrap-datetimepicker.zh-CN");
    require("../../../c/js/jquery.provincesCity2");
    var queryBoxTmp = require("./queryBoxTmp.handlebars");
    var listTmp = require("./listTmp.handlebars");
    var picter = require("./picter.handlebars");
    var addCustomerH = require('./recharge.handlebars');
    var starttime = '';
    var endtime = '';
    var a = "";
    var b = "";
    var hhh = "";
    var rechargeManage = {
        init: function () {
            var self = this;
            self.addCustomer();

            //导入搜索栏
            $("#queryBoxID").html(queryBoxTmp());
            $("#picter").html(picter());
            self.setDatetimepicker();
            //初始化地址选择控件
            $("#address").ProvinceCity2();

            //获取门店名称列表
            var province = $("#province").val();
            var city = $("#city").val();
            var c = {
                totalAmount: (a + b)
            }
            var data = {
                province: province,
                city: city
            }
            //.log(data);
            self.list = $("#tableBox");
            self.lists = $("#queryBoxID");
            self.data = {
                pageIndex: 1,
                pageSize: 10,
            }
            self.getList(self.data);
            self.initEvents();
        },
        addCustomer: function () {
            var self = this;
            $(document).on("click", "#addCustomer", function () {
                var inval = 0.00;
                console.log(2)
                $("section").after(addCustomerH());

                self.typeIdOption();
                $("#province_city").ProvinceCity();

                $("#modal-addCustomer").modal("show");
                // // self.customerForm_validate();
                // $('#modal-addCustomer').on('hidden.bs.modal', function (e) {
                //     // 处理代码...
                //     // $("#province_city").html("");  
                //     $("section").nextAll().remove();
                // })
            });
            //充值
            $(document).on("click", "#addCustomer5", function () {

                var cus = $("#typeId").val();
                var rec = $("#rechargeval").val();
                if (!cus) {
                    $(".infomeg").removeClass("active");
                }
                if (!rec) {
                    $(".infomegs").removeClass("active");
                }
                if (cus && rec) {
                    $(".modal-dialog").addClass("active")
                    $(".modal-dialogs").removeClass("active")
                }
                $.ajax({
                    type: "post",
                    url: "/recharge/parentCompany.json",
                    success: function (data, status, xhr) {
                        if (data.code == -1) {
                            alert(data.error);
                        } else {
                            var newval = data.list;
                            console.log(data.list)
                            var newid = $("#typeId").val();
                            for (var i = 0; i < data.list.length; i++) {
                                if (newval[i].companyId == newid) {
                                    var comname = newval[i].companyName
                                    $("#customer").html(comname)
                                }
                            }
                            // alert("恭喜你登录成功");
                        }
                    },
                    error: function (xhr, errorType, error) {
                        alert(error);
                    }
                });
                var ddval=$("#realName").val()?$("#realName").val() : 0
                $("#surerv").html($("#rechargeval").val());
                $("#suzsv").html(ddval);
                $("#surall").html($("#allval").html());



            });
            //充值确定
            $(document).on("click", "#aaaa", function () {
                $("#aaaa").attr("disabled", "disabled")
                data = {
                    companyId: $("#typeId").val(),
                    rechargeAmount: $("#rechargeval").val(),
                    giftAmount: $("#realName").val(),
                    totalAmount: $("#typeName").val()
                }
                $.ajax({
                    data: data,
                    cache: false,
                    type: "post",
                    url: '/recharge/insertAmount.json',
                    success: function (data) {
                        //.log(data);
                        if (data.code == 0) {
                            $("section").nextAll().remove();
                            $(".modal-backdrop").addClass("active");
                            alert("充值成功")
                            $("#rechargeval").val(0)
                            $("#realName").val(0)
                            $("#allval").html(0)
                            a = 0
                            b = 0
                            window.location.reload()
                        } else {
                            $("#rechargeval").val(0)
                            $("#realName").val(0)
                            $("#allval").html(0)
                            a = 0
                            b = 0
                            alert(data.error)
                        }
                    }
                });
                console.log(data)
            });
            $(document).on("click", "#xx", function () {
                $("#rechargeval").val(0)
                $("#realName").val(0)
                $("#allval").html(0)
                a = 0
                            b = 0
            })
            //充值取消
            $(document).on("click", "#bbbb", function () {
                $(".modal-dialogs").addClass("active")
                $(".modal-dialog").removeClass("active")

            });
            //表单验证
            $(document).on("keyup", "#rechargeval", "#realName", function () {
                var $amountInput = $(this);
                //响应鼠标事件，允许左右方向键移动
                event = window.event || event; if (event.keyCode == 37 | event.keyCode == 39) { return; }
                //先把非数字的都替换掉，除了数字和. 
                $amountInput.val($amountInput.val().replace(/[^\d.]/g, "").
                    //只允许一个小数点
                    replace(/^\./g, "").replace(/\.{2,}/g, ".").
                    //只能输入小数点后两位 
                    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
            });
            $(document).on("blur", "#rechargeval", function () {
                var $amountInput = $(this);
                //最后一位是小数点的话，移除 
                $amountInput.val(($amountInput.val().replace(/\.$/g, "")));
            });
            $(document).on("keyup", "#realName", function () {
                var $amountInput = $(this);
                //响应鼠标事件，允许左右方向键移动
                event = window.event || event; if (event.keyCode == 37 | event.keyCode == 39) { return; }
                //先把非数字的都替换掉，除了数字和. 
                $amountInput.val($amountInput.val().replace(/[^\d.]/g, "").
                    //只允许一个小数点
                    replace(/^\./g, "").replace(/\.{2,}/g, ".").
                    //只能输入小数点后两位 
                    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
            });
            $(document).on("blur", "#realName", function () {
                var $amountInput = $(this);
                //最后一位是小数点的话，移除 
                $amountInput.val(($amountInput.val().replace(/\.$/g, "")));
            });
            //客户名称选择

        },
        //  addCustomer1: function () {
        //     var self = this;
        //     $(document).on("click", "#addCustomer1", function () {
        //         console.log(1)
        //         $("section").after(addCustomerH());
        //         $("#modal-addCustomer1").modal("show");
        //         $('#modal-addCustomer1').on('hidden.bs.modal', function (e) {
        //             // 处理代码...
        //             // $("#province_city").html("");  
        //             $("section").nextAll().remove();
        //         })
        //     })
        // },

        typeIdOption: function () {
            var typeId = $("#typeId");
            $.ajax({
                type: "post",
                url: "/recharge/parentCompany.json",
                success: function (data, status, xhr) {
                    if (data.code == -1) {
                        alert(data.error);
                    } else {
                        var newval = data.list;
                        console.log(data.list)
                        for (var i = 0; i < data.list.length; i++) {
                            typeId.append("<option value='" + data.list[i].companyId + "'>" + data.list[i].companyName + "</option>");
                        }
                        // alert("恭喜你登录成功");
                    }
                },
                error: function (xhr, errorType, error) {
                    alert(error);
                }
            })

        },
        // customerForm_validate: function () {
        //     if(0){
        //          var validate = $("#addCustomerForm").validate({

        //         debug: true, //调试模式取消submit的默认提交功能   
        //         //errorClass: "label.error", //默认为错误的样式类为：error   
        //         focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
        //         onkeyup: false,
        //         onblur: true,
        //         submitHandler: function (form) {   //表单提交句柄,为一回调函数，带一个参数：form   
        //             $.ajax({
        //                 type: "post",
        //                 url: "/recharge/insertAmount.json",
        //                 data: $("#addCustomerForm").serialize(),
        //                 success: function (data, status, xhr) {
        //                     if (data.code == -1) {
        //                         alert(data.error);
        //                     } else {
        //                         // window.location.reload();
        //                         alert("充值成功");
        //                         setTimeout(function () { window.location.reload(); }, 500);
        //                     }
        //                 },
        //                 error: function (xhr, errorType, error) {
        //                     alert(error);
        //                 }
        //             })
        //         },
        //         rules: {
        //             rechargeAmount: {
        //                 required: true
        //             },
        //             companyId: {
        //                 required: true
        //             },
        //             linkMan: {
        //                 required: true
        //             },
        //             phone: {
        //                 required: true,
        //                 mobile: true
        //             },
        //             province: {
        //                 required: true
        //             },
        //             city: {
        //                 required: true
        //             },
        //             address: {
        //                 required: true
        //             }
        //         },
        //         messages: {
        //             rechargeAmount: {
        //                 required: "<i>*</i>充值金额不能为空，请输入"
        //             },
        //             companyId: {
        //                 required: "<i>*</i>客户名称不能为空，请选择"
        //             },
        //             linkMan: {
        //                 required: "<i>*</i>联系人不能为空，请输入"
        //             },
        //             phone: {
        //                 required: "<i>*</i>手机号码不能为空，请输入"
        //             },
        //             province: {
        //                 required: "<i>*</i>省市不能为空，请选择"
        //             },
        //             city: {
        //                 required: ""
        //             },
        //             address: {
        //                 required: "<i>*</i>详细地址不能为空，请输入"
        //             }
        //         }
        //     });
        //     }


        // },


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
                weekStart: 1,
                autoclose: true,
                todayBtn: 1,
                startDate: ''
            });
            $("body").find("#endTime").datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm-dd",
                startView: 2,
                minView: 2,
                autoclose: true,
                todayBtn: 1
            });
            //时间框点击事件
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
                console.log($(".startTime").val().length)
                starttime = $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "" : ""
                endtime = $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "" : ""
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: starttime,
                    _endTime: endtime,
                    client: $("#searchText").val().trim()
                }
                self.getList(self.data);
            });
            $("body").find('.endTime').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                starttime = $(".startTime").val().length > 0 ? $(".startTime").val() + " " + "" : ""
                endtime = $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "" : ""
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: starttime,
                    _endTime: endtime,
                    client: $("#searchText").val().trim()
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
                $('.endmonth_time').datetimepicker('setStartDate', $('.starmonth_time').val());
                if ($.trim($(".endmonth_time").val()).length <= 0) {
                    $(".endmonth_time").val($('.starmonth_time').val());
                }
                starttime = $(".starmonth_time").val().length > 0 ? $(".starmonth_time").val() + "" + "" : ""
                endtime = $(".endmonth_time").val().length > 0 ? $(".endmonth_time").val() + "" + "" : ""
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: starttime,
                    _endTime: endtime,
                    client: $("#searchText").val().trim()
                }
                self.getList(self.data);
            });
            $("body").find('.endmonth_time').on('change', function (e) {
                $("#queryTime input.btn.primary").removeClass("primary").addClass("btn-link");
                starttime = $(".starmonth_time").val().length > 0 ? $(".starmonth_time").val() + "" + "" : ""
                endtime = $(".endmonth_time").val().length > 0 ? $(".endmonth_time").val() + "" + "" : ""
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: starttime,
                    _endTime: endtime,
                    client: $("#searchText").val().trim()
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
            $("#dayOrMonth").on("change", function () {
                var daymonstatu = $("#dayOrMonth").val()
                if (daymonstatu == 1) {
                    console.log(2)
                    $("body").find("#daypicker").addClass("active")
                    $("body").find("#monthpicker").removeClass("active")
                } else {
                    console.log(4)
                    $("body").find("#monthpicker").addClass("active")
                    $("body").find("#daypicker").removeClass("active")
                }
            });
            $(document).on("change", "#typeId1", function () {
                var zsval = $("#typeId1").val();
                if (zsval == 2) {
                    $("#zsvals").removeClass("active")
                    $("#realName").val(' ')
                } else {
                    b = 0
                    hhh = (a + b);


                    $("#typeName").val(hhh)
                    $("#allval").html(hhh)
                    $("#zsvals").addClass("active")
                }
            });
            $(document).on("change", "#typeId", function () {
                var cusval = $("#typeId").val();
                if (cusval) {
                    $(".infomeg").addClass("active")
                }
            });
            $(document).on("blur", "#rechargeval", function () {
                var rechargval = $("#rechargeval").val();
                if (rechargval) {
                    $(".infomegs").addClass("active")
                }
            });
            $(document).on("click", "#search_button", function () {
                console.log(245)
                self.data = {
                    pageIndex: 1,
                    pageSize: 10,
                    _startTime: starttime,
                    _endTime: endtime,
                    client: $("#searchText").val().trim()
                }
                self.getList(self.data);
            });
            $(document).on("blur", "#rechargeval", function () {
                a = parseFloat($("#rechargeval").val())
                b = parseFloat($("#realName").val())?parseFloat($("#realName").val()):0
                hhh = parseFloat(a + b);
                hhh=hhh.toFixed(2)
                $("#allval").html(hhh)
                $("#typeName").val(hhh)
            })
            $(document).on("blur", "#realName", function () {
                b = parseFloat($("#realName").val())
                  a = parseFloat($("#rechargeval").val())?parseFloat($("#rechargeval").val()):0
                hhh =  parseFloat(a + b);
                hhh=hhh.toFixed(2)
                $("#typeName").val(hhh)
                $("#allval").html(hhh)
            })
        },
        //充值接口
        getLists: function (data) {
            var self = this;

        },

        getList: function (data) {
            var self = this;
            $.ajax({
                data: data,
                cache: false,
                type: "post",
                url: '/recharge/manageRecharge.json',
                success: function (data) {
                    //.log(data);
                    if (data.code == 0) {
                        var list = data.list;
                        var objval = data.obj
                        self.list.html(listTmp(list));
                        console.log(data);
                        self.lists.html(queryBoxTmp(objval));
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
        }

    };
    module.exports = rechargeManage;
});
