// var reverseList = function (head) {
//   // 当链表为null或链表中仅有一个节点时。不需要反转
//   if (!head || !head.next) return head;

//   var prev = null,
//     curr = head;
//   while (curr) {
//     var next = curr.next;

//     curr.next = prev;

//     prev = curr;
//     curr = next;
//   }
//   return prev; //不确定
// };
