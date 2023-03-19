const { EleventyHtmlBasePlugin } = require("@11ty/eleventy")
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: "https://until-tsukuba.github.io/"
  });
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "slash"
    }
  });
  eleventyConfig.addNunjucksFilter("getNewestCollectionItemDate", pluginRss.getNewestCollectionItemDate)
  eleventyConfig.addNunjucksFilter("dateToRfc3339", pluginRss.dateToRfc3339)

  return {
    dir: {
      input: "src",
      output: "public",
    }
  }
}
