define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../c/js/tools");    
    require("../../c/js/jquery.validate"); 
    require("../../c/js/validate-add-methods"); 
    require("../../c/js/validate-messages-cn");

    var loginH = require('./loginH.handlebars');

    var main = {
        init:function(){
            var self = this;
            $("header h2").html("卓壹身份标识系统 v1.6");
            $(".help-block").html("copyright © 2016 浙江卓壹");
            $("header").after(loginH());

            tools.reloadVcode(".checkCode");
            tools.JPlaceHolder();
            tools.judgeBroswer();

            self.form_validate();
        },
        form_validate: function(){
            var validate = $("#loginForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){
                    console.log(777);   //表单提交句柄,为一回调函数，带一个参数：form   
                    $.ajax({ 
                        type: "post",
                        url: "/login.do",
                        data: $("#loginForm").serialize(),
                        success: function(data, status, xhr){
                            if(data.indexOf("<")!= -1){
                                window.location.href = "/company/homePage.htm";
                            }else{
                                var data = $.parseJSON(data);
                                // var data = JSON.parse(data);
                                if(data.code == -1){
                                    if(data.error=="noUser"){
                                        alert("用户名输入错误")
                                    }else if(data.error=="passwordError"){
                                        alert("密码输入错误")
                                    }else if(data.error=="checkCodeError"){
                                        alert("验证码输入错误")
                                    }else{
                                        alert(data.error);
                                    }
                                    return;
                                }
                            }
                        },
                        error: function(xhr, errorType, error){
                            alert(error);
                        }
                    })
                     
                },                   
                rules:{                   
                    username:{
                        required:true
                        // mobile:true
                    },                   
                    password: {
                        required: true
                    },
                    checkCode: {
                        required: true
                    }              
                },
                messages:{                    
                    username:{
                        required: "<i>*</i>用户名不能为空，请输入"                   
                    },
                    password: {  
                        required: "<i>*</i>密码不能为空，请输入"
                    },
                    checkCode: {
                        required: "<i>*</i>验证码不能为空，请输入"
                    }                                                  
                }                          
            });
        }
    };
    main.init();
});