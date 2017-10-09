define(function(require, exports, module){
    var $ = require("$"),
        tools = require("./tools");   

    require('./registerHelper.js');

    var creditReportH = require('../handlebars/creditReport.handlebars'),
        creditOptionH = require('../handlebars/creditOptionH.handlebars'),
        userType;

    var main = {
        init:function(){
            var self = this;

            // 获取用户信息
            $.when(tools.getUserInfo()).then(function(data){
                if(data.login == true) {
                    userType = data.user.userType;
                    self.creditDetail();
                }else{
                    tools.tusi("未登录");
                    if(tools.getUrlParam("userType") == 1){
                        setTimeout(function(){window.location.href = "/company/login.htm";}, 500);
                    }else{
                        setTimeout(function(){window.location.href = "/customer/login.htm";}, 500);
                    } 
                }                
            }, function(){
                
            }); 
        },
        // 客户详情
        creditDetail: function(){
            var self = this;
            $.ajax({ 
                type: "post",
                url: "/cycle/credit/detail.json",
                data: data = {
                    encryptKey: tools.getUrlParam("encryptKey")
                },
                success: function(data, status, xhr){
                    if(data.code == -1){ 
                        alert(data.error);
                    }else{
                        data.obj.encryptKey = tools.getUrlParam("encryptKey");
                        $(".report_content").html(creditReportH(data.obj));
                        if(data.obj.birthdate){
                            $(".report_content").find(".birthdate_year").html(data.obj.birthdate.substr(0,4));
                            $(".report_content").find(".birthdate_mouth").html(data.obj.birthdate.substr(5,2));
                            $(".report_content").find(".birthdate_day").html(data.obj.birthdate.substr(8,2));
                        }else{
                            $(".report_content").find(".birthdate_year").html("--");
                            $(".report_content").find(".birthdate_mouth").html("--");
                            $(".report_content").find(".birthdate_day").html("--");
                        }
                        

                        console.log(userType);
                        if(userType == 2){
                            $(".btn.pass").show();
                            $(".btn.noThrougth").show();
                            $(".btn.blacklist").show();
                        }else{
                            $(".btn.download").show();
                        }
                        // 三个模块
                        if(data.obj.strategySet && data.obj.strategySet[0].rules){
                            if(data.obj.strategySet[0].rules.length > 0){
                                for(var i=0;i<data.obj.strategySet[0].rules.length;i++){
                                    var rules = data.obj.strategySet[0].rules[i];
                                    if(rules.court){
                                        $(".courtDataFirst").append('<tr><td>'+(rules.court['法院数据']==1?"有":"--")+'</td><td>'+(rules.court['法院执行名单']==1?"有":"--")+'</td><td>'+(rules.court['法院结案']==1?"有":"--")+'</td><td>'+(rules.court['法人失信']==1?"有":"--")+'</td></tr>')
                                    }else{
                                        $(".courtDataFirst").append('<tr><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                                    }
                                    if(rules.credit){
                                        $(".creditFirst").append('<tr><td>'+(rules.credit['信用/消费贷黑名单']==1?"有":"--")+'</td><td>'+(rules.credit['信贷逾期']==1?"有":"--")+'</td><td>'+(rules.credit['信用卡逾期']==1?"有":"--")+'</td><td>'+(rules.credit['P2P 黑名单']==1?"有":"--")+'</td><td>'+(rules.credit['助学贷款逾期']==1?"有":"--")+'</td></tr>');
                                        $(".creditSecond").append('<tr><td>'+(rules.credit['套现交易']==1?"有":"--")+'</td><td>'+(rules.credit['信贷失联']==1?"有":"--")+'</td><td>'+(rules.credit['信贷欺诈']==1?"有":"--")+'</td><td>'+(rules.credit['风控规则']==1?"有":"--")+'</td><td>'+(rules.credit['黑中介']==1?"有":"--")+'</td></tr>');
                                        $(".creditThree").append('<tr><td>'+(rules.credit['骗取补贴']==1?"有":"--")+'</td><td>'+(rules.credit['冒用风险']==1?"有":"--")+'</td><td>'+(rules.credit['模型分值低']==1?"有":"--")+'</td><td>'+(rules.credit['曾经逾期（0~30天）']==1?"有":"--")+'</td><td>'+(rules.credit['信贷黑名单']==1?"有":"--")+'</td></tr>');
                                        $(".creditFour").append('<tr><td>'+(rules.credit['商户欺诈名单']==1?"有":"--")+'</td><td>'+(rules.credit['曾经逾期（未知期限）']==1?"有":"--")+'</td></tr>');
                                    }else{
                                        $(".creditFirst").append('<tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                                        $(".creditSecond").append('<tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                                        $(".creditThree").append('<tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                                        $(".creditFour").append('<tr><td>--</td><td>--</td></tr>');
                                    }
                                    if(rules.pay){
                                        $(".threePayment").append('<tr><td>'+(rules.pay['盗卡']==1?"有":"--")+'</td><td>'+(rules.pay['其他欺诈']==1?"有":"--")+'</td><td>'+(rules.pay['盗用操作']==1?"有":"--")+'</td><td>'+(rules.pay['盗用支出']==1?"有":"--")+'</td></tr>')
                                    }else{
                                        $(".threePayment").append('<tr><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                                    }
                                }
                            }
                        }else{
                            $(".courtDataFirst").html('<tr><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                            $(".creditFirst").html('<tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                            $(".creditSecond").html('<tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                            $(".creditThree").html('<tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                            $(".creditFour").html('<tr><td>--</td><td>--</td></tr>');
                            $(".threePayment").html('<tr><td>--</td><td>--</td><td>--</td><td>--</td></tr>');
                        }
                        // 法院数据列表
                        if(data.obj.courtList){
                            for(var i=0;i<data.obj.courtList.length;i++){
                                $(".courtDataSecond").append('<tr><td>'+data.obj.courtList[i].caseCode+'</td><td>'+data.obj.courtList[i].courtName+'</td><td>'+data.obj.courtList[i].caseState+'</td></tr>')
                            }
                        }
                        // 典当行
                        if(data.obj.pawnList.length > 0){
                            for(var i=0;i<data.obj.pawnList.length;i++){
                                if(data.obj.pawnList[i].breachAction == 1){
                                    data.obj.pawnList[i].breachActionT = "续当";
                                }else if(data.obj.pawnList[i].breachAction == 2){
                                    data.obj.pawnList[i].breachActionT = "骗当";
                                }else{
                                    data.obj.pawnList[i].breachActionT = "绝当";
                                }
                                $(".pawnshopFirst").append('<tr><td>'+data.obj.pawnList[i].item+'</td><td>'+tools.formatMoney(data.obj.pawnList[i].amount)+'</td><td>'+data.obj.pawnList[i].from+'</td><td>'+data.obj.pawnList[i].dateTime+'</td></tr>')
                                $(".pawnshopSecond").append('<tr><td>'+data.obj.pawnList[i].breachActionT+'</td><td>'+data.obj.pawnList[i].description+'</td></tr>')
                            }
                        }
                        // 审核通过
                        $(".bottom_btn").on("click",".pass", function(){
                            var _this = $(this);
                            var optionData = {
                                borrowerName: data.obj.borrowerName,
                                optionText: _this.text(),
                                encryptKey: tools.getUrlParam("encryptKey"),
                                status: 1
                            }
                            $("section").after(creditOptionH(optionData));

                            $("#modal-creditOption").modal("show");

                            self.creditForm_validate();
                            
                            $('#modal-creditOption').on('hidden.bs.modal', function (e) {
                                $("section").nextAll().remove();             
                            })
                        })
                        // 审核不通过
                        $(".bottom_btn").on("click",".noThrougth", function(){
                            var _this = $(this);
                            var optionData = {
                                borrowerName: data.obj.borrowerName,
                                optionText: _this.text(),
                                encryptKey: tools.getUrlParam("encryptKey"),
                                status: 2
                            }
                            $("section").after(creditOptionH(optionData));

                            $("#modal-creditOption").modal("show");

                            self.creditForm_validate();
                            
                            $('#modal-creditOption').on('hidden.bs.modal', function (e) {
                                $("section").nextAll().remove();             
                            })
                        })
                        // 加入黑名单
                        $(".bottom_btn").on("click",".blacklist", function(){
                            var _this = $(this);
                            var optionData = {
                                borrowerName: data.obj.borrowerName,
                                optionText: _this.text(),
                                encryptKey: tools.getUrlParam("encryptKey"),
                                status: 3
                            }
                            $("section").after(creditOptionH(optionData));

                            $("#modal-creditOption").modal("show");

                            self.creditForm_validate();
                            
                            $('#modal-creditOption').on('hidden.bs.modal', function (e) {  
                                $("section").nextAll().remove();             
                            })
                        })
                        // 下载报告
                        $(".bottom_btn").on("click",".download", function(){
                            console.log(encodeURIComponent(tools.getUrlParam("encryptKey")));
                            window.location.href = "/cycle/credit/downloadPersonalReport.do?encryptKey="+encodeURIComponent(tools.getUrlParam("encryptKey"));
                        })
                    }
                },
                error: function(xhr, errorType, error){
                    alert(error);
                }
            }) 
        },
        creditForm_validate: function(){
            var validate = $("#creditOptionForm").validate({
                debug: true, //调试模式取消submit的默认提交功能   
                //errorClass: "label.error", //默认为错误的样式类为：error   
                focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
                onkeyup: false,
                onblur: true,     
                submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form   
                    $.ajax({ 
                        type: "post",
                        url: "/cycle/credit/setStatus.json",
                        data: $("#creditOptionForm").serialize(),
                        success: function(data, status, xhr){
                            if(data.code == -1){ 
                                alert(data.error);
                            }else{ 
                                alert("设置成功");
                                setTimeout(function(){window.location.reload();}, 500);      
                            }
                        },
                        error: function(xhr, errorType, error){
                            alert(error);
                        }
                    })
                }                        
            });
        }
    };
    main.init();
});