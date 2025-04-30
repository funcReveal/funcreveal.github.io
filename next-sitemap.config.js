/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://funcreveal.github.io",
  generateRobotsTxt: true,
  outDir: "./out",
  exclude: ["/404"],
  transform: async (config, path) => {
    return {
      loc: `${config.siteUrl}${path}`,
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
