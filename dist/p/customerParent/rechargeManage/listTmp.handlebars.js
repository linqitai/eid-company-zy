define("xg/eid-company-zy/1.0.4/p/customerParent/rechargeManage/listTmp.handlebars",["alinw/handlebars/1.3.0/runtime"],function(require,exports,module){var Handlebars=require("alinw/handlebars/1.3.0/runtime"),template=Handlebars.template;module.exports=template(function(Handlebars,depth0,helpers,partials,data){function program1(depth0,data){var stack1,buffer="";return buffer+="\r\n        ",stack1=helpers.each.call(depth0,depth0,{hash:{},inverse:self.noop,fn:self.program(2,program2,data),data:data}),(stack1||0===stack1)&&(buffer+=stack1),buffer+="\r\n    "}function program2(depth0,data){var helper,options,buffer="";return buffer+='\r\n            <tr class="text-c">\r\n                <td>'+escapeExpression((helper=helpers.formatMoney||depth0&&depth0.formatMoney,options={hash:{},data:data},helper?helper.call(depth0,depth0&&depth0.rechargeAmount,options):helperMissing.call(depth0,"formatMoney",depth0&&depth0.rechargeAmount,options)))+"</td>\r\n                <td>"+escapeExpression((helper=helpers.formatMoney||depth0&&depth0.formatMoney,options={hash:{},data:data},helper?helper.call(depth0,depth0&&depth0.giftAmount,options):helperMissing.call(depth0,"formatMoney",depth0&&depth0.giftAmount,options)))+"</td>\r\n                <td>"+escapeExpression((helper=helpers.formatDateFull||depth0&&depth0.formatDateFull,options={hash:{},data:data},helper?helper.call(depth0,depth0&&depth0.created,options):helperMissing.call(depth0,"formatDateFull",depth0&&depth0.created,options)))+"</td>\r\n            </tr>\r\n        "}function program4(depth0,data){return'\r\n        <tr>\r\n            <td class="text-c" colspan="3">查无数据</td>\r\n        </tr>\r\n    '}this.compilerInfo=[4,">= 1.0.0"],helpers=this.merge(helpers,Handlebars.helpers),data=data||{};var stack1,buffer="",helperMissing=helpers.helperMissing,escapeExpression=this.escapeExpression,self=this;return buffer+='<table class="table table-border table-bordered table-hover">\r\n    \r\n    <thead class="text-c">\r\n        <tr>\r\n            <th>充值金额</th>\r\n            <th>赠送金额</th>\r\n            <th>充值时间</th>\r\n        </tr>\r\n    </thead>\r\n    <tbody class="text-c">\r\n    ',stack1=helpers["if"].call(depth0,depth0,{hash:{},inverse:self.program(4,program4,data),fn:self.program(1,program1,data),data:data}),(stack1||0===stack1)&&(buffer+=stack1),buffer+="\r\n    </tbody>\r\n</table>"})});