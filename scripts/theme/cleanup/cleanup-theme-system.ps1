# PowerShell Script for removing the entire theme system from the boilerplate
# Use this if you want to use a different theming solution

param(
    [switch]$WhatIf = $false
)

Write-Host "Starting theme system removal..." -ForegroundColor Cyan
Write-Host ""

function Safe-Remove {
    param($Path)

    if (Test-Path $Path) {
        if ($WhatIf) {
            Write-Host "Would remove: $Path" -ForegroundColor Yellow
        } else {
            Remove-Item -Path $Path -Recurse -Force
            Write-Host "Removed: $Path" -ForegroundColor Green
        }
    } else {
        Write-Host "Not found (skipped): $Path" -ForegroundColor Yellow
    }
}

Write-Host "Removing configuration files..." -ForegroundColor Blue
Safe-Remove "src/app/config/theme/"
Safe-Remove "src/app/contexts/theme/"
Safe-Remove "src/app/providers/theme/"

Write-Host ""
Write-Host "Removing SCSS theme files..." -ForegroundColor Blue
Safe-Remove "src/app/styles/themes/dark.scss"
Safe-Remove "src/app/styles/themes/solarized.scss"
Safe-Remove "src/app/styles/themes/dracula.scss"

Write-Host ""
Write-Host "Removing utilities and hooks..." -ForegroundColor Blue
Safe-Remove "src/shared/lib/utils/theme/"
Safe-Remove "src/shared/lib/hooks/theme/"
Safe-Remove "src/shared/lib/hooks/theme-utilities/"

Write-Host ""
Write-Host "Removing demo components..." -ForegroundColor Blue
Safe-Remove "src/shared/components/theme-example/"

Write-Host ""
Write-Host "Removing generation scripts..." -ForegroundColor Blue
Safe-Remove "scripts/theme/"

Write-Host ""
if ($WhatIf) {
    Write-Host "Dry run completed! Use without -WhatIf to actually remove files." -ForegroundColor Green
} else {
    Write-Host "File removal completed!" -ForegroundColor Green
}
Write-Host ""

Write-Host "MANUAL STEPS REQUIRED:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Update package.json:" -ForegroundColor White
Write-Host "   - Remove theme:generate script"
Write-Host "   - Remove theme:generate from dev, dev:prod, build scripts"
Write-Host ""
Write-Host "2. Update src/main.tsx:" -ForegroundColor White
Write-Host "   - Remove ThemeProvider import"
Write-Host "   - Remove ThemeProvider wrapper around App"
Write-Host ""
Write-Host "3. Update src/app/styles/index.scss:" -ForegroundColor White
Write-Host "   - Remove theme imports"
Write-Host ""
Write-Host "4. Update src/shared/lib/hooks/index.ts:" -ForegroundColor White
Write-Host "   - Remove theme and theme-utilities exports"
Write-Host ""
Write-Host "5. Update src/shared/components/index.ts:" -ForegroundColor White
Write-Host "   - Remove theme-example export"
Write-Host ""
Write-Host "6. Update src/shared/model/enums/local-storage/local-strage.enum.ts:" -ForegroundColor White
Write-Host "   - Remove THEME and THEME_AUTO_MODE entries"
Write-Host ""
Write-Host "7. Find and update components using theme hooks" -ForegroundColor White
Write-Host ""

Write-Host "Theme system removal completed" -ForegroundColor Cyan
Write-Host "Now you can integrate any other theming solution you prefer"

Write-Host ""

Write-Host "Usage examples:" -ForegroundColor Cyan
Write-Host "   .\scripts\theme\cleanup\cleanup-theme-system.ps1               # Remove theme system"
Write-Host "   .\scripts\theme\cleanup\cleanup-theme-system.ps1 -WhatIf       # Preview what would be removed"
