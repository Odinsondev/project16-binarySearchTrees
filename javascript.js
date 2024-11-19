//Balanced Binary Search Tree

function node(data) {
  const node = {};
  node.data = data;
  node.left = null;
  node.right = null;

  return node;
}

function tree(array) {
  const balancedBST = {};
  balancedBST.root = '';
}

function removeDuplicateValues(array) {
  let newArray = array;

  //iterates through the array once
  for (let i = 0; i < newArray.length; i++) {
    let elementFound = false;

    //iterates through the array during each iteration
    //comparing each value to each other value
    for (let j = 0; j < newArray.length; j++) {
      //if first time comparing a value to the same value
      if (newArray[i] === newArray[j] && elementFound === false) {
        elementFound = true;
        //if comparing a value to a duplicate value
      } else if (newArray[i] === newArray[j] && elementFound === true) {
        newArray.splice(j, 1);
      }
    }
  }
  return newArray;
}

function sortNumericArray(array) {
  array.sort(function (a, b) {
    return a - b;
  });
  return array;
}

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

console.log(sortNumericArray(removeDuplicateValues(testArray)));
