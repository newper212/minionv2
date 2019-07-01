function rename(state = {}, action) {
  switch (action.type) {
    case 'RENAME_INPUT_UPDATE':
      return {
        ...state,
        input: action.text,
      };
    case 'RENAME_OUTPUT_UPDATE':
      return {
        ...state,
        output: action.text,
      };
    case 'RENAME_RUN':
      return {
        ...state,
        running: true,
      };
    case 'RENAME_STOP':
      return {
        ...state,
        running: false,
      };
    case 'RENAME_BAR_UPDATE':
      return {
        ...state,
        bar: action.value,
      };

    default:
      return state;
  }
}

module.exports = rename;
