var Header = React.createClass({
  render: function () {
    var innerli;
    if (this.props.index === this.props.selectedIndex) {
      innerli = <strong>{this.props.tab.title}</strong>;
    } else {
      innerli = this.props.tab.title;
    }
    return (
      <li onClick={this.props.changeSelectedIndex.bind(null, this.props.index)}>
        {innerli}
      </li>
    );
  }
});

var Tabs = React.createClass({
  getInitialState: function () {
    return {selectedIndex: 0};
  },
  changeSelectedIndex: function (index) {
    this.setState({selectedIndex: index});
  },
  render: function () {
    return (
      <ul>
      {
        this.props.tabs.map(function(tab, index) {
          return <Header tab={tab}
                  key={index}
                  index={index}
                  selectedIndex={this.state.selectedIndex}
                  changeSelectedIndex={this.changeSelectedIndex}
                 />
        }.bind(this))
      }
        <article>
          {this.props.tabs[this.state.selectedIndex].content}
        </article>
      </ul>
    );
  }
});


var tabs = [
  {
    "title": "Vic",
    "content": "Review the open weather API documentation. We'll use this API to get the weather based on our current location"
  },
  {
    "title": "Not Confusing at All",
    "content": "JAMAAL CHARLES"
  },
];

React.render(
  <Tabs tabs={tabs}/>,
  document.getElementById("tabs")
);
