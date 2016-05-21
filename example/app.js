require('../src/less/input-moment.less');
require('./app.less');
require('./react-select.less');

var moment = require('moment-timezone');
var React = require('react');
var ReactDOM = require('react-dom');
var InputMoment = require('../src/input-moment');
var timezones = require('./timezones');

var Select = require('react-select');

var options = timezones.map(item => ({value: item, label: item}));

var App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      m: moment(),
      timezone: 'America/Los_Angeles'
    };
  },

  render() {
    const m = moment(this.state.m);
    const mtz = moment(this.state.m).tz(this.state.timezone);

    return (
      <div className="app">
        <h1 className="app-name">Time Converter</h1>
        <form>
          <h4>Timezone:</h4>
          <Select
            name="form-field-name"
            value={this.state.timezone}
            options={options}
            onChange={this.handleTZChange}
          />
          <div className="input">
            <h4>{this.state.timezone}:</h4>
            <input
              className="input"
              type="text"
              value={mtz.format('llll ZZ (HH:mm)')}
            />
            <h4>Browser time:</h4>
            <input
              className="input"
              type="text"
              value={this.state.m.format('llll ZZ (HH:mm)')}
              readOnly
            />
            <h4>UTC:</h4>
            <input
              className="input"
              type="text"
              value={m.utc().format('llll ZZ (HH:mm)')}
              readOnly
            />
            <hr />
            <input
              className="input"
              type="text"
              value={this.state.m.format('X')}
              readOnly
            />
          </div>
          <hr />
          <InputMoment
            moment={this.state.m}
            onChange={this.handleTimeChange}/>
        </form>
      </div>
    );
  },

  handleTimeChange(m) {
    this.setState({m: m});
  },

  handleTZChange(option) {
    this.setState({timezone: option.value});
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
