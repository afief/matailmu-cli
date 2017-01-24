var console = require('better-console');

module.exports = function (matailmu) {
	return {
		getJadwal: function() {
			matailmu.createRequest('GET', 'api/guru/jadwal').then(function(res) {
				var jadwals = [['Hari', 'Waktu', 'Siswa', 'Jenjang', 'Pelajaran']];
				res.data.forEach( (val, index) => {
					jadwals.push([val.day.name, val.time, val.siswa.name, val.siswa.jenjang_name, val.siswa.pelajaran_name]);;
				});
				console.table(jadwals);
			}, function(err) {
				console.warn(err);
			}).catch((err) => {
				console.warn(err);
			});
		}
	}
}