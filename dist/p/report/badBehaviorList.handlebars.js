define("xg/eid-company-zy/1.0.4/p/report/badBehaviorList.handlebars",["alinw/handlebars/1.3.0/runtime"],function(require,exports,module){var Handlebars=require("alinw/handlebars/1.3.0/runtime"),template=Handlebars.template;module.exports=template(function(Handlebars,depth0,helpers,partials,data){function program1(depth0,data){var stack1,buffer="";return buffer+="\r\n    ",stack1=helpers.each.call(depth0,depth0,{hash:{},inverse:self.noop,fn:self.program(2,program2,data),data:data}),(stack1||0===stack1)&&(buffer+=stack1),buffer+="\r\n"}function program2(depth0,data){var stack1,helper,buffer="";return buffer+='\r\n        <tr>\r\n            <td><span class="ellipsis w500">',(helper=helpers.message)?stack1=helper.call(depth0,{hash:{},data:data}):(helper=depth0&&depth0.message,stack1=typeof helper===functionType?helper.call(depth0,{hash:{},data:data}):helper),buffer+=escapeExpression(stack1)+'</span></td>\r\n            <td><span class="ellipsis w500">',(helper=helpers.caseTime)?stack1=helper.call(depth0,{hash:{},data:data}):(helper=depth0&&depth0.caseTime,stack1=typeof helper===functionType?helper.call(depth0,{hash:{},data:data}):helper),buffer+=escapeExpression(stack1)+"</span></td>\r\n        </tr>\r\n    "}function program4(depth0,data){return'\r\n    <tr>\r\n        <td class="text-c" colspan="2">--</td>\r\n    </tr>\r\n'}this.compilerInfo=[4,">= 1.0.0"],helpers=this.merge(helpers,Handlebars.helpers),data=data||{};var stack1,buffer="",functionType="function",escapeExpression=this.escapeExpression,self=this;return stack1=helpers["if"].call(depth0,depth0,{hash:{},inverse:self.program(4,program4,data),fn:self.program(1,program1,data),data:data}),(stack1||0===stack1)&&(buffer+=stack1),buffer+="\r\n"})});