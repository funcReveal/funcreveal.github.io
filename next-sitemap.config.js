/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
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
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://funcreveal.github.io/sitemap-0.xml"],
  },
};
