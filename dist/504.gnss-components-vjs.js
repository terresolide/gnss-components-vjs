(self.webpackChunkgnss_components_vjs=self.webpackChunkgnss_components_vjs||[]).push([[504],{9746:(t,n,e)=>{(n=e(3645)(!1)).push([t.id,"\nbutton[disabled] {\n  pointer-events: none;\n}\ndiv.box-station {\n  display: inline-block;\noverflow: hidden;\npadding: 5px 20px 20px 20px;\nmargin:20px;\n border: 1px solid grey;\n border-radius: 10px;\n-webkit-box-shadow: 0 0 3px rgba(0,0,0,.5);\nbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\ndiv.box-station h3 {\n  margin-top: 10px;\n}\ndiv.box-station a.station-link {\n  margin: 5px;\n  line-height: 1.1;\n  text-decoration: none;\n  color: #000;\n  cursor:pointer;\n}\n\n",""]),t.exports=n},3462:(t,n,e)=>{(n=e(3645)(!1)).push([t.id,"\ndiv.page-list div.form[data-v-60f54598] {\n   top: 105px;\n}\ndiv.gnss-file[data-v-60f54598]:nth-child(2n) {\n  background: #eee;\n}\n/** div.station-content {\n   background:white;\n   margin:auto;\n   max-width:1400px;\n   padding-bottom:20px;\n   box-shadow: 0 0 3px rgba(0,0,0,.5);\n }\n\n div.station-header {\n   position:relative;\n   background: lightgrey;\n   margin: 0;\n   padding: 3px 5px;\n }\n  div.station-body {\n   padding: 3px 10px;\n }\n div.station-header h2 {\n   padding:0;\n   margin:5px;\n }**/\ndiv.array-list[data-v-60f54598] {\n   border:1px solid grey;\n}\nspan.station-link[data-v-60f54598] {\n   color: #b8412c;\n   padding: 2px 3px;\n   cursor: pointer;\n   line-height:1.5rem;\n   border:1px dotted white;\n}\nspan.station-link[data-v-60f54598]:hover {\n   border-color: grey;\n}\nspan.button.close[data-v-60f54598] {\n   position: absolute;\n   right: 15px;\n   top:5px;\n   opacity:1;\n   border: 1px dotted transparent;\n}\nspan.button.close[data-v-60f54598]:hover {\n   border-color:grey;\n}\nspan.gnss-sort[data-v-60f54598]{\n   padding: 0 3px;\n   cursor: pointer;\n   border: 1px dotted transparent;\n}\nspan.gnss-sort.unactive[data-v-60f54598] {\n   color: #555555;\n}\nspan.gnss-sort[data-v-60f54598]:hover {\n   border-color: black;\n}\n",""]),t.exports=n},5855:(t,n,e)=>{(n=e(3645)(!1)).push([t.id,"\n.gnss-file a {\n  line-height: 1;\n  text-decoration: none;\n  color: #b8412c;\n  cursor:pointer;\n}\n.gnss-file a.station-link:hover {\n   text-decoration: none;\n    color:#7b080e;\n}\n.gnss-file {\n  display: grid;\n  grid-template-columns: 10px minmax(120px,1fr) minmax(120px,0.8fr)  minmax(150px,1.2fr) minmax(100px,0.8fr) minmax(50px,0.3fr);\n  grid-gap: 5px;\n  grid-template-rows: 14px 30px; \n  /*grid-auto-rows: minmax(100px, auto);*/\n  font-size:0.8em;\n  \n  border-bottom:1px solid lightgrey;\n}\n.gnss-file.back {\n  display: grid;\n  grid-template-columns: 10px minmax(120px,1fr) minmax(120px,0.8fr)  minmax(150px,1.2fr) minmax(100px,0.8fr) minmax(50px,0.4fr);\n  grid-gap: 5px;\n  grid-template-rows: 14px 30px; \n  /*grid-auto-rows: minmax(100px, auto);*/\n  font-size:0.8em;\n  \n  border-bottom:1px solid lightgrey;\n}\n.header.gnss-file {\n\n  background: #ddd;\n  font-weight:600;\n  color:black;\n  border-bottom:1px solid grey;\n}\n.gnss-file-title{\n  grid-column: 1/5;\n  grid-row: 1;\n  padding-left: 5px;\n  padding-top:5px;\n  font-size: 1em;\n  font-weight:600;\n  color: black;\n}\n.header .gnss-file-title {\n  grid-column: 1/3;\n  grid-row:1;\n}\n.gnss-file-1{\n  grid-column: 1;\n  grid-row: 2;\n}\n.gnss-file-2 {\n  grid-column: 2;\n  grid-row: 2;\n}\n.gnss-file-3-header {\n  grid-column: 3;\n  vertical-align: middle;\n  grid-row: 1/3;\n}\n.gnss-file-3-header > div {\n  line-height: 1.5;\n}\n.gnss-file-4-header {\n  grid-column: 4;\n  vertical-align: middle;\n  grid-row: 1/3;\n}\n.gnss-file-4-header > div {\n  line-height: 1.5;\n}\n.gnss-file-3 {\n  grid-column: 3;\n  grid-row: 2;\n}\n.gnss-file-4 {\n  grid-column: 4;\n  grid-row: 2;\n}\n.gnss-file-4-top {\n  grid-column: 4;\n  grid-row:1;\n}\n.gnss-file-4-bottom {\n  grid-column: 4;\n  grid-row:2;\n}\n.gnss-file-5 {\n  grid-column: 5;\n  grid-row: 2;\n}\n.gnss-file-6-top{\n  grid-column: 6;\n  grid-row: 1/2;\n  padding-top:5px;\n}\n.gnss-file-6{\n  grid-column: 6;\n  grid-row: 2;\n}\n.gnss-file label {\n  font-weight: normal;\n  color: black;\n  line-height:1;\n  min-width:0;\n  margin:0;\n}\n",""]),t.exports=n},3888:(t,n,e)=>{(n=e(3645)(!1)).push([t.id,"\n.gnss-paging > div {\n   width: 68%;\n   height: 33px;\n   text-align: right;\n   display: inline-block;\n   margin-left: 0px;\n}\n.gnss-paging span.mtdt-navigation span{\n  font-size: 1rem;\n  cursor: pointer;\n  margin: 0 1px;\n  padding:5px;\n cursor:pointer;\n border-radius:3px;\n /*background:#8c0209;*/\n background:grey;\n padding:3px 5px;\n color:white;\n  vertical-align:middle;\n  opacity:0.9;\n  line-height:1.2rem;\n}\n.gnss-paging span.mtdt-navigation.disabled span{\n  opacity:0.3;\n  cursor:not-allowed;\n}\n.gnss-paging span.mtdt-navigation:not(.disabled) span:hover{\n  opacity:1;\n}\n \n",""]),t.exports=n},504:(t,n,e)=>{"use strict";e.r(n),e.d(n,{default:()=>f});var s=e(9088),i=e(7036);e(381);const o={name:"FileRow",props:{file:{type:Object,default:null}},computed:{api:function(){return this.$store.getters.api}},methods:{goToStation:function(t){t.preventDefault(),t.stopPropagation();var n=Object.assign({},this.$route.query);this.$store.commit("setQuery",{name:"files",query:n}),delete(n=Object.assign({},this.$route.query)).network,delete n.several,delete n.page,delete n.maxRecords,delete n.orderBy,this.$router.push({name:"station",params:{name:this.file.station,id:this.file.stationId},query:n})},closeMenuContext:function(t){t.stopPropagation(),this.$parent.$parent.removeContextMenu()},menuContext:function(t){t.preventDefault();for(var n=t.target;"svg"===n.tagName||"path"===n.tagName;)n=n.parentNode;var e=n.querySelector(".menu-context");e&&(e.style.top=t.offsetY+"px",e.style.left=t.offsetX+"px"),this.$parent.$parent.removeContextMenu(),n.classList.add("context")},removeFile:function(){var t=this;window.confirm("Voulez-vous réellement supprimer le fichier"+this.file.name)&&this.$http.delete(this.$store.state.back+"/entities/removeFile/"+this.file.id,{credentials:!0}).then((function(n){t.$emit("remove",t.file.id)}),(function(t){console.log("error")}))},toDateStr:function(t){return t.substring(0,10)}}};e(8755);var a=e(1900);const r=(0,a.Z)(o,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"gnss-file",class:{back:t.$store.state.back}},[n("div",{staticClass:"gnss-file-title"},[t._v(t._s(t.file.name))]),t._v(" "),n("div",{staticClass:"gnss-file-1"}),t._v(" "),n("div",{staticClass:"gnss-file-2"},[n("div",[n("label",[t._v("Station")]),t._v(":   \n         "),n("a",{staticClass:"station-link",staticStyle:{position:"relative"},on:{click:function(n){return t.goToStation(n)},contextmenu:function(n){return t.menuContext(n)}}},[t._v(t._s(t.file.station)+"\n             "),n("div",{staticClass:"menu-context",on:{click:function(n){return t.closeMenuContext(n)}}},[n("ul",[n("li",{attrs:{title:"Open in new tab"}},[n("a",{attrs:{href:t.$store.state.location+"station/"+t.file.station+"/"+t.file.stationId+"?newTab=true",target:"_blank"},on:{contextmenu:function(t){return t.target.click()}}},[t._v("Open in new tab")])])])])])]),t._v(" "),t.file.networks?n("div",[n("label",[t._v("Networks")]),t._v(": "+t._s(t.file.networks.join(", ")))]):t._e()]),t._v(" "),n("div",{staticClass:"gnss-file-3"},[n("div",[n("label",[t._v("Solution")]),t._v(": "+t._s(t.file.solution))]),t._v(" "),n("div",[n("label",[t._v("ProductType")]),t._v(": "+t._s(t.file.productType))])]),t._v(" "),n("div",{staticClass:"gnss-file-4"},[n("div",[n("label",[t._v("Temporal")]),t._v(":  "+t._s(t.toDateStr(t.file.tempStart))+" → "+t._s(t.toDateStr(t.file.tempEnd)))]),t._v(" "),n("div",[n("label",[t._v("Years")]),t._v(": "+t._s(Math.round(t.file.years))),n("label",{staticStyle:{"margin-left":"20px"}},[t._v("FillRate")]),t._v(": "+t._s(Math.round(100*t.file.properties.fillRate).toLocaleString())+"%")])]),t._v(" "),n("div",{staticClass:"gnss-file-5"},[n("div",[n("label",[t._v("AnalysisCentre")]),t._v(": "+t._s(t.file.properties.operator||t.file.properties.producer||t.file.properties.analysisCenter||t.file.properties.analysisCentre))]),t._v(" "),t.file.properties.refFrame?n("div",[n("label",[t._v("RefFrame")]),t._v(": "+t._s(t.file.properties.refFrame))]):t._e()]),t._v(" "),t.$store.state.back?n("div",{staticClass:"gnss-file-6-top gnss-admin"},[n("button",{staticClass:"btn-sm",attrs:{type:"button"},on:{click:function(n){return t.removeFile()}}},[t._v("Supprimer")])]):n("div",{staticClass:"gnss-file-6"},[n("div",[t.$store.state.auth&&!t.$store.getters["user/email"]?n("a",{on:{click:function(n){return t.$parent.$parent.preLogin(t.api+"products/"+t.file.name+"/download")}}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-download"}})],1):n("a",{attrs:{href:t.api+"products/"+t.file.name+"/download",download:t.file.name}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-download"}})],1)])])])}),[],!1,null,null,null).exports;const l={name:"GnssPaging",props:{page:{type:Number,default:1},maxRecords:{type:Number,default:25},totalResults:{type:Number,default:0},count:{type:Number,default:0},lang:{type:String,default:"en"},color:{type:String,default:"#808080"}},computed:{to:function(){return this.from+this.count-1},nbPage:function(){var t=parseInt(this.totalResults/this.recordPerPage);return t+=this.totalResults%this.recordPerPage>0?1:0,this.currentPage=parseInt(this.from/this.recordPerPage)+1,t},recordsPerPage:function(){var t={};return this.options.forEach((function(n){t[n]=n+" per page"})),t},defaultRecord:function(){return this.maxRecords}},watch:{page:function(t){this.from=(t-1)*this.maxRecords+1},maxRecords:function(t){this.recordPerPage=this.maxRecords}},created:function(){this.from=(this.page-1)*this.maxRecords+1,this.recordPerPage=this.maxRecords},mounted:function(){},destroyed:function(){},data:function(){return{from:1,currentPage:1,recordPerPage:this.maxRecords,notExactly:"",options:[10,25,50,100]}},methods:{goToFirst:function(){this.currentPage=1,this.emitChange()},goToLast:function(){console.log(this.nbPage),this.currentPage=this.nbPage,this.emitChange()},handleReset:function(t){this.currentPage=1},changePage:function(t){t<0&&1===this.currentPage||t>0&&this.currentPage===this.nbPage&&!this.notExactly||(this.currentPage+=t,this.emitChange())},nbRecordChange:function(t){this.emitChange()},emitChange:function(){this.$emit("change",{maxRecords:this.recordPerPage,page:this.currentPage})}}};e(8191);const c=(0,a.Z)(l,(function(){var t=this,n=t._self._c;return n("span",{staticClass:"gnss-paging"},[n("div",[n("span",{class:{disabled:1===t.currentPage?"disabled":"","mtdt-navigation":!0}},[n("span",{style:{background:t.color},on:{click:function(n){return t.goToFirst()}}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-angles-left"}})],1),t._v(" "),n("span",{style:{background:t.color},on:{click:function(n){return t.changePage(-1)}}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-angle-left"}})],1)]),t._v(" "),n("span",{staticStyle:{margin:"0 10px"}},[t._v("\n Results: "+t._s(t.from)+" to "+t._s(t.to)+" among "+t._s(t.notExactly)+t._s(t.totalResults)+"\n ")]),t._v("\n  ("),n("select",{directives:[{name:"model",rawName:"v-model",value:t.recordPerPage,expression:"recordPerPage"}],on:{change:[function(n){var e=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.recordPerPage=n.target.multiple?e:e[0]},t.nbRecordChange]}},t._l(t.recordsPerPage,(function(e,s){return n("option",{domProps:{value:s}},[t._v(t._s(e))])})),0),t._v(")\n  "),n("span",{class:{disabled:t.notExactly||t.currentPage!==t.nbPage&&0!==t.count?"":"disabled","mtdt-navigation":!0}},[n("span",{style:{background:t.color},on:{click:function(n){return t.changePage(1)}}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-angle-right"}})],1),t._v(" "),n("span",{style:{background:t.color},on:{click:function(n){return t.goToLast()}}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-angles-right"}})],1)])])])}),[],!1,null,null,null).exports;var d;function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function g(t,n,e){return(n=function(t){var n=function(t,n){if("object"!==u(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var s=e.call(t,n||"default");if("object"!==u(s))return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"===u(n)?n:String(n)}(n))in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}const p=(g(d={name:"FileList",components:{FileForm:s.Z,FileRow:r,GnssMenu:i.Z,GnssPaging:c},data:function(){return{}},computed:{api:function(){return this.$store.getters.api},defaultRequest:function(){return Object.assign({page:1,maxRecords:25,orderBy:"station ASC,solution ASC"},this.$store.getters.request)},exportQuery:function(){var t=Object.assign({output:"csv"},this.$route.query),n=new URLSearchParams(t).toString(),e=this.api+"products/?"+n;return console.log(e),e}},watch:{$route:function(t,n){console.log(t),this.treatmentQuery(t.query)}}},"data",(function(){return{files:[],sort:{station:"ASC",solution:"ASC",name:null,productType:null,analysisCentre:null,start:null,end:null,fill:null,years:null},downloading:!1,pagination:{page:1,maxRecords:25},orderBy:[{name:"station",value:"ASC"},{name:"solution",value:"ASC"}]}})),g(d,"created",(function(){this.$route.query.page&&(this.pagination.page=parseInt(this.$route.query.page)),this.$route.query.maxRecords&&(this.pagination.maxRecords=parseInt(this.$route.query.maxRecords)),this.treatmentQuery(this.$route.query)})),g(d,"destroyed",(function(){})),g(d,"methods",{downloadPage:function(){if(!this.$store.state.auth||this.$store.getters["user/email"]){var t=this.$el.querySelectorAll(".gnss-file a[download]");this.download(0,t),this.downloading=!0}else this.$parent.preLogin(null)},download:function(t,n){if(n[t]){n[t].click();var e=this;setTimeout((function(){e.download(t+1,n)}),300)}else this.downloading=!1},downloadAll:function(t){},changeSort:function(t){var n=this.orderBy.findIndex((function(n){return n.name===t}));n>=0?(this.orderBy[n].value="ASC"===this.orderBy[n].value?"DESC":"ASC",1==n&&(this.orderBy=this.orderBy.reverse())):(this.orderBy.pop(),this.orderBy.unshift({name:t,value:"ASC"}));var e=this.orderBy.map((function(t){return t.name+" "+t.value})).join(","),s=Object.assign({},this.$route.query);s.orderBy=e,this.$router.push({name:"files",query:s}).catch((function(){}))},display:function(t){this.files=t.products,this.pagination.tot=t.query.tot,this.pagination.page=t.query.page,this.pagination.maxRecords=t.query.maxRecords},getQuery:function(){var t=Object.assign({},this.$route.query);return this.$el.querySelector(".expand")?t.expand=1:delete t.expand,t},paginationChange:function(t){var n=Object.assign({},this.$route.query);n.page=t.page,n.maxRecords=t.maxRecords,this.$router.push({name:this.$route.name,query:n})},reload:function(){this.treatmentQuery(this.$route.query)},treatmentQuery:function(t){var n=this;this.api||console.log("Pas de service SensorThings!");var e=this.api+"products/",s=Object.assign({},this.defaultRequest);if(t.orderBy){var i=t.orderBy.split(/\s*,\s*/),o={};for(var a in this.orderBy=[],i.forEach((function(t){console.log(t);var n=t.split(/\s+/);o[n[0]]=n[1].toUpperCase()})),this.sort)o[a]?(this.sort[a]=o[a],this.orderBy.push({name:a,value:o[a]})):this.sort[a]=null}s=Object.assign({},this.defaultRequest);s=Object.assign(s,t),this.$http.get(e,{params:s}).then((function(t){n.display(t.body)}),(function(t){console.log("Erreur de chargement: "+t.status)}))},close:function(t){console.log(t),this.$router.push({name:"home",query:this.$store.state.queryList})}}),d);e(8604),e(3882);const f=(0,a.Z)(p,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"page-station page-list"},[n("file-form",{attrs:{mode:"map"}}),t._v(" "),n("gnss-menu",{attrs:{top:55}}),t._v(" "),n("div",{staticClass:"station-content"},[n("div",{staticClass:"station-header"},[n("span",{staticClass:"close button",staticStyle:{"margin-right":"20px"},on:{click:function(n){return t.close(n)}}},[n("font-awesome-icon",{attrs:{icon:"fa-solid fa-close"}})],1),t._v(" "),n("h2",[t._v("List of files")])]),t._v(" "),n("div",{staticClass:"station-body",staticStyle:{"min-height":"calc(100vh - 70px)","max-height":"max-content","overflow-x":"hidden"}},[n("div",[n("gnss-paging",{attrs:{color:"#b8412c",page:t.pagination.page,"max-records":t.pagination.maxRecords,count:t.files.length,"total-results":t.pagination.tot},on:{change:t.paginationChange}}),t._v(" "),n("div",{staticStyle:{display:"inline-block",width:"30%","text-align":"right","padding-right":"20px"}},[n("button",{attrs:{type:"button"}},[n("a",{attrs:{href:t.exportQuery,download:"exportGnss.csv"}},[t._v("\n           Export CSV\n            "),n("font-awesome-icon",{attrs:{icon:"fa-solid fa-file"}})],1)]),t._v(" "),t.$store.state.back?t._e():n("button",{attrs:{type:"button",disabled:t.downloading,title:"Download only the files in the page"},on:{click:t.downloadPage}},[t._v("\n          Download All\n          "),n("font-awesome-icon",{attrs:{icon:"fa-solid fa-download"}})],1)])],1),t._v(" "),t.files.length>0?n("div",{staticClass:"array-list"},[n("div",{staticClass:"gnss-file header"},[n("div",{staticClass:"gnss-file-title"},[t._v("Name  \n\t       "),n("span",{staticClass:"gnss-sort",class:{unactive:!t.sort.name},on:{click:function(n){return t.changeSort("name")}}},[t._v(t._s("DESC"===t.sort.name?"↑":"↓"))])]),t._v(" "),n("div",{staticClass:"gnss-file-2"},[t._v("Station \n\t        "),n("span",{staticClass:"gnss-sort",class:{unactive:!t.sort.station},on:{click:function(n){return t.changeSort("station")}}},[t._v(t._s("DESC"===t.sort.station?"↑":"↓"))])]),t._v(" "),n("div",{staticClass:"gnss-file-3-header"},[n("div",{staticStyle:{"margin-top":"5px"}},[t._v("Solution \n\t         "),n("span",{staticClass:"gnss-sort",class:{unactive:!t.sort.solution},on:{click:function(n){return t.changeSort("solution")}}},[t._v(t._s("DESC"===t.sort.solution?"↑":"↓"))])]),t._v(" "),n("div",[t._v("Product type\n\t          "),n("span",{staticClass:"gnss-sort",class:{unactive:!t.sort.productType},on:{click:function(n){return t.changeSort("productType")}}},[t._v(t._s("DESC"===t.sort.productType?"↑":"↓"))])])]),t._v(" "),n("div",{staticClass:"gnss-file-4-header"},[n("div",{staticStyle:{"margin-top":"5px"}},[t._v("Start\n\t        "),n("span",{staticClass:"gnss-sort",class:{unactive:!t.sort.start},on:{click:function(n){return t.changeSort("start")}}},[t._v(t._s("DEC"===t.sort.start?"↑":"↓"))]),t._v("\n           End  "),n("span",{staticClass:"gnss-sort",class:{unactive:!t.sort.end},on:{click:function(n){return t.changeSort("end")}}},[t._v(t._s("DESC"===t.sort.end?"↑":"↓"))])]),t._v(" "),n("div",[t._v("\n\t          Years"),n("span",{staticClass:"gnss-sort",class:{unactive:!t.sort.years},on:{click:function(n){return t.changeSort("years")}}},[t._v(t._s("DESC"===t.sort.years?"↑":"↓"))]),t._v("\n            Fill rate"),n("span",{staticClass:"gnss-sort",class:{unactive:!t.sort.fill},on:{click:function(n){return t.changeSort("fill")}}},[t._v(t._s("DESC"===t.sort.fill?"↑":"↓"))])])]),t._v(" "),n("div",{staticClass:"gnss-file-5"},[t._v("Analysis centre\n\t       "),n("span",{staticClass:"gnss-sort",class:{unactive:!t.sort.analysisCentre},on:{click:function(n){return t.changeSort("analysisCentre")}}},[t._v(t._s("DESC"===t.sort.analysisCentre?"↑":"↓"))])])]),t._v(" "),n("div",{staticStyle:{"max-height":"calc(100vh - 155px)","overflow-y":"scroll"}},t._l(t.files,(function(e,s){return n("file-row",{key:s,attrs:{file:e},on:{remove:function(n){return t.reload()}}})})),1)]):n("div",{staticStyle:{"text-align":"center",padding:"30px"}},[n("em",[t._v("No file match search criteria")])])])])],1)}),[],!1,null,"60f54598",null).exports},8604:(t,n,e)=>{var s=e(9746);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,e(5346).Z)("34c0db15",s,!0,{})},3882:(t,n,e)=>{var s=e(3462);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,e(5346).Z)("214f1a21",s,!0,{})},8755:(t,n,e)=>{var s=e(5855);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,e(5346).Z)("2b0e2e54",s,!0,{})},8191:(t,n,e)=>{var s=e(3888);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.id,s,""]]),s.locals&&(t.exports=s.locals);(0,e(5346).Z)("2dcb580d",s,!0,{})}}]);
//# sourceMappingURL=504.gnss-components-vjs.js.map