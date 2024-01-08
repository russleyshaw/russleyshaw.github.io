import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import markdown from "highlight.js/lib/languages/markdown";
import javascript from "highlight.js/lib/languages/javascript";

import "highlight.js/styles/github-dark.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("markdown", markdown);
