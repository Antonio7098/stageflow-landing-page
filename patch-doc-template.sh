#!/bin/bash
# Patch documentation-template to work in browser

PATCH_FILE="node_modules/documentation-template/dist/index.js"

if [ -f "$PATCH_FILE" ]; then
  # Check if already patched
  if ! grep -q "window.__require" "$PATCH_FILE"; then
    echo "Patching documentation-template for browser compatibility..."
    
    # Add the __require shim after the __require definition
    sed -i '/throw Error("Calling `require` for "\\"" x "\\"" in an environment that doesn'\''t expose the `require` function.");/a\
\
\/\/ ESM shim for __require\
window.__require = function(moduleName) {\
  if (moduleName === '\''react'\'') return { createContext, createElement, forwardRef, useContext, useEffect, useMemo, useRef, useState };\
  throw new Error('\''Dynamic require not supported: '\'' + moduleName);\
};' "$PATCH_FILE"
    
    echo "Patch applied successfully!"
  else
    echo "Patch already applied, skipping..."
  fi
fi
