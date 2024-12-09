export function binarySearch(array: any[], target: number, key = 'id') {
  // Define Start and End Index
  let startIndex = 0;
  let endIndex = array.length - 1;

  let found = undefined;
  if (endIndex <= 5) {
    for (const value of array) {
      if (target === parseInt(value[key], 10)) {
        found = value;
        return value;
      }
    }
  } else if (endIndex > 5 && !found) {
    // While Start Index is less than or equal to End Index

    while (startIndex <= endIndex) {

      // Define Middle Index (This will change when comparing )
      const middleIndex = Math.floor((startIndex + endIndex) / 2);

      // Compare Middle Index with Target for match
      if (Number(target) === Number(array[middleIndex][key])) {
        found = array[middleIndex];
        return array[middleIndex];
      }
      // Search Right Side Of Array
      if (Number(target) > Number(array[middleIndex][key])) {
        // Assign Start Index and increase the Index by 1 to narrow search
        startIndex = middleIndex + 1;
      }
      // Search Left Side Of Array
      if (Number(target) < Number(array[middleIndex][key])) {
        // Assign End Index and increase the Index by 1 to narrow search
        endIndex = middleIndex - 1;
      }
      if (startIndex === middleIndex && middleIndex === endIndex) {
        return false;
      }
      if (isNaN(Number(array[middleIndex][key]))) {
        return false;
      }
    }
  }

  return found;
}
