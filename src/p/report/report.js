define(function(require, exports, module) {
    var $ = require("$"),
        tools = require("../../c/js/tools");
    require("../../c/js/registerHelper");
    var main = {
        init: function() {
            var self = this;
            self.url = {
                plScan: "/cycle/new/credit/detail/queryFinancial.json", //金融信贷
                communicationTrack: "/cycle/new/credit/detail/queryOtherInfo.json" //其他综合信息
            };
            self.type = tools.getUrlParam("type");
            self.data = {
                encryptKey: tools.getUrlParam("encryptKey"),
                flag: 3
            };
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
                self.getPlScan1();
            }
            self.initEvents();
        },
        setTitleColorFull: function(titleDiv, color) {
            if (color == "red") {
                titleDiv.addClass("titleIconRed");
            } else if (color == "yellow") {
                titleDiv.addClass("titleIconYellow");
            } else if (color == "green") {
                titleDiv.addClass("titleIconGreen");
            }
        },
        setTitleColor: function(titleDiv) {
            var color = window.localStorage.color;
            if (color == "red") {
                titleDiv.addClass("titleIconRed");
            } else if (color == "yellow") {
                titleDiv.addClass("titleIconYellow");
            } else if (color == "green") {
                titleDiv.addClass("titleIconGreen");
            }
        },
        // 报告汇总
        getTotalReport: function() {
            var self = this;
            $.ajax({
                data: { encryptKey: tools.getUrlParam("encryptKey") },
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryInfoTotal.json",
                async: false,
                success: function(data) {
                    if (data.code === 0) {
                        var list = data.obj;
                        var maxArr = [];
                        for (var key in list) {
                            maxArr.push(parseInt(list[key]));
                        }
                        max = Math.max.apply(Math, maxArr);
                    } else {
                        tools.tusi(data.error);
                    }
                }
            });
            $.ajax({
                data: { encryptKey: tools.getUrlParam("encryptKey") },
                cache: false,
                type: "post",
                url: "/cycle/credit/detail/queryRecord.json",
                async: false,
                success: function(data) {
                    var obj = data.obj;
                    if (data.code === 0) {
                        if (obj) {
                            obj.max = max;
                            var temp = require("./queryRecord.handlebars");
                            $("#reportBox").append(temp(obj));
                        } else {
                            var temp = require("./queryRecord.handlebars");
                            $("#reportBox").append(temp())
                        }
                    } else {
                        tools.tusi(data.error);
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        // 身份风险汇总
        getRiskReport: function() {
            var self = this;
            $.ajax({
                data: { encryptKey: tools.getUrlParam("encryptKey") },
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryInfoTotal.json",
                async: false,
                success: function(data) {
                    if (data.code === 0) {
                        var obj = data.obj;
                        if (obj) {
                            var temp = require("./riskReport.handlebars");
                            $("#reportBox").append(temp(obj));
                        } else {
                            var temp = require("./riskReport.handlebars");
                            $("#reportBox").append(temp());
                        }
                    } else {
                        tools.tusi(data.error);
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        // 金融信贷报告
        getPlScan: function() {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.plScan,
                async: false,
                success: function(data) {
                    var obj = data.obj;
                    if (data.code === 0) {
                        console.log(obj)
                        if (obj) {
                            var temp1 = require("./plscan1.handlebars");
                            $("#reportBox").append(temp1(obj["贷款申请信息"]));
                            var temp2 = require("./plscan2.handlebars");
                            $("#reportBox").append(temp2(obj["贷款放款信息"]));
                            var Obj = obj["信贷不良信息"];
                            var temp3 = require("./plscan3.handlebars");
                            var list = {
                                keys: [],
                                values: []
                            };
                            for (var key in Obj) {
                                list.keys.push(key);
                                list.values.push(Obj[key]);
                            }
                            $("#reportBox").append(temp3(list));
                        } else {
                            var temp1 = require("./plscan1.handlebars");
                            var temp2 = require("./plscan2.handlebars");
                            var temp3 = require("./plscan3.handlebars");
                            $("#reportBox").append(temp1());
                            $("#reportBox").append(temp2());
                            $("#reportBox").append(temp3());
                        }
                    } else {
                        tools.tusi(data.error);
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        // 身份核验信息
        getClBehavior: function() {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/IdenVerificationResults.json",
                async: false,
                success: function(data) {
                    if (data.code === 0) {
                        var obj = data.obj;
                        if (obj) {
                            var temp = require("./clBehavior.handlebars");
                            $("#reportBox").append(temp(obj));
                        } else {
                            var temp = require("./clBehavior.handlebars");
                            $("#reportBox").append(temp());
                        }
                    } else {
                        tools.tusi(data.error);
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        // 公安不良
        getBadBehavior: function() {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryPolice.json",
                async: false,
                success: function(data) {
                    if (data.code === 0) {
                        var obj = data.obj;
                        if (obj) {
                            var temp = require("./badBehavior.handlebars");
                            $("#reportBox").append(temp(obj.police));
                        } else {
                            var temp = require("./badBehavior.handlebars");
                            $("#reportBox").append(temp());
                        }
                    } else {
                        tools.tusi(data.error);
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        // 人法诉讼
        getConsumeBehavior: function() {
            var self = this;
            $.ajax({
                data: {
                    encryptKey: tools.getUrlParam("encryptKey"),
                    flag: 2
                },
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryCourt.json",
                async: false,
                success: function(data) {
                    if (data.code === 0) {
                        var temp = require("./zxgg.handlebars");
                        console.log(data.list)
                        var arr = [];
                        // for (var item in data.list) {
                        //   arr.push(data.list[item].context.substr(-3, 1));
                        // }
                        $("#reportBox").append(temp(data.list));
                        self.getRenfa();
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        getRenfa: function() {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryCourt.json",
                async: false,
                success: function(data) {
                    var obj = data.obj;
                    console.log(obj);
                    if (obj) {
                        var temp = require("./zxgg1.handlebars");
                        if (obj.zxgg) {
                            console.log(obj.zxgg)
                            $("#reportBox").append(temp(obj.zxgg));
                        } else {
                            $("#reportBox").append(temp());
                        }
                        var temp = require("./sxgg.handlebars");
                        if (obj.shixin) {
                            $("#reportBox").append(temp(obj.shixin));
                        } else {
                            $("#reportBox").append(temp());
                        }
                        var temp = require("./fygg.handlebars");
                        if (obj.fygg) {
                            $("#reportBox").append(temp(obj.fygg));
                        } else {
                            $("#reportBox").append(temp());
                        }
                        var temp = require("./cpws.handlebars");
                        if (obj.cpws) {
                            $("#reportBox").append(temp(obj.cpws));
                        } else {
                            $("#reportBox").append(temp());
                        }
                        // 曝光台信息
                        var temp = require("./bgtxx.handlebars");
                        if (obj.bgt) {
                            $("#reportBox").append(temp(obj.bgt));
                        } else {
                            $("#reportBox").append(temp());
                        }
                        var temp = require("./ktgg.handlebars");
                        if (obj.ktgg) {
                            $("#reportBox").append(temp(obj.ktgg));
                        } else {
                            $("#reportBox").append(temp());
                        }
                        var temp = require("./ajlc.handlebars");
                        if (obj.ajlc) {
                            $("#reportBox").append(temp(obj.ajlc));
                        } else {
                            $("#reportBox").append(temp());
                        }
                        var temp = require("./wdhmd.handlebars");
                        if (obj.wdhmd) {
                            $("#reportBox").append(temp(obj.wdhmd));
                        } else {
                            $("#reportBox").append(temp());
                        }
                    } else {
                        var temp = require("./zxgg1.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("./sxgg.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("./fygg.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("./cpws.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("./bgtxx.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("./ktgg.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("./ajlc.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("./wdhmd.handlebars");
                        $("#reportBox").append(temp());
                    }
                }
            });
        },
        // 其他综合信息
        getCommunicationTrack: function() {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: self.url.communicationTrack,
                async: false,
                success: function(data) {
                    var obj = data.obj;
                    console.log(obj)
                    if (data.code === 0) {
                        if (obj) {
                            console.log(obj)
                            var list = {};
                            console.log(obj)
                            // 手机号信息
                            if (obj.zaOnline) {
                                list.online = obj.zaOnline
                            } else {
                                list.online = '/';
                            }
                            if (obj.mobileLand !== "null") {
                                var json = JSON.parse(obj.mobileLand);
                                list.province = json.province;
                                list.city = json.city;
                                list.company = json.company;
                            } else {
                                list.province = "/";
                                list.city = "/";
                                list.company = "/";
                            }
                            var temp = require("./communicationTrack.handlebars");
                            $("#reportBox").append(temp(list));
                            // 特殊关系
                            console.log(obj.specialList)
                            var json = JSON.parse(obj.specialList);
                            if (obj.specialList !== "null" && obj !== 0 && obj !== '') {
                                var temp = require("./specialRelationship.handlebars");
                                $("#reportBox").append(temp(json));
                            } else {
                                var temp = require("./specialRelationship.handlebars");
                                $("#reportBox").append(temp());
                            }

                            // 个人工商报告
                            if (obj.commerceLaw) {
                                var icbc = require("./personalIcbc.handlebars");
                                var arr = JSON.parse(obj.commerceLaw);
                                $("#reportBox").append(icbc(arr.corporateInfo));
                                var icbc = require("./personalIcbc1.handlebars");
                                $("#reportBox").append(icbc(arr.managerInfo));
                                var icbc = require("./personalIcbc2.handlebars");
                                $("#reportBox").append(icbc(arr.shareholderInfo));
                            } else {
                                var icbc = require("./personalIcbc.handlebars");
                                $("#reportBox").append(icbc());
                                var icbc = require("./personalIcbc1.handlebars");
                                $("#reportBox").append(icbc());
                                var icbc = require("./personalIcbc2.handlebars");
                                $("#reportBox").append(icbc());
                            }
                            // 芝麻信息
                            var zhima = require("./zhimaCredit.handlebars");
                            // var arr = JSON.parse(obj.zhima);
                            // console.log(arr)
                            // var list = {};
                            // list.zhima = arr;
                            // list.antiVerify = obj.antiVerify ? obj.antiVerify : "查无数据";
                            // list.antiRisk = obj.antiRisk ? obj.antiRisk : "查无数据";
                            $("#reportBox").append(zhima());
                        } else {
                            var temp = require("./communicationTrack.handlebars");
                            $("#reportBox").append(temp());
                            var icbc = require("./personalIcbc.handlebars");
                            $("#reportBox").append(icbc());
                            var icbc = require("./personalIcbc1.handlebars");
                            $("#reportBox").append(icbc());
                            var icbc = require("./personalIcbc2.handlebars");
                            $("#reportBox").append(icbc());
                            var zhima = require("./zhimaCredit.handlebars");
                            $("#reportBox").append(zhima());
                        }
                    } else {
                        tools.tusi(data.erro);
                    }
                },
                error: function(data) {
                    if (data.statusText == "timeout") {
                        tools.tusi("网络连接失败，请重试~");
                    } else {
                        tools.tusi("系统出错了");
                    }
                }
            });
        },
        //加载完整报告
        getPlScan1: function() {
            var self = this;
            self.getTotalReport();
            self.getRiskReport();
            self.getClBehavior();
            self.getBadBehavior();
            self.getConsumeBehavior();
            self.getPlScan();
            self.getCommunicationTrack();
        },
        initEvents: function() {
            var self = this;
        }
    };
    main.init();
});