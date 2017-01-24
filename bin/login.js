var console = require('better-console');
var read = require('read');
var fs = require('fs');

module.exports = function (matailmu) {
	return {
		login: function() {
			var credential = {username: '', password: ''};

			read({prompt: "Username : ", default: ""}, function(err, username) {
				read({prompt: "Password : ", default: "", silent: true, replace: '*'}, function(err, password) {
					credential.username = username;
					credential.password = password;
					doLogin();
				});
			});

			function doLogin() {
				matailmu.login(credential.username, credential.password).then(function(res) {
					if (res.access_token) {
						fs.writeFile('access_token', res.access_token, (err) => {
							if (err)
								console.log('Login Failed');
							else
								console.log('Login Sukses');
						});
					} else if (res.message) {
						console.log(res.message);
					} else {
						console.log('Gagal Login');
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		logout: function() {
			fs.writeFile('access_token', '', (err) => {
				console.log('SUKSES LOGOUT');
			});
		}
	}
}