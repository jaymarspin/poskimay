(self.webpackChunkpos3=self.webpackChunkpos3||[]).push([[181],{181:(n,e,t)=>{"use strict";t.r(e),t.d(e,{HomePageModule:()=>M});var o=t(8583),i=t(2859),l=t(3679),c=t(9895),a=t(7716),r=t(6858),g=t(7465);function s(n,e){1&n&&a["\u0275\u0275element"](0,"ion-progress-bar",8)}let p=(()=>{class n{constructor(n,e){this.router=n,this.global=e}ngOnInit(){this.global.loading=!1,Date.now(),setInterval(()=>{this.getNow=(new Date).toLocaleString().replace(",","")})}signout(){localStorage.clear(),this.router.navigate(["splash"],{replaceUrl:!0})}}return n.\u0275fac=function(e){return new(e||n)(a["\u0275\u0275directiveInject"](c.F0),a["\u0275\u0275directiveInject"](g.U))},n.\u0275cmp=a["\u0275\u0275defineComponent"]({type:n,selectors:[["app-header"]],decls:14,vars:2,consts:[["style","position: fixed;","type","indeterminate","color","warning",4,"ngIf"],[1,"head"],["size","4"],["lines","none"],["color","medium"],["size","8"],["color","light"],["color","light","name","log-out-outline",2,"cursor","pointer",3,"click"],["type","indeterminate","color","warning",2,"position","fixed"]],template:function(n,e){1&n&&(a["\u0275\u0275template"](0,s,1,0,"ion-progress-bar",0),a["\u0275\u0275elementStart"](1,"div",1),a["\u0275\u0275elementStart"](2,"ion-row"),a["\u0275\u0275elementStart"](3,"ion-col",2),a["\u0275\u0275elementStart"](4,"ion-item",3),a["\u0275\u0275elementStart"](5,"ion-label",4),a["\u0275\u0275text"](6,"Kimay adafa "),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](7,"ion-col",5),a["\u0275\u0275elementStart"](8,"ul"),a["\u0275\u0275elementStart"](9,"li"),a["\u0275\u0275elementStart"](10,"ion-label",6),a["\u0275\u0275text"](11),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](12,"li"),a["\u0275\u0275elementStart"](13,"ion-icon",7),a["\u0275\u0275listener"]("click",function(){return e.signout()}),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&n&&(a["\u0275\u0275property"]("ngIf",!0===e.global.loading),a["\u0275\u0275advance"](11),a["\u0275\u0275textInterpolate"](e.getNow))},directives:[o.NgIf,i.Nd,i.wI,i.Ie,i.Q$,i.gu,i.X7],styles:["@media (min-width: 1025px){.head[_ngcontent-%COMP%]{height:8vh;width:100%;position:relative;display:block;clear:both;background-color:#42413f}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]{line-height:50px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--background:none}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%]{position:relative}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:18px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{float:right;position:relative;clear:both;list-style-type:none;display:block;margin-right:20px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline-block;margin-right:5px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{position:relative;top:-10px;font-size:25px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:35px}}@media (min-width: 768px) and (max-width: 1204px){.head[_ngcontent-%COMP%]{height:5vh;width:100%;position:relative;display:block;clear:both;background-color:#42413f}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--background:none}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%]{height:100%;position:relative;top:-7px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:16px;position:relative;top:-8px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{float:right;position:relative;clear:both;list-style-type:none;display:block;margin-right:20px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline-block;margin-right:5px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{position:relative;top:-17px;font-size:16px}.head[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{position:relative;top:-8px;font-size:28px}}"]}),n})();const d=[{path:"",component:(()=>{class n{constructor(n){this.service=n}}return n.\u0275fac=function(e){return new(e||n)(a["\u0275\u0275directiveInject"](r.O))},n.\u0275cmp=a["\u0275\u0275defineComponent"]({type:n,selectors:[["app-home"]],decls:4,vars:1,consts:[[3,"translucent"]],template:function(n,e){1&n&&(a["\u0275\u0275elementStart"](0,"ion-header",0),a["\u0275\u0275element"](1,"app-header"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](2,"ion-content"),a["\u0275\u0275element"](3,"ion-router-outlet"),a["\u0275\u0275elementEnd"]()),2&n&&a["\u0275\u0275property"]("translucent",!0)},directives:[i.Gu,p,i.W2,i.jP],styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}"]}),n})(),children:[{path:"sale",loadChildren:()=>Promise.all([t.e(8259),t.e(2256),t.e(8791)]).then(t.bind(t,8791)).then(n=>n.SaleInputPageModule)},{path:"",redirectTo:"sale",pathMatch:"full"}]}];let h=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=a["\u0275\u0275defineNgModule"]({type:n}),n.\u0275inj=a["\u0275\u0275defineInjector"]({imports:[[c.Bz.forChild(d)],c.Bz]}),n})();var C=t(5493);let M=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=a["\u0275\u0275defineNgModule"]({type:n}),n.\u0275inj=a["\u0275\u0275defineInjector"]({imports:[[o.CommonModule,l.u5,i.Pc,h,C.K]]}),n})()}}]);