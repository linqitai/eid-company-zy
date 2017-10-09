define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../../c/js/toolsSocket");
    require("../../../c/js/jquery.pager");
    require('../../../c/js/registerHelper');
    //require('../../../c/js/registerHelper');
    require("../../../c/static/h-ui/js/H-ui");

    require("../../../c/js/jquery.provincesCity");
    require("../../../c/js/jquery.provincesCity2");

    var queryBoxTmp = require("./queryBoxTmp.handlebars");
    var listTmp = require("./listTmp.handlebars");
    var addStoreTmp = require("./addStore.handlebars");
    var confirmTmp = require("./confirm.handlebars");

    var main = {
        init:function(){
            tools.displaynavbar();
            tools.customerParentInit();
            var self = this;
            $("#queryBoxID").html(queryBoxTmp());
            $("#provinceCity").ProvinceCity2();
            self.body = $(".page");
            self.list = $("#tableBox");
            self.data = {
                pageIndex:1,
                pageSize:10,
                companyName:"",
                borrowerName:""
            }
            self.getList(self.data);
            self.initEvents();
        },
        initEvents:function () {
            var self = this;

            $("#provinceCity #city,#provinceCity #province").on("change",function () {
                self.province = $("#province").val();
                self.city = $("#city").val();
                //.log(province+","+city);
                self.data = {
                    pageIndex:1,
                    pageSize:10,
                    province:self.province,
                    city:self.city,
                    linkMan:$("#linkname").val().trim(),
                    companyName:$("#companyname").val().trim()
                }
                self.getList(self.data);
            });
            //搜索按钮点击事件
            $(".searchIcon").on("click",function () {
                var searchText = $(this).parent().find("input").val();
                //.log("searchText:"+searchText);
                if($(this).data("searchtype")=="linkname"){
                    self.linkMan = searchText;
                    self.data = {
                        pageIndex:1,
                        pageSize:10,
                        province:self.province,
                        city:self.city,
                        linkMan:self.linkMan.trim(),
                        companyName:$("#companyname").val().trim()
                    }
                }else{
                    self.companyName = searchText;
                    self.data = {
                        pageIndex:1,
                        pageSize:10,
                        province:self.province,
                        city:self.city,
                        linkMan:$("#linkname").val().trim(),
                        companyName:self.companyName.trim()
                    }
                }
                self.getList(self.data);
            });
            //新增门店按钮点击事件
            $("#addStore").on("click", function(){
                $("body").find("#modal-addStore").remove();
                $("body").append(addStoreTmp());
                $("#modal-addStore").modal("show");
                $("#province_city").ProvinceCity();
                //确认新增门店事件
                self.submitForm("add");
            });
            //点击确认新增按钮后把按钮置为不可用状态
            $("body").on("click","#sureAddBtn",function () {
                var companyName = $("#companyName").val();
                var address = $("#address").val();
                var linkMan = $("#linkMan").val();
                var phone = $("#phone").val();
                if(companyName.length>0&&address.length>0&&linkMan.length>0&&phone.length>0){
                    $(this).addClass("disabled");
                }
            });
            //编辑按钮点击事件
            self.list.on("click",".edit",function () {
                var companyId = $(this).parent().data("companyid");
                var data = {
                    companyId:companyId
                }
                $.ajax({
                    data:data,
                    cache: false,
                    type: "post",
                    url: '/headShop/subShop/editInfo.json',
                    success: function(data){
                        if(data.code==0){
                            var obj = data.obj;
                            //.log(obj);
                            $("body").find("#modal-addStore").remove();
                            $("body").append(addStoreTmp());
                            $("#modal-addStore .modal-title").html("编辑门店");
                            $("#modal-addStore").modal("show");
                            $("#province_city").ProvinceCity();
                            $("#companyId").val(obj.companyId);
                            $("#companyName").val(obj.companyName);
                            $("#modal-addStore #province").val(obj.province).trigger("change");
                            $("#modal-addStore #city").val(obj.city);
                            //.log(obj.city);
                            $("#address").val(obj.address);
                            $("#linkMan").val(obj.linkMan);
                            $("#phone").val(obj.phone);
                            self.submitForm("edit");
                        }else{
                            tools.tusi(data.error);
                        }
                    }
                });
            });
            //重置密码按钮点击事件
            self.list.on("click",".reset",function () {
                var companyId = $(this).parent().data("companyid");
                var linkMan = $(this).parent().data("linkman");
                self.companyId = companyId;
                $("body").find("#modal-confirm").remove();
                $("body").append(confirmTmp());
                $("#modal-confirm .modal-body").html("你确定要重置<b>"+linkMan+"</b>的密码吗？");
                $("#modal-confirm").modal("show");
                //确认重置密码按钮点击事件
                $("#modal-confirm .modal-footer a").eq(0).on("click",function () {
                    var data = {
                        companyId:self.companyId
                    }
                    //.log(data);
                    $.ajax({
                         data:data,
                         cache: false,
                         type: "post",
                         url: '/headShop/subShop/resetPassword.json',
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
            //删除门店按钮点击事件
            self.list.on("click",".delete",function () {
                var companyId = $(this).parent().data("companyid");
                var linkMan = $(this).parent().data("linkman");
                self.companyId = companyId;
                $("body").find("#modal-confirm").remove();
                $("body").append(confirmTmp());
                $("#modal-confirm .modal-body").html("你确定要删除<b>"+linkMan+"</b>的门店吗？");
                $("#modal-confirm").modal("show");
                //确认删除门店按钮点击事件
                $("#modal-confirm .modal-footer a").eq(0).on("click",function () {
                    var data = {
                        companyId:self.companyId
                    }
                    //.log(data);
                    $.ajax({
                        data:data,
                        cache: false,
                        type: "post",
                        url: '/headShop/subShop/del.json',
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
            $("#addStoreForm").validate({
                debug: true, //调试模式取消submit的默认提交功能
                //errorClass: "label.error", //默认为错误的样式类为：error
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应
                onkeyup: false,
                onblur: true,
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form
                    $.ajax({
                        type: "post",
                        url: type=="add"?"/headShop/subShop/add.json":"/headShop/subShop/edit.json",
                        data: $("#addStoreForm").serialize(),
                        success: function(data, status, xhr){
                            //var data = $.parseJSON(data);
                            // var data = JSON.parse(data);
                            //.log(data);
                            if(data.code == 0){
                                tools.tusi(type=="add"?"添加成功":"编辑成功");
                                $("#modal-addStore").modal("hide");
                                self.getList(self.data);
                            }else{
                                tools.tusi(data.error);
                                $("body").find("#sureAddBtn").removeClass("disabled");
                            }
                        }
                    })
                },
                rules:{
                    companyName:{
                        required:true,
                        maxlength:49
                    },
                    city: {
                        required: true,
                    },
                    address: {
                        required: true,
                    },
                    linkMan: {
                        required: true,
                        maxlength:10
                    },
                    phone: {
                        required: true,
                        mobile:true
                    }
                },
                messages:{
                    companyName:{
                        required: "<i>*</i> 门店名称不能为空",
                        maxlength:"<i>*</i> 门店名称太长"
                    },
                    city: {
                        required: "<i>*</i> 请选择",
                    },
                    address:{
                        required: "<i>*</i> 详细地址不能为空"
                    },
                    linkMan: {
                        required: "<i>*</i> 负责人不能为空",
                        maxlength:"<i>*</i> 负责人长度最多是 10 的字符串",
                    },
                    phone: {
                        required: "<i>*</i> 手机号码不能为空",
                    }
                }
            });
        },
        getList:function (data) {
            var self = this;
            $.ajax({
                data:data,
                cache: false,
                type: "post",
                url: '/headShop/subShop/view.json',
                success: function(data){
                    self.list.empty();
                    //.log(data);
                    if(data.code==0){
                        var list = data.list;
                        self.list.html(listTmp(list));
                        self.pagerInit(data.count);
                    }else{
                        tools.tusi(data.error);
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