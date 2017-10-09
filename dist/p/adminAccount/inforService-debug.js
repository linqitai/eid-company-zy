define("xg/eid-company-zy/1.0.4/p/adminAccount/inforService-debug", ["jquery/jquery/1.10.1/jquery-debug", "xg/eid-company-zy/1.0.4/c/js/tools-debug", "xg/eid-company-zy/1.0.4/c/js/bootstrap-debug", "xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate", "xg/eid-company-zy/1.0.4/c/js/validate-add-methods-debug", "xg/eid-company-zy/1.0.4/c/js/validate-messages-cn-debug", "xg/eid-company-zy/1.0.4/c/js/moment-debug", "xg/eid-company-zy/1.0.4/c/handlebars/headerTmp-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/modifyPassword-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/modifyInfo-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/versionH-debug.handlebars", "xg/eid-company-zy/1.0.4/c/js/jquery-debug.pager", "xg/eid-company-zy/1.0.4/c/js/registerHelper-debug", "alinw/handlebars/1.3.0/runtime-debug", "xg/eid-company-zy/1.0.4/c/static/h-ui/js/H-ui-debug", "xg/eid-company-zy/1.0.4/c/css/bootstrap-debug.css", "xg/eid-company-zy/1.0.4/c/css/bootstrap-datetimepicker-debug.css", "xg/eid-company-zy/1.0.4/c/js/bootstrap-datetimepicker-debug", "xg/eid-company-zy/1.0.4/c/js/bootstrap-datetimepicker-debug.zh-CN", "xg/eid-company-zy/1.0.4/p/adminAccount/inforServiceH/inforServiceMH-debug.handlebars", "xg/eid-company-zy/1.0.4/p/adminAccount/inforServiceH/inforServiceTableH-debug.handlebars", "xg/eid-company-zy/1.0.4/p/adminAccount/inforServiceH/picter-debug.handlebars"], function(require, exports, module) {
    var $ = require("jquery/jquery/1.10.1/jquery-debug"),
        tools = require("xg/eid-company-zy/1.0.4/c/js/tools-debug");
    require("xg/eid-company-zy/1.0.4/c/js/jquery-debug.pager");
    require("xg/eid-company-zy/1.0.4/c/js/registerHelper-debug");
    require("xg/eid-company-zy/1.0.4/c/static/h-ui/js/H-ui-debug");
    require("xg/eid-company-zy/1.0.4/c/css/bootstrap-debug.css");
    require("xg/eid-company-zy/1.0.4/c/css/bootstrap-datetimepicker-debug.css");
    require("xg/eid-company-zy/1.0.4/c/js/bootstrap-datetimepicker-debug");
    require("xg/eid-company-zy/1.0.4/c/js/bootstrap-datetimepicker-debug.zh-CN");
    var queryval = "";
    var faceval = "";
    var yewuval = tools.getUrlParam("status");
    var levelval = tools.getUrlParam("level");
    var mobileval = tools.getUrlParam("mobileStatus");
    var start = tools.getUrlParam("_startTime");
    var end = tools.getUrlParam("_endTime");
    var reportTime = tools.getUrlParam("reportTime");
    var queryDateType = tools.getUrlParam("queryDateType");
    var dcompanyId = tools.getUrlParam("companyId");
    var queryBranch = tools.getUrlParam("queryBranch");
    var idvals = "";
    var commonval = "";
    var unval = "";
    var infoval = "";
    var statuvals = "";
    var a0 = "";
    var a1 = "";
    var a2 = "";
    var a3 = "";
    var a4 = "";
    var a5 = "";
    var b0 = "";
    var b1 = "";
    var b2 = "";
    var b3 = "";
    var c0 = "";
    var c1 = "";
    var c2 = "";
    var c3 = "";
    var d0 = "";
    var d1 = "";
    var d2 = "";
    var d3 = "";
    var d4 = "";
    var e0 = "";
    var e1 = "";
    var e2 = "";
    var e3 = "";
    var f0 = "";
    var f1 = "";
    var f2 = "";
    var f3 = "";
    var inforServiceMH = require("xg/eid-company-zy/1.0.4/p/adminAccount/inforServiceH/inforServiceMH-debug.handlebars"),
        inforServiceTableH = require("xg/eid-company-zy/1.0.4/p/adminAccount/inforServiceH/inforServiceTableH-debug.handlebars"),
        picter = require("xg/eid-company-zy/1.0.4/p/adminAccount/inforServiceH/picter-debug.handlebars");
    var hcg = "";
    var inforService = {
        init: function() {
            var self = this;
            if (queryDateType && queryDateType == 2) {
                var _end = tools.getUrlParam("_endTime");
                _end = _end.split("-");
                var a1 = parseInt(_end[0]);
                var a2 = parseInt(_end[1]);
                a2 = parseInt(a2, 10);
                var d = new Date(a1, a2, 0);
                var start1 = tools.getUrlParam("_startTime") + "-01";
                var end1 = tools.getUrlParam("_endTime") + "-" + d.getDate();
                start1 = start1.split(" ");
                end1 = end1.split(" ");
                start1 = start1.join("");
                end1 = end1.join("");
                var start = start1;
                var end = end1;
                console.log(4545545445)
            } else {
                var start = tools.getUrlParam("_startTime");
                var end = tools.getUrlParam("_endTime")
            }
            $(".customerM").html(inforServiceMH());
            $("#picter").html(picter());
            self.datetimepicker();
            if (levelval == 1) {
                setTimeout(function() {
                    $(".color-green").removeClass("btn-link").addClass("current")
                }, 150)
            } else if (levelval == 2) {
                setTimeout(function() {
                    $(".color-yellow").removeClass("btn-link").addClass("current")
                }, 150)
            } else if (levelval == 3) {
                setTimeout(function() {
                    $(".color-red").removeClass("btn-link").addClass("current")
                }, 150)
            } else if (!levelval) {
                setTimeout(function() {
                    $(".color-all").removeClass("btn-link").addClass("current")
                }, 150)
            }
            if (yewuval == 1) {
                setTimeout(function() {
                    $(".statu-pass").removeClass("btn-link").addClass("current")
                }, 150)
            } else if (yewuval == 2) {
                setTimeout(function() {
                    $(".statu-unpass").removeClass("btn-link").addClass("current")
                }, 150)
            } else if (!yewuval) {
                setTimeout(function() {
                    $(".statu-all").removeClass("btn-link").addClass("current")
                }, 150)
            }
            if (mobileval == 2) {
                setTimeout(function() {
                    $(".mobile-succ").removeClass("btn-link").addClass("current")
                }, 150)
            } else if (!mobileval) {
                if (reportTime) {
                    if (reportTime == 0) {
                        setTimeout(function() {
                            $(".mobile-all").removeClass("btn-link").addClass("current")
                        }, 150)
                    } else {}
                }
            }
            if (reportTime) {
                if (reportTime == 0) {
                    console.log("aaaa")
                } else {
                    setTimeout(function() {
                        $(".mobile-succ").removeClass("btn-link").addClass("current")
                    }, 150)
                }
            } else {
                setTimeout(function() {
                    $(".mobile-all").removeClass("btn-link").addClass("current")
                }, 150)
            }
            if (reportTime) {
                if (reportTime == 0) {} else {
                    mobileval = 2
                }
            }
            setTimeout(function() {
                var data = {
                    pageSize: 10,
                    pageIndex: 1,
                    flowStatus: commonval,
                    queryTime: queryval,
                    idenAuthentication: unval,
                    source: infoval,
                    status: yewuval ? yewuval : "",
                    level: levelval ? levelval : "",
                    customStartTime: start ? start : "",
                    customEndTime: end ? end : "",
                    mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
                    companyName: $("#companyName").val(),
                    childName: $("#childName").val(),
                    borrowerName: $("#borrowerName").val(),
                    mobile: $("#borrowerName1").val(),
                    queryBranch: queryBranch,
                    businessProgress: tools.getUrlParam("businessProgress"),
                    companyId: dcompanyId
                };
                self.inforServiceList(data)
            }, 100);
            self.inforServiceLists();
            self.searchInforService();
            self.statusTab();
            self.queryTimeTab()
        },
        datetimepicker: function() {
            var self = this;
            $("body").find("#startTime").datetimepicker({
                language: "zh-CN",
                format: "yyyy-mm-dd",
                startView: 2,
                minView: 2,
                autoclose: true,
                todayBtn: 1
            });
            $("body").find("#endTime").datetimepicker({
                language: "zh-CN",
                format: "yyyy-mm-dd",
                startView: 2,
                minView: 2,
                autoclose: true,
                todayBtn: 1
            });
            var urlstarttime = tools.getUrlParam("_startTime");
            var urlendtime = tools.getUrlParam("_endTime");
            if (urlstarttime) {
                $("#startTime").attr("placeholder", urlstarttime);
                if (urlendtime) {
                    $("#endTime").attr("placeholder", urlendtime)
                }
            }
            $("body").find(".startTime").on("change", function(e) {
                $(".endTime").datetimepicker("setStartDate", $(".startTime").val());
                if ($.trim($(".endTime").val()).length <= 0) {
                    $(".endTime").val($(".startTime").val())
                } else {}
                start = $(".startTime").val().length > 0 ? $(".startTime").val() : "";
                end = $(".endTime").val().length > 0 ? $(".endTime").val() : "";
                start = $(".startTime").val().length > 0 ? $(".startTime").val() + "  " + "" : "";
                end = $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "" : "";
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $("body").find(".endTime").on("change", function(e) {
                $(".startTime").datetimepicker("setEndDate", $(".endTime").val());
                if ($.trim($(".startTime").val()).length <= 0) {
                    $(".startTime").val($(".endTime").val())
                } else {}
                start = $(".startTime").val().length > 0 ? $(".startTime").val() + "  " + "" : "";
                end = $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "" : "";
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            })
        },
        statusTab: function() {
            var self = this;
            $(document).on("click", "#idcard", function() {
                var _this = $(this);
                c0 = _this.data("c");
                c1 = "";
                c2 = "";
                c3 = "";
                commonval = "";
                unval = "";
                console.log(_this.data("idval"));
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $(document).on("click", "#idcard1", function() {
                var _this = $(this);
                c1 = _this.data("c");
                idvals = _this.data("idval");
                if (unval) {
                    unval = ""
                }
                if (mobileval && faceval || mobileval || faceval) {
                    console.log(1)
                } else {
                    commonval = _this.data("idval");
                    console.log(2)
                }
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $(document).on("click", "#idcard2", function() {
                var _this = $(this);
                if (a2 == 2 || a3 == 3 || a4 == 4 || a5 == 5 || b1 == 1 || b2 == 2 || b3 == 3 || d1 == 1 || d2 == 2 || d3 == 3 || d4 == 4 || e1 == 1 || e2 == 2 || e3 == 3 || f2 == 2 || f3 == 3) {} else {
                    c2 = _this.data("c");
                    idvals = _this.data("idval");
                    console.log(1);
                    console.log(faceval);
                    console.log(1);
                    if (unval) {
                        unval = ""
                    }
                    if (mobileval && faceval || mobileval || faceval) {
                        console.log(1)
                    } else {
                        commonval = _this.data("idval");
                        console.log(2)
                    }
                    if (mobileval == 2 || mobileval == 1 || faceval == 10 || faceval == 20 || faceval == -10 || faceval == -20) {} else if (mobileval == 0 || mobileval == null || faceval == null) {
                        $(this).removeClass("btn-link").addClass("current");
                        $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                        data.pageIndex = 1;
                        pageSize = 10;
                        data.flowStatus = commonval;
                        data.queryTime = queryval;
                        data.idenAuthentication = unval;
                        data.source = infoval;
                        data.level = levelval ? levelval : "";
                        data.status = yewuval || yewuval == 0 ? yewuval : "";
                        data.customStartTime = start ? start : "";
                        data.customEndTime = end ? end : "";
                        data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                        data.companyName = $("#companyName").val();
                        data.childName = $("#childName").val();
                        data.borrowerName = $("#borrowerName").val();
                        data.mobile = $("#borrowerName1").val();
                        self.inforServiceList(data)
                    }
                }
            });
            $(document).on("click", "#idcard3", function() {
                var _this = $(this);
                c3 = _this.data("c");
                if (mobileval && faceval || mobileval || faceval) {
                    console.log(1)
                } else {
                    commonval = "";
                    console.log(2)
                }
                console.log(idvals);
                if (idvals) {
                    commonval = ""
                }
                unval = _this.data("idval");
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $(document).on("click", "#statu", function() {
                var _this = $(this);
                a0 = _this.data("a");
                a1 = "";
                a2 = "";
                a3 = "";
                a4 = "";
                a5 = "";
                yewuval = _this.data("yewu");
                if (yewuval == 4) {
                    yewuval = "";
                    statuvals = 0
                } else {
                    statuvals = "";
                    yewuval = $(this).data("yewu")
                }
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.isChecked = statuvals, data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $(document).on("click", "#statu1", function() {
                var _this = $(this);
                a1 = _this.data("a");
                a2 = "";
                a3 = "";
                a4 = "";
                a5 = "";
                yewuval = _this.data("yewu");
                if (yewuval == 4) {
                    yewuval = "";
                    statuvals = 0
                } else {
                    statuvals = "";
                    yewuval = $(this).data("yewu")
                }
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.isChecked = statuvals, data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $(document).on("click", "#statu2", function() {
                var _this = $(this);
                if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2 || d3 == 3) {} else {
                    a2 = _this.data("a");
                    a1 = "";
                    a3 = "";
                    a4 = "";
                    a5 = "";
                    yewuval = _this.data("yewu");
                    if (yewuval == 4) {
                        yewuval = "";
                        statuvals = 0
                    } else {
                        statuvals = "";
                        yewuval = $(this).data("yewu")
                    }
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.isChecked = statuvals, data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#statu3", function() {
                var _this = $(this);
                if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2 || d3 == 3) {} else {
                    a3 = _this.data("a");
                    a1 = "";
                    a2 = "";
                    a4 = "";
                    a5 = "";
                    yewuval = _this.data("yewu");
                    if (yewuval == 4) {
                        yewuval = "";
                        statuvals = 0
                    } else {
                        statuvals = "";
                        yewuval = $(this).data("yewu")
                    }
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.isChecked = statuvals, data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#statu4", function() {
                var _this = $(this);
                if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2 || d3 == 3) {} else {
                    a4 = _this.data("a");
                    a1 = "";
                    a2 = "";
                    a3 = "";
                    a5 = "";
                    yewuval = _this.data("yewu");
                    if (yewuval == 4) {
                        yewuval = "";
                        statuvals = 0
                    } else {
                        statuvals = "";
                        yewuval = $(this).data("yewu")
                    }
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.isChecked = statuvals, data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#statu5", function() {
                var _this = $(this);
                if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2 || d3 == 3) {} else {
                    a5 = _this.data("a");
                    a1 = "";
                    a2 = "";
                    a3 = "";
                    a4 = "";
                    yewuval = _this.data("yewu");
                    if (yewuval == 4) {
                        yewuval = "";
                        statuvals = 0
                    } else {
                        statuvals = "";
                        yewuval = $(this).data("yewu")
                    }
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.isChecked = statuvals, data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#levebtn", function() {
                var _this = $(this);
                b0 = _this.data("b");
                b1 = "";
                b2 = "";
                b3 = "";
                levelval = _this.data("level");
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $(document).on("click", "#levebtn1", function() {
                var _this = $(this);
                if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {} else {
                    b1 = _this.data("b");
                    b2 = "";
                    b3 = "";
                    levelval = _this.data("level");
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#levebtn2", function() {
                var _this = $(this);
                if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {} else {
                    b2 = _this.data("b");
                    b1 = "";
                    b3 = "";
                    levelval = _this.data("level");
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#levebtn3", function() {
                var _this = $(this);
                if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {} else {
                    b3 = _this.data("b");
                    b1 = "";
                    b2 = "";
                    levelval = _this.data("level");
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#face", function() {
                var _this = $(this);
                d0 = _this.data("d");
                d1 = "";
                d2 = "";
                d3 = "";
                d4 = "";
                commonval = "";
                faceval = "";
                console.log(_this.data("face"));
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $(document).on("click", "#face1", function() {
                var _this = $(this);
                if (c2 == 2) {} else {
                    d1 = _this.data("d");
                    d2 = "";
                    d3 = "";
                    d4 = "";
                    faceval = _this.data("face");
                    commonval = _this.data("face");
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#face2", function() {
                var _this = $(this);
                if (b3 == 3 || c2 == 2) {} else {
                    d2 = _this.data("d");
                    d1 = "";
                    d3 = "";
                    d4 = "";
                    faceval = _this.data("face");
                    commonval = _this.data("face");
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#face3", function() {
                var _this = $(this);
                if (c2 == 2 || b3 == 3 || b1 == 1 || b2 == 2 || f3 == 3 || f2 == 2 || f1 == 1 || a2 == 2 || a3 == 3 || a4 == 4 || a5 == 5) {} else {
                    d3 = _this.data("d");
                    d1 = "";
                    d2 = "";
                    d4 = "";
                    faceval = _this.data("face");
                    commonval = _this.data("face");
                    if (mobileval == 0 || mobileval == null) {
                        $(this).removeClass("btn-link").addClass("current");
                        $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                        data.pageIndex = 1;
                        pageSize = 10;
                        data.flowStatus = commonval;
                        data.queryTime = queryval;
                        data.idenAuthentication = unval;
                        data.source = infoval;
                        data.level = levelval ? levelval : "";
                        data.status = yewuval || yewuval == 0 ? yewuval : "";
                        data.customStartTime = start ? start : "";
                        data.customEndTime = end ? end : "";
                        data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                        data.companyName = $("#companyName").val();
                        data.childName = $("#childName").val();
                        data.borrowerName = $("#borrowerName").val();
                        data.mobile = $("#borrowerName1").val();
                        self.inforServiceList(data)
                    }
                }
            });
            $(document).on("click", "#face4", function() {
                var _this = $(this);
                if (a2 == 2 || a4 == 4 || b1 == 1 || b2 == 2 || b3 == 3 || f2 == 2 || f3 == 3 || a3 == 3 || c2 == 2) {} else {
                    d4 = _this.data("d");
                    d1 = "";
                    d2 = "";
                    d3 = "";
                    faceval = _this.data("face");
                    commonval = _this.data("face");
                    if (mobileval == 0 || mobileval == null) {
                        $(this).removeClass("btn-link").addClass("current");
                        $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                        data.pageIndex = 1;
                        pageSize = 10;
                        data.flowStatus = commonval;
                        data.queryTime = queryval;
                        data.idenAuthentication = unval;
                        data.source = infoval;
                        data.level = levelval ? levelval : "";
                        data.status = yewuval || yewuval == 0 ? yewuval : "";
                        data.customStartTime = start ? start : "";
                        data.customEndTime = end ? end : "";
                        data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                        data.companyName = $("#companyName").val();
                        data.childName = $("#childName").val();
                        data.borrowerName = $("#borrowerName").val();
                        data.mobile = $("#borrowerName1").val();
                        self.inforServiceList(data)
                    }
                }
            });
            $(document).on("click", "#bankStatus3 a", function() {
                var _this = $(this);
                infoval = _this.data("ren");
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $(document).on("click", "#check", function() {
                var _this = $(this);
                f0 = _this.data("f");
                f1 = "";
                f2 = "";
                f3 = "";
                mobileval = _this.data("status");
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            });
            $(document).on("click", "#check1", function() {
                var _this = $(this);
                if (b1 == 1 || b2 == 2 || b3 == 3 || a2 == 2 || a3 == 3 || a4 == 4 || a5 == 5 || d3 == 3 || c2 == 2) {} else {
                    f1 = _this.data("f");
                    f2 = "";
                    f3 = "";
                    mobileval = _this.data("status");
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#check2", function() {
                var _this = $(this);
                if (b1 == 1 || b2 == 2 || b3 == 3 || c2 == 2 || d4 == 4 || d3 == 3 || a2 == 2 || a3 == 3 || a4 == 4 || a5 == 5) {} else {
                    f2 = _this.data("f");
                    f1 = "";
                    f3 = "";
                    mobileval = _this.data("status");
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            });
            $(document).on("click", "#check3", function() {
                var _this = $(this);
                if (d4 == 4 || c2 == 2 || d3 == 3) {} else {
                    f3 = _this.data("f");
                    f1 = "";
                    f2 = "";
                    mobileval = _this.data("status");
                    console.log(mobileval);
                    $(this).removeClass("btn-link").addClass("current");
                    $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            })
        },
        queryTimeTab: function() {
            var self = this;
            $(document).on("click", "#queryTime a", function() {
                var _this = $(this);
                queryval = _this.data("querytime");
                console.log(queryval);
                $(this).removeClass("btn-link").addClass("current");
                $(this).siblings(".btn").removeClass("current").addClass("btn-link");
                data.pageIndex = 1;
                pageSize = 10;
                data.flowStatus = commonval;
                data.queryTime = queryval;
                data.idenAuthentication = unval;
                data.source = infoval;
                data.level = levelval ? levelval : "";
                data.status = yewuval || yewuval == 0 ? yewuval : "";
                data.customStartTime = start ? start : "";
                data.customEndTime = end ? end : "";
                data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.borrowerName = $("#borrowerName").val();
                data.mobile = $("#borrowerName1").val();
                self.inforServiceList(data)
            })
        },
        inforServiceList: function(data) {
            console.log(data);
            var self = this;
            $.ajax({
                type: "post",
                url: "/company/master/borrowingInfo/list.json",
                data: data,
                success: function(data, status, xhr) {
                    if (data.code == -1) {
                        alert(data.error)
                    } else {
                        console.log(data.list);
                        $(".inforTable").html(inforServiceTableH(data.list));
                        self.pagerInit(data.count)
                    }
                },
                error: function(xhr, errorType, error) {
                    alert(error)
                }
            })
        },
        inforServiceLists: function() {
            var self = this;
            $.ajax({
                type: "post",
                url: "/company/queryBorrowingItemStatusCount.json",
                data: {},
                success: function(data, status, xhr) {
                    if (data.code == -1) {
                        alert(data.error)
                    } else {
                        console.log(data.obj);
                        $(".customerM").html(inforServiceMH(data.obj));
                        self.pagerInit(data.count)
                    }
                },
                error: function(xhr, errorType, error) {
                    alert(error)
                }
            })
        },
        pagerInit: function(totalcount) {
            var self = this;
            if (totalcount > 0) {
                $("#pager").show()
            } else {
                $("#pager").hide()
            }
            $("#pager").pager({
                pagenumber: data.pageIndex,
                pagecount: Math.ceil(totalcount / data.pageSize),
                totalcount: totalcount,
                buttonClickCallback: function(pageclickednumber) {
                    console.log(start);
                    data.pageIndex = pageclickednumber;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            })
        },
        searchInforService: function() {
            var self = this;
            var validate = $("#infor_searchForm").validate({
                debug: true,
                focusInvalid: false,
                onkeyup: false,
                onblur: true,
                submitHandler: function(form) {
                    data.pageIndex = 1;
                    pageSize = 10;
                    data.flowStatus = commonval;
                    data.queryTime = queryval;
                    data.idenAuthentication = unval;
                    data.source = infoval;
                    data.level = levelval ? levelval : "";
                    data.status = yewuval || yewuval == 0 ? yewuval : "";
                    data.customStartTime = start ? start : "";
                    data.customEndTime = end ? end : "";
                    data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.borrowerName = $("#borrowerName").val();
                    data.mobile = $("#borrowerName1").val();
                    self.inforServiceList(data)
                }
            })
        }
    };
    module.exports = inforService
});
define("xg/eid-company-zy/1.0.4/c/js/tools-debug", ["jquery/jquery/1.10.1/jquery-debug", "xg/eid-company-zy/1.0.4/c/js/bootstrap-debug", "xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate", "xg/eid-company-zy/1.0.4/c/js/validate-add-methods-debug", "xg/eid-company-zy/1.0.4/c/js/validate-messages-cn-debug", "xg/eid-company-zy/1.0.4/c/js/moment-debug", "xg/eid-company-zy/1.0.4/c/handlebars/headerTmp-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/modifyPassword-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/modifyInfo-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/versionH-debug.handlebars"], function(require, exports, module) {
    var $ = require("jquery/jquery/1.10.1/jquery-debug");
    require("xg/eid-company-zy/1.0.4/c/js/bootstrap-debug");
    require("xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate");
    require("xg/eid-company-zy/1.0.4/c/js/validate-add-methods-debug");
    require("xg/eid-company-zy/1.0.4/c/js/validate-messages-cn-debug");
    var moment = require("xg/eid-company-zy/1.0.4/c/js/moment-debug");
    var headerTmp = require("xg/eid-company-zy/1.0.4/c/handlebars/headerTmp-debug.handlebars");
    var modifyPasswordTmp = require("xg/eid-company-zy/1.0.4/c/handlebars/modifyPassword-debug.handlebars");
    var modifyInfoTmp = require("xg/eid-company-zy/1.0.4/c/handlebars/modifyInfo-debug.handlebars");
    var checkInfoTmp = require("xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars");
    var versionH = require("xg/eid-company-zy/1.0.4/c/handlebars/versionH-debug.handlebars");
    var companyId = "",
        interval = null,
        parentId = "",
        itemId = "";
    module.exports = {
        customerParentInit: function() {
            var self = this;
            console.logo("信鸽身份标识系统");
            self.getCustomerLoginInfo();
            self.modify();
            self.modify2();
            self.logout();
            self.clickInfoBtn()
        },
        judgeBroswer: function() {
            if (navigator.userAgent.indexOf("MSIE") > 0) {
                if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                    $("body").append(versionH());
                    $("#modal-version").modal("show");
                    $("#modal-version").on("hidden.bs.modal", function(e) {
                        $("#modal-version").remove()
                    })
                }
                if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
                    $("body").append(versionH());
                    $("#modal-version").modal("show");
                    $("#modal-version").on("hidden.bs.modal", function(e) {
                        $("#modal-version").remove()
                    })
                }
                if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
                    $("body").append(versionH());
                    $("#modal-version").modal("show");
                    $("#modal-version").on("hidden.bs.modal", function(e) {
                        $("#modal-version").remove()
                    })
                }
                if (navigator.userAgent.indexOf("MSIE 9.0") > 0 && !window.innerWidth) {
                    $("body").append(versionH());
                    $("#modal-version").modal("show");
                    $("#modal-version").on("hidden.bs.modal", function(e) {
                        $("#modal-version").remove()
                    })
                }
            }
        },
        webBrowser: function() {
            var self = this;
            var web = navigator.appCodeName;
            var version = navigator.appVersion;
            if (web == "Mozilla") {
                console.log(web);
                var indexStart = version.lastIndexOf("(") + 1;
                var indexEnd = version.lastIndexOf(")");
                var str = version.substring(indexStart, indexEnd);
                var arrStr = str.split(";");
                var len = arrStr.length;
                var currentVersion = arrStr[len - 1].split(":")[1];
                if (currentVersion < 12) {
                    console.log("请升级你的IE浏览器到最新版本")
                }
            }
        },
        lookDetailInfo: function() {
            var self = this;
            $("#infoSureBtn").on("click", function() {
                $("#closeBtn").trigger("click")
            })
        },
        getCheckInfo: function() {
            var self = this;
            var data = {
                companyId: companyId
            };
            $.ajax({
                data: data,
                type: "post",
                url: "/cycle/search/view.json",
                success: function(data) {
                    console.log(data);
                    if (data.code == 0) {
                        console.log(454545);
                        console.log(data.list);
                        console.log(454545);
                        var list = data.list;
                        if (list.length > 0) {
                            $("body").find(".modal-backdrop").remove();
                            $("body").find("#modal-checkInfo").remove();
                            $("body").append(checkInfoTmp(list[0]));
                            $("#modal-checkInfo").modal("show").css("left", "45%");
                            if ($(".passCheckBtn").text() == "人脸比对成功") {
                                $(".passCheckBtn").css("color", "green")
                            } else {
                                $(".passCheckBtn").css("color", "red")
                            }
                            itemId = list[0].itemId
                        }
                    } else {
                        window.location.href = "/customer/login.htm"
                    }
                }
            })
        },
        clickInfoBtn: function() {
            $("body").on("click", "#closeBtn", function(e) {
                window.location.reload()
            });
            $("body").on("click", "#infoSureBtn", function(e) {
                if (parentId == 1) {
                    window.location.href = "/subShop/business/view.htm"
                } else if (parentId == 0) {
                    window.location.href = "/headShop/business/view.htm"
                }
            })
        },
        logout: function() {
            $("header").on("click", "#logout", function() {
                var data = {
                    userType: $(this).data("usertype")
                };
                $.ajax({
                    data: data,
                    type: "post",
                    url: "/loginOut.do",
                    success: function(data) {
                        if (data.code == 0) {
                            window.location.href = "/customer/login.htm"
                        }
                    }
                })
            })
        },
        getCustomerLoginInfo: function() {
            var self = this;
            $.ajax({
                type: "post",
                url: "/common/ajax/user.json",
                success: function(data) {
                    console.log(data);
                    if (data.login == true) {
                        parentId = data.user.parentId;
                        console.log("获取用户信息");
                        $("#logoUrl").attr("src", data.user.logoUrl);
                        $("#headerCompanyName").html(data.user.companyName + "&nbsp;&nbsp;");
                        $("#headerRealName").html(data.user.realName + "&nbsp;&nbsp;");
                        $("#headerRoleName").before(data.user.roleName);
                        $("#modifyInfo").parent().attr("data-customerid", data.user.customerId);
                        $("#modifyInfo").parent().attr("data-mobile", data.user.mobile);
                        $("#modifyInfo").parent().attr("data-realname", data.user.realName);
                        $("#logout").attr("data-usertype", data.user.userType);
                        if (data.user.roleName != "管理员") {
                            $("#accountManage4Parent").hide();
                            $("#accountManage4Sub").hide()
                        }
                        companyId = data.user.companyId;
                        $("#companyId").val(companyId)
                    } else {
                        console.log("未登录或登录超时");
                        window.location.href = "/customer/login.htm"
                    }
                }
            })
        },
        modify: function() {
            var self = this;
            $("header").on("click", "#modifyPassword", function() {
                $("body").find("#modal-modifyPassword").remove();
                $("body").append(modifyPasswordTmp());
                $("#modal-modifyPassword").modal("show");
                self.submitForm()
            })
        },
        modify2: function() {
            var self = this;
            $("header").on("click", "#modifyInfo", function() {
                var customerId = $(this).parent().data("customerid");
                var mobile = $(this).parent().data("mobile");
                var realName = $(this).parent().data("realname");
                $("body").find("#modal-modifyInfo").remove();
                $("body").append(modifyInfoTmp());
                $("#modal-modifyInfo").modal("show");
                $("#customerId").val(customerId);
                $("#mobile").val(mobile);
                $("#realName").val(realName);
                if (parentId == 0) {
                    self.submitInfoForm("parent")
                } else {
                    self.submitInfoForm("sub")
                }
            })
        },
        submitForm: function() {
            var self = this;
            $("#modifyPasswordForm").validate({
                debug: true,
                focusInvalid: false,
                onkeyup: false,
                onblur: true,
                submitHandler: function(form) {
                    $.ajax({
                        type: "post",
                        url: "/headShop/fixPassword.json",
                        data: $("#modifyPasswordForm").serialize(),
                        success: function(data, status, xhr) {
                            if (data.code == 0) {
                                self.tusi("修改成功");
                                $("#modal-modifyPassword").modal("hide");
                                self.getList(self.data)
                            } else {
                                self.tusi(data.error)
                            }
                        }
                    })
                },
                rules: {
                    olderPassword: {
                        required: true
                    },
                    newPassword: {
                        required: true,
                        minlength: 6
                    },
                    confirm: {
                        required: true,
                        equalTo: "#newPassword"
                    }
                },
                messages: {
                    olderPassword: {
                        required: "<i>*</i> 旧密码不能为空"
                    },
                    newPassword: {
                        required: "<i>*</i> 新密码不能为空",
                        minlength: "<i>*</i> 新密码至少为6位"
                    },
                    confirm: {
                        required: "<i>*</i> 确认新密码不能为空"
                    }
                }
            })
        },
        submitInfoForm: function(type) {
            var self = this;
            $("#modifyInfoForm").validate({
                debug: true,
                focusInvalid: false,
                onkeyup: false,
                onblur: true,
                submitHandler: function(form) {
                    $.ajax({
                        type: "post",
                        url: type == "parent" ? "/headShop/editSelfInfo.json" : "/subShop/editSelfInfo.json",
                        data: $("#modifyInfoForm").serialize(),
                        success: function(data, status, xhr) {
                            if (data.code == 0) {
                                $("#headerRealName").html($("#realName").val());
                                self.tusi("编辑成功");
                                $("#modal-modifyInfo").modal("hide")
                            } else {
                                self.tusi(data.error)
                            }
                        }
                    })
                },
                rules: {
                    mobile: {
                        required: true
                    },
                    realName: {
                        required: true,
                        maxlength: 10
                    }
                },
                messages: {
                    mobile: {
                        required: "<i>*</i> 电话号码不能为空"
                    },
                    realName: {
                        required: "<i>*</i> 姓名不能为空",
                        maxlength: "<i>*</i> 姓名长度最多是 10 的字符串"
                    }
                }
            })
        },
        getRoleList: function(roleName) {
            $.ajax({
                cache: false,
                type: "post",
                url: "/role/view.json",
                success: function(data) {
                    if (data.code == 0) {
                        var list = data.list;
                        var html = "";
                        for (var i = 0; i < list.length; i++) {
                            if (roleName == list[i].roleName) {
                                html += '<option value="' + list[i].roleId + '" selected>' + list[i].roleName + "</option>"
                            } else {
                                html += '<option value="' + list[i].roleId + '">' + list[i].roleName + "</option>"
                            }
                        }
                        $("#roleId").html(html)
                    } else {
                        self.tusi("获取角色失败,请刷新")
                    }
                }
            })
        },
        reloadVcode: function(element) {
            var vcodebtn = $(element),
                vcode = vcodebtn.parent().children(".checkCode"),
                initsrc = vcode.attr("src"),
                o;
            vcodebtn.on("click", function() {
                o = $(this), src = initsrc + "?t=" + Math.random();
                o.parent().children(".checkCode").attr("src", src)
            })
        },
        JPlaceHolder: function() {
            var _check = function() {
                    return "placeholder" in document.createElement("input")
                },
                init = function() {
                    if (!_check()) {
                        fix()
                    }
                },
                fix = function() {
                    jQuery(":input[placeholder]").each(function(index, element) {
                        var self = $(this),
                            txt = self.attr("placeholder");
                        self.wrap($("<div></div>").css({
                            position: "relative",
                            zoom: "1",
                            border: "none",
                            background: "none",
                            padding: "none",
                            margin: "none"
                        }));
                        var pos = self.position(),
                            h = self.outerHeight(true),
                            paddingleft = self.css("padding-left");
                        var holder = $('<span class="ie-placeholder"></span>').text(txt).css({
                            position: "absolute",
                            left: pos.left,
                            top: pos.top,
                            height: h,
                            lineHeight: h + "px",
                            paddingLeft: paddingleft,
                            color: "#969696"
                        }).appendTo(self.parent());
                        self.focusin(function(e) {
                            holder.hide()
                        }).focusout(function(e) {
                            if (!self.val()) {
                                holder.show()
                            }
                        });
                        holder.click(function(e) {
                            holder.hide();
                            self.focus()
                        })
                    })
                };
            init()
        },
        getUserInfo: function() {
            var self = this;
            var o = this;
            var defer = $.Deferred();
            $.ajax({
                type: "post",
                url: "/common/ajax/user.json",
                success: function(data, status, xhr) {
                    if (data.login == true) {} else {}
                    defer.resolve(data)
                },
                error: function(xhr, errorType, error) {
                    self.tusi(error)
                }
            });
            return defer.promise()
        },
        getUrlParam: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null
        },
        setUrlParam: function(url, ref, value) {
            var str = "";
            if (url.indexOf("?") != -1) str = url.substr(url.indexOf("?") + 1);
            else return url + "?" + ref + "=" + value;
            var returnurl = "";
            var setparam = "";
            var arr;
            var modify = "0";
            if (str.indexOf("&") != -1) {
                arr = str.split("&");
                for (i in arr) {
                    if (arr[i].split("=")[0] == ref) {
                        setparam = value;
                        modify = "1"
                    } else {
                        setparam = arr[i].split("=")[1]
                    }
                    returnurl = returnurl + arr[i].split("=")[0] + "=" + setparam + "&"
                }
                returnurl = returnurl.substr(0, returnurl.length - 1);
                if (modify == "0")
                    if (returnurl == str) returnurl = returnurl + "&" + ref + "=" + value
            } else {
                if (str.indexOf("=") != -1) {
                    arr = str.split("=");
                    if (arr[0] == ref) {
                        setparam = value;
                        modify = "1"
                    } else {
                        setparam = arr[1]
                    }
                    returnurl = arr[0] + "=" + setparam;
                    if (modify == "0")
                        if (returnurl == str) returnurl = returnurl + "&" + ref + "=" + value
                } else returnurl = ref + "=" + value
            }
            return url.substr(0, url.indexOf("?")) + "?" + returnurl
        },
        removeUrlParam: function(url, ref) {
            var str = "";
            if (url.indexOf("?") != -1) {
                str = url.substr(url.indexOf("?") + 1)
            } else {
                return url
            }
            var arr = "";
            var returnurl = "";
            var setparam = "";
            if (str.indexOf("&") != -1) {
                arr = str.split("&");
                for (i in arr) {
                    if (arr[i].split("=")[0] != ref) {
                        returnurl = returnurl + arr[i].split("=")[0] + "=" + arr[i].split("=")[1] + "&"
                    }
                }
                return url.substr(0, url.indexOf("?")) + "?" + returnurl.substr(0, returnurl.length - 1)
            } else {
                arr = str.split("=");
                if (arr[0] == ref) {
                    return url.substr(0, url.indexOf("?"))
                } else {
                    return url
                }
            }
        },
        getnewdate: function(ns) {
            var date = new Date(parseInt(ns));
            var Y = date.getFullYear() + "-";
            var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
            var D = date.getDate();
            return Y + M + D
        },
        formatDate2: function(time) {
            var timestamp3 = time;
            var newDate = new Date;
            newDate.setTime(timestamp3);
            return new newDate.toLocaleDateString
        },
        formatDate: function(datitem) {
            var tra = moment(datitem).format("YYYY-MM-DD");
            return tra
        },
        formatDateAll: function(datitem) {
            var tra = moment(datitem).format("YYYY-MM-DD HH:mm:ss");
            return tra
        },
        formatstatu: function(item, info) {
            if (info == 3) {
                return "身份证过期"
            } else {
                if (item == 1 || item == -20 || item == -10 || item == 10 || item == 20 || item == 40) {
                    return "验证通过"
                }
                if (item == -1) {
                    return "验证失败"
                }
            }
        },
        formatstatue: function(item, info) {
            if (item == 0) {
                return "识别通过"
            } else {
                if (info == -20) {
                    return "人工未通过"
                } else if (info >= 20) {
                    return "人工通过"
                } else if (info == -10) {
                    return "未通过"
                }
            }
        },
        formatstatues: function(item, info) {
            if (item == 0) {
                return "未校验"
            } else if (item == 1) {
                return "校验失败"
            } else if (item == 2) {
                return info
            }
        },
        displaynavbar: function() {
            var pngfix = $(".pngfix");
            pngfix.on("click", function() {
                if ($(this).hasClass("open")) {
                    $(this).removeClass("open");
                    $("body").removeClass("big-page")
                } else {
                    $(this).addClass("open");
                    $("body").addClass("big-page")
                }
            })
        },
        tusi: function(msg, delay) {
            var delay = delay || 2e3;
            $(".tusi").empty().remove();
            var tipdiv = "<span class='tusi'>" + msg + "</span>";
            $("body").append(tipdiv);
            $(".tusi").css("top", $(document).scrollTop() + ($(window).height() - $(".tusi").height()) / 2);
            $(".tusi").css("left", $(document).scrollLeft() + ($(window).width() - $(".tusi").width()) / 2);
            $(".tusi").show();
            setTimeout(function() {
                $(".tusi").hide()
            }, delay)
        },
        formatMoney: function(money) {
            return parseFloat(money / 100).toFixed(2)
        }
    }
});
define("xg/eid-company-zy/1.0.4/c/js/bootstrap-debug", [], function(require, exports, module) {
    if (typeof jQuery === "undefined") {
        throw new Error("Bootstrap's JavaScript requires jQuery")
    } + function($) {
        "use strict";
        var version = $.fn.jquery.split(" ")[0].split(".");
        if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1) {
            throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
        }
    }(jQuery); + function($) {
        "use strict";

        function transitionEnd() {
            var el = document.createElement("bootstrap");
            var transEndEventNames = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var name in transEndEventNames) {
                if (el.style[name] !== undefined) {
                    return {
                        end: transEndEventNames[name]
                    }
                }
            }
            return false
        }
        $.fn.emulateTransitionEnd = function(duration) {
            var called = false;
            var $el = this;
            $(this).one("bsTransitionEnd", function() {
                called = true
            });
            var callback = function() {
                if (!called) $($el).trigger($.support.transition.end)
            };
            setTimeout(callback, duration);
            return this
        };
        $(function() {
            $.support.transition = transitionEnd();
            if (!$.support.transition) return;
            $.event.special.bsTransitionEnd = {
                bindType: $.support.transition.end,
                delegateType: $.support.transition.end,
                handle: function(e) {
                    if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }
        })
    }(jQuery); + function($) {
        "use strict";
        var dismiss = '[data-dismiss="alert"]';
        var Alert = function(el) {
            $(el).on("click", dismiss, this.close)
        };
        Alert.VERSION = "3.3.5";
        Alert.TRANSITION_DURATION = 150;
        Alert.prototype.close = function(e) {
            var $this = $(this);
            var selector = $this.attr("data-target");
            if (!selector) {
                selector = $this.attr("href");
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")
            }
            var $parent = $(selector);
            if (e) e.preventDefault();
            if (!$parent.length) {
                $parent = $this.closest(".alert")
            }
            $parent.trigger(e = $.Event("close.bs.alert"));
            if (e.isDefaultPrevented()) return;
            $parent.removeClass("in");

            function removeElement() {
                $parent.detach().trigger("closed.bs.alert").remove()
            }
            $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement()
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.alert");
                if (!data) $this.data("bs.alert", data = new Alert(this));
                if (typeof option == "string") data[option].call($this)
            })
        }
        var old = $.fn.alert;
        $.fn.alert = Plugin;
        $.fn.alert.Constructor = Alert;
        $.fn.alert.noConflict = function() {
            $.fn.alert = old;
            return this
        };
        $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close)
    }(jQuery); + function($) {
        "use strict";
        var Button = function(element, options) {
            this.$element = $(element);
            this.options = $.extend({}, Button.DEFAULTS, options);
            this.isLoading = false
        };
        Button.VERSION = "3.3.5";
        Button.DEFAULTS = {
            loadingText: "loading..."
        };
        Button.prototype.setState = function(state) {
            var d = "disabled";
            var $el = this.$element;
            var val = $el.is("input") ? "val" : "html";
            var data = $el.data();
            state += "Text";
            if (data.resetText == null) $el.data("resetText", $el[val]());
            setTimeout($.proxy(function() {
                $el[val](data[state] == null ? this.options[state] : data[state]);
                if (state == "loadingText") {
                    this.isLoading = true;
                    $el.addClass(d).attr(d, d)
                } else if (this.isLoading) {
                    this.isLoading = false;
                    $el.removeClass(d).removeAttr(d)
                }
            }, this), 0)
        };
        Button.prototype.toggle = function() {
            var changed = true;
            var $parent = this.$element.closest('[data-toggle="buttons"]');
            if ($parent.length) {
                var $input = this.$element.find("input");
                if ($input.prop("type") == "radio") {
                    if ($input.prop("checked")) changed = false;
                    $parent.find(".active").removeClass("active");
                    this.$element.addClass("active")
                } else if ($input.prop("type") == "checkbox") {
                    if ($input.prop("checked") !== this.$element.hasClass("active")) changed = false;
                    this.$element.toggleClass("active")
                }
                $input.prop("checked", this.$element.hasClass("active"));
                if (changed) $input.trigger("change")
            } else {
                this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
                this.$element.toggleClass("active")
            }
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.button");
                var options = typeof option == "object" && option;
                if (!data) $this.data("bs.button", data = new Button(this, options));
                if (option == "toggle") data.toggle();
                else if (option) data.setState(option)
            })
        }
        var old = $.fn.button;
        $.fn.button = Plugin;
        $.fn.button.Constructor = Button;
        $.fn.button.noConflict = function() {
            $.fn.button = old;
            return this
        };
        $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            var $btn = $(e.target);
            if (!$btn.hasClass("btn")) $btn = $btn.closest(".btn");
            Plugin.call($btn, "toggle");
            if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
        })
    }(jQuery); + function($) {
        "use strict";
        var Carousel = function(element, options) {
            this.$element = $(element);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = options;
            this.paused = null;
            this.sliding = null;
            this.interval = null;
            this.$active = null;
            this.$items = null;
            this.options.keyboard && this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this));
            this.options.pause == "hover" && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this))
        };
        Carousel.VERSION = "3.3.5";
        Carousel.TRANSITION_DURATION = 600;
        Carousel.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: true,
            keyboard: true
        };
        Carousel.prototype.keydown = function(e) {
            if (/input|textarea/i.test(e.target.tagName)) return;
            switch (e.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            e.preventDefault()
        };
        Carousel.prototype.cycle = function(e) {
            e || (this.paused = false);
            this.interval && clearInterval(this.interval);
            this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
            return this
        };
        Carousel.prototype.getItemIndex = function(item) {
            this.$items = item.parent().children(".item");
            return this.$items.index(item || this.$active)
        };
        Carousel.prototype.getItemForDirection = function(direction, active) {
            var activeIndex = this.getItemIndex(active);
            var willWrap = direction == "prev" && activeIndex === 0 || direction == "next" && activeIndex == this.$items.length - 1;
            if (willWrap && !this.options.wrap) return active;
            var delta = direction == "prev" ? -1 : 1;
            var itemIndex = (activeIndex + delta) % this.$items.length;
            return this.$items.eq(itemIndex)
        };
        Carousel.prototype.to = function(pos) {
            var that = this;
            var activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            if (pos > this.$items.length - 1 || pos < 0) return;
            if (this.sliding) return this.$element.one("slid.bs.carousel", function() {
                that.to(pos)
            });
            if (activeIndex == pos) return this.pause().cycle();
            return this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos))
        };
        Carousel.prototype.pause = function(e) {
            e || (this.paused = true);
            if (this.$element.find(".next, .prev").length && $.support.transition) {
                this.$element.trigger($.support.transition.end);
                this.cycle(true)
            }
            this.interval = clearInterval(this.interval);
            return this
        };
        Carousel.prototype.next = function() {
            if (this.sliding) return;
            return this.slide("next")
        };
        Carousel.prototype.prev = function() {
            if (this.sliding) return;
            return this.slide("prev")
        };
        Carousel.prototype.slide = function(type, next) {
            var $active = this.$element.find(".item.active");
            var $next = next || this.getItemForDirection(type, $active);
            var isCycling = this.interval;
            var direction = type == "next" ? "left" : "right";
            var that = this;
            if ($next.hasClass("active")) return this.sliding = false;
            var relatedTarget = $next[0];
            var slideEvent = $.Event("slide.bs.carousel", {
                relatedTarget: relatedTarget,
                direction: direction
            });
            this.$element.trigger(slideEvent);
            if (slideEvent.isDefaultPrevented()) return;
            this.sliding = true;
            isCycling && this.pause();
            if (this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
                $nextIndicator && $nextIndicator.addClass("active")
            }
            var slidEvent = $.Event("slid.bs.carousel", {
                relatedTarget: relatedTarget,
                direction: direction
            });
            if ($.support.transition && this.$element.hasClass("slide")) {
                $next.addClass(type);
                $next[0].offsetWidth;
                $active.addClass(direction);
                $next.addClass(direction);
                $active.one("bsTransitionEnd", function() {
                    $next.removeClass([type, direction].join(" ")).addClass("active");
                    $active.removeClass(["active", direction].join(" "));
                    that.sliding = false;
                    setTimeout(function() {
                        that.$element.trigger(slidEvent)
                    }, 0)
                }).emulateTransitionEnd(Carousel.TRANSITION_DURATION)
            } else {
                $active.removeClass("active");
                $next.addClass("active");
                this.sliding = false;
                this.$element.trigger(slidEvent)
            }
            isCycling && this.cycle();
            return this
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.carousel");
                var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == "object" && option);
                var action = typeof option == "string" ? option : options.slide;
                if (!data) $this.data("bs.carousel", data = new Carousel(this, options));
                if (typeof option == "number") data.to(option);
                else if (action) data[action]();
                else if (options.interval) data.pause().cycle()
            })
        }
        var old = $.fn.carousel;
        $.fn.carousel = Plugin;
        $.fn.carousel.Constructor = Carousel;
        $.fn.carousel.noConflict = function() {
            $.fn.carousel = old;
            return this
        };
        var clickHandler = function(e) {
            var href;
            var $this = $(this);
            var $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
            if (!$target.hasClass("carousel")) return;
            var options = $.extend({}, $target.data(), $this.data());
            var slideIndex = $this.attr("data-slide-to");
            if (slideIndex) options.interval = false;
            Plugin.call($target, options);
            if (slideIndex) {
                $target.data("bs.carousel").to(slideIndex)
            }
            e.preventDefault()
        };
        $(document).on("click.bs.carousel.data-api", "[data-slide]", clickHandler).on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler);
        $(window).on("load", function() {
            $('[data-ride="carousel"]').each(function() {
                var $carousel = $(this);
                Plugin.call($carousel, $carousel.data())
            })
        })
    }(jQuery); + function($) {
        "use strict";
        var Collapse = function(element, options) {
            this.$element = $(element);
            this.options = $.extend({}, Collapse.DEFAULTS, options);
            this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
            this.transitioning = null;
            if (this.options.parent) {
                this.$parent = this.getParent()
            } else {
                this.addAriaAndCollapsedClass(this.$element, this.$trigger)
            }
            if (this.options.toggle) this.toggle()
        };
        Collapse.VERSION = "3.3.5";
        Collapse.TRANSITION_DURATION = 350;
        Collapse.DEFAULTS = {
            toggle: true
        };
        Collapse.prototype.dimension = function() {
            var hasWidth = this.$element.hasClass("width");
            return hasWidth ? "width" : "height"
        };
        Collapse.prototype.show = function() {
            if (this.transitioning || this.$element.hasClass("in")) return;
            var activesData;
            var actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (actives && actives.length) {
                activesData = actives.data("bs.collapse");
                if (activesData && activesData.transitioning) return
            }
            var startEvent = $.Event("show.bs.collapse");
            this.$element.trigger(startEvent);
            if (startEvent.isDefaultPrevented()) return;
            if (actives && actives.length) {
                Plugin.call(actives, "hide");
                activesData || actives.data("bs.collapse", null)
            }
            var dimension = this.dimension();
            this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", true);
            this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
            this.transitioning = 1;
            var complete = function() {
                this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("");
                this.transitioning = 0;
                this.$element.trigger("shown.bs.collapse")
            };
            if (!$.support.transition) return complete.call(this);
            var scrollSize = $.camelCase(["scroll", dimension].join("-"));
            this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
        };
        Collapse.prototype.hide = function() {
            if (this.transitioning || !this.$element.hasClass("in")) return;
            var startEvent = $.Event("hide.bs.collapse");
            this.$element.trigger(startEvent);
            if (startEvent.isDefaultPrevented()) return;
            var dimension = this.dimension();
            this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
            this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
            this.$trigger.addClass("collapsed").attr("aria-expanded", false);
            this.transitioning = 1;
            var complete = function() {
                this.transitioning = 0;
                this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
            };
            if (!$.support.transition) return complete.call(this);
            this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)
        };
        Collapse.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        };
        Collapse.prototype.getParent = function() {
            return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
                var $element = $(element);
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
            }, this)).end()
        };
        Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
            var isOpen = $element.hasClass("in");
            $element.attr("aria-expanded", isOpen);
            $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen)
        };

        function getTargetFromTrigger($trigger) {
            var href;
            var target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
            return $(target)
        }

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.collapse");
                var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == "object" && option);
                if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
                if (!data) $this.data("bs.collapse", data = new Collapse(this, options));
                if (typeof option == "string") data[option]()
            })
        }
        var old = $.fn.collapse;
        $.fn.collapse = Plugin;
        $.fn.collapse.Constructor = Collapse;
        $.fn.collapse.noConflict = function() {
            $.fn.collapse = old;
            return this
        };
        $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
            var $this = $(this);
            if (!$this.attr("data-target")) e.preventDefault();
            var $target = getTargetFromTrigger($this);
            var data = $target.data("bs.collapse");
            var option = data ? "toggle" : $this.data();
            Plugin.call($target, option)
        })
    }(jQuery); + function($) {
        "use strict";
        var backdrop = ".dropdown-backdrop";
        var toggle = '[data-toggle="dropdown"]';
        var Dropdown = function(element) {
            $(element).on("click.bs.dropdown", this.toggle)
        };
        Dropdown.VERSION = "3.3.5";

        function getParent($this) {
            var selector = $this.attr("data-target");
            if (!selector) {
                selector = $this.attr("href");
                selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "")
            }
            var $parent = selector && $(selector);
            return $parent && $parent.length ? $parent : $this.parent()
        }

        function clearMenus(e) {
            if (e && e.which === 3) return;
            $(backdrop).remove();
            $(toggle).each(function() {
                var $this = $(this);
                var $parent = getParent($this);
                var relatedTarget = {
                    relatedTarget: this
                };
                if (!$parent.hasClass("open")) return;
                if (e && e.type == "click" && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;
                $parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget));
                if (e.isDefaultPrevented()) return;
                $this.attr("aria-expanded", "false");
                $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget)
            })
        }
        Dropdown.prototype.toggle = function(e) {
            var $this = $(this);
            if ($this.is(".disabled, :disabled")) return;
            var $parent = getParent($this);
            var isActive = $parent.hasClass("open");
            clearMenus();
            if (!isActive) {
                if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
                    $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus)
                }
                var relatedTarget = {
                    relatedTarget: this
                };
                $parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget));
                if (e.isDefaultPrevented()) return;
                $this.trigger("focus").attr("aria-expanded", "true");
                $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget)
            }
            return false
        };
        Dropdown.prototype.keydown = function(e) {
            if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
            var $this = $(this);
            e.preventDefault();
            e.stopPropagation();
            if ($this.is(".disabled, :disabled")) return;
            var $parent = getParent($this);
            var isActive = $parent.hasClass("open");
            if (!isActive && e.which != 27 || isActive && e.which == 27) {
                if (e.which == 27) $parent.find(toggle).trigger("focus");
                return $this.trigger("click")
            }
            var desc = " li:not(.disabled):visible a";
            var $items = $parent.find(".dropdown-menu" + desc);
            if (!$items.length) return;
            var index = $items.index(e.target);
            if (e.which == 38 && index > 0) index--;
            if (e.which == 40 && index < $items.length - 1) index++;
            if (!~index) index = 0;
            $items.eq(index).trigger("focus")
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.dropdown");
                if (!data) $this.data("bs.dropdown", data = new Dropdown(this));
                if (typeof option == "string") data[option].call($this)
            })
        }
        var old = $.fn.dropdown;
        $.fn.dropdown = Plugin;
        $.fn.dropdown.Constructor = Dropdown;
        $.fn.dropdown.noConflict = function() {
            $.fn.dropdown = old;
            return this
        };
        $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
            e.stopPropagation()
        }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown)
    }(jQuery); + function($) {
        "use strict";
        var Modal = function(element, options) {
            this.options = options;
            this.$body = $(document.body);
            this.$element = $(element);
            this.$dialog = this.$element.find(".modal-dialog");
            this.$backdrop = null;
            this.isShown = null;
            this.originalBodyPad = null;
            this.scrollbarWidth = 0;
            this.ignoreBackdropClick = false;
            if (this.options.remote) {
                this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
                    this.$element.trigger("loaded.bs.modal")
                }, this))
            }
        };
        Modal.VERSION = "3.3.5";
        Modal.TRANSITION_DURATION = 300;
        Modal.BACKDROP_TRANSITION_DURATION = 150;
        Modal.DEFAULTS = {
            backdrop: true,
            keyboard: true,
            show: true
        };
        Modal.prototype.toggle = function(_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget)
        };
        Modal.prototype.show = function(_relatedTarget) {
            var that = this;
            var e = $.Event("show.bs.modal", {
                relatedTarget: _relatedTarget
            });
            this.$element.trigger(e);
            if (this.isShown || e.isDefaultPrevented()) return;
            this.isShown = true;
            this.checkScrollbar();
            this.setScrollbar();
            this.$body.addClass("modal-open");
            this.escape();
            this.resize();
            this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
            this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                that.$element.one("mouseup.dismiss.bs.modal", function(e) {
                    if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
                })
            });
            this.backdrop(function() {
                var transition = $.support.transition && that.$element.hasClass("fade");
                if (!that.$element.parent().length) {
                    that.$element.appendTo(that.$body)
                }
                that.$element.show().scrollTop(0);
                that.adjustDialog();
                if (transition) {
                    that.$element[0].offsetWidth
                }
                that.$element.addClass("in");
                that.enforceFocus();
                var e = $.Event("shown.bs.modal", {
                    relatedTarget: _relatedTarget
                });
                transition ? that.$dialog.one("bsTransitionEnd", function() {
                    that.$element.trigger("focus").trigger(e)
                }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e)
            })
        };
        Modal.prototype.hide = function(e) {
            if (e) e.preventDefault();
            e = $.Event("hide.bs.modal");
            this.$element.trigger(e);
            if (!this.isShown || e.isDefaultPrevented()) return;
            this.isShown = false;
            this.escape();
            this.resize();
            $(document).off("focusin.bs.modal");
            this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
            this.$dialog.off("mousedown.dismiss.bs.modal");
            $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal()
        };
        Modal.prototype.enforceFocus = function() {
            $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger("focus")
                }
            }, this))
        };
        Modal.prototype.escape = function() {
            if (this.isShown && this.options.keyboard) {
                this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
                    e.which == 27 && this.hide()
                }, this))
            } else if (!this.isShown) {
                this.$element.off("keydown.dismiss.bs.modal")
            }
        };
        Modal.prototype.resize = function() {
            if (this.isShown) {
                $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this))
            } else {
                $(window).off("resize.bs.modal")
            }
        };
        Modal.prototype.hideModal = function() {
            var that = this;
            this.$element.hide();
            this.backdrop(function() {
                that.$body.removeClass("modal-open");
                that.resetAdjustments();
                that.resetScrollbar();
                that.$element.trigger("hidden.bs.modal")
            })
        };
        Modal.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null
        };
        Modal.prototype.backdrop = function(callback) {
            var that = this;
            var animate = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body);
                this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                    if (this.ignoreBackdropClick) {
                        this.ignoreBackdropClick = false;
                        return
                    }
                    if (e.target !== e.currentTarget) return;
                    this.options.backdrop == "static" ? this.$element[0].focus() : this.hide()
                }, this));
                if (doAnimate) this.$backdrop[0].offsetWidth;
                this.$backdrop.addClass("in");
                if (!callback) return;
                doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var callbackRemove = function() {
                    that.removeBackdrop();
                    callback && callback()
                };
                $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove()
            } else if (callback) {
                callback()
            }
        };
        Modal.prototype.handleUpdate = function() {
            this.adjustDialog()
        };
        Modal.prototype.adjustDialog = function() {
            var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
            })
        };
        Modal.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            })
        };
        Modal.prototype.checkScrollbar = function() {
            var fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) {
                var documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
            this.scrollbarWidth = this.measureScrollbar()
        };
        Modal.prototype.setScrollbar = function() {
            var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "";
            if (this.bodyIsOverflowing) this.$body.css("padding-right", bodyPad + this.scrollbarWidth)
        };
        Modal.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", this.originalBodyPad)
        };
        Modal.prototype.measureScrollbar = function() {
            var scrollDiv = document.createElement("div");
            scrollDiv.className = "modal-scrollbar-measure";
            this.$body.append(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            this.$body[0].removeChild(scrollDiv);
            return scrollbarWidth
        };

        function Plugin(option, _relatedTarget) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.modal");
                var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == "object" && option);
                if (!data) $this.data("bs.modal", data = new Modal(this, options));
                if (typeof option == "string") data[option](_relatedTarget);
                else if (options.show) data.show(_relatedTarget)
            })
        }
        var old = $.fn.modal;
        $.fn.modal = Plugin;
        $.fn.modal.Constructor = Modal;
        $.fn.modal.noConflict = function() {
            $.fn.modal = old;
            return this
        };
        $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var $this = $(this);
            var href = $this.attr("href");
            var $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, ""));
            var option = $target.data("bs.modal") ? "toggle" : $.extend({
                remote: !/#/.test(href) && href
            }, $target.data(), $this.data());
            if ($this.is("a")) e.preventDefault();
            $target.one("show.bs.modal", function(showEvent) {
                if (showEvent.isDefaultPrevented()) return;
                $target.one("hidden.bs.modal", function() {
                    $this.is(":visible") && $this.trigger("focus")
                })
            });
            Plugin.call($target, option, this)
        })
    }(jQuery); + function($) {
        "use strict";
        var Tooltip = function(element, options) {
            this.type = null;
            this.options = null;
            this.enabled = null;
            this.timeout = null;
            this.hoverState = null;
            this.$element = null;
            this.inState = null;
            this.init("tooltip", element, options)
        };
        Tooltip.VERSION = "3.3.5";
        Tooltip.TRANSITION_DURATION = 150;
        Tooltip.DEFAULTS = {
            animation: true,
            placement: "top",
            selector: false,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: false,
            container: false,
            viewport: {
                selector: "body",
                padding: 0
            }
        };
        Tooltip.prototype.init = function(type, element, options) {
            this.enabled = true;
            this.type = type;
            this.$element = $(element);
            this.options = this.getOptions(options);
            this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
            this.inState = {
                click: false,
                hover: false,
                focus: false
            };
            if (this.$element[0] instanceof document.constructor && !this.options.selector) {
                throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!")
            }
            var triggers = this.options.trigger.split(" ");
            for (var i = triggers.length; i--;) {
                var trigger = triggers[i];
                if (trigger == "click") {
                    this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this))
                } else if (trigger != "manual") {
                    var eventIn = trigger == "hover" ? "mouseenter" : "focusin";
                    var eventOut = trigger == "hover" ? "mouseleave" : "focusout";
                    this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
                    this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = $.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        };
        Tooltip.prototype.getDefaults = function() {
            return Tooltip.DEFAULTS
        };
        Tooltip.prototype.getOptions = function(options) {
            options = $.extend({}, this.getDefaults(), this.$element.data(), options);
            if (options.delay && typeof options.delay == "number") {
                options.delay = {
                    show: options.delay,
                    hide: options.delay
                }
            }
            return options
        };
        Tooltip.prototype.getDelegateOptions = function() {
            var options = {};
            var defaults = this.getDefaults();
            this._options && $.each(this._options, function(key, value) {
                if (defaults[key] != value) options[key] = value
            });
            return options
        };
        Tooltip.prototype.enter = function(obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
            if (!self) {
                self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
                $(obj.currentTarget).data("bs." + this.type, self)
            }
            if (obj instanceof $.Event) {
                self.inState[obj.type == "focusin" ? "focus" : "hover"] = true
            }
            if (self.tip().hasClass("in") || self.hoverState == "in") {
                self.hoverState = "in";
                return
            }
            clearTimeout(self.timeout);
            self.hoverState = "in";
            if (!self.options.delay || !self.options.delay.show) return self.show();
            self.timeout = setTimeout(function() {
                if (self.hoverState == "in") self.show()
            }, self.options.delay.show)
        };
        Tooltip.prototype.isInStateTrue = function() {
            for (var key in this.inState) {
                if (this.inState[key]) return true
            }
            return false
        };
        Tooltip.prototype.leave = function(obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
            if (!self) {
                self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
                $(obj.currentTarget).data("bs." + this.type, self)
            }
            if (obj instanceof $.Event) {
                self.inState[obj.type == "focusout" ? "focus" : "hover"] = false
            }
            if (self.isInStateTrue()) return;
            clearTimeout(self.timeout);
            self.hoverState = "out";
            if (!self.options.delay || !self.options.delay.hide) return self.hide();
            self.timeout = setTimeout(function() {
                if (self.hoverState == "out") self.hide()
            }, self.options.delay.hide)
        };
        Tooltip.prototype.show = function() {
            var e = $.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(e);
                var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (e.isDefaultPrevented() || !inDom) return;
                var that = this;
                var $tip = this.tip();
                var tipId = this.getUID(this.type);
                this.setContent();
                $tip.attr("id", tipId);
                this.$element.attr("aria-describedby", tipId);
                if (this.options.animation) $tip.addClass("fade");
                var placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
                var autoToken = /\s?auto?\s?/i;
                var autoPlace = autoToken.test(placement);
                if (autoPlace) placement = placement.replace(autoToken, "") || "top";
                $tip.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(placement).data("bs." + this.type, this);
                this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
                this.$element.trigger("inserted.bs." + this.type);
                var pos = this.getPosition();
                var actualWidth = $tip[0].offsetWidth;
                var actualHeight = $tip[0].offsetHeight;
                if (autoPlace) {
                    var orgPlacement = placement;
                    var viewportDim = this.getPosition(this.$viewport);
                    placement = placement == "bottom" && pos.bottom + actualHeight > viewportDim.bottom ? "top" : placement == "top" && pos.top - actualHeight < viewportDim.top ? "bottom" : placement == "right" && pos.right + actualWidth > viewportDim.width ? "left" : placement == "left" && pos.left - actualWidth < viewportDim.left ? "right" : placement;
                    $tip.removeClass(orgPlacement).addClass(placement)
                }
                var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
                this.applyPlacement(calculatedOffset, placement);
                var complete = function() {
                    var prevHoverState = that.hoverState;
                    that.$element.trigger("shown.bs." + that.type);
                    that.hoverState = null;
                    if (prevHoverState == "out") that.leave(that)
                };
                $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete()
            }
        };
        Tooltip.prototype.applyPlacement = function(offset, placement) {
            var $tip = this.tip();
            var width = $tip[0].offsetWidth;
            var height = $tip[0].offsetHeight;
            var marginTop = parseInt($tip.css("margin-top"), 10);
            var marginLeft = parseInt($tip.css("margin-left"), 10);
            if (isNaN(marginTop)) marginTop = 0;
            if (isNaN(marginLeft)) marginLeft = 0;
            offset.top += marginTop;
            offset.left += marginLeft;
            $.offset.setOffset($tip[0], $.extend({
                using: function(props) {
                    $tip.css({
                        top: Math.round(props.top),
                        left: Math.round(props.left)
                    })
                }
            }, offset), 0);
            $tip.addClass("in");
            var actualWidth = $tip[0].offsetWidth;
            var actualHeight = $tip[0].offsetHeight;
            if (placement == "top" && actualHeight != height) {
                offset.top = offset.top + height - actualHeight
            }
            var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
            if (delta.left) offset.left += delta.left;
            else offset.top += delta.top;
            var isVertical = /top|bottom/.test(placement);
            var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
            var arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
            $tip.offset(offset);
            this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
        };
        Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
            this.arrow().css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isVertical ? "top" : "left", "")
        };
        Tooltip.prototype.setContent = function() {
            var $tip = this.tip();
            var title = this.getTitle();
            $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
            $tip.removeClass("fade in top bottom left right")
        };
        Tooltip.prototype.hide = function(callback) {
            var that = this;
            var $tip = $(this.$tip);
            var e = $.Event("hide.bs." + this.type);

            function complete() {
                if (that.hoverState != "in") $tip.detach();
                that.$element.removeAttr("aria-describedby").trigger("hidden.bs." + that.type);
                callback && callback()
            }
            this.$element.trigger(e);
            if (e.isDefaultPrevented()) return;
            $tip.removeClass("in");
            $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
            this.hoverState = null;
            return this
        };
        Tooltip.prototype.fixTitle = function() {
            var $e = this.$element;
            if ($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
                $e.attr("data-original-title", $e.attr("title") || "").attr("title", "")
            }
        };
        Tooltip.prototype.hasContent = function() {
            return this.getTitle()
        };
        Tooltip.prototype.getPosition = function($element) {
            $element = $element || this.$element;
            var el = $element[0];
            var isBody = el.tagName == "BODY";
            var elRect = el.getBoundingClientRect();
            if (elRect.width == null) {
                elRect = $.extend({}, elRect, {
                    width: elRect.right - elRect.left,
                    height: elRect.bottom - elRect.top
                })
            }
            var elOffset = isBody ? {
                top: 0,
                left: 0
            } : $element.offset();
            var scroll = {
                scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
            };
            var outerDims = isBody ? {
                width: $(window).width(),
                height: $(window).height()
            } : null;
            return $.extend({}, elRect, scroll, outerDims, elOffset)
        };
        Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
            return placement == "bottom" ? {
                top: pos.top + pos.height,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : placement == "top" ? {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : placement == "left" ? {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left - actualWidth
            } : {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left + pos.width
            }
        };
        Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
            var delta = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return delta;
            var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
            var viewportDimensions = this.getPosition(this.$viewport);
            if (/right|left/.test(placement)) {
                var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
                var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
                if (topEdgeOffset < viewportDimensions.top) {
                    delta.top = viewportDimensions.top - topEdgeOffset
                } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
                    delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
                }
            } else {
                var leftEdgeOffset = pos.left - viewportPadding;
                var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
                if (leftEdgeOffset < viewportDimensions.left) {
                    delta.left = viewportDimensions.left - leftEdgeOffset
                } else if (rightEdgeOffset > viewportDimensions.right) {
                    delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
                }
            }
            return delta
        };
        Tooltip.prototype.getTitle = function() {
            var title;
            var $e = this.$element;
            var o = this.options;
            title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
            return title
        };
        Tooltip.prototype.getUID = function(prefix) {
            do prefix += ~~(Math.random() * 1e6); while (document.getElementById(prefix));
            return prefix
        };
        Tooltip.prototype.tip = function() {
            if (!this.$tip) {
                this.$tip = $(this.options.template);
                if (this.$tip.length != 1) {
                    throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!")
                }
            }
            return this.$tip
        };
        Tooltip.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        };
        Tooltip.prototype.enable = function() {
            this.enabled = true
        };
        Tooltip.prototype.disable = function() {
            this.enabled = false
        };
        Tooltip.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        };
        Tooltip.prototype.toggle = function(e) {
            var self = this;
            if (e) {
                self = $(e.currentTarget).data("bs." + this.type);
                if (!self) {
                    self = new this.constructor(e.currentTarget, this.getDelegateOptions());
                    $(e.currentTarget).data("bs." + this.type, self)
                }
            }
            if (e) {
                self.inState.click = !self.inState.click;
                if (self.isInStateTrue()) self.enter(self);
                else self.leave(self)
            } else {
                self.tip().hasClass("in") ? self.leave(self) : self.enter(self)
            }
        };
        Tooltip.prototype.destroy = function() {
            var that = this;
            clearTimeout(this.timeout);
            this.hide(function() {
                that.$element.off("." + that.type).removeData("bs." + that.type);
                if (that.$tip) {
                    that.$tip.detach()
                }
                that.$tip = null;
                that.$arrow = null;
                that.$viewport = null
            })
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.tooltip");
                var options = typeof option == "object" && option;
                if (!data && /destroy|hide/.test(option)) return;
                if (!data) $this.data("bs.tooltip", data = new Tooltip(this, options));
                if (typeof option == "string") data[option]()
            })
        }
        var old = $.fn.tooltip;
        $.fn.tooltip = Plugin;
        $.fn.tooltip.Constructor = Tooltip;
        $.fn.tooltip.noConflict = function() {
            $.fn.tooltip = old;
            return this
        }
    }(jQuery); + function($) {
        "use strict";
        var Popover = function(element, options) {
            this.init("popover", element, options)
        };
        if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
        Popover.VERSION = "3.3.5";
        Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        });
        Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
        Popover.prototype.constructor = Popover;
        Popover.prototype.getDefaults = function() {
            return Popover.DEFAULTS
        };
        Popover.prototype.setContent = function() {
            var $tip = this.tip();
            var title = this.getTitle();
            var content = this.getContent();
            $tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
            $tip.find(".popover-content").children().detach().end()[this.options.html ? typeof content == "string" ? "html" : "append" : "text"](content);
            $tip.removeClass("fade top bottom left right in");
            if (!$tip.find(".popover-title").html()) $tip.find(".popover-title").hide()
        };
        Popover.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        };
        Popover.prototype.getContent = function() {
            var $e = this.$element;
            var o = this.options;
            return $e.attr("data-content") || (typeof o.content == "function" ? o.content.call($e[0]) : o.content)
        };
        Popover.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.popover");
                var options = typeof option == "object" && option;
                if (!data && /destroy|hide/.test(option)) return;
                if (!data) $this.data("bs.popover", data = new Popover(this, options));
                if (typeof option == "string") data[option]()
            })
        }
        var old = $.fn.popover;
        $.fn.popover = Plugin;
        $.fn.popover.Constructor = Popover;
        $.fn.popover.noConflict = function() {
            $.fn.popover = old;
            return this
        }
    }(jQuery); + function($) {
        "use strict";

        function ScrollSpy(element, options) {
            this.$body = $(document.body);
            this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
            this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
            this.selector = (this.options.target || "") + " .nav li > a";
            this.offsets = [];
            this.targets = [];
            this.activeTarget = null;
            this.scrollHeight = 0;
            this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this));
            this.refresh();
            this.process()
        }
        ScrollSpy.VERSION = "3.3.5";
        ScrollSpy.DEFAULTS = {
            offset: 10
        };
        ScrollSpy.prototype.getScrollHeight = function() {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
        };
        ScrollSpy.prototype.refresh = function() {
            var that = this;
            var offsetMethod = "offset";
            var offsetBase = 0;
            this.offsets = [];
            this.targets = [];
            this.scrollHeight = this.getScrollHeight();
            if (!$.isWindow(this.$scrollElement[0])) {
                offsetMethod = "position";
                offsetBase = this.$scrollElement.scrollTop()
            }
            this.$body.find(this.selector).map(function() {
                var $el = $(this);
                var href = $el.data("target") || $el.attr("href");
                var $href = /^#./.test(href) && $(href);
                return $href && $href.length && $href.is(":visible") && [
                    [$href[offsetMethod]().top + offsetBase, href]
                ] || null
            }).sort(function(a, b) {
                return a[0] - b[0]
            }).each(function() {
                that.offsets.push(this[0]);
                that.targets.push(this[1])
            })
        };
        ScrollSpy.prototype.process = function() {
            var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
            var scrollHeight = this.getScrollHeight();
            var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
            var offsets = this.offsets;
            var targets = this.targets;
            var activeTarget = this.activeTarget;
            var i;
            if (this.scrollHeight != scrollHeight) {
                this.refresh()
            }
            if (scrollTop >= maxScroll) {
                return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
            }
            if (activeTarget && scrollTop < offsets[0]) {
                this.activeTarget = null;
                return this.clear()
            }
            for (i = offsets.length; i--;) {
                activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i])
            }
        };
        ScrollSpy.prototype.activate = function(target) {
            this.activeTarget = target;
            this.clear();
            var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
            var active = $(selector).parents("li").addClass("active");
            if (active.parent(".dropdown-menu").length) {
                active = active.closest("li.dropdown").addClass("active")
            }
            active.trigger("activate.bs.scrollspy")
        };
        ScrollSpy.prototype.clear = function() {
            $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.scrollspy");
                var options = typeof option == "object" && option;
                if (!data) $this.data("bs.scrollspy", data = new ScrollSpy(this, options));
                if (typeof option == "string") data[option]()
            })
        }
        var old = $.fn.scrollspy;
        $.fn.scrollspy = Plugin;
        $.fn.scrollspy.Constructor = ScrollSpy;
        $.fn.scrollspy.noConflict = function() {
            $.fn.scrollspy = old;
            return this
        };
        $(window).on("load.bs.scrollspy.data-api", function() {
            $('[data-spy="scroll"]').each(function() {
                var $spy = $(this);
                Plugin.call($spy, $spy.data())
            })
        })
    }(jQuery); + function($) {
        "use strict";
        var Tab = function(element) {
            this.element = $(element)
        };
        Tab.VERSION = "3.3.5";
        Tab.TRANSITION_DURATION = 150;
        Tab.prototype.show = function() {
            var $this = this.element;
            var $ul = $this.closest("ul:not(.dropdown-menu)");
            var selector = $this.data("target");
            if (!selector) {
                selector = $this.attr("href");
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")
            }
            if ($this.parent("li").hasClass("active")) return;
            var $previous = $ul.find(".active:last a");
            var hideEvent = $.Event("hide.bs.tab", {
                relatedTarget: $this[0]
            });
            var showEvent = $.Event("show.bs.tab", {
                relatedTarget: $previous[0]
            });
            $previous.trigger(hideEvent);
            $this.trigger(showEvent);
            if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
            var $target = $(selector);
            this.activate($this.closest("li"), $ul);
            this.activate($target, $target.parent(), function() {
                $previous.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: $this[0]
                });
                $this.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: $previous[0]
                })
            })
        };
        Tab.prototype.activate = function(element, container, callback) {
            var $active = container.find("> .active");
            var transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);

            function next() {
                $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", false);
                element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", true);
                if (transition) {
                    element[0].offsetWidth;
                    element.addClass("in")
                } else {
                    element.removeClass("fade")
                }
                if (element.parent(".dropdown-menu").length) {
                    element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", true)
                }
                callback && callback()
            }
            $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
            $active.removeClass("in")
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.tab");
                if (!data) $this.data("bs.tab", data = new Tab(this));
                if (typeof option == "string") data[option]()
            })
        }
        var old = $.fn.tab;
        $.fn.tab = Plugin;
        $.fn.tab.Constructor = Tab;
        $.fn.tab.noConflict = function() {
            $.fn.tab = old;
            return this
        };
        var clickHandler = function(e) {
            e.preventDefault();
            Plugin.call($(this), "show")
        };
        $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler)
    }(jQuery); + function($) {
        "use strict";
        var Affix = function(element, options) {
            this.options = $.extend({}, Affix.DEFAULTS, options);
            this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this));
            this.$element = $(element);
            this.affixed = null;
            this.unpin = null;
            this.pinnedOffset = null;
            this.checkPosition()
        };
        Affix.VERSION = "3.3.5";
        Affix.RESET = "affix affix-top affix-bottom";
        Affix.DEFAULTS = {
            offset: 0,
            target: window
        };
        Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
            var scrollTop = this.$target.scrollTop();
            var position = this.$element.offset();
            var targetHeight = this.$target.height();
            if (offsetTop != null && this.affixed == "top") return scrollTop < offsetTop ? "top" : false;
            if (this.affixed == "bottom") {
                if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : "bottom";
                return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : "bottom"
            }
            var initializing = this.affixed == null;
            var colliderTop = initializing ? scrollTop : position.top;
            var colliderHeight = initializing ? targetHeight : height;
            if (offsetTop != null && scrollTop <= offsetTop) return "top";
            if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return "bottom";
            return false
        };
        Affix.prototype.getPinnedOffset = function() {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(Affix.RESET).addClass("affix");
            var scrollTop = this.$target.scrollTop();
            var position = this.$element.offset();
            return this.pinnedOffset = position.top - scrollTop
        };
        Affix.prototype.checkPositionWithEventLoop = function() {
            setTimeout($.proxy(this.checkPosition, this), 1)
        };
        Affix.prototype.checkPosition = function() {
            if (!this.$element.is(":visible")) return;
            var height = this.$element.height();
            var offset = this.options.offset;
            var offsetTop = offset.top;
            var offsetBottom = offset.bottom;
            var scrollHeight = Math.max($(document).height(), $(document.body).height());
            if (typeof offset != "object") offsetBottom = offsetTop = offset;
            if (typeof offsetTop == "function") offsetTop = offset.top(this.$element);
            if (typeof offsetBottom == "function") offsetBottom = offset.bottom(this.$element);
            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
            if (this.affixed != affix) {
                if (this.unpin != null) this.$element.css("top", "");
                var affixType = "affix" + (affix ? "-" + affix : "");
                var e = $.Event(affixType + ".bs.affix");
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) return;
                this.affixed = affix;
                this.unpin = affix == "bottom" ? this.getPinnedOffset() : null;
                this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix")
            }
            if (affix == "bottom") {
                this.$element.offset({
                    top: scrollHeight - height - offsetBottom
                })
            }
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.affix");
                var options = typeof option == "object" && option;
                if (!data) $this.data("bs.affix", data = new Affix(this, options));
                if (typeof option == "string") data[option]()
            })
        }
        var old = $.fn.affix;
        $.fn.affix = Plugin;
        $.fn.affix.Constructor = Affix;
        $.fn.affix.noConflict = function() {
            $.fn.affix = old;
            return this
        };
        $(window).on("load", function() {
            $('[data-spy="affix"]').each(function() {
                var $spy = $(this);
                var data = $spy.data();
                data.offset = data.offset || {};
                if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
                if (data.offsetTop != null) data.offset.top = data.offsetTop;
                Plugin.call($spy, data)
            })
        })
    }(jQuery)
});
define("xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate", [], function(require, exports, module) {
    (function(factory) {
        if (typeof define === "function" && define.amd) {
            define(["jquery"], factory)
        } else {
            factory(jQuery)
        }
    })(function($) {
        $.extend($.fn, {
            validate: function(options) {
                if (!this.length) {
                    if (options && options.debug && window.console) {
                        console.warn("Nothing selected, can't validate, returning nothing.")
                    }
                    return
                }
                var validator = $.data(this[0], "validator");
                if (validator) {
                    return validator
                }
                this.attr("novalidate", "novalidate");
                validator = new $.validator(options, this[0]);
                $.data(this[0], "validator", validator);
                if (validator.settings.onsubmit) {
                    this.validateDelegate(":submit", "click", function(event) {
                        if (validator.settings.submitHandler) {
                            validator.submitButton = event.target
                        }
                        if ($(event.target).hasClass("cancel")) {
                            validator.cancelSubmit = true
                        }
                        if ($(event.target).attr("formnovalidate") === "formnovalidate") {
                            validator.cancelSubmit = true
                        }
                    });
                    this.submit(function(event) {
                        if (validator.settings.debug) {
                            event.preventDefault()
                        }

                        function handle() {
                            var hidden, result;
                            if (validator.settings.submitHandler) {
                                if (validator.submitButton) {
                                    hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm)
                                }
                                result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
                                if (validator.submitButton) {
                                    hidden.remove()
                                }
                                if (result !== undefined) {
                                    return result
                                }
                                return false
                            }
                            return true
                        }
                        if (validator.cancelSubmit) {
                            validator.cancelSubmit = false;
                            return handle()
                        }
                        if (validator.form()) {
                            if (validator.pendingRequest) {
                                validator.formSubmitted = true;
                                return false
                            }
                            return handle()
                        } else {
                            validator.focusInvalid();
                            return false
                        }
                    })
                }
                return validator
            },
            valid: function() {
                var valid, validator;
                if ($(this[0]).is("form")) {
                    valid = this.validate().form()
                } else {
                    valid = true;
                    validator = $(this[0].form).validate();
                    this.each(function() {
                        valid = validator.element(this) && valid
                    })
                }
                return valid
            },
            removeAttrs: function(attributes) {
                var result = {},
                    $element = this;
                $.each(attributes.split(/\s/), function(index, value) {
                    result[value] = $element.attr(value);
                    $element.removeAttr(value)
                });
                return result
            },
            rules: function(command, argument) {
                var element = this[0],
                    settings, staticRules, existingRules, data, param, filtered;
                if (command) {
                    settings = $.data(element.form, "validator").settings;
                    staticRules = settings.rules;
                    existingRules = $.validator.staticRules(element);
                    switch (command) {
                        case "add":
                            $.extend(existingRules, $.validator.normalizeRule(argument));
                            delete existingRules.messages;
                            staticRules[element.name] = existingRules;
                            if (argument.messages) {
                                settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages)
                            }
                            break;
                        case "remove":
                            if (!argument) {
                                delete staticRules[element.name];
                                return existingRules
                            }
                            filtered = {};
                            $.each(argument.split(/\s/), function(index, method) {
                                filtered[method] = existingRules[method];
                                delete existingRules[method];
                                if (method === "required") {
                                    $(element).removeAttr("aria-required")
                                }
                            });
                            return filtered
                    }
                }
                data = $.validator.normalizeRules($.extend({}, $.validator.classRules(element), $.validator.attributeRules(element), $.validator.dataRules(element), $.validator.staticRules(element)), element);
                if (data.required) {
                    param = data.required;
                    delete data.required;
                    data = $.extend({
                        required: param
                    }, data);
                    $(element).attr("aria-required", "true")
                }
                if (data.remote) {
                    param = data.remote;
                    delete data.remote;
                    data = $.extend(data, {
                        remote: param
                    })
                }
                return data
            }
        });
        $.extend($.expr[":"], {
            blank: function(a) {
                return !$.trim("" + $(a).val())
            },
            filled: function(a) {
                return !!$.trim("" + $(a).val())
            },
            unchecked: function(a) {
                return !$(a).prop("checked")
            }
        });
        $.validator = function(options, form) {
            this.settings = $.extend(true, {}, $.validator.defaults, options);
            this.currentForm = form;
            this.init()
        };
        $.validator.format = function(source, params) {
            if (arguments.length === 1) {
                return function() {
                    var args = $.makeArray(arguments);
                    args.unshift(source);
                    return $.validator.format.apply(this, args)
                }
            }
            if (arguments.length > 2 && params.constructor !== Array) {
                params = $.makeArray(arguments).slice(1)
            }
            if (params.constructor !== Array) {
                params = [params]
            }
            $.each(params, function(i, n) {
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
                    return n
                })
            });
            return source
        };
        $.extend($.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusCleanup: false,
                focusInvalid: true,
                errorContainer: $([]),
                errorLabelContainer: $([]),
                onsubmit: true,
                ignore: ":hidden",
                ignoreTitle: false,
                onfocusin: function(element) {
                    this.lastActive = element;
                    if (this.settings.focusCleanup) {
                        if (this.settings.unhighlight) {
                            this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass)
                        }
                        this.hideThese(this.errorsFor(element))
                    }
                },
                onfocusout: function(element) {
                    if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                        this.element(element)
                    }
                },
                onkeyup: function(element, event) {
                    if (event.which === 9 && this.elementValue(element) === "") {
                        return
                    } else if (element.name in this.submitted || element === this.lastElement) {
                        this.element(element)
                    }
                },
                onclick: function(element) {
                    if (element.name in this.submitted) {
                        this.element(element)
                    } else if (element.parentNode.name in this.submitted) {
                        this.element(element.parentNode)
                    }
                },
                highlight: function(element, errorClass, validClass) {
                    if (element.type === "radio") {
                        this.findByName(element.name).addClass(errorClass).removeClass(validClass)
                    } else {
                        $(element).addClass(errorClass).removeClass(validClass)
                    }
                },
                unhighlight: function(element, errorClass, validClass) {
                    if (element.type === "radio") {
                        this.findByName(element.name).removeClass(errorClass).addClass(validClass)
                    } else {
                        $(element).removeClass(errorClass).addClass(validClass)
                    }
                }
            },
            setDefaults: function(settings) {
                $.extend($.validator.defaults, settings)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date ( ISO ).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: $.validator.format("Please enter no more than {0} characters."),
                minlength: $.validator.format("Please enter at least {0} characters."),
                rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
                range: $.validator.format("Please enter a value between {0} and {1}."),
                max: $.validator.format("Please enter a value less than or equal to {0}."),
                min: $.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: false,
            prototype: {
                init: function() {
                    this.labelContainer = $(this.settings.errorLabelContainer);
                    this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                    this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                    this.submitted = {};
                    this.valueCache = {};
                    this.pendingRequest = 0;
                    this.pending = {};
                    this.invalid = {};
                    this.reset();
                    var groups = this.groups = {},
                        rules;
                    $.each(this.settings.groups, function(key, value) {
                        if (typeof value === "string") {
                            value = value.split(/\s/)
                        }
                        $.each(value, function(index, name) {
                            groups[name] = key
                        })
                    });
                    rules = this.settings.rules;
                    $.each(rules, function(key, value) {
                        rules[key] = $.validator.normalizeRule(value)
                    });

                    function delegate(event) {
                        var validator = $.data(this[0].form, "validator"),
                            eventType = "on" + event.type.replace(/^validate/, ""),
                            settings = validator.settings;
                        if (settings[eventType] && !this.is(settings.ignore)) {
                            settings[eventType].call(validator, this[0], event)
                        }
                    }
                    $(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, " + "[type='number'], [type='search'] ,[type='tel'], [type='url'], " + "[type='email'], [type='datetime'], [type='date'], [type='month'], " + "[type='week'], [type='time'], [type='datetime-local'], " + "[type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", delegate).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);
                    if (this.settings.invalidHandler) {
                        $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                    }
                    $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                },
                form: function() {
                    this.checkForm();
                    $.extend(this.submitted, this.errorMap);
                    this.invalid = $.extend({}, this.errorMap);
                    if (!this.valid()) {
                        $(this.currentForm).triggerHandler("invalid-form", [this])
                    }
                    this.showErrors();
                    return this.valid()
                },
                checkForm: function() {
                    this.prepareForm();
                    for (var i = 0, elements = this.currentElements = this.elements(); elements[i]; i++) {
                        this.check(elements[i])
                    }
                    return this.valid()
                },
                element: function(element) {
                    var cleanElement = this.clean(element),
                        checkElement = this.validationTargetFor(cleanElement),
                        result = true;
                    this.lastElement = checkElement;
                    if (checkElement === undefined) {
                        delete this.invalid[cleanElement.name]
                    } else {
                        this.prepareElement(checkElement);
                        this.currentElements = $(checkElement);
                        result = this.check(checkElement) !== false;
                        if (result) {
                            delete this.invalid[checkElement.name]
                        } else {
                            this.invalid[checkElement.name] = true
                        }
                    }
                    $(element).attr("aria-invalid", !result);
                    if (!this.numberOfInvalids()) {
                        this.toHide = this.toHide.add(this.containers)
                    }
                    this.showErrors();
                    return result
                },
                showErrors: function(errors) {
                    if (errors) {
                        $.extend(this.errorMap, errors);
                        this.errorList = [];
                        for (var name in errors) {
                            this.errorList.push({
                                message: errors[name],
                                element: this.findByName(name)[0]
                            })
                        }
                        this.successList = $.grep(this.successList, function(element) {
                            return !(element.name in errors)
                        })
                    }
                    if (this.settings.showErrors) {
                        this.settings.showErrors.call(this, this.errorMap, this.errorList)
                    } else {
                        this.defaultShowErrors()
                    }
                },
                resetForm: function() {
                    if ($.fn.resetForm) {
                        $(this.currentForm).resetForm()
                    }
                    this.submitted = {};
                    this.lastElement = null;
                    this.prepareForm();
                    this.hideErrors();
                    this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
                },
                numberOfInvalids: function() {
                    return this.objectLength(this.invalid)
                },
                objectLength: function(obj) {
                    var count = 0,
                        i;
                    for (i in obj) {
                        count++
                    }
                    return count
                },
                hideErrors: function() {
                    this.hideThese(this.toHide)
                },
                hideThese: function(errors) {
                    errors.not(this.containers).text("");
                    this.addWrapper(errors).hide()
                },
                valid: function() {
                    return this.size() === 0
                },
                size: function() {
                    return this.errorList.length
                },
                focusInvalid: function() {
                    if (this.settings.focusInvalid) {
                        try {
                            $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                        } catch (e) {}
                    }
                },
                findLastActive: function() {
                    var lastActive = this.lastActive;
                    return lastActive && $.grep(this.errorList, function(n) {
                        return n.element.name === lastActive.name
                    }).length === 1 && lastActive
                },
                elements: function() {
                    var validator = this,
                        rulesCache = {};
                    return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                        if (!this.name && validator.settings.debug && window.console) {
                            console.error("%o has no name assigned", this)
                        }
                        if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                            return false
                        }
                        rulesCache[this.name] = true;
                        return true
                    })
                },
                clean: function(selector) {
                    return $(selector)[0]
                },
                errors: function() {
                    var errorClass = this.settings.errorClass.split(" ").join(".");
                    return $(this.settings.errorElement + "." + errorClass, this.errorContext)
                },
                reset: function() {
                    this.successList = [];
                    this.errorList = [];
                    this.errorMap = {};
                    this.toShow = $([]);
                    this.toHide = $([]);
                    this.currentElements = $([])
                },
                prepareForm: function() {
                    this.reset();
                    this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function(element) {
                    this.reset();
                    this.toHide = this.errorsFor(element)
                },
                elementValue: function(element) {
                    var val, $element = $(element),
                        type = element.type;
                    if (type === "radio" || type === "checkbox") {
                        return $("input[name='" + element.name + "']:checked").val()
                    } else if (type === "number" && typeof element.validity !== "undefined") {
                        return element.validity.badInput ? false : $element.val()
                    }
                    val = $element.val();
                    if (typeof val === "string") {
                        return val.replace(/\r/g, "")
                    }
                    return val
                },
                check: function(element) {
                    element = this.validationTargetFor(this.clean(element));
                    var rules = $(element).rules(),
                        rulesCount = $.map(rules, function(n, i) {
                            return i
                        }).length,
                        dependencyMismatch = false,
                        val = this.elementValue(element),
                        result, method, rule;
                    for (method in rules) {
                        rule = {
                            method: method,
                            parameters: rules[method]
                        };
                        try {
                            result = $.validator.methods[method].call(this, val, element, rule.parameters);
                            if (result === "dependency-mismatch" && rulesCount === 1) {
                                dependencyMismatch = true;
                                continue
                            }
                            dependencyMismatch = false;
                            if (result === "pending") {
                                this.toHide = this.toHide.not(this.errorsFor(element));
                                return
                            }
                            if (!result) {
                                this.formatAndAdd(element, rule);
                                return false
                            }
                        } catch (e) {
                            if (this.settings.debug && window.console) {
                                console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e)
                            }
                            throw e
                        }
                    }
                    if (dependencyMismatch) {
                        return
                    }
                    if (this.objectLength(rules)) {
                        this.successList.push(element)
                    }
                    return true
                },
                customDataMessage: function(element, method) {
                    return $(element).data("msg" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase()) || $(element).data("msg")
                },
                customMessage: function(name, method) {
                    var m = this.settings.messages[name];
                    return m && (m.constructor === String ? m : m[method])
                },
                findDefined: function() {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] !== undefined) {
                            return arguments[i]
                        }
                    }
                    return undefined
                },
                defaultMessage: function(element, method) {
                    return this.findDefined(this.customMessage(element.name, method), this.customDataMessage(element, method), !this.settings.ignoreTitle && element.title || undefined, $.validator.messages[method], "<strong>Warning: No message defined for " + element.name + "</strong>")
                },
                formatAndAdd: function(element, rule) {
                    var message = this.defaultMessage(element, rule.method),
                        theregex = /\$?\{(\d+)\}/g;
                    if (typeof message === "function") {
                        message = message.call(this, rule.parameters, element)
                    } else if (theregex.test(message)) {
                        message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters)
                    }
                    this.errorList.push({
                        message: message,
                        element: element,
                        method: rule.method
                    });
                    this.errorMap[element.name] = message;
                    this.submitted[element.name] = message
                },
                addWrapper: function(toToggle) {
                    if (this.settings.wrapper) {
                        toToggle = toToggle.add(toToggle.parent(this.settings.wrapper))
                    }
                    return toToggle
                },
                defaultShowErrors: function() {
                    var i, elements, error;
                    for (i = 0; this.errorList[i]; i++) {
                        error = this.errorList[i];
                        if (this.settings.highlight) {
                            this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass)
                        }
                        this.showLabel(error.element, error.message)
                    }
                    if (this.errorList.length) {
                        this.toShow = this.toShow.add(this.containers)
                    }
                    if (this.settings.success) {
                        for (i = 0; this.successList[i]; i++) {
                            this.showLabel(this.successList[i])
                        }
                    }
                    if (this.settings.unhighlight) {
                        for (i = 0, elements = this.validElements(); elements[i]; i++) {
                            this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass)
                        }
                    }
                    this.toHide = this.toHide.not(this.toShow);
                    this.hideErrors();
                    this.addWrapper(this.toShow).show()
                },
                validElements: function() {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function() {
                    return $(this.errorList).map(function() {
                        return this.element
                    })
                },
                showLabel: function(element, message) {
                    var place, group, errorID, error = this.errorsFor(element),
                        elementID = this.idOrName(element),
                        describedBy = $(element).attr("aria-describedby");
                    if (error.length) {
                        error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                        error.html(message)
                    } else {
                        error = $("<" + this.settings.errorElement + ">").attr("id", elementID + "-error").addClass(this.settings.errorClass).html(message || "");
                        place = error;
                        if (this.settings.wrapper) {
                            place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()
                        }
                        if (this.labelContainer.length) {
                            this.labelContainer.append(place)
                        } else if (this.settings.errorPlacement) {
                            this.settings.errorPlacement(place, $(element))
                        } else {
                            place.insertAfter(element)
                        }
                        if (error.is("label")) {
                            error.attr("for", elementID)
                        } else if (error.parents("label[for='" + elementID + "']").length === 0) {
                            errorID = error.attr("id").replace(/(:|\.|\[|\])/g, "\\$1");
                            if (!describedBy) {
                                describedBy = errorID
                            } else if (!describedBy.match(new RegExp("\\b" + errorID + "\\b"))) {
                                describedBy += " " + errorID
                            }
                            $(element).attr("aria-describedby", describedBy);
                            group = this.groups[element.name];
                            if (group) {
                                $.each(this.groups, function(name, testgroup) {
                                    if (testgroup === group) {
                                        $("[name='" + name + "']", this.currentForm).attr("aria-describedby", error.attr("id"))
                                    }
                                })
                            }
                        }
                    }
                    if (!message && this.settings.success) {
                        error.text("");
                        if (typeof this.settings.success === "string") {
                            error.addClass(this.settings.success)
                        } else {
                            this.settings.success(error, element)
                        }
                    }
                    this.toShow = this.toShow.add(error)
                },
                errorsFor: function(element) {
                    var name = this.idOrName(element),
                        describer = $(element).attr("aria-describedby"),
                        selector = "label[for='" + name + "'], label[for='" + name + "'] *";
                    if (describer) {
                        selector = selector + ", #" + describer.replace(/\s+/g, ", #")
                    }
                    return this.errors().filter(selector)
                },
                idOrName: function(element) {
                    return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name)
                },
                validationTargetFor: function(element) {
                    if (this.checkable(element)) {
                        element = this.findByName(element.name)
                    }
                    return $(element).not(this.settings.ignore)[0]
                },
                checkable: function(element) {
                    return /radio|checkbox/i.test(element.type)
                },
                findByName: function(name) {
                    return $(this.currentForm).find("[name='" + name + "']")
                },
                getLength: function(value, element) {
                    switch (element.nodeName.toLowerCase()) {
                        case "select":
                            return $("option:selected", element).length;
                        case "input":
                            if (this.checkable(element)) {
                                return this.findByName(element.name).filter(":checked").length
                            }
                    }
                    return value.length
                },
                depend: function(param, element) {
                    return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true
                },
                dependTypes: {
                    boolean: function(param) {
                        return param
                    },
                    string: function(param, element) {
                        return !!$(param, element.form).length
                    },
                    function: function(param, element) {
                        return param(element)
                    }
                },
                optional: function(element) {
                    var val = this.elementValue(element);
                    return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch"
                },
                startRequest: function(element) {
                    if (!this.pending[element.name]) {
                        this.pendingRequest++;
                        this.pending[element.name] = true
                    }
                },
                stopRequest: function(element, valid) {
                    this.pendingRequest--;
                    if (this.pendingRequest < 0) {
                        this.pendingRequest = 0
                    }
                    delete this.pending[element.name];
                    if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                        $(this.currentForm).submit();
                        this.formSubmitted = false
                    } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                        $(this.currentForm).triggerHandler("invalid-form", [this]);
                        this.formSubmitted = false
                    }
                },
                previousValue: function(element) {
                    return $.data(element, "previousValue") || $.data(element, "previousValue", {
                        old: null,
                        valid: true,
                        message: this.defaultMessage(element, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {
                    required: true
                },
                email: {
                    email: true
                },
                url: {
                    url: true
                },
                date: {
                    date: true
                },
                dateISO: {
                    dateISO: true
                },
                number: {
                    number: true
                },
                digits: {
                    digits: true
                },
                creditcard: {
                    creditcard: true
                }
            },
            addClassRules: function(className, rules) {
                if (className.constructor === String) {
                    this.classRuleSettings[className] = rules
                } else {
                    $.extend(this.classRuleSettings, className)
                }
            },
            classRules: function(element) {
                var rules = {},
                    classes = $(element).attr("class");
                if (classes) {
                    $.each(classes.split(" "), function() {
                        if (this in $.validator.classRuleSettings) {
                            $.extend(rules, $.validator.classRuleSettings[this])
                        }
                    })
                }
                return rules
            },
            attributeRules: function(element) {
                var rules = {},
                    $element = $(element),
                    type = element.getAttribute("type"),
                    method, value;
                for (method in $.validator.methods) {
                    if (method === "required") {
                        value = element.getAttribute(method);
                        if (value === "") {
                            value = true
                        }
                        value = !!value
                    } else {
                        value = $element.attr(method)
                    }
                    if (/min|max/.test(method) && (type === null || /number|range|text/.test(type))) {
                        value = Number(value)
                    }
                    if (value || value === 0) {
                        rules[method] = value
                    } else if (type === method && type !== "range") {
                        rules[method] = true
                    }
                }
                if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                    delete rules.maxlength
                }
                return rules
            },
            dataRules: function(element) {
                var method, value, rules = {},
                    $element = $(element);
                for (method in $.validator.methods) {
                    value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
                    if (value !== undefined) {
                        rules[method] = value
                    }
                }
                return rules
            },
            staticRules: function(element) {
                var rules = {},
                    validator = $.data(element.form, "validator");
                if (validator.settings.rules) {
                    rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {}
                }
                return rules
            },
            normalizeRules: function(rules, element) {
                $.each(rules, function(prop, val) {
                    if (val === false) {
                        delete rules[prop];
                        return
                    }
                    if (val.param || val.depends) {
                        var keepRule = true;
                        switch (typeof val.depends) {
                            case "string":
                                keepRule = !!$(val.depends, element.form).length;
                                break;
                            case "function":
                                keepRule = val.depends.call(element, element);
                                break
                        }
                        if (keepRule) {
                            rules[prop] = val.param !== undefined ? val.param : true
                        } else {
                            delete rules[prop]
                        }
                    }
                });
                $.each(rules, function(rule, parameter) {
                    rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter
                });
                $.each(["minlength", "maxlength"], function() {
                    if (rules[this]) {
                        rules[this] = Number(rules[this])
                    }
                });
                $.each(["rangelength", "range"], function() {
                    var parts;
                    if (rules[this]) {
                        if ($.isArray(rules[this])) {
                            rules[this] = [Number(rules[this][0]), Number(rules[this][1])]
                        } else if (typeof rules[this] === "string") {
                            parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                            rules[this] = [Number(parts[0]), Number(parts[1])]
                        }
                    }
                });
                if ($.validator.autoCreateRanges) {
                    if (rules.min != null && rules.max != null) {
                        rules.range = [rules.min, rules.max];
                        delete rules.min;
                        delete rules.max
                    }
                    if (rules.minlength != null && rules.maxlength != null) {
                        rules.rangelength = [rules.minlength, rules.maxlength];
                        delete rules.minlength;
                        delete rules.maxlength
                    }
                }
                return rules
            },
            normalizeRule: function(data) {
                if (typeof data === "string") {
                    var transformed = {};
                    $.each(data.split(/\s/), function() {
                        transformed[this] = true
                    });
                    data = transformed
                }
                return data
            },
            addMethod: function(name, method, message) {
                $.validator.methods[name] = method;
                $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
                if (method.length < 3) {
                    $.validator.addClassRules(name, $.validator.normalizeRule(name))
                }
            },
            methods: {
                required: function(value, element, param) {
                    if (!this.depend(param, element)) {
                        return "dependency-mismatch"
                    }
                    if (element.nodeName.toLowerCase() === "select") {
                        var val = $(element).val();
                        return val && val.length > 0
                    }
                    if (this.checkable(element)) {
                        return this.getLength(value, element) > 0
                    }
                    return $.trim(value).length > 0
                },
                email: function(value, element) {
                    return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
                },
                url: function(value, element) {
                    return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
                },
                date: function(value, element) {
                    return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString())
                },
                dateISO: function(value, element) {
                    return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
                },
                number: function(value, element) {
                    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
                },
                digits: function(value, element) {
                    return this.optional(element) || /^\d+$/.test(value)
                },
                creditcard: function(value, element) {
                    if (this.optional(element)) {
                        return "dependency-mismatch"
                    }
                    if (/[^0-9 \-]+/.test(value)) {
                        return false
                    }
                    var nCheck = 0,
                        nDigit = 0,
                        bEven = false,
                        n, cDigit;
                    value = value.replace(/\D/g, "");
                    if (value.length < 13 || value.length > 19) {
                        return false
                    }
                    for (n = value.length - 1; n >= 0; n--) {
                        cDigit = value.charAt(n);
                        nDigit = parseInt(cDigit, 10);
                        if (bEven) {
                            if ((nDigit *= 2) > 9) {
                                nDigit -= 9
                            }
                        }
                        nCheck += nDigit;
                        bEven = !bEven
                    }
                    return nCheck % 10 === 0
                },
                minlength: function(value, element, param) {
                    var length = $.isArray(value) ? value.length : this.getLength(value, element);
                    return this.optional(element) || length >= param
                },
                maxlength: function(value, element, param) {
                    var length = $.isArray(value) ? value.length : this.getLength(value, element);
                    return this.optional(element) || length <= param
                },
                rangelength: function(value, element, param) {
                    var length = $.isArray(value) ? value.length : this.getLength(value, element);
                    return this.optional(element) || length >= param[0] && length <= param[1]
                },
                min: function(value, element, param) {
                    return this.optional(element) || value >= param
                },
                max: function(value, element, param) {
                    return this.optional(element) || value <= param
                },
                range: function(value, element, param) {
                    return this.optional(element) || value >= param[0] && value <= param[1]
                },
                equalTo: function(value, element, param) {
                    var target = $(param);
                    if (this.settings.onfocusout) {
                        target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                            $(element).valid()
                        })
                    }
                    return value === target.val()
                },
                remote: function(value, element, param) {
                    if (this.optional(element)) {
                        return "dependency-mismatch"
                    }
                    var previous = this.previousValue(element),
                        validator, data;
                    if (!this.settings.messages[element.name]) {
                        this.settings.messages[element.name] = {}
                    }
                    previous.originalMessage = this.settings.messages[element.name].remote;
                    this.settings.messages[element.name].remote = previous.message;
                    param = typeof param === "string" && {
                        url: param
                    } || param;
                    if (previous.old === value) {
                        return previous.valid
                    }
                    previous.old = value;
                    validator = this;
                    this.startRequest(element);
                    data = {};
                    data[element.name] = value;
                    $.ajax($.extend(true, {
                        url: param,
                        mode: "abort",
                        port: "validate" + element.name,
                        dataType: "json",
                        data: data,
                        context: validator.currentForm,
                        success: function(response) {
                            var valid = response === true || response === "true",
                                errors, message, submitted;
                            validator.settings.messages[element.name].remote = previous.originalMessage;
                            if (valid) {
                                submitted = validator.formSubmitted;
                                validator.prepareElement(element);
                                validator.formSubmitted = submitted;
                                validator.successList.push(element);
                                delete validator.invalid[element.name];
                                validator.showErrors()
                            } else {
                                errors = {};
                                message = response || validator.defaultMessage(element, "remote");
                                errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                                validator.invalid[element.name] = true;
                                validator.showErrors(errors)
                            }
                            previous.valid = valid;
                            validator.stopRequest(element, valid)
                        }
                    }, param));
                    return "pending"
                }
            }
        });
        $.format = function deprecated() {
            throw "$.format has been deprecated. Please use $.validator.format instead."
        };
        var pendingRequests = {},
            ajax;
        if ($.ajaxPrefilter) {
            $.ajaxPrefilter(function(settings, _, xhr) {
                var port = settings.port;
                if (settings.mode === "abort") {
                    if (pendingRequests[port]) {
                        pendingRequests[port].abort()
                    }
                    pendingRequests[port] = xhr
                }
            })
        } else {
            ajax = $.ajax;
            $.ajax = function(settings) {
                var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
                    port = ("port" in settings ? settings : $.ajaxSettings).port;
                if (mode === "abort") {
                    if (pendingRequests[port]) {
                        pendingRequests[port].abort()
                    }
                    pendingRequests[port] = ajax.apply(this, arguments);
                    return pendingRequests[port]
                }
                return ajax.apply(this, arguments)
            }
        }
        $.extend($.fn, {
            validateDelegate: function(delegate, type, handler) {
                return this.bind(type, function(event) {
                    var target = $(event.target);
                    if (target.is(delegate)) {
                        return handler.apply(target, arguments)
                    }
                })
            }
        })
    })
});
define("xg/eid-company-zy/1.0.4/c/js/validate-add-methods-debug", ["xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate", "jquery/jquery/1.10.1/jquery-debug"], function(require, exports, module) {
    require("xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate");
    var $ = require("jquery/jquery/1.10.1/jquery-debug");
    $.validator.addMethod("mobile", function(value, element) {
        var mobile = value.replace(/[\-\/]/g, "");
        return this.optional(element) || /^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile)
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的手机号");
    $.validator.addMethod("idcard", function(value, element) {
        return this.optional(element) || /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value)
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的身份证号");
    $.validator.addMethod("email", function(value, element) {
        return this.optional(element) || /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/.test(value)
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的邮箱地址");
    $.validator.addMethod("registerpsd", function(value, element) {
        return this.optional(element) || /(?!^[0-9]+$)(?!^[a-z]+$)(?!^[^A-z0-9]+$)^.{6,15}$/.test(value)
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>密码格式有问题");
    $.validator.addMethod("coord", function(value, element) {
        return this.optional(element) || /\d{3}\.\d+\,\d{2}\.\d+/.test(value)
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'></i>请输入正确的经纬度");
    $.validator.addMethod("twoPoint", function(value, element) {
        return !value || /^\d+\.?\d{0,2}$/.test(value)
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'></i>最多保留两位小数");
    $.validator.addMethod("realyname", function(value, element) {
        return this.optional(element) || /^[\u4e00-\u9fa5]{2,6}$/.test(value)
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的姓名");
    $.validator.addMethod("bankcard", function(value, element) {
        return this.optional(element) || /^[0-9]{16,19}$/.test(value)
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的银行卡号")
});
define("xg/eid-company-zy/1.0.4/c/js/validate-messages-cn-debug", ["jquery/jquery/1.10.1/jquery-debug", "xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate"], function(require, exports, module) {
    var $ = require("jquery/jquery/1.10.1/jquery-debug");
    require("xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate");
    $.format = function(source, params) {
        if (arguments.length == 1) return function() {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args)
        };
        if (arguments.length > 2 && params.constructor != Array) {
            params = $.makeArray(arguments).slice(1)
        }
        if (params.constructor != Array) {
            params = [params]
        }
        $.each(params, function(i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n)
        });
        return source
    };
    var cnmsg = {
        required: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>必填字段",
        remote: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请修正该字段",
        email: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确格式的电子邮件",
        url: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的网址",
        date: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的日期",
        dateISO: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的日期 (ISO).",
        number: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的数字",
        digits: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>只能输入整数",
        creditcard: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的信用卡号",
        equalTo: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>两次输入的密码不一致",
        accept: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入拥有合法后缀名的字符串",
        maxlength: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入少于{0}个字的内容"),
        minlength: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个长度最少是 {0} 的字符串"),
        rangelength: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个最大为 {0} 的值"),
        min: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个最小为 {0} 的值")
    };
    jQuery.extend(jQuery.validator.messages, cnmsg)
});
define("xg/eid-company-zy/1.0.4/c/js/moment-debug", [], function(require, exports, module) {
    (function(undefined) {
        var moment, VERSION = "2.8.1",
            globalScope = typeof global !== "undefined" ? global : this,
            oldGlobalMoment, round = Math.round,
            i, YEAR = 0,
            MONTH = 1,
            DATE = 2,
            HOUR = 3,
            MINUTE = 4,
            SECOND = 5,
            MILLISECOND = 6,
            locales = {},
            momentProperties = [],
            hasModule = typeof module !== "undefined" && module.exports,
            aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
            aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
            isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,
            formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
            localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
            parseTokenOneOrTwoDigits = /\d\d?/,
            parseTokenOneToThreeDigits = /\d{1,3}/,
            parseTokenOneToFourDigits = /\d{1,4}/,
            parseTokenOneToSixDigits = /[+\-]?\d{1,6}/,
            parseTokenDigits = /\d+/,
            parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
            parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi,
            parseTokenT = /T/i,
            parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/,
            parseTokenOrdinal = /\d{1,2}/,
            parseTokenOneDigit = /\d/,
            parseTokenTwoDigits = /\d\d/,
            parseTokenThreeDigits = /\d{3}/,
            parseTokenFourDigits = /\d{4}/,
            parseTokenSixDigits = /[+-]?\d{6}/,
            parseTokenSignedNumber = /[+-]?\d+/,
            isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            isoFormat = "YYYY-MM-DDTHH:mm:ssZ",
            isoDates = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
                ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
                ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d{2}/],
                ["YYYY-DDD", /\d{4}-\d{3}/]
            ],
            isoTimes = [
                ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                ["HH:mm", /(T| )\d\d:\d\d/],
                ["HH", /(T| )\d\d/]
            ],
            parseTimezoneChunker = /([\+\-]|\d\d)/gi,
            proxyGettersAndSetters = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"),
            unitMillisecondFactors = {
                Milliseconds: 1,
                Seconds: 1e3,
                Minutes: 6e4,
                Hours: 36e5,
                Days: 864e5,
                Months: 2592e6,
                Years: 31536e6
            },
            unitAliases = {
                ms: "millisecond",
                s: "second",
                m: "minute",
                h: "hour",
                d: "day",
                D: "date",
                w: "week",
                W: "isoWeek",
                M: "month",
                Q: "quarter",
                y: "year",
                DDD: "dayOfYear",
                e: "weekday",
                E: "isoWeekday",
                gg: "weekYear",
                GG: "isoWeekYear"
            },
            camelFunctions = {
                dayofyear: "dayOfYear",
                isoweekday: "isoWeekday",
                isoweek: "isoWeek",
                weekyear: "weekYear",
                isoweekyear: "isoWeekYear"
            },
            formatFunctions = {},
            relativeTimeThresholds = {
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            },
            ordinalizeTokens = "DDD w W M D d".split(" "),
            paddedTokens = "M D H h m s w W".split(" "),
            formatTokenFunctions = {
                M: function() {
                    return this.month() + 1
                },
                MMM: function(format) {
                    return this.localeData().monthsShort(this, format)
                },
                MMMM: function(format) {
                    return this.localeData().months(this, format)
                },
                D: function() {
                    return this.date()
                },
                DDD: function() {
                    return this.dayOfYear()
                },
                d: function() {
                    return this.day()
                },
                dd: function(format) {
                    return this.localeData().weekdaysMin(this, format)
                },
                ddd: function(format) {
                    return this.localeData().weekdaysShort(this, format)
                },
                dddd: function(format) {
                    return this.localeData().weekdays(this, format)
                },
                w: function() {
                    return this.week()
                },
                W: function() {
                    return this.isoWeek()
                },
                YY: function() {
                    return leftZeroFill(this.year() % 100, 2)
                },
                YYYY: function() {
                    return leftZeroFill(this.year(), 4)
                },
                YYYYY: function() {
                    return leftZeroFill(this.year(), 5)
                },
                YYYYYY: function() {
                    var y = this.year(),
                        sign = y >= 0 ? "+" : "-";
                    return sign + leftZeroFill(Math.abs(y), 6)
                },
                gg: function() {
                    return leftZeroFill(this.weekYear() % 100, 2)
                },
                gggg: function() {
                    return leftZeroFill(this.weekYear(), 4)
                },
                ggggg: function() {
                    return leftZeroFill(this.weekYear(), 5)
                },
                GG: function() {
                    return leftZeroFill(this.isoWeekYear() % 100, 2)
                },
                GGGG: function() {
                    return leftZeroFill(this.isoWeekYear(), 4)
                },
                GGGGG: function() {
                    return leftZeroFill(this.isoWeekYear(), 5)
                },
                e: function() {
                    return this.weekday()
                },
                E: function() {
                    return this.isoWeekday()
                },
                a: function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), true)
                },
                A: function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), false)
                },
                H: function() {
                    return this.hours()
                },
                h: function() {
                    return this.hours() % 12 || 12
                },
                m: function() {
                    return this.minutes()
                },
                s: function() {
                    return this.seconds()
                },
                S: function() {
                    return toInt(this.milliseconds() / 100)
                },
                SS: function() {
                    return leftZeroFill(toInt(this.milliseconds() / 10), 2)
                },
                SSS: function() {
                    return leftZeroFill(this.milliseconds(), 3)
                },
                SSSS: function() {
                    return leftZeroFill(this.milliseconds(), 3)
                },
                Z: function() {
                    var a = -this.zone(),
                        b = "+";
                    if (a < 0) {
                        a = -a;
                        b = "-"
                    }
                    return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2)
                },
                ZZ: function() {
                    var a = -this.zone(),
                        b = "+";
                    if (a < 0) {
                        a = -a;
                        b = "-"
                    }
                    return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2)
                },
                z: function() {
                    return this.zoneAbbr()
                },
                zz: function() {
                    return this.zoneName()
                },
                X: function() {
                    return this.unix()
                },
                Q: function() {
                    return this.quarter()
                }
            },
            deprecations = {},
            lists = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"];

        function dfl(a, b, c) {
            switch (arguments.length) {
                case 2:
                    return a != null ? a : b;
                case 3:
                    return a != null ? a : b != null ? b : c;
                default:
                    throw new Error("Implement me")
            }
        }

        function defaultParsingFlags() {
            return {
                empty: false,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: false,
                invalidMonth: null,
                invalidFormat: false,
                userInvalidated: false,
                iso: false
            }
        }

        function printMsg(msg) {
            if (moment.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
                console.warn("Deprecation warning: " + msg)
            }
        }

        function deprecate(msg, fn) {
            var firstTime = true;
            return extend(function() {
                if (firstTime) {
                    printMsg(msg);
                    firstTime = false
                }
                return fn.apply(this, arguments)
            }, fn)
        }

        function deprecateSimple(name, msg) {
            if (!deprecations[name]) {
                printMsg(msg);
                deprecations[name] = true
            }
        }

        function padToken(func, count) {
            return function(a) {
                return leftZeroFill(func.call(this, a), count)
            }
        }

        function ordinalizeToken(func, period) {
            return function(a) {
                return this.localeData().ordinal(func.call(this, a), period)
            }
        }
        while (ordinalizeTokens.length) {
            i = ordinalizeTokens.pop();
            formatTokenFunctions[i + "o"] = ordinalizeToken(formatTokenFunctions[i], i)
        }
        while (paddedTokens.length) {
            i = paddedTokens.pop();
            formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2)
        }
        formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);

        function Locale() {}

        function Moment(config, skipOverflow) {
            if (skipOverflow !== false) {
                checkOverflow(config)
            }
            copyConfig(this, config);
            this._d = new Date((+config._d))
        }

        function Duration(duration) {
            var normalizedInput = normalizeObjectUnits(duration),
                years = normalizedInput.year || 0,
                quarters = normalizedInput.quarter || 0,
                months = normalizedInput.month || 0,
                weeks = normalizedInput.week || 0,
                days = normalizedInput.day || 0,
                hours = normalizedInput.hour || 0,
                minutes = normalizedInput.minute || 0,
                seconds = normalizedInput.second || 0,
                milliseconds = normalizedInput.millisecond || 0;
            this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 36e5;
            this._days = +days + weeks * 7;
            this._months = +months + quarters * 3 + years * 12;
            this._data = {};
            this._locale = moment.localeData();
            this._bubble()
        }

        function extend(a, b) {
            for (var i in b) {
                if (b.hasOwnProperty(i)) {
                    a[i] = b[i]
                }
            }
            if (b.hasOwnProperty("toString")) {
                a.toString = b.toString
            }
            if (b.hasOwnProperty("valueOf")) {
                a.valueOf = b.valueOf
            }
            return a
        }

        function copyConfig(to, from) {
            var i, prop, val;
            if (typeof from._isAMomentObject !== "undefined") {
                to._isAMomentObject = from._isAMomentObject
            }
            if (typeof from._i !== "undefined") {
                to._i = from._i
            }
            if (typeof from._f !== "undefined") {
                to._f = from._f
            }
            if (typeof from._l !== "undefined") {
                to._l = from._l
            }
            if (typeof from._strict !== "undefined") {
                to._strict = from._strict
            }
            if (typeof from._tzm !== "undefined") {
                to._tzm = from._tzm
            }
            if (typeof from._isUTC !== "undefined") {
                to._isUTC = from._isUTC
            }
            if (typeof from._offset !== "undefined") {
                to._offset = from._offset
            }
            if (typeof from._pf !== "undefined") {
                to._pf = from._pf
            }
            if (typeof from._locale !== "undefined") {
                to._locale = from._locale
            }
            if (momentProperties.length > 0) {
                for (i in momentProperties) {
                    prop = momentProperties[i];
                    val = from[prop];
                    if (typeof val !== "undefined") {
                        to[prop] = val
                    }
                }
            }
            return to
        }

        function absRound(number) {
            if (number < 0) {
                return Math.ceil(number)
            } else {
                return Math.floor(number)
            }
        }

        function leftZeroFill(number, targetLength, forceSign) {
            var output = "" + Math.abs(number),
                sign = number >= 0;
            while (output.length < targetLength) {
                output = "0" + output
            }
            return (sign ? forceSign ? "+" : "" : "-") + output
        }

        function positiveMomentsDifference(base, other) {
            var res = {
                milliseconds: 0,
                months: 0
            };
            res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
            if (base.clone().add(res.months, "M").isAfter(other)) {
                --res.months
            }
            res.milliseconds = +other - +base.clone().add(res.months, "M");
            return res
        }

        function momentsDifference(base, other) {
            var res;
            other = makeAs(other, base);
            if (base.isBefore(other)) {
                res = positiveMomentsDifference(base, other)
            } else {
                res = positiveMomentsDifference(other, base);
                res.milliseconds = -res.milliseconds;
                res.months = -res.months
            }
            return res
        }

        function createAdder(direction, name) {
            return function(val, period) {
                var dur, tmp;
                if (period !== null && !isNaN(+period)) {
                    deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period).");
                    tmp = val;
                    val = period;
                    period = tmp
                }
                val = typeof val === "string" ? +val : val;
                dur = moment.duration(val, period);
                addOrSubtractDurationFromMoment(this, dur, direction);
                return this
            }
        }

        function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
            var milliseconds = duration._milliseconds,
                days = duration._days,
                months = duration._months;
            updateOffset = updateOffset == null ? true : updateOffset;
            if (milliseconds) {
                mom._d.setTime(+mom._d + milliseconds * isAdding)
            }
            if (days) {
                rawSetter(mom, "Date", rawGetter(mom, "Date") + days * isAdding)
            }
            if (months) {
                rawMonthSetter(mom, rawGetter(mom, "Month") + months * isAdding)
            }
            if (updateOffset) {
                moment.updateOffset(mom, days || months)
            }
        }

        function isArray(input) {
            return Object.prototype.toString.call(input) === "[object Array]"
        }

        function isDate(input) {
            return Object.prototype.toString.call(input) === "[object Date]" || input instanceof Date
        }

        function compareArrays(array1, array2, dontConvert) {
            var len = Math.min(array1.length, array2.length),
                lengthDiff = Math.abs(array1.length - array2.length),
                diffs = 0,
                i;
            for (i = 0; i < len; i++) {
                if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
                    diffs++
                }
            }
            return diffs + lengthDiff
        }

        function normalizeUnits(units) {
            if (units) {
                var lowered = units.toLowerCase().replace(/(.)s$/, "$1");
                units = unitAliases[units] || camelFunctions[lowered] || lowered
            }
            return units
        }

        function normalizeObjectUnits(inputObject) {
            var normalizedInput = {},
                normalizedProp, prop;
            for (prop in inputObject) {
                if (inputObject.hasOwnProperty(prop)) {
                    normalizedProp = normalizeUnits(prop);
                    if (normalizedProp) {
                        normalizedInput[normalizedProp] = inputObject[prop]
                    }
                }
            }
            return normalizedInput
        }

        function makeList(field) {
            var count, setter;
            if (field.indexOf("week") === 0) {
                count = 7;
                setter = "day"
            } else if (field.indexOf("month") === 0) {
                count = 12;
                setter = "month"
            } else {
                return
            }
            moment[field] = function(format, index) {
                var i, getter, method = moment._locale[field],
                    results = [];
                if (typeof format === "number") {
                    index = format;
                    format = undefined
                }
                getter = function(i) {
                    var m = moment().utc().set(setter, i);
                    return method.call(moment._locale, m, format || "")
                };
                if (index != null) {
                    return getter(index)
                } else {
                    for (i = 0; i < count; i++) {
                        results.push(getter(i))
                    }
                    return results
                }
            }
        }

        function toInt(argumentForCoercion) {
            var coercedNumber = +argumentForCoercion,
                value = 0;
            if (coercedNumber !== 0 && isFinite(coercedNumber)) {
                if (coercedNumber >= 0) {
                    value = Math.floor(coercedNumber)
                } else {
                    value = Math.ceil(coercedNumber)
                }
            }
            return value
        }

        function daysInMonth(year, month) {
            return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
        }

        function weeksInYear(year, dow, doy) {
            return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week
        }

        function daysInYear(year) {
            return isLeapYear(year) ? 366 : 365
        }

        function isLeapYear(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
        }

        function checkOverflow(m) {
            var overflow;
            if (m._a && m._pf.overflow === -2) {
                overflow = m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH : m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE : m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR : m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE : m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND : m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND : -1;
                if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                    overflow = DATE
                }
                m._pf.overflow = overflow
            }
        }

        function isValid(m) {
            if (m._isValid == null) {
                m._isValid = !isNaN(m._d.getTime()) && m._pf.overflow < 0 && !m._pf.empty && !m._pf.invalidMonth && !m._pf.nullInput && !m._pf.invalidFormat && !m._pf.userInvalidated;
                if (m._strict) {
                    m._isValid = m._isValid && m._pf.charsLeftOver === 0 && m._pf.unusedTokens.length === 0
                }
            }
            return m._isValid
        }

        function normalizeLocale(key) {
            return key ? key.toLowerCase().replace("_", "-") : key
        }

        function chooseLocale(names) {
            var i = 0,
                j, next, locale, split;
            while (i < names.length) {
                split = normalizeLocale(names[i]).split("-");
                j = split.length;
                next = normalizeLocale(names[i + 1]);
                next = next ? next.split("-") : null;
                while (j > 0) {
                    locale = loadLocale(split.slice(0, j).join("-"));
                    if (locale) {
                        return locale
                    }
                    if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                        break
                    }
                    j--
                }
                i++
            }
            return null
        }

        function loadLocale(name) {
            var oldLocale = null;
            if (!locales[name] && hasModule) {
                try {
                    oldLocale = moment.locale();
                    require("./locale/" + name);
                    moment.locale(oldLocale)
                } catch (e) {}
            }
            return locales[name]
        }

        function makeAs(input, model) {
            return model._isUTC ? moment(input).zone(model._offset || 0) : moment(input).local()
        }
        extend(Locale.prototype, {
            set: function(config) {
                var prop, i;
                for (i in config) {
                    prop = config[i];
                    if (typeof prop === "function") {
                        this[i] = prop
                    } else {
                        this["_" + i] = prop
                    }
                }
            },
            _months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            months: function(m) {
                return this._months[m.month()]
            },
            _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            monthsShort: function(m) {
                return this._monthsShort[m.month()]
            },
            monthsParse: function(monthName) {
                var i, mom, regex;
                if (!this._monthsParse) {
                    this._monthsParse = []
                }
                for (i = 0; i < 12; i++) {
                    if (!this._monthsParse[i]) {
                        mom = moment.utc([2e3, i]);
                        regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
                        this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")
                    }
                    if (this._monthsParse[i].test(monthName)) {
                        return i
                    }
                }
            },
            _weekdays: "星期天_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
            weekdays: function(m) {
                return this._weekdays[m.day()]
            },
            _weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            weekdaysShort: function(m) {
                return this._weekdaysShort[m.day()]
            },
            _weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            weekdaysMin: function(m) {
                return this._weekdaysMin[m.day()]
            },
            weekdaysParse: function(weekdayName) {
                var i, mom, regex;
                if (!this._weekdaysParse) {
                    this._weekdaysParse = []
                }
                for (i = 0; i < 7; i++) {
                    if (!this._weekdaysParse[i]) {
                        mom = moment([2e3, 1]).day(i);
                        regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
                        this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")
                    }
                    if (this._weekdaysParse[i].test(weekdayName)) {
                        return i
                    }
                }
            },
            _longDateFormat: {
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY LT",
                LLLL: "dddd, MMMM D, YYYY LT"
            },
            longDateFormat: function(key) {
                var output = this._longDateFormat[key];
                if (!output && this._longDateFormat[key.toUpperCase()]) {
                    output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(val) {
                        return val.slice(1)
                    });
                    this._longDateFormat[key] = output
                }
                return output
            },
            isPM: function(input) {
                return (input + "").toLowerCase().charAt(0) === "p"
            },
            _meridiemParse: /[ap]\.?m?\.?/i,
            meridiem: function(hours, minutes, isLower) {
                if (hours > 11) {
                    return isLower ? "pm" : "PM"
                } else {
                    return isLower ? "am" : "AM"
                }
            },
            _calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            calendar: function(key, mom) {
                var output = this._calendar[key];
                return typeof output === "function" ? output.apply(mom) : output
            },
            _relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            relativeTime: function(number, withoutSuffix, string, isFuture) {
                var output = this._relativeTime[string];
                return typeof output === "function" ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number)
            },
            pastFuture: function(diff, output) {
                var format = this._relativeTime[diff > 0 ? "future" : "past"];
                return typeof format === "function" ? format(output) : format.replace(/%s/i, output)
            },
            ordinal: function(number) {
                return this._ordinal.replace("%d", number)
            },
            _ordinal: "%d",
            preparse: function(string) {
                return string
            },
            postformat: function(string) {
                return string
            },
            week: function(mom) {
                return weekOfYear(mom, this._week.dow, this._week.doy).week
            },
            _week: {
                dow: 0,
                doy: 6
            },
            _invalidDate: "Invalid date",
            invalidDate: function() {
                return this._invalidDate
            }
        });

        function removeFormattingTokens(input) {
            if (input.match(/\[[\s\S]/)) {
                return input.replace(/^\[|\]$/g, "")
            }
            return input.replace(/\\/g, "")
        }

        function makeFormatFunction(format) {
            var array = format.match(formattingTokens),
                i, length;
            for (i = 0, length = array.length; i < length; i++) {
                if (formatTokenFunctions[array[i]]) {
                    array[i] = formatTokenFunctions[array[i]]
                } else {
                    array[i] = removeFormattingTokens(array[i])
                }
            }
            return function(mom) {
                var output = "";
                for (i = 0; i < length; i++) {
                    output += array[i] instanceof Function ? array[i].call(mom, format) : array[i]
                }
                return output
            }
        }

        function formatMoment(m, format) {
            if (!m.isValid()) {
                return m.localeData().invalidDate()
            }
            format = expandFormat(format, m.localeData());
            if (!formatFunctions[format]) {
                formatFunctions[format] = makeFormatFunction(format)
            }
            return formatFunctions[format](m)
        }

        function expandFormat(format, locale) {
            var i = 5;

            function replaceLongDateFormatTokens(input) {
                return locale.longDateFormat(input) || input
            }
            localFormattingTokens.lastIndex = 0;
            while (i >= 0 && localFormattingTokens.test(format)) {
                format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
                localFormattingTokens.lastIndex = 0;
                i -= 1
            }
            return format
        }

        function getParseRegexForToken(token, config) {
            var a, strict = config._strict;
            switch (token) {
                case "Q":
                    return parseTokenOneDigit;
                case "DDDD":
                    return parseTokenThreeDigits;
                case "YYYY":
                case "GGGG":
                case "gggg":
                    return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
                case "Y":
                case "G":
                case "g":
                    return parseTokenSignedNumber;
                case "YYYYYY":
                case "YYYYY":
                case "GGGGG":
                case "ggggg":
                    return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
                case "S":
                    if (strict) {
                        return parseTokenOneDigit
                    }
                case "SS":
                    if (strict) {
                        return parseTokenTwoDigits
                    }
                case "SSS":
                    if (strict) {
                        return parseTokenThreeDigits
                    }
                case "DDD":
                    return parseTokenOneToThreeDigits;
                case "MMM":
                case "MMMM":
                case "dd":
                case "ddd":
                case "dddd":
                    return parseTokenWord;
                case "a":
                case "A":
                    return config._locale._meridiemParse;
                case "X":
                    return parseTokenTimestampMs;
                case "Z":
                case "ZZ":
                    return parseTokenTimezone;
                case "T":
                    return parseTokenT;
                case "SSSS":
                    return parseTokenDigits;
                case "MM":
                case "DD":
                case "YY":
                case "GG":
                case "gg":
                case "HH":
                case "hh":
                case "mm":
                case "ss":
                case "ww":
                case "WW":
                    return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
                case "M":
                case "D":
                case "d":
                case "H":
                case "h":
                case "m":
                case "s":
                case "w":
                case "W":
                case "e":
                case "E":
                    return parseTokenOneOrTwoDigits;
                case "Do":
                    return parseTokenOrdinal;
                default:
                    a = new RegExp(regexpEscape(unescapeFormat(token.replace("\\", "")), "i"));
                    return a
            }
        }

        function timezoneMinutesFromString(string) {
            string = string || "";
            var possibleTzMatches = string.match(parseTokenTimezone) || [],
                tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
                parts = (tzChunk + "").match(parseTimezoneChunker) || ["-", 0, 0],
                minutes = +(parts[1] * 60) + toInt(parts[2]);
            return parts[0] === "+" ? -minutes : minutes
        }

        function addTimeToArrayFromToken(token, input, config) {
            var a, datePartArray = config._a;
            switch (token) {
                case "Q":
                    if (input != null) {
                        datePartArray[MONTH] = (toInt(input) - 1) * 3
                    }
                    break;
                case "M":
                case "MM":
                    if (input != null) {
                        datePartArray[MONTH] = toInt(input) - 1
                    }
                    break;
                case "MMM":
                case "MMMM":
                    a = config._locale.monthsParse(input);
                    if (a != null) {
                        datePartArray[MONTH] = a
                    } else {
                        config._pf.invalidMonth = input
                    }
                    break;
                case "D":
                case "DD":
                    if (input != null) {
                        datePartArray[DATE] = toInt(input)
                    }
                    break;
                case "Do":
                    if (input != null) {
                        datePartArray[DATE] = toInt(parseInt(input, 10))
                    }
                    break;
                case "DDD":
                case "DDDD":
                    if (input != null) {
                        config._dayOfYear = toInt(input)
                    }
                    break;
                case "YY":
                    datePartArray[YEAR] = moment.parseTwoDigitYear(input);
                    break;
                case "YYYY":
                case "YYYYY":
                case "YYYYYY":
                    datePartArray[YEAR] = toInt(input);
                    break;
                case "a":
                case "A":
                    config._isPm = config._locale.isPM(input);
                    break;
                case "H":
                case "HH":
                case "h":
                case "hh":
                    datePartArray[HOUR] = toInt(input);
                    break;
                case "m":
                case "mm":
                    datePartArray[MINUTE] = toInt(input);
                    break;
                case "s":
                case "ss":
                    datePartArray[SECOND] = toInt(input);
                    break;
                case "S":
                case "SS":
                case "SSS":
                case "SSSS":
                    datePartArray[MILLISECOND] = toInt(("0." + input) * 1e3);
                    break;
                case "X":
                    config._d = new Date(parseFloat(input) * 1e3);
                    break;
                case "Z":
                case "ZZ":
                    config._useUTC = true;
                    config._tzm = timezoneMinutesFromString(input);
                    break;
                case "dd":
                case "ddd":
                case "dddd":
                    a = config._locale.weekdaysParse(input);
                    if (a != null) {
                        config._w = config._w || {};
                        config._w["d"] = a
                    } else {
                        config._pf.invalidWeekday = input
                    }
                    break;
                case "w":
                case "ww":
                case "W":
                case "WW":
                case "d":
                case "e":
                case "E":
                    token = token.substr(0, 1);
                case "gggg":
                case "GGGG":
                case "GGGGG":
                    token = token.substr(0, 2);
                    if (input) {
                        config._w = config._w || {};
                        config._w[token] = toInt(input)
                    }
                    break;
                case "gg":
                case "GG":
                    config._w = config._w || {};
                    config._w[token] = moment.parseTwoDigitYear(input)
            }
        }

        function dayOfYearFromWeekInfo(config) {
            var w, weekYear, week, weekday, dow, doy, temp;
            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
                dow = 1;
                doy = 4;
                weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
                week = dfl(w.W, 1);
                weekday = dfl(w.E, 1)
            } else {
                dow = config._locale._week.dow;
                doy = config._locale._week.doy;
                weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
                week = dfl(w.w, 1);
                if (w.d != null) {
                    weekday = w.d;
                    if (weekday < dow) {
                        ++week
                    }
                } else if (w.e != null) {
                    weekday = w.e + dow
                } else {
                    weekday = dow
                }
            }
            temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear
        }

        function dateFromConfig(config) {
            var i, date, input = [],
                currentDate, yearToUse;
            if (config._d) {
                return
            }
            currentDate = currentDateArray(config);
            if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
                dayOfYearFromWeekInfo(config)
            }
            if (config._dayOfYear) {
                yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);
                if (config._dayOfYear > daysInYear(yearToUse)) {
                    config._pf._overflowDayOfYear = true
                }
                date = makeUTCDate(yearToUse, 0, config._dayOfYear);
                config._a[MONTH] = date.getUTCMonth();
                config._a[DATE] = date.getUTCDate()
            }
            for (i = 0; i < 3 && config._a[i] == null; ++i) {
                config._a[i] = input[i] = currentDate[i]
            }
            for (; i < 7; i++) {
                config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i]
            }
            config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
            if (config._tzm != null) {
                config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm)
            }
        }

        function dateFromObject(config) {
            var normalizedInput;
            if (config._d) {
                return
            }
            normalizedInput = normalizeObjectUnits(config._i);
            config._a = [normalizedInput.year, normalizedInput.month, normalizedInput.day, normalizedInput.hour, normalizedInput.minute, normalizedInput.second, normalizedInput.millisecond];
            dateFromConfig(config)
        }

        function currentDateArray(config) {
            var now = new Date;
            if (config._useUTC) {
                return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()]
            } else {
                return [now.getFullYear(), now.getMonth(), now.getDate()]
            }
        }

        function makeDateFromStringAndFormat(config) {
            if (config._f === moment.ISO_8601) {
                parseISO(config);
                return
            }
            config._a = [];
            config._pf.empty = true;
            var string = "" + config._i,
                i, parsedInput, tokens, token, skipped, stringLength = string.length,
                totalParsedInputLength = 0;
            tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
            for (i = 0; i < tokens.length; i++) {
                token = tokens[i];
                parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
                if (parsedInput) {
                    skipped = string.substr(0, string.indexOf(parsedInput));
                    if (skipped.length > 0) {
                        config._pf.unusedInput.push(skipped)
                    }
                    string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                    totalParsedInputLength += parsedInput.length
                }
                if (formatTokenFunctions[token]) {
                    if (parsedInput) {
                        config._pf.empty = false
                    } else {
                        config._pf.unusedTokens.push(token)
                    }
                    addTimeToArrayFromToken(token, parsedInput, config)
                } else if (config._strict && !parsedInput) {
                    config._pf.unusedTokens.push(token)
                }
            }
            config._pf.charsLeftOver = stringLength - totalParsedInputLength;
            if (string.length > 0) {
                config._pf.unusedInput.push(string)
            }
            if (config._isPm && config._a[HOUR] < 12) {
                config._a[HOUR] += 12
            }
            if (config._isPm === false && config._a[HOUR] === 12) {
                config._a[HOUR] = 0
            }
            dateFromConfig(config);
            checkOverflow(config)
        }

        function unescapeFormat(s) {
            return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
                return p1 || p2 || p3 || p4
            })
        }

        function regexpEscape(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function makeDateFromStringAndArray(config) {
            var tempConfig, bestMoment, scoreToBeat, i, currentScore;
            if (config._f.length === 0) {
                config._pf.invalidFormat = true;
                config._d = new Date(NaN);
                return
            }
            for (i = 0; i < config._f.length; i++) {
                currentScore = 0;
                tempConfig = copyConfig({}, config);
                tempConfig._pf = defaultParsingFlags();
                tempConfig._f = config._f[i];
                makeDateFromStringAndFormat(tempConfig);
                if (!isValid(tempConfig)) {
                    continue
                }
                currentScore += tempConfig._pf.charsLeftOver;
                currentScore += tempConfig._pf.unusedTokens.length * 10;
                tempConfig._pf.score = currentScore;
                if (scoreToBeat == null || currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig
                }
            }
            extend(config, bestMoment || tempConfig)
        }

        function parseISO(config) {
            var i, l, string = config._i,
                match = isoRegex.exec(string);
            if (match) {
                config._pf.iso = true;
                for (i = 0, l = isoDates.length; i < l; i++) {
                    if (isoDates[i][1].exec(string)) {
                        config._f = isoDates[i][0] + (match[6] || " ");
                        break
                    }
                }
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(string)) {
                        config._f += isoTimes[i][0];
                        break
                    }
                }
                if (string.match(parseTokenTimezone)) {
                    config._f += "Z"
                }
                makeDateFromStringAndFormat(config)
            } else {
                config._isValid = false
            }
        }

        function makeDateFromString(config) {
            parseISO(config);
            if (config._isValid === false) {
                delete config._isValid;
                moment.createFromInputFallback(config)
            }
        }

        function makeDateFromInput(config) {
            var input = config._i,
                matched;
            if (input === undefined) {
                config._d = new Date
            } else if (isDate(input)) {
                config._d = new Date((+input))
            } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
                config._d = new Date((+matched[1]))
            } else if (typeof input === "string") {
                makeDateFromString(config)
            } else if (isArray(input)) {
                config._a = input.slice(0);
                dateFromConfig(config)
            } else if (typeof input === "object") {
                dateFromObject(config)
            } else if (typeof input === "number") {
                config._d = new Date(input)
            } else {
                moment.createFromInputFallback(config)
            }
        }

        function makeDate(y, m, d, h, M, s, ms) {
            var date = new Date(y, m, d, h, M, s, ms);
            if (y < 1970) {
                date.setFullYear(y)
            }
            return date
        }

        function makeUTCDate(y) {
            var date = new Date(Date.UTC.apply(null, arguments));
            if (y < 1970) {
                date.setUTCFullYear(y)
            }
            return date
        }

        function parseWeekday(input, locale) {
            if (typeof input === "string") {
                if (!isNaN(input)) {
                    input = parseInt(input, 10)
                } else {
                    input = locale.weekdaysParse(input);
                    if (typeof input !== "number") {
                        return null
                    }
                }
            }
            return input
        }

        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
            return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture)
        }

        function relativeTime(posNegDuration, withoutSuffix, locale) {
            var duration = moment.duration(posNegDuration).abs(),
                seconds = round(duration.as("s")),
                minutes = round(duration.as("m")),
                hours = round(duration.as("h")),
                days = round(duration.as("d")),
                months = round(duration.as("M")),
                years = round(duration.as("y")),
                args = seconds < relativeTimeThresholds.s && ["s", seconds] || minutes === 1 && ["m"] || minutes < relativeTimeThresholds.m && ["mm", minutes] || hours === 1 && ["h"] || hours < relativeTimeThresholds.h && ["hh", hours] || days === 1 && ["d"] || days < relativeTimeThresholds.d && ["dd", days] || months === 1 && ["M"] || months < relativeTimeThresholds.M && ["MM", months] || years === 1 && ["y"] || ["yy", years];
            args[2] = withoutSuffix;
            args[3] = +posNegDuration > 0;
            args[4] = locale;
            return substituteTimeAgo.apply({}, args)
        }

        function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
            var end = firstDayOfWeekOfYear - firstDayOfWeek,
                daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
                adjustedMoment;
            if (daysToDayOfWeek > end) {
                daysToDayOfWeek -= 7
            }
            if (daysToDayOfWeek < end - 7) {
                daysToDayOfWeek += 7
            }
            adjustedMoment = moment(mom).add(daysToDayOfWeek, "d");
            return {
                week: Math.ceil(adjustedMoment.dayOfYear() / 7),
                year: adjustedMoment.year()
            }
        }

        function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
            var d = makeUTCDate(year, 0, 1).getUTCDay(),
                daysToAdd, dayOfYear;
            d = d === 0 ? 7 : d;
            weekday = weekday != null ? weekday : firstDayOfWeek;
            daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
            dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;
            return {
                year: dayOfYear > 0 ? year : year - 1,
                dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
            }
        }

        function makeMoment(config) {
            var input = config._i,
                format = config._f;
            config._locale = config._locale || moment.localeData(config._l);
            if (input === null || format === undefined && input === "") {
                return moment.invalid({
                    nullInput: true
                })
            }
            if (typeof input === "string") {
                config._i = input = config._locale.preparse(input)
            }
            if (moment.isMoment(input)) {
                return new Moment(input, true)
            } else if (format) {
                if (isArray(format)) {
                    makeDateFromStringAndArray(config)
                } else {
                    makeDateFromStringAndFormat(config)
                }
            } else {
                makeDateFromInput(config)
            }
            return new Moment(config)
        }
        moment = function(input, format, locale, strict) {
            var c;
            if (typeof locale === "boolean") {
                strict = locale;
                locale = undefined
            }
            c = {};
            c._isAMomentObject = true;
            c._i = input;
            c._f = format;
            c._l = locale;
            c._strict = strict;
            c._isUTC = false;
            c._pf = defaultParsingFlags();
            return makeMoment(c)
        };
        moment.suppressDeprecationWarnings = false;
        moment.createFromInputFallback = deprecate("moment construction falls back to js Date. This is " + "discouraged and will be removed in upcoming major " + "release. Please refer to " + "https://github.com/moment/moment/issues/1407 for more info.", function(config) {
            config._d = new Date(config._i)
        });

        function pickBy(fn, moments) {
            var res, i;
            if (moments.length === 1 && isArray(moments[0])) {
                moments = moments[0]
            }
            if (!moments.length) {
                return moment()
            }
            res = moments[0];
            for (i = 1; i < moments.length; ++i) {
                if (moments[i][fn](res)) {
                    res = moments[i]
                }
            }
            return res
        }
        moment.min = function() {
            var args = [].slice.call(arguments, 0);
            return pickBy("isBefore", args)
        };
        moment.max = function() {
            var args = [].slice.call(arguments, 0);
            return pickBy("isAfter", args)
        };
        moment.utc = function(input, format, locale, strict) {
            var c;
            if (typeof locale === "boolean") {
                strict = locale;
                locale = undefined
            }
            c = {};
            c._isAMomentObject = true;
            c._useUTC = true;
            c._isUTC = true;
            c._l = locale;
            c._i = input;
            c._f = format;
            c._strict = strict;
            c._pf = defaultParsingFlags();
            return makeMoment(c).utc()
        };
        moment.unix = function(input) {
            return moment(input * 1e3)
        };
        moment.duration = function(input, key) {
            var duration = input,
                match = null,
                sign, ret, parseIso, diffRes;
            if (moment.isDuration(input)) {
                duration = {
                    ms: input._milliseconds,
                    d: input._days,
                    M: input._months
                }
            } else if (typeof input === "number") {
                duration = {};
                if (key) {
                    duration[key] = input
                } else {
                    duration.milliseconds = input
                }
            } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
                sign = match[1] === "-" ? -1 : 1;
                duration = {
                    y: 0,
                    d: toInt(match[DATE]) * sign,
                    h: toInt(match[HOUR]) * sign,
                    m: toInt(match[MINUTE]) * sign,
                    s: toInt(match[SECOND]) * sign,
                    ms: toInt(match[MILLISECOND]) * sign
                }
            } else if (!!(match = isoDurationRegex.exec(input))) {
                sign = match[1] === "-" ? -1 : 1;
                parseIso = function(inp) {
                    var res = inp && parseFloat(inp.replace(",", "."));
                    return (isNaN(res) ? 0 : res) * sign
                };
                duration = {
                    y: parseIso(match[2]),
                    M: parseIso(match[3]),
                    d: parseIso(match[4]),
                    h: parseIso(match[5]),
                    m: parseIso(match[6]),
                    s: parseIso(match[7]),
                    w: parseIso(match[8])
                }
            } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
                diffRes = momentsDifference(moment(duration.from), moment(duration.to));
                duration = {};
                duration.ms = diffRes.milliseconds;
                duration.M = diffRes.months
            }
            ret = new Duration(duration);
            if (moment.isDuration(input) && input.hasOwnProperty("_locale")) {
                ret._locale = input._locale
            }
            return ret
        };
        moment.version = VERSION;
        moment.defaultFormat = isoFormat;
        moment.ISO_8601 = function() {};
        moment.momentProperties = momentProperties;
        moment.updateOffset = function() {};
        moment.relativeTimeThreshold = function(threshold, limit) {
            if (relativeTimeThresholds[threshold] === undefined) {
                return false
            }
            if (limit === undefined) {
                return relativeTimeThresholds[threshold]
            }
            relativeTimeThresholds[threshold] = limit;
            return true
        };
        moment.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", function(key, value) {
            return moment.locale(key, value)
        });
        moment.locale = function(key, values) {
            var data;
            if (key) {
                if (typeof values !== "undefined") {
                    data = moment.defineLocale(key, values)
                } else {
                    data = moment.localeData(key)
                }
                if (data) {
                    moment.duration._locale = moment._locale = data
                }
            }
            return moment._locale._abbr
        };
        moment.defineLocale = function(name, values) {
            if (values !== null) {
                values.abbr = name;
                if (!locales[name]) {
                    locales[name] = new Locale
                }
                locales[name].set(values);
                moment.locale(name);
                return locales[name]
            } else {
                delete locales[name];
                return null
            }
        };
        moment.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", function(key) {
            return moment.localeData(key)
        });
        moment.localeData = function(key) {
            var locale;
            if (key && key._locale && key._locale._abbr) {
                key = key._locale._abbr
            }
            if (!key) {
                return moment._locale
            }
            if (!isArray(key)) {
                locale = loadLocale(key);
                if (locale) {
                    return locale
                }
                key = [key]
            }
            return chooseLocale(key)
        };
        moment.isMoment = function(obj) {
            return obj instanceof Moment || obj != null && obj.hasOwnProperty("_isAMomentObject")
        };
        moment.isDuration = function(obj) {
            return obj instanceof Duration
        };
        for (i = lists.length - 1; i >= 0; --i) {
            makeList(lists[i])
        }
        moment.normalizeUnits = function(units) {
            return normalizeUnits(units)
        };
        moment.invalid = function(flags) {
            var m = moment.utc(NaN);
            if (flags != null) {
                extend(m._pf, flags)
            } else {
                m._pf.userInvalidated = true
            }
            return m
        };
        moment.parseZone = function() {
            return moment.apply(null, arguments).parseZone()
        };
        moment.parseTwoDigitYear = function(input) {
            return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3)
        };
        extend(moment.fn = Moment.prototype, {
            clone: function() {
                return moment(this)
            },
            valueOf: function() {
                return +this._d + (this._offset || 0) * 6e4
            },
            unix: function() {
                return Math.floor(+this / 1e3)
            },
            toString: function() {
                return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            },
            toDate: function() {
                return this._offset ? new Date((+this)) : this._d
            },
            toISOString: function() {
                var m = moment(this).utc();
                if (0 < m.year() && m.year() <= 9999) {
                    return formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                } else {
                    return formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                }
            },
            toArray: function() {
                var m = this;
                return [m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds(), m.milliseconds()]
            },
            isValid: function() {
                return isValid(this)
            },
            isDSTShifted: function() {
                if (this._a) {
                    return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0
                }
                return false
            },
            parsingFlags: function() {
                return extend({}, this._pf)
            },
            invalidAt: function() {
                return this._pf.overflow
            },
            utc: function(keepLocalTime) {
                return this.zone(0, keepLocalTime)
            },
            local: function(keepLocalTime) {
                if (this._isUTC) {
                    this.zone(0, keepLocalTime);
                    this._isUTC = false;
                    if (keepLocalTime) {
                        this.add(this._d.getTimezoneOffset(), "m")
                    }
                }
                return this
            },
            format: function(inputString) {
                var output = formatMoment(this, inputString || moment.defaultFormat);
                return this.localeData().postformat(output)
            },
            add: createAdder(1, "add"),
            subtract: createAdder(-1, "subtract"),
            diff: function(input, units, asFloat) {
                var that = makeAs(input, this),
                    zoneDiff = (this.zone() - that.zone()) * 6e4,
                    diff, output;
                units = normalizeUnits(units);
                if (units === "year" || units === "month") {
                    diff = (this.daysInMonth() + that.daysInMonth()) * 432e5;
                    output = (this.year() - that.year()) * 12 + (this.month() - that.month());
                    output += (this - moment(this).startOf("month") - (that - moment(that).startOf("month"))) / diff;
                    output -= (this.zone() - moment(this).startOf("month").zone() - (that.zone() - moment(that).startOf("month").zone())) * 6e4 / diff;
                    if (units === "year") {
                        output = output / 12
                    }
                } else {
                    diff = this - that;
                    output = units === "second" ? diff / 1e3 : units === "minute" ? diff / 6e4 : units === "hour" ? diff / 36e5 : units === "day" ? (diff - zoneDiff) / 864e5 : units === "week" ? (diff - zoneDiff) / 6048e5 : diff
                }
                return asFloat ? output : absRound(output)
            },
            from: function(time, withoutSuffix) {
                return moment.duration({
                    to: this,
                    from: time
                }).locale(this.locale()).humanize(!withoutSuffix)
            },
            fromNow: function(withoutSuffix) {
                return this.from(moment(), withoutSuffix)
            },
            calendar: function(time) {
                var now = time || moment(),
                    sod = makeAs(now, this).startOf("day"),
                    diff = this.diff(sod, "days", true),
                    format = diff < -6 ? "sameElse" : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1 ? "sameDay" : diff < 2 ? "nextDay" : diff < 7 ? "nextWeek" : "sameElse";
                return this.format(this.localeData().calendar(format, this))
            },
            isLeapYear: function() {
                return isLeapYear(this.year())
            },
            isDST: function() {
                return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
            },
            day: function(input) {
                var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                if (input != null) {
                    input = parseWeekday(input, this.localeData());
                    return this.add(input - day, "d")
                } else {
                    return day
                }
            },
            month: makeAccessor("Month", true),
            startOf: function(units) {
                units = normalizeUnits(units);
                switch (units) {
                    case "year":
                        this.month(0);
                    case "quarter":
                    case "month":
                        this.date(1);
                    case "week":
                    case "isoWeek":
                    case "day":
                        this.hours(0);
                    case "hour":
                        this.minutes(0);
                    case "minute":
                        this.seconds(0);
                    case "second":
                        this.milliseconds(0)
                }
                if (units === "week") {
                    this.weekday(0)
                } else if (units === "isoWeek") {
                    this.isoWeekday(1)
                }
                if (units === "quarter") {
                    this.month(Math.floor(this.month() / 3) * 3)
                }
                return this
            },
            endOf: function(units) {
                units = normalizeUnits(units);
                return this.startOf(units).add(1, units === "isoWeek" ? "week" : units).subtract(1, "ms")
            },
            isAfter: function(input, units) {
                units = typeof units !== "undefined" ? units : "millisecond";
                return +this.clone().startOf(units) > +moment(input).startOf(units)
            },
            isBefore: function(input, units) {
                units = typeof units !== "undefined" ? units : "millisecond";
                return +this.clone().startOf(units) < +moment(input).startOf(units)
            },
            isSame: function(input, units) {
                units = units || "ms";
                return +this.clone().startOf(units) === +makeAs(input, this).startOf(units)
            },
            min: deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(other) {
                other = moment.apply(null, arguments);
                return other < this ? this : other
            }),
            max: deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(other) {
                other = moment.apply(null, arguments);
                return other > this ? this : other
            }),
            zone: function(input, keepLocalTime) {
                var offset = this._offset || 0,
                    localAdjust;
                if (input != null) {
                    if (typeof input === "string") {
                        input = timezoneMinutesFromString(input)
                    }
                    if (Math.abs(input) < 16) {
                        input = input * 60
                    }
                    if (!this._isUTC && keepLocalTime) {
                        localAdjust = this._d.getTimezoneOffset()
                    }
                    this._offset = input;
                    this._isUTC = true;
                    if (localAdjust != null) {
                        this.subtract(localAdjust, "m")
                    }
                    if (offset !== input) {
                        if (!keepLocalTime || this._changeInProgress) {
                            addOrSubtractDurationFromMoment(this, moment.duration(offset - input, "m"), 1, false)
                        } else if (!this._changeInProgress) {
                            this._changeInProgress = true;
                            moment.updateOffset(this, true);
                            this._changeInProgress = null
                        }
                    }
                } else {
                    return this._isUTC ? offset : this._d.getTimezoneOffset()
                }
                return this
            },
            zoneAbbr: function() {
                return this._isUTC ? "UTC" : ""
            },
            zoneName: function() {
                return this._isUTC ? "Coordinated Universal Time" : ""
            },
            parseZone: function() {
                if (this._tzm) {
                    this.zone(this._tzm)
                } else if (typeof this._i === "string") {
                    this.zone(this._i)
                }
                return this
            },
            hasAlignedHourOffset: function(input) {
                if (!input) {
                    input = 0
                } else {
                    input = moment(input).zone()
                }
                return (this.zone() - input) % 60 === 0
            },
            daysInMonth: function() {
                return daysInMonth(this.year(), this.month())
            },
            dayOfYear: function(input) {
                var dayOfYear = round((moment(this).startOf("day") - moment(this).startOf("year")) / 864e5) + 1;
                return input == null ? dayOfYear : this.add(input - dayOfYear, "d")
            },
            quarter: function(input) {
                return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3)
            },
            weekYear: function(input) {
                var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
                return input == null ? year : this.add(input - year, "y")
            },
            isoWeekYear: function(input) {
                var year = weekOfYear(this, 1, 4).year;
                return input == null ? year : this.add(input - year, "y")
            },
            week: function(input) {
                var week = this.localeData().week(this);
                return input == null ? week : this.add((input - week) * 7, "d")
            },
            isoWeek: function(input) {
                var week = weekOfYear(this, 1, 4).week;
                return input == null ? week : this.add((input - week) * 7, "d")
            },
            weekday: function(input) {
                var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
                return input == null ? weekday : this.add(input - weekday, "d")
            },
            isoWeekday: function(input) {
                return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7)
            },
            isoWeeksInYear: function() {
                return weeksInYear(this.year(), 1, 4)
            },
            weeksInYear: function() {
                var weekInfo = this.localeData()._week;
                return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy)
            },
            get: function(units) {
                units = normalizeUnits(units);
                return this[units]()
            },
            set: function(units, value) {
                units = normalizeUnits(units);
                if (typeof this[units] === "function") {
                    this[units](value)
                }
                return this
            },
            locale: function(key) {
                if (key === undefined) {
                    return this._locale._abbr
                } else {
                    this._locale = moment.localeData(key);
                    return this
                }
            },
            lang: deprecate("moment().lang() is deprecated. Use moment().localeData() instead.", function(key) {
                if (key === undefined) {
                    return this.localeData()
                } else {
                    this._locale = moment.localeData(key);
                    return this
                }
            }),
            localeData: function() {
                return this._locale
            }
        });

        function rawMonthSetter(mom, value) {
            var dayOfMonth;
            if (typeof value === "string") {
                value = mom.localeData().monthsParse(value);
                if (typeof value !== "number") {
                    return mom
                }
            }
            dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
            mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
            return mom
        }

        function rawGetter(mom, unit) {
            return mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]()
        }

        function rawSetter(mom, unit, value) {
            if (unit === "Month") {
                return rawMonthSetter(mom, value)
            } else {
                return mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value)
            }
        }

        function makeAccessor(unit, keepTime) {
            return function(value) {
                if (value != null) {
                    rawSetter(this, unit, value);
                    moment.updateOffset(this, keepTime);
                    return this
                } else {
                    return rawGetter(this, unit)
                }
            }
        }
        moment.fn.millisecond = moment.fn.milliseconds = makeAccessor("Milliseconds", false);
        moment.fn.second = moment.fn.seconds = makeAccessor("Seconds", false);
        moment.fn.minute = moment.fn.minutes = makeAccessor("Minutes", false);
        moment.fn.hour = moment.fn.hours = makeAccessor("Hours", true);
        moment.fn.date = makeAccessor("Date", true);
        moment.fn.dates = deprecate("dates accessor is deprecated. Use date instead.", makeAccessor("Date", true));
        moment.fn.year = makeAccessor("FullYear", true);
        moment.fn.years = deprecate("years accessor is deprecated. Use year instead.", makeAccessor("FullYear", true));
        moment.fn.days = moment.fn.day;
        moment.fn.months = moment.fn.month;
        moment.fn.weeks = moment.fn.week;
        moment.fn.isoWeeks = moment.fn.isoWeek;
        moment.fn.quarters = moment.fn.quarter;
        moment.fn.toJSON = moment.fn.toISOString;

        function daysToYears(days) {
            return days * 400 / 146097
        }

        function yearsToDays(years) {
            return years * 146097 / 400
        }
        extend(moment.duration.fn = Duration.prototype, {
            _bubble: function() {
                var milliseconds = this._milliseconds,
                    days = this._days,
                    months = this._months,
                    data = this._data,
                    seconds, minutes, hours, years = 0;
                data.milliseconds = milliseconds % 1e3;
                seconds = absRound(milliseconds / 1e3);
                data.seconds = seconds % 60;
                minutes = absRound(seconds / 60);
                data.minutes = minutes % 60;
                hours = absRound(minutes / 60);
                data.hours = hours % 24;
                days += absRound(hours / 24);
                years = absRound(daysToYears(days));
                days -= absRound(yearsToDays(years));
                months += absRound(days / 30);
                days %= 30;
                years += absRound(months / 12);
                months %= 12;
                data.days = days;
                data.months = months;
                data.years = years
            },
            abs: function() {
                this._milliseconds = Math.abs(this._milliseconds);
                this._days = Math.abs(this._days);
                this._months = Math.abs(this._months);
                this._data.milliseconds = Math.abs(this._data.milliseconds);
                this._data.seconds = Math.abs(this._data.seconds);
                this._data.minutes = Math.abs(this._data.minutes);
                this._data.hours = Math.abs(this._data.hours);
                this._data.months = Math.abs(this._data.months);
                this._data.years = Math.abs(this._data.years);
                return this
            },
            weeks: function() {
                return absRound(this.days() / 7)
            },
            valueOf: function() {
                return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6
            },
            humanize: function(withSuffix) {
                var output = relativeTime(this, !withSuffix, this.localeData());
                if (withSuffix) {
                    output = this.localeData().pastFuture(+this, output)
                }
                return this.localeData().postformat(output)
            },
            add: function(input, val) {
                var dur = moment.duration(input, val);
                this._milliseconds += dur._milliseconds;
                this._days += dur._days;
                this._months += dur._months;
                this._bubble();
                return this
            },
            subtract: function(input, val) {
                var dur = moment.duration(input, val);
                this._milliseconds -= dur._milliseconds;
                this._days -= dur._days;
                this._months -= dur._months;
                this._bubble();
                return this
            },
            get: function(units) {
                units = normalizeUnits(units);
                return this[units.toLowerCase() + "s"]()
            },
            as: function(units) {
                var days, months;
                units = normalizeUnits(units);
                days = this._days + this._milliseconds / 864e5;
                if (units === "month" || units === "year") {
                    months = this._months + daysToYears(days) * 12;
                    return units === "month" ? months : months / 12
                } else {
                    days += yearsToDays(this._months / 12);
                    switch (units) {
                        case "week":
                            return days / 7;
                        case "day":
                            return days;
                        case "hour":
                            return days * 24;
                        case "minute":
                            return days * 24 * 60;
                        case "second":
                            return days * 24 * 60 * 60;
                        case "millisecond":
                            return days * 24 * 60 * 60 * 1e3;
                        default:
                            throw new Error("Unknown unit " + units)
                    }
                }
            },
            lang: moment.fn.lang,
            locale: moment.fn.locale,
            toIsoString: deprecate("toIsoString() is deprecated. Please use toISOString() instead " + "(notice the capitals)", function() {
                return this.toISOString()
            }),
            toISOString: function() {
                var years = Math.abs(this.years()),
                    months = Math.abs(this.months()),
                    days = Math.abs(this.days()),
                    hours = Math.abs(this.hours()),
                    minutes = Math.abs(this.minutes()),
                    seconds = Math.abs(this.seconds() + this.milliseconds() / 1e3);
                if (!this.asSeconds()) {
                    return "P0D"
                }
                return (this.asSeconds() < 0 ? "-" : "") + "P" + (years ? years + "Y" : "") + (months ? months + "M" : "") + (days ? days + "D" : "") + (hours || minutes || seconds ? "T" : "") + (hours ? hours + "H" : "") + (minutes ? minutes + "M" : "") + (seconds ? seconds + "S" : "")
            },
            localeData: function() {
                return this._locale
            }
        });

        function makeDurationGetter(name) {
            moment.duration.fn[name] = function() {
                return this._data[name]
            }
        }
        for (i in unitMillisecondFactors) {
            if (unitMillisecondFactors.hasOwnProperty(i)) {
                makeDurationGetter(i.toLowerCase())
            }
        }
        moment.duration.fn.asMilliseconds = function() {
            return this.as("ms")
        };
        moment.duration.fn.asSeconds = function() {
            return this.as("s")
        };
        moment.duration.fn.asMinutes = function() {
            return this.as("m")
        };
        moment.duration.fn.asHours = function() {
            return this.as("h")
        };
        moment.duration.fn.asDays = function() {
            return this.as("d")
        };
        moment.duration.fn.asWeeks = function() {
            return this.as("weeks")
        };
        moment.duration.fn.asMonths = function() {
            return this.as("M")
        };
        moment.duration.fn.asYears = function() {
            return this.as("y")
        };
        moment.locale("en", {
            ordinal: function(number) {
                var b = number % 10,
                    output = toInt(number % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
                return number + output
            }
        });

        function makeGlobal(shouldDeprecate) {
            if (typeof ender !== "undefined") {
                return
            }
            oldGlobalMoment = globalScope.moment;
            if (shouldDeprecate) {
                globalScope.moment = deprecate("Accessing Moment through the global scope is " + "deprecated, and will be removed in an upcoming " + "release.", moment)
            } else {
                globalScope.moment = moment
            }
        }
        if (hasModule) {
            module.exports = moment
        } else if (typeof define === "function" && define.amd) {
            define("moment", function(require, exports, module) {
                if (module.config && module.config() && module.config().noGlobal === true) {
                    globalScope.moment = oldGlobalMoment
                }
                return moment
            });
            makeGlobal(true)
        } else {
            makeGlobal()
        }
    }).call(this)
});
define("xg/eid-company-zy/1.0.4/c/handlebars/headerTmp-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += '<div class="navbar navbar-fixed-top">\r\n    <div class="container-fluid cl">\r\n        <img src="http://static.hpbanking.com/xg/uploads/files/040c322110142f68750ea2c701dd588f-123-39.png" alt="" id="logoUrl">\r\n        <a class="logo navbar-logo f-l mr-10" href="#">身份标识查询系统1111</a>\r\n        <span class="logo navbar-slogan f-l mr-10">v1.6</span>\r\n        <nav id="Hui-userbar" class="nav navbar-nav navbar-userbar hidden-xs">\r\n            <ul class="cl">\r\n                <li id="headerCompanyName">\r\n                    ';
        if (helper = helpers.companyName) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.companyName;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '&nbsp;&nbsp;\r\n                </li>\r\n                <li id="headerRealName">\r\n                    ';
        if (helper = helpers.realName) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.realName;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '\r\n                </li>\r\n                <li class="dropDown dropDown_hover">\r\n                    <input type="hidden" id="companyId" value="2">\r\n                    <a href="#" class="dropDown_A" id="headerRoleName">';
        if (helper = helpers.roleName) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.roleName;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '<i class="Hui-iconfont"></i></a>\r\n                    <ul class="dropDown-menu menu radius box-shadow">\r\n                        <li data-customerid="';
        if (helper = helpers.customerId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.customerId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"\r\n                            data-mobile="';
        if (helper = helpers.mobile) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobile;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"\r\n                            data-realname="';
        if (helper = helpers.realName) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.realName;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n                            <a id="modifyInfo">修改信息</a>\r\n                        </li>\r\n                        <li><a id="modifyPassword">修改密码</a></li>\r\n                        <li><a id="logout" data-usertype="';
        if (helper = helpers.userType) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.userType;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">退出</a></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </nav>\r\n    </div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company-zy/1.0.4/c/handlebars/modifyPassword-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div id="modal-modifyPassword" class="modal fade">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content radius">\r\n            <div class="modal-header">\r\n                <h3 class="modal-title ml20">修改密码</h3>\r\n                <a class="close" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n            </div>\r\n            <form class="form form-horizontal" id="modifyPasswordForm">\r\n                <div class="modal-body">\r\n                    <div class="row cl">\r\n                        <label class="form-label col-xs-4 col-sm-3">当前密码：</label>\r\n                        <div class="formControls col-xs-8 col-sm-9">\r\n                            <input type="password" class="input-text w320" placeholder="请输入老密码" name="olderPassword" id="olderPassword">\r\n                        </div>\r\n                    </div>\r\n                    <div class="row cl">\r\n                        <label class="form-label col-xs-4 col-sm-3">新密码：</label>\r\n                        <div class="formControls col-xs-8 col-sm-9">\r\n                            <input type="password" class="input-text w320" placeholder="请输入新密码" name="newPassword" id="newPassword">\r\n                        </div>\r\n                    </div>\r\n                    <div class="row cl">\r\n                        <label class="form-label col-xs-4 col-sm-3">新密码确认：</label>\r\n                        <div class="formControls col-xs-8 col-sm-9">\r\n                            <input type="password" class="input-text w320" placeholder="再次输入新密码" id="confirm" name="confirm">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class="modal-footer">\r\n                    <input class="btn btn-primary" type="submit" value="确定">\r\n                    <a class="btn mr23" data-dismiss="modal" aria-hidden="true">关闭</a>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>'
    })
});
define("xg/eid-company-zy/1.0.4/c/handlebars/modifyInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div id="modal-modifyInfo" class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content radius">\r\n            <div class="modal-header">\r\n                <h2 class="modal-title">修改个人信息</h2>\r\n                <a class="close" data-dismiss="modal" aria-hidden="true">×</a>\r\n            </div>\r\n            <form class="form form-horizontal" id="modifyInfoForm">\r\n                <div class="modal-body" style="overflow: hidden">\r\n                    <div class="row cl">\r\n                        <label class="labelText col-xs-4 col-sm-3 text-c">手机号码：</label>\r\n                        <div class="formControls col-xs-8 col-sm-9">\r\n                            <input type="hidden" class="input-text pull-left" id="customerId" name="customerId">\r\n                            <input type="text" class="input-text pull-left" id="mobile" name="mobile" maxlength="11" placeholder="请输入手机号码">\r\n                        </div>\r\n                    </div>\r\n                    <div class="row cl mt10">\r\n                        <label class="labelText col-xs-4 col-sm-3 text-c">姓名：</label>\r\n                        <div class="formControls col-xs-8 col-sm-9">\r\n                            <input type="text" class="input-text pull-left" id="realName" name="realName" placeholder="请输入姓名">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class="modal-footer">\r\n                    <input class="btn btn-primary" type="submit" value="确定">\r\n                    <a class="btn" data-dismiss="modal" aria-hidden="true">关闭</a>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>'
    })
});
define("xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, self = this,
            helperMissing = helpers.helperMissing,
            functionType = "function",
            escapeExpression = this.escapeExpression;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += "\r\n                    ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.flowStatus, "<", "20", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.flowStatus, "<", "20", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n                   ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.flowStatus, ">=", 20, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.flowStatus, ">=", 20, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n                ";
            return buffer
        }

        function program2(depth0, data) {
            return '\r\n                    <img class="ani" class="idtySuccess" src="http://static.hpbanking.com/xg/uploads/files/5ee0ca886ef076cde7a0ab5bc917e945-100-90.png" alt="" style="position: absolute;right:20%;top:1%;">\r\n                   '
        }

        function program4(depth0, data) {
            return '\r\n                        <img class="ani" class="idtySuccess" src="http://static.hpbanking.com/xg/uploads/files/1740c91f0e8e8693b11fdae912208f6a-100-90.png" alt=""style="position: absolute;right:20%;top:1%;">\r\n                   '
        }

        function program6(depth0, data) {
            return '\r\n                    <img class="ani" class="idtySuccess" src="http://static.hpbanking.com/xg/uploads/files/4aac038d56ea2090a5e8d3cadd88c64c-100-90.png" alt=""style="position: absolute;right:20%;top:1%;">\r\n                    \r\n                 '
        }

        function program8(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n                <div class="pull-left identitiesBox">\r\n                    <div class="identity identityFront pull-left">\r\n                        <div class="pull-left w170 clearfix">\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">姓名</span><span class="addText">';
            if (helper = helpers.borrowerName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.borrowerName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">性别</span><span class="addText">' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</span><span class="ml-15 lightblue">民族</span>\r\n                                <span class="addText">';
            if (helper = helpers.nation) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.nation;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">出生</span><span class="addText">';
            if (helper = helpers.birthdate) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.birthdate;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</span>\r\n                            </div>\r\n                            <div class="lineBox" style="height:14px;line-height:14px !important;">\r\n                                <span class="lightblue">住址</span><span class="addText">';
            if (helper = helpers.address) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.address;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class="pull-right w80 mr-10">\r\n                            <img src="';
            if (helper = helpers.imgUrl) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.imgUrl;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '" class="frontPic">\r\n                        </div>\r\n                        <div class="lineBox clearfix" style="position: absolute;bottom: 20px;">\r\n                            <span class="lightblue">公民身份证号码</span><span class="addText">';
            if (helper = helpers.cardNum) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.cardNum;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</span>\r\n                        </div>\r\n                    </div>\r\n                    <div class="identity identityBack pull-left ml29">\r\n                        <div class="lineBox pdl20 mt100">\r\n                            <span class="">签发机关</span><span class="addText">';
            if (helper = helpers.issuer) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.issuer;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</span>\r\n                        </div>\r\n                        <div class="lineBox pdl20">\r\n                            <span class="">有效期限</span><span class="addText">' + escapeExpression((helper = helpers.transform || depth0 && depth0.transform, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.validDate, options) : helperMissing.call(depth0, "transform", depth0 && depth0.validDate, options))) + '</span>\r\n                        </div>\r\n                    </div>\r\n                    <div class="currentPic pull-left ml29">\r\n                        <img src="';
            if (helper = helpers.faceUrl) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.faceUrl;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '" width="186" height="186">\r\n                        <img id="frame" src="http://static.hpbanking.com/xg/uploads/files/28fd24d40a6d325f3cb7085b7f37ef41-140-140.png">\r\n                        <div id="scanline"></div>\r\n                    </div>\r\n                </div>\r\n                ';
            return buffer
        }

        function program10(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n                <div style="margin-top:80px;">\r\n                    <div class="identityFrontthir pull-left ml29" style="width:300px;height:180px;">\r\n                        ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(11, program11, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "==", depth0 && depth0.null, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(13, program13, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "!=", depth0 && depth0.null, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n\r\n                    </div>\r\n                    <div class="identityFrontthir pull-left ml29" style="width:300px;height:180px;">\r\n                        ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(11, program11, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.backImage, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.backImage, "==", depth0 && depth0.null, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(15, program15, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.backImage, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.backImage, "!=", depth0 && depth0.null, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n\r\n                    </div>\r\n                    <div class="identityFrontthir pull-left ml29">\r\n                        ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(17, program17, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(19, program19, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n\r\n                    </div>\r\n                    <div class="identityFrontthir pull-left ml29">\r\n                        ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(21, program21, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.imgUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.imgUrl, "==", depth0 && depth0.null, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(23, program23, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.imgUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.imgUrl, "!=", depth0 && depth0.null, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                ";
            return buffer
        }

        function program11(depth0, data) {
            var buffer = "";
            buffer += '\r\n                        <div class="currentPic pull-left ml29" style="margin:16px 0 0 45px;">\r\n                            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n                        </div>\r\n                         ';
            return buffer
        }

        function program13(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n                        <div class="pic-bg id-pic">\r\n                            <img src="';
            if (helper = helpers.frontImage) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.frontImage;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '" style="height: 180px;width: 300px;">\r\n                        </div>\r\n                         ';
            return buffer
        }

        function program15(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n                        <div class="pic-bg id-pic">\r\n                            <img src="';
            if (helper = helpers.backImage) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.backImage;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '" style="height: 180px;width: 300px;">\r\n                        </div>\r\n                         ';
            return buffer
        }

        function program17(depth0, data) {
            var buffer = "";
            buffer += '\r\n                        <div class="currentPic pull-left ml29" style="margin:16px 0 0 -78px;">\r\n                            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n                        </div>\r\n                         ';
            return buffer
        }

        function program19(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n                        <div class=" phonos">\r\n                            <img src="';
            if (helper = helpers.faceUrl) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.faceUrl;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '" style="height: 180px;width: 170px;">\r\n                        </div>\r\n                         ';
            return buffer
        }

        function program21(depth0, data) {
            var buffer = "";
            buffer += '\r\n                        <div class="currentPic pull-left ml29" style="margin:16px 0 0 8px;">\r\n                            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n                        </div>\r\n                         ';
            return buffer
        }

        function program23(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n                        <div class=" phono">\r\n                            <img src="';
            if (helper = helpers.imgUrl) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.imgUrl;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '" style="height: 180px;width: 170px;">\r\n                        </div>\r\n                         ';
            return buffer
        }

        function program25(depth0, data) {
            return "\r\n            <div class=\"modalFooter\">\r\n                <div class='nextBtn next'>下一步</div>\r\n                <div id='uploadImg' class='nextBtn upload displayNone'>上传</div>\r\n                <div class='nextBtn confirm displayNone'>确定</div>\r\n            </div>\r\n            "
        }

        function program27(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += "\r\n            <div class=\"modalFooter\" id='second-footer'>\r\n                \r\n                ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(28, program28, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.flowStatus, ">=", 20, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.flowStatus, ">=", 20, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n                ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(30, program30, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.flowStatus, "<", 20, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.flowStatus, "<", 20, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n                ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(32, program32, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.flowStatus, "<", 20, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.flowStatus, "<", 20, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n                <div id='uploadImg' class='nextBtn upload displayNone'>上传</div>\r\n                <div class='nextBtn confirm displayNone'>确定</div>\r\n            </div>\r\n            <div class=\"modalFooter displayNone\" id='confirm-footer' style=\"position: absolute;top:330px;left:500px;\">\r\n                <div class='nextBtn next'>下一步</div>\r\n            </div>\r\n            ";
            return buffer
        }

        function program28(depth0, data) {
            return "<div class='nextBtn next'>下一步</div>"
        }

        function program30(depth0, data) {
            return "<div class='nextBtn end-bar'>结束查询</div>"
        }

        function program32(depth0, data) {
            return "<div class='nextBtn confirm-me'>我已确定是本人</div> "
        }
        buffer += '<div id="modal-checkInfo" class="modal fade myModal" style="margin-left: -535px;position:fixed;width:1200px;">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content radius">\r\n            <div class="modalHeader">\r\n                \r\n                <div class="header">\r\n                    <span class="tab1 current">人脸对比结果</span>\r\n                    <span class="tab2">授权书上传</span>\r\n                    <span class="tab3">手机号校验授权</span>\r\n                </div>\r\n                <a class="close mr5 pull-right" id="closeBtn" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n            </div>\r\n            <div class="modalBody modal1" data-result="';
        if (helper = helpers.result) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.result;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n                \r\n                <!--result==0?"人脸比对成功":"人脸比对失败";-->\r\n                 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " \r\n                 \r\n                ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(6, program6, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n                  \r\n                        \r\n                    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(8, program8, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "==", "", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "==", "", options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n                 ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(8, program8, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n\r\n                \r\n                \r\n                 ";
        stack1 = helpers["if"].call(depth0, depth0 && depth0.frontImage, {
            hash: {},
            inverse: self.noop,
            fn: self.program(10, program10, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n                   \r\n                 \r\n            </div>\r\n\r\n            <div class="modalBody modal2 displayNone">\r\n                <div class="title">请上传被查询人授权书和身份证合照，注意身份证勿遮挡授权书</div>\r\n                <form name="form0" method="post" id="form0">\r\n                    <div class="addFile">\r\n                        <input type="file" id="file0" name=\'file0\' multiple="multiple">\r\n                        <img id=\'img0\' class="displayNone" src="" alt="">\r\n                        <img src="http://static.hpbanking.com/xg/uploads/files/9ad55f5bc9cfacfc959d74c56468df27-50-50.png" alt="" style="margin-top:80px;">\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class="modalBody modal3 displayNone">\r\n                <div class="phoneNum">\r\n                    <label for="mobile">手机号码：</label>\r\n                    <input class="input-text w222 phone ml20 mobileNum" id="mobile" maxlength="13" placeholder="请输入被查询人实名号码">\r\n                </div>\r\n                <div class="accreditNum">\r\n                    <label class="accredit" for="accredit">授权码：</label>\r\n                    <input class="input-text w222 phone ml20" id="accredit" maxlength="13" placeholder="请输入授权码">\r\n                    <button id="infoSureToModalBtn" data-result="';
        if (helper = helpers.result) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.result;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-encryptkey="';
        if (helper = helpers.encryptKey) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.encryptKey;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-borrowername="';
        if (helper = helpers.borrowerName) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.borrowerName;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"\r\n                        data-sex="';
        if (helper = helpers.sex) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.sex;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-nation="';
        if (helper = helpers.nation) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.nation;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-birthdate="';
        if (helper = helpers.birthdate) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.birthdate;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-address="';
        if (helper = helpers.address) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.address;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"\r\n                        data-imgUrl="';
        if (helper = helpers.imgUrl) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.imgUrl;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-issuer="';
        if (helper = helpers.issuer) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.issuer;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-validDate="';
        if (helper = helpers.validDate) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.validDate;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-faceUrl="';
        if (helper = helpers.faceUrl) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.faceUrl;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"\r\n                        data-cardnum="';
        if (helper = helpers.cardNum) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.cardNum;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-itemid="';
        if (helper = helpers.itemId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.itemId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-customerid="';
        if (helper = helpers.customerId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.customerId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" data-companyid="';
        if (helper = helpers.companyId) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.companyId;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '"\r\n                        data-mobilestatus="';
        if (helper = helpers.mobileStatus) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobileStatus;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">发送授权码</button>\r\n                </div>\r\n            </div>\r\n             ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(25, program25, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(27, program27, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n    <div id=\'endChaxun\' class="modal fade displayNone" style="position:fixed;width:500px; height:228px;top:20%;left:51%;opacity:1;z-index:100000" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">\r\n        <div class="modal-dialog" role="document">\r\n            <div class="modal-content">\r\n            <div class="modal-header">\r\n                <button type="button" class="close cancel-button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\r\n                <h4 class="modal-title" id="gridSystemModalLabel">温馨提示</h4>\r\n            </div>\r\n            \r\n            <div class="modal-body">\r\n                <h4 style="margin: 30px;margin-left:136px;">您确定结束查询么？</h4>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button"  class="btn btn-default cancel-button" style="margin-right:46px;" data-dismiss="modal">否</button>\r\n                <button type="button" id=\'end-button\' class="btn btn-primary" style="margin-right:185px;">是</button>\r\n            </div>\r\n            </div><!-- /.modal-content -->\r\n        </div><!-- /.modal-dialog -->\r\n    </div>\r\n    \r\n    <div id=\'bushibenren\' class="modal fade displayNone" style="position:fixed;width:500px; height:228px;top:20%;left:51%;opacity:1;z-index:100000" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">\r\n        <div class="modal-dialog" role="document">\r\n            <div class="modal-content">\r\n            <div class="modal-header">\r\n                <button type="button" class="close cancel-button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\r\n                <h4 class="modal-title" id="gridSystemModalLabel">温馨提示</h4>\r\n            </div>\r\n            <div class="modal-body">\r\n                <h4 style="margin: 30px;">手机号与本人不匹配！是否继续查询？</h4>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button"  class="btn btn-default cancel-button" style="margin-right:46px;" data-dismiss="modal">否</button>\r\n                <button type="button" class="btn btn-primary end-button" style="margin-right:185px;">是</button>\r\n            </div>\r\n            </div><!-- /.modal-content -->\r\n        </div><!-- /.modal-dialog -->\r\n    </div>';
        return buffer
    })
});
define("xg/eid-company-zy/1.0.4/c/handlebars/versionH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div id="modal-version" class="modal fade">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content radius">\r\n            <div class="modal-header">\r\n                <h4 class="modal-title ml20">提示</h4>\r\n                <a class="close" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n            </div>\r\n            <div class="modal-body">\r\n                <h4>为了更好的体验，请升级到IE9及以上版本！</h4>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <a class="btn btn-primary" href="https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&tn=80035161_2_dg&wd=ie%E6%B5%8F%E8%A7%88%E5%99%A8%E5%AE%98%E6%96%B9%E4%B8%8B%E8%BD%BD&oq=www.baiducom&rsv_pq=8cea002a000002a7&rsv_t=4e10AvIkVl%2FX0p9hHF79eHZCgGrGWlXPKUF0SynIeNMTz0y6eQEFIvkhJtOVXSyOTYKvng&rqlang=cn&rsv_enter=1&rsv_sug3=3&rsv_sug1=1&rsv_sug7=100&rsv_sug2=1&prefixsug=ie&rsp=0&inputT=3830&rsv_sug4=3831">确定</a>\r\n                <a class="btn mr23" data-dismiss="modal" aria-hidden="true">关闭</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>'
    })
});
define("xg/eid-company-zy/1.0.4/c/js/jquery-debug.pager", [], function(require, exports, module) {
    (function($) {
        $.fn.pager = function(options) {
            var opts = $.extend({}, $.fn.pager.defaults, options);
            return this.each(function() {
                $(this).empty().append(renderpager(parseInt(options.pagenumber), parseInt(options.pagecount), options.buttonClickCallback, parseInt(options.totalcount)));
                $(".pages li").mouseover(function() {
                    document.body.style.cursor = "pointer"
                }).mouseout(function() {
                    document.body.style.cursor = "auto"
                });
                if ($(".pgNextgo").closest("div").css("display") == "block") {
                    $(".pgNextgo").unbind("click").click(function() {
                        var gotoval = $(this).closest("div").find("#gotoval").val();
                        var intval = parseInt(gotoval);
                        var re = /^[1-9]+[0-9]*]*$/;
                        var total = String($(this).closest("div").find(".thpointa").html());
                        if (isNaN(gotoval) || gotoval <= 0 || intval > total.substring(2, total.length - 1) || !re.test(gotoval)) {
                            lqtTuSi("请输入1到" + total.substring(2, total.length - 1) + "的整数值！", 2e3);
                            return false
                        }
                        options.buttonClickCallback(intval)
                    })
                }
            })
        };

        function renderpager(pagenumber, pagecount, buttonClickCallback, totalcount) {
            var $pager = $('<ul class="pages"></ul>');
            $pager.append(renderButton("首页", pagenumber, pagecount, buttonClickCallback)).append(renderButton("上一页", pagenumber, pagecount, buttonClickCallback));
            var startPoint = 1;
            var endPoint = 9;
            var thpoint = "<li class='thpoint'>...</li>";
            if (pagenumber > 4) {
                startPoint = pagenumber - 4;
                endPoint = pagenumber + 4
            }
            if (endPoint > pagecount) {
                startPoint = pagecount - 8;
                endPoint = pagecount;
                thpoint = ""
            }
            if (startPoint < 1) {
                startPoint = 1
            }
            for (var page = startPoint; page <= endPoint; page++) {
                var currentButton = $('<li class="page-number">' + page + "</li>");
                page == pagenumber ? currentButton.addClass("pgCurrent") : currentButton.click(function() {
                    buttonClickCallback(this.firstChild.data)
                });
                currentButton.appendTo($pager)
            }
            $pager.append(thpoint).append(renderButton("下一页", pagenumber, pagecount, buttonClickCallback)).append(renderButton("末页", pagenumber, pagecount, buttonClickCallback));
            $pager.append("<li class='thpointa' style='margin-top:3px;'>共: " + pagecount + " 页 " + totalcount + " 条</li>");
            var strgoto = $("<li class='thpoint'>选择第<input type='text' value='" + pagenumber + "'maxlength='6' id='gotoval' style='width:20px; height:16px;margin-top:-3px;padding-top:2px;padding-left:10px;'/>页</li>");
            $pager.append(strgoto);
            $pager.append($('<li class="pgNextgo">go</li>'));
            return $pager
        }

        function lqtTuSi(msg, delay) {
            $(".tusi").empty().remove();
            var tipdiv = "<span class='tusi'>" + msg + "</span>";
            $("body").append(tipdiv);
            $(".tusi").css("top", $(document).scrollTop() + ($(window).height() - $(".tusi").height()) / 2);
            $(".tusi").css("left", $(document).scrollLeft() + ($(window).width() - $(".tusi").width()) / 2);
            $(".tusi").show();
            setTimeout(function() {
                $(".tusi").hide()
            }, delay)
        }

        function renderButton(buttonLabel, pagenumber, pagecount, buttonClickCallback) {
            var $Button = $('<li class="pgNext">' + buttonLabel + "</li>");
            var destPage = 1;
            switch (buttonLabel) {
                case "首页":
                    destPage = 1;
                    break;
                case "上一页":
                    destPage = pagenumber - 1;
                    break;
                case "下一页":
                    destPage = pagenumber + 1;
                    break;
                case "末页":
                    destPage = pagecount;
                    break
            }
            if (buttonLabel == "首页" || buttonLabel == "上一页") {
                pagenumber <= 1 ? $Button.addClass("pgEmpty") : $Button.click(function() {
                    buttonClickCallback(destPage)
                })
            } else {
                pagenumber >= pagecount ? $Button.addClass("pgEmpty") : $Button.click(function() {
                    buttonClickCallback(destPage)
                })
            }
            return $Button
        }
        $.fn.pager.defaults = {
            pagenumber: 1,
            pagecount: 1
        }
    })(jQuery)
});
define("xg/eid-company-zy/1.0.4/c/js/registerHelper-debug", ["xg/eid-company-zy/1.0.4/c/js/tools-debug", "jquery/jquery/1.10.1/jquery-debug", "xg/eid-company-zy/1.0.4/c/js/bootstrap-debug", "xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate", "xg/eid-company-zy/1.0.4/c/js/validate-add-methods-debug", "xg/eid-company-zy/1.0.4/c/js/validate-messages-cn-debug", "xg/eid-company-zy/1.0.4/c/js/moment-debug", "xg/eid-company-zy/1.0.4/c/handlebars/headerTmp-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/modifyPassword-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/modifyInfo-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/versionH-debug.handlebars", "alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Tools = require("xg/eid-company-zy/1.0.4/c/js/tools-debug");
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {
        switch (operator) {
            case "!=":
                return v1 != v2 ? options.fn(this) : options.inverse(this);
            case "==":
                return v1 == v2 ? options.fn(this) : options.inverse(this);
            case "===":
                return v1 === v2 ? options.fn(this) : options.inverse(this);
            case "<":
                return v1 < v2 ? options.fn(this) : options.inverse(this);
            case "<=":
                return v1 <= v2 ? options.fn(this) : options.inverse(this);
            case ">":
                return v1 > v2 ? options.fn(this) : options.inverse(this);
            case ">=":
                return v1 >= v2 ? options.fn(this) : options.inverse(this);
            case "&&":
                return v1 && v2 ? options.fn(this) : options.inverse(this);
            case "||":
                return v1 || v2 ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this)
        }
    });
    Handlebars.registerHelper("getLocalTime1", function(item) {
        return Tools.getnewdate(item)
    });
    Handlebars.registerHelper("formatDate", function(item, options) {
        return Tools.formatDate(item)
    });
    Handlebars.registerHelper("formatDateFull", function(item, options) {
        return Tools.formatDateAll(item)
    });
    Handlebars.registerHelper("formatstatu", function(item, options) {
        return Tools.formatstatu(item, options)
    });
    Handlebars.registerHelper("formatstatue", function(item, options) {
        return Tools.formatstatue(item, options)
    });
    Handlebars.registerHelper("formatstatues", function(item, options) {
        return Tools.formatstatues(item, options)
    });
    Handlebars.registerHelper("formatDateAll", function(operator, item, options) {
        var timeObj = Tools.showCountDown(item);
        switch (operator) {
            case "day":
                return timeObj.d;
            case "hour":
                return timeObj.h;
            case "minute":
                return timeObj.m
        }
    });
    Handlebars.registerHelper("statusText", function(value, options) {
        var status = ["未处理", "已通过", "未通过", "黑名单"];
        return status[value]
    });
    Handlebars.registerHelper("check", function(item, options) {
        return item == 0 ? "未查看" : "已查看"
    });
    Handlebars.registerHelper("infoStatus", function(item, options) {
        var status = "";
        if (item == 0) {
            status = "已查看"
        } else if (item == 1) {
            status = "已通过"
        } else if (item == 2) {
            status = "未通过"
        } else if (item == 3) {
            status = "黑名单"
        }
        return status
    });
    Handlebars.registerHelper("accountStatusInList", function(item, options) {
        return item == 0 ? "启用" : "禁用"
    });
    Handlebars.registerHelper("accountStatus", function(item, options) {
        return item == 0 ? "禁用" : "启用"
    });
    Handlebars.registerHelper("infoSex", function(item, options) {
        if (item == null || item == "") {
            return "--"
        } else {
            return item == 2 ? "女" : "男"
        }
    });
    Handlebars.registerHelper("infoResult", function(item, options) {
        if (item == 0) {
            return "人脸比对成功"
        } else {
            if (options == 40) {
                return "人脸比对失败,人工审核通过"
            }
        }
    });
    Handlebars.registerHelper("infoResults", function(item, options) {
        if (item == 0) {
            return "人脸比对成功"
        } else {
            if (options == -20) {
                return "人脸比对失败,人工审核失败"
            } else if (options == 20) {
                return "人脸比对失败,人工审核成功"
            } else if (options != -20 && options != -20) {
                return "人脸比对失败"
            }
        }
    });
    Handlebars.registerHelper("formatMoney", function(item, options) {
        return Tools.formatMoney(item)
    });
    Handlebars.registerHelper("validateStatus", function(item, options) {
        var status = ["手机号码与身份未校验", "手机号码与身份匹配失败", "手机号码与身份匹配成功"];
        return status[item]
    });
    Handlebars.registerHelper("countAge", function(item, options) {
        if (item != null && item != "") {
            var year = item.substring(0, 4);
            var now = (new Date).getFullYear();
            return now - year + 1
        } else {
            return "--"
        }
    });
    Handlebars.registerHelper("getIndex0", function(item, options) {
        console.log(item[0]);
        return item[0]
    });
    Handlebars.registerHelper("getIndex1", function(item, options) {
        console.log(item[1]);
        return item[1]
    });
    Handlebars.registerHelper("getIndex2", function(item, options) {
        console.log(item[2]);
        return item[2]
    });
    Handlebars.registerHelper("setMobile", function(item, options) {
        var phone = item;
        phone = phone.split("");
        phone.splice(3, 0, "-");
        phone.splice(8, 0, "-");
        return phone.join("")
    });
    Handlebars.registerHelper("setNull", function(item, options) {
        console.log("item:" + item);
        if (item == null || item == "") {
            return "--"
        } else {
            return item
        }
    });
    Handlebars.registerHelper("transform", function(item, options) {
        if (item == null || item == "") {
            return "--"
        } else {
            return item.replace(/[\/\/]/g, ".")
        }
    });
    Handlebars.registerHelper("h", function(item, options) {
        if (item == null || item == "") {
            return "--"
        } else {
            return item
        }
    });
    Handlebars.registerHelper("addOne", function(index, options) {
        return parseInt(index) + 1
    });
    Handlebars.registerHelper("substrNum", function(index) {
        return index.substr(-3, 1)
    });
    Handlebars.registerHelper("isEmpty", function(item) {
        if (item && item != " ") {
            return item
        } else {
            return "查无数据"
        }
    })
});
define("xg/eid-company-zy/1.0.4/c/static/h-ui/js/H-ui-debug", ["jquery/jquery/1.10.1/jquery-debug"], function(require, exports, module) {
    var $ = require("jquery/jquery/1.10.1/jquery-debug");
    ! function(a, b, c) {
        "use strict";
        var d = function(d, e) {
            var f = !!b.getComputedStyle;
            f || (b.getComputedStyle = function(a) {
                return this.el = a, this.getPropertyValue = function(b) {
                    var c = /(\-([a-z]){1})/g;
                    return "float" === b && (b = "styleFloat"), c.test(b) && (b = b.replace(c, function() {
                        return arguments[2].toUpperCase()
                    })), a.currentStyle[b] ? a.currentStyle[b] : null
                }, this
            });
            var g, h, i, j, k, l, m = function(a, b, c, d) {
                    if ("addEventListener" in a) try {
                        a.addEventListener(b, c, d)
                    } catch (e) {
                        if ("object" != typeof c || !c.handleEvent) throw e;
                        a.addEventListener(b, function(a) {
                            c.handleEvent.call(c, a)
                        }, d)
                    } else "attachEvent" in a && ("object" == typeof c && c.handleEvent ? a.attachEvent("on" + b, function() {
                        c.handleEvent.call(c)
                    }) : a.attachEvent("on" + b, c))
                },
                n = function(a, b, c, d) {
                    if ("removeEventListener" in a) try {
                        a.removeEventListener(b, c, d)
                    } catch (e) {
                        if ("object" != typeof c || !c.handleEvent) throw e;
                        a.removeEventListener(b, function(a) {
                            c.handleEvent.call(c, a)
                        }, d)
                    } else "detachEvent" in a && ("object" == typeof c && c.handleEvent ? a.detachEvent("on" + b, function() {
                        c.handleEvent.call(c)
                    }) : a.detachEvent("on" + b, c))
                },
                o = function(a) {
                    if (a.children.length < 1) throw new Error("The Nav container has no containing elements");
                    for (var b = [], c = 0; c < a.children.length; c++) 1 === a.children[c].nodeType && b.push(a.children[c]);
                    return b
                },
                p = function(a, b) {
                    for (var c in b) a.setAttribute(c, b[c])
                },
                q = function(a, b) {
                    0 !== a.className.indexOf(b) && (a.className += " " + b, a.className = a.className.replace(/(^\s*)|(\s*$)/g, ""))
                },
                r = function(a, b) {
                    var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
                    a.className = a.className.replace(c, " ").replace(/(^\s*)|(\s*$)/g, "")
                },
                s = function(a, b, c) {
                    for (var d = 0; d < a.length; d++) b.call(c, d, a[d])
                },
                t = a.createElement("style"),
                u = a.documentElement,
                v = function(b, c) {
                    var d;
                    this.options = {
                        animate: !0,
                        transition: 284,
                        label: "Menu",
                        insert: "before",
                        customToggle: "",
                        closeOnNavClick: !1,
                        openPos: "relative",
                        navClass: "nav-collapse",
                        navActiveClass: "js-nav-active",
                        jsClass: "js",
                        init: function() {},
                        open: function() {},
                        close: function() {}
                    };
                    for (d in c) this.options[d] = c[d];
                    if (q(u, this.options.jsClass), this.wrapperEl = b.replace("#", ""), a.getElementById(this.wrapperEl)) this.wrapper = a.getElementById(this.wrapperEl);
                    else {
                        if (!a.querySelector(this.wrapperEl)) throw new Error("The nav element you are trying to select doesn't exist");
                        this.wrapper = a.querySelector(this.wrapperEl)
                    }
                    this.wrapper.inner = o(this.wrapper), h = this.options, g = this.wrapper, this._init(this)
                };
            return v.prototype = {
                destroy: function() {
                    this._removeStyles(), r(g, "closed"), r(g, "opened"), r(g, h.navClass), r(g, h.navClass + "-" + this.index), r(u, h.navActiveClass), g.removeAttribute("style"), g.removeAttribute("aria-hidden"), n(b, "resize", this, !1), n(b, "focus", this, !1), n(a.body, "touchmove", this, !1), n(i, "touchstart", this, !1), n(i, "touchend", this, !1), n(i, "mouseup", this, !1), n(i, "keyup", this, !1), n(i, "click", this, !1), h.customToggle ? i.removeAttribute("aria-hidden") : i.parentNode.removeChild(i)
                },
                toggle: function() {
                    j === !0 && (l ? this.close() : this.open())
                },
                open: function() {
                    l || (r(g, "closed"), q(g, "opened"), q(u, h.navActiveClass), q(i, "active"), g.style.position = h.openPos, p(g, {
                        "aria-hidden": "false"
                    }), l = !0, h.open())
                },
                close: function() {
                    l && (q(g, "closed"), r(g, "opened"), r(u, h.navActiveClass), r(i, "active"), p(g, {
                        "aria-hidden": "true"
                    }), h.animate ? (j = !1, setTimeout(function() {
                        g.style.position = "absolute", j = !0
                    }, h.transition + 10)) : g.style.position = "absolute", l = !1, h.close())
                },
                resize: function() {
                    "none" !== b.getComputedStyle(i, null).getPropertyValue("display") ? (k = !0, p(i, {
                        "aria-hidden": "false"
                    }), g.className.match(/(^|\s)closed(\s|$)/) && (p(g, {
                        "aria-hidden": "true"
                    }), g.style.position = "absolute"), this._createStyles(), this._calcHeight()) : (k = !1, p(i, {
                        "aria-hidden": "true"
                    }), p(g, {
                        "aria-hidden": "false"
                    }), g.style.position = h.openPos, this._removeStyles())
                },
                handleEvent: function(a) {
                    var c = a || b.event;
                    switch (c.type) {
                        case "touchstart":
                            this._onTouchStart(c);
                            break;
                        case "touchmove":
                            this._onTouchMove(c);
                            break;
                        case "touchend":
                        case "mouseup":
                            this._onTouchEnd(c);
                            break;
                        case "click":
                            this._preventDefault(c);
                            break;
                        case "keyup":
                            this._onKeyUp(c);
                            break;
                        case "focus":
                        case "resize":
                            this.resize(c)
                    }
                },
                _init: function() {
                    this.index = c++, q(g, h.navClass), q(g, h.navClass + "-" + this.index), q(g, "closed"), j = !0, l = !1, this._closeOnNavClick(), this._createToggle(), this._transitions(), this.resize();
                    var d = this;
                    setTimeout(function() {
                        d.resize()
                    }, 20), m(b, "resize", this, !1), m(b, "focus", this, !1), m(a.body, "touchmove", this, !1), m(i, "touchstart", this, !1), m(i, "touchend", this, !1), m(i, "mouseup", this, !1), m(i, "keyup", this, !1), m(i, "click", this, !1), h.init()
                },
                _createStyles: function() {
                    t.parentNode || (t.type = "text/css", a.getElementsByTagName("head")[0].appendChild(t))
                },
                _removeStyles: function() {
                    t.parentNode && t.parentNode.removeChild(t)
                },
                _createToggle: function() {
                    if (h.customToggle) {
                        var b = h.customToggle.replace("#", "");
                        if (a.getElementById(b)) i = a.getElementById(b);
                        else {
                            if (!a.querySelector(b)) throw new Error("The custom nav toggle you are trying to select doesn't exist");
                            i = a.querySelector(b)
                        }
                    } else {
                        var c = a.createElement("a");
                        c.innerHTML = h.label, p(c, {
                            href: "#",
                            class: "nav-toggle"
                        }), "after" === h.insert ? g.parentNode.insertBefore(c, g.nextSibling) : g.parentNode.insertBefore(c, g), i = c
                    }
                },
                _closeOnNavClick: function() {
                    if (h.closeOnNavClick) {
                        var a = g.getElementsByTagName("a"),
                            b = this;
                        s(a, function(c) {
                            m(a[c], "click", function() {
                                k && b.toggle()
                            }, !1)
                        })
                    }
                },
                _preventDefault: function(a) {
                    return a.preventDefault ? (a.stopImmediatePropagation && a.stopImmediatePropagation(), a.preventDefault(), a.stopPropagation(), !1) : void(a.returnValue = !1)
                },
                _onTouchStart: function(a) {
                    Event.prototype.stopImmediatePropagation || this._preventDefault(a), this.startX = a.touches[0].clientX, this.startY = a.touches[0].clientY, this.touchHasMoved = !1, n(i, "mouseup", this, !1)
                },
                _onTouchMove: function(a) {
                    (Math.abs(a.touches[0].clientX - this.startX) > 10 || Math.abs(a.touches[0].clientY - this.startY) > 10) && (this.touchHasMoved = !0)
                },
                _onTouchEnd: function(a) {
                    if (this._preventDefault(a), k && !this.touchHasMoved) {
                        if ("touchend" === a.type) return void this.toggle();
                        var c = a || b.event;
                        3 !== c.which && 2 !== c.button && this.toggle()
                    }
                },
                _onKeyUp: function(a) {
                    var c = a || b.event;
                    13 === c.keyCode && this.toggle()
                },
                _transitions: function() {
                    if (h.animate) {
                        var a = g.style,
                            b = "max-height " + h.transition + "ms";
                        a.WebkitTransition = a.MozTransition = a.OTransition = a.transition = b
                    }
                },
                _calcHeight: function() {
                    for (var a = 0, b = 0; b < g.inner.length; b++) a += g.inner[b].offsetHeight;
                    var c = "." + h.jsClass + " ." + h.navClass + "-" + this.index + ".opened{max-height:" + a + "px !important} ." + h.jsClass + " ." + h.navClass + "-" + this.index + ".opened.dropdown-active {max-height:9999px !important}";
                    t.styleSheet ? t.styleSheet.cssText = c : t.innerHTML = c, c = ""
                }
            }, new v(d, e)
        };
        "undefined" != typeof module && module.exports ? module.exports = d : b.responsiveNav = d
    }(document, window, 0);
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
    }(function(window, document, $) {
        var isInputSupported = "placeholder" in document.createElement("input");
        var isTextareaSupported = "placeholder" in document.createElement("textarea");
        var prototype = $.fn;
        var valHooks = $.valHooks;
        var propHooks = $.propHooks;
        var hooks;
        var placeholder;
        if (isInputSupported && isTextareaSupported) {
            placeholder = prototype.placeholder = function() {
                return this
            };
            placeholder.input = placeholder.textarea = true
        } else {
            placeholder = prototype.placeholder = function() {
                var $this = this;
                $this.filter((isInputSupported ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
                    "focus.placeholder": clearPlaceholder,
                    "blur.placeholder": setPlaceholder
                }).data("placeholder-enabled", true).trigger("blur.placeholder");
                return $this
            };
            placeholder.input = isInputSupported;
            placeholder.textarea = isTextareaSupported;
            hooks = {
                get: function(element) {
                    var $element = $(element);
                    var $passwordInput = $element.data("placeholder-password");
                    if ($passwordInput) {
                        return $passwordInput[0].value
                    }
                    return $element.data("placeholder-enabled") && $element.hasClass("placeholder") ? "" : element.value
                },
                set: function(element, value) {
                    var $element = $(element);
                    var $passwordInput = $element.data("placeholder-password");
                    if ($passwordInput) {
                        return $passwordInput[0].value = value
                    }
                    if (!$element.data("placeholder-enabled")) {
                        return element.value = value
                    }
                    if (value == "") {
                        element.value = value;
                        if (element != safeActiveElement()) {
                            setPlaceholder.call(element)
                        }
                    } else if ($element.hasClass("placeholder")) {
                        clearPlaceholder.call(element, true, value) || (element.value = value)
                    } else {
                        element.value = value
                    }
                    return $element
                }
            };
            if (!isInputSupported) {
                valHooks.input = hooks;
                propHooks.value = hooks
            }
            if (!isTextareaSupported) {
                valHooks.textarea = hooks;
                propHooks.value = hooks
            }
            $(function() {
                $(document).delegate("form", "submit.placeholder", function() {
                    var $inputs = $(".placeholder", this).each(clearPlaceholder);
                    setTimeout(function() {
                        $inputs.each(setPlaceholder)
                    }, 10)
                })
            });
            $(window).bind("beforeunload.placeholder", function() {
                $(".placeholder").each(function() {
                    this.value = ""
                })
            })
        }

        function args(elem) {
            var newAttrs = {};
            var rinlinejQuery = /^jQuery\d+$/;
            $.each(elem.attributes, function(i, attr) {
                if (attr.specified && !rinlinejQuery.test(attr.name)) {
                    newAttrs[attr.name] = attr.value
                }
            });
            return newAttrs
        }

        function clearPlaceholder(event, value) {
            var input = this;
            var $input = $(input);
            if (input.value == $input.attr("placeholder") && $input.hasClass("placeholder")) {
                if ($input.data("placeholder-password")) {
                    $input = $input.hide().next().show().attr("id", $input.removeAttr("id").data("placeholder-id"));
                    if (event === true) {
                        return $input[0].value = value
                    }
                    $input.focus()
                } else {
                    input.value = "";
                    $input.removeClass("placeholder");
                    input == safeActiveElement() && input.select()
                }
            }
        }

        function setPlaceholder() {
            var $replacement;
            var input = this;
            var $input = $(input);
            var id = this.id;
            if (input.value == "") {
                if (input.type == "password") {
                    if (!$input.data("placeholder-textinput")) {
                        try {
                            $replacement = $input.clone().prop("type", "text")
                        } catch (e) {
                            $replacement = $("<input>").prop($.extend(args(this), {
                                type: "text"
                            }))
                        }
                        $replacement.removeAttr("name").data({
                            "placeholder-password": $input,
                            "placeholder-id": id
                        }).bind("focus.placeholder", clearPlaceholder);
                        $input.data({
                            "placeholder-textinput": $replacement,
                            "placeholder-id": id
                        }).before($replacement)
                    }
                    $input = $input.removeAttr("id").hide().prev().attr("id", id).show()
                }
                $input.addClass("placeholder");
                $input[0].value = $input.attr("placeholder")
            } else {
                $input.removeClass("placeholder")
            }
        }

        function safeActiveElement() {
            try {
                return document.activeElement
            } catch (exception) {}
        }
    })(this, document, jQuery);
    (function($) {
        $.extend({
            format: function(str, step, splitor) {
                str = str.toString();
                var len = str.length;
                if (len > step) {
                    var l1 = len % step,
                        l2 = parseInt(len / step),
                        arr = [],
                        first = str.substr(0, l1);
                    if (first != "") {
                        arr.push(first)
                    }
                    for (var i = 0; i < l2; i++) {
                        arr.push(str.substr(l1 + i * step, step))
                    }
                    str = arr.join(splitor)
                }
                return str
            }
        })
    })(jQuery); + function($) {
        "use strict";
        var backdrop = ".dropdown-backdrop";
        var toggle = '[data-toggle="dropdown"]';
        var Dropdown = function(element) {
            $(element).on("click.bs.dropdown", this.toggle)
        };
        Dropdown.VERSION = "3.3.5";

        function getParent($this) {
            var selector = $this.attr("data-target");
            if (!selector) {
                selector = $this.attr("href");
                selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "")
            }
            var $parent = selector && $(selector);
            return $parent && $parent.length ? $parent : $this.parent()
        }

        function clearMenus(e) {
            if (e && e.which === 3) return;
            $(backdrop).remove();
            $(toggle).each(function() {
                var $this = $(this);
                var $parent = getParent($this);
                var relatedTarget = {
                    relatedTarget: this
                };
                if (!$parent.hasClass("open")) return;
                if (e && e.type == "click" && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;
                $parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget));
                if (e.isDefaultPrevented()) return;
                $this.attr("aria-expanded", "false");
                $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget)
            })
        }
        Dropdown.prototype.toggle = function(e) {
            var $this = $(this);
            if ($this.is(".disabled, :disabled")) return;
            var $parent = getParent($this);
            var isActive = $parent.hasClass("open");
            clearMenus();
            if (!isActive) {
                if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
                    $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus)
                }
                var relatedTarget = {
                    relatedTarget: this
                };
                $parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget));
                if (e.isDefaultPrevented()) return;
                $this.trigger("focus").attr("aria-expanded", "true");
                $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget)
            }
            return false
        };
        Dropdown.prototype.keydown = function(e) {
            if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
            var $this = $(this);
            e.preventDefault();
            e.stopPropagation();
            if ($this.is(".disabled, :disabled")) return;
            var $parent = getParent($this);
            var isActive = $parent.hasClass("open");
            if (!isActive && e.which != 27 || isActive && e.which == 27) {
                if (e.which == 27) $parent.find(toggle).trigger("focus");
                return $this.trigger("click")
            }
            var desc = " li:not(.disabled):visible a";
            var $items = $parent.find(".dropdown-menu" + desc);
            if (!$items.length) return;
            var index = $items.index(e.target);
            if (e.which == 38 && index > 0) index--;
            if (e.which == 40 && index < $items.length - 1) index++;
            if (!~index) index = 0;
            $items.eq(index).trigger("focus")
        };

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.dropdown");
                if (!data) {
                    $this.data("bs.dropdown", data = new Dropdown(this))
                }
                if (typeof option == "string") {
                    data[option].call($this)
                }
            })
        }
        var old = $.fn.dropdown;
        $.fn.dropdown = Plugin;
        $.fn.dropdown.Constructor = Dropdown;
        $.fn.dropdown.noConflict = function() {
            $.fn.dropdown = old;
            return this
        };
        $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
            e.stopPropagation()
        }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown)
    }(jQuery);
    ! function($) {
        $.fn.togglePassword = function(options) {
            var s = $.extend($.fn.togglePassword.defaults, options),
                input = $(this);
            $(s.el).on(s.ev, function() {
                "password" == $(input).attr("type") ? $(input).attr("type", "text") : $(input).attr("type", "password")
            })
        };
        $.fn.togglePassword.defaults = {
            ev: "click"
        }
    }(jQuery);
    ! function($) {
        "use strict";
        $(function() {
            $.support.transition = function() {
                var transitionEnd = function() {
                    var el = document.createElement("bootstrap"),
                        transEndEventNames = {
                            WebkitTransition: "webkitTransitionEnd",
                            MozTransition: "transitionend",
                            OTransition: "oTransitionEnd otransitionend",
                            transition: "transitionend"
                        },
                        name;
                    for (name in transEndEventNames) {
                        if (el.style[name] !== undefined) {
                            return transEndEventNames[name]
                        }
                    }
                }();
                return transitionEnd && {
                    end: transitionEnd
                }
            }()
        })
    }(window.jQuery);

    function addFavorite(name, site) {
        try {
            window.external.addFavorite(site, name)
        } catch (e) {
            try {
                window.sidebar.addPanel(name, site, "")
            } catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加")
            }
        }
    }

    function addFavoritepage() {
        var sURL = window.location.href;
        var sTitle = document.title;
        try {
            window.external.addFavorite(sURL, sTitle)
        } catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "")
            } catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加")
            }
        }
    }

    function setHome(obj) {
        try {
            obj.style.behavior = "url(#default#homepage)";
            obj.setHomePage(webSite)
        } catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                } catch (e) {
                    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入\"about:config\"并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。")
                }
                var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref("browser.startup.homepage", url)
            }
        }
    }

    function marquee(height, speed, delay) {
        var scrollT;
        var pause = false;
        var ScrollBox = document.getElementById("marquee");
        if (document.getElementById("holder").offsetHeight <= height) return;
        var _tmp = ScrollBox.innerHTML.replace("holder", "holder2");
        ScrollBox.innerHTML += _tmp;
        ScrollBox.onmouseover = function() {
            pause = true
        };
        ScrollBox.onmouseout = function() {
            pause = false
        };
        ScrollBox.scrollTop = 0;

        function start() {
            scrollT = setInterval(scrolling, speed);
            if (!pause) ScrollBox.scrollTop += 2
        }

        function scrolling() {
            if (ScrollBox.scrollTop % height != 0) {
                ScrollBox.scrollTop += 2;
                if (ScrollBox.scrollTop >= ScrollBox.scrollHeight / 2) ScrollBox.scrollTop = 0
            } else {
                clearInterval(scrollT);
                setTimeout(start, delay)
            }
        }
        setTimeout(start, delay)
    }

    function displaynavbar(obj) {
        if ($(obj).hasClass("open")) {
            $(obj).removeClass("open");
            $("body").removeClass("big-page")
        } else {
            $(obj).addClass("open");
            $("body").addClass("big-page")
        }
    }
    jQuery.Huiselect = function(divselectid, inputselectid) {
        var inputselect = $(inputselectid);
        $(divselectid + " cite").click(function() {
            var ul = $(divselectid + " ul");
            ul.slideToggle()
        });
        $(divselectid + " ul li a").click(function() {
            var txt = $(this).text();
            $(divselectid + " cite").html(txt);
            var value = $(this).attr("selectid");
            inputselect.val(value);
            $(divselectid + " ul").hide()
        });
        $(document).click(function() {
            $(divselectid + " ul").hide()
        })
    };
    jQuery.Huihover = function(obj) {
        $(obj).hover(function() {
            $(this).addClass("hover")
        }, function() {
            $(this).removeClass("hover")
        })
    };
    jQuery.Huifocusblur = function(obj) {
        $(obj).focus(function() {
            $(this).addClass("focus").removeClass("inputError")
        });
        $(obj).blur(function() {
            $(this).removeClass("focus")
        })
    };
    jQuery.Huitab = function(tabBar, tabCon, class_name, tabEvent, i) {
        var $tab_menu = $(tabBar);
        $tab_menu.removeClass(class_name);
        $(tabBar).eq(i).addClass(class_name);
        $(tabCon).hide();
        $(tabCon).eq(i).show();
        $tab_menu.on(tabEvent, function() {
            $tab_menu.removeClass(class_name);
            $(this).addClass(class_name);
            var index = $tab_menu.index(this);
            $(tabCon).hide();
            $(tabCon).eq(index).show()
        })
    };
    jQuery.Huifold = function(obj, obj_c, speed, obj_type, Event) {
        if (obj_type == 2) {
            $(obj + ":first").find("b").html("-");
            $(obj_c + ":first").show()
        }
        $(obj).on(Event, function() {
            if ($(this).next().is(":visible")) {
                if (obj_type == 2) {
                    return false
                } else {
                    $(this).next().slideUp(speed).end().removeClass("selected");
                    if ($(this).find("b")) {
                        $(this).find("b").html("+")
                    }
                }
            } else {
                if (obj_type == 3) {
                    $(this).next().slideDown(speed).end().addClass("selected");
                    if ($(this).find("b")) {
                        $(this).find("b").html("-")
                    }
                } else {
                    $(obj_c).slideUp(speed);
                    $(obj).removeClass("selected");
                    if ($(this).find("b")) {
                        $(obj).find("b").html("+")
                    }
                    $(this).next().slideDown(speed).end().addClass("selected");
                    if ($(this).find("b")) {
                        $(this).find("b").html("-")
                    }
                }
            }
        })
    };
    var $backToTopEle = $('<a href="javascript:void(0)" class="Hui-iconfont toTop" title="返回顶部" alt="返回顶部" style="display:none">&#xe684;</a>').appendTo($("body")).click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 120)
    });
    var $backToTopFun = function() {
        var st = $(document).scrollTop(),
            winh = $(window).height();
        st > 0 ? $backToTopEle.show() : $backToTopEle.hide();
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166)
        }
    };

    function textarealength(obj, maxlength) {
        var v = $(obj).val();
        var l = v.length;
        if (l > maxlength) {
            v = v.substring(0, maxlength);
            $(obj).val(v)
        }
        $(obj).parent().find(".textarea-length").text(v.length)
    }

    function Huimodal_alert(info, speed) {
        if (speed == 0 || typeof speed == "undefined") {
            $(document.body).append('<div id="modal-alert" class="modal hide modal-alert">' + '<div class="modal-alert-info">' + info + "</div>" + '<div class="modal-footer"> <button class="btn btn-primary radius" onClick="modal_alert_hide()">确定</button></div>' + "</div>");
            $("#modal-alert").fadeIn()
        } else {
            $(document.body).append('<div id="modal-alert" class="modal hide modal-alert">' + '<div class="modal-alert-info">' + info + "</div>" + "</div>");
            $("#modal-alert").fadeIn();
            setTimeout("Huimodal_alert_hide()", speed)
        }
    }

    function Huimodal_alert_hide() {
        $("#modal-alert").fadeOut("normal", function() {
            $("#modal-alert").remove()
        })
    }

    function setCookie(name, value, Days) {
        if (Days == null || Days == "") {
            Days = 300
        }
        var exp = new Date;
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1e3);
        document.cookie = name + "=" + escape(value) + "; path=/;expires=" + exp.toGMTString()
    }

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) return unescape(arr[2]);
        else return null
    }
    $(function() {
        $.Huifocusblur(".input-text,.textarea");
        $(".btn-loading").click(function() {
            var $btn = $(this);
            var btnval = $btn.val();
            $btn.addClass("disabled").val("loading").attr("disabled", "disabled");
            setTimeout(function() {
                $btn.removeClass("disabled").val(btnval).removeAttr("disabled")
            }, 3e3)
        });
        $.Huiselect("#divselect", "#inputselect");
        $("table thead th input:checkbox").on("click", function() {
            $(this).closest("table").find("tr > td:first-child input:checkbox").prop("checked", $("table thead th input:checkbox").prop("checked"))
        });
        $(document).on("change", ".input-file", function() {
            var uploadVal = $(this).val();
            $(this).parent().find(".upload-url").val(uploadVal).focus().blur()
        });
        $(document).on("mouseenter", ".dropDown", function() {
            $(this).addClass("hover")
        });
        $(document).on("mouseleave", ".dropDown", function() {
            $(this).removeClass("hover")
        });
        $(document).on("mouseenter", ".dropDown_hover", function() {
            $(this).addClass("open")
        });
        $(document).on("mouseleave", ".dropDown_hover", function() {
            $(this).removeClass("open")
        });
        $(document).on("click", ".dropDown-menu li a", function() {
            $(".dropDown").removeClass("open")
        });
        $(document).on("mouseenter", ".menu > li", function() {
            $(this).addClass("open")
        });
        $(document).on("mouseleave", ".menu > li", function() {
            $(this).removeClass("open")
        });
        var tags_a = $(".tags a");
        tags_a.each(function() {
            var x = 9;
            var y = 0;
            var rand = parseInt(Math.random() * (x - y + 1) + y);
            $(this).addClass("tags" + rand)
        });
        var dual = $(".dual");
        var dual_close = $("a.dual_close");
        var screen_w = screen.width;
        if (screen_w > 1024) {
            dual.show()
        }
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            dual.stop().animate({
                top: scrollTop + 260
            })
        });
        dual_close.click(function() {
            $(this).parent().hide();
            return false
        });
        $("#banner").slideDown("slow");
        $("a.preview").hover(function() {
            $(this).addClass("active");
            $("#tooltip-preview").remove();
            var winW = $(window).width();
            var winW5 = winW / 2;
            this.myTitle = this.title;
            this.title = "";
            var midimg = $(this).attr("data-preview");
            if (midimg == "") {
                return false
            } else {
                var imgT = $(this).parents(".imgItem").offset().top;
                var imgL = $(this).parents(".imgItem").offset().left;
                var imgW = $(this).parents(".imgItem").width();
                var imgH = $(this).parents(".imgItem").height();
                var ww = imgL + imgW / 2;
                if (ww < winW5) {
                    var tooltipLeft = imgW + imgL + "px"
                } else {
                    var tooltipRight = winW - imgL + "px"
                }
                var tooltip_keleyi_com = "<div id='tooltip-preview' style='top:" + imgT + "px;right:" + tooltipRight + ";left:" + tooltipLeft + "'><span id='tooltip-keleyi-div' class='loading' style='width:50px; height:50px'></span></div>";
                $("body").append(tooltip_keleyi_com);
                var midimgW = $(this).attr("data-width");
                var midimgH = $(this).attr("data-height");
                var imgTitle = this.myTitle ? "<br />" + this.myTitle + " 产品预览图" : "";
                var image = new Image;
                image.onload = function() {
                    if ($("a.preview.active").attr("data-preview") == midimg) {
                        var midingW2 = this.width;
                        var midingH2 = this.height;
                        $("#tooltip-keleyi-div").css({
                            width: midingW2 + "px",
                            height: midingH2 + "px"
                        });
                        $("#tooltip-keleyi-div").append(this)
                    }
                };
                image.src = midimg
            }
        }, function() {
            $(this).removeClass("active");
            this.title = this.myTitle;
            $("#tooltip-preview").remove()
        });
        $.Huihover(".Huialert i");
        $(".Huialert i").on("click", function() {
            var Huialert = $(this).parents(".Huialert");
            Huialert.fadeOut("normal", function() {
                Huialert.remove()
            })
        });
        var time1;
        $(".Hui-tags-lable").show();
        $(".Hui-tags-input").val("");
        $(document).on("blur", ".Hui-tags-input", function() {
            time1 = setTimeout(function() {
                $(this).parents(".Hui-tags").find(".Hui-tags-list").slideUp()
            }, 400)
        });
        $(document).on("focus", ".Hui-tags-input", function() {
            clearTimeout(time1)
        });
        $(document).on("click", ".Hui-tags-input", function() {
            $(this).find(".Hui-tags-input").focus();
            $(this).find(".Hui-tags-list").slideDown()
        });

        function gettagval(obj) {
            var str = "";
            var token = $(obj).parents(".Hui-tags").find(".Hui-tags-token");
            if (token.length < 1) {
                $(obj).parents(".Hui-tags").find(".Hui-tags-val").val("");
                return false
            }
            for (var i = 0; i < token.length; i++) {
                str += token.eq(i).text() + ",";
                $(obj).parents(".Hui-tags").find(".Hui-tags-val").val(str)
            }
        }
        $(document).on("keydown", ".Hui-tags-input", function(event) {
            $(this).next().hide();
            var v = $(this).val().replace(/\s+/g, "");
            var reg = /^,|,$/gi;
            v = v.replace(reg, "");
            v = $.trim(v);
            var token = $(this).parents(".Hui-tags").find(".Hui-tags-token");
            if (v != "") {
                if (event.keyCode == 13 || event.keyCode == 108 || event.keyCode == 32) {
                    $('<span class="Hui-tags-token">' + v + "</span>").insertBefore($(this).parents(".Hui-tags").find(".Hui-tags-iptwrap"));
                    $(this).val("");
                    gettagval(this)
                }
            } else {
                if (event.keyCode == 8) {
                    if (token.length >= 1) {
                        $(this).parents(".Hui-tags").find(".Hui-tags-token:last").remove();
                        gettagval(this)
                    } else {
                        $(this).parents(".Hui-tags").find(".Hui-tags-lable").show();
                        return false
                    }
                }
            }
        });
        $(document).on("click", ".Hui-tags-has span", function() {
            var taghasV = $(this).text();
            taghasV = taghasV.replace(/(^\s*)|(\s*$)/g, "");
            $('<span class="Hui-tags-token">' + taghasV + "</span>").insertBefore($(this).parents(".Hui-tags").find(".Hui-tags-iptwrap"));
            gettagval(this);
            $(this).parents(".Hui-tags").find(".Hui-tags-input").focus()
        });
        $(document).on("click", ".Hui-tags-token", function() {
            var token = $(this).parents(".Hui-tags").find(".Hui-tags-token");
            var it = $(this).parents(".Hui-tags");
            $(this).remove();
            switch (token.length) {
                case 1:
                    it.find(".Hui-tags-lable").show();
                    break
            }
            var str = "";
            var token = it.find(".Hui-tags-token");
            if (token.length < 1) {
                it.find(".Hui-tags-val").val("");
                return false
            }
            for (var i = 0; i < token.length; i++) {
                str += token.eq(i).text() + ",";
                it.find(".Hui-tags-val").val(str)
            }
        })
    })
});
define("xg/eid-company-zy/1.0.4/c/css/bootstrap-debug.css", [], function(require, exports, module) {
    seajs.importStyle('html{font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}b,strong{font-weight:700}dfn{font-style:italic}h1{margin:.67em 0}mark{color:#000;background:#ff0}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}hr{height:0;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}pre{overflow:auto}code,kbd,pre,samp{font-size:1em}button,input,optgroup,select,textarea{margin:0;font:inherit;color:inherit}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}textarea{overflow:auto}optgroup{font-weight:700}table{border-spacing:0;border-collapse:collapse}td,th{padding:0}@media print{*,:after,:before{color:#000!important;text-shadow:none!important;background:0 0!important;-webkit-box-shadow:none!important;box-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:" (" attr(href) ")"}abbr[title]:after{content:" (" attr(title) ")"}a[href^="#"]:after,a[href^="javascript:"]:after{content:""}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}select{background:#fff!important}.navbar{display:none}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000!important}.label{border:1px solid #000}}@font-face{font-family:\'Glyphicons Halflings\';src:url(../fonts/glyphicons-halflings-regular.eot);src:url(../fonts/glyphicons-halflings-regular.eot?#iefix) format(\'embedded-opentype\'),url(../fonts/glyphicons-halflings-regular.woff2) format(\'woff2\'),url(../fonts/glyphicons-halflings-regular.woff) format(\'woff\'),url(../fonts/glyphicons-halflings-regular.ttf) format(\'truetype\'),url(../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular) format(\'svg\')}.glyphicon{position:relative;top:1px;display:inline-block;font-family:\'Glyphicons Halflings\';font-style:normal;font-weight:400;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:"\\2a"}.glyphicon-plus:before{content:"\\2b"}.glyphicon-eur:before,.glyphicon-euro:before{content:"\\20ac"}.glyphicon-minus:before{content:"\\2212"}.glyphicon-cloud:before{content:"\\2601"}.glyphicon-envelope:before{content:"\\2709"}.glyphicon-pencil:before{content:"\\270f"}.glyphicon-glass:before{content:"\\e001"}.glyphicon-music:before{content:"\\e002"}.glyphicon-search:before{content:"\\e003"}.glyphicon-heart:before{content:"\\e005"}.glyphicon-star:before{content:"\\e006"}.glyphicon-star-empty:before{content:"\\e007"}.glyphicon-user:before{content:"\\e008"}.glyphicon-film:before{content:"\\e009"}.glyphicon-th-large:before{content:"\\e010"}.glyphicon-th:before{content:"\\e011"}.glyphicon-th-list:before{content:"\\e012"}.glyphicon-ok:before{content:"\\e013"}.glyphicon-remove:before{content:"\\e014"}.glyphicon-zoom-in:before{content:"\\e015"}.glyphicon-zoom-out:before{content:"\\e016"}.glyphicon-off:before{content:"\\e017"}.glyphicon-signal:before{content:"\\e018"}.glyphicon-cog:before{content:"\\e019"}.glyphicon-trash:before{content:"\\e020"}.glyphicon-home:before{content:"\\e021"}.glyphicon-file:before{content:"\\e022"}.glyphicon-time:before{content:"\\e023"}.glyphicon-road:before{content:"\\e024"}.glyphicon-download-alt:before{content:"\\e025"}.glyphicon-download:before{content:"\\e026"}.glyphicon-upload:before{content:"\\e027"}.glyphicon-inbox:before{content:"\\e028"}.glyphicon-play-circle:before{content:"\\e029"}.glyphicon-repeat:before{content:"\\e030"}.glyphicon-refresh:before{content:"\\e031"}.glyphicon-list-alt:before{content:"\\e032"}.glyphicon-lock:before{content:"\\e033"}.glyphicon-flag:before{content:"\\e034"}.glyphicon-headphones:before{content:"\\e035"}.glyphicon-volume-off:before{content:"\\e036"}.glyphicon-volume-down:before{content:"\\e037"}.glyphicon-volume-up:before{content:"\\e038"}.glyphicon-qrcode:before{content:"\\e039"}.glyphicon-barcode:before{content:"\\e040"}.glyphicon-tag:before{content:"\\e041"}.glyphicon-tags:before{content:"\\e042"}.glyphicon-book:before{content:"\\e043"}.glyphicon-bookmark:before{content:"\\e044"}.glyphicon-print:before{content:"\\e045"}.glyphicon-camera:before{content:"\\e046"}.glyphicon-font:before{content:"\\e047"}.glyphicon-bold:before{content:"\\e048"}.glyphicon-italic:before{content:"\\e049"}.glyphicon-text-height:before{content:"\\e050"}.glyphicon-text-width:before{content:"\\e051"}.glyphicon-align-left:before{content:"\\e052"}.glyphicon-align-center:before{content:"\\e053"}.glyphicon-align-right:before{content:"\\e054"}.glyphicon-align-justify:before{content:"\\e055"}.glyphicon-list:before{content:"\\e056"}.glyphicon-indent-left:before{content:"\\e057"}.glyphicon-indent-right:before{content:"\\e058"}.glyphicon-facetime-video:before{content:"\\e059"}.glyphicon-picture:before{content:"\\e060"}.glyphicon-map-marker:before{content:"\\e062"}.glyphicon-adjust:before{content:"\\e063"}.glyphicon-tint:before{content:"\\e064"}.glyphicon-edit:before{content:"\\e065"}.glyphicon-share:before{content:"\\e066"}.glyphicon-check:before{content:"\\e067"}.glyphicon-move:before{content:"\\e068"}.glyphicon-step-backward:before{content:"\\e069"}.glyphicon-fast-backward:before{content:"\\e070"}.glyphicon-backward:before{content:"\\e071"}.glyphicon-play:before{content:"\\e072"}.glyphicon-pause:before{content:"\\e073"}.glyphicon-stop:before{content:"\\e074"}.glyphicon-forward:before{content:"\\e075"}.glyphicon-fast-forward:before{content:"\\e076"}.glyphicon-step-forward:before{content:"\\e077"}.glyphicon-eject:before{content:"\\e078"}.glyphicon-chevron-left:before{content:"\\e079"}.glyphicon-chevron-right:before{content:"\\e080"}.glyphicon-plus-sign:before{content:"\\e081"}.glyphicon-minus-sign:before{content:"\\e082"}.glyphicon-remove-sign:before{content:"\\e083"}.glyphicon-ok-sign:before{content:"\\e084"}.glyphicon-question-sign:before{content:"\\e085"}.glyphicon-info-sign:before{content:"\\e086"}.glyphicon-screenshot:before{content:"\\e087"}.glyphicon-remove-circle:before{content:"\\e088"}.glyphicon-ok-circle:before{content:"\\e089"}.glyphicon-ban-circle:before{content:"\\e090"}.glyphicon-arrow-left:before{content:"\\e091"}.glyphicon-arrow-right:before{content:"\\e092"}.glyphicon-arrow-up:before{content:"\\e093"}.glyphicon-arrow-down:before{content:"\\e094"}.glyphicon-share-alt:before{content:"\\e095"}.glyphicon-resize-full:before{content:"\\e096"}.glyphicon-resize-small:before{content:"\\e097"}.glyphicon-exclamation-sign:before{content:"\\e101"}.glyphicon-gift:before{content:"\\e102"}.glyphicon-leaf:before{content:"\\e103"}.glyphicon-fire:before{content:"\\e104"}.glyphicon-eye-open:before{content:"\\e105"}.glyphicon-eye-close:before{content:"\\e106"}.glyphicon-warning-sign:before{content:"\\e107"}.glyphicon-plane:before{content:"\\e108"}.glyphicon-calendar:before{content:"\\e109"}.glyphicon-random:before{content:"\\e110"}.glyphicon-comment:before{content:"\\e111"}.glyphicon-magnet:before{content:"\\e112"}.glyphicon-chevron-up:before{content:"\\e113"}.glyphicon-chevron-down:before{content:"\\e114"}.glyphicon-retweet:before{content:"\\e115"}.glyphicon-shopping-cart:before{content:"\\e116"}.glyphicon-folder-close:before{content:"\\e117"}.glyphicon-folder-open:before{content:"\\e118"}.glyphicon-resize-vertical:before{content:"\\e119"}.glyphicon-resize-horizontal:before{content:"\\e120"}.glyphicon-hdd:before{content:"\\e121"}.glyphicon-bullhorn:before{content:"\\e122"}.glyphicon-bell:before{content:"\\e123"}.glyphicon-certificate:before{content:"\\e124"}.glyphicon-thumbs-up:before{content:"\\e125"}.glyphicon-thumbs-down:before{content:"\\e126"}.glyphicon-hand-right:before{content:"\\e127"}.glyphicon-hand-left:before{content:"\\e128"}.glyphicon-hand-up:before{content:"\\e129"}.glyphicon-hand-down:before{content:"\\e130"}.glyphicon-circle-arrow-right:before{content:"\\e131"}.glyphicon-circle-arrow-left:before{content:"\\e132"}.glyphicon-circle-arrow-up:before{content:"\\e133"}.glyphicon-circle-arrow-down:before{content:"\\e134"}.glyphicon-globe:before{content:"\\e135"}.glyphicon-wrench:before{content:"\\e136"}.glyphicon-tasks:before{content:"\\e137"}.glyphicon-filter:before{content:"\\e138"}.glyphicon-briefcase:before{content:"\\e139"}.glyphicon-fullscreen:before{content:"\\e140"}.glyphicon-dashboard:before{content:"\\e141"}.glyphicon-paperclip:before{content:"\\e142"}.glyphicon-heart-empty:before{content:"\\e143"}.glyphicon-link:before{content:"\\e144"}.glyphicon-phone:before{content:"\\e145"}.glyphicon-pushpin:before{content:"\\e146"}.glyphicon-usd:before{content:"\\e148"}.glyphicon-gbp:before{content:"\\e149"}.glyphicon-sort:before{content:"\\e150"}.glyphicon-sort-by-alphabet:before{content:"\\e151"}.glyphicon-sort-by-alphabet-alt:before{content:"\\e152"}.glyphicon-sort-by-order:before{content:"\\e153"}.glyphicon-sort-by-order-alt:before{content:"\\e154"}.glyphicon-sort-by-attributes:before{content:"\\e155"}.glyphicon-sort-by-attributes-alt:before{content:"\\e156"}.glyphicon-unchecked:before{content:"\\e157"}.glyphicon-expand:before{content:"\\e158"}.glyphicon-collapse-down:before{content:"\\e159"}.glyphicon-collapse-up:before{content:"\\e160"}.glyphicon-log-in:before{content:"\\e161"}.glyphicon-flash:before{content:"\\e162"}.glyphicon-log-out:before{content:"\\e163"}.glyphicon-new-window:before{content:"\\e164"}.glyphicon-record:before{content:"\\e165"}.glyphicon-save:before{content:"\\e166"}.glyphicon-open:before{content:"\\e167"}.glyphicon-saved:before{content:"\\e168"}.glyphicon-import:before{content:"\\e169"}.glyphicon-export:before{content:"\\e170"}.glyphicon-send:before{content:"\\e171"}.glyphicon-floppy-disk:before{content:"\\e172"}.glyphicon-floppy-saved:before{content:"\\e173"}.glyphicon-floppy-remove:before{content:"\\e174"}.glyphicon-floppy-save:before{content:"\\e175"}.glyphicon-floppy-open:before{content:"\\e176"}.glyphicon-credit-card:before{content:"\\e177"}.glyphicon-transfer:before{content:"\\e178"}.glyphicon-cutlery:before{content:"\\e179"}.glyphicon-header:before{content:"\\e180"}.glyphicon-compressed:before{content:"\\e181"}.glyphicon-earphone:before{content:"\\e182"}.glyphicon-phone-alt:before{content:"\\e183"}.glyphicon-tower:before{content:"\\e184"}.glyphicon-stats:before{content:"\\e185"}.glyphicon-sd-video:before{content:"\\e186"}.glyphicon-hd-video:before{content:"\\e187"}.glyphicon-subtitles:before{content:"\\e188"}.glyphicon-sound-stereo:before{content:"\\e189"}.glyphicon-sound-dolby:before{content:"\\e190"}.glyphicon-sound-5-1:before{content:"\\e191"}.glyphicon-sound-6-1:before{content:"\\e192"}.glyphicon-sound-7-1:before{content:"\\e193"}.glyphicon-copyright-mark:before{content:"\\e194"}.glyphicon-registration-mark:before{content:"\\e195"}.glyphicon-cloud-download:before{content:"\\e197"}.glyphicon-cloud-upload:before{content:"\\e198"}.glyphicon-tree-conifer:before{content:"\\e199"}.glyphicon-tree-deciduous:before{content:"\\e200"}.glyphicon-cd:before{content:"\\e201"}.glyphicon-save-file:before{content:"\\e202"}.glyphicon-open-file:before{content:"\\e203"}.glyphicon-level-up:before{content:"\\e204"}.glyphicon-copy:before{content:"\\e205"}.glyphicon-paste:before{content:"\\e206"}.glyphicon-alert:before{content:"\\e209"}.glyphicon-equalizer:before{content:"\\e210"}.glyphicon-king:before{content:"\\e211"}.glyphicon-queen:before{content:"\\e212"}.glyphicon-pawn:before{content:"\\e213"}.glyphicon-bishop:before{content:"\\e214"}.glyphicon-knight:before{content:"\\e215"}.glyphicon-baby-formula:before{content:"\\e216"}.glyphicon-tent:before{content:"\\26fa"}.glyphicon-blackboard:before{content:"\\e218"}.glyphicon-bed:before{content:"\\e219"}.glyphicon-apple:before{content:"\\f8ff"}.glyphicon-erase:before{content:"\\e221"}.glyphicon-hourglass:before{content:"\\231b"}.glyphicon-lamp:before{content:"\\e223"}.glyphicon-duplicate:before{content:"\\e224"}.glyphicon-piggy-bank:before{content:"\\e225"}.glyphicon-scissors:before{content:"\\e226"}.glyphicon-bitcoin:before,.glyphicon-btc:before,.glyphicon-xbt:before{content:"\\e227"}.glyphicon-jpy:before,.glyphicon-yen:before{content:"\\00a5"}.glyphicon-rub:before,.glyphicon-ruble:before{content:"\\20bd"}.glyphicon-scale:before{content:"\\e230"}.glyphicon-ice-lolly:before{content:"\\e231"}.glyphicon-ice-lolly-tasted:before{content:"\\e232"}.glyphicon-education:before{content:"\\e233"}.glyphicon-option-horizontal:before{content:"\\e234"}.glyphicon-option-vertical:before{content:"\\e235"}.glyphicon-menu-hamburger:before{content:"\\e236"}.glyphicon-modal-window:before{content:"\\e237"}.glyphicon-oil:before{content:"\\e238"}.glyphicon-grain:before{content:"\\e239"}.glyphicon-sunglasses:before{content:"\\e240"}.glyphicon-text-size:before{content:"\\e241"}.glyphicon-text-color:before{content:"\\e242"}.glyphicon-text-background:before{content:"\\e243"}.glyphicon-object-align-top:before{content:"\\e244"}.glyphicon-object-align-bottom:before{content:"\\e245"}.glyphicon-object-align-horizontal:before{content:"\\e246"}.glyphicon-object-align-left:before{content:"\\e247"}.glyphicon-object-align-vertical:before{content:"\\e248"}.glyphicon-object-align-right:before{content:"\\e249"}.glyphicon-triangle-right:before{content:"\\e250"}.glyphicon-triangle-left:before{content:"\\e251"}.glyphicon-triangle-bottom:before{content:"\\e252"}.glyphicon-triangle-top:before{content:"\\e253"}.glyphicon-console:before{content:"\\e254"}.glyphicon-superscript:before{content:"\\e255"}.glyphicon-subscript:before{content:"\\e256"}.glyphicon-menu-left:before{content:"\\e257"}.glyphicon-menu-right:before{content:"\\e258"}.glyphicon-menu-down:before{content:"\\e259"}.glyphicon-menu-up:before{content:"\\e260"}button,input,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#337ab7;text-decoration:none}a:focus,a:hover{color:#23527c;text-decoration:underline}figure{margin:0}img{vertical-align:middle}.carousel-inner>.item>a>img,.carousel-inner>.item>img,.img-responsive,.thumbnail a>img,.thumbnail>img{display:block;max-width:100%;height:auto}.img-rounded{border-radius:6px}.img-thumbnail{display:inline-block;max-width:100%;height:auto;padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.img-circle{border-radius:50%}hr{margin-top:20px;margin-bottom:20px;border:0;border-top:1px solid #eee}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}[role=button]{cursor:pointer}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{font-family:inherit;font-weight:500;line-height:1.1;color:inherit}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-weight:400;line-height:1;color:#777}.h1,.h2,.h3,h1,h2,h3{margin-top:20px;margin-bottom:10px}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small{font-size:65%}.h4,.h5,.h6,h4,h5,h6{margin-top:10px;margin-bottom:10px}.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-size:75%}.h1,h1{font-size:36px}.h2,h2{font-size:30px}.h3,h3{font-size:24px}.h4,h4{font-size:18px}.h5,h5{font-size:14px}.h6,h6{font-size:12px}p{margin:0 0 10px}.lead{margin-bottom:20px;font-size:16px;font-weight:300;line-height:1.4}@media (min-width:768px){.lead{font-size:21px}}.small,small{font-size:85%}.mark,mark{padding:.2em;background-color:#fcf8e3}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#777}.text-primary{color:#337ab7}a.text-primary:hover{color:#286090}.text-success{color:#3c763d}a.text-success:hover{color:#2b542c}.text-info{color:#31708f}a.text-info:hover{color:#245269}.text-warning{color:#8a6d3b}a.text-warning:hover{color:#66512c}.text-danger{color:#a94442}a.text-danger:hover{color:#843534}.bg-primary{color:#fff;background-color:#337ab7}a.bg-primary:hover{background-color:#286090}.bg-success{background-color:#dff0d8}a.bg-success:hover{background-color:#c1e2b3}.bg-info{background-color:#d9edf7}a.bg-info:hover{background-color:#afd9ee}.bg-warning{background-color:#fcf8e3}a.bg-warning:hover{background-color:#f7ecb5}.bg-danger{background-color:#f2dede}a.bg-danger:hover{background-color:#e4b9b9}.page-header{padding-bottom:9px;margin:40px 0 20px;border-bottom:1px solid #eee}ol,ul{margin-top:0;margin-bottom:10px}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;margin-left:-5px;list-style:none}.list-inline>li{display:inline-block;padding-right:5px;padding-left:5px}dl{margin-top:0;margin-bottom:20px}dd,dt{line-height:1.42857143}dt{font-weight:700}dd{margin-left:0}@media (min-width:768px){.dl-horizontal dt{float:left;width:160px;overflow:hidden;clear:left;text-align:right;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}}abbr[data-original-title],abbr[title]{cursor:help;border-bottom:1px dotted #777}.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:10px 20px;margin:0 0 20px;font-size:17.5px;border-left:5px solid #eee}blockquote ol:last-child,blockquote p:last-child,blockquote ul:last-child{margin-bottom:0}blockquote .small,blockquote footer,blockquote small{display:block;font-size:80%;line-height:1.42857143;color:#777}blockquote .small:before,blockquote footer:before,blockquote small:before{content:\'\\2014 \\00A0\'}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;text-align:right;border-right:5px solid #eee;border-left:0}.blockquote-reverse .small:before,.blockquote-reverse footer:before,.blockquote-reverse small:before,blockquote.pull-right .small:before,blockquote.pull-right footer:before,blockquote.pull-right small:before{content:\'\'}.blockquote-reverse .small:after,.blockquote-reverse footer:after,.blockquote-reverse small:after,blockquote.pull-right .small:after,blockquote.pull-right footer:after,blockquote.pull-right small:after{content:\'\\00A0 \\2014\'}address{margin-bottom:20px;font-style:normal;line-height:1.42857143}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,"Courier New",monospace}code{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:4px}kbd{padding:2px 4px;font-size:90%;color:#fff;background-color:#333;border-radius:3px;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.25);box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}kbd kbd{padding:0;font-size:100%;font-weight:700;-webkit-box-shadow:none;box-shadow:none}pre{display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:1.42857143;color:#333;word-break:break-all;word-wrap:break-word;background-color:#f5f5f5;border:1px solid #ccc;border-radius:4px}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container,.container-fluid{padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px){.container{width:1170px}}.row{margin-right:-15px;margin-left:-15px}caption{padding-top:8px;padding-bottom:8px;color:#777;text-align:left}fieldset{min-width:0;padding:0;margin:0;border:0}legend{display:block;width:100%;padding:0;margin-bottom:20px;font-size:21px;line-height:inherit;color:#333;border:0;border-bottom:1px solid #e5e5e5}input[type=search]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}input[type=file]{display:block}input[type=range]{display:block;width:100%}select[multiple],select[size]{height:auto}output{display:block;padding-top:7px;font-size:14px;line-height:1.42857143;color:#555}.form-control{display:block;width:100%;height:34px;padding:6px 12px;font-size:14px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.form-control::-moz-placeholder{color:#999;opacity:1}.form-control:-ms-input-placeholder{color:#999}.form-control::-webkit-input-placeholder{color:#999}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{background-color:#eee;opacity:1}.form-control[disabled],fieldset[disabled] .form-control{cursor:not-allowed}textarea.form-control{height:auto}input[type=search]{-webkit-appearance:none}@media screen and (-webkit-min-device-pixel-ratio:0){input[type=date],input[type=datetime-local],input[type=month],input[type=time]{line-height:34px}.input-group-sm input[type=date],.input-group-sm input[type=datetime-local],.input-group-sm input[type=month],.input-group-sm input[type=time],input[type=date].input-sm,input[type=datetime-local].input-sm,input[type=month].input-sm,input[type=time].input-sm{line-height:30px}.input-group-lg input[type=date],.input-group-lg input[type=datetime-local],.input-group-lg input[type=month],.input-group-lg input[type=time],input[type=date].input-lg,input[type=datetime-local].input-lg,input[type=month].input-lg,input[type=time].input-lg{line-height:46px}}.form-group{margin-bottom:15px}.form-control-static{min-height:34px;padding-top:7px;padding-bottom:7px;margin-bottom:0}.form-control-static.input-lg,.form-control-static.input-sm{padding-right:0;padding-left:0}.input-sm{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select.input-sm{height:30px;line-height:30px}select[multiple].input-sm,textarea.input-sm{height:auto}.form-group-sm .form-control{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select.form-group-sm .form-control{height:30px;line-height:30px}select[multiple].form-group-sm .form-control,textarea.form-group-sm .form-control{height:auto}.form-group-sm .form-control-static{height:30px;min-height:32px;padding:5px 10px;font-size:12px;line-height:1.5}.input-lg{height:46px;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}select.input-lg{height:46px;line-height:46px}select[multiple].input-lg,textarea.input-lg{height:auto}.form-group-lg .form-control{height:46px;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}select.form-group-lg .form-control{height:46px;line-height:46px}select[multiple].form-group-lg .form-control,textarea.form-group-lg .form-control{height:auto}.form-group-lg .form-control-static{height:46px;min-height:38px;padding:10px 16px;font-size:18px;line-height:1.3333333}.has-feedback{position:relative}.has-feedback .form-control{padding-right:42.5px}.form-control-feedback{position:absolute;top:0;right:0;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center;pointer-events:none}.input-lg+.form-control-feedback{width:46px;height:46px;line-height:46px}.input-sm+.form-control-feedback{width:30px;height:30px;line-height:30px}.has-success .checkbox,.has-success .checkbox-inline,.has-success .control-label,.has-success .help-block,.has-success .radio,.has-success .radio-inline,.has-success.checkbox label,.has-success.checkbox-inline label,.has-success.radio label,.has-success.radio-inline label{color:#3c763d}.has-success .form-control{border-color:#3c763d;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-success .form-control:focus{border-color:#2b542c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168}.has-success .input-group-addon{color:#3c763d;background-color:#dff0d8;border-color:#3c763d}.has-success .form-control-feedback{color:#3c763d}.has-warning .checkbox,.has-warning .checkbox-inline,.has-warning .control-label,.has-warning .help-block,.has-warning .radio,.has-warning .radio-inline,.has-warning.checkbox label,.has-warning.checkbox-inline label,.has-warning.radio label,.has-warning.radio-inline label{color:#8a6d3b}.has-warning .form-control{border-color:#8a6d3b;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-warning .form-control:focus{border-color:#66512c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b}.has-warning .input-group-addon{color:#8a6d3b;background-color:#fcf8e3;border-color:#8a6d3b}.has-warning .form-control-feedback{color:#8a6d3b}.has-error .checkbox,.has-error .checkbox-inline,.has-error .control-label,.has-error .help-block,.has-error .radio,.has-error .radio-inline,.has-error.checkbox label,.has-error.checkbox-inline label,.has-error.radio label,.has-error.radio-inline label{color:red}.has-error .form-control{border-color:red;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-error .form-control:focus{border-color:#843534;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483}.has-error .input-group-addon{color:#a94442;background-color:#f2dede;border-color:#a94442}.has-error .form-control-feedback{color:#a94442}.has-feedback label~.form-control-feedback{top:25px}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#737373}@media (min-width:768px){.form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-static{display:inline-block}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .form-control,.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .control-label{margin-bottom:0;vertical-align:middle}.form-inline .has-feedback .form-control-feedback{top:0}}.form-horizontal .form-group{margin-right:-15px;margin-left:-15px}@media (min-width:768px){.form-horizontal .control-label{padding-top:7px;margin-bottom:0;text-align:right}}.form-horizontal .has-feedback .form-control-feedback{right:15px}@media (min-width:768px){.form-horizontal .form-group-lg .control-label{padding-top:14.33px}}@media (min-width:768px){.form-horizontal .form-group-sm .control-label{padding-top:6px}}.fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition-timing-function:ease;-o-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:.35s;-o-transition-duration:.35s;transition-duration:.35s;-webkit-transition-property:height,visibility;-o-transition-property:height,visibility;transition-property:height,visibility}.caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px dashed;border-right:4px solid transparent;border-left:4px solid transparent}.dropdown,.dropup{position:relative}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;font-size:14px;text-align:left;list-style:none;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:4px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175)}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{height:1px;margin:9px 0;overflow:hidden;background-color:#e5e5e5}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:nowrap}.dropdown-menu>li>a:focus,.dropdown-menu>li>a:hover{color:#262626;text-decoration:none;background-color:#f5f5f5}.dropdown-menu>.active>a,.dropdown-menu>.active>a:focus,.dropdown-menu>.active>a:hover{color:#fff;text-decoration:none;background-color:#337ab7;outline:0}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{color:#777}.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{text-decoration:none;cursor:not-allowed;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-right{right:0;left:auto}.dropdown-menu-left{right:auto;left:0}.dropdown-header{display:block;padding:3px 20px;font-size:12px;line-height:1.42857143;color:#777;white-space:nowrap}.dropdown-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{content:"";border-top:0;border-bottom:4px solid}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:2px}@media (min-width:768px){.navbar-right .dropdown-menu{right:0;left:auto}.navbar-right .dropdown-menu-left{right:auto;left:0}}.btn-group,.btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;float:left}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:2}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar .btn-group,.btn-toolbar .input-group{float:left}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-left-radius:0;border-bottom-left-radius:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-right:8px;padding-left:8px}.btn-group>.btn-lg+.dropdown-toggle{padding-right:12px;padding-left:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn .caret{margin-left:0}.btn-lg .caret{border-width:5px 5px 0}.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:4px}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-left-radius:0;border-top-right-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{display:table-cell;float:none;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}.input-group{position:relative;display:table;border-collapse:separate}.input-group[class*=col-]{float:none;padding-right:0;padding-left:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn{height:46px;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:6px}select.input-group-lg>.form-control,select.input-group-lg>.input-group-addon,select.input-group-lg>.input-group-btn>.btn{height:46px;line-height:46px}select[multiple].input-group-lg>.form-control,select[multiple].input-group-lg>.input-group-addon,select[multiple].input-group-lg>.input-group-btn>.btn,textarea.input-group-lg>.form-control,textarea.input-group-lg>.input-group-addon,textarea.input-group-lg>.input-group-btn>.btn{height:auto}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:3px}select.input-group-sm>.form-control,select.input-group-sm>.input-group-addon,select.input-group-sm>.input-group-btn>.btn{height:30px;line-height:30px}select[multiple].input-group-sm>.form-control,select[multiple].input-group-sm>.input-group-addon,select[multiple].input-group-sm>.input-group-btn>.btn,textarea.input-group-sm>.form-control,textarea.input-group-sm>.input-group-addon,textarea.input-group-sm>.input-group-btn>.btn{height:auto}.input-group .form-control,.input-group-addon,.input-group-btn{display:table-cell}.input-group .form-control:not(:first-child):not(:last-child),.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:6px 12px;font-size:14px;font-weight:400;line-height:1;color:#555;text-align:center;background-color:#eee;border:1px solid #ccc;border-radius:4px}.input-group-addon.input-sm{padding:5px 10px;font-size:12px;border-radius:3px}.input-group-addon.input-lg{padding:10px 16px;font-size:18px;border-radius:6px}.input-group .form-control:first-child,.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn-group:not(:last-child)>.btn,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group .form-control:last-child,.input-group-addon:last-child,.input-group-btn:first-child>.btn-group:not(:first-child)>.btn,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle{border-top-left-radius:0;border-bottom-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{position:relative;font-size:0;white-space:nowrap}.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:active,.input-group-btn>.btn:focus,.input-group-btn>.btn:hover{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{margin-left:-1px}.label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}a.label:focus,a.label:hover{color:#fff;text-decoration:none;cursor:pointer}.label:empty{display:none}.btn .label{position:relative;top:-1px}.label-default{background-color:#777}.label-default[href]:focus,.label-default[href]:hover{background-color:#5e5e5e}.label-primary{background-color:#337ab7}.label-primary[href]:focus,.label-primary[href]:hover{background-color:#286090}.label-success{background-color:#5cb85c}.label-success[href]:focus,.label-success[href]:hover{background-color:#449d44}.label-info{background-color:#5bc0de}.label-info[href]:focus,.label-info[href]:hover{background-color:#31b0d5}.label-warning{background-color:#f0ad4e}.label-warning[href]:focus,.label-warning[href]:hover{background-color:#ec971f}.label-danger{background-color:#d9534f}.label-danger[href]:focus,.label-danger[href]:hover{background-color:#c9302c}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;background-color:#777;border-radius:10px}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.btn-group-xs>.btn .badge,.btn-xs .badge{top:0;padding:1px 5px}a.badge:focus,a.badge:hover{color:#fff;text-decoration:none;cursor:pointer}.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#337ab7;background-color:#fff}.list-group-item>.badge{float:right}.list-group-item>.badge+.badge{margin-right:5px}.nav-pills>li>a>.badge{margin-left:3px}.jumbotron{padding:30px 15px;margin-bottom:30px;color:inherit;background-color:#eee}.jumbotron .h1,.jumbotron h1{color:inherit}.jumbotron p{margin-bottom:15px;font-size:21px;font-weight:200}.jumbotron>hr{border-top-color:#d5d5d5}.container .jumbotron,.container-fluid .jumbotron{border-radius:6px}.jumbotron .container{max-width:100%}@media screen and (min-width:768px){.jumbotron{padding:48px 0}.container .jumbotron,.container-fluid .jumbotron{padding-right:60px;padding-left:60px}.jumbotron .h1,.jumbotron h1{font-size:63px}}.thumbnail{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:4px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out}.thumbnail a>img,.thumbnail>img{margin-right:auto;margin-left:auto}a.thumbnail.active,a.thumbnail:focus,a.thumbnail:hover{border-color:#337ab7}.thumbnail .caption{padding:9px;color:#333}.alert{padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px}.alert h4{margin-top:0;color:inherit}.alert .alert-link{font-weight:700}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable,.alert-dismissible{padding-right:35px}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.alert-success hr{border-top-color:#c9e2b3}.alert-success .alert-link{color:#2b542c}.alert-info{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.alert-info hr{border-top-color:#a6e1ec}.alert-info .alert-link{color:#245269}.alert-warning{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.alert-warning hr{border-top-color:#f7e1b5}.alert-warning .alert-link{color:#66512c}.alert-danger{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.alert-danger hr{border-top-color:#e4b9c0}.alert-danger .alert-link{color:#843534}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-o-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{height:20px;margin-bottom:20px;overflow:hidden;background-color:#f5f5f5;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.progress-bar{float:left;width:0;height:100%;font-size:12px;line-height:20px;color:#fff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.progress-bar-striped,.progress-striped .progress-bar{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);-webkit-background-size:40px 40px;background-size:40px 40px}.progress-bar.active,.progress.active .progress-bar{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar-success{background-color:#5cb85c}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-info{background-color:#5bc0de}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-warning{background-color:#f0ad4e}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-danger{background-color:#d9534f}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.media{margin-top:15px}.media:first-child{margin-top:0}.media,.media-body{overflow:hidden;zoom:1}.media-body{width:10000px}.media-object{display:block}.media-right,.media>.pull-right{padding-left:10px}.media-left,.media>.pull-left{padding-right:10px}.media-body,.media-left,.media-right{display:table-cell;vertical-align:top}.media-middle{vertical-align:middle}.media-bottom{vertical-align:bottom}.media-heading{margin-top:0;margin-bottom:5px}.media-list{padding-left:0;list-style:none}.list-group{padding-left:0;margin-bottom:20px}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #ddd}.list-group-item:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:4px;border-bottom-left-radius:4px}a.list-group-item{color:#555}a.list-group-item .list-group-item-heading{color:#333}a.list-group-item:focus,a.list-group-item:hover{color:#555;text-decoration:none;background-color:#f5f5f5}.list-group-item.disabled,.list-group-item.disabled:focus,.list-group-item.disabled:hover{color:#777;cursor:not-allowed;background-color:#eee}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text{color:#777}.list-group-item.active,.list-group-item.active:focus,.list-group-item.active:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7}.list-group-item.active .list-group-item-heading,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:focus .list-group-item-text,.list-group-item.active:hover .list-group-item-text{color:#c7ddef}.list-group-item-success{color:#3c763d;background-color:#dff0d8}a.list-group-item-success{color:#3c763d}a.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:focus,a.list-group-item-success:hover{color:#3c763d;background-color:#d0e9c6}a.list-group-item-success.active,a.list-group-item-success.active:focus,a.list-group-item-success.active:hover{color:#fff;background-color:#3c763d;border-color:#3c763d}.list-group-item-info{color:#31708f;background-color:#d9edf7}a.list-group-item-info{color:#31708f}a.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:focus,a.list-group-item-info:hover{color:#31708f;background-color:#c4e3f3}a.list-group-item-info.active,a.list-group-item-info.active:focus,a.list-group-item-info.active:hover{color:#fff;background-color:#31708f;border-color:#31708f}.list-group-item-warning{color:#8a6d3b;background-color:#fcf8e3}a.list-group-item-warning{color:#8a6d3b}a.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:focus,a.list-group-item-warning:hover{color:#8a6d3b;background-color:#faf2cc}a.list-group-item-warning.active,a.list-group-item-warning.active:focus,a.list-group-item-warning.active:hover{color:#fff;background-color:#8a6d3b;border-color:#8a6d3b}.list-group-item-danger{color:#a94442;background-color:#f2dede}a.list-group-item-danger{color:#a94442}a.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:focus,a.list-group-item-danger:hover{color:#a94442;background-color:#ebcccc}a.list-group-item-danger.active,a.list-group-item-danger.active:focus,a.list-group-item-danger.active:hover{color:#fff;background-color:#a94442;border-color:#a94442}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:20px;background-color:#fff;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.05);box-shadow:0 1px 1px rgba(0,0,0,.05)}.panel-body{padding:15px}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-left-radius:3px;border-top-right-radius:3px}.panel-heading>.dropdown .dropdown-toggle{color:inherit}.panel-title{margin-top:0;margin-bottom:0;font-size:16px;color:inherit}.panel-title>.small,.panel-title>.small>a,.panel-title>a,.panel-title>small,.panel-title>small>a{color:inherit}.panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #ddd;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.panel>.list-group,.panel>.panel-collapse>.list-group{margin-bottom:0}.panel>.list-group .list-group-item,.panel>.panel-collapse>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel>.list-group:first-child .list-group-item:first-child,.panel>.panel-collapse>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-left-radius:3px;border-top-right-radius:3px}.panel>.list-group:last-child .list-group-item:last-child,.panel>.panel-collapse>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.list-group+.panel-footer,.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.panel-group{margin-bottom:20px}.panel-group .panel{margin-bottom:0;border-radius:4px}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading{border-bottom:0}.panel-group .panel-heading+.panel-collapse>.list-group,.panel-group .panel-heading+.panel-collapse>.panel-body{border-top:1px solid #ddd}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #ddd}.panel-default{border-color:#ddd}.panel-default>.panel-heading{color:#333;background-color:#f5f5f5;border-color:#ddd}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ddd}.panel-default>.panel-heading .badge{color:#f5f5f5;background-color:#333}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ddd}.panel-primary{border-color:#337ab7}.panel-primary>.panel-heading{color:#fff;background-color:#337ab7;border-color:#337ab7}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#337ab7}.panel-primary>.panel-heading .badge{color:#337ab7;background-color:#fff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#337ab7}.panel-success{border-color:#d6e9c6}.panel-success>.panel-heading{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#d6e9c6}.panel-success>.panel-heading .badge{color:#dff0d8;background-color:#3c763d}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#d6e9c6}.panel-info{border-color:#bce8f1}.panel-info>.panel-heading{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#bce8f1}.panel-info>.panel-heading .badge{color:#d9edf7;background-color:#31708f}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#bce8f1}.panel-warning{border-color:#faebcc}.panel-warning>.panel-heading{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#faebcc}.panel-warning>.panel-heading .badge{color:#fcf8e3;background-color:#8a6d3b}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#faebcc}.panel-danger{border-color:#ebccd1}.panel-danger>.panel-heading{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ebccd1}.panel-danger>.panel-heading .badge{color:#f2dede;background-color:#a94442}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ebccd1}.embed-responsive{position:relative;display:block;height:0;padding:0;overflow:hidden}.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video{position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;border:0}.embed-responsive-16by9{padding-bottom:56.25%}.embed-responsive-4by3{padding-bottom:75%}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,.15)}.well-lg{padding:24px;border-radius:6px}.well-sm{padding:9px;border-radius:3px}.close{float:right;font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=100);opacity:1}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer;filter:alpha(opacity=50);opacity:.5}button.close{-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0}.tooltip{position:absolute;z-index:1070;display:block;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;line-height:1.4;filter:alpha(opacity=0);opacity:0}.tooltip.in{filter:alpha(opacity=90);opacity:.9}.tooltip.top{padding:5px 0;margin-top:-3px}.tooltip.right{padding:0 5px;margin-left:3px}.tooltip.bottom{padding:5px 0;margin-top:3px}.tooltip.left{padding:0 5px;margin-left:-3px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;text-align:center;text-decoration:none;background-color:#000;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-left .tooltip-arrow{right:5px;bottom:0;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-right .tooltip-arrow{bottom:0;left:5px;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:#000}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:#000}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-left .tooltip-arrow{top:0;right:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-right .tooltip-arrow{top:0;left:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.popover{position:absolute;top:0;left:0;z-index:1060;display:none;max-width:276px;padding:1px;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:1.42857143;text-align:left;white-space:normal;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,.2);box-shadow:0 5px 10px rgba(0,0,0,.2)}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{padding:8px 14px;margin:0;font-size:14px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-radius:5px 5px 0 0}.popover-content{padding:9px 14px}.popover>.arrow,.popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover>.arrow{border-width:11px}.popover>.arrow:after{content:"";border-width:10px}.popover.top>.arrow{bottom:-11px;left:50%;margin-left:-11px;border-top-color:#999;border-top-color:rgba(0,0,0,.25);border-bottom-width:0}.popover.top>.arrow:after{bottom:1px;margin-left:-10px;content:" ";border-top-color:#fff;border-bottom-width:0}.popover.right>.arrow{top:50%;left:-11px;margin-top:-11px;border-right-color:#999;border-right-color:rgba(0,0,0,.25);border-left-width:0}.popover.right>.arrow:after{bottom:-10px;left:1px;content:" ";border-right-color:#fff;border-left-width:0}.popover.bottom>.arrow{top:-11px;left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#999;border-bottom-color:rgba(0,0,0,.25)}.popover.bottom>.arrow:after{top:1px;margin-left:-10px;content:" ";border-top-width:0;border-bottom-color:#fff}.popover.left>.arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#999;border-left-color:rgba(0,0,0,.25)}.popover.left>.arrow:after{right:1px;bottom:-10px;content:" ";border-right-width:0;border-left-color:#fff}.carousel{position:relative}.carousel-inner{position:relative;width:100%;overflow:hidden}.carousel-inner>.item{position:relative;display:none;-webkit-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>a>img,.carousel-inner>.item>img{line-height:1}@media all and (transform-3d),(-webkit-transform-3d){.carousel-inner>.item{-webkit-transition:-webkit-transform .6s ease-in-out;-o-transition:-o-transform .6s ease-in-out;transition:transform .6s ease-in-out;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;perspective:1000}.carousel-inner>.item.active.right,.carousel-inner>.item.next{left:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.carousel-inner>.item.active.left,.carousel-inner>.item.prev{left:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.carousel-inner>.item.active,.carousel-inner>.item.next.left,.carousel-inner>.item.prev.right{left:0;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:0;bottom:0;left:0;width:15%;font-size:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6);filter:alpha(opacity=50);opacity:.5}.carousel-control.left{background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,.0001)));background-image:linear-gradient(to right,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#80000000\', endColorstr=\'#00000000\', GradientType=1);background-repeat:repeat-x}.carousel-control.right{right:0;left:auto;background-image:-webkit-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.0001)),to(rgba(0,0,0,.5)));background-image:linear-gradient(to right,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#00000000\', endColorstr=\'#80000000\', GradientType=1);background-repeat:repeat-x}.carousel-control:focus,.carousel-control:hover{color:#fff;text-decoration:none;filter:alpha(opacity=90);outline:0;opacity:.9}.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{position:absolute;top:50%;z-index:5;display:inline-block}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{left:50%;margin-left:-10px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{right:50%;margin-right:-10px}.carousel-control .icon-next,.carousel-control .icon-prev{width:20px;height:20px;margin-top:-10px;font-family:serif;line-height:1}.carousel-control .icon-prev:before{content:\'\\2039\'}.carousel-control .icon-next:before{content:\'\\203a\'}.carousel-indicators{position:absolute;bottom:10px;left:50%;z-index:15;width:60%;padding-left:0;margin-left:-30%;text-align:center;list-style:none}.carousel-indicators li{display:inline-block;width:20px;height:20px;margin:2px;text-indent:-999px;cursor:pointer;background-color:transparent;border:1px solid #fff;border-radius:10px}.carousel-indicators .active{width:22px;height:22px;margin:0;background-color:#fff}.carousel-caption{position:absolute;right:15%;bottom:20px;left:15%;z-index:10;padding-top:20px;padding-bottom:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6)}.carousel-caption .btn{text-shadow:none}@media screen and (min-width:768px){.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{width:30px;height:30px;margin-top:-15px;font-size:30px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{margin-left:-15px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{margin-right:-15px}.carousel-caption{right:20%;left:20%;padding-bottom:30px}.carousel-indicators{bottom:40px}}.btn-group-vertical>.btn-group:after,.btn-group-vertical>.btn-group:before,.btn-toolbar:after,.btn-toolbar:before,.clearfix:after,.clearfix:before,.container-fluid:after,.container-fluid:before,.container:after,.container:before,.dl-horizontal dd:after,.dl-horizontal dd:before,.form-horizontal .form-group:after,.form-horizontal .form-group:before,.modal-footer:after,.modal-footer:before,.nav:after,.nav:before,.navbar-collapse:after,.navbar-collapse:before,.navbar-header:after,.navbar-header:before,.navbar:after,.navbar:before,.pager:after,.pager:before,.panel-body:after,.panel-body:before,.row:after,.row:before{display:table;content:" "}.btn-group-vertical>.btn-group:after,.btn-toolbar:after,.clearfix:after,.container-fluid:after,.container:after,.dl-horizontal dd:after,.form-horizontal .form-group:after,.modal-footer:after,.nav:after,.navbar-collapse:after,.navbar-header:after,.navbar:after,.pager:after,.panel-body:after,.row:after{clear:both}.center-block{display:block;margin-right:auto;margin-left:auto}.hide{display:none!important}.show{display:block!important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none!important}.affix{position:fixed}@-ms-viewport{width:device-width}.visible-lg,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block,.visible-md,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-print,.visible-print-block,.visible-print-inline,.visible-print-inline-block,.visible-sm,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-xs,.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block{display:none!important}@media (max-width:767px){.visible-xs{display:block!important}table.visible-xs{display:table}tr.visible-xs{display:table-row!important}td.visible-xs,th.visible-xs{display:table-cell!important}}@media (max-width:767px){.visible-xs-block{display:block!important}}@media (max-width:767px){.visible-xs-inline{display:inline!important}}@media (max-width:767px){.visible-xs-inline-block{display:inline-block!important}}@media (min-width:768px) and (max-width:991px){.visible-sm{display:block!important}table.visible-sm{display:table}tr.visible-sm{display:table-row!important}td.visible-sm,th.visible-sm{display:table-cell!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-block{display:block!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline{display:inline!important}}@media (min-width:768px) and (max-width:991px){.visible-sm-inline-block{display:inline-block!important}}@media (min-width:992px) and (max-width:1199px){.visible-md{display:block!important}table.visible-md{display:table}tr.visible-md{display:table-row!important}td.visible-md,th.visible-md{display:table-cell!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-block{display:block!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline{display:inline!important}}@media (min-width:992px) and (max-width:1199px){.visible-md-inline-block{display:inline-block!important}}@media (min-width:1200px){.visible-lg{display:block!important}table.visible-lg{display:table}tr.visible-lg{display:table-row!important}td.visible-lg,th.visible-lg{display:table-cell!important}}@media (min-width:1200px){.visible-lg-block{display:block!important}}@media (min-width:1200px){.visible-lg-inline{display:inline!important}}@media (min-width:1200px){.visible-lg-inline-block{display:inline-block!important}}@media (max-width:767px){.hidden-xs{display:none!important}}@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none!important}}@media (min-width:992px) and (max-width:1199px){.hidden-md{display:none!important}}@media (min-width:1200px){.hidden-lg{display:none!important}}@media print{.visible-print{display:block!important}table.visible-print{display:table}tr.visible-print{display:table-row!important}td.visible-print,th.visible-print{display:table-cell!important}}@media print{.visible-print-block{display:block!important}}@media print{.visible-print-inline{display:inline!important}}@media print{.visible-print-inline-block{display:inline-block!important}}@media print{.hidden-print{display:none!important}}');
});
define("xg/eid-company-zy/1.0.4/c/css/bootstrap-datetimepicker-debug.css", [], function(require, exports, module) {
    seajs.importStyle(".datetimepicker{padding:4px;margin-top:1px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;direction:ltr}.datetimepicker-inline{width:220px}.datetimepicker.datetimepicker-rtl{direction:rtl}.datetimepicker.datetimepicker-rtl table tr td span{float:right}.datetimepicker-dropdown,.datetimepicker-dropdown-left{top:0;left:0}[class*=\" datetimepicker-dropdown\"]:before{content:'';display:inline-block;border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #ccc;border-bottom-color:rgba(0,0,0,.2);position:absolute}[class*=\" datetimepicker-dropdown\"]:after{content:'';display:inline-block;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #fff;position:absolute}[class*=\" datetimepicker-dropdown-top\"]:before{content:'';display:inline-block;border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #ccc;border-top-color:rgba(0,0,0,.2);border-bottom:0}[class*=\" datetimepicker-dropdown-top\"]:after{content:'';display:inline-block;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #fff;border-bottom:0}.datetimepicker-dropdown-bottom-left:before{top:-7px;right:6px}.datetimepicker-dropdown-bottom-left:after{top:-6px;right:7px}.datetimepicker-dropdown-bottom-right:before{top:-7px;left:6px}.datetimepicker-dropdown-bottom-right:after{top:-6px;left:7px}.datetimepicker-dropdown-top-left:before{bottom:-7px;right:6px}.datetimepicker-dropdown-top-left:after{bottom:-6px;right:7px}.datetimepicker-dropdown-top-right:before{bottom:-7px;left:6px}.datetimepicker-dropdown-top-right:after{bottom:-6px;left:7px}.datetimepicker>div{display:none}.datetimepicker.days div.datetimepicker-days,.datetimepicker.hours div.datetimepicker-hours,.datetimepicker.minutes div.datetimepicker-minutes,.datetimepicker.months div.datetimepicker-months,.datetimepicker.years div.datetimepicker-years{display:block}.datetimepicker table{margin:0}.datetimepicker td,.datetimepicker th{text-align:center;width:20px;height:20px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;border:none}.table-striped .datetimepicker table tr td,.table-striped .datetimepicker table tr th{background-color:transparent}.datetimepicker table tr td.day:hover,.datetimepicker table tr td.hour:hover,.datetimepicker table tr td.minute:hover{background:#eee;cursor:pointer}.datetimepicker table tr td.new,.datetimepicker table tr td.old{color:#999}.datetimepicker table tr td.disabled,.datetimepicker table tr td.disabled:hover{background:0 0;color:#999;cursor:default}.datetimepicker table tr td.today,.datetimepicker table tr td.today.disabled,.datetimepicker table tr td.today.disabled:hover,.datetimepicker table tr td.today:hover{background-color:#fde19a;background-image:-moz-linear-gradient(top,#fdd49a,#fdf59a);background-image:-ms-linear-gradient(top,#fdd49a,#fdf59a);background-image:-webkit-gradient(linear,0 0,0 100%,from(#fdd49a),to(#fdf59a));background-image:-webkit-linear-gradient(top,#fdd49a,#fdf59a);background-image:-o-linear-gradient(top,#fdd49a,#fdf59a);background-image:linear-gradient(top,#fdd49a,#fdf59a);background-repeat:repeat-x;border-color:#fdf59a #fdf59a #fbed50;border-color:rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.datetimepicker table tr td.today.active,.datetimepicker table tr td.today.disabled,.datetimepicker table tr td.today.disabled.active,.datetimepicker table tr td.today.disabled.disabled,.datetimepicker table tr td.today.disabled:active,.datetimepicker table tr td.today.disabled:hover,.datetimepicker table tr td.today.disabled:hover.active,.datetimepicker table tr td.today.disabled:hover.disabled,.datetimepicker table tr td.today.disabled:hover:active,.datetimepicker table tr td.today.disabled:hover:hover,.datetimepicker table tr td.today.disabled:hover[disabled],.datetimepicker table tr td.today.disabled[disabled],.datetimepicker table tr td.today:active,.datetimepicker table tr td.today:hover,.datetimepicker table tr td.today:hover.active,.datetimepicker table tr td.today:hover.disabled,.datetimepicker table tr td.today:hover:active,.datetimepicker table tr td.today:hover:hover,.datetimepicker table tr td.today:hover[disabled],.datetimepicker table tr td.today[disabled]{background-color:#fdf59a}.datetimepicker table tr td.today.active,.datetimepicker table tr td.today.disabled.active,.datetimepicker table tr td.today.disabled:active,.datetimepicker table tr td.today.disabled:hover.active,.datetimepicker table tr td.today.disabled:hover:active,.datetimepicker table tr td.today:active,.datetimepicker table tr td.today:hover.active,.datetimepicker table tr td.today:hover:active{background-color:#fbf069}.datetimepicker table tr td.active,.datetimepicker table tr td.active.disabled,.datetimepicker table tr td.active.disabled:hover,.datetimepicker table tr td.active:hover{background-color:#006dcc;background-image:-moz-linear-gradient(top,#08c,#04c);background-image:-ms-linear-gradient(top,#08c,#04c);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#04c));background-image:-webkit-linear-gradient(top,#08c,#04c);background-image:-o-linear-gradient(top,#08c,#04c);background-image:linear-gradient(top,#08c,#04c);background-repeat:repeat-x;border-color:#04c #04c #002a80;border-color:rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,.25)}.datetimepicker table tr td.active.active,.datetimepicker table tr td.active.disabled,.datetimepicker table tr td.active.disabled.active,.datetimepicker table tr td.active.disabled.disabled,.datetimepicker table tr td.active.disabled:active,.datetimepicker table tr td.active.disabled:hover,.datetimepicker table tr td.active.disabled:hover.active,.datetimepicker table tr td.active.disabled:hover.disabled,.datetimepicker table tr td.active.disabled:hover:active,.datetimepicker table tr td.active.disabled:hover:hover,.datetimepicker table tr td.active.disabled:hover[disabled],.datetimepicker table tr td.active.disabled[disabled],.datetimepicker table tr td.active:active,.datetimepicker table tr td.active:hover,.datetimepicker table tr td.active:hover.active,.datetimepicker table tr td.active:hover.disabled,.datetimepicker table tr td.active:hover:active,.datetimepicker table tr td.active:hover:hover,.datetimepicker table tr td.active:hover[disabled],.datetimepicker table tr td.active[disabled]{background-color:#04c}.datetimepicker table tr td.active.active,.datetimepicker table tr td.active.disabled.active,.datetimepicker table tr td.active.disabled:active,.datetimepicker table tr td.active.disabled:hover.active,.datetimepicker table tr td.active.disabled:hover:active,.datetimepicker table tr td.active:active,.datetimepicker table tr td.active:hover.active,.datetimepicker table tr td.active:hover:active{background-color:#039;display:block;width:25px}.datetimepicker table tr td span{display:block;width:23%;height:54px;line-height:54px;float:left;margin:1%;cursor:pointer;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.datetimepicker .datetimepicker-hours span{height:26px;line-height:26px}.datetimepicker .datetimepicker-hours table tr td span.hour_am,.datetimepicker .datetimepicker-hours table tr td span.hour_pm{width:14.6%}.datetimepicker .datetimepicker-hours fieldset legend,.datetimepicker .datetimepicker-minutes fieldset legend{margin-bottom:inherit;line-height:30px}.datetimepicker .datetimepicker-minutes span{height:26px;line-height:26px}.datetimepicker table tr td span:hover{background:#eee}.datetimepicker table tr td span.disabled,.datetimepicker table tr td span.disabled:hover{background:0 0;color:#999;cursor:default}.datetimepicker table tr td span.active,.datetimepicker table tr td span.active.disabled,.datetimepicker table tr td span.active.disabled:hover,.datetimepicker table tr td span.active:hover{background-color:#006dcc;background-image:-moz-linear-gradient(top,#08c,#04c);background-image:-ms-linear-gradient(top,#08c,#04c);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#04c));background-image:-webkit-linear-gradient(top,#08c,#04c);background-image:-o-linear-gradient(top,#08c,#04c);background-image:linear-gradient(top,#08c,#04c);background-repeat:repeat-x;border-color:#04c #04c #002a80;border-color:rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,.25)}.datetimepicker table tr td span.active.active,.datetimepicker table tr td span.active.disabled,.datetimepicker table tr td span.active.disabled.active,.datetimepicker table tr td span.active.disabled.disabled,.datetimepicker table tr td span.active.disabled:active,.datetimepicker table tr td span.active.disabled:hover,.datetimepicker table tr td span.active.disabled:hover.active,.datetimepicker table tr td span.active.disabled:hover.disabled,.datetimepicker table tr td span.active.disabled:hover:active,.datetimepicker table tr td span.active.disabled:hover:hover,.datetimepicker table tr td span.active.disabled:hover[disabled],.datetimepicker table tr td span.active.disabled[disabled],.datetimepicker table tr td span.active:active,.datetimepicker table tr td span.active:hover,.datetimepicker table tr td span.active:hover.active,.datetimepicker table tr td span.active:hover.disabled,.datetimepicker table tr td span.active:hover:active,.datetimepicker table tr td span.active:hover:hover,.datetimepicker table tr td span.active:hover[disabled],.datetimepicker table tr td span.active[disabled]{background-color:#04c}.datetimepicker table tr td span.active.active,.datetimepicker table tr td span.active.disabled.active,.datetimepicker table tr td span.active.disabled:active,.datetimepicker table tr td span.active.disabled:hover.active,.datetimepicker table tr td span.active.disabled:hover:active,.datetimepicker table tr td span.active:active,.datetimepicker table tr td span.active:hover.active,.datetimepicker table tr td span.active:hover:active{background-color:#039}.datetimepicker table tr td span.old{color:#999}.datetimepicker th.switch{width:145px}.datetimepicker th span.glyphicon{pointer-events:none}.datetimepicker tfoot th,.datetimepicker thead tr:first-child th{cursor:pointer}.datetimepicker tfoot th:hover,.datetimepicker thead tr:first-child th:hover{background:#eee}.input-append.date .add-on i,.input-group.date .input-group-addon span,.input-prepend.date .add-on i{cursor:pointer;width:14px;height:14px}")
});
define("xg/eid-company-zy/1.0.4/c/js/bootstrap-datetimepicker-debug", [], function(require, exports, module) {
    ! function($) {
        if (!("indexOf" in Array.prototype)) {
            Array.prototype.indexOf = function(find, i) {
                if (i === undefined) i = 0;
                if (i < 0) i += this.length;
                if (i < 0) i = 0;
                for (var n = this.length; i < n; i++) {
                    if (i in this && this[i] === find) {
                        return i
                    }
                }
                return -1
            }
        }

        function elementOrParentIsFixed(element) {
            var $element = $(element);
            var $checkElements = $element.add($element.parents());
            var isFixed = false;
            $checkElements.each(function() {
                if ($(this).css("position") === "fixed") {
                    isFixed = true;
                    return false
                }
            });
            return isFixed
        }

        function UTCDate() {
            return new Date(Date.UTC.apply(Date, arguments))
        }

        function UTCToday() {
            var today = new Date;
            return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds(), 0)
        }
        var Datetimepicker = function(element, options) {
            var that = this;
            this.element = $(element);
            this.container = options.container || "body";
            this.language = options.language || this.element.data("date-language") || "en";
            this.language = this.language in dates ? this.language : this.language.split("-")[0];
            this.language = this.language in dates ? this.language : "en";
            this.isRTL = dates[this.language].rtl || false;
            this.formatType = options.formatType || this.element.data("format-type") || "standard";
            this.format = DPGlobal.parseFormat(options.format || this.element.data("date-format") || dates[this.language].format || DPGlobal.getDefaultFormat(this.formatType, "input"), this.formatType);
            this.isInline = false;
            this.isVisible = false;
            this.isInput = this.element.is("input");
            this.fontAwesome = options.fontAwesome || this.element.data("font-awesome") || false;
            this.bootcssVer = options.bootcssVer || (this.isInput ? this.element.is(".form-control") ? 3 : 2 : this.bootcssVer = this.element.is(".input-group") ? 3 : 2);
            this.component = this.element.is(".date") ? this.bootcssVer == 3 ? this.element.find(".input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar, .input-group-addon .glyphicon-calendar, .input-group-addon .fa-calendar, .input-group-addon .fa-clock-o").parent() : this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar .fa-calendar .fa-clock-o").parent() : false;
            this.componentReset = this.element.is(".date") ? this.bootcssVer == 3 ? this.element.find(".input-group-addon .glyphicon-remove, .input-group-addon .fa-times").parent() : this.element.find(".add-on .icon-remove, .add-on .fa-times").parent() : false;
            this.hasInput = this.component && this.element.find("input").length;
            if (this.component && this.component.length === 0) {
                this.component = false
            }
            this.linkField = options.linkField || this.element.data("link-field") || false;
            this.linkFormat = DPGlobal.parseFormat(options.linkFormat || this.element.data("link-format") || DPGlobal.getDefaultFormat(this.formatType, "link"), this.formatType);
            this.minuteStep = options.minuteStep || this.element.data("minute-step") || 5;
            this.pickerPosition = options.pickerPosition || this.element.data("picker-position") || "bottom-right";
            this.showMeridian = options.showMeridian || this.element.data("show-meridian") || false;
            this.initialDate = options.initialDate || new Date;
            this.zIndex = options.zIndex || this.element.data("z-index") || undefined;
            this.icons = {
                leftArrow: this.fontAwesome ? "fa-arrow-left" : this.bootcssVer === 3 ? "glyphicon-arrow-left" : "icon-arrow-left",
                rightArrow: this.fontAwesome ? "fa-arrow-right" : this.bootcssVer === 3 ? "glyphicon-arrow-right" : "icon-arrow-right"
            };
            this.icontype = this.fontAwesome ? "fa" : "glyphicon";
            this._attachEvents();
            this.clickedOutside = function(e) {
                if ($(e.target).closest(".datetimepicker").length === 0) {
                    that.hide()
                }
            };
            this.formatViewType = "datetime";
            if ("formatViewType" in options) {
                this.formatViewType = options.formatViewType
            } else if ("formatViewType" in this.element.data()) {
                this.formatViewType = this.element.data("formatViewType")
            }
            this.minView = 0;
            if ("minView" in options) {
                this.minView = options.minView
            } else if ("minView" in this.element.data()) {
                this.minView = this.element.data("min-view")
            }
            this.minView = DPGlobal.convertViewMode(this.minView);
            this.maxView = DPGlobal.modes.length - 1;
            if ("maxView" in options) {
                this.maxView = options.maxView
            } else if ("maxView" in this.element.data()) {
                this.maxView = this.element.data("max-view")
            }
            this.maxView = DPGlobal.convertViewMode(this.maxView);
            this.wheelViewModeNavigation = false;
            if ("wheelViewModeNavigation" in options) {
                this.wheelViewModeNavigation = options.wheelViewModeNavigation
            } else if ("wheelViewModeNavigation" in this.element.data()) {
                this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation")
            }
            this.wheelViewModeNavigationInverseDirection = false;
            if ("wheelViewModeNavigationInverseDirection" in options) {
                this.wheelViewModeNavigationInverseDirection = options.wheelViewModeNavigationInverseDirection
            } else if ("wheelViewModeNavigationInverseDirection" in this.element.data()) {
                this.wheelViewModeNavigationInverseDirection = this.element.data("view-mode-wheel-navigation-inverse-dir")
            }
            this.wheelViewModeNavigationDelay = 100;
            if ("wheelViewModeNavigationDelay" in options) {
                this.wheelViewModeNavigationDelay = options.wheelViewModeNavigationDelay
            } else if ("wheelViewModeNavigationDelay" in this.element.data()) {
                this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay")
            }
            this.startViewMode = 2;
            if ("startView" in options) {
                this.startViewMode = options.startView
            } else if ("startView" in this.element.data()) {
                this.startViewMode = this.element.data("start-view")
            }
            this.startViewMode = DPGlobal.convertViewMode(this.startViewMode);
            this.viewMode = this.startViewMode;
            this.viewSelect = this.minView;
            if ("viewSelect" in options) {
                this.viewSelect = options.viewSelect
            } else if ("viewSelect" in this.element.data()) {
                this.viewSelect = this.element.data("view-select")
            }
            this.viewSelect = DPGlobal.convertViewMode(this.viewSelect);
            this.forceParse = true;
            if ("forceParse" in options) {
                this.forceParse = options.forceParse
            } else if ("dateForceParse" in this.element.data()) {
                this.forceParse = this.element.data("date-force-parse")
            }
            var template = this.bootcssVer === 3 ? DPGlobal.templateV3 : DPGlobal.template;
            while (template.indexOf("{iconType}") !== -1) {
                template = template.replace("{iconType}", this.icontype)
            }
            while (template.indexOf("{leftArrow}") !== -1) {
                template = template.replace("{leftArrow}", this.icons.leftArrow)
            }
            while (template.indexOf("{rightArrow}") !== -1) {
                template = template.replace("{rightArrow}", this.icons.rightArrow)
            }
            this.picker = $(template).appendTo(this.isInline ? this.element : this.container).on({
                click: $.proxy(this.click, this),
                mousedown: $.proxy(this.mousedown, this)
            });
            if (this.wheelViewModeNavigation) {
                if ($.fn.mousewheel) {
                    this.picker.on({
                        mousewheel: $.proxy(this.mousewheel, this)
                    })
                } else {
                    console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option")
                }
            }
            if (this.isInline) {
                this.picker.addClass("datetimepicker-inline")
            } else {
                this.picker.addClass("datetimepicker-dropdown-" + this.pickerPosition + " dropdown-menu")
            }
            if (this.isRTL) {
                this.picker.addClass("datetimepicker-rtl");
                var selector = this.bootcssVer === 3 ? ".prev span, .next span" : ".prev i, .next i";
                this.picker.find(selector).toggleClass(this.icons.leftArrow + " " + this.icons.rightArrow)
            }
            $(document).on("mousedown", this.clickedOutside);
            this.autoclose = false;
            if ("autoclose" in options) {
                this.autoclose = options.autoclose
            } else if ("dateAutoclose" in this.element.data()) {
                this.autoclose = this.element.data("date-autoclose")
            }
            this.keyboardNavigation = true;
            if ("keyboardNavigation" in options) {
                this.keyboardNavigation = options.keyboardNavigation
            } else if ("dateKeyboardNavigation" in this.element.data()) {
                this.keyboardNavigation = this.element.data("date-keyboard-navigation")
            }
            this.todayBtn = options.todayBtn || this.element.data("date-today-btn") || false;
            this.todayHighlight = options.todayHighlight || this.element.data("date-today-highlight") || false;
            this.weekStart = (options.weekStart || this.element.data("date-weekstart") || dates[this.language].weekStart || 0) % 7;
            this.weekEnd = (this.weekStart + 6) % 7;
            this.startDate = -Infinity;
            this.endDate = Infinity;
            this.daysOfWeekDisabled = [];
            this.setStartDate(options.startDate || this.element.data("date-startdate"));
            this.setEndDate(options.endDate || this.element.data("date-enddate"));
            this.setDaysOfWeekDisabled(options.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled"));
            this.setMinutesDisabled(options.minutesDisabled || this.element.data("date-minute-disabled"));
            this.setHoursDisabled(options.hoursDisabled || this.element.data("date-hour-disabled"));
            this.fillDow();
            this.fillMonths();
            this.update();
            this.showMode();
            if (this.isInline) {
                this.show()
            }
        };
        Datetimepicker.prototype = {
            constructor: Datetimepicker,
            _events: [],
            _attachEvents: function() {
                this._detachEvents();
                if (this.isInput) {
                    this._events = [
                        [this.element, {
                            focus: $.proxy(this.show, this),
                            keyup: $.proxy(this.update, this),
                            keydown: $.proxy(this.keydown, this)
                        }]
                    ]
                } else if (this.component && this.hasInput) {
                    this._events = [
                        [this.element.find("input"), {
                            focus: $.proxy(this.show, this),
                            keyup: $.proxy(this.update, this),
                            keydown: $.proxy(this.keydown, this)
                        }],
                        [this.component, {
                            click: $.proxy(this.show, this)
                        }]
                    ];
                    if (this.componentReset) {
                        this._events.push([this.componentReset, {
                            click: $.proxy(this.reset, this)
                        }])
                    }
                } else if (this.element.is("div")) {
                    this.isInline = true
                } else {
                    this._events = [
                        [this.element, {
                            click: $.proxy(this.show, this)
                        }]
                    ]
                }
                for (var i = 0, el, ev; i < this._events.length; i++) {
                    el = this._events[i][0];
                    ev = this._events[i][1];
                    el.on(ev)
                }
            },
            _detachEvents: function() {
                for (var i = 0, el, ev; i < this._events.length; i++) {
                    el = this._events[i][0];
                    ev = this._events[i][1];
                    el.off(ev)
                }
                this._events = []
            },
            show: function(e) {
                this.picker.show();
                this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
                if (this.forceParse) {
                    this.update()
                }
                this.place();
                $(window).on("resize", $.proxy(this.place, this));
                if (e) {
                    e.stopPropagation();
                    e.preventDefault()
                }
                this.isVisible = true;
                this.element.trigger({
                    type: "show",
                    date: this.date
                })
            },
            hide: function(e) {
                if (!this.isVisible) return;
                if (this.isInline) return;
                this.picker.hide();
                $(window).off("resize", this.place);
                this.viewMode = this.startViewMode;
                this.showMode();
                if (!this.isInput) {
                    $(document).off("mousedown", this.hide)
                }
                if (this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val())) this.setValue();
                this.isVisible = false;
                this.element.trigger({
                    type: "hide",
                    date: this.date
                })
            },
            remove: function() {
                this._detachEvents();
                $(document).off("mousedown", this.clickedOutside);
                this.picker.remove();
                delete this.picker;
                delete this.element.data().datetimepicker
            },
            getDate: function() {
                var d = this.getUTCDate();
                return new Date(d.getTime() + d.getTimezoneOffset() * 6e4)
            },
            getUTCDate: function() {
                return this.date
            },
            setDate: function(d) {
                this.setUTCDate(new Date(d.getTime() - d.getTimezoneOffset() * 6e4))
            },
            setUTCDate: function(d) {
                if (d >= this.startDate && d <= this.endDate) {
                    this.date = d;
                    this.setValue();
                    this.viewDate = this.date;
                    this.fill()
                } else {
                    this.element.trigger({
                        type: "outOfRange",
                        date: d,
                        startDate: this.startDate,
                        endDate: this.endDate
                    })
                }
            },
            setFormat: function(format) {
                this.format = DPGlobal.parseFormat(format, this.formatType);
                var element;
                if (this.isInput) {
                    element = this.element
                } else if (this.component) {
                    element = this.element.find("input")
                }
                if (element && element.val()) {
                    this.setValue()
                }
            },
            setValue: function() {
                var formatted = this.getFormattedDate();
                if (!this.isInput) {
                    if (this.component) {
                        this.element.find("input").val(formatted)
                    }
                    this.element.data("date", formatted)
                } else {
                    this.element.val(formatted)
                }
                if (this.linkField) {
                    $("#" + this.linkField).val(this.getFormattedDate(this.linkFormat))
                }
            },
            getFormattedDate: function(format) {
                if (format == undefined) format = this.format;
                return DPGlobal.formatDate(this.date, format, this.language, this.formatType)
            },
            setStartDate: function(startDate) {
                this.startDate = startDate || -Infinity;
                if (this.startDate !== -Infinity) {
                    this.startDate = DPGlobal.parseDate(this.startDate, this.format, this.language, this.formatType)
                }
                this.update();
                this.updateNavArrows()
            },
            setEndDate: function(endDate) {
                this.endDate = endDate || Infinity;
                if (this.endDate !== Infinity) {
                    this.endDate = DPGlobal.parseDate(this.endDate, this.format, this.language, this.formatType)
                }
                this.update();
                this.updateNavArrows()
            },
            setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
                this.daysOfWeekDisabled = daysOfWeekDisabled || [];
                if (!$.isArray(this.daysOfWeekDisabled)) {
                    this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)
                }
                this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled, function(d) {
                    return parseInt(d, 10)
                });
                this.update();
                this.updateNavArrows()
            },
            setMinutesDisabled: function(minutesDisabled) {
                this.minutesDisabled = minutesDisabled || [];
                if (!$.isArray(this.minutesDisabled)) {
                    this.minutesDisabled = this.minutesDisabled.split(/,\s*/)
                }
                this.minutesDisabled = $.map(this.minutesDisabled, function(d) {
                    return parseInt(d, 10)
                });
                this.update();
                this.updateNavArrows()
            },
            setHoursDisabled: function(hoursDisabled) {
                this.hoursDisabled = hoursDisabled || [];
                if (!$.isArray(this.hoursDisabled)) {
                    this.hoursDisabled = this.hoursDisabled.split(/,\s*/)
                }
                this.hoursDisabled = $.map(this.hoursDisabled, function(d) {
                    return parseInt(d, 10)
                });
                this.update();
                this.updateNavArrows()
            },
            place: function() {
                if (this.isInline) return;
                if (!this.zIndex) {
                    var index_highest = 0;
                    $("div").each(function() {
                        var index_current = parseInt($(this).css("zIndex"), 10);
                        if (index_current > index_highest) {
                            index_highest = index_current
                        }
                    });
                    this.zIndex = index_highest + 10
                }
                var offset, top, left, containerOffset;
                if (this.container instanceof $) {
                    containerOffset = this.container.offset()
                } else {
                    containerOffset = $(this.container).offset()
                }
                if (this.component) {
                    offset = this.component.offset();
                    left = offset.left;
                    if (this.pickerPosition == "bottom-left" || this.pickerPosition == "top-left") {
                        left += this.component.outerWidth() - this.picker.outerWidth()
                    }
                } else {
                    offset = this.element.offset();
                    left = offset.left
                }
                var bodyWidth = document.body.clientWidth || window.innerWidth;
                if (left + 220 > bodyWidth) {
                    left = bodyWidth - 220
                }
                if (this.pickerPosition == "top-left" || this.pickerPosition == "top-right") {
                    top = offset.top - this.picker.outerHeight()
                } else {
                    top = offset.top + this.height
                }
                top = top - containerOffset.top;
                left = left - containerOffset.left;
                this.picker.css({
                    top: top,
                    left: left,
                    zIndex: this.zIndex
                })
            },
            update: function() {
                var date, fromArgs = false;
                if (arguments && arguments.length && (typeof arguments[0] === "string" || arguments[0] instanceof Date)) {
                    date = arguments[0];
                    fromArgs = true
                } else {
                    date = (this.isInput ? this.element.val() : this.element.find("input").val()) || this.element.data("date") || this.initialDate;
                    if (typeof date == "string" || date instanceof String) {
                        date = date.replace(/^\s+|\s+$/g, "")
                    }
                }
                if (!date) {
                    date = new Date;
                    fromArgs = false
                }
                this.date = DPGlobal.parseDate(date, this.format, this.language, this.formatType);
                if (fromArgs) this.setValue();
                if (this.date < this.startDate) {
                    this.viewDate = new Date(this.startDate)
                } else if (this.date > this.endDate) {
                    this.viewDate = new Date(this.endDate)
                } else {
                    this.viewDate = new Date(this.date)
                }
                this.fill()
            },
            fillDow: function() {
                var dowCnt = this.weekStart,
                    html = "<tr>";
                while (dowCnt < this.weekStart + 7) {
                    html += '<th class="dow">' + dates[this.language].daysMin[dowCnt++ % 7] + "</th>"
                }
                html += "</tr>";
                this.picker.find(".datetimepicker-days thead").append(html)
            },
            fillMonths: function() {
                var html = "",
                    i = 0;
                while (i < 12) {
                    html += '<span class="month">' + dates[this.language].monthsShort[i++] + "</span>"
                }
                this.picker.find(".datetimepicker-months td").html(html)
            },
            fill: function() {
                if (this.date == null || this.viewDate == null) {
                    return
                }
                var d = new Date(this.viewDate),
                    year = d.getUTCFullYear(),
                    month = d.getUTCMonth(),
                    dayMonth = d.getUTCDate(),
                    hours = d.getUTCHours(),
                    minutes = d.getUTCMinutes(),
                    startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
                    startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() + 1 : -Infinity,
                    endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
                    endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() + 1 : Infinity,
                    currentDate = new UTCDate(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate()).valueOf(),
                    today = new Date;
                this.picker.find(".datetimepicker-days thead th:eq(1)").text(dates[this.language].months[month] + " " + year);
                if (this.formatViewType == "time") {
                    var formatted = this.getFormattedDate();
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(formatted);
                    this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(formatted)
                } else {
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(dayMonth + " " + dates[this.language].months[month] + " " + year);
                    this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(dayMonth + " " + dates[this.language].months[month] + " " + year)
                }
                this.picker.find("tfoot th.today").text(dates[this.language].today).toggle(this.todayBtn !== false);
                this.updateNavArrows();
                this.fillMonths();
                var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0),
                    day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
                prevMonth.setUTCDate(day);
                prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
                var nextMonth = new Date(prevMonth);
                nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
                nextMonth = nextMonth.valueOf();
                var html = [];
                var clsName;
                while (prevMonth.valueOf() < nextMonth) {
                    if (prevMonth.getUTCDay() == this.weekStart) {
                        html.push("<tr>")
                    }
                    clsName = "";
                    if (prevMonth.getUTCFullYear() < year || prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month) {
                        clsName += " old"
                    } else if (prevMonth.getUTCFullYear() > year || prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month) {
                        clsName += " new"
                    }
                    if (this.todayHighlight && prevMonth.getUTCFullYear() == today.getFullYear() && prevMonth.getUTCMonth() == today.getMonth() && prevMonth.getUTCDate() == today.getDate()) {
                        clsName += " today"
                    }
                    if (prevMonth.valueOf() == currentDate) {
                        clsName += " active"
                    }
                    if (prevMonth.valueOf() + 864e5 <= this.startDate || prevMonth.valueOf() > this.endDate || $.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1) {
                        clsName += " disabled"
                    }
                    html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + "</td>");
                    if (prevMonth.getUTCDay() == this.weekEnd) {
                        html.push("</tr>")
                    }
                    prevMonth.setUTCDate(prevMonth.getUTCDate() + 1)
                }
                this.picker.find(".datetimepicker-days tbody").empty().append(html.join(""));
                html = [];
                var txt = "",
                    meridian = "",
                    meridianOld = "";
                var hoursDisabled = this.hoursDisabled || [];
                for (var i = 0; i < 24; i++) {
                    if (hoursDisabled.indexOf(i) !== -1) continue;
                    var actual = UTCDate(year, month, dayMonth, i);
                    clsName = "";
                    if (actual.valueOf() + 36e5 <= this.startDate || actual.valueOf() > this.endDate) {
                        clsName += " disabled"
                    } else if (hours == i) {
                        clsName += " active"
                    }
                    if (this.showMeridian && dates[this.language].meridiem.length == 2) {
                        meridian = i < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1];
                        if (meridian != meridianOld) {
                            if (meridianOld != "") {
                                html.push("</fieldset>")
                            }
                            html.push('<fieldset class="hour"><legend>' + meridian.toUpperCase() + "</legend>")
                        }
                        meridianOld = meridian;
                        txt = i % 12 ? i % 12 : 12;
                        html.push('<span class="hour' + clsName + " hour_" + (i < 12 ? "am" : "pm") + '">' + txt + "</span>");
                        if (i == 23) {
                            html.push("</fieldset>")
                        }
                    } else {
                        txt = i + ":00";
                        html.push('<span class="hour' + clsName + '">' + txt + "</span>")
                    }
                }
                this.picker.find(".datetimepicker-hours td").html(html.join(""));
                html = [];
                txt = "", meridian = "", meridianOld = "";
                var minutesDisabled = this.minutesDisabled || [];
                for (var i = 0; i < 60; i += this.minuteStep) {
                    if (minutesDisabled.indexOf(i) !== -1) continue;
                    var actual = UTCDate(year, month, dayMonth, hours, i, 0);
                    clsName = "";
                    if (actual.valueOf() < this.startDate || actual.valueOf() > this.endDate) {
                        clsName += " disabled"
                    } else if (Math.floor(minutes / this.minuteStep) == Math.floor(i / this.minuteStep)) {
                        clsName += " active"
                    }
                    if (this.showMeridian && dates[this.language].meridiem.length == 2) {
                        meridian = hours < 12 ? dates[this.language].meridiem[0] : dates[this.language].meridiem[1];
                        if (meridian != meridianOld) {
                            if (meridianOld != "") {
                                html.push("</fieldset>")
                            }
                            html.push('<fieldset class="minute"><legend>' + meridian.toUpperCase() + "</legend>")
                        }
                        meridianOld = meridian;
                        txt = hours % 12 ? hours % 12 : 12;
                        html.push('<span class="minute' + clsName + '">' + txt + ":" + (i < 10 ? "0" + i : i) + "</span>");
                        if (i == 59) {
                            html.push("</fieldset>")
                        }
                    } else {
                        txt = i + ":00";
                        html.push('<span class="minute' + clsName + '">' + hours + ":" + (i < 10 ? "0" + i : i) + "</span>")
                    }
                }
                this.picker.find(".datetimepicker-minutes td").html(html.join(""));
                var currentYear = this.date.getUTCFullYear();
                var months = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(year).end().find("span").removeClass("active");
                if (currentYear == year) {
                    var offset = months.length - 12;
                    months.eq(this.date.getUTCMonth() + offset).addClass("active")
                }
                if (year < startYear || year > endYear) {
                    months.addClass("disabled")
                }
                if (year == startYear) {
                    months.slice(0, startMonth + 1).addClass("disabled")
                }
                if (year == endYear) {
                    months.slice(endMonth).addClass("disabled")
                }
                html = "";
                year = parseInt(year / 10, 10) * 10;
                var yearCont = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(year + "-" + (year + 9)).end().find("td");
                year -= 1;
                for (var i = -1; i < 11; i++) {
                    html += '<span class="year' + (i == -1 || i == 10 ? " old" : "") + (currentYear == year ? " active" : "") + (year < startYear || year > endYear ? " disabled" : "") + '">' + year + "</span>";
                    year += 1
                }
                yearCont.html(html);
                this.place()
            },
            updateNavArrows: function() {
                var d = new Date(this.viewDate),
                    year = d.getUTCFullYear(),
                    month = d.getUTCMonth(),
                    day = d.getUTCDate(),
                    hour = d.getUTCHours();
                switch (this.viewMode) {
                    case 0:
                        if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth() && day <= this.startDate.getUTCDate() && hour <= this.startDate.getUTCHours()) {
                            this.picker.find(".prev").css({
                                visibility: "hidden"
                            })
                        } else {
                            this.picker.find(".prev").css({
                                visibility: "visible"
                            })
                        }
                        if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth() && day >= this.endDate.getUTCDate() && hour >= this.endDate.getUTCHours()) {
                            this.picker.find(".next").css({
                                visibility: "hidden"
                            })
                        } else {
                            this.picker.find(".next").css({
                                visibility: "visible"
                            })
                        }
                        break;
                    case 1:
                        if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth() && day <= this.startDate.getUTCDate()) {
                            this.picker.find(".prev").css({
                                visibility: "hidden"
                            })
                        } else {
                            this.picker.find(".prev").css({
                                visibility: "visible"
                            })
                        }
                        if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth() && day >= this.endDate.getUTCDate()) {
                            this.picker.find(".next").css({
                                visibility: "hidden"
                            })
                        } else {
                            this.picker.find(".next").css({
                                visibility: "visible"
                            })
                        }
                        break;
                    case 2:
                        if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth()) {
                            this.picker.find(".prev").css({
                                visibility: "hidden"
                            })
                        } else {
                            this.picker.find(".prev").css({
                                visibility: "visible"
                            })
                        }
                        if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth()) {
                            this.picker.find(".next").css({
                                visibility: "hidden"
                            })
                        } else {
                            this.picker.find(".next").css({
                                visibility: "visible"
                            })
                        }
                        break;
                    case 3:
                    case 4:
                        if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
                            this.picker.find(".prev").css({
                                visibility: "hidden"
                            })
                        } else {
                            this.picker.find(".prev").css({
                                visibility: "visible"
                            })
                        }
                        if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
                            this.picker.find(".next").css({
                                visibility: "hidden"
                            })
                        } else {
                            this.picker.find(".next").css({
                                visibility: "visible"
                            })
                        }
                        break
                }
            },
            mousewheel: function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.wheelPause) {
                    return
                }
                this.wheelPause = true;
                var originalEvent = e.originalEvent;
                var delta = originalEvent.wheelDelta;
                var mode = delta > 0 ? 1 : delta === 0 ? 0 : -1;
                if (this.wheelViewModeNavigationInverseDirection) {
                    mode = -mode
                }
                this.showMode(mode);
                setTimeout($.proxy(function() {
                    this.wheelPause = false
                }, this), this.wheelViewModeNavigationDelay)
            },
            click: function(e) {
                e.stopPropagation();
                e.preventDefault();
                var target = $(e.target).closest("span, td, th, legend");
                if (target.is("." + this.icontype)) {
                    target = $(target).parent().closest("span, td, th, legend")
                }
                if (target.length == 1) {
                    if (target.is(".disabled")) {
                        this.element.trigger({
                            type: "outOfRange",
                            date: this.viewDate,
                            startDate: this.startDate,
                            endDate: this.endDate
                        });
                        return
                    }
                    switch (target[0].nodeName.toLowerCase()) {
                        case "th":
                            switch (target[0].className) {
                                case "switch":
                                    this.showMode(1);
                                    break;
                                case "prev":
                                case "next":
                                    var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == "prev" ? -1 : 1);
                                    switch (this.viewMode) {
                                        case 0:
                                            this.viewDate = this.moveHour(this.viewDate, dir);
                                            break;
                                        case 1:
                                            this.viewDate = this.moveDate(this.viewDate, dir);
                                            break;
                                        case 2:
                                            this.viewDate = this.moveMonth(this.viewDate, dir);
                                            break;
                                        case 3:
                                        case 4:
                                            this.viewDate = this.moveYear(this.viewDate, dir);
                                            break
                                    }
                                    this.fill();
                                    this.element.trigger({
                                        type: target[0].className + ":" + this.convertViewModeText(this.viewMode),
                                        date: this.viewDate,
                                        startDate: this.startDate,
                                        endDate: this.endDate
                                    });
                                    break;
                                case "today":
                                    var date = new Date;
                                    date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
                                    if (date < this.startDate) date = this.startDate;
                                    else if (date > this.endDate) date = this.endDate;
                                    this.viewMode = this.startViewMode;
                                    this.showMode(0);
                                    this._setDate(date);
                                    this.fill();
                                    if (this.autoclose) {
                                        this.hide()
                                    }
                                    break
                            }
                            break;
                        case "span":
                            if (!target.is(".disabled")) {
                                var year = this.viewDate.getUTCFullYear(),
                                    month = this.viewDate.getUTCMonth(),
                                    day = this.viewDate.getUTCDate(),
                                    hours = this.viewDate.getUTCHours(),
                                    minutes = this.viewDate.getUTCMinutes(),
                                    seconds = this.viewDate.getUTCSeconds();
                                if (target.is(".month")) {
                                    this.viewDate.setUTCDate(1);
                                    month = target.parent().find("span").index(target);
                                    day = this.viewDate.getUTCDate();
                                    this.viewDate.setUTCMonth(month);
                                    this.element.trigger({
                                        type: "changeMonth",
                                        date: this.viewDate
                                    });
                                    if (this.viewSelect >= 3) {
                                        this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0))
                                    }
                                } else if (target.is(".year")) {
                                    this.viewDate.setUTCDate(1);
                                    year = parseInt(target.text(), 10) || 0;
                                    this.viewDate.setUTCFullYear(year);
                                    this.element.trigger({
                                        type: "changeYear",
                                        date: this.viewDate
                                    });
                                    if (this.viewSelect >= 4) {
                                        this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0))
                                    }
                                } else if (target.is(".hour")) {
                                    hours = parseInt(target.text(), 10) || 0;
                                    if (target.hasClass("hour_am") || target.hasClass("hour_pm")) {
                                        if (hours == 12 && target.hasClass("hour_am")) {
                                            hours = 0
                                        } else if (hours != 12 && target.hasClass("hour_pm")) {
                                            hours += 12
                                        }
                                    }
                                    this.viewDate.setUTCHours(hours);
                                    this.element.trigger({
                                        type: "changeHour",
                                        date: this.viewDate
                                    });
                                    if (this.viewSelect >= 1) {
                                        this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0))
                                    }
                                } else if (target.is(".minute")) {
                                    minutes = parseInt(target.text().substr(target.text().indexOf(":") + 1), 10) || 0;
                                    this.viewDate.setUTCMinutes(minutes);
                                    this.element.trigger({
                                        type: "changeMinute",
                                        date: this.viewDate
                                    });
                                    if (this.viewSelect >= 0) {
                                        this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0))
                                    }
                                }
                                if (this.viewMode != 0) {
                                    var oldViewMode = this.viewMode;
                                    this.showMode(-1);
                                    this.fill();
                                    if (oldViewMode == this.viewMode && this.autoclose) {
                                        this.hide()
                                    }
                                } else {
                                    this.fill();
                                    if (this.autoclose) {
                                        this.hide()
                                    }
                                }
                            }
                            break;
                        case "td":
                            if (target.is(".day") && !target.is(".disabled")) {
                                var day = parseInt(target.text(), 10) || 1;
                                var year = this.viewDate.getUTCFullYear(),
                                    month = this.viewDate.getUTCMonth(),
                                    hours = this.viewDate.getUTCHours(),
                                    minutes = this.viewDate.getUTCMinutes(),
                                    seconds = this.viewDate.getUTCSeconds();
                                if (target.is(".old")) {
                                    if (month === 0) {
                                        month = 11;
                                        year -= 1
                                    } else {
                                        month -= 1
                                    }
                                } else if (target.is(".new")) {
                                    if (month == 11) {
                                        month = 0;
                                        year += 1
                                    } else {
                                        month += 1
                                    }
                                }
                                this.viewDate.setUTCFullYear(year);
                                this.viewDate.setUTCMonth(month, day);
                                this.element.trigger({
                                    type: "changeDay",
                                    date: this.viewDate
                                });
                                if (this.viewSelect >= 2) {
                                    this._setDate(UTCDate(year, month, day, hours, minutes, seconds, 0))
                                }
                            }
                            var oldViewMode = this.viewMode;
                            this.showMode(-1);
                            this.fill();
                            if (oldViewMode == this.viewMode && this.autoclose) {
                                this.hide()
                            }
                            break
                    }
                }
            },
            _setDate: function(date, which) {
                if (!which || which == "date") this.date = date;
                if (!which || which == "view") this.viewDate = date;
                this.fill();
                this.setValue();
                var element;
                if (this.isInput) {
                    element = this.element
                } else if (this.component) {
                    element = this.element.find("input")
                }
                if (element) {
                    element.change();
                    if (this.autoclose && (!which || which == "date")) {}
                }
                this.element.trigger({
                    type: "changeDate",
                    date: this.date
                });
                if (date == null) this.date = this.viewDate
            },
            moveMinute: function(date, dir) {
                if (!dir) return date;
                var new_date = new Date(date.valueOf());
                new_date.setUTCMinutes(new_date.getUTCMinutes() + dir * this.minuteStep);
                return new_date
            },
            moveHour: function(date, dir) {
                if (!dir) return date;
                var new_date = new Date(date.valueOf());
                new_date.setUTCHours(new_date.getUTCHours() + dir);
                return new_date
            },
            moveDate: function(date, dir) {
                if (!dir) return date;
                var new_date = new Date(date.valueOf());
                new_date.setUTCDate(new_date.getUTCDate() + dir);
                return new_date
            },
            moveMonth: function(date, dir) {
                if (!dir) return date;
                var new_date = new Date(date.valueOf()),
                    day = new_date.getUTCDate(),
                    month = new_date.getUTCMonth(),
                    mag = Math.abs(dir),
                    new_month, test;
                dir = dir > 0 ? 1 : -1;
                if (mag == 1) {
                    test = dir == -1 ? function() {
                        return new_date.getUTCMonth() == month
                    } : function() {
                        return new_date.getUTCMonth() != new_month
                    };
                    new_month = month + dir;
                    new_date.setUTCMonth(new_month);
                    if (new_month < 0 || new_month > 11) new_month = (new_month + 12) % 12
                } else {
                    for (var i = 0; i < mag; i++) new_date = this.moveMonth(new_date, dir);
                    new_month = new_date.getUTCMonth();
                    new_date.setUTCDate(day);
                    test = function() {
                        return new_month != new_date.getUTCMonth()
                    }
                }
                while (test()) {
                    new_date.setUTCDate(--day);
                    new_date.setUTCMonth(new_month)
                }
                return new_date
            },
            moveYear: function(date, dir) {
                return this.moveMonth(date, dir * 12)
            },
            dateWithinRange: function(date) {
                return date >= this.startDate && date <= this.endDate
            },
            keydown: function(e) {
                if (this.picker.is(":not(:visible)")) {
                    if (e.keyCode == 27) this.show();
                    return
                }
                var dateChanged = false,
                    dir, day, month, newDate, newViewDate;
                switch (e.keyCode) {
                    case 27:
                        this.hide();
                        e.preventDefault();
                        break;
                    case 37:
                    case 39:
                        if (!this.keyboardNavigation) break;
                        dir = e.keyCode == 37 ? -1 : 1;
                        viewMode = this.viewMode;
                        if (e.ctrlKey) {
                            viewMode += 2
                        } else if (e.shiftKey) {
                            viewMode += 1
                        }
                        if (viewMode == 4) {
                            newDate = this.moveYear(this.date, dir);
                            newViewDate = this.moveYear(this.viewDate, dir)
                        } else if (viewMode == 3) {
                            newDate = this.moveMonth(this.date, dir);
                            newViewDate = this.moveMonth(this.viewDate, dir)
                        } else if (viewMode == 2) {
                            newDate = this.moveDate(this.date, dir);
                            newViewDate = this.moveDate(this.viewDate, dir)
                        } else if (viewMode == 1) {
                            newDate = this.moveHour(this.date, dir);
                            newViewDate = this.moveHour(this.viewDate, dir)
                        } else if (viewMode == 0) {
                            newDate = this.moveMinute(this.date, dir);
                            newViewDate = this.moveMinute(this.viewDate, dir)
                        }
                        if (this.dateWithinRange(newDate)) {
                            this.date = newDate;
                            this.viewDate = newViewDate;
                            this.setValue();
                            this.update();
                            e.preventDefault();
                            dateChanged = true
                        }
                        break;
                    case 38:
                    case 40:
                        if (!this.keyboardNavigation) break;
                        dir = e.keyCode == 38 ? -1 : 1;
                        viewMode = this.viewMode;
                        if (e.ctrlKey) {
                            viewMode += 2
                        } else if (e.shiftKey) {
                            viewMode += 1
                        }
                        if (viewMode == 4) {
                            newDate = this.moveYear(this.date, dir);
                            newViewDate = this.moveYear(this.viewDate, dir)
                        } else if (viewMode == 3) {
                            newDate = this.moveMonth(this.date, dir);
                            newViewDate = this.moveMonth(this.viewDate, dir)
                        } else if (viewMode == 2) {
                            newDate = this.moveDate(this.date, dir * 7);
                            newViewDate = this.moveDate(this.viewDate, dir * 7)
                        } else if (viewMode == 1) {
                            if (this.showMeridian) {
                                newDate = this.moveHour(this.date, dir * 6);
                                newViewDate = this.moveHour(this.viewDate, dir * 6)
                            } else {
                                newDate = this.moveHour(this.date, dir * 4);
                                newViewDate = this.moveHour(this.viewDate, dir * 4)
                            }
                        } else if (viewMode == 0) {
                            newDate = this.moveMinute(this.date, dir * 4);
                            newViewDate = this.moveMinute(this.viewDate, dir * 4)
                        }
                        if (this.dateWithinRange(newDate)) {
                            this.date = newDate;
                            this.viewDate = newViewDate;
                            this.setValue();
                            this.update();
                            e.preventDefault();
                            dateChanged = true
                        }
                        break;
                    case 13:
                        if (this.viewMode != 0) {
                            var oldViewMode = this.viewMode;
                            this.showMode(-1);
                            this.fill();
                            if (oldViewMode == this.viewMode && this.autoclose) {
                                this.hide()
                            }
                        } else {
                            this.fill();
                            if (this.autoclose) {
                                this.hide()
                            }
                        }
                        e.preventDefault();
                        break;
                    case 9:
                        this.hide();
                        break
                }
                if (dateChanged) {
                    var element;
                    if (this.isInput) {
                        element = this.element
                    } else if (this.component) {
                        element = this.element.find("input")
                    }
                    if (element) {
                        element.change()
                    }
                    this.element.trigger({
                        type: "changeDate",
                        date: this.date
                    })
                }
            },
            showMode: function(dir) {
                if (dir) {
                    var newViewMode = Math.max(0, Math.min(DPGlobal.modes.length - 1, this.viewMode + dir));
                    if (newViewMode >= this.minView && newViewMode <= this.maxView) {
                        this.element.trigger({
                            type: "changeMode",
                            date: this.viewDate,
                            oldViewMode: this.viewMode,
                            newViewMode: newViewMode
                        });
                        this.viewMode = newViewMode
                    }
                }
                this.picker.find(">div").hide().filter(".datetimepicker-" + DPGlobal.modes[this.viewMode].clsName).css("display", "block");
                this.updateNavArrows()
            },
            reset: function(e) {
                this._setDate(null, "date")
            },
            convertViewModeText: function(viewMode) {
                switch (viewMode) {
                    case 4:
                        return "decade";
                    case 3:
                        return "year";
                    case 2:
                        return "month";
                    case 1:
                        return "day";
                    case 0:
                        return "hour"
                }
            }
        };
        var old = $.fn.datetimepicker;
        $.fn.datetimepicker = function(option) {
            var args = Array.apply(null, arguments);
            args.shift();
            var internal_return;
            this.each(function() {
                var $this = $(this),
                    data = $this.data("datetimepicker"),
                    options = typeof option == "object" && option;
                if (!data) {
                    $this.data("datetimepicker", data = new Datetimepicker(this, $.extend({}, $.fn.datetimepicker.defaults, options)))
                }
                if (typeof option == "string" && typeof data[option] == "function") {
                    internal_return = data[option].apply(data, args);
                    if (internal_return !== undefined) {
                        return false
                    }
                }
            });
            if (internal_return !== undefined) return internal_return;
            else return this
        };
        $.fn.datetimepicker.defaults = {};
        $.fn.datetimepicker.Constructor = Datetimepicker;
        var dates = $.fn.datetimepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                meridiem: ["am", "pm"],
                suffix: ["st", "nd", "rd", "th"],
                today: "Today"
            }
        };
        var DPGlobal = {
            modes: [{
                clsName: "minutes",
                navFnc: "Hours",
                navStep: 1
            }, {
                clsName: "hours",
                navFnc: "Date",
                navStep: 1
            }, {
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            }, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            }],
            isLeapYear: function(year) {
                return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
            },
            getDaysInMonth: function(year, month) {
                return [31, DPGlobal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
            },
            getDefaultFormat: function(type, field) {
                if (type == "standard") {
                    if (field == "input") return "yyyy-mm-dd hh:ii";
                    else return "yyyy-mm-dd hh:ii:ss"
                } else if (type == "php") {
                    if (field == "input") return "Y-m-d H:i";
                    else return "Y-m-d H:i:s"
                } else {
                    throw new Error("Invalid format type.")
                }
            },
            validParts: function(type) {
                if (type == "standard") {
                    return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g
                } else if (type == "php") {
                    return /[dDjlNwzFmMnStyYaABgGhHis]/g
                } else {
                    throw new Error("Invalid format type.")
                }
            },
            nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
            parseFormat: function(format, type) {
                var separators = format.replace(this.validParts(type), "\0").split("\0"),
                    parts = format.match(this.validParts(type));
                if (!separators || !separators.length || !parts || parts.length == 0) {
                    throw new Error("Invalid date format.")
                }
                return {
                    separators: separators,
                    parts: parts
                }
            },
            parseDate: function(date, format, language, type) {
                if (date instanceof Date) {
                    var dateUTC = new Date(date.valueOf() - date.getTimezoneOffset() * 6e4);
                    dateUTC.setMilliseconds(0);
                    return dateUTC
                }
                if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
                    format = this.parseFormat("yyyy-mm-dd", type)
                }
                if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
                    format = this.parseFormat("yyyy-mm-dd hh:ii", type)
                }
                if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(date)) {
                    format = this.parseFormat("yyyy-mm-dd hh:ii:ss", type)
                }
                if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(date)) {
                    var part_re = /([-+]\d+)([dmwy])/,
                        parts = date.match(/([-+]\d+)([dmwy])/g),
                        part, dir;
                    date = new Date;
                    for (var i = 0; i < parts.length; i++) {
                        part = part_re.exec(parts[i]);
                        dir = parseInt(part[1]);
                        switch (part[2]) {
                            case "d":
                                date.setUTCDate(date.getUTCDate() + dir);
                                break;
                            case "m":
                                date = Datetimepicker.prototype.moveMonth.call(Datetimepicker.prototype, date, dir);
                                break;
                            case "w":
                                date.setUTCDate(date.getUTCDate() + dir * 7);
                                break;
                            case "y":
                                date = Datetimepicker.prototype.moveYear.call(Datetimepicker.prototype, date, dir);
                                break
                        }
                    }
                    return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), 0)
                }
                var parts = date && date.toString().match(this.nonpunctuation) || [],
                    date = new Date(0, 0, 0, 0, 0, 0, 0),
                    parsed = {},
                    setters_order = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "D", "DD", "d", "dd", "H", "HH", "p", "P"],
                    setters_map = {
                        hh: function(d, v) {
                            return d.setUTCHours(v)
                        },
                        h: function(d, v) {
                            return d.setUTCHours(v)
                        },
                        HH: function(d, v) {
                            return d.setUTCHours(v == 12 ? 0 : v)
                        },
                        H: function(d, v) {
                            return d.setUTCHours(v == 12 ? 0 : v)
                        },
                        ii: function(d, v) {
                            return d.setUTCMinutes(v)
                        },
                        i: function(d, v) {
                            return d.setUTCMinutes(v)
                        },
                        ss: function(d, v) {
                            return d.setUTCSeconds(v)
                        },
                        s: function(d, v) {
                            return d.setUTCSeconds(v)
                        },
                        yyyy: function(d, v) {
                            return d.setUTCFullYear(v)
                        },
                        yy: function(d, v) {
                            return d.setUTCFullYear(2e3 + v)
                        },
                        m: function(d, v) {
                            v -= 1;
                            while (v < 0) v += 12;
                            v %= 12;
                            d.setUTCMonth(v);
                            while (d.getUTCMonth() != v)
                                if (isNaN(d.getUTCMonth())) return d;
                                else d.setUTCDate(d.getUTCDate() - 1);
                            return d
                        },
                        d: function(d, v) {
                            return d.setUTCDate(v)
                        },
                        p: function(d, v) {
                            return d.setUTCHours(v == 1 ? d.getUTCHours() + 12 : d.getUTCHours())
                        }
                    },
                    val, filtered, part;
                setters_map["M"] = setters_map["MM"] = setters_map["mm"] = setters_map["m"];
                setters_map["dd"] = setters_map["d"];
                setters_map["P"] = setters_map["p"];
                date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                if (parts.length == format.parts.length) {
                    for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                        val = parseInt(parts[i], 10);
                        part = format.parts[i];
                        if (isNaN(val)) {
                            switch (part) {
                                case "MM":
                                    filtered = $(dates[language].months).filter(function() {
                                        var m = this.slice(0, parts[i].length),
                                            p = parts[i].slice(0, m.length);
                                        return m == p
                                    });
                                    val = $.inArray(filtered[0], dates[language].months) + 1;
                                    break;
                                case "M":
                                    filtered = $(dates[language].monthsShort).filter(function() {
                                        var m = this.slice(0, parts[i].length),
                                            p = parts[i].slice(0, m.length);
                                        return m.toLowerCase() == p.toLowerCase()
                                    });
                                    val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                    break;
                                case "p":
                                case "P":
                                    val = $.inArray(parts[i].toLowerCase(), dates[language].meridiem);
                                    break
                            }
                        }
                        parsed[part] = val
                    }
                    for (var i = 0, s; i < setters_order.length; i++) {
                        s = setters_order[i];
                        if (s in parsed && !isNaN(parsed[s])) setters_map[s](date, parsed[s])
                    }
                }
                return date
            },
            formatDate: function(date, format, language, type) {
                if (date == null) {
                    return ""
                }
                var val;
                if (type == "standard") {
                    val = {
                        yy: date.getUTCFullYear().toString().substring(2),
                        yyyy: date.getUTCFullYear(),
                        m: date.getUTCMonth() + 1,
                        M: dates[language].monthsShort[date.getUTCMonth()],
                        MM: dates[language].months[date.getUTCMonth()],
                        d: date.getUTCDate(),
                        D: dates[language].daysShort[date.getUTCDay()],
                        DD: dates[language].days[date.getUTCDay()],
                        p: dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : "",
                        h: date.getUTCHours(),
                        i: date.getUTCMinutes(),
                        s: date.getUTCSeconds()
                    };
                    if (dates[language].meridiem.length == 2) {
                        val.H = val.h % 12 == 0 ? 12 : val.h % 12
                    } else {
                        val.H = val.h
                    }
                    val.HH = (val.H < 10 ? "0" : "") + val.H;
                    val.P = val.p.toUpperCase();
                    val.hh = (val.h < 10 ? "0" : "") + val.h;
                    val.ii = (val.i < 10 ? "0" : "") + val.i;
                    val.ss = (val.s < 10 ? "0" : "") + val.s;
                    val.dd = (val.d < 10 ? "0" : "") + val.d;
                    val.mm = (val.m < 10 ? "0" : "") + val.m
                } else if (type == "php") {
                    val = {
                        y: date.getUTCFullYear().toString().substring(2),
                        Y: date.getUTCFullYear(),
                        F: dates[language].months[date.getUTCMonth()],
                        M: dates[language].monthsShort[date.getUTCMonth()],
                        n: date.getUTCMonth() + 1,
                        t: DPGlobal.getDaysInMonth(date.getUTCFullYear(), date.getUTCMonth()),
                        j: date.getUTCDate(),
                        l: dates[language].days[date.getUTCDay()],
                        D: dates[language].daysShort[date.getUTCDay()],
                        w: date.getUTCDay(),
                        N: date.getUTCDay() == 0 ? 7 : date.getUTCDay(),
                        S: date.getUTCDate() % 10 <= dates[language].suffix.length ? dates[language].suffix[date.getUTCDate() % 10 - 1] : "",
                        a: dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getUTCHours() < 12 ? 0 : 1] : "",
                        g: date.getUTCHours() % 12 == 0 ? 12 : date.getUTCHours() % 12,
                        G: date.getUTCHours(),
                        i: date.getUTCMinutes(),
                        s: date.getUTCSeconds()
                    };
                    val.m = (val.n < 10 ? "0" : "") + val.n;
                    val.d = (val.j < 10 ? "0" : "") + val.j;
                    val.A = val.a.toString().toUpperCase();
                    val.h = (val.g < 10 ? "0" : "") + val.g;
                    val.H = (val.G < 10 ? "0" : "") + val.G;
                    val.i = (val.i < 10 ? "0" : "") + val.i;
                    val.s = (val.s < 10 ? "0" : "") + val.s
                } else {
                    throw new Error("Invalid format type.")
                }
                var date = [],
                    seps = $.extend([], format.separators);
                for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                    if (seps.length) {
                        date.push(seps.shift())
                    }
                    date.push(val[format.parts[i]])
                }
                if (seps.length) {
                    date.push(seps.shift())
                }
                return date.join("")
            },
            convertViewMode: function(viewMode) {
                switch (viewMode) {
                    case 4:
                    case "decade":
                        viewMode = 4;
                        break;
                    case 3:
                    case "year":
                        viewMode = 3;
                        break;
                    case 2:
                    case "month":
                        viewMode = 2;
                        break;
                    case 1:
                    case "day":
                        viewMode = 1;
                        break;
                    case 0:
                    case "hour":
                        viewMode = 0;
                        break
                }
                return viewMode
            },
            headTemplate: "<thead>" + "<tr>" + '<th class="prev"><i class="glyphicon glyphicon-chevron-left"/></th>' + '<th colspan="5" class="switch"></th>' + '<th class="next"><i class="glyphicon glyphicon-chevron-right"/></th>' + "</tr>" + "</thead>",
            headTemplateV3: "<thead>" + "<tr>" + '<th class="prev"><i class="glyphicon glyphicon-chevron-left"/></th>' + '<th colspan="5" class="switch"></th>' + '<th class="next"><i class="glyphicon glyphicon-chevron-right"/></th>' + "</tr>" + "</thead>",
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
        };
        DPGlobal.template = '<div class="datetimepicker">' + '<div class="datetimepicker-minutes">' + '<table class=" table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-hours">' + '<table class=" table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-days">' + '<table class=" table-condensed">' + DPGlobal.headTemplate + "<tbody></tbody>" + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + "</div>";
        DPGlobal.templateV3 = '<div class="datetimepicker">' + '<div class="datetimepicker-minutes">' + '<table class=" table-condensed">' + DPGlobal.headTemplateV3 + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-hours">' + '<table class=" table-condensed">' + DPGlobal.headTemplateV3 + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-days">' + '<table class=" table-condensed">' + DPGlobal.headTemplateV3 + "<tbody></tbody>" + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplateV3 + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datetimepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplateV3 + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + "</div>";
        $.fn.datetimepicker.DPGlobal = DPGlobal;
        $.fn.datetimepicker.noConflict = function() {
            $.fn.datetimepicker = old;
            return this
        };
        $(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide="datetimepicker"]', function(e) {
            var $this = $(this);
            if ($this.data("datetimepicker")) return;
            e.preventDefault();
            $this.datetimepicker("show")
        });
        $(function() {
            $('[data-provide="datetimepicker-inline"]').datetimepicker()
        })
    }(window.jQuery)
});
define("xg/eid-company-zy/1.0.4/c/js/bootstrap-datetimepicker-debug.zh-CN", [], function(require, exports, module) {
    (function($) {
        $.fn.datetimepicker.dates["zh-CN"] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今天",
            suffix: [],
            meridiem: ["上午", "下午"]
        }
    })(jQuery)
});
define("xg/eid-company-zy/1.0.4/p/adminAccount/inforServiceH/inforServiceMH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += '<div class="col-xs-12">\r\n    <div class="queryBox mt-10 text" id="queryTime">\r\n        <label class="labelText w70 pull-left text-r">查询时间：</label>\r\n        <a href="javascript:void(0)" data-querytime="all" class="btn btn-link current">全部</a>\r\n        <a href="javascript:void(0)" data-querytime="today" class="btn btn-link">当天</a>\r\n        <a href="javascript:void(0)" data-querytime="threeDay" class="btn btn-link">最近三天</a>\r\n        <a href="javascript:void(0)" data-querytime="week" class="btn btn-link">最近一周</a>\r\n        <a href="javascript:void(0)" data-querytime="month" class="btn btn-link">最近一月</a>\r\n\r\n    </div>\r\n    <!-- <div class="queryBox mt-10 text" id="userDefined">\r\n        <label class="labelText w70 pull-left text-r">自定义：</label>\r\n        \r\n    </div> -->\r\n    <div class="queryBox mt-10" id="bankStatus">\r\n        <label class="labelText w70 pull-left text-r">业务状况：</label>\r\n        <a href="javascript:void(0)" data-yewu="" data-a="" id="statu" class="btn btn-link  statu-all">全部</a>\r\n         <a href="javascript:void(0)" data-yewu="4" data-a="1" id="statu1" class="btn btn-link">未查看<span>(';
        if (helper = helpers.notChecked) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.notChecked;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-yewu="0" data-a="2" id="statu2"class="btn btn-link">未处理<span>(';
        if (helper = helpers.businessUntreatedCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.businessUntreatedCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-yewu="2"data-a="3" id="statu3" class="btn btn-link statu-unpass">未通过<span>(';
        if (helper = helpers.businessNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.businessNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-yewu="1"data-a="4" id="statu4" class="btn btn-link statu-pass">已通过<span>(';
        if (helper = helpers.businessPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.businessPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n\r\n        <a href="javascript:void(0)" data-yewu="3"data-a="5" id="statu5" class="btn btn-link">黑名单<span>(';
        if (helper = helpers.businessBlacklistCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.businessBlacklistCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n\r\n    </div>\r\n    <div class="queryBox mt-10" id="statusSelect1">\r\n        <label class="labelText w70 pull-left text-r">风险等级：</label>\r\n          <a href="javascript:void(0)" data-level=""id="levebtn" data-b="" class="btn btn-link color-all">全部</a>\r\n        <a href="javascript:void(0)" data-level="3" id="levebtn1" data-b="1"class="btn btn-link color-red">红</a>\r\n        <a href="javascript:void(0)" data-level="2" id="levebtn2" data-b="2"class="btn btn-link color-yellow">黄</a>\r\n        <a href="javascript:void(0)" data-level="1" id="levebtn3" data-b="3"class="btn btn-link color-green">绿</a>\r\n    </div>\r\n    <div class="queryBox mt-10" id="bankStatus1">\r\n        <label class="labelText w70 pull-left text-r">身份信息：</label>\r\n        <a href="javascript:void(0)" data-idval="" data-c=""id="idcard" class="btn btn-link current">全部</a>\r\n        <a href="javascript:void(0)" data-idval="1" data-c="1"id="idcard1" class="btn btn-link">验证通过<span>(';
        if (helper = helpers.identityPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.identityPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-idval="-1" data-c="2"id="idcard2" class="btn btn-link">验证失败<span>(';
        if (helper = helpers.identityNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.identityNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-idval="3" data-c="3"id="idcard3" class="btn btn-link">身份证过期<span>(';
        if (helper = helpers.identityExpiredCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.identityExpiredCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n    </div>\r\n    <div class="queryBox mt-10" id="bankStatus2">\r\n        <label class="labelText w70 pull-left text-r">人脸比对：</label>\r\n        <a href="javascript:void(0)" data-face="" id="face"data-d="" class="btn btn-link current">全部</a>\r\n        <a href="javascript:void(0)" data-face="10" data-d="1"id="face1" class="btn btn-link">识别通过<span>(';
        if (helper = helpers.faceVerificationPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.faceVerificationPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-face="20" data-d="2"id="face2" class="btn btn-link">人工通过<span>(';
        if (helper = helpers.faceVerificationLabourPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.faceVerificationLabourPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-face="-10" data-d="3"id="face3" class="btn btn-link">未通过<span>(';
        if (helper = helpers.faceVerificationNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.faceVerificationNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-face="-20" data-d="4"id="face4" class="btn btn-link">人工未通过<span>(';
        if (helper = helpers.faceVerificationLabourNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.faceVerificationLabourNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n    </div>\r\n    <div class="queryBox mt-10" id="bankStatus3">\r\n        <label class="labelText w70 pull-left text-r">查询来源：</label>\r\n        <a href="javascript:void(0)" data-ren="" class="btn btn-link current">全部</a>\r\n        <a href="javascript:void(0)" data-ren="1" class="btn btn-link">人证通</a>\r\n        <a href="javascript:void(0)" data-ren="3" class="btn btn-link">接口</a>\r\n        <a href="javascript:void(0)" data-ren="2" class="btn btn-link">App</a>\r\n    </div>\r\n    <div class="queryBox mt-10" id="bankStatus4">\r\n        <label class="labelText w70 pull-left text-r">手机校验：</label>\r\n        <a href="javascript:void(0)" data-status="" id="check" data-f=""class="btn btn-link mobile-all">全部</a>\r\n        <a href="javascript:void(0)" data-status="0" id="check1"data-f="1" class="btn btn-link">未校验<span>(';
        if (helper = helpers.mobileCheckUntreatedCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobileCheckUntreatedCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-status="1" id="check2" data-f="2"class="btn btn-link">校验失败<span>(';
        if (helper = helpers.mobileCheckNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobileCheckNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span></a>\r\n        <a href="javascript:void(0)" data-status="2" id="check3"data-f="3" class="btn btn-link mobile-succ">校验成功<span>(';
        if (helper = helpers.mobileCheckPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobileCheckPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ")</span></a>\r\n    </div>\r\n</div>";
        return buffer
    })
});
define("xg/eid-company-zy/1.0.4/p/adminAccount/inforServiceH/inforServiceTableH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, self = this,
            helperMissing = helpers.helperMissing,
            functionType = "function",
            escapeExpression = this.escapeExpression;

        function program1(depth0, data) {
            var buffer = "",
                stack1;
            buffer += " ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += "\r\n    <tr>\r\n        <td>";
            if (helper = helpers.borrowerName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.borrowerName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        <td>" + escapeExpression((helper = helpers.formatstatues || depth0 && depth0.formatstatues, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, depth0 && depth0.mobile, options) : helperMissing.call(depth0, "formatstatues", depth0 && depth0.mobileStatus, depth0 && depth0.mobile, options))) + "</td>\r\n        <td>" + escapeExpression((helper = helpers.formatDateFull || depth0 && depth0.formatDateFull, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.created, options) : helperMissing.call(depth0, "formatDateFull", depth0 && depth0.created, options))) + "</td>\r\n        <td>";
            if (helper = helpers.companyName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.companyName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        <td>";
            if (helper = helpers.childName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.childName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        \r\n        <td>\r\n            ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.source, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.source, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(5, program5, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.source, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.source, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(7, program7, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.source, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.source, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        </td>\r\n        <td>\r\n            " + escapeExpression((helper = helpers.formatstatu || depth0 && depth0.formatstatu, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.flowStatus, depth0 && depth0.idenAuthentication, options) : helperMissing.call(depth0, "formatstatu", depth0 && depth0.flowStatus, depth0 && depth0.idenAuthentication, options))) + "\r\n        </td>\r\n        <td>\r\n            " + escapeExpression((helper = helpers.formatstatue || depth0 && depth0.formatstatue, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "formatstatue", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + '\r\n        </td>\r\n        <td style="position:relative;">\r\n            ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(9, program9, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.level, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.level, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(11, program11, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.level, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.level, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(13, program13, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.level, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.level, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        </td>\r\n        \r\n        <td>\r\n            ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(15, program15, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.isChecked, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.isChecked, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(24, program24, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.isChecked, "==", "0", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.isChecked, "==", "0", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        </td>\r\n        <td>\r\n            ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(26, program26, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.businessProgress, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.businessProgress, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(28, program28, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.businessProgress, "==", "10", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.businessProgress, "==", "10", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n\r\n        </td>\r\n    </tr>\r\n    ";
            return buffer
        }

        function program3(depth0, data) {
            return " 人证通 "
        }

        function program5(depth0, data) {
            return " 接口 "
        }

        function program7(depth0, data) {
            return " App "
        }

        function program9(depth0, data) {
            return '\r\n            <div class="level-green"></div>\r\n            '
        }

        function program11(depth0, data) {
            return '\r\n            <div class="level-yellow"></div>\r\n            '
        }

        function program13(depth0, data) {
            return '\r\n            <div class="level-red"></div>\r\n            '
        }

        function program15(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n            <span class="c-black">  ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(16, program16, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.status, "==", "0", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "==", "0", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(18, program18, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.status, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(20, program20, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.status, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(22, program22, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.status, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " </span> ";
            return buffer
        }

        function program16(depth0, data) {
            return '\r\n                <span class="c-green">未处理</span> '
        }

        function program18(depth0, data) {
            return '\r\n            <span class="c-blue">已通过</span> '
        }

        function program20(depth0, data) {
            return '\r\n            <span class="c-blue">黑名单</span> '
        }

        function program22(depth0, data) {
            return '\r\n            <span class="c-red">未通过</span> '
        }

        function program24(depth0, data) {
            return '\r\n            <span class="c-black">未查看</span> '
        }

        function program26(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <a class="detailBtn underLine" href="/cycle/credit/detail/detailPages.htm?encryptKey=';
            if (helper = helpers.encryptKey) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.encryptKey;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '&types=1" target="_blank">详情</a>            ';
            return buffer
        }

        function program28(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <a class="detailBtn underLine" href="/cycle/credit/detail/detailPage.htm?encryptKey=';
            if (helper = helpers.encryptKey) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.encryptKey;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '&types=1" target="_blank">查询报告</a>            ';
            return buffer
        }

        function program30(depth0, data) {
            return '\r\n    <tr>\r\n        <td class="text-c" colspan="11">查无数据</td>\r\n    </tr>\r\n    '
        }
        buffer += '<thead class="text-c">\r\n    <tr>\r\n        <th>姓名</th>\r\n        <th>手机号</th>\r\n        <th>查询时间</th>\r\n        <th>客户名称</th>\r\n        <th>门店名称</th>\r\n        <th>查询来源</th>\r\n        <th>身份信息</th>\r\n        <th>人脸比对</th>\r\n        <th>风险等级</th>\r\n        <th>业务状况</th>\r\n        <th>身份标识报告</th>\r\n    </tr>\r\n</thead>\r\n<tbody class="text-c">\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(30, program30, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n</tbody>";
        return buffer
    })
});
define("xg/eid-company-zy/1.0.4/p/adminAccount/inforServiceH/picter-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div class="col-xs-12" style="margin-bottom:20px;">\r\n    <div style="height:50px">\r\n        <div id="daypicker" class="queryBox mt-10" style="float:left;margin-left:15px;width:375px;">\r\n            <label class="form-label " style="display:inline-block;margin-left:10px;">查询时间：</label>\r\n            <input size="16" id="startTime" class="startTime input-text pull-left w120" style="width:120px;" type="text" placeholder="开始时间"\r\n                readonly>\r\n            <div class="pull-left" style="height: 32px;line-height: 32px;padding: 0px 10px;display:inline-block">--</div>\r\n            <input size="16" id="endTime" style="width:120px;" class="endTime input-text pull-left w120" type="text" placeholder="结束时间"\r\n                readonly>\r\n        </div>\r\n    </div>\r\n    <form id="infor_searchForm" class="col-xs-8" style="float:left;margin-top:10px;">\r\n        <div class="col-xs-3">\r\n            <label class="form-label col-xs-4 col-sm-5">客户名称：</label>\r\n            <div class="formControls col-xs-8 col-sm-7">\r\n                <input type="text" class="input-text" placeholder="客户名称" name="companyName" id="companyName">\r\n            </div>\r\n        </div>\r\n        <div class="col-xs-3">\r\n            <label class="form-label col-xs-4 col-sm-5">门店名称：</label>\r\n            <div class="formControls col-xs-8 col-sm-7">\r\n                <input type="text" class="input-text" placeholder="门店名称" name="childName" id="childName">\r\n            </div>\r\n        </div>\r\n        <div class="col-xs-2">\r\n            <label class="form-label col-xs-4 col-sm-4">姓名：</label>\r\n            <div class="formControls col-xs-8 col-sm-8">\r\n                <input type="text" class="input-text" autocomplete="off" placeholder="姓名" name="borrowerName" id="borrowerName">\r\n            </div>\r\n        </div>\r\n        <div class="col-xs-3">\r\n            <label class="form-label col-xs-4 col-sm-4">手机号：</label>\r\n            <div class="formControls col-xs-8 col-sm-8">\r\n                <input type="text" class="input-text" autocomplete="off" placeholder="手机号" name="borrowerName1" id="borrowerName1">\r\n            </div>\r\n        </div>\r\n        <input class="btn btn-default col-xs-1" type="submit" id="search_button" value="搜索">\r\n    </form>\r\n</div>\r\n<hr>'
    })
});