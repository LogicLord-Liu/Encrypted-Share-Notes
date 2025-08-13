<h1 align="center">
  🔐 Transcrypt - Send private and secure notes
</h1>
<p align="center">
  Minimalistic web application designed for sending end-to-end encrypted notes and files.
</p>

<p align="center">
  <a href="https://enclosed.cc">Demo</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/LogicLord-Liu/Encrypted-Share-Notes/blob/main/README_zh-CN.md">简体中文</a>
</p>

**Transcrypt** is a lightweight, secure, and privacy-focused file and message sharing tool.
Easily encrypt your content in the browser and share it via a unique link or QR code.

![Transcrypt](https://lorcan.dpdns.org/TranscryptScreenShot.png)

## ✨ Features

- 🔒 End-to-end encryption (AES-256)
- 📤 Secure file & text sharing
- 🧨 Self-destruct after read or expiration
- ⏳ Optional password protection
- 🔐 QR code sharing support
- 📱 Password strength detection
- 🧩 Generate random token (ID) as unguessable URL
- 📶 QR code embeds password for auto-decrypt

## 🛠 Tech Stack

| Category           | Tools                              |
|----------------|----------------------------------------|
| Frontend       | HTML / TypeScript / JavaScript         |
| Styling        | UnoCSS / Tailwind CSS                  |
| Crypto         | Web Crypto API                         |
| QRCode     | QRCode.js                              |
| Deployment（Option）| Cloudflare Pages / Vercel             |

## Future features

- [x] ❗Self-destruct content after too many failed attempts
- [x] 📧Send share link to recipient via email
- [ ] 🌍IP/country access restriction (Cloudflare headers)
- [ ] ⏰Delay reveal content like a “future letter”
- [ ] 🔒Visitors can send encrypted messages via anonymous page
- [ ] 🛡️ Anti-brute-force protection (with Cloudflare Turnstile)

## Began to Deploy Service

- Environment Request
  - Cloudflare Account
  - GitHub Account
  - Custom domains (optional)

- Step One
  - Fork [offical GiHub Repository](https://github.com/LogicLord-Liu/Encrypted-Share-Notes) to your account.
  - Login in Cloudflare and connect GitHub.
  - Ento `Workes & Pages`，press `Create application`，Select `Pages`.
  - Follow the instructions to connect to your Git repository and select your project
  - **Configuration construction settings**:
    - **Framework preset**：Select `Astro`.
    - **Build command**：`npm run build`.
    - **Build output directory**：`dist`.
  - Press `Save and Deploy`.CLoudflare Pages will auto build and run your project.

- Step Two
  - CLoudflare dashboard，find your project，find `Custom domains`selection.
  - Press `Set up a custom domain`，input your custom domains(Such as `note.my-domain.com`).
  - Cloudflare will provide you with a `CNAME` record. Add this record in your DNS manager. If your domain is also managed by Cloudflare, it will be added automatically for you.
  - Wait several minutes to hours for Cloudflare to verify and activate your custom domain.

- Step Three
  - Ento `Setting`.
  - Navigate to `Functions` -> `KV namespaces`.
  - Press `Add binding`.
  - `Variable name`：input **NOTES_KV**.
  - `KV namespace`：Select the `ENCLOSED_NOTES` namespace you created earlier(If you haven't created one yet, you'll need to create one.).

> 📌 At this point, your encrypted note service is deployed! You can use the page to publish, share, and self-destruct encrypted content.

# 📄 License

EPL-2.0 License © 2025 [Vannik-Liu](https://github.com/LogicLord-Liu/)
