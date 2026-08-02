---
name: content-seo-parity
description: Enforces that all content is accessible via real DOM for SEO and accessibility
---
# Content SEO Parity
This skill prevents the portfolio from becoming an SEO black box.

## Guidelines
- **Real DOM:** Every piece of core content (About, Experience, Projects) MUST exist as actual, crawlable HTML DOM text.
- **No Canvas-Only Content:** Do not render critical text exclusively inside a Canvas, WebGL, or inaccessible absolute-positioned mess.
- **Semantic HTML First:** Build the content components using plain, semantic HTML (headings, paragraphs, lists, links) *before* dropping them into the window chrome.
- **Fallback:** Ensure the site provides a fallback for recruiters, crawlers, and non-JS users. The window is just a wrapper, not the content's only home.
