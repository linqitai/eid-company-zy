define(function(require, exports, module){
    require("../../../c/js/base/zepto.js");
    var Tools = require("../../../c/js/toolsWX");

    var itemTmp = require('./item.handlebars');
    var noDataTmp = require('../../../c/handlebarsWX/noData.handlebars');

    var contentStr = ["法院数据","信贷行业","三方支付","典当行","负面信息"]
    var title = Tools.GetQueryString("title");

    module.exports = {
        init: function() {
            var self = this;
            self.pageSize = 10;
            // $.showIndicator();
            //self.swiperEvt();
            self.loadAll = false;
            self.data = {};
            self.data.pageIndex = 1;
            self.data.pageSize = self.pageSize;
            self.getList(self.data);
            self.initEvents();
        },
        getList:function (params) {
            var self = this;
            var defer = $.Deferred();
            self.looping = true;
            var cb = $(".content-block");

            $.post("/eid-company/src/p/weixin/searchRecord/data.json", params, function(data){
                console.log("data:");
                console.log(data);
                if(data.result=="ok"){
                    var list = data.list;
                    if(list.length>0){
                        cb.append(itemTmp(list));
                        self.looping = false;
                    }else{
                        console.log("self.data.pageIndex:"+self.data.pageIndex);
                        if(self.data.pageIndex==1){
                            cb.append(noDataTmp(null));
                            var contentHeight = $(".content").innerHeight();
                            var errorDivHeight = $(".errorDiv").innerHeight();
                            var marginTop = (contentHeight-errorDivHeight)/2-20;
                            document.getElementById("errorDiv").style.marginTop = marginTop+"px";
                        }else if(self.data.pageIndex>1){
                            if(self.loadAll==false){
                                $(".content").append("<div class=''>已经加载全部</div>");
                                self.loadAll=true;
                            }
                        }
                        self.looping = true;
                    }
                    // $.hideIndicator();
                }else{
                    $.toast(data.msg)
                }
            });
            return defer.promise();
        },
        initEvents:function () {
            var self = this;
            console.log(contentStr[title]);
            $("#contentTitle").html(contentStr[title]);
            //无限滚动
            $(".content").on("scroll",function() {
                console.log(($(window).height()+$('.content').scrollTop())+":"+($(".content-block").height()-100));
                if(($(window).height()+$('.content').scrollTop()) >= $(".content-block").height()-100){
                    if (self.looping == false) {
                        self.pageIndex += 1;
                        self.data.pageIndex = self.pageIndex;
                        self.getList(self.data);
                    }
                }
            });
        }
    };
    module.exports.init();
});