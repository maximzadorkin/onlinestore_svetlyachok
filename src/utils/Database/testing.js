const {get, add, del, update} = require('./Positions')

const callback = (err, result) => console.log(result)
// add('продавец', callback)
// del({id: 2, Наименование: 'продавец'}, callback)
// update({id: 2, Наименование: 'продавец'}, callback)
get(callback)