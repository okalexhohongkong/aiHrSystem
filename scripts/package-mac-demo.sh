#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RELEASE_DIR="$ROOT_DIR/release"

cd "$ROOT_DIR"

package_variant() {
  local variant="$1"
  local mode="$2"
  local app_name="$3"
  local bundle_id="$4"
  local port="$5"
  local stage_dir="$RELEASE_DIR/$variant"
  local app_dir="$stage_dir/$app_name.app"
  local contents_dir="$app_dir/Contents"
  local dmg_path="$RELEASE_DIR/$app_name-mac.dmg"
  local zip_path="$RELEASE_DIR/$app_name-mac.zip"

  VITE_HR_REFERENCE_MODE="$mode" npm run build

  rm -rf "$stage_dir" "$dmg_path" "$zip_path"
  mkdir -p "$contents_dir/MacOS" "$contents_dir/Resources"

  cp "$ROOT_DIR/packaging/mac/Info.plist" "$contents_dir/Info.plist"
  plutil -replace CFBundleDisplayName -string "$app_name" "$contents_dir/Info.plist"
  plutil -replace CFBundleName -string "$app_name" "$contents_dir/Info.plist"
  plutil -replace CFBundleIdentifier -string "$bundle_id" "$contents_dir/Info.plist"

  cp "$ROOT_DIR/packaging/mac/launcher" "$contents_dir/MacOS/launcher"
  /usr/bin/perl -0pi -e "s/PORT=\"\\$\\{HEIWEISHI_AIHR_PORT:-5188\\}\"/PORT=\"\\$\\{HEIWEISHI_AIHR_PORT:-$port\\}\"/" "$contents_dir/MacOS/launcher"
  chmod +x "$contents_dir/MacOS/launcher"

  cp -R "$ROOT_DIR/dist" "$contents_dir/Resources/dist"
  cp "$ROOT_DIR/packaging/mac/README.txt" "$stage_dir/安装说明-请先读.txt"

  ditto -c -k --keepParent "$stage_dir" "$zip_path"

  if command -v hdiutil >/dev/null 2>&1; then
    hdiutil create \
      -volname "$app_name" \
      -srcfolder "$stage_dir" \
      -ov \
      -format UDZO \
      "$dmg_path" >/dev/null
  fi

  echo "$dmg_path"
  echo "$zip_path"
}

if [ "${1:-all}" = "a" ] || [ "${1:-all}" = "all" ]; then
  package_variant "heiwenshi-aihr-classic-mac" "hidden" "黑卫士 AI HR 经典版" "cn.heiweishi.aihr.classic" "5188"
fi

if [ "${1:-all}" = "b" ] || [ "${1:-all}" = "all" ]; then
  package_variant "heiwenshi-aihr-international-mac" "visible" "黑卫士 AI HR 国际版" "cn.heiweishi.aihr.international" "5189"
fi
