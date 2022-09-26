function formatDate (timestamp, format = 'YYYY-MM-dd HH:mm:ss') {
  let time = new Date(timestamp)
  // 获取年月日时分秒，使用es6 padStart补0
  let year = time.getFullYear()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const date = (time.getDate()).toString().padStart(2, '0')
  const hours = (time.getHours()).toString().padStart(2, '0')
  const minute = (time.getMinutes()).toString().padStart(2, '0')
  const second = (time.getSeconds()).toString().padStart(2, '0')

  // 替换时间格式
  format = format
  .replace('YYYY', year)
  .replace('MM', month)
  .replace('dd', date)
  .replace('HH', hours)
  .replace('mm', minute)
  .replace('ss', second)

  return format
}

export {
  formatDate
}