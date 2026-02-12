# 欢迎页使用指南

## 📱 欢迎页功能

应用启动时会首先显示**全屏欢迎页**，包含：

- **anyrange** 品牌Logo
- **项目介绍** - 夯到拉排行榜工具
- **功能亮点** - 5级排行、拖拽操作、一键导出
- **开始使用** - 通过路由跳转到主应用 (`/app`)
- **了解更多** - 在新标签页打开GitHub项目

## 🚀 路由结构

应用使用 React Router 进行页面导航：

```
/          ← 欢迎页 (WelcomePage)
/app       ← 主应用 (MainPage)
/*         ← 404重定向到欢迎页
```

## ⚙️ 自定义配置

### 修改 GitHub 链接

编辑 `src/config.ts` 文件：

```typescript
export const config = {
  appName: 'anyrange',
  displayName: '夯到拉排行榜',
  githubUrl: 'https://github.com/YOUR_USERNAME/anyrange', // 修改这里
  version: '1.0.0',
}
```

### 直接进入主应用（开发时）

如果您在开发时想跳过欢迎页，直接访问：

```
http://localhost:5180/app
```

或者修改 `src/App.tsx` 将首页改为主应用：

```typescript
<Route path="/" element={<MainPage />} />
<Route path="/welcome" element={<WelcomePage githubUrl={config.githubUrl} />} />
```

## 🎨 全屏设计说明

欢迎页使用 `fixed inset-0` 实现真正的全屏效果：

```tsx
<div className="fixed inset-0 flex items-center justify-center p-4">
```

这确保了：
- ✅ 占据整个视口
- ✅ 不受页面滚动影响
- ✅ 完美适配移动端
- ✅ 背景覆盖全屏

## 📝 修改欢迎页内容

欢迎页组件位于 `src/components/WelcomePage.tsx`，您可以自定义：

### 修改Logo文字
```tsx
<div className="text-6xl sm:text-7xl font-bold">
  夯拉  {/* 修改这里 */}
</div>
```

### 修改标语
```tsx
<p className="text-xl sm:text-2xl">
  夯到拉 Tier List Maker  {/* 修改这里 */}
</p>
```

### 修改功能介绍
在 Features 区域修改三个特性卡片的内容。

## 🧭 导航原理

点击"开始使用"时，使用 React Router 的 `useNavigate` 进行导航：

```typescript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

// 点击按钮
onClick={() => navigate('/app')}
```

这实现了：
- ✅ SPA单页应用体验
- ✅ 无页面刷新
- ✅ 支持浏览器前进/后退
- ✅ URL地址栏变化

## 📱 手机应用适配

欢迎页已完全适配手机端：

- 响应式布局（`sm:` 断点）
- 触摸友好的按钮尺寸
- 全屏覆盖，无滚动条
- 新拟态效果在移动端同样美观

## 🚀 发布建议

发布到应用商店或网页时，建议：

1. ✅ 保留欢迎页作为启动页
2. ✅ 设置正确的 GitHub 链接
3. ✅ 确保路由导航正常
4. ✅ 在各种屏幕尺寸上测试

## 🎯 用户流程

```
访问应用 (/)
   ↓
全屏欢迎页
   ↓
[开始使用] → 路由跳转到 /app (主应用)
[了解更多] → GitHub (新标签)
   ↓
可通过浏览器后退返回欢迎页
```

## 💡 提示

- 欢迎页是独立的路由页面 (`/`)
- 主应用是独立的路由页面 (`/app`)
- 支持浏览器前进/后退按钮
- 直接访问 `/app` 可跳过欢迎页
- 刷新页面会保持当前路由

## 🔧 技术细节

### 项目结构

```
src/
├── App.tsx                 ← 路由配置
├── pages/
│   └── MainPage.tsx        ← 主应用页面
├── components/
│   └── WelcomePage.tsx     ← 欢迎页组件
├── types.ts                ← TypeScript类型定义
└── config.ts               ← 应用配置
```

### 依赖包

- `react-router-dom` - 路由管理
- 所有路由组件都是懒加载友好的
