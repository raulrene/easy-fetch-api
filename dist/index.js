!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r().default:"function"==typeof define&&define.amd?define("EasyFetchApi",[],function(){return r().default}):"object"==typeof exports?exports.EasyFetchApi=r().default:e.EasyFetchApi=r().default}(this,function(){return function(e){var r={};function a(t){if(r[t])return r[t].exports;var l=r[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,a),l.l=!0,l.exports}return a.m=e,a.c=r,a.d=function(e,r,t){a.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:t})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(r,"a",r),r},a.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},a.p="",a(a.s=0)}([function(e,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var a=arguments[r];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,r){for(var a=0;a<r.length;a++){var t=r[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,a,t){return a&&e(r.prototype,a),t&&e(r,t),r}}();function s(e,r){var a={};for(var t in e)r.indexOf(t)>=0||Object.prototype.hasOwnProperty.call(e,t)&&(a[t]=e[t]);return a}function c(e){var r=e.method,a=void 0===r?"GET":r,t=e.url,l=e.headers,o=e.query;return{method:a,url:t.indexOf("http")>-1||t.indexOf("www")>-1?t:""+(this.baseUrl||this.constructor.baseUrl||"")+t,headers:Object.assign({},this.constructor.headers,this.headers,l),query:o}}function n(e){var r=e.method,a=e.url,t=e.headers,l=e.data;return{method:r,url:a.indexOf("http")>-1||a.indexOf("www")>-1?a:""+(this.baseUrl||this.constructor.baseUrl||"")+a,body:JSON.stringify(l),headers:Object.assign({},{Accept:"application/json","Content-Type":"application/json"},this.constructor.headers,this.headers,t)}}function u(e){var r=e.url,a=e.headers,t=e.data;return{method:"POST",url:r.indexOf("http")>-1||r.indexOf("www")>-1?r:""+(this.baseUrl||this.constructor.baseUrl||"")+r,body:t,headers:Object.assign({},this.constructor.headers,this.headers,a)}}var i=function(){function e(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e)}return o(e,[{key:"setBaseUrl",value:function(e){this.baseUrl=e}},{key:"setHeaders",value:function(e){this.headers={},"object"===(void 0===e?"undefined":l(e))&&(this.headers=e)}},{key:"get",value:function(e){var r=e.url,a=e.headers,l=e.query,o=e.callBefore,n=e.callback,u=e.responseType,i=s(e,["url","headers","query","callBefore","callback","responseType"]),d=c.call(this,{url:r,headers:a,query:l});return this.constructor._makeRequest(t({request:d,callBefore:o,callback:n,responseType:u},i))}},{key:"put",value:function(e){var r=e.url,a=e.data,l=e.headers,o=e.callBefore,c=e.callback,u=e.responseType,i=s(e,["url","data","headers","callBefore","callback","responseType"]),d=n.call(this,{method:"PUT",url:r,headers:l,data:a});return this.constructor._makeRequest(t({request:d,callBefore:o,callback:c,responseType:u},i))}},{key:"patch",value:function(e){var r=e.url,a=e.data,l=e.headers,o=e.callBefore,c=e.callback,u=e.responseType,i=s(e,["url","data","headers","callBefore","callback","responseType"]),d=n.call(this,{method:"PATCH",url:r,headers:l,data:a});return this.constructor._makeRequest(t({request:d,callBefore:o,callback:c,responseType:u},i))}},{key:"post",value:function(e){var r=e.url,a=e.data,l=e.headers,o=e.callBefore,c=e.callback,u=e.responseType,i=s(e,["url","data","headers","callBefore","callback","responseType"]),d=n.call(this,{method:"POST",url:r,headers:l,data:a});return this.constructor._makeRequest(t({request:d,callBefore:o,callback:c,responseType:u},i))}},{key:"postForm",value:function(e){var r=e.url,a=e.data,l=e.headers,o=e.callBefore,c=e.callback,n=s(e,["url","data","headers","callBefore","callback"]),i=u.call(this,{url:r,headers:l,data:a});return this.constructor._makeRequest(t({request:i,callBefore:o,callback:c},n))}},{key:"delete",value:function(e){var r=e.url,a=e.headers,l=e.query,o=e.callBefore,n=e.callback,u=s(e,["url","headers","query","callBefore","callback"]),i=c.call(this,{method:"DELETE",url:r,headers:a,query:l});return this.constructor._makeRequest(t({request:i,callBefore:o,callback:n},u))}}],[{key:"setBaseUrl",value:function(e){this.constructor.baseUrl=e}},{key:"setHeaders",value:function(e){this.constructor.headers={},"object"===(void 0===e?"undefined":l(e))&&(this.constructor.headers=e)}},{key:"get",value:function(e){var r=e.url,a=e.headers,l=e.query,o=e.callBefore,n=e.callback,u=e.responseType,i=s(e,["url","headers","query","callBefore","callback","responseType"]),d=c.call(this,{url:r,headers:a,query:l});return this._makeRequest(t({request:d,callBefore:o,callback:n,responseType:u},i))}},{key:"put",value:function(e){var r=e.url,a=e.data,l=e.headers,o=e.callBefore,c=e.callback,u=e.responseType,i=s(e,["url","data","headers","callBefore","callback","responseType"]),d=n.call(this,{method:"PUT",url:r,headers:l,data:a});return this._makeRequest(t({request:d,callBefore:o,callback:c,responseType:u},i))}},{key:"patch",value:function(e){var r=e.url,a=e.data,l=e.headers,o=e.callBefore,c=e.callback,u=e.responseType,i=s(e,["url","data","headers","callBefore","callback","responseType"]),d=n.call(this,{method:"PATCH",url:r,headers:l,data:a});return this._makeRequest(t({request:d,callBefore:o,callback:c,responseType:u},i))}},{key:"post",value:function(e){var r=e.url,a=e.data,l=e.headers,o=e.callBefore,c=e.callback,u=e.responseType,i=s(e,["url","data","headers","callBefore","callback","responseType"]),d=n.call(this,{method:"POST",url:r,headers:l,data:a});return this._makeRequest(t({request:d,callBefore:o,callback:c,responseType:u},i))}},{key:"postForm",value:function(e){var r=e.url,a=e.data,l=e.headers,o=e.callBefore,c=e.callback,n=s(e,["url","data","headers","callBefore","callback"]),i=u.call(this,{url:r,headers:l,data:a});return this._makeRequest(t({request:i,callBefore:o,callback:c},n))}},{key:"delete",value:function(e){var r=e.url,a=e.headers,l=e.query,o=e.callBefore,n=e.callback,u=s(e,["url","headers","query","callBefore","callback"]),i=c.call(this,{method:"DELETE",url:r,headers:a,query:l});return this._makeRequest(t({request:i,callBefore:o,callback:n},u))}},{key:"_makeRequest",value:function(r){var a=r.request,o=r.callBefore,c=r.callback,n=r.responseType,u=void 0===n?"json":n,i=s(r,["request","callBefore","callback","responseType"]),f=a.headers||{};o&&o();var h=t({headers:f,method:a.method||"GET"},i);if("GET"!==h.method&&(h.body=a.body||null),a.query){var p=Object.keys(a.query).map(function(e){var r=encodeURIComponent(e)+"=";return Array.isArray(a.query[e])?r+=a.query[e].join("&"+encodeURIComponent(e)+"="):"object"===l(a.query[e])?r+=encodeURIComponent(JSON.stringify(a.query[e])):r+=encodeURIComponent(a.query[e]),r}).join("&");a.url+="?"+p}return fetch(a.url,h).then(function(r){return e.RESPONSE_TYPES[u]&&u!==d.raw?r[e.RESPONSE_TYPES[u]]():r}).then(function(e){return c&&c(e),e}).catch(function(e){c&&c(e)})}}]),e}();i.RESPONSE_TYPES={json:"json",blob:"blob",text:"text",raw:"raw"},r.default=i;var d=r.RESPONSE_TYPES=i.RESPONSE_TYPES}])});