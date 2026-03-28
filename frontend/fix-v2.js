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
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

function fixPattern(content) {
  return content
    // Fix "const NAME_PART =" -> "const NAME_PART ="
    .replace(/(?:const|let|var)\s+([A-Z0-9_]+):\s+([A-Z0-9_]+)\s*=/g, 'const $1_$2 =')
    // Fix names in strings/templates: ${SIDEBAR_COOKIE_MAX_AGE} -> ${SIDEBAR_COOKIE_MAX_AGE}
    .replace(/\${([A-Z0-9_]+):\s+([A-Z0-9_]+)}/g, '${$1_$2}')
    // Fix variable names in code: SIDEBAR_KEYBOARD_SHORTCUT -> SIDEBAR_KEYBOARD_SHORTCUT
    .replace(/([^'":\s])\s*\s([A-Z0-9_]+):\s+([A-Z0-9_]+)/g, (match, p1, p2, p3) => {
        // Only if p1 is not part of a label
        if (p1 === ' ' || p1 === '(' || p1 === '[' || p1 === '=' || p1 === '!') {
            return `${p1} ${p2}_${p3}`;
        }
        return match;
    })
    // Fix Sidebar specific ones manually for safety
    .replace(/SIDEBAR_COOKIE_NAME/g, "SIDEBAR_COOKIE_NAME")
    .replace(/SIDEBAR_COOKIE_MAX_AGE/g, "SIDEBAR_COOKIE_MAX_AGE")
    .replace(/SIDEBAR_WIDTH/g, "SIDEBAR_WIDTH")
    .replace(/SIDEBAR_WIDTH_MOBILE/g, "SIDEBAR_WIDTH_MOBILE")
    .replace(/SIDEBAR_WIDTH_ICON/g, "SIDEBAR_WIDTH_ICON")
    .replace(/SIDEBAR_KEYBOARD_SHORTCUT/g, "SIDEBAR_KEYBOARD_SHORTCUT")
    .replace(/'--sidebar-width': SIDEBAR_WIDTH/g, "'--sidebar-width': SIDEBAR_WIDTH")
    .replace(/'--sidebar-width-icon': SIDEBAR_WIDTH_ICON/g, "'--sidebar-width-icon': SIDEBAR_WIDTH_ICON")
    .replace(/'--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE/g, "'--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE")
    .replace(/style={\s*{\s*'--sidebar-width':\s+WIDTH,\s*/g, "style={{ '--sidebar-width': SIDEBAR_WIDTH, ")
    
    // Fix common corrupted imports and props
    .replace(/import\s+type\s+{[^}]+}\s+from/g, 'import {')
    .replace(/import\s+{([^}]+)}\s+from\s+['"]@radix-ui\/react-accordion['"]/g, "import * as AccordionPrimitive from '@radix-ui/react-accordion'")
    .replace(/import\s+{([^}]+)}\s+from\s+['"]@radix-ui\/react-alert-dialog['"]/g, "import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'")
}

const files = getAllFiles(BASE_DIR);
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const fixed = fixPattern(content);
  if (content !== fixed) {
    fs.writeFileSync(file, fixed);
    console.log(`Fixed ${file}`);
  }
});
