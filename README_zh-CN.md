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

## 开始部署服务

### 环境准备

- Cloudflare 账户
- GitHub 账户
- 自定义域名（可选）

---

### 第一步：部署到 Cloudflare Pages

1. Fork 官方 GitHub 仓库：[LogicLord-Liu/Encrypted-Share-Notes](https://github.com/LogicLord-Liu/Encrypted-Share-Notes) 到你的 GitHub 账户。
2. 登录 [Cloudflare](https://dash.cloudflare.com/)，进入 **Workers & Pages**。
3. 点击 **创建应用**，选择 **Pages**。
4. 连接你的 GitHub 账号，选择刚刚 Fork 的项目。
5. 配置构建设置：
   - **框架预设**：选择 `Astro`
   - **构建命令**：`npm run build`
   - **输出目录**：`dist`
6. 点击 **保存并部署**，Cloudflare Pages 会自动构建并部署该项目。

---

### 第二步：绑定自定义域名（可选）

1. 在 Cloudflare 仪表盘中找到你的 Pages 项目，进入项目详情。
2. 点击左侧菜单中的 **Custom domains**，选择 **Set up a custom domain**。
3. 输入你的自定义子域名（如 `note.your-domain.com`）。
4. Cloudflare 会提供一个 `CNAME` 记录，添加到你的域名 DNS 中。如果域名本身由 Cloudflare 管理，这一步会自动完成。
5. 等待几分钟至几小时，Cloudflare 会验证并启用你的自定义域名。

---

### 第三步：绑定 KV 存储空间

1. 在 Cloudflare Pages 项目中，点击左侧 **Settings** 设置页。
2. 进入 `Functions` -> `KV namespaces`。
3. 点击 **Add binding** 添加绑定。
4. 填写信息：
   - `变量名（Variable name）`：输入 **NOTES_KV**
   - `KV 命名空间（KV namespace）`：选择你之前创建的 `ENCLOSED_NOTES` 命名空间（如果还没有，需要先手动创建一个）。

---

> 📌 至此，你的加密笔记服务就部署完成了！可以使用页面进行加密内容发布、分享、阅后即焚等功能。

# 📄 License

EPL-2.0 License © 2025 [Vannik-Liu](https://github.com/LogicLord-Liu/)
