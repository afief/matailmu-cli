#!/usr/bin/env node

var console = require('better-console');
var Matailmu = require('../lib/index.js');
var mi = new Matailmu();

var miLogin = require('./login.js')(mi);
var miJadwal = require('./jadwal.js')(mi);

mi.ready(() => {
	if (process.argv.length > 2) {
		var perintah = process.argv[2];
		var params = {};

		var _param = '';
		for (var i = 3; i < process.argv.length; i++) {
			if (process.argv[i].substr(0, 1) == '-') {
				_param = process.argv[i].substr(1);
			} else if (_param != '') {
				params[_param] = process.argv[i];
				_param == '';
			}
		}

		switch (perintah) {
			case 'login':
				if (!mi.isLogin) {
					miLogin.login();
				} else {
					console.log('Already Logged In');
				}
				break;
			case 'logout':
				if (mi.isLogin) {
					miLogin.logout();
				} else {
					console.log('Not Logged In');
				}
				break;
			case 'jadwal':
				if (mi.isLogin) {
					miJadwal.getJadwal();
				} else {
					console.log('Not Logged In');
				}
				break;
			default:
				console.log('Matailmu CLI');
			break;
		}
	}
});