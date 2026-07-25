import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";

const root = process.cwd();
const blogPath = join(root, "blog", "promote-music-without-becoming-a-content-creator.html");
const blogExists = existsSync(blogPath);
const html = blogExists ? readFileSync(blogPath, "utf8") : "";

function textContent(markup) {
  return markup
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|mdash|rsquo|ldquo|rdquo);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(markup) {
  return textContent(markup).match(/\b[\p{L}\p{N}][\p{L}\p{N}’'-]*\b/gu)?.length ?? 0;
}

const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? "";

test("blog article file exists at the expected path", () => {
  assert.equal(blogExists, true, "blog/promote-music-without-becoming-a-content-creator.html should exist");
});

test("article body contains at least 600 English words", () => {
  const count = wordCount(article);
  assert.ok(count >= 600, `expected at least 600 article words, received ${count}`);
});

test("article uses exactly one H1 and at least three H2 headings", () => {
  assert.equal((html.match(/<h1[\s>]/gi) || []).length, 1, "expected exactly one H1");
  assert.ok((html.match(/<h2[\s>]/gi) || []).length >= 3, "expected at least three H2 headings");
});

test("provides at least four images with descriptive alt text", () => {
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => tag);
  assert.ok(images.length >= 4, `expected at least four images, received ${images.length}`);
  for (const tag of images) {
    const alt = tag.match(/\balt="([^"]*)"/i)?.[1] ?? "";
    assert.ok(alt.trim().length >= 12, `image alternative is missing or too short: ${tag}`);
  }
});

test("every section image has a caption", () => {
  const figures = [...article.matchAll(/<figure\b[^>]*>([\s\S]*?)<\/figure>/gi)].map(([, body]) => body);
  assert.ok(figures.length >= 4, "expected at least four figures");
  for (const figure of figures) {
    if (!/<img\b/i.test(figure)) continue;
    assert.match(figure, /<figcaption\b[^>]*>[^<]{12,}</i, "each image figure should include a caption");
  }
});

test("links at least three external HTTPS resources", () => {
  const external = html.match(/href="https:\/\/[^"]+"/gi) || [];
  const articleLinks = external.filter((href) => !/fonts\.googleapis\.com|fonts\.gstatic\.com|agemoo\.github\.io/i.test(href));
  assert.ok(articleLinks.length >= 3, `expected at least three external HTTPS links, received ${articleLinks.length}`);
  for (const expected of ["https://www.youtube.com/creators/", "https://creators.instagram.com/", "https://artists.spotify.com/"]) {
    assert.ok(html.includes(`href="${expected}"`), `missing external link: ${expected}`);
  }
});

test("includes the planner call to action", () => {
  assert.match(html, /href="\.\.\/planner\.html"[^>]*>Open the free planner/i);
  assert.match(article, /One Session,\s*One Week Content Planner/i);
});

test("provides a unique title, meta description, and canonical URL", () => {
  assert.match(html, /<title>How to Promote Your Music Without Becoming a Full-Time Content Creator \| Track &amp; Traction<\/title>/i);
  assert.match(html, /<meta\s+name="description"\s+content="[^"]{80,}"/i);
  assert.match(html, /<link\s+rel="canonical"\s+href="https:\/\/agemoo\.github\.io\/track-and-traction\/blog\/promote-music-without-becoming-a-content-creator\.html"/i);
});

test("keeps public copy free of long dash characters", () => {
  assert.doesNotMatch(textContent(html), /[‒–—]/u);
  assert.doesNotMatch(html, /&(?:mdash|ndash);|&#(?:8211|8212|x2013|x2014);/i);
});

test("references only local resources that exist", () => {
  const localRefs = [...html.matchAll(/(?:src|href)="([^"]+)"/gi)]
    .map(([, ref]) => ref.split("#")[0])
    .filter((ref) => ref && !/^(https?:|mailto:)/i.test(ref));
  assert.ok(localRefs.length > 0, "expected local resource references");
  for (const ref of localRefs) {
    const target = join(dirname(blogPath), ref);
    assert.equal(existsSync(target), true, `referenced resource should exist: ${ref}`);
  }
});

test("homepage footer links to the new article", () => {
  const index = readFileSync(join(root, "index.html"), "utf8");
  const footer = index.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/i)?.[1] ?? "";
  assert.match(footer, /Latest article:/i);
  assert.match(footer, /href="blog\/promote-music-without-becoming-a-content-creator\.html"/i);
});
