/**
 * truncate a string
 * 切割 字符串
 */

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  }
  return str;
}

let res = truncateString("A-tisket a-tasket A greem and yellow basket", 8);
console.log(res)

