function download(state = {
  // defaults
  brand: 'MNG',
  // input: '/Users/ismael/Desktop/excel/PLAN-DE-CARGA-MODABELLEZA-2018.xlsx',
  // output: '/Users/ismael/Desktop/images',
}, action) {
  switch (action.type) {
    case 'DOWNLOAD_BRAND_UPDATE':
      return {
        ...state,
        brand: action.text,
      };
    case 'DOWNLOAD_INPUT_UPDATE':
      return {
        ...state,
        input: action.text,
      };
    case 'DOWNLOAD_OUTPUT_UPDATE':
      return {
        ...state,
        output: action.text,
      };
    case 'DOWNLOAD_RUN':
      return {
        ...state,
        running: true,
      };
    case 'DOWNLOAD_STOP':
      return {
        ...state,
        running: false,
      };
    case 'DOWNLOAD_BAR_UPDATE':
      return {
        ...state,
        bar: action.value,
      };

    default:
      return state;
  }
}

module.exports = download;
