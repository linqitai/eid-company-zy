define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../c/js/tools");  

    var deviceMH = require('../../p/adminAccount/deviceManageH/deviceMH.handlebars'),
        deviceTableH = require('../../p/adminAccount/deviceManageH/deviceTableH.handlebars'),
        enDisableH = require('../../p/adminAccount/deviceManageH/enDisableH.handlebars'),
        data = {
            pageIndex: 1,
            pageSize: 10,
            usingTime: "all",
            stopUsingTime: "all"
            // usingTime: tools.getUrlParam("usingTime") || "all",
            // stopUsingTime: tools.getUrlParam("stopUsingTime") || "all"
        }    

    var deviceManage = {
        init:function(){
            var self = this;
            $(".customerM").html(deviceMH());

            self.deviceList();
            self.searchDevice();
            self.useTimeTab();
            self.disableTimeTab();

            // var useTimeBtn = $("#useTime a"),
            //     disableTimeBtn = $("#disableTime a");

            // switch(tools.getUrlParam("usingTime")){ 
            //     case "all":
            //         useTimeBtn.removeClass("current");
            //         useTimeBtn.eq(0).addClass("current");
            //         break;
            //     case "threeDay":
            //         useTimeBtn.removeClass("current");
            //         useTimeBtn.eq(1).addClass("current");
            //         break;
            //     case "week":
            //         useTimeBtn.removeClass("current");
            //         useTimeBtn.eq(2).addClass("current");
            //         break;
            //     case "month":
            //         useTimeBtn.removeClass("current");
            //         useTimeBtn.eq(3).addClass("current");
            //         break;
            //     default:
            //         useTimeBtn.removeClass("current");
            //         useTimeBtn.eq(0).addClass("current");
            //         break;
            // }
            // switch(tools.getUrlParam("stopUsingTime")){ 
            //     case "all":
            //         disableTimeBtn.removeClass("current");
            //         disableTimeBtn.eq(0).addClass("current");
            //         break;
            //     case "week":
            //         disableTimeBtn.removeClass("current");
            //         disableTimeBtn.eq(1).addClass("current");
            //         break;
            //     case "month":
            //         disableTimeBtn.removeClass("current");
            //         disableTimeBtn.eq(2).addClass("current");
            //         break;
            //     case "halfYear":
            //         disableTimeBtn.removeClass("current");
            //         disableTimeBtn.eq(3).addClass("current");
            //         break;
            //     default:
            //         disableTimeBtn.removeClass("current");
            //         disableTimeBtn.eq(0).addClass("current");
            //         break;
            // }
        },
        useTimeTab: function(){
            var self = this;
            var useTimeBtn = $("#useTime a");
            useTimeBtn.on("click", function(){
                var _this = $(this);
                useTimeBtn.removeClass("current");
                _this.addClass("current");
                data.usingTime = _this.data("usingtime");
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.macId = $("#macId").val();
                data.pageIndex = 1;
                self.deviceList();
                // var url = tools.setUrlParam(location.href, "usingTime", data.usingTime);
                // location.href = url;
            })
        },
        disableTimeTab: function(){ 
            var self = this;
            var disableTimeBtn = $("#disableTime a");
            disableTimeBtn.on("click", function(){
                var _this = $(this);
                disableTimeBtn.removeClass("current");
                _this.addClass("current");
                data.stopUsingTime = _this.data("stopusingtime");
                data.companyName = $("#companyName").val();
                data.childName = $("#childName").val();
                data.macId = $("#macId").val();
                data.pageIndex = 1;
                self.deviceList();
                // var url = tools.setUrlParam(location.href, "stopUsingTime", data.stopUsingTime);
                // location.href = url;
            })
        },
        deviceList: function(){
            var self = this;
            $.ajax({ 
                type: "post",
                url: "/company/device/master/list.json",
                data: data,
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{ 
                        $(".deviceTable").html(deviceTableH(data.list));
                        self.pagerInit(data.count);
                        // 是否禁用设备
                        self.enDisOption();
                    }
                },
                error: function(xhr, errorType, error){
                    alert(error);
                }
            }) 
        },
        pagerInit:function(totalcount){
            var self = this;
            if(totalcount>0){
                $("#pager").show();
            }else{
                $("#pager").hide();
            }
            $("#pager").pager({
                pagenumber: data.pageIndex,
                pagecount: Math.ceil(totalcount/data.pageSize),
                totalcount: totalcount,
                //回调函数
                buttonClickCallback: function(pageclickednumber) {
                    data.pageIndex = pageclickednumber;
                    self.deviceList();
                }
            });
        },
        searchDevice: function(){
            var self = this;
            var validate = $("#device_searchForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    data.companyName = $("#companyName").val();
                    data.childName = $("#childName").val();
                    data.macId = $("#macId").val();
                    data.pageIndex = 1;
                    self.deviceList();                 
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
        },
        // 是否禁用
        enDisOption: function(){
            $(".enDisable").on("click", function(){
                var _this = $(this);
                var endisData = {
                    deviceId: _this.data("deviceid"),
                    forbidden: _this.data("forbidden"),
                    optionText: _this.html(),
                    deviceMac: _this.data("devicemac")
                }
                $("section").after(enDisableH(endisData));
                $("#modal-endisable").modal("show");

                var validate = $("#endisableForm").validate({
                    debug: true, //调试模式取消submit的默认提交功能   
                    //errorClass: "label.error", //默认为错误的样式类为：error   
                    focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                    onkeyup: false,
                    onblur: true,     
                    submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                        $.ajax({ 
                            type: "post",
                            url: "/company/device/master/forbidden.json",
                            data: $("#endisableForm").serialize(),
                            success: function(data, status, xhr){
                                if(data.code == -1){ 
                                    alert(data.error);
                                }else{ 
                                    // window.location.reload();
                                    alert("操作成功");
                                    setTimeout(function(){window.location.reload();}, 500);
                                }
                            },
                            error: function(xhr, errorType, error){
                                alert(error);
                            }
                        })
                    }                         
                });

                $('#modal-endisable').on('hidden.bs.modal', function (e) {
                    // 处理代码...
                    $("section").nextAll().remove();          
                })
            }) 
        }
    };
    module.exports = deviceManage;
    // main.init();
});