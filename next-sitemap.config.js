/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://funcreveal.github.io",
  generateRobotsTxt: true,
  outDir: "./out",
  exclude: ["/404"],
  sitemapSize: 1000,
  transform: async (config, path) => {
    let priority = 0.5;

    if (path === "/") {
      priority = 1.0;
    } else if (path === "/note") {
      priority = 0.8;
    } else if (path === "/effects-gallery") {
      priority = 0.9;
    } else if (path.startsWith("/effects/")) {
      priority = 0.7;
    }

    return {
      loc: `${config.siteUrl}${path}`,
      changefreq: "monthly",
      priority,
      lastmod: new Date().toISOString(),
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
