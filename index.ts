class TreeNode {
  constructor(
    public data: number,
    public left: TreeNode = null,
    public right: TreeNode = null
  ) {}
}

class BinarySearchTree {
  constructor(public root: TreeNode = null) {}

  insert(data: number) {
    // вставка
    const node = new TreeNode(data);

    if (this.root === null) {
      this.root = node;
    } else {
      this.inserNode(this.root, node);
    }
  }

  protected inserNode(node: TreeNode, newNode: TreeNode) {
    if (node.data < newNode.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.inserNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.inserNode(node.right, newNode);
      }
    }
  }

  inOrderTraverse(node: TreeNode, callback, tag = 'root') {
    // обход в прямом порядке - посещаются все узлы в порядке возрастания (все левые узлы, потом все правые)
    if (node !== null) {
      this.inOrderTraverse(node.left, callback, 'left');
      callback(node.data, tag);
      this.inOrderTraverse(node.right, callback, 'right');
    }
  }

  preOrderTraverse(node: TreeNode, callback, tag = 'root') {
    // симметричный обход (поперечный) -  посещаются каждый узел до его потомков
    if (node !== null) {
      callback(node.data, tag);
      this.preOrderTraverse(node.left, callback, 'left');
      this.preOrderTraverse(node.right, callback, 'right');
    }
  }

  postOrderTraverse(node: TreeNode, callback, tag = 'root') {
    // обход в обратном порядке - посещаются в порядке убывания
    if (node !== null) {
      this.postOrderTraverse(node.left, callback, 'left');
      this.postOrderTraverse(node.right, callback, 'right');
      callback(node.data, tag);
    }
  }

  search(node: TreeNode, data: number) {
    if (node !== null) {
      if (node.data > data) {
        return this.search(node.left, data);
      } else if (node.data < data) {
        return this.search(node.right, data);
      }
      console.log('Нашелся узел: ', node);
      return node;
    }
  }

  findMinNode(node: TreeNode) {
    if (node !== null) {
      if (node.left === null) {
        return node;
      } else return this.findMinNode(node.left);
    }
  }
}

const bt = new BinarySearchTree();

bt.insert(1);
bt.insert(2);
bt.insert(4);
bt.root.right = new TreeNode(3, new TreeNode(5), new TreeNode(6));

console.log('============ Прямой обход ============');
bt.inOrderTraverse(bt.root, console.log);
console.log('======== Симметричный обход ==========');
bt.preOrderTraverse(bt.root, console.log);
console.log('=========== Обратный обход ===========');
bt.postOrderTraverse(bt.root, console.log);
console.log('=============== Поиск ================');
bt.search(bt.root, 6);
console.log('========== Бинарное дерево ===========');
console.log(bt);
