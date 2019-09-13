const sketch = require('sketch/dom');

const organizeSymbolMasters = document => {
  document.pages().forEach(nativePage => {
    const symbolMasters = nativePage.symbols();

    if (symbolMasters.length <= 0) {
      return;
    }

    const symbolsPage = sketch.Page.createSymbolsPage();

    symbolsPage.name = `${symbolsPage.name} ${nativePage.name()}`;

    const unusableTrash = [];

    symbolMasters.forEach(symbolMaster => {
      const isTrash = symbolMaster.frame().height() <= 0 ||
      symbolMaster.frame().width() <= 0 ||
      symbolMaster.layers().length <= 0;

      return isTrash ?
        unusableTrash.push(symbolMaster.symbolID()) :
        symbolsPage.layers.push(symbolMaster);
    });

    nativePage.layers = nativePage.layers()
      .slice()
      .filter(layer => (layer.symbolID ? unusableTrash.indexOf(layer.symbolID()) < 0 : true));

    if (symbolsPage.layers.length <= 0) {
      return;
    }

    symbolsPage.parent = document;
  });
};

const manageSymbols = context => {
  const document = context.document;

  organizeSymbolMasters(document);
};

export default manageSymbols;
