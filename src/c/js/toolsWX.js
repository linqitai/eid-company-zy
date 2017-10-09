define(function(require, exports, module){
    require("./jquery");
    module.exports = {
        tusi: function(msg, delay) {
            var delay = delay || 2000;
            $(".tusi").empty().remove();
            var tipdiv = "<span class='tusi'>" + msg + "</span>";
            $(".page").append(tipdiv);
            $(".tusi").css('top', ($(document).scrollTop() + ($(window).height() - $(".tusi").height()) / 2));
            $(".tusi").css('left', ($(document).scrollLeft() + ($(window).width() - $(".tusi").width()) / 2));
            $(".tusi").show();
            setTimeout(function () {
                $(".tusi").hide();
            }, delay);
        },
        confirmBox: function(msg) {
            console.log("msg:");
            console.log(msg);
            var confirmTmp = require('../../c/handlebarsWX/confirm.handlebars');
            var myModalConfirm = $("#myModalConfirm");
            myModalConfirm.remove();
            $(".page").append(confirmTmp());
            $(".myModalBody").html(msg);
            $(".page").on("click","#close", function () {
                console.log("close");
                $("#myModalConfirm").remove();
                $(".modal-backdrop").remove();
            });
        },
        showTmp: function(tmp,data) {
            var myModalConfirm = $("#myModalConfirm");
            myModalConfirm.remove();
            $(".page").append(tmp(data));
            $(".page").on("click","#close", function () {
                $("#myModalConfirm").slideUp(200);
                $(".modal-backdrop").remove();
            });
        },
        //判断字符串长度区间
        isLengthInterval:function(str,min,max){
            var len = str.length;
            return (len >= min && len <= max);
        },
        //汉字验证
        isChineseChar:function(str){
            var reg = /[^\u0000-\u00FF]/;
            return reg.test(str);
        },
        isPhone : function(str){
            var reg=/^1[3|4|5|7|8][0-9]\d{8}$/;
            return reg.test(str);
        },
        isNull : function(str){
            if (str==null || str=="") {
                return true;
            } else {
                return false;
            }
        },
        isHTTP : function(str){
            if (str.indexOf("http")==0) {
                return true;
            } else {
                return false;
            }
        },
        //判断身份证是否为18位且数字加字母
        isIdentityCard:function(str){
            var reg = /^\d{17}[0-9x]$/i;
            return reg.test(str);
        },
        isEmojiCharacter:function(substring) {
            for ( var i = 0; i < substring.length; i++) {
                var hs = substring.charCodeAt(i);
                if (0xd800 <= hs && hs <= 0xdbff) {
                    if (substring.length > 1) {
                        var ls = substring.charCodeAt(i + 1);
                        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                        if (0x1d000 <= uc && uc <= 0x1f77f) {
                            return true;
                        }
                    }
                } else if (substring.length > 1) {
                    var ls = substring.charCodeAt(i + 1);
                    if (ls == 0x20e3) {
                        return true;
                    }
                } else {
                    if (0x2100 <= hs && hs <= 0x27ff) {
                        return true;
                    } else if (0x2B05 <= hs && hs <= 0x2b07) {
                        return true;
                    } else if (0x2934 <= hs && hs <= 0x2935) {
                        return true;
                    } else if (0x3297 <= hs && hs <= 0x3299) {
                        return true;
                    } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                        || hs == 0x2b50) {
                        return true;
                    }
                }
            }
        },
        //获取用户信息
        getUserInfo: function(){
            // var self = this;
            // var defer = $.Deferred();
            // $.ajax({
            //     type: "post",
            //     url: "/ajax/user.json",
            //     success: function(data, status, xhr) {
            //         if(data.code == 0){

            //         }else{

            //         }
            //         defer.resolve(data);
            //     },
            //     error: function(xhr, errorType, error) {

            //     }
            // })
            // return defer.promise();
        },
        //url参数查询
        GetQueryString: function(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        //设置url参数值，ref参数名,value新的参数值
        setUrlParam: function(url, ref, value){
            var str = "";
            if (url.indexOf('?') != -1)
                str = url.substr(url.indexOf('?') + 1);
            else
                return url + "?" + ref + "=" + value;
            var returnurl = "";
            var setparam = "";
            var arr;
            var modify = "0";
            if (str.indexOf('&') != -1) {
                arr = str.split('&');
                for (i in arr) {
                    if (arr[i].split('=')[0] == ref) {
                        setparam = value;
                        modify = "1";
                    }
                    else {
                        setparam = arr[i].split('=')[1];
                    }
                    returnurl = returnurl + arr[i].split('=')[0] + "=" + setparam + "&";
                }
                returnurl = returnurl.substr(0, returnurl.length - 1);
                if (modify == "0")
                    if (returnurl == str)
                        returnurl = returnurl + "&" + ref + "=" + value;
            }
            else {
                if (str.indexOf('=') != -1) {
                    arr = str.split('=');
                    if (arr[0] == ref) {
                        setparam = value;
                        modify = "1";
                    }
                    else {
                        setparam = arr[1];
                    }
                    returnurl = arr[0] + "=" + setparam;
                    if (modify == "0")
                        if (returnurl == str)
                            returnurl = returnurl + "&" + ref + "=" + value;
                }
                else
                    returnurl = ref + "=" + value;
            }
            return url.substr(0, url.indexOf('?')) + "?" + returnurl;
        },
        GetRequest: function() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        //数组去重
        arrayUnique: function(arr) {
            var n = {}, r=[]; //n为hash表，r为临时数组
            for(var i = 0; i < arr.length; i++) //遍历当前数组
            {
                if (!n[arr[i]]) //如果hash表中没有当前项
                {
                    n[arr[i]] = true; //存入hash表
                    r.push(arr[i]); //把当前数组的当前项push到临时数组里面
                }
            }
            return r;
        },
        //函数节流
        throttle: function(fn, delay, immediate, debounce) {
            var curr = +new Date(),//当前事件
                last_call = 0,
                last_exec = 0,
                timer = null,
                diff, //时间差
                context,//上下文
                args,
                exec = function () {
                    last_exec = curr;
                    fn.apply(context, args);
                };
            return function () {
                curr= +new Date();
                context = this,
                    args = arguments,
                    diff = curr - (debounce ? last_call : last_exec) - delay;
                clearTimeout(timer);
                if (debounce) {
                    if (immediate) {
                        timer = setTimeout(exec, delay);
                    } else if (diff >= 0) {
                        exec();
                    }
                } else {
                    if (diff >= 0) {
                        exec();
                    } else if (immediate) {
                        timer = setTimeout(exec, -diff);
                    }
                }
                last_call = curr;
            }
        },
        //函数去抖
        debounce: function(fn, delay, immediate) {
            return module.exports.throttle(fn, delay, immediate, true);
        },
        //数组查位
        searchNumber:function (array,findNumber) {
            var defer = $.Deferred();
            for(var i =0 ;i<array.length;i++){
                if(array[i] == findNumber){
                    defer.resolve(true);
                    return i;
                }
            }
            return defer.promise();
        },
        inputResize: function(filterSelector){
            $("input, textarea").not(filterSelector).unbind("focus").on("focus", function(e){
                setTimeout(function(){
                    var elementTop = $(e.target).offset().top, // $element是保存的input
                        elementBottom = elementTop + $(e.target).height();
                    $(".content").scrollTop(elementBottom);
                },300);
            });
        },
        inputResizeFind: function(selector, tag) {
            $(selector).find("input, textarea").unbind("focus").bind("focus", function(e){
                setTimeout(function(){
                    var elementTop = $(e.target).offset().top; // $element是保存的input
                    if(tag){
                        var elementBottom = elementTop+$(e.target).height();
                    } else {
                        var elementBottom = elementTop-$(e.target).height();
                    }

                    $(".content").scrollTop(elementBottom);
                },300);
            });
        },
        inputResizeFind2: function(selector, tag) {
            $(selector).find("input, textarea").unbind("focus").bind("focus", function(e){
                setTimeout(function(){
                    var elementTop = $(e.target).offset().top; // $element是保存的input
                    if(tag){
                        var elementBottom = elementTop+$(e.target).height();
                    } else {
                        var elementBottom = elementTop-$(e.target).height();
                    }
                    $(".content").scrollTop(elementBottom);
                },300);
            });
        },
        //金额输入框，连续输入0时按一个0显示
        inputMoneyZero: function(){
            $("input[data=money]").on("keyup", function(){
                var txt = $(this).val();
                if(txt != "" && Number(txt) === 0){
                    if(txt.indexOf(".") != -1) {
                        $(this).val("0.");
                    } else {
                        $(this).val("0");
                    }
                };
            });

        }
    };
});