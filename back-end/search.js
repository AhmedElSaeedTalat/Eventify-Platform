const searchRecursive = (array, value, low, high) => {
  const foundValues = [];
  if (low > high) return -1;
  const mid = Math.round(low + (high - low) / 2);
  let arrayDate = new Date(array[mid].date);
  arrayDate.setHours(0, 0, 0, 0);
  let valueDate = new Date(value);
  valueDate.setHours(0, 0, 0, 0);
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
    console.log(`found values ${foundValues}`);
    return foundValues;
  } else if (array[mid].date > value) {
    return searchRecursive(array, value, low, mid - 1);
  } else if (array[mid].date < value) {
    return searchRecursive(array, value, mid + 1, high);
  }
};

const search = (array, value) => searchRecursive(array, value, 0, array.length - 1);
//const array = [15, 16, 17, 18, 18, 18, 18, 18, 19, 20, 21, 22, 23, 23, 23, 23, 24, 25];
//console.log(search(array, 23));
module.exports = search;
