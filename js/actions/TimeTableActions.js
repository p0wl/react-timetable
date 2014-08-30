var TimeTableConstants = require('../constants/TimeTableConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = TimeTableConstants.ActionTypes;

module.exports = {

  remember: function(date, workingTime) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SAVE,
      date: date,
      workingTime: workingTime
    });
  },

  setCategory: function (name) {
  	AppDispatcher.handleViewAction({
  		type: ActionTypes.SELECTCATEGORY,
  		name: name
  	});
  },

  createCategory: function (name) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SELECTCATEGORY,
      name: name
    });
  }
};
