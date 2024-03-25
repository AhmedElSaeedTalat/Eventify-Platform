/* module to quick sort */

/*
 * @swap: swap elements in the arrray
 *
 * @a: first index to swap
 * @b: second index to swap
 *
 *
 */
const swap = (a, b, array) => {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
};
/*
 * @partition: sort the array
 *
 * @l: low index
 * @h: high index
 * @array: array to sort
 *
 */
const partition = (l, h, array) => {
  const pivot = array[h].date;
  let i = l;
  for (let j = l; j < h; j += 1) {
    if (array[j].date <= pivot) {
      swap(i, j, array);
      i += 1;
    }
  }
  swap(i, h, array);
  return i;
};
/*
 * @sortRecursive: sort recursively using
 * pivot.
 *
 * @l: low index
 * @h: high index
 *
 */
const sortRecursive = (l, h, array) => {
  if (l < h) {
    const pivot = partition(l, h, array);
    sortRecursive(l, pivot - 1, array);
    sortRecursive(pivot + 1, h, array);
  }
};

/*
 * @sort: function to sort array
 *
 * @array: takes an array to sort
 *
 */
const sort = (array) => {
  sortRecursive(0, array.length - 1, array);
};
module.exports = sort;
