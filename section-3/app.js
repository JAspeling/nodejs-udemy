var chalk = require('chalk');

console.log(chalk.green("Success!"));

console.log(chalk.default.inverse.green('Some inverse text'));
console.log(chalk.default.italic.green("And this is italic"), chalk.default.bold.green("How interesting"));