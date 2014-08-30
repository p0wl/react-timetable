/**
 * @jsx React.DOM
 */

var React = require('react');
var TimeTableActions = require('../actions/TimeTableActions');

var Link = require('react-router-component').Link

var getStateFromStores = function () {
    return {};
};

var CreateView = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    render: function() {
        
        return (
            <div className="container">
                <h1>Kategorie erstellen</h1>

                <input className="form-control" type="text" placeholder="Name" ref="name" />
                <br />
                <br />
                <Link href='/' onClick={this._onSubmit} className="btn btn-default btn-lg btn-block">Kategorie erstellen</Link>

            </div>
        );
    },

    _onSubmit: function (event, value) {
        var name = this.refs.name.getDOMNode().value;
        TimeTableActions.createCategory(name);
    },


});

module.exports = CreateView;
