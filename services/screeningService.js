const screeningData = require('../data/screeningData');

exports.create = (data) => screeningData.createAndReduceSeats(data);
