define(function(require, exports, module){
     var $ = require("$");
    var status = function(){

    };
    status.prototype = {
        addAjax : function(options){
            $.ajax({
                type: options.type || 'post',
                cache : options.cache || true,
                dataType:'json',
                url:options.url,
                data:options.text,
                success:options.success,
                error:options.error
            })
        },
        on :function(){
            return $.fn.on.apply($(this),arguments);
        },

        trigger : function(){
            return $.fn.trigger.apply($(this),arguments);
        },
        off : function(){
            return $.fn.off.apply($(this),arguments);
        }
    }



     var newStatus = function(options){
        var This  = this;
        this.status = new status();
        if(options.element){
            options.element.on('click',This.addStatus(options)); 
        }else{
            this.addStatus(options)
        }
        
        //发送成功 返回成功 函数处理
        
        this.status.on('sendSuccess',function(event,data){
            options.event.sendSuccess && options.event.sendSuccess(data);
        })
        //发送成功 返回错误 函数处理
        this.status.on('sendError',function(event,element){
            options.event.sendError && options.event.sendError(element);
        })
        //发送失败 函数处理
        this.status.on('error',function(event,element){
            options.event.error && options.event.error();
        })
        //没有data返回
        this.status.on('noerror',function(event,element){
            options.event.noerror && options.event.noerror(element);
        })
    }
    newStatus.prototype = {
        addStatus:function(element){
            var This =  this;
            var me = element;
            This.status.addAjax({
                "url":element.url,
                'text':element.text ? element.text : '',
                'type': element.type, 
                'cache' : element.cache,
                "success":function(result){
                    if(result.code < 0){
                        This.status.trigger('sendError',result)
                    }else if(result.url){
                        This.status.trigger('noerror',result)  
                    }else {
                        This.status.trigger('sendSuccess',result)
                    }
                },
                "error":function(){
                    This.status.trigger('error',element);
                }
            })

        
        }
    }

    exports.newStatus = newStatus;
    // exports.newStatus = newStatus;
})
