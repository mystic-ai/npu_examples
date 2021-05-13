var test = require('tape')
var fs = require('fs')
var createTempFile = require('../')
require('string.prototype.startswith')
require('string.prototype.endswith')

function ctf(ext) {
	var ws = createTempFile()(ext)
	ws.on('error', function (err) {
		throw err
	})
	return ws
}


test('write stream works', function (t) {
	t.plan(2)
	var ws = ctf()
	fs.createReadStream(__dirname + '/do-not-change.txt')
		.pipe(ws)
		.on('finish', testWS)

	function testWS() {
		fs.readFile(ws.path, { encoding: 'utf8' }, function (err, string) {
			t.notOk(err, err ? err.message : 'no error')
			t.ok(string.startsWith('do not delete or change this file'), 'strings match')
			ws.cleanupSync()
			t.end()
		})
	}
})

test('extension', function (t) {
	t.plan(1)
	var ws = ctf('.txt')
	t.notEqual(ws.path.indexOf('.txt'), -1, 'file extension is ".txt"')
	ws.end('lolz')
	ws.cleanupSync()
	t.end()
})

function errorHandling(method) {
	var codes = [ 'EPERM', 'ENOENT' ]
	return function errhandle(t) {
		var ws = createTempFile()()
		ws.on('error', function (e) {
			t.notEqual(codes.indexOf(e.code), -1, 'Got ' + codes.join('/') + ' error')
			t.end()
		})
		setTimeout(function () {
			try {
				fs.unlinkSync(ws.path)
			} catch (e) {
				t.fail(String(e))
			}
			setTimeout(ws[method], 10)
		}, 10)
	}
}
test('error handling sync', errorHandling('cleanupSync'))
test('error handling async', errorHandling('cleanup'))

test('cleanupSync() works', function (t) {
	t.plan(3)

	var ws = ctf()
	ws.end('lolz')

	setTimeout(function () { //timeout makes this test much more robust
		t.ok(fs.existsSync(ws.path), 'created file')
		t.doesNotThrow(ws.cleanupSync)
		t.notOk(fs.existsSync(ws.path), 'cleanupSync() deleted the file')
		t.end()
	}, 0)
})

test('cleanup() works', function (t) {
	t.plan(3)

	var ws = ctf()
	ws.end('lolz')

	setTimeout(function () { //timeout makes this test much more robust
		t.ok(fs.existsSync(ws.path), 'created file')
		ws.cleanup(function (err) {
			t.notOk(err, err ? err.message : 'no error during cleanup()')
			t.notOk(fs.existsSync(ws.path), 'cleanup() deleted the file')
			t.end()
		})
	}, 0)
})

function callsEnd(method) {
	return function(t) {
		t.plan(1)
		var ws = ctf()
		ws.on('finish', function () {
			t.pass('ws.end() was called')
			t.end()
		})
		ws.write('lolz')
		setTimeout(ws[method], 0)
	}
}
callsEnd('what')
test('ws.end is called when cleanup is called and stream is still going', callsEnd('cleanup'))
test('ws.end is called when cleanupSync is called and stream is still going', callsEnd('cleanupSync'))

test('Path generator options', function (t) {
	t.plan(1)
	var ws = createTempFile(String)('./hello.txt')
	t.ok(ws.path.endsWith('hello.txt'), 'filename is "hello.txt"')
	ws.end('lolz')
	ws.cleanupSync()
	t.end()
})
