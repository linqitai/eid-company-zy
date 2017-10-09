define(function (require, exports, module) {
    var $ = require("$"),
        tools = require("../../c/js/tools");
    require("../../c/js/registerHelper")
    //手机验证状态     0未校验，1校验失败，2校验成功
    var main = {
        init: function () {
            var self = this;
            self.url = {
                // plScan:'/cycle/credit/detail/threeLeve/courtList.json',//人法扫描
                plScan: '/cycle/new/credit/detail/queryFinancial.json', //金融信贷
                clBehavior: "/cycle/credit/detail/creditAction.json", //信贷行为
                clBehaviorPawnList: '/cycle/credit/detail/threeLeve/pawnList.json', //典当行
                badBehavior: "/cycle/credit/detail/threeLeve/badActionList.json", //不良行为
                consumeBehavior: '/cycle/credit/detail/costAction.json', //消费行为
                communicationTrack: "/cycle/new/credit/detail/queryOtherInfo.json", //其他综合信息
            }
            self.type = tools.getUrlParam("type");
            //self.mobileStatus = tools.getUrlParam("mobileStatus");
            //报告页面的温馨提示
            // if (self.mobileStatus == 0) {
            //     $("#mobileTip").text("温馨提示：由于手机号码未校验，导致该报告不完整。");
            // } else if (self.mobileStatus == 1) {
            //     $("#mobileTip").text("温馨提示：由于手机号码匹配不成功，导致该报告不完整。");
            // } else if (self.mobileStatus == 2) {
            //     $("#mobileTip").remove();
            // }
            // console.log(tools.getUrlParam("type"));
            self.data = {
                encryptKey: tools.getUrlParam("encryptKey"),
                flag: 3
            }
            //判断模块类型
            if (self.type == "plScan") {
                self.getPlScan();
            } else if (self.type == "clBehavior") {
                self.getClBehavior();
            } else if (self.type == "badBehavior") {
                self.getBadBehavior();
            } else if (self.type == "communicationTrack") {
                self.getCommunicationTrack();
            } else if (self.type == "consumeBehavior") {
                self.getConsumeBehavior();
            } else if (self.type == "fullReport") {
                console.log("type:" + self.type);
                self.getPlScan1();

            }
            self.initEvents();
        },
        setTitleColorFull: function (titleDiv, color) {
            console.log(color);
            if (color == "red") {
                titleDiv.addClass("titleIconRed");
            } else if (color == "yellow") {
                titleDiv.addClass("titleIconYellow");
            } else if (color == "green") {
                titleDiv.addClass("titleIconGreen");
                console.log("--------titleIconGreen--------");
            }
        },
        setTitleColor: function (titleDiv) {
            var color = window.localStorage.color;
            console.log("color:" + color);
            if (color == "red") {
                titleDiv.addClass("titleIconRed");
            } else if (color == "yellow") {
                titleDiv.addClass("titleIconYellow");
            } else if (color == "green") {
                titleDiv.addClass("titleIconGreen");
            }
        },
        getPlScan: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.plScan,
                success: function (data) {
                    console.log(obj);
                    var obj = data.obj;
                    console.log(obj);
                    var temp1 = require('./plscan1.handlebars');
                    var temp2 = require('./plscan2.handlebars');
                    var temp3 = require('./plscan3.handlebars');
                    $("#reportBox").append(temp1(obj['贷款申请信息']));
                    $("#reportBox").append(temp2(obj['贷款放款信息']));
                    var Obj = obj['信贷不良信息'];
                    var list = {
                        keys: [],
                        values: []
                    };
                    for (var key in Obj) {
                        list.keys.push(key);
                        list.values.push(Obj[key]);
                    };
                    console.log(list);
                    $("#reportBox").append(temp3(list));
                    // $("#reportBox").append(temp());
                    // var courtExecute = obj["courtExecute"];
                    // $("#courtExecute").html(courtExecute);
                    // var lossCredit = obj["lossCredit"];
                    // $("#lossCredit").html(lossCredit);
                    // var limitHighCost = obj["limitHighCost"];
                    // $("#limitHighCost").html(limitHighCost);
                    // var limitEntryExit = obj["limitEntryExit"];
                    // $("#limitEntryExit").html(limitEntryExit);
                    // var crime = obj["crime"];
                    // $("#crime").html(crime);
                    // var breakLaw = obj["breakLaw"];
                    // $("#breakLaw").html(breakLaw);
                    // var courtListTmp = require('./courtList.handlebars');
                    // console.log(obj.courtList);
                    // $("#courtList").html(courtListTmp(obj.courtList));

                    // //设置标题图标的颜色
                    // var titleDiv = $("#plscan #reportTitle");
                    // self.setTitleColor(titleDiv);
                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }

                }
            });
        },
        getClBehavior: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.clBehavior,
                success: function (data) {
                    console.log("=================");
                    var obj = data.obj;
                    console.log(obj);
                    var temp = require('./clBehavior.handlebars');
                    $("#reportBox").append(temp());

                    var trdFinancialOver = obj["trdFinancialOver"];
                    var name = trdFinancialOver[2];
                    $("#trdFinancialOver").html(name);

                    var borrowOver = obj["borrowOver"];
                    var name = borrowOver[2];
                    $("#borrowOver").html(name);

                    var multiplate = obj["multiplate"];
                    var name = multiplate[2];
                    $("#multiplate").html(name);

                    var creditFraud = obj["creditFraud"];
                    var name = creditFraud[2];
                    $("#creditFraud").html(name);

                    var blacklist = obj["blacklist"];
                    var name = blacklist[2];
                    $("#blacklist").html(name);

                    var lossContact = obj["lossContact"];
                    var name = lossContact[2];
                    $("#lossContact").html(name);

                    var creditOver = obj["creditOver"];
                    var name = creditOver[2];
                    $("#creditOver").html(name);

                    var pawnRecord = obj["pawnRecord"];
                    var name = pawnRecord[2];
                    $("#pawnRecord").html(name);

                    //设置标题图标的颜色
                    var titleDiv = $("#clBehavior #reportTitle");
                    self.setTitleColor(titleDiv);

                    //典当行行为记录
                    self.getPawnList();
                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        getPawnList: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.clBehaviorPawnList,
                success: function (data) {
                    console.log("=================");
                    console.log(data);
                    if (data.code == 0) {
                        var temp = require('./pawnList.handlebars');
                        $("#reportBox").append(temp(data.list));

                    }
                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        getBadBehavior: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.badBehavior,
                success: function (data) {
                    console.log("=================");
                    var obj = data.obj;
                    console.log(obj);
                    var temp = require('./badBehavior.handlebars');
                    $("#reportBox").append(temp());

                    var list = require('./badBehaviorList.handlebars');
                    $("#policeRecordList").html(list(obj.policeRecordList));
                    $("#penalRecordList").html(list(obj.penalRecordList));
                    $("#insuranceCheatList").html(list(obj.insuranceCheatList));
                    $("#otherRecordList").html(list(obj.otherRecordList));

                    //设置标题图标的颜色
                    var titleDiv = $("#badBehavior #reportTitle");
                    self.setTitleColor(titleDiv);

                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }

                }
            });
        },
        getConsumeBehavior: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.consumeBehavior,
                success: function (data) {
                    console.log("=================");
                    var obj = data.obj;
                    console.log(obj);
                    var temp = require('./consumeBehavior.handlebars');
                    $("#reportBox").append(temp());

                    var ExceptionTrade = obj["exceptionTrade"];
                    var name = ExceptionTrade[2];
                    $("#ExceptionTrade").html(name);

                    var cashOut = obj["cashOut"];
                    var name = cashOut[2];
                    $("#cashOut").html(name);

                    var badCost = obj["badCost"];
                    var name = badCost[2];
                    $("#badCost").html(name);

                    //设置标题图标的颜色
                    var titleDiv = $("#consumeBehavior #reportTitle");
                    self.setTitleColor(titleDiv);
                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }

                }
            });
        },
        // 其他综合信息
        getCommunicationTrack: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.communicationTrack,
                success: function (data) {
                    var obj = data.obj;
                    console.log(obj);
                    var list = {};
                    var json = JSON.parse(obj.mobileLand);
                    console.log(json.province);
                    list.province = json.province;
                    list.city = json.city;
                    list.company = json.company;
                    list.online = obj.zaOnline;
                    console.log(list);
                    var temp = require('./communicationTrack.handlebars');
                    $("#reportBox").append(temp(list));
                    // 芝麻信息
                    var zhima = require('./zhimaCredit.handlebars');
                    var arr = JSON.parse(obj.zhima);
                    console.log(arr)
                    $("#reportBox").append(zhima(arr));
                    // var onlineTimeMap = obj["onlineTimeMap"];
                    // var name = onlineTimeMap[2];
                    // $("#onlineTimeMap").html(name);

                    // var collectionRecordsMap = obj["collectionRecordsMap"];
                    // var name = collectionRecordsMap[2];
                    // $("#collectionRecordsMap").html(name);

                    // //设置标题图标的颜色
                    // var titleDiv = $("#communicationTrack #reportTitle");
                    // self.setTitleColor(titleDiv);

                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }

                }
            });
        },

        //加载完整报告
        getPlScan1: function () {
            var self = this;
            this.getPlScan();
            // $.ajax({
            //     data: self.data,
            //     cache: false,
            //     type: "post",
            //     url: self.url.plScan,
            //     success: function (data) {
            //         var obj = data.obj;
            //         console.log(obj);
            //         var temp = require('./plscan.handlebars');
            //         $("#reportBox").append(temp());
            //         // $("#reportBox").html(temp(obj));
            //         var courtExecute = obj["courtExecute"];
            //         $("#courtExecute").html(courtExecute);

            //         var lossCredit = obj["lossCredit"];
            //         $("#lossCredit").html(lossCredit);

            //         var limitHighCost = obj["limitHighCost"];
            //         $("#limitHighCost").html(limitHighCost);

            //         var limitEntryExit = obj["limitEntryExit"];
            //         $("#limitEntryExit").html(limitEntryExit);

            //         var crime = obj["crime"];
            //         $("#crime").html(crime);

            //         var breakLaw = obj["breakLaw"];
            //         $("#breakLaw").html(breakLaw);

            //         var courtList = require('./courtList.handlebars');
            //         $("#courtList").html(courtList(obj.courtList));

            //         //设置标题图标的颜色
            //         /*var titleDiv = $("#plscan #reportTitle");
            //         self.setTitleColor(titleDiv);*/

            //         self.getClBehavior1();
            //     },
            //     error: function (data) {
            //         console.log(data);
            //         if (data.statusText == "timeout") {
            //             tools.tusi("网络连接失败，请重试~");
            //         } else {
            //             tools.tusi("系统出错了");
            //         }

            //     }
            // });
        },
        getClBehavior1: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.clBehavior,
                success: function (data) {
                    console.log("=================");
                    var obj = data.obj;
                    console.log(obj);
                    var temp = require('./clBehavior.handlebars');
                    $("#reportBox").append(temp());

                    var trdFinancialOver = obj["trdFinancialOver"];
                    var name = trdFinancialOver[2];
                    $("#trdFinancialOver").html(name);

                    var borrowOver = obj["borrowOver"];
                    var name = borrowOver[2];
                    $("#borrowOver").html(name);

                    var multiplate = obj["multiplate"];
                    var name = multiplate[2];
                    $("#multiplate").html(name);

                    var creditFraud = obj["creditFraud"];
                    var name = creditFraud[2];
                    $("#creditFraud").html(name);

                    var blacklist = obj["blacklist"];
                    var name = blacklist[2];
                    $("#blacklist").html(name);

                    var lossContact = obj["lossContact"];
                    var name = lossContact[2];
                    $("#lossContact").html(name);

                    var creditOver = obj["creditOver"];
                    var name = creditOver[2];
                    $("#creditOver").html(name);

                    var pawnRecord = obj["pawnRecord"];
                    var name = pawnRecord[2];
                    $("#pawnRecord").html(name);

                    //设置标题图标的颜色
                    /*var titleDiv = $("#clBehavior #reportTitle");
                    self.setTitleColor(titleDiv);*/

                    //典当行行为记录
                    self.getPawnList1();
                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        getPawnList1: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.clBehaviorPawnList,
                success: function (data) {
                    console.log("=================");
                    console.log(data);
                    if (data.code == 0) {
                        var temp = require('./pawnList.handlebars');
                        $("#reportBox").append(temp(data.list));
                        self.getBadBehavior1();
                    }
                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        getBadBehavior1: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.badBehavior,
                success: function (data) {
                    console.log("=================");
                    var obj = data.obj;
                    console.log(obj);
                    var temp = require('./badBehavior.handlebars');
                    $("#reportBox").append(temp());

                    var list = require('./badBehaviorList.handlebars');
                    $("#policeRecordList").html(list(obj.policeRecordList));
                    $("#penalRecordList").html(list(obj.penalRecordList));
                    $("#insuranceCheatList").html(list(obj.insuranceCheatList));
                    $("#otherRecordList").html(list(obj.otherRecordList));

                    //设置标题图标的颜色
                    /*var titleDiv = $("#badBehavior #reportTitle");
                    self.setTitleColor(titleDiv);*/

                    self.getCommunicationTrack1();
                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }

                }
            });
        },
        getConsumeBehavior1: function () {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.consumeBehavior,
                success: function (data) {
                    console.log("=================");
                    var obj = data.obj;
                    console.log(obj);
                    var temp = require('./consumeBehavior.handlebars');
                    $("#reportBox").append(temp());

                    var ExceptionTrade = obj["exceptionTrade"];
                    var name = ExceptionTrade[2];
                    $("#ExceptionTrade").html(name);

                    var cashOut = obj["cashOut"];
                    var name = cashOut[2];
                    $("#cashOut").html(name);

                    var badCost = obj["badCost"];
                    var name = badCost[2];
                    $("#badCost").html(name);

                    //设置标题图标的颜色
                    console.log("window.localStorage.plScanColor:" + window.localStorage.plScanColor);
                    console.log("window.localStorage.clBehaviorColor:" + window.localStorage.clBehaviorColor);
                    console.log("window.localStorage.badBehaviorColor:" + window.localStorage.badBehaviorColor);
                    console.log("window.localStorage.consumeBehaviorColor:" + window.localStorage.consumeBehaviorColor);
                    console.log("window.localStorage.communicationTrackColor:" + window.localStorage.communicationTrackColor);
                    var plscanTitle = $("#plscan #reportTitle");
                    var clBehaviorTitle = $("#clBehavior #reportTitle");
                    var badBehaviorTitle = $("#badBehavior #reportTitle");
                    var communicationTrackTitle = $("#communicationTrack #reportTitle");
                    var consumeBehaviorTitle = $("#consumeBehavior #reportTitle");
                    self.setTitleColorFull(plscanTitle, window.localStorage.plScanColor);
                    self.setTitleColorFull(clBehaviorTitle, window.localStorage.clBehaviorColor);
                    self.setTitleColorFull(badBehaviorTitle, window.localStorage.badBehaviorColor);
                    self.setTitleColorFull(consumeBehaviorTitle, window.localStorage.consumeBehaviorColor);
                    self.setTitleColorFull(communicationTrackTitle, window.localStorage.communicationTrackColor);
                    /*var titleDiv = $("#consumeBehavior #reportTitle");
                    self.setTitleColor(titleDiv);*/
                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }

                }
            });
        },
        getCommunicationTrack1: function () {
            var self = this;

            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.communicationTrack,
                success: function (data) {
                    console.log("=================");
                    var obj = data.obj;
                    console.log(obj);
                    var temp = require('./communicationTrack.handlebars');
                    $("#reportBox").append(temp());

                    var onlineTimeMap = obj["onlineTimeMap"];
                    var name = onlineTimeMap[2];
                    $("#onlineTimeMap").html(name);

                    var collectionRecordsMap = obj["collectionRecordsMap"];
                    var name = collectionRecordsMap[2];
                    $("#collectionRecordsMap").html(name);

                    //设置标题图标的颜色
                    /*var titleDiv = $("#communicationTrack #reportTitle");
                    self.setTitleColor(titleDiv);*/

                    self.getConsumeBehavior1()
                },
                error: function (data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }

                }
            });
        },
        initEvents: function () {
            var self = this;
            console.log(1);
        },
    };
    main.init();
});