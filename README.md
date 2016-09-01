# level-json-coerce-null

[![build status](https://secure.travis-ci.org/smallhelm/level-json-coerce-null.svg)](https://travis-ci.org/smallhelm/level-json-coerce-null)

db.put(key, undefined....) will give you problems. This codec fixes it.

It simply coerces undefined to null so it will encode properly. Note that when it decodes it will be null instead of undefined.

To use it, simply change
```js
var db = level(... {
  valueEncoding: "json"
})
```
To this
```js
var db = level(... {
  valueEncoding: require("level-json-coerce-null")
})
```

## Rant
It's quite annoying that javascript has 2 ways of representing "nothing".
 * `null` - an object that is meant to represent nothing
 * `undefined` - the true nothing (it's also a re-assignable identifier)

WAT!

## License
MIT
