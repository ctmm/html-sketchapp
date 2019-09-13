const alignArtboards = document => {
  document.pages().forEach(nativePage => {

    nativePage.layers().forEach((artboard, i) => {
      const x = nativePage.layers().slice(0, i).reduce((a, v) => a + v.frame().width() + 100, 0);

      artboard.frame().x = x;
      artboard.frame().y = 0;
    });
  });
};

const cleanupFile = context => {
  const document = context.document;

  alignArtboards(document);
};

export default cleanupFile;
