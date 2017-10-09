define(function(require, exports, module) {
  var $ = require("$"),
    tools = require("../../../c/js/toolsSocket");
  require("../../../c/js/jquery.pager");
  require("../../../c/js/registerHelper");
  require("../../../c/static/h-ui/js/H-ui");
  // require("../../../c/js/echarts");
  var todayRank = require("./todayRank.handlebars");
  var monthRank = require("./monthRank.handlebars");
  var homePage = {
    init: function() {
      var self = this;
      // tools.getCustomerLoginInfo();
      // //修改个人信息
      tools.modify2();
      // //修改密码
      tools.modify();
      // // 退出
      tools.logout();
      // tools.displaynavbar();
      // tools.customerParentInit();
      self.data = {
        queryDateType: "today"
      };
      self.getList(self.data);
    },
    getList: function(data) {
      var self = this;
      // 获取直方图数据
      $.ajax({
        data: data,
        cache: false,
        type: "post",
        url: "/company/home/histogram.json",
        success: function(data) {
          // 柱状图 饼状图
          if (data.code === 0) {
            console.log(data.obj);
            var todayData = data.obj.today;
            var yesterdayData = data.obj.yesterday;
            console.log(todayData);
            $("#loading").hide();
            // 显示帮助
            $(".help-content").html(
              "<h5>手机验证：指手机号码与身份匹配的申请客户</h5><h5>未通过：指已审核但未通过的申请客户</h5><h5>已通过：指已审核通过的申请客户</h5>"
            );
            $(".hover-help").hover(
              function() {
                $(".help-content").css("visibility", "visible");
              },
              function() {
                $(".help-content").css("visibility", "hidden");
              }
            );
            // 昨日数据
            $(".choose-date .total").html("昨日数据:");
            // 柱状图
            var columnar = echarts.init(document.getElementById("columnar"));
            option = {
              color: ["#3398DB"],
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              xAxis: [
                {
                  type: "category",
                  data: [
                    "绿色报告",
                    "手机验证",
                    "未通过",
                    "已通过",
                    "",
                    "黄色报告",
                    "手机验证",
                    "未通过",
                    "已通过",
                    "",
                    "红色报告",
                    "手机验证",
                    "未通过",
                    "已通过"
                  ],
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: "value"
                }
              ],
              series: [
                {
                  name: "数量",
                  type: "bar",
                  itemStyle: {
                    normal: {
                      //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                      color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                          "#63be85","#909090","#909090","#909090",
                          "#909090","#f3c110","#909090","#909090",
                          "#909090","#909090","#ee505e","#909090",
                          "#909090","#909090","#909090"
                        ];
                        return colorList[params.dataIndex];
                      }
                    }
                  },
                  barWidth: 60,
                  data: [
                    todayData.green,
                    todayData.greenMobileSuccess,
                    todayData.greenFail,
                    todayData.greenSuccess,
                    0,
                    todayData.yellow,
                    todayData.yellowMobileSuccess,
                    todayData.yellowFail,
                    todayData.yellowSuccess,
                    0,
                    todayData.red,
                    todayData.redMobileSuccess,
                    todayData.redFail,
                    todayData.redSuccess
                  ]
                }
              ]
            };
            columnar.setOption(option);
            columnar.on("click", function(param) {
              var myTime = new Date();
              var month = myTime.getMonth() + 1;
              if (month < 10) {
                month = "0" + month;
              }
              var day = myTime.getDate();
              if (day < 10) {
                day = "0" + day;
              }
              var time = myTime.getFullYear() + "-" + month + "-" + day;
              if (param.dataIndex < 4) {
                  // 绿色报告
                  if (param.dataIndex == 1) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +time +"&_endTime=" + time+"&mobileStatus=" + 2;
                  } else if (param.dataIndex === 2) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 2;
                  } else if (param.dataIndex === 3){
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 1;
                  } else {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +time +"&_endTime=" + time;
                  }
                } else if (param.dataIndex < 9) {
                    if (param.dataIndex == 6) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +time +"&_endTime=" + time+"&mobileStatus=" + 2;
                    } else if (param.dataIndex === 7) {
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 2;
                    } else if (param.dataIndex === 8){
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 1;
                    } else {
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +time +"&_endTime=" + time;
                    }
                } else {
                    if (param.dataIndex == 11) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +time +"&_endTime=" + time+"&mobileStatus=" + 2;
                  } else if (param.dataIndex === 12) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 2;
                  } else if (param.dataIndex === 13){
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 1;
                  } else {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +time +"&_endTime=" + time;
                  }
                }
            });
            $(".query-times").html("查询统计（次）");
          } else {
            tools.tusi(data.error);
          }
        }
      });
      // 获取饼图
      // 饼图
      $.ajax({
        data: {
          queryDateType: "today"
        },
        cache: false,
        type: "post",
        url: "/company/home/pieChart.json",
        success: function(data) {
          if (data.code === 0) {
            var obj = data.obj;
            console.log(obj);
            $(".verify-times").html("手机验证（次）");
            $(".check-times").html("审核（次）");
            $(".choose-dm .total").html("今日合计" + " " + obj.count + " " + "(次）");
            var pieFirst = echarts.init(document.getElementById("pie"));
            pieFirstOption = {
              tooltip: {
                trigger: "item"
              },
              series: [
                {
                  type: "pie",
                  selectedMode: "single",
                  radius: [0, "30%"],
                  label: {
                    normal: {
                      position: "inner"
                    }
                  },
                  color: ["#909090", "#5aa8f0"],
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {
                      value: obj.unVerified,
                      name: "未审核"
                    },
                    {
                      value: obj.fail + obj.success,
                      name: "已审核",
                      selected: true
                    }
                  ]
                },
                {
                  name: "审核（次）",
                  type: "pie",
                  radius: ["40%", "55%"],
                  color: ["#60be85", "#ee505e", "#909090"],
                  data: [
                    //  {
                    //     value: obj.success,
                    //     name: 'we'
                    // },
                    {
                      value: obj.unVerified,
                      name: "未审核"
                    },

                    {
                      value: obj.success,
                      name: "已通过"
                    },
                    {
                      value: obj.fail,
                      name: "未通过"
                    }
                  ]
                }
              ]
            };
            pieFirst.setOption(pieFirstOption, true);
            var verify = echarts.init(document.getElementById("verify"));
            verifytOption = {
              tooltip: {
                trigger: "item"
              },
              series: [
                {
                  type: "pie",
                  selectedMode: "single",
                  radius: [0, "30%"],
                  label: {
                    normal: {
                      position: "inner"
                    }
                  },
                  color: ["#909090", "#5aa8f0"],
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {
                      value: obj.mobileUnverified,
                      name: "未验证"
                    },
                    {
                      value: obj.mobileFail + obj.mobileSuccess,
                      name: "已验证"
                    }
                  ]
                },
                {
                  name: "手机验证（次）",
                  type: "pie",
                  radius: ["40%", "55%"],
                  color: ["#60be85", "#ee505e", "#909090"],
                  data: [
                    //  {
                    //     value: obj.success,
                    //     name: 'we'
                    // },
                    {
                      value: obj.mobileUnverified,
                      name: "未验证"
                    },

                    {
                      value: obj.mobileSuccess,
                      name: "验证通过"
                    },
                    {
                      value: obj.mobileFail,
                      name: "验证未通过"
                    }
                  ]
                }
              ]
            };
            verify.setOption(verifytOption, true);
            // 选择时间查询
            $(".choose-dm .total").html("今日合计" + " " + obj.count + " " + "(次）");
            $(".choose-dm span").click(function() {
              $(this).addClass("choosed");
              $(this).siblings().removeClass("choosed");
              // 本月
              if ($(this).text() == "本月") {
                $.ajax({
                  data: {queryDateType:"thisMonth"},
                  cache: false,
                  type: "post",
                  url: "/company/home/pieChart.json",
                  success: function(data) {
                    var obj = data.obj;
                    console.log(obj);
                    $(".choose-dm .total").html(
                      "本月合计" + " " + obj.count + " " + "(次）"
                    );
                    var pieFirst = echarts.init(document.getElementById("pie"));
                    pieFirstOption = {
                      tooltip: {
                        trigger: "item"
                      },
                      series: [
                        {
                          type: "pie",
                          selectedMode: "single",
                          radius: [0, "30%"],
                          label: {
                            normal: {
                              position: "inner"
                            }
                          },
                          color: ["#909090", "#5aa8f0"],
                          labelLine: {
                            normal: {
                              show: false
                            }
                          },
                          data: [
                            {
                              value: obj.unVerified,
                              name: "未审核"
                            },
                            {
                              value: obj.fail + obj.success,
                              name: "已审核",
                              selected: true
                            }
                          ]
                        },
                        {
                          name: "审核（次）",
                          type: "pie",
                          radius: ["40%", "55%"],
                          color: ["#60be85", "#ee505e", "#909090"],
                          data: [
                            //  {
                            //     value: obj.success,
                            //     name: 'we'
                            // },
                            {
                              value: obj.unVerified,
                              name: "未审核"
                            },

                            {
                              value: obj.success,
                              name: "已通过"
                            },
                            {
                              value: obj.fail,
                              name: "未通过"
                            }
                          ]
                        }
                      ]
                    };
                    pieFirst.setOption(pieFirstOption, true);
                    var verify = echarts.init(
                      document.getElementById("verify")
                    );
                    verifytOption = {
                      tooltip: {
                        trigger: "item"
                      },
                      series: [
                        {
                          type: "pie",
                          selectedMode: "single",
                          radius: [0, "30%"],
                          label: {
                            normal: {
                              position: "inner"
                            }
                          },
                          color: ["#909090", "#5aa8f0"],
                          labelLine: {
                            normal: {
                              show: false
                            }
                          },
                          data: [
                            {
                              value: obj.mobileUnverified,
                              name: "未验证"
                            },
                            {
                              value: obj.mobileFail + obj.mobileSuccess,
                              name: "已验证",
                              selected: true
                            }
                          ]
                        },
                        {
                          name: "手机验证（次）",
                          type: "pie",
                          radius: ["40%", "55%"],
                          color: ["#60be85", "#ee505e", "#909090"],
                          data: [
                            //  {
                            //     value: obj.success,
                            //     name: 'we'
                            // },
                            {
                              value: obj.mobileUnverified,
                              name: "未验证"
                            },

                            {
                              value: obj.mobileSuccess,
                              name: "验证通过"
                            },
                            {
                              value: obj.mobileFail,
                              name: "验证未通过"
                            }
                          ]
                        }
                      ]
                    };
                    verify.setOption(verifytOption, true);
                  }
                });
              } else {
                // 今日
                $.ajax({
                  data: {
                    queryDateType: "today"
                  },
                  cache: false,
                  type: "post",
                  url: "/company/home/pieChart.json",
                  success: function(data) {
                    var obj = data.obj;
                    $(".choose-dm .total").html(
                      "今日合计" + " " + obj.count + " " + "(次）"
                    );
                    var pieFirst = echarts.init(document.getElementById("pie"));
                    pieFirstOption = {
                      tooltip: {
                        trigger: "item"
                      },
                      series: [
                        {
                          type: "pie",
                          selectedMode: "single",
                          radius: [0, "30%"],
                          label: {
                            normal: {
                              position: "inner"
                            }
                          },
                          color: ["#909090", "#5aa8f0"],
                          labelLine: {
                            normal: {
                              show: false
                            }
                          },
                          data: [
                            {
                              value: obj.unVerified,
                              name: "未审核"
                            },
                            {
                              value: obj.fail + obj.success,
                              name: "已审核",
                              selected: true
                            }
                          ]
                        },
                        {
                          name: "审核（次）",
                          type: "pie",
                          radius: ["40%", "55%"],
                          color: ["#60be85", "#ee505e", "#909090"],
                          data: [
                            //  {
                            //     value: obj.success,
                            //     name: 'we'
                            // },
                            {
                              value: obj.unVerified,
                              name: "未审核"
                            },

                            {
                              value: obj.success,
                              name: "已通过"
                            },
                            {
                              value: obj.fail,
                              name: "未通过"
                            }
                          ]
                        }
                      ]
                    };
                    pieFirst.setOption(pieFirstOption, true);
                    var verify = echarts.init(
                      document.getElementById("verify")
                    );
                    verifytOption = {
                      tooltip: {
                        trigger: "item"
                      },
                      series: [
                        {
                          type: "pie",
                          selectedMode: "single",
                          radius: [0, "30%"],
                          label: {
                            normal: {
                              position: "inner"
                            }
                          },
                          color: ["#909090", "#5aa8f0"],
                          labelLine: {
                            normal: {
                              show: false
                            }
                          },
                          data: [
                            {
                              value: obj.mobileUnverified,
                              name: "未验证"
                            },
                            {
                              value: obj.mobileFail + obj.mobileSuccess,
                              name: "已验证"
                            }
                          ]
                        },
                        {
                          name: "手机验证（次）",
                          type: "pie",
                          radius: ["40%", "55%"],
                          color: ["#60be85", "#ee505e", "#909090"],
                          data: [
                            //  {
                            //     value: obj.success,
                            //     name: 'we'
                            // },
                            {
                              value: obj.mobileUnverified,
                              name: "未验证"
                            },

                            {
                              value: obj.mobileSuccess,
                              name: "验证通过"
                            },
                            {
                              value: obj.mobileFail,
                              name: "验证未通过"
                            }
                          ]
                        }
                      ]
                    };
                    verify.setOption(verifytOption, true);
                  }
                });
                $(".choose-dm .total").html(
                  "今日合计" + " " + obj.count + " " + "(次）"
                );
              }
            });
          }
        }
      });

      // 获取排行数据
      $.ajax({
        cache: false,
        type: "post",
        url: "/company/home/rank.json",
        success: function(data) {
          if (data.code === 0) {
            var today = data.obj.today;
            $("#todayRank").html(todayRank(today));
            var month = data.obj.month;
            $("#monthRank").html(monthRank(month));
          } else {
            tools.tusi(data.error);
          }
        }
      });
      // 柱状图点击本月、今天、昨天
      $(".choose-date span").click(function() {
        $(this).addClass("choosed");
        $(this).siblings().removeClass("choosed");
        console.log($(".choose-date .total").text());
        // 本月
        if ($(this).text() == "本月") {
          $.ajax({
            data: {
              queryDateType: "thisMonth"
            },
            cache: false,
            type: "post",
            url: "/company/home/histogram.json",
            success: function(data) {
              var todayData = data.obj.thisMonth;
              console.log(todayData)
              // 柱状图
              var columnar = echarts.init(document.getElementById("columnar"));
              option = {
                color: ["#3398DB"],
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true
                },
                xAxis: [
                  {
                    type: "category",
                    data: [
                      "绿色报告",
                      "手机验证",
                      "未通过",
                      "已通过",
                      "",
                      "黄色报告",
                      "手机验证",
                      "未通过",
                      "已通过",
                      "",
                      "红色报告",
                      "手机验证",
                      "未通过",
                      "已通过"
                    ],
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis: [
                  {
                    type: "value"
                  }
                ],
                series: [
                  {
                    name: "数量",
                    type: "bar",
                    itemStyle: {
                      normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function(params) {
                          // build a color map as your need.
                          var colorList = [
                            "#63be85",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#f3c110",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#ee505e",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#909090"
                          ];
                          return colorList[params.dataIndex];
                        }
                      }
                    },
                    barWidth: 60,
                    data: [
                      todayData.green,
                      todayData.greenMobileSuccess,
                      todayData.greenFail,
                      todayData.greenSuccess,
                      0,
                      todayData.yellow,
                      todayData.yellowMobileSuccess,
                      todayData.yellowFail,
                      todayData.yellowSuccess,
                      0,
                      todayData.red,
                      todayData.redMobileSuccess,
                      todayData.redFail,
                      todayData.redSuccess
                    ]
                  }
                ]
              };
              columnar.setOption(option);
              columnar.on("click", function(param) {
                console.log(param);
                var myTime = new Date();
                var month = myTime.getMonth() + 1;
                if (month < 10) {
                  month = "0" + month;
                }
                var day = myTime.getDate();
                if (day < 10) {
                  day = "0" + day;
                }
                var headTime = myTime.getFullYear() + "-" + month + "-" + "01";
                var time = myTime.getFullYear() + "-" + month + "-" + day;
                if (param.dataIndex < 4) {
                  // 绿色报告
                  if (param.dataIndex == 1) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +headTime +"&_endTime=" + time+"&mobileStatus=" + 2;
                  } else if (param.dataIndex === 2) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +headTime +"&_endTime=" + time+"&status=" + 2;
                  } else if (param.dataIndex === 3){
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +headTime +"&_endTime=" + time+"&status=" + 1;
                  } else {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +headTime +"&_endTime=" + time;
                  }
                } else if (param.dataIndex < 9) {
                    if (param.dataIndex == 6) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +headTime +"&_endTime=" + time+"&mobileStatus=" + 2;
                    } else if (param.dataIndex === 7) {
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +headTime +"&_endTime=" + time+"&status=" + 2;
                    } else if (param.dataIndex === 8){
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +headTime +"&_endTime=" + time+"&status=" + 1;
                    } else {
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +headTime +"&_endTime=" + time;
                    }
                } else {
                    if (param.dataIndex == 11) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +headTime +"&_endTime=" + time+"&mobileStatus=" + 2;
                  } else if (param.dataIndex === 12) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +headTime +"&_endTime=" + time+"&status=" + 2;
                  } else if (param.dataIndex === 13){
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +headTime +"&_endTime=" + time+"&status=" + 1;
                  } else {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +headTime +"&_endTime=" + time;
                  }
                }
              });
              $(".choose-date .total").html("上月数据:");
            }
          });
        } else {
          // 今日
          $.ajax({
            data: {
              queryDateType: "today"
            },
            cache: false,
            type: "post",
            url: "/company/home/histogram.json",
            success: function(data) {
              var todayData = data.obj.today;
              // 柱状图
              var columnar = echarts.init(document.getElementById("columnar"));
              option = {
                color: ["#3398DB"],
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true
                },
                xAxis: [
                  {
                    type: "category",
                    data: [
                      "绿色报告",
                      "手机验证",
                      "未通过",
                      "已通过",
                      "",
                      "黄色报告",
                      "手机验证",
                      "未通过",
                      "已通过",
                      "",
                      "红色报告",
                      "手机验证",
                      "未通过",
                      "已通过"
                    ],
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis: [
                  {
                    type: "value"
                  }
                ],
                series: [
                  {
                    name: "数量",
                    type: "bar",
                    itemStyle: {
                      normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function(params) {
                          // build a color map as your need.
                          var colorList = [
                            "#63be85","#909090","#909090","#909090","#909090","#f3c110","#909090",
                            "#909090","#909090","#909090","#ee505e","#909090","#909090","#909090","#909090"
                          ];
                          return colorList[params.dataIndex];
                        }
                      }
                    },
                    barWidth: 60,
                    data: [
                      todayData.green,
                      todayData.greenMobileSuccess,
                      todayData.greenFail,
                      todayData.greenSuccess,
                      0,
                      todayData.yellow,
                      todayData.yellowMobileSuccess,
                      todayData.yellowFail,
                      todayData.yellowSuccess,
                      0,
                      todayData.red,
                      todayData.redMobileSuccess,
                      todayData.redFail,
                      todayData.redSuccess
                    ]
                  }
                ]
              };
              columnar.setOption(option);
              $(".choose-date .total").html("昨日数据:");
            }
          });
        }
      });
      // 昨日数据 上月数据
      $(".yesterday").on("click", function() {
        $(".choose-date span").removeClass("choosed");
        var text = $(".choose-date .total").text();
        if (text == "昨日数据:") {
          $.ajax({
            data: {
              queryDateType: "today"
            },
            cache: false,
            type: "post",
            url: "/company/home/histogram.json",
            success: function(data) {
              var todayData = data.obj.yesterday;
              // 柱状图
              var columnar = echarts.init(document.getElementById("columnar"));
              option = {
                color: ["#3398DB"],
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true
                },
                xAxis: [
                  {
                    type: "category",
                    data: [
                      "绿色报告",
                      "手机验证",
                      "未通过",
                      "已通过",
                      "",
                      "黄色报告",
                      "手机验证",
                      "未通过",
                      "已通过",
                      "",
                      "红色报告",
                      "手机验证",
                      "未通过",
                      "已通过"
                    ],
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis: [
                  {
                    type: "value"
                  }
                ],
                series: [
                  {
                    name: "数量",
                    type: "bar",
                    itemStyle: {
                      normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function(params) {
                          // build a color map as your need.
                          var colorList = [
                            "#63be85",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#f3c110",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#ee505e",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#909090"
                          ];
                          return colorList[params.dataIndex];
                        }
                      }
                    },
                    barWidth: 60,
                    data: [
                      todayData.green,
                      todayData.greenMobileSuccess,
                      todayData.greenFail,
                      todayData.greenSuccess,
                      0,
                      todayData.yellow,
                      todayData.yellowMobileSuccess,
                      todayData.yellowFail,
                      todayData.yellowSuccess,
                      0,
                      todayData.red,
                      todayData.redMobileSuccess,
                      todayData.redFail,
                      todayData.redSuccess
                    ]
                  }
                ]
              };
              columnar.setOption(option);
              columnar.on("click", function(param) {
                var myTime = new Date();
                var month = myTime.getMonth() + 1;
                if (month < 10) {
                  month = "0" + month;
                }
                var day = myTime.getDate() - 1;
                if (day < 10) {
                  day = "0" + day;
                }
                var time = myTime.getFullYear() + "-" + month + "-" + day;
                if (param.dataIndex < 4) {
                  // 绿色报告
                  if (param.dataIndex == 1) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +time +"&_endTime=" + time+"&mobileStatus=" + 2;
                  } else if (param.dataIndex === 2) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 2;
                  } else if (param.dataIndex === 3){
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 1;
                  } else {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +time +"&_endTime=" + time;
                  }
                } else if (param.dataIndex < 9) {
                    if (param.dataIndex == 6) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +time +"&_endTime=" + time+"&mobileStatus=" + 2;
                    } else if (param.dataIndex === 7) {
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 2;
                    } else if (param.dataIndex === 8){
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 1;
                    } else {
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +time +"&_endTime=" + time;
                    }
                } else {
                    if (param.dataIndex == 11) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +time +"&_endTime=" + time+"&mobileStatus=" + 2;
                  } else if (param.dataIndex === 12) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 2;
                  } else if (param.dataIndex === 13){
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +time +"&_endTime=" + time+"&status=" + 1;
                  } else {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +time +"&_endTime=" + time;
                  }
                }
              });
            }
          });
        } else {
          $.ajax({
            data: {
              queryDateType: "thisMonth"
            },
            cache: false,
            type: "post",
            url: "/company/home/histogram.json",
            success: function(data) {
              console.log(data);
              var todayData = data.obj.lastMonth;
              // 柱状图
              var columnar = echarts.init(document.getElementById("columnar"));
              option = {
                color: ["#3398DB"],
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true
                },
                xAxis: [
                  {
                    type: "category",
                    data: [
                      "绿色报告",
                      "手机验证",
                      "未通过",
                      "已通过",
                      "",
                      "黄色报告",
                      "手机验证",
                      "未通过",
                      "已通过",
                      "",
                      "红色报告",
                      "手机验证",
                      "未通过",
                      "已通过"
                    ],
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis: [
                  {
                    type: "value"
                  }
                ],
                series: [
                  {
                    name: "数量",
                    type: "bar",
                    itemStyle: {
                      normal: {
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function(params) {
                          // build a color map as your need.
                          var colorList = [
                            "#63be85",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#f3c110",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#ee505e",
                            "#909090",
                            "#909090",
                            "#909090",
                            "#909090"
                          ];
                          return colorList[params.dataIndex];
                        }
                      }
                    },
                    barWidth: 60,
                    data: [
                      todayData.green,
                      todayData.greenMobileSuccess,
                      todayData.greenFail,
                      todayData.greenSuccess,
                      0,
                      todayData.yellow,
                      todayData.yellowMobileSuccess,
                      todayData.yellowFail,
                      todayData.yellowSuccess,
                      0,
                      todayData.red,
                      todayData.redMobileSuccess,
                      todayData.redFail,
                      todayData.redSuccess
                    ]
                  }
                ]
              };
              columnar.setOption(option);
              columnar.on("click", function(param) {
              var myTime = new Date();
              var year = myTime.getFullYear();  
                var month = myTime.getMonth();  
                if(month==0)  
                {  
                    month=12;  
                    year=year-1;  
                }  
                if (month < 10) {  
                    month = "0" + month;  
                }  
                var firstDay = year + "-" + month + "-" + "01";//上个月的第一天  
                var myDate = new Date(year, month, 0);  
                var day = myTime.getDate();
                if (day < 10) {
                  day = "0" + day;
                }
                var headTime = myTime.getFullYear() + "-" + month + "-" + "01";
                var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天  
                if (param.dataIndex < 4) {
                  // 绿色报告
                  if (param.dataIndex == 1) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +headTime +"&_endTime=" + lastDay+"&mobileStatus=" + 2;
                  } else if (param.dataIndex === 2) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +headTime +"&_endTime=" + lastDay+"&status=" + 2;
                  } else if (param.dataIndex === 3){
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +headTime +"&_endTime=" + lastDay+"&status=" + 1;
                  } else {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +1 +"&_startTime=" +headTime +"&_endTime=" + lastDay;
                  }
                } else if (param.dataIndex < 9) {
                    if (param.dataIndex == 6) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +headTime +"&_endTime=" + lastDay+"&mobileStatus=" + 2;
                    } else if (param.dataIndex === 7) {
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +headTime +"&_endTime=" + lastDay+"&status=" + 2;
                    } else if (param.dataIndex === 8){
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +headTime +"&_endTime=" + lastDay+"&status=" + 1;
                    } else {
                        window.location.href = "/company/inforService.htm" +"?" +"level=" +2 +"&_startTime=" +headTime +"&_endTime=" + lastDay;
                    }
                } else {
                    if (param.dataIndex == 11) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +headTime +"&_endTime=" + lastDay+"&mobileStatus=" + 2;
                  } else if (param.dataIndex === 12) {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +headTime +"&_endTime=" + lastDay+"&status=" + 2;
                  } else if (param.dataIndex === 13){
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +headTime +"&_endTime=" + lastDay+"&status=" + 1;
                  } else {
                      window.location.href = "/company/inforService.htm" +"?" +"level=" +3 +"&_startTime=" +headTime +"&_endTime=" + lastDay;
                  }
                }
              });
            }
          });
        }
      });
    }
  };
  module.exports = homePage;
});
