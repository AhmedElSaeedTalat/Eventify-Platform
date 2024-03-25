/*
 * @searchRecursive: search recursively for date
 * passed
 *
 * @array: array used to search for date in
 * @value: date object passed to search for
 * @low: first index in the array passed
 * @high: last index of array passed
 *
 * @return - array of found values matchtin the
 * searched value
 */
const searchRecursive = (array, value, low, high) => {
  const foundValues = [];
  if (low > high) return -1;
  // calculate mid
  const mid = Math.round(low + (high - low) / 2);

  // create object date of date passed and setting hours
  // to zero to be able to compare dates
  let arrayDate = new Date(array[mid].date);
  arrayDate.setHours(0, 0, 0, 0);
  let valueDate = new Date(value);
  valueDate.setHours(0, 0, 0, 0);

  // compare dates and looping over the array to
  // to check for other occurences
  if (arrayDate.getTime() === valueDate.getTime()) {
    foundValues.push(array[mid]);
    for (let i = mid - 1; i >= low; i -= 1) {
      arrayDate = new Date(array[i].date);
      arrayDate.setHours(0, 0, 0, 0);
      valueDate = new Date(value);
      valueDate.setHours(0, 0, 0, 0);
      if (arrayDate.getTime() !== valueDate.getTime()) break;
      foundValues.push(array[i]);
    }

    for (let i = mid + 1; i <= high; i += 1) {
      arrayDate = new Date(array[i].date);
      arrayDate.setHours(0, 0, 0, 0);
      valueDate = new Date(value);
      valueDate.setHours(0, 0, 0, 0);
      if (arrayDate.getTime() !== valueDate.getTime()) break;
      foundValues.push(array[i]);
    }
    return foundValues;

  // determine the location of date value in the array
  } else if (array[mid].date > value) {
    return searchRecursive(array, value, low, mid - 1);
  } else if (array[mid].date < value) {
    return searchRecursive(array, value, mid + 1, high);
  }
};

/*
 * @search: uses search recursive to find an event
 * based on a date passed
 *
 * @array: array passed to find an event
 * @value: date value to search in the events
 *
 * @return - array of events with the date being
 * searched for
 *
 */
const search = (array, value) => searchRecursive(array, value, 0, array.length - 1);
module.exports = search;
