/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com', 
      'media.istockphoto.com', 
      'images.unsplash.com',
      'newsatcl-pctr.c.yimg.jp', // Yahoo!ニュース
      'newsimg.jp',              // 日本のニュースサイト
      'cdn.mainichi.jp',         // 毎日新聞
      'www.jiji.com',            // 時事通信
      'img.kyodonews.net',       // 共同通信
      'www3.nhk.or.jp',          // NHK
      'static.reuters.com',      // ロイター
      'afpbb.ismcdn.jp',         // AFP
      'static.chunichi.co.jp',   // 中日新聞
      'nordot-res.cloudinary.com', // ノアドット
      'www.sankei.com',          // 産経新聞
      'www.asahicom.jp',         // 朝日新聞
      'www.yomiuri.co.jp',       // 読売新聞
      'assets.bwbx.io',          // Bloomberg
      'i.ntv.co.jp',             // 日本テレビ
      's3.images.bloomberg.com', // Bloomberg
      'image.yomiuri.co.jp',     // 読売新聞
      'img.buzzfeed.com',        // Buzzfeed
      'newsimg.oricon.co.jp',    // オリコン
      'amd-pctr.c.yimg.jp'       // Yahoo!ニュース別ドメイン
    ],
  },
};

module.exports = nextConfig; 