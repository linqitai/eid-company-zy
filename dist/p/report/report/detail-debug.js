define("xg/eid-company/1.0.4/p/report/report/detail-debug", ["jquery/jquery/1.10.1/jquery-debug", "xg/eid-company/1.0.4/", "xg/eid-company/1.0.4/p/report/report/creditReport-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/creditOptionH-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/helpConsumeLoan-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/helpRent-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/helpPersonnel -debug.handlebars", "xg/eid-company/1.0.4/p/report/report/leftBasicInfo-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/identityInfo-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/rightBox-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/helpCarFinancial-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/bottomBtn-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/threeMonthRecord-debug.handlebars"], function(require, exports, module) {
    var $ = require("jquery/jquery/1.10.1/jquery-debug"),
        tools = require("xg/eid-company/1.0.4/");
    require("xg/eid-company/1.0.4/");
    var creditReportH = require("xg/eid-company/1.0.4/p/report/report/creditReport-debug.handlebars");
    var creditOptionH = require("xg/eid-company/1.0.4/p/report/report/creditOptionH-debug.handlebars");
    var helpConsumeLoan = require("xg/eid-company/1.0.4/p/report/report/helpConsumeLoan-debug.handlebars");
    var helpRent = require("xg/eid-company/1.0.4/p/report/report/helpRent-debug.handlebars");
    var helpPersonnel = require("xg/eid-company/1.0.4/p/report/report/helpPersonnel -debug.handlebars");
    var main = {
        init: function() {
            var self = this;
            self.data = {
                encryptKey: tools.getUrlParam("encryptKey"),
                flag: 2
            };
            $.when(tools.getUserInfo()).then(function(data) {
                if (data.login == true) {
                    userType = data.user.userType;
                    self.getLeftBaseInfo(data.user.parentId);
                    self.typeId = data.user.typeId;
                    self.userType = data.user.userType;
                    self.showReport = data.user.showReport
                } else {
                    tools.tusi("未登录");
                    if (tools.getUrlParam("userType") == 1) {
                        setTimeout(function() {
                            window.location.href = "/company/login.htm"
                        }, 500)
                    } else {
                        setTimeout(function() {
                            window.location.href = "/customer/login.htm"
                        }, 500)
                    }
                }
            }, function() {})
        },
        getLeftBaseInfo: function(parentId) {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: "/cycle/credit/detail/basicInfo.json",
                success: function(data) {
                    var obj = data.obj;
                    console.log(obj);
                    obj.parentIdP = parentId;
                    obj.showReport = self.showReport;
                    var leftBasicInfo = require("xg/eid-company/1.0.4/p/report/report/leftBasicInfo-debug.handlebars");
                    $("#leftBasicInfoBox").html(leftBasicInfo(obj));
                    var identityInfo = require("xg/eid-company/1.0.4/p/report/report/identityInfo-debug.handlebars");
                    if (obj.frontImage || obj.backImage) {
                        $("#box2").html(identityInfo(obj));
                        $("#forbot").removeClass("active")
                    } else {
                        $("#box2").html(identityInfo(obj));
                        $("#thretop").removeClass("active")
                    }
                    var rightBox = require("xg/eid-company/1.0.4/p/report/report/rightBox-debug.handlebars");
                    $("#rightBox").html(rightBox(obj));
                    if (self.userType == 1) {
                        $("#help").hide()
                    } else {
                        var typeId = self.typeId;
                        if (typeId == 1) {
                            var helpCarFinancial = require("xg/eid-company/1.0.4/p/report/report/helpCarFinancial-debug.handlebars");
                            $("#bx").html(helpCarFinancial())
                        } else if (typeId == 2) {
                            $("#bx").html(helpConsumeLoan())
                        } else if (typeId == 3) {
                            $("#bx").html(helpRent())
                        } else if (typeId == 4) {
                            $("#bx").html(helpPersonnel())
                        }
                    }
                    var bottomBtn = require("xg/eid-company/1.0.4/p/report/report/bottomBtn-debug.handlebars");
                    $("#bottom_btn").html(bottomBtn(obj));
                    if (userType == 2) {
                        $(".btn.pass").show();
                        $(".btn.noThrougth").show();
                        $(".btn.blacklist").show()
                    } else {
                        $(".btn.download").show()
                    }
                    self.getplScan();
                    self.getClBehavior();
                    self.getBadBehavior();
                    self.getConsumeBehavior();
                    self.getCommunicationTrack();
                    var data = {
                        cardNum: $("#cardNum").html()
                    };
                    self.threeMonthRecord(data);
                    self.initEvents();
                    $(".bottom_btn").on("click", ".pass", function() {
                        var _this = $(this);
                        var optionData = {
                            borrowerName: obj.borrowerName,
                            optionText: _this.text(),
                            encryptKey: tools.getUrlParam("encryptKey"),
                            status: 1
                        };
                        $("#modal-creditOption").remove();
                        $("body").append(creditOptionH(optionData));
                        $("#modal-creditOption").modal("show");
                        self.creditForm_validate()
                    });
                    $(".bottom_btn").on("click", ".noThrougth", function() {
                        var _this = $(this);
                        var optionData = {
                            borrowerName: obj.borrowerName,
                            optionText: _this.text(),
                            encryptKey: tools.getUrlParam("encryptKey"),
                            status: 2
                        };
                        $("#modal-creditOption").remove();
                        $("body").append(creditOptionH(optionData));
                        $("#modal-creditOption").modal("show");
                        self.creditForm_validate()
                    });
                    $(".bottom_btn").on("click", ".blacklist", function() {
                        var _this = $(this);
                        var optionData = {
                            borrowerName: obj.borrowerName,
                            optionText: _this.text(),
                            encryptKey: tools.getUrlParam("encryptKey"),
                            status: 3
                        };
                        $("#modal-creditOption").remove();
                        $("body").append(creditOptionH(optionData));
                        $("#modal-creditOption").modal("show");
                        self.creditForm_validate()
                    });
                    $(".bottom_btn").on("click", ".download", function() {
                        console.log(encodeURIComponent(tools.getUrlParam("encryptKey")));
                        window.location.href = "/cycle/credit/downloadPersonalReport.do?encryptKey=" + encodeURIComponent(tools.getUrlParam("encryptKey"))
                    })
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~")
                    } else {
                        tools.tusi("系统出错了")
                    }
                }
            })
        },
        threeMonthRecord: function(data) {
            var self = this;
            $.ajax({
                data: {
                    encryptKey: tools.getUrlParam("encryptKey")
                },
                cache: false,
                type: "post",
                url: "/cycle/credit/detail/queryRecord.json",
                success: function(data) {
                    if (data.code == 0) {
                        console.log(data);
                        var obj = data.obj;
                        var list = require("xg/eid-company/1.0.4/p/report/report/threeMonthRecord-debug.handlebars");
                        $("#threeMonthRecord").html(list(obj))
                    } else {
                        tools.tusi("系统出错了")
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~")
                    } else {
                        tools.tusi("系统出错了")
                    }
                }
            })
        },
        transformData: function(div, circleDiv, outerCircle, colors) {
            var self = this;
            div.children(".name").html(self.name);
            var green = 0,
                yellow = 0,
                red = 0;
            if (self.color == "green") {
                div.addClass("colorGreen");
                colors.green = 1
            } else if (self.color == "yellow") {
                div.addClass("colorYellow");
                colors.yellow = 1
            } else if (self.color == "red") {
                colors.red = 1;
                div.addClass("colorRed")
            }
        },
        setCircleColor: function(circleDiv, outerCircle, colors) {
            if (colors.red == 1) {
                circleDiv.addClass("cRed").attr("data-color", "red");
                outerCircle.addClass("red").attr("data-color", "red")
            } else if (colors.yellow == 1) {
                circleDiv.addClass("cYellow").attr("data-color", "yellow");
                outerCircle.addClass("yellow").attr("data-color", "yellow")
            } else {
                circleDiv.addClass("cGreen").attr("data-color", "green");
                outerCircle.addClass("green").attr("data-color", "green")
            }
        },
        getNameColor: function(map) {
            var self = this;
            if (map != null && map != "") {
                self.name = map["context"];
                if (map.level == 1) {
                    self.color = "green"
                } else if (map.level == 2) {
                    self.color = "yellow"
                } else {
                    self.color = "red"
                }
            } else {
                self.name = "()";
                self.color = "green"
            }
        },
        getplScan: function() {
            var self = this;
            var encryptKey = tools.getUrlParam("encryptKey");
            $.ajax({
                data: {
                    encryptKey: encryptKey,
                    flag: 2
                },
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryFinancial.json",
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        var circleDiv = $("#communicationTrack");
                        var outerCircle = $("#outerCCommunicationTrack");
                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        };
                        var firstStatus1 = obj[0];
                        var div = $("#firstStatus1");
                        self.name = "", self.color = "";
                        self.getNameColor(firstStatus1);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var circleDiv = $("#plScan");
                        var outerCircle = $("#outerCPlScan");
                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        };
                        var firstStatus1 = obj[0];
                        var div = $("#caseRecord");
                        self.name = "", self.color = "";
                        self.getNameColor(firstStatus1);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        phoneRecord;
                        var firstStatus1 = obj[1];
                        var div = $("#phoneRecord");
                        self.name = "", self.color = "";
                        self.getNameColor(firstStatus1);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var firstStatus1 = obj[2];
                        var div = $("#zhimaRecord");
                        self.name = "", self.color = "";
                        self.getNameColor(firstStatus1);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        self.setCircleColor(circleDiv, outerCircle, colors);
                        window.localStorage.plScanColor = self.color
                    } else {
                        tools.tusi("系统出错了")
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~")
                    } else {
                        tools.tusi("系统出错了")
                    }
                }
            })
        },
        getClBehavior: function() {
            var self = this;
            encryptKey = tools.getUrlParam("encryptKey");
            $.ajax({
                data: {
                    encryptKey: encryptKey,
                    flag: 2
                },
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/IdenVerificationResults.json",
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        console.log(obj);
                        var level = [];
                        obj.forEach(function(item) {
                            level.push(item.level)
                        });
                        var max = Math.max.apply(Math, level);
                        var circleDiv = $("#clBehavior");
                        var outerCircle = $("#outerCClBehavior");
                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        };
                        var trdFinancialOver = obj[0];
                        var div = $("#trdFinancialOver");
                        self.name = "", self.color = "";
                        self.getNameColor(trdFinancialOver);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var borrowOver = obj[1];
                        var div = $("#borrowOver");
                        self.name = "", self.color = "";
                        self.getNameColor(borrowOver);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        self.setCircleColor(circleDiv, outerCircle, colors)
                    } else {
                        tools.tusi("系统出错了")
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~")
                    } else {
                        tools.tusi("系统出错了")
                    }
                }
            })
        },
        getBadBehavior: function() {
            var self = this;
            $.ajax({
                data: {
                    encryptKey: encryptKey,
                    flag: 2
                },
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryPolice.json",
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        var circleDiv = $("#badBehavior");
                        var outerCircle = $("#outerCBadBehavior");
                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        };
                        var penalRecord = obj[0];
                        var div = $("#penalRecord");
                        self.name = "", self.color = "";
                        self.getNameColor(penalRecord);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        self.setCircleColor(circleDiv, outerCircle, colors);
                        window.localStorage.badBehaviorColor = self.color
                    } else {
                        tools.tusi("系统出错了")
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~")
                    } else {
                        tools.tusi("系统出错了")
                    }
                }
            })
        },
        getConsumeBehavior: function() {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryCourt.json",
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        console.log(obj);
                        var circleDiv = $("#consumeBehavior");
                        var outerCircle = $("#outerCConsumeBehavior");
                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        };
                        var ExceptionTrade = obj[0];
                        var div = $("#ExceptionTrade");
                        self.name = "", self.color = "";
                        self.getNameColor(ExceptionTrade);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var cashOut = obj[1];
                        var div = $("#cashOut");
                        self.name = "", self.color = "";
                        self.getNameColor(cashOut);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var badCost = obj[2];
                        var div = $("#badCost");
                        self.name = "", self.color = "";
                        self.getNameColor(badCost);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var caipan = obj[3];
                        var div = $("#caipan");
                        self.name = "", self.color = "";
                        self.getNameColor(caipan);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var baoguangtai = obj[4];
                        var div = $("#baoguangtai");
                        self.name = "", self.color = "";
                        self.getNameColor(baoguangtai);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var taiting = obj[5];
                        var div = $("#taiting");
                        self.name = "", self.color = "";
                        self.getNameColor(taiting);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var anjian = obj[6];
                        var div = $("#anjian");
                        self.name = "", self.color = "";
                        self.getNameColor(anjian);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var heimingdan = obj[7];
                        var div = $("#heimingdan");
                        self.name = "", self.color = "";
                        self.getNameColor(heimingdan);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        self.setCircleColor(circleDiv, outerCircle, colors);
                        window.localStorage.consumeBehaviorColor = self.color
                    } else {
                        tools.tusi("系统出错了")
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~")
                    } else {
                        tools.tusi("系统出错了")
                    }
                }
            })
        },
        getCommunicationTrack: function() {
            var self = this;
            $.ajax({
                data: {
                    encryptKey: encryptKey,
                    flag: 2
                },
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryOtherInfo.json",
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        var circleDiv = $("#communicationTrack");
                        var outerCircle = $("#outerCCommunicationTrack");
                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        };
                        var firstStatus = obj[0];
                        var div = $("#firstStatus");
                        self.name = "", self.color = "";
                        self.getNameColor(firstStatus);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var onlineTimeMap = obj[1];
                        var div = $("#onlineTimeMap");
                        self.name = "", self.color = "";
                        self.getNameColor(onlineTimeMap);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        var specialRelation = obj[2];
                        var div = $("#specialRelation");
                        self.name = "", self.color = "";
                        self.getNameColor(specialRelation);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        self.setCircleColor(circleDiv, outerCircle, colors);
                        window.localStorage.communicationTrackColor = self.color
                    } else {
                        tools.tusi("系统出错了")
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~")
                    } else {
                        tools.tusi("系统出错了")
                    }
                }
            })
        },
        initEvents: function() {
            var self = this;
            $("body").on("click", "#back", function() {
                var types = tools.getUrlParam("types");
                if (types == 1) {
                    window.location.href = "/company/homePage.htm"
                } else if (types == 2) {
                    window.location.href = "/headShop/homePage.htm"
                } else if (types == 3) {
                    window.location.href = "/subShop/infoSearch/view.htm"
                }
            });
            $(".circle").hover(function() {
                $(this).find(".outerCircle").css("display", "block");
                $(this).find(".text").css("display", "none");
                $(this).find(".popover").css("display", "block")
            }, function() {
                $(this).find(".outerCircle").css("display", "none");
                $(this).find(".text").css("display", "block");
                $(this).find(".popover").css("display", "none")
            });

            function stopDefault(e) {
                if (e && e.preventDefault) e.preventDefault();
                else window.event.returnValue = false;
                return false
            }
            $("#wrap").on("mouseover", function() {
                $("body").on("mousewheel", function(e) {})
            });
            $("#helpText").hover(function(event) {
                $(".wrap").css("opacity", "1")
            });
            $("#wrap").on("mouseleave", function() {
                $(".wrap").css("opacity", "0");
                $("body").on("mousewheel", function(e) {
                    $("body").scroll()
                })
            });
            $(".circle").on("click", function() {
                var color = $(this).data("color");
                window.localStorage.color = color
            });
            $("#checkFullReportBtn").on("click", function() {
                var plScanColor = $("#plScan").data("color");
                var clBehaviorColor = $("#clBehavior").data("color");
                var badBehaviorColor = $("#badBehavior").data("color");
                var consumeBehaviorColor = $("#consumeBehavior").data("color");
                var communicationTrackColor = $("#communicationTrack").data("color");
                window.localStorage.plScanColor = plScanColor;
                window.localStorage.clBehaviorColor = clBehaviorColor;
                window.localStorage.badBehaviorColor = badBehaviorColor;
                window.localStorage.consumeBehaviorColor = consumeBehaviorColor;
                window.localStorage.communicationTrackColor = communicationTrackColor
            })
        },
        creditForm_validate: function() {
            var validate = $("#creditOptionForm").validate({
                debug: true,
                focusInvalid: false,
                onkeyup: false,
                onblur: true,
                submitHandler: function(form) {
                    $.ajax({
                        type: "post",
                        url: "/cycle/credit/setStatus.json",
                        data: $("#creditOptionForm").serialize(),
                        success: function(data, status, xhr) {
                            if (data.code == -1) {
                                tools.tusi(data.error)
                            } else {
                                tools.tusi("设置成功");
                                setTimeout(function() {
                                    window.location.reload()
                                }, 500)
                            }
                        },
                        error: function(xhr, errorType, error) {
                            tools.tusi(error)
                        }
                    })
                }
            })
        },
        setScrollRollBar: function() {
            var bx = document.getElementById("bx"),
                cn = document.getElementById("cn"),
                bs = document.getElementById("bs"),
                sc = document.getElementById("sc"),
                oldY = 0,
                newY = 0,
                nowY = 0,
                maxY = 0,
                nowDisY = 0,
                judge = 0,
                scrY = 0;
            bxHeight = bx.clientHeight, bsHeight = bs.clientHeight, cnHeight = cn.offsetHeight;
            var scHeight = bxHeight / cnHeight * bxHeight;
            sc.style.height = scHeight + "px";
            if (cnHeight < bxHeight) {
                bs.style.display = "none"
            }
            sc.onmousedown = function(e) {
                oldY = e.clientY;
                nowDisY = sc.offsetTop;
                document.onmousemove = function(e) {
                    newY = e.clientY;
                    nowY = nowDisY + newY - oldY;
                    maxY = bsHeight - scHeight;
                    if (nowY <= 0) {
                        nowY = 0
                    }
                    if (nowY >= maxY) {
                        nowY = maxY
                    }
                    bx.scrollTop = nowY / maxY * (cnHeight - bxHeight);
                    sc.style.top = nowY + "px"
                }
            };
            document.onmouseup = function() {
                document.onmousemove = null
            };
            $("body").on("mouseover", "#cn", function() {
                event.preventDefault();
                $("body").find("#cn").on("mousewheel DOMMouseScroll", function(e) {
                    e = e.originalEvent || window.event.originalEvent;
                    scrollFunc(e);
                    var c = $("#cn").height() - $("#bx").height();
                    if (Judge) {
                        scrY--
                    } else {
                        scrY++
                    }
                    if (scrY <= 0) {
                        scrY = 0
                    }
                    if (scrY >= c) {
                        scrY = c
                    }
                    bx.scrollTop = scrY * 10;
                    sc.style.top = bx.scrollTop * bxHeight / cnHeight + "px"
                })
            });
            $("body").on("mouseout", "#cn", function() {
                $("body").find("#cn").off("mousewheel DOMMouseScroll")
            });

            function scrollFunc(e) {
                if (e.wheelDelta) {
                    if (e.wheelDelta > 0) {
                        Judge = true
                    }
                    if (e.wheelDelta < 0) {
                        Judge = false
                    }
                } else if (e.detail) {
                    if (e.detail > 0) {
                        Judge = false
                    }
                    if (e.detail < 0) {
                        Judge = true
                    }
                }
            }
        }
    };
    main.init()
});
define("xg/eid-company/1.0.4/p/report/report/creditReport-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, functionType = "function",
            escapeExpression = this.escapeExpression,
            helperMissing = helpers.helperMissing,
            self = this;

        function program1(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program3(depth0, data) {
            return "--"
        }

        function program5(depth0, data) {
            var helper, options;
            return escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options)))
        }

        function program7(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program9(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program11(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program13(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program15(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program17(depth0, data) {
            return "人脸比对成功"
        }

        function program19(depth0, data) {
            return "人脸比对失败"
        }

        function program21(depth0, data) {
            return '\r\n        <tbody class="text-c courtDataSecond">\r\n\r\n        </tbody>\r\n    '
        }

        function program23(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program25(depth0, data) {
            return '\r\n        <tbody class="text-c pawnshopFirst">\r\n\r\n        </tbody>\r\n    '
        }

        function program27(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program29(depth0, data) {
            return '\r\n        <tbody class="text-c pawnshopSecond">\r\n\r\n        </tbody>\r\n    '
        }

        function program31(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program33(depth0, data) {
            var stack1, helper;
            if (helper = helpers.message) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.message;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program35(depth0, data) {
            var stack1, helper;
            if (helper = helpers.caseTime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.caseTime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program37(depth0, data) {
            return "disabled"
        }
        buffer += '<div class="cl number_time">\r\n<!-- <div class="col-sm-6">报告编号：201611190000001</div> -->\r\n<div class="col-sm-12 text-r">查询时间：' + escapeExpression((helper = helpers.formatDate || depth0 && depth0.formatDate, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.created, options) : helperMissing.call(depth0, "formatDate", depth0 && depth0.created, options))) + '</div>\r\n</div>\r\n<h4 class="text-c">查询信息</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>被查询者姓名</th>\r\n        <th>被查询者证件类型</th>\r\n        <th>被查询者证件号码</th>\r\n        <th>查询门店</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n      <tr>\r\n        <td>';
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
        buffer += escapeExpression(stack1) + "</td>\r\n        <td>身份证</td>\r\n        <td>";
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
        buffer += escapeExpression(stack1) + "</td>\r\n        <td>";
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
        buffer += escapeExpression(stack1) + '</td>\r\n      </tr>\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">人证核实</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>身份证正面</th>\r\n        <th>身份证反面</th>\r\n        <th>本人照片</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n        <tr>\r\n            <td>\r\n                <div class="identity identityFront">\r\n                    <div class="cl mt20">\r\n                        <div class="pull-left w170 ml-5">\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">姓名</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.borrowerName, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">性别</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.sex, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(5, program5, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span><span class="ml-15 lightblue">民族</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.nation, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(7, program7, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">出生</span><span class="addText birthdate_year"></span><span class="lightblue"> 年 </span><span class="addText birthdate_mouth"></span><span class="lightblue"> 月 </span><span class="addText birthdate_day"></span><span class="lightblue"> 日 </span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">住址</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.address, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(9, program9, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class="pull-right w80 mr-5 mt5">\r\n                           <img src="';
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
        buffer += escapeExpression(stack1) + '" class="frontPic" alt="暂无此照片">\r\n                        </div>\r\n                    </div>\r\n                    <div class="lineBox pdt18 cl ml-5">\r\n                        <span class="lightblue">公民身份证号码</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.cardNum, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(11, program11, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <div class="identity identityBack">\r\n                    <div class="lineBox mt125 ml-50">\r\n                        <span class="fw_bold">签发机关</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.issuer, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(13, program13, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                    <div class="lineBox ml-50">\r\n                        <span class="fw_bold">有效期限</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.validDate, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(15, program15, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <img class="card_img" src="';
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
        buffer += escapeExpression(stack1) + '">\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n          <td class="td_bg">核实结果</td>\r\n          <td colspan=2>';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.program(19, program19, data),
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.compareResult, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.compareResult, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">法院数据</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>法院失信名单</th>\r\n        <th>法院执行名单</th>\r\n        <th>法院结案</th>\r\n        <th>法人失信</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c courtDataFirst">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>案号</th>\r\n        <th>执行法院</th>\r\n        <th>案件状态</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.courtList, {
            hash: {},
            inverse: self.program(23, program23, data),
            fn: self.program(21, program21, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<h4 class="text-c">信贷行业</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>信用/消费贷黑名单</th>\r\n        <th>信贷逾期</th>\r\n        <th>信用卡逾期</th>\r\n        <th>P2P黑名单</th>\r\n        <th>助学贷款逾期</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditFirst">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>套现交易</th>\r\n        <th>信贷失联</th>\r\n        <th>信贷欺诈</th>\r\n        <th>风控规则</th>\r\n        <th>黑中介</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditSecond">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>骗取补贴</th>\r\n        <th>冒用风险</th>\r\n        <th>信贷分值低</th>\r\n        <th>曾经逾期（0-30天）</th>\r\n        <th>信贷黑名单</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditThree">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>商户欺诈名单</th>\r\n        <th>曾经逾期（未知期限）</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditFour">\r\n\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">三方支付</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>盗卡</th>\r\n        <th>其他欺诈</th>\r\n        <th>盗用操作</th>\r\n        <th>盗用支出</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c threePayment">\r\n\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">典当行</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>典当物品</th>\r\n        <th>典当金额</th>\r\n        <th>典当地点</th>\r\n        <th>典当时间</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.pawnList, {
            hash: {},
            inverse: self.program(27, program27, data),
            fn: self.program(25, program25, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>违约行为</th>\r\n        <th>描述</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.pawnList, {
            hash: {},
            inverse: self.program(31, program31, data),
            fn: self.program(29, program29, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<h4 class="text-c">负面信息</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>不良记录</th>\r\n        <th>案件时间</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n      <tr>\r\n        <td>';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.message, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(33, program33, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "</td>\r\n        <td>";
        stack1 = helpers["if"].call(depth0, depth0 && depth0.caseTime, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(35, program35, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</td>\r\n      </tr>\r\n    </tbody>\r\n</table>\r\n<h6>1.本信息的著作权属于杭州信鸽金融信息服务股份有限公司，未经书面许可，不得擅自复制、摘录、编辑、转载、披露和发表。</h6>\r\n<h6>2.使用本信息需经过被查询人授权，信鸽金服不承担因授权不充分而引起的任何法律责任。</h6>\r\n<h6>3.本信息中除信鸽EID身份标识查询特殊标注外，信息均由相关数据来源机构和信息主体来源机构，承诺在信息整合、汇总、展示的全过程当中保持客观、中立的地位。</h6>\r\n<div class="cl top_border">\r\n    <div class="bottom_btn">\r\n      <a class="btn btn-primary radius download" href="javascript:void(0)">下载报告</a>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius pass" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核通过</button>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius noThrougth" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核不通过</button>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius blacklist" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ">加入黑名单</button>\r\n    </div>\r\n</div>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/creditOptionH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += ' <div id="modal-creditOption" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\r\n  <div class="modal-dialog">\r\n    <div class="modal-content radius">\r\n      <div class="modal-header">\r\n        <h5 class="modal-title" style="font-size: 18px">提示</h5>\r\n        <a class="close" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n      </div>\r\n      <form class="form form-horizontal" id="creditOptionForm">\r\n        <input type="hidden" name="encryptKey" id="encryptKey" value="';
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
        buffer += escapeExpression(stack1) + '">\r\n        <input type="hidden" name="status" id="status" value="';
        if (helper = helpers.status) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.status;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n        <div class="modal-body">\r\n            客户：';
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
        buffer += escapeExpression(stack1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认";
        if (helper = helpers.optionText) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.optionText;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '？\r\n        </div>\r\n        <div class="modal-footer">\r\n          <input class="btn btn-primary" type="submit" value="确认">\r\n          <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpConsumeLoan-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nI1：金融机构M1逾期<br>\r\nI2：金融机构M2逾期<br>\r\nI3：金融机构M3逾期<br>\r\nI4：金融机构M3+逾期<br>\r\nP1：信贷逾期<br>\r\nP2：助学贷款逾期<br>\r\nP3：其他逾期<br>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpRent-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\nO1：信保逾期<br>\r\nO2：金融机构M1逾期<br>\r\nO3：金融机构M2逾期<br>\r\nO4：金融机构M3逾期<br>\r\nO5：金融机构M3+逾期<br>\r\nO6：互联网信贷逾期<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpPersonnel -debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\nH1：失信人执行人<br>\r\nH2：多平台借款<br>\r\nH3：金融机构M1逾期<br>\r\nH4：金融机构M2逾期<br>\r\nH5：金融机构M3逾期<br>\r\nH6：金融机构M3+逾期<br>\r\nH7：互联网信贷逾期<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/leftBasicInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconComplete">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconFail">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program5(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <div class="line1 iconNotV">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + '</div>\r\n        <div class="f14">（温馨提示：由于手机号码未校验，导致该报告不完整。）</div>\r\n    ';
            return buffer
        }

        function program7(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <div class="line1 iconVMobileError">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + '</div>\r\n        <div class="f14">（温馨提示：由于手机号码匹配不成功，导致该报告不完整。）</div>\r\n    ';
            return buffer
        }

        function program9(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconVMobileSuccess">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + "</div>";
            return buffer
        }
        buffer += '<div class="box1LeftLines box1Title">比对结果</div>\r\n<div class="box1LeftLines2">\r\n    \r\n    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 1, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 1, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n\r\n</div>\r\n<div class="box1LeftLines box1Title">基本信息</div>\r\n<div class="box1LeftLines2">\r\n    <div class="line1">姓<span class="ls">&nbsp</span>名：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.borrowerName, options) : helperMissing.call(depth0, "h", depth0 && depth0.borrowerName, options))) + '</div>\r\n    <div class="line1">姓<span class="ls">&nbsp</span>别：' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</div>\r\n    <div class="line1">年<span class="ls">&nbsp</span>龄：' + escapeExpression((helper = helpers.countAge || depth0 && depth0.countAge, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "countAge", depth0 && depth0.birthdate, options))) + '</div>\r\n    <div class="line1">出<span class="ls">&nbsp</span>生：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "h", depth0 && depth0.birthdate, options))) + '</div>\r\n    \r\n    <div class="line1">手机号：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobile, options) : helperMissing.call(depth0, "h", depth0 && depth0.mobile, options))) + '</div>\r\n    \r\n</div>\r\n<div class="box1LeftLines2">\r\n    <div class="line1">证件类型：身份证</div>\r\n    <div class="line1">身份证号：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.cardNum, options) : helperMissing.call(depth0, "h", depth0 && depth0.cardNum, options))) + '</div>\r\n    \r\n    <div class="line1">有效期限：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.validDate, options) : helperMissing.call(depth0, "h", depth0 && depth0.validDate, options))) + '</div>\r\n</div>\r\n<div class="box1LeftLinesLast">\r\n    <div class="line1">查询网点：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.companyName, options) : helperMissing.call(depth0, "h", depth0 && depth0.companyName, options))) + '</div>\r\n    <div class="line1">查询时间：' + escapeExpression((helper = helpers.formatDate || depth0 && depth0.formatDate, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.created, options) : helperMissing.call(depth0, "formatDate", depth0 && depth0.created, options))) + "</div>\r\n</div>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/identityInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, functionType = "function",
            escapeExpression = this.escapeExpression,
            helperMissing = helpers.helperMissing,
            self = this;

        function program1(depth0, data) {
            return '\r\n        <div class="currentPic pull-left ml29">\r\n            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n        </div>\r\n        <div class="identityFrontthir-bottom" style="color:white;">本人照片</div>\r\n        '
        }

        function program3(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <div class="currentPicNoborder pull-left ml29">\r\n            <img src="';
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
            buffer += escapeExpression(stack1) + '" width="175">\r\n        </div>\r\n        ';
            return buffer
        }

        function program5(depth0, data) {
            return '\r\n            <div class="currentPic pull-left ml29"  style="margin:16px 0 0 45px;">\r\n                <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:75px;top:200px;color:white;">身份证正面照(拍摄)</div>\r\n            '
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <div class="pic-bg id-pic">\r\n                <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:90px;top:200px;color:white;">身份证正面照(拍摄)</div>\r\n            ';
            return buffer
        }

        function program9(depth0, data) {
            return '\r\n            <div class="currentPic pull-left ml29" style="margin-left:0px;">\r\n                <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:22px;top:184px;color:white;">身份证反面照(拍摄)</div>\r\n            '
        }

        function program11(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <div class=" id-pics" style="margin:0 0 0 -88px">\r\n                <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:-5px;top:184px;color:white;">身份证反面照(拍摄)</div>\r\n            ';
            return buffer
        }

        function program13(depth0, data) {
            return '\r\n        <div class="currentPic pull-left ml29" style="margin:16px 0 0 -78px;">\r\n            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n        </div>\r\n         <div class="identityFrontthir-bottom" style="left:-20px;top:200px;color:white;">本人照片</div>\r\n        '
        }

        function program15(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <div class=" phonos">\r\n            <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n        </div>\r\n         <div class="identityFrontthir-bottom" style="left:15px;top:200px;color:white;">本人照片</div>\r\n        ';
            return buffer
        }

        function program17(depth0, data) {
            return '\r\n        <div class="currentPic pull-left ml29" style="margin:16px 0 0 8px;">\r\n            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n        </div>\r\n          <div class="identityFrontthir-bottom"style="left:60px;top:200px;color:white;">公安证件照</div>\r\n        '
        }

        function program19(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <div class=" phono">\r\n            <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n        </div>\r\n          <div class="identityFrontthir-bottom"style="left:90px;top:200px;color:white;">公安证件照</div>\r\n        ';
            return buffer
        }
        buffer += '<div class="title">照片识别</div>\r\n<div class="pull-left identitiesBox active" id="thretop" >\r\n    <div class="identity identityFront pull-left">\r\n        <div class="pull-left w170 clearfix">\r\n            <div class="lineBox">\r\n                <span class="lightblue">姓名</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.borrowerName, options) : helperMissing.call(depth0, "h", depth0 && depth0.borrowerName, options))) + '</span>\r\n            </div>\r\n            <div class="lineBox">\r\n                <!--<span class="lightblue">性别</span><span class="addText">' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</span><span class="ml-15 lightblue">民族</span><span class="addText">';
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
        buffer += escapeExpression(stack1) + '</span>-->\r\n                <span class="lightblue">性别</span><span class="addText">' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</span><span class="ml-15 lightblue">民族</span>\r\n                <span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.nation, options) : helperMissing.call(depth0, "h", depth0 && depth0.nation, options))) + '</span>\r\n            </div>\r\n            <div class="lineBox">\r\n                <span class="lightblue">出生</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "h", depth0 && depth0.birthdate, options))) + '</span>\r\n            </div>\r\n            <div class="lineBox" style="height:14px;line-height:14px !important;">\r\n                <span class="lightblue">住址</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "h", depth0 && depth0.address, options))) + '</span>\r\n            </div>\r\n        </div>\r\n        <div class="pull-right w80 mr-10">\r\n            <img src="';
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
        buffer += escapeExpression(stack1) + '" class="frontPic">\r\n        </div>\r\n        <div class="lineBox clearfix" style="position: absolute;bottom: 20px;">\r\n            <span class="lightblue">公民身份证号码</span><span class="addText" id="cardNum">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.cardNum, options) : helperMissing.call(depth0, "h", depth0 && depth0.cardNum, options))) + '</span>\r\n        </div>\r\n\r\n    </div>\r\n    <div class="identity identityBack pull-left ml29">\r\n        <div class="lineBox pdl20 mt100">\r\n            <span class="">签发机关</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.issuer, options) : helperMissing.call(depth0, "h", depth0 && depth0.issuer, options))) + '</span>\r\n        </div>\r\n        <div class="lineBox pdl20">\r\n            <span class="">有效期限</span><span class="addText">' + escapeExpression((helper = helpers.transform || depth0 && depth0.transform, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.validDate, options) : helperMissing.call(depth0, "transform", depth0 && depth0.validDate, options))) + '</span>\r\n        </div>\r\n    </div>\r\n    <div class="identityFrontthir pull-left ml29">\r\n        ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n        \r\n    </div>\r\n    \r\n\r\n</div>\r\n<div class="pull-left identitiesBox active" id="forbot">\r\n    <div >\r\n        <div class="identityFrontthir pull-left ml29" style="width:300px;height:180px;">\r\n            ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n           \r\n        </div>\r\n        <div class="identityFrontthir pull-left ml29" style="margin:16px 0 0 126px;width:300px;height:180px;">\r\n            ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.backImage, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.backImage, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(11, program11, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.backImage, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.backImage, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n           \r\n        </div>\r\n    </div>\r\n <div class="identityFrontthir pull-left ml29">\r\n        ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(13, program13, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(15, program15, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n       \r\n    </div>\r\n    <div class="identityFrontthir pull-left ml29">\r\n        ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.imgUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.imgUrl, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(19, program19, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.imgUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.imgUrl, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n      \r\n    </div>\r\n   \r\n\r\n</div>\r\n<div style="position:relative">\r\n    <img src="';
        if (helper = helpers.authorizUrl) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.authorizUrl;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" alt="" style="height:180px;width:300px;margin:40px 0 0 30px;">\r\n    <div style="position:absolute;color:white;bottom:-25px;left:140px;">授权书</div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/rightBox-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n\r\n    <div class="iconFail">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n    <div class="iconComplete">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program5(depth0, data) {
            return 'onclick="return false" '
        }

        function program7(depth0, data) {
            return "金融信贷"
        }

        function program9(depth0, data) {
            return "点击查看"
        }

        function program11(depth0, data) {
            return "身份核验"
        }

        function program13(depth0, data) {
            return "公安不良"
        }

        function program15(depth0, data) {
            return "人法涉诉"
        }

        function program17(depth0, data) {
            return "其他综合"
        }

        function program19(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n    <a class="btn btn-primary h42" id="checkFullReportBtn" href="/cycle/credit/report.htm?encryptKey=';
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
            buffer += escapeExpression(stack1) + "&&type=fullReport&&mobileStatus=";
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
            buffer += escapeExpression(stack1) + '"\r\n        target="_blank">查看完整报告</a> ';
            return buffer
        }

        function program21(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n    <a class="btn btn-primary h42 displayNone" id="checkFullReportBtn" href="/cycle/credit/report.htm?encryptKey=';
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
            buffer += escapeExpression(stack1) + "&&type=fullReport&&mobileStatus=";
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
            buffer += escapeExpression(stack1) + '"\r\n        target="_blank">查看完整报告</a> ';
            return buffer
        }
        buffer += '<div class="spirit">\r\n    <img class="spirit-img" src="http://static.hpbanking.com/xg/uploads/files/88f116378888db7e8250471db55a460c-235-508.png" alt="">    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    <a class="circle plScan" id="plScan" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=plScan&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">金融信贷</div>\r\n        <div class="outerCircle" id="outerCPlScan">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="caseRecord"><span class="name"></span><span class="color"></span></div>\r\n            <div id="phoneRecord"><span class="name"></span><span class="color"></span></div>\r\n            <div id="zhimaRecord"><span class="name"></span><span class="color"></span></div>\r\n        </div>\r\n    </a>\r\n    <a class="circle clBehavior" id="clBehavior" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=clBehavior&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">身份核验</div>\r\n        <div class="outerCircle" id="outerCClBehavior">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(11, program11, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="trdFinancialOver"><span class="name"></span><span class="color"></span></div>\r\n            <div id="borrowOver"><span class="name"></span><span class="color"></span></div>\r\n            \r\n        </div>\r\n    </a>\r\n    <a class="circle badBehavior" id="badBehavior" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=badBehavior&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">公安不良</div>\r\n        <div class="outerCircle" id="outerCBadBehavior">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(13, program13, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="penalRecord"><span class="name"></span><span class="color"></span></div>\r\n            \r\n        </div>\r\n    </a>\r\n    <a class="circle consumeBehavior" id="consumeBehavior" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=consumeBehavior&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">人法涉诉</div>\r\n        <div class="outerCircle" id="outerCConsumeBehavior">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(15, program15, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="ExceptionTrade"><span class="name"></span><span class="color"></span></div>\r\n            <div id="cashOut"><span class="name"></span><span class="color"></span></div>\r\n            <div id="badCost"><span class="name"></span><span class="color"></span></div>\r\n            <div id="caipan"><span class="name"></span><span class="color"></span></div>\r\n            <div id="baoguangtai"><span class="name"></span><span class="color"></span></div>\r\n            <div id="taiting"><span class="name"></span><span class="color"></span></div>\r\n            <div id="anjian"><span class="name"></span><span class="color"></span></div>\r\n            <div id="heimingdan"><span class="name"></span><span class="color"></span></div>\r\n        </div>\r\n\r\n    </a>\r\n    <a class="circle communicationTrack" id="communicationTrack" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=communicationTrack&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">其他综合</div>\r\n        <div class="outerCircle" id="outerCCommunicationTrack">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="firstStatus"><span class="name"></span><span class="color"></span></div>\r\n            <div id="onlineTimeMap"><span class="name"></span><span class="color"></span></div>\r\n             <div id="specialRelation"><span class="name"></span><span class="color"></span></div> \r\n        </div>\r\n    </a>\r\n\r\n</div>\r\n<div class="flag">\r\n    <div class="lineMg"><span class="sCircle sRed">：表示触碰关键性风险数据，属于预警类别</span></div>\r\n    <div class="lineMg"><span class="sCircle sYellow"></span>：表示触碰非关键性风险数据，属于提示类别</div>\r\n    <div class="lineMg"><span class="sCircle sGreen"></span>：表示未触碰风险数据或未发生</div>\r\n    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(19, program19, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(21, program21, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n\r\n</div>\r\n\r\n\r\n\r\n<!--\r\n<div class="popover">\r\n    <div class="con" id = "bx">\r\n        <div id="cn">\r\n            1）汽车金融<br>\r\n            <div class="title">一、编号说明</div>\r\n            I1：金融机构M1逾期<br>\r\n            I2：金融机构M2逾期<br>\r\n            I3：金融机构M3逾期<br>\r\n            I4：金融机构M3+逾期<br>\r\n            P1：信贷逾期<br>\r\n            P2：助学贷款逾期<br>\r\n            P3：其他逾期<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            --：暂未发现风险<br>\r\n            2）消费信贷<br>\r\n            一、编号说明<br>\r\n            I1：金融机构M1逾期<br>\r\n            I2：金融机构M2逾期<br>\r\n            I3：金融机构M3逾期<br>\r\n            I4：金融机构M3+逾期<br>\r\n            P1：信贷逾期<br>\r\n            P2：助学贷款逾期<br>\r\n            P3：其他逾期<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            --：暂未发现风险<br>\r\n            3）租赁行业<br>\r\n            一、编号说明<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            O1：信保逾期<br>\r\n            O2：金融机构M1逾期<br>\r\n            O3：金融机构M2逾期<br>\r\n            O4：金融机构M3逾期<br>\r\n            O5：金融机构M3+逾期<br>\r\n            O6：互联网信贷逾期<br>\r\n            --：暂未发现风险<br>\r\n            4）人事行业<br>\r\n            一、编号说明<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            H1：失信人执行人<br>\r\n            H2：多平台借款<br>\r\n            H3：金融机构M1逾期<br>\r\n            H4：金融机构M2逾期<br>\r\n            H5：金融机构M3逾期<br>\r\n            H6：金融机构M3+逾期<br>\r\n            H7：互联网信贷逾期<br>\r\n            --：暂未发现风险<br>\r\n        </div>\r\n    </div>\r\n    <div class="boxscr" id = "bs">\r\n        <div class="scr" id = "sc"></div>\r\n    </div>\r\n</div>-->';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpCarFinancial-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nI1：金融机构M1逾期<br>\r\nI2：金融机构M2逾期<br>\r\nI3：金融机构M3逾期<br>\r\nI4：金融机构M3+逾期<br>\r\nP1：信贷逾期<br>\r\nP2：助学贷款逾期<br>\r\nP3：其他逾期<br>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/bottomBtn-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            return "disabled"
        }
        buffer += '<a class="btn btn-primary h42 pull-left" id="back">返回首页</a>\r\n<!--<button class="btn btn-primary h42 radius blacklist pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>加入黑名单</button>-->\r\n<button class="btn btn-primary h42 radius noThrougth pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核不通过</button>\r\n<button class="btn btn-primary h42 radius pass pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核通过</button>\r\n<a class="btn btn-primary h42 radius download pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" href="javascript:void(0)" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ">下载报告</a>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/threeMonthRecord-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1;
            buffer += "\r\n    ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr  class="text-c">\r\n            <td class="">' + escapeExpression((helper = helpers.formatDateFull || depth0 && depth0.formatDateFull, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.time, options) : helperMissing.call(depth0, "formatDateFull", depth0 && depth0.time, options))) + "</td><td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.address, options))) + "</td>\r\n        </tr>\r\n    ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n    <tr>\r\n        <td class="text-c" colspan="3">--</td>\r\n    </tr>\r\n'
        }
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/creditReport-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, functionType = "function",
            escapeExpression = this.escapeExpression,
            helperMissing = helpers.helperMissing,
            self = this;

        function program1(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program3(depth0, data) {
            return "--"
        }

        function program5(depth0, data) {
            var helper, options;
            return escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options)))
        }

        function program7(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program9(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program11(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program13(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program15(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program17(depth0, data) {
            return "人脸比对成功"
        }

        function program19(depth0, data) {
            return "人脸比对失败"
        }

        function program21(depth0, data) {
            return '\r\n        <tbody class="text-c courtDataSecond">\r\n\r\n        </tbody>\r\n    '
        }

        function program23(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program25(depth0, data) {
            return '\r\n        <tbody class="text-c pawnshopFirst">\r\n\r\n        </tbody>\r\n    '
        }

        function program27(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program29(depth0, data) {
            return '\r\n        <tbody class="text-c pawnshopSecond">\r\n\r\n        </tbody>\r\n    '
        }

        function program31(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program33(depth0, data) {
            var stack1, helper;
            if (helper = helpers.message) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.message;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program35(depth0, data) {
            var stack1, helper;
            if (helper = helpers.caseTime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.caseTime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program37(depth0, data) {
            return "disabled"
        }
        buffer += '<div class="cl number_time">\r\n<!-- <div class="col-sm-6">报告编号：201611190000001</div> -->\r\n<div class="col-sm-12 text-r">查询时间：' + escapeExpression((helper = helpers.formatDate || depth0 && depth0.formatDate, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.created, options) : helperMissing.call(depth0, "formatDate", depth0 && depth0.created, options))) + '</div>\r\n</div>\r\n<h4 class="text-c">查询信息</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>被查询者姓名</th>\r\n        <th>被查询者证件类型</th>\r\n        <th>被查询者证件号码</th>\r\n        <th>查询门店</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n      <tr>\r\n        <td>';
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
        buffer += escapeExpression(stack1) + "</td>\r\n        <td>身份证</td>\r\n        <td>";
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
        buffer += escapeExpression(stack1) + "</td>\r\n        <td>";
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
        buffer += escapeExpression(stack1) + '</td>\r\n      </tr>\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">人证核实</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>身份证正面</th>\r\n        <th>身份证反面</th>\r\n        <th>本人照片</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n        <tr>\r\n            <td>\r\n                <div class="identity identityFront">\r\n                    <div class="cl mt20">\r\n                        <div class="pull-left w170 ml-5">\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">姓名</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.borrowerName, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">性别</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.sex, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(5, program5, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span><span class="ml-15 lightblue">民族</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.nation, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(7, program7, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">出生</span><span class="addText birthdate_year"></span><span class="lightblue"> 年 </span><span class="addText birthdate_mouth"></span><span class="lightblue"> 月 </span><span class="addText birthdate_day"></span><span class="lightblue"> 日 </span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">住址</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.address, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(9, program9, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class="pull-right w80 mr-5 mt5">\r\n                           <img src="';
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
        buffer += escapeExpression(stack1) + '" class="frontPic" alt="暂无此照片">\r\n                        </div>\r\n                    </div>\r\n                    <div class="lineBox pdt18 cl ml-5">\r\n                        <span class="lightblue">公民身份证号码</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.cardNum, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(11, program11, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <div class="identity identityBack">\r\n                    <div class="lineBox mt125 ml-50">\r\n                        <span class="fw_bold">签发机关</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.issuer, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(13, program13, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                    <div class="lineBox ml-50">\r\n                        <span class="fw_bold">有效期限</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.validDate, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(15, program15, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <img class="card_img" src="';
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
        buffer += escapeExpression(stack1) + '">\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n          <td class="td_bg">核实结果</td>\r\n          <td colspan=2>';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.program(19, program19, data),
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.compareResult, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.compareResult, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">法院数据</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>法院失信名单</th>\r\n        <th>法院执行名单</th>\r\n        <th>法院结案</th>\r\n        <th>法人失信</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c courtDataFirst">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>案号</th>\r\n        <th>执行法院</th>\r\n        <th>案件状态</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.courtList, {
            hash: {},
            inverse: self.program(23, program23, data),
            fn: self.program(21, program21, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<h4 class="text-c">信贷行业</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>信用/消费贷黑名单</th>\r\n        <th>信贷逾期</th>\r\n        <th>信用卡逾期</th>\r\n        <th>P2P黑名单</th>\r\n        <th>助学贷款逾期</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditFirst">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>套现交易</th>\r\n        <th>信贷失联</th>\r\n        <th>信贷欺诈</th>\r\n        <th>风控规则</th>\r\n        <th>黑中介</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditSecond">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>骗取补贴</th>\r\n        <th>冒用风险</th>\r\n        <th>信贷分值低</th>\r\n        <th>曾经逾期（0-30天）</th>\r\n        <th>信贷黑名单</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditThree">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>商户欺诈名单</th>\r\n        <th>曾经逾期（未知期限）</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditFour">\r\n\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">三方支付</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>盗卡</th>\r\n        <th>其他欺诈</th>\r\n        <th>盗用操作</th>\r\n        <th>盗用支出</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c threePayment">\r\n\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">典当行</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>典当物品</th>\r\n        <th>典当金额</th>\r\n        <th>典当地点</th>\r\n        <th>典当时间</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.pawnList, {
            hash: {},
            inverse: self.program(27, program27, data),
            fn: self.program(25, program25, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>违约行为</th>\r\n        <th>描述</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.pawnList, {
            hash: {},
            inverse: self.program(31, program31, data),
            fn: self.program(29, program29, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<h4 class="text-c">负面信息</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>不良记录</th>\r\n        <th>案件时间</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n      <tr>\r\n        <td>';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.message, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(33, program33, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "</td>\r\n        <td>";
        stack1 = helpers["if"].call(depth0, depth0 && depth0.caseTime, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(35, program35, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</td>\r\n      </tr>\r\n    </tbody>\r\n</table>\r\n<h6>1.本信息的著作权属于杭州信鸽金融信息服务股份有限公司，未经书面许可，不得擅自复制、摘录、编辑、转载、披露和发表。</h6>\r\n<h6>2.使用本信息需经过被查询人授权，信鸽金服不承担因授权不充分而引起的任何法律责任。</h6>\r\n<h6>3.本信息中除信鸽EID身份标识查询特殊标注外，信息均由相关数据来源机构和信息主体来源机构，承诺在信息整合、汇总、展示的全过程当中保持客观、中立的地位。</h6>\r\n<div class="cl top_border">\r\n    <div class="bottom_btn">\r\n      <a class="btn btn-primary radius download" href="javascript:void(0)">下载报告</a>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius pass" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核通过</button>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius noThrougth" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核不通过</button>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius blacklist" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ">加入黑名单</button>\r\n    </div>\r\n</div>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/creditOptionH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += ' <div id="modal-creditOption" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\r\n  <div class="modal-dialog">\r\n    <div class="modal-content radius">\r\n      <div class="modal-header">\r\n        <h5 class="modal-title" style="font-size: 18px">提示</h5>\r\n        <a class="close" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n      </div>\r\n      <form class="form form-horizontal" id="creditOptionForm">\r\n        <input type="hidden" name="encryptKey" id="encryptKey" value="';
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
        buffer += escapeExpression(stack1) + '">\r\n        <input type="hidden" name="status" id="status" value="';
        if (helper = helpers.status) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.status;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n        <div class="modal-body">\r\n            客户：';
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
        buffer += escapeExpression(stack1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认";
        if (helper = helpers.optionText) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.optionText;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '？\r\n        </div>\r\n        <div class="modal-footer">\r\n          <input class="btn btn-primary" type="submit" value="确认">\r\n          <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpConsumeLoan-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nI1：金融机构M1逾期<br>\r\nI2：金融机构M2逾期<br>\r\nI3：金融机构M3逾期<br>\r\nI4：金融机构M3+逾期<br>\r\nP1：信贷逾期<br>\r\nP2：助学贷款逾期<br>\r\nP3：其他逾期<br>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpRent-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\nO1：信保逾期<br>\r\nO2：金融机构M1逾期<br>\r\nO3：金融机构M2逾期<br>\r\nO4：金融机构M3逾期<br>\r\nO5：金融机构M3+逾期<br>\r\nO6：互联网信贷逾期<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpPersonnel -debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\nH1：失信人执行人<br>\r\nH2：多平台借款<br>\r\nH3：金融机构M1逾期<br>\r\nH4：金融机构M2逾期<br>\r\nH5：金融机构M3逾期<br>\r\nH6：金融机构M3+逾期<br>\r\nH7：互联网信贷逾期<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/leftBasicInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconComplete">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconFail">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program5(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <div class="line1 iconNotV">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + '</div>\r\n        <div class="f14">（温馨提示：由于手机号码未校验，导致该报告不完整。）</div>\r\n    ';
            return buffer
        }

        function program7(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <div class="line1 iconVMobileError">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + '</div>\r\n        <div class="f14">（温馨提示：由于手机号码匹配不成功，导致该报告不完整。）</div>\r\n    ';
            return buffer
        }

        function program9(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconVMobileSuccess">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + "</div>";
            return buffer
        }
        buffer += '<div class="box1LeftLines box1Title">比对结果</div>\r\n<div class="box1LeftLines2">\r\n    \r\n    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 1, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 1, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n\r\n</div>\r\n<div class="box1LeftLines box1Title">基本信息</div>\r\n<div class="box1LeftLines2">\r\n    <div class="line1">姓<span class="ls">&nbsp</span>名：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.borrowerName, options) : helperMissing.call(depth0, "h", depth0 && depth0.borrowerName, options))) + '</div>\r\n    <div class="line1">姓<span class="ls">&nbsp</span>别：' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</div>\r\n    <div class="line1">年<span class="ls">&nbsp</span>龄：' + escapeExpression((helper = helpers.countAge || depth0 && depth0.countAge, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "countAge", depth0 && depth0.birthdate, options))) + '</div>\r\n    <div class="line1">出<span class="ls">&nbsp</span>生：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "h", depth0 && depth0.birthdate, options))) + '</div>\r\n    \r\n    <div class="line1">手机号：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobile, options) : helperMissing.call(depth0, "h", depth0 && depth0.mobile, options))) + '</div>\r\n    \r\n</div>\r\n<div class="box1LeftLines2">\r\n    <div class="line1">证件类型：身份证</div>\r\n    <div class="line1">身份证号：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.cardNum, options) : helperMissing.call(depth0, "h", depth0 && depth0.cardNum, options))) + '</div>\r\n    \r\n    <div class="line1">有效期限：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.validDate, options) : helperMissing.call(depth0, "h", depth0 && depth0.validDate, options))) + '</div>\r\n</div>\r\n<div class="box1LeftLinesLast">\r\n    <div class="line1">查询网点：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.companyName, options) : helperMissing.call(depth0, "h", depth0 && depth0.companyName, options))) + '</div>\r\n    <div class="line1">查询时间：' + escapeExpression((helper = helpers.formatDate || depth0 && depth0.formatDate, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.created, options) : helperMissing.call(depth0, "formatDate", depth0 && depth0.created, options))) + "</div>\r\n</div>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/identityInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, functionType = "function",
            escapeExpression = this.escapeExpression,
            helperMissing = helpers.helperMissing,
            self = this;

        function program1(depth0, data) {
            return '\r\n        <div class="currentPic pull-left ml29">\r\n            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n        </div>\r\n        <div class="identityFrontthir-bottom" style="color:white;">本人照片</div>\r\n        '
        }

        function program3(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <div class="currentPicNoborder pull-left ml29">\r\n            <img src="';
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
            buffer += escapeExpression(stack1) + '" width="175">\r\n        </div>\r\n        ';
            return buffer
        }

        function program5(depth0, data) {
            return '\r\n            <div class="currentPic pull-left ml29"  style="margin:16px 0 0 45px;">\r\n                <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:75px;top:200px;color:white;">身份证正面照(拍摄)</div>\r\n            '
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <div class="pic-bg id-pic">\r\n                <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:90px;top:200px;color:white;">身份证正面照(拍摄)</div>\r\n            ';
            return buffer
        }

        function program9(depth0, data) {
            return '\r\n            <div class="currentPic pull-left ml29" style="margin-left:0px;">\r\n                <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:22px;top:184px;color:white;">身份证反面照(拍摄)</div>\r\n            '
        }

        function program11(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <div class=" id-pics" style="margin:0 0 0 -88px">\r\n                <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:-5px;top:184px;color:white;">身份证反面照(拍摄)</div>\r\n            ';
            return buffer
        }

        function program13(depth0, data) {
            return '\r\n        <div class="currentPic pull-left ml29" style="margin:16px 0 0 -78px;">\r\n            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n        </div>\r\n         <div class="identityFrontthir-bottom" style="left:-20px;top:200px;color:white;">本人照片</div>\r\n        '
        }

        function program15(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <div class=" phonos">\r\n            <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n        </div>\r\n         <div class="identityFrontthir-bottom" style="left:15px;top:200px;color:white;">本人照片</div>\r\n        ';
            return buffer
        }

        function program17(depth0, data) {
            return '\r\n        <div class="currentPic pull-left ml29" style="margin:16px 0 0 8px;">\r\n            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n        </div>\r\n          <div class="identityFrontthir-bottom"style="left:60px;top:200px;color:white;">公安证件照</div>\r\n        '
        }

        function program19(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <div class=" phono">\r\n            <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n        </div>\r\n          <div class="identityFrontthir-bottom"style="left:90px;top:200px;color:white;">公安证件照</div>\r\n        ';
            return buffer
        }
        buffer += '<div class="title">照片识别</div>\r\n<div class="pull-left identitiesBox active" id="thretop" >\r\n    <div class="identity identityFront pull-left">\r\n        <div class="pull-left w170 clearfix">\r\n            <div class="lineBox">\r\n                <span class="lightblue">姓名</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.borrowerName, options) : helperMissing.call(depth0, "h", depth0 && depth0.borrowerName, options))) + '</span>\r\n            </div>\r\n            <div class="lineBox">\r\n                <!--<span class="lightblue">性别</span><span class="addText">' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</span><span class="ml-15 lightblue">民族</span><span class="addText">';
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
        buffer += escapeExpression(stack1) + '</span>-->\r\n                <span class="lightblue">性别</span><span class="addText">' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</span><span class="ml-15 lightblue">民族</span>\r\n                <span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.nation, options) : helperMissing.call(depth0, "h", depth0 && depth0.nation, options))) + '</span>\r\n            </div>\r\n            <div class="lineBox">\r\n                <span class="lightblue">出生</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "h", depth0 && depth0.birthdate, options))) + '</span>\r\n            </div>\r\n            <div class="lineBox" style="height:14px;line-height:14px !important;">\r\n                <span class="lightblue">住址</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "h", depth0 && depth0.address, options))) + '</span>\r\n            </div>\r\n        </div>\r\n        <div class="pull-right w80 mr-10">\r\n            <img src="';
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
        buffer += escapeExpression(stack1) + '" class="frontPic">\r\n        </div>\r\n        <div class="lineBox clearfix" style="position: absolute;bottom: 20px;">\r\n            <span class="lightblue">公民身份证号码</span><span class="addText" id="cardNum">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.cardNum, options) : helperMissing.call(depth0, "h", depth0 && depth0.cardNum, options))) + '</span>\r\n        </div>\r\n\r\n    </div>\r\n    <div class="identity identityBack pull-left ml29">\r\n        <div class="lineBox pdl20 mt100">\r\n            <span class="">签发机关</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.issuer, options) : helperMissing.call(depth0, "h", depth0 && depth0.issuer, options))) + '</span>\r\n        </div>\r\n        <div class="lineBox pdl20">\r\n            <span class="">有效期限</span><span class="addText">' + escapeExpression((helper = helpers.transform || depth0 && depth0.transform, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.validDate, options) : helperMissing.call(depth0, "transform", depth0 && depth0.validDate, options))) + '</span>\r\n        </div>\r\n    </div>\r\n    <div class="identityFrontthir pull-left ml29">\r\n        ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n        \r\n    </div>\r\n    \r\n\r\n</div>\r\n<div class="pull-left identitiesBox active" id="forbot">\r\n    <div >\r\n        <div class="identityFrontthir pull-left ml29" style="width:300px;height:180px;">\r\n            ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n           \r\n        </div>\r\n        <div class="identityFrontthir pull-left ml29" style="margin:16px 0 0 126px;width:300px;height:180px;">\r\n            ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.backImage, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.backImage, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(11, program11, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.backImage, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.backImage, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n           \r\n        </div>\r\n    </div>\r\n <div class="identityFrontthir pull-left ml29">\r\n        ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(13, program13, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(15, program15, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n       \r\n    </div>\r\n    <div class="identityFrontthir pull-left ml29">\r\n        ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.imgUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.imgUrl, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(19, program19, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.imgUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.imgUrl, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n      \r\n    </div>\r\n   \r\n\r\n</div>\r\n<div style="position:relative">\r\n    <img src="';
        if (helper = helpers.authorizUrl) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.authorizUrl;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" alt="" style="height:180px;width:300px;margin:40px 0 0 30px;">\r\n    <div style="position:absolute;color:white;bottom:-25px;left:140px;">授权书</div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/rightBox-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n\r\n    <div class="iconFail">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n    <div class="iconComplete">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program5(depth0, data) {
            return 'onclick="return false" '
        }

        function program7(depth0, data) {
            return "金融信贷"
        }

        function program9(depth0, data) {
            return "点击查看"
        }

        function program11(depth0, data) {
            return "身份核验"
        }

        function program13(depth0, data) {
            return "公安不良"
        }

        function program15(depth0, data) {
            return "人法涉诉"
        }

        function program17(depth0, data) {
            return "其他综合"
        }

        function program19(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n    <a class="btn btn-primary h42" id="checkFullReportBtn" href="/cycle/credit/report.htm?encryptKey=';
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
            buffer += escapeExpression(stack1) + "&&type=fullReport&&mobileStatus=";
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
            buffer += escapeExpression(stack1) + '"\r\n        target="_blank">查看完整报告</a> ';
            return buffer
        }

        function program21(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n    <a class="btn btn-primary h42 displayNone" id="checkFullReportBtn" href="/cycle/credit/report.htm?encryptKey=';
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
            buffer += escapeExpression(stack1) + "&&type=fullReport&&mobileStatus=";
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
            buffer += escapeExpression(stack1) + '"\r\n        target="_blank">查看完整报告</a> ';
            return buffer
        }
        buffer += '<div class="spirit">\r\n    <img class="spirit-img" src="http://static.hpbanking.com/xg/uploads/files/88f116378888db7e8250471db55a460c-235-508.png" alt="">    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    <a class="circle plScan" id="plScan" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=plScan&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">金融信贷</div>\r\n        <div class="outerCircle" id="outerCPlScan">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="caseRecord"><span class="name"></span><span class="color"></span></div>\r\n            <div id="phoneRecord"><span class="name"></span><span class="color"></span></div>\r\n            <div id="zhimaRecord"><span class="name"></span><span class="color"></span></div>\r\n        </div>\r\n    </a>\r\n    <a class="circle clBehavior" id="clBehavior" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=clBehavior&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">身份核验</div>\r\n        <div class="outerCircle" id="outerCClBehavior">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(11, program11, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="trdFinancialOver"><span class="name"></span><span class="color"></span></div>\r\n            <div id="borrowOver"><span class="name"></span><span class="color"></span></div>\r\n            \r\n        </div>\r\n    </a>\r\n    <a class="circle badBehavior" id="badBehavior" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=badBehavior&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">公安不良</div>\r\n        <div class="outerCircle" id="outerCBadBehavior">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(13, program13, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="penalRecord"><span class="name"></span><span class="color"></span></div>\r\n            \r\n        </div>\r\n    </a>\r\n    <a class="circle consumeBehavior" id="consumeBehavior" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=consumeBehavior&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">人法涉诉</div>\r\n        <div class="outerCircle" id="outerCConsumeBehavior">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(15, program15, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="ExceptionTrade"><span class="name"></span><span class="color"></span></div>\r\n            <div id="cashOut"><span class="name"></span><span class="color"></span></div>\r\n            <div id="badCost"><span class="name"></span><span class="color"></span></div>\r\n            <div id="caipan"><span class="name"></span><span class="color"></span></div>\r\n            <div id="baoguangtai"><span class="name"></span><span class="color"></span></div>\r\n            <div id="taiting"><span class="name"></span><span class="color"></span></div>\r\n            <div id="anjian"><span class="name"></span><span class="color"></span></div>\r\n            <div id="heimingdan"><span class="name"></span><span class="color"></span></div>\r\n        </div>\r\n\r\n    </a>\r\n    <a class="circle communicationTrack" id="communicationTrack" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=communicationTrack&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">其他综合</div>\r\n        <div class="outerCircle" id="outerCCommunicationTrack">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="firstStatus"><span class="name"></span><span class="color"></span></div>\r\n            <div id="onlineTimeMap"><span class="name"></span><span class="color"></span></div>\r\n             <div id="specialRelation"><span class="name"></span><span class="color"></span></div> \r\n        </div>\r\n    </a>\r\n\r\n</div>\r\n<div class="flag">\r\n    <div class="lineMg"><span class="sCircle sRed">：表示触碰关键性风险数据，属于预警类别</span></div>\r\n    <div class="lineMg"><span class="sCircle sYellow"></span>：表示触碰非关键性风险数据，属于提示类别</div>\r\n    <div class="lineMg"><span class="sCircle sGreen"></span>：表示未触碰风险数据或未发生</div>\r\n    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(19, program19, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(21, program21, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n\r\n</div>\r\n\r\n\r\n\r\n<!--\r\n<div class="popover">\r\n    <div class="con" id = "bx">\r\n        <div id="cn">\r\n            1）汽车金融<br>\r\n            <div class="title">一、编号说明</div>\r\n            I1：金融机构M1逾期<br>\r\n            I2：金融机构M2逾期<br>\r\n            I3：金融机构M3逾期<br>\r\n            I4：金融机构M3+逾期<br>\r\n            P1：信贷逾期<br>\r\n            P2：助学贷款逾期<br>\r\n            P3：其他逾期<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            --：暂未发现风险<br>\r\n            2）消费信贷<br>\r\n            一、编号说明<br>\r\n            I1：金融机构M1逾期<br>\r\n            I2：金融机构M2逾期<br>\r\n            I3：金融机构M3逾期<br>\r\n            I4：金融机构M3+逾期<br>\r\n            P1：信贷逾期<br>\r\n            P2：助学贷款逾期<br>\r\n            P3：其他逾期<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            --：暂未发现风险<br>\r\n            3）租赁行业<br>\r\n            一、编号说明<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            O1：信保逾期<br>\r\n            O2：金融机构M1逾期<br>\r\n            O3：金融机构M2逾期<br>\r\n            O4：金融机构M3逾期<br>\r\n            O5：金融机构M3+逾期<br>\r\n            O6：互联网信贷逾期<br>\r\n            --：暂未发现风险<br>\r\n            4）人事行业<br>\r\n            一、编号说明<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            H1：失信人执行人<br>\r\n            H2：多平台借款<br>\r\n            H3：金融机构M1逾期<br>\r\n            H4：金融机构M2逾期<br>\r\n            H5：金融机构M3逾期<br>\r\n            H6：金融机构M3+逾期<br>\r\n            H7：互联网信贷逾期<br>\r\n            --：暂未发现风险<br>\r\n        </div>\r\n    </div>\r\n    <div class="boxscr" id = "bs">\r\n        <div class="scr" id = "sc"></div>\r\n    </div>\r\n</div>-->';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpCarFinancial-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nI1：金融机构M1逾期<br>\r\nI2：金融机构M2逾期<br>\r\nI3：金融机构M3逾期<br>\r\nI4：金融机构M3+逾期<br>\r\nP1：信贷逾期<br>\r\nP2：助学贷款逾期<br>\r\nP3：其他逾期<br>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/bottomBtn-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            return "disabled"
        }
        buffer += '<a class="btn btn-primary h42 pull-left" id="back">返回首页</a>\r\n<!--<button class="btn btn-primary h42 radius blacklist pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>加入黑名单</button>-->\r\n<button class="btn btn-primary h42 radius noThrougth pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核不通过</button>\r\n<button class="btn btn-primary h42 radius pass pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核通过</button>\r\n<a class="btn btn-primary h42 radius download pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" href="javascript:void(0)" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ">下载报告</a>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/threeMonthRecord-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1;
            buffer += "\r\n    ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr  class="text-c">\r\n            <td class="">' + escapeExpression((helper = helpers.formatDateFull || depth0 && depth0.formatDateFull, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.time, options) : helperMissing.call(depth0, "formatDateFull", depth0 && depth0.time, options))) + "</td><td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.address, options))) + "</td>\r\n        </tr>\r\n    ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n    <tr>\r\n        <td class="text-c" colspan="3">--</td>\r\n    </tr>\r\n'
        }
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/creditReport-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, functionType = "function",
            escapeExpression = this.escapeExpression,
            helperMissing = helpers.helperMissing,
            self = this;

        function program1(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program3(depth0, data) {
            return "--"
        }

        function program5(depth0, data) {
            var helper, options;
            return escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options)))
        }

        function program7(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program9(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program11(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program13(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program15(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program17(depth0, data) {
            return "人脸比对成功"
        }

        function program19(depth0, data) {
            return "人脸比对失败"
        }

        function program21(depth0, data) {
            return '\r\n        <tbody class="text-c courtDataSecond">\r\n\r\n        </tbody>\r\n    '
        }

        function program23(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program25(depth0, data) {
            return '\r\n        <tbody class="text-c pawnshopFirst">\r\n\r\n        </tbody>\r\n    '
        }

        function program27(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program29(depth0, data) {
            return '\r\n        <tbody class="text-c pawnshopSecond">\r\n\r\n        </tbody>\r\n    '
        }

        function program31(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program33(depth0, data) {
            var stack1, helper;
            if (helper = helpers.message) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.message;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program35(depth0, data) {
            var stack1, helper;
            if (helper = helpers.caseTime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.caseTime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program37(depth0, data) {
            return "disabled"
        }
        buffer += '<div class="cl number_time">\r\n<!-- <div class="col-sm-6">报告编号：201611190000001</div> -->\r\n<div class="col-sm-12 text-r">查询时间：' + escapeExpression((helper = helpers.formatDate || depth0 && depth0.formatDate, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.created, options) : helperMissing.call(depth0, "formatDate", depth0 && depth0.created, options))) + '</div>\r\n</div>\r\n<h4 class="text-c">查询信息</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>被查询者姓名</th>\r\n        <th>被查询者证件类型</th>\r\n        <th>被查询者证件号码</th>\r\n        <th>查询门店</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n      <tr>\r\n        <td>';
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
        buffer += escapeExpression(stack1) + "</td>\r\n        <td>身份证</td>\r\n        <td>";
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
        buffer += escapeExpression(stack1) + "</td>\r\n        <td>";
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
        buffer += escapeExpression(stack1) + '</td>\r\n      </tr>\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">人证核实</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>身份证正面</th>\r\n        <th>身份证反面</th>\r\n        <th>本人照片</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n        <tr>\r\n            <td>\r\n                <div class="identity identityFront">\r\n                    <div class="cl mt20">\r\n                        <div class="pull-left w170 ml-5">\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">姓名</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.borrowerName, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">性别</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.sex, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(5, program5, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span><span class="ml-15 lightblue">民族</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.nation, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(7, program7, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">出生</span><span class="addText birthdate_year"></span><span class="lightblue"> 年 </span><span class="addText birthdate_mouth"></span><span class="lightblue"> 月 </span><span class="addText birthdate_day"></span><span class="lightblue"> 日 </span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">住址</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.address, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(9, program9, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class="pull-right w80 mr-5 mt5">\r\n                           <img src="';
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
        buffer += escapeExpression(stack1) + '" class="frontPic" alt="暂无此照片">\r\n                        </div>\r\n                    </div>\r\n                    <div class="lineBox pdt18 cl ml-5">\r\n                        <span class="lightblue">公民身份证号码</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.cardNum, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(11, program11, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <div class="identity identityBack">\r\n                    <div class="lineBox mt125 ml-50">\r\n                        <span class="fw_bold">签发机关</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.issuer, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(13, program13, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                    <div class="lineBox ml-50">\r\n                        <span class="fw_bold">有效期限</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.validDate, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(15, program15, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <img class="card_img" src="';
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
        buffer += escapeExpression(stack1) + '">\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n          <td class="td_bg">核实结果</td>\r\n          <td colspan=2>';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.program(19, program19, data),
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.compareResult, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.compareResult, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">法院数据</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>法院失信名单</th>\r\n        <th>法院执行名单</th>\r\n        <th>法院结案</th>\r\n        <th>法人失信</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c courtDataFirst">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>案号</th>\r\n        <th>执行法院</th>\r\n        <th>案件状态</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.courtList, {
            hash: {},
            inverse: self.program(23, program23, data),
            fn: self.program(21, program21, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<h4 class="text-c">信贷行业</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>信用/消费贷黑名单</th>\r\n        <th>信贷逾期</th>\r\n        <th>信用卡逾期</th>\r\n        <th>P2P黑名单</th>\r\n        <th>助学贷款逾期</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditFirst">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>套现交易</th>\r\n        <th>信贷失联</th>\r\n        <th>信贷欺诈</th>\r\n        <th>风控规则</th>\r\n        <th>黑中介</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditSecond">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>骗取补贴</th>\r\n        <th>冒用风险</th>\r\n        <th>信贷分值低</th>\r\n        <th>曾经逾期（0-30天）</th>\r\n        <th>信贷黑名单</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditThree">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>商户欺诈名单</th>\r\n        <th>曾经逾期（未知期限）</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditFour">\r\n\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">三方支付</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>盗卡</th>\r\n        <th>其他欺诈</th>\r\n        <th>盗用操作</th>\r\n        <th>盗用支出</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c threePayment">\r\n\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">典当行</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>典当物品</th>\r\n        <th>典当金额</th>\r\n        <th>典当地点</th>\r\n        <th>典当时间</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.pawnList, {
            hash: {},
            inverse: self.program(27, program27, data),
            fn: self.program(25, program25, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>违约行为</th>\r\n        <th>描述</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.pawnList, {
            hash: {},
            inverse: self.program(31, program31, data),
            fn: self.program(29, program29, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<h4 class="text-c">负面信息</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>不良记录</th>\r\n        <th>案件时间</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n      <tr>\r\n        <td>';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.message, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(33, program33, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "</td>\r\n        <td>";
        stack1 = helpers["if"].call(depth0, depth0 && depth0.caseTime, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(35, program35, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</td>\r\n      </tr>\r\n    </tbody>\r\n</table>\r\n<h6>1.本信息的著作权属于杭州信鸽金融信息服务股份有限公司，未经书面许可，不得擅自复制、摘录、编辑、转载、披露和发表。</h6>\r\n<h6>2.使用本信息需经过被查询人授权，信鸽金服不承担因授权不充分而引起的任何法律责任。</h6>\r\n<h6>3.本信息中除信鸽EID身份标识查询特殊标注外，信息均由相关数据来源机构和信息主体来源机构，承诺在信息整合、汇总、展示的全过程当中保持客观、中立的地位。</h6>\r\n<div class="cl top_border">\r\n    <div class="bottom_btn">\r\n      <a class="btn btn-primary radius download" href="javascript:void(0)">下载报告</a>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius pass" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核通过</button>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius noThrougth" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核不通过</button>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius blacklist" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ">加入黑名单</button>\r\n    </div>\r\n</div>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/creditOptionH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += ' <div id="modal-creditOption" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\r\n  <div class="modal-dialog">\r\n    <div class="modal-content radius">\r\n      <div class="modal-header">\r\n        <h5 class="modal-title" style="font-size: 18px">提示</h5>\r\n        <a class="close" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n      </div>\r\n      <form class="form form-horizontal" id="creditOptionForm">\r\n        <input type="hidden" name="encryptKey" id="encryptKey" value="';
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
        buffer += escapeExpression(stack1) + '">\r\n        <input type="hidden" name="status" id="status" value="';
        if (helper = helpers.status) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.status;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n        <div class="modal-body">\r\n            客户：';
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
        buffer += escapeExpression(stack1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认";
        if (helper = helpers.optionText) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.optionText;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '？\r\n        </div>\r\n        <div class="modal-footer">\r\n          <input class="btn btn-primary" type="submit" value="确认">\r\n          <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpConsumeLoan-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nI1：金融机构M1逾期<br>\r\nI2：金融机构M2逾期<br>\r\nI3：金融机构M3逾期<br>\r\nI4：金融机构M3+逾期<br>\r\nP1：信贷逾期<br>\r\nP2：助学贷款逾期<br>\r\nP3：其他逾期<br>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpRent-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\nO1：信保逾期<br>\r\nO2：金融机构M1逾期<br>\r\nO3：金融机构M2逾期<br>\r\nO4：金融机构M3逾期<br>\r\nO5：金融机构M3+逾期<br>\r\nO6：互联网信贷逾期<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpPersonnel -debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\nH1：失信人执行人<br>\r\nH2：多平台借款<br>\r\nH3：金融机构M1逾期<br>\r\nH4：金融机构M2逾期<br>\r\nH5：金融机构M3逾期<br>\r\nH6：金融机构M3+逾期<br>\r\nH7：互联网信贷逾期<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/leftBasicInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconComplete">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconFail">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program5(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <div class="line1 iconNotV">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + '</div>\r\n        <div class="f14">（温馨提示：由于手机号码未校验，导致该报告不完整。）</div>\r\n    ';
            return buffer
        }

        function program7(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <div class="line1 iconVMobileError">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + '</div>\r\n        <div class="f14">（温馨提示：由于手机号码匹配不成功，导致该报告不完整。）</div>\r\n    ';
            return buffer
        }

        function program9(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '<div class="line1 iconVMobileSuccess">' + escapeExpression((helper = helpers.validateStatus || depth0 && depth0.validateStatus, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, options) : helperMissing.call(depth0, "validateStatus", depth0 && depth0.mobileStatus, options))) + "</div>";
            return buffer
        }
        buffer += '<div class="box1LeftLines box1Title">比对结果</div>\r\n<div class="box1LeftLines2">\r\n    \r\n    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 1, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 1, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobileStatus, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileStatus, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n\r\n</div>\r\n<div class="box1LeftLines box1Title">基本信息</div>\r\n<div class="box1LeftLines2">\r\n    <div class="line1">姓<span class="ls">&nbsp</span>名：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.borrowerName, options) : helperMissing.call(depth0, "h", depth0 && depth0.borrowerName, options))) + '</div>\r\n    <div class="line1">姓<span class="ls">&nbsp</span>别：' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</div>\r\n    <div class="line1">年<span class="ls">&nbsp</span>龄：' + escapeExpression((helper = helpers.countAge || depth0 && depth0.countAge, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "countAge", depth0 && depth0.birthdate, options))) + '</div>\r\n    <div class="line1">出<span class="ls">&nbsp</span>生：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "h", depth0 && depth0.birthdate, options))) + '</div>\r\n    \r\n    <div class="line1">手机号：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobile, options) : helperMissing.call(depth0, "h", depth0 && depth0.mobile, options))) + '</div>\r\n    \r\n</div>\r\n<div class="box1LeftLines2">\r\n    <div class="line1">证件类型：身份证</div>\r\n    <div class="line1">身份证号：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.cardNum, options) : helperMissing.call(depth0, "h", depth0 && depth0.cardNum, options))) + '</div>\r\n    \r\n    <div class="line1">有效期限：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.validDate, options) : helperMissing.call(depth0, "h", depth0 && depth0.validDate, options))) + '</div>\r\n</div>\r\n<div class="box1LeftLinesLast">\r\n    <div class="line1">查询网点：' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.companyName, options) : helperMissing.call(depth0, "h", depth0 && depth0.companyName, options))) + '</div>\r\n    <div class="line1">查询时间：' + escapeExpression((helper = helpers.formatDate || depth0 && depth0.formatDate, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.created, options) : helperMissing.call(depth0, "formatDate", depth0 && depth0.created, options))) + "</div>\r\n</div>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/identityInfo-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, functionType = "function",
            escapeExpression = this.escapeExpression,
            helperMissing = helpers.helperMissing,
            self = this;

        function program1(depth0, data) {
            return '\r\n        <div class="currentPic pull-left ml29">\r\n            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n        </div>\r\n        <div class="identityFrontthir-bottom" style="color:white;">本人照片</div>\r\n        '
        }

        function program3(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <div class="currentPicNoborder pull-left ml29">\r\n            <img src="';
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
            buffer += escapeExpression(stack1) + '" width="175">\r\n        </div>\r\n        ';
            return buffer
        }

        function program5(depth0, data) {
            return '\r\n            <div class="currentPic pull-left ml29"  style="margin:16px 0 0 45px;">\r\n                <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:75px;top:200px;color:white;">身份证正面照(拍摄)</div>\r\n            '
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <div class="pic-bg id-pic">\r\n                <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:90px;top:200px;color:white;">身份证正面照(拍摄)</div>\r\n            ';
            return buffer
        }

        function program9(depth0, data) {
            return '\r\n            <div class="currentPic pull-left ml29" style="margin-left:0px;">\r\n                <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:22px;top:184px;color:white;">身份证反面照(拍摄)</div>\r\n            '
        }

        function program11(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <div class=" id-pics" style="margin:0 0 0 -88px">\r\n                <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n            </div>\r\n             <div class="identityFrontthir-bottom" style="left:-5px;top:184px;color:white;">身份证反面照(拍摄)</div>\r\n            ';
            return buffer
        }

        function program13(depth0, data) {
            return '\r\n        <div class="currentPic pull-left ml29" style="margin:16px 0 0 -78px;">\r\n            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n        </div>\r\n         <div class="identityFrontthir-bottom" style="left:-20px;top:200px;color:white;">本人照片</div>\r\n        '
        }

        function program15(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <div class=" phonos">\r\n            <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n        </div>\r\n         <div class="identityFrontthir-bottom" style="left:15px;top:200px;color:white;">本人照片</div>\r\n        ';
            return buffer
        }

        function program17(depth0, data) {
            return '\r\n        <div class="currentPic pull-left ml29" style="margin:16px 0 0 8px;">\r\n            <img src="http://static.hpbanking.com/xg/uploads/files/fc70a224390427c58c0cd72f3b63e598-128-128.png" width="175">\r\n        </div>\r\n          <div class="identityFrontthir-bottom"style="left:60px;top:200px;color:white;">公安证件照</div>\r\n        '
        }

        function program19(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <div class=" phono">\r\n            <img src="';
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
            buffer += escapeExpression(stack1) + '">\r\n        </div>\r\n          <div class="identityFrontthir-bottom"style="left:90px;top:200px;color:white;">公安证件照</div>\r\n        ';
            return buffer
        }
        buffer += '<div class="title">照片识别</div>\r\n<div class="pull-left identitiesBox active" id="thretop" >\r\n    <div class="identity identityFront pull-left">\r\n        <div class="pull-left w170 clearfix">\r\n            <div class="lineBox">\r\n                <span class="lightblue">姓名</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.borrowerName, options) : helperMissing.call(depth0, "h", depth0 && depth0.borrowerName, options))) + '</span>\r\n            </div>\r\n            <div class="lineBox">\r\n                <!--<span class="lightblue">性别</span><span class="addText">' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</span><span class="ml-15 lightblue">民族</span><span class="addText">';
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
        buffer += escapeExpression(stack1) + '</span>-->\r\n                <span class="lightblue">性别</span><span class="addText">' + escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options))) + '</span><span class="ml-15 lightblue">民族</span>\r\n                <span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.nation, options) : helperMissing.call(depth0, "h", depth0 && depth0.nation, options))) + '</span>\r\n            </div>\r\n            <div class="lineBox">\r\n                <span class="lightblue">出生</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.birthdate, options) : helperMissing.call(depth0, "h", depth0 && depth0.birthdate, options))) + '</span>\r\n            </div>\r\n            <div class="lineBox" style="height:14px;line-height:14px !important;">\r\n                <span class="lightblue">住址</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "h", depth0 && depth0.address, options))) + '</span>\r\n            </div>\r\n        </div>\r\n        <div class="pull-right w80 mr-10">\r\n            <img src="';
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
        buffer += escapeExpression(stack1) + '" class="frontPic">\r\n        </div>\r\n        <div class="lineBox clearfix" style="position: absolute;bottom: 20px;">\r\n            <span class="lightblue">公民身份证号码</span><span class="addText" id="cardNum">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.cardNum, options) : helperMissing.call(depth0, "h", depth0 && depth0.cardNum, options))) + '</span>\r\n        </div>\r\n\r\n    </div>\r\n    <div class="identity identityBack pull-left ml29">\r\n        <div class="lineBox pdl20 mt100">\r\n            <span class="">签发机关</span><span class="addText">' + escapeExpression((helper = helpers.h || depth0 && depth0.h, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.issuer, options) : helperMissing.call(depth0, "h", depth0 && depth0.issuer, options))) + '</span>\r\n        </div>\r\n        <div class="lineBox pdl20">\r\n            <span class="">有效期限</span><span class="addText">' + escapeExpression((helper = helpers.transform || depth0 && depth0.transform, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.validDate, options) : helperMissing.call(depth0, "transform", depth0 && depth0.validDate, options))) + '</span>\r\n        </div>\r\n    </div>\r\n    <div class="identityFrontthir pull-left ml29">\r\n        ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n        \r\n    </div>\r\n    \r\n\r\n</div>\r\n<div class="pull-left identitiesBox active" id="forbot">\r\n    <div >\r\n        <div class="identityFrontthir pull-left ml29" style="width:300px;height:180px;">\r\n            ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.frontImage, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.frontImage, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n           \r\n        </div>\r\n        <div class="identityFrontthir pull-left ml29" style="margin:16px 0 0 126px;width:300px;height:180px;">\r\n            ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.backImage, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.backImage, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(11, program11, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.backImage, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.backImage, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n           \r\n        </div>\r\n    </div>\r\n <div class="identityFrontthir pull-left ml29">\r\n        ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(13, program13, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(15, program15, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.faceUrl, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n       \r\n    </div>\r\n    <div class="identityFrontthir pull-left ml29">\r\n        ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.imgUrl, "==", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.imgUrl, "==", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(19, program19, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.imgUrl, "!=", depth0 && depth0.null, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.imgUrl, "!=", depth0 && depth0.null, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n      \r\n    </div>\r\n   \r\n\r\n</div>\r\n<div style="position:relative">\r\n    <img src="';
        if (helper = helpers.authorizUrl) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.authorizUrl;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '" alt="" style="height:180px;width:300px;margin:40px 0 0 30px;">\r\n    <div style="position:absolute;color:white;bottom:-25px;left:140px;">授权书</div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/rightBox-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n\r\n    <div class="iconFail">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n    <div class="iconComplete">' + escapeExpression((helper = helpers.infoResult || depth0 && depth0.infoResult, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.result, depth0 && depth0.flowStatus, options) : helperMissing.call(depth0, "infoResult", depth0 && depth0.result, depth0 && depth0.flowStatus, options))) + "</div>";
            return buffer
        }

        function program5(depth0, data) {
            return 'onclick="return false" '
        }

        function program7(depth0, data) {
            return "金融信贷"
        }

        function program9(depth0, data) {
            return "点击查看"
        }

        function program11(depth0, data) {
            return "身份核验"
        }

        function program13(depth0, data) {
            return "公安不良"
        }

        function program15(depth0, data) {
            return "人法涉诉"
        }

        function program17(depth0, data) {
            return "其他综合"
        }

        function program19(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n    <a class="btn btn-primary h42" id="checkFullReportBtn" href="/cycle/credit/report.htm?encryptKey=';
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
            buffer += escapeExpression(stack1) + "&&type=fullReport&&mobileStatus=";
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
            buffer += escapeExpression(stack1) + '"\r\n        target="_blank">查看完整报告</a> ';
            return buffer
        }

        function program21(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n    <a class="btn btn-primary h42 displayNone" id="checkFullReportBtn" href="/cycle/credit/report.htm?encryptKey=';
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
            buffer += escapeExpression(stack1) + "&&type=fullReport&&mobileStatus=";
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
            buffer += escapeExpression(stack1) + '"\r\n        target="_blank">查看完整报告</a> ';
            return buffer
        }
        buffer += '<div class="spirit">\r\n    <img class="spirit-img" src="http://static.hpbanking.com/xg/uploads/files/88f116378888db7e8250471db55a460c-235-508.png" alt="">    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.result, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.result, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    <a class="circle plScan" id="plScan" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=plScan&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">金融信贷</div>\r\n        <div class="outerCircle" id="outerCPlScan">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(7, program7, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="caseRecord"><span class="name"></span><span class="color"></span></div>\r\n            <div id="phoneRecord"><span class="name"></span><span class="color"></span></div>\r\n            <div id="zhimaRecord"><span class="name"></span><span class="color"></span></div>\r\n        </div>\r\n    </a>\r\n    <a class="circle clBehavior" id="clBehavior" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=clBehavior&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">身份核验</div>\r\n        <div class="outerCircle" id="outerCClBehavior">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(11, program11, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="trdFinancialOver"><span class="name"></span><span class="color"></span></div>\r\n            <div id="borrowOver"><span class="name"></span><span class="color"></span></div>\r\n            \r\n        </div>\r\n    </a>\r\n    <a class="circle badBehavior" id="badBehavior" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=badBehavior&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">公安不良</div>\r\n        <div class="outerCircle" id="outerCBadBehavior">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(13, program13, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="penalRecord"><span class="name"></span><span class="color"></span></div>\r\n            \r\n        </div>\r\n    </a>\r\n    <a class="circle consumeBehavior" id="consumeBehavior" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=consumeBehavior&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">人法涉诉</div>\r\n        <div class="outerCircle" id="outerCConsumeBehavior">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(15, program15, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="ExceptionTrade"><span class="name"></span><span class="color"></span></div>\r\n            <div id="cashOut"><span class="name"></span><span class="color"></span></div>\r\n            <div id="badCost"><span class="name"></span><span class="color"></span></div>\r\n            <div id="caipan"><span class="name"></span><span class="color"></span></div>\r\n            <div id="baoguangtai"><span class="name"></span><span class="color"></span></div>\r\n            <div id="taiting"><span class="name"></span><span class="color"></span></div>\r\n            <div id="anjian"><span class="name"></span><span class="color"></span></div>\r\n            <div id="heimingdan"><span class="name"></span><span class="color"></span></div>\r\n        </div>\r\n\r\n    </a>\r\n    <a class="circle communicationTrack" id="communicationTrack" href="/cycle/credit/report.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + "&&type=communicationTrack&&mobileStatus=";
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
        buffer += escapeExpression(stack1) + '"\r\n        target="_blank" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>\r\n        <div class="text">其他综合</div>\r\n        <div class="outerCircle" id="outerCCommunicationTrack">';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(9, program9, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</div>\r\n        <div class="popover" id="popover">\r\n            <div id="firstStatus"><span class="name"></span><span class="color"></span></div>\r\n            <div id="onlineTimeMap"><span class="name"></span><span class="color"></span></div>\r\n             <div id="specialRelation"><span class="name"></span><span class="color"></span></div> \r\n        </div>\r\n    </a>\r\n\r\n</div>\r\n<div class="flag">\r\n    <div class="lineMg"><span class="sCircle sRed">：表示触碰关键性风险数据，属于预警类别</span></div>\r\n    <div class="lineMg"><span class="sCircle sYellow"></span>：表示触碰非关键性风险数据，属于提示类别</div>\r\n    <div class="lineMg"><span class="sCircle sGreen"></span>：表示未触碰风险数据或未发生</div>\r\n    ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(19, program19, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 4, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 4, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " ";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(21, program21, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.showReport, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.showReport, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n\r\n</div>\r\n\r\n\r\n\r\n<!--\r\n<div class="popover">\r\n    <div class="con" id = "bx">\r\n        <div id="cn">\r\n            1）汽车金融<br>\r\n            <div class="title">一、编号说明</div>\r\n            I1：金融机构M1逾期<br>\r\n            I2：金融机构M2逾期<br>\r\n            I3：金融机构M3逾期<br>\r\n            I4：金融机构M3+逾期<br>\r\n            P1：信贷逾期<br>\r\n            P2：助学贷款逾期<br>\r\n            P3：其他逾期<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            --：暂未发现风险<br>\r\n            2）消费信贷<br>\r\n            一、编号说明<br>\r\n            I1：金融机构M1逾期<br>\r\n            I2：金融机构M2逾期<br>\r\n            I3：金融机构M3逾期<br>\r\n            I4：金融机构M3+逾期<br>\r\n            P1：信贷逾期<br>\r\n            P2：助学贷款逾期<br>\r\n            P3：其他逾期<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            --：暂未发现风险<br>\r\n            3）租赁行业<br>\r\n            一、编号说明<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            O1：信保逾期<br>\r\n            O2：金融机构M1逾期<br>\r\n            O3：金融机构M2逾期<br>\r\n            O4：金融机构M3逾期<br>\r\n            O5：金融机构M3+逾期<br>\r\n            O6：互联网信贷逾期<br>\r\n            --：暂未发现风险<br>\r\n            4）人事行业<br>\r\n            一、编号说明<br>\r\n            B1：网贷黑名单<br>\r\n            B2：信贷黑名单<br>\r\n            H1：失信人执行人<br>\r\n            H2：多平台借款<br>\r\n            H3：金融机构M1逾期<br>\r\n            H4：金融机构M2逾期<br>\r\n            H5：金融机构M3逾期<br>\r\n            H6：金融机构M3+逾期<br>\r\n            H7：互联网信贷逾期<br>\r\n            --：暂未发现风险<br>\r\n        </div>\r\n    </div>\r\n    <div class="boxscr" id = "bs">\r\n        <div class="scr" id = "sc"></div>\r\n    </div>\r\n</div>-->';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/helpCarFinancial-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '\r\n<div class="title">一、编号说明</div>\r\nI1：金融机构M1逾期<br>\r\nI2：金融机构M2逾期<br>\r\nI3：金融机构M3逾期<br>\r\nI4：金融机构M3+逾期<br>\r\nP1：信贷逾期<br>\r\nP2：助学贷款逾期<br>\r\nP3：其他逾期<br>\r\nB1：网贷黑名单<br>\r\nB2：信贷黑名单<br>\r\n--：暂未发现风险<br>'
    })
});
define("xg/eid-company/1.0.4/p/report/report/bottomBtn-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            return "disabled"
        }
        buffer += '<a class="btn btn-primary h42 pull-left" id="back">返回首页</a>\r\n<!--<button class="btn btn-primary h42 radius blacklist pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>加入黑名单</button>-->\r\n<button class="btn btn-primary h42 radius noThrougth pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核不通过</button>\r\n<button class="btn btn-primary h42 radius pass pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核通过</button>\r\n<a class="btn btn-primary h42 radius download pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" href="javascript:void(0)" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ">下载报告</a>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/threeMonthRecord-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1;
            buffer += "\r\n    ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr  class="text-c">\r\n            <td class="">' + escapeExpression((helper = helpers.formatDateFull || depth0 && depth0.formatDateFull, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.time, options) : helperMissing.call(depth0, "formatDateFull", depth0 && depth0.time, options))) + "</td><td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.address, options))) + "</td>\r\n        </tr>\r\n    ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n    <tr>\r\n        <td class="text-c" colspan="3">--</td>\r\n    </tr>\r\n'
        }
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/creditReport-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, functionType = "function",
            escapeExpression = this.escapeExpression,
            helperMissing = helpers.helperMissing,
            self = this;

        function program1(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program3(depth0, data) {
            return "--"
        }

        function program5(depth0, data) {
            var helper, options;
            return escapeExpression((helper = helpers.infoSex || depth0 && depth0.infoSex, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sex, options) : helperMissing.call(depth0, "infoSex", depth0 && depth0.sex, options)))
        }

        function program7(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program9(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program11(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program13(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program15(depth0, data) {
            var stack1, helper;
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
            return escapeExpression(stack1)
        }

        function program17(depth0, data) {
            return "人脸比对成功"
        }

        function program19(depth0, data) {
            return "人脸比对失败"
        }

        function program21(depth0, data) {
            return '\r\n        <tbody class="text-c courtDataSecond">\r\n\r\n        </tbody>\r\n    '
        }

        function program23(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program25(depth0, data) {
            return '\r\n        <tbody class="text-c pawnshopFirst">\r\n\r\n        </tbody>\r\n    '
        }

        function program27(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program29(depth0, data) {
            return '\r\n        <tbody class="text-c pawnshopSecond">\r\n\r\n        </tbody>\r\n    '
        }

        function program31(depth0, data) {
            return '\r\n        <tbody class="text-c">\r\n            <tr>\r\n              <td>--</td>\r\n              <td>--</td>\r\n            </tr>\r\n        </tbody>\r\n    '
        }

        function program33(depth0, data) {
            var stack1, helper;
            if (helper = helpers.message) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.message;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program35(depth0, data) {
            var stack1, helper;
            if (helper = helpers.caseTime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.caseTime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program37(depth0, data) {
            return "disabled"
        }
        buffer += '<div class="cl number_time">\r\n<!-- <div class="col-sm-6">报告编号：201611190000001</div> -->\r\n<div class="col-sm-12 text-r">查询时间：' + escapeExpression((helper = helpers.formatDate || depth0 && depth0.formatDate, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.created, options) : helperMissing.call(depth0, "formatDate", depth0 && depth0.created, options))) + '</div>\r\n</div>\r\n<h4 class="text-c">查询信息</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>被查询者姓名</th>\r\n        <th>被查询者证件类型</th>\r\n        <th>被查询者证件号码</th>\r\n        <th>查询门店</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n      <tr>\r\n        <td>';
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
        buffer += escapeExpression(stack1) + "</td>\r\n        <td>身份证</td>\r\n        <td>";
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
        buffer += escapeExpression(stack1) + "</td>\r\n        <td>";
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
        buffer += escapeExpression(stack1) + '</td>\r\n      </tr>\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">人证核实</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>身份证正面</th>\r\n        <th>身份证反面</th>\r\n        <th>本人照片</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n        <tr>\r\n            <td>\r\n                <div class="identity identityFront">\r\n                    <div class="cl mt20">\r\n                        <div class="pull-left w170 ml-5">\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">姓名</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.borrowerName, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">性别</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.sex, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(5, program5, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span><span class="ml-15 lightblue">民族</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.nation, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(7, program7, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">出生</span><span class="addText birthdate_year"></span><span class="lightblue"> 年 </span><span class="addText birthdate_mouth"></span><span class="lightblue"> 月 </span><span class="addText birthdate_day"></span><span class="lightblue"> 日 </span>\r\n                            </div>\r\n                            <div class="lineBox">\r\n                                <span class="lightblue">住址</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.address, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(9, program9, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class="pull-right w80 mr-5 mt5">\r\n                           <img src="';
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
        buffer += escapeExpression(stack1) + '" class="frontPic" alt="暂无此照片">\r\n                        </div>\r\n                    </div>\r\n                    <div class="lineBox pdt18 cl ml-5">\r\n                        <span class="lightblue">公民身份证号码</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.cardNum, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(11, program11, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <div class="identity identityBack">\r\n                    <div class="lineBox mt125 ml-50">\r\n                        <span class="fw_bold">签发机关</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.issuer, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(13, program13, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                    <div class="lineBox ml-50">\r\n                        <span class="fw_bold">有效期限</span><span class="addText">';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.validDate, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(15, program15, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</span>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <img class="card_img" src="';
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
        buffer += escapeExpression(stack1) + '">\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n          <td class="td_bg">核实结果</td>\r\n          <td colspan=2>';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.program(19, program19, data),
            fn: self.program(17, program17, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.compareResult, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.compareResult, "==", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">法院数据</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>法院失信名单</th>\r\n        <th>法院执行名单</th>\r\n        <th>法院结案</th>\r\n        <th>法人失信</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c courtDataFirst">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>案号</th>\r\n        <th>执行法院</th>\r\n        <th>案件状态</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.courtList, {
            hash: {},
            inverse: self.program(23, program23, data),
            fn: self.program(21, program21, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<h4 class="text-c">信贷行业</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>信用/消费贷黑名单</th>\r\n        <th>信贷逾期</th>\r\n        <th>信用卡逾期</th>\r\n        <th>P2P黑名单</th>\r\n        <th>助学贷款逾期</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditFirst">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>套现交易</th>\r\n        <th>信贷失联</th>\r\n        <th>信贷欺诈</th>\r\n        <th>风控规则</th>\r\n        <th>黑中介</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditSecond">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>骗取补贴</th>\r\n        <th>冒用风险</th>\r\n        <th>信贷分值低</th>\r\n        <th>曾经逾期（0-30天）</th>\r\n        <th>信贷黑名单</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditThree">\r\n\r\n    </tbody>\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>商户欺诈名单</th>\r\n        <th>曾经逾期（未知期限）</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c creditFour">\r\n\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">三方支付</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>盗卡</th>\r\n        <th>其他欺诈</th>\r\n        <th>盗用操作</th>\r\n        <th>盗用支出</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c threePayment">\r\n\r\n    </tbody>\r\n</table>\r\n<h4 class="text-c">典当行</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>典当物品</th>\r\n        <th>典当金额</th>\r\n        <th>典当地点</th>\r\n        <th>典当时间</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.pawnList, {
            hash: {},
            inverse: self.program(27, program27, data),
            fn: self.program(25, program25, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>违约行为</th>\r\n        <th>描述</th>\r\n      </tr>\r\n    </thead>\r\n    ';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.pawnList, {
            hash: {},
            inverse: self.program(31, program31, data),
            fn: self.program(29, program29, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n</table>\r\n<h4 class="text-c">负面信息</h4>\r\n<table class="table table-border table-bordered table-hover table-bg">\r\n    <thead class="text-c">\r\n      <tr>\r\n        <th>不良记录</th>\r\n        <th>案件时间</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n      <tr>\r\n        <td>';
        stack1 = helpers["if"].call(depth0, depth0 && depth0.message, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(33, program33, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "</td>\r\n        <td>";
        stack1 = helpers["if"].call(depth0, depth0 && depth0.caseTime, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(35, program35, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '</td>\r\n      </tr>\r\n    </tbody>\r\n</table>\r\n<h6>1.本信息的著作权属于杭州信鸽金融信息服务股份有限公司，未经书面许可，不得擅自复制、摘录、编辑、转载、披露和发表。</h6>\r\n<h6>2.使用本信息需经过被查询人授权，信鸽金服不承担因授权不充分而引起的任何法律责任。</h6>\r\n<h6>3.本信息中除信鸽EID身份标识查询特殊标注外，信息均由相关数据来源机构和信息主体来源机构，承诺在信息整合、汇总、展示的全过程当中保持客观、中立的地位。</h6>\r\n<div class="cl top_border">\r\n    <div class="bottom_btn">\r\n      <a class="btn btn-primary radius download" href="javascript:void(0)">下载报告</a>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius pass" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核通过</button>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius noThrougth" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核不通过</button>\r\n      <button class="btn btn-primary ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ' radius blacklist" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(37, program37, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ">加入黑名单</button>\r\n    </div>\r\n</div>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/creditOptionH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += ' <div id="modal-creditOption" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\r\n  <div class="modal-dialog">\r\n    <div class="modal-content radius">\r\n      <div class="modal-header">\r\n        <h5 class="modal-title" style="font-size: 18px">提示</h5>\r\n        <a class="close" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n      </div>\r\n      <form class="form form-horizontal" id="creditOptionForm">\r\n        <input type="hidden" name="encryptKey" id="encryptKey" value="';
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
        buffer += escapeExpression(stack1) + '">\r\n        <input type="hidden" name="status" id="status" value="';
        if (helper = helpers.status) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.status;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '">\r\n        <div class="modal-body">\r\n            客户：';
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
        buffer += escapeExpression(stack1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认";
        if (helper = helpers.optionText) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.optionText;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '？\r\n        </div>\r\n        <div class="modal-footer">\r\n          <input class="btn btn-primary" type="submit" value="确认">\r\n          <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/bottomBtn-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            return "disabled"
        }
        buffer += '<a class="btn btn-primary h42 pull-left" id="back">返回首页</a>\r\n<!--<button class="btn btn-primary h42 radius blacklist pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>加入黑名单</button>-->\r\n<button class="btn btn-primary h42 radius noThrougth pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核不通过</button>\r\n<button class="btn btn-primary h42 radius pass pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" style="display: inline-block;" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '>审核通过</button>\r\n<a class="btn btn-primary h42 radius download pull-right ml40 ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '" href="javascript:void(0)" ';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.status, "!=", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.status, "!=", 0, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += ">下载报告</a>";
        return buffer
    })
});