const { EleventyHtmlBasePlugin } = require("@11ty/eleventy")

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: "https://until-tsukuba.github.io/"
  });

  return {
    dir: {
      input: "src",
      output: "public",
    }
  }
}
