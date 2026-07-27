import type { WebSite, WithContext } from "schema-dts";
import { SITE } from "../data/site";

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.author,
  url: SITE.hostname,
  image: `${SITE.hostname}/avatar.jpg`,
};
