import { PredicateFilter, SugarElement } from "@ephox/sugar"

const getParents = (selectedElement: SugarElement): SugarElement[] => {
  return PredicateFilter.ancestors(
    selectedElement,
    isListNode
  )
};

const isNested = (selectedElement: SugarElement): boolean => {
  return getParents(selectedElement).length > 1;
};

const matchNodeNames = (regex: RegExp) =>
  (node: SugarElement<Node> | null) => {
    return regex.test(node.dom.nodeName)
  };

const isListNode = matchNodeNames(/^(OL|UL|DL)$/);
const isListItemNode = matchNodeNames(/^(LI)$/);

export {
  isNested,
  isListNode,
  isListItemNode
};