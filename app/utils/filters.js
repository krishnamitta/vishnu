export const startsWithFilter = (input, item) => {
  return item.match(new RegExp(`^${input}`, 'i'))
}
