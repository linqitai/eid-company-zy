define("xg/eid-company-zy/1.0.4/p/reports/courtList.handlebars",["alinw/handlebars/1.3.0/runtime"],function(require,exports,module){var Handlebars=require("alinw/handlebars/1.3.0/runtime"),template=Handlebars.template;module.exports=template(function(Handlebars,depth0,helpers,partials,data){function program1(depth0,data){var stack1,buffer="";return buffer+="\r\n    ",stack1=helpers.each.call(depth0,depth0,{hash:{},inverse:self.noop,fn:self.program(2,program2,data),data:data}),(stack1||0===stack1)&&(buffer+=stack1),buffer+="\r\n"}function program2(depth0,data){var stack1,helper,options,buffer="";return buffer+="\r\n        <tr>\r\n            <td>",(helper=helpers.caseCode)?stack1=helper.call(depth0,{hash:{},data:data}):(helper=depth0&&depth0.caseCode,stack1=typeof helper===functionType?helper.call(depth0,{hash:{},data:data}):helper),buffer+=escapeExpression(stack1)+"</td>\r\n            <td>",(helper=helpers.courtName)?stack1=helper.call(depth0,{hash:{},data:data}):(helper=depth0&&depth0.courtName,stack1=typeof helper===functionType?helper.call(depth0,{hash:{},data:data}):helper),buffer+=escapeExpression(stack1)+"</td>\r\n            <td>"+escapeExpression((helper=helpers.getLocalTime1||depth0&&depth0.getLocalTime1,options={hash:{},data:data},helper?helper.call(depth0,depth0&&depth0.regDate,options):helperMissing.call(depth0,"getLocalTime1",depth0&&depth0.regDate,options)))+'</td>\r\n            <td><span class="ellipsis">'+escapeExpression((helper=helpers.setNull||depth0&&depth0.setNull,options={hash:{},data:data},helper?helper.call(depth0,depth0&&depth0.caseState,options):helperMissing.call(depth0,"setNull",depth0&&depth0.caseState,options)))+"</span></td>\r\n        </tr>\r\n    "}function program4(depth0,data){return'\r\n    <tr>\r\n        <td class="text-c" colspan="4">--</td>\r\n    </tr>\r\n'}this.compilerInfo=[4,">= 1.0.0"],helpers=this.merge(helpers,Handlebars.helpers),data=data||{};var stack1,buffer="",functionType="function",escapeExpression=this.escapeExpression,helperMissing=helpers.helperMissing,self=this;return stack1=helpers["if"].call(depth0,depth0,{hash:{},inverse:self.program(4,program4,data),fn:self.program(1,program1,data),data:data}),(stack1||0===stack1)&&(buffer+=stack1),buffer+="\r\n"})});