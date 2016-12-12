'use strict';

// Wit includes
let Wit = require('node-wit').Wit;
let interactive = require('node-wit').interactive;

// General purpose includes
var moment = require('moment');

// Wit access token for the TravelHelper chat
const accessToken = '7LXX326XSRNCZ2ESA44QYOC6IMXRRC2J';

var actions = {
  send (request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise((resolve, reject) => {
      if(text) {
        console.log(response.text);
        console.log(response)
      } else {
        console.log('The response contains a quick reply, we cannot manage it for now');
      }
      return resolve();
    });
  },

  // calculateDuration : given a start and an end date,
  //                     give the duration in days
  calculateDuration ({context, entities}) {
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(entities));
      return resolve(context);
    });
  }
};

const client = new Wit({accessToken, actions});
interactive(client);
