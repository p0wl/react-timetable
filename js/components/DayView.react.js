/**
 * @jsx React.DOM
 */

var React = require('react');
var TimeStore = require('../stores/TimeStore');
var NumberInput = require('./NumberInput.react');

var DateHelpers = require('../helpers/DateHelpers');

var Link = require('react-router-component').Link

var getStateFromStores = function (date) {
    return TimeStore.getWorkingTimeForDate(date);
};

var DayView = React.createClass({

    getInitialState: function() {
        return getStateFromStores(this.props.date);
    },

    componentDidMount: function() {
        TimeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TimeStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    },

    render: function() {
        var output = DateHelpers.getDateFormatted(this.state.date);
        var cat = TimeStore.getCategory();

        var overviewLink = '/' + cat + '/overview/' + DateHelpers.getWeek(this.state.date);
        console.log(overviewLink);

        return (
            <div className="container-fluid">
                <h2><small>{output.day} </small>{output.date}</h2>
                <br />
                <NumberInput overviewLink={overviewLink} date={this.state.date} />
            </div>
        );
    }

});

module.exports = DayView;
