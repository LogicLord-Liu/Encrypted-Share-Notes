<h1 align="center">
  🔐 Transcrypt - 发送私密和安全的消息
</h1>
<p align="center">
  专为发送端到端加密笔记和文件而设计的简约风格网页应用程序。
</p>

<p align="center">
  <a href="https://enclosed.cc">Demo</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/LogicLord-Liu/Encrypted-Share-Notes/blob/main/README.md">英文</a>
</p>

**Transcrypt** 是一个轻量、安全、专注隐私的文件和消息分享工具。
用户可以在浏览器中加密内容，并通过唯一链接或二维码安全分享。

![Transcrypt](https://lorcan.dpdns.org/TranscryptScreenShot.png)

## ✨ Features

- 🔒 端到端加密 (AES-256)
- 📤 支持文件和文本的加密分享
- 🧨 阅后即焚
- ⏳ 可选密码保护
- 🔐 支持二维码分享
- 📱 密码强度检测
- 🧩 随机链接地址
- 📶 二维码自带密码	二维码中携带密码（如 base64 URL），扫描后自动填密码直接解密

## 🛠 Tech Stack

| 类别           | 技术/工具                              |
|----------------|----------------------------------------|
| 前端语言       | HTML / TypeScript / JavaScript         |
| 样式系统       | UnoCSS / Tailwind CSS                  |
| 加密引擎       | Web Crypto API                         |
| 二维码支持     | QRCode.js                              |
| 部署建议（可选）| Cloudflare Pages / Vercel             |

## Future features

- [ ] ❗超过指定次数自动销毁内容
- [ ] 📧邮件通知接收者生成链接后填写邮箱，系统自动发送分享链接（通过 MailChannels）
- [ ] 🌍限制访问 IP/Country 上传时可选择：仅限某些国家 / IP 查看（结合 Cloudflare headers）
- [ ] ⏰延时公开内容（定时揭晓）类似“未来邮件”：上传内容设定几天后才开放解密
- [ ] 🔒生成匿名留言链接访客可以给你发送一条加密内容（你有密码才能看）
- [ ] 🛡️防爆破机制多次尝试错误后 IP 封锁（可结合 Cloudflare Turnstile 验证）

# 📄 License

EPL-2.0 License © 2025 [Vannik-Liu](https://github.com/LogicLord-Liu/)
