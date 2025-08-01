# 🔐 Transcrypt

**Transcrypt** 是一个轻量、安全、专注隐私的文件和消息分享工具。
用户可以在浏览器中加密内容，并通过唯一链接或二维码安全分享。

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

- [] ❗Self-destruct content after too many failed attempts
- [] 📧Send share link to recipient via email
- [] 🌍IP/country access restriction (Cloudflare headers)
- [] ⏰Delay reveal content like a “future letter”
- [] 🔒Visitors can send encrypted messages via anonymous page
- [] 🛡️ Anti-brute-force protection (with Cloudflare Turnstile)

# 📄 License

EPL-2.0 License © 2025 [Vannik-Liu]
