import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";
import dateToISO8601 from "./src/scripts/dateToISO8601.js";

export default (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: (process.env.NODE_ENV === "production" ? "https://until.tsukuba.dev" : "http://localhost:8080")
  });
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "slash"
    }
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/@exampledev/new.css/new.css" : "/assets/css/new.css"
  })
  eleventyConfig.addNunjucksFilter("getNewestCollectionItemDate", pluginRss.getNewestCollectionItemDate)
  eleventyConfig.addNunjucksFilter("dateToRfc3339", pluginRss.dateToRfc3339)

  eleventyConfig.addNunjucksFilter("dateToISO8601", dateToISO8601);
  eleventyConfig.addNunjucksFilter("date", function(str) {
    return new Date(str);
  });
  eleventyConfig.addNunjucksFilter("futureEvents", (events, limit) => {
    const now = new Date();
    return events
      .filter(event => new Date(event.data.dtstart) >= now)
      .sort((a, b) => new Date(a.data.dtstart) - new Date(b.data.dtstart))
      .slice(0, limit);
  });

  return {
    dir: {
      input: "src",
      output: "public",
    }
  }
}
