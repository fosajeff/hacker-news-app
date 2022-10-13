import _ from "lodash";

export function unixDateToTimeAgo(unixDate) {
  const now = new Date(Date.now());
  const date = new Date(unixDate * 1000);
  const difftime = now.getTime() - date.getTime();
  const diffDate = new Date(difftime - 5.5 * 60 * 60 * 1000);
  const [sec, min, hr, day, month] = [
    diffDate.getSeconds(),
    diffDate.getMinutes(),
    diffDate.getHours(),
    diffDate.getDate() - 1,
    diffDate.getMonth(),
  ];
  const f = (property, end) => {
    // console.log(property,end)
    return `${property} ${end}${property > 1 ? "s" : ""} ago`;
  };
  // console.log(diffDate.toLocaleString());
  return month >= 1
    ? f(month, "month")
    : day >= 1
    ? f(day, "day")
    : hr >= 1
    ? f(hr, "hr")
    : min >= 1
    ? f(min, "min")
    : day >= 1
    ? f(sec, "sec")
    : "";
}

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
