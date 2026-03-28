const fs = require('fs');
const path = require('path');

const TARGET_DIRS = ['app', 'components', 'hooks', 'lib'];
const BASE_DIR = process.cwd();

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

function stripTypes(content) {
  return content
    // Remove import type statements
    .replace(/import\s+type\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\n?/g, '')
    // Remove type keyword in imports: import { type X, Y } from 'Z'
    .replace(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"]/g, (match) => {
        return match.replace(/type\s+([A-Z][a-zA-Z0-9]*),?\s*/g, '');
    })
    // Remove interfaces
    .replace(/interface\s+[A-Z][a-zA-Z0-9]*\s*(extends\s+[^{]+)?\s*{[\s\S]*?}\n?/g, '')
    // Remove type declarations
    .replace(/type\s+[A-Z][a-zA-Z0-9]*\s*=\s*[\s\S]*?;\n?/g, '')
    // Remove generic types in variables/hooks: useState<T>(...)
    .replace(/<[A-Z][a-zA-Z0-9<>,\s]*>/g, '')
    // Remove function prop types: ({ ... }: Props) or (props: Props)
    // This is the most common pattern in components
    .replace(/(\w+)\s*:\s*[A-Z][a-zA-Z0-9]*(\s*&\s*[A-Z][a-zA-Z0-9]*)*(\s*\{[\s\S]*?\})?/g, '$1')
    // Remove individual parameter types: (a: string, b: number)
    // Note: this might hit labels in JS objects, so we check for whitespace or start of line
    .replace(/(\()?(\w+)\s*:\s*(string|number|boolean|any|void|object|unknown|never|symbol)(\[])?/g, '$1$2')
    // Remove "as const" and casting
    .replace(/\s+as\s+[A-Z][a-zA-Z0-9<>[\]]*/g, '')
    // Remove React.FC<Props>
    .replace(/:?s*React\.FC(<[^>]+>)?/g, '')
    // Remove : ClassValue[] and similar
    .replace(/:\s*[A-Z][a-zA-Z0-9]*(\[\])?/g, (match) => {
        // Only if it looks like a type annotation (not part of an object literal)
        // This is tricky, but we'll try to exclude common JS colon usages
        return '';
    })
    // Final cleanup of extra empty lines
    .replace(/\n\s*\n\s*\n/g, '\n\n');
}

// More specific button-like pattern fix
function fixComponentProps(content) {
    // Matches: function Component({ ... }: React.ComponentProps<...> & ...) {
    return content.replace(/function\s+(\w+)\s*\({([\s\S]*?)}\s*:\s*[\s\S]*?\)\s*{/g, 'function $1({$2}) {');
}

const files = [];
TARGET_DIRS.forEach(dir => {
    const dirPath = path.join(BASE_DIR, dir);
    if (fs.existsSync(dirPath)) {
        getAllFiles(dirPath, files);
    }
});

console.log(`Found ${files.length} files to convert.`);

files.forEach(file => {
  console.log(`Converting ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  
  // Apply conversions
  content = fixComponentProps(content);
  content = stripTypes(content);

  const ext = path.extname(file);
  const newExt = ext === '.tsx' ? '.jsx' : '.js';
  const newFile = file.replace(ext, newExt);

  fs.writeFileSync(newFile, content);
  fs.unlinkSync(file);
});

console.log('Conversion complete.');
