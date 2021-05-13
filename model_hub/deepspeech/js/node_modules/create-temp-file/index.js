var fs = require('fs')
var tempfile = require('tempfile')

module.exports = function constructor(pathGenerator) {
	if (!pathGenerator) pathGenerator = tempfile
	return function createWriteStream(params) {
		var path = pathGenerator(params)
		var writeStream = fs.createWriteStream(path)

		writeStream.path = path

		writeStream.cleanup = function cln(cb) {
			writeStream.end()
			fs.unlink(path, function (err) {
				if (err) writeStream.emit('error', err)
				if (cb) cb(err)
			})
		}

		writeStream.cleanupSync = function clnSnc() {
			writeStream.end()
			try {
				fs.unlinkSync(path)
			} catch (err) {
				writeStream.emit('error', err)
			}
		}

		return writeStream
	}
}
