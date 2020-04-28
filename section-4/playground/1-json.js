const fs = require('fs');

const content = fs.readFileSync('data.json').toString();

console.log(content);

const object = JSON.parse(content);

object.name = 'Johan';
object.age = '29';

console.log('Modified data', object);

fs.writeFileSync('data.json', JSON.stringify(object));