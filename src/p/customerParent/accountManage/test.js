define(function(require, exports, module){
    var $ = require("$"),
    tools = require("../../../c/js/toolsSocket");
    require("../../../c/js/jquery.pager");


    var main = {
        init:function(){
            var self = this;
            var queryBox = require('./queryBoxTmp.handlebars');
            $("#queryBoxID").html(queryBox());

            self.list = $("#tableBox");
            self.data = {
                pageIndex:1,
                pageSize:10,
            }
            self.getList(self.data);
            self.initEvent();
        },
        initEvent:function(){
            var self = this;
            $("body").on("click","#add",function(){
                var addAccountModal = require('./addAccount.handlebars');
                $("body").append(addAccountModal());
                $("#modal-add").modal("show");
                self.getRoleList(0);
                self.submitForm("add");
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
                        var listTmp = require("./listTmp.handlebars");
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
        //获取类型（角色）列表
        getRoleList:function (roleName) {
            //.log(roleName);
            $.ajax({
                cache: false,
                type: "post",
                url: '/role/view.json',
                success: function(data){
                    console.log(data);
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
    };
    main.init();
});