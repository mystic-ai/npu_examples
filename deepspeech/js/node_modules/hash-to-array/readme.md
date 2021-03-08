# hash-to-array

[![Build Status](https://travis-ci.org/ArtskydJ/hash-to-array.svg)](https://travis-ci.org/ArtskydJ/hash-to-array)

Turns an arg hash into an array of arguments. Useful when running command line apps with child_process.

Like [minimist](https://github.com/substack/minimist) in reverse.

# examples

Please note that these examples are not good real-world use-cases. There are much better ways of accomplishing what is shown in these examples!

rm -rf dir:
```node
var hashToArray = require('hash-to-array')
var spawn = require('child_process').spawn

var args = hashToArray({
	r: true,
	f: true,
	'/lolz/moar/lol': false
}) //=> [ '-r', '-f', '/lolz/moar/lol' ]
spawn('rm', args)
```

mkdir -p dir:
```node
var hashToArray = require('hash-to-array')
var spawn = require('child_process').spawn

spawn('mkdir', hashToArray({p: true})) //=> [ '-p' ]
```

browserify:
```node
var hashToArray = require('hash-to-array')
var spawn = require('child_process').spawn

var args = hashToArray({
	'myModule.js': false,
	d: true,
	outfile: './bundle.js'
}) //=> [ 'myModule.js', '-d', '--outfile', './bundle.js' ]
spawn('browserify', args)
```

# usage

## `var arr = hashToArray(hash)`

- `hash` is a map of the input arguments and their corresponding values.
	- If it is already an array, it returns it.
	- If it is not an object, it stuffs it into an array. E.g. `7` -> `[7]`
- **Returns** `arr`.

<!-- js
var hashToArray = require('./')
-->

```js
// Objects are transformed into arrays
hashToArray({ your: 'name' }) // => [ '--your', 'name' ]
hashToArray({ hello: true })  // => [ '--hello' ]
hashToArray({ hello: false })  // => [ 'hello' ]
hashToArray({ 0: 8, 1: false, length: 2 }) // => [ '-0', 8, '1', '--length', 2 ]

// Arrays are unmodified
hashToArray([ '-o', 'two.txt' ]) // => [ '-o', 'two.txt' ]

// Other things are stuffed into arrays
hashToArray('hi there') // => [ 'hi there' ]
hashToArray(17) // => [ 17 ]

hashToArray({
    username: 'joseph',
    password: 'lolwut',
    'debug-level': 12
}) // => [ '--username', 'joseph', '--password', 'lolwut', '--debug-level', 12 ]
```

Note that boolean values do not get pushed to the array. They signify the presence of prepended dashes. (See examples.)

# install

With [npm](https://nodejs.org/download) do:

	npm install hash-to-array

# license

[MIT](https://choosealicense.com/licenses/mit/)
