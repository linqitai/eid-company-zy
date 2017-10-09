define("xg/eid-company-zy/1.0.4/c/js/ajaxModule-debug", ["jquery/jquery/1.10.1/jquery-debug"], function(require, exports, module) {
    var $ = require("jquery/jquery/1.10.1/jquery-debug");
    var status = function() {};
    status.prototype = {
        addAjax: function(options) {
            $.ajax({
                type: options.type || "post",
                cache: options.cache || true,
                dataType: "json",
                url: options.url,
                data: options.text,
                success: options.success,
                error: options.error
            })
        },
        on: function() {
            return $.fn.on.apply($(this), arguments)
        },
        trigger: function() {
            return $.fn.trigger.apply($(this), arguments)
        },
        off: function() {
            return $.fn.off.apply($(this), arguments)
        }
    };
    var newStatus = function(options) {
        var This = this;
        this.status = new status;
        if (options.element) {
            options.element.on("click", This.addStatus(options))
        } else {
            this.addStatus(options)
        }
        this.status.on("sendSuccess", function(event, data) {
            options.event.sendSuccess && options.event.sendSuccess(data)
        });
        this.status.on("sendError", function(event, element) {
            options.event.sendError && options.event.sendError(element)
        });
        this.status.on("error", function(event, element) {
            options.event.error && options.event.error()
        });
        this.status.on("noerror", function(event, element) {
            options.event.noerror && options.event.noerror(element)
        })
    };
    newStatus.prototype = {
        addStatus: function(element) {
            var This = this;
            var me = element;
            This.status.addAjax({
                url: element.url,
                text: element.text ? element.text : "",
                type: element.type,
                cache: element.cache,
                success: function(result) {
                    if (result.code < 0) {
                        This.status.trigger("sendError", result)
                    } else if (result.url) {
                        This.status.trigger("noerror", result)
                    } else {
                        This.status.trigger("sendSuccess", result)
                    }
                },
                error: function() {
                    This.status.trigger("error", element)
                }
            })
        }
    };
    exports.newStatus = newStatus
});