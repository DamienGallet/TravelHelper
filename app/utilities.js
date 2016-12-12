// @flow
'use strict';

// General purpose includes
var moment = require('moment');

var errorCode = {
  getInterval: {
    negativeInterval:1000
  }
}

// getInterval takes string corresponding of begining/end and
//             returns the number of day between them
var getInterval = function(rawBegining: string, rawEnd: string): number {
  const format = "YYYY-MM-DD";
  // Because we just need the date, we just skip the hours
  var slicedBegining = rawBegining.substring(0,10);
  var slicedEnd = rawEnd.substring(0,10);

  var begining = moment(slicedBegining, format);
  var end = moment(slicedEnd, format);

  var differenceDays = end.diff(begining, 'days');

  if(differenceDays < 0) throw new RangeError(errorCode.getInterval.negativeInterval);

  return differenceDays;
};

module.exports = {
  getInterval: getInterval,
  errorCode: errorCode
};
