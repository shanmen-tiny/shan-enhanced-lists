import { Arr } from "@ephox/katamari";
import { PredicateExists, SugarElement } from "@ephox/sugar"

const isNestedList = (selectedElement: SugarElement): boolean => {
  return PredicateExists.ancestor(
    selectedElement,
    isListNode
  );
};

const matchNodeNames = (elementNames: string[]) =>
  (node: SugarElement<Node> | null) => {
    return Arr.contains(elementNames, node.dom.nodeName);
  };

const isListNode = matchNodeNames(["OL", "UL"]);
const isListItemNode = matchNodeNames(["LI"]);

export {
  isNestedList,
  isListNode,
  isListItemNode
};