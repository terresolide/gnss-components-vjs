(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{236:function(t,i,e){"use strict";var n;function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,i,e){return(i=function(t){var i=function(t,i){if("object"!==o(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,i);if("object"!==o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t,"string");return"symbol"===o(i)?i:String(i)}(i))in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}e.r(i);var s={name:"Solution",components:{GnssMenu:e(10).a},created:function(){this.name=this.$route.params.name,this.get(),window.scrollTo(0,0)},computed:{api:function(){return this.$store.getters.api}},data:function(){return{name:null,metadata:null,solution:null}},methods:(n={close:function(t){this.$router.go(-1)},isLocalFile:function(){return this.$store.state.api,this.metadata.indexOf()},get:function(){var t=this;this.$http.get(this.api+"solutions/"+this.name).then((function(i){i.body.name&&(t.solution=i.body,t.solution.metadata&&t.getMetadata())}))}},a(n,"isLocalFile",(function(t){var i=new URL(this.$store.state.api);return t.indexOf(i.origin>=0)})),a(n,"getMetadata",(function(){var t=this;(this.isLocalFile(this.solution.metadata)||"text/plain"!==this.solution.encodingType)&&"text/plain"===this.solution.encodingType&&this.$http.get(this.solution.metadata).then((function(i){t.metadata=i.body}))})),n)},r=e(1),l=Object(r.a)(s,(function(){var t=this,i=t._self._c;return i("div",{staticClass:"page-station",staticStyle:{width:"100%",position:"relative",overflow:"hidden"}},[i("gnss-menu",{attrs:{top:55}}),t._v(" "),i("div",{staticClass:"station-content"},[i("div",{staticClass:"station-header"},[t.$route.query.newTab?t._e():i("span",{staticClass:"close button",staticStyle:{"margin-right":"20px"},on:{click:function(i){return t.close(i)}}},[i("font-awesome-icon",{attrs:{icon:"fa-solid fa-close"}})],1),t._v(" "),i("h2",[t._v("Solution "+t._s(t.name))])]),t._v(" "),i("div",{staticClass:"station-body",staticStyle:{"min-height":"calc(100vh - 70px)"}},[t.solution&&!t.metadata?i("span",[i("div",[i("label",[t._v("Description")]),t._v(" "),i("div",{staticStyle:{display:"inline-block",width:"calc(100% - 200px)"}},[t._v(t._s(t.solution.description))])]),t._v(" "),i("div",[i("a",{attrs:{href:t.solution.metadata}},[i("font-awesome-icon",{attrs:{icon:"fa-solid fa-file"}}),t._v(" "+t._s(t.solution.metadata))],1)])]):t._e(),t._v(" "),t.metadata?i("span",[t.metadata?i("pre",{staticStyle:{width:"auto","white-space":"pre-wrap"}},[t._v(t._s(t.metadata))]):t._e()]):t._e()])])],1)}),[],!1,null,null,null);i.default=l.exports}}]);
//# sourceMappingURL=3.gnss-components-vjs.js.map