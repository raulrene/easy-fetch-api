class Api {

    /**
     * Set a global baseURL to prefix all URLs with
     * @param {String} baseUrl
     */
    static setBaseUrl(baseUrl) {
        Api.baseUrl = baseUrl
    }

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
     * @param {Function} [callBefore] Function to be run before the request
     * @param {Function} [callback] Function to be run after the server responds
     * @param {String} [responseType] any value of the RESPONSE_TYPES map. Defaults to 'json'
     */
    static get({ url, headers, query, callBefore, callback, responseType }) {
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
        return Api._makeRequest({ request, callBefore, callback, responseType });
    }

    /**
     * Make a PUT request
     *
     * @param {String} url API url to make request to
     * @param {Object} data The data to be updated
     * @param {Object} [headers] HTTP Headers
     * @param {Function} [callBefore] Function to be run before the request
     * @param {Function} [callback] Function to be run after the server responds
     * @param {String} [responseType] any value of the RESPONSE_TYPES map. Defaults to 'json'
     */
    static put({ url, data, headers, callBefore, callback, responseType }) {
        const request = {
            method: 'PUT',
            url,
            body: JSON.stringify(data),
            headers: Object.assign({}, {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, Api.headers, headers)
        };
        return Api._makeRequest({ request, callBefore, callback, responseType });
    }

    /**
     * Make a PATCH request
     *
     * @param {String} url API url to make request to
     * @param {Object} data The data to be updated
     * @param {Object} [headers] HTTP Headers
     * @param {Function} [callBefore] Function to be run before the request
     * @param {Function} [callback] Function to be run after the server responds
     * @param {String} [responseType] any value of the RESPONSE_TYPES map. Defaults to 'json'
     */
    static patch({ url, data, headers, callBefore, callback, responseType }) {
        const request = {
            method: 'PATCH',
            url,
            body: JSON.stringify(data),
            headers: Object.assign({}, {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, Api.headers, headers)
        };
        return Api._makeRequest({ request, callBefore, callback, responseType });
    }

    /**
     * Make a POST JSON request
     *
     * @param {String} url API url to make request to
     * @param {Object} data The data to be inserted
     * @param {Object} [headers] HTTP Headers
     * @param {Function} [callBefore] Function to be run before the request
     * @param {Function} [callback] Function to be run after the server responds
     * @param {String} [responseType] any value of the RESPONSE_TYPES map. Defaults to 'json'
     */
    static post({ url, data, headers, callBefore, callback, responseType }) {
        const request = {
            method: 'POST',
            url,
            body: JSON.stringify(data),
            headers: Object.assign({}, {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, Api.headers, headers)
        };
        return Api._makeRequest({ request, callBefore, callback, responseType});
    }

    /**
     * Make a POST form data request
     *
     * @param {String} url API url to make request to
     * @param {String} data Form data to be inserted
     * @param {Object} [headers] HTTP Headers
     * @param {Function} [callBefore] Function to be run before the request
     * @param {Function} [callback] Function to be run after the server responds
     */
    static postForm({ url, data, headers, callBefore, callback }) {
        const request = { method: 'POST', url, body: data, headers: Object.assign({}, Api.headers, headers) };
        return Api._makeRequest({ request, callBefore, callback });
    }

    /**
     * Make a DELETE request
     *
     * @param {String} url API url to make request to
     * @param {Object} [headers] HTTP Headers
     * @param {String} [query] Query string
     * @param {Function} [callBefore] Function to be run before the request
     * @param {Function} [callback] Function to be run after the server responds
     */
    static delete({ url, headers, query, callBefore, callback }) {
        const request = { method: 'DELETE', url, query, headers: Object.assign({}, Api.headers, headers) };
        return Api._makeRequest({ request, callBefore, callback });
    }

    /**
     * Make a generic request
     *
     * @param {Object} request Request to be made. Must be of the form: {method, url, query [optional]}
     * @param {Function} [callBefore] Function to be run before the request
     * @param {Function} [callback] Function to be run after the server responds
     * @param {String} [responseType] any value of the RESPONSE_TYPES map. Defaults to 'json'
     * @private
     */
    static _makeRequest({ request, callBefore, callback, responseType  = 'json'}) {
        const headers = request.headers || {};
        const baseUrl = Api.baseUrl || '';

        // Pre-request function call
        callBefore && callBefore();

        // Don't set the body if it's a GET request as it will crash on Microsoft Edge
        const params = {
            headers,
            method: request.method || 'GET'
        };
        if (params.method !== 'GET') {
            params.body = request.body || null;
        }

        // Do the API Request
        return fetch(`${baseUrl}${request.url}`, params)
            .then(res => {
                if (Api.RESPONSE_TYPES[responseType]) {
                    return res[Api.RESPONSE_TYPES[responseType]]();
                }
            })
            .then(res => {
                callback && callback(res);
                return res;
            })
            .catch(err => {
                callback && callback(err);
            });
    }
}

Api.RESPONSE_TYPES = {json: 'json', blob: 'blob', text: 'text'};

exports.RESPONSE_TYPES = Api.RESPONSE_TYPES;
exports.setHeaders = Api.setHeaders;
exports.setBaseUrl = Api.setBaseUrl;
exports.get = Api.get;
exports.put = Api.put;
exports.put = Api.patch;
exports.post = Api.post;
exports.postForm = Api.postForm;
exports.delete = Api.delete;
