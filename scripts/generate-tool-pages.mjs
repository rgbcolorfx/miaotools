import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const appPath = path.join(root, "app.js");
const outDir = path.join(root, "tool");
const sitemapPath = path.join(root, "sitemap.xml");
const sitemapPagesPath = path.join(root, "sitemap-pages.xml");
const sitemapToolsPath = path.join(root, "sitemap-tools.xml");
const urlsTxtPath = path.join(root, "urls.txt");
const baiduUrlsPath = path.join(root, "baidu_urls.txt");
const robotsPath = path.join(root, "robots.txt");
const site = "https://miaotools.top";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getToolDoc(title, description, category) {
  return {
    purpose: `${title}用于快速完成${description}，适合${category}场景，纯前端可直接使用。`,
    steps: ["输入或上传原始数据", "设置参数并执行处理", "查看结果并下载或复制"],
    exampleIn: "示例输入：输入文本或上传示例文件",
    exampleOut: "示例输出：生成处理后的目标结果",
    tips: ["建议先用小数据测试参数", "处理大文件时保持页面开启", "涉及隐私数据请在可信设备操作"],
  };
}

function buildToolPage(tool) {
  const url = `${site}/tool/${encodeURIComponent(tool.id)}/`;
  const doc = getToolDoc(tool.title, tool.description, tool.category);
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(tool.title)} | MiaoTools</title>
    <meta name="description" content="${escapeHtml(tool.description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <meta name="bingbot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <meta name="Baiduspider" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${escapeHtml(tool.title)} | MiaoTools" />
    <meta property="og:description" content="${escapeHtml(tool.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(tool.title)} | MiaoTools" />
    <meta name="twitter:description" content="${escapeHtml(tool.description)}" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "${escapeHtml(tool.title)}",
        "applicationCategory": "${escapeHtml(tool.category)}",
        "operatingSystem": "Any",
        "description": "${escapeHtml(tool.description)}",
        "url": "${url}",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    </script>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header class="hero">
      <div class="hero__inner">
        <div class="hero__top">
          <p id="brandTitle" class="hero__eyebrow">MiaoTools / 秒用工具箱</p>
          <div class="hero__controls">
            <label for="langSelect" id="langLabel" class="hero__label">Language</label>
            <select id="langSelect" class="hero__select">
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        </div>
        <div class="hero__search">
          <input id="searchInput" type="search" placeholder="搜索工具，例如：复利、JSON、时间戳" />
          <button id="clearSearch" class="btn btn--ghost">清空</button>
        </div>
      </div>
    </header>

    <main class="shell">
      <section id="overviewPage" class="page page--overview hidden">
        <div class="toolbar">
          <div id="categoryChips" class="chips"></div>
          <div id="resultCount" class="result-count"></div>
        </div>
        <div id="directory" class="directory"></div>
      </section>

      <section id="detailPage" class="page page--detail">
        <div class="detail-head">
          <button id="backToList" class="btn btn--ghost">返回工具目录</button>
          <p id="detailCategory" class="detail-category">${escapeHtml(tool.category)}</p>
          <h2 id="detailTitle">${escapeHtml(tool.title)}</h2>
          <p id="detailDesc" class="detail-desc">${escapeHtml(tool.description)}</p>
        </div>
        <article class="tool-panel">
          <div id="detailToolUI"></div>
        </article>
        <section id="detailSeoContent" class="tool-docs">
          <h3>工具作用</h3>
          <p>${escapeHtml(doc.purpose)}</p>
          <h3>使用步骤</h3>
          <ol>${doc.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
          <h3>示例</h3>
          <p>${escapeHtml(doc.exampleIn)}</p>
          <p>${escapeHtml(doc.exampleOut)}</p>
          <h3>注意事项</h3>
          <ul>${doc.tips.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
        </section>
      </section>
    </main>

    <footer class="footer">
      <p id="visitCount" class="footer__visit">Total visits: --</p>
      <div class="footer__seo">
        <p id="seoLinksLabel" class="footer__seo-label">Tool links for indexing</p>
        <nav id="seoToolLinks" class="seo-links" aria-label="Tool links"></nav>
      </div>
    </footer>

    <template id="toolCardTemplate">
      <article class="tool-card">
        <h3 data-tool-title class="tool-card__title"></h3>
        <p data-tool-desc></p>
      </article>
    </template>

    <script id="ldTool" type="application/ld+json">{}</script>
    <script src="/app.js" type="module"></script>
  </body>
</html>
`;
}

async function main() {
  const src = await fs.readFile(appPath, "utf8");
  const toolRe = /{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*category:\s*"([^"]+)",/g;
  const tools = [];
  let m;
  while ((m = toolRe.exec(src))) {
    tools.push({ id: m[1], title: m[2], description: m[3], category: m[4] });
  }

  await fs.rm(outDir, { recursive: true, force: true });
  for (const tool of tools) {
    const dir = path.join(outDir, tool.id);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "index.html"), buildToolPage(tool), "utf8");
  }

  const lastmod = new Date().toISOString().slice(0, 10);
  const toolUrls = tools.map((t) => `${site}/tool/${encodeURIComponent(t.id)}/`);
  const pageUrls = [`${site}/`];

  const sitemapPages = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pageUrls.map(
      (u) => `  <url><loc>${u}</loc><lastmod>${lastmod}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");
  await fs.writeFile(sitemapPagesPath, sitemapPages, "utf8");

  const sitemapTools = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...toolUrls.map(
      (u) => `  <url><loc>${u}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");
  await fs.writeFile(sitemapToolsPath, sitemapTools, "utf8");

  const sitemapIndex = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <sitemap><loc>${site}/sitemap-pages.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`,
    `  <sitemap><loc>${site}/sitemap-tools.xml</loc><lastmod>${lastmod}</lastmod></sitemap>`,
    "</sitemapindex>",
    "",
  ].join("\n");
  await fs.writeFile(sitemapPath, sitemapIndex, "utf8");

  const allUrls = [...pageUrls, ...toolUrls].join("\n") + "\n";
  await fs.writeFile(urlsTxtPath, allUrls, "utf8");
  await fs.writeFile(baiduUrlsPath, allUrls, "utf8");

  const robots = [
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: Bingbot",
    "Allow: /",
    "",
    "User-agent: Baiduspider",
    "Allow: /",
    "",
    "User-agent: YandexBot",
    "Allow: /",
    "",
    `Host: ${site.replace("https://", "")}`,
    `Sitemap: ${site}/sitemap.xml`,
    `Sitemap: ${site}/sitemap-pages.xml`,
    `Sitemap: ${site}/sitemap-tools.xml`,
    "",
  ].join("\n");
  await fs.writeFile(robotsPath, robots, "utf8");

  console.log(`generated ${tools.length} tool pages`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
