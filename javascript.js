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
    console.log('runnig');
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

  //Used in the insert, delete methods
  balancedBST.currentNode = balancedBST.root;
  //Used in the delete method
  balancedBST.parentNode = balancedBST.root;

  //Inserts the given value
  balancedBST.insert = function (value) {
    //If value is smaller than the current node
    if (value < this.currentNode.data) {
      //If left subtree exists
      if (this.currentNode.left !== null) {
        this.currentNode = this.currentNode.left;

        balancedBST.insert(value);

        //If left subtree does not exist - create the node
      } else if (this.currentNode.left === null) {
        this.currentNode.left = node(value);
        this.currentNode = this.root;
      }

      //If value is larger than the current node
    } else if (value > this.currentNode.data) {
      //If right subtree exists
      if (this.currentNode.right !== null) {
        this.currentNode = this.currentNode.right;

        balancedBST.insert(value);

        //If right subtree does not exist - create the node
      } else if (this.currentNode.right === null) {
        this.currentNode.right = node(value);
        this.currentNode = this.root;
      }

      //If value is same as current node
    } else {
      return;
    }
  };

  //Deletes the given value or console.logs an error if value not present
  balancedBST.delete = function (value) {
    //If value is smaller than the current node
    if (value < this.currentNode.data) {
      //If left subtree exists
      if (this.currentNode.left !== null) {
        this.parentNode = this.currentNode;
        this.currentNode = this.currentNode.left;

        balancedBST.delete(value);

        //If left subtree does not exist - console.log an error
      } else if (this.currentNode.left === null) {
        console.log('Value is not present in the tree');
      }

      //If value is larger than the current node
    } else if (value > this.currentNode.data) {
      //If right subtree exists
      if (this.currentNode.right !== null) {
        this.parentNode = this.currentNode;
        this.currentNode = this.currentNode.right;

        balancedBST.delete(value);

        //If right subtree does not exist - console.log an error
      } else if (this.currentNode.right === null) {
        console.log('Value is not present in the tree');
      }

      //If value is same as current node
    } else {
      //If currentNode has no children
      if (this.currentNode.left === null && this.currentNode.right === null) {
        if (this.parentNode.left === this.currentNode) {
          this.parentNode.left = null;

          this.currentNode = this.root;
          this.parentNode = this.root;
        } else if (this.parentNode.right === this.currentNode) {
          this.parentNode.right = null;

          this.currentNode = this.root;
          this.parentNode = this.root;
        }
        //If currentNode only has left child
      } else if (
        this.currentNode.left !== null &&
        this.currentNode.right === null
      ) {
        if (this.parentNode.left === this.currentNode) {
          this.parentNode.left = this.currentNode.left;

          this.currentNode = this.root;
          this.parentNode = this.root;
        } else if (this.parentNode.right === this.currentNode) {
          this.parentNode.right = this.currentNode.left;

          this.currentNode = this.root;
          this.parentNode = this.root;
        }
        //If currentNode only has right child
      } else if (
        this.currentNode.left === null &&
        this.currentNode.right !== null
      ) {
        if (this.parentNode.left === this.currentNode) {
          this.parentNode.left = this.currentNode.right;

          this.currentNode = this.root;
          this.parentNode = this.root;
        } else if (this.parentNode.right === this.currentNode) {
          this.parentNode.right = this.currentNode.right;

          this.currentNode = this.root;
          this.parentNode = this.root;
        }
        //If currentNode has two children
      } else if (
        this.currentNode.left !== null &&
        this.currentNode.right !== null
      ) {
        //Find replacement for the deleted node
        let replacementNode = this.currentNode.right;
        while (replacementNode.left !== null) {
          replacementNode = replacementNode.left;
        }

        //Link replacementNode to parentNode
        if (this.parentNode.left === this.currentNode) {
          this.parentNode.left = replacementNode;
        } else if (this.parentNode.right === this.currentNode) {
          this.parentNode.right = replacementNode;
        }

        //Link currentNode(deleted).left to replacementNode
        replacementNode.left = this.currentNode.left;

        //FIX THIS AFTER FIXING THE ISSUE
        //Rebuild parentNode's right subtree
        //Find the last node of the replacementNode's right subtree
        let replacementNodeRightSubtreeEnd = null;
        if (replacementNode.right !== null) {
          replacementNodeRightSubtreeEnd = replacementNode;
          //while loop doesn't even start as node in infinite loop
          while (replacementNodeRightSubtreeEnd.right !== null) {
            replacementNodeRightSubtreeEnd =
              replacementNodeRightSubtreeEnd.right;
          }
        }

        console.log(replacementNodeRightSubtreeEnd);
        console.log(replacementNode);
        replacementNode.right = null;
        console.log(replacementNode);
        console.log(replacementNode.left);

        //Section between currentNode(deleted).right and replacementNode
        let midSection = null;
        let midSectionRightEnd = null;
        if (
          this.currentNode.right.left !== replacementNode &&
          this.currentNode.right !== replacementNode
        ) {
          midSection = this.currentNode.right.left;
          //Find the last node of the midSections's right subtree
          midSectionRightEnd = midSection;
          while (midSectionRightEnd.right !== null) {
            midSectionRightEnd = midSectionRightEnd.right;
          }

          //Remove links to replacementNode from midSectionLeftEnd
          let midSectionLeftEnd = midSection;
          while (midSectionLeftEnd.left !== replacementNode) {
            midSectionLeftEnd = midSectionLeftEnd.left;
          }
          midSectionLeftEnd.left = null;
        }

        //Remove links to replacementNode from currentNode(deleted).right.left
        this.currentNode.right.left = null;

        //Links replacementNode right subtree last node to midSection last node to
        //deletedNode.right
        if (midSection === null) {
          //ISSUE IS HERE
          if (replacementNodeRightSubtreeEnd.right !== this.currentNode.right) {
            replacementNodeRightSubtreeEnd.right = this.currentNode.right;
          }
        } else {
          replacementNodeRightSubtreeEnd.right = midSection;
          midSectionRightEnd.right = this.currentNode.right;
        }

        //reset currentNode and parentNode
        this.currentNode = this.root;
        this.parentNode = this.root;
      }
    }
  };

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

testTree.insert(100);
testTree.insert(75);
testTree.insert(3.3);
testTree.insert(85);
testTree.insert(70);
testTree.insert(200);
testTree.insert(150);
testTree.insert(250);
testTree.insert(1000);
testTree.insert(999);
testTree.insert(1050);
testTree.insert(7000);
testTree.insert(6999);
testTree.insert(7500);
testTree.insert(999.5);
console.log(prettyPrint(testTree.root));

testTree.delete(1000);
console.log(prettyPrint(testTree.root));
