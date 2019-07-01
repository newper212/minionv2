const { createElement, Component } = require('react');

class Tabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTabIndex: 0
    };
  }

  handleControlClick(tabIndex) {
    this.setState((prevState) => ({ currentTabIndex: tabIndex }));
  }

  render() {
    const { children } = this.props;

    return createElement('div', { className: 'tabs' }, [

      createElement('div', { className: 'tabs-controls' },
        children.map((tab, tabIndex) => {
          return createElement('div', {
            className: 'tabs-control' + (tabIndex == this.state.currentTabIndex ? ' active' : ''),
            onClick: () => this.handleControlClick(tabIndex),
          }, tab.control);
        })
      ),

      createElement('div', { className: 'tabs-contents' },
        children.map((tab, tabIndex) => {
          return createElement('div', {
            className: 'tabs-content' + (tabIndex == this.state.currentTabIndex ? ' active' : ''),
          }, tab.content);
        })
      ),

    ]);
  }

}

module.exports = Tabs;
