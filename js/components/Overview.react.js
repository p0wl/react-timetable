/**
 * @jsx React.DOM
 */

var React = require('react');
var TimeStore = require('../stores/TimeStore');
var TimeTableActions = require('../actions/TimeTableActions');
var WorkingTimeHelpers = require('../helpers/WorkingTimeHelpers');

var Router = require('react-router-component');
var RouterMixin = Router.RouterMixin;

var Link = Router.Link

var getStateFromStores = function (week) {
    return TimeStore.getWeek(week);
};

var Overview = React.createClass({

    getInitialState: function() {
        console.log(this.props);
        TimeTableActions.setCategory(this.props.category);
        return getStateFromStores(this.props.week);
    },

    componentDidMount: function() {
        TimeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TimeStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getStateFromStores(this.state.week));
    },

    _onClickNextWeek: function () {
        var currentWeek = Number(this.state.week);
        this.setState(getStateFromStores(this.nextWeek()));
    },

    _onClickPreviousWeek: function () {
        this.setState(getStateFromStores(this.previousWeek()));
    },

    previousWeek: function () {
        var currentWeek = Number(this.state.week);
        return currentWeek == 1 ? 52 : currentWeek - 1;
    },

    nextWeek: function () {
        var currentWeek = Number(this.state.week);
        return (currentWeek + 1) % 52;
    },

    render: function() {
        var week = TimeStore.getWeek(this.state.week);

        var category = this.props.category

        var dayList = week.entries.map(function (entry) {
            var link = '/' + category + '/edit/' + entry.date;
            var workingTime = WorkingTimeHelpers.formatWorkingTime(entry.workingTime);

            var cssClassName = (entry.workingTime ? '' : 'empty ') + 'col-xs-3 text-center';

            return (
                <Link className="btn btn-default btn-lg btn-block" href={link}>
                    <div className='row'>
                        <div className="col-xs-6 text-center">
                            <b className="silenced">{entry.day}</b> {entry.formatted}
                        </div>
                        <div className={cssClassName}>
                            {workingTime.hours}h 
                        </div>
                        <div className={cssClassName}>
                            {workingTime.minutes}min
                        </div>
                    </div>
                </Link>
            )
        });

        var weekWorkingTime = WorkingTimeHelpers.formatWorkingTime(this.state.sum);

        var previousLink =  '/' + category + '/overview/' + this.previousWeek();
        var nextLink =  '/' + category + '/overview/' + this.nextWeek();

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-2">
                        <Link href={previousLink} onClick={this._onClickPreviousWeek} className="btn btn-nav"><span className="glyphicon glyphicon-chevron-left"></span></Link>
                    </div>
                    <div className="col-xs-9">
                        <h2>
                            {weekWorkingTime.hours}h {weekWorkingTime.minutes}min <small>Woche {this.state.week}</small>
                        </h2>
                    </div>
                    <div className="col-xs-1">
                        <Link href={nextLink} onClick={this._onClickNextWeek} className="btn btn-nav pull-right"><span className="glyphicon glyphicon-chevron-right"></span></Link>
                    </div>
                </div>
                <br />
                <div>
                    {dayList}
                </div>
            </div>
        );
    }

});

module.exports = Overview;
