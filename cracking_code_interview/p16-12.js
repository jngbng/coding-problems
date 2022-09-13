/*
엔터로 구분된다.
*/

function printValue(output, value) {
  output.push(value);
}

function printEnd(output) {
  printValue(output, '0');
}

function printAttributes(output, keyMap, props) {
  for (const [key, value] of props) {
    printValue(output, keyMap[key]);
    printValue(output, value);
  }
}

function printXml(xml, keyMap, output) {
  if (xml == null) {
    return;
  }
  // 구현에 따라 다르겠다.
  if (xml.type == 'string') {
    printValue(xml.value);
    return;
  }
  if (xml.type == 'node') {
    printValue(output, keyMap[xml.tag]);
    printAttributes(output, keyMap, xml.props);
    printEnd(output);
    for (let child of xml.children) {
      printXml(child, keyMap, output);
    }
    printEnd(output);
  }
}


function printXmlMe(xml, keyMap) {
  const output = [];
  printXml(xml, keyMap, output);

  if (output.length == 0) {
    return;
  }
  // trailing space
  console.log(output.join(' '));
}
