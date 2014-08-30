/**
 * @jsx React.DOM
 */

var React = require('react');
var TimeStore = require('../stores/TimeStore');
var DateHelpers = require('../helpers/DateHelpers');

var Link = require('react-router-component').Link

var getStateFromStores = function () {
    return {
        categories: TimeStore.getCategories()
    };
};

var HomeView = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
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
        var categoryList = this.state.categories.map(function (cat) {
            var link = "/" + cat + "/overview/" + DateHelpers.getWeek();
            return (
                <li>
                    <Link href={link} className="btn btn-default btn-lg btn-block">{cat}</Link>
                </li>
            )
        });


        return (
            <div className="container">
                <h1>Kategorien</h1>
                <ul className="nav nav-pills nav-stacked">
                    {categoryList}
                </ul>

                <br />
                <Link href='/create' className="btn btn-default btn-lg btn-block btn-nobg">Kategorie erstellen</Link>

            </div>
        );
    }

});

module.exports = HomeView;
