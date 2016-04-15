const upTriangle = String.fromCharCode(9650)
const downTriangle = String.fromCharCode(9660)
const upArrow = String.fromCharCode(8593)
const downArrow = String.fromCharCode(8595)
const emptyStar = String.fromCharCode(9734)
const fullStar = String.fromCharCode(9733)

const padMonth = (month) => {
  return month < 10 ? '0' + month : month + ''
}

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
  padMonth,
  upArrow,
  downArrow,
  upTriangle,
  downTriangle,
  emptyStar,
  fullStar,
  capitalize
}
