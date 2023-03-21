const { EleventyHtmlBasePlugin } = require("@11ty/eleventy")
const pluginRss = require("@11ty/eleventy-plugin-rss");
const dateToISO8601 = require("./src/scripts/dateToISO8601.js");

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

  eleventyConfig.addNunjucksFilter("dateToISO8601", dateToISO8601);
  eleventyConfig.addNunjucksFilter("date", function(str) {
    return new Date(str);
  });

  return {
    dir: {
      input: "src",
      output: "public",
    }
  }
}
