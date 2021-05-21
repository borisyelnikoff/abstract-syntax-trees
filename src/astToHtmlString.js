import htmlVoidElements from "./htmlVoidElements.js";

export default function astToHtmlString({
  nodeType,
  tagName,
  value,
  attributes,
  children,
} = {}) {
  if (!nodeType) {
    throw new Error("Invalid AST object. 'nodeType' property is expected.");
  }

  if (nodeType === "element" && !tagName) {
    throw new Error("Missing 'tagName' property.");
  }

  let childHtmlString = "";
  if (children) {
    childHtmlString = children
      .map((astObj) => astToHtmlString(astObj))
      .join("");
  }

  const attributesString =
    (attributes && parseAttributesToHtml(attributes)) || "";

  return parseNodeToHtml({
    nodeType,
    tagName,
    attributesString,
    childHtmlString,
    value,
  });
}

function parseNodeToHtml({
  nodeType,
  tagName,
  attributesString,
  childHtmlString,
  value,
}) {
  switch (nodeType) {
    case "element":
      return parseElementToHtml({ tagName, attributesString, childHtmlString });

    case "text":
      return (value && value.toString()) || "";

    default:
      throw new Error("Invalid value of 'nodeType' property.");
  }
}

function parseElementToHtml({ tagName, attributesString, childHtmlString }) {
  if (htmlVoidElements.includes(tagName)) {
    return `<${tagName}${attributesString} />`;
  }

  return `<${tagName}${attributesString}>${childHtmlString}</${tagName}>`;
}

function parseAttributesToHtml(attributes) {
  if (!attributes || !Array.isArray(attributes)) {
    throw new Error("Invalid argument. Must be an HTML attribute object.");
  }

  return (
    attributes
      .map(({ name, value }) => (name && value ? ` ${name}="${value}"` : ""))
      .join("") || ""
  );
}
