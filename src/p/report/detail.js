define(function(require, exports, module) {
    var $ = require("$"),
        tools = require("../../c/js/tools");
    require("../../c/js/registerHelper");
    var creditReportH = require('./creditReport.handlebars');
    var creditOptionH = require('./creditOptionH.handlebars');
    var helpConsumeLoan = require("./helpConsumeLoan.handlebars");
    var helpRent = require("./helpRent.handlebars");
    var helpPersonnel = require("./helpPersonnel.handlebars");
    var main = {
        init: function() {
            var self = this;
            self.data = {
                    encryptKey: tools.getUrlParam("encryptKey"),
                    flag: 2
                }
                // 获取用户信息
            $.when(tools.getUserInfo()).then(function(data) {
                if (data.login == true) {
                    userType = data.user.userType;
                    self.getLeftBaseInfo(data.user.parentId);
                    self.typeId = data.user.typeId;
                    self.userType = data.user.userType;
                    self.showReport = data.user.showReport;
                } else {
                    tools.tusi("未登录");
                    if (tools.getUrlParam("userType") == 1) {
                        setTimeout(function() {
                            window.location.href = "/company/login.htm";
                        }, 500);
                    } else {
                        setTimeout(function() {
                            window.location.href = "/customer/login.htm";
                        }, 500);
                    }
                }
            }, function() {});
        },
        // 左侧数据
        getLeftBaseInfo: function(parentId) {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: '/cycle/credit/detail/basicInfo.json',
                success: function(data) {
                    var obj = data.obj;
                    console.log(obj)
                    obj.parentIdP = parentId;
                    obj.showReport = self.showReport;
                    var leftBasicInfo = require('./leftBasicInfo.handlebars');
                    $("#leftBasicInfoBox").html(leftBasicInfo(obj));
                    var identityInfo = require('./identityInfo.handlebars');
                    if (obj.frontImage || obj.backImage) {
                        $("#box2").html(identityInfo(obj));
                        $("#forbot").removeClass("active")
                    } else {
                        $("#box2").html(identityInfo(obj));
                        $("#thretop").removeClass("active")

                    }

                    var rightBox = require('./rightBox.handlebars');
                    $("#rightBox").html(rightBox(obj));
                    if (self.userType == 1) {
                        $("#help").hide();
                    } else {
                        var typeId = self.typeId;
                        if (typeId == 1) {
                            var helpCarFinancial = require("./helpCarFinancial.handlebars");
                            $("#bx").html(helpCarFinancial());
                        } else if (typeId == 2) {
                            $("#bx").html(helpConsumeLoan());
                        } else if (typeId == 3) {
                            $("#bx").html(helpRent());
                        } else if (typeId == 4) {
                            $("#bx").html(helpPersonnel());
                        }
                    }

                    //底部按钮
                    var bottomBtn = require('./bottomBtn.handlebars');
                    $("#bottom_btn").html(bottomBtn(obj));
                    if (userType == 2) {
                        $(".btn.pass").show();
                        $(".btn.noThrougth").show();
                        $(".btn.blacklist").show();
                    } else {
                        $(".btn.download").show();
                    }
                    self.getplScan();
                    self.getClBehavior();
                    self.getBadBehavior();
                    self.getConsumeBehavior();
                    self.getCommunicationTrack();

                    //获取近三个月的查询记录
                    var data = {
                        cardNum: $("#cardNum").html()
                    }
                    self.threeMonthRecord(data);
                    self.initEvents();

                    // 审核通过
                    $(".bottom_btn").on("click", ".pass", function() {
                            var _this = $(this);
                            var optionData = {
                                borrowerName: obj.borrowerName,
                                optionText: _this.text(),
                                encryptKey: tools.getUrlParam("encryptKey"),
                                status: 1
                            }
                            $("#modal-creditOption").remove();
                            $("body").append(creditOptionH(optionData));
                            $("#modal-creditOption").modal("show");
                            self.creditForm_validate();
                            /*$('#modal-creditOption').on('hidden.bs.modal', function (e) {
                             $("section").nextAll().remove();
                             })*/
                        })
                        // 审核不通过
                    $(".bottom_btn").on("click", ".noThrougth", function() {
                            var _this = $(this);
                            var optionData = {
                                borrowerName: obj.borrowerName,
                                optionText: _this.text(),
                                encryptKey: tools.getUrlParam("encryptKey"),
                                status: 2
                            }
                            $("#modal-creditOption").remove();
                            $("body").append(creditOptionH(optionData));
                            $("#modal-creditOption").modal("show");
                            self.creditForm_validate();
                        })
                        // 加入黑名单
                    $(".bottom_btn").on("click", ".blacklist", function() {
                            var _this = $(this);
                            var optionData = {
                                borrowerName: obj.borrowerName,
                                optionText: _this.text(),
                                encryptKey: tools.getUrlParam("encryptKey"),
                                status: 3
                            }
                            $("#modal-creditOption").remove();
                            $("body").append(creditOptionH(optionData));
                            $("#modal-creditOption").modal("show");
                            self.creditForm_validate();
                        })
                        // 下载报告
                    $(".bottom_btn").on("click", ".download", function() {
                        console.log(encodeURIComponent(tools.getUrlParam("encryptKey")));
                        window.location.href = "/cycle/credit/downloadPersonalReport.do?encryptKey=" + encodeURIComponent(tools.getUrlParam("encryptKey"));
                    })
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
        // 三个月数据
        threeMonthRecord: function(data) {
            var self = this;
            $.ajax({
                data: { encryptKey: tools.getUrlParam("encryptKey") },
                cache: false,
                type: "post",
                url: '/cycle/credit/detail/queryRecord.json',
                success: function(data) {
                    if (data.code == 0) {
                        console.log(data);
                        var obj = data.obj;
                        var list = require("./threeMonthRecord.handlebars");
                        $("#threeMonthRecord").html(list(obj));
                    } else {
                        tools.tusi("系统出错了");
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
        transformData: function(div, circleDiv, outerCircle, colors) {
            var self = this;
            // for (i = 0; i <= self.name.length; i++) {
            //     tmp += '<span class="name">self.name[i]</span>'
            // }
            div.children(".name").html(self.name);
            // div.children(".color").html(self.name.substr(self.name.indexOf('（'),self.name.length-1));
            var green = 0,
                yellow = 0,
                red = 0;
            if (self.color == "green") {
                div.addClass('colorGreen');
                colors.green = 1;
            } else if (self.color == "yellow") {
                div.addClass('colorYellow');
                colors.yellow = 1;
            } else if (self.color == "red") {
                colors.red = 1;
                div.addClass('colorRed');
            }
        },
        setCircleColor: function(circleDiv, outerCircle, colors) {
            if (colors.red == 1) {
                circleDiv.addClass("cRed").attr("data-color", "red");
                outerCircle.addClass("red").attr("data-color", "red");
            } else if (colors.yellow == 1) {
                circleDiv.addClass("cYellow").attr("data-color", "yellow");
                outerCircle.addClass("yellow").attr("data-color", "yellow");
            } else {
                circleDiv.addClass("cGreen").attr("data-color", "green");
                outerCircle.addClass("green").attr("data-color", "green");
            }
        },
        getNameColor: function(map) {
            var self = this;
            if (map != null && map != "") {
                self.name = map['context'];
                if (map.level == 1) {
                    self.color = "green";
                } else if (map.level == 2) {
                    self.color = "yellow";
                } else {
                    self.color = "red";
                }
            } else {
                self.name = "()";
                self.color = "green";
            }
            // var self = this;
            // if(max === 3){
            //     self.name = map[0];
            //     self.color = map[1];
            // } else if(max === 2) {

            // } else{
            //     self.name = "()";
            //     self.color = "green";
            // }
        },
        //金融信贷
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
                url: '/cycle/new/credit/detail/queryFinancial.json',
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        //圆球div
                        var circleDiv = $("#communicationTrack");
                        //鼠标移入圆球的效果div
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
                        //圆球div
                        var circleDiv = $("#plScan");
                        //圆球鼠标移入效果
                        var outerCircle = $("#outerCPlScan");
                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        }
                        var firstStatus1 = obj[0];
                        var div = $("#caseRecord");
                        self.name = "", self.color = "";
                        self.getNameColor(firstStatus1);
                        self.transformData(div, circleDiv, outerCircle, colors);
                        phoneRecord
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

                        //最后设置圆球的颜色
                        self.setCircleColor(circleDiv, outerCircle, colors);
                        window.localStorage.plScanColor = self.color;
                    } else {
                        tools.tusi("系统出错了");
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
        // 身份核验
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
                url: '/cycle/new/credit/detail/IdenVerificationResults.json',
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        console.log(obj);
                        //圆球div
                        var level = [];
                        obj.forEach(function(item) {
                            level.push(item.level);
                        });
                        var max = Math.max.apply(Math, level);;
                        var circleDiv = $("#clBehavior");
                        //圆球鼠标移入效果
                        var outerCircle = $("#outerCClBehavior");
                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        }

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

                        //最后设置圆球的颜色
                        self.setCircleColor(circleDiv, outerCircle, colors);

                    } else {
                        tools.tusi("系统出错了");
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
        //公安不良
        getBadBehavior: function() {
            var self = this;
            $.ajax({
                data: {
                    encryptKey: encryptKey,
                    flag: 2
                },
                cache: false,
                type: "post",
                url: '/cycle/new/credit/detail/queryPolice.json',
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        //圆球div
                        var circleDiv = $("#badBehavior");
                        //圆球鼠标移入效果
                        var outerCircle = $("#outerCBadBehavior");

                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        }

                        var penalRecord = obj[0];
                        var div = $("#penalRecord");
                        self.name = "", self.color = "";
                        self.getNameColor(penalRecord);
                        self.transformData(div, circleDiv, outerCircle, colors);

                        // var policeRecord = obj["policeRecord"];
                        // var div = $("#policeRecord");
                        // self.name = "", self.color = "";
                        // self.getNameColor(policeRecord);
                        // self.transformData(div, circleDiv, outerCircle, colors);


                        // var insuranceCheat = obj["insuranceCheat"];
                        // var div = $("#insuranceCheat");
                        // self.name = "", self.color = "";
                        // self.getNameColor(insuranceCheat);
                        // self.transformData(div, circleDiv, outerCircle, colors);

                        // var otherRecord = obj["otherRecord"];
                        // var div = $("#otherRecord");
                        // self.name = "", self.color = "";
                        // self.getNameColor(otherRecord);
                        // self.transformData(div, circleDiv, outerCircle, colors);

                        //最后设置圆球的颜色
                        self.setCircleColor(circleDiv, outerCircle, colors);
                        window.localStorage.badBehaviorColor = self.color;
                    } else {
                        tools.tusi("系统出错了");
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
        // 人法涉诉
        getConsumeBehavior: function() {
            var self = this;
            $.ajax({
                data: self.data,
                cache: false,
                type: "post",
                url: '/cycle/new/credit/detail/queryCourt.json',
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        console.log(obj)
                            //圆球div
                        var circleDiv = $("#consumeBehavior");
                        //鼠标移入圆球的效果div
                        var outerCircle = $("#outerCConsumeBehavior");
                        var colors = {
                            green: 0,
                            yellow: 0,
                            red: 0
                        }

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

                        //最后设置圆球的颜色
                        self.setCircleColor(circleDiv, outerCircle, colors);

                        window.localStorage.consumeBehaviorColor = self.color;
                    } else {
                        tools.tusi("系统出错了");
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
        //其他综合
        getCommunicationTrack: function() {
            var self = this;
            $.ajax({
                data: {
                    encryptKey: encryptKey,
                    flag: 2
                },
                cache: false,
                type: "post",
                url: '/cycle/new/credit/detail/queryOtherInfo.json',
                success: function(data) {
                    if (data.code == 0) {
                        var obj = data.list;
                        //圆球div
                        var circleDiv = $("#communicationTrack");
                        //鼠标移入圆球的效果div
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

                        //最后设置圆球的颜色
                        self.setCircleColor(circleDiv, outerCircle, colors);

                        window.localStorage.communicationTrackColor = self.color;
                    } else {
                        tools.tusi("系统出错了");
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

        initEvents: function() {
            var self = this;
            //返回按钮点击事件
            $("body").on("click", "#back", function() {
                var types = tools.getUrlParam("types")
                if (types == 1) {
                    window.location.href = "/company/homePage.htm";
                } else if (types == 2) {
                    window.location.href = "/headShop/homePage.htm";
                } else if (types == 3) {
                    window.location.href = "/subShop/infoSearch/view.htm";
                }

            });
            //移入移除效果
            $(".circle").hover(function() {
                $(this).find(".outerCircle").css("display", "block");
                $(this).find(".text").css("display", "none");
                $(this).find(".popover").css("display", "block");
            }, function() {
                $(this).find(".outerCircle").css("display", "none");
                $(this).find(".text").css("display", "block");
                $(this).find(".popover").css("display", "none");
            });
            /*$(document.body).css({
                "overflow-y":"auto",
            });*/
            function stopDefault(e) {
                //阻止默认浏览器动作(W3C)
                if (e && e.preventDefault)
                    e.preventDefault();
                //IE中阻止函数器默认动作的方式
                else
                    window.event.returnValue = false;
                return false;
            }
            $("#wrap").on("mouseover", function() {
                $("body").on("mousewheel", function(e) {
                    //stopDefault(e);
                });
            });
            $("#helpText").hover(function(event) {
                $(".wrap").css("opacity", "1");
            });
            $("#wrap").on("mouseleave", function() {
                //$(".wrap").hide();
                $(".wrap").css("opacity", "0");
                $("body").on("mousewheel", function(e) {
                    $("body").scroll();
                });
            });
            //信贷行为按钮点击事件
            $(".circle").on("click", function() {
                var color = $(this).data("color");
                window.localStorage.color = color;
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
                window.localStorage.communicationTrackColor = communicationTrackColor;
            });
            //self.setScrollRollBar();
        },
        creditForm_validate: function() {
            var validate = $("#creditOptionForm").validate({
                debug: true, //调试模式取消submit的默认提交功能
                //errorClass: "label.error", //默认为错误的样式类为：error
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应
                onkeyup: false,
                onblur: true,
                submitHandler: function(form) { //表单提交句柄,为一回调函数，带一个参数：form
                    $.ajax({
                        type: "post",
                        url: "/cycle/credit/setStatus.json",
                        data: $("#creditOptionForm").serialize(),
                        success: function(data, status, xhr) {
                            if (data.code == -1) {
                                tools.tusi(data.error);
                            } else {
                                tools.tusi("设置成功");
                                setTimeout(function() {
                                    window.location.reload();
                                }, 500);
                            }
                        },
                        error: function(xhr, errorType, error) {
                            tools.tusi(error);
                        }
                    })
                }
            });
        },
        //自定义滚动条
        setScrollRollBar: function() {
            var bx = document.getElementById("bx"),
                cn = document.getElementById("cn"),
                bs = document.getElementById("bs"),
                sc = document.getElementById("sc"),

                oldY = 0, // 鼠标初次点击的Y轴坐标
                newY = 0, // 鼠标拖动时的Y轴坐标
                nowY = 0, // 鼠标拖动时滚动条C距父级顶部的高度
                maxY = 0, // 拖动的最大极限值
                nowDisY = 0, // 点击滚动条C时距父级顶部的高度
                judge = 0, // 判断鼠标滚轮的方向
                scrY = 0; // 滚轮滚动距离

            bxHeight = bx.clientHeight, // 可视区A高度
                bsHeight = bs.clientHeight, // 滚动区D高度
                cnHeight = cn.offsetHeight; // 滚动块B的高度

            // 根据滚动块B实际内容高度控制滚动条C的高度
            var scHeight = bxHeight / cnHeight * bxHeight;
            sc.style.height = scHeight + "px";

            // 当滚动块B实际高度小于可视区时，滚动条隐藏
            if (cnHeight < bxHeight) {
                bs.style.display = "none";
            };

            sc.onmousedown = function(e) {
                oldY = e.clientY;
                nowDisY = sc.offsetTop; // 当前的滚动条C的top值

                document.onmousemove = function(e) {
                    newY = e.clientY;
                    nowY = nowDisY + newY - oldY; // 拖动后的滚动条C的top值
                    maxY = bsHeight - scHeight; // 设置滚动条top极限值

                    if (nowY <= 0) {
                        nowY = 0;
                    };
                    if (nowY >= maxY) {
                        nowY = maxY;
                    };

                    bx.scrollTop = nowY / maxY * (cnHeight - bxHeight); // 设置滚动块B的scrollTop值
                    sc.style.top = nowY + "px";
                }

            }
            document.onmouseup = function() {
                document.onmousemove = null;
            }

            $('body').on("mouseover", "#cn", function() {
                event.preventDefault();
                // 移入可视区A
                $('body').find("#cn").on('mousewheel DOMMouseScroll', function(e) {
                    e = e.originalEvent || window.event.originalEvent; //绑定事件对象
                    scrollFunc(e); //判断滚动方向
                    var c = $('#cn').height() - $('#bx').height();
                    if (Judge) {
                        scrY--;
                    } else {
                        scrY++;
                    }
                    if (scrY <= 0) {
                        scrY = 0;
                    }
                    if (scrY >= c) {
                        scrY = c;
                    };
                    bx.scrollTop = scrY * 10;
                    sc.style.top = bx.scrollTop * bxHeight / cnHeight + "px";
                })
            });
            $('body').on("mouseout", "#cn", function() {
                $('body').find("#cn").off('mousewheel DOMMouseScroll');
            });
            //判断滚动方向
            function scrollFunc(e) {
                if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件
                    if (e.wheelDelta > 0) { //当滑轮向上滚动时
                        Judge = true;
                    }
                    if (e.wheelDelta < 0) {
                        //当滑轮向下滚动时
                        Judge = false;
                    }
                } else if (e.detail) { //Firefox滑轮事件
                    if (e.detail > 0) { //当滑轮向上滚动时
                        Judge = false;
                    }
                    if (e.detail < 0) { //当滑轮向下滚动时
                        Judge = true;
                    }
                }
            }
        }
    };
    main.init();
});