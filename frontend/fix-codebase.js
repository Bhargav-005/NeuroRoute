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

function fixCorruptedCode(content) {
  return content
    // Fix "import * from 'react'" -> "import * as React from 'react'"
    .replace(/import\s+\*\s+from\s+'react'/g, "import * as React from 'react'")
    // Fix other "import * from"
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-accordion'/g, "import * as AccordionPrimitive from '@radix-ui/react-accordion'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-alert-dialog'/g, "import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-avatar'/g, "import * as AvatarPrimitive from '@radix-ui/react-avatar'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-checkbox'/g, "import * as CheckboxPrimitive from '@radix-ui/react-checkbox'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-collapsible'/g, "import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-context-menu'/g, "import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-dialog'/g, "import * as DialogPrimitive from '@radix-ui/react-dialog'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-dropdown-menu'/g, "import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-hover-card'/g, "import * as HoverCardPrimitive from '@radix-ui/react-hover-card'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-menubar'/g, "import * as MenubarPrimitive from '@radix-ui/react-menubar'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-navigation-menu'/g, "import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-popover'/g, "import * as PopoverPrimitive from '@radix-ui/react-popover'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-progress'/g, "import * as ProgressPrimitive from '@radix-ui/react-progress'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-radio-group'/g, "import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-scroll-area'/g, "import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-select'/g, "import * as SelectPrimitive from '@radix-ui/react-select'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-separator'/g, "import * as SeparatorPrimitive from '@radix-ui/react-separator'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-slider'/g, "import * as SliderPrimitive from '@radix-ui/react-slider'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-switch'/g, "import * as SwitchPrimitive from '@radix-ui/react-switch'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-tabs'/g, "import * as TabsPrimitive from '@radix-ui/react-tabs'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-toggle-group'/g, "import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-toggle'/g, "import * as TogglePrimitive from '@radix-ui/react-toggle'")
    .replace(/import\s+\*\s+from\s+'@radix-ui\/react-tooltip'/g, "import * as TooltipPrimitive from '@radix-ui/react-tooltip'")
    .replace(/import\s+\*\s+from\s+'vaul'/g, "import { Drawer as DrawerPrimitive } from 'vaul'")
    
    // Fix property corruption: 'propertyName'_VARIABLE -> 'propertyName': VARIABLE
    // Or propertyName_VARIABLE -> propertyName: VARIABLE
    .replace(/(['"]?[\w-]+['"]?)_([A-Z][A-Z0-9_]*)/g, '$1: $2')
    
    // Fix ".CSSProperties" remnants
    .replace(/\.CSSProperties/g, '')

    // Fix "}: React.ComponentProps<'div'> & {" type patterns
    .replace(/}\s*:\s*React\.ComponentProps<[^>]+>\s*&\s*{[^}]+}/g, '}')
    .replace(/}\s*:\s*React\.ComponentProps<[^>]+>/g, '}')
    
    // Fix "}: VariantProps<typeof \w+> & {"
    .replace(/}\s*:\s*VariantProps<[^>]+>\s*&\s*{[^}]+}/g, '}')
    .replace(/}\s*:\s*VariantProps<[^>]+>/g, '}')

    // Fix remaining `: Props` in function signatures
    .replace(/\)\s*:\s*[A-Z][a-zA-Z0-9]*\s*{/g, ') {')
    .replace(/\)\s*:\s*React\.ReactNode/g, ')')

    // Fix "const \w+ = React.createContext<[^>]+>..."
    .replace(/React\.createContext<[^>]+>\(/g, 'React.createContext(')
    
    // Fix props destructuring: "({ ... } : \w+)"
    .replace(/\({([\s\S]*?)}\s*:\s*[A-Z][a-zA-Z0-9]*\s*(?:&\s*[A-Z][a-zA-Z0-9]*)*\s*(?:\{[\s\S]*?\})?/g, '({$1}')
    
    // Fix sidebar specific issue with SIDEBAR_WIDTH
    .replace(/'--sidebar-width': _WIDTH/g, "'--sidebar-width': SIDEBAR_WIDTH")
    .replace(/'--sidebar-width-mobile': _WIDTH_MOBILE/g, "'--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE")
    .replace(/'--sidebar-width-icon': _WIDTH_ICON/g, "'--sidebar-width-icon': SIDEBAR_WIDTH_ICON")
    .replace(/'--skeleton-width': width/g, "'--skeleton-width': width");
}

const files = [];
TARGET_DIRS.forEach(dir => {
    const dirPath = path.join(BASE_DIR, dir);
    if (fs.existsSync(dirPath)) {
        getAllFiles(dirPath, files);
    }
});

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const fixed = fixCorruptedCode(content);
  if (content !== fixed) {
    console.log(`Fixed ${file}`);
    fs.writeFileSync(file, fixed);
  }
});

console.log('Fixing complete.');
