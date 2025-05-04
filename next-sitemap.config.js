/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://funcreveal.github.io",
  generateRobotsTxt: true,
  outDir: "./out",
  exclude: ["/404"],
  sitemapSize: 1000,
  transform: async (config, path) => {
    let priority = 0.5;
    let changefreq = "monthly";
    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path === "/note") {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path === "/effects-gallery") {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path.startsWith("/effects/")) {
      priority = 0.7;
      changefreq = "weekly";
    }

    return {
      loc: `${config.siteUrl}${path}`,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://funcreveal.github.io${path.replace(
            /^\/(zh-TW|zh-CN)?/,
            ""
          )}`,
          hreflang: "en",
        },
        {
          href: `https://funcreveal.github.io/zh-TW${path.replace(
            /^\/(zh-TW|zh-CN)?/,
            ""
          )}`,
          hreflang: "zh-TW",
        },
        {
          href: `https://funcreveal.github.io/zh-CN${path.replace(
            /^\/(zh-TW|zh-CN)?/,
            ""
          )}`,
          hreflang: "zh-CN",
        },
      ],
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
