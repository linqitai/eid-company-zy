define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../../c/js/toolsSocket");
    require("../../../c/js/jquery.pager");
    require('../../../c/js/registerHelper');
    //require('../../../c/js/registerHelper');
    require("../../../c/static/h-ui/js/H-ui");

    var addAccountTmp = require("./addAccount.handlebars");
    var queryBoxTmp = require("./queryBoxTmp.handlebars");
    var listTmp = require("./listTmp.handlebars");
    var confirmTmp = require("./confirm.handlebars");

    var main = {
        init:function(){
            tools.displaynavbar();
            tools.customerParentInit();
            var self = this;
            $("#queryBoxID").html(queryBoxTmp());

            self.body = $(".page");
            self.list = $("#tableBox");
            self.data = {
                pageIndex:1,
                pageSize:10,
            }
            self.getList(self.data);
            self.initEvents();
        },
        //获取类型（角色）列表
        getRoleList:function (roleName) {
            //.log(roleName);
            $.ajax({
                cache: false,
                type: "post",
                url: '/role/view.json',
                success: function(data){
                    //.log(data);
                    if(data.code==0){
                        var list = data.list;
                        var html="";
                        for(var i=0;i<list.length;i++){
                            if(roleName==list[i].roleName){
                                html+='<option value="'+list[i].roleId+'" selected>'+list[i].roleName+'</option>';
                            }else{
                                html+='<option value="'+list[i].roleId+'">'+list[i].roleName+'</option>';
                            }
                        }
                        $("#roleId").html(html)
                    }else{
                        tools.tusi("获取角色失败,请刷新");
                    }
                }
            });
        },
        initEvents:function () {
            var self = this;

            //新增门店按钮点击事件
            $("#add").on("click", function(){
                $("body").find("#modal-add").remove();
                $("body").append(addAccountTmp());
                $("#modal-add").modal("show");
                //获取类型列表
                self.getRoleList(0);
                //状态选择框
                $("#statusSelectBox .radio-box").eq(0).bind("click",function () {
                    //.log(0);
                    $("#status").val(0)
                });
                $("#statusSelectBox .radio-box").eq(1).bind("click",function () {
                    //.log(1);
                    $("#status").val(1)
                });
                //确认新增事件
                self.submitForm("add");
            });

            //编辑按钮点击事件
            self.list.on("click",".edit",function () {
                var customerId = $(this).parent().data("customerid");
                var mobile = $(this).parent().data("addMobile");
                var realName = $(this).parent().data("realname");
                var status = $(this).parent().data("status");
                var roleId = $(this).parent().data("roleid");
                var roleName = $(this).parent().data("rolename");

                $("body").find("#modal-add").remove();
                $("body").append(addAccountTmp());
                $("#modal-add .modal-title").html("编辑");
                $("#modal-add").modal("show");


                $("#customerId").val(customerId);
                $("#addMobile").val(mobile);
                $("#realName").val(realName);
                //获取类型列表
                self.getRoleList(roleName);
                $("#modal-add #roleId").val(roleName);
                $("#status").val(status);
                if(status==1){
                    $("#forbidden").attr("checked",true);
                    //.log("status:1");
                }
                //状态选择框
                $("#statusSelectBox .radio-box").eq(0).bind("click",function () {
                    //.log(0);
                    $("#status").val(0)
                });
                $("#statusSelectBox .radio-box").eq(1).bind("click",function () {
                    //.log(1);
                    $("#status").val(1)
                });
                //确认编辑事件
                self.submitForm("edit");
            });
            //重置密码按钮点击事件
            self.list.on("click",".reset",function () {
                var customerId = $(this).parent().data("customerid");
                var realName = $(this).parent().data("realname");
                $("body").find("#modal-confirm").remove();
                $("body").append(confirmTmp());
                $("#modal-confirm .modal-body").html("你确定要重置<b>"+realName+"</b>的密码吗？");
                $("#modal-confirm").modal("show");
                //确认重置密码按钮点击事件
                $("#modal-confirm .modal-footer a").eq(0).on("click",function () {
                    var data = {
                        customerId:customerId
                    }
                    //.log(data);
                    $.ajax({
                        data:data,
                        cache: false,
                        type: "post",
                        url: '/headShop/user/resetPassword.json',
                        success: function(data){
                            //.log(data);
                            if(data.code==0){
                                tools.tusi("重置密码成功");
                                $("#modal-confirm").modal("hide");
                                self.getList(self.data);
                            }else{
                                tools.tusi(data.error);
                            }
                        }
                    });
                });
            });
            //删除按钮点击事件
            self.list.on("click",".delete",function () {
                var customerId = $(this).parent().data("customerid");
                var realname = $(this).parent().data("realname");
                $("body").find("#modal-confirm").remove();
                $("body").append(confirmTmp());
                $("#modal-confirm .modal-body").html("你确定要删除<b>"+realname+"</b>的账号吗？");
                $("#modal-confirm").modal("show");
                //确认删除门店按钮点击事件
                $("#modal-confirm .modal-footer a").eq(0).on("click",function () {
                    var data = {
                        customerId:customerId
                    }
                    //.log(data);
                    $.ajax({
                        data:data,
                        cache: false,
                        type: "post",
                        url: '/headShop/user/del.json',
                        success: function(data){
                            //.log(data);
                            if(data.code==0){
                                tools.tusi("删除成功");
                                $("#modal-confirm").modal("hide");
                                self.getList(self.data);
                            }else{
                                tools.tusi(data.error);
                            }
                        }
                    });
                });
            });
        },
        submitForm:function (type) {
            var self = this;
            $("#addForm").validate({
                debug: true, //调试模式取消submit的默认提交功能
                //errorClass: "label.error", //默认为错误的样式类为：error
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应
                onkeyup: false,
                onblur: true,
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form
                    $.ajax({
                        type: "post",
                        url: type=="add"?"/headShop/user/add.json":"/headShop/user/edit.json",
                        data: $("#addForm").serialize(),
                        success: function(data, status, xhr){
                            //.log(data);
                            if(data.code == 0){
                                tools.tusi(type=="add"?"添加成功":"编辑成功");
                                $("#modal-add").modal("hide");
                                self.getList(self.data);
                            }else{
                                tools.tusi(data.error);
                            }
                        }
                    })
                },
                rules:{
                    mobile:{
                        required:true,
                        mobile:true
                    },
                    realName: {
                        required: true,
                        maxlength:10
                    },
                    roleId: {
                        required: true,
                    },
                    status: {
                        required: true,
                    },
                },
                messages:{
                    mobile:{
                        required: "<i>*</i> 电话号码不能为空"
                    },
                    realName: {
                        required: "<i>*</i> 姓名不能为空",
                        maxlength:"<i>*</i> 姓名长度最多是 10 的字符串",
                    },
                    roleId:{
                        required: "<i>*</i> 类型不能为空"
                    },
                    status: {
                        required: "<i>*</i> 状态为空",
                    },
                }
            });
        },
        getList:function (data) {
            var self = this;
            $.ajax({
                data:data,
                cache: false,
                type: "post",
                url: '/headShop/user/view.json',
                success: function(data){
                    self.list.empty();
                    //.log(data);
                    if(data.code==0){
                        var list = data.list;
                        self.list.html(listTmp(list));
                        self.pagerInit(data.count);
                    }else{
                        tools.tusi("获取数据失败,请刷新");
                    }
                }
            });
        },
        pagerInit:function(totalcount){
            var self = this;
            $("#loading").hide();
            if(totalcount>0){
                $("#pager").show();
            }else{
                $("#pager").hide();
            }
            $("#pager").pager({
                pagenumber: self.data.pageIndex,
                pagecount: Math.ceil(totalcount/self.data.pageSize),
                totalcount: totalcount,
                //回调函数
                buttonClickCallback: function(pageclickednumber) {
                    self.data.pageIndex = pageclickednumber;
                    self.getList(self.data);
                }
            });
        },
    };
    main.init();
});
