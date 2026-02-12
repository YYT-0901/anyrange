# 📱 夯到拉排行榜 - 手机应用打包指南

## 🎯 概述

这个应用已经配置为可以打包成原生的 iOS 和 Android 应用！

## 📋 前置要求

### Android 开发
- **Android Studio** (最新版本)
- **Java JDK 17+**

### iOS 开发 (仅 macOS)
- **Xcode 14+**
- **CocoaPods**: `sudo gem install cocoapods`
- **Apple Developer 账号** (发布到 App Store 需要)

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 构建并同步到原生项目
```bash
npm run build:mobile
```

### 3. 打开原生项目

#### Android
```bash
npm run android
```
或者手动打开:
```bash
npx cap open android
```

#### iOS (仅 macOS)
```bash
npm run ios
```
或者手动打开:
```bash
npx cap open ios
```

## 📦 打包流程

### Android APK/AAB

1. 打开 Android Studio
2. 选择 `Build > Generate Signed Bundle / APK`
3. 选择 APK 或 Android App Bundle (AAB)
4. 创建或选择密钥库
5. 构建完成后在 `android/app/build/outputs/` 找到文件

**快速调试 APK**:
```bash
cd android
./gradlew assembleDebug
```
APK 位置: `android/app/build/outputs/apk/debug/app-debug.apk`

### iOS App

1. 打开 Xcode
2. 选择真机或模拟器
3. 设置 Team 和 Bundle Identifier
4. 点击 Run 运行或 Archive 打包
5. 通过 Xcode Organizer 上传到 App Store Connect

**注意**: iOS 应用必须在 macOS 上使用 Xcode 编译

## 🔄 更新应用

每次修改代码后，需要重新构建和同步:

```bash
npm run build:mobile
```

## 🎨 自定义图标和启动画面

### 生成图标
1. 准备一个 1024x1024 的 PNG 图标
2. 使用在线工具生成各种尺寸:
   - [App Icon Generator](https://www.appicon.co/)
   - [Capacitor Assets](https://github.com/ionic-team/capacitor-assets)

### Android 图标位置
```
android/app/src/main/res/
├── mipmap-hdpi/
├── mipmap-mdpi/
├── mipmap-xhdpi/
├── mipmap-xxhdpi/
└── mipmap-xxxhdpi/
```

### iOS 图标位置
```
ios/App/App/Assets.xcassets/AppIcon.appiconset/
```

## 📱 测试应用

### Android
- 使用 Android Studio 的模拟器
- 或连接真实设备并启用 USB 调试

### iOS
- 使用 Xcode 的 iOS 模拟器
- 或连接 iPhone/iPad (需要 Apple Developer 账号)

## 🌐 发布到应用商店

### Google Play Store
1. 创建 Google Play Developer 账号 ($25 一次性费用)
2. 生成签名的 AAB 文件
3. 在 Google Play Console 创建应用
4. 上传 AAB 并填写应用信息
5. 提交审核

### Apple App Store
1. 注册 Apple Developer Program ($99/年)
2. 在 App Store Connect 创建应用
3. 使用 Xcode Archive 并上传
4. 填写应用信息和截图
5. 提交审核

## 🛠️ 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器

# 构建
npm run build           # 构建网页版本
npm run build:mobile    # 构建并同步到原生项目

# 原生平台
npm run android         # 打开 Android Studio
npm run ios             # 打开 Xcode (仅 macOS)

# Capacitor
npx cap sync            # 同步代码到原生项目
npx cap copy            # 只复制 web 资源
npx cap update          # 更新 Capacitor 插件
```

## 🔧 故障排除

### Android 构建失败
- 确保安装了正确版本的 JDK
- 检查 ANDROID_HOME 环境变量
- 在 Android Studio 中同步 Gradle

### iOS 构建失败
- 运行 `pod install` 在 ios/App 目录
- 确保 Xcode 版本是最新的
- 检查 Bundle Identifier 是否唯一

### 代码更新后没有生效
```bash
npm run build:mobile
```
然后在 Android Studio 或 Xcode 中重新运行

## 📚 更多资源

- [Capacitor 官方文档](https://capacitorjs.com/)
- [Android 开发者指南](https://developer.android.com/)
- [iOS 开发者指南](https://developer.apple.com/)
- [Google Play 发布指南](https://support.google.com/googleplay/android-developer/)
- [App Store 发布指南](https://developer.apple.com/app-store/submissions/)

## 💡 提示

- 应用图标建议使用简洁、辨识度高的设计
- 定期更新 Capacitor 和插件版本
- 在真实设备上测试触摸和拖拽功能
- 发布前充分测试各种屏幕尺寸
