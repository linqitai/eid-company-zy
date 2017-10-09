define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../c/js/tools");   

    // require("../../c/icheck/jquery.icheck.min");
    // require("../../c/icheck/icheck.css");

    var addAccountH = require('../../p/adminAccount/accountManageH/addAccountH.handlebars'),
        editAccountH = require('../../p/adminAccount/accountManageH/editAccountH.handlebars'),
        resetPswH = require('../../p/adminAccount/accountManageH/resetPswH.handlebars'),
        enableH = require('../../p/adminAccount/accountManageH/enableH.handlebars'),
        disableH = require('../../p/adminAccount/accountManageH/disableH.handlebars'),
        accountTableH = require('../../p/adminAccount/accountManageH/accountTableH.handlebars'),
        data = {
            pageIndex: 1,
            pageSize: 10
        }

    var accountManage = {
        init:function(){
            var self = this;
            self.accountList();
            // 新增账户
            $("#addAccount").on("click", function(){
                $("section").after(addAccountH());

                self.getRoleList();

                $("#modal-addAccount").modal("show");

                // $("#roleC").val($("input[name=role_radio]:checked").val());
                // $("#statusC").val($("input[name=status_radio]:checked").val());

                // $('.radio-box').on("click", function(){
                //     $("#roleC").val($("input[name=role_radio]:checked").val());
                //     $("#statusC").val($("input[name=status_radio]:checked").val());
                // })

                self.accountForm_validate();

                $('#modal-addAccount').on('hidden.bs.modal', function (e) {
                    // 处理代码...
                    $("section").nextAll().remove();            
                })
            })
            
        },
        getRoleList: function(){
            $.ajax({ 
                type: "post",
                url: "/role/view.json",
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{ 
                        for(i=0;i<data.list.length;i++){
                            if(i==0){
                                $(".role_radio").append('<div class="radio-box"><input type="radio" id="role-'+i+'" name="roleId" value="'+data.list[i].roleId+'" checked><label for="role-'+i+'">'+data.list[i].roleName+'</label></div>');
                            }else{
                                $(".role_radio").append('<div class="radio-box"><input type="radio" id="role-'+i+'" name="roleId" value="'+data.list[i].roleId+'"><label for="role-'+i+'">'+data.list[i].roleName+'</label></div>');
                            }
                        }                        
                    }
                },
                error: function(xhr, errorType, error){
                    alert(error);
                }
            })
        },
        accountForm_validate: function(){
            var validate = $("#addAccountForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    $.ajax({ 
                        type: "post",
                        url: "/user/add.json",
                        data: $("#addAccountForm").serialize(),
                        success: function(data, status, xhr){
                            if(data.code == -1){ 
                                alert(data.error);
                            }else{ 
                                // window.location.reload();
                                alert("新增账号成功");
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
                    },
                    roleId: {
                        required: true
                    },
                    status: {
                        required: true
                    }              
                },
                messages:{                    
                    mobile:{
                        required: "<i>*</i>手机号码不能为空，请输入"                   
                    },
                    realName: {  
                        required: "<i>*</i>姓名不能为空，请输入"
                    },
                    roleId: {
                        required: "<i>*</i>角色不能为空，请选择"
                    },
                    status: {
                        required: "<i>*</i>状态不能为空，请选择"
                    }                                               
                }                          
            });
        },
        accountList: function(){
            var self = this;
            $.ajax({ 
                type: "post",
                url: "/user/view.json",
                data: data,
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{
                        // data.list.statusText
                        $(".accountTable").html(accountTableH(data.list));
                        self.pagerInit(data.count);  

                        self.editOption();
                        self.resetPswOption();
                        self.enableOption();
                        self.disableOption();                     
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
                    self.accountList();
                }
            });
        },
        // 编辑账户
        editOption: function(){  
            var self = this;         
            $(".edit").on("click", function(){
                var _this = $(this).parent().parent();
                var editData = {
                    userId: _this.data("userid"),
                    mobile: _this.data("mobile"),
                    realName: _this.data("realname"),
                    roleId: _this.data("roleid"),
                    status: _this.data("status")
                }
                $("section").after(editAccountH(editData));
                self.getEditRoleList(editData.roleId);
                $("#modal-editAccount").modal("show");
                
                self.editForm_validate();
                $('#modal-editAccount').on('hidden.bs.modal', function (e) {
                    // 处理代码...
                    $("section").nextAll().remove();              
                })
            })          
        },
        editForm_validate: function(){
            var validate = $("#editAccountForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    $.ajax({ 
                        type: "post",
                        url: "/user/edit.json",
                        data: $("#editAccountForm").serialize(),
                        success: function(data, status, xhr){
                            if(data.code == -1){ 
                                alert(data.error);
                            }else{ 
                                // window.location.reload();
                                alert("编辑账号成功");
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
                    },
                    roleId: {
                        required: true
                    },
                    status: {
                        required: true
                    }              
                },
                messages:{                    
                    mobile:{
                        required: "<i>*</i>手机号码不能为空，请输入"                   
                    },
                    realName: {  
                        required: "<i>*</i>姓名不能为空，请输入"
                    },
                    roleId: {
                        required: "<i>*</i>角色不能为空，请选择"
                    },
                    status: {
                        required: "<i>*</i>状态不能为空，请选择"
                    }                                               
                }                          
            });
        },
        // 获取角色列表
        getEditRoleList: function(roleId){
            $.ajax({ 
                type: "post",
                url: "/role/view.json",
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{ 
                        for(i=0;i<data.list.length;i++){
                            if(data.list[i].roleId == roleId){
                                $(".role_radio").append('<div class="radio-box"><input type="radio" id="role-'+i+'" name="roleId" value="'+data.list[i].roleId+'" checked><label for="role-'+i+'">'+data.list[i].roleName+'</label></div>');
                            }else{
                                $(".role_radio").append('<div class="radio-box"><input type="radio" id="role-'+i+'" name="roleId" value="'+data.list[i].roleId+'"><label for="role-'+i+'">'+data.list[i].roleName+'</label></div>');
                            }
                        }                        
                    }
                },
                error: function(xhr, errorType, error){
                    alert(error);
                }
            })
        },
        // 重置密码
        resetPswOption:function(){
            $(".resetPsw").on("click", function(){
                var _this = $(this).parent().parent();
                var mobileData = {
                    mobile: _this.data("mobile"),
                    userId: _this.data("userid")
                }
                $("section").after(resetPswH(mobileData));
                $("#modal-resetPsw").modal("show");

                var validate = $("#resetPswForm").validate({
                    debug: true, //调试模式取消submit的默认提交功能   
                    //errorClass: "label.error", //默认为错误的样式类为：error   
                    focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                    onkeyup: false,
                    onblur: true,     
                    submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                        $.ajax({ 
                            type: "post",
                            url: "/user/resetPassword.json",
                            data: $("#resetPswForm").serialize(),
                            success: function(data, status, xhr){
                                if(data.code == -1){ 
                                    alert(data.error);
                                }else{ 
                                    // window.location.reload();
                                    alert("重置密码成功");
                                    setTimeout(function(){window.location.reload();}, 500);
                                }
                            },
                            error: function(xhr, errorType, error){
                                alert(error);
                            }
                        })
                    }                         
                });

                $('#modal-resetPsw').on('hidden.bs.modal', function (e) {
                    // 处理代码...
                    $("section").nextAll().remove();          
                }) 
            }) 
        },
        // 启用
        enableOption: function(){
            $(".enable").on("click", function(){
                var _this = $(this).parent().parent();
                var mobileData = {
                    mobile: _this.data("mobile"),
                    userId: _this.data("userid")
                }
                $("section").after(enableH(mobileData));
                $("#modal-enable").modal("show");

                var validate = $("#enableForm").validate({
                    debug: true, //调试模式取消submit的默认提交功能   
                    //errorClass: "label.error", //默认为错误的样式类为：error   
                    focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                    onkeyup: false,
                    onblur: true,     
                    submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                        $.ajax({ 
                            type: "post",
                            url: "/user/enable.json",
                            data: $("#enableForm").serialize(),
                            success: function(data, status, xhr){
                                if(data.code == -1){ 
                                    alert(data.error);
                                }else{ 
                                    // window.location.reload();
                                    alert("启用成功");
                                    setTimeout(function(){window.location.reload();}, 500);
                                }
                            },
                            error: function(xhr, errorType, error){
                                alert(error);
                            }
                        })
                    }                         
                });

                $('#modal-enable').on('hidden.bs.modal', function (e) {
                    // 处理代码...
                    $("section").nextAll().remove();            
                })
            })
        },
        // 禁用
        disableOption: function(){
            $(".disable").on("click", function(){
                var _this = $(this).parent().parent();
                var mobileData = {
                    mobile: _this.data("mobile"),
                    userId: _this.data("userid")
                }
                $("section").after(disableH(mobileData));
                $("#modal-disable").modal("show");

                var validate = $("#disableForm").validate({
                    debug: true, //调试模式取消submit的默认提交功能   
                    //errorClass: "label.error", //默认为错误的样式类为：error   
                    focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                    onkeyup: false,
                    onblur: true,     
                    submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                        $.ajax({ 
                            type: "post",
                            url: "/user/forbidden.json",
                            data: $("#disableForm").serialize(),
                            success: function(data, status, xhr){
                                if(data.code == -1){ 
                                    alert(data.error);
                                }else{ 
                                    // window.location.reload();
                                    alert("禁用成功");
                                    setTimeout(function(){window.location.reload();}, 500);
                                }
                            },
                            error: function(xhr, errorType, error){
                                alert(error);
                            }
                        })
                    }                         
                });

                $('#modal-disable').on('hidden.bs.modal', function (e) {
                    // 处理代码...
                    $("section").nextAll().remove();          
                })
            }) 
        }
    };
    module.exports = accountManage;
    // main.init();
});