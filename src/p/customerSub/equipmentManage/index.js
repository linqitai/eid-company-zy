define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../../c/js/toolsSocket");
    require("../../../c/js/jquery.pager");
    require('../../../c/js/registerHelper');
    //require('../../../c/js/registerHelper');
    require("../../../c/static/h-ui/js/H-ui");

    var addEquipmentTmp = require("./addEquipment.handlebars");
    var queryBoxTmp = require("./queryBoxTmp.handlebars");
    var listTmp = require("./listTmp.handlebars");
    var confirmTmp = require("./confirm.handlebars");

    var main = {
        init:function(){
            tools.displaynavbar();
            tools.customerParentInit();
            var self = this;
            $(".table").before(queryBoxTmp());
            self.body = $(".page");
            self.list = $("table.table");
            self.data = {
                pageIndex:1,
                pageSize:10,
            }
            self.getList(self.data);
            self.initEvents();
        },
        initEvents:function () {
            var self = this;

            //新增门店按钮点击事件
            $("#add").on("click", function(){
                $("body").find("#modal-add").remove();
                $("body").append(addEquipmentTmp());
                $("#modal-add").modal("show");
                //确认新增事件
                self.submitForm("add");
            });
            //点击确认新增按钮后把按钮置为不可用状态
            $("body").on("click","#sureAddBtn",function () {
                if($("#deviceMac").val().length>0) {
                    console.log("more mac");
                    $(this).addClass("disabled");
                }
            });
            //编辑按钮点击事件
            self.list.on("click",".edit",function () {
                var deviceId = $(this).parent().data("deviceid");
                var deviceMac = $(this).parent().data("devicemac");
                $("body").find("#modal-add").remove();
                $("body").append(addEquipmentTmp());
                $("#modal-add").modal("show");
                $("#deviceId").val(deviceId);
                $("#deviceMac").val(deviceMac);
                //确认编辑事件
                self.submitForm("edit");
            });
            //删除门店按钮点击事件
            self.list.on("click",".delete",function () {
                var deviceId = $(this).parent().data("deviceid");
                var deviceMac = $(this).parent().data("devicemac");
                $("body").find("#modal-confirm").remove();
                $("body").append(confirmTmp());
                $("#modal-confirm .modal-body").html("你确定要删除MAC地址为<b>"+deviceMac+"</b>的设备吗？");
                $("#modal-confirm").modal("show");
                //确认删除门店按钮点击事件
                $("#modal-confirm .modal-footer a").eq(0).on("click",function () {
                    var data = {
                        deviceId:deviceId
                    }
                    //.log(data);
                    $.ajax({
                        data:data,
                        cache: false,
                        type: "post",
                        url: '/subShop/device/del.json',
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
                        url: type=="add"?"/subShop/device/add.json":"/subShop/device/edit.json",
                        data: $("#addForm").serialize(),
                        success: function(data, status, xhr){
                            //.log(data);
                            if(data.code == 0){
                                tools.tusi(type=="add"?"添加成功":"编辑成功");
                                $("#modal-add").modal("hide");
                                self.getList(self.data);
                            }else{
                                tools.tusi(data.error);
                                $("body").find("#sureAddBtn").removeClass("disabled");
                            }
                        }
                    })
                },
                rules:{
                    deviceMac:{
                        required:true,
                    },
                },
                messages:{
                    deviceMac:{
                        required: "<i>*</i> MAC地址不能为空"
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
                url: '/subShop/device/view.json',
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