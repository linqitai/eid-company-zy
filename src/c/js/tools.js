define(function(require, exports, module) {
  var $ = require("$");
  require("./bootstrap");
  require("./jquery.validate");
  require("./validate-add-methods");
  require("./validate-messages-cn");
  var moment = require("./moment.js");

  var headerTmp = require("../handlebars/headerTmp.handlebars");
  var modifyPasswordTmp = require("../handlebars/modifyPassword.handlebars");
  var modifyInfoTmp = require("../handlebars/modifyInfo.handlebars");
  var checkInfoTmp = require("../handlebars/showCheckInfo.handlebars");
  var versionH = require("../handlebars/versionH.handlebars");

  var companyId = "",
    interval = null,
    parentId = "",
    itemId = "";

  module.exports = {
    customerParentInit: function() {
      var self = this;
      // $(".logo:first").html("信鸽身份标识系统");
      console.logo("信鸽身份标识系统");
      self.getCustomerLoginInfo();
      self.modify();
      self.modify2();
      self.logout();
      //获取刷脸信息
      self.clickInfoBtn();
    },
    judgeBroswer: function() {
      // if($.browser.msie && ($.browser.version < 9)){
      //     alert("为了更好的体验，请升级到IE9以上版本！");
      // }
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
          $("body").append(versionH());
          $("#modal-version").modal("show");
          $("#modal-version").on("hidden.bs.modal", function(e) {
            // 处理代码...
            $("#modal-version").remove();
          });
        }
        if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
          $("body").append(versionH());
          $("#modal-version").modal("show");
          $("#modal-version").on("hidden.bs.modal", function(e) {
            // 处理代码...
            $("#modal-version").remove();
          });
        }
        if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
          //这里是重点，你懂的
          $("body").append(versionH());
          $("#modal-version").modal("show");
          $("#modal-version").on("hidden.bs.modal", function(e) {
            // 处理代码...
            $("#modal-version").remove();
          });
        }
        if (navigator.userAgent.indexOf("MSIE 9.0") > 0 && !window.innerWidth) {
          //这里是重点，你懂的
          $("body").append(versionH());
          $("#modal-version").modal("show");
          $("#modal-version").on("hidden.bs.modal", function(e) {
            // 处理代码...
            $("#modal-version").remove();
          });
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
        if (currentVersion < 12.0) {
          console.log("请升级你的IE浏览器到最新版本");
        }
      }
    },
    lookDetailInfo: function() {
      var self = this;
      $("#infoSureBtn").on("click", function() {
        //.log("You click me");
        $("#closeBtn").trigger("click");
        //window.location.href = "/cycle/credit/report.htm?itemId="+itemId;
      });
    },
    getCheckInfo: function() {
      var self = this;
      var data = {
        companyId: companyId
      };
      //.log(data);
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
              //clearInterval(interval);
              if ($(".passCheckBtn").text() == "人脸比对成功") {
                $(".passCheckBtn").css("color", "green");
              } else {
                $(".passCheckBtn").css("color", "red");
              }
              itemId = list[0].itemId;
            }
          } else {
            //self.tusi(data.error);
            window.location.href = "/customer/login.htm";
          }
        }
      });
    },
    clickInfoBtn: function() {
      $("body").on("click", "#closeBtn", function(e) {
        /*//.log("you click me");
                //获取刷脸信息
                interval = setInterval(self.getCheckInfo, 2000);*/
        window.location.reload();
      });
      $("body").on("click", "#infoSureBtn", function(e) {
        if (parentId == 1) {
          //.log("parentId==1");
          window.location.href = "/subShop/business/view.htm";
        } else if (parentId == 0) {
          //.log("parentId==0");
          window.location.href = "/headShop/business/view.htm";
        }
      });
    },
    //退出登录
    logout: function() {
      $("header").on("click", "#logout", function() {
        var data = {
          userType: $(this).data("usertype")
        };
        //.log(data);
        $.ajax({
          data: data,
          type: "post",
          url: "/loginOut.do",
          success: function(data) {
            //.log(data);
            if (data.code == 0) {
              window.location.href = "/customer/login.htm";
            }
          }
        });
      });
    },
    //获取用户信息
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
            $("#logoUrl").attr('src',data.user.logoUrl);
            $("#headerCompanyName").html(
              data.user.companyName + "&nbsp;&nbsp;"
            );
            $("#headerRealName").html(data.user.realName + "&nbsp;&nbsp;");
            $("#headerRoleName").before(data.user.roleName);
            $("#modifyInfo")
              .parent()
              .attr("data-customerid", data.user.customerId);
            $("#modifyInfo").parent().attr("data-mobile", data.user.mobile);
            $("#modifyInfo").parent().attr("data-realname", data.user.realName);
            $("#logout").attr("data-usertype", data.user.userType);
            if (data.user.roleName != "管理员") {
              $("#accountManage4Parent").hide();
              $("#accountManage4Sub").hide();
            }
            companyId = data.user.companyId;
            $("#companyId").val(companyId);
          } else {
            console.log("未登录或登录超时");
            window.location.href = "/customer/login.htm";
          }
        }
      });
    },
    //修改密码
    modify: function() {
      var self = this;
      $("header").on("click", "#modifyPassword", function() {
        $("body").find("#modal-modifyPassword").remove();
        $("body").append(modifyPasswordTmp());
        $("#modal-modifyPassword").modal("show");
        self.submitForm();
      });
    },
    //修改个人信息
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
          self.submitInfoForm("parent");
        } else {
          self.submitInfoForm("sub");
        }
      });
    },
    submitForm: function() {
      var self = this;
      $("#modifyPasswordForm").validate({
        debug: true, //调试模式取消submit的默认提交功能
        //errorClass: "label.error", //默认为错误的样式类为：error
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        onkeyup: false,
        onblur: true,
        submitHandler: function(form) {
          //表单提交句柄,为一回调函数，带一个参数：form
          $.ajax({
            type: "post",
            url: "/headShop/fixPassword.json",
            data: $("#modifyPasswordForm").serialize(),
            success: function(data, status, xhr) {
              //.log(data);
              if (data.code == 0) {
                self.tusi("修改成功");
                $("#modal-modifyPassword").modal("hide");
                self.getList(self.data);
              } else {
                self.tusi(data.error);
              }
            }
          });
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
      });
    },
    submitInfoForm: function(type) {
      var self = this;
      $("#modifyInfoForm").validate({
        debug: true, //调试模式取消submit的默认提交功能
        //errorClass: "label.error", //默认为错误的样式类为：error
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        onkeyup: false,
        onblur: true,
        submitHandler: function(form) {
          //表单提交句柄,为一回调函数，带一个参数：form
          $.ajax({
            type: "post",
            url:
              type == "parent"
                ? "/headShop/editSelfInfo.json"
                : "/subShop/editSelfInfo.json",
            data: $("#modifyInfoForm").serialize(),
            success: function(data, status, xhr) {
              //.log(data);
              if (data.code == 0) {
                $("#headerRealName").html($("#realName").val());
                self.tusi("编辑成功");
                $("#modal-modifyInfo").modal("hide");
              } else {
                self.tusi(data.error);
              }
            }
          });
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
      });
    },
    //获取类型（角色）列表
    getRoleList: function(roleName) {
      //.log(roleName);
      $.ajax({
        cache: false,
        type: "post",
        url: "/role/view.json",
        success: function(data) {
          //.log(data);
          if (data.code == 0) {
            var list = data.list;
            var html = "";
            for (var i = 0; i < list.length; i++) {
              if (roleName == list[i].roleName) {
                html +=
                  '<option value="' +
                  list[i].roleId +
                  '" selected>' +
                  list[i].roleName +
                  "</option>";
              } else {
                html +=
                  '<option value="' +
                  list[i].roleId +
                  '">' +
                  list[i].roleName +
                  "</option>";
              }
            }
            $("#roleId").html(html);
          } else {
            self.tusi("获取角色失败,请刷新");
          }
        }
      });
    },
    //更新图片验证码
    reloadVcode: function(element) {
      var vcodebtn = $(element),
        vcode = vcodebtn.parent().children(".checkCode"),
        initsrc = vcode.attr("src"),
        o;
      vcodebtn.on("click", function() {
        (o = $(this)), (src = initsrc + "?t=" + Math.random());
        o.parent().children(".checkCode").attr("src", src);
      });
    },
    //ie兼容placeHolder
    JPlaceHolder: function() {
      //检测
      var _check = function() {
          return "placeholder" in document.createElement("input");
        },
        //初始化
        init = function() {
          if (!_check()) {
            fix();
          }
        },
        //修复
        fix = function() {
          jQuery(":input[placeholder]").each(function(index, element) {
            var self = $(this),
              txt = self.attr("placeholder");
            self.wrap(
              $("<div></div>").css({
                position: "relative",
                zoom: "1",
                border: "none",
                background: "none",
                padding: "none",
                margin: "none"
              })
            );
            var pos = self.position(),
              h = self.outerHeight(true),
              paddingleft = self.css("padding-left");
            var holder = $('<span class="ie-placeholder"></span>')
              .text(txt)
              .css({
                position: "absolute",
                left: pos.left,
                top: pos.top,
                height: h,
                lineHeight: h + "px",
                paddingLeft: paddingleft,
                color: "#969696"
              })
              .appendTo(self.parent());
            self
              .focusin(function(e) {
                holder.hide();
              })
              .focusout(function(e) {
                if (!self.val()) {
                  holder.show();
                }
              });
            holder.click(function(e) {
              holder.hide();
              self.focus();
            });
          });
        };
      init();
    },
    //获取用户信息
    getUserInfo: function() {
      var self = this;
      var o = this;
      // require("callbacks");
      // require("deferred");
      var defer = $.Deferred();
      $.ajax({
        type: "post",
        url: "/common/ajax/user.json",
        success: function(data, status, xhr) {
          if (data.login == true) {
          } else {
          }
          defer.resolve(data);
        },
        error: function(xhr, errorType, error) {
          self.tusi(error);
        }
      });
      return defer.promise();
    },
    // 获取url上的参数
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    //设置url参数值，ref参数名,value新的参数值
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
            modify = "1";
          } else {
            setparam = arr[i].split("=")[1];
          }
          returnurl = returnurl + arr[i].split("=")[0] + "=" + setparam + "&";
        }
        returnurl = returnurl.substr(0, returnurl.length - 1);
        if (modify == "0")
          if (returnurl == str) returnurl = returnurl + "&" + ref + "=" + value;
      } else {
        if (str.indexOf("=") != -1) {
          arr = str.split("=");
          if (arr[0] == ref) {
            setparam = value;
            modify = "1";
          } else {
            setparam = arr[1];
          }
          returnurl = arr[0] + "=" + setparam;
          if (modify == "0")
            if (returnurl == str)
              returnurl = returnurl + "&" + ref + "=" + value;
        } else returnurl = ref + "=" + value;
      }
      return url.substr(0, url.indexOf("?")) + "?" + returnurl;
    },
    //删除url参数值
    removeUrlParam: function(url, ref) {
      var str = "";
      if (url.indexOf("?") != -1) {
        str = url.substr(url.indexOf("?") + 1);
      } else {
        return url;
      }
      var arr = "";
      var returnurl = "";
      var setparam = "";
      if (str.indexOf("&") != -1) {
        arr = str.split("&");
        for (i in arr) {
          if (arr[i].split("=")[0] != ref) {
            returnurl =
              returnurl +
              arr[i].split("=")[0] +
              "=" +
              arr[i].split("=")[1] +
              "&";
          }
        }
        return (
          url.substr(0, url.indexOf("?")) +
          "?" +
          returnurl.substr(0, returnurl.length - 1)
        );
      } else {
        arr = str.split("=");
        if (arr[0] == ref) {
          return url.substr(0, url.indexOf("?"));
        } else {
          return url;
        }
      }
    },
    getnewdate: function(ns) {
      var date = new Date(parseInt(ns));
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      return Y + M + D;
    },
    formatDate2: function(time) {
      var timestamp3 = time;
      var newDate = new Date();
      newDate.setTime(timestamp3);
      return new newDate.toLocaleDateString();
    },
    //时间戳转换
    formatDate: function(datitem) {
      var tra = moment(datitem).format("YYYY-MM-DD");
      // var tra = moment(datitem).format('YYYY-MM-DD HH:mm:ss');
      return tra;
    },
    //时间戳转换为全样式
    formatDateAll: function(datitem) {
      var tra = moment(datitem).format("YYYY-MM-DD HH:mm:ss");
      return tra;
    },
    //身份信息
    formatstatu: function(item, info) {
      if (info == 3) {
        return "身份证过期";
      } else {
        if (
          item == 1 ||
          item == -20 ||
          item == -10 ||
          item == 10 ||
          item == 20 ||
          item == 40
        ) {
          return "验证通过";
        }
        if (item == -1) {
          return "验证失败";
        }
      }
    },
    //人脸比对
    formatstatue: function(item, info) {
      // if(info==3&& !item){
      //     return "未校验"
      // }else{
      //     if(item==40){
      //         if(h==0){
      //             return '识别通过'
      //         }else if(h==-1){
      //             return '人工通过'
      //         }
      //     }
      //     if(item==1 ||item==-1){
      //         return "未校验"
      //     }if(item==-20){
      //          return "人工未通过"
      //     }else if(item==10){
      //         return "识别通过"
      //     }else if(item==20){
      //         return "人工通过"
      //     }
      //     else if(item==-10){
      //         return "未通过"
      //     }
      // }
      if (item == 0) {
        return "识别通过";
      } else {
        if (info == -20) {
          return "人工未通过";
        } else if (info >= 20) {
          return "人工通过";
        } else if (info == -10) {
          return "未通过";
        }
      }
    },
    //手机验证
    formatstatues: function(item, info) {
      if (item == 0) {
        return "未校验";
      } else if (item == 1) {
        return "校验失败";
      } else if (item == 2) {
        return info;
      }
    },
    // 左侧菜单-隐藏显示
    displaynavbar: function() {
      var pngfix = $(".pngfix");
      pngfix.on("click", function() {
        if ($(this).hasClass("open")) {
          $(this).removeClass("open");
          $("body").removeClass("big-page");
        } else {
          $(this).addClass("open");
          $("body").addClass("big-page");
        }
      });
    },
    tusi: function(msg, delay) {
      var delay = delay || 2000;
      $(".tusi").empty().remove();
      var tipdiv = "<span class='tusi'>" + msg + "</span>";
      $("body").append(tipdiv);
      $(".tusi").css(
        "top",
        $(document).scrollTop() + ($(window).height() - $(".tusi").height()) / 2
      );
      $(".tusi").css(
        "left",
        $(document).scrollLeft() + ($(window).width() - $(".tusi").width()) / 2
      );
      $(".tusi").show();
      setTimeout(function() {
        $(".tusi").hide();
      }, delay);
    },
    // 金额处理除以100
    formatMoney: function(money) {
      return parseFloat(money / 100).toFixed(2);
    }
  };
});
