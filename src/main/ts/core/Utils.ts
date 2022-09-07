import { PredicateFilter, SugarElement } from "@ephox/sugar"

const isNestedList = (selectedElement: SugarElement): boolean => {
  return PredicateFilter.ancestors(
    selectedElement,
    isListNode
  ).length > 1;
};

const matchNodeNames = (regex: RegExp) =>
  (node: SugarElement<Node> | null) => {
    return regex.test(node.dom.nodeName)
  };

const isListNode = matchNodeNames(/^(OL|UL|DL)$/);
const isListItemNode = matchNodeNames(/^(LI)$/);

export {
  isNestedList,
  isListNode,
  isListItemNode
};