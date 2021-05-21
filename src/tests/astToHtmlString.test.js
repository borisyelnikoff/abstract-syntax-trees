import astToHtmlString from "../astToHtmlString.js";

describe("AST object to HTML parser tests.", () => {
  test("Convert non-nested div object with no attributes to HTML string.", () => {
    const astObj = {
      nodeType: "element",
      tagName: "div",
      children: [{ nodeType: "text", value: "Hello world!" }],
    };
    const expectedHtmlString = "<div>Hello world!</div>";

    const result = astToHtmlString(astObj);

    expect(result).toBe(expectedHtmlString);
  });

  test("Convert non-nested div object with attribute to HTML string.", () => {
    const astObj = {
      nodeType: "element",
      tagName: "div",
      attributes: [{ name: "class", value: "test" }],
    };
    const expectedHtmlString = '<div class="test"></div>';

    const result = astToHtmlString(astObj);

    expect(result).toBe(expectedHtmlString);
  });

  test("Convert non-nested div object with attribute and inner text to HTML string.", () => {
    const astObj = {
      nodeType: "element",
      tagName: "div",
      attributes: [{ name: "class", value: "test" }],
      children: [{ nodeType: "text", value: "Hello world!" }],
    };
    const expectedHtmlString = '<div class="test">Hello world!</div>';

    const result = astToHtmlString(astObj);

    expect(result).toBe(expectedHtmlString);
  });

  test("Convert non-nested div object with two attributes and inner text to HTML string.", () => {
    const astObj = {
      nodeType: "element",
      tagName: "nav",
      attributes: [
        { name: "class", value: "test" },
        { name: "data", value: 1 },
      ],
      children: [{ nodeType: "text", value: "Hello world!" }],
    };
    const expectedHtmlString = '<nav class="test" data="1">Hello world!</nav>';

    const htmlString = astToHtmlString(astObj);

    expect(htmlString).toBe(expectedHtmlString);
  });

  test("Convert nav object with attribute and two children to HTML string.", () => {
    const divAstObj = {
      nodeType: "element",
      tagName: "footer",
      attributes: [{ name: "class", value: "test" }],
      children: [
        {
          nodeType: "element",
          tagName: "h1",
          attributes: [{ name: "class", value: ".headings" }],
          children: [{ nodeType: "text", value: "AST Parser" }],
        },
        {
          nodeType: "element",
          tagName: "p",
          attributes: [{ name: "class", value: ".italic" }],
          children: [{ nodeType: "text", value: "Lorem ipsum dolor" }],
        },
      ],
    };
    const expectedHtmlString =
      '<footer class="test"><h1 class=".headings">AST Parser</h1><p class=".italic">Lorem ipsum dolor</p></footer>';

    const result = astToHtmlString(divAstObj);

    expect(result).toBe(expectedHtmlString);
  });

  test("Convert img ast object to html void element.", () => {
    const astObj = {
      nodeType: "element",
      tagName: "img",
      attributes: [{ name: "src", value: "https://127.0.0.1/image.png" }],
    };
    const expectedHtmlString = `<img src="https://127.0.0.1/image.png" />`;

    const result = astToHtmlString(astObj);

    expect(result).toBe(expectedHtmlString);
  });

  test("Convert link ast object with two attributes to html void element.", () => {
    const astObj = {
      nodeType: "element",
      tagName: "link",
      attributes: [
        { name: "rel", value: "stylesheet" },
        { name: "href", value: "styles.css" },
      ],
    };
    const expectedHtmlString = `<link rel="stylesheet" href="styles.css" />`;

    const result = astToHtmlString(astObj);

    expect(result).toBe(expectedHtmlString);
  });

  test("Throw error if no object is passed.", () => {
    expect(() => astToHtmlString()).toThrow(Error);
  });

  test("Throw error if ast object without 'nodeType' property is passed.", () => {
    const invalidAstObject = {
      tagName: "div",
      attributes: [{ name: "class", value: "test" }],
      children: [{ nodeType: "text", value: "Hello world!" }],
    };

    expect(() => astToHtmlString(invalidAstObject)).toThrow(Error);
  });

  test("Throw error if ast object with 'nodeType' without 'tagName' is passed.", () => {
    const invalidAstObject = {
      nodeType: "element",
      attributes: [{ name: "class", value: "test" }],
      children: [{ nodeType: "text", value: "Hello world!" }],
    };

    expect(() => astToHtmlString(invalidAstObject)).toThrow(Error);
  });

  test("Throw error if ast object with invalid attribute is passed.", () => {
    const invalidAstObject = {
      nodeType: "element",
      tagName: "div",
      attributes: "Hello!",
      children: [{ nodeType: "text", value: "Hello world!" }],
    };

    expect(() => astToHtmlString(invalidAstObject)).toThrow(Error);
  });

  test("Throw error if ast object with invalid 'nodeType' property value is passed.", () => {
    const invalidAstObject = {
      nodeType: "other",
    };

    expect(() => astToHtmlString(invalidAstObject)).toThrow(Error);
  });
});
