// @flow
'use strict';

// Wit includes
let Wit = require('node-wit').Wit;
let interactive = require('node-wit').interactive;

let utilities = require('./utilities');

// Wit access token for the TravelHelper chat
const accessToken = '7LXX326XSRNCZ2ESA44QYOC6IMXRRC2J';

var actions = {
  send (request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise((resolve, reject) => {
      if(text) {
        console.log(response.text);
        console.log(JSON.stringify(response));
        console.log(request);
      } else {
        console.log('The response contains a quick reply, we cannot manage it for now');
      }
      return resolve();
    });
  },

  merge ({context, entities}) {
    return new Promise((resolve, reject) => {
      Object.assign(context, entities);
      return resolve(context);
    });
  },
  // calculateDuration : given a start and an end date,
  //                     give the duration in days
  calculateDuration ({context, entities}) {
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(entities));
      if(!entities.travelEnd || !entities.travelBegin) {
        context.error = "one date is missing";
        return resolve(context);
      }
      try {
        duration = utilities.getInterval(entities.travelBegin, entities.travelEnd);
        context.duration = duration;
        return resolve(context);
      } catch(error) {
        context.error = "the begining is after the end";
        return resolve(context);
      };

    });
  }
};

const client = new Wit({accessToken, actions});
interactive(client);
