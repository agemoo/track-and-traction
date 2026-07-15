import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const indexPath = join(root, "index.html");
const indexExists = existsSync(indexPath);
const html = indexExists ? readFileSync(indexPath, "utf8") : "";
const cssPath = join(root, "styles.css");
const css = existsSync(cssPath) ? readFileSync(cssPath, "utf8") : "";
const boundKeywords = [
  "content plan for musicians",
  "how to turn one rehearsal into a week of content",
  "rehearsal content ideas",
  "content repurposing for musicians",
  "one week social media plan for musicians",
];

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

function extractCssBlock(source, marker) {
  const markerIndex = source.search(marker);
  if (markerIndex < 0) return "";

  const openingBrace = source.indexOf("{", markerIndex);
  if (openingBrace < 0) return "";

  let depth = 0;
  for (let index = openingBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(openingBrace + 1, index);
  }

  return "";
}

function cssRules(block) {
  return [...block.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selectors, declarations]) => ({
    selectors: selectors.trim(),
    declarations,
  }));
}

test("provides the public landing-page entry point", () => {
  assert.equal(indexExists, true, "index.html should exist at the project root");
});

test("uses the canonical brand and 2026 context", () => {
  assert.match(html, /Track\s*&amp;\s*Traction|Track\s*&\s*Traction/i);
  assert.match(html, /2026/);
  assert.doesNotMatch(html, /Signal\s*&amp;\s*Groove|Signal\s*&\s*Groove/i);
});

test("contains the required pillar-blog structure", () => {
  assert.match(html, /<main\b/i);
  assert.match(html, /<article\b/i);
  assert.match(html, /<h1[\s>]/i);
  assert.ok((html.match(/<h2[\s>]/gi) || []).length >= 4, "expected at least four H2 headings");
  assert.match(html, /<a[^>]+class="skip-link"[^>]+href="#main-content"/i);
});

test("contains at least 600 words of article content", () => {
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? "";
  assert.ok(wordCount(article) >= 600, `expected at least 600 article words, received ${wordCount(article)}`);
});

test("provides a hero and three topic images with meaningful alternatives", () => {
  assert.match(html, /<img[^>]+class="hero__image"[^>]+alt="[^"]{12,}"/i);
  const articleImages = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*\balt="([^"]+)"/gi)];
  assert.ok(articleImages.length >= 4, "expected at least four article images");

  for (const [, src, alt] of articleImages) {
    assert.ok(alt.trim().length >= 12, `image alternative is too short: ${alt}`);
    if (!/^https?:/i.test(src)) {
      assert.equal(existsSync(join(root, src)), true, `referenced image should exist: ${src}`);
    }
  }
});

test("links the stylesheet, interaction script, and printable planner", () => {
  assert.match(html, /<link[^>]+href="styles\.css"/i);
  assert.match(html, /<script[^>]+src="script\.js"/i);
  assert.match(html, /href="planner\.html"/i);
});

