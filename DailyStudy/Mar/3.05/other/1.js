function TreeDepth(pRoot) {
  if (!pRoot) return 0;

  let leftDepth = TreeDepth(pRoot.left);
  let rightDepth = TreeDepth(pRoot.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
