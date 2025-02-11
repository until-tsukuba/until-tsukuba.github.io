import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";
import dateToISO8601 from "./src/scripts/dateToISO8601.js";

export default (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: (process.env.NODE_ENV === "production" ? "https://until-tsukuba.github.io" : "http://localhost:8080")
  });
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "slash"
    }
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/chota/dist/chota.min.css" : "/assets/css/chota.min.css"
  })
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
