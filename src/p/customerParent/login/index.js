define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../../c/js/tools");

    var main = {
        init:function(){
            var self = this;
            var loginH = require('./loginH.handlebars');
            $(".loginPage").html(loginH());

            $("body").height(document.documentElement.clientHeight);
            //tools.tusi(document.documentElement.clientHeight)

            tools.reloadVcode(".checkCode");
            tools.judgeBroswer();
            //tools.JPlaceHolder();
            //点击确认新增按钮后把按钮置为不可用状态
            $("body").on("click","#loginBtn",function () {
                if($("#username").val().length>0&&$("#password").val().length>=6&&$("#checkCode").val().length==4) {
                    console.log("button disabled");
                    $(this).addClass("disabled");
                }
            });
            self.form_validate();
        },
        //获取用户信息
        getCustomerParentLoginInfo: function(){
            //.log("getCustomerParentLoginInfo");
            var self = this;
            $.ajax({
                type: "post",
                url: "/common/ajax/user.json",
                success: function(data) {
                    //.log(data);
                    if(data.code == 0) {
                        console.log("parentId:"+data.user.parentId)
                        if(data.user.parentId==0){
                            //.log("data.user.parentId==0");
                            window.location.href = "/headShop/homePage.htm";
                        }else{
                            window.location.href = "/subShop/infoSearch/view.htm";
                        }
                    }
                }
            })
        },
        form_validate: function(){
            var self = this;
            var validate = $("#loginForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应
                onkeyup: false,
                onblur: true,
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    $.ajax({ 
                        type: "post",
                        url: "/login.do",
                        data: $("#loginForm").serialize(),
                        success: function(data, status, xhr){
                            if(data.indexOf("<")>0){
                                self.getCustomerParentLoginInfo();
                            }else{
                                var data = $.parseJSON(data);
                                // var data = JSON.parse(data);
                                //.log(data);
                                if(data.code == -1){
                                    if(data.error=="noUser"){
                                        tools.tusi("此用户不存在");
                                    }else if(data.error=="passwordError"){
                                        tools.tusi("密码错误");
                                    }else if(data.error=="checkCodeError"){
                                        tools.tusi("验证码错误");
                                    }
                                }
                            }
                            $("body").find("#loginBtn").removeClass("disabled");
                            console.log("button available");
                        },
                        error:function (data,status, xhr) {
                            if(data.statusText=="Authentication Failed: User is disabled"){
                                tools.tusi("此用户被禁用或不存在");
                            }
                            $("body").find("#loginBtn").removeClass("disabled");
                            console.log("button available");
                        }
                    })
                     
                },                   
                rules:{                   
                    username:{
                        required:true,
                    },                   
                    password:{
                        required: true,
                        minlength:6
                    },
                    checkCode:{
                        required: true,
                        minlength:4
                    }
                },
                messages:{                    
                    username:{
                        required: "<i>*</i>用户名不能为空"
                    },
                    password: {
                        required: "<i>*</i>密码不能为空",
                        minlength:"* 请输入一个长度最少是 6位 的字符串"
                    },
                    checkCode: {
                        required: "<i>*</i>验证码不能为空",
                        minlength:"* 请输入一个长度是 4位 的字符串"
                    }
                }                          
            });
        }
    };
    main.init();
});