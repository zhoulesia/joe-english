# Joe English · Family Week V3

V3 在 V2 基础上增加：
- PWA 安装能力：部署到 HTTPS 网站后可“添加到主屏幕”，像 App 一样打开。
- Service Worker 离线缓存。
- 家长设置：Joe 喜欢的主题、每日 10/12/15 分钟。
- 自适应摘要：根据 Joe 跟读和互动次数提示后续学习方向。
- `SKILL.md`：把 Joe 的教学规则整理成可迁移的 Skill 规范。
- 保留 7 天 Family Week、自动朗读、外婆中文提示、跟读和星星反馈。

## 最简单的电脑测试
进入本文件夹运行：
`python3 -m http.server 8000`
然后打开 `http://localhost:8000`

## 手机/iPad 安装
需要先把整个文件夹部署到一个 HTTPS 静态网站。部署后：
- iPhone/iPad Safari：分享 → 添加到主屏幕
- Android/Chrome：浏览器菜单 → 安装应用 / 添加到主屏幕
- 支持的桌面浏览器也会出现“安装 Joe English”按钮。

## 关于真正的 AI 自动生成
这个离线包没有内置任何 API key，因此不会把密钥暴露给浏览器。
下一步正式上线时应增加安全后端，例如 `/api/session`：
后端读取 Joe Profile + 最近学习记录 + 本周主题，再调用模型生成下一节课。
前端只接收结构化课程 JSON。

## 发音反馈
当前仍是浏览器 SpeechRecognition 的游戏化反馈，不是专业儿童音素评分。
