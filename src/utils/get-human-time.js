export default time => {
  if (!time || time < 0) return '-'
  let seconds = time % 60
  time = (time / 60) >> 0
  let minutes = time % 60
  time = (time / 60) >> 0
  const hours = time % 24
  const days = (time / 24) >> 0
  return [
    days && `${days}d`,
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    `${seconds}s`
  ]
    .filter(x => x)
    .join(' ')
}
