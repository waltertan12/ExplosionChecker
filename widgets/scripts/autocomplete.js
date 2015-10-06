var AutoComplete = React.createClass({
  getInitialState: function () {
    return {input: ""};
  },
  handleKeystroke: function (e) {
    this.setState({input: e.target.value});
  },
  handleClick: function (e) {
    this.setState({input: e.target.innerHTML});
  },
  render: function () {
    return (
      <div>
        Search Name
        <br/>
        <input className="text"
               onChange={this.handleKeystroke}
               value={this.state.input}/>
        <ul>
         {
          this.props.names.map(function (name, idx) {
            var input = this.state.input.toLowerCase();
            var regex = new RegExp(input);
            if (input !== "" && name.toLowerCase().match(regex)) {
              return <li onClick={this.handleClick} key={idx}>{name}</li>;
            }
          }, this)
         }
        </ul>
      </div>
    );
  }
});

var nameObject = {
  names: [
    "Walter",
    "Jamaal",
    "Knowshown",
    "Vic",
    "AP",
    "LT",
    "Desean",
    "Pierre",
    "Devonta"
  ]
};

React.render(
  <AutoComplete names={nameObject.names} />,
  document.getElementById('autocomplete')
);
