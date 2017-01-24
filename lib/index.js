const request = require("request");
const fs = require('fs');

class Matailmu {

	constructor() {
		this.accessToken = '';
		this.isLogin = false;
	}

	ready(callback) {
		var that = this;
		fs.readFile('access_token', 'utf8', (err, data) => {
			if(!err) {
				that.accessToken = data;
			}

			if (this.accessToken != '') {
				this.isLogin = true;
			}
			callback();
		});
	};

	createRequest(method, uri, formData) {
		var options = {
			method: method,
			url: 'http://mi.me/' + uri,
			headers: {
				accept: 'application/json',
			},
			formData: formData
		};
		if (this.isLogin) {
			options.headers.Authorization = 'Bearer ' + this.accessToken;
		}

		return new Promise((resolve, reject) => {
			request(options, function(err, res, body) {
				if (err) {
					reject(err);
				} else {
					var jsonData = JSON.parse(body);
					resolve(jsonData);
				}
			});
		});
	};

	login(username, password) {
		return this.createRequest('POST', 'oauth/token', { grant_type: 'password',
			client_id: '2',
			client_secret: 'WMdf5mmC6t63UlkDfGZ8xj6batEm0t5n8TLfUWbE',
			username: username,
			password: password
		});
	}	
}

module.exports = Matailmu;