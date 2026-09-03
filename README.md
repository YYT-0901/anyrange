<div align="center">

[![Bilibili 视频]](https://www.bilibili.com/video/BV13xc7zpE9D/)

# anyrange 夯到拉

**anyrange** - 从"夯"(最好) 到 "拉"(最差)

一个现代化的拖拽式排行榜制作工具，支持 Web、iOS、Android 全平台

[在线体验](#) • [功能特性](#-功能特性) • [快速开始](#-快速开始) • [移动端打包](#-移动端打包)

---

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646cff.svg)](https://vitejs.dev/)

---

## 📖 简介

**夯到拉排行榜**是一个优雅、高效的排行榜制作工具，采用中文分级体系，让你轻松创建个性化的排名列表。

### 为什么选择 anyrange？

- 🎨 **新拟态设计** - 冷色系配色，专业优雅，无AI感
- 🖱️ **直观操作** - 拖拽式交互，所见即所得
- 📱 **跨平台支持** - 一套代码，Web/iOS/Android 全覆盖
- 🚀 **性能优异** - 基于 React 18 + Vite，快速响应
- 📤 **导出灵活** - 支持 PNG/PDF 多种格式
- ♿ **无障碍友好** - 响应式设计，适配所有屏幕尺寸

---

## ✨ 功能特性

### 🎯 核心功能

| 功能 | 描述 |
|------|------|
| **5级排行体系** | 夯（顶级）→ 顶级 → 人上人 → NPC → 拉完了（最差） |
| **批量上传** | 一次性上传多张图片，快速建立排行 |
| **拖拽排序** | 流畅的拖拽体验，支持跨层级移动 |
| **移动端优化** | 完美支持触摸操作（长按 100ms 拖动） |
| **垃圾桶删除** | 拖拽时自动显示，释放即删除 |
| **一键重置** | 快速将所有项目移回底部池 |
| **导出功能** | PNG 高清图片 / PDF 文档双格式 |

### 🎨 设计亮点

- **新拟态 UI** - 柔和的浮雕立体感，现代简约
- **冷色系配色** - 蓝、青、灰色调，专业平静
- **单页布局** - 无滚动条设计（桌面端），所有功能一屏展示
- **智能响应** - 自动适配手机、平板、桌面各种尺寸

### 📱 移动端特性

- ✅ 原生 iOS/Android 应用支持
- ✅ 触摸优化（100ms 延迟，5px 容差）
- ✅ 响应式布局自动调整
- ✅ 可发布到 App Store / Google Play

---

## 🛠️ 技术栈

### 前端框架
- **React 18.2** - 现代化 UI 库
- **TypeScript 5.2** - 类型安全
- **Vite 5.1** - 极速构建工具

### UI & 样式
- **Tailwind CSS 3.4** - 原子化 CSS
- **Lucide React** - 轻量级图标库
- **自定义新拟态样式** - 独特的视觉设计

### 拖拽系统
- **@dnd-kit/core** - 高性能拖拽库
- **@dnd-kit/sortable** - 排序功能增强
- 支持鼠标 + 触摸双模式

### 导出功能
- **html2canvas** - 网页截图
- **jsPDF** - PDF 生成

### 移动端
- **Capacitor 8** - Web 转原生应用
- **Android SDK** - Android 打包
- **Xcode** - iOS 打包（仅 macOS）

### 路由
- **React Router DOM 7** - 单页应用路由

---

## 🚀 快速开始

### 前置要求

确保你的开发环境已安装：

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 或 **yarn** >= 1.22.0

### 安装

```bash
# 克隆项目
git clone https://github.com/YYT-0901/anyrange.git
cd anyrange

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 📂 项目结构

```
anyrange/
├── src/
│   ├── assets/              # 静态资源
│   │   └── logo.png        # 应用 Logo
│   ├── components/          # React 组件
│   │   ├── WelcomePage.tsx # 欢迎页面
│   │   ├── TierRow.tsx     # 单个等级轨道
│   │   ├── UnrankedPool.tsx# 底部图片池
│   │   ├── DraggableImage.tsx # 可拖拽图片
│   │   └── TrashBin.tsx    # 垃圾桶
│   ├── pages/
│   │   └── MainPage.tsx    # 主应用页面
│   ├── types.ts            # TypeScript 类型定义
│   ├── config.ts           # 应用配置（GitHub URL等）
│   ├── App.tsx             # 根组件 + 路由
│   ├── main.tsx            # 应用入口
│   └── vite-env.d.ts       # Vite 环境类型
├── public/                  # 公共资源
├── android/                 # Android 原生项目（gitignore）
├── ios/                     # iOS 原生项目（gitignore）
├── capacitor.config.ts      # Capacitor 配置
├── tailwind.config.js       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
├── MOBILE_BUILD.md          # 移动端打包完整指南
└── README.md                # 本文件
```

---

## 🎮 使用指南

### 1. 上传图片

点击左下角的 **上传图片** 按钮，选择一张或多张图片。图片会出现在底部的图片池中。

### 2. 拖拽排序

**桌面端：** 直接拖拽图片到对应等级轨道  
**移动端：** 长按图片（100ms）后拖动

### 3. 调整排名

图片可以在轨道之间自由移动，实时调整排名。

### 4. 删除图片

拖拽图片时，右下角会自动显示垃圾桶。将图片拖到垃圾桶上松手即可删除。

### 5. 导出排行榜

悬停在 **导出** 按钮上，选择导出格式：
- **PNG 图片** - 2x 高清图片
- **PDF 文档** - A4 横向 PDF

### 6. 重置

点击 **重置** 按钮，所有轨道中的图片会回到底部池。（仅当轨道中有图片时显示）

---

## 📱 移动端打包

详细的移动端打包指南请查看 [MOBILE_BUILD.md](./MOBILE_BUILD.md)

### 快速开始

```bash
# Android
npm run build:mobile  # 构建并同步
npm run android       # 打开 Android Studio

# iOS（仅 macOS）
npm run build:mobile  # 构建并同步
npm run ios           # 打开 Xcode
```

### 应用信息

- **App ID:** `com.hangdaola.tierlist`
- **应用名称:** 夯到拉排行榜
- **支持平台:** Android 8.0+ / iOS 13.0+

---

## ⚙️ 配置

### 修改 GitHub 链接

编辑 `src/config.ts`:

```typescript
export const config = {
  appName: 'anyrange',
  displayName: '夯到拉排行榜',
  githubUrl: 'https://github.com/yourusername/anyrange', // 修改这里
  version: '1.0.0',
}
```

### 修改等级标签

编辑 `src/pages/MainPage.tsx` 中的 `tiers` 初始状态:

```typescript
const [tiers, setTiers] = useState<Tier[]>([
  { id: 'hang', label: '夯', color: '#FF3333', items: [] },
  // ... 自定义你的等级
])
```

---

## 🎨 设计系统

### 配色方案

```css
背景色: #e0e5ec   /* 柔和灰蓝 */
主色调: #5b8fb9   /* 冷蓝 */
次色调: #7a9bb8   /* 中蓝 */
辅助色: #8fa8c0   /* 浅蓝 */

阴影-亮: #ffffff
阴影-暗: #a3b1c6
```

### 新拟态阴影

```css
/* 凸起效果 */
box-shadow: 8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff;

/* 凹陷效果 */
box-shadow: inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff;
```

---

## 🧪 开发

### 运行开发服务器

```bash
npm run dev
```

服务器会在 `http://localhost:5173` 启动（端口可能不同）

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 组件使用函数式编写
- 类型定义集中在 `types.ts`

### 路由结构

- `/` - 欢迎页面
- `/app` - 主应用
- `/*` - 重定向到 `/`

---

## 🐛 已知问题

- 图片导出时在某些浏览器中分辨率略低（已设置 2x scale）
- 移动端横屏模式下底部图片池可能需要滚动
- 大量图片（>50张）时性能可能下降

如发现其他问题，请提交 [Issue](https://github.com/yourusername/anyrange/issues)。

---

## 📝 更新日志

### v1.0.0 (2026-02-12)

- ✨ 初始版本发布
- ✅ 5级排行系统
- ✅ 拖拽式交互
- ✅ PNG/PDF 导出
- ✅ 移动端支持
- ✅ 新拟态设计
- ✅ 响应式布局
- ✅ 欢迎页面

---

## 🤝 贡献指南

欢迎所有形式的贡献！

### 如何贡献

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 代码贡献规范

- 保持代码风格一致
- 添加必要的注释
- 更新相关文档
- 通过所有测试

### 报告 Bug

通过 [GitHub Issues](https://github.com/yourusername/anyrange/issues) 提交 Bug，请包含：
- 问题描述
- 复现步骤
- 期望行为
- 实际行为
- 截图（如适用）
- 环境信息（浏览器、操作系统等）

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源。

```
MIT License

Copyright (c) 2026 anyrange

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 致谢

- [React](https://reactjs.org/) - UI 框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [@dnd-kit](https://dndkit.com/) - 拖拽库
- [Capacitor](https://capacitorjs.com/) - 移动端框架
- [Lucide](https://lucide.dev/) - 图标库

---

<div align="center">

**如果觉得这个项目有帮助，请给一个 ⭐ Star！**

Made with ❤️ by anyrange team

</div>
