// 表结点
class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// 链表
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  // 返回链表中存在的节点数
  size() {
    let count = 0;
    let node = this.head;
    // 不是空 有值的情况下 才进入 while 循环
    //  当node.next 指向null的时候，说明已经是最后一个了
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }

  //   清空链表
  clear() {
    this.head = null;
  }

  // 返回链表的最后一个节点
  getLast() {
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        // 一直让它等于最后一个
        lastNode = lastNode.next;
      }
    }
    return lastNode;
  }

  // 返回链表第一个节点
  getFirst() {
    return this.head;
  }
}

let node1 = new ListNode(2);
let node2 = new ListNode(5);
node1.next = node2;

/**
 * 这里的 链表与表结点  链表就是相当于有一个head，这是固定的。 然后往其中push表结点结构的数据（可以看成对象类型）
 */

// let list = new LinkedList(node1)
let list = new LinkedList(node1);
console.log(list.size());

// console.log(list)
// console.log(list.head.next.data)
