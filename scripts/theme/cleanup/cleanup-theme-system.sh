#!/bin/bash

# Script for removing the entire theme system from the boilerplate
# Use this if you want to use a different theming solution

set -e

echo "Starting theme system removal..."
echo ""

safe_remove() {
    if [ -e "$1" ]; then
        rm -rf "$1"
        echo "Removed: $1"
    else
        echo "Not found (skipped): $1"
    fi
}

echo "Removing configuration files..."
safe_remove "src/app/config/theme/"
safe_remove "src/app/contexts/theme/"
safe_remove "src/app/providers/theme/"

echo ""
echo "Removing SCSS theme files..."
safe_remove "src/app/styles/themes/dark.scss"
safe_remove "src/app/styles/themes/solarized.scss"
safe_remove "src/app/styles/themes/dracula.scss"

echo ""
echo "Removing utilities and hooks..."
safe_remove "src/shared/lib/utils/theme/"
safe_remove "src/shared/lib/hooks/theme/"
safe_remove "src/shared/lib/hooks/theme-utilities/"

echo ""
echo "Removing demo components..."
safe_remove "src/shared/components/theme-example/"

echo ""
echo "Removing generation scripts..."
safe_remove "scripts/theme/"

echo ""
echo "File removal completed!"
echo ""

echo "MANUAL STEPS REQUIRED:"
echo ""
echo "1. Update package.json:"
echo "   - Remove 'theme:generate' script"
echo "   - Remove 'theme:generate &&' from 'dev', 'dev:prod', 'build' scripts"
echo ""
echo "2. Update src/main.tsx:"
echo "   - Remove ThemeProvider import"
echo "   - Remove ThemeProvider wrapper around <App />"
echo ""
echo "3. Update src/app/styles/index.scss:"
echo "   - Remove theme imports"
echo ""
echo "4. Update src/shared/lib/hooks/index.ts:"
echo "   - Remove theme and theme-utilities exports"
echo ""
echo "5. Update src/shared/components/index.ts:"
echo "   - Remove theme-example export"
echo ""
echo "6. Update src/shared/model/enums/local-storage/local-storage.enum.ts:"
echo "   - Remove THEME and THEME_AUTO_MODE entries"
echo ""
echo "7. Find and update components using theme hooks"

echo "Theme system removal completed"
echo "Now you can integrate any other theming solution you prefer"

echo "Usage examples:"
echo "   ./scripts/theme/cleanup/cleanup-theme-system.sh"