test("uses the approved homepage navigation and hero copy", () => {
  const navigation = html.match(/<nav\b[^>]*class="site-nav"[^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? "";
  assert.match(navigation, /href="#weekly-method"[^>]*>The method</i);
  assert.match(navigation, /href="#content-ideas"[^>]*>Content ideas</i);
  assert.match(navigation, /href="#about"[^>]*>About</i);
  assert.match(navigation, /href="planner\.html"[^>]*>Open the free planner</i);
  assert.match(html, /<h1>Turn one rehearsal into a week of content\.<\/h1>/i);
  assert.match(html, /Build my content week/i);
});

test("places the five bound SEO phrases in the homepage", () => {
  for (const phrase of boundKeywords) {
    assert.match(textContent(html), new RegExp(phrase, "i"), `missing bound phrase: ${phrase}`);
  }
});

test("uses keyword focused metadata and headings", () => {
  assert.match(html, /<title>Content Plan for Musicians: One Rehearsal, One Week \| Track &amp; Traction<\/title>/i);
  assert.match(
    html,
    /<meta\s+name="description"\s+content="Build a practical content plan for musicians\. Learn how to turn one rehearsal into a week of content with a free social media planner\."\s*>/i,
  );
  assert.match(html, /<h1>Turn one rehearsal into a week of content\.<\/h1>/i);
  assert.match(html, /<h2[^>]*>[^<]*rehearsal content ideas[^<]*<\/h2>/i);
  assert.match(html, /<h2[^>]*>[^<]*content repurposing for musicians[^<]*<\/h2>/i);
  assert.match(html, /<h2[^>]*>[^<]*one week social media plan for musicians[^<]*<\/h2>/i);
});

test("includes official guidance links and complete image captions", () => {
  const officialLinks = html.match(/href="https:\/\/support\.google\.com\/[^"]+"/gi) || [];
  assert.ok(officialLinks.length >= 2, "expected at least two official support.google.com links");
  assert.match(html, /href="https:\/\/support\.google\.com\/youtube\/answer\/12921536"[^>]*>YouTube Short<\/a>/i);
  assert.match(html, /href="https:\/\/support\.google\.com\/analytics\/answer\/10917952\?hl=en"[^>]*>tagged links<\/a>/i);
  assert.equal((html.match(/<figcaption\b/gi) || []).length, 4);
  assert.match(html, /<figcaption class="hero__caption">One rehearsal can provide the raw material for a full week of content\.<\/figcaption>/i);
});

test("keeps assignment evidence readable when printed", () => {
  const printCss = extractCssBlock(css, /@media\s+print/i);
  const printRules = cssRules(printCss);
  const publicArticleStart = html.indexOf('<article id="top">');
  const publicArticleEnd = html.lastIndexOf("</article>");
  const printableArticle = html.slice(publicArticleStart, publicArticleEnd + "</article>".length);
  const printableTitle = html.match(/<title>[\s\S]*?<\/title>/i)?.[0] ?? "";
  const printableEvidence = `${printableTitle} ${printableArticle}`;

  assert.ok(printCss.length > 0, "expected a complete @media print block");
  assert.ok(publicArticleStart >= 0 && publicArticleEnd > publicArticleStart, "expected the public article markup");

  const ruleFor = (selectorPattern, declarationPattern) => printRules.some(({ selectors, declarations }) => (
    selectorPattern.test(selectors) && declarationPattern.test(declarations)
  ));

  assert.equal(
    ruleFor(/(?:^|,)\s*\.track\s*(?:,|$)/i, /display:\s*none\s*!important/i),
    true,
    "interactive track buttons should be hidden as a group in print",
  );
  assert.equal(
    ruleFor(/\.js\s+\.no-js-week/i, /display:\s*grid\s*!important/i),
    true,
    "the complete seven day fallback should be forced visible in print",
  );
  assert.equal(ruleFor(/\.hero__image/i, /display:\s*block/i), true, "the hero image should print");
  assert.equal(ruleFor(/\.planner-cta/i, /display:\s*grid/i), true, "the planner CTA should print");
  assert.equal(ruleFor(/a\[href\^="https:\/\/"\]/i, /text-decoration:\s*underline/i), true, "official links should remain identifiable in print");

  const printableSelector = /(?:^|[,\s>+~])(?:main|article|figure|figcaption|img|h1|h2|a)(?=$|[,\s:[>+~])|\[href|\.hero(?:__image|__media|__caption)?\b|\.pillar(?:__content|__media)?\b|\.content-track(?:__intro)?\b|\.planner-cta\b|\.no-js-week\b|\.text-link\b/i;
  const hiddenPrintableRule = printRules.find(({ selectors, declarations }) => (
    printableSelector.test(selectors) && /display:\s*none(?:\s*!important)?/i.test(declarations)
  ));
  assert.equal(hiddenPrintableRule, undefined, `print CSS hides required evidence with selector: ${hiddenPrintableRule?.selectors ?? "unknown"}`);

  assert.equal((printableArticle.match(/<figcaption\b/gi) || []).length, 4, "all four captions should be in the printable article");
  assert.ok((printableArticle.match(/href="https:\/\/support\.google\.com\/[^"]+"/gi) || []).length >= 2, "both official links should be in the printable article");
  for (const phrase of boundKeywords) assert.match(textContent(printableEvidence), new RegExp(phrase, "i"), `print source is missing keyword: ${phrase}`);
  assert.equal((printableArticle.match(/data-fallback-day=/gi) || []).length, 7, "all seven fallback days should be in the printable article");

  const interactiveTrack = printableArticle.match(/<div\b[^>]*class="track"[^>]*>([\s\S]*?)<\/div>/i)?.[1] ?? "";
  assert.equal((interactiveTrack.match(/<button\b/gi) || []).length, 7, "expected seven interactive day buttons before print CSS hides them");
});

test("provides three whole-card category anchors", () => {
  const categories = html.match(/<section\b[^>]*id="content-ideas"[^>]*>([\s\S]*?)<\/section>/i)?.[1] ?? "";
  for (const [href, label, title] of [["#music-making", "Session notes", "Music making"], ["#rehearsal-performance", "Stage notes", "Rehearsal and performance"], ["#artist-promotion", "Traction notes", "Artist promotion"]]) {
    const card = categories.match(new RegExp(`<a\\b[^>]*href="${href}"[^>]*>([\\s\\S]*?)<\\/a>`, "i"))?.[1] ?? "";
    assert.match(card, new RegExp(label, "i")); assert.match(card, new RegExp(title, "i"));
  }
});

test("summarizes the four-step weekly method", () => {
  const method = html.match(/<section\b[^>]*id="weekly-method"[^>]*>([\s\S]*?)<\/section>/i)?.[1] ?? "";
  for (const step of ["Capture", "Choose", "Schedule", "Review"]) assert.match(method, new RegExp(step, "i"));
});

test("shows three safe social destinations", () => {
  const social = html.match(/<section\b[^>]*class="social-links"[^>]*>([\s\S]*?)<\/section>/i)?.[1] ?? "";
  for (const platform of ["Instagram", "YouTube", "LinkedIn"]) assert.match(social, new RegExp(platform, "i"));
  assert.equal((social.match(/\bdisabled\b/gi) || []).length, 3);
  assert.doesNotMatch(social, /href="https?:\/\//i);
});

test("keeps public copy free of long dash characters", () => {
  assert.doesNotMatch(textContent(html), /[\u2013\u2014]/u);
  assert.doesNotMatch(textContent(planner), /[\u2013\u2014]/u);
  assert.doesNotMatch(css, /[\u2013\u2014]/u);
  assert.doesNotMatch(html + planner, /&(?:mdash|ndash);|&#(?:8211|8212|x2013|x2014);/i);
  assert.doesNotMatch(css, /&(?:mdash|ndash);|&#(?:8211|8212|x2013|x2014);/i);
});

test("contains valid closing spans and no mojibake in public assets", () => {
  const script = readFileSync(join(root, "script.js"), "utf8");
  for (const source of [html, planner, script]) assert.doesNotMatch(source, /鈫|鈥|銆|锟|�|︹|€|\?\/span>/u);
  assert.equal((html.match(/<span\b/gi) || []).length, (html.match(/<\/span>/gi) || []).length);
});

test("uses disabled buttons for unlinked social platforms", () => {
  const social = html.match(/<section\b[^>]*class="social-links"[^>]*>([\s\S]*?)<\/section>/i)?.[1] ?? "";
  assert.equal((social.match(/<button\b[^>]*disabled[^>]*>/gi) || []).length, 3);
  assert.doesNotMatch(social, /<a\b/i);
});

test("keeps all seven day plans readable without JavaScript", () => {
  assert.match(html, /<section\b[^>]*class="no-js-week"[^>]*aria-label="Complete seven day content plan"/i);
  assert.equal((html.match(/<article\b[^>]*data-fallback-day=/gi) || []).length, 7);
  for (const day of ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]) assert.match(html, new RegExp(`data-fallback-day="${day.toLowerCase()}"[\\s\\S]*?<h3>${day}:`, "i"));
  assert.match(css, /\.js\s+\.no-js-week\s*\{\s*display:\s*none/i);
});

test("keeps the final mobile cascade compact", () => {
  assert.doesNotMatch(css, /min-height:\s*44rem/i);
  assert.match(css, /@media\s*\(max-width:\s*40rem\)[\s\S]*\.site-header\s*\{[^}]*flex-direction:\s*row/i);
  assert.match(css, /@media\s*\(max-width:\s*40rem\)[\s\S]*\.hero\s*\{[^}]*min-height:\s*auto/i);
});

test("uses progressive enhancement hooks without hiding server-rendered content", () => {
  assert.match(html, /data-menu-toggle/i); assert.match(html, /data-reveal/i);
  assert.doesNotMatch(html, /class="[^"]*is-hidden[^"]*"/i);
  assert.match(css, /\.js\s+\[data-reveal\]/i);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i);
  assert.match(css, /\.js\s+\[data-reveal\][\s\S]*opacity:\s*1/i);
});

test("enhances menu and reveal behavior defensively", () => {
  const script = readFileSync(join(root, "script.js"), "utf8");
  assert.match(script, /documentElement\.classList\.add\("js"\)/);
  assert.match(script, /IntersectionObserver/); assert.match(script, /aria-expanded/);
});

test("implements the approved palette and interactive states", () => {
  for (const color of ["#14243A", "#174CFF", "#FF5932", "#FBFAF6", "#E8EDF4"]) assert.match(css, new RegExp(color, "i"));
  assert.match(css, /\.category-card:focus-visible/i);
  assert.match(css, /\.button:focus-visible/i);
  assert.match(css, /min-height:\s*44px/i);
});

test("removes hero reading metadata and divider component", () => {
  assert.doesNotMatch(html, /hero__meta/);
  assert.doesNotMatch(html, /8 minute read/i);
  assert.doesNotMatch(html, /Updated July 2026/i);
  assert.doesNotMatch(css, /\.hero__meta\b/);
});

test("uses Literata for body copy", () => {
  assert.match(html, /family=Literata/i);
  assert.match(planner, /family=Literata/i);
  assert.match(css, /--font-body:\s*"Literata"/i);
  assert.doesNotMatch(html, /Atkinson\+Hyperlegible/i);
  assert.doesNotMatch(planner, /Atkinson\+Hyperlegible/i);
});

test("wordmark reserves layout space for both beat dots", () => {
  const beatRule = css.match(/\.wordmark__beat\s*\{([\s\S]*?)\}/i)?.[1] ?? "";
  assert.match(beatRule, /position:\s*relative/i);
  assert.match(beatRule, /flex:\s*0\s+0\s+1\.(?:4|5|6)\d*rem/i);
  assert.doesNotMatch(beatRule, /box-shadow/i);
  assert.match(css, /\.wordmark__beat::after\s*\{/i);
});

test("uses the requested footer credit", () => {
  assert.match(html, />Mukun Sun 2026</);
  assert.doesNotMatch(html, /An independent academic growth marketing project/i);
});

test("includes an accessible seven-day content sequencer", () => {
  const buttons = html.match(/<button\b[^>]*\bdata-day="[^"]+"[^>]*>/gi) || [];
  assert.equal(buttons.length, 7);
  assert.match(html, /aria-live="polite"/i);
  assert.match(html, /aria-pressed="true"/i);
});

const plannerPath = join(root, "planner.html");
const plannerExists = existsSync(plannerPath);
const planner = plannerExists ? readFileSync(plannerPath, "utf8") : "";

test("provides a printable planner resource", () => {
  assert.equal(plannerExists, true, "planner.html should exist at the project root");
  assert.match(planner, /One Session,\s*One Week Content Planner/i);
});

test("planner captures source material, audience action, and review", () => {
  assert.match(planner, /Source material/i);
  assert.match(planner, /Audience action/i);
  assert.match(planner, /Weekly review/i);
});

test("planner contains seven day rows and a print action", () => {
  const rows = planner.match(/data-planner-day="[^"]+"/gi) || [];
  assert.equal(rows.length, 7);
  assert.match(planner, /window\.print\(\)/i);
  assert.match(planner, /Print or save as PDF/i);
});

test("planner guidance is placeholder text rather than prefilled data", () => {
  assert.doesNotMatch(planner, /<input\b[^>]*\bvalue="/i);
  assert.ok((planner.match(/<input\b[^>]*\bplaceholder="/gi) || []).length >= 21);
  assert.match(css, /:focus::placeholder\s*\{/i);
  const focusedPlaceholderRule = css.match(/\.planner-form input:focus::placeholder,[\s\S]*?\{([\s\S]*?)\}/i)?.[1] ?? "";
  assert.match(focusedPlaceholderRule, /color:\s*oklch\(0\.48\s+0\.03\s+230\)/i);
});
