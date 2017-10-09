define(function(require, exports, module){
    require("jquery");
    var Tools = require("../../../c/js/toolsWX");

    module.exports = {
        init: function() {
            var self = this;
            $.post("/wx/createBaseGuideLink", function(result){
                console.log(result.obj);
                window.location.href = result.obj;
            });
            /*$.post("/createBaseGuideLink", function(result){
                window.location.href = result.obj;
            });*/
            //window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx77c6968b0dfe3a6b&redirect_uri=https%3A%2F%2F116.62.7.15%2Fwx%2FreceiveWXNotify&response_type=code&scope=snsapi_base&state=eid#wechat_redirect"

            /*$.ajax({
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
            });*/
        }
    };
    module.exports.init();
});