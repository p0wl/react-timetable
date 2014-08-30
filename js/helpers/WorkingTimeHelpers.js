module.exports = {
    formatWorkingTime: function (workingTime) {
        var minutes = workingTime % 60;	
        var hours = (workingTime - minutes) / 60;

        return {
        	minutes: minutes,
        	hours: hours
        };
    }
};
