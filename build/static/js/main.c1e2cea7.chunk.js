(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(14),o=t.n(r),c=t(3),u=t(2),a=t(4),i=t.n(a),s="/api/persons",l=function(){return i.a.get(s).then((function(e){return e.data}))},m=function(e){return i.a.post(s,e).then((function(e){return e.data}))},j=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},d=function(e,n){return i.a.delete("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},b=t(0),f=function(e){var n=e.message,t=e.error;return null===n?null:t?Object(b.jsx)("div",{className:"error",children:n}):Object(b.jsx)("div",{className:"msg",children:n})},h=function(e){var n=e.text;return Object(b.jsx)("h2",{children:n})},O=function(e){var n=e.value,t=e.onChange;return Object(b.jsxs)("form",{children:["Filter shows with",Object(b.jsx)("input",{value:n,onChange:t})]})},v=function(e){var n=e.valueName,t=e.handleName,r=e.valueNumber,o=e.handleNumber,c=e.onClick;return Object(b.jsxs)("form",{children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:n,onChange:t})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:r,onChange:o})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",onClick:c,children:"add"})})]})},g=function(e){var n=e.persons,t=e.filter,r=e.onRemove,o=n.filter((function(e){return e.name.toLowerCase().includes(t)}));return Object(b.jsx)("ul",{children:o.map((function(e){return Object(b.jsxs)("li",{children:[e.name," ",e.number,Object(b.jsx)("button",{value:e.id,onClick:function(){return r(e)},children:"delete"})]},e.name)}))})},p=function(){var e=Object(u.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],o=Object(u.useState)(""),a=Object(c.a)(o,2),i=a[0],s=a[1],p=Object(u.useState)(""),x=Object(c.a)(p,2),w=x[0],k=x[1],N=Object(u.useState)(""),C=Object(c.a)(N,2),y=C[0],T=C[1],S=Object(u.useState)({msg:null,error:!1}),F=Object(c.a)(S,2),D=F[0],E=F[1];Object(u.useEffect)((function(){l().then((function(e){r(e)}))}),[]);return Object(b.jsxs)("div",{children:[Object(b.jsx)(h,{text:"Phonebook"}),Object(b.jsx)(f,{message:D.msg,error:D.error}),Object(b.jsx)(O,{value:y,onChange:function(e){T(e.target.value)}}),Object(b.jsx)(h,{text:"Add a new"}),Object(b.jsx)(v,{valueName:i,handleName:function(e){s(e.target.value)},valueNumber:w,handleNumber:function(e){k(e.target.value)},onClick:function(e){e.preventDefault();var n={name:i,number:w};t.some((function(e){return e.name===i}))?t.map((function(e){e.name===i&&window.confirm("".concat(e.name," is allready in phonebook, do you want to replace the number?"))&&j(e.id,n).then((function(e){r(t.map((function(n){return n.name!==i?n:e}))),E({msg:"".concat(e.name," updated"),error:!1}),setTimeout((function(){E({msg:null,error:!1})}),4e3)})).catch((function(e){E({msg:"Failed to update ".concat(i),error:!0}),setTimeout(E({msg:null,error:!1}),4e3)}))})):m(n).then((function(e){r(t.concat(e)),s(""),k(""),E({msg:"".concat(e.name," added to phonebook"),error:!1}),setTimeout((function(){E({msg:null,error:!1})}),4e3)})).catch((function(e){E({msg:"".concat(e.response.data),error:!0}),setTimeout(E({msg:null,error:!1}),4e3)}))}}),Object(b.jsx)(h,{text:"Numbers:"}),Object(b.jsx)(g,{persons:t,filter:y,onRemove:function(e){window.confirm("Do you want to delete ".concat(e.name," ?"))&&d(e.id).then((function(){r(t.filter((function(n){return n.id!==e.id}))),E({msg:"".concat(e.name," removed from phonebook"),error:!1}),setTimeout((function(){E({msg:null,error:!1})}),4e3)})).catch((function(e){console.log("error"),E({msg:"Failed to remove ".concat(i,". Likely removed before"),error:!0}),setTimeout((function(){E({msg:null,error:!1})}),4e3)}))}})]})};t(38);o.a.render(Object(b.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.c1e2cea7.chunk.js.map