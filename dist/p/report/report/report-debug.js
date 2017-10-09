define("xg/eid-company/1.0.4/p/report/report/report-debug", ["jquery/jquery/1.10.1/jquery-debug", "xg/eid-company/1.0.4/", "xg/eid-company/1.0.4/p/report/report/queryRecord-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/riskReport-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/plscan1-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/plscan2-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/plscan3-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/clBehavior-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/badBehavior-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/zxgg-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/zxgg1-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/sxgg-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/fygg-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/cpws-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/bgtxx-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/ktgg-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/ajlc-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/wdhmd-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/communicationTrack-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/specialRelationship-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/personalIcbc-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/personalIcbc1-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/personalIcbc2-debug.handlebars", "xg/eid-company/1.0.4/p/report/report/zhimaCredit-debug.handlebars"], function(require, exports, module) {
    var $ = require("jquery/jquery/1.10.1/jquery-debug"),
        tools = require("xg/eid-company/1.0.4/");
    require("xg/eid-company/1.0.4/");
    var main = {
        init: function() {
            var self = this;
            self.url = {
                plScan: "/cycle/new/credit/detail/queryFinancial.json",
                communicationTrack: "/cycle/new/credit/detail/queryOtherInfo.json"
            };
            self.type = tools.getUrlParam("type");
            self.data = {
                encryptKey: tools.getUrlParam("encryptKey"),
                flag: 3
            };
            if (self.type == "plScan") {
                self.getPlScan()
            } else if (self.type == "clBehavior") {
                self.getClBehavior()
            } else if (self.type == "badBehavior") {
                self.getBadBehavior()
            } else if (self.type == "communicationTrack") {
                self.getCommunicationTrack()
            } else if (self.type == "consumeBehavior") {
                self.getConsumeBehavior()
            } else if (self.type == "fullReport") {
                self.getPlScan1()
            }
            self.initEvents()
        },
        setTitleColorFull: function(titleDiv, color) {
            if (color == "red") {
                titleDiv.addClass("titleIconRed")
            } else if (color == "yellow") {
                titleDiv.addClass("titleIconYellow")
            } else if (color == "green") {
                titleDiv.addClass("titleIconGreen")
            }
        },
        setTitleColor: function(titleDiv) {
            var color = window.localStorage.color;
            if (color == "red") {
                titleDiv.addClass("titleIconRed")
            } else if (color == "yellow") {
                titleDiv.addClass("titleIconYellow")
            } else if (color == "green") {
                titleDiv.addClass("titleIconGreen")
            }
        },
        getTotalReport: function() {
            var self = this;
            $.ajax({
                data: {
                    encryptKey: tools.getUrlParam("encryptKey")
                },
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryInfoTotal.json",
                async: false,
                success: function(data) {
                    if (data.code === 0) {
                        var list = data.obj;
                        var maxArr = [];
                        for (var key in list) {
                            maxArr.push(parseInt(list[key]))
                        }
                        max = Math.max.apply(Math, maxArr)
                    } else {
                        tools.tusi(data.error)
                    }
                }
            });
            $.ajax({
                data: {
                    encryptKey: tools.getUrlParam("encryptKey")
                },
                cache: false,
                type: "post",
                url: "/cycle/credit/detail/queryRecord.json",
                async: false,
                success: function(data) {
                    var obj = data.obj;
                    if (data.code === 0) {
                        if (obj) {
                            obj.max = max;
                            var temp = require("xg/eid-company/1.0.4/p/report/report/queryRecord-debug.handlebars");
                            $("#reportBox").append(temp(obj))
                        } else {
                            var temp = require("xg/eid-company/1.0.4/p/report/report/queryRecord-debug.handlebars");
                            $("#reportBox").append(temp())
                        }
                    } else {
                        tools.tusi(data.error)
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
        getRiskReport: function() {
            var self = this;
            $.ajax({
                data: {
                    encryptKey: tools.getUrlParam("encryptKey")
                },
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryInfoTotal.json",
                async: false,
                success: function(data) {
                    if (data.code === 0) {
                        var obj = data.obj;
                        if (obj) {
                            var temp = require("xg/eid-company/1.0.4/p/report/report/riskReport-debug.handlebars");
                            $("#reportBox").append(temp(obj))
                        } else {
                            var temp = require("xg/eid-company/1.0.4/p/report/report/riskReport-debug.handlebars");
                            $("#reportBox").append(temp())
                        }
                    } else {
                        tools.tusi(data.error)
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
                        console.log(obj);
                        if (obj) {
                            var temp1 = require("xg/eid-company/1.0.4/p/report/report/plscan1-debug.handlebars");
                            $("#reportBox").append(temp1(obj["贷款申请信息"]));
                            var temp2 = require("xg/eid-company/1.0.4/p/report/report/plscan2-debug.handlebars");
                            $("#reportBox").append(temp2(obj["贷款放款信息"]));
                            var Obj = obj["信贷不良信息"];
                            var temp3 = require("xg/eid-company/1.0.4/p/report/report/plscan3-debug.handlebars");
                            var list = {
                                keys: [],
                                values: []
                            };
                            for (var key in Obj) {
                                list.keys.push(key);
                                list.values.push(Obj[key])
                            }
                            $("#reportBox").append(temp3(list))
                        } else {
                            var temp1 = require("xg/eid-company/1.0.4/p/report/report/plscan1-debug.handlebars");
                            var temp2 = require("xg/eid-company/1.0.4/p/report/report/plscan2-debug.handlebars");
                            var temp3 = require("xg/eid-company/1.0.4/p/report/report/plscan3-debug.handlebars");
                            $("#reportBox").append(temp1());
                            $("#reportBox").append(temp2());
                            $("#reportBox").append(temp3())
                        }
                    } else {
                        tools.tusi(data.error)
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
                            var temp = require("xg/eid-company/1.0.4/p/report/report/clBehavior-debug.handlebars");
                            $("#reportBox").append(temp(obj))
                        } else {
                            var temp = require("xg/eid-company/1.0.4/p/report/report/clBehavior-debug.handlebars");
                            $("#reportBox").append(temp())
                        }
                    } else {
                        tools.tusi(data.error)
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
                data: self.data,
                cache: false,
                type: "post",
                url: "/cycle/new/credit/detail/queryPolice.json",
                async: false,
                success: function(data) {
                    if (data.code === 0) {
                        var obj = data.obj;
                        if (obj) {
                            var temp = require("xg/eid-company/1.0.4/p/report/report/badBehavior-debug.handlebars");
                            $("#reportBox").append(temp(obj.police))
                        } else {
                            var temp = require("xg/eid-company/1.0.4/p/report/report/badBehavior-debug.handlebars");
                            $("#reportBox").append(temp())
                        }
                    } else {
                        tools.tusi(data.error)
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
                        var temp = require("xg/eid-company/1.0.4/p/report/report/zxgg-debug.handlebars");
                        console.log(data.list);
                        var arr = [];
                        $("#reportBox").append(temp(data.list));
                        self.getRenfa()
                    } else {
                        tools.tusi("系统出错了")
                    }
                }
            })
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
                        var temp = require("xg/eid-company/1.0.4/p/report/report/zxgg1-debug.handlebars");
                        if (obj.zxgg) {
                            console.log(obj.zxgg);
                            $("#reportBox").append(temp(obj.zxgg))
                        } else {
                            $("#reportBox").append(temp())
                        }
                        var temp = require("xg/eid-company/1.0.4/p/report/report/sxgg-debug.handlebars");
                        if (obj.shixin) {
                            $("#reportBox").append(temp(obj.shixin))
                        } else {
                            $("#reportBox").append(temp())
                        }
                        var temp = require("xg/eid-company/1.0.4/p/report/report/fygg-debug.handlebars");
                        if (obj.fygg) {
                            $("#reportBox").append(temp(obj.fygg))
                        } else {
                            $("#reportBox").append(temp())
                        }
                        var temp = require("xg/eid-company/1.0.4/p/report/report/cpws-debug.handlebars");
                        if (obj.cpws) {
                            $("#reportBox").append(temp(obj.cpws))
                        } else {
                            $("#reportBox").append(temp())
                        }
                        var temp = require("xg/eid-company/1.0.4/p/report/report/bgtxx-debug.handlebars");
                        if (obj.bgt) {
                            $("#reportBox").append(temp(obj.bgt))
                        } else {
                            $("#reportBox").append(temp())
                        }
                        var temp = require("xg/eid-company/1.0.4/p/report/report/ktgg-debug.handlebars");
                        if (obj.ktgg) {
                            $("#reportBox").append(temp(obj.ktgg))
                        } else {
                            $("#reportBox").append(temp())
                        }
                        var temp = require("xg/eid-company/1.0.4/p/report/report/ajlc-debug.handlebars");
                        if (obj.ajlc) {
                            $("#reportBox").append(temp(obj.ajlc))
                        } else {
                            $("#reportBox").append(temp())
                        }
                        var temp = require("xg/eid-company/1.0.4/p/report/report/wdhmd-debug.handlebars");
                        if (obj.wdhmd) {
                            $("#reportBox").append(temp(obj.wdhmd))
                        } else {
                            $("#reportBox").append(temp())
                        }
                    } else {
                        var temp = require("xg/eid-company/1.0.4/p/report/report/zxgg1-debug.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("xg/eid-company/1.0.4/p/report/report/sxgg-debug.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("xg/eid-company/1.0.4/p/report/report/fygg-debug.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("xg/eid-company/1.0.4/p/report/report/cpws-debug.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("xg/eid-company/1.0.4/p/report/report/bgtxx-debug.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("xg/eid-company/1.0.4/p/report/report/ktgg-debug.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("xg/eid-company/1.0.4/p/report/report/ajlc-debug.handlebars");
                        $("#reportBox").append(temp());
                        var temp = require("xg/eid-company/1.0.4/p/report/report/wdhmd-debug.handlebars");
                        $("#reportBox").append(temp())
                    }
                }
            })
        },
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
                    console.log(obj);
                    if (data.code === 0) {
                        if (obj) {
                            console.log(obj);
                            var list = {};
                            console.log(obj);
                            if (obj.zaOnline) {
                                list.online = obj.zaOnline
                            } else {
                                list.online = "/"
                            }
                            if (obj.mobileLand !== "null") {
                                var json = JSON.parse(obj.mobileLand);
                                list.province = json.province;
                                list.city = json.city;
                                list.company = json.company
                            } else {
                                list.province = "/";
                                list.city = "/";
                                list.company = "/"
                            }
                            var temp = require("xg/eid-company/1.0.4/p/report/report/communicationTrack-debug.handlebars");
                            $("#reportBox").append(temp(list));
                            console.log(obj.specialList);
                            var json = JSON.parse(obj.specialList);
                            if (obj.specialList !== "null" && obj !== 0 && obj !== "") {
                                var temp = require("xg/eid-company/1.0.4/p/report/report/specialRelationship-debug.handlebars");
                                $("#reportBox").append(temp(json))
                            } else {
                                var temp = require("xg/eid-company/1.0.4/p/report/report/specialRelationship-debug.handlebars");
                                $("#reportBox").append(temp())
                            }
                            if (obj.commerceLaw) {
                                var icbc = require("xg/eid-company/1.0.4/p/report/report/personalIcbc-debug.handlebars");
                                var arr = JSON.parse(obj.commerceLaw);
                                $("#reportBox").append(icbc(arr.corporateInfo));
                                var icbc = require("xg/eid-company/1.0.4/p/report/report/personalIcbc1-debug.handlebars");
                                $("#reportBox").append(icbc(arr.managerInfo));
                                var icbc = require("xg/eid-company/1.0.4/p/report/report/personalIcbc2-debug.handlebars");
                                $("#reportBox").append(icbc(arr.shareholderInfo))
                            } else {
                                var icbc = require("xg/eid-company/1.0.4/p/report/report/personalIcbc-debug.handlebars");
                                $("#reportBox").append(icbc());
                                var icbc = require("xg/eid-company/1.0.4/p/report/report/personalIcbc1-debug.handlebars");
                                $("#reportBox").append(icbc());
                                var icbc = require("xg/eid-company/1.0.4/p/report/report/personalIcbc2-debug.handlebars");
                                $("#reportBox").append(icbc())
                            }
                            var zhima = require("xg/eid-company/1.0.4/p/report/report/zhimaCredit-debug.handlebars");
                            $("#reportBox").append(zhima())
                        } else {
                            var temp = require("xg/eid-company/1.0.4/p/report/report/communicationTrack-debug.handlebars");
                            $("#reportBox").append(temp());
                            var icbc = require("xg/eid-company/1.0.4/p/report/report/personalIcbc-debug.handlebars");
                            $("#reportBox").append(icbc());
                            var icbc = require("xg/eid-company/1.0.4/p/report/report/personalIcbc1-debug.handlebars");
                            $("#reportBox").append(icbc());
                            var icbc = require("xg/eid-company/1.0.4/p/report/report/personalIcbc2-debug.handlebars");
                            $("#reportBox").append(icbc());
                            var zhima = require("xg/eid-company/1.0.4/p/report/report/zhimaCredit-debug.handlebars");
                            $("#reportBox").append(zhima())
                        }
                    } else {
                        tools.tusi(data.erro)
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
        getPlScan1: function() {
            var self = this;
            self.getTotalReport();
            self.getRiskReport();
            self.getClBehavior();
            self.getBadBehavior();
            self.getConsumeBehavior();
            self.getPlScan();
            self.getCommunicationTrack()
        },
        initEvents: function() {
            var self = this
        }
    };
    main.init()
});
define("xg/eid-company/1.0.4/p/report/report/queryRecord-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/94196af2166944470261b4926e7aab80-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program3(depth0, data) {
            return '\r\n    <img src="http://static.hpbanking.com/xg/uploads/files/1828e0372555fc87ab86752ee310dd81-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program5(depth0, data) {
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/e0f2c0db696f1870316139f8ac17a294-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n\r\n'
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1;
            buffer += " ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(8, program8, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        ";
            return buffer
        }

        function program8(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.address, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.formatDateFull || depth0 && depth0.formatDateFull, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.time, options) : helperMissing.call(depth0, "formatDateFull", depth0 && depth0.time, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program10(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;">身份标识报告</h2>\r\n';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 1, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 1, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 3, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 3, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td colspan="3">身份标识报告查询汇总（近三个月）</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td >查询机构地点</td>\r\n            <td >查询时间</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(10, program10, data),
            fn: self.program(7, program7, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/riskReport-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">身份信息核验</td>\r\n            <td >被查询人三要素及人脸校验</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">公安负面信息</td>\r\n            <td >被查询人命中公安负面信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">法院涉诉信息</td>\r\n            <td >被查询人命中法院涉诉信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;" rowspan="3">金融信贷信息</td>\r\n            <td >被查询人存在多次申请信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td >被查询人存在多头借贷信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td >被查询人命中信贷不良信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;" rowspan="2">其他综合信息</td>\r\n            <td >被查询人手机号</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n         <tr>\r\n            <td >特殊名单核查</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n            </td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            return "\r\n                <div class=\"level-green\"></div><div class='green-span'>绿</div>\r\n                "
        }

        function program4(depth0, data) {
            return "\r\n                <div class=\"level-yellow\"></div><div class='yellow-span'>黄</div>\r\n                "
        }

        function program6(depth0, data) {
            return "\r\n                <div class=\"level-red\"></div><div class='red-span'>红</div>\r\n                "
        }

        function program8(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td class="title-bold" colspan="3">身份风险汇总</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">风险类型</td>\r\n            <td >规则</td>\r\n            <td >风险等级</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(8, program8, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n    <p style="margin:20px;font-size:18px;color:#242424;line-height:30px;">说明：汇总信息由相应规则组成</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.bankType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.bankType, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.platformcode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.platformcode, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.applicationtime, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.applicationtime, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.applicationamount, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.applicationamount, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += ' <h2 class="text-c mt50" style="font-size:40px;">金融/信贷信息</h2>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">贷款申请信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table> ";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

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
                stack1, helper;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>';
            if (helper = helpers.bankType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.bankType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.platformcode) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.platformcode;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.loanlenderstime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.loanlenderstime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.loanlendersamount) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.loanlendersamount;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">贷款放款信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        \r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan3-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

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
                stack1;
            buffer += '\r\n        <tr class="text-c">\r\n            ';
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "";
            buffer += "\r\n            <td>" + escapeExpression(typeof depth0 === functionType ? depth0.apply(depth0) : depth0) + "</td>\r\n            ";
            return buffer
        }

        function program5(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += ' <table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">信贷不良信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(5, program5, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<h4 style="margin:20px;font-size:18px;color:#242424;">说明：金融/信贷信息数据包含银行、P2P、小贷、消费类分期、现金类分期以及非银行其他。</h4>\r\n \r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/clBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名-身份证校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n         <tr>\r\n            <td style="width: 400px">身份证-人脸校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndFace) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndFace;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<div class="title overflowHidden mt50" id="clBehavior">\r\n    <div class="text-c" id="reportTitle" style="font-size:40px;">身份核验信息</div> <!--titleIconOrange-->\r\n</div>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">身份信息核验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">手机三要素校验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名+身份证+手机</td>\r\n            <td style="width: 600px" class="report-content">';
        if (helper = helpers.three) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.three;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<div style="margin:20px;font-size:18px;color:#242424; line-height:30px;">\r\n    说明：身份核验通过人脸算法比对权威机构数据，校验得出，包含全国数据。\r\n</div>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/badBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseSource, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseSource, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseTime, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseTime, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;">公安负面信息</h2>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td >案件来源</td>\r\n            <td >案件类别</td>\r\n            <td >案发区间</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/zxgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:100px;">执行公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[0], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[0], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">失信公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[1], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[1], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">曝光台</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[4], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[4], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">法院公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[2], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[2], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:100px;">开庭公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[5], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[5], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">案件流程</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[6], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[6], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">裁判文书</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[3], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[3], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">网贷黑名单</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[7], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[7], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + "</td>\r\n        </tr>\r\n         ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;margin-bottom:40px;">法院涉诉信息</h2>\r\n<table class="consumeBehavior">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="8">法院信息汇总</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/zxgg1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>执行法院</td>\r\n            <td>执行申请人</td>\r\n            <td>被执行人姓名</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.proposer, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.proposer, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>执行案号</td>\r\n            <td>案件状态</td>\r\n            <td>执行标的</td>\r\n            <td>被执行人身份证号</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseState, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseState, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.execMoney, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.execMoney, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.idcardNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.idcardNo, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案件概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">执行公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/sxgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td >立案时间</td>\r\n            <td >被执行人姓名</td>\r\n            <td >被执行人身份证号</td>\r\n            <td >被执行人履行情况</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.idcardNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.idcardNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lxqk, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.lxqk, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>执行案号</td>\r\n            <td>执行法院</td>\r\n            <td>执行依据文号</td>\r\n            <td>做出执行依据单位</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yjCode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yjCode, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yjdw, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yjdw, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案件概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">失信公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/fygg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="5" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>姓名</td>\r\n            <td >发布时间</td>\r\n            <td >法院名称</td>\r\n            <td >公告类型</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.pname) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.pname;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.sortTimeString) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.sortTimeString;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.court) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.court;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.ggType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.ggType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >公告版面</td>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan="4">内容概要</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.layout) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.layout;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + '</td>\r\n            <td colspan="4" class="report-content">';
            if (helper = helpers.body) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.body;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="5">法院公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/cpws-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>审结时间</td>\r\n            <td>文书类型</td>\r\n            <td>审理程序</td>\r\n            <td>法院名称</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.trialProcedure, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.trialProcedure, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案号</td>\r\n            <td>案由</td>\r\n            <td>判决结果</td>\r\n            <td>依据</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.judgeResult, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.judgeResult, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yiju, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yiju, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td class="report-content" colspan=\'3\'>' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td class=\"report-content\" colspan='3'>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">裁判文书</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/bgtxx-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>法院名称</td>\r\n            <td>案由</td>\r\n            <td colspan="2">当事人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td colspan="2" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n        </tr>\r\n         <tr>\r\n            <td>案号</td>\r\n            <td>依据</td>\r\n            <td>标的金额</td>\r\n            <td>申请人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yiju, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yiju, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.execMoney, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.execMoney, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.proposer, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.proposer, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'4\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='4' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="5">曝光台</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/ktgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>开庭时间</td>\r\n            <td>原告</td>\r\n            <td>被告</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.plaintiff, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.plaintiff, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.defendant, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.defendant, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>法院名称</td>\r\n            <td>案号</td>\r\n            <td>案由</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'2\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容摘要</td>\r\n            <td colspan='2' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">开庭公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/ajlc-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="7" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>案件类型</td>\r\n            <td>判决日期</td>\r\n            <td class="match-level">匹配度</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sentencingDate, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sentencingDate, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >案件状态</td>\r\n            <td >法院名称</td>\r\n            <td >审理状态</td>\r\n            <td >审理程序</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseStatus, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.ajlcStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.ajlcStatus, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.trialProcedure, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.trialProcedure, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >案由</td>\r\n            <td >案号</td>\r\n            <td >诉讼标的</td>\r\n            <td >当事人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.actionObject, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.actionObject, options))) + '</td>.\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">案件流程</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/wdhmd-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td >贷款时间</td>\r\n            <td >姓名</td>\r\n            <td >执行法院</td>\r\n            <td >来源单位名称</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sourceName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sourceName, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>未还/罚息</td>\r\n            <td>本金/本息</td>\r\n            <td>案号</td>\r\n            <td>已还金额</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.whfx, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.whfx, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.bjbx, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.bjbx, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCode, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yhje, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yhje, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">网贷黑名单</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/communicationTrack-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += ' \r\n        <tr class="text-c">\r\n            <td class="report-content">';
            if (helper = helpers.online) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.online;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.province) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.province;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.city, {
                hash: {},
                inverse: self.program(4, program4, data),
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            <td class="report-content">';
            if (helper = helpers.company) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.company;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>    \r\n        </tr>\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += ' <td class="report-content">';
            if (helper = helpers.city) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.city;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            return buffer
        }

        function program4(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <td class="report-content">';
            if (helper = helpers.province) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.province;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            return buffer
        }

        function program6(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c" style="font-size:40px;margin-top:54px;">其他综合信息</h2>\r\n<h3 class="text-c title-bold">手机号信息</h3>\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td>手机在网时长</td>\r\n            <td>手机号归属省份</td>\r\n            <td>手机号归属城市</td>\r\n            <td>手机号所属运营商</td>\r\n            \r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(6, program6, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n<br>\r\n<p style="margin-bottom:10px;margin-left:20px;font-size:18px;color:#242424;line-height:30px;">说明：手机信息覆盖全国范围，移动、联通、电信三家运营商数据。</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/specialRelationship-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.flag) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.flag;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.content) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.content;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr> ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h3 class="text-c title-bold">特殊名单核查</h3>\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td>序号</td>\r\n            <td>关系等级</td>\r\n            <td>命中内容</td>\r\n            \r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n<br>\r\n<p style="margin-bottom:10px;margin-left:20px;font-size:18px;color:#242424;line-height:30px;">说明：<br>\r\n    1、一度关系：EID关系库中与本人有直接关联的人，一般是直系亲属、关系紧密的朋友；二度关系：EID关系库中与一度关系有直接关系的人。<br>\r\n    2、风险类型：高危行为、电信欠费、法院失信人、不良、短时逾期、资信不佳、失联、拒绝。高危行为：申请信息中身份证号关联多个（>3个）手机号、或手机号关联多个（>3个）身份证号；不良：逾期90天以上未还；短时逾期：逾期30/60/90天内未还；拒绝：因某些原因判定为不良而拒绝的；资信不佳：提供的申请资料未达到准入标准、信息被伪冒。<br>\r\n    3、客户类型：银行、非银：P2P、小贷、消费类分期、现金类分期、代偿类分期、其他（信保、信托等）。消费类分期：借贷用于购买消费品并分期偿还的业务；现金类分期：支取现金并分期偿还的业务；代偿类分期：借贷用于偿还已有借款并分期偿还的业务；非银其他：包括担保、信保等。\r\n</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h3 class="text-c">个人工商信息汇总</h3>\r\n<table class="record mt40"  style="margin-bottom:20px;">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人担任法定代表人信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>担任职位</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.position, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.position, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人担任企业高管信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资额（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.subConam, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.subConam, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.currency, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.currency, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资比例</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.fundedRatio, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.fundedRatio, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资方式</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.conFrom, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.conFrom, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人股权投资信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/zhimaCredit-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<p style="margin-left:20px;font-size:18px;color:#242424;line-height:30px;">\r\n阅读须知：<br>\r\n1.本报告的著作权属于杭州信鸽金融信息股份有限公司（简称“信鸽金服”），未经书面许可，不得擅自复制、摘录、编辑、转载、披露和发表。<br>\r\n2.使用本报告，需经过被查询人授权，信鸽金服不承担因授权不充分引起的任何法律责任。<br>\r\n3.本报告中，除信鸽金服的特殊标注外，报告中的信息均由相关数据来源机构和信息主体提供，信鸽金服不保证其真实性和准确性，但承诺在信息整合、汇总、展示的过程中保持客观、中立的地位。<br>\r\n4.本报告反馈的结果仅供参考，对于使用该结果做出的决策导致的后果，信鸽金服不承担任何责任。<br>\r\n5.仅限内部使用，请妥善保管本报告，并注意保密。\r\n</p>\r\n'
    })
});
define("xg/eid-company/1.0.4/p/report/report/queryRecord-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/94196af2166944470261b4926e7aab80-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program3(depth0, data) {
            return '\r\n    <img src="http://static.hpbanking.com/xg/uploads/files/1828e0372555fc87ab86752ee310dd81-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program5(depth0, data) {
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/e0f2c0db696f1870316139f8ac17a294-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n\r\n'
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1;
            buffer += " ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(8, program8, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        ";
            return buffer
        }

        function program8(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.address, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.formatDateFull || depth0 && depth0.formatDateFull, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.time, options) : helperMissing.call(depth0, "formatDateFull", depth0 && depth0.time, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program10(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;">身份标识报告</h2>\r\n';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 1, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 1, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 3, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 3, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td colspan="3">身份标识报告查询汇总（近三个月）</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td >查询机构地点</td>\r\n            <td >查询时间</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(10, program10, data),
            fn: self.program(7, program7, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/riskReport-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">身份信息核验</td>\r\n            <td >被查询人三要素及人脸校验</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">公安负面信息</td>\r\n            <td >被查询人命中公安负面信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">法院涉诉信息</td>\r\n            <td >被查询人命中法院涉诉信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;" rowspan="3">金融信贷信息</td>\r\n            <td >被查询人存在多次申请信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td >被查询人存在多头借贷信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td >被查询人命中信贷不良信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;" rowspan="2">其他综合信息</td>\r\n            <td >被查询人手机号</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n         <tr>\r\n            <td >特殊名单核查</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n            </td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            return "\r\n                <div class=\"level-green\"></div><div class='green-span'>绿</div>\r\n                "
        }

        function program4(depth0, data) {
            return "\r\n                <div class=\"level-yellow\"></div><div class='yellow-span'>黄</div>\r\n                "
        }

        function program6(depth0, data) {
            return "\r\n                <div class=\"level-red\"></div><div class='red-span'>红</div>\r\n                "
        }

        function program8(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td class="title-bold" colspan="3">身份风险汇总</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">风险类型</td>\r\n            <td >规则</td>\r\n            <td >风险等级</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(8, program8, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n    <p style="margin:20px;font-size:18px;color:#242424;line-height:30px;">说明：汇总信息由相应规则组成</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.bankType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.bankType, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.platformcode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.platformcode, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.applicationtime, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.applicationtime, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.applicationamount, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.applicationamount, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += ' <h2 class="text-c mt50" style="font-size:40px;">金融/信贷信息</h2>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">贷款申请信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table> ";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

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
                stack1, helper;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>';
            if (helper = helpers.bankType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.bankType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.platformcode) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.platformcode;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.loanlenderstime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.loanlenderstime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.loanlendersamount) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.loanlendersamount;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">贷款放款信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        \r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan3-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

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
                stack1;
            buffer += '\r\n        <tr class="text-c">\r\n            ';
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "";
            buffer += "\r\n            <td>" + escapeExpression(typeof depth0 === functionType ? depth0.apply(depth0) : depth0) + "</td>\r\n            ";
            return buffer
        }

        function program5(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += ' <table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">信贷不良信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(5, program5, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<h4 style="margin:20px;font-size:18px;color:#242424;">说明：金融/信贷信息数据包含银行、P2P、小贷、消费类分期、现金类分期以及非银行其他。</h4>\r\n \r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/clBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名-身份证校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n         <tr>\r\n            <td style="width: 400px">身份证-人脸校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndFace) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndFace;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<div class="title overflowHidden mt50" id="clBehavior">\r\n    <div class="text-c" id="reportTitle" style="font-size:40px;">身份核验信息</div> <!--titleIconOrange-->\r\n</div>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">身份信息核验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">手机三要素校验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名+身份证+手机</td>\r\n            <td style="width: 600px" class="report-content">';
        if (helper = helpers.three) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.three;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<div style="margin:20px;font-size:18px;color:#242424; line-height:30px;">\r\n    说明：身份核验通过人脸算法比对权威机构数据，校验得出，包含全国数据。\r\n</div>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/badBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseSource, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseSource, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseTime, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseTime, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;">公安负面信息</h2>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td >案件来源</td>\r\n            <td >案件类别</td>\r\n            <td >案发区间</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/zxgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:100px;">执行公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[0], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[0], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">失信公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[1], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[1], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">曝光台</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[4], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[4], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">法院公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[2], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[2], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:100px;">开庭公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[5], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[5], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">案件流程</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[6], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[6], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">裁判文书</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[3], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[3], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">网贷黑名单</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[7], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[7], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + "</td>\r\n        </tr>\r\n         ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;margin-bottom:40px;">法院涉诉信息</h2>\r\n<table class="consumeBehavior">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="8">法院信息汇总</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/zxgg1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>执行法院</td>\r\n            <td>执行申请人</td>\r\n            <td>被执行人姓名</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.proposer, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.proposer, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>执行案号</td>\r\n            <td>案件状态</td>\r\n            <td>执行标的</td>\r\n            <td>被执行人身份证号</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseState, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseState, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.execMoney, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.execMoney, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.idcardNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.idcardNo, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案件概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">执行公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/sxgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td >立案时间</td>\r\n            <td >被执行人姓名</td>\r\n            <td >被执行人身份证号</td>\r\n            <td >被执行人履行情况</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.idcardNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.idcardNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lxqk, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.lxqk, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>执行案号</td>\r\n            <td>执行法院</td>\r\n            <td>执行依据文号</td>\r\n            <td>做出执行依据单位</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yjCode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yjCode, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yjdw, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yjdw, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案件概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">失信公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/fygg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="5" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>姓名</td>\r\n            <td >发布时间</td>\r\n            <td >法院名称</td>\r\n            <td >公告类型</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.pname) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.pname;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.sortTimeString) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.sortTimeString;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.court) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.court;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.ggType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.ggType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >公告版面</td>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan="4">内容概要</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.layout) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.layout;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + '</td>\r\n            <td colspan="4" class="report-content">';
            if (helper = helpers.body) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.body;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="5">法院公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/cpws-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>审结时间</td>\r\n            <td>文书类型</td>\r\n            <td>审理程序</td>\r\n            <td>法院名称</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.trialProcedure, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.trialProcedure, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案号</td>\r\n            <td>案由</td>\r\n            <td>判决结果</td>\r\n            <td>依据</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.judgeResult, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.judgeResult, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yiju, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yiju, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td class="report-content" colspan=\'3\'>' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td class=\"report-content\" colspan='3'>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">裁判文书</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/bgtxx-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>法院名称</td>\r\n            <td>案由</td>\r\n            <td colspan="2">当事人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td colspan="2" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n        </tr>\r\n         <tr>\r\n            <td>案号</td>\r\n            <td>依据</td>\r\n            <td>标的金额</td>\r\n            <td>申请人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yiju, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yiju, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.execMoney, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.execMoney, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.proposer, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.proposer, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'4\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='4' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="5">曝光台</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/ktgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>开庭时间</td>\r\n            <td>原告</td>\r\n            <td>被告</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.plaintiff, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.plaintiff, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.defendant, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.defendant, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>法院名称</td>\r\n            <td>案号</td>\r\n            <td>案由</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'2\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容摘要</td>\r\n            <td colspan='2' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">开庭公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/ajlc-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="7" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>案件类型</td>\r\n            <td>判决日期</td>\r\n            <td class="match-level">匹配度</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sentencingDate, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sentencingDate, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >案件状态</td>\r\n            <td >法院名称</td>\r\n            <td >审理状态</td>\r\n            <td >审理程序</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseStatus, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.ajlcStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.ajlcStatus, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.trialProcedure, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.trialProcedure, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >案由</td>\r\n            <td >案号</td>\r\n            <td >诉讼标的</td>\r\n            <td >当事人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.actionObject, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.actionObject, options))) + '</td>.\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">案件流程</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/wdhmd-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td >贷款时间</td>\r\n            <td >姓名</td>\r\n            <td >执行法院</td>\r\n            <td >来源单位名称</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sourceName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sourceName, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>未还/罚息</td>\r\n            <td>本金/本息</td>\r\n            <td>案号</td>\r\n            <td>已还金额</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.whfx, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.whfx, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.bjbx, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.bjbx, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCode, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yhje, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yhje, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">网贷黑名单</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/communicationTrack-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += ' \r\n        <tr class="text-c">\r\n            <td class="report-content">';
            if (helper = helpers.online) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.online;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.province) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.province;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.city, {
                hash: {},
                inverse: self.program(4, program4, data),
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            <td class="report-content">';
            if (helper = helpers.company) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.company;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>    \r\n        </tr>\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += ' <td class="report-content">';
            if (helper = helpers.city) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.city;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            return buffer
        }

        function program4(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <td class="report-content">';
            if (helper = helpers.province) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.province;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            return buffer
        }

        function program6(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c" style="font-size:40px;margin-top:54px;">其他综合信息</h2>\r\n<h3 class="text-c title-bold">手机号信息</h3>\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td>手机在网时长</td>\r\n            <td>手机号归属省份</td>\r\n            <td>手机号归属城市</td>\r\n            <td>手机号所属运营商</td>\r\n            \r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(6, program6, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n<br>\r\n<p style="margin-bottom:10px;margin-left:20px;font-size:18px;color:#242424;line-height:30px;">说明：手机信息覆盖全国范围，移动、联通、电信三家运营商数据。</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/specialRelationship-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.flag) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.flag;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.content) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.content;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr> ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h3 class="text-c title-bold">特殊名单核查</h3>\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td>序号</td>\r\n            <td>关系等级</td>\r\n            <td>命中内容</td>\r\n            \r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n<br>\r\n<p style="margin-bottom:10px;margin-left:20px;font-size:18px;color:#242424;line-height:30px;">说明：<br>\r\n    1、一度关系：EID关系库中与本人有直接关联的人，一般是直系亲属、关系紧密的朋友；二度关系：EID关系库中与一度关系有直接关系的人。<br>\r\n    2、风险类型：高危行为、电信欠费、法院失信人、不良、短时逾期、资信不佳、失联、拒绝。高危行为：申请信息中身份证号关联多个（>3个）手机号、或手机号关联多个（>3个）身份证号；不良：逾期90天以上未还；短时逾期：逾期30/60/90天内未还；拒绝：因某些原因判定为不良而拒绝的；资信不佳：提供的申请资料未达到准入标准、信息被伪冒。<br>\r\n    3、客户类型：银行、非银：P2P、小贷、消费类分期、现金类分期、代偿类分期、其他（信保、信托等）。消费类分期：借贷用于购买消费品并分期偿还的业务；现金类分期：支取现金并分期偿还的业务；代偿类分期：借贷用于偿还已有借款并分期偿还的业务；非银其他：包括担保、信保等。\r\n</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h3 class="text-c">个人工商信息汇总</h3>\r\n<table class="record mt40"  style="margin-bottom:20px;">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人担任法定代表人信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>担任职位</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.position, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.position, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人担任企业高管信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资额（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.subConam, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.subConam, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.currency, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.currency, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资比例</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.fundedRatio, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.fundedRatio, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资方式</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.conFrom, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.conFrom, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人股权投资信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/zhimaCredit-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<p style="margin-left:20px;font-size:18px;color:#242424;line-height:30px;">\r\n阅读须知：<br>\r\n1.本报告的著作权属于杭州信鸽金融信息股份有限公司（简称“信鸽金服”），未经书面许可，不得擅自复制、摘录、编辑、转载、披露和发表。<br>\r\n2.使用本报告，需经过被查询人授权，信鸽金服不承担因授权不充分引起的任何法律责任。<br>\r\n3.本报告中，除信鸽金服的特殊标注外，报告中的信息均由相关数据来源机构和信息主体提供，信鸽金服不保证其真实性和准确性，但承诺在信息整合、汇总、展示的过程中保持客观、中立的地位。<br>\r\n4.本报告反馈的结果仅供参考，对于使用该结果做出的决策导致的后果，信鸽金服不承担任何责任。<br>\r\n5.仅限内部使用，请妥善保管本报告，并注意保密。\r\n</p>\r\n'
    })
});
define("xg/eid-company/1.0.4/p/report/report/queryRecord-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/94196af2166944470261b4926e7aab80-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program3(depth0, data) {
            return '\r\n    <img src="http://static.hpbanking.com/xg/uploads/files/1828e0372555fc87ab86752ee310dd81-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program5(depth0, data) {
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/e0f2c0db696f1870316139f8ac17a294-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n\r\n'
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1;
            buffer += " ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(8, program8, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        ";
            return buffer
        }

        function program8(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.address, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.formatDateFull || depth0 && depth0.formatDateFull, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.time, options) : helperMissing.call(depth0, "formatDateFull", depth0 && depth0.time, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program10(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;">身份标识报告</h2>\r\n';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 1, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 1, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 3, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 3, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td colspan="3">身份标识报告查询汇总（近三个月）</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td >查询机构地点</td>\r\n            <td >查询时间</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(10, program10, data),
            fn: self.program(7, program7, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/riskReport-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">身份信息核验</td>\r\n            <td >被查询人三要素及人脸校验</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.infoCheck, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.infoCheck, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">公安负面信息</td>\r\n            <td >被查询人命中公安负面信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.police, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.police, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">法院涉诉信息</td>\r\n            <td >被查询人命中法院涉诉信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.court, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;" rowspan="3">金融信贷信息</td>\r\n            <td >被查询人存在多次申请信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.apply, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.apply, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td >被查询人存在多头借贷信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lend, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.lend, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td >被查询人命中信贷不良信息</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.zaRisk, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.zaRisk, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;" rowspan="2">其他综合信息</td>\r\n            <td >被查询人手机号</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.mobileInfo, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.mobileInfo, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            </td>\r\n        </tr>\r\n         <tr>\r\n            <td >特殊名单核查</td>\r\n            <td class="level-block">\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "1", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "1", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(4, program4, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "2", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "2", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.special, "==", "3", options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.special, "==", "3", options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n            </td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            return "\r\n                <div class=\"level-green\"></div><div class='green-span'>绿</div>\r\n                "
        }

        function program4(depth0, data) {
            return "\r\n                <div class=\"level-yellow\"></div><div class='yellow-span'>黄</div>\r\n                "
        }

        function program6(depth0, data) {
            return "\r\n                <div class=\"level-red\"></div><div class='red-span'>红</div>\r\n                "
        }

        function program8(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td class="title-bold" colspan="3">身份风险汇总</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">风险类型</td>\r\n            <td >规则</td>\r\n            <td >风险等级</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(8, program8, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n    <p style="margin:20px;font-size:18px;color:#242424;line-height:30px;">说明：汇总信息由相应规则组成</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.bankType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.bankType, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.platformcode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.platformcode, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.applicationtime, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.applicationtime, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.applicationamount, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.applicationamount, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += ' <h2 class="text-c mt50" style="font-size:40px;">金融/信贷信息</h2>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">贷款申请信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table> ";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

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
                stack1, helper;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>';
            if (helper = helpers.bankType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.bankType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.platformcode) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.platformcode;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.loanlenderstime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.loanlenderstime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.loanlendersamount) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.loanlendersamount;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">贷款放款信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        \r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan3-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

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
                stack1;
            buffer += '\r\n        <tr class="text-c">\r\n            ';
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "";
            buffer += "\r\n            <td>" + escapeExpression(typeof depth0 === functionType ? depth0.apply(depth0) : depth0) + "</td>\r\n            ";
            return buffer
        }

        function program5(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += ' <table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">信贷不良信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(5, program5, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<h4 style="margin:20px;font-size:18px;color:#242424;">说明：金融/信贷信息数据包含银行、P2P、小贷、消费类分期、现金类分期以及非银行其他。</h4>\r\n \r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/clBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名-身份证校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n         <tr>\r\n            <td style="width: 400px">身份证-人脸校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndFace) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndFace;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<div class="title overflowHidden mt50" id="clBehavior">\r\n    <div class="text-c" id="reportTitle" style="font-size:40px;">身份核验信息</div> <!--titleIconOrange-->\r\n</div>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">身份信息核验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">手机三要素校验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名+身份证+手机</td>\r\n            <td style="width: 600px" class="report-content">';
        if (helper = helpers.three) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.three;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<div style="margin:20px;font-size:18px;color:#242424; line-height:30px;">\r\n    说明：身份核验通过人脸算法比对权威机构数据，校验得出，包含全国数据。\r\n</div>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/badBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseSource, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseSource, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseTime, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseTime, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;">公安负面信息</h2>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td >案件来源</td>\r\n            <td >案件类别</td>\r\n            <td >案发区间</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/zxgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:100px;">执行公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[0], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[0], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">失信公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[1], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[1], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">曝光台</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[4], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[4], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">法院公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[2], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[2], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:100px;">开庭公告</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[5], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[5], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">案件流程</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[6], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[6], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">裁判文书</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[3], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[3], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + '</td>\r\n            <td style="width:100px;">网贷黑名单</td>\r\n            <td style="width:120px;" class="report-content">' + escapeExpression((helper = helpers.substrNum || depth0 && depth0.substrNum, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, (stack1 = depth0 && depth0[7], stack1 == null || stack1 === false ? stack1 : stack1.context), options) : helperMissing.call(depth0, "substrNum", (stack1 = depth0 && depth0[7], stack1 == null || stack1 === false ? stack1 : stack1.context), options))) + "</td>\r\n        </tr>\r\n         ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;margin-bottom:40px;">法院涉诉信息</h2>\r\n<table class="consumeBehavior">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="8">法院信息汇总</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/zxgg1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>执行法院</td>\r\n            <td>执行申请人</td>\r\n            <td>被执行人姓名</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.proposer, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.proposer, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>执行案号</td>\r\n            <td>案件状态</td>\r\n            <td>执行标的</td>\r\n            <td>被执行人身份证号</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseState, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseState, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.execMoney, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.execMoney, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.idcardNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.idcardNo, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案件概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">执行公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/sxgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td >立案时间</td>\r\n            <td >被执行人姓名</td>\r\n            <td >被执行人身份证号</td>\r\n            <td >被执行人履行情况</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.idcardNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.idcardNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lxqk, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.lxqk, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>执行案号</td>\r\n            <td>执行法院</td>\r\n            <td>执行依据文号</td>\r\n            <td>做出执行依据单位</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yjCode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yjCode, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yjdw, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yjdw, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案件概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">失信公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/fygg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="5" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>姓名</td>\r\n            <td >发布时间</td>\r\n            <td >法院名称</td>\r\n            <td >公告类型</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.pname) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.pname;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.sortTimeString) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.sortTimeString;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.court) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.court;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.ggType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.ggType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >公告版面</td>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan="4">内容概要</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.layout) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.layout;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + '</td>\r\n            <td colspan="4" class="report-content">';
            if (helper = helpers.body) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.body;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="5">法院公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/cpws-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>审结时间</td>\r\n            <td>文书类型</td>\r\n            <td>审理程序</td>\r\n            <td>法院名称</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.trialProcedure, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.trialProcedure, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案号</td>\r\n            <td>案由</td>\r\n            <td>判决结果</td>\r\n            <td>依据</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.judgeResult, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.judgeResult, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yiju, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yiju, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td class="report-content" colspan=\'3\'>' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td class=\"report-content\" colspan='3'>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">裁判文书</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/bgtxx-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>法院名称</td>\r\n            <td>案由</td>\r\n            <td colspan="2">当事人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td colspan="2" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n        </tr>\r\n         <tr>\r\n            <td>案号</td>\r\n            <td>依据</td>\r\n            <td>标的金额</td>\r\n            <td>申请人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yiju, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yiju, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.execMoney, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.execMoney, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.proposer, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.proposer, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'4\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='4' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="5">曝光台</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/ktgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>开庭时间</td>\r\n            <td>原告</td>\r\n            <td>被告</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.plaintiff, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.plaintiff, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.defendant, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.defendant, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>法院名称</td>\r\n            <td>案号</td>\r\n            <td>案由</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'2\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容摘要</td>\r\n            <td colspan='2' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">开庭公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/ajlc-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="7" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>案件类型</td>\r\n            <td>判决日期</td>\r\n            <td class="match-level">匹配度</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sentencingDate, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sentencingDate, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >案件状态</td>\r\n            <td >法院名称</td>\r\n            <td >审理状态</td>\r\n            <td >审理程序</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseStatus, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.ajlcStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.ajlcStatus, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.trialProcedure, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.trialProcedure, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >案由</td>\r\n            <td >案号</td>\r\n            <td >诉讼标的</td>\r\n            <td >当事人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.actionObject, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.actionObject, options))) + '</td>.\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">案件流程</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/wdhmd-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td >贷款时间</td>\r\n            <td >姓名</td>\r\n            <td >执行法院</td>\r\n            <td >来源单位名称</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sourceName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sourceName, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>未还/罚息</td>\r\n            <td>本金/本息</td>\r\n            <td>案号</td>\r\n            <td>已还金额</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.whfx, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.whfx, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.bjbx, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.bjbx, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCode, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yhje, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yhje, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'3\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">网贷黑名单</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/communicationTrack-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += ' \r\n        <tr class="text-c">\r\n            <td class="report-content">';
            if (helper = helpers.online) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.online;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.province) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.province;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.city, {
                hash: {},
                inverse: self.program(4, program4, data),
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            <td class="report-content">';
            if (helper = helpers.company) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.company;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>    \r\n        </tr>\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += ' <td class="report-content">';
            if (helper = helpers.city) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.city;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            return buffer
        }

        function program4(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <td class="report-content">';
            if (helper = helpers.province) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.province;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            return buffer
        }

        function program6(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c" style="font-size:40px;margin-top:54px;">其他综合信息</h2>\r\n<h3 class="text-c title-bold">手机号信息</h3>\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td>手机在网时长</td>\r\n            <td>手机号归属省份</td>\r\n            <td>手机号归属城市</td>\r\n            <td>手机号所属运营商</td>\r\n            \r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(6, program6, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n<br>\r\n<p style="margin-bottom:10px;margin-left:20px;font-size:18px;color:#242424;line-height:30px;">说明：手机信息覆盖全国范围，移动、联通、电信三家运营商数据。</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/specialRelationship-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.flag) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.flag;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.content) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.content;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr> ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h3 class="text-c title-bold">特殊名单核查</h3>\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td>序号</td>\r\n            <td>关系等级</td>\r\n            <td>命中内容</td>\r\n            \r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n<br>\r\n<p style="margin-bottom:10px;margin-left:20px;font-size:18px;color:#242424;line-height:30px;">说明：<br>\r\n    1、一度关系：EID关系库中与本人有直接关联的人，一般是直系亲属、关系紧密的朋友；二度关系：EID关系库中与一度关系有直接关系的人。<br>\r\n    2、风险类型：高危行为、电信欠费、法院失信人、不良、短时逾期、资信不佳、失联、拒绝。高危行为：申请信息中身份证号关联多个（>3个）手机号、或手机号关联多个（>3个）身份证号；不良：逾期90天以上未还；短时逾期：逾期30/60/90天内未还；拒绝：因某些原因判定为不良而拒绝的；资信不佳：提供的申请资料未达到准入标准、信息被伪冒。<br>\r\n    3、客户类型：银行、非银：P2P、小贷、消费类分期、现金类分期、代偿类分期、其他（信保、信托等）。消费类分期：借贷用于购买消费品并分期偿还的业务；现金类分期：支取现金并分期偿还的业务；代偿类分期：借贷用于偿还已有借款并分期偿还的业务；非银其他：包括担保、信保等。\r\n</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h3 class="text-c">个人工商信息汇总</h3>\r\n<table class="record mt40"  style="margin-bottom:20px;">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人担任法定代表人信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>担任职位</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.position, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.position, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人担任企业高管信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资额（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.subConam, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.subConam, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.currency, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.currency, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资比例</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.fundedRatio, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.fundedRatio, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资方式</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.conFrom, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.conFrom, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人股权投资信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/zhimaCredit-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<p style="margin-left:20px;font-size:18px;color:#242424;line-height:30px;">\r\n阅读须知：<br>\r\n1.本报告的著作权属于杭州信鸽金融信息股份有限公司（简称“信鸽金服”），未经书面许可，不得擅自复制、摘录、编辑、转载、披露和发表。<br>\r\n2.使用本报告，需经过被查询人授权，信鸽金服不承担因授权不充分引起的任何法律责任。<br>\r\n3.本报告中，除信鸽金服的特殊标注外，报告中的信息均由相关数据来源机构和信息主体提供，信鸽金服不保证其真实性和准确性，但承诺在信息整合、汇总、展示的过程中保持客观、中立的地位。<br>\r\n4.本报告反馈的结果仅供参考，对于使用该结果做出的决策导致的后果，信鸽金服不承担任何责任。<br>\r\n5.仅限内部使用，请妥善保管本报告，并注意保密。\r\n</p>\r\n'
    })
});
define("xg/eid-company/1.0.4/p/report/report/queryRecord-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/94196af2166944470261b4926e7aab80-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program3(depth0, data) {
            return '\r\n    <img src="http://static.hpbanking.com/xg/uploads/files/1828e0372555fc87ab86752ee310dd81-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n'
        }

        function program5(depth0, data) {
            return '\r\n<img src="http://static.hpbanking.com/xg/uploads/files/e0f2c0db696f1870316139f8ac17a294-46-40.png" alt="" style="position: absolute; top: 22px;right:306px;">\r\n\r\n'
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1;
            buffer += " ";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(8, program8, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        ";
            return buffer
        }

        function program8(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.address, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.address, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.formatDateFull || depth0 && depth0.formatDateFull, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.time, options) : helperMissing.call(depth0, "formatDateFull", depth0 && depth0.time, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program10(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;">身份标识报告</h2>\r\n';
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 1, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 1, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(3, program3, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 2, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 2, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n\r\n";
        stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(5, program5, data),
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.max, "==", 3, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.max, "==", 3, options));
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td colspan="3">身份标识报告查询汇总（近三个月）</td>\r\n        </tr>\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td >查询机构地点</td>\r\n            <td >查询时间</td>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(10, program10, data),
            fn: self.program(7, program7, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.bankType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.bankType, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.platformcode, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.platformcode, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.applicationtime, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.applicationtime, options))) + "</td>\r\n            <td>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.applicationamount, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.applicationamount, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += ' <h2 class="text-c mt50" style="font-size:40px;">金融/信贷信息</h2>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">贷款申请信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table> ";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

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
                stack1, helper;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>';
            if (helper = helpers.bankType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.bankType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.platformcode) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.platformcode;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.loanlenderstime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.loanlenderstime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            <td>";
            if (helper = helpers.loanlendersamount) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.loanlendersamount;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">贷款放款信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        \r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/plscan3-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

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
                stack1;
            buffer += '\r\n        <tr class="text-c">\r\n            ';
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "";
            buffer += "\r\n            <td>" + escapeExpression(typeof depth0 === functionType ? depth0.apply(depth0) : depth0) + "</td>\r\n            ";
            return buffer
        }

        function program5(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += ' <table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="5">信贷不良信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(5, program5, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<h4 style="margin:20px;font-size:18px;color:#242424;">说明：金融/信贷信息数据包含银行、P2P、小贷、消费类分期、现金类分期以及非银行其他。</h4>\r\n \r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/clBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名-身份证校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n         <tr>\r\n            <td style="width: 400px">身份证-人脸校验</td>\r\n            <td style="width: 600px" class="report-content">';
            if (helper = helpers.idAndFace) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.idAndFace;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<div class="title overflowHidden mt50" id="clBehavior">\r\n    <div class="text-c" id="reportTitle" style="font-size:40px;">身份核验信息</div> <!--titleIconOrange-->\r\n</div>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">身份信息核验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="4">手机三要素校验</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr>\r\n            <td style="width: 400px">校验项</td>\r\n            <td style="width: 600px">比对结果</td>\r\n           \r\n        </tr>\r\n        <tr>\r\n            <td style="width: 400px">姓名+身份证+手机</td>\r\n            <td style="width: 600px" class="report-content">';
        if (helper = helpers.three) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.three;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<div style="margin:20px;font-size:18px;color:#242424; line-height:30px;">\r\n    说明：身份核验通过人脸算法比对权威机构数据，校验得出，包含全国数据。\r\n</div>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/badBehavior-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseSource, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseSource, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseTime, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseTime, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c mt50" style="font-size:40px;">公安负面信息</h2>\r\n<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td >案件来源</td>\r\n            <td >案件类别</td>\r\n            <td >案发区间</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/fygg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function",
            self = this;

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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="5" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>姓名</td>\r\n            <td >发布时间</td>\r\n            <td >法院名称</td>\r\n            <td >公告类型</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.pname) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.pname;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.sortTimeString) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.sortTimeString;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.court) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.court;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.ggType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.ggType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >公告版面</td>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan="4">内容概要</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">';
            if (helper = helpers.layout) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.layout;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + '</td>\r\n            <td colspan="4" class="report-content">';
            if (helper = helpers.body) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.body;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="5">法院公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/cpws-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>审结时间</td>\r\n            <td>文书类型</td>\r\n            <td>审理程序</td>\r\n            <td>法院名称</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.trialProcedure, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.trialProcedure, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>案号</td>\r\n            <td>案由</td>\r\n            <td>判决结果</td>\r\n            <td>依据</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.judgeResult, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.judgeResult, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yiju, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yiju, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td class="report-content" colspan=\'3\'>' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td class=\"report-content\" colspan='3'>" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">裁判文书</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/bgtxx-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>法院名称</td>\r\n            <td>案由</td>\r\n            <td colspan="2">当事人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td colspan="2" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + '</td>\r\n        </tr>\r\n         <tr>\r\n            <td>案号</td>\r\n            <td>依据</td>\r\n            <td>标的金额</td>\r\n            <td>申请人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.yiju, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.yiju, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.execMoney, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.execMoney, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.proposer, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.proposer, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'4\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='4' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="5">曝光台</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/ktgg-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="6" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>开庭时间</td>\r\n            <td>原告</td>\r\n            <td>被告</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.plaintiff, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.plaintiff, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.defendant, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.defendant, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td>法院名称</td>\r\n            <td>案号</td>\r\n            <td>案由</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="match-level">匹配度</td>\r\n            <td colspan=\'2\' class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容摘要</td>\r\n            <td colspan='2' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">开庭公告</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/ajlc-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
            buffer += "\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n        <tr>\r\n            <td rowspan="7" style="width:120px;">' + escapeExpression((helper = helpers.addOne || depth0 && depth0.addOne, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, data == null || data === false ? data : data.index, options) : helperMissing.call(depth0, "addOne", data == null || data === false ? data : data.index, options))) + '</td>\r\n            <td>立案时间</td>\r\n            <td>案件类型</td>\r\n            <td>判决日期</td>\r\n            <td class="match-level">匹配度</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sortTimeString, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sortTimeString, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseType, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.sentencingDate, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.sentencingDate, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.matching || depth0 && depth0.matching, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.matchRatio, options) : helperMissing.call(depth0, "matching", depth0 && depth0.matchRatio, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >案件状态</td>\r\n            <td >法院名称</td>\r\n            <td >审理状态</td>\r\n            <td >审理程序</td>\r\n            \r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseStatus, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.court, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.court, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.ajlcStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.ajlcStatus, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.trialProcedure, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.trialProcedure, options))) + '</td>\r\n        </tr>\r\n        <tr>\r\n            <td >案由</td>\r\n            <td >案号</td>\r\n            <td >诉讼标的</td>\r\n            <td >当事人</td>\r\n        </tr>\r\n        <tr>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseCause, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseCause, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.caseNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.caseNo, options))) + '</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.actionObject, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.actionObject, options))) + '</td>.\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.pname, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.pname, options))) + "</td>\r\n        </tr>\r\n        <tr>\r\n            <td>内容概要</td>\r\n            <td colspan='3' class=\"report-content\">" + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.body, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.body, options))) + "</td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td  style="width:120px;">1</td>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td style="width:120px;">序号</td>\r\n            <td class="title-bold" colspan="4">案件流程</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/communicationTrack-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += ' \r\n        <tr class="text-c">\r\n            <td class="report-content">';
            if (helper = helpers.online) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.online;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</td>\r\n            <td class="report-content">';
            if (helper = helpers.province) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.province;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.city, {
                hash: {},
                inverse: self.program(4, program4, data),
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n            <td class="report-content">';
            if (helper = helpers.company) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.company;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>    \r\n        </tr>\r\n        ";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += ' <td class="report-content">';
            if (helper = helpers.city) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.city;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            return buffer
        }

        function program4(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <td class="report-content">';
            if (helper = helpers.province) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.province;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</td>\r\n            ";
            return buffer
        }

        function program6(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h2 class="text-c" style="font-size:40px;margin-top:54px;">其他综合信息</h2>\r\n<h3 class="text-c title-bold">手机号信息</h3>\r\n<table class="record mt40">\r\n    <tbody>\r\n        <tr>\r\n            <td>手机在网时长</td>\r\n            <td>手机号归属省份</td>\r\n            <td>手机号归属城市</td>\r\n            <td>手机号所属运营商</td>\r\n            \r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(6, program6, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n    </tbody>\r\n</table>\r\n<br>\r\n<p style="margin-bottom:10px;margin-left:20px;font-size:18px;color:#242424;line-height:30px;">说明：手机信息覆盖全国范围，移动、联通、电信三家运营商数据。</p>\r\n';
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<h3 class="text-c">个人工商信息汇总</h3>\r\n<table class="record mt40"  style="margin-bottom:20px;">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人担任法定代表人信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc1-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>担任职位</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.position, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.position, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人担任企业高管信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});
define("xg/eid-company/1.0.4/p/report/report/personalIcbc2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
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
                helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td style="width:40%">公司名称</td>\r\n            <td style="width:60%" class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entName, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entName, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册号码</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regNo, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regNo, options))) + '</td>\r\n        </tr>\r\n        \r\n        <tr class="text-c" >\r\n            <td>公司类型</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entType, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entType, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册资本（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCap, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCap, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>注册币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.regCapCur, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.regCapCur, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>企业状态</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.entStatus, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.entStatus, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资额（万元）</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.subConam, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.subConam, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>认缴出资币种</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.currency, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.currency, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资比例</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.fundedRatio, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.fundedRatio, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td>出资方式</td>\r\n            <td class="report-content">' + escapeExpression((helper = helpers.isEmpty || depth0 && depth0.isEmpty, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.conFrom, options) : helperMissing.call(depth0, "isEmpty", depth0 && depth0.conFrom, options))) + '</td>\r\n        </tr>\r\n        <tr class="text-c" >\r\n            <td style="border: none;"></td>\r\n            <td style="border: none;"></td>\r\n        </tr>\r\n        ';
            return buffer
        }

        function program4(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '<table class="record mt40">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <td class="title-bold" colspan="10">个人股权投资信息</td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(4, program4, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});