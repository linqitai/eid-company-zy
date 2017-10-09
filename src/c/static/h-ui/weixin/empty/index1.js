define(function(require, exports, module){
    require("jquery");
    var Tools = require("../../../c/js/toolsWX");

    module.exports = {
        init: function() {
            var hasAccess = $("#hasAccess").val();
            if (hasAccess == 1) {
                window.location.href = "/wx/identitySearch";
            } else {
                $.post("/wx/createAuthorityGuideLink", function(result){
                    window.location.href = result.obj;
                });
            }
        }
    };
    module.exports.init();
});