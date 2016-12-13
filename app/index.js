// @flow
// 'use strict'; -> disabled to let flow work properly

// Wit includes
let Wit = require('node-wit').Wit;
let interactive = require('node-wit').interactive;

let _ = require('lodash');
let utilities = require('./utilities');

// Wit access token for the TravelHelper chat
const accessToken = '7LXX326XSRNCZ2ESA44QYOC6IMXRRC2J';

var actions:Object = {
  send (request:{sessionId:string, context:Object, entities:Object},
        response:{text:string, quickreplies:Object}) {
    const text:string = _.get(response, 'text');
    return new Promise((resolve, reject) => {
      if (text) {
        console.log(text);
      } else {
        console.log('The response contains a quick reply, we cannot manage it for now');
      }
      return resolve();
    });
  },

  merge ({context, entities}:{context: Object, entities:Object}) {
    return new Promise((resolve, reject) => {
      // we seek in all the attributes of the object, to load their value in the context
      context = utilities.loadEntitiesInContext(context, entities);

      return resolve(context);
    });
  },

  /** calculateDuration : given a start and an end date,
   *                      give the duration in days
   */
  calculateDuration ({context, entities}:{context: Object, entities: Object}) {
    return new Promise((resolve, reject) => {

      // Not enough data
      if (!context.travelEnd || !context.travelBegin) {
        context.error = 'one date is missing';
        return resolve(context);
      }

      try {
        var duration:number = utilities.getInterval(context.travelBegin, context.travelEnd);
        context.duration = duration;
        return resolve(context);
      } catch (error) {
        context.error = 'the begining is after the end';
        return resolve(context);
      }
    });
  }
};

const client:Wit = new Wit({accessToken, actions});
interactive(client);
