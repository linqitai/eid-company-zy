define(function(require, exports, module){
    require("../../../c/js/jquery");
    var Tools = require("../../../c/js/toolsWX");
    //require("../../c/js/bootstrap");
    /*require("../../c/js/base/sm");
    require("../../c/js/base/sm-extend");*/

    //var confirmTmp = require('../../c/handlebars/confirm.handlebars');
    //var confirmTmp = require('./sureInfo.handlebars');

    module.exports = {
        init: function() {
            var self = this;
            $("#addInput").hide();
            // $.showIndicator();
            //self.swiperEvt();
            self.initEvents();
        },
        initEvents:function () {
            var self = this;
            //单选的切换
            $(".list .item .wp100").on("click", function () {
                $(this).find(".myRadio20").addClass("active");
                $(this).parent().siblings().find(".myRadio20").removeClass("active");
                self.val = $(this).find(".val").html();
                $("#val").html(self.val);
                if(self.val=="其他"){
                    $("#addInput").show();
                }else{
                    $("#addInput").hide();
                }
            });
            $("#sureBtn").on("click", function () {
                var val="";
                if(self.val=="其他"){
                    var jobName = $("#jobName").val().trim();
                    if(jobName==null||jobName==""){
                        Tools.tusi("请输入行业类型~");
                        return false;
                    }
                    val = $("#val").text()+"-"+$("#jobName").val().trim();
                }else{
                    val = $("#val").text();
                }
                console.log(val);
                var confirmTmp = require('../../../c/handlebarsWX/confirm.handlebars');
                var data = {
                    msg:"确定选择之后将不能修改，确认继续？"
                }
                Tools.showTmp(confirmTmp,data);
            });
        }
    };
    module.exports.init();
});