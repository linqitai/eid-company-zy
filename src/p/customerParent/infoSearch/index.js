define(function(require, exports, module) {
  var $ = require("$"),
    tools = require("../../../c/js/toolsSocket");
  require("../../../c/js/jquery.pager");
  require("../../../c/js/registerHelper");
  require("../../../c/static/h-ui/js/H-ui");
  require("../../../c/js/bootstrap-datetimepicker");
  require("../../../c/js/bootstrap-datetimepicker.zh-CN");
  require("../../../c/js/jquery.provincesCity2");

  var queryBoxTmp = require("./queryBoxTmp.handlebars");
  var listTmp = require("./listTmp.handlebars");
  var picter = require("./picter.handlebars");
  var province = "";
  var city = "";
  var commonval = "";
  var faceval = "";
  var idvals = "";
  var sourceval = "";
  var unval = "";
  var statuvals = "";
  var storeName = "";
  var testval = "";
  var failval = "";
  var a0 = "";
  var a1 = "";
  var a2 = "";
  var a3 = "";
  var a4 = "";
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
  var levelval = tools.getUrlParam("level");
  var statuval = tools.getUrlParam("status");
  var mobileval = tools.getUrlParam("mobileStatus");
  var queryDateType = tools.getUrlParam("queryDateType");
  var dcompanyId = tools.getUrlParam("companyId");
  var start = tools.getUrlParam("_startTime");
  var end = tools.getUrlParam("_endTime");
  var reportTime = tools.getUrlParam("reportTime");
  var main = {
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
      } else {
        var start = tools.getUrlParam("_startTime");
        var end = tools.getUrlParam("_endTime");
      }
      console.log(toString(dcompanyId));
      tools.displaynavbar();
      tools.customerParentInit();
      //导入搜索栏
      $("#queryBoxID").html(queryBoxTmp());
      $("#picter").html(picter());
      self.setDatetimepicker();
      //初始化地址选择控件
      $("#address").ProvinceCity2();
      //获取门店名称列表
      var province = $("#province").val();
      var city = $("#city").val();
      var data = {
        province: province,
        city: city
      };
      //.log(data);
      self.getStoreNameList(data);
      self.list = $("#tableBox");
      self.lists = $("#queryBoxID");
      if (levelval == 1) {
        setTimeout(function() {
          $(".color-green").removeClass("btn-link").addClass("primary");
        }, 150);
      } else if (levelval == 2) {
        setTimeout(function() {
          $(".color-yellow").removeClass("btn-link").addClass("primary");
        }, 150);
      } else if (levelval == 3) {
        setTimeout(function() {
          $(".color-red").removeClass("btn-link").addClass("primary");
        }, 150);
      } else if (!levelval) {
        setTimeout(function() {
          $(".color-all").removeClass("btn-link").addClass("primary");
        }, 150);
      }
      if (statuval == 1) {
        setTimeout(function() {
          $(".statu-pass").removeClass("btn-link").addClass("primary");
        }, 150);
      } else if (statuval == 2) {
        setTimeout(function() {
          $(".statu-unpass").removeClass("btn-link").addClass("primary");
        }, 150);
      } else if (!statuval) {
        setTimeout(function() {
          $(".statu-all").removeClass("btn-link").addClass("primary");
        }, 150);
      }
      if (mobileval == 2) {
        setTimeout(function() {
          $(".mobile-succ").removeClass("btn-link").addClass("primary");
        }, 150);
      } else if (!mobileval) {
        if (reportTime) {
          if (reportTime == 0) {
            setTimeout(function() {
              $(".mobile-all").removeClass("btn-link").addClass("primary");
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
            $(".mobile-succ").removeClass("btn-link").addClass("primary");
          }, 100);
        }
      } else {
        setTimeout(function() {
          $(".mobile-all").removeClass("btn-link").addClass("primary");
        }, 100);
      }

      console.log(mobileval);
      if (reportTime) {
        if (reportTime == 0) {
        } else {
          mobileval = 2;
        }
      } else {
      }

      self.data = {
        pageIndex: 1,
        pageSize: 10,
        flowStatus: commonval,
        _startTime: start ? start : "",
        _endTime: end ? end : "",
        isChecked: statuvals,
        mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
        status: statuval ? statuval : "",
        level: levelval ? levelval : "",
        idenAuthentication: unval,
        province: province,
        city: city,
        businessProgress: tools.getUrlParam("businessProgress"),
        companyId: dcompanyId ? dcompanyId : storeName,
        mobileOrName: $("#searchText").val().trim()
      };
      self.getLists(self.data);
      self.getList(self.data);
      self.initEvents();
    },
    setDatetimepicker: function() {
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

      //时间框点击事件
      $("body").on("click", "#startTime", function() {
        $("body").find("#startTime").datetimepicker("show");
      });
      $("body").on("click", "#endTime", function() {
        $("body").find("#endTime").datetimepicker("show");
      });
      $("body").find(".startTime").on("change", function(e) {
        $("#queryTime  input.btn.primary")
          .removeClass("primary")
          .addClass("btn-link");
        console.log("changeDate");
        $(".endTime").datetimepicker("setStartDate", $(".startTime").val());
        if ($.trim($(".endTime").val()).length <= 0) {
          $(".endTime").val($(".startTime").val());
        }
        console.log($(".startTime").val().length);
        start = $(".startTime").val().length > 0 ? $(".startTime").val() : "";
        end = $(".endTime").val().length > 0 ? $(".endTime").val() : "";
        // start = $(".startTime").val().length > 0 ? $(".startTime").val() + "  " + "00" : ""
        // end = $(".endTime").val().length > 0 ? $(".endTime").val() + " " + "00" : ""
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $("body").find(".endTime").on("change", function(e) {
        $("#queryTime input.btn.primary")
          .removeClass("primary")
          .addClass("btn-link");
        console.log("changeDate");
        start = $(".startTime").val().length > 0 ? $(".startTime").val() : "";
        end = $(".endTime").val().length > 0 ? $(".endTime").val() : "";
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
    },
    initEvents: function() {
      var self = this;
      $("body").on("click", "#closeBtn", function(e) {
        self.getList(self.data);
      });
      $("body").on("click", ".close", function() {
        /*window.location.reload();*/
        self.getList(self.data);
      });
      //详情按钮点击事件
      $("body").on("click", ".detailBtn", function() {
        console.log("click");
        setTimeout(function() {
          console.log("已刷新");
          //获取初始化列表
          self.getList(self.data);
        }, 3000);
      });
      //地区选择改变事件
      $("#city,#province").on("change", function() {
        province = $("#province").val();
        city = $("#city").val();
        //.log(province+","+city);
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
        //获取门店名称列表
        var data = {
          province: province,
          city: city
        };
        //.log(data);
        self.getStoreNameList(data);
      });
      //门店名称选择事件
      $("#storeNameSelect").on("change", function() {
        storeName = $(this).val();
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      //状态按钮点击事件
      // $(document).on("click", "#statusSelect input[type=button]", function(
      // ) {
      //   // event.preventDefault();
      //   self.statu = $(this).data("statu");
      //   if (self.statu == 4) {
      //     statuval = "";
      //     statuvals = 0;
      //   } else {
      //     statuvals = "";
      //     statuval = $(this).data("statu");
      //   }
      //   $(this).removeClass("btn-link").addClass("primary");
      //   $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
      //   self.data = {
      //     pageIndex: 1,
      //     pageSize: 10,
      //     flowStatus: commonval,
      //     _startTime: start ? start : "",
      //     _endTime: end ? end : "",
      //     isChecked: statuvals,
      //     source: sourceval,
      //     mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
      //     status: statuval || statuval == 0 ? statuval : "",
      //     level: levelval ? levelval : "",
      //     idenAuthentication: unval,
      //     province: province,
      //     city: city,
      //     companyId: dcompanyId ? dcompanyId : storeName,
      //     mobileOrName: $("#searchText").val().trim()
      //   };
      //   self.getList(self.data);
      // });
      // $(document).on("click", "#statusSelect1 input[type=button]", function() {
      //   levelval = $(this).data("level");
      //   $(this).removeClass("btn-link").addClass("primary");
      //   $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
      //   // commonval = ''
      //   // unval = ''
      //   self.data = {
      //     pageIndex: 1,
      //     pageSize: 10,
      //     flowStatus: commonval,
      //     _startTime: start ? start : "",
      //     _endTime: end ? end : "",
      //     isChecked: statuvals,
      //     source: sourceval,
      //     mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
      //     status: statuval || statuval == 0 ? statuval : "",
      //     level: levelval ? levelval : "",
      //     idenAuthentication: unval,
      //     province: province,
      //     city: city,
      //     companyId: dcompanyId ? dcompanyId : storeName,
      //     mobileOrName: $("#searchText").val().trim()
      //   };
      //   self.getList(self.data);
      // });
      $(document).on("click", "#statusSelect5 input[type=button]", function() {
        sourceval = $(this).data("source");
        $(this).removeClass("btn-link").addClass("primary");
        $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
        // commonval = ''
        // unval = ''
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $(document).on("click", "#statu", function() {
        var _this = $(this);
        a0 = _this.data("a");
        a1 = "";
        a2 = "";
        a3 = "";
        a4 = "";
        self.statu = $(this).data("statu");
        if (self.statu == 4) {
          statuval = "";
          statuvals = 0;
        } else {
          statuvals = "";
          statuval = $(this).data("statu");
        }
        $(this).removeClass("btn-link").addClass("primary");
        $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $(document).on("click", "#statu1", function() {
        var _this = $(this);
        a1 = _this.data("a");
        a2 = "";
        a3 = "";
        a4 = "";
        self.statu = $(this).data("statu");
        if (self.statu == 4) {
          statuval = "";
          statuvals = 0;
        } else {
          statuvals = "";
          statuval = $(this).data("statu");
        }
        $(this).removeClass("btn-link").addClass("primary");
        $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $(document).on("click", "#statu2", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2 || d3 == 3) {
        } else {
          a2 = _this.data("a");
          a1 = "";
          a3 = "";
          a4 = "";
          self.statu = $(this).data("statu");
          if (self.statu == 4) {
            statuval = "";
            statuvals = 0;
          } else {
            statuvals = "";
            statuval = $(this).data("statu");
          }
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      $(document).on("click", "#statu3", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {
        } else {
          a3 = _this.data("a");
          a1 = "";
          a2 = "";
          a4 = "";
          self.statu = $(this).data("statu");
          if (self.statu == 4) {
            statuval = "";
            statuvals = 0;
          } else {
            statuvals = "";
            statuval = $(this).data("statu");
          }
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      $(document).on("click", "#statu4", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {
        } else {
          a4 = _this.data("a");
          a1 = "";
          a2 = "";
          a3 = "";
          self.statu = $(this).data("statu");
          if (self.statu == 4) {
            statuval = "";
            statuvals = 0;
          } else {
            statuvals = "";
            statuval = $(this).data("statu");
          }
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      $(document).on("click", "#levebtn", function() {
        var _this = $(this);
        b0 = _this.data("b");
        b1 = "";
        b2 = "";
        b3 = "";
        levelval = $(this).data("level");
        $(this).removeClass("btn-link").addClass("primary");
        $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
        // commonval = ''
        // unval = ''
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $(document).on("click", "#levebtn1", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {
        } else {
          b1 = _this.data("b");
          b2 = "";
          b3 = "";
          levelval = $(this).data("level");
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          // commonval = ''
          // unval = ''
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      $(document).on("click", "#levebtn2", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {
        } else {
          b2 = _this.data("b");
          b1 = "";
          b3 = "";
          levelval = $(this).data("level");
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          // commonval = ''
          // unval = ''
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      $(document).on("click", "#levebtn3", function() {
        var _this = $(this);

        if (c2 == 2 || d4 == 4 || f1 == 1 || f2 == 2) {
        } else {
          b3 = _this.data("b");
          b1 = "";
          b2 = "";
          levelval = $(this).data("level");
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          // commonval = ''
          // unval = ''
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      $(document).on("click", "#idcard", function() {
        var _this = $(this);
        c0 = _this.data("c");
        c1 = "";
        c2 = "";
        c3 = "";
        console.log(_this.data("idval"));
        self.status = $(this).data("status");
        $(this).removeClass("btn-link").addClass("primary");
        $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
        idvals = _this.data("idval");
        testval = "";
        faceval = "";
        if (unval) {
          unval = "";
        }
        if ((mobileval && faceval) || mobileval || faceval) {
        } else {
          commonval = _this.data("idval");
        }
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $(document).on("click", "#idcard1", function() {
        var _this = $(this);
        c1 = _this.data("c");
        c2 = "";
        c3 = "";
        idvals = _this.data("idval");
        testval = _this.data("idval");
        failval = "";
        // if (unval) {
        //     unval = ''
        // }
        unval = 1;
        if ((mobileval && faceval) || mobileval || faceval) {
          console.log(1);
        } else {
          commonval = _this.data("idval");
          console.log(2);
        }
        self.status = $(this).data("status");
        $(this).removeClass("btn-link").addClass("primary");
        $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $(document).on("click", "#idcard2", function() {
        var _this = $(this);

        if (
          a4 == 4 ||
          a2 == 2 ||
          a3 == 3 ||
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
          c1 = "";
          c3 = "";
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          idvals = _this.data("idval");
          testval = _this.data("idval");
          failval = _this.data("idval");
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
            // event.preventDefault();
            self.status = $(this).data("status");

            self.data = {
              pageIndex: 1,
              pageSize: 10,
              flowStatus: commonval,
              _startTime: start,
              _endTime: end,
              isChecked: statuvals,
              mobileStatus: mobileval,
              status: statuval,
              level: levelval,
              idenAuthentication: unval,
              province: province,
              city: city,
              companyId: storeName,
              mobileOrName: $("#searchText").val().trim()
            };
            self.getList(self.data);
          }
        }
      });
      $(document).on("click", "#idcard3", function() {
        var _this = $(this);
        failval = "";
        c3 = _this.data("c");
        c1 = "";
        c2 = "";
        if ((mobileval && faceval) || mobileval || faceval) {
        } else {
          commonval = "";
        }
        testval = "";
        unval = _this.data("idval");

        self.status = $(this).data("status");
        $(this).removeClass("btn-link").addClass("primary");
        $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $(document).on("click", "#face", function() {
        var _this = $(this);
        d0 = _this.data("d");
        d1 = "";
        d2 = "";
        d3 = "";
        d4 = "";
        if (testval != "") {
          commonval = testval;
        } else {
          commonval = "";
        }
        faceval = "";
        console.log(_this.data("face"));
        self.status = $(this).data("status");
        $(this).removeClass("btn-link").addClass("primary");
        $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $(document).on("click", "#face1", function() {
        var _this = $(this);
        d1 = _this.data("d");
        d2 = "";
        d3 = "";
        d4 = "";
        if (failval) {
        } else {
          faceval = _this.data("face");
          commonval = _this.data("face");
          self.status = $(this).data("status");
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      $(document).on("click", "#face2", function() {
        var _this = $(this);
        if (b3 == 3 || c2 == 2) {
        } else {
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          d2 = _this.data("d");
          d1 = "";
          d3 = "";
          d4 = "";
          faceval = _this.data("face");
          commonval = _this.data("face");
          self.status = $(this).data("status");
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      $(document).on("click", "#face3", function() {
        var _this = $(this);
        if (
          c2 == 2 ||
          b1 == 1 ||
          b2 == 2 ||
          b3 == 3 ||
          f3 == 3 ||
          f2 == 2 ||
          f1 == 1 ||
          a2 == 2 ||
          a3 == 3 ||
          a4 == 4
        ) {
        } else {
          d3 = _this.data("d");
          d1 = "";
          d2 = "";
          d4 = "";
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          faceval = _this.data("face");
          commonval = _this.data("face");
          self.status = $(this).data("status");
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
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
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          d3 = _this.data("d");
          faceval = _this.data("face");
          commonval = _this.data("face");
          if (mobileval == 0 || mobileval == null) {
            self.status = $(this).data("status");

            self.data = {
              pageIndex: 1,
              pageSize: 10,
              flowStatus: commonval,
              _startTime: start ? start : "",
              _endTime: end ? end : "",
              isChecked: statuvals,
              source: sourceval,
              mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
              status: statuval || statuval == 0 ? statuval : "",
              level: levelval ? levelval : "",
              idenAuthentication: unval,
              province: province,
              city: city,
              companyId: dcompanyId ? dcompanyId : storeName,
              mobileOrName: $("#searchText").val().trim()
            };
            self.getList(self.data);
          }
        }

        // faceval = _this.data("face");
        // commonval = _this.data("face");
        // if (mobileval == 0 || mobileval == null) {
        //   self.status = $(this).data("status");

        //   self.data = {
        //     pageIndex: 1,
        //     pageSize: 10,
        //     flowStatus: commonval,
        //     _startTime: start ? start : "",
        //     _endTime: end ? end : "",
        //     isChecked: statuvals,
        //     source: sourceval,
        //     mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
        //     status: statuval || statuval == 0 ? statuval : "",
        //     level: levelval ? levelval : "",
        //     idenAuthentication: unval,
        //     province: province,
        //     city: city,
        //     companyId: dcompanyId ? dcompanyId : storeName,
        //     mobileOrName: $("#searchText").val().trim()
        //   };
        //   self.getList(self.data);
        // }
      });
      $(document).on("click", "#check", function() {
        var _this = $(this);
        f0 = _this.data("f");
        f1 = "";
        f2 = "";
        f3 = "";
        mobileval = _this.data("status");
        // event.preventDefault();
        self.status = $(this).data("status");
        $(this).removeClass("btn-link").addClass("primary");
        $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
      $(document).on("click", "#check1", function() {
        var _this = $(this);
        if (
          b1 == 1 ||
          b2 == 2 ||
          b3 == 3 ||
          a2 == 2 ||
          d3 == 3 ||
          a3 == 3 ||
          a4 == 4 ||
          c2 == 2
        ) {
        } else {
          f1 = _this.data("f");
          f2 = "";
          f3 = "";
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          mobileval = _this.data("status");
          console.log(mobileval);
          // event.preventDefault();
          self.status = $(this).data("status");
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
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
          a3 == 3 ||
          a4 == 4 ||
          a2 == 2
        ) {
        } else {
          f2 = _this.data("f");
          f1 = "";
          f3 = "";
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          mobileval = _this.data("status");
          // event.preventDefault();
          self.status = $(this).data("status");
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      $(document).on("click", "#check3", function() {
        var _this = $(this);
        console.log(d3);
        if (d4 == 4 || c2 == 2 || d3 == 3) {
        } else {
          f3 = _this.data("f");
          f1 = "";
          f2 = "";
          $(this).removeClass("btn-link").addClass("primary");
          $(this).siblings(".btn").removeClass("primary").addClass("btn-link");
          mobileval = _this.data("status");
          console.log(mobileval);
          // event.preventDefault();
          self.status = $(this).data("status");
          self.data = {
            pageIndex: 1,
            pageSize: 10,
            flowStatus: commonval,
            _startTime: start ? start : "",
            _endTime: end ? end : "",
            isChecked: statuvals,
            source: sourceval,
            mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
            status: statuval || statuval == 0 ? statuval : "",
            level: levelval ? levelval : "",
            idenAuthentication: unval,
            province: province,
            city: city,
            companyId: dcompanyId ? dcompanyId : storeName,
            mobileOrName: $("#searchText").val().trim()
          };
          self.getList(self.data);
        }
      });
      //搜索按钮点击事件（根据客户姓名搜索）
      $("#searchIcon").on("click", function() {
        self.searchText = $("#searchText").val();
        self.data = {
          pageIndex: 1,
          pageSize: 10,
          flowStatus: commonval,
          _startTime: start ? start : "",
          _endTime: end ? end : "",
          isChecked: statuvals,
          source: sourceval,
          mobileStatus: mobileval || mobileval == 0 ? mobileval : "",
          status: statuval || statuval == 0 ? statuval : "",
          level: levelval ? levelval : "",
          idenAuthentication: unval,
          province: province,
          city: city,
          companyId: dcompanyId ? dcompanyId : storeName,
          mobileOrName: $("#searchText").val().trim()
        };
        self.getList(self.data);
      });
    },
    getStoreNameList: function(data) {
      if (tools.getUrlParam("companyId")) {
        $.ajax({
          data: data,
          cache: false,
          type: "post",
          url: "/headShop/subShop/dropdown.json",
          success: function(data) {
            //.log(data);
            if (data.code == 0) {
              var list = data.list;
              console.log(3261);
              console.log(list);
              console.log(tools.getUrlParam("companyId"));
              for (var k = 0; k < list.length; k++) {
                if (list[k].companyId == tools.getUrlParam("companyId")) {
                  console.log(k);
                  $("#storeNameSelect")
                    .empty()
                    .append(
                      '<option value="">' + list[k].companyName + "</option>"
                    );
                  console.log(list[k].companyName);
                }
              }
              // $("#storeNameSelect").empty().append('<option value="">全部</option>')
              for (var i = 0; i < list.length; i++) {
                console.log(list[i].companyId);
                $("#storeNameSelect").append(
                  '<option value="' +
                    list[i].companyId +
                    '">' +
                    list[i].companyName +
                    "</option>"
                );
              }
            } else {
              tools.tusi(data.error);
            }
          }
        });
      } else {
        $.ajax({
          data: data,
          cache: false,
          type: "post",
          url: "/headShop/subShop/dropdown.json",
          success: function(data) {
            //.log(data);
            if (data.code == 0) {
              var list = data.list;
              console.log(3261);
              console.log(list);
              $("#storeNameSelect")
                .empty()
                .append('<option value="">全部</option>');
              for (var i = 0; i < list.length; i++) {
                $("#storeNameSelect").append(
                  '<option value="' +
                    list[i].companyId +
                    '">' +
                    list[i].companyName +
                    "</option>"
                );
              }
            } else {
              tools.tusi(data.error);
            }
          }
        });
      }
    },
    getList: function(data) {
      var self = this;
      $.ajax({
        data: data,
        cache: false,
        type: "post",
        url: "/headShop/info/view.json",
        success: function(data) {
          //.log(data);
          if (data.code == 0) {
            console.log(data.list);
            var list = data.list;
            self.list.html(listTmp(list));
            self.pagerInit(data.count);
          } else {
            tools.tusi(data.error);
          }
        }
      });
    },
    getLists: function(data) {
      var self = this;
      $.ajax({
        data: {},
        cache: false,
        type: "post",
        url: "/headShop/queryBorrowingItemStatusCount.json",
        success: function(data) {
          //.log(data);
          if (data.code == 0) {
            var lists = data.obj;
            self.lists.html(queryBoxTmp(lists));
          } else {
            tools.tusi(data.error);
          }
        }
      });
    },
    pagerInit: function(totalcount) {
      var self = this;
      $("#loading").hide();
      if (totalcount > 0) {
        $("#pager").show();
      } else {
        $("#pager").hide();
      }
      $("#pager").pager({
        pagenumber: self.data.pageIndex,
        pagecount: Math.ceil(totalcount / self.data.pageSize),
        totalcount: totalcount,
        //回调函数
        buttonClickCallback: function(pageclickednumber) {
          self.data.pageIndex = pageclickednumber;
          self.getList(self.data);
        }
      });
    }
  };
  main.init();
});
