var test = require('tape')
var hashToArray = require('./index.js')

function deepEqual(description, obj, expected) {
	test(description, function (t) {
		var result = hashToArray(obj)
		t.equal(result.length, expected.length, 'lengths are equal')
		expected.forEach(function (r, i) {
			t.notEqual(result.indexOf(r), -1, typeof r + ' "' + r + '" found in new array')
			t.equal(i%2, result.indexOf(r)%2,
				'both things are ' + (i%2? 'values' : 'arguments'))
		})
		t.end()
	})
}

// Basic argument building

deepEqual('short arguments', {
	x: 2,
	v: 50,
	j: 'hello'
}, [
	'-x', 2,
	'-v', 50,
	'-j', 'hello'
])

deepEqual('long arguments', {
	rate: 48000,
	bits: 'mp3'
}, [
	'--bits', 'mp3',
	'--rate', 48000
])

// Special cases

deepEqual('boolean values', {
	thingy: true,
	anotherthingy: false,
	kool: 'lol',
	trixy: 'true'
}, [
	'--thingy',
	'anotherthingy',
	'--kool', 'lol',
	'--trixy', 'true'
])

deepEqual('boolean value edge cases', {
	dashes: false,
	'': true,
	'-': false
}, [
	'dashes',
	'--',
	'-'
])

deepEqual('array-like object', {
	0: 8,
	1: false,
	length: 2
}, [
	'-0', 8,
	'1',
	'--length', 2
])

function passThru(t, expected) {
	var found = hashToArray(expected)
	t.deepEqual(expected, found, typeof expected + ':' + expected + ' passes through unmodified')
}

function arrayified(t, expected) {
	var found = hashToArray(expected)[0]
	t.deepEqual(expected, found, typeof expected + ':' + expected + ' is in an array')
}

test('non arrays turn into arrays; arrays pass through unmodified', function (t) {
	passThru(t, ['array', {}, 'haz object'])
	passThru(t, [['wat']])
	arrayified(t, 7)
	arrayified(t, null)
	arrayified(t, 'heh heh heh')
	arrayified(t, true)
	t.end()
})

