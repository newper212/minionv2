const { connect } = require('react-redux');

const Page = require('../components/Page');

const {
  // rename
  renameInputUpdate,
  renameOutputUpdate,
  renameRun,
  renameStop,

  // download
  downloadBrandUpdate,
  downloadInputUpdate,
  downloadOutputUpdate,
  downloadRun,
  downloadStop,
} = require('../actions');

const App = connect(
  function mapStateToProps(state) {
    return {
      // rename
      renameInputValue: state.rename.input,
      renameOutputValue: state.rename.output,
      renameBarValue: state.rename.bar,

      renameRunning: state.rename.running,

      // download
      downloadBrandValue: state.download.brand,
      downloadInputValue: state.download.input,
      downloadOutputValue: state.download.output,
      downloadBarValue: state.download.bar,

      downloadRunning: state.download.running,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      // rename
      renameInputChange: (text) => dispatch(renameInputUpdate(text)),
      renameOutputChange: (text) => dispatch(renameOutputUpdate(text)),
      renameRun: () => dispatch(renameRun()),
      renameStop: () => dispatch(renameStop()),

      // download
      downloadBrandChange: (text) => dispatch(downloadBrandUpdate(text)),
      downloadInputChange: (text) => dispatch(downloadInputUpdate(text)),
      downloadOutputChange: (text) => dispatch(downloadOutputUpdate(text)),
      downloadRun: () => dispatch(downloadRun()),
      downloadStop: () => dispatch(downloadStop()),
    };
  }
)(Page);

module.exports = App;
