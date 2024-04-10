import fs from "fs";

function getArg(n) {
  return process.argv[n + 1];
}

function writeFile(filePath, fileContent) {
  fs.writeFile(filePath, fileContent, () => {});
}

function createFolder(folderPath) {
  fs.mkdirSync(folderPath);
}

function capitalize(input) {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

const command = getArg(1);

async function main() {
  if (command === "new") {
    var type = getArg(2);
    var name = getArg(3);

    if (type === "page") {
      if (fs.existsSync(`src/pages/${name}Page`))
        throw new Error("Page already exists");
      name = capitalize(name);
      createFolder(`src/pages/${name}Page`);
      writeFile(
        `src/pages/${name}Page/${name}Page.tsx`,
        `
      import React from 'react'
      export default function ${name}Page() {
        return (
          <div>GirebaldPage</div>
          )
        }
        `
      );
    } else {
      process.exit(1);
    }
  } else {
    process.exit(1);
  }
}

main();
