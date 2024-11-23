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
  balancedBST.sortedArray = sortNumericArray(removeDuplicateValues(array));

  balancedBST.buildTree = function () {
    return sortedArrayToBSTRecur(this.sortedArray, 0, array.length - 1);

    function sortedArrayToBSTRecur(array, start, end) {
      //Termination condition for the recursive function
      if (start > end) return null;

      //Find the middle element
      let mid = Math.floor((start + end) / 2);

      //Create root node
      let root = node(array[mid]);

      //Create left subtree
      root.left = sortedArrayToBSTRecur(array, start, mid - 1);

      //Create right subtree
      root.right = sortedArrayToBSTRecur(array, mid + 1, end);

      return root;
    }
  };

  //Can only use the function after it has been defined
  balancedBST.root = balancedBST.buildTree();

  return balancedBST;
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

//TestArray and testTree
let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testTree = tree(testArray);

//Function provided by The Odin Project to console.log the tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

console.log(prettyPrint(testTree.root));
