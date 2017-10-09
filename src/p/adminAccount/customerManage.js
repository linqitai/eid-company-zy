define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../c/js/tools");   

    // require("../../c/lib/jquery.validation/1.14.0/jquery.validate.min"); 
    // require("../../c/lib/jquery.validation/1.14.0/validate-methods"); 
    // require("../../c/lib/jquery.validation/1.14.0/messages_zh.min");
    require("../../c/js/jquery.provincesCity"); 
    require("../../c/js/provincesData");   

    var addCustomerH = require('../../p/adminAccount/customerManageH/addCustomerH.handlebars'),
        customerMH = require('../../p/adminAccount/customerManageH/customerMH.handlebars'),
        customerTableH = require('../../p/adminAccount/customerManageH/customerTableH.handlebars'),
        data = {
            pageIndex: 1,
            pageSize: 10
        }

    var customerManage = {
        init:function(){
            var self = this;
            $(".customerM").html(customerMH());

            self.customerList();
            self.addCustomer();
            self.searchCustomer();
        },
        addCustomer:function(){
            var self = this;
            $("#addCustomer").on("click", function(){
                $("section").after(addCustomerH());

                self.typeIdOption();
                $("#province_city").ProvinceCity();

                $("#modal-addCustomer").modal("show");

                $("#typeId").on("change", function(){             
                    $("#typeName").val($("#typeId option:selected").text());            
                });

                self.customerForm_validate();

                $('#modal-addCustomer').on('hidden.bs.modal', function (e) {
                    // 处理代码...
                    // $("#province_city").html("");  
                    $("section").nextAll().remove();             
                });
                $("#inlineRadio1").on("click",function(){
                    $("#rebackurl").addClass("active")
                });
                 $("#inlineRadio2").on("click",function(){
                    $("#rebackurl").removeClass("active")
                })
                //添加LOGO file的change事件
                $("#fileUpload").on("change",function(e){
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
                            $("#fileImg").attr('src', data.url);
                            $("#logoUrl").attr('value', data.url);
                            $("#addLogoText").text("更换LOGO");
                        } else {
                            console.log(data);
                            alert("图片上传出错,请重新上传");      
                        }                         
                    }).fail(function(data){
                        alert("图片上传出错,请重新上传");
                    })
                });
            })
        },
        typeIdOption: function(){
            var typeId = $("#typeId");
            $.ajax({ 
                type: "post",
                url: "/companyType/list.json",
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{ 
                        console.log(data.list.length)
                        for(var i=0;i<data.list.length;i++){
                            typeId.append("<option value='"+data.list[i].typeId+"'>"+data.list[i].typeName+"</option>");
                        }
                        // alert("恭喜你登录成功");
                    }
                },
                error: function(xhr, errorType, error){
                    alert(error);
                }
            })
         
        },
        customerForm_validate: function(){

            var validate = $("#addCustomerForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                        $.ajax({ 
                            type: "post",
                            url: "/company/master/create.json",
                            data: $("#addCustomerForm").serialize(),
                            success: function(data, status, xhr){
                                if(data.code == -1){ 
                                    alert(data.error);
                                }else{ 
                                    // window.location.reload();
                                    alert("新增客户成功");
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
                    typeId: {
                        required: true
                    },
                    linkMan: {
                        required: true
                    },
                    phone: {
                        required: true,
                        mobile:true
                    },
                    province: {
                        required: true
                    },
                    city: {
                        required: true
                    },
                    address: {
                        required: true
                    },
                    logoUrl: {
                        required: true
                    }           
                },
                messages:{                    
                    companyName:{
                        required: "<i>*</i>客户名称不能为空，请输入"                   
                    },
                    typeId: {  
                        required: "<i>*</i>客户类型不能为空，请选择"
                    },
                    linkMan: {
                        required: "<i>*</i>联系人不能为空，请输入"
                    },
                    phone: {
                        required: "<i>*</i>手机号码不能为空，请输入"
                    },
                    province: {
                        required: "<i>*</i>省市不能为空，请选择"
                    },
                    city: {
                        required: ""
                    },
                    address: {
                        required: "<i>*</i>详细地址不能为空，请输入"
                    },
                    logoUrl: {
                        required: "<i>*</i>请选择LOGO图片"
                    }                                                  
                }                          
            });
        },
        customerList: function(){
            var self = this;
            $.ajax({ 
                type: "post",
                url: "/company/master/list.json",
                data: data,
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{
                        // data.list.statusText
                        $(".customerTable").html(customerTableH(data.list));
                        self.pagerInit(data.count);
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
                    self.customerList();
                }
            });
        },
        searchCustomer: function(){
            var self = this;
            var validate = $("#customer_searchForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    data.companyName = $("#companyName").val();
                    data.linkMan = $("#linkMan").val();
                    data.pageIndex = 1;
                    self.customerList();                   
                }                           
            });
        }
    };
    module.exports = customerManage;
    // customerManage.init();
});