#!/bin/bash

# 1. 创建目录结构
mkdir -p apps/desktop packages/shared

# 2. 初始化根目录 package.json
cat <<EOF > package.json
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "dev:desktop": "pnpm --filter @app/desktop dev",
    "build:desktop": "pnpm --filter @app/desktop build"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "turbo": "latest"
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
EOF

# 3. 创建 pnpm-workspace.yaml
cat <<EOF > pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
EOF

# 4. 创建 .npmrc (解决 Electron 提升问题)
cat <<EOF > .npmrc
public-hoist-pattern[]=*electron*
EOF

# 5. 初始化共享包 packages/shared
cat <<EOF > packages/shared/package.json
{
  "name": "@my-project/shared",
  "version": "1.0.0",
  "main": "./index.ts",
  "types": "./index.ts"
}
EOF

cat <<EOF > packages/shared/index.ts
export const APP_TITLE = "My Electron Monorepo";
export const getSystemInfo = () => "System Info from Shared Package";
EOF

# 6. 初始化 Electron 项目 (使用 electron-vite 模板)
# 注意：这里我们手动创建一个基础结构，实际使用时推荐运行 pnpm create @electron-vite/project apps/desktop
mkdir -p apps/desktop/src/main apps/desktop/src/renderer apps/desktop/src/preload

cat <<EOF > apps/desktop/package.json
{
  "name": "@app/desktop",
  "version": "1.0.0",
  "main": "./src/main/index.js",
  "dependencies": {
    "@my-project/shared": "workspace:*"
  },
  "devDependencies": {
    "electron": "latest",
    "electron-vite": "latest",
    "vite": "latest"
  },
  "scripts": {
    "dev": "electron-vite dev",
    "build": "electron-vite build",
    "preview": "electron-vite preview"
  }
}
EOF

echo "✅ 框架已生成！"
echo "👉 请运行 'pnpm install' 或 'bun install' 安装依赖。"