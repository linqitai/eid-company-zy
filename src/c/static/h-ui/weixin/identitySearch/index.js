define(function(require, exports, module){
    require("../../../c/js/jquery");
    var Tools = require("../../../c/js/toolsWX");
    //require("../../c/js/bootstrap");
    /*require("../../c/js/base/sm");
    require("../../c/js/base/sm-extend");*/

    //var confirmTmp = require('../../c/handlebars/confirm.handlebars');

    module.exports = {
        init: function() {
            var self = this;
            // $.showIndicator();
            //self.swiperEvt();
            self.initEvents();
        },
        swiperEvt: function() {
            var self = this;
            var swiper = new Swiper('#J_banner', {
                autoplay: 2500,
                pagination: '.swiper-pagination',
                paginationClickable: true,             
                spaceBetween: 0,
                centeredSlides: true,
                slidesPerView: 1,
                loop: true,
                autoplayDisableOnInteraction: false
            });
        },
        getInfo:function () {
            var self = this;
            self.customerId = Tools.GetQueryString("customerId");
            var data = {
                customerId:self.customerId
            }
            $.ajax({
                data:data,
                cache: false,
                type: "post",
                url: '/m/customer/errorInfo.json',
                success: function(data){
                    if(data.code==0){

                    }else{
                        $.alert(data.msg);
                    }
                    
                }
            });
        },
        initEvents:function () {
            var self = this;
            var nameInput = $("#name");
            var identityNumberInput = $("#identityNumber");
            var checkIcon = $(".checkBox .checkIcon");
            var checkBox = $(".checkBox"),
                checkIcon = $(".checkIcon"),
                openButton = $("#paySearchBtn");
            checkBox.on("click", function(){
                if(checkIcon.hasClass("active")){
                    checkIcon.removeClass("active");
                }else{
                    checkIcon.addClass("active");
                }
            });
            openButton.on("click",function () {
                console.log("you click me");
                var name = $("#name").val();
                var identityNumber = $("#identityNumber").val();
                console.log("name:"+name+",identityNumber:"+identityNumber);
                if(!Tools.isLengthInterval(name,2,25)||!Tools.isChineseChar(name)){
                    Tools.tusi("请输入正确的姓名~");
                    nameInput.focus();
                    return false;
                }
                if(!Tools.isIdentityCard(identityNumber)){
                    Tools.tusi("请输入正确的身份证号码~");
                    identityNumberInput.focus();
                    return false;
                }
                if(!checkIcon.hasClass("active")){
                    Tools.tusi("请查阅并勾选免责条款");
                    return false;
                }
                var data = {
                    name:name,
                    identityNumber:identityNumber
                }
                var sureInfoTmp = require('./sureInfo.handlebars');
                Tools.showTmp(sureInfoTmp,data);
            });
        }
    };
    module.exports.init();
});