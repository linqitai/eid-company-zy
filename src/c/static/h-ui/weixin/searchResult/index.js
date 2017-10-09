define(function(require, exports, module){
    require("../../../c/js/base/zepto.js");
    var Tools = require("../../../c/js/toolsWX");

    module.exports = {
        init: function() {
            var self = this;

            self.initEvents();
        },
        initEvents:function () {
            var self = this;
            $(".item").on("click", function () {
                var title = $(this).data("title");
                window.location.href = "/eid-company/pages/identity/resultDetail.html?title="+title;
            });
        }
    };
    module.exports.init();
});