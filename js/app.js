/**
 * @jsx React.DOM
 */

var DayView = require('./components/DayView.react');
var HomeView = require('./components/HomeView.react');
var Overview = require('./components/Overview.react');
var CreateView = require('./components/CreateView.react');
var React = require('react');
var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var Controller = React.createClass({

  render: function() {
    return (
      <Locations>
        <Location path="/" handler={HomeView} />
        <Location path="/:category/overview/:week" handler={Overview} />
        <Location path="/:category/edit/:date" handler={DayView} />
        <Location path="/create" handler={CreateView} />
        <NotFound handler={HomeView} />
      </Locations>
    )
  }
});

React.renderComponent(<Controller />, document.getElementById('react'));
