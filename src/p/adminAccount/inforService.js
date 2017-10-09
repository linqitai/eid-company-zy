define(function(require, exports, module) {
  var $ = require("$"),
    tools = require("../../c/js/tools");
  require("../../c/js/jquery.pager");
  require("../../c/js/registerHelper");
  require("../../c/static/h-ui/js/H-ui");
  require("../../c/css/bootstrap.css");
  require("../../c/css/bootstrap-datetimepicker.css");
  require("../../c/js/bootstrap-datetimepicker");
  require("../../c/js/bootstrap-datetimepicker.zh-CN");
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
  var inforServiceMH = require("../../p/adminAccount/inforServiceH/inforServiceMH.handlebars"),
    inforServiceTableH = require("../../p/adminAccount/inforServiceH/inforServiceTableH.handlebars"),
    picter = require("../../p/adminAccount/inforServiceH/picter.handlebars");

  var hcg = "";

  var inforService = {
    init: function() {
      var self = this;
      // self.getStoreNameList();
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
        console.log(4545545445);
      } else {
        var start = tools.getUrlParam("_startTime");
        var end = tools.getUrlParam("_endTime");
      }

      $(".customerM").html(inforServiceMH());
      $("#picter").html(picter());

      self.datetimepicker();
      if (levelval == 1) {
        setTimeout(function() {
          $(".color-green").removeClass("btn-link").addClass("current");
        }, 150);
      } else if (levelval == 2) {
        setTimeout(function() {
          $(".color-yellow").removeClass("btn-link").addClass("current");
        }, 150);
      } else if (levelval == 3) {
        setTimeout(function() {
          $(".color-red").removeClass("btn-link").addClass("current");
        }, 150);
      } else if (!levelval) {
        setTimeout(function() {
          $(".color-all").removeClass("btn-link").addClass("current");
        }, 150);
      }
      if (yewuval == 1) {
        setTimeout(function() {
          $(".statu-pass").removeClass("btn-link").addClass("current");
        }, 150);
      } else if (yewuval == 2) {
        setTimeout(function() {
          $(".statu-unpass").removeClass("btn-link").addClass("current");
        }, 150);
      } else if (!yewuval) {
        setTimeout(function() {
          $(".statu-all").removeClass("btn-link").addClass("current");
        }, 150);
      }
      if (mobileval == 2) {
        setTimeout(function() {
          $(".mobile-succ").removeClass("btn-link").addClass("current");
        }, 150);
      } else if (!mobileval) {
        if (reportTime) {
          if (reportTime == 0) {
            setTimeout(function() {
              $(".mobile-all").removeClass("btn-link").addClass("current");
            }, 150);
          } else {
          }
        }
      }
      if (reportTime) {
        if (reportTime == 0) {
          console.log("aaaa");
        } else {
          setTimeout(function() {
            $(".mobile-succ").removeClass("btn-link").addClass("current");
          }, 150);
        }
      } else {
        setTimeout(function() {
          $(".mobile-all").removeClass("btn-link").addClass("current");
        }, 150);
      }
      if (reportTime) {
        if (reportTime == 0) {
        } else {
          mobileval = 2;
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
          // status: tools.getUrlParam("status") || "",
          // queryTime: tools.getUrlParam("queryTime") || "all"
        };
        self.inforServiceList(data);
      }, 100);

      self.inforServiceLists();
      self.searchInforService();
      self.statusTab();
      self.queryTimeTab();
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
          $("#endTime").attr("placeholder", urlendtime);
        }
      }
      $("body").find(".startTime").on("change", function(e) {
        $(".endTime").datetimepicker("setStartDate", $(".startTime").val());
        if ($.trim($(".endTime").val()).length <= 0) {
          $(".endTime").val($(".startTime").val());
        } else {
        }
        start = $(".startTime").val().length > 0 ? $(".startTime").val() : "";
        end = $(".endTime").val().length > 0 ? $(".endTime").val() : "";
        start =
          $(".startTime").val().length > 0
            ? $(".startTime").val() + "  " + ""
            : "";
        end =
          $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "" : "";
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
        self.inforServiceList(data);
      });
      $("body").find(".endTime").on("change", function(e) {
        $(".startTime").datetimepicker("setEndDate", $(".endTime").val());
        if ($.trim($(".startTime").val()).length <= 0) {
          $(".startTime").val($(".endTime").val());
        } else {
        }
        start =
          $(".startTime").val().length > 0
            ? $(".startTime").val() + "  " + ""
            : "";
        end =
          $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "" : "";
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
        self.inforServiceList(data);
      });
      // $(document).on("click", ".customStartTime", function () {
      //     $('.customStartTime').datetimepicker('show');
      //     $('.customEndTime').datetimepicker('hide');

      // })
      // $(document).on("click", ".customEndTime", function () {
      //     $('.customEndTime').datetimepicker('show');
      //     $('.customStartTime').datetimepicker('hide');
      //     console.log(1)
      // })
      // $('.customStartTime').datetimepicker().on('changeDate', function (e) {
      //     $("#queryTime a").removeClass("current");
      //     console.log($(".customStartTime").val())
      //     $('.customEndTime').datetimepicker('setStartDate', $('.customStartTime').val());
      //     if ($.trim($(".customEndTime").val()).length <= 0) {
      //         $(".customEndTime").val($('.customStartTime').val());
      //     } else {
      //         // alert("请选择")
      //     }
      //     data.pageIndex = 1;
      //     data.customStartTime = $(".customStartTime").val();
      //     data.customEndTime = $(".customEndTime").val();
      //     data.companyName = $("#companyName").val();
      //     data.childName = $("#childName").val();
      //     data.borrowerName = $("#borrowerName").val();
      //     delete data["queryTime"];
      //     self.inforServiceList();
      // })
      // $('.customEndTime').datetimepicker().on('changeDate', function (e) {
      //     $("#queryTime a").removeClass("current");
      //     console.log($(".customEndTime").val())
      //     $('.customStartTime').datetimepicker('setEndDate', $('.customEndTime').val());
      //     if ($.trim($(".customStartTime").val()).length <= 0) {
      //         $(".customStartTime").val($('.customEndTime').val());
      //     } else {

      //     }
      //     data.pageIndex = 1;
      //     data.customStartTime = $(".customStartTime").val();
      //     data.customEndTime = $(".customEndTime").val();
      //     data.companyName = $("#companyName").val();
      //     data.childName = $("#childName").val();
      //     data.borrowerName = $("#borrowerName").val();
      //     delete data["queryTime"];
      //     self.inforServiceList();
      // })
    },
    //获取店铺名
    // getStoreNameList: function (data) {
    //     if (tools.getUrlParam("companyId")) {
    //         $.ajax({
    //             data: { companyId: tools.getUrlParam("companyId") },
    //             cache: false,
    //             type: "post",
    //             url: '/master/count/companyList.json',
    //             success: function (data) {
    //                 if (data.code == 0) {
    //                     var list = data.list;
    //                     console.log(3261)
    //                     console.log(list)
    //                     console.log(tools.getUrlParam("companyId"))
    //                     for (var k = 0; k < list.length; k++) {
    //                         if (list[k].companyId == tools.getUrlParam("companyId")) {
    //                             console.log(k)
    //                             $("#companyName").val(list[k].companyName)
    //                             hcg = list[k].companyName
    //                         }
    //                     }
    //                     // $("#storeNameSelect").empty().append('<option value="">全部</option>')
    //                     // for (var i = 0; i < list.length; i++) {
    //                     //     console.log(list[i].companyId)
    //                     //     $("#storeNameSelect").append('<option value="' + list[i].companyId + '">' + list[i].companyName + '</option>')
    //                     // }
    //                 } else {
    //                     tools.tusi(data.error);
    //                 }
    //             }
    //         });
    //     }
    // },
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
        self.inforServiceList(data);
      });
      $(document).on("click", "#idcard1", function() {
        var _this = $(this);
        c1 = _this.data("c");
        idvals = _this.data("idval");
        if (unval) {
          unval = "";
        }
        if ((mobileval && faceval) || mobileval || faceval) {
          console.log(1);
        } else {
          commonval = _this.data("idval");
          console.log(2);
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
        self.inforServiceList(data);
      });
      $(document).on("click", "#idcard2", function() {
        var _this = $(this);
        if (
          a2 == 2 ||
          a3 == 3 ||
          a4 == 4 ||
          a5 == 5 ||
          b1 == 1 ||
          b2 == 2 ||
          b3 == 3 ||
          d1 == 1 ||
          d2 == 2 ||
          d3 == 3 ||
          d4 == 4 ||
          e1 == 1 ||
          e2 == 2 ||
          e3 == 3 ||
          f2 == 2 ||
          f3 == 3
        ) {
        } else {
          c2 = _this.data("c");
          idvals = _this.data("idval");
          console.log(1);
          console.log(faceval);
          console.log(1);
          if (unval) {
            unval = "";
          }
          if ((mobileval && faceval) || mobileval || faceval) {
            console.log(1);
          } else {
            commonval = _this.data("idval");
            console.log(2);
          }
          if (
            mobileval == 2 ||
            mobileval == 1 ||
            faceval == 10 ||
            faceval == 20 ||
            faceval == -10 ||
            faceval == -20
          ) {
          } else if (mobileval == 0 || mobileval == null || faceval == null) {
            $(this).removeClass("btn-link").addClass("current");
            $(this)
              .siblings(".btn")
              .removeClass("current")
              .addClass("btn-link");
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
            self.inforServiceList(data);
          }
        }
      });
      $(document).on("click", "#idcard3", function() {
        var _this = $(this);
        c3 = _this.data("c");
        if ((mobileval && faceval) || mobileval || faceval) {
          console.log(1);
        } else {
          commonval = "";
          console.log(2);
        }
        console.log(idvals);
        if (idvals) {
          commonval = "";
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
        self.inforServiceList(data);
      });
      //   $(document).on("click", "#bankStatus a", function() {
      //     var _this = $(this);
      //     yewuval = _this.data("yewu");
      //     if (yewuval == 4) {
      //       yewuval = "";
      //       statuvals = 0;
      //     } else {
      //       statuvals = "";
      //       yewuval = $(this).data("yewu");
      //     }
      //     $(this).removeClass("btn-link").addClass("current");
      //     $(this).siblings(".btn").removeClass("current").addClass("btn-link");
      //     data.pageIndex = 1;
      //     pageSize = 10;
      //     data.flowStatus = commonval;
      //     data.queryTime = queryval;
      //     data.idenAuthentication = unval;
      //     data.source = infoval;
      //     (data.isChecked = statuvals), (data.level = levelval ? levelval : "");
      //     data.status = yewuval || yewuval == 0 ? yewuval : "";
      //     data.customStartTime = start ? start : "";
      //     data.customEndTime = end ? end : "";
      //     data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
      //     data.companyName = $("#companyName").val();
      //     data.childName = $("#childName").val();
      //     data.borrowerName = $("#borrowerName").val();
      //     data.mobile = $("#borrowerName1").val();
      //     self.inforServiceList(data);
      //   });
      // $(document).on("click", "#statusSelect1 a", function () {
      //     var _this = $(this);
      //     levelval = _this.data("level")
      //     $(this).removeClass("btn-link").addClass("current");
      //     $(this).siblings(".btn").removeClass("current").addClass("btn-link");
      //     data.pageIndex = 1;
      //     pageSize = 10;
      //     data.flowStatus = commonval;
      //     data.queryTime = queryval;
      //     data.idenAuthentication = unval;
      //     data.source = infoval;
      //     data.level = levelval ? levelval : "";
      //     data.status = (yewuval || yewuval == 0) ? yewuval : '';
      //     data.customStartTime = start ? start : "";
      //     data.customEndTime = end ? end : "";
      //     data.mobileStatus = (mobileval || mobileval == 0) ? mobileval : "";
      //     data.companyName = $("#companyName").val();
      //     data.childName = $("#childName").val();
      //     data.borrowerName = $("#borrowerName").val();
      //     data.mobile = $("#borrowerName1").val();
      //     self.inforServiceList(data);
      // });
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
          statuvals = 0;
        } else {
          statuvals = "";
          yewuval = $(this).data("yewu");
        }
        $(this).removeClass("btn-link").addClass("current");
        $(this).siblings(".btn").removeClass("current").addClass("btn-link");
        data.pageIndex = 1;
        pageSize = 10;
        data.flowStatus = commonval;
        data.queryTime = queryval;
        data.idenAuthentication = unval;
        data.source = infoval;
        (data.isChecked = statuvals), (data.level = levelval ? levelval : "");
        data.status = yewuval || yewuval == 0 ? yewuval : "";
        data.customStartTime = start ? start : "";
        data.customEndTime = end ? end : "";
        data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
        data.companyName = $("#companyName").val();
        data.childName = $("#childName").val();
        data.borrowerName = $("#borrowerName").val();
        data.mobile = $("#borrowerName1").val();
        self.inforServiceList(data);
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
          statuvals = 0;
        } else {
          statuvals = "";
          yewuval = $(this).data("yewu");
        }
        $(this).removeClass("btn-link").addClass("current");
        $(this).siblings(".btn").removeClass("current").addClass("btn-link");
        data.pageIndex = 1;
        pageSize = 10;
        data.flowStatus = commonval;
        data.queryTime = queryval;
        data.idenAuthentication = unval;
        data.source = infoval;
        (data.isChecked = statuvals), (data.level = levelval ? levelval : "");
        data.status = yewuval || yewuval == 0 ? yewuval : "";
        data.customStartTime = start ? start : "";
        data.customEndTime = end ? end : "";
        data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
        data.companyName = $("#companyName").val();
        data.childName = $("#childName").val();
        data.borrowerName = $("#borrowerName").val();
        data.mobile = $("#borrowerName1").val();
        self.inforServiceList(data);
      });
      $(document).on("click", "#statu2", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2 || d3 == 3) {
        } else {
          a2 = _this.data("a");
          a1 = "";
          a3 = "";
          a4 = "";
          a5 = "";
          yewuval = _this.data("yewu");
          if (yewuval == 4) {
            yewuval = "";
            statuvals = 0;
          } else {
            statuvals = "";
            yewuval = $(this).data("yewu");
          }
          $(this).removeClass("btn-link").addClass("current");
          $(this).siblings(".btn").removeClass("current").addClass("btn-link");
          data.pageIndex = 1;
          pageSize = 10;
          data.flowStatus = commonval;
          data.queryTime = queryval;
          data.idenAuthentication = unval;
          data.source = infoval;
          (data.isChecked = statuvals), (data.level = levelval ? levelval : "");
          data.status = yewuval || yewuval == 0 ? yewuval : "";
          data.customStartTime = start ? start : "";
          data.customEndTime = end ? end : "";
          data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
          data.companyName = $("#companyName").val();
          data.childName = $("#childName").val();
          data.borrowerName = $("#borrowerName").val();
          data.mobile = $("#borrowerName1").val();
          self.inforServiceList(data);
        }
      });
      $(document).on("click", "#statu3", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2 || d3 == 3) {
        } else {
          a3 = _this.data("a");
          a1 = "";
          a2 = "";
          a4 = "";
          a5 = "";
          yewuval = _this.data("yewu");
          if (yewuval == 4) {
            yewuval = "";
            statuvals = 0;
          } else {
            statuvals = "";
            yewuval = $(this).data("yewu");
          }
          $(this).removeClass("btn-link").addClass("current");
          $(this).siblings(".btn").removeClass("current").addClass("btn-link");
          data.pageIndex = 1;
          pageSize = 10;
          data.flowStatus = commonval;
          data.queryTime = queryval;
          data.idenAuthentication = unval;
          data.source = infoval;
          (data.isChecked = statuvals), (data.level = levelval ? levelval : "");
          data.status = yewuval || yewuval == 0 ? yewuval : "";
          data.customStartTime = start ? start : "";
          data.customEndTime = end ? end : "";
          data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
          data.companyName = $("#companyName").val();
          data.childName = $("#childName").val();
          data.borrowerName = $("#borrowerName").val();
          data.mobile = $("#borrowerName1").val();
          self.inforServiceList(data);
        }
      });
      $(document).on("click", "#statu4", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2 || d3 == 3) {
        } else {
          a4 = _this.data("a");
          a1 = "";
          a2 = "";
          a3 = "";
          a5 = "";
          yewuval = _this.data("yewu");
          if (yewuval == 4) {
            yewuval = "";
            statuvals = 0;
          } else {
            statuvals = "";
            yewuval = $(this).data("yewu");
          }
          $(this).removeClass("btn-link").addClass("current");
          $(this).siblings(".btn").removeClass("current").addClass("btn-link");
          data.pageIndex = 1;
          pageSize = 10;
          data.flowStatus = commonval;
          data.queryTime = queryval;
          data.idenAuthentication = unval;
          data.source = infoval;
          (data.isChecked = statuvals), (data.level = levelval ? levelval : "");
          data.status = yewuval || yewuval == 0 ? yewuval : "";
          data.customStartTime = start ? start : "";
          data.customEndTime = end ? end : "";
          data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
          data.companyName = $("#companyName").val();
          data.childName = $("#childName").val();
          data.borrowerName = $("#borrowerName").val();
          data.mobile = $("#borrowerName1").val();
          self.inforServiceList(data);
        }
      });
      $(document).on("click", "#statu5", function() {
        var _this = $(this);
        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2 || d3 == 3) {
        } else {
          a5 = _this.data("a");
          a1 = "";
          a2 = "";
          a3 = "";
          a4 = "";
          yewuval = _this.data("yewu");
          if (yewuval == 4) {
            yewuval = "";
            statuvals = 0;
          } else {
            statuvals = "";
            yewuval = $(this).data("yewu");
          }
          $(this).removeClass("btn-link").addClass("current");
          $(this).siblings(".btn").removeClass("current").addClass("btn-link");
          data.pageIndex = 1;
          pageSize = 10;
          data.flowStatus = commonval;
          data.queryTime = queryval;
          data.idenAuthentication = unval;
          data.source = infoval;
          (data.isChecked = statuvals), (data.level = levelval ? levelval : "");
          data.status = yewuval || yewuval == 0 ? yewuval : "";
          data.customStartTime = start ? start : "";
          data.customEndTime = end ? end : "";
          data.mobileStatus = mobileval || mobileval == 0 ? mobileval : "";
          data.companyName = $("#companyName").val();
          data.childName = $("#childName").val();
          data.borrowerName = $("#borrowerName").val();
          data.mobile = $("#borrowerName1").val();
          self.inforServiceList(data);
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
        self.inforServiceList(data);
      });
      $(document).on("click", "#levebtn1", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {
        } else {
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
          self.inforServiceList(data);
        }
      });
      $(document).on("click", "#levebtn2", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {
        } else {
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
          self.inforServiceList(data);
        }
      });
      $(document).on("click", "#levebtn3", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {
        } else {
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
          self.inforServiceList(data);
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
        self.inforServiceList(data);
      });
      $(document).on("click", "#face1", function() {
        var _this = $(this);
        if (c2 == 2) {
        } else {
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
          self.inforServiceList(data);
        }
      });
      $(document).on("click", "#face2", function() {
        var _this = $(this);
        if (b3 == 3 || c2 == 2) {
        } else {
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
          self.inforServiceList(data);
        }
      });
      $(document).on("click", "#face3", function() {
        var _this = $(this);
        if (
          c2 == 2 ||
          b3 == 3 ||
          b1 == 1 ||
          b2 == 2 ||
          f3 == 3 ||
          f2 == 2 ||
          f1 == 1 ||
          a2 == 2 ||
          a3 == 3 ||
          a4 == 4 ||
          a5 == 5
        ) {
        } else {
          d3 = _this.data("d");
          d1 = "";
          d2 = "";
          d4 = "";
          faceval = _this.data("face");
          commonval = _this.data("face");
          if (mobileval == 0 || mobileval == null) {
            $(this).removeClass("btn-link").addClass("current");
            $(this)
              .siblings(".btn")
              .removeClass("current")
              .addClass("btn-link");
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
            self.inforServiceList(data);
          }
        }
      });
      $(document).on("click", "#face4", function() {
        var _this = $(this);
        if (
          a2 == 2 ||
          a4 == 4 ||
          b1 == 1 ||
          b2 == 2 ||
          b3 == 3 ||
          f2 == 2 ||
          f3 == 3 ||
          a3 == 3 ||
          c2 == 2
        ) {
        } else {
          d4 = _this.data("d");
          d1 = "";
          d2 = "";
          d3 = "";
          faceval = _this.data("face");
          commonval = _this.data("face");
          if (mobileval == 0 || mobileval == null) {
            $(this).removeClass("btn-link").addClass("current");
            $(this)
              .siblings(".btn")
              .removeClass("current")
              .addClass("btn-link");
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
            self.inforServiceList(data);
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
        self.inforServiceList(data); // var url = tools.setUrlParam(location.href, "status", data.status);
        // location.href = url;
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
        self.inforServiceList(data);
      });
      $(document).on("click", "#check1", function() {
        var _this = $(this);
        if (
          b1 == 1 ||
          b2 == 2 ||
          b3 == 3 ||
          a2 == 2 ||
          a3 == 3 ||
          a4 == 4 ||
          a5 == 5 ||
          d3 == 3 ||
          c2 == 2
        ) {
        } else {
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
          self.inforServiceList(data);
        }
      });
      $(document).on("click", "#check2", function() {
        var _this = $(this);
        if (
          b1 == 1 ||
          b2 == 2 ||
          b3 == 3 ||
          c2 == 2 ||
          d4 == 4 ||
          d3 == 3 ||
          a2 == 2 ||
          a3 == 3 ||
          a4 == 4 ||
          a5 == 5
        ) {
        } else {
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
          self.inforServiceList(data);
        }
      });
      $(document).on("click", "#check3", function() {
        var _this = $(this);
        if (d4 == 4 || c2 == 2 || d3 == 3) {
        } else {
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
          self.inforServiceList(data);
        }
      });
    },
    queryTimeTab: function() {
      var self = this;
      $(document).on("click", "#queryTime a", function() {
        var _this = $(this);
        queryval = _this.data("querytime");
        console.log(queryval);
        $(this).removeClass("btn-link").addClass("current");
        $(this).siblings(".btn").removeClass("current").addClass("btn-link");
        // delete data["customStartTime"];
        // delete data["customEndTime"];
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
        self.inforServiceList(data); // var url = tools.setUrlParam(location.href, "queryTime", data.queryTime);
        // location.href = url;
      });
    },
    inforServiceList: function(data) {
      console.log(data);
      var self = this;
      $.ajax({
        type: "post",
        // url: "/master/borrowingInfo/list.json",
        url: "/company/master/borrowingInfo/list.json",
        data: data,
        success: function(data, status, xhr) {
          if (data.code == -1) {
            alert(data.error);
          } else {
            console.log(data.list);
            $(".inforTable").html(inforServiceTableH(data.list));
            self.pagerInit(data.count);
          }
        },
        error: function(xhr, errorType, error) {
          alert(error);
        }
      });
    },
    inforServiceLists: function() {
      var self = this;
      $.ajax({
        type: "post",
        url: "/company/queryBorrowingItemStatusCount.json",
        data: {},
        success: function(data, status, xhr) {
          if (data.code == -1) {
            alert(data.error);
          } else {
            console.log(data.obj);
            $(".customerM").html(inforServiceMH(data.obj));
            self.pagerInit(data.count);
          }
        },
        error: function(xhr, errorType, error) {
          alert(error);
        }
      });
    },
    pagerInit: function(totalcount) {
      var self = this;
      if (totalcount > 0) {
        $("#pager").show();
      } else {
        $("#pager").hide();
      }
      $("#pager").pager({
        pagenumber: data.pageIndex,
        pagecount: Math.ceil(totalcount / data.pageSize),
        totalcount: totalcount,
        //回调函数
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
          self.inforServiceList(data);
        }
      });
    },
    searchInforService: function() {
      var self = this;
      var validate = $("#infor_searchForm").validate({
        debug: true, //调试模式取消submit的默认提交功能
        //errorClass: "label.error", //默认为错误的样式类为：error
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应
        onkeyup: false,
        onblur: true,
        submitHandler: function(form) {
          //表单提交句柄,为一回调函数，带一个参数：form
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
          self.inforServiceList(data);
        }
        // rules:{
        //     companyName:{
        //         required:true
        //     }
        // },
        // messages:{
        //     companyName:{
        //         required: "<i>*</i>客户名称不能为空，请输入"
        //     }
        // }
      });
    }
  };
  module.exports = inforService;
  // main.init();
});
