function formGetRequest({ method = 'GET', url, headers, query }) {
    const theUrl =
        url.indexOf('http') > -1 || url.indexOf('www') > -1
            ? url
            : `${this.baseUrl || this.constructor.baseUrl || ''}${url}`
    return {
        method,
        url: theUrl,
        headers: Object.assign({}, this.constructor.headers, this.headers, headers),
        query
    }
}

function formPostRequest({ method, url, headers, data }) {
    const theUrl =
        url.indexOf('http') > -1 || url.indexOf('www') > -1
            ? url
            : `${this.baseUrl || this.constructor.baseUrl || ''}${url}`
    return {
        method,
        url: theUrl,
        body: JSON.stringify(data),
        headers: Object.assign(
            {},
            {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            this.constructor.headers,
            this.headers,
            headers
        )
    }
}

function formPostFormRequest({ url, headers, data }) {
    const theUrl =
        url.indexOf('http') > -1 || url.indexOf('www') > -1
            ? url
            : `${this.baseUrl || this.constructor.baseUrl || ''}${url}`
    return {
        method: 'POST',
        url: theUrl,
        body: data,
        headers: Object.assign({}, this.constructor.headers, this.headers, headers)
    }
}

class Api {
    /**
     * Set a global baseURL to prefix all URLs with
     * @param {String} baseUrl
     */
    static setBaseUrl(baseUrl) {
        this.constructor.baseUrl = baseUrl
    }

    /**
     * Set a global baseURL to prefix all URLs with
     * @param {String} baseUrl
     */
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl
    }

    /**
     * Set global headers instead of setting the same headers on each call.
     * @param headers {Object} headers object
     */
    static setHeaders(headers) {
        this.constructor.headers = {}
        if (typeof headers === 'object') {
            this.constructor.headers = headers
        }
    }

    /**
     * Set global headers instead of setting the same headers on each call.
     * @param headers {Object} headers object
     */
    setHeaders(headers) {
        this.headers = {}
        if (typeof headers === 'object') {
            this.headers = headers
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
    get({ url, headers, query, callBefore, callback, responseType }) {
        const request = formGetRequest.call(this, { url, headers, query })

        return this.constructor._makeRequest({
            request,
            callBefore,
            callback,
            responseType
        })
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
        const request = formGetRequest.call(this, { url, headers, query })

        return this._makeRequest({
            request,
            callBefore,
            callback,
            responseType
        })
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
    put({ url, data, headers, callBefore, callback, responseType }) {
        const request = formPostRequest.call(this, {
            method: 'PUT',
            url,
            headers,
            data
        })
        return this.constructor._makeRequest({
            request,
            callBefore,
            callback,
            responseType
        })
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
        const request = formPostRequest.call(this, {
            method: 'PUT',
            url,
            headers,
            data
        })

        return this._makeRequest({
            request,
            callBefore,
            callback,
            responseType
        })
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
    patch({ url, data, headers, callBefore, callback, responseType }) {
        const request = formPostRequest.call(this, {
            method: 'PATCH',
            url,
            headers,
            data
        })
        return this.constructor._makeRequest({
            request,
            callBefore,
            callback,
            responseType
        })
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
        const request = formPostRequest.call(this, {
            method: 'PATCH',
            url,
            headers,
            data
        })
        return this._makeRequest({
            request,
            callBefore,
            callback,
            responseType
        })
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
    post({ url, data, headers, callBefore, callback, responseType }) {
        const request = formPostRequest.call(this, {
            method: 'POST',
            url,
            headers,
            data
        })
        return this.constructor._makeRequest({
            request,
            callBefore,
            callback,
            responseType
        })
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
        const request = formPostRequest.call(this, {
            method: 'POST',
            url,
            headers,
            data
        })
        return this._makeRequest({
            request,
            callBefore,
            callback,
            responseType
        })
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
    postForm({ url, data, headers, callBefore, callback }) {
        const request = formPostFormRequest.call(this, { url, headers, data })
        return this.constructor._makeRequest({ request, callBefore, callback })
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
        const request = formPostFormRequest.call(this, { url, headers, data })
        return this._makeRequest({ request, callBefore, callback })
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
    delete({ url, headers, query, callBefore, callback }) {
        const request = formGetRequest.call(this, {
            method: 'DELETE',
            url,
            headers,
            query
        })
        return this.constructor._makeRequest({ request, callBefore, callback })
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
        const request = formGetRequest.call(this, {
            method: 'DELETE',
            url,
            headers,
            query
        })
        return this._makeRequest({ request, callBefore, callback })
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
    static _makeRequest({
                            request,
                            callBefore,
                            callback,
                            responseType = 'json'
                        }) {
        const headers = request.headers || {}

        // Pre-request function call
        callBefore && callBefore()

        // Don't set the body if it's a GET request as it will crash on Microsoft Edge
        const params = {
            headers,
            method: request.method || 'GET'
        }
        if (params.method !== 'GET') {
            params.body = request.body || null
        }

        // Append query params
        if (request.query) {
            const qs = Object.keys(request.query)
                .map(k => {
                    let keyValue = `${encodeURIComponent(k)}=`
                    if (Array.isArray(request.query[k])) {
                        keyValue += request.query[k].join(`&${encodeURIComponent(k)}=`)
                    } else if (typeof request.query[k] === 'object') {
                        keyValue += encodeURIComponent(JSON.stringify(request.query[k]))
                    } else {
                        keyValue += encodeURIComponent(request.query[k])
                    }
                    return keyValue
                })
                .join('&')
            request.url += `?${qs}`
        }

        // Do the API Request
        return fetch(request.url, params)
            .then(res => {
                if (Api.RESPONSE_TYPES[responseType]) {
                    return res[Api.RESPONSE_TYPES[responseType]]()
                }
            })
            .then(res => {
                callback && callback(res)
                return res
            })
            .catch(err => {
                callback && callback(err)
            })
    }
}

Api.RESPONSE_TYPES = {json: 'json', blob: 'blob', text: 'text'};

export default Api
export const RESPONSE_TYPES = Api.RESPONSE_TYPES;
