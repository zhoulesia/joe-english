# Joe English · Family Week V4 — AI British Voice

这一版不再依赖浏览器自带的系统朗读作为主声音。

## V4 语音
主声音由服务器通过 OpenAI Speech API 生成：
- model: gpt-4o-mini-tts
- voice: shimmer
- style: clear standard British English
- bright / warm / youthful female-presenter style
- slightly slower for a 3-year-old learner
- browser en-GB TTS only as fallback

## 为什么不能继续只用 GitHub Pages
GitHub Pages 是静态网站，不能安全保存 API key。
V4 需要 `/api/tts` 服务端函数，因此推荐把同一个 GitHub 仓库导入 Vercel。
GitHub 仍然保存代码；Vercel 负责发布网页和安全后端。

## 安全
不要把 OPENAI_API_KEY 写进 app.js、GitHub 文件或聊天截图。
它只应该配置为 Vercel Environment Variable。

## 部署流程
1. 将 V4 的文件覆盖/上传到当前 `joe-english` GitHub 仓库。
2. 在 Vercel 用 GitHub 登录。
3. Import `zhoulesia/joe-english`。
4. Environment Variables 添加：
   OPENAI_API_KEY = 你的 API key
5. Deploy。
6. 打开 Vercel 给出的 HTTPS 地址测试朗读。

## 注意
OpenAI API 是单独计费的服务，ChatGPT 订阅本身不等同于 API 额度。
如果 `/api/tts` 不可用，网页会自动回退到设备上的 en-GB 浏览器语音。
