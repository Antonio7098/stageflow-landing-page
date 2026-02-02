#!/bin/bash
# Patch documentation-template to work in browser

PATCH_FILE="node_modules/documentation-template/dist/index.js"

if [ -f "$PATCH_FILE" ]; then
  # Check if already patched
  if ! grep -q "window.__require" "$PATCH_FILE"; then
    echo "Patching documentation-template for browser compatibility..."
    
    # Add React imports after the react-router-dom import
    sed -i '/import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";/a import * as React from '\''react'\'';\nimport * as ReactDOM from '\''react-dom'\'';' "$PATCH_FILE"
    
    # Add the __require shim after the __require definition
    sed -i '/throw Error("Calling `require` for "\\"" x "\\"" in an environment that doesn'\''t expose the `require` function.");/a\
\
\/\/ ESM shim for __require\
window.__require = function(moduleName) {\
  if (moduleName === '\''react'\'') return React;\
  throw new Error('\''Dynamic require not supported: '\'' + moduleName);\
};' "$PATCH_FILE"
    
    echo "Patch applied successfully!"
  else
    echo "Patch already applied, skipping..."
  fi
fi
