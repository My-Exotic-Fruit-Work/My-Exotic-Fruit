const fs = require("fs");
const path = require("path");

const { execSync } = require("child_process");

const changedFile = process.argv[2];

const HEADER_TERMINATOR = "$end-head^";
const BODY_TERMINATOR = "$end-body^";

function getFile(path) {
  const content = fs.readFileSync(path);

  let contentString = content.toString();

  const splitHead = contentString.indexOf(HEADER_TERMINATOR);
  const splitBody = contentString.indexOf(BODY_TERMINATOR);

  const headIndex = splitHead === -1 ? 0 : splitHead;
  const bodyIndex = splitBody === -1 ? contentString.length : splitBody;


  const head = contentString.substring(0, headIndex);
  const body = contentString.substring(headIndex + 1 + HEADER_TERMINATOR.length, bodyIndex);
  const scripts = contentString.substring(bodyIndex + 1 + BODY_TERMINATOR.length);

  const pathNoSrc = path.replace("src/", "");
  const pathCount = (pathNoSrc.match(/\//g) || []).length;

  let name = pathCount == 0 ? "home" : path.split("/").at(-2);
  path = path.replace("src/", "");

  return {
    name: name,
    path: path,
    outputPath: "build/" + path,
    pathCount: pathCount,
    content: content,
    head: head,
    body: body,
    scripts: scripts
  }
}

function getAllFiles(dir) {
  const files = [];

  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      files.push(...getAllFiles(filePath));
    } else {
      files.push(getFile(filePath));
    }
  }

  return files;
}

const FILES = getAllFiles("src");

const SCRIPTS = fs.readdirSync("./scripts")
  .filter(file => file.endsWith(".js"))
  .map(file => {
    const name = path.basename(file, ".js");
    const componentPath = `./components/${name}.html`;

    const dataFile = fs.existsSync("./data")
      ? fs.readdirSync("./data").find(dataFile => path.parse(dataFile).name === name)
      : null;
    const dataPath = dataFile ? "./data/" + dataFile : null;

    return {
      script: require("./scripts/" + file),
      component: fs.existsSync(componentPath) ? fs.readFileSync(componentPath).toString() : "",
      data: dataPath ? fs.readFileSync(dataPath).toString() : ""
    };
  });


const BASE = fs.readFileSync("./components/base.html").toString();

function recompileProject() {
  fs.rmSync("build", { recursive: true, force: true });
  for (const scriptFile of SCRIPTS) {
    if (!scriptFile.script.createFiles) continue;

    scriptFile.script.createFiles(FILES, scriptFile, fs, path);
  }
  for (const file of FILES) {
    recompileFile(file);
  }
}

function recompileFile(file) {
  if (!file.path.endsWith(".html")) {
    fs.mkdirSync(path.dirname(file.outputPath), { recursive: true });
    fs.writeFileSync(file.outputPath, file.content);

    return;
  }

  // fix the body
  for (const scriptFile of SCRIPTS) {
    if (!scriptFile.script.fixBody) continue;

    file.body = scriptFile.script.fixBody(file, scriptFile, FILES);
  }

  // and apply the head text after, as it can be affected by the body
  for (const scriptFile of SCRIPTS) {
    if (!scriptFile.script.applyHead) continue;

    file.head += scriptFile.script.applyHead(file, scriptFile, FILES) + "\n";
  }

  // lastly, we might want to do other stuff, go do that.
  for (const scriptFile of SCRIPTS) {
    if (!scriptFile.script.applyPost) continue;

    scriptFile.script.applyPost(file, scriptFile, FILES);
  }

  const fileContent = applyClean(
    BASE
      .replace(/\s*\$head\^/g, file.head)
      .replace(/\s*\$body\^/g, file.body)
      .replace(/\s*\$scripts\^/g, file.scripts),
    file);

  fs.mkdirSync(path.dirname(file.outputPath), { recursive: true });
  fs.writeFileSync(file.outputPath, fileContent);
}

function applyClean(fileContent, file) {
  for (const scriptFile of SCRIPTS) {
    if (!scriptFile.script.clean) continue;

    fileContent = scriptFile.script.clean(fileContent, file);
  }

  // removes all tags eg. $text here^
  return fileContent.replaceAll(/[\s]*\$[^^]*\^[\s]/gm, "");
}

if (!changedFile) {
  recompileProject();
}
else {
  recompileFile(getFile(changedFile));
}

execSync("node build-embed");