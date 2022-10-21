<div align="center">
    <img src="./src/assets/logo-dappland.gif" alt="Dappland logo animated"width=400 alt="dappland-logo" />
    <h4>The home for all dapps in the StarkNet ecosystem</h4>
    <p>Built with ❤️ by <a style="text-decoration: underline; color:black" href="https://argent.xyz">Argent</p>
</div>

[![Node.js CI](https://github.com/argentlabs/dappland/actions/workflows/deploy.yml/badge.svg)](https://github.com/argentlabs/dappland/actions/workflows/deploy.yml)

## 🧭 Explore the StarkNet ecosystem

Visit <a href="https://dappland.com"><b>Dappland</b></a> to explore the most influential dapps in the StarkNet ecosystem.

To use them, download <a href="https://github.com/argentlabs/argent-x"><b>Argent X</b></a>, the only open source wallet for StarkNet

<div align="center">
    <a href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb">
        <img src="https://argentwebsite.cdn.prismic.io/argentwebsite/55c4ef75-22fb-476d-a088-d61ae5f44002_button-chrome.svg" width=150/>
    </a>
    <a href="https://addons.mozilla.org/en-GB/firefox/addon/argent-x/">
        <img src="https://argentwebsite.cdn.prismic.io/argentwebsite/8d151e84-6437-4670-9e5c-6614463f8c3a_button-firefox.svg" width=150/>
    </a>
 
</div>

## ✅ Add your dapp to Dappland

If you are building a dapp on StarkNet and want to showcase it in Dappland, you just need to submit a PR to this repository.

Steps:

1. Create your images: 320x320 logo, 1920x400 banner and 700x400 preview. Use the <a href="https://www.figma.com/community/file/1163928128813560560">Dappland Figma template</a> to help you.
2. Please optimise your images using tinypng.com – JPGs are best for photos and PNGs for graphics. Or you can convert to WebP.
3. Fork this repo and create a new folder with your dapp name under `/public/dapps/`
4. Add your optimised images to the folder
5. Copy `dapp_data_example.json`, rename it with your dapp's name in lowercase and move it to `/data`
6. Fill out the fields in the json file with your dapp's data
7. Ensure the json points to your images, i.e.

```
  "media": {
    "logoUrl": "/dapps/yourdapp/yourdapp-logo.png",
    "bannerUrl": "/dapps/yourdapp/yourdapp-banner.png",
    "previewUrl": "/dapps/yourdapp/yourdapp-preview.png",
    … etc
  }
```

8. Create the PR

And that's it! 🚀

Someone from the Argent team will review the PR and and contact you if they need to clarify anything.

For any questions reach us on:

 <a href="https://discord.gg/T4PDFHxm6T">
    <img src="https://img.shields.io/badge/Discord-6666FF?style=for-the-badge&logo=discord&logoColor=white">
</a>

## 🛠 Development

Dappland is a Next.js project setup with Tailwind CSS and TypeScript.

Run locally with npm:

```
npm install
npm run dev
```
