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

  //Used in the insert, delete, find methods
  balancedBST.currentNode = balancedBST.root;
  //Used in the delete method
  balancedBST.parentNode = balancedBST.root;
  //Used in the find method
  //not using value null as null is part of the height function
  balancedBST.result = '';

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
        //If statement stops removing .left from replacementNode itself
        if (replacementNode !== this.currentNode.right) {
          this.currentNode.right.left = null;
        }

        //Links replacementNode right subtree last node to midSection last node to
        //deletedNode.right
        if (
          //If replacementNode is the only node in deletedNode's right subtree
          replacementNode === this.currentNode.right &&
          this.currentNode.right.right === null
        ) {
          //midsection here is always null
          console.log('option1');
          replacementNode.right = null;
        } else if (
          //If replacementNode is not the only node in deletedNode's right subtree
          replacementNode !== this.currentNode.right ||
          this.currentNode.right.right !== null
        ) {
          if (midSection === null) {
            if (replacementNodeRightSubtreeEnd === null) {
              console.log('option2');
              replacementNode.right = this.currentNode.right;
            } else if (replacementNodeRightSubtreeEnd !== null) {
              console.log('option3');
              replacementNodeRightSubtreeEnd.right = this.currentNode.right;
            }
          } else if (midSection !== null) {
            if (replacementNodeRightSubtreeEnd === null) {
              console.log('option4');
              replacementNode.right = midSection;
              midSectionRightEnd.right = this.currentNode.right;
            } else if (replacementNodeRightSubtreeEnd !== null) {
              console.log('option5');
              replacementNodeRightSubtreeEnd.right = midSection;
              midSectionRightEnd.right = this.currentNode.right;
            }
          }
        }

        //reset currentNode and parentNode
        this.currentNode = this.root;
        this.parentNode = this.root;
      }
    }
  };

  //Returns the node with the given value
  //Does not return the node for some reason - undefined
  balancedBST.find = function (value) {
    this.result = '';
    //If value is smaller than the current node
    if (value < this.currentNode.data) {
      //If left subtree exists
      if (this.currentNode.left !== null) {
        this.currentNode = this.currentNode.left;

        balancedBST.find(value);

        //If left subtree does not exist - console.log an error
      } else if (this.currentNode.left === null) {
        console.log('Value is not present in the tree');
      }

      //If value is larger than the current node
    } else if (value > this.currentNode.data) {
      //If right subtree exists
      if (this.currentNode.right !== null) {
        this.currentNode = this.currentNode.right;

        balancedBST.find(value);

        //If right subtree does not exist - console.log an error
      } else if (this.currentNode.right === null) {
        console.log('Value is not present in the tree');
      }

      //If value is same as current node
    } else {
      this.result = this.currentNode;
    }
    this.currentNode = this.root;

    return this.result;
  };

  //Traverses the tree in preorder order and passes each node to the provided callback
  //Iterative approach
  balancedBST.levelOrderIterative = function (callbackFunction) {
    if (callbackFunction === undefined) {
      console.log('Callback function necessary');
      return;
    }

    //If tree has no nodes
    if (balancedBST.root === null) {
      return;
    }

    const queueArray = [];
    queueArray.push(balancedBST.root);

    while (queueArray.length > 0) {
      let currentNode = queueArray[0];
      callbackFunction(currentNode);
      if (currentNode.left !== null) {
        queueArray.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queueArray.push(currentNode.right);
      }
      queueArray.shift();
    }
  };

  //Traverses the tree in levelorder order and passes each node to the provided callback
  balancedBST.levelOrderRecursive = function (callbackFunction) {
    if (callbackFunction === undefined) {
      console.log('Callback function necessary');
      return;
    }

    //If tree has no nodes
    if (balancedBST.root === null) {
      return;
    }

    const queueArray = [];
    queueArray.push(balancedBST.root);

    function recursion() {
      if (queueArray.length === 0) {
        return;
      }
      let currentNode = queueArray[0];

      callbackFunction(currentNode);

      if (currentNode.left !== null) {
        queueArray.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queueArray.push(currentNode.right);
      }
      queueArray.shift();

      recursion();
    }
    recursion();
  };

  //Traverses the tree in preorder order and passes each node to the provided callback
  balancedBST.preOrder = function (callbackFunction) {
    if (callbackFunction === undefined) {
      console.log('Callback function necessary');
      return;
    }

    //If tree has no nodes
    if (balancedBST.root === null) {
      return;
    }

    let currentNode = balancedBST.root;

    function preOrederTraverse(node) {
      if (node === null) {
        return;
      }
      callbackFunction(node);
      preOrederTraverse(node.left);
      preOrederTraverse(node.right);
    }
    preOrederTraverse(currentNode);
  };

  //Traverses the tree in inorder order and passes each node to the provided callback
  //Note: traverses in correct numeric order
  balancedBST.inOrder = function (callbackFunction) {
    if (callbackFunction === undefined) {
      console.log('Callback function necessary');
      return;
    }

    //If tree has no nodes
    if (balancedBST.root === null) {
      return;
    }

    let currentNode = balancedBST.root;

    function inOrederTraverse(node) {
      if (node === null) {
        return;
      }
      inOrederTraverse(node.left);
      callbackFunction(node);
      inOrederTraverse(node.right);
    }
    inOrederTraverse(currentNode);
  };

  //Traverses the tree in postorder order and passes each node to the provided callback
  balancedBST.postOrder = function (callbackFunction) {
    if (callbackFunction === undefined) {
      console.log('Callback function necessary');
      return;
    }

    //If tree has no nodes
    if (balancedBST.root === null) {
      return;
    }

    let currentNode = balancedBST.root;

    function postOrederTraverse(node) {
      if (node === null) {
        return;
      }
      postOrederTraverse(node.left);
      postOrederTraverse(node.right);
      callbackFunction(node);
    }
    postOrederTraverse(currentNode);
  };

  //Returns the given node’s height.
  //Height is defined as the number of edges in the longest path from a given node
  //to a leaf node.
  balancedBST.height = function (node) {
    //if using the find method to pass a node that does not exist
    if (node === '') {
      console.error('Node does not exist');
      return;
    }

    //Googled this function.
    if (node === null) {
      return -1;
    }

    let leftHeight = balancedBST.height(node.left);
    let rightHeight = balancedBST.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  //Returns the given node’s depth.
  //Depth is defined as the number of edges in the path from a given node
  //to the tree’s root node.
  balancedBST.depth = function (node) {
    //if using the find method to pass a node that does not exist
    if (node === '') {
      console.error('Node does not exist');
      return;
    }

    let value = node.data;
    let depth = 0;

    function search(value) {
      //If value is smaller than the current node
      if (value < balancedBST.currentNode.data) {
        //If left subtree exists
        if (balancedBST.currentNode.left !== null) {
          balancedBST.currentNode = balancedBST.currentNode.left;
          depth++;

          search(value);

          //If left subtree does not exist - console.log an error
        } else if (balancedBST.currentNode.left === null) {
          console.log('Value is not present in the tree');
        }

        //If value is larger than the current node
      } else if (value > balancedBST.currentNode.data) {
        //If right subtree exists
        if (balancedBST.currentNode.right !== null) {
          balancedBST.currentNode = balancedBST.currentNode.right;
          depth++;

          search(value);

          //If right subtree does not exist - console.log an error
        } else if (balancedBST.currentNode.right === null) {
          console.log('Value is not present in the tree');
        }

        //If value is same as current node
      } else {
        return;
      }
    }
    search(value);

    this.currentNode = this.root;

    return depth;
  };

  //Checks if the tree is balanced
  balancedBST.isBalanced = function () {
    let currentNode = balancedBST.root;
    let balanced = true;

    function checkIfBalanced(node) {
      //Stops the function once unbalanced is confirmed
      if (balanced === false) {
        return;
      }

      //Recursive function terminating statement
      if (node === null) {
        return;
      }

      if (
        balancedBST.height(node.left) - balancedBST.height(node.right) > 1 ||
        balancedBST.height(node.right) - balancedBST.height(node.left) > 1
      ) {
        balanced = false;
      } else {
        //is balanced
      }

      checkIfBalanced(node.left);
      checkIfBalanced(node.right);
    }
    checkIfBalanced(currentNode);
    return balanced;
  };

  //Rebalances an unbalanced tree.
  balancedBST.rebalance = function () {
    let newArray = [];

    //callback function for inOrder
    function addToArray(node) {
      newArray.push(node.data);
    }

    //runs inOrder to create new array
    balancedBST.inOrder(addToArray);

    //creates new tree
    const newTree = tree(newArray);

    //replaces old unbalaced tree with new balanced tree
    balancedBST.root = newTree.root;

    this.currentNode = this.root;
    this.parentNode = this.root;
    this.result = '';
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

//Driver script to test the balanced binary search tree and its methods
function testBST() {
  console.log('Driver script test');

  //Create a binary search tree from an array of random numbers < 100
  function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function createRandomArray(length) {
    let array = [];

    for (let i = 0; i < length; i++) {
      array.push(createRandomNumber(0, 100));
    }

    return array;
  }

  const testTree2 = tree(createRandomArray(10));

  console.log(prettyPrint(testTree2.root));

  //Confirm that the tree is balanced by calling isBalanced
  console.log(testTree2.isBalanced());

  //Print out all elements in level, pre, post, and in order
  let arrayOfTreeElements = [];

  function printNodes(node) {
    arrayOfTreeElements.push(node.data);
  }

  testTree2.levelOrderIterative(printNodes);
  console.log(arrayOfTreeElements);
  arrayOfTreeElements = [];

  testTree2.preOrder(printNodes);
  console.log(arrayOfTreeElements);
  arrayOfTreeElements = [];

  testTree2.postOrder(printNodes);
  console.log(arrayOfTreeElements);
  arrayOfTreeElements = [];

  testTree2.inOrder(printNodes);
  console.log(arrayOfTreeElements);
  arrayOfTreeElements = [];

  //Unbalance the tree by adding several numbers > 100

  //Confirm that the tree is unbalanced by calling isBalanced

  //Balance the tree by calling rebalance

  //Confirm that the tree is balanced by calling isBalanced

  //Print out all elements in level, pre, post, and in order
}
testBST();
