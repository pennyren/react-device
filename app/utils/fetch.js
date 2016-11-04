const http = {
	doGet: function(url, params){
		return http.request("GET", url, params);
	},

	doPost: function(url, params){
		return http.request("POST", url, params);
	},
	
	request: function(method, url, params){
		const self = http;
		let opts = {
			method: method,
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "same-origin"
		}

		if (method == 'GET' && typeof params !== 'undefined') {
			url = self.getUrlQuery(url, params);
		}

		if (method == 'POST') {
			opts.body = JSON.stringify(params);
		}
		return new Promise(function (resolve, reject) {
			fetch(url, opts)
				.then(self.checkStatus)
				.then(function (data) {
					resolve(data);
				}).catch(function (err) {
					reject(err);
				});
		});
	},

	checkStatus: function (res) {
		const isSuccess = res.status >= 200 && res.status < 300;
		if (isSuccess) {
			return res.json();
		} else {
			throw new Error(res.statusText);
		}
	},

	getUrlQuery: function (url, params) {
		let query = [];
		for (const key in params) {
			query.push(key + '=' + params[key]);
		}
		return url += '?' + query.join('&');
	}
};

export default http;