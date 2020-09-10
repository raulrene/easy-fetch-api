# (easy) Fetch API
Easy to use and lightweight wrapper for the Fetch API.

* Provides CRUD methods
* Each method returns a Promise, therefore works with async/await
* Automatically sets required headers (for POST, PUT and PATCH it sets `Accept` and `Content-Type` headers to `application/json`)
* Provides method for easily posting [form data](#post-form)
* Pre-request and post-request callbacks for an easier integration with store-based architectures like Redux - [see example](#callbefore-and-callback)

This library does not provide a polyfill for the Fetch API.

## Installation

```sh
npm install --save easy-fetch-api
```

## Usage

```javascript
import Api, { RESPONSE_TYPES } from 'easy-fetch-api';

Api.get({ url: '/api/me', callback: console.log });

await Api.post({ url: '/api/register', data: { email: 'value', password: 'value' } });

// Set headers on each request
Api.get({ url: '/api/me', headers: { Authorization: 'Bearer token' } });

// Or set headers globally and they are automatically passed on each request
Api.setHeaders({ Authorization: 'Bearer token' });

console.log(RESPONSE_TYPES) // { json: 'json', blob: 'blob', text: 'text' }
```

**More detailed usage examples below in the docs of each method**:


### SET BASE URL
Set a base URL (if needed).

This will be used to prefix all later URLs

```javascript
Api.setBaseUrl('https://api-domain.com');
```

---
### GET
Performs a HTTP Get request.

```javascript
Api.get({
    url: '/api/get',
	headers: { Authorization: 'token' },
	query: { q1: 'value', qn: 'value' },
	responseType: Api.RESPONSE_TYPES.blob,
	callback: () => {}
)};
```

* __url__ (String, required) - URL to make request to
* __headers__ (Object, optional) HTTP Headers object in the form of `{ headerKey: headerValue }`
* __query__ (Object, optional) Query object in the form of `{ queryKey: queryValue }`
* __callback__ (Function, optional) Function called after the server responds, with resulting data
* __responseType__ (String, optional) one of the RESPONSE_TYPES allowed values
* __returns Promise__

---
### POST (json)
Performs a HTTP Post request.

```javascript
Api.post({
	url: '/api/post',
	data: { email: 'value', password: 'value' },
	headers: { Authorization: 'token' },
	callback: () => {}
)};
```
* __url__ (String, required) - URL to make request to
* __data__ (Object, required) - Object body to be posted
* __headers__ (Object, optional) HTTP Headers object in the form of `{ headerKey: headerValue }`. Note that there are two preset heders: `{ Accept: 'application/json', 'Content-Type': 'application/json' }`. You can override them using this parameter
* __callback__ (Function, optional) Function called after the server responds, with resulting data
* __responseType__ (String, optional) one of the RESPONSE_TYPES allowed values
* __returns Promise__

---
### POST FORM
Performs a HTTP Post request with form data.

```javascript
Api.postForm({
	url: '/api/postForm',
	data: 'email=value&password=value',
	headers: { Authorization: 'token' },
	callback: () => {}
)};
```
* __url__ (String, required) - URL to make request to
* __data__ (String, required) - Form data to be posted
* __headers__ (Object, optional) HTTP Headers object in the form of `{ headerKey: headerValue }`. Note that there are two preset heders: `{ Accept: 'application/json', 'Content-Type': 'application/json' }`. You can override them using this parameter
* __callback__ (Function, optional) Function called after the server responds, with resulting data
* __returns Promise__

---
### PUT
Performs a HTTP Put request.

```javascript
Api.put({
	url: `/api/put/${id}`,
	data: { email: 'value', password: 'value' },
	headers: { Authorization: 'token' },
	callback: () => {}
)};
```
* __url__ (String, required) - URL to make request to
* __data__ (Object, required) - Object body to be updated
* __headers__ (Object, optional) HTTP Headers object in the form of `{ headerKey: headerValue }`. Note that there are two preset heders: `{ Accept: 'application/json', 'Content-Type': 'application/json' }`. You can override them using this parameter
* __callback__ (Function, optional) Function called after the server responds, with resulting data
* __responseType__ (String, optional) one of the RESPONSE_TYPES allowed values
* __returns Promise__

---
### PATCH
Performs a HTTP Patch request.

```javascript
Api.patch({
	url: `/api/put/${id}`,
	data: { email: 'value', password: 'value' },
	headers: { Authorization: 'token' },
	callback: () => {}
)};
```
* __url__ (String, required) - URL to make request to
* __data__ (Object, required) - Object body to be updated
* __headers__ (Object, optional) HTTP Headers object in the form of `{ headerKey: headerValue }`. Note that there are two preset heders: `{ Accept: 'application/json', 'Content-Type': 'application/json' }`. You can override them using this parameter
* __callback__ (Function, optional) Function called after the server responds, with resulting data
* __responseType__ (String, optional) one of the RESPONSE_TYPES allowed values
* __returns Promise__

---

### DELETE
Performs a HTTP Delete request.

```javascript
Api.delete({
	url: '/api/delete',
	headers: { Authorization: 'token' },
	query: { q1: 'value', qn: 'value' },
	callback: () => {}
)};
```

* __url__ (String, required) - URL to make request to
* __headers__ (Object, optional) HTTP Headers object in the form of `{ headerKey: headerValue }`
* __query__ (Object, optional) Query object in the form of `{ queryKey: queryValue }`
* __callback__ (Function, optional) Function called after the server responds, with resulting data
* __returns Promise__

---
### CallBefore and Callback
Functions to be called before the request is fired and after the server responds, respectively. Facilitates integration with store-based architectures like Redux.

```javascript
Api.get({
	url: '/api/get',
	callBefore: () => { dispatch({ type: ACTIONS.LOADING }) },
	callback: result => { dispatch({ type: ACTIONS.LOADING_DONE, data: result }) }
)};
```

## Licence
The code is open-source and available under the MIT Licence. More details in the LICENCE.md file.
