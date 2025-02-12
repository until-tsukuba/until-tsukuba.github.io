function format(str) {
  return ('00' + str).slice(-2);
}
export default function(date) {
  var formatted_date = "";
  formatted_date += date.getUTCFullYear();
  formatted_date += format(date.getUTCMonth() + 1);
  formatted_date += format(date.getUTCDate())
  formatted_date += "T"
  formatted_date += format(date.getUTCHours());
  formatted_date += format(date.getUTCMinutes());
  formatted_date += format(date.getUTCSeconds());
  formatted_date += "Z"
  return formatted_date
}
