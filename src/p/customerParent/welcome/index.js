define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../../c/js/tools");
    require("../../../c/lib/layer/2.4/layer.src");
    require("../../../c/static/h-ui/js/H-ui");
    require("../../../c/static/h-ui.admin/js/H-ui.admin");

    var main = {
        init:function(){
            tools.displaynavbar();
            var currentTimeStr = timeStamp2String(new Date().getTime(),true);
            $("#sp_time").html(currentTimeStr);
            setInterval(function () {
                var currentTimeStr = timeStamp2String(new Date().getTime(),true);
                $("#sp_time").html(currentTimeStr);
            },1000);//设置定时器每隔1秒计算一下当前时间

            //时间格式转换成 yyyy-MM-dd
            function timeStamp2String(time,show){
                var result = "";
                var datetime = new Date();
                datetime.setTime(time);
                var year = datetime.getFullYear();
                var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
                var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
                var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
                var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
                if(show) {
                    result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
                }
                else {
                    result = year + "-" + month + "-" + date;
                }
                return result;
            }
        }   
    };
    main.init();
});