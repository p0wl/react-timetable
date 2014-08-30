/**
 * @jsx React.DOM
 */

var React = require('react');
var TimeTableActions = require('../actions/TimeTableActions');
var TimeStore = require('../stores/TimeStore');
var WorkingTimeHelpers = require('../helpers/WorkingTimeHelpers');

var Link = require('react-router-component').Link

var ENTER_KEY_CODE = 13;

function getStateFromStores(date) {
    return TimeStore.getWorkingTimeForDate(date);
}

var NumberInput = React.createClass({

    props: {
        date: React.PropTypes.string,
        overviewLink: React.PropTypes.string
    },

    getInitialState: function () {
        return getStateFromStores(this.props.date);
    },

    render: function () {
        var workingTime = this.state.workingTime;
        var formatted = WorkingTimeHelpers.formatWorkingTime(workingTime);
        
        return (
            <div>
                <input
                className="form-control"
                type="number"
                defaultValue={formatted.hours || null}
                onChange={this._onChange}
                placeholder="Stunden"
                ref="hour" />
                
                <br />

                <input
                className="form-control"
                type="number"
                defaultValue={formatted.minutes || null}
                onChange={this._onChange}
                placeholder="Minuten"
                ref="minute" />

                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6">
                            <Link href={this.props.overviewLink} onClick={this._save} className="btn btn-block btn-default btn-lg">Speichern</Link> 
                        </div>
                        <div className="col-xs-6">
                            <a onClick={this._onReset} className="btn btn-block btn-default btn-lg">Reset</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _onChange: function (event, value) {
        var hours = Number(this.refs.hour.getDOMNode().value);
        var minutes = Number(this.refs.minute.getDOMNode().value);
        this.setState({workingTime: (hours * 60 + minutes)});
    },

    _onReset: function () {
        this.refs.hour.getDOMNode().value = '';
        this.refs.minute.getDOMNode().value = '';
        this.setState({workingTime: 0});
    },

    _save: function ()  {
        if (this.state.workingTime) {
            TimeTableActions.remember(this.state.date, this.state.workingTime);
        }
    }
});

module.exports = NumberInput;
