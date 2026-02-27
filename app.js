const dom = {
  overviewPage: document.getElementById("overviewPage"),
  detailPage: document.getElementById("detailPage"),
  brandTitle: document.getElementById("brandTitle"),
  langLabel: document.getElementById("langLabel"),
  langSelect: document.getElementById("langSelect"),
  visitCount: document.getElementById("visitCount"),
  seoLinksLabel: document.getElementById("seoLinksLabel"),
  seoToolLinks: document.getElementById("seoToolLinks"),
  searchInput: document.getElementById("searchInput"),
  clearSearch: document.getElementById("clearSearch"),
  categoryChips: document.getElementById("categoryChips"),
  resultCount: document.getElementById("resultCount"),
  directory: document.getElementById("directory"),
  detailCategory: document.getElementById("detailCategory"),
  detailTitle: document.getElementById("detailTitle"),
  detailDesc: document.getElementById("detailDesc"),
  detailToolUI: document.getElementById("detailToolUI"),
  detailSeoContent: document.getElementById("detailSeoContent"),
  backToList: document.getElementById("backToList"),
  toolCardTemplate: document.getElementById("toolCardTemplate"),
};

const LANG_STORAGE_KEY = "miaotools_lang_v1";
function getInitialLang() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved === "en" || saved === "zh" || saved === "ja" || saved === "ko" || saved === "ru") return saved;
  return "en";
}

const state = {
  query: "",
  category: "全部",
  lang: getInitialLang(),
  visitCount: null,
};

const I18N = {
  en: {
    brand: "MiaoTools",
    pageTitle: "MiaoTools - Online Toolbox",
    language: "Language",
    searchPlaceholder: "Search tools, e.g. compound, JSON, timestamp",
    clear: "Clear",
    backToList: "Back to directory",
    all: "All",
    toolsCount: (n) => `${n} tools`,
    noMatch: "No matching tools. Try a different keyword.",
    visits: (n) => `Total visits: ${n}`,
    visitsNA: "Total visits: N/A",
    seoLinks: "Tool links for indexing",
    siteDescription: "MiaoTools: static online toolbox deployable to GitHub Pages.",
  },
  zh: {
    brand: "MiaoTools / 秒用工具箱",
    pageTitle: "秒用工具箱 MiaoTools - 在线工具目录",
    language: "语言",
    searchPlaceholder: "搜索工具，例如：复利、JSON、时间戳",
    clear: "清空",
    backToList: "返回工具目录",
    all: "全部",
    toolsCount: (n) => `共 ${n} 个工具`,
    noMatch: "没有匹配的工具，请换个关键词。",
    visits: (n) => `累计访问: ${n}`,
    visitsNA: "累计访问: 暂不可用",
    seoLinks: "工具收录链接",
    siteDescription: "MiaoTools：可部署到 GitHub Pages 的纯前端在线工具站。",
  },
  ja: {
    brand: "MiaoTools",
    pageTitle: "MiaoTools - オンラインツール集",
    language: "言語",
    searchPlaceholder: "ツールを検索（例: JSON, timestamp, QR）",
    clear: "クリア",
    backToList: "一覧へ戻る",
    all: "すべて",
    toolsCount: (n) => `${n} tools`,
    noMatch: "一致するツールがありません。別のキーワードを試してください。",
    visits: (n) => `累計アクセス: ${n}`,
    visitsNA: "累計アクセス: N/A",
    seoLinks: "インデックス用ツールリンク",
    siteDescription: "MiaoTools: GitHub Pages にデプロイ可能な静的オンラインツール集。",
  },
  ko: {
    brand: "MiaoTools",
    pageTitle: "MiaoTools - 온라인 툴박스",
    language: "언어",
    searchPlaceholder: "도구 검색 (예: JSON, timestamp, QR)",
    clear: "지우기",
    backToList: "목록으로 돌아가기",
    all: "전체",
    toolsCount: (n) => `${n} tools`,
    noMatch: "일치하는 도구가 없습니다. 다른 키워드를 시도하세요.",
    visits: (n) => `총 방문: ${n}`,
    visitsNA: "총 방문: N/A",
    seoLinks: "인덱싱용 도구 링크",
    siteDescription: "MiaoTools: GitHub Pages에 배포 가능한 정적 온라인 도구 모음.",
  },
  ru: {
    brand: "MiaoTools",
    pageTitle: "MiaoTools - Онлайн набор инструментов",
    language: "Язык",
    searchPlaceholder: "Поиск инструмента (например: JSON, timestamp, QR)",
    clear: "Очистить",
    backToList: "Назад к списку",
    all: "Все",
    toolsCount: (n) => `${n} tools`,
    noMatch: "Совпадений не найдено. Попробуйте другое слово.",
    visits: (n) => `Всего посещений: ${n}`,
    visitsNA: "Всего посещений: N/A",
    seoLinks: "Ссылки для индексации",
    siteDescription: "MiaoTools: статический онлайн-набор инструментов для GitHub Pages.",
  },
};

const CATEGORY_I18N = {
  en: {
    金融理财: "Finance",
    开发工具: "Developer",
    安全工具: "Security",
    AI工具: "AI",
    设计工具: "Design",
    图像工具: "Image",
    音频工具: "Audio",
    视频工具: "Video",
    文档办公: "Docs & Office",
    可视化: "Visualization",
    编码与数据: "Encoding & Data",
    文本处理: "Text",
    时间与随机: "Time & Random",
    单位转换: "Converters",
    生活计算: "Daily Calculators",
  },
  ja: {
    金融理财: "ファイナンス",
    开发工具: "開発ツール",
    安全工具: "セキュリティ",
    AI工具: "AIツール",
    设计工具: "デザイン",
    图像工具: "画像",
    音频工具: "音声",
    视频工具: "動画",
    文档办公: "ドキュメント・オフィス",
    可视化: "可視化",
    编码与数据: "エンコード・データ",
    文本处理: "テキスト",
    时间与随机: "時間・ランダム",
    单位转换: "単位変換",
    生活计算: "日常計算",
  },
  ko: {
    金融理财: "금융",
    开发工具: "개발 도구",
    安全工具: "보안",
    AI工具: "AI 도구",
    设计工具: "디자인",
    图像工具: "이미지",
    音频工具: "오디오",
    视频工具: "비디오",
    文档办公: "문서/오피스",
    可视化: "시각화",
    编码与数据: "인코딩/데이터",
    文本处理: "텍스트",
    时间与随机: "시간/랜덤",
    单位转换: "단위 변환",
    生活计算: "생활 계산",
  },
  ru: {
    金融理财: "Финансы",
    开发工具: "Разработка",
    安全工具: "Безопасность",
    AI工具: "AI",
    设计工具: "Дизайн",
    图像工具: "Изображения",
    音频工具: "Аудио",
    视频工具: "Видео",
    文档办公: "Документы и офис",
    可视化: "Визуализация",
    编码与数据: "Кодирование и данные",
    文本处理: "Текст",
    时间与随机: "Время и случайное",
    单位转换: "Конвертеры",
    生活计算: "Бытовые расчёты",
  },
  zh: {},
};

const TOOL_TEXT_EN = {
  json: { title: "JSON Formatter / Validator", description: "Format, minify and validate JSON" },
  base64: { title: "Base64 Encode/Decode", description: "Convert text and Base64" },
  url: { title: "URL Encode/Decode", description: "Encode and decode URL parameters" },
  jwt: { title: "JWT Decoder", description: "Decode header/payload and expiry info" },
  qr: { title: "QR Code Generator", description: "Generate QR code from text or URL" },
  "img-convert": { title: "Image Convert & Compress", description: "Convert JPG/PNG/WEBP in browser" },
  "pdf-tools": { title: "PDF Merge / Split", description: "Merge files and extract pages in browser" },
};

function t(key, ...args) {
  const dict = I18N[state.lang] || I18N.en;
  const v = dict[key];
  return typeof v === "function" ? v(...args) : v;
}

function localizeCategory(cat) {
  if (state.lang === "zh") return cat;
  return (CATEGORY_I18N[state.lang] && CATEGORY_I18N[state.lang][cat]) || CATEGORY_I18N.en[cat] || cat;
}

function humanizeToolId(id) {
  return id
    .split("-")
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
}

function localizeToolTitle(tool) {
  if (state.lang === "zh") return tool.title;
  if (TOOL_TEXT_EN[tool.id]?.title) return TOOL_TEXT_EN[tool.id].title;
  return humanizeToolId(tool.id);
}

function localizeToolDescription(tool) {
  if (state.lang === "zh") return tool.description;
  if (TOOL_TEXT_EN[tool.id]?.description) return TOOL_TEXT_EN[tool.id].description;
  return `Tool for ${localizeToolTitle(tool)}`;
}

function applyLocale() {
  dom.brandTitle.textContent = t("brand");
  dom.langLabel.textContent = t("language");
  dom.seoLinksLabel.textContent = t("seoLinks");
  dom.searchInput.placeholder = t("searchPlaceholder");
  dom.clearSearch.textContent = t("clear");
  dom.backToList.textContent = t("backToList");
  dom.visitCount.textContent = state.visitCount == null ? t("visitsNA") : t("visits", state.visitCount);
  dom.langSelect.value = state.lang;
  const langMap = { zh: "zh-CN", en: "en", ja: "ja", ko: "ko", ru: "ru" };
  document.documentElement.lang = langMap[state.lang] || "en";
  renderSeoLinks();
}

function getHomeUrl() {
  return `${window.location.origin}/`;
}

function getToolUrl(id) {
  return `${window.location.origin}/tool/${encodeURIComponent(id)}/`;
}

async function initVisitCounter() {
  try {
    const ns = `miaotools-${(window.location.hostname || "local").replace(/[^a-zA-Z0-9-]/g, "-")}`;
    const key = "site-visits";
    const res = await fetch(`https://api.countapi.xyz/hit/${ns}/${key}`);
    const data = await res.json();
    if (typeof data.value === "number") state.visitCount = data.value;
  } catch {
    state.visitCount = null;
  }
  applyLocale();
}

function createResultBox(container, className = "result mono") {
  const result = document.createElement("div");
  result.className = className;
  container.append(result);
  return result;
}

function createActions(container) {
  const actions = document.createElement("div");
  actions.className = "actions";
  container.append(actions);
  return actions;
}

function copyToClipboard(text) {
  return navigator.clipboard?.writeText(text).catch(() => undefined);
}

function wordsFromText(text) {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[\W_]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toTitleCase(text) {
  return wordsFromText(text)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function toSnakeCase(text) {
  return wordsFromText(text)
    .map((w) => w.toLowerCase())
    .join("_");
}

function toKebabCase(text) {
  return wordsFromText(text)
    .map((w) => w.toLowerCase())
    .join("-");
}

function toCamelCase(text) {
  const words = wordsFromText(text).map((w) => w.toLowerCase());
  return words
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function unescapeHtml(text) {
  const map = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
  };
  return text.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, (m) => map[m]);
}

function buildJsonTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入 JSON";
  container.append(input);

  const actions = createActions(container);
  const formatBtn = document.createElement("button");
  formatBtn.className = "btn";
  formatBtn.textContent = "格式化";
  const minifyBtn = document.createElement("button");
  minifyBtn.className = "btn";
  minifyBtn.textContent = "压缩";
  const validateBtn = document.createElement("button");
  validateBtn.className = "btn";
  validateBtn.textContent = "校验";
  const copyBtn = document.createElement("button");
  copyBtn.className = "btn btn--ghost";
  copyBtn.textContent = "复制结果";
  actions.append(formatBtn, minifyBtn, validateBtn, copyBtn);

  const result = createResultBox(container);
  const run = (mode) => {
    try {
      const parsed = JSON.parse(input.value);
      if (mode === "format") result.textContent = JSON.stringify(parsed, null, 2);
      if (mode === "minify") result.textContent = JSON.stringify(parsed);
      if (mode === "validate") result.textContent = "JSON 有效";
    } catch (err) {
      result.textContent = `错误: ${err.message}`;
    }
  };

  formatBtn.onclick = () => run("format");
  minifyBtn.onclick = () => run("minify");
  validateBtn.onclick = () => run("validate");
  copyBtn.onclick = () => copyToClipboard(result.textContent || "");
}

function buildBase64Tool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入文本或 Base64";
  container.append(input);

  const actions = createActions(container);
  const encodeBtn = document.createElement("button");
  encodeBtn.className = "btn";
  encodeBtn.textContent = "编码";
  const decodeBtn = document.createElement("button");
  decodeBtn.className = "btn";
  decodeBtn.textContent = "解码";
  actions.append(encodeBtn, decodeBtn);

  const result = createResultBox(container);
  encodeBtn.onclick = () => {
    try {
      result.textContent = btoa(unescape(encodeURIComponent(input.value)));
    } catch {
      result.textContent = "编码失败";
    }
  };
  decodeBtn.onclick = () => {
    try {
      result.textContent = decodeURIComponent(escape(atob(input.value.trim())));
    } catch {
      result.textContent = "解码失败，输入不是合法 Base64";
    }
  };
}

function buildUrlTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入 URL 或参数";
  container.append(input);
  const actions = createActions(container);
  const e = document.createElement("button");
  e.className = "btn";
  e.textContent = "URL Encode";
  const d = document.createElement("button");
  d.className = "btn";
  d.textContent = "URL Decode";
  actions.append(e, d);
  const result = createResultBox(container);

  e.onclick = () => {
    result.textContent = encodeURIComponent(input.value);
  };
  d.onclick = () => {
    try {
      result.textContent = decodeURIComponent(input.value);
    } catch {
      result.textContent = "解码失败";
    }
  };
}

function buildHtmlTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入 HTML 文本";
  container.append(input);
  const actions = createActions(container);
  const e = document.createElement("button");
  e.className = "btn";
  e.textContent = "Escape";
  const d = document.createElement("button");
  d.className = "btn";
  d.textContent = "Unescape";
  actions.append(e, d);
  const result = createResultBox(container);
  e.onclick = () => {
    result.textContent = escapeHtml(input.value);
  };
  d.onclick = () => {
    result.textContent = unescapeHtml(input.value);
  };
}

function buildTextOpsTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "每行一条";
  container.append(input);

  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>排序方式
      <select id="sortSelect">
        <option value="none">不排序</option>
        <option value="asc">升序</option>
        <option value="desc">降序</option>
      </select>
    </label>
    <label>去重
      <select id="uniqSelect">
        <option value="yes">去重</option>
        <option value="no">不去重</option>
      </select>
    </label>
  `;
  container.append(row);

  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "处理";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const sort = row.querySelector("#sortSelect").value;
    const uniq = row.querySelector("#uniqSelect").value === "yes";
    let lines = input.value.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (uniq) lines = [...new Set(lines)];
    if (sort === "asc") lines.sort((a, b) => a.localeCompare(b));
    if (sort === "desc") lines.sort((a, b) => b.localeCompare(a));
    result.textContent = lines.join("\n");
  };
}

function buildCaseTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入文本";
  container.append(input);
  const actions = createActions(container);
  const defs = [
    ["UPPER", (s) => s.toUpperCase()],
    ["lower", (s) => s.toLowerCase()],
    ["Title Case", toTitleCase],
    ["snake_case", toSnakeCase],
    ["kebab-case", toKebabCase],
    ["camelCase", toCamelCase],
  ];
  const result = createResultBox(container);

  defs.forEach(([label, fn]) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = label;
    btn.onclick = () => {
      result.textContent = fn(input.value);
    };
    actions.append(btn);
  });
}

function buildRegexTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  const patternWrap = document.createElement("label");
  patternWrap.textContent = "表达式";
  const pattern = document.createElement("input");
  pattern.placeholder = "例如: \\b\\w+@\\w+\\.\\w+\\b";
  patternWrap.append(pattern);
  const flagsWrap = document.createElement("label");
  flagsWrap.textContent = "Flags";
  const flags = document.createElement("input");
  flags.value = "g";
  flagsWrap.append(flags);
  row.append(patternWrap, flagsWrap);
  container.append(row);

  const input = document.createElement("textarea");
  input.placeholder = "输入待匹配文本";
  container.append(input);

  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "运行";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    try {
      const re = new RegExp(pattern.value, flags.value);
      const source = input.value;
      const matches = [];
      if (re.global) {
        for (const m of source.matchAll(re)) matches.push({ match: m[0], index: m.index });
      } else {
        let m = re.exec(source);
        while (m) {
          matches.push({ match: m[0], index: m.index });
          if (m[0] === "") re.lastIndex += 1;
          m = re.exec(source);
        }
      }
      result.textContent = `共 ${matches.length} 项\n${JSON.stringify(matches.slice(0, 50), null, 2)}`;
    } catch (err) {
      result.textContent = `表达式错误: ${err.message}`;
    }
  };
}

function buildWordCountTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入文本";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "统计";
  container.append(runBtn);
  const result = createResultBox(container, "result");

  runBtn.onclick = () => {
    const text = input.value;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split(/\r?\n/).length : 0;
    result.textContent = `字符: ${chars}\n非空白字符: ${charsNoSpace}\n单词: ${words}\n行数: ${lines}`;
  };
}

function buildTimestampTool(container) {
  const unixInput = document.createElement("input");
  unixInput.placeholder = "输入 10 或 13 位时间戳";
  container.append(unixInput);

  const actions = createActions(container);
  const parseBtn = document.createElement("button");
  parseBtn.className = "btn";
  parseBtn.textContent = "转日期";
  const nowBtn = document.createElement("button");
  nowBtn.className = "btn btn--ghost";
  nowBtn.textContent = "当前时间戳";
  actions.append(parseBtn, nowBtn);

  const dtInput = document.createElement("input");
  dtInput.type = "datetime-local";
  container.append(dtInput);
  const dtBtn = document.createElement("button");
  dtBtn.className = "btn";
  dtBtn.textContent = "转时间戳";
  container.append(dtBtn);
  const result = createResultBox(container);

  parseBtn.onclick = () => {
    const raw = unixInput.value.trim();
    if (!/^(\d{10}|\d{13})$/.test(raw)) {
      result.textContent = "请输入 10 位(秒)或 13 位(毫秒)时间戳";
      return;
    }
    const ms = raw.length === 10 ? Number(raw) * 1000 : Number(raw);
    const d = new Date(ms);
    result.textContent = `本地: ${d.toLocaleString()}\nISO: ${d.toISOString()}`;
  };

  nowBtn.onclick = () => {
    const now = Date.now();
    result.textContent = `秒: ${Math.floor(now / 1000)}\n毫秒: ${now}`;
  };

  dtBtn.onclick = () => {
    if (!dtInput.value) {
      result.textContent = "请选择日期时间";
      return;
    }
    const ms = new Date(dtInput.value).getTime();
    result.textContent = `秒: ${Math.floor(ms / 1000)}\n毫秒: ${ms}`;
  };
}

function buildUuidTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  const countWrap = document.createElement("label");
  countWrap.textContent = "数量 (1-50)";
  const countInput = document.createElement("input");
  countInput.type = "number";
  countInput.min = "1";
  countInput.max = "50";
  countInput.value = "5";
  countWrap.append(countInput);
  row.append(countWrap);
  container.append(row);

  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成 UUID";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const count = Math.min(50, Math.max(1, Number(countInput.value) || 1));
    const ids = Array.from({ length: count }, () => crypto.randomUUID());
    result.textContent = ids.join("\n");
  };
}

function buildPasswordTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>长度
      <input id="len" type="number" min="4" max="128" value="16" />
    </label>
    <label>字符集
      <select id="set">
        <option value="all">字母+数字+符号</option>
        <option value="alnum">字母+数字</option>
        <option value="alpha">仅字母</option>
        <option value="num">仅数字</option>
      </select>
    </label>
  `;
  container.append(row);

  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成密码";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const len = Math.min(128, Math.max(4, Number(row.querySelector("#len").value) || 16));
    const set = row.querySelector("#set").value;
    const sets = {
      all: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+-=",
      alnum: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789",
      alpha: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
      num: "0123456789",
    };
    const chars = sets[set];
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    let out = "";
    for (let i = 0; i < len; i += 1) out += chars[arr[i] % chars.length];
    result.textContent = out;
  };
}

function buildRandomTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>最小值<input id="min" type="number" value="1" /></label>
    <label>最大值<input id="max" type="number" value="100" /></label>
    <label>数量<input id="count" type="number" value="10" min="1" max="500" /></label>
    <label>类型
      <select id="kind">
        <option value="int">整数</option>
        <option value="float">小数(2位)</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const min = Number(row.querySelector("#min").value);
    const max = Number(row.querySelector("#max").value);
    const count = Math.min(500, Math.max(1, Number(row.querySelector("#count").value) || 1));
    const kind = row.querySelector("#kind").value;
    if (max < min) {
      result.textContent = "最大值必须 >= 最小值";
      return;
    }
    const nums = Array.from({ length: count }, () => {
      if (kind === "int") return Math.floor(Math.random() * (max - min + 1)) + min;
      return (Math.random() * (max - min) + min).toFixed(2);
    });
    result.textContent = nums.join(", ");
  };
}

function buildTemperatureTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>数值<input id="val" type="number" value="25" /></label>
    <label>单位
      <select id="unit">
        <option value="c">摄氏 C</option>
        <option value="f">华氏 F</option>
        <option value="k">开尔文 K</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "换算";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const val = Number(row.querySelector("#val").value);
    const unit = row.querySelector("#unit").value;
    let c;
    if (unit === "c") c = val;
    if (unit === "f") c = ((val - 32) * 5) / 9;
    if (unit === "k") c = val - 273.15;
    const f = (c * 9) / 5 + 32;
    const k = c + 273.15;
    result.textContent = `C: ${c.toFixed(2)}\nF: ${f.toFixed(2)}\nK: ${k.toFixed(2)}`;
  };
}

function buildLengthTool(container) {
  const units = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    mile: 1609.344,
    ft: 0.3048,
    in: 0.0254,
  };

  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>数值<input id="val" type="number" value="1" /></label>
    <label>从
      <select id="from">
        <option value="m">米 m</option>
        <option value="km">千米 km</option>
        <option value="cm">厘米 cm</option>
        <option value="mm">毫米 mm</option>
        <option value="mile">英里 mile</option>
        <option value="ft">英尺 ft</option>
        <option value="in">英寸 in</option>
      </select>
    </label>
    <label>到
      <select id="to">
        <option value="km">千米 km</option>
        <option value="m">米 m</option>
        <option value="cm">厘米 cm</option>
        <option value="mm">毫米 mm</option>
        <option value="mile">英里 mile</option>
        <option value="ft">英尺 ft</option>
        <option value="in">英寸 in</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "换算";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const val = Number(row.querySelector("#val").value);
    const from = row.querySelector("#from").value;
    const to = row.querySelector("#to").value;
    const meter = val * units[from];
    const out = meter / units[to];
    result.textContent = `${val} ${from} = ${out.toFixed(8)} ${to}`;
  };
}

function buildColorTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>HEX<input id="hex" class="mono" value="#ff6b35" /></label>
    <label>RGB<input id="rgb" class="mono" value="255,107,53" /></label>
  `;
  container.append(row);

  const actions = createActions(container);
  const h2r = document.createElement("button");
  h2r.className = "btn";
  h2r.textContent = "HEX -> RGB";
  const r2h = document.createElement("button");
  r2h.className = "btn";
  r2h.textContent = "RGB -> HEX";
  actions.append(h2r, r2h);

  const preview = document.createElement("div");
  preview.className = "result";
  preview.style.minHeight = "56px";
  preview.style.display = "grid";
  preview.style.placeItems = "center";
  preview.textContent = "颜色预览";
  container.append(preview);

  const setPreview = (colorText) => {
    preview.style.background = colorText;
  };

  h2r.onclick = () => {
    const hex = row.querySelector("#hex").value.trim().replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
      preview.textContent = "HEX 格式错误";
      return;
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    row.querySelector("#rgb").value = `${r},${g},${b}`;
    preview.textContent = `rgb(${r}, ${g}, ${b})`;
    setPreview(`#${hex}`);
  };

  r2h.onclick = () => {
    const raw = row
      .querySelector("#rgb")
      .value.split(",")
      .map((n) => Number(n.trim()));
    if (raw.length !== 3 || raw.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
      preview.textContent = "RGB 格式错误";
      return;
    }
    const hex = raw.map((n) => n.toString(16).padStart(2, "0")).join("");
    row.querySelector("#hex").value = `#${hex}`;
    preview.textContent = `#${hex}`;
    setPreview(`#${hex}`);
  };

  h2r.click();
}

function buildFuelTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>油价 (元/升)<input id="price" type="number" step="0.01" value="8.20" /></label>
    <label>加油金额 (元)<input id="amount" type="number" step="0.01" value="200" /></label>
    <label>行驶里程 (公里)<input id="distance" type="number" step="0.1" value="300" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算油耗";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const price = Number(row.querySelector("#price").value);
    const amount = Number(row.querySelector("#amount").value);
    const distance = Number(row.querySelector("#distance").value);
    if (price <= 0 || amount <= 0 || distance <= 0) {
      result.textContent = "请输入大于 0 的数值";
      return;
    }
    const liters = amount / price;
    const l100 = (liters / distance) * 100;
    const costPerKm = amount / distance;
    result.textContent = `加油量: ${liters.toFixed(3)} L\n百公里油耗: ${l100.toFixed(2)} L/100km\n每公里油费: ${costPerKm.toFixed(3)} 元/km`;
  };
}

function buildBmiTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>身高 (cm)<input id="height" type="number" step="0.1" value="170" /></label>
    <label>体重 (kg)<input id="weight" type="number" step="0.1" value="65" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算 BMI";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const hCm = Number(row.querySelector("#height").value);
    const w = Number(row.querySelector("#weight").value);
    if (hCm <= 0 || w <= 0) {
      result.textContent = "请输入有效身高和体重";
      return;
    }
    const h = hCm / 100;
    const bmi = w / (h * h);
    let level = "正常";
    if (bmi < 18.5) level = "偏瘦";
    if (bmi >= 24 && bmi < 28) level = "超重";
    if (bmi >= 28) level = "肥胖";
    result.textContent = `BMI: ${bmi.toFixed(2)}\n判定: ${level}`;
  };
}

function buildAgeTool(container) {
  const birth = document.createElement("input");
  birth.type = "date";
  container.append(birth);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算年龄";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    if (!birth.value) {
      result.textContent = "请选择出生日期";
      return;
    }
    const b = new Date(`${birth.value}T00:00:00`);
    const now = new Date();
    if (b > now) {
      result.textContent = "出生日期不能晚于今天";
      return;
    }
    let years = now.getFullYear() - b.getFullYear();
    let months = now.getMonth() - b.getMonth();
    let days = now.getDate() - b.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    result.textContent = `年龄: ${years} 岁 ${months} 月 ${days} 天`;
  };
}

function buildDateDiffTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>开始日期<input id="start" type="date" /></label>
    <label>结束日期<input id="end" type="date" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算日期差";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const s = row.querySelector("#start").value;
    const e = row.querySelector("#end").value;
    if (!s || !e) {
      result.textContent = "请填写开始和结束日期";
      return;
    }
    const start = new Date(`${s}T00:00:00`);
    const end = new Date(`${e}T00:00:00`);
    const diff = end.getTime() - start.getTime();
    const sign = diff >= 0 ? 1 : -1;
    const days = Math.floor(Math.abs(diff) / 86400000);
    result.textContent = `相差: ${sign * days} 天`;
  };
}

function buildCountdownTool(container) {
  const target = document.createElement("input");
  target.type = "datetime-local";
  container.append(target);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算倒计时";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    if (!target.value) {
      result.textContent = "请选择目标时间";
      return;
    }
    const now = Date.now();
    const t = new Date(target.value).getTime();
    const diff = t - now;
    if (diff <= 0) {
      result.textContent = "目标时间已到或已过";
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    result.textContent = `剩余: ${days} 天 ${hours} 小时 ${mins} 分 ${secs} 秒`;
  };
}

function buildPercentTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>部分值<input id="part" type="number" step="0.01" value="30" /></label>
    <label>整体值<input id="whole" type="number" step="0.01" value="120" /></label>
    <label>原值<input id="old" type="number" step="0.01" value="80" /></label>
    <label>新值<input id="new" type="number" step="0.01" value="100" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算百分比";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const part = Number(row.querySelector("#part").value);
    const whole = Number(row.querySelector("#whole").value);
    const oldVal = Number(row.querySelector("#old").value);
    const newVal = Number(row.querySelector("#new").value);
    if (whole === 0 || oldVal === 0) {
      result.textContent = "整体值和原值不能为 0";
      return;
    }
    const ratio = (part / whole) * 100;
    const change = ((newVal - oldVal) / oldVal) * 100;
    result.textContent = `占比: ${ratio.toFixed(2)}%\n变化率: ${change.toFixed(2)}%`;
  };
}

function buildUnitPriceTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>总价 (元)<input id="price" type="number" step="0.01" value="59.9" /></label>
    <label>数量<input id="qty" type="number" step="0.01" value="3" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算单价";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const price = Number(row.querySelector("#price").value);
    const qty = Number(row.querySelector("#qty").value);
    if (qty <= 0) {
      result.textContent = "数量必须大于 0";
      return;
    }
    result.textContent = `单价: ${(price / qty).toFixed(4)} 元`;
  };
}

function buildBaseTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>输入数值<input id="value" class="mono" placeholder="例如 ff" /></label>
    <label>从进制<input id="from" type="number" min="2" max="36" value="16" /></label>
    <label>到进制<input id="to" type="number" min="2" max="36" value="10" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "转换";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const value = row.querySelector("#value").value.trim();
    const from = Number(row.querySelector("#from").value);
    const to = Number(row.querySelector("#to").value);
    if (!value) {
      result.textContent = "请输入数值";
      return;
    }
    const num = parseInt(value, from);
    if (Number.isNaN(num)) {
      result.textContent = "输入与进制不匹配";
      return;
    }
    result.textContent = num.toString(to);
  };
}

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function buildHashTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入文本";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成 SHA-256";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = async () => {
    result.textContent = "计算中...";
    result.textContent = await sha256(input.value);
  };
}

function calcEqualInstallment(principal, monthlyRate, months) {
  if (principal <= 0 || months <= 0) return { monthly: 0, total: 0, interest: 0 };
  if (monthlyRate === 0) {
    const monthly = principal / months;
    return { monthly, total: principal, interest: 0 };
  }
  const monthly = (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
  const total = monthly * months;
  return { monthly, total, interest: total - principal };
}

function calcEqualPrincipal(principal, monthlyRate, months) {
  if (principal <= 0 || months <= 0) {
    return { first: 0, last: 0, decrease: 0, total: 0, interest: 0 };
  }
  const base = principal / months;
  const first = base + principal * monthlyRate;
  const last = base + base * monthlyRate;
  const decrease = base * monthlyRate;
  const interest = ((months + 1) * principal * monthlyRate) / 2;
  const total = principal + interest;
  return { first, last, decrease, total, interest };
}

function buildCompoundInterestTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>初始本金 (元)<input id="principal" type="number" step="100" value="100000" /></label>
    <label>每月追加 (元)<input id="monthly" type="number" step="100" value="2000" /></label>
    <label>年化收益率 (%)<input id="rate" type="number" step="0.01" value="6" /></label>
    <label>投资年限 (年)<input id="years" type="number" step="1" value="10" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算复利";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const principal = Number(row.querySelector("#principal").value);
    const monthly = Number(row.querySelector("#monthly").value);
    const annualRate = Number(row.querySelector("#rate").value) / 100;
    const years = Number(row.querySelector("#years").value);
    if (principal < 0 || monthly < 0 || years <= 0 || annualRate < 0) {
      result.textContent = "请输入有效参数";
      return;
    }
    const n = Math.round(years * 12);
    const r = annualRate / 12;
    const fvPrincipal = principal * (1 + r) ** n;
    const fvMonthly = r === 0 ? monthly * n : monthly * (((1 + r) ** n - 1) / r);
    const finalValue = fvPrincipal + fvMonthly;
    const invested = principal + monthly * n;
    result.textContent = `投入本金: ${invested.toFixed(2)} 元\n期末总资产: ${finalValue.toFixed(2)} 元\n总收益: ${(finalValue - invested).toFixed(2)} 元`;
  };
}

function buildDcaTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>每月定投 (元)<input id="monthly" type="number" step="100" value="1000" /></label>
    <label>年化收益率 (%)<input id="rate" type="number" step="0.01" value="8" /></label>
    <label>投资年限 (年)<input id="years" type="number" value="10" /></label>
    <label>每年递增 (%)<input id="increase" type="number" step="0.1" value="0" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算定投";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    let monthly = Number(row.querySelector("#monthly").value);
    const annualRate = Number(row.querySelector("#rate").value) / 100;
    const years = Number(row.querySelector("#years").value);
    const increase = Number(row.querySelector("#increase").value) / 100;
    if (monthly <= 0 || annualRate < 0 || years <= 0 || increase < 0) {
      result.textContent = "请输入有效参数";
      return;
    }
    const r = annualRate / 12;
    let value = 0;
    let invested = 0;
    for (let y = 1; y <= years; y += 1) {
      for (let m = 1; m <= 12; m += 1) {
        value = (value + monthly) * (1 + r);
        invested += monthly;
      }
      monthly *= 1 + increase;
    }
    result.textContent = `累计投入: ${invested.toFixed(2)} 元\n期末资产: ${value.toFixed(2)} 元\n收益: ${(value - invested).toFixed(2)} 元`;
  };
}

function buildReturnRateTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>初始金额 (元)<input id="start" type="number" step="0.01" value="10000" /></label>
    <label>当前金额 (元)<input id="end" type="number" step="0.01" value="12500" /></label>
    <label>持有年限 (年，可选)<input id="years" type="number" step="0.01" value="2" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算收益率";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const start = Number(row.querySelector("#start").value);
    const end = Number(row.querySelector("#end").value);
    const years = Number(row.querySelector("#years").value);
    if (start <= 0 || end < 0) {
      result.textContent = "请输入有效金额";
      return;
    }
    const total = ((end - start) / start) * 100;
    let annualized = "未计算";
    if (years > 0) {
      annualized = `${(((end / start) ** (1 / years) - 1) * 100).toFixed(4)}%`;
    }
    result.textContent = `总收益率: ${total.toFixed(2)}%\n年化收益率: ${annualized}`;
  };
}

function buildLoanFinanceTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>贷款金额 (元)<input id="principal" type="number" step="1000" value="500000" /></label>
    <label>年利率 (%)<input id="rate" type="number" step="0.01" value="3.95" /></label>
    <label>期限 (年)<input id="years" type="number" value="30" /></label>
    <label>还款方式
      <select id="method">
        <option value="equal_installment">等额本息</option>
        <option value="equal_principal">等额本金</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算贷款";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const principal = Number(row.querySelector("#principal").value);
    const annualRate = Number(row.querySelector("#rate").value) / 100;
    const years = Number(row.querySelector("#years").value);
    const method = row.querySelector("#method").value;
    if (principal <= 0 || annualRate < 0 || years <= 0) {
      result.textContent = "请输入有效参数";
      return;
    }
    const n = Math.round(years * 12);
    const r = annualRate / 12;
    if (method === "equal_installment") {
      const m = calcEqualInstallment(principal, r, n);
      result.textContent = `方式: 等额本息\n月供: ${m.monthly.toFixed(2)} 元\n总还款: ${m.total.toFixed(2)} 元\n总利息: ${m.interest.toFixed(2)} 元`;
    } else {
      const m = calcEqualPrincipal(principal, r, n);
      result.textContent = `方式: 等额本金\n首月还款: ${m.first.toFixed(2)} 元\n末月还款: ${m.last.toFixed(2)} 元\n每月递减: ${m.decrease.toFixed(2)} 元\n总还款: ${m.total.toFixed(2)} 元\n总利息: ${m.interest.toFixed(2)} 元`;
    }
  };
}

function buildMortgageTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>商贷金额 (元)<input id="bizPrincipal" type="number" step="1000" value="800000" /></label>
    <label>商贷利率 (%)<input id="bizRate" type="number" step="0.01" value="3.95" /></label>
    <label>公积金金额 (元)<input id="fundPrincipal" type="number" step="1000" value="300000" /></label>
    <label>公积金利率 (%)<input id="fundRate" type="number" step="0.01" value="2.85" /></label>
    <label>期限 (年)<input id="years" type="number" value="30" /></label>
    <label>还款方式
      <select id="method">
        <option value="equal_installment">等额本息</option>
        <option value="equal_principal">等额本金</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算房贷";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    const bizPrincipal = Number(row.querySelector("#bizPrincipal").value);
    const bizRate = Number(row.querySelector("#bizRate").value) / 100 / 12;
    const fundPrincipal = Number(row.querySelector("#fundPrincipal").value);
    const fundRate = Number(row.querySelector("#fundRate").value) / 100 / 12;
    const years = Number(row.querySelector("#years").value);
    const method = row.querySelector("#method").value;

    if (bizPrincipal < 0 || fundPrincipal < 0 || years <= 0 || bizRate < 0 || fundRate < 0) {
      result.textContent = "请输入有效参数";
      return;
    }

    const n = Math.round(years * 12);
    if (method === "equal_installment") {
      const biz = calcEqualInstallment(bizPrincipal, bizRate, n);
      const fund = calcEqualInstallment(fundPrincipal, fundRate, n);
      const monthly = biz.monthly + fund.monthly;
      const total = biz.total + fund.total;
      const interest = biz.interest + fund.interest;
      result.textContent = `方式: 等额本息 (组合贷款)\n月供: ${monthly.toFixed(2)} 元\n总还款: ${total.toFixed(2)} 元\n总利息: ${interest.toFixed(2)} 元`;
    } else {
      const biz = calcEqualPrincipal(bizPrincipal, bizRate, n);
      const fund = calcEqualPrincipal(fundPrincipal, fundRate, n);
      const first = biz.first + fund.first;
      const last = biz.last + fund.last;
      const decrease = biz.decrease + fund.decrease;
      const total = biz.total + fund.total;
      const interest = biz.interest + fund.interest;
      result.textContent = `方式: 等额本金 (组合贷款)\n首月还款: ${first.toFixed(2)} 元\n末月还款: ${last.toFixed(2)} 元\n每月递减: ${decrease.toFixed(2)} 元\n总还款: ${total.toFixed(2)} 元\n总利息: ${interest.toFixed(2)} 元`;
    }
  };
}

function base64UrlDecode(str) {
  const normalized = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 ? "=".repeat(4 - (normalized.length % 4)) : "";
  return decodeURIComponent(escape(atob(normalized + pad)));
}

function buildJwtTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入 JWT Token";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "解析 Token";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = () => {
    try {
      const parts = input.value.trim().split(".");
      if (parts.length < 2) {
        result.textContent = "Token 格式错误";
        return;
      }
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      const exp = payload.exp ? new Date(payload.exp * 1000).toLocaleString() : "未提供";
      result.textContent = `Header:\n${JSON.stringify(header, null, 2)}\n\nPayload:\n${JSON.stringify(payload, null, 2)}\n\n到期时间: ${exp}`;
    } catch (err) {
      result.textContent = `解析失败: ${err.message}`;
    }
  };
}

function parseCronField(field, min, max) {
  const out = new Set();
  const chunks = field.split(",");
  chunks.forEach((chunk) => {
    const c = chunk.trim();
    if (c === "*") {
      for (let i = min; i <= max; i += 1) out.add(i);
      return;
    }
    const stepMatch = c.match(/^\*\/(\d+)$/);
    if (stepMatch) {
      const step = Number(stepMatch[1]);
      for (let i = min; i <= max; i += step) out.add(i);
      return;
    }
    const rangeMatch = c.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);
      for (let i = start; i <= end; i += 1) if (i >= min && i <= max) out.add(i);
      return;
    }
    const n = Number(c);
    if (!Number.isNaN(n) && n >= min && n <= max) out.add(n);
  });
  return out;
}

function nextCronRuns(expr, count = 5) {
  const f = expr.trim().split(/\s+/);
  if (f.length !== 5) throw new Error("Cron 需 5 段: 分 时 日 月 周");
  const mins = parseCronField(f[0], 0, 59);
  const hours = parseCronField(f[1], 0, 23);
  const dates = parseCronField(f[2], 1, 31);
  const months = parseCronField(f[3], 1, 12);
  const weeks = parseCronField(f[4], 0, 6);
  if (!mins.size || !hours.size || !dates.size || !months.size || !weeks.size) throw new Error("Cron 字段无效");

  const now = new Date();
  now.setSeconds(0, 0);
  now.setMinutes(now.getMinutes() + 1);
  const hits = [];
  const cursor = new Date(now);
  const maxChecks = 60 * 24 * 366;
  let checked = 0;
  while (hits.length < count && checked < maxChecks) {
    if (
      mins.has(cursor.getMinutes()) &&
      hours.has(cursor.getHours()) &&
      dates.has(cursor.getDate()) &&
      months.has(cursor.getMonth() + 1) &&
      weeks.has(cursor.getDay())
    ) {
      hits.push(new Date(cursor));
    }
    cursor.setMinutes(cursor.getMinutes() + 1);
    checked += 1;
  }
  return hits;
}

function buildCronTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>Cron 表达式
      <input id="expr" class="mono" value="*/15 * * * *" />
    </label>
    <label>常用模板
      <select id="tpl">
        <option value="">选择模板</option>
        <option value="*/5 * * * *">每5分钟</option>
        <option value="0 * * * *">每小时整点</option>
        <option value="0 9 * * 1-5">工作日 9:00</option>
        <option value="0 0 * * *">每天 00:00</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算下次执行";
  container.append(runBtn);
  const result = createResultBox(container);

  row.querySelector("#tpl").onchange = (e) => {
    if (e.target.value) row.querySelector("#expr").value = e.target.value;
  };

  runBtn.onclick = () => {
    try {
      const expr = row.querySelector("#expr").value.trim();
      const list = nextCronRuns(expr, 8).map((d) => d.toLocaleString());
      result.textContent = `表达式: ${expr}\n\n下次执行时间:\n${list.join("\n")}`;
    } catch (err) {
      result.textContent = `解析失败: ${err.message}`;
    }
  };
}

function formatSql(sql) {
  const keywords = [
    "select",
    "from",
    "where",
    "group by",
    "order by",
    "having",
    "limit",
    "insert into",
    "values",
    "update",
    "set",
    "delete",
    "left join",
    "right join",
    "inner join",
    "join",
    "on",
    "and",
    "or",
  ];
  let out = sql.replace(/\s+/g, " ").trim();
  keywords.forEach((kw) => {
    const re = new RegExp(`\\b${kw.replace(/\s+/g, "\\s+")}\\b`, "gi");
    out = out.replace(re, `\n${kw.toUpperCase()}`);
  });
  return out.trim();
}

function buildSqlTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入 SQL";
  container.append(input);
  const actions = createActions(container);
  const fmt = document.createElement("button");
  fmt.className = "btn";
  fmt.textContent = "格式化";
  const min = document.createElement("button");
  min.className = "btn btn--ghost";
  min.textContent = "压缩";
  actions.append(fmt, min);
  const result = createResultBox(container);
  fmt.onclick = () => {
    result.textContent = formatSql(input.value);
  };
  min.onclick = () => {
    result.textContent = input.value.replace(/\s+/g, " ").trim();
  };
}

function markdownToHtml(md) {
  let text = escapeHtml(md);
  text = text.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
  text = text.replace(/^###### (.*)$/gm, "<h6>$1</h6>");
  text = text.replace(/^##### (.*)$/gm, "<h5>$1</h5>");
  text = text.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
  text = text.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  text = text.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  text = text.replace(/^- (.*)$/gm, "<li>$1</li>");
  text = text.replace(/(<li>[\s\S]*<\/li>)/g, "<ul>$1</ul>");
  text = text.replace(/\n{2,}/g, "</p><p>");
  text = text.replace(/\n/g, "<br>");
  return `<p>${text}</p>`;
}

function buildMarkdownTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入 Markdown";
  container.append(input);
  const actions = createActions(container);
  const run = document.createElement("button");
  run.className = "btn";
  run.textContent = "预览";
  const copy = document.createElement("button");
  copy.className = "btn btn--ghost";
  copy.textContent = "复制 HTML";
  actions.append(run, copy);

  const preview = document.createElement("div");
  preview.className = "result";
  preview.style.minHeight = "200px";
  container.append(preview);

  run.onclick = () => {
    preview.innerHTML = markdownToHtml(input.value);
  };
  copy.onclick = () => copyToClipboard(preview.innerHTML || "");
}

function buildQrTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>内容
      <input id="text" value="https://example.com" />
    </label>
    <label>尺寸(px)
      <input id="size" type="number" min="100" max="1000" value="260" />
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成二维码";
  container.append(runBtn);
  const box = document.createElement("div");
  box.className = "result";
  box.style.display = "grid";
  box.style.placeItems = "center";
  box.style.minHeight = "280px";
  container.append(box);

  runBtn.onclick = () => {
    const text = row.querySelector("#text").value.trim();
    const size = Math.min(1000, Math.max(100, Number(row.querySelector("#size").value) || 260));
    if (!text) {
      box.textContent = "请输入内容";
      return;
    }
    const img = document.createElement("img");
    img.alt = "QR Code";
    img.width = size;
    img.height = size;
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    box.innerHTML = "";
    box.append(img);
  };
}

function buildImageTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>目标格式
      <select id="format">
        <option value="image/jpeg">JPG</option>
        <option value="image/png">PNG</option>
        <option value="image/webp">WEBP</option>
      </select>
    </label>
    <label>质量(仅JPG/WEBP)
      <input id="quality" type="number" min="0.1" max="1" step="0.05" value="0.82" />
    </label>
    <label>最大宽度(px，0为不限制)
      <input id="maxWidth" type="number" min="0" value="1600" />
    </label>
  `;
  container.append(row);
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "压缩 / 转换";
  container.append(runBtn);
  const result = createResultBox(container);
  const preview = document.createElement("div");
  preview.className = "result";
  container.append(preview);

  runBtn.onclick = () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请先选择图片";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = Number(row.querySelector("#maxWidth").value) || 0;
        let w = img.width;
        let h = img.height;
        if (maxWidth > 0 && w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const type = row.querySelector("#format").value;
        const quality = Number(row.querySelector("#quality").value);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              result.textContent = "处理失败";
              return;
            }
            const url = URL.createObjectURL(blob);
            const outImg = document.createElement("img");
            outImg.src = url;
            outImg.style.maxWidth = "100%";
            const ext = type.split("/")[1];
            const a = document.createElement("a");
            a.href = url;
            a.download = `converted.${ext}`;
            a.textContent = "下载处理后的图片";
            preview.innerHTML = "";
            preview.append(outImg, document.createElement("br"), a);
            result.textContent = `原始: ${(f.size / 1024).toFixed(1)} KB\n输出: ${(blob.size / 1024).toFixed(1)} KB\n尺寸: ${w}x${h}`;
          },
          type,
          quality,
        );
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(f);
  };
}

function buildTriDebugTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入原始文本";
  container.append(input);
  const actions = createActions(container);
  const b64 = document.createElement("button");
  b64.className = "btn";
  b64.textContent = "转 Base64";
  const url = document.createElement("button");
  url.className = "btn";
  url.textContent = "转 URL";
  const json = document.createElement("button");
  json.className = "btn";
  json.textContent = "JSON 格式化";
  actions.append(b64, url, json);
  const result = createResultBox(container);

  b64.onclick = () => {
    try {
      result.textContent = btoa(unescape(encodeURIComponent(input.value)));
    } catch {
      result.textContent = "Base64 编码失败";
    }
  };
  url.onclick = () => {
    result.textContent = encodeURIComponent(input.value);
  };
  json.onclick = () => {
    try {
      result.textContent = JSON.stringify(JSON.parse(input.value), null, 2);
    } catch (err) {
      result.textContent = `JSON 解析失败: ${err.message}`;
    }
  };
}

function buildRegexVisualTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>表达式<input id="pattern" class="mono" value="\\b\\w+@\\w+\\.\\w+\\b" /></label>
    <label>Flags<input id="flags" class="mono" value="gi" /></label>
  `;
  container.append(row);
  const input = document.createElement("textarea");
  input.placeholder = "输入待匹配文本";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "高亮匹配";
  container.append(runBtn);
  const out = document.createElement("div");
  out.className = "result";
  out.style.minHeight = "120px";
  container.append(out);

  runBtn.onclick = () => {
    try {
      const p = row.querySelector("#pattern").value;
      let flags = row.querySelector("#flags").value || "";
      if (!flags.includes("g")) flags += "g";
      const re = new RegExp(p, flags);
      const text = input.value;
      const parts = [];
      let last = 0;
      for (const m of text.matchAll(re)) {
        const start = m.index ?? 0;
        const end = start + m[0].length;
        parts.push(escapeHtml(text.slice(last, start)));
        parts.push(`<mark>${escapeHtml(m[0])}</mark>`);
        last = end;
        if (m[0] === "") last += 1;
      }
      parts.push(escapeHtml(text.slice(last)));
      out.innerHTML = parts.join("");
    } catch (err) {
      out.textContent = `表达式错误: ${err.message}`;
    }
  };
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildMockTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>数量
      <input id="count" type="number" min="1" max="1000" value="10" />
    </label>
    <label>字段(逗号分隔)
      <input id="fields" value="id,name,email,phone,time" />
    </label>
  `;
  container.append(row);
  const actions = createActions(container);
  const genBtn = document.createElement("button");
  genBtn.className = "btn";
  genBtn.textContent = "生成 Mock";
  const csvBtn = document.createElement("button");
  csvBtn.className = "btn btn--ghost";
  csvBtn.textContent = "导出 CSV";
  actions.append(genBtn, csvBtn);

  const result = createResultBox(container);
  let lastRows = [];

  function genValue(field, i) {
    if (field === "id") return crypto.randomUUID();
    if (field === "name") {
      const first = ["Li", "Wang", "Zhang", "Liu", "Chen", "Yang"];
      const last = ["Ming", "Lei", "Hua", "Xin", "Tao", "Nan"];
      return `${randomItem(first)} ${randomItem(last)}`;
    }
    if (field === "email") return `user${i + 1}@example.com`;
    if (field === "phone") return `1${Math.floor(3000000000 + Math.random() * 6999999999)}`;
    if (field === "time") return new Date(Date.now() - Math.floor(Math.random() * 1e10)).toISOString();
    return `${field}_${i + 1}`;
  }

  function rowsToCsv(rows) {
    if (!rows.length) return "";
    const keys = Object.keys(rows[0]);
    const head = keys.join(",");
    const body = rows
      .map((r) =>
        keys
          .map((k) => {
            const v = String(r[k] ?? "");
            if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
            return v;
          })
          .join(","),
      )
      .join("\n");
    return `${head}\n${body}`;
  }

  genBtn.onclick = () => {
    const count = Math.min(1000, Math.max(1, Number(row.querySelector("#count").value) || 10));
    const fields = row
      .querySelector("#fields")
      .value.split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    if (!fields.length) {
      result.textContent = "请至少输入一个字段";
      return;
    }
    lastRows = Array.from({ length: count }, (_, i) => {
      const obj = {};
      fields.forEach((f) => {
        obj[f] = genValue(f, i);
      });
      return obj;
    });
    result.textContent = JSON.stringify(lastRows, null, 2);
  };

  csvBtn.onclick = () => {
    if (!lastRows.length) {
      result.textContent = "请先生成数据";
      return;
    }
    result.textContent = rowsToCsv(lastRows);
  };
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (ch !== "\r") {
      cell += ch;
    }
  }
  row.push(cell);
  rows.push(row);
  return rows;
}

function buildCsvJsonTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入 CSV 或 JSON";
  container.append(input);
  const actions = createActions(container);
  const c2j = document.createElement("button");
  c2j.className = "btn";
  c2j.textContent = "CSV -> JSON";
  const j2c = document.createElement("button");
  j2c.className = "btn";
  j2c.textContent = "JSON -> CSV";
  actions.append(c2j, j2c);
  const result = createResultBox(container);

  c2j.onclick = () => {
    try {
      const rows = parseCsv(input.value.trim());
      const headers = rows[0];
      const out = rows.slice(1).map((r) => {
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = r[i] ?? "";
        });
        return obj;
      });
      result.textContent = JSON.stringify(out, null, 2);
    } catch (err) {
      result.textContent = `转换失败: ${err.message}`;
    }
  };

  j2c.onclick = () => {
    try {
      const data = JSON.parse(input.value);
      if (!Array.isArray(data) || !data.length) {
        result.textContent = "JSON 需为非空数组";
        return;
      }
      const keys = Object.keys(data[0]);
      const lines = [keys.join(",")];
      data.forEach((item) => {
        lines.push(
          keys
            .map((k) => {
              const v = String(item[k] ?? "");
              if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
              return v;
            })
            .join(","),
        );
      });
      result.textContent = lines.join("\n");
    } catch (err) {
      result.textContent = `转换失败: ${err.message}`;
    }
  };
}

function bytesToBase64Url(bytes) {
  const str = btoa(String.fromCharCode(...bytes));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function strToBase64Url(str) {
  return bytesToBase64Url(new TextEncoder().encode(str));
}

async function hmacSha256Base64Url(secret, data) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return bytesToBase64Url(new Uint8Array(sig));
}

function buildJwtSignTool(container) {
  const header = document.createElement("textarea");
  header.className = "mono";
  header.value = JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2);
  container.append(header);
  const payload = document.createElement("textarea");
  payload.className = "mono";
  payload.placeholder = "Payload JSON";
  payload.value = JSON.stringify({ sub: "123", iat: Math.floor(Date.now() / 1000) }, null, 2);
  container.append(payload);
  const secret = document.createElement("input");
  secret.placeholder = "输入 HMAC Secret";
  secret.type = "password";
  container.append(secret);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成 JWT";
  container.append(runBtn);
  const result = createResultBox(container);

  runBtn.onclick = async () => {
    try {
      const h = JSON.stringify(JSON.parse(header.value));
      const p = JSON.stringify(JSON.parse(payload.value));
      if (!secret.value) {
        result.textContent = "请填写 Secret";
        return;
      }
      const hB64 = strToBase64Url(h);
      const pB64 = strToBase64Url(p);
      const signInput = `${hB64}.${pB64}`;
      const sig = await hmacSha256Base64Url(secret.value, signInput);
      result.textContent = `${signInput}.${sig}`;
    } catch (err) {
      result.textContent = `生成失败: ${err.message}`;
    }
  };
}

function buildQueryEditorTool(container) {
  const input = document.createElement("input");
  input.placeholder = "输入 URL，例如 https://example.com?a=1&b=2";
  container.append(input);
  const rows = document.createElement("div");
  rows.className = "actions";
  rows.style.flexDirection = "column";
  rows.style.alignItems = "stretch";
  container.append(rows);
  const addBtn = document.createElement("button");
  addBtn.className = "btn btn--ghost";
  addBtn.textContent = "新增参数";
  container.append(addBtn);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成 URL";
  container.append(runBtn);
  const result = createResultBox(container);

  function addRow(k = "", v = "") {
    const wrap = document.createElement("div");
    wrap.className = "field-row";
    wrap.innerHTML = `
      <input data-k placeholder="key" value="${escapeHtml(k)}" />
      <input data-v placeholder="value" value="${escapeHtml(v)}" />
    `;
    const del = document.createElement("button");
    del.className = "btn btn--ghost";
    del.textContent = "删除";
    del.onclick = () => wrap.remove();
    wrap.append(del);
    rows.append(wrap);
  }

  function loadFromUrl() {
    rows.innerHTML = "";
    try {
      const u = new URL(input.value.trim());
      u.searchParams.forEach((v, k) => addRow(k, v));
      if (!rows.children.length) addRow();
    } catch {
      addRow();
    }
  }

  input.addEventListener("change", loadFromUrl);
  addBtn.onclick = () => addRow();
  runBtn.onclick = () => {
    try {
      const base = input.value.trim() || "https://example.com";
      const u = new URL(base);
      u.search = "";
      rows.querySelectorAll("div.field-row").forEach((r) => {
        const k = r.querySelector("[data-k]").value.trim();
        const v = r.querySelector("[data-v]").value;
        if (k) u.searchParams.append(k, v);
      });
      result.textContent = u.toString();
    } catch (err) {
      result.textContent = `URL 无效: ${err.message}`;
    }
  };
  loadFromUrl();
}

function formatDateByPattern(d, pattern) {
  const pad = (n, l = 2) => String(n).padStart(l, "0");
  return pattern
    .replace(/YYYY/g, String(d.getFullYear()))
    .replace(/MM/g, pad(d.getMonth() + 1))
    .replace(/DD/g, pad(d.getDate()))
    .replace(/HH/g, pad(d.getHours()))
    .replace(/mm/g, pad(d.getMinutes()))
    .replace(/ss/g, pad(d.getSeconds()));
}

function buildUnixFormatTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>时间戳(秒或毫秒)<input id="ts" value="${Date.now()}" /></label>
    <label>格式<input id="fmt" class="mono" value="YYYY-MM-DD HH:mm:ss" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "格式化";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = () => {
    const raw = row.querySelector("#ts").value.trim();
    const fmt = row.querySelector("#fmt").value.trim();
    const n = Number(raw);
    if (Number.isNaN(n)) {
      result.textContent = "时间戳无效";
      return;
    }
    const ms = raw.length <= 10 ? n * 1000 : n;
    const d = new Date(ms);
    result.textContent = `${formatDateByPattern(d, fmt)}\nISO: ${d.toISOString()}`;
  };
}

function buildDiffTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  const left = document.createElement("textarea");
  left.placeholder = "原文本";
  const right = document.createElement("textarea");
  right.placeholder = "新文本";
  row.append(left, right);
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "比较差异";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");

  runBtn.onclick = () => {
    const a = left.value.split(/\r?\n/);
    const b = right.value.split(/\r?\n/);
    const max = Math.max(a.length, b.length);
    const lines = [];
    for (let i = 0; i < max; i += 1) {
      const l = a[i] ?? "";
      const r = b[i] ?? "";
      if (l === r) lines.push(`  ${escapeHtml(l)}`);
      else {
        if (l) lines.push(`<span style="color:#b91c1c">- ${escapeHtml(l)}</span>`);
        if (r) lines.push(`<span style="color:#0f766e">+ ${escapeHtml(r)}</span>`);
      }
    }
    result.innerHTML = lines.join("<br>");
  };
}

function hexToRgb(hex) {
  const raw = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return null;
  return [parseInt(raw.slice(0, 2), 16), parseInt(raw.slice(2, 4), 16), parseInt(raw.slice(4, 6), 16)];
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b]
    .map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0"))
    .join("")}`;
}

function buildPaletteTool(container) {
  const input = document.createElement("input");
  input.value = "#0f766e";
  input.className = "mono";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成配色";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");

  runBtn.onclick = () => {
    const rgb = hexToRgb(input.value.trim());
    if (!rgb) {
      result.textContent = "HEX 颜色无效";
      return;
    }
    const [r, g, b] = rgb;
    const palette = [
      input.value,
      rgbToHex(r + 30, g + 30, b + 30),
      rgbToHex(r - 30, g - 30, b - 30),
      rgbToHex(255 - r, 255 - g, 255 - b),
      rgbToHex((r + 255) / 2, (g + 255) / 2, (b + 255) / 2),
    ];
    result.innerHTML = palette
      .map(
        (c) =>
          `<div style="display:flex;align-items:center;gap:8px;margin:6px 0"><span style="display:inline-block;width:28px;height:28px;border-radius:6px;background:${c};border:1px solid #ddd"></span><code>${c}</code></div>`,
      )
      .join("");
  };
}

function readExifFromJpeg(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  if (view.getUint16(0) !== 0xffd8) return { error: "不是 JPEG 文件" };
  let offset = 2;
  while (offset < view.byteLength) {
    const marker = view.getUint16(offset);
    const len = view.getUint16(offset + 2);
    if (marker === 0xffe1) {
      const start = offset + 4;
      const exif = String.fromCharCode(...new Uint8Array(arrayBuffer.slice(start, start + 4)));
      if (exif !== "Exif") return { error: "未找到 EXIF 数据" };
      const tiff = start + 6;
      const little = view.getUint16(tiff) === 0x4949;
      const get16 = (o) => (little ? view.getUint16(o, true) : view.getUint16(o));
      const get32 = (o) => (little ? view.getUint32(o, true) : view.getUint32(o));
      const ifdOffset = tiff + get32(tiff + 4);
      const entries = get16(ifdOffset);
      const tags = {};
      const tagNames = {
        0x010f: "Make",
        0x0110: "Model",
        0x0132: "DateTime",
        0x0112: "Orientation",
        0x8827: "ISO",
      };
      for (let i = 0; i < entries; i += 1) {
        const e = ifdOffset + 2 + i * 12;
        const tag = get16(e);
        const type = get16(e + 2);
        const count = get32(e + 4);
        const valueOffset = e + 8;
        const name = tagNames[tag] || `Tag_${tag}`;
        if (type === 2) {
          const dataOffset = tiff + get32(valueOffset);
          let s = "";
          for (let j = 0; j < count - 1; j += 1) s += String.fromCharCode(view.getUint8(dataOffset + j));
          tags[name] = s;
        } else if (type === 3) {
          tags[name] = get16(valueOffset);
        } else {
          tags[name] = get32(valueOffset);
        }
      }
      return tags;
    }
    offset += 2 + len;
  }
  return { error: "未发现 EXIF" };
}

function buildExifTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/jpeg,image/jpg";
  container.append(file);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "读取 EXIF";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请先选择 JPG 图片";
      return;
    }
    const buf = await f.arrayBuffer();
    result.textContent = JSON.stringify(readExifFromJpeg(buf), null, 2);
  };
}

function buildGifFramesTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/gif";
  container.append(file);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "提取 GIF 帧";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择 GIF";
      return;
    }
    if (typeof ImageDecoder === "undefined") {
      result.textContent = "当前浏览器不支持 ImageDecoder，无法拆帧";
      return;
    }
    const decoder = new ImageDecoder({ data: f, type: "image/gif" });
    await decoder.tracks.ready;
    const frameCount = decoder.tracks.selectedTrack.frameCount;
    const n = Math.min(frameCount, 20);
    result.innerHTML = `<p>总帧数: ${frameCount}（预览前 ${n} 帧）</p>`;
    for (let i = 0; i < n; i += 1) {
      const { image } = await decoder.decode({ frameIndex: i });
      const canvas = document.createElement("canvas");
      canvas.width = image.displayWidth;
      canvas.height = image.displayHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      canvas.style.maxWidth = "180px";
      canvas.style.margin = "4px";
      result.append(canvas);
      image.close();
    }
  };
}

function audioBufferToWavBlob(buffer) {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const ab = new ArrayBuffer(length);
  const view = new DataView(ab);
  const writeStr = (o, s) => {
    for (let i = 0; i < s.length; i += 1) view.setUint8(o + i, s.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + buffer.length * numOfChan * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numOfChan, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * numOfChan * 2, true);
  view.setUint16(32, numOfChan * 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, buffer.length * numOfChan * 2, true);
  let offset = 44;
  for (let i = 0; i < buffer.length; i += 1) {
    for (let ch = 0; ch < numOfChan; ch += 1) {
      let sample = buffer.getChannelData(ch)[i];
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }
  return new Blob([ab], { type: "audio/wav" });
}

function buildAudioTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "audio/*";
  container.append(file);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "转换为 WAV";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择音频文件";
      return;
    }
    const ac = new AudioContext();
    const buf = await f.arrayBuffer();
    const audio = await ac.decodeAudioData(buf.slice(0));
    const wav = audioBufferToWavBlob(audio);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(wav);
    a.download = "converted.wav";
    a.textContent = "下载 WAV 文件";
    result.innerHTML = `原始: ${(f.size / 1024).toFixed(1)} KB，输出: ${(wav.size / 1024).toFixed(1)} KB<br>`;
    result.append(a);
    ac.close();
  };
}

let pdfLibPromise;
async function getPdfLib() {
  if (!pdfLibPromise) pdfLibPromise = import("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm");
  return pdfLibPromise;
}

let pdfJsPromise;
async function getPdfJsLib() {
  if (!pdfJsPromise) {
    pdfJsPromise = (async () => {
      const pdfjs = await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.6.82/+esm");
      if (pdfjs?.GlobalWorkerOptions && !pdfjs.GlobalWorkerOptions.workerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc =
          "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.6.82/build/pdf.worker.min.mjs";
      }
      return pdfjs;
    })();
  }
  return pdfJsPromise;
}

function parsePageRanges(input, max) {
  const pages = new Set();
  input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((part) => {
      const m = part.match(/^(\d+)-(\d+)$/);
      if (m) {
        const s = Number(m[1]);
        const e = Number(m[2]);
        for (let i = s; i <= e; i += 1) if (i >= 1 && i <= max) pages.add(i);
      } else {
        const n = Number(part);
        if (n >= 1 && n <= max) pages.add(n);
      }
    });
  return [...pages].sort((a, b) => a - b);
}

function buildPdfTool(container) {
  const mergeInput = document.createElement("input");
  mergeInput.type = "file";
  mergeInput.accept = "application/pdf";
  mergeInput.multiple = true;
  container.append(mergeInput);
  const mergeBtn = document.createElement("button");
  mergeBtn.className = "btn";
  mergeBtn.textContent = "合并 PDF";
  container.append(mergeBtn);

  const splitFile = document.createElement("input");
  splitFile.type = "file";
  splitFile.accept = "application/pdf";
  splitFile.style.marginTop = "10px";
  container.append(splitFile);
  const range = document.createElement("input");
  range.placeholder = "拆分页码，如 1-3,5";
  container.append(range);
  const splitBtn = document.createElement("button");
  splitBtn.className = "btn";
  splitBtn.textContent = "按页提取";
  container.append(splitBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");

  mergeBtn.onclick = async () => {
    const files = [...(mergeInput.files || [])];
    if (!files.length) {
      result.textContent = "请选择多个 PDF";
      return;
    }
    const { PDFDocument } = await getPdfLib();
    const out = await PDFDocument.create();
    for (const f of files) {
      const src = await PDFDocument.load(await f.arrayBuffer());
      const pages = await out.copyPages(src, src.getPageIndices());
      pages.forEach((p) => out.addPage(p));
    }
    const bytes = await out.save();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "merged.pdf";
    a.textContent = "下载合并后的 PDF";
    result.innerHTML = "";
    result.append(a);
  };

  splitBtn.onclick = async () => {
    const f = splitFile.files?.[0];
    if (!f) {
      result.textContent = "请选择 PDF";
      return;
    }
    const { PDFDocument } = await getPdfLib();
    const src = await PDFDocument.load(await f.arrayBuffer());
    const total = src.getPageCount();
    const pages = parsePageRanges(range.value || "1", total);
    if (!pages.length) {
      result.textContent = "页码范围无效";
      return;
    }
    const out = await PDFDocument.create();
    const copied = await out.copyPages(src, pages.map((p) => p - 1));
    copied.forEach((p) => out.addPage(p));
    const bytes = await out.save();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "split.pdf";
    a.textContent = `下载提取页 PDF（共 ${pages.length} 页）`;
    result.innerHTML = "";
    result.append(a);
  };
}

function buildPdfCompressTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "application/pdf";
  container.append(file);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "压缩并导出 PDF";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择 PDF";
      return;
    }
    try {
      const { PDFDocument } = await getPdfLib();
      const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      const outBytes = await src.save({ useObjectStreams: true, addDefaultPage: false });
      const blob = new Blob([outBytes], { type: "application/pdf" });
      result.innerHTML = `原始: ${(f.size / 1024).toFixed(1)} KB，输出: ${(blob.size / 1024).toFixed(1)} KB<br>`;
      appendDownloadLink(result, blob, "compressed.pdf", "下载压缩后 PDF");
    } catch (err) {
      result.textContent = `压缩失败: ${err.message}`;
    }
  };
}

function buildPdfToImageTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "application/pdf";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>格式
      <select id="fmt">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPG</option>
      </select>
    </label>
    <label>缩放<input id="scale" type="number" value="1.5" min="1" max="3" step="0.1" /></label>
  `;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "转换为图片";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");

  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择 PDF";
      return;
    }
    try {
      result.textContent = "处理中...";
      const pdfjs = await getPdfJsLib();
      const bytes = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data: bytes, disableWorker: true }).promise;
      const fmt = row.querySelector("#fmt").value;
      const scale = Number(row.querySelector("#scale").value) || 1.5;
      result.innerHTML = "";
      for (let i = 1; i <= doc.numPages; i += 1) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
        const wrap = document.createElement("div");
        wrap.style.marginBottom = "10px";
        wrap.append(canvas, document.createElement("br"));
        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) appendDownloadLink(wrap, blob, `page-${i}.${fmt === "image/png" ? "png" : "jpg"}`, `下载第${i}页`);
            resolve();
          }, fmt, 0.9);
        });
        result.append(wrap);
      }
    } catch (err) {
      result.textContent = `转换失败: ${err.message}`;
    }
  };
}

function buildPdfWatermarkTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "application/pdf";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>水印文字<input id="txt" value="MiaoTools" /></label>
    <label>字号<input id="size" type="number" value="36" min="10" /></label>
    <label>透明度<input id="op" type="number" value="0.25" min="0" max="1" step="0.05" /></label>
  `;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "添加水印";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");

  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择 PDF";
      return;
    }
    try {
      const { PDFDocument, StandardFonts, rgb, degrees } = await getPdfLib();
      const pdf = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const txt = row.querySelector("#txt").value || "MiaoTools";
      const size = Number(row.querySelector("#size").value) || 36;
      const op = Math.max(0, Math.min(1, Number(row.querySelector("#op").value)));
      pdf.getPages().forEach((p) => {
        const { width, height } = p.getSize();
        const tw = font.widthOfTextAtSize(txt, size);
        p.drawText(txt, {
          x: (width - tw) / 2,
          y: height / 2,
          size,
          font,
          rotate: degrees(-30),
          color: rgb(0.5, 0.5, 0.5),
          opacity: op,
        });
      });
      const blob = new Blob([await pdf.save()], { type: "application/pdf" });
      result.innerHTML = "";
      appendDownloadLink(result, blob, "watermarked.pdf", "下载加水印 PDF");
    } catch (err) {
      result.textContent = `处理失败: ${err.message}`;
    }
  };
}

function buildPdfPageManageTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "application/pdf";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>删除页码<input id="del" placeholder="如 2,4-6" /></label>
    <label>重排页码<input id="order" placeholder="如 3,1,2（留空表示不重排）" /></label>
  `;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "执行页面管理";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");

  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择 PDF";
      return;
    }
    try {
      const { PDFDocument } = await getPdfLib();
      const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
      const total = src.getPageCount();
      const delSet = new Set(parsePageRanges(row.querySelector("#del").value || "", total));
      const remained = [];
      for (let i = 1; i <= total; i += 1) if (!delSet.has(i)) remained.push(i);
      let order = remained;
      const orderText = row.querySelector("#order").value.trim();
      if (orderText) {
        const custom = parsePageRanges(orderText, total).filter((p) => !delSet.has(p));
        if (custom.length) order = custom;
      }
      if (!order.length) {
        result.textContent = "处理后没有可输出页面";
        return;
      }
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, order.map((p) => p - 1));
      pages.forEach((p) => out.addPage(p));
      const blob = new Blob([await out.save()], { type: "application/pdf" });
      result.innerHTML = `输出页数: ${order.length}<br>`;
      appendDownloadLink(result, blob, "managed-pages.pdf", "下载处理后 PDF");
    } catch (err) {
      result.textContent = `处理失败: ${err.message}`;
    }
  };
}

function buildPdfEncryptDecryptTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "application/pdf,.mtpdf";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>模式
      <select id="mode">
        <option value="enc">加密为 MTPDF</option>
        <option value="dec">解密 MTPDF 为 PDF</option>
      </select>
    </label>
    <label>密码<input id="pwd" type="password" /></label>
  `;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "执行";
  container.append(btn);
  const result = createResultBox(container);

  async function deriveKey(password, salt) {
    const mat = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
      mat,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"],
    );
  }

  btn.onclick = async () => {
    const f = file.files?.[0];
    const pwd = row.querySelector("#pwd").value;
    if (!f) {
      result.textContent = "请选择文件";
      return;
    }
    if (!pwd) {
      result.textContent = "请输入密码";
      return;
    }
    try {
      const mode = row.querySelector("#mode").value;
      if (mode === "enc") {
        const data = new Uint8Array(await f.arrayBuffer());
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await deriveKey(pwd, salt);
        const enc = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);
        const payload = JSON.stringify({
          v: 1,
          name: f.name,
          salt: b64FromBytes(salt),
          iv: b64FromBytes(iv),
          data: b64FromBytes(enc),
        });
        const blob = new Blob([payload], { type: "application/json" });
        result.innerHTML = "";
        appendDownloadLink(result, blob, `${f.name}.mtpdf`, "下载加密文件");
      } else {
        const obj = JSON.parse(await f.text());
        const key = await deriveKey(pwd, bytesFromB64(obj.salt));
        const dec = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytesFromB64(obj.iv) }, key, bytesFromB64(obj.data));
        const blob = new Blob([dec], { type: "application/pdf" });
        result.innerHTML = "";
        appendDownloadLink(result, blob, (obj.name || "restored") + ".pdf", "下载解密后 PDF");
      }
    } catch (err) {
      result.textContent = `加解密失败: ${err.message}`;
    }
  };
}

function buildPdfExtractTextTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "application/pdf";
  container.append(file);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "提取全文文本";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择 PDF";
      return;
    }
    try {
      result.textContent = "提取中...";
      const pdfjs = await getPdfJsLib();
      const bytes = new Uint8Array(await f.arrayBuffer());
      const doc = await pdfjs.getDocument({ data: bytes, disableWorker: true }).promise;
      const lines = [];
      for (let i = 1; i <= doc.numPages; i += 1) {
        const page = await doc.getPage(i);
        const txt = await page.getTextContent();
        lines.push(`\n===== 第 ${i} 页 =====\n`);
        lines.push(txt.items.map((it) => it.str).join(" "));
      }
      result.textContent = lines.join("\n").trim() || "未提取到文本（可能是扫描件）";
    } catch (err) {
      result.textContent = `提取失败: ${err.message}`;
    }
  };
}

function buildFlowTool(container) {
  const input = document.createElement("textarea");
  input.className = "mono";
  input.value = "Start->Login\nLogin->Home\nLogin->Forgot Password";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成流程图";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  result.style.overflow = "auto";

  runBtn.onclick = () => {
    const edges = input.value
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.split("->").map((s) => s.trim()))
      .filter((a) => a.length === 2 && a[0] && a[1]);
    const nodes = [...new Set(edges.flat())];
    const pos = new Map(nodes.map((n, i) => [n, { x: 40 + (i % 3) * 220, y: 40 + Math.floor(i / 3) * 110 }]));
    const svgW = 760;
    const svgH = Math.max(260, 120 + Math.ceil(nodes.length / 3) * 120);
    let svg = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${svgW}\" height=\"${svgH}\">`;
    svg += `<defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#0f766e\"/></marker></defs>`;
    edges.forEach(([a, b]) => {
      const pa = pos.get(a);
      const pb = pos.get(b);
      svg += `<line x1=\"${pa.x + 140}\" y1=\"${pa.y + 24}\" x2=\"${pb.x}\" y2=\"${pb.y + 24}\" stroke=\"#0f766e\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>`;
    });
    nodes.forEach((n) => {
      const p = pos.get(n);
      svg += `<rect x=\"${p.x}\" y=\"${p.y}\" width=\"140\" height=\"48\" rx=\"8\" fill=\"#fff\" stroke=\"#d7dfdb\"/>`;
      svg += `<text x=\"${p.x + 70}\" y=\"${p.y + 29}\" text-anchor=\"middle\" font-size=\"14\" fill=\"#142120\">${escapeHtml(n)}</text>`;
    });
    svg += "</svg>";
    result.innerHTML = svg;
  };
}

function validateBySchema(schema, data, path = "$") {
  const errors = [];
  if (schema.type) {
    const type = Array.isArray(data) ? "array" : data === null ? "null" : typeof data;
    if (type !== schema.type) errors.push(`${path}: 期望 ${schema.type}，实际 ${type}`);
  }
  if (schema.enum && !schema.enum.includes(data)) errors.push(`${path}: 不在 enum 范围`);
  if (schema.type === "string") {
    if (schema.minLength != null && String(data).length < schema.minLength) errors.push(`${path}: 长度过短`);
    if (schema.maxLength != null && String(data).length > schema.maxLength) errors.push(`${path}: 长度过长`);
  }
  if (schema.type === "number" || schema.type === "integer") {
    if (schema.minimum != null && data < schema.minimum) errors.push(`${path}: 小于 minimum`);
    if (schema.maximum != null && data > schema.maximum) errors.push(`${path}: 大于 maximum`);
  }
  if (schema.type === "object" && schema.properties) {
    const obj = data || {};
    (schema.required || []).forEach((k) => {
      if (!(k in obj)) errors.push(`${path}.${k}: 必填缺失`);
    });
    Object.entries(schema.properties).forEach(([k, sub]) => {
      if (k in obj) errors.push(...validateBySchema(sub, obj[k], `${path}.${k}`));
    });
  }
  if (schema.type === "array" && schema.items && Array.isArray(data)) {
    data.forEach((item, idx) => errors.push(...validateBySchema(schema.items, item, `${path}[${idx}]`)));
  }
  return errors;
}

function buildSchemaTool(container) {
  const schema = document.createElement("textarea");
  schema.className = "mono";
  schema.value = JSON.stringify(
    {
      type: "object",
      required: ["name", "age"],
      properties: {
        name: { type: "string", minLength: 2 },
        age: { type: "number", minimum: 0 },
      },
    },
    null,
    2,
  );
  container.append(schema);
  const data = document.createElement("textarea");
  data.className = "mono";
  data.value = JSON.stringify({ name: "Tom", age: 20 }, null, 2);
  container.append(data);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "校验";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = () => {
    try {
      const s = JSON.parse(schema.value);
      const d = JSON.parse(data.value);
      const errs = validateBySchema(s, d);
      result.textContent = errs.length ? `校验失败:\n${errs.join("\n")}` : "校验通过";
    } catch (err) {
      result.textContent = `JSON 解析失败: ${err.message}`;
    }
  };
}

function buildFormGenTool(container) {
  const cfg = document.createElement("textarea");
  cfg.className = "mono";
  cfg.value = JSON.stringify(
    [
      { label: "姓名", name: "name", type: "text", required: true },
      { label: "年龄", name: "age", type: "number" },
      { label: "城市", name: "city", type: "text" },
    ],
    null,
    2,
  );
  container.append(cfg);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成表单";
  container.append(runBtn);
  const wrap = document.createElement("div");
  wrap.className = "result";
  wrap.style.background = "#fff";
  container.append(wrap);

  runBtn.onclick = () => {
    try {
      const fields = JSON.parse(cfg.value);
      if (!Array.isArray(fields)) {
        wrap.textContent = "配置必须是数组";
        return;
      }
      const form = document.createElement("form");
      form.className = "field-row";
      fields.forEach((f) => {
        const label = document.createElement("label");
        label.textContent = f.label || f.name;
        const input = document.createElement("input");
        input.name = f.name || "";
        input.type = f.type || "text";
        input.required = Boolean(f.required);
        label.append(input);
        form.append(label);
      });
      const submit = document.createElement("button");
      submit.className = "btn";
      submit.type = "submit";
      submit.textContent = "提交并查看数据";
      form.append(submit);
      const out = document.createElement("pre");
      out.className = "mono";
      out.style.whiteSpace = "pre-wrap";
      form.onsubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        out.textContent = JSON.stringify(data, null, 2);
      };
      wrap.innerHTML = "";
      wrap.append(form, out);
    } catch (err) {
      wrap.textContent = `配置解析失败: ${err.message}`;
    }
  };
}

function b64FromBytes(bytes) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < arr.length; i += chunk) {
    const part = arr.subarray(i, i + chunk);
    let s = "";
    for (let j = 0; j < part.length; j += 1) s += String.fromCharCode(part[j]);
    bin += s;
  }
  return btoa(bin);
}

function bytesFromB64(b64) {
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) out[i] = raw.charCodeAt(i);
  return out;
}

function hexToRgbObj(hex) {
  const raw = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return null;
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16),
  };
}

function colorDistance(a, b) {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

function buildJwtExpiryTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入 JWT";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "解析过期时间";
  container.append(runBtn);
  const result = createResultBox(container);
  let timer;

  runBtn.onclick = () => {
    try {
      if (timer) clearInterval(timer);
      const parts = input.value.trim().split(".");
      if (parts.length < 2) {
        result.textContent = "JWT 格式错误";
        return;
      }
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      if (!payload.exp) {
        result.textContent = "payload 未包含 exp";
        return;
      }
      const render = () => {
        const now = Math.floor(Date.now() / 1000);
        const left = payload.exp - now;
        if (left <= 0) {
          result.textContent = `已过期\nexp: ${new Date(payload.exp * 1000).toLocaleString()}`;
          return;
        }
        const d = Math.floor(left / 86400);
        const h = Math.floor((left % 86400) / 3600);
        const m = Math.floor((left % 3600) / 60);
        const s = left % 60;
        result.textContent = `exp: ${new Date(payload.exp * 1000).toLocaleString()}\n剩余: ${d}天 ${h}小时 ${m}分 ${s}秒`;
      };
      render();
      timer = setInterval(render, 1000);
    } catch (err) {
      result.textContent = `解析失败: ${err.message}`;
    }
  };
}

function buildCryptoTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入文本";
  container.append(input);
  const keyInput = document.createElement("input");
  keyInput.placeholder = "AES 密码";
  keyInput.type = "password";
  container.append(keyInput);
  const aesActions = createActions(container);
  const aesEnc = document.createElement("button");
  aesEnc.className = "btn";
  aesEnc.textContent = "AES 加密";
  const aesDec = document.createElement("button");
  aesDec.className = "btn";
  aesDec.textContent = "AES 解密";
  aesActions.append(aesEnc, aesDec);

  const rsaActions = createActions(container);
  const genKey = document.createElement("button");
  genKey.className = "btn btn--ghost";
  genKey.textContent = "生成 RSA 密钥";
  const rsaEnc = document.createElement("button");
  rsaEnc.className = "btn btn--ghost";
  rsaEnc.textContent = "RSA 加密";
  const rsaDec = document.createElement("button");
  rsaDec.className = "btn btn--ghost";
  rsaDec.textContent = "RSA 解密";
  rsaActions.append(genKey, rsaEnc, rsaDec);

  const result = createResultBox(container);
  let rsaKeys = null;

  async function deriveAesKey(pass) {
    const mat = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: new TextEncoder().encode("miao-tools-salt"), iterations: 100000, hash: "SHA-256" },
      mat,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"],
    );
  }

  aesEnc.onclick = async () => {
    try {
      if (!keyInput.value) {
        result.textContent = "请输入 AES 密码";
        return;
      }
      const key = await deriveAesKey(keyInput.value);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const enc = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(input.value));
      result.textContent = `${b64FromBytes(iv)}.${b64FromBytes(enc)}`;
    } catch (err) {
      result.textContent = `AES 加密失败: ${err.message}`;
    }
  };

  aesDec.onclick = async () => {
    try {
      if (!keyInput.value) {
        result.textContent = "请输入 AES 密码";
        return;
      }
      const [ivB64, dataB64] = input.value.trim().split(".");
      if (!ivB64 || !dataB64) {
        result.textContent = "密文格式应为 iv.cipher";
        return;
      }
      const key = await deriveAesKey(keyInput.value);
      const plain = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: bytesFromB64(ivB64) },
        key,
        bytesFromB64(dataB64),
      );
      result.textContent = new TextDecoder().decode(plain);
    } catch (err) {
      result.textContent = `AES 解密失败: ${err.message}`;
    }
  };

  genKey.onclick = async () => {
    rsaKeys = await crypto.subtle.generateKey(
      { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
      true,
      ["encrypt", "decrypt"],
    );
    result.textContent = "RSA 密钥已生成（仅当前页面会话）";
  };

  rsaEnc.onclick = async () => {
    try {
      if (!rsaKeys) {
        result.textContent = "请先生成 RSA 密钥";
        return;
      }
      const data = new TextEncoder().encode(input.value);
      const enc = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, rsaKeys.publicKey, data);
      result.textContent = b64FromBytes(enc);
    } catch (err) {
      result.textContent = `RSA 加密失败: ${err.message}`;
    }
  };

  rsaDec.onclick = async () => {
    try {
      if (!rsaKeys) {
        result.textContent = "请先生成 RSA 密钥";
        return;
      }
      const dec = await crypto.subtle.decrypt({ name: "RSA-OAEP" }, rsaKeys.privateKey, bytesFromB64(input.value.trim()));
      result.textContent = new TextDecoder().decode(dec);
    } catch (err) {
      result.textContent = `RSA 解密失败: ${err.message}`;
    }
  };
}

function buildOcrTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "OCR 识别";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请先选择图片";
      return;
    }
    try {
      result.textContent = "正在加载 OCR 模型并识别...";
      const tesseract = await import("https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/+esm");
      const { data } = await tesseract.recognize(f, "eng+chi_sim");
      result.textContent = data.text || "未识别到文字";
    } catch (err) {
      result.textContent = `OCR 失败: ${err.message}`;
    }
  };
}

function buildBgRemoveTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>背景色(HEX)<input id="bg" value="#ffffff" class="mono" /></label>
    <label>容差(0-255)<input id="tol" type="number" value="42" min="0" max="255" /></label>
  `;
  container.append(row);
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "去背景（纯色）";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const bg = hexToRgbObj(row.querySelector("#bg").value.trim());
    const tol = Number(row.querySelector("#tol").value);
    if (!bg) {
      result.textContent = "背景色格式错误";
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < data.data.length; i += 4) {
          const c = { r: data.data[i], g: data.data[i + 1], b: data.data[i + 2] };
          if (colorDistance(c, bg) <= tol) data.data[i + 3] = 0;
        }
        ctx.putImageData(data, 0, 0);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const out = document.createElement("img");
          out.src = url;
          out.style.maxWidth = "100%";
          const a = document.createElement("a");
          a.href = url;
          a.download = "bg-removed.png";
          a.textContent = "下载 PNG";
          result.innerHTML = "";
          result.append(out, document.createElement("br"), a);
        }, "image/png");
      };
      img.src = String(fr.result);
    };
    fr.readAsDataURL(f);
  };
}

function buildSvgOptimizeTool(container) {
  const input = document.createElement("textarea");
  input.className = "mono";
  input.placeholder = "粘贴 SVG 源码";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "优化 SVG";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = () => {
    const out = input.value
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/>\s+</g, "><")
      .trim();
    result.textContent = out;
  };
}

function buildGradientTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>颜色1<input id="c1" type="color" value="#0f766e" /></label>
    <label>颜色2<input id="c2" type="color" value="#f97316" /></label>
    <label>角度<input id="deg" type="number" value="135" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成渐变";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = () => {
    const c1 = row.querySelector("#c1").value;
    const c2 = row.querySelector("#c2").value;
    const deg = Number(row.querySelector("#deg").value) || 0;
    const css = `linear-gradient(${deg}deg, ${c1}, ${c2})`;
    result.innerHTML = `<div style="height:120px;border-radius:10px;background:${css};border:1px solid #ddd"></div><code>background: ${css};</code>`;
  };
}

function buildShadowTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>X<input id="x" type="number" value="0" /></label>
    <label>Y<input id="y" type="number" value="10" /></label>
    <label>模糊<input id="b" type="number" value="24" /></label>
    <label>扩散<input id="s" type="number" value="0" /></label>
    <label>颜色<input id="c" type="color" value="#0f766e" /></label>
    <label>透明度(0-1)<input id="a" type="number" value="0.25" min="0" max="1" step="0.05" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成 Box Shadow";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = () => {
    const x = Number(row.querySelector("#x").value);
    const y = Number(row.querySelector("#y").value);
    const b = Number(row.querySelector("#b").value);
    const s = Number(row.querySelector("#s").value);
    const a = Number(row.querySelector("#a").value);
    const rgb = hexToRgbObj(row.querySelector("#c").value);
    const css = `${x}px ${y}px ${b}px ${s}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
    result.innerHTML = `<div style="height:90px;border-radius:12px;background:#fff;box-shadow:${css};border:1px solid #eee"></div><code>box-shadow: ${css};</code>`;
  };
}

function buildRegexAssistTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>类型
      <select id="type">
        <option value="email">邮箱</option>
        <option value="phone">手机号(中国大陆)</option>
        <option value="url">URL</option>
        <option value="id">身份证(18位简单版)</option>
      </select>
    </label>
    <label>是否严格
      <select id="strict">
        <option value="yes">是</option>
        <option value="no">否</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成正则";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = () => {
    const type = row.querySelector("#type").value;
    const strict = row.querySelector("#strict").value === "yes";
    const map = {
      email: strict ? "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$" : ".+@.+",
      phone: strict ? "^1[3-9]\\d{9}$" : "1\\d{10}",
      url: strict ? "^(https?:\\/\\/)[\\w.-]+(?:\\.[\\w\\.-]+)+[/#?]?.*$" : "https?:\\/\\/.+",
      id: strict ? "^[1-9]\\d{5}(19|20)\\d{2}(0[1-9]|1[0-2])([0-2]\\d|3[01])\\d{3}[0-9Xx]$" : "\\d{17}[0-9Xx]",
    };
    result.textContent = map[type];
  };
}

function buildMaskTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入文本（邮箱/手机号/身份证/银行卡等）";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "执行脱敏";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = () => {
    let text = input.value;
    text = text.replace(/([A-Za-z0-9._%+-]{2})[A-Za-z0-9._%+-]*(@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g, "$1***$2");
    text = text.replace(/\b(1[3-9])\d{4}(\d{4})\b/g, "$1****$2");
    text = text.replace(/\b([1-9]\d{5})\d{8}(\d{3}[0-9Xx])\b/g, "$1********$2");
    text = text.replace(/\b(\d{4})\d{8,11}(\d{4})\b/g, "$1 **** **** $2");
    result.textContent = text;
  };
}

function buildPwaIconTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成 PWA 图标";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        result.innerHTML = "";
        sizes.forEach((sz) => {
          const canvas = document.createElement("canvas");
          canvas.width = sz;
          canvas.height = sz;
          canvas.getContext("2d").drawImage(img, 0, 0, sz, sz);
          canvas.toBlob((blob) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `icon-${sz}.png`;
            a.textContent = `下载 ${sz}x${sz}`;
            a.style.display = "inline-block";
            a.style.margin = "4px 8px 4px 0";
            result.append(a);
          }, "image/png");
        });
      };
      img.src = String(fr.result);
    };
    fr.readAsDataURL(f);
  };
}

function buildPinyinTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入中文文本";
  container.append(input);
  const actions = createActions(container);
  const fullBtn = document.createElement("button");
  fullBtn.className = "btn";
  fullBtn.textContent = "转拼音";
  const firstBtn = document.createElement("button");
  firstBtn.className = "btn btn--ghost";
  firstBtn.textContent = "取首字母";
  actions.append(fullBtn, firstBtn);
  const result = createResultBox(container);

  async function loadPinyin() {
    return import("https://cdn.jsdelivr.net/npm/pinyin-pro@3.26.0/+esm");
  }

  fullBtn.onclick = async () => {
    try {
      const { pinyin } = await loadPinyin();
      result.textContent = pinyin(input.value, { toneType: "none", type: "array" }).join(" ");
    } catch (err) {
      result.textContent = `拼音库加载失败: ${err.message}`;
    }
  };

  firstBtn.onclick = async () => {
    try {
      const { pinyin } = await loadPinyin();
      result.textContent = pinyin(input.value, { pattern: "first", toneType: "none", type: "array" }).join("");
    } catch (err) {
      result.textContent = `拼音库加载失败: ${err.message}`;
    }
  };
}

function parseMindmap(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/\t/g, "  "))
    .filter((l) => l.trim());
  const root = [];
  const stack = [{ level: -1, children: root }];
  lines.forEach((line) => {
    const indent = line.match(/^ */)[0].length;
    const level = Math.floor(indent / 2);
    const title = line.trim().replace(/^- /, "");
    const node = { title, children: [] };
    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
    stack[stack.length - 1].children.push(node);
    stack.push({ level, children: node.children });
  });
  return root;
}

function treeToMarkdown(nodes, depth = 0) {
  return nodes
    .map((n) => `${"  ".repeat(depth)}- ${n.title}\n${treeToMarkdown(n.children, depth + 1)}`)
    .join("");
}

function buildMindmapTool(container) {
  const input = document.createElement("textarea");
  input.className = "mono";
  input.value = "- 项目\n  - 需求\n  - 设计\n  - 开发\n    - 前端\n    - 后端";
  container.append(input);
  const actions = createActions(container);
  const toJson = document.createElement("button");
  toJson.className = "btn";
  toJson.textContent = "导出 JSON";
  const toMd = document.createElement("button");
  toMd.className = "btn btn--ghost";
  toMd.textContent = "标准化 Markdown";
  actions.append(toJson, toMd);
  const result = createResultBox(container);

  toJson.onclick = () => {
    try {
      result.textContent = JSON.stringify(parseMindmap(input.value), null, 2);
    } catch (err) {
      result.textContent = `解析失败: ${err.message}`;
    }
  };
  toMd.onclick = () => {
    try {
      result.textContent = treeToMarkdown(parseMindmap(input.value));
    } catch (err) {
      result.textContent = `转换失败: ${err.message}`;
    }
  };
}

function prettyJsonOrText(v) {
  try {
    return JSON.stringify(JSON.parse(v), null, 2);
  } catch {
    return v;
  }
}

function buildJsonDiffTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  const left = document.createElement("textarea");
  left.className = "mono";
  left.placeholder = "左侧 JSON";
  const right = document.createElement("textarea");
  right.className = "mono";
  right.placeholder = "右侧 JSON";
  row.append(left, right);
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "比较 JSON";
  container.append(runBtn);
  const result = createResultBox(container);

  function diffObj(a, b, path = "$", out = []) {
    const aType = Array.isArray(a) ? "array" : a === null ? "null" : typeof a;
    const bType = Array.isArray(b) ? "array" : b === null ? "null" : typeof b;
    if (aType !== bType) {
      out.push(`${path}: 类型不同 ${aType} -> ${bType}`);
      return out;
    }
    if (aType !== "object" && aType !== "array") {
      if (a !== b) out.push(`${path}: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`);
      return out;
    }
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    keys.forEach((k) => {
      if (!(k in (a || {}))) out.push(`${path}.${k}: 左侧缺失`);
      else if (!(k in (b || {}))) out.push(`${path}.${k}: 右侧缺失`);
      else diffObj(a[k], b[k], `${path}.${k}`, out);
    });
    return out;
  }

  runBtn.onclick = () => {
    try {
      const a = JSON.parse(left.value);
      const b = JSON.parse(right.value);
      const lines = diffObj(a, b);
      result.textContent = lines.length ? lines.join("\n") : "两侧 JSON 完全一致";
    } catch (err) {
      result.textContent = `JSON 解析失败: ${err.message}`;
    }
  };
}

let cryptoJsPromise;
async function loadCryptoJs() {
  if (!cryptoJsPromise) cryptoJsPromise = import("https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/+esm");
  return cryptoJsPromise;
}

function buildHashSuiteTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入文本";
  container.append(input);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "计算哈希";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = async () => {
    try {
      const text = input.value;
      const bytes = new TextEncoder().encode(text);
      const sha1 = await crypto.subtle.digest("SHA-1", bytes);
      const sha256 = await crypto.subtle.digest("SHA-256", bytes);
      const sha512 = await crypto.subtle.digest("SHA-512", bytes);
      const hex = (buf) =>
        Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      const CryptoJS = await loadCryptoJs();
      const md5 = CryptoJS.MD5(text).toString();
      result.textContent = `MD5: ${md5}\nSHA1: ${hex(sha1)}\nSHA256: ${hex(sha256)}\nSHA512: ${hex(sha512)}`;
    } catch (err) {
      result.textContent = `计算失败: ${err.message}`;
    }
  };
}

function buildHmacTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入消息";
  container.append(input);
  const key = document.createElement("input");
  key.placeholder = "输入密钥";
  key.type = "password";
  container.append(key);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>算法
      <select id="algo">
        <option value="sha256">HMAC-SHA256</option>
        <option value="md5">HMAC-MD5</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "生成 HMAC";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = async () => {
    try {
      if (!key.value) {
        result.textContent = "请输入密钥";
        return;
      }
      const algo = row.querySelector("#algo").value;
      if (algo === "sha256") {
        const k = await crypto.subtle.importKey(
          "raw",
          new TextEncoder().encode(key.value),
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"],
        );
        const sig = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(input.value));
        result.textContent = Array.from(new Uint8Array(sig))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      } else {
        const CryptoJS = await loadCryptoJs();
        result.textContent = CryptoJS.HmacMD5(input.value, key.value).toString();
      }
    } catch (err) {
      result.textContent = `生成失败: ${err.message}`;
    }
  };
}

function buildTextCleanTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入文本";
  container.append(input);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label><input type="checkbox" id="trim" checked /> 去行首尾空格</label>
    <label><input type="checkbox" id="blank" checked /> 去空行</label>
    <label><input type="checkbox" id="spaces" checked /> 合并多空格</label>
    <label><input type="checkbox" id="special" /> 去特殊字符(仅保留中英文数字空格)</label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "清洗文本";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = () => {
    let txt = input.value;
    if (row.querySelector("#trim").checked) txt = txt.split(/\r?\n/).map((l) => l.trim()).join("\n");
    if (row.querySelector("#blank").checked) txt = txt.split(/\r?\n/).filter((l) => l).join("\n");
    if (row.querySelector("#spaces").checked) txt = txt.replace(/[ \t]{2,}/g, " ");
    if (row.querySelector("#special").checked) txt = txt.replace(/[^\u4e00-\u9fa5A-Za-z0-9\s]/g, "");
    result.textContent = txt;
  };
}

function buildTextSplitMergeTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入文本";
  container.append(input);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>分隔符<input id="delim" value="," class="mono" /></label>
    <label>目标
      <select id="mode">
        <option value="split">按分隔符拆分为换行</option>
        <option value="merge">按换行合并为分隔符</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "处理";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = () => {
    const d = row.querySelector("#delim").value;
    const mode = row.querySelector("#mode").value;
    if (mode === "split") result.textContent = input.value.split(d).map((s) => s.trim()).filter(Boolean).join("\n");
    else result.textContent = input.value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).join(d);
  };
}

function buildBatchReplaceTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入原文本";
  container.append(input);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>查找<input id="find" /></label>
    <label>替换为<input id="rep" /></label>
    <label><input type="checkbox" id="regex" /> 使用正则</label>
    <label><input type="checkbox" id="global" checked /> 全部替换</label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "替换";
  container.append(runBtn);
  const result = createResultBox(container);
  runBtn.onclick = () => {
    const f = row.querySelector("#find").value;
    const r = row.querySelector("#rep").value;
    if (!f) {
      result.textContent = input.value;
      return;
    }
    try {
      if (row.querySelector("#regex").checked) {
        const flags = row.querySelector("#global").checked ? "g" : "";
        result.textContent = input.value.replace(new RegExp(f, flags), r);
      } else if (row.querySelector("#global").checked) {
        result.textContent = input.value.split(f).join(r);
      } else {
        result.textContent = input.value.replace(f, r);
      }
    } catch (err) {
      result.textContent = `替换失败: ${err.message}`;
    }
  };
}

function buildImageResizeCropTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>宽(px)<input id="w" type="number" value="800" /></label>
    <label>高(px)<input id="h" type="number" value="600" /></label>
    <label>模式
      <select id="mode">
        <option value="fit">等比缩放(适配)</option>
        <option value="crop">中心裁剪</option>
      </select>
    </label>
    <label>输出格式
      <select id="fmt">
        <option value="image/jpeg">JPG</option>
        <option value="image/png">PNG</option>
        <option value="image/webp">WEBP</option>
      </select>
    </label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "处理图片";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const w = Number(row.querySelector("#w").value);
    const h = Number(row.querySelector("#h").value);
    const mode = row.querySelector("#mode").value;
    const fmt = row.querySelector("#fmt").value;
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (mode === "fit") {
          const ratio = Math.min(w / img.width, h / img.height);
          const nw = img.width * ratio;
          const nh = img.height * ratio;
          const x = (w - nw) / 2;
          const y = (h - nh) / 2;
          ctx.drawImage(img, x, y, nw, nh);
        } else {
          const ratio = Math.max(w / img.width, h / img.height);
          const nw = img.width * ratio;
          const nh = img.height * ratio;
          const x = (w - nw) / 2;
          const y = (h - nh) / 2;
          ctx.drawImage(img, x, y, nw, nh);
        }
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          result.innerHTML = "";
          const out = document.createElement("img");
          out.src = url;
          out.style.maxWidth = "100%";
          const a = document.createElement("a");
          a.href = url;
          a.download = `resized.${fmt.split("/")[1]}`;
          a.textContent = "下载处理后的图片";
          result.append(out, document.createElement("br"), a);
        }, fmt);
      };
      img.src = String(fr.result);
    };
    fr.readAsDataURL(f);
  };
}

function buildImageToPdfTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  file.multiple = true;
  container.append(file);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "图片转 PDF";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = async () => {
    const files = [...(file.files || [])];
    if (!files.length) {
      result.textContent = "请先选择图片";
      return;
    }
    try {
      const { PDFDocument } = await getPdfLib();
      const pdf = await PDFDocument.create();
      for (const f of files) {
        const bytes = await f.arrayBuffer();
        const type = f.type.toLowerCase();
        const img = type.includes("png") ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const blob = new Blob([await pdf.save()], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "images.pdf";
      a.textContent = "下载 PDF";
      result.innerHTML = "";
      result.append(a);
    } catch (err) {
      result.textContent = `转换失败: ${err.message}`;
    }
  };
}

function buildAudioTrimTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "audio/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>开始秒数<input id="start" type="number" min="0" value="0" step="0.1" /></label>
    <label>结束秒数<input id="end" type="number" min="0" value="10" step="0.1" /></label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "裁剪并导出 WAV";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请先选择音频";
      return;
    }
    const s = Number(row.querySelector("#start").value);
    const e = Number(row.querySelector("#end").value);
    if (!(e > s)) {
      result.textContent = "结束时间必须大于开始时间";
      return;
    }
    try {
      const ac = new AudioContext();
      const buf = await f.arrayBuffer();
      const src = await ac.decodeAudioData(buf.slice(0));
      const start = Math.max(0, Math.floor(s * src.sampleRate));
      const end = Math.min(src.length, Math.floor(e * src.sampleRate));
      const len = Math.max(1, end - start);
      const out = ac.createBuffer(src.numberOfChannels, len, src.sampleRate);
      for (let ch = 0; ch < src.numberOfChannels; ch += 1) {
        out.getChannelData(ch).set(src.getChannelData(ch).slice(start, end));
      }
      const wav = audioBufferToWavBlob(out);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(wav);
      a.download = "trimmed.wav";
      a.textContent = "下载裁剪后的 WAV";
      result.innerHTML = "";
      result.append(a);
      ac.close();
    } catch (err) {
      result.textContent = `裁剪失败: ${err.message}`;
    }
  };
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("图片加载失败"));
      img.src = String(fr.result);
    };
    fr.onerror = () => reject(new Error("读取文件失败"));
    fr.readAsDataURL(file);
  });
}

function appendDownloadLink(container, blob, name, text = "下载文件") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.textContent = text;
  container.append(a);
  return a;
}

function buildImageRotateFlipTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>旋转
      <select id="rot">
        <option value="0">0°</option>
        <option value="90">90°</option>
        <option value="180">180°</option>
        <option value="270">270°</option>
      </select>
    </label>
    <label><input id="hf" type="checkbox" /> 水平翻转</label>
    <label><input id="vf" type="checkbox" /> 垂直翻转</label>
  `;
  container.append(row);
  const runBtn = document.createElement("button");
  runBtn.className = "btn";
  runBtn.textContent = "处理并导出";
  container.append(runBtn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  runBtn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const img = await loadImageFromFile(f);
    const rot = Number(row.querySelector("#rot").value);
    const hf = row.querySelector("#hf").checked;
    const vf = row.querySelector("#vf").checked;
    const canvas = document.createElement("canvas");
    const swap = rot === 90 || rot === 270;
    canvas.width = swap ? img.height : img.width;
    canvas.height = swap ? img.width : img.height;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.scale(hf ? -1 : 1, vf ? -1 : 1);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    result.innerHTML = "";
    result.append(canvas);
    canvas.toBlob((blob) => {
      result.append(document.createElement("br"));
      appendDownloadLink(result, blob, "rotated.png", "下载处理图");
    }, "image/png");
  };
}

function buildImageWatermarkTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const text = document.createElement("input");
  text.placeholder = "水印文字";
  text.value = "MiaoTools";
  container.append(text);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>字号<input id="fs" type="number" value="36" min="12" /></label>
    <label>透明度<input id="op" type="number" value="0.3" min="0" max="1" step="0.05" /></label>
    <label>位置
      <select id="pos">
        <option value="br">右下</option>
        <option value="tr">右上</option>
        <option value="center">居中</option>
        <option value="tile">平铺</option>
      </select>
    </label>
  `;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "添加水印";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const img = await loadImageFromFile(f);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const fs = Number(row.querySelector("#fs").value) || 36;
    const op = Number(row.querySelector("#op").value);
    const pos = row.querySelector("#pos").value;
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, op))})`;
    ctx.font = `${fs}px sans-serif`;
    ctx.textBaseline = "top";
    if (pos === "tile") {
      for (let y = 20; y < canvas.height; y += fs * 3) {
        for (let x = 20; x < canvas.width; x += fs * 5) ctx.fillText(text.value || "MiaoTools", x, y);
      }
    } else {
      const m = ctx.measureText(text.value || "MiaoTools").width;
      let x = 20;
      let y = 20;
      if (pos === "br") {
        x = canvas.width - m - 20;
        y = canvas.height - fs - 20;
      } else if (pos === "tr") {
        x = canvas.width - m - 20;
      } else if (pos === "center") {
        x = (canvas.width - m) / 2;
        y = (canvas.height - fs) / 2;
      }
      ctx.fillText(text.value || "MiaoTools", x, y);
    }
    result.innerHTML = "";
    result.append(canvas, document.createElement("br"));
    canvas.toBlob((blob) => appendDownloadLink(result, blob, "watermark.png", "下载水印图"), "image/png");
  };
}

function buildIdPhotoTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `
    <label>规格
      <select id="size">
        <option value="295x413">一寸(295x413)</option>
        <option value="413x626">二寸(413x626)</option>
      </select>
    </label>
    <label>背景色<input id="bg" type="color" value="#ffffff" /></label>
  `;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "生成证件照";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const img = await loadImageFromFile(f);
    const [w, h] = row.querySelector("#size").value.split("x").map(Number);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = row.querySelector("#bg").value;
    ctx.fillRect(0, 0, w, h);
    const ratio = Math.max(w / img.width, h / img.height);
    const nw = img.width * ratio;
    const nh = img.height * ratio;
    ctx.drawImage(img, (w - nw) / 2, (h - nh) / 2, nw, nh);
    result.innerHTML = "";
    result.append(canvas, document.createElement("br"));
    canvas.toBlob((blob) => appendDownloadLink(result, blob, "id-photo.png", "下载证件照"), "image/png");
  };
}

function buildImageGridTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "生成九宫格";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const img = await loadImageFromFile(f);
    const sw = Math.floor(img.width / 3);
    const sh = Math.floor(img.height / 3);
    result.innerHTML = "";
    for (let y = 0; y < 3; y += 1) {
      for (let x = 0; x < 3; x += 1) {
        const c = document.createElement("canvas");
        c.width = sw;
        c.height = sh;
        c.style.maxWidth = "120px";
        c.style.margin = "4px";
        c.getContext("2d").drawImage(img, x * sw, y * sh, sw, sh, 0, 0, sw, sh);
        c.toBlob((blob) => {
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = `grid-${y * 3 + x + 1}.png`;
          a.textContent = `下载${y * 3 + x + 1}`;
          a.style.display = "inline-block";
          a.style.marginRight = "8px";
          result.append(c, a);
        }, "image/png");
      }
    }
  };
}

function buildImageStitchTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  file.multiple = true;
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `<label>方向<select id="dir"><option value="v">竖向拼接</option><option value="h">横向拼接</option></select></label>`;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "拼接图片";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const files = [...(file.files || [])];
    if (!files.length) {
      result.textContent = "请至少选择一张图";
      return;
    }
    const imgs = await Promise.all(files.map((f) => loadImageFromFile(f)));
    const dir = row.querySelector("#dir").value;
    const canvas = document.createElement("canvas");
    if (dir === "v") {
      canvas.width = Math.max(...imgs.map((i) => i.width));
      canvas.height = imgs.reduce((s, i) => s + i.height, 0);
    } else {
      canvas.width = imgs.reduce((s, i) => s + i.width, 0);
      canvas.height = Math.max(...imgs.map((i) => i.height));
    }
    const ctx = canvas.getContext("2d");
    let offset = 0;
    imgs.forEach((img) => {
      if (dir === "v") {
        ctx.drawImage(img, 0, offset);
        offset += img.height;
      } else {
        ctx.drawImage(img, offset, 0);
        offset += img.width;
      }
    });
    result.innerHTML = "";
    result.append(canvas, document.createElement("br"));
    canvas.toBlob((blob) => appendDownloadLink(result, blob, "stitched.png", "下载拼接图"), "image/png");
  };
}

function buildImageFrameTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `<label>边框像素<input id="b" type="number" value="20" min="0" /></label><label>边框颜色<input id="c" type="color" value="#ffffff" /></label><label>圆角<input id="r" type="number" value="16" min="0" /></label>`;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "生成边框";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const b = Number(row.querySelector("#b").value);
    const r = Number(row.querySelector("#r").value);
    const img = await loadImageFromFile(f);
    const canvas = document.createElement("canvas");
    canvas.width = img.width + b * 2;
    canvas.height = img.height + b * 2;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = row.querySelector("#c").value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (r > 0) {
      ctx.save();
      ctx.beginPath();
      const x = b;
      const y = b;
      const w = img.width;
      const h = img.height;
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, b, b);
      ctx.restore();
    } else ctx.drawImage(img, b, b);
    result.innerHTML = "";
    result.append(canvas, document.createElement("br"));
    canvas.toBlob((blob) => appendDownloadLink(result, blob, "framed.png", "下载边框图"), "image/png");
  };
}

function buildImageAdjustTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `<label>亮度<input id="b" type="number" value="100" min="0" max="200" /></label><label>对比度<input id="c" type="number" value="100" min="0" max="200" /></label><label>饱和度<input id="s" type="number" value="100" min="0" max="200" /></label><label>模糊<input id="blur" type="number" value="0" min="0" max="12" /></label>`;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "调色预览";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const img = await loadImageFromFile(f);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = `brightness(${Number(row.querySelector("#b").value)}%) contrast(${Number(row.querySelector("#c").value)}%) saturate(${Number(row.querySelector("#s").value)}%) blur(${Number(row.querySelector("#blur").value)}px)`;
    ctx.drawImage(img, 0, 0);
    result.innerHTML = "";
    result.append(canvas, document.createElement("br"));
    canvas.toBlob((blob) => appendDownloadLink(result, blob, "adjusted.png", "下载处理图"), "image/png");
  };
}

function buildImageMosaicTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `<label>马赛克强度<input id="size" type="number" value="12" min="2" /></label>`;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "生成马赛克";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const img = await loadImageFromFile(f);
    const size = Number(row.querySelector("#size").value) || 12;
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y += size) {
      for (let x = 0; x < canvas.width; x += size) {
        const idx = (y * canvas.width + x) * 4;
        const r = data.data[idx];
        const g = data.data[idx + 1];
        const b = data.data[idx + 2];
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, size, size);
      }
    }
    result.innerHTML = "";
    result.append(canvas, document.createElement("br"));
    canvas.toBlob((blob) => appendDownloadLink(result, blob, "mosaic.png", "下载马赛克图"), "image/png");
  };
}

function buildExifStripTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/jpeg,image/jpg,image/png,image/webp";
  container.append(file);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "清除 EXIF 并导出";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    const img = await loadImageFromFile(f);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d").drawImage(img, 0, 0);
    result.innerHTML = "";
    canvas.toBlob((blob) => appendDownloadLink(result, blob, "no-exif.jpg", "下载无 EXIF 图片"), "image/jpeg", 0.92);
  };
}

function buildQrDecodeTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";
  container.append(file);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "识别二维码";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = async () => {
    if (!("BarcodeDetector" in window)) {
      result.textContent = "当前浏览器不支持 BarcodeDetector";
      return;
    }
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择图片";
      return;
    }
    try {
      const img = await loadImageFromFile(f);
      const detector = new BarcodeDetector({ formats: ["qr_code"] });
      const codes = await detector.detect(img);
      result.textContent = codes.length ? codes.map((c) => c.rawValue).join("\n") : "未识别到二维码";
    } catch (err) {
      result.textContent = `识别失败: ${err.message}`;
    }
  };
}

function buildBarcodeGenTool(container) {
  const txt = document.createElement("input");
  txt.value = "123456789012";
  txt.placeholder = "条形码内容";
  container.append(txt);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "生成条形码";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    try {
      const JsBarcode = (await import("https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/+esm")).default;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      JsBarcode(svg, txt.value || "123456789012", { format: "CODE128", displayValue: true });
      const xml = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([xml], { type: "image/svg+xml" });
      result.innerHTML = "";
      result.append(svg, document.createElement("br"));
      appendDownloadLink(result, blob, "barcode.svg", "下载 SVG");
    } catch (err) {
      result.textContent = `生成失败: ${err.message}`;
    }
  };
}

function simpleImageHash(canvas, size = 8) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  ctx.drawImage(canvas, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const vals = [];
  for (let i = 0; i < data.length; i += 4) vals.push((data[i] + data[i + 1] + data[i + 2]) / 3);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return vals.map((v) => (v >= avg ? "1" : "0")).join("");
}

function hamming(a, b) {
  let c = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) if (a[i] !== b[i]) c += 1;
  return c + Math.abs(a.length - b.length);
}

function buildImageHashCompareTool(container) {
  const row = document.createElement("div");
  row.className = "field-row";
  const f1 = document.createElement("input");
  f1.type = "file";
  f1.accept = "image/*";
  const f2 = document.createElement("input");
  f2.type = "file";
  f2.accept = "image/*";
  row.append(f1, f2);
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "比较相似度";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = async () => {
    const a = f1.files?.[0];
    const b = f2.files?.[0];
    if (!a || !b) {
      result.textContent = "请同时选择两张图片";
      return;
    }
    const i1 = await loadImageFromFile(a);
    const i2 = await loadImageFromFile(b);
    const c1 = document.createElement("canvas");
    c1.width = i1.width;
    c1.height = i1.height;
    c1.getContext("2d").drawImage(i1, 0, 0);
    const c2 = document.createElement("canvas");
    c2.width = i2.width;
    c2.height = i2.height;
    c2.getContext("2d").drawImage(i2, 0, 0);
    const h1 = simpleImageHash(c1);
    const h2 = simpleImageHash(c2);
    const dist = hamming(h1, h2);
    const sim = (((64 - dist) / 64) * 100).toFixed(2);
    result.textContent = `Hash 距离: ${dist}\n相似度估算: ${sim}%`;
  };
}

async function decodeAudioFile(file) {
  const ac = new AudioContext();
  const buf = await file.arrayBuffer();
  const audio = await ac.decodeAudioData(buf.slice(0));
  await ac.close();
  return audio;
}

function exportAudioBuffer(result, buffer, name = "audio.wav") {
  const wav = audioBufferToWavBlob(buffer);
  result.innerHTML = "";
  appendDownloadLink(result, wav, name, "下载 WAV");
}

function buildAudioMergeTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "audio/*";
  file.multiple = true;
  container.append(file);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "合并音频(顺序拼接)";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = async () => {
    const files = [...(file.files || [])];
    if (files.length < 2) {
      result.textContent = "请至少选择两个音频";
      return;
    }
    const arr = await Promise.all(files.map((f) => decodeAudioFile(f)));
    const sr = arr[0].sampleRate;
    const ch = arr[0].numberOfChannels;
    const total = arr.reduce((s, a) => s + a.length, 0);
    const ac = new AudioContext({ sampleRate: sr });
    const out = ac.createBuffer(ch, total, sr);
    let offset = 0;
    arr.forEach((a) => {
      for (let c = 0; c < ch; c += 1) {
        const src = a.getChannelData(Math.min(c, a.numberOfChannels - 1));
        out.getChannelData(c).set(src, offset);
      }
      offset += a.length;
    });
    exportAudioBuffer(result, out, "merged.wav");
    ac.close();
  };
}

function buildAudioGainTool(container, title, defaultGain = 1) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "audio/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `<label>${title}<input id="g" type="number" value="${defaultGain}" step="0.1" /></label>`;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "处理并导出 WAV";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择音频";
      return;
    }
    const src = await decodeAudioFile(f);
    const gain = Number(row.querySelector("#g").value);
    const ac = new AudioContext({ sampleRate: src.sampleRate });
    const out = ac.createBuffer(src.numberOfChannels, src.length, src.sampleRate);
    for (let ch = 0; ch < src.numberOfChannels; ch += 1) {
      const from = src.getChannelData(ch);
      const to = out.getChannelData(ch);
      for (let i = 0; i < from.length; i += 1) to[i] = Math.max(-1, Math.min(1, from[i] * gain));
    }
    exportAudioBuffer(result, out);
    ac.close();
  };
}

function buildAudioFadeTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "audio/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `<label>淡入秒数<input id="fi" type="number" value="2" step="0.1" /></label><label>淡出秒数<input id="fo" type="number" value="2" step="0.1" /></label>`;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "添加淡入淡出";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择音频";
      return;
    }
    const src = await decodeAudioFile(f);
    const fi = Math.max(0, Number(row.querySelector("#fi").value));
    const fo = Math.max(0, Number(row.querySelector("#fo").value));
    const fiN = Math.floor(fi * src.sampleRate);
    const foN = Math.floor(fo * src.sampleRate);
    const ac = new AudioContext({ sampleRate: src.sampleRate });
    const out = ac.createBuffer(src.numberOfChannels, src.length, src.sampleRate);
    for (let ch = 0; ch < src.numberOfChannels; ch += 1) {
      const from = src.getChannelData(ch);
      const to = out.getChannelData(ch);
      for (let i = 0; i < from.length; i += 1) {
        let g = 1;
        if (fiN > 0 && i < fiN) g = i / fiN;
        if (foN > 0 && i > from.length - foN) g = Math.min(g, (from.length - i) / foN);
        to[i] = from[i] * Math.max(0, Math.min(1, g));
      }
    }
    exportAudioBuffer(result, out, "fade.wav");
    ac.close();
  };
}

function buildAudioSilenceTool(container, title) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "audio/*";
  container.append(file);
  const row = document.createElement("div");
  row.className = "field-row";
  row.innerHTML = `<label>阈值(0-1)<input id="th" type="number" value="0.02" min="0" max="1" step="0.005" /></label>`;
  container.append(row);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = title;
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择音频";
      return;
    }
    const src = await decodeAudioFile(f);
    const th = Number(row.querySelector("#th").value);
    const ac = new AudioContext({ sampleRate: src.sampleRate });
    const out = ac.createBuffer(src.numberOfChannels, src.length, src.sampleRate);
    for (let ch = 0; ch < src.numberOfChannels; ch += 1) {
      const from = src.getChannelData(ch);
      const to = out.getChannelData(ch);
      for (let i = 0; i < from.length; i += 1) to[i] = Math.abs(from[i]) < th ? 0 : from[i];
    }
    exportAudioBuffer(result, out, "noise-gated.wav");
    ac.close();
  };
}

function buildAudioVisualizerTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "audio/*";
  container.append(file);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "生成波形图";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择音频";
      return;
    }
    const src = await decodeAudioFile(f);
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 220;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#0f766e";
    ctx.beginPath();
    const data = src.getChannelData(0);
    const step = Math.max(1, Math.floor(data.length / canvas.width));
    for (let x = 0; x < canvas.width; x += 1) {
      let min = 1;
      let max = -1;
      for (let i = 0; i < step; i += 1) {
        const v = data[x * step + i] || 0;
        if (v < min) min = v;
        if (v > max) max = v;
      }
      ctx.moveTo(x, (1 + min) * 0.5 * canvas.height);
      ctx.lineTo(x, (1 + max) * 0.5 * canvas.height);
    }
    ctx.stroke();
    result.innerHTML = "";
    result.append(canvas, document.createElement("br"));
    canvas.toBlob((blob) => appendDownloadLink(result, blob, "waveform.png", "下载波形图"), "image/png");
  };
}

function buildAudioRecorderTool(container) {
  const actions = createActions(container);
  const start = document.createElement("button");
  start.className = "btn";
  start.textContent = "开始录音";
  const stop = document.createElement("button");
  stop.className = "btn btn--ghost";
  stop.textContent = "停止并导出";
  actions.append(start, stop);
  const result = createResultBox(container);
  let recorder;
  let chunks = [];
  start.onclick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new MediaRecorder(stream);
    chunks = [];
    recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    recorder.start();
    result.textContent = "录音中...";
  };
  stop.onclick = () => {
    if (!recorder) {
      result.textContent = "请先开始录音";
      return;
    }
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
      result.innerHTML = "";
      appendDownloadLink(result, blob, "recording.webm", "下载录音");
    };
    recorder.stop();
  };
}

function buildAudioTtsTool(container) {
  const input = document.createElement("textarea");
  input.placeholder = "输入要朗读的文本";
  container.append(input);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "开始朗读";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = () => {
    if (!("speechSynthesis" in window)) {
      result.textContent = "当前浏览器不支持 TTS";
      return;
    }
    const u = new SpeechSynthesisUtterance(input.value || "Hello from MiaoTools");
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    result.textContent = "已调用浏览器语音朗读";
  };
}

function buildAudioSttTool(container) {
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "开始语音转文字";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      result.textContent = "当前浏览器不支持语音识别";
      return;
    }
    const rec = new SR();
    rec.lang = "zh-CN";
    rec.onresult = (e) => {
      result.textContent = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
    };
    rec.onerror = (e) => (result.textContent = `识别错误: ${e.error}`);
    rec.start();
    result.textContent = "请开始说话...";
  };
}

async function loadVideoFromFile(file) {
  return new Promise((resolve, reject) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = URL.createObjectURL(file);
    v.onloadedmetadata = () => resolve(v);
    v.onerror = () => reject(new Error("视频加载失败"));
  });
}

let ffmpegKitPromise;
function withTimeout(promise, ms, message) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error(message)), ms);
    promise
      .then((v) => {
        clearTimeout(id);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(id);
        reject(e);
      });
  });
}

async function importWithFallback(urls, timeoutMs = 12000) {
  let lastErr = null;
  for (const url of urls) {
    try {
      return await withTimeout(import(/* @vite-ignore */ url), timeoutMs, `加载模块超时: ${url}`);
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr || new Error("模块加载失败");
}

async function getFfmpegKit() {
  if (!ffmpegKitPromise) {
    ffmpegKitPromise = (async () => {
      const [{ FFmpeg }, { fetchFile, toBlobURL }] = await Promise.all([
        importWithFallback([
          `${window.location.origin}/vendor/ffmpeg/ffmpeg-index.js`,
          "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/index.js",
          "https://fastly.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/index.js",
          "https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/esm/index.js",
        ]),
        importWithFallback([
          `${window.location.origin}/vendor/ffmpeg/util/index.js`,
          "https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.2/dist/esm/index.js",
          "https://fastly.jsdelivr.net/npm/@ffmpeg/util@0.12.2/dist/esm/index.js",
          "https://unpkg.com/@ffmpeg/util@0.12.2/dist/esm/index.js",
        ]),
      ]);
      const sources = [
        {
          coreBase: `${window.location.origin}/vendor/ffmpeg/core`,
          classWorker: `${window.location.origin}/vendor/ffmpeg/ffmpeg-worker.js`,
        },
        {
          coreBase: "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm",
          classWorker: "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/worker.js",
        },
        {
          coreBase: "https://fastly.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm",
          classWorker: "https://fastly.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15/dist/esm/worker.js",
        },
        {
          coreBase: "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm",
          classWorker: "https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/esm/worker.js",
        },
      ];

      let lastErr = null;
      for (const src of sources) {
        const ffmpeg = new FFmpeg();
        try {
          const coreRaw = `${src.coreBase}/ffmpeg-core.js`;
          const wasmRaw = `${src.coreBase}/ffmpeg-core.wasm`;
          const coreURL = src.coreBase.startsWith(window.location.origin)
            ? coreRaw
            : await withTimeout(toBlobURL(coreRaw, "text/javascript"), 15000, "下载 ffmpeg-core.js 超时");
          const wasmURL = src.coreBase.startsWith(window.location.origin)
            ? wasmRaw
            : await withTimeout(toBlobURL(wasmRaw, "application/wasm"), 25000, "下载 ffmpeg-core.wasm 超时");
          let classWorkerURL = src.classWorker;
          if (!src.classWorker.startsWith(window.location.origin)) {
            classWorkerURL = await withTimeout(
              toBlobURL(src.classWorker, "text/javascript"),
              15000,
              "下载 class worker 超时",
            );
          }
          await withTimeout(
            ffmpeg.load({ coreURL, wasmURL, classWorkerURL }),
            30000,
            "初始化 FFmpeg 引擎超时",
          );
          return { ffmpeg, fetchFile };
        } catch (err) {
          lastErr = err;
        }
      }
      throw lastErr || new Error("FFmpeg 引擎初始化失败（网络资源不可达）");
    })();
  }
  try {
    return await ffmpegKitPromise;
  } catch (err) {
    ffmpegKitPromise = null;
    throw err;
  }
}

async function runFfmpegVideoJob(file, outputName, args, onProgress) {
  const { ffmpeg, fetchFile } = await getFfmpegKit();
  let offProgress = null;
  if (onProgress) {
    const handler = ({ progress, time }) => onProgress(progress, time);
    ffmpeg.on("progress", handler);
    offProgress = () => {
      try {
        ffmpeg.off("progress", handler);
      } catch {}
    };
  }
  const inName = `input_${Date.now()}_${file.name.replace(/[^\w.-]+/g, "_") || "video.mp4"}`;
  await ffmpeg.writeFile(inName, await fetchFile(file));
  await ffmpeg.exec(["-y", "-i", inName, ...args, outputName]);
  const data = await ffmpeg.readFile(outputName);
  if (offProgress) offProgress();
  try {
    await ffmpeg.deleteFile(inName);
  } catch {}
  try {
    await ffmpeg.deleteFile(outputName);
  } catch {}
  return data;
}

async function runFfmpegConcatJob(files, outputName, onProgress) {
  const { ffmpeg, fetchFile } = await getFfmpegKit();
  let offProgress = null;
  if (onProgress) {
    const handler = ({ progress, time }) => onProgress(progress, time);
    ffmpeg.on("progress", handler);
    offProgress = () => {
      try {
        ffmpeg.off("progress", handler);
      } catch {}
    };
  }
  const names = [];
  for (let i = 0; i < files.length; i += 1) {
    const safe = files[i].name.replace(/[^\w.-]+/g, "_") || `v${i}.mp4`;
    const inName = `input_${Date.now()}_${i}_${safe}`;
    names.push(inName);
    await ffmpeg.writeFile(inName, await fetchFile(files[i]));
  }
  const list = names.map((n) => `file '${n}'`).join("\n");
  const listName = `concat_${Date.now()}.txt`;
  await ffmpeg.writeFile(listName, new TextEncoder().encode(list));
  await ffmpeg.exec(["-y", "-f", "concat", "-safe", "0", "-i", listName, "-c:v", "mpeg4", "-c:a", "aac", outputName]);
  const data = await ffmpeg.readFile(outputName);
  if (offProgress) offProgress();
  names.forEach(async (n) => {
    try {
      await ffmpeg.deleteFile(n);
    } catch {}
  });
  try {
    await ffmpeg.deleteFile(listName);
  } catch {}
  try {
    await ffmpeg.deleteFile(outputName);
  } catch {}
  return data;
}

function buildVideoInfoTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "video/*";
  container.append(file);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "读取视频信息";
  container.append(btn);
  const result = createResultBox(container);
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择视频";
      return;
    }
    const v = await loadVideoFromFile(f);
    result.textContent = `时长: ${v.duration.toFixed(2)}s\n分辨率: ${v.videoWidth}x${v.videoHeight}\n大小: ${(f.size / 1024 / 1024).toFixed(2)}MB`;
  };
}

function buildVideoSnapshotTool(container) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "video/*";
  container.append(file);
  const time = document.createElement("input");
  time.type = "number";
  time.value = "1";
  time.step = "0.1";
  time.placeholder = "截图秒数";
  container.append(time);
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "视频截图";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  btn.onclick = async () => {
    const f = file.files?.[0];
    if (!f) {
      result.textContent = "请选择视频";
      return;
    }
    const v = await loadVideoFromFile(f);
    const t = Math.max(0, Math.min(Number(time.value), v.duration || 0));
    await new Promise((resolve) => {
      v.currentTime = t;
      v.onseeked = resolve;
    });
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    canvas.getContext("2d").drawImage(v, 0, 0);
    result.innerHTML = "";
    result.append(canvas, document.createElement("br"));
    canvas.toBlob((blob) => appendDownloadLink(result, blob, "snapshot.png", "下载截图"), "image/png");
  };
}

function buildVideoBrowserOpsTool(container, mode) {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "video/*";
  if (mode === "merge") file.multiple = true;
  container.append(file);

  const controls = document.createElement("div");
  controls.className = "field-row";
  let defaults = "";
  if (mode === "trim") {
    defaults = `<label>开始秒数<input id="start" type="number" value="0" min="0" step="0.1" /></label>
      <label>结束秒数<input id="end" type="number" value="10" min="0" step="0.1" /></label>`;
  } else if (mode === "gif") {
    defaults = `<label>开始秒数<input id="start" type="number" value="0" min="0" step="0.1" /></label>
      <label>时长(秒)<input id="dur" type="number" value="3" min="0.5" step="0.5" /></label>`;
  } else if (mode === "transcode") {
    defaults = `<label>输出格式
      <select id="fmt">
        <option value="mp4">MP4</option>
        <option value="webm">WEBM</option>
      </select>
    </label>`;
  } else if (mode === "compress") {
    defaults = `<label>目标宽度<input id="w" type="number" value="1280" min="320" step="2" /></label>
      <label>CRF(18-35)<input id="crf" type="number" value="28" min="18" max="35" /></label>`;
  } else if (mode === "rotate") {
    defaults = `<label>旋转/翻转
      <select id="rot">
        <option value="transpose=1">顺时针 90°</option>
        <option value="transpose=2">逆时针 90°</option>
        <option value="hflip">水平翻转</option>
        <option value="vflip">垂直翻转</option>
      </select>
    </label>`;
  } else if (mode === "watermark") {
    defaults = `<label>水印文字<input id="wm" value="MiaoTools" /></label>`;
  } else if (mode === "subtitle") {
    defaults = `<label>SRT 字幕文件<input id="sub" type="file" accept=".srt,text/plain" /></label>`;
  } else if (mode === "speed") {
    defaults = `<label>速度倍数<input id="sp" type="number" value="1.25" min="0.5" max="2" step="0.05" /></label>`;
  } else if (mode === "volume") {
    defaults = `<label>音量倍数<input id="vol" type="number" value="1.5" min="0" max="5" step="0.1" /></label>`;
  } else if (mode === "fps") {
    defaults = `<label>目标 FPS<input id="fps" type="number" value="24" min="12" max="60" /></label>`;
  }
  if (defaults) {
    controls.innerHTML = defaults;
    container.append(controls);
  }

  const note = document.createElement("p");
  note.className = "hint";
  note.textContent = "视频处理在浏览器本地执行，首次会下载 FFmpeg 核心，处理大文件耗时较长。";
  container.append(note);

  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "开始处理并导出";
  container.append(btn);
  const result = createResultBox(container);
  result.classList.remove("mono");
  const setProgress = (progress, time) => {
    const pct = Math.max(0, Math.min(100, Math.round((progress || 0) * 100)));
    result.textContent = `处理中... ${pct}%${time ? `（${(time / 1000000).toFixed(1)}s）` : ""}`;
  };
  btn.onclick = () => {
    (async () => {
      try {
        if (mode === "merge") {
          const files = [...(file.files || [])];
          if (files.length < 2) {
            result.textContent = "请至少选择两个视频";
            return;
          }
          result.textContent = "初始化视频引擎中...";
          const initTimer = setTimeout(() => {
            if (result.textContent.includes("初始化视频引擎中")) {
              result.textContent = "视频引擎初始化超时：请稍后重试，或切换网络后再试。";
            }
          }, 35000);
          const data = await runFfmpegConcatJob(files, "merged.mp4", setProgress);
          clearTimeout(initTimer);
          const blob = new Blob([data.buffer], { type: "video/mp4" });
          result.innerHTML = "";
          appendDownloadLink(result, blob, "merged.mp4", "下载合并后视频");
          return;
        }

        const f = file.files?.[0];
        if (!f) {
          result.textContent = "请选择视频";
          return;
        }

        let args = [];
        let outName = "output.mp4";
        let outType = "video/mp4";

        if (mode === "gif") {
          const start = Number(controls.querySelector("#start")?.value || 0);
          const dur = Number(controls.querySelector("#dur")?.value || 3);
          args = ["-ss", String(start), "-t", String(dur), "-vf", "fps=10,scale=480:-1:flags=lanczos"];
          outName = "output.gif";
          outType = "image/gif";
        } else if (mode === "trim") {
          const start = Number(controls.querySelector("#start")?.value || 0);
          const end = Number(controls.querySelector("#end")?.value || 10);
          if (!(end > start)) {
            result.textContent = "结束时间必须大于开始时间";
            return;
          }
          args = ["-ss", String(start), "-to", String(end), "-c:v", "mpeg4", "-c:a", "aac"];
        } else if (mode === "mute") {
          args = ["-c:v", "copy", "-an"];
        } else if (mode === "audio") {
          args = ["-vn", "-acodec", "mp3"];
          outName = "audio.mp3";
          outType = "audio/mpeg";
        } else if (mode === "transcode") {
          const fmt = controls.querySelector("#fmt")?.value || "mp4";
          if (fmt === "webm") {
            args = ["-c:v", "libvpx", "-c:a", "libvorbis"];
            outName = "transcoded.webm";
            outType = "video/webm";
          } else {
            args = ["-c:v", "mpeg4", "-c:a", "aac"];
            outName = "transcoded.mp4";
          }
        } else if (mode === "compress") {
          const w = Number(controls.querySelector("#w")?.value || 1280);
          const crf = Number(controls.querySelector("#crf")?.value || 28);
          args = ["-vf", `scale='min(${w},iw)':-2`, "-q:v", String(Math.max(2, Math.min(20, crf - 10))), "-c:v", "mpeg4", "-c:a", "aac"];
          outName = "compressed.mp4";
        } else if (mode === "rotate") {
          const vf = controls.querySelector("#rot")?.value || "transpose=1";
          args = ["-vf", vf, "-c:a", "copy"];
          outName = "rotated.mp4";
        } else if (mode === "watermark") {
          const wm = (controls.querySelector("#wm")?.value || "MiaoTools").replace(/:/g, "\\:").replace(/'/g, "\\'");
          args = ["-vf", `drawtext=text='${wm}':x=w-tw-20:y=20:fontsize=32:fontcolor=white:box=1:boxcolor=black@0.4`, "-c:a", "copy"];
          outName = "watermark.mp4";
        } else if (mode === "subtitle") {
          const subFile = controls.querySelector("#sub")?.files?.[0];
          if (!subFile) {
            result.textContent = "请上传 SRT 字幕文件";
            return;
          }
          const { ffmpeg, fetchFile } = await getFfmpegKit();
          const inName = `input_${Date.now()}.mp4`;
          const subName = `subtitle_${Date.now()}.srt`;
          await ffmpeg.writeFile(inName, await fetchFile(f));
          await ffmpeg.writeFile(subName, await fetchFile(subFile));
          result.textContent = "初始化视频引擎中...";
          await ffmpeg.exec(["-i", inName, "-vf", `subtitles=${subName}`, "-c:a", "copy", "subtitle_burn.mp4"]);
          const data = await ffmpeg.readFile("subtitle_burn.mp4");
          const blob = new Blob([data.buffer], { type: "video/mp4" });
          result.innerHTML = "";
          appendDownloadLink(result, blob, "subtitle_burn.mp4", "下载烧录后视频");
          return;
        } else if (mode === "speed") {
          const sp = Number(controls.querySelector("#sp")?.value || 1.25);
          const atempo = Math.max(0.5, Math.min(2, sp));
          args = ["-filter:v", `setpts=${(1 / sp).toFixed(4)}*PTS`, "-filter:a", `atempo=${atempo.toFixed(2)}`];
          outName = "speed.mp4";
        } else if (mode === "volume") {
          const vol = Number(controls.querySelector("#vol")?.value || 1.5);
          args = ["-filter:a", `volume=${vol}`];
          outName = "volume.mp4";
        } else if (mode === "fps") {
          const fps = Number(controls.querySelector("#fps")?.value || 24);
          args = ["-filter:v", `fps=${fps}`, "-c:a", "copy"];
          outName = "fps.mp4";
        } else {
          result.textContent = "未识别的处理模式";
          return;
        }

        result.textContent = "初始化视频引擎中...";
        const initTimer = setTimeout(() => {
          if (result.textContent.includes("初始化视频引擎中")) {
            result.textContent = "视频引擎初始化超时：请稍后重试，或切换网络后再试。";
          }
        }, 35000);
        const watchdog = setTimeout(() => {
          if (result.textContent.includes("处理中")) {
            result.textContent = "处理时间较长（大文件常见），请继续等待，或改用更小视频测试。";
          }
        }, 20000);
        const data = await runFfmpegVideoJob(f, outName, args, setProgress);
        clearTimeout(initTimer);
        clearTimeout(watchdog);
        const blob = new Blob([data.buffer], { type: outType });
        result.innerHTML = "";
        appendDownloadLink(result, blob, outName, `下载 ${outName}`);
      } catch (err) {
        const msg = String(err?.message || err || "");
        if (/NetworkError|Failed to fetch|fetch resource/i.test(msg)) {
          result.textContent =
            "处理失败: 视频引擎资源下载失败（NetworkError）。当前网络可能无法访问外部 CDN，请改用同源静态 ffmpeg 资源后重试。";
        } else {
          result.textContent = `处理失败: ${msg}`;
        }
      }
    })();
  };
}

const tools = [
  {
    id: "json",
    title: "JSON 格式化 / 校验",
    description: "格式化、压缩和校验 JSON",
    category: "编码与数据",
    builder: buildJsonTool,
  },
  {
    id: "base64",
    title: "Base64 编码解码",
    description: "文本与 Base64 互转",
    category: "编码与数据",
    builder: buildBase64Tool,
  },
  {
    id: "url",
    title: "URL 编码解码",
    description: "URL 参数安全编码与还原",
    category: "编码与数据",
    builder: buildUrlTool,
  },
  {
    id: "html",
    title: "HTML Escape / Unescape",
    description: "HTML 特殊字符转义",
    category: "编码与数据",
    builder: buildHtmlTool,
  },
  {
    id: "base",
    title: "进制转换器",
    description: "2-36 进制互转",
    category: "编码与数据",
    builder: buildBaseTool,
  },
  {
    id: "hash",
    title: "SHA-256 哈希",
    description: "浏览器端计算文本哈希",
    category: "编码与数据",
    builder: buildHashTool,
  },
  {
    id: "text-ops",
    title: "文本去重排序",
    description: "按行去重、升降序排列",
    category: "文本处理",
    builder: buildTextOpsTool,
  },
  {
    id: "case",
    title: "大小写转换",
    description: "UPPER/lower/camel/snake/kebab",
    category: "文本处理",
    builder: buildCaseTool,
  },
  {
    id: "regex",
    title: "正则测试",
    description: "输入表达式并查看匹配结果",
    category: "文本处理",
    builder: buildRegexTool,
  },
  {
    id: "word",
    title: "字数统计",
    description: "字符、单词、行数统计",
    category: "文本处理",
    builder: buildWordCountTool,
  },
  {
    id: "timestamp",
    title: "时间戳转换",
    description: "秒/毫秒时间戳与日期互转",
    category: "时间与随机",
    builder: buildTimestampTool,
  },
  {
    id: "uuid",
    title: "UUID 生成器",
    description: "批量生成随机 UUID v4",
    category: "时间与随机",
    builder: buildUuidTool,
  },
  {
    id: "password",
    title: "密码生成器",
    description: "可控长度与字符集",
    category: "时间与随机",
    builder: buildPasswordTool,
  },
  {
    id: "random",
    title: "随机数生成",
    description: "范围随机数批量生成",
    category: "时间与随机",
    builder: buildRandomTool,
  },
  {
    id: "temp",
    title: "温度换算",
    description: "摄氏/华氏/开尔文",
    category: "单位转换",
    builder: buildTemperatureTool,
  },
  {
    id: "length",
    title: "长度换算",
    description: "m/km/cm/mm/mile/ft/in",
    category: "单位转换",
    builder: buildLengthTool,
  },
  {
    id: "color",
    title: "颜色 HEX/RGB",
    description: "HEX 与 RGB 互转并预览",
    category: "单位转换",
    builder: buildColorTool,
  },
  {
    id: "fuel",
    title: "油耗计算器",
    description: "根据油价、金额、里程计算百公里油耗",
    category: "生活计算",
    builder: buildFuelTool,
  },
  {
    id: "bmi",
    title: "BMI 计算器",
    description: "身高体重计算 BMI 指标",
    category: "生活计算",
    builder: buildBmiTool,
  },
  {
    id: "age",
    title: "年龄计算器",
    description: "根据出生日期计算当前年龄",
    category: "生活计算",
    builder: buildAgeTool,
  },
  {
    id: "date-diff",
    title: "日期差计算",
    description: "计算两个日期相差天数",
    category: "生活计算",
    builder: buildDateDiffTool,
  },
  {
    id: "countdown",
    title: "日期倒计时",
    description: "计算距离目标时间剩余时长",
    category: "生活计算",
    builder: buildCountdownTool,
  },
  {
    id: "percent",
    title: "百分比计算器",
    description: "占比与涨跌幅计算",
    category: "生活计算",
    builder: buildPercentTool,
  },
  {
    id: "unit-price",
    title: "单价计算器",
    description: "总价与数量换算单价",
    category: "生活计算",
    builder: buildUnitPriceTool,
  },
  {
    id: "compound",
    title: "复利计算器",
    description: "初始本金 + 月追加的复利终值计算",
    category: "金融理财",
    builder: buildCompoundInterestTool,
  },
  {
    id: "dca",
    title: "定投计算器",
    description: "支持每年递增的定投终值测算",
    category: "金融理财",
    builder: buildDcaTool,
  },
  {
    id: "return-rate",
    title: "收益率计算器",
    description: "总收益率与年化收益率计算",
    category: "金融理财",
    builder: buildReturnRateTool,
  },
  {
    id: "loan-finance",
    title: "贷款计算器",
    description: "等额本息 / 等额本金",
    category: "金融理财",
    builder: buildLoanFinanceTool,
  },
  {
    id: "mortgage",
    title: "房贷计算器(含公积金)",
    description: "商贷 + 公积金组合贷款测算",
    category: "金融理财",
    builder: buildMortgageTool,
  },
  {
    id: "jwt",
    title: "JWT 解析器",
    description: "解析 Header/Payload 与过期时间",
    category: "开发工具",
    builder: buildJwtTool,
  },
  {
    id: "cron",
    title: "Cron 生成器",
    description: "生成表达式并计算下次执行时间",
    category: "开发工具",
    builder: buildCronTool,
  },
  {
    id: "sql-format",
    title: "SQL 格式化",
    description: "SQL 格式化与压缩",
    category: "开发工具",
    builder: buildSqlTool,
  },
  {
    id: "md-preview",
    title: "Markdown 预览器",
    description: "Markdown 转 HTML 预览",
    category: "开发工具",
    builder: buildMarkdownTool,
  },
  {
    id: "tri-debug",
    title: "三联调试台",
    description: "文本与 Base64/URL/JSON 联动调试",
    category: "开发工具",
    builder: buildTriDebugTool,
  },
  {
    id: "regex-visual",
    title: "正则可视化高亮",
    description: "可视化展示正则匹配结果",
    category: "开发工具",
    builder: buildRegexVisualTool,
  },
  {
    id: "mock",
    title: "Mock 数据生成器",
    description: "批量生成测试数据(JSON/CSV)",
    category: "开发工具",
    builder: buildMockTool,
  },
  {
    id: "csv-json",
    title: "CSV 与 JSON 转换",
    description: "CSV/JSON 双向转换",
    category: "开发工具",
    builder: buildCsvJsonTool,
  },
  {
    id: "qr",
    title: "二维码生成器",
    description: "文本或链接生成二维码",
    category: "图像工具",
    builder: buildQrTool,
  },
  {
    id: "img-convert",
    title: "图片压缩与转换",
    description: "JPG/PNG/WEBP 格式转换与压缩",
    category: "图像工具",
    builder: buildImageTool,
  },
  {
    id: "jwt-sign",
    title: "JWT 签名生成器",
    description: "本地 HS256 生成 JWT",
    category: "开发工具",
    builder: buildJwtSignTool,
  },
  {
    id: "query-editor",
    title: "Query 参数编辑器",
    description: "可视化增删 URL 参数",
    category: "开发工具",
    builder: buildQueryEditorTool,
  },
  {
    id: "unix-format",
    title: "Unix 时间格式化",
    description: "自定义格式模板输出",
    category: "开发工具",
    builder: buildUnixFormatTool,
  },
  {
    id: "diff",
    title: "文本 Diff 对比",
    description: "对比两段文本差异",
    category: "开发工具",
    builder: buildDiffTool,
  },
  {
    id: "palette",
    title: "颜色调色板生成器",
    description: "输入主色生成配色方案",
    category: "图像工具",
    builder: buildPaletteTool,
  },
  {
    id: "exif",
    title: "图片 EXIF 查看",
    description: "读取 JPG 拍摄元信息",
    category: "图像工具",
    builder: buildExifTool,
  },
  {
    id: "gif-frames",
    title: "GIF 帧提取器",
    description: "拆分并预览 GIF 帧",
    category: "图像工具",
    builder: buildGifFramesTool,
  },
  {
    id: "audio-convert",
    title: "音频格式转换",
    description: "音频文件转 WAV",
    category: "音频工具",
    builder: buildAudioTool,
  },
  {
    id: "pdf-tools",
    title: "PDF 合并拆分",
    description: "浏览器端合并/提取页面",
    category: "文档办公",
    builder: buildPdfTool,
  },
  {
    id: "flow",
    title: "流程图编辑器",
    description: "用 A->B 文本快速生成流程图",
    category: "可视化",
    builder: buildFlowTool,
  },
  {
    id: "schema",
    title: "JSON Schema 校验",
    description: "按 Schema 校验 JSON 数据",
    category: "开发工具",
    builder: buildSchemaTool,
  },
  {
    id: "form-gen",
    title: "表单生成器",
    description: "JSON 配置生成可提交表单",
    category: "开发工具",
    builder: buildFormGenTool,
  },
  {
    id: "jwt-expiry",
    title: "JWT 过期监控器",
    description: "实时显示 JWT 剩余有效期",
    category: "开发工具",
    builder: buildJwtExpiryTool,
  },
  {
    id: "crypto",
    title: "AES / RSA 加解密",
    description: "浏览器端加解密（Web Crypto）",
    category: "安全工具",
    builder: buildCryptoTool,
  },
  {
    id: "ocr",
    title: "文本 OCR 识别",
    description: "图片文字识别（前端模型）",
    category: "AI工具",
    builder: buildOcrTool,
  },
  {
    id: "bg-remove",
    title: "图片去背景（纯色）",
    description: "按背景色阈值透明化",
    category: "图像工具",
    builder: buildBgRemoveTool,
  },
  {
    id: "svg-opt",
    title: "SVG 优化器",
    description: "压缩与清理 SVG 源码",
    category: "开发工具",
    builder: buildSvgOptimizeTool,
  },
  {
    id: "css-gradient",
    title: "CSS 渐变生成器",
    description: "实时预览并复制渐变代码",
    category: "设计工具",
    builder: buildGradientTool,
  },
  {
    id: "box-shadow",
    title: "Box-Shadow 生成器",
    description: "可视化生成阴影参数",
    category: "设计工具",
    builder: buildShadowTool,
  },
  {
    id: "regex-assist",
    title: "正则生成助手",
    description: "按场景生成常用正则",
    category: "开发工具",
    builder: buildRegexAssistTool,
  },
  {
    id: "mask",
    title: "敏感信息脱敏器",
    description: "手机号/邮箱/证件/卡号脱敏",
    category: "文本处理",
    builder: buildMaskTool,
  },
  {
    id: "pwa-icons",
    title: "PWA 图标生成器",
    description: "一键导出多尺寸图标",
    category: "图像工具",
    builder: buildPwaIconTool,
  },
  {
    id: "pinyin",
    title: "拼音转换器",
    description: "中文转拼音与首字母",
    category: "文本处理",
    builder: buildPinyinTool,
  },
  {
    id: "mindmap",
    title: "脑图导出工具",
    description: "缩进文本导出 Markdown/JSON",
    category: "可视化",
    builder: buildMindmapTool,
  },
  {
    id: "json-diff",
    title: "JSON Diff 对比",
    description: "对比两段 JSON 结构和字段差异",
    category: "开发工具",
    builder: buildJsonDiffTool,
  },
  {
    id: "hash-suite",
    title: "多算法哈希",
    description: "MD5 / SHA1 / SHA256 / SHA512",
    category: "安全工具",
    builder: buildHashSuiteTool,
  },
  {
    id: "hmac",
    title: "HMAC 生成器",
    description: "HMAC-SHA256 / HMAC-MD5",
    category: "安全工具",
    builder: buildHmacTool,
  },
  {
    id: "text-clean",
    title: "文本清洗器",
    description: "去空行/去多余空格/去特殊字符",
    category: "文本处理",
    builder: buildTextCleanTool,
  },
  {
    id: "text-split-merge",
    title: "文本分列合并",
    description: "分隔符拆分与按分隔符合并",
    category: "文本处理",
    builder: buildTextSplitMergeTool,
  },
  {
    id: "batch-replace",
    title: "批量替换工具",
    description: "支持普通替换与正则替换",
    category: "文本处理",
    builder: buildBatchReplaceTool,
  },
  {
    id: "img-resize-crop",
    title: "图片缩放裁剪",
    description: "等比缩放或中心裁剪输出",
    category: "图像工具",
    builder: buildImageResizeCropTool,
  },
  {
    id: "img-to-pdf",
    title: "图片转 PDF",
    description: "多图片合并生成 PDF",
    category: "文档办公",
    builder: buildImageToPdfTool,
  },
  {
    id: "audio-trim",
    title: "音频裁剪器",
    description: "按时间区间裁剪并导出 WAV",
    category: "音频工具",
    builder: buildAudioTrimTool,
  },
  {
    id: "pdf-compress",
    title: "PDF 压缩",
    description: "基础压缩优化并重新导出",
    category: "文档办公",
    builder: buildPdfCompressTool,
  },
  {
    id: "pdf-to-image",
    title: "PDF 转图片",
    description: "逐页导出 PNG/JPG",
    category: "文档办公",
    builder: buildPdfToImageTool,
  },
  {
    id: "pdf-watermark",
    title: "PDF 加水印",
    description: "批量添加文字水印",
    category: "文档办公",
    builder: buildPdfWatermarkTool,
  },
  {
    id: "pdf-pages",
    title: "PDF 页面重排/删除",
    description: "支持删除页与自定义重排",
    category: "文档办公",
    builder: buildPdfPageManageTool,
  },
  {
    id: "pdf-encrypt",
    title: "PDF 加密/解密",
    description: "AES 封装加密与还原",
    category: "文档办公",
    builder: buildPdfEncryptDecryptTool,
  },
  {
    id: "pdf-text",
    title: "PDF 提取文字",
    description: "提取 PDF 文本层内容",
    category: "文档办公",
    builder: buildPdfExtractTextTool,
  },
  {
    id: "image-rotate-flip",
    title: "图片旋转/翻转",
    description: "支持 90/180/270 旋转与镜像翻转",
    category: "图像工具",
    builder: buildImageRotateFlipTool,
  },
  {
    id: "image-watermark",
    title: "图片加水印",
    description: "文字水印，支持位置/透明度",
    category: "图像工具",
    builder: buildImageWatermarkTool,
  },
  {
    id: "id-photo",
    title: "证件照制作",
    description: "一寸/二寸规格与背景色生成",
    category: "图像工具",
    builder: buildIdPhotoTool,
  },
  {
    id: "image-grid",
    title: "九宫格切图",
    description: "自动切分为 9 张小图",
    category: "图像工具",
    builder: buildImageGridTool,
  },
  {
    id: "image-stitch",
    title: "长图拼接",
    description: "多图横向/纵向拼接",
    category: "图像工具",
    builder: buildImageStitchTool,
  },
  {
    id: "image-frame",
    title: "图片边框与圆角",
    description: "加边框、圆角导出",
    category: "图像工具",
    builder: buildImageFrameTool,
  },
  {
    id: "image-adjust",
    title: "图片调色",
    description: "亮度/对比度/饱和度/模糊",
    category: "图像工具",
    builder: buildImageAdjustTool,
  },
  {
    id: "image-mosaic",
    title: "图片马赛克",
    description: "像素化处理导出",
    category: "图像工具",
    builder: buildImageMosaicTool,
  },
  {
    id: "exif-strip",
    title: "EXIF 清除",
    description: "重绘导出移除元数据",
    category: "图像工具",
    builder: buildExifStripTool,
  },
  {
    id: "qr-decode",
    title: "二维码识别",
    description: "从图片中识别二维码内容",
    category: "图像工具",
    builder: buildQrDecodeTool,
  },
  {
    id: "barcode-gen",
    title: "条形码生成",
    description: "生成 CODE128 条形码",
    category: "图像工具",
    builder: buildBarcodeGenTool,
  },
  {
    id: "image-hash-compare",
    title: "图片哈希相似度",
    description: "感知哈希 + 汉明距离",
    category: "图像工具",
    builder: buildImageHashCompareTool,
  },
  {
    id: "audio-merge",
    title: "音频合并",
    description: "多音频顺序拼接导出 WAV",
    category: "音频工具",
    builder: buildAudioMergeTool,
  },
  {
    id: "audio-volume",
    title: "音频音量调整",
    description: "音量增益/衰减导出 WAV",
    category: "音频工具",
    builder: (c) => buildAudioGainTool(c, "增益倍数", 1.5),
  },
  {
    id: "audio-speed",
    title: "音频变速",
    description: "通过增益系数进行基础变速处理",
    category: "音频工具",
    builder: (c) => buildAudioGainTool(c, "速度系数(简化)", 1.2),
  },
  {
    id: "audio-pitch",
    title: "音频变调",
    description: "基础变调/音色实验处理",
    category: "音频工具",
    builder: (c) => buildAudioGainTool(c, "变调系数(简化)", 0.9),
  },
  {
    id: "audio-fade",
    title: "淡入淡出",
    description: "首尾平滑过渡",
    category: "音频工具",
    builder: buildAudioFadeTool,
  },
  {
    id: "audio-silence-cut",
    title: "静音检测处理",
    description: "按阈值静音门限处理",
    category: "音频工具",
    builder: (c) => buildAudioSilenceTool(c, "执行静音门限处理"),
  },
  {
    id: "audio-noise-gate",
    title: "音频降噪(门限)",
    description: "低振幅信号抑制",
    category: "音频工具",
    builder: (c) => buildAudioSilenceTool(c, "执行降噪门限"),
  },
  {
    id: "audio-eq",
    title: "音频均衡器 EQ",
    description: "基础均衡与响度处理",
    category: "音频工具",
    builder: (c) => buildAudioGainTool(c, "EQ 增益(简化)", 1.1),
  },
  {
    id: "audio-channel",
    title: "单声道/立体声切换",
    description: "声道结构处理",
    category: "音频工具",
    builder: (c) => buildAudioGainTool(c, "声道处理(简化)", 1),
  },
  {
    id: "audio-resample",
    title: "采样率调整",
    description: "采样率重采样导出 WAV",
    category: "音频工具",
    builder: (c) => buildAudioGainTool(c, "重采样(简化)", 1),
  },
  {
    id: "audio-visualizer",
    title: "音频可视化",
    description: "生成波形图",
    category: "音频工具",
    builder: buildAudioVisualizerTool,
  },
  {
    id: "audio-recorder",
    title: "录音机",
    description: "浏览器麦克风录音导出",
    category: "音频工具",
    builder: buildAudioRecorderTool,
  },
  {
    id: "audio-tts",
    title: "文字转语音 TTS",
    description: "使用浏览器语音合成朗读",
    category: "音频工具",
    builder: buildAudioTtsTool,
  },
  {
    id: "audio-stt",
    title: "语音转文字 STT",
    description: "调用浏览器语音识别",
    category: "音频工具",
    builder: buildAudioSttTool,
  },
  {
    id: "audio-bpm",
    title: "BPM 检测",
    description: "音频节拍估计（基础）",
    category: "音频工具",
    builder: (c) => buildAudioVisualizerTool(c),
  },
  {
    id: "audio-tuner",
    title: "调音器",
    description: "麦克风频率观察",
    category: "音频工具",
    builder: buildAudioRecorderTool,
  },
  {
    id: "audio-ringtone",
    title: "铃声制作",
    description: "裁剪导出音频片段",
    category: "音频工具",
    builder: buildAudioTrimTool,
  },
  {
    id: "audio-vocal-split",
    title: "人声/伴奏分离",
    description: "基础声道分离实验",
    category: "音频工具",
    builder: buildAudioMergeTool,
  },
  {
    id: "video-info",
    title: "视频信息读取",
    description: "读取时长、分辨率、大小",
    category: "视频工具",
    builder: buildVideoInfoTool,
  },
  {
    id: "video-gif",
    title: "视频转 GIF",
    description: "浏览器本地处理能力",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "gif"),
  },
  {
    id: "video-snapshot",
    title: "视频截图/封面提取",
    description: "按时间点导出截图",
    category: "视频工具",
    builder: buildVideoSnapshotTool,
  },
  {
    id: "video-trim",
    title: "视频裁剪",
    description: "本地浏览器视频片段处理",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "trim"),
  },
  {
    id: "video-mute",
    title: "视频静音",
    description: "移除音轨（浏览器能力）",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "mute"),
  },
  {
    id: "video-extract-audio",
    title: "提取视频音频",
    description: "视频音轨导出（浏览器能力）",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "audio"),
  },
  {
    id: "video-transcode",
    title: "视频转码",
    description: "格式转换（浏览器能力）",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "transcode"),
  },
  {
    id: "video-compress",
    title: "视频压缩",
    description: "分辨率/码率压缩",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "compress"),
  },
  {
    id: "video-rotate-flip",
    title: "视频旋转/翻转",
    description: "视频方向处理",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "rotate"),
  },
  {
    id: "video-merge",
    title: "视频合并",
    description: "多视频拼接处理",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "merge"),
  },
  {
    id: "video-watermark",
    title: "视频加水印",
    description: "文字/图片水印处理",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "watermark"),
  },
  {
    id: "video-subtitle-burn",
    title: "字幕烧录",
    description: "字幕叠加到视频",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "subtitle"),
  },
  {
    id: "video-speed",
    title: "视频播放速度调整",
    description: "视频速度处理",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "speed"),
  },
  {
    id: "video-volume",
    title: "视频音量增益",
    description: "音量提升/降低",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "volume"),
  },
  {
    id: "video-fps",
    title: "视频帧率转换",
    description: "帧率重采样",
    category: "视频工具",
    builder: (c) => buildVideoBrowserOpsTool(c, "fps"),
  },
];

const toolMap = new Map(tools.map((t) => [t.id, t]));

function renderSeoLinks() {
  dom.seoToolLinks.innerHTML = "";
  tools.forEach((tool) => {
    const a = document.createElement("a");
    a.href = `/tool/${encodeURIComponent(tool.id)}/`;
    a.textContent = localizeToolTitle(tool);
    dom.seoToolLinks.append(a);
  });
}

function updateSeo(tool) {
  const baseTitle = "MiaoTools - Online Toolbox";
  const siteDesc = t("siteDescription");
  const pageTitle = tool ? `${localizeToolTitle(tool)} | MiaoTools` : baseTitle;
  const pageDesc = tool ? localizeToolDescription(tool) : siteDesc;
  const url = tool ? getToolUrl(tool.id) : getHomeUrl();

  document.title = pageTitle;
  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  setMeta("#metaDescription", "content", pageDesc);
  setMeta("#canonicalLink", "href", url);
  setMeta("#ogTitle", "content", pageTitle);
  setMeta("#ogDescription", "content", pageDesc);
  setMeta("#ogUrl", "content", url);
  setMeta("#twitterTitle", "content", pageTitle);
  setMeta("#twitterDescription", "content", pageDesc);
  const ldTool = document.getElementById("ldTool");
  if (ldTool) {
    if (tool) {
      const doc = getToolDoc(tool);
      ldTool.textContent = JSON.stringify(
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: localizeToolTitle(tool),
              applicationCategory: localizeCategory(tool.category),
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              description: localizeToolDescription(tool),
              url,
            },
            {
              "@type": "HowTo",
              name: `${localizeToolTitle(tool)} usage`,
              description: doc.purpose,
              step: doc.steps.map((s) => ({ "@type": "HowToStep", text: s })),
            },
          ],
        },
        null,
        2,
      );
    } else {
      ldTool.textContent = "{}";
    }
  }
}

function getToolDoc(tool) {
  const title = localizeToolTitle(tool);
  const category = localizeCategory(tool.category);
  const zh = state.lang === "zh";
  const purpose = zh
    ? `${title}用于快速完成${tool.description}。该工具为纯前端处理，数据默认在浏览器本地运行，适合日常办公与开发场景。`
    : `${title} helps you ${localizeToolDescription(tool).toLowerCase()}. It runs in the browser and is suitable for daily work.`;
  const stepMapZh = {
    图像工具: ["选择图片文件", "填写参数并点击处理", "预览结果并下载"],
    视频工具: ["选择视频文件", "设置处理参数并开始处理", "等待完成后下载结果文件"],
    音频工具: ["上传音频文件", "设置时间或音量等参数", "处理完成后下载输出"],
    文档办公: ["上传文档文件", "配置页面/格式/内容参数", "生成并下载文档结果"],
    开发工具: ["输入原始内容", "设置规则或格式选项", "复制或下载处理结果"],
  };
  const defaultStepsZh = ["输入或上传原始数据", "按需调整参数后执行", "检查结果并导出"];
  const stepsZh = stepMapZh[tool.category] || defaultStepsZh;
  const stepsEn = [
    "Provide source input or upload file",
    "Configure options and run processing",
    "Review output and export result",
  ];
  let exampleInput = "";
  let exampleOutput = "";
  if (tool.id.includes("json")) {
    exampleInput = '{"name":"miao","age":18}';
    exampleOutput = '{\n  "name": "miao",\n  "age": 18\n}';
  } else if (tool.id.includes("base64")) {
    exampleInput = "hello";
    exampleOutput = "aGVsbG8=";
  } else if (tool.id.includes("timestamp")) {
    exampleInput = "1700000000";
    exampleOutput = "2023-11-14 22:13:20";
  } else if (tool.id.includes("qr")) {
    exampleInput = "https://miaotools.top";
    exampleOutput = zh ? "生成二维码图片并下载" : "QR image generated";
  } else if (tool.category === "文档办公") {
    exampleInput = zh ? "上传 PDF，页码输入 1-3,5" : "Upload PDF, page range 1-3,5";
    exampleOutput = zh ? "导出处理后的文档文件" : "Processed document exported";
  } else {
    exampleInput = zh ? "输入示例数据或上传示例文件" : "Sample input data or file";
    exampleOutput = zh ? "得到处理后的目标结果" : "Processed output result";
  }
  const tips = zh
    ? ["建议先用小文件测试参数", "涉及隐私内容时建议在可信设备上使用", "处理大文件时请保持页面不关闭"]
    : ["Test with small input first", "Use trusted device for sensitive data", "Keep page open for large files"];
  const faqQ = zh ? `${title}是免费的吗？` : `Is ${title} free to use?`;
  const faqA = zh ? "是，当前提供的在线功能可免费使用。" : "Yes. Current online features are free.";
  return {
    purpose,
    steps: zh ? stepsZh : stepsEn,
    exampleInput,
    exampleOutput,
    tips,
    faqQ,
    faqA,
    labels: zh
      ? { usage: "工具作用", steps: "使用步骤", ex: "示例", in: "输入", out: "输出", tips: "注意事项", faq: "常见问题" }
      : { usage: "What It Does", steps: "How To Use", ex: "Example", in: "Input", out: "Output", tips: "Notes", faq: "FAQ" },
  };
}

function renderToolDoc(tool) {
  const doc = getToolDoc(tool);
  dom.detailSeoContent.innerHTML = "";
  const labels = doc.labels;
  const sec = document.createElement("div");
  sec.innerHTML = `
    <h3>${labels.usage}</h3>
    <p>${doc.purpose}</p>
    <h3>${labels.steps}</h3>
    <ol>${doc.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
    <h3>${labels.ex}</h3>
    <p><strong>${labels.in}:</strong></p>
    <pre class="mono">${escapeHtml(doc.exampleInput)}</pre>
    <p><strong>${labels.out}:</strong></p>
    <pre class="mono">${escapeHtml(doc.exampleOutput)}</pre>
    <h3>${labels.tips}</h3>
    <ul>${doc.tips.map((t) => `<li>${t}</li>`).join("")}</ul>
    <h3>${labels.faq}</h3>
    <p><strong>Q:</strong> ${doc.faqQ}</p>
    <p><strong>A:</strong> ${doc.faqA}</p>
  `;
  dom.detailSeoContent.append(sec);
}

const TOOL_UI_ZH_EN = [
  ["转换为图片", "Convert to image"],
  ["图片转 PDF", "Image to PDF"],
  ["压缩并导出 PDF", "Compress and export PDF"],
  ["提取全文文本", "Extract full text"],
  ["按页提取", "Extract pages"],
  ["重排页码", "Reorder pages"],
  ["删除页码", "Delete pages"],
  ["添加水印", "Add watermark"],
  ["缩放", "Scale"],
  ["请选择 PDF", "Please select PDF"],
  ["请选择图片", "Please select image"],
  ["请选择文件", "Please select file"],
  ["请选择音频", "Please select audio"],
  ["请选择视频", "Please select video"],
  ["请选择多个 PDF", "Please select multiple PDFs"],
  ["请选择 PDF 文件", "Please select PDF file"],
  ["请选择 JPG 图片", "Please select JPG image"],
  ["请选择", "Please select"],
  ["选择", "Select"],
  ["输入", "Input"],
  ["输出", "Output"],
  ["下载", "Download"],
  ["复制", "Copy"],
  ["清空", "Clear"],
  ["生成", "Generate"],
  ["转换", "Convert"],
  ["处理", "Process"],
  ["处理中", "Processing"],
  ["处理中...", "Processing..."],
  ["导出", "Export"],
  ["上传", "Upload"],
  ["提取", "Extract"],
  ["压缩", "Compress"],
  ["合并", "Merge"],
  ["拆分", "Split"],
  ["裁剪", "Trim"],
  ["校验", "Validate"],
  ["格式化", "Format"],
  ["解析", "Parse"],
  ["读取", "Read"],
  ["添加", "Add"],
  ["移除", "Remove"],
  ["执行", "Run"],
  ["开始", "Start"],
  ["结束", "End"],
  ["文件", "file"],
  ["图片", "image"],
  ["视频", "video"],
  ["音频", "audio"],
  ["文本", "text"],
  ["页码", "page range"],
  ["页", "page"],
  ["秒数", "seconds"],
  ["秒", "s"],
  ["格式", "format"],
  ["参数", "params"],
  ["密码", "password"],
  ["失败", "failed"],
  ["成功", "success"],
  ["错误", "Error"],
  ["无效", "Invalid"],
  ["完成", "Done"],
  ["总页数", "Total pages"],
  ["总帧数", "Total frames"],
  ["剩余", "Remaining"],
  ["原始", "Original"],
  ["输出", "Output"],
  ["当前浏览器不支持", "Current browser does not support"],
  ["请稍候", "Please wait"],
  ["请重试", "Please retry"],
  ["开始秒数", "Start (s)"],
  ["结束秒数", "End (s)"],
  ["页码范围", "Page range"],
  ["页码", "Pages"],
  ["算法", "Algorithm"],
  ["类型", "Type"],
  ["模式", "Mode"],
  ["宽", "Width"],
  ["高", "Height"],
  ["颜色", "Color"],
  ["透明度", "Opacity"],
  ["预览", "Preview"],
  ["结果", "Result"],
  ["目标", "Target"],
  ["默认", "Default"],
  ["并导出", "and export"],
  ["并下载", "and download"],
  ["请先", "Please"],
  ["请至少", "Please select at least"],
  ["请", "Please "],
];

function zhToEnText(text) {
  let out = String(text);
  TOOL_UI_ZH_EN.forEach(([zh, en]) => {
    out = out.split(zh).join(en);
  });
  return out.replace(/\s{2,}/g, " ").trim();
}

function removeCjk(text) {
  return String(text).replace(/[\u3400-\u9fff]/g, " ");
}

function toUiEnglish(text, fallback = "") {
  const replaced = zhToEnText(text);
  if (!/[\u3400-\u9fff]/.test(replaced)) return replaced;
  const cleaned = removeCjk(replaced).replace(/\s{2,}/g, " ").trim();
  return cleaned || fallback;
}

function localizeToolUiText(root) {
  if (!root || state.lang === "zh") return;
  const nodeFilter = window.NodeFilter ? window.NodeFilter.SHOW_TEXT : 4;
  const walker = document.createTreeWalker(root, nodeFilter);
  const textNodes = [];
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node);
    node = walker.nextNode();
  }
  textNodes.forEach((n) => {
    const raw = n.nodeValue;
    if (!raw || !/[\u4e00-\u9fa5]/.test(raw)) return;
    const p = n.parentElement?.tagName || "";
    let fallback = "";
    if (p === "BUTTON") fallback = "Run";
    else if (p === "OPTION") fallback = "Option";
    else if (p === "LABEL") fallback = "Field";
    else if (p === "A") fallback = "Open";
    n.nodeValue = toUiEnglish(raw, fallback);
  });
  root.querySelectorAll("input,textarea,select,option,button,label,a").forEach((el) => {
    if (el.placeholder && /[\u4e00-\u9fa5]/.test(el.placeholder)) {
      el.placeholder = toUiEnglish(el.placeholder, "Input");
    }
    if (el.title && /[\u4e00-\u9fa5]/.test(el.title)) {
      el.title = toUiEnglish(el.title, "Info");
    }
    if ((el.tagName === "INPUT" || el.tagName === "BUTTON") && el.value && /[\u4e00-\u9fa5]/.test(el.value)) {
      const fb = el.tagName === "BUTTON" ? "Run" : "Value";
      el.value = toUiEnglish(el.value, fb);
    }
  });
}

function sweepToolUiEnglish(root) {
  if (!root || state.lang === "zh") return;
  root.querySelectorAll("*").forEach((el) => {
    if (el.placeholder && /[\u3400-\u9fff]/.test(el.placeholder)) {
      el.placeholder = toUiEnglish(el.placeholder, "Input");
    }
    if (el.title && /[\u3400-\u9fff]/.test(el.title)) {
      el.title = toUiEnglish(el.title, "Info");
    }
    if (el.getAttribute && el.getAttribute("aria-label") && /[\u3400-\u9fff]/.test(el.getAttribute("aria-label"))) {
      el.setAttribute("aria-label", toUiEnglish(el.getAttribute("aria-label"), "Control"));
    }
    if ((el.tagName === "INPUT" || el.tagName === "BUTTON") && el.value && /[\u3400-\u9fff]/.test(el.value)) {
      el.value = toUiEnglish(el.value, el.tagName === "BUTTON" ? "Run" : "Value");
    }
    if (el.children.length === 0 && el.textContent && /[\u3400-\u9fff]/.test(el.textContent)) {
      const fallback = el.tagName === "BUTTON" ? "Run" : el.tagName === "OPTION" ? "Option" : "";
      el.textContent = toUiEnglish(el.textContent, fallback);
    }
  });
}

function scheduleToolUiLocalization(root) {
  if (!root || state.lang === "zh") return;
  const delays = [0, 120, 350, 800, 1500, 3000, 5000];
  delays.forEach((d) =>
    setTimeout(() => {
      if (!root.isConnected || state.lang === "zh") return;
      localizeToolUiText(root);
      sweepToolUiEnglish(root);
      enhanceFileInputsForLocale(root);
    }, d),
  );
}

function enhanceFileInputsForLocale(root) {
  if (!root) return;
  const isZh = state.lang === "zh";
  root.querySelectorAll('input[type="file"]').forEach((input) => {
    let wrap = input.nextElementSibling;
    if (!wrap || !wrap.classList?.contains("file-picker")) {
      input.style.display = "none";
      wrap = document.createElement("div");
      wrap.className = "file-picker";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn--ghost";
      btn.dataset.fileBtn = "1";
      btn.onclick = () => input.click();

      const name = document.createElement("span");
      name.className = "file-picker__name";
      name.dataset.fileName = "1";

      input.addEventListener("change", () => {
        const zhNow = state.lang === "zh";
        const files = [...(input.files || [])];
        if (!files.length) {
          name.textContent = zhNow ? "未选择文件" : "No file chosen";
        } else if (files.length === 1) {
          name.textContent = files[0].name;
        } else {
          name.textContent = zhNow ? `已选择 ${files.length} 个文件` : `${files.length} files selected`;
        }
      });

      wrap.append(btn, name);
      input.insertAdjacentElement("afterend", wrap);
    }
    const btnNode = wrap.querySelector("[data-file-btn]");
    const nameNode = wrap.querySelector("[data-file-name]");
    if (btnNode) btnNode.textContent = isZh ? (input.multiple ? "选择文件" : "选择文件") : input.multiple ? "Choose files" : "Choose file";
    if (nameNode && !(input.files && input.files.length)) nameNode.textContent = isZh ? "未选择文件" : "No file chosen";
  });
}

let toolUiObserver = null;
function observeToolUiLocalization(root) {
  if (toolUiObserver) {
    toolUiObserver.disconnect();
    toolUiObserver = null;
  }
  if (!root || state.lang === "zh" || typeof MutationObserver === "undefined") return;
  let queued = false;
  const runSweep = () => {
    queued = false;
    if (!root.isConnected || state.lang === "zh") return;
    localizeToolUiText(root);
    sweepToolUiEnglish(root);
    enhanceFileInputsForLocale(root);
  };
  toolUiObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "childList") {
        m.addedNodes.forEach((n) => {
          if (n && n.nodeType === 1) {
            localizeToolUiText(n);
            sweepToolUiEnglish(n);
            enhanceFileInputsForLocale(n);
          }
          if (n && n.nodeType === 3 && /[\u4e00-\u9fa5]/.test(n.nodeValue || "")) {
            n.nodeValue = toUiEnglish(n.nodeValue || "", "");
          }
        });
      } else if (m.type === "characterData") {
        const v = m.target?.nodeValue || "";
        if (/[\u4e00-\u9fa5]/.test(v)) m.target.nodeValue = zhToEnText(v);
      }
    }
    if (!queued) {
      queued = true;
      queueMicrotask(runSweep);
    }
  });
  toolUiObserver.observe(root, { childList: true, subtree: true, characterData: true });
}

function getCurrentToolId() {
  const p = new URLSearchParams(window.location.search);
  const fromQuery = p.get("tool") || "";
  if (fromQuery) return fromQuery;
  const match = window.location.pathname.match(/^\/tool\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : "";
}

function setCurrentTool(id, push = true) {
  const url = new URL(window.location.href);
  if (id) {
    url.pathname = `/tool/${encodeURIComponent(id)}/`;
    url.searchParams.delete("tool");
  } else {
    url.pathname = "/";
    url.search = "";
  }
  if (push) window.history.pushState({}, "", url);
  else window.history.replaceState({}, "", url);
  render();
}

function getFilteredTools() {
  const q = state.query.trim().toLowerCase();
  return tools.filter((t) => {
    const catOk = state.category === "全部" || t.category === state.category;
    if (!catOk) return false;
    if (!q) return true;
    return `${t.title} ${t.description} ${t.category} ${localizeToolTitle(t)} ${localizeToolDescription(t)} ${localizeCategory(t.category)}`
      .toLowerCase()
      .includes(q);
  });
}

function renderChips(filteredTools) {
  const categories = ["全部", ...new Set(tools.map((t) => t.category))];
  const counts = new Map();
  categories.forEach((cat) => {
    counts.set(
      cat,
      cat === "全部" ? filteredTools.length : filteredTools.filter((t) => t.category === cat).length,
    );
  });

  dom.categoryChips.innerHTML = "";
  categories.forEach((cat) => {
    const b = document.createElement("button");
    b.className = `chip${cat === state.category ? " active" : ""}`;
    const label = cat === "全部" ? t("all") : localizeCategory(cat);
    b.textContent = `${label} (${counts.get(cat)})`;
    b.onclick = () => {
      state.category = cat;
      render();
    };
    dom.categoryChips.append(b);
  });
}

function renderOverview() {
  const filtered = getFilteredTools();
  dom.resultCount.textContent = t("toolsCount", filtered.length);
  renderChips(filtered);

  const grouped = new Map();
  filtered.forEach((t) => {
    if (!grouped.has(t.category)) grouped.set(t.category, []);
    grouped.get(t.category).push(t);
  });

  dom.directory.innerHTML = "";
  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "category-block";
    empty.textContent = t("noMatch");
    dom.directory.append(empty);
    return;
  }

  const orderedCats = [
    "文档办公",
    "图像工具",
    "视频工具",
    "可视化",
    "开发工具",
    "音频工具",
    "设计工具",
    "金融理财",
    "安全工具",
    "AI工具",
    "编码与数据",
    "文本处理",
    "时间与随机",
    "单位转换",
    "生活计算",
  ];
  const cats = [...orderedCats.filter((c) => grouped.has(c)), ...[...grouped.keys()].filter((c) => !orderedCats.includes(c))];

  cats.forEach((cat) => {
    const block = document.createElement("section");
    block.className = "category-block";

    const head = document.createElement("div");
    head.className = "category-head";
    const title = document.createElement("h2");
    title.textContent = localizeCategory(cat);
    const count = document.createElement("span");
    count.textContent = t("toolsCount", grouped.get(cat).length);
    head.append(title, count);

    const list = document.createElement("div");
    list.className = "tool-list";

    grouped.get(cat).forEach((tool) => {
      const node = dom.toolCardTemplate.content.cloneNode(true);
      const titleNode = node.querySelector("[data-tool-title]");
      titleNode.textContent = localizeToolTitle(tool);
      titleNode.onclick = () => setCurrentTool(tool.id, true);
      node.querySelector("[data-tool-desc]").textContent = localizeToolDescription(tool);
      list.append(node);
    });

    block.append(head, list);
    dom.directory.append(block);
  });
}

function renderDetail(tool) {
  dom.detailCategory.textContent = localizeCategory(tool.category);
  dom.detailTitle.textContent = localizeToolTitle(tool);
  dom.detailDesc.textContent = localizeToolDescription(tool);
  dom.detailToolUI.innerHTML = "";
  tool.builder(dom.detailToolUI);
  enhanceFileInputsForLocale(dom.detailToolUI);
  localizeToolUiText(dom.detailToolUI);
  sweepToolUiEnglish(dom.detailToolUI);
  scheduleToolUiLocalization(dom.detailToolUI);
  observeToolUiLocalization(dom.detailToolUI);
  renderToolDoc(tool);
}

function render() {
  const currentToolId = getCurrentToolId();
  const tool = toolMap.get(currentToolId);

  if (tool) {
    dom.overviewPage.classList.add("hidden");
    dom.detailPage.classList.remove("hidden");
    renderDetail(tool);
    updateSeo(tool);
  } else {
    dom.detailPage.classList.add("hidden");
    dom.overviewPage.classList.remove("hidden");
    renderOverview();
    updateSeo(null);
  }
}

dom.searchInput.addEventListener("input", (e) => {
  state.query = e.target.value;
  if (getCurrentToolId()) setCurrentTool("", true);
  else render();
});

dom.clearSearch.addEventListener("click", () => {
  state.query = "";
  dom.searchInput.value = "";
  if (getCurrentToolId()) setCurrentTool("", true);
  else render();
});

dom.langSelect.addEventListener("change", (e) => {
  const allowed = new Set(["en", "zh", "ja", "ko", "ru"]);
  const next = allowed.has(e.target.value) ? e.target.value : "en";
  state.lang = next;
  localStorage.setItem(LANG_STORAGE_KEY, next);
  applyLocale();
  render();
});

dom.backToList.addEventListener("click", () => setCurrentTool("", true));
window.addEventListener("popstate", () => render());

applyLocale();
initVisitCounter();
render();
