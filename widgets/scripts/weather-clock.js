var Clock = React.createClass({
  getInitialState: function () {
    return {date: new Date()};
  },
  componentDidMount: function () {
    this.intervalId = setInterval(this._tick, 1000);
  },
  _tick: function () {
    var currentDate = this.state.date;
    currentDate.setSeconds(currentDate.getSeconds() + 1);
    this.setState({date: currentDate});
  },
  render: function () {
    return <p>{this.state.date.toString()}</p>;
  }
});

var Weather = React.createClass({
  getInitialState: function () {
    return {received: false, weatherData: {main: {temp: 273}}};
  },
  componentDidMount: function () {
    navigator.geolocation.watchPosition(function (position) {
      this.position = position;
      this.loadWeatherData();
    }.bind(this));
  },
  loadWeatherData: function () {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if(xmlhttp.status == 200){
             this.setState({received: true, weatherData: JSON.parse(xmlhttp.responseText)});
           }
           else if(xmlhttp.status == 400) {
              console.log('There was an error 400')
           }
           else {
              alert('something else other than 200 was returned')
           }
        }
    }.bind(this);
    var lat = this.position.coords.latitude;
    var lon = this.position.coords.longitude;
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat={"
                                                        + lat + "&lon=" + lon;

    xmlhttp.open("GET", weatherURL, true);
    xmlhttp.send();
  },
  render: function () {
    var weatherStr;
    if (this.state.received) {
      weatherStr = (
        <div>
          <p>Current Weather: {this.state.weatherData.weather}</p>
          <p>Current Temp: {this.state.weatherData.main.temp - 273} C</p>
        </div>
      );
    } else {
      weatherStr = <div>Loading Weather...</div>;
    }
    return (
      <div>
        {weatherStr}
      </div>
    );
  }
});

var WeatherClock = React.createClass({
  render: function () {
    return (
      <div>
        <Clock/>
        <Weather/>
      </div>
    );
  }
});

React.render(
  <WeatherClock/>,
  document.getElementById('weather')
);
