webpackJsonp([4],{"5I9L":function(t,e,n){var r=n("Q6j1");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n("rjj0")("36579763",r,!0)},JXTs:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("KWv7"),o={data:function(){return{routes:r.a.filter(function(t){return t.meta&&t.meta.menu})}},components:{},computed:{},watch:{},methods:{},created:function(){console.log("routes",r.a)}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("navigation",[n("div",{staticClass:"nav"},t._l(t.routes,function(e,r){return n("router-link",{key:r,attrs:{to:e.path}},[t._v(t._s(e.meta.title))])}))]),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"wrapper mtb20"},[e("p",[this._v("请选择对应测评。")]),this._v(" "),e("p",[this._v("完成后，请保存结果。")])])}]};var s=n("VU/8")(o,i,!1,function(t){n("5I9L")},null,null);e.default=s.exports},Q6j1:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.menu {\n  margin-top: 20px;\n}\n.menu-item a {\n  cursor: pointer;\n  text-decoration: underline;\n}\n.menu-item a:hover {\n    color: blue;\n}\n",""])}});