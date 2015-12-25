# nest-by-tuple

> Groups an array/object by property values or callback and supports additional metadata

Works like [nest-by], but allows you to embed more metadata.
Also see [group-by] or [lodash.groupBy].

[![Status](https://travis-ci.org/rstacruz/nest-by-tuple.svg?branch=master)](https://travis-ci.org/rstacruz/nest-by-tuple "See test builds")

[nest-by]: https://github.com/rstacruz/nest-by
[group-by]: https://www.npmjs.com/package/group-by
[lodash.groupBy]: https://lodash.com/docs#groupBy

## Usage

```js
nestByTuple(object or array, property, [...properties])
```

`property` is typically a function that returns an array in the structure of:

> `[ indexString, metadata ]`

Where `indexString` is a string that the group will be indexed by, and
`metadata` will be an Object that has data about that group.

## Arrays

```js
genders = { m: 'Male', f: 'Female' }

list =
  [ { name: 'Marge', gender: 'f' },
    { name: 'Homer', gender: 'm' },
    { name: 'Bart', gender: 'm' } ]

result = nestByTuple(list,
  (person) => [ person.gender, { genderName: genders[person.gender] } ])

//  f:
//    genderName: 'Famale',
//    values: [ { name: 'Marge', gender: 'f' } ]
//  m:
//    genderName: 'Male',
//    values: [
//     { name: 'Homer', gender: 'm' },
//     { name: 'Bart', gender: 'm' } ]
```

## Objects

```js
list =
  { marge: { name: 'Marge', gender: 'f' },
    homer: { name: 'Homer', gender: 'm' },
    bart: { name: 'Bart', gender: 'm' } }

var result = nestBy(list,
  (person) => [ person.gender, { genderName: genders[person.gender] } ])

//  f:
//    genderName: 'Famale',
//    values: 
//      marge: { name: 'Marge', gender: 'f' }
//  m:
//    genderName: 'Male',
//    values:
//      homer: { name: 'Homer', gender: 'm' }
//      bart: { name: 'Bart', gender: 'm' }
```

## Recursive

Yes, recursion is supported by passing in more `property` parameters.

## Thanks

**nest-by-tuple** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/nest-by-tuple/contributors
