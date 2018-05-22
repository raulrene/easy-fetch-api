class Api {

    /**
     * Make a GET request
     *
     * @param {String} url API url to make request to
     * @param {Object} [headers] HTTP Headers
     * @param {Object} [query] Query object
     * @param {Function} [callback] Function to be run after the server responds
     */
    static get({ url, headers, query, callback }) {
        const request = { method: 'GET', url, headers };
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
            headers: Object.assign({}, { Accept: 'application/json', 'Content-Type': 'application/json' }, headers)
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
            headers: Object.assign({}, { Accept: 'application/json', 'Content-Type': 'application/json' }, headers)
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
            headers: Object.assign({}, { Accept: 'application/json', 'Content-Type': 'application/json' }, headers)
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
        const request = { method: 'POST', url, body: data, headers };
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
        const request = { method: 'DELETE', url, query, headers };
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

exports.get = Api.get;
exports.put = Api.put;
exports.put = Api.patch;
exports.post = Api.post;
exports.postForm = Api.postForm;
exports.delete = Api.delete;
exports.makeRequest = Api.makeRequest;
