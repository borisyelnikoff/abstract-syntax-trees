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

function parseNodeToHtml({
  nodeType,
  tagName,
  attributesString,
  childHtmlString,
  value,
}) {
  switch (nodeType) {
    case "element":
      return `<${tagName}${attributesString}>${childHtmlString}</${tagName}>`;

    case "text":
      return (value && value.toString()) || "";

    default:
      return "";
  }
}

function convertAstToHtmlString(astObject) {
  const { nodeType, tagName, value, attributes, children } = astObject;
  let childHtmlString = "";
  if (children) {
    childHtmlString = children
      .map((astObj) => convertAstToHtmlString(astObj))
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
