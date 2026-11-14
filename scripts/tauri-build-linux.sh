#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  bun run tauri build
else
  bun run tauri "$@"
fi

appimage_path="$(find src-tauri/target/release/bundle/appimage -maxdepth 1 -name '*.AppImage' -print -quit)"
if [[ -z "$appimage_path" ]]; then
  echo "AppImage not found in src-tauri/target/release/bundle/appimage" >&2
  exit 1
fi

work_dir="$(mktemp -d)"
trap 'rm -rf "$work_dir"' EXIT

appimage_abs="$(realpath "$appimage_path")"
(
  cd "$work_dir"
  chmod +x "$appimage_abs"
  APPIMAGE_EXTRACT_AND_RUN=1 "$appimage_abs" --appimage-extract >/dev/null
)

squashfs_dir="$work_dir/squashfs-root"

if [[ -d "$squashfs_dir/usr/lib" ]]; then
  for pattern in \
    'libepoxy.so*' \
    'libwayland-client.so*' \
    'libGL*.so*' \
    'libEGL*.so*' \
    'libgbm.so*' \
    'libdrm*.so*'; do
    find "$squashfs_dir/usr/lib" -name "$pattern" -delete 2>/dev/null || true
  done
fi

for hook_file in \
  "$squashfs_dir/apprun-hooks/linuxdeploy-plugin-gtk.sh" \
  "$squashfs_dir/AppRun"; do
  if [[ -f "$hook_file" ]]; then
    sed -i 's/export GDK_BACKEND=x11/export GDK_BACKEND="${GDK_BACKEND:-wayland,x11}"/g' "$hook_file"
  fi
done

appimagetool_bin="${HOME}/.cache/tauri/appimagetool-x86_64.AppImage"
if [[ ! -x "$appimagetool_bin" ]]; then
  appimagetool_bin="$work_dir/appimagetool-x86_64.AppImage"
  curl -fsSL -o "$appimagetool_bin" \
    "https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-x86_64.AppImage"
  chmod +x "$appimagetool_bin"
fi

rm -f "$appimage_abs"
chmod -R a+rX "$squashfs_dir"
if [[ -f "$squashfs_dir/AppRun" ]]; then
  chmod a+rx "$squashfs_dir/AppRun"
fi
ARCH=x86_64 APPIMAGE_EXTRACT_AND_RUN=1 "$appimagetool_bin" --no-appstream "$squashfs_dir" "$appimage_abs"

if [[ -n "${TAURI_SIGNING_PRIVATE_KEY:-}" ]]; then
  rm -f "${appimage_abs}.sig"
  bun run tauri signer sign "$appimage_abs"
fi
