(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EasyFetchApi"] = factory();
	else
		root["EasyFetchApi"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports) {

	class Api {
	
	    /**
	     * Set global headers instead of setting the same headers on each call.
	     * @param headers {Object} headers object
	     */
	    static setHeaders(headers) {
	        Api.headers = {};
	        if (typeof headers === 'object') {
	            Api.headers = headers;
	        }
	    }
	
	    /**
	     * Make a GET request
	     *
	     * @param {String} url API url to make request to
	     * @param {Object} [headers] HTTP Headers
	     * @param {Object} [query] Query object
	     * @param {Function} [callback] Function to be run after the server responds
	     */
	    static get({ url, headers, query, callback }) {
	        const request = { method: 'GET', url, headers: Object.assign({}, Api.headers, headers) };
	        if (query) {
	            const qs = Object.keys(query)
	                .map(k => {
	                    let keyValue = `${encodeURIComponent(k)}=`;
	                    if (typeof query[k] === 'object') {
	                        keyValue += encodeURIComponent(JSON.stringify(query[k]));
	                    } else {
	                        keyValue += encodeURIComponent(query[k]);
	                    }
	                    return keyValue;
	                })
	                .join('&');
	            request.url += `?${qs}`;
	        }
	        return this.makeRequest({ request, callback });
	    }
	
	    /**
	     * Make a PUT request
	     *
	     * @param {String} url API url to make request to
	     * @param {Object} data The data to be updated
	     * @param {Object} [headers] HTTP Headers
	     * @param {Function} [callback] Function to be run after the server responds
	     */
	    static put({ url, data, headers, callback }) {
	        const request = {
	            method: 'PUT',
	            url,
	            body: JSON.stringify(data),
	            headers: Object.assign({}, {
	                Accept: 'application/json',
	                'Content-Type': 'application/json'
	            }, Api.headers, headers)
	        };
	        return this.makeRequest({ request, callback });
	    }
	
	    /**
	     * Make a PATCH request
	     *
	     * @param {String} url API url to make request to
	     * @param {Object} data The data to be updated
	     * @param {Object} [headers] HTTP Headers
	     * @param {Function} [callback] Function to be run after the server responds
	     */
	    static patch({ url, data, headers, callback }) {
	        const request = {
	            method: 'PATCH',
	            url,
	            body: JSON.stringify(data),
	            headers: Object.assign({}, {
	                Accept: 'application/json',
	                'Content-Type': 'application/json'
	            }, Api.headers, headers)
	        };
	        return this.makeRequest({ request, callback });
	    }
	
	    /**
	     * Make a POST JSON request
	     *
	     * @param {String} url API url to make request to
	     * @param {Object} data The data to be inserted
	     * @param {Object} [headers] HTTP Headers
	     * @param {Function} [callback] Function to be run after the server responds
	     */
	    static post({ url, data, headers, callback }) {
	        const request = {
	            method: 'POST',
	            url,
	            body: JSON.stringify(data),
	            headers: Object.assign({}, {
	                Accept: 'application/json',
	                'Content-Type': 'application/json'
	            }, Api.headers, headers)
	        };
	        return this.makeRequest({ request, callback });
	    }
	
	    /**
	     * Make a POST form data request
	     *
	     * @param {String} url API url to make request to
	     * @param {Object} data The data to be inserted
	     * @param {Object} [headers] HTTP Headers
	     * @param {Function} [callback] Function to be run after the server responds
	     */
	    static postForm({ url, data, headers, callback }) {
	        const request = { method: 'POST', url, body: data, headers: Object.assign({}, Api.headers, headers) };
	        return this.makeRequest({ request, callback });
	    }
	
	    /**
	     * Make a DELETE request
	     *
	     * @param {String} url API url to make request to
	     * @param {Object} [headers] HTTP Headers
	     * @param {String} [query] Query string
	     * @param {Function} [callback] Function to be run after the server responds
	     */
	    static delete({ url, headers, query, callback }) {
	        const request = { method: 'DELETE', url, query, headers: Object.assign({}, Api.headers, headers) };
	        return this.makeRequest({ request, callback });
	    }
	
	    /**
	     * Make a generic request
	     *
	     * @param {Object} request Request to be made. Must be of the form: {method, url, query [optional]}
	     * @param {Function} [callback] Function to be run after the server responds
	     */
	    static makeRequest({ request, callback }) {
	        const headers = request.headers || {};
	
	        // Don't set the body if it's a GET request as it will crash on Microsoft Edge
	        const params = {
	            headers,
	            method: request.method || 'GET'
	        };
	        if (params.method !== 'GET') {
	            params.body = request.body || null;
	        }
	
	        // Do the API Request
	        return fetch(request.url, params)
	            .then(res => res.json())
	            .then(res => {
	                callback && callback(res);
	                return res;
	            })
	            .catch(err => {
	                callback && callback(err);
	            });
	    }
	}
	
	exports.setHeaders = Api.setHeaders;
	exports.get = Api.get;
	exports.put = Api.put;
	exports.put = Api.patch;
	exports.post = Api.post;
	exports.postForm = Api.postForm;
	exports.delete = Api.delete;
	exports.makeRequest = Api.makeRequest;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map