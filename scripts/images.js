function clean(fileContent, file) {
  return fileContent.replaceAll(
    /\$img:([^\^]*)\^/g,
    (_, imagename) =>
    `${"../".repeat(file.pathCount)}images/${imagename}`
  );
}

module.exports = { clean };