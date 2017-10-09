define(function(require, exports, module){
    require("../../c/static/h-ui/js/H-ui");
    var $ = require("$"),
        tools = require("../../c/js/tools");   
    require("../../c/js/jquery.validate"); 
    require("../../c/js/validate-add-methods"); 
    require("../../c/js/validate-messages-cn");
    require("../../c/js/jquery.provincesCity"); 
    require("../../c/js/provincesData"); 
    require("../../c/js/bootstrap-datetimepicker"); 
    require("../../c/js/bootstrap-datetimepicker.zh-CN");
    require('../../c/js/registerHelper.js');
    require("../../c/js/jquery.pager");

    var cDetailMH = require('../../p/adminAccount/customerManageH/cDetailMH.handlebars'),
        cDetailSeachH = require('../../p/adminAccount/customerManageH/cDetailSeachH.handlebars'),
        cDetailSeachDH = require('../../p/adminAccount/customerManageH/cDetailSeachDH.handlebars'),
        cDetailSTableH = require('../../p/adminAccount/customerManageH/cDetailSTableH.handlebars'),
        cDetailDTableHs = require('../../p/adminAccount/customerManageH/cDetailDTableHs.handlebars'),
        cDetailDTableHss = require('../../p/adminAccount/customerManageH/cDetailDtabless.handlebars'),
        cDetailDTableH = require('../../p/adminAccount/customerManageH/cDetailDTableH.handlebars'),
        cDetailResetH = require('../../p/adminAccount/customerManageH/cDetailResetH.handlebars'),
        data = {
            pageIndex: 1,
            pageSize: 5,
            companyId: tools.getUrlParam("companyId")
        }

    var main = {
        init:function(){
            var self = this;
            $("#detailService_searchForm").html(cDetailSeachH());
            $(".dataContent_search").html(cDetailSeachDH());
            $(function(){
                $.Huitab("#tab_demo .tabBar span","#tab_demo .tabCon","current","click","0");
            });

            // 获取用户信息
            $.when(tools.getUserInfo()).then(function(data){
                if(data.login == true) {
                    self.customerDetail();
                    self.cServiceInfor();
                    self.cDataInfor();
                    self.cDataInfors();
                    self.searchService();
                    self.searchData();
                    self.datetimepicker();

                }else{
                        
                }                
            }, function(){
                
            });
        },
        // 客户详情
        customerDetail: function(){
            var self = this;
            $.ajax({ 
                type: "post",
                url: "/company/master/customerDetail.json",
                data: data,
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{
                        $(".customerM").html(cDetailMH(data.obj));
                        self.typeIdOption(data.obj.typeId);
                        $("#province_city").ProvinceCity();
                        $("#province").val(data.obj.province);
                        $("#province").trigger("change");
                        $("#city").val(data.obj.city);

                        $("#province").attr("disabled",true); 
                        $("#city").attr("disabled",true);
                        // $("#status  option[value='1']").attr("selected",true);
                        $("#status").val(data.obj.status);
                        $("#isNeedCall").val(data.obj.isNeedCall);
                        $("#imgUrl").attr('src',data.obj.logoUrl);
                        console.log("logoUrl:"+data.obj.logoUrl);

                        var editOption = $(".editOption"),
                            saveBtn = $(".saveBtn"),
                            editBtn = $(".editBtn");
                        $(".editOption").on("click", function(){
                            if(saveBtn.hasClass("current")){
                                editBtn.addClass("current");
                                saveBtn.removeClass("current");
                                $("#editCustomerForm").find("input, select, textarea").attr("disabled",false);
                                $("#typeId").on("change", function(){             
                                    $("#typeName").val($("#typeId option:selected").text());            
                                });
                                self.detailEditForm_validate();
                            }
                        })
                        //显示上传图片按钮
                        $("#editCustomerForm").on("click","#editBtn",function(){
                            document.getElementById('fileUpload2').style.display = 'block';
                            document.getElementById('changeText').style.display = 'block';
                            console.log("block");
                        });
                        //上传图片
                        $("#editCustomerForm").on("change","#fileUpload2",function(e){
                            var file = e.target.files[0];
                            if(file.size > 1 * 1024 *1024) {
                                alert("提示:上传图片超过最大限制1M");
                                return;
                            }  
                            var dataInfo = new FormData();
                            dataInfo.append("file", file);
                            $.ajax({
                                type: 'post',
                                data: dataInfo,
                                cache: false,
                                processData: false,
                                contentType: false,
                                url: '/common/upload/image.do'         
                            }).done(function(data){                                            
                                if(data.code == 0) {  
                                    $("#imgUrl").attr('src', data.url);
                                    $("#logoUrl2").attr('value', data.url);
                                } else {
                                    console.log(data);
                                    alert("图片上传出错,请重新上传");      
                                }                         
                            }).fail(function(data){
                                alert("图片上传出错,请重新上传");
                            })
                        });
                        self.resetPswOption();
                    }
                },
                error: function(xhr, errorType, error){
                    alert(error);
                }
            }) 
        },
        detailEditForm_validate: function(){
            var validate = $("#editCustomerForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    $.ajax({ 
                        type: "post",
                        url: "/company/master/edit.json",
                        data: $("#editCustomerForm").serialize(),
                        success: function(data, status, xhr){
                            if(data.code == -1){ 
                                alert(data.error);
                            }else{ 
                                // window.location.reload();
                                alert("客户信息编辑成功");
                                setTimeout(function(){window.location.reload();}, 500);
                            }
                        },
                        error: function(xhr, errorType, error){
                            alert(error);
                        }
                    })            
                     
                },                   
                rules:{                   
                    companyName:{
                        required:true
                    },                   
                    linkMan: {
                        required: true
                    },
                    phone: {
                        required: true,
                        mobile:true
                    },
                    deviceCount: {
                        required: true
                    },
                    typeId: {
                        required: true
                    },
                    status: {
                        required: true
                    },
                    province: {
                        required: true
                    },
                    city: {
                        required: true
                    },
                    address: {
                        required: true
                    }              
                },
                messages:{                    
                    companyName:{
                        required: "<i>*</i>客户名称不能为空，请输入"                   
                    },
                    linkMan: {
                        required: "<i>*</i>联系人不能为空，请输入"
                    },
                    phone: {
                        required: "<i>*</i>手机号码不能为空，请输入"
                    },
                    deviceCount: {
                        required: "<i>*</i>设备数量不能为空，请输入"
                    },
                    typeId: {  
                        required: "<i>*</i>客户类型不能为空，请选择"
                    }, 
                    status: {
                        required: "<i>*</i>状态不能为空，请选择"
                    },                
                    province: {
                        required: "<i>*</i>省市不能为空，请选择"
                    },
                    city: {
                        required: ""
                    },
                    address: {
                        required: "<i>*</i>详细地址不能为空，请输入"
                    }                                                     
                }                          
            });
        },
        typeIdOption: function(obj){
            var typeId = $("#typeId");
            $.ajax({ 
                type: "post",
                url: "/companyType/list.json",
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{ 
                        for(var i=0;i<data.list.length;i++){
                            if(obj == data.list[i].typeId){
                                typeId.append("<option value='"+data.list[i].typeId+"' selected>"+data.list[i].typeName+"</option>");
                            }else{
                                typeId.append("<option value='"+data.list[i].typeId+"'>"+data.list[i].typeName+"</option>");
                            }
                        }
                    }
                },
                error: function(xhr, errorType, error){
                    alert(error);
                }
            })
        },
        // 设备信息
        cServiceInfor: function(){
            var self = this;
            $.ajax({ 
                type: "post",
                url: "/company/master/customerDetail/device.json",
                data: data,
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{
                        $(".accountSTable").html(cDetailSTableH(data.list));
                        self.pagerInitS(data.count);
                    }
                },
                error: function(xhr, errorType, error){
                    alert(error);
                }
            }) 
        },
        pagerInitS:function(totalcount){
            var self = this;
            if(totalcount>0){
                $(".accountSTable").find(".pager").show();
            }else{
                $(".accountSTable").find(".pager").hide();
            }
            $(".accountSTable").find(".pager").pager({
                pagenumber: data.pageIndex,
                pagecount: Math.ceil(totalcount/data.pageSize),
                totalcount: totalcount,
                //回调函数
                buttonClickCallback: function(pageclickednumber) {
                    data.pageIndex = pageclickednumber;
                    self.cServiceInfor();
                }
            });
        },
        searchService: function(){
            var self = this;
            var validate = $("#detailService_searchForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    data.macId = $("#macId").val();
                    data.pageIndex = 1;
                    self.cServiceInfor();                   
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
        //充值管理
        cDataInfors: function(){
            var self = this;
            $.ajax({ 
                type: "get",
                url: "/recharge/ManageClientRecharge.json",
                data: data,
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        // alert(data.error);
                    }else{
                        console.log(data.count)
                        $(".accountDTables").html(cDetailDTableHs(data.list));
                         $(".accountDTabless").html(cDetailDTableHss(data.obj));
                        self.pagerInitDs(data.count);
                    }
                },
                error: function(xhr, errorType, error){
                    // alert(error);
                }
            }) 
        },
        pagerInitDs:function(totalcount){
            var self = this;
            if(totalcount>0){
                $(".accountDTables").find(".pager").show();
            }else{
                $(".accountDTables").find(".pager").hide();
            }
            $(".accountDTables").find(".pager").pager({
                pagenumber: data.pageIndex,
                pagecount: Math.ceil(totalcount/data.pageSize),
                totalcount: totalcount,
                //回调函数
                buttonClickCallback: function(pageclickednumber) {
                    data.pageIndex = pageclickednumber;
                    self.cDataInfors();
                }
            });
        },
        // 数据信息
        cDataInfor: function(){
            var self = this;
            $.ajax({ 
                type: "post",
                url: "/company/master/customerDetail/borrowers.json",
                data: data,
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{
                        console.log(data.list)
                        $(".accountDTable").html(cDetailDTableH(data.list));
                        self.pagerInitD(data.count);
                    }
                },
                error: function(xhr, errorType, error){
                    alert(error);
                }
            }) 
        },
        pagerInitD:function(totalcount){
            var self = this;
            if(totalcount>0){
                $(".accountDTable").find(".pager").show();
            }else{
                $(".accountDTable").find(".pager").hide();
            }
            $(".accountDTable").find(".pager").pager({
                pagenumber: data.pageIndex,
                pagecount: Math.ceil(totalcount/data.pageSize),
                totalcount: totalcount,
                //回调函数
                buttonClickCallback: function(pageclickednumber) {
                    data.pageIndex = pageclickednumber;
                    self.cDataInfor();
                }
            });
        },
        searchData: function(){
            var self = this;
            var validate = $("#detailData_searchForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    data.companyName = $("#detailData_searchForm").find('input[name="companyName"]').val();
                    data.pageIndex = 1;
                    self.cDataInfor();                   
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
        // 查询时间选择
        datetimepicker: function(){
            var self = this;
            $(".dataContent_search").find('.customStartTime').datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm-dd",
                startView: 2,
                minView: 2,
                autoclose: true,
                todayBtn: 1
            });
            $(".dataContent_search").find('.customEndTime').datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm-dd",
                startView: 2,
                minView: 2,
                autoclose: true,
                todayBtn: 1
            });
            $(".customStartTime").on("click", function(){
                $('.customStartTime').datetimepicker('show');
                $('.customEndTime').datetimepicker('hide');
            })
            $(".customEndTime").on("click", function(){
                $('.customEndTime').datetimepicker('show');
                $('.customStartTime').datetimepicker('hide');
            })
            $('.customStartTime').datetimepicker().on('changeDate', function(e) {
                console.log($(".customStartTime").val())
                $('.customEndTime').datetimepicker('setStartDate', $('.customStartTime').val());
                if($.trim($(".customEndTime").val()).length<=0){
                    $(".customEndTime").val($('.customStartTime').val());
                }else{
                    // alert("请选择")
                }
                data.pageIndex = 1;
                data.customStartTime = $(".customStartTime").val();
                data.customEndTime = $(".customEndTime").val();
                data.companyName = $("#detailData_searchForm").find('input[name="companyName"]').val();
                self.cDataInfor();
            })
            $('.customEndTime').datetimepicker().on('changeDate', function(e) {
                console.log($(".customEndTime").val())
                $('.customStartTime').datetimepicker('setEndDate', $('.customEndTime').val());
                if($.trim($(".customStartTime").val()).length<=0){
                    $(".customStartTime").val($('.customEndTime').val());
                }else{

                }
                data.pageIndex = 1;
                data.customStartTime = $(".customStartTime").val();
                data.customEndTime = $(".customEndTime").val();
                data.companyName = $("#detailData_searchForm").find('input[name="companyName"]').val();
                self.cDataInfor();
            })
        },
        // 重置密码
        resetPswOption:function(){
            $("#customerResetPsw").on("click", function(){
                var _this = $(this);
                var detailData = {
                    companyId: _this.data("companyid"),
                    phone: _this.data("phone")
                }
                $("section").after(cDetailResetH(detailData));
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
                            url: "/company/master/resetPassword.json",
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
        }
    };
    main.init();
});