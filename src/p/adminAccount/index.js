define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../c/js/tools");
    // require("../../../c/lib/layer/2.4/layer.src");
    require("../../c/js/jquery.validate"); 
    require("../../c/js/validate-add-methods"); 
    require("../../c/js/validate-messages-cn");
    require("../../c/static/h-ui/js/H-ui"); 
    require("../../c/static/h-ui.admin/js/H-ui.admin"); 
    require('../../c/js/registerHelper.js');
    require("../../c/js/jquery.pager");

    var headerH = require('../../p/adminAccount/headerH.handlebars'),
        accountNavH = require('../../p/adminAccount/accountnav.handlebars'),
        modifyPswH = require("../../p/adminAccount/modifyPassword.handlebars"),
        edituseInforH = require('../../p/adminAccount/edituseInforH.handlebars'),
        customerManage = require("../../p/adminAccount/customerManage"),
        deviceManage = require("../../p/adminAccount/deviceManage"),
        inforService = require("../../p/adminAccount/inforService"),
        dataCount = require("../../p/adminAccount/dataCount"),
        accountManage = require("../../p/adminAccount/accountManage"),
        rechargeManage = require("../../p/adminAccount/rechargeManage/index"),
        homePage = require("../../p/adminAccount/homePage/index"),
        page = $(".page").data("page"),
        data = [];

    var main = {
        init:function(){
            var self = this;
            tools.displaynavbar();
            // tools.judgeBroswer();
            self.getUserInfo();
        },
        getUserInfo: function(){
            var self = this;
            $.when(tools.getUserInfo()).then(function(data){
                if(data.login == true) {
                    $(".navbar-wrapper").html(headerH(data.user));
                    switch(page){ 
                        case "homePage":
                            data.homePage = "current";
                            homePage.init();
                            break;
                        case "customerManage":
                            data.customerManage = "current";
                            customerManage.init();
                            break;
                        case "deviceManage":
                            data.deviceManage = "current";
                            deviceManage.init();
                            break;
                        case "inforService":
                            data.inforService = "current";
                            inforService.init();
                            break;
                        case "dataCount":
                            data.dataCount = "current";
                            dataCount.init();
                            break;
                        case "accountManage":
                            data.accountManage = "current";
                            accountManage.init();
                            break;
                        case "rechargeManage":
                            data.rechargeManage = "current";
                            rechargeManage.init();
                            break;
                    };
                    $(".menu_dropdown.bk_2 ul").html(accountNavH(data)); 
                    self.logout();
                    self.modifyPsw();
                    self.editOption();

                }else{
                    alert("请重新登录");
                    // window.location.href = "/company/login.htm";
                    setTimeout(function(){window.location.href = "/company/login.htm";}, 500);      
                }                
            }, function(){
                
            }); 
        },
        logout: function(){
            $("body").on("click","#logoutBtn", function(){
                var data = {
                    userType:$(this).data("usertype")
                }
                $.ajax({ 
                    type: "post",
                    url: "/loginOut.do",
                    data: data,
                    success: function(data, status, xhr) {
                        if(data.code == 0){
                            window.location.href = "/company/login.htm";
                        }else{
                            alert("未登录");
                        }                
                    },
                    error: function(xhr, errorType, error) {
                        alert(error);
                    }
                })
            })
        },
        modifyPsw: function(){
            var self = this;
            $("body").on("click","#updpass", function(){
                $("section").after(modifyPswH());
                $("#modal-modifyPassword").modal("show");
                
                self.modifyPsw_validate();

                $('#modal-modifyPassword').on('hidden.bs.modal', function (e) {
                    // 处理代码...
                    $("section").nextAll().remove();             
                })
            })
        },
        modifyPsw_validate: function(){
            var validate = $("#modifyPasswordForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    $.ajax({ 
                        type: "post",
                        url: "/company/fixPassword.json",
                        data: $("#modifyPasswordForm").serialize(),
                        success: function(data, status, xhr){
                            if(data.code == -1){ 
                                alert(data.error);
                            }else{ 
                                // window.location.reload();
                                alert("密码修改成功,请重新登录");
                                setTimeout(function(){window.location.href = "/company/login.htm";}, 500);
                            }
                        },
                        error: function(xhr, errorType, error){
                            alert(error);
                        }
                    })              
                },               
                rules:{                   
                    olderPassword:{
                        required:true
                    },
                    newPassword:{
                        required:true
                    },
                    confirm:{
                        required:true,
                        equalTo: "#newPassword"
                    }          
                },
                messages:{                    
                    olderPassword:{
                        required: "<i>*</i>旧密码不能为空，请输入"                   
                    },
                    newPassword:{
                        required: "<i>*</i>新密码不能为空，请输入"
                    },
                    confirm:{
                        required: "<i>*</i>确认不能为空，请输入"
                    }                                             
                }                          
            });
        },
        // 编辑个人信息
        editOption: function(){  
            var self = this;         
            $("body").on("click","#editInfor", function(){
                var _this = $(this);
                var editData = {
                    userId: _this.data("userid"),
                    mobile: _this.data("mobile"),
                    realName: _this.data("realname")
                }
                $("section").after(edituseInforH(editData));
                $("#modal-edituseInfor").modal("show");
                
                self.editForm_validate();
                $('#modal-edituseInfor').on('hidden.bs.modal', function (e) {
                    // 处理代码...
                    $("section").nextAll().remove();              
                })
            })          
        },
        editForm_validate: function(){
            var validate = $("#editUseForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    $.ajax({ 
                        type: "post",
                        url: "/company/editSelfInfo.json",
                        data: $("#editUseForm").serialize(),
                        success: function(data, status, xhr){
                            if(data.code == -1){ 
                                alert(data.error);
                            }else{ 
                                // window.location.reload();
                                alert("个人信息修改成功");
                                setTimeout(function(){window.location.reload();}, 500);
                            }
                        },
                        error: function(xhr, errorType, error){
                            alert(error);
                        }
                    })
                },                   
                rules:{                   
                    mobile: {
                        required: true,
                        mobile:true
                    },
                    realName: {
                        required: true
                    }           
                },
                messages:{                    
                    mobile:{
                        required: "<i>*</i>手机号码不能为空，请输入"                   
                    },
                    realName: {  
                        required: "<i>*</i>姓名不能为空，请输入"
                    }                                          
                }                          
            });
        }
    };
    // module.exports = main;
    main.init();
});