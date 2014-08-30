var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = window._ = require('lodash');

var TimeTableConstants = require('../constants/TimeTableConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var DateHelpers = require('../helpers/DateHelpers');

var ActionTypes = TimeTableConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _db = window._db = JSON.parse(window.localStorage.getItem('DB')) || {};

var current = 'jimdo';

var TimeStore = window.TimeStore = merge(EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    getWorkingTimeForDate: function (date) {
        var workingTime = 0;
        _db[current].forEach(function (entry) {
            if (entry.date == date) {
                console.log('found');
                workingTime = entry.workingTime;
            }
        });

        return {
            date: date,
            workingTime: workingTime
        };
    },

    getWeek: function (week) {
        var result = {
            week: week,
            sum: 0
        }

        var entries = DateHelpers.getDaysInWeek(week);

        var category = _db[current];

        result.entries = _.forEach(entries, function (entry) {
            var fromDB = _.find(category, {date: entry.date});
            if (fromDB) {
                entry.workingTime = fromDB.workingTime;
                result.sum += fromDB.workingTime;
            } else {
                entry.workingTime = 0;
            }
            return entry;
        });

        return result;
    },

    getCategory: function () {
        return current;
    },

    getCategories: function () {
        return Object.keys(_db);        
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

var _selectCategory = function (name) {
    if (_db[name]) {
        current = name;
    } else {
        _db[name] = [];
    }

    window.localStorage.setItem('DB', JSON.stringify(_db));
};

var _setWorkingTimeForDate = function (date, workingTime) {
    var found = false;
    _db[current] = _db[current].map(function (entry) {
        if (entry.date == date) {
            entry.workingTime = workingTime;
            found = true;
        }
        return entry;
    });

    if (!found) {

        _db[current].push({date: date, workingTime: workingTime})
    }

    window.localStorage.setItem('DB', JSON.stringify(_db));
};

var _calculateWeek = function () {
    var workingTime = 0;
    _db[current].forEach(function (task) {
        workingTime += task.workingTime;
    });
};

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

        case ActionTypes.SAVE:
            _setWorkingTimeForDate(action.date, action.workingTime);
            _calculateWeek();
            TimeStore.emitChange();
            break;

        case ActionTypes.SELECTCATEGORY:
            _selectCategory(action.name);
            break;

        default:
        // do nothing
    }

});

module.exports = TimeStore;
