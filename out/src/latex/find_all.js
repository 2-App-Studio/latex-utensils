import * as lp from './latex_parser_types';
export function getChildNodes(node) {
    let results = [];
    if (lp.hasContentArray(node)) {
        results = results.concat(node.content);
    }
    if (lp.hasArgsArray(node)) {
        results = results.concat(node.args);
    }
    if ('arg' in node && node.arg) {
        results = results.concat([node.arg]);
    }
    return results;
}
/**
 * Find a node satisfying `typeguard` in `nodes` traversely.
 * @param nodes The array of nodes where to be searched.
 * @param typeguard If this is actually a type guard, the matched result will be typed.
 * @param parent internal-use only.
 */
export function find(nodes, typeguard = (_z) => true, parent) {
    for (const node of nodes) {
        if (typeguard(node)) {
            return { node, parent };
        }
        const cur = { node, parent };
        const childNodes = getChildNodes(node);
        if (childNodes.length > 0) {
            return find(childNodes, typeguard, cur);
        }
    }
    return undefined;
}
/**
 * Find all the nodes satisfying `typeguard` in `nodes` traversely.
 * @param nodes The array of nodes where to be searched.
 * @param typeguard If this is actually a type guard, the matched result will be typed.
 * @param parent internal-use only.
 */
export function findAll(nodes, typeguard = (_z) => true, parent) {
    let ret = [];
    for (const node of nodes) {
        if (typeguard(node)) {
            ret.push({ node, parent });
        }
        const cur = { node, parent };
        const childNodes = getChildNodes(node);
        if (childNodes.length > 0) {
            ret = ret.concat(findAll(childNodes, typeguard, cur));
        }
    }
    return ret;
}
export function findAllSequences(nodes, typeguards, parent) {
    let ret = [];
    for (let i = 0; i < nodes.length; i++) {
        let flag = true;
        const curResult = [];
        for (let j = 0; j < typeguards.length; j++) {
            if (i + j < nodes.length) {
                const cur = nodes[i + j];
                if (typeguards[j](cur)) {
                    curResult.push(cur);
                    continue;
                }
            }
            flag = false;
            break;
        }
        if (flag) {
            ret.push({ nodes: curResult, parent });
        }
        const curNode = nodes[i];
        const cur = { node: curNode, parent };
        const childNodes = getChildNodes(curNode);
        if (childNodes.length > 0) {
            ret = ret.concat(findAllSequences(childNodes, typeguards, cur));
        }
    }
    return ret;
}
/**
 * Find a node at the position.
 * @param nodes The array of nodes where to be searched
 * @param pos
 * @param parent internal-use only
 */
export function findNodeAt(nodes, pos, parent) {
    for (const node of nodes) {
        const nodeLoc = node.location;
        const cur = { node, parent };
        if (nodeLoc && pos.line !== undefined && pos.column !== undefined) {
            const childNodes = getChildNodes(node);
            if (pos.line < nodeLoc.start.line || nodeLoc.end.line < pos.line) {
                continue;
            }
            if (nodeLoc.start.line === pos.line) {
                if ((pos.includeStart ? pos.column < nodeLoc.start.column : pos.column <= nodeLoc.start.column)) {
                    continue;
                }
            }
            if (nodeLoc.end.line === pos.line) {
                if ((pos.includeEnd ? nodeLoc.end.column < pos.column : nodeLoc.end.column <= pos.column)) {
                    continue;
                }
            }
            return findNodeAt(childNodes, pos, cur);
        }
        else if (nodeLoc && pos.offset !== undefined
            && (pos.includeStart ? nodeLoc.start.offset <= pos.offset : nodeLoc.start.offset < pos.offset)
            && (pos.includeEnd ? nodeLoc.end.offset >= pos.offset : nodeLoc.end.offset > pos.offset)) {
            const childNodes = getChildNodes(node);
            return findNodeAt(childNodes, pos, cur);
        }
    }
    return parent;
}
//# sourceMappingURL=find_all.js.map