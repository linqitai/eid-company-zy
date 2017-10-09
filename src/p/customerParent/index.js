define(function(require, exports, module){
    var $ = require("$"),
        tools = require("../../c/js/tools");
        require('../../c/js/jquery.cookie');
    var main = {
        init: function () {
            //menu切换事件
            $("#memu li a").on("click",function () {
                var url = $(this).data("page");
                var text = $(this).text();
                $("#iframe").attr("src",url);
                $(".breadcrumb .current").html('<span class="c-666">&gt;</span>'+text);
            });
            //设置cookie
            if($.cookie('name')){
                console.log("cookie:"+$.cookie('name'));
            }else{
                $.cookie('name','lqt');
                console.log("cookie:"+$.cookie('name'));
            }
        }
    }
    main.init();
});