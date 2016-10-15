import polyfill from 'whatwg-fetch';

/*for example: 
*	fetch.doGet("api/user_login.json").then(function(userInfo){
*		userInfo -> return data
*	}, function(error){
*		error -> error info
*	});
*/

const fetchDao = {
	doGet: function(url, params){
		return this.request("GET", url, params);
	},

	doPost: function(url, params){
		return this.request("POST", url, params);
	},

	doPut: function(url, params){
		return this.request("PUT", url, params);
	},

	doDelete: function(url, params){
		return this.request("DELETE", url, params);
	},

	request: function(method, url, params){
		const self = this;

		return new Promise(function (resolve, reject) {
			fetch(url, {
				method: method,
				body: JSON.stringify(params),
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "same-origin"
			})
			.then(self.checkStatus)
			.then(self.parseJSON)
			.then(function(data) {
				resolve(data);
			}).catch(function(error){
				reject(error);
			});
		});
	},

	checkStatus: function(response){
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			let error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	},

	parseJSON: function(response){
		return response.json();
	}
};

export default fetchDao;