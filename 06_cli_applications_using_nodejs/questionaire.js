'use strict';
const readline = require('readline');

module.exports = (config, questions, cb) => {
  var i = 0;
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ask = i => {
    if (!questions[i]) {
      rl.close();
      cb();
      return;
    }

    if (!config[questions[i].key]) {
      rl.question(questions[i].question, answer => {
        config[questions[i].key] = answer;
        console.log(config);
        ask(++i);
      });

    } else {
      ask(++i);
    }
  }
  ask(i);
}
