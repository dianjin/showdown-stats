const toOption = (number) => {
  return {
    value: number,
    label: number.toString()
  }
}

const tiers = [0, 1500, 1630, 1760].map(toOption)
const years = [2016].map(toOption)
const months = [1, 2, 3, 4, 5, 6, 7].map(toOption)

export {
  tiers, months, years
}
