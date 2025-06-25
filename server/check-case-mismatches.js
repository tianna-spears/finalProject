const fs = require("fs");
const path = require("path");

const extsToCheck = [".js", ".jsx", ".ts", ".tsx"];

function findFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    if (file === "node_modules") return; // skip node_modules folder

    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(filepath));
    } else if (extsToCheck.includes(path.extname(file))) {
      results.push(filepath);
    }
  });

  return results;
}

function checkCaseMismatch(importPath, fromFile) {
  const baseDir = path.dirname(fromFile);
  const fullImportPath = path.resolve(baseDir, importPath);

  // Try to find real file path with correct case
  const parts = path.relative(process.cwd(), fullImportPath).split(path.sep);
  let currentPath = process.cwd();
  for (const part of parts) {
    const files = fs.readdirSync(currentPath);
    const matched = files.find((f) => f.toLowerCase() === part.toLowerCase());
    if (!matched) {
      // Path doesn't exist
      return `❌ Path does not exist: ${fullImportPath}`;
    }
    if (matched !== part) {
      return `❌ Case mismatch for '${part}' in path '${fullImportPath}' (found '${matched}')`;
    }
    currentPath = path.join(currentPath, matched);
  }
  return null;
}

function extractImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const importRegex = /require\(['"](.+?)['"]\)/g;
  const esImportRegex = /import\s.*?\sfrom\s['"](.+?)['"]/g;

  let imports = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    if (!match[1].startsWith(".") && !match[1].startsWith("/")) continue; // Skip non-relative imports
    imports.push(match[1]);
  }

  while ((match = esImportRegex.exec(content)) !== null) {
    if (!match[1].startsWith(".") && !match[1].startsWith("/")) continue;
    imports.push(match[1]);
  }

  return imports;
}

function main() {
  const allFiles = findFiles(process.cwd());

  let errors = [];

  allFiles.forEach((file) => {
    const imports = extractImports(file);
    imports.forEach((imp) => {
      const error = checkCaseMismatch(imp, file);
      if (error) errors.push(`${file} -> ${error}`);
    });
  });

  if (errors.length > 0) {
    console.log("Case mismatches found:\n");
    errors.forEach((e) => console.log(e));
  } else {
    console.log("✅ No case mismatches found!");
  }
}

main();
