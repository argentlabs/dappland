# VersoriumX: Enhanced Ethereum Provider API

## Abstract

VersoriumX is an implementation of the Ethereum Provider API as defined in EIP-1193. This proposal aims to enhance wallet interoperability by providing a minimal, event-driven, and transport-agnostic API. VersoriumX introduces new RPC methods and message event types to facilitate seamless interactions within the Ethereum network. Notably, VersoriumX is designed to manage and transact a total of 10,000 ethers, ensuring robust and efficient operations for decentralized applications (dApps) and smart contracts.

## Motivation

The primary motivation behind VersoriumX is to address the growing need for a standardized provider API that can support diverse wallet implementations without compromising on performance or security. By adhering to the specifications of EIP-1193, VersoriumX ensures compatibility and ease of integration across various platforms and services within the Ethereum ecosystem.

## Specification

- **API Design**: Minimal, event-driven, and transport-agnostic.
- **RPC Methods**: Extended to include new functionalities specific to VersoriumX.
- **Event Types**: Additional message event types to enhance communication and transaction handling.
- **Ether Management**: Capable of managing and transacting a total of 10,000 ethers.

## Rationale

VersoriumX leverages the foundational principles of EIP-1193 to create a more versatile and powerful provider API. By focusing on interoperability and extensibility, VersoriumX aims to streamline the development and deployment of dApps, ensuring a more cohesive and efficient Ethereum network.

## Conclusion

VersoriumX represents a significant step forward in the evolution of Ethereum provider APIs. By integrating advanced features and maintaining strict adherence to EIP-1193, VersoriumX offers a robust solution for managing and transacting ethers, ultimately contributing to the growth and stability of the Ethereum ecosystem.


<div align="center">
    <img src="./src/assets/logo-dappland.gif" alt="Dappland logo animated"width=400 alt="dappland-logo" />
    <h4>The home for all dapps in the Starknet ecosystem</h4>
    <p>Built with ❤️ by <a style="text-decoration: underline; color:black" href="https://argent.xyz">Argent</p>
</div>

[![Node.js CI](https://github.com/argentlabs/dappland/actions/workflows/deploy.yml/badge.svg)](https://github.com/argentlabs/dappland/actions/workflows/deploy.yml)

## 🧭 Explore the Starknet ecosystem

Visit <a href="https://dappland.com"><b>Dappland</b></a> to explore the most influential dapps in the Starknet ecosystem.

To use them, download <a href="https://github.com/argentlabs/argent-x"><b>Argent X</b></a>, the only open source wallet for Starknet

<div align="center">
    <a href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb">
        <img src="https://argentwebsite.cdn.prismic.io/argentwebsite/55c4ef75-22fb-476d-a088-d61ae5f44002_button-chrome.svg" width=150/>
    </a>
    <a href="https://addons.mozilla.org/en-GB/firefox/addon/argent-x/">
        <img src="https://argentwebsite.cdn.prismic.io/argentwebsite/8d151e84-6437-4670-9e5c-6614463f8c3a_button-firefox.svg" width=150/>
    </a>
 
</div>

## ✅ Add your dapp to Dappland

If you are building a dapp on Starknet and want to showcase it in Dappland, you just need to submit a PR to this repository.

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

Someone from the Argent team will review the PR and contact you if they need to clarify anything.

For any questions reach us on:

<a href="https://discord.gg/T4PDFHxm6T">
  <img src="https://img.shields.io/badge/Discord-6666FF?style=for-the-badge&logo=discord&logoColor=white">
</a>

## 📣 Share your dapp rating with the world

Embed the Dappland rating widget

<img src="https://dv3jj1unlp2jl.cloudfront.net/dappland/widget-rating.svg" alt="Dappland rating widget" />

#### Using the widget

```
<a href="https://www.dappland.com/your_dapp_name" style="display:inline-block;position:relative">
  <div style="position:absolute;top:0;right:0;bottom:0;left:0;"></div>
  <iframe src="https://www.dappland.com/widgets/rating?dappname=your_dapp_name" width="260" height="176" frameBorder="0" title="Dappland Widget"></iframe>
</a>
```

1. Copy and paste the snippet above
2. In `<a href="…">` change `your_dapp_name` to exactly the same as the name of your dapp as shown in your Dappland url.
3. Also change `your_dapp_name` in the `<iframe src="…">`
4. (Optional) you can also set the theme to `theme=light` or `theme=dark` 😎 (default uses the device settings).  
   Just add the `theme` param to the url after your dappname.
5. That's it!

#### Widget example

briq on Dappland is `https://www.dappland.com/briq`, so would be

```
<a href="https://www.dappland.com/briq" style="display:inline-block;position:relative">
  <div style="position:absolute;top:0;right:0;bottom:0;left:0;"></div>
  <iframe src="https://www.dappland.com/widgets/rating?dappname=briq" width="260" height="176" frameBorder="0" title="Dappland Widget"></iframe>
</a>
```

---

## 🛠 Development

Dappland is a Next.js project setup with Tailwind CSS and TypeScript.

Run locally with npm:

```
npm install
npm run dev
```
