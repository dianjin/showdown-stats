const getMapUrl = (perspective) => {
  var month = perspective.get('month')
  var leftPaddedMonth = month < 10 ? '0' + month : month + ''
  return '/static/' + [perspective.get('year'), leftPaddedMonth, perspective.get('tier')]
    .map((num) => num.toString()).join('-') + '.js'
}

export {
  getMapUrl
}
