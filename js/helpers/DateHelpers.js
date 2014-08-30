
var moment = require('moment');

require('moment/locale/de');
moment.locale('de', {
    week : {
        dow : 1
    }
});

module.exports = window.DateHelpers = {

    getWeek: function (date) {
        if (!date) {
            date = new Date();
        }
        return moment(date).isoWeek();
    },

    isDateInWeek: function (date, week) {
        return moment(date).isoWeek() == week;
    },

    getDaysInWeek: function (week) {
        if (!week) {
            week = moment().isoWeek();
        }
        var thisWeek = moment().isoWeek(week);
        var result = [];
        [1,2,3,4,5,6,7].forEach(function (day) {
            var date = thisWeek.isoWeekday(day)
            result.push({
                date: date.format('YYYY-MM-DD'),
                formatted: date.format('DD.MM'),
                day: date.format('dd')
            })
        });

        return result;
    },

    getDateFormatted: function (date) {
        return {
            date: moment(date).format('DD.MM'),
            day: moment(date).format('dd')
        };
    }
};
