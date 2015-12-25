var nestBy = require('../index')

describe('nest by tuple', function () {
  it('works for arrays', function () {
    var list =
      [ { name: 'Marge', gender: 'f' },
        { name: 'Homer', gender: 'm' },
        { name: 'Bart', gender: 'm' } ]

    var result = nestBy(list, 'gender')

    expect(result).toEqual(
      { f:
        { property: 'f',
          values: [ { name: 'Marge', gender: 'f' } ] },
        m:
         { property: 'm',
           values:
           [ { name: 'Homer', gender: 'm' },
             { name: 'Bart', gender: 'm' } ] } })
  })

  it('works for objects', function () {
    var list =
      { marge: { name: 'Marge', gender: 'f' },
        homer: { name: 'Homer', gender: 'm' },
        bart: { name: 'Bart', gender: 'm' } }

    var result = nestBy(list, 'gender')

    expect(result).toEqual(
      { f:
        { property: 'f',
          values:
          { marge: { name: 'Marge', gender: 'f' } } },
        m:
        { property: 'm',
          values:
          { homer: { name: 'Homer', gender: 'm' },
            bart: { name: 'Bart', gender: 'm' } } } })
  })

  it('works for arrays, recursively', function () {
    var list =
      [ { name: 'Marge', gender: 'f' },
        { name: 'Homer', gender: 'm' },
        { name: 'Bart', gender: 'm' } ]

    var result = nestBy(list, 'gender', 'name')

    expect(result).toEqual({
      f: {
        property: 'f',
        values: {
          Marge: {
            property: 'Marge',
            values: [ { name: 'Marge', gender: 'f' } ]
          }
        }
      },
      m: {
        property: 'm',
        values: {
          Homer: {
            property: 'Homer',
            values: [ { name: 'Homer', gender: 'm' } ]
          },
          Bart: {
            property: 'Bart',
            values: [ { name: 'Bart', gender: 'm' } ]
          }
        }
      }
    })
  })

  it('works with functions', function () {
    var genders = { m: 'Male', f: 'Female' }

    var list =
      [ { name: 'Marge', gender: 'f' },
        { name: 'Homer', gender: 'm' },
        { name: 'Bart', gender: 'm' } ]

    var result = nestBy(list,
      (person) => [ person.gender, { genderName: genders[person.gender] } ])

    expect(result).toEqual(
      { f:
         { genderName: 'Female',
           values: [ { name: 'Marge', gender: 'f' } ] },
        m:
         { genderName: 'Male',
           values:
            [ { name: 'Homer', gender: 'm' },
              { name: 'Bart', gender: 'm' } ] } })
  })
})
