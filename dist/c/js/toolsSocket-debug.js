define("xg/eid-company-zy/1.0.4/c/js/toolsSocket-debug", ["jquery/jquery/1.10.1/jquery-debug", "xg/eid-company-zy/1.0.4/c/js/tools-debug", "xg/eid-company-zy/1.0.4/c/js/bootstrap-debug", "xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate", "xg/eid-company-zy/1.0.4/c/js/validate-add-methods-debug", "xg/eid-company-zy/1.0.4/c/js/validate-messages-cn-debug", "xg/eid-company-zy/1.0.4/c/js/moment-debug", "xg/eid-company-zy/1.0.4/c/handlebars/headerTmp-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/modifyPassword-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/modifyInfo-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/versionH-debug.handlebars", "xg/eid-company-zy/1.0.4/c/js/registerHelper-debug", "alinw/handlebars/1.3.0/runtime-debug", "xg/eid-company-zy/1.0.4/c/handlebars/confirm-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/validateMobile-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/confirm4mobile2-debug.handlebars", "xg/eid-company-zy/1.0.4/c/handlebars/confirm4mobile-debug.handlebars"], function(require, exports, module) {
    var $ = require("jquery/jquery/1.10.1/jquery-debug");
    var tools = require("xg/eid-company-zy/1.0.4/c/js/tools-debug");
    require("xg/eid-company-zy/1.0.4/c/js/bootstrap-debug");
    require("xg/eid-company-zy/1.0.4/c/js/registerHelper-debug");
    require("xg/eid-company-zy/1.0.4/c/js/jquery-debug.validate");
    require("xg/eid-company-zy/1.0.4/c/js/validate-add-methods-debug");
    require("xg/eid-company-zy/1.0.4/c/js/validate-messages-cn-debug");
    var moment = require("xg/eid-company-zy/1.0.4/c/js/moment-debug");
    var headerTmp = require("xg/eid-company-zy/1.0.4/c/handlebars/headerTmp-debug.handlebars");
    var modifyPasswordTmp = require("xg/eid-company-zy/1.0.4/c/handlebars/modifyPassword-debug.handlebars");
    var modifyInfoTmp = require("xg/eid-company-zy/1.0.4/c/handlebars/modifyInfo-debug.handlebars");
    var checkInfoTmp = require("xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars");
    var versionH = require("xg/eid-company-zy/1.0.4/c/handlebars/versionH-debug.handlebars");
    var confirmTmp = require("xg/eid-company-zy/1.0.4/c/handlebars/confirm-debug.handlebars");
    var companyId = "",
        interval = null,
        parentId = "",
        itemId = "",
        isVAgian = 0;
    module.exports = {
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
        customerParentInit: function() {
            var self = this;
            self.isVAgian = 0;
            self.getCustomerLoginInfo();
            self.modify();
            self.modify2();
            self.logout();
            self.getInfoBySocket();
            if ($(".passCheckBtn").text() == "人脸比对成功") {
                $(".passCheckBtn").css("color", "green")
            } else {
                $(".passCheckBtn").css("color", "red")
            }
            self.clickInfoBtn();
            self.validateMobileBtn();
            $("body").on("click", ".validateMobileBtn", function() {
                self.isVAgian = $(this).data("mobilestatus");
                var validateMobileModal = require("xg/eid-company-zy/1.0.4/c/handlebars/validateMobile-debug.handlebars");
                if ($("body").find("#validateMobileModal")) {
                    $("body").find("#validateMobileModal").remove()
                }
                var data = {
                    encryptKey: $(this).data("encryptkey"),
                    borrowerName: $(this).data("borrowername"),
                    sex: $(this).data("sex"),
                    nation: $(this).data("nation"),
                    birthdate: $(this).data("birthdate"),
                    address: $(this).data("address"),
                    imgUrl: $(this).data("imgurl"),
                    cardNum: $(this).data("cardnum"),
                    issuer: $(this).data("issuer"),
                    validDate: $(this).data("validdate"),
                    customerId: $("#modifyInfo").parent().attr("data-customerid"),
                    faceUrl: $(this).data("faceurl"),
                    result: $(this).data("result")
                };
                $("body").append(validateMobileModal(data));
                $("#validateMobileModal").modal("show")
            });
            $("body").on("click", ".vMobileAgainToModalBtn", function() {
                authoriurl = $(this).data("auth");
                console.log(authoriurl);
                result = $(this).data("result");
                itemId = $(this).data("itemid");
                flowStatus = $(this).data("flowstatus");
                self.isVAgian = $(this).data("mobilestatus");
                var showCheckInfo = require("xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars");
                if ($("body").find("#modal-checkInfo")) {
                    $("body").find("#modal-checkInfo").remove()
                }
                data = {
                    encryptKey: $(this).data("encryptkey"),
                    borrowerName: $(this).data("borrowername"),
                    authoriurl: $(this).data("auth"),
                    sex: $(this).data("sex"),
                    nation: $(this).data("nation"),
                    birthdate: $(this).data("birthdate"),
                    address: $(this).data("address"),
                    address: $(this).data("address"),
                    imgUrl: $(this).data("imgurl"),
                    cardNum: $(this).data("cardnum"),
                    flowStatus: $(this).data("flowstatus"),
                    frontImage: $(this).data("pp"),
                    backImage: $(this).data("hh"),
                    auth: $(this).data("auth"),
                    issuer: $(this).data("issuer"),
                    validDate: $(this).data("validdate"),
                    customerId: $("#modifyInfo").parent().attr("data-customerid"),
                    faceUrl: $(this).data("faceurl"),
                    result: $(this).data("result"),
                    isVAgian: self.isVAgian,
                    mobileStatus: $(this).data("mobilestatus"),
                    itemId: $(this).data("itemid"),
                    customerId: $(this).data("customerid"),
                    companyId: $(this).data("companyid")
                };
                itemId = data.itemId;
                console.log(data);
                var showCheckInfo = require("xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars");
                $("body").append(showCheckInfo(data));
                $("#modal-checkInfo").modal("show");
                if (self.isVAgian != 1) {
                    $("#orangeTip").hide()
                }
                $("#scanline").animate({
                    top: "+161px"
                }, 1500, function() {
                    $(".ani").addClass("animated zoomIn").css("display", "block");
                    $("#frame").hide();
                    $("#scanline").hide()
                });
                $(".ani").css("display", "block");
                $("#frame").hide();
                $("#scanline").hide();
                $(".modal3").addClass("displayNone");
                $(".modal2").addClass("displayNone");
                $(".tab1").addClass("current")
            });
            $("body").on("click", "#closeModalBtn", function() {
                var mobile = $("#mobile").val().trim().replace(/[\-\/]/g, "");
                var b = !/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile);
                var encryptkey = $(this).data("encryptkey");
                var borrowername = $(this).data("borrowername");
                var cardnum = $(this).data("cardnum");
                var itemId = $(this).data("itemid");
                var customerId = $("#modifyInfo").parent().attr("data-customerid");
                var companyId = $(this).data("companyid");
                var data = {
                    encryptKey: encryptkey,
                    mobile: mobile,
                    borrowerName: borrowername,
                    cardNum: cardnum,
                    itemId: itemId,
                    customerId: customerId,
                    companyId: companyId
                };
                if (b && encryptkey && borrowername && cardnum) {
                    $("#tip1").remove();
                    $("#mobile").after('<span class="tip ml15" id="tip1">请输入正确的手机号码</span>').focus()
                } else {
                    if ($("#tip1")) {
                        $("#tip1").remove()
                    }
                    $.ajax({
                        data: {
                            cardNum: data.cardNum,
                            borrowerName: data.borrowerName,
                            mobile: data.mobile,
                            itemId: data.itemId
                        },
                        timeout: 3e3,
                        cache: false,
                        type: "post",
                        async: false,
                        url: "/cycle/credit/verify.json",
                        success: function(data) {
                            console.log(data);
                            if (data.code == 0) {
                                var countdown = 60;

                                function settime() {
                                    console.log(countdown);
                                    if (countdown == 0) {
                                        $("#infoSureToModalBtn").html("重新发送");
                                        $("#infoSureToModalBtn").css("opacity", "1");
                                        $("#infoSureToModalBtn").attr("disabled", false);
                                        countdown = 60;
                                        return
                                    } else {
                                        $("#infoSureToModalBtn").html("重新发送(" + countdown + "s)");
                                        $("#infoSureToModalBtn").css("opacity", "0.6");
                                        $("#infoSureToModalBtn").attr("disabled", true);
                                        countdown--
                                    }
                                    setTimeout(function() {
                                        settime()
                                    }, 1e3)
                                }
                                settime();
                                $(".nextBtn.confirm").on("click", function() {
                                    console.log(1);
                                    var accredit = $("#accredit").val();
                                    if (accredit.length !== 6) {
                                        self.tusi("请输入正确格式验证码")
                                    } else {
                                        $.ajax({
                                            type: "post",
                                            url: "/cycle/credit/authCodeVerification.json",
                                            data: {
                                                inputCode: accredit,
                                                itemId: itemId
                                            },
                                            cache: false,
                                            success: function(data) {
                                                console.log(data);
                                                if (data.code === 0) {
                                                    $(".close").trigger("click");
                                                    $("body").find(".modal-backdrop").remove();
                                                    self.tusi("验证成功");
                                                    window.location.reload()
                                                } else {
                                                    self.tusi(data.error)
                                                }
                                            }
                                        })
                                    }
                                })
                            } else {
                                $("#infoSureToModalBtn").html("重新发送");
                                $("#bushibenren").removeClass("displayNone");
                                $(".cancel-button").on("click", function() {
                                    $("#bushibenren").addClass("displayNone")
                                });
                                $(".end-button").on("click", function() {
                                    $.ajax({
                                        type: "post",
                                        data: {
                                            mobile: mobile
                                        },
                                        url: "/cycle/credit/sendAuthCode.json",
                                        async: false,
                                        success: function(data) {
                                            if (data.code === 0) {
                                                $("#bushibenren").addClass("displayNone");
                                                var countdown = 60;

                                                function settime() {
                                                    console.log(countdown);
                                                    if (countdown == 0) {
                                                        $("#infoSureToModalBtn").html("重新发送");
                                                        $("#infoSureToModalBtn").css("opacity", "1");
                                                        $("#infoSureToModalBtn").attr("disabled", false);
                                                        countdown = 60;
                                                        return
                                                    } else {
                                                        $("#infoSureToModalBtn").html("重新发送(" + countdown + "s)");
                                                        $("#infoSureToModalBtn").css("opacity", "0.6");
                                                        $("#infoSureToModalBtn").attr("disabled", true);
                                                        countdown--
                                                    }
                                                    setTimeout(function() {
                                                        settime()
                                                    }, 1e3)
                                                }
                                                settime();
                                                $(".nextBtn.confirm").on("click", function() {
                                                    console.log(1);
                                                    var accredit = $("#accredit").val();
                                                    if (accredit.length !== 6) {
                                                        self.tusi("请输入正确格式验证码")
                                                    } else {
                                                        $.ajax({
                                                            type: "post",
                                                            url: "/cycle/credit/authCodeVerification.json",
                                                            data: {
                                                                inputCode: accredit,
                                                                itemId: itemId
                                                            },
                                                            cache: false,
                                                            success: function(data) {
                                                                console.log(data);
                                                                if (data.code === 0) {
                                                                    $(".close").trigger("click");
                                                                    $("body").find(".modal-backdrop").remove();
                                                                    self.tusi("验证成功");
                                                                    window.location.reload()
                                                                } else {
                                                                    self.tusi(data.error)
                                                                }
                                                            }
                                                        })
                                                    }
                                                })
                                            } else {
                                                tools.tusi(data.error)
                                            }
                                        }
                                    })
                                })
                            }
                        }
                    })
                }
            });
            $("body").on("click", "#closeModalBtn2", function() {
                $("#sureValidateMobileBtn").html('<img src="http://static.hpbanking.com/xg/uploads/files/5f378673b274c8be9c47dedbdd79e09a-32-32.gif" width="20">');
                console.log("clicik======");
                var mobile = $("#mobile1").val().trim().replace(/[\-\/]/g, "");
                console.log(mobile);
                var b = !/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile);
                var encryptkey = $(this).data("encryptkey");
                var borrowername = $(this).data("borrowername");
                var cardnum = $(this).data("cardnum");
                var itemId = $("this").data("itemid");
                var customerId = $("#modifyInfo").parent().attr("data-customerid");
                var companyId = $(this).data("companyid");
                var data = {
                    encryptKey: encryptkey,
                    mobile: mobile,
                    borrowerName: borrowername,
                    cardNum: cardnum,
                    itemId: itemId,
                    customerId: customerId,
                    companyId: companyId
                };
                console.log(data);
                if (b) {
                    $("#tip1").remove();
                    $("#mobile1").after('<div class="tip" id="tip1">请输入正确的手机号码</div>')
                } else {
                    $.ajax({
                        data: data,
                        cache: false,
                        timeout: 3e3,
                        type: "post",
                        url: self.isVAgian == 0 ? "/cycle/credit/checkMobile.json" : "/cycle/credit/again/checkMobile.json",
                        success: function(data) {
                            if (data.code == 0) {
                                if (data.obj.thrValidate == 1) {
                                    $("#contentBox1").addClass("displayNone");
                                    $("#contentBox2").removeClass("displayNone");
                                    $("#contentBox3").addClass("displayNone");
                                    var phone = mobile;
                                    phone = phone.split("");
                                    phone.splice(3, 0, "-");
                                    phone.splice(8, 0, "-");
                                    $("#phoneNumberS").html(phone.join(""))
                                } else if (data.obj.thrValidate == 0) {
                                    $("#contentBox1").addClass("displayNone");
                                    $("#contentBox2").addClass("displayNone");
                                    $("#contentBox3").removeClass("displayNone");
                                    var phone = mobile;
                                    phone = phone.split("");
                                    phone.splice(3, 0, "-");
                                    phone.splice(8, 0, "-");
                                    $("#phoneNumberF").html(phone.join(""))
                                }
                                var newItemId = data.obj.newItemId;
                                console.log("newItemId:" + newItemId);
                                if (self.isVAgian == 1) {
                                    console.log("set-newItemId");
                                    $(".infoSureBtn2").attr("href", "/cycle/credit/detail/detailPage.htm?encryptKey=" + newItemId)
                                }
                            }
                            $("#sureValidateMobileBtn").html("校验手机号码")
                        },
                        error: function(data) {
                            console.log(data);
                            if (data.statusText == "timeout") {
                                $("#tip1").remove();
                                $("#mobile1").after('<div class="tip" id="tip1">网络未连接，请重试~</div>')
                            } else {
                                self.tusi("系统出错了")
                            }
                            $("#sureValidateMobileBtn").html("校验手机号码")
                        }
                    })
                }
            });
            $("body").on("click", "#sureValidateMobileBtn", function() {
                console.log("clicik");
                var mobile = $("#mobile1").val().trim().replace(/[\-\/]/g, "");
                if (mobile == "" || mobile == null) {
                    $("#tip1").remove();
                    $("#mobile1").after('<span class="tip ml15" id="tip1">请输入手机号码</span>').focus();
                    return false
                }
                console.log(mobile);
                var b = !/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile);
                if (b) {
                    console.log("不合法");
                    $("#tip1").remove();
                    $("#mobile1").after('<div class="tip" id="tip1">请输入正确的手机号码</div>')
                } else {
                    $("#tip1").remove();
                    var encryptkey = $(this).data("encryptkey");
                    var borrowername = $(this).data("borrowername");
                    var cardnum = $(this).data("cardnum");
                    var itemId = $(this).data("itemid");
                    var customerId = $("#modifyInfo").parent().attr("data-customerid");
                    var companyId = $(this).data("companyid");
                    var data = {
                        encryptKey: encryptkey,
                        mobile: mobile,
                        borrowerName: borrowername,
                        cardNum: cardnum,
                        itemId: itemId,
                        customerId: customerId,
                        companyId: companyId
                    };
                    console.log(data);
                    var modalConfirm4mobile = require("xg/eid-company-zy/1.0.4/c/handlebars/confirm4mobile2-debug.handlebars");
                    if ($("body").find("#modalConfirm4mobile2")) {
                        $("body").find("#modalConfirm4mobile2").remove()
                    }
                    $("body").append(modalConfirm4mobile(data));
                    $("#modalConfirm4mobile2").modal("show");
                    $(".modal-backdrop:last-child").css("z-index", "1051")
                }
            });
            $("body").on("keyup", "#mobile", function() {
                $("#tip1").remove();
                var mobile = $("#mobile").val();
                console.log(mobile)
            });
            $("body").on("keyup", "#mobile1", function() {
                $("#tip1").remove();
                var mobile = $("#mobile1").val();
                console.log(mobile);
                var len = mobile.length;
                if (len > self.len && (len == 8 || len == 9)) {
                    mobile = mobile.split("");
                    if (mobile[3] != "-") {
                        mobile.splice(3, 0, "-")
                    }
                    if (mobile[8] != "-") {
                        mobile.splice(8, 0, "-")
                    }
                    $("#mobile1").val(mobile.join(""))
                }
                self.len = len
            });
            $("body").on("click", "#infoSureToModalBtn", function() {
                var mobile = $("#mobile").val().replace(/[\-\/]/g, "");
                if (mobile == "" || mobile == null) {
                    $("#tip1").remove();
                    $("#mobile").after('<span class="tip ml15" id="tip1">请输入手机号码</span>').focus();
                    return false
                }
                console.log(mobile);
                var b = !/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile);
                if (b) {
                    $("#tip1").remove();
                    $("#mobile").after('<span class="tip ml15" id="tip1">请输入正确的手机号码</span>').focus()
                } else {
                    $("#tip1").remove();
                    var modalConfirm4mobile = require("xg/eid-company-zy/1.0.4/c/handlebars/confirm4mobile-debug.handlebars");
                    if ($("body").find("#modalConfirm4mobile")) {
                        $("body").find("#modalConfirm4mobile").remove()
                    }
                    var data = {
                        mobile: mobile.trim(),
                        encryptKey: $(this).data("encryptkey"),
                        borrowerName: $(this).data("borrowername"),
                        sex: $(this).data("sex"),
                        nation: $(this).data("nation"),
                        birthdate: $(this).data("birthdate"),
                        address: $(this).data("address"),
                        cardNum: $(this).data("cardnum"),
                        issuer: $(this).data("issuer"),
                        validDate: $(this).data("validdate"),
                        customerId: $("#modifyInfo").parent().attr("data-customerid"),
                        faceUrl: $(this).data("faceurl"),
                        result: $(this).data("result"),
                        itemId: $(this).data("itemid"),
                        companyId: $(this).data("companyid"),
                        authoriurl: $(this).data("auth")
                    };
                    $("body").append(modalConfirm4mobile(data));
                    $("#modalConfirm4mobile").modal("show");
                    $(".modal-backdrop:last-child").css("z-index", "1051")
                }
            });
            $("body").on("click", ".header .tab1", function() {
                console.log(result);
                console.log(flowStatus);
                if (result == 0 || flowStatus >= 20) {
                    $(".modal1").removeClass("displayNone");
                    $(".modal2").addClass("displayNone");
                    $(".modal3").addClass("displayNone");
                    $(".tab2").removeClass("current");
                    $(".tab3").removeClass("current");
                    $(".tab1").addClass("current");
                    $(".nextBtn.next").removeClass("displayNone");
                    $(".nextBtn.upload").addClass("displayNone");
                    $(".nextBtn.confirm").addClass("displayNone");
                    $("#confirm-footer").removeClass("displayNone")
                } else {
                    $(".nextBtn.next").removeClass("displayNone")
                }
                if (authoriurl) {
                    var a = authoriurl;
                    $("#img0").attr("src", a);
                    $("#img0").removeClass("displayNone")
                }
            });
            $("body").on("click", ".header .tab2", function() {
                console.log(result);
                console.log(authoriurl);
                console.log(flowStatus);
                if (result == 0 || flowStatus >= 20) {
                    if (authoriurl) {
                        var a = authoriurl;
                        $("#img0").attr("src", a);
                        $("#img0").removeClass("displayNone")
                    }
                    $(".modal2").removeClass("displayNone");
                    $("#confirm-footer").addClass("displayNone");
                    $(".modal1").addClass("displayNone");
                    $(".modal3").addClass("displayNone");
                    $(".tab1").removeClass("current");
                    $(".tab3").removeClass("current");
                    $(".tab2").addClass("current");
                    $(".nextBtn.upload").removeClass("displayNone");
                    $(".nextBtn.next").addClass("displayNone");
                    $(".nextBtn.confirm").addClass("displayNone");
                    $(".nextBtn.end-bar").addClass("displayNone")
                }
            });
            $("body").on("click", ".modalFooter .nextBtn.next", function() {
                if (result == 0 || flowStatus >= 20) {
                    if (authoriurl) {
                        var a = authoriurl;
                        $("#img0").attr("src", a);
                        $("#img0").removeClass("displayNone")
                    }
                }
                $(".modal2").removeClass("displayNone");
                $(".modal3").addClass("displayNone");
                $(".modal1").addClass("displayNone");
                $(".tab1").removeClass("current");
                $(".tab3").removeClass("current");
                $("#confirm-footer").addClass("displayNone");
                $(".tab2").addClass("current");
                $(".nextBtn.next").addClass("displayNone");
                $(".nextBtn.confirm").addClass("displayNone");
                $(".nextBtn.upload").removeClass("displayNone")
            });
            $("body").on("click", ".modalFooter .nextBtn.confirm-me", function() {
                var authoriurl = $(this).data("auth");
                if (authoriurl) {
                    var a = authoriurl;
                    $("#img0").attr("src", a);
                    $("#img0").removeClass("displayNone")
                }
                $.ajax({
                    type: "post",
                    data: {
                        result: 1,
                        itemId: itemId
                    },
                    url: "/cycle/manuallyReview.json",
                    async: false,
                    success: function(data) {
                        if (data.code === 0) {
                            data.flowStatus = 20;
                            flowStatus = 20;
                            result = 0;
                            data.result = 0;
                            var showCheckInfo = require("xg/eid-company-zy/1.0.4/c/handlebars/showCheckInfo-debug.handlebars");
                            console.log(data);
                            $("body").append(showCheckInfo(data));
                            $(".modal2").removeClass("displayNone");
                            $(".modal3").addClass("displayNone");
                            $(".modal1").addClass("displayNone");
                            $(".tab1").removeClass("current");
                            $(".tab3").removeClass("current");
                            $(".tab2").addClass("current");
                            $(".nextBtn.next").addClass("displayNone");
                            $(".nextBtn.confirm-me").addClass("displayNone");
                            $(".nextBtn.confirm").addClass("displayNone");
                            $(".nextBtn.end-bar").addClass("displayNone");
                            $(".nextBtn.upload").removeClass("displayNone");
                            $("#confirm-footer").addClass("displayNone");
                            $(".ani").attr("src", "http://static.hpbanking.com/xg/uploads/files/1740c91f0e8e8693b11fdae912208f6a-100-90.png")
                        } else {
                            tools.tusi(data.error)
                        }
                    }
                })
            });
            $("body").on("click", ".modalFooter .nextBtn.end-bar", function() {
                $("#endChaxun").removeClass("displayNone");
                $(".cancel-button").on("click", function() {
                    $("#endChaxun").addClass("displayNone")
                });
                $("#end-button").on("click", function() {
                    $.ajax({
                        type: "post",
                        data: {
                            result: 2,
                            itemId: itemId
                        },
                        url: "/cycle/manuallyReview.json",
                        async: false,
                        success: function(data) {
                            if (data.code === 0) {
                                $("body").find("#modal-checkInfo").remove();
                                $("body").find(".modal-backdrop").remove();
                                $("#endChaxun").addClass("displayNone")
                            } else {
                                tools.tusi(data.error)
                            }
                        }
                    })
                })
            });
            $("body").on("change", "#file0", function() {
                var self = this;
                var objUrl = getObjectURL(this.files[0]);
                var files = document.getElementById("file0").files[0];
                var forms = document.getElementById("form0");
                var fileObj = $(this).get(0).files;
                var fd = new FormData;
                fd.append("file", fileObj[0]);
                if (objUrl) {
                    $.ajax({
                        type: "post",
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        url: "/common/upload/image.do",
                        processData: false,
                        async: false,
                        success: function(data) {
                            imgUrl = data.url
                        }
                    });
                    $("#uploadImg").on("click", function() {
                        var f = document.getElementById("file0").value;
                        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(f)) {
                            tools.tusi("请选择一张照片");
                            return false
                        }
                        $.ajax({
                            type: "post",
                            url: "/cycle/credit/uploadAccredit.json",
                            data: {
                                itemId: itemId,
                                authorizUrl: imgUrl
                            },
                            success: function(data) {
                                if (data.code === 0) {
                                    $(".modal3").removeClass("displayNone");
                                    $(".modal2").addClass("displayNone");
                                    $(".modal1").addClass("displayNone");
                                    $(".tab1").removeClass("current");
                                    $(".tab2").removeClass("current");
                                    $(".tab3").addClass("current");
                                    $(".nextBtn.confirm").removeClass("displayNone");
                                    $(".nextBtn.upload").addClass("displayNone");
                                    $(".nextBtn.next").addClass("displayNone");
                                    $("body").on("click", ".header .tab3", function() {
                                        $(".modal3").removeClass("displayNone");
                                        $(".modal1").addClass("displayNone");
                                        $(".modal2").addClass("displayNone");
                                        $(".tab1").removeClass("current");
                                        $(".tab2").removeClass("current");
                                        $(".tab3").addClass("current");
                                        $("#confirm-footer").addClass("displayNone");
                                        $(".nextBtn.upload").addClass("displayNone");
                                        $(".nextBtn.next").addClass("displayNone");
                                        $(".nextBtn.confirm").removeClass("displayNone")
                                    })
                                } else {
                                    tools.tusi("上传失败")
                                }
                            }
                        })
                    })
                }
                $("#img0").attr("src", objUrl);
                $("#img0").removeClass("displayNone")
            });
            $("body").on("click", "#uploadImg", function() {
                if (authoriurl && result == 0 || authoriurl && flowStatus >= 20) {
                    $(".modal3").removeClass("displayNone");
                    $(".modal1").addClass("displayNone");
                    $(".modal2").addClass("displayNone");
                    $(".tab1").removeClass("current");
                    $(".tab2").removeClass("current");
                    $(".tab3").addClass("current");
                    $(".nextBtn.upload").addClass("displayNone");
                    $(".nextBtn.next").addClass("displayNone");
                    $(".nextBtn.confirm").removeClass("displayNone")
                }
            });
            $("body").on("click", ".header .tab3", function() {
                if (authoriurl && result == 0 || flowStatus >= 20) {
                    $(".modal3").removeClass("displayNone");
                    $(".modal1").addClass("displayNone");
                    $(".modal2").addClass("displayNone");
                    $(".tab1").removeClass("current");
                    $(".tab2").removeClass("current");
                    $(".tab3").addClass("current");
                    $(".nextBtn.upload").addClass("displayNone");
                    $(".nextBtn.next").addClass("displayNone");
                    $(".nextBtn.confirm").removeClass("displayNone")
                }
            });

            function getObjectURL(file) {
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file)
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file)
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file)
                }
                return url
            }
            $("body").on("click", "#infoSureBtn2", function() {
                setTimeout(function() {
                    $(".close").trigger("click")
                }, 1e3)
            });
            $("body").on("click", "#validateAgian2", function() {
                $("#contentBox1").removeClass("displayNone");
                $("#contentBox2").addClass("displayNone");
                $("#contentBox3").addClass("displayNone")
            })
        },
        validateMobileBtn: function() {
            var self = this;
            $("body").on("click", "#validatePhoneBtn", function() {
                var mobile = $("#mobile").val().trim().replace(/[\-\/]/g, "");
                console.log(mobile);
                var b = !/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile);
                var encryptkey = $(this).data("encryptkey");
                var borrowername = $(this).data("borrowername");
                var cardnum = $(this).data("cardnum");
                var itemId = $(this).data("itemid");
                var customerId = $("#modifyInfo").parent().attr("data-customerid");
                var companyId = $(this).data("companyid");
                var data = {
                    encryptKey: encryptkey,
                    mobile: mobile,
                    borrowerName: borrowername,
                    cardNum: cardnum,
                    itemId: itemId,
                    customerId: customerId,
                    companyId: companyId
                };
                console.log(data);
                if (b && encryptkey && borrowername && cardnum) {
                    $("#tip1").remove();
                    $("#mobile").after('<span class="tip ml15" id="tip1">请输入正确的手机号码</span>').focus()
                } else {
                    if ($("#tip1")) {
                        $("#tip1").remove()
                    }
                    $.ajax({
                        data: data,
                        timeout: 3e3,
                        cache: false,
                        type: "post",
                        url: self.isVAgian == 0 ? "/cycle/credit/checkMobile.json" : "/cycle/credit/again/checkMobile.json",
                        success: function(data) {
                            console.log("============================");
                            console.log(data);
                            if (data.obj == 1) {
                                $(".modalFooter").addClass("displayNone");
                                $(".modalFooter2").removeClass("displayNone");
                                $(".modalFooter3").addClass("displayNone");
                                var phone = mobile;
                                phone = phone.split("");
                                phone.splice(3, 0, "-");
                                phone.splice(8, 0, "-");
                                $("#phoneNumberS1").html(phone.join(""))
                            } else {
                                $(".modalFooter").addClass("displayNone");
                                $(".modalFooter2").addClass("displayNone");
                                $(".modalFooter3").removeClass("displayNone");
                                var phone = mobile;
                                phone = phone.split("");
                                phone.splice(3, 0, "-");
                                phone.splice(8, 0, "-");
                                $("#phoneNumberF1").html(phone.join(""))
                            }
                            console.log(data.obj)
                        },
                        error: function(data) {
                            console.log(data);
                            if (data.statusText == "timeout") {
                                $("#tip1").remove();
                                self.tusi("网络未连接，请重试~")
                            } else {
                                self.tusi("系统出错了")
                            }
                        }
                    })
                }
            })
        },
        getGetToken: function() {
            var self = this;
            var defer = $.Deferred();
            $.ajax({
                type: "post",
                timeout: 3e3,
                url: "/common/socket/getToken.json",
                success: function(data, status, xhr) {
                    defer.resolve(data)
                },
                error: function(data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        $("#tip1").remove();
                        self.tusi("网络未连接，请重试~")
                    } else {
                        self.tusi("系统出错了")
                    }
                }
            });
            return defer.promise()
        },
        getInfoBySocket: function() {
            var self = this;
            var websocket = null;
            if (window.WebSocket) {
                $.when(self.getUserInfo()).then(function(data) {
                    if (data.login == true) {
                        companyId = data.user.companyId;
                        console.log("companyId:" + companyId);
                        $.when(self.getGetToken()).then(function(data) {
                            if (data.code == 0) {
                                var socketToken = data.obj;
                                console.log(socketToken);
                                var websocket = $("body").data("websocket");
                                websocket = new ReconnectingWebSocket(websocket + "/socket?clientType=client&&companyId=" + companyId + "&&socketToken=" + socketToken);
                                websocket.onopen = function(event) {
                                    setMessageInnerHTML('{"open":1}')
                                };
                                websocket.onmessage = function(event) {
                                    setMessageJson(event.data)
                                };
                                websocket.onerror = function(event) {
                                    setMessageInnerHTML('{"error":1}');
                                    self.tusi("连接服务器失败，请确保网络通畅")
                                };
                                websocket.onclose = function() {
                                    setMessageInnerHTML('{"close":1}');
                                    $.ajax({
                                        type: "post",
                                        timeout: 3e3,
                                        url: "/common/ajax/user.json",
                                        success: function(data) {
                                            if (data.login == true) {} else {
                                                console.log("未登录或登录超时");
                                                window.location.href = "/customer/login.htm"
                                            }
                                        },
                                        error: function(data) {
                                            console.log(data);
                                            if (data.statusText == "timeout") {
                                                $("#tip1").remove();
                                                self.tusi("网络未连接，请重试~")
                                            } else {
                                                self.tusi("系统出错了")
                                            }
                                        }
                                    })
                                }
                            } else {
                                if (data.login) {
                                    self.tusi(data.error)
                                } else {
                                    console.log("未登录或登录超时");
                                    window.location.href = "/customer/login.htm"
                                }
                            }
                        })
                    }
                })
            } else {
                alert("当前浏览器不支持本系统的某些功能，为了更好得体验，请风换个浏览器");
                setInterval(self.getCheckInfo, 3e3)
            }
            window.onbeforeunload = function() {
                websocket.close()
            };

            function setMessageInnerHTML(innerHTML) {
                console.log(innerHTML)
            }

            function setMessageJson(innerHTML) {
                var info = $.parseJSON(innerHTML);
                data = info.item;
                authoriurl = data.authorizUrl;
                result = data.result;
                itemId = data.itemId;
                flowStatus = data.flowStatus;
                self.isVAgian = 0;
                $("body").find(".modal-backdrop").remove();
                $("body").find("#modal-checkInfo").remove();
                console.log(data);
                $("body").append(checkInfoTmp(data));
                $("#modal-checkInfo").modal("show");
                if ($(".passCheckBtn").text() == "人脸比对成功") {
                    $(".passCheckBtn").css("color", "green")
                } else {
                    $(".passCheckBtn").css("color", "red")
                }
                $("#scanline").animate({
                    top: "+161px"
                }, 1500, function() {
                    $(".ani").addClass("animated zoomIn").css("display", "block");
                    $("#frame").hide();
                    $("#scanline").hide()
                })
            }

            function closeWebSocket() {
                websocket.close()
            }

            function openWebSocket() {
                console.log("openWebSocket");
                if ("WebSocket" in window) {
                    websocket = new WebSocket("ws://192.168.18.220:8020/")
                } else {
                    alert("当前浏览器不支持本系统的某些功能，为了更好得体验，请风换个浏览器")
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
                timeout: 3e3,
                type: "post",
                url: "/cycle/search/view.json",
                success: function(data) {
                    console.log(data);
                    if (data.code == 0) {
                        var list = data.list;
                        if (list.length > 0) {
                            $("body").find(".modal-backdrop").remove();
                            $("body").find("#modal-checkInfo").remove();
                            $("body").append(checkInfoTmp(list[0]));
                            $("#modal-checkInfo").modal("show");
                            $(".modalFooter").removeClass("displayNone");
                            $(".modalFooter2").addClass("displayNone");
                            $(".modalFooter3").addClass("displayNone");
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
                },
                error: function(data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        self.tusi("网络未连接，请重试~")
                    } else {
                        self.tusi("系统出错了")
                    }
                }
            })
        },
        clickInfoBtn: function() {
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
                    timeout: 3e3,
                    type: "post",
                    url: "/loginOut.do",
                    success: function(data) {
                        if (data.code == 0) {
                            window.location.href = "/customer/login.htm"
                        }
                    },
                    error: function(data) {
                        console.log(data);
                        if (data.statusText == "timeout") {
                            self.tusi("网络未连接，请重试~")
                        } else {
                            self.tusi("系统出错了")
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
                    if (data.login == true) {
                        parentId = data.user.parentId;
                        console.log("获取用户信息");
                        if (data.user.logoUrl == null || data.user.logoUrl == "") {} else {
                            $("#logoUrl").attr("src", data.user.logoUrl).show()
                        }
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
                },
                error: function(data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        self.tusi("网络未连接，请重试~")
                    } else {
                        self.tusi("系统出错了")
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
                        },
                        error: function(data) {
                            console.log(data);
                            if (data.statusText == "timeout") {
                                self.tusi("网络未连接，请重试~")
                            } else {
                                self.tusi("系统出错了")
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
                        },
                        error: function(data) {
                            console.log(data);
                            if (data.statusText == "timeout") {
                                self.tusi("网络未连接，请重试~")
                            } else {
                                self.tusi("系统出错了")
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
                },
                error: function(data) {
                    console.log(data);
                    if (data.statusText == "timeout") {
                        self.tusi("网络未连接，请重试~")
                    } else {
                        self.tusi("系统出错了")
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
                    return "placeholder" in document.createElement("input");
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
        formatDate: function(datitem) {
            var tra = moment(datitem).format("YYYY-MM-DD");
            return tra
        },
        formatDateAll: function(datitem) {
            var tra = moment(datitem).format("YYYY-MM-DD HH:mm:ss");
            return tra
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
define("xg/eid-company-zy/1.0.4/c/handlebars/confirm-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        return '<div id="modal-confirm" class="modal fade">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content radius">\r\n            <div class="modal-header">\r\n                <h3 class="modal-title">提示</h3>\r\n                <a class="close" data-dismiss="modal" aria-hidden="true" href="javascript:void();">×</a>\r\n            </div>\r\n            <div class="modal-body">\r\n                你确定要重置此门店密码？\r\n            </div>\r\n            <div class="modal-footer">\r\n                <a class="btn btn-primary">确定</a>\r\n                <a class="btn" data-dismiss="modal" aria-hidden="true">关闭</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>'
    })
});
define("xg/eid-company-zy/1.0.4/c/handlebars/validateMobile-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += '<div id="validateMobileModal" class="modal fade">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content radius">\r\n            <div class="modalHeader text-c">\r\n                <div  class="modalTitle">校验手机号码</div>\r\n                <a class="close" data-dismiss="modal"><img src="http://static.hpbanking.com/xg/uploads/files/52db57a374280e1c013fd39d825272da-32-31.png" alt=""></a>\r\n            </div>\r\n             <div id="contentBox1">\r\n                <div style=\'margin: 30px 60px; position: relative\'>\r\n                    <label for="mobile1">手机号码：</label>\r\n                    <input class="input-text w222 phone mobileNum" id="mobile" maxlength="13" placeholder="请输入银行卡绑定号码或常用号码">\r\n                </div>\r\n                <div style=\'margin: 30px 60px; position: relative;\'>\r\n                    <label style="margin-left:12px;"  for="accredit">授权码：</label>\r\n                    <input class="input-text w222 phone" id="accredit" maxlength="13" placeholder="请输入授权码">\r\n                    <button id=\'infoSureToModalBtn\' class="setMsg" style="position:absolute;right:68px;top:7px;" data-result="';
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
        buffer += escapeExpression(stack1) + '">发送授权码</button>\r\n                </div>\r\n                <div class="modalFooter text-center">\r\n                    <div class=\'nextBtn confirm\'>确定</div>\r\n                </div>\r\n            </div> \r\n            <div id="contentBox2" class="displayNone">\r\n                <div class="modalBody2">\r\n                    <div class="info">\r\n                        <div class="f-18 marginCenter w260" for="">手机号码：<span id="phoneNumberS"></span></div>\r\n                        <div class="marginCenter w222 tip mt10">手机号码与身份匹配成功</div>\r\n                    </div>\r\n                </div>\r\n                <div class="modalFooter text-center">\r\n                    <a class="btn btn-primary h42" id="infoSureBtn2"  href="/cycle/credit/detail/detailPage.htm?encryptKey=';
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
        buffer += escapeExpression(stack1) + '" target="_blank">查看报告</a>\r\n                </div>\r\n            </div>\r\n             <div id="contentBox3"  class="displayNone">\r\n                <div class="modalBody3">\r\n                    <div class="info">\r\n                        <div class="f-18 marginCenter w260 text-center" for="">手机号码：<span id="phoneNumberF"></span></div>\r\n                        <div class="marginCenter w222 tip mt10">手机号码与身份匹配失败</div>\r\n                    </div>\r\n                </div>\r\n                <div class="modalFooter text-center">\r\n                    <a class="btn btn-danger h42" id="validateAgian2"  data-result="';
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
        buffer += escapeExpression(stack1) + '" data-sex="';
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
        buffer += escapeExpression(stack1) + '"\r\n                       data-address="';
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
        buffer += escapeExpression(stack1) + '" data-imgUrl="';
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
        buffer += escapeExpression(stack1) + '" data-cardnum="';
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
        buffer += escapeExpression(stack1) + '"\r\n                       data-itemid="';
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
        buffer += escapeExpression(stack1) + '" data-mobilestatus="';
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
        buffer += escapeExpression(stack1) + '">重新查询</a>\r\n                </div>\r\n            </div> \r\n        </div>\r\n    </div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company-zy/1.0.4/c/handlebars/confirm4mobile2-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function";
        buffer += '<div id="modalConfirm4mobile2" class="modal fade"  style="width: 335px;height: 254px;margin-left: -166px;z-index: 1052;top:90px">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content radius" style="background-color: #f6f6f6">\r\n            <div class="modal-header">\r\n                <div class="modal-title" style="font-size: 17px;text-align: center">温馨提示</div>\r\n            </div>\r\n            <div class="modal-body" style="font-size: 15px;padding: 26px !important;background-color: #ffffff !important">\r\n                <div style="line-height: 30px;">\r\n                    请确保输入的号码为被查询人本人的号码！\r\n                    \r\n                </div>\r\n                <div style="line-height: 30px;">手机号：' + escapeExpression((helper = helpers.setMobile || depth0 && depth0.setMobile, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobile, options) : helperMissing.call(depth0, "setMobile", depth0 && depth0.mobile, options))) + '</div>\r\n            </div>\r\n            <div class="modal-footer" style="padding: 10px 28px 20px 28px;background-color: #ffffff !important;border-top:none !important;">\r\n                <a class="btn pull-left h36" data-dismiss="modal" aria-hidden="true">取消</a>\r\n                <a class="btn btn-primary h36 pull-right" id="closeModalBtn2" data-dismiss="modal" data-result="';
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
        buffer += escapeExpression(stack1) + '" data-sex="';
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
        buffer += escapeExpression(stack1) + '"\r\n                   data-address="';
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
        buffer += escapeExpression(stack1) + '" data-imgUrl="';
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
        buffer += escapeExpression(stack1) + '" data-cardnum="';
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
        buffer += escapeExpression(stack1) + '"\r\n                   data-itemid="';
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
        buffer += escapeExpression(stack1) + '" data-mobilestatus="';
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
        buffer += escapeExpression(stack1) + '">确定</a>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';
        return buffer
    })
});
define("xg/eid-company-zy/1.0.4/c/handlebars/confirm4mobile-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            functionType = "function";
        buffer += '<div id="modalConfirm4mobile" class="modal fade" style="width: 335px;height: 254px;margin-left: -166px;z-index: 1052;top:175px">\r\n    <div class="modal-dialog">\r\n        <div class="modal-content radius" style="background-color: #f6f6f6">\r\n            <div class="modal-header">\r\n                <div class="modal-title" style="font-size: 17px;text-align: center;color: #323232;">温馨提示</div>\r\n            </div>\r\n            <div class="modal-body" style="font-size: 15px;padding: 26px !important;background-color: #ffffff !important">\r\n                <div style="line-height: 30px;">\r\n                    请确保输入的号码为被查询人本人的号码！\r\n                    \r\n                </div>\r\n                <div style="line-height: 30px;">手机号：' + escapeExpression((helper = helpers.setMobile || depth0 && depth0.setMobile, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.mobile, options) : helperMissing.call(depth0, "setMobile", depth0 && depth0.mobile, options))) + '</div>\r\n            </div>\r\n            <div class="modal-footer" style="padding: 10px 28px 20px 28px;background-color: #ffffff !important;border-top:none !important;">\r\n                <a class="btn pull-left h36" data-dismiss="modal" aria-hidden="true">取消</a>\r\n                <a class="btn btn-primary h36 pull-right" id="closeModalBtn" data-dismiss="modal" data-result="';
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
        buffer += escapeExpression(stack1) + '" data-sex="';
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
        buffer += escapeExpression(stack1) + '"\r\n                   data-address="';
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
        buffer += escapeExpression(stack1) + '" data-imgUrl="';
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
        buffer += escapeExpression(stack1) + '" data-cardnum="';
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
        buffer += escapeExpression(stack1) + '"\r\n                   data-itemid="';
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
        buffer += escapeExpression(stack1) + '" data-mobilestatus="';
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
        buffer += escapeExpression(stack1) + '">确定</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';
        return buffer
    })
});