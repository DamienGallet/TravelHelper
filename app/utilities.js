// @flow
'use strict';

// General purpose includes
var moment = require('moment');
var _ = require('lodash');

var errorCode = {
  getInterval: {
    negativeInterval:1000
  }
}

// getInterval takes string corresponding of begining/end and
//             returns the number of day between them
var getInterval = function(rawBegining: string, rawEnd: string): number {
  const format = 'YYYY-MM-DD';
  // Because we just need the date, we just skip the hours
  var slicedBegining = rawBegining.substring(0,10);
  var slicedEnd = rawEnd.substring(0,10);

  var begining = moment(slicedBegining, format);
  var end = moment(slicedEnd, format);

  var differenceDays = end.diff(begining, 'days');

  if(differenceDays < 0) throw new RangeError(errorCode.getInterval.negativeInterval);

  return differenceDays;
};

// loadEntitiesInContext loads all the values of the entities in the context
var loadEntitiesInContext = function (context: Object, entities: Object): Object {
  console.log(entities);
  for (var key in entities) {
    console.log(key+' '+entities[key]);
    context = _.set(context,
                    key,
                    _.get(entities[key][0], 'value'));
  }
  return context;
};

module.exports = {
  getInterval: getInterval,
  loadEntitiesInContext: loadEntitiesInContext,
  errorCode: errorCode
};
