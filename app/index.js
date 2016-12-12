'use strict';

let Wit = require('node-wit').Wit;
let interactive = require('node-wit').interactive;

const accessToken = '7LXX326XSRNCZ2ESA44QYOC6IMXRRC2J';

/*const readlineModule = require('readline');

const readline = readlineModule.createInterface({
  input: process.stdin,
  output: process.stdout
});

var question = 'Should we start ?';
readline.question(question,
                  (answer) => {
                    console.log('Let\'s go !');
                  });*/

var actions = {
  send (request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise((resolve, reject) => {
      console.log(response.text);
      return resolve();
    });
  },
  calculateDuration ({context, entities}) {
    return new Promise((resolve, reject) => {
      context.duration = 15;
      return resolve(context);
    });
  }
};

const client = new Wit({accessToken, actions});
interactive(client);
