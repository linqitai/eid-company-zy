define("xg/eid-company-zy/1.0.4/p/reports/bottomBtn.handlebars",["alinw/handlebars/1.3.0/runtime"],function(require,exports,module){var Handlebars=require("alinw/handlebars/1.3.0/runtime"),template=Handlebars.template;module.exports=template(function(Handlebars,depth0,helpers,partials,data){function program1(depth0,data){return"disabled"}this.compilerInfo=[4,">= 1.0.0"],helpers=this.merge(helpers,Handlebars.helpers),data=data||{};var stack1,helper,options,buffer="",self=this,helperMissing=helpers.helperMissing;return buffer+='\r\n<div id="backs">\r\n<a class="btn btn-primary h42 pull-left" id="back" >返回首页</a>\r\n</div>\r\n\r\n<!--<button class="btn btn-primary h42 radius blacklist pull-right ml40 ',helper=helpers.ifCond||depth0&&depth0.ifCond,options={hash:{},inverse:self.noop,fn:self.program(1,program1,data),data:data},stack1=helper?helper.call(depth0,depth0&&depth0.status,"!=",0,options):helperMissing.call(depth0,"ifCond",depth0&&depth0.status,"!=",0,options),(stack1||0===stack1)&&(buffer+=stack1),buffer+='" style="display: inline-block;" ',helper=helpers.ifCond||depth0&&depth0.ifCond,options={hash:{},inverse:self.noop,fn:self.program(1,program1,data),data:data},stack1=helper?helper.call(depth0,depth0&&depth0.status,"!=",0,options):helperMissing.call(depth0,"ifCond",depth0&&depth0.status,"!=",0,options),(stack1||0===stack1)&&(buffer+=stack1),buffer+=">加入黑名单</button>-->\r\n"})});