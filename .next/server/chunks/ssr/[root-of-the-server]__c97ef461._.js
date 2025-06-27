module.exports = {

"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}}),
"[externals]/styled-components [external] (styled-components, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("styled-components", () => require("styled-components"));

module.exports = mod;
}}),
"[project]/src/styles/theme.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "theme": (()=>theme)
});
const theme = {
    colors: {
        primary: '#1c6e8c',
        primaryHighlight: '#a7acd9',
        secondary: '#d62246',
        black: '#3e363f',
        white: '#fffce8'
    },
    breakpoints: {
        mobile: '600px'
    },
    transitions: {
        default: '0.3s ease',
        transform: '0.5s'
    }
};
}}),
"[project]/src/styles/GlobalStyle.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GlobalStyle": (()=>GlobalStyle)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
;
const GlobalStyle = __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["createGlobalStyle"]`
  html {
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    overscroll-behavior-y: none;

    @media screen and (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme })=>theme.colors.black};
    font-family: 'Inter', 'Roboto', 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, system-ui, sans-serif;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
    font-variation-settings: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  .emoji {
    padding-left: 1vw;
    font-size: 170px;
    align-self: center;
  }

  h1 {
    font-family: 'Geist', 'Inter', system-ui, sans-serif;
    font-size: 10vw;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    
    @media only screen and (max-width: ${({ theme })=>theme.breakpoints.mobile}) {
      padding-top: 0 !important;
      font-size: 12vw;
    }
  }

  h2 {
    font-family: 'Geist', 'Inter', system-ui, sans-serif;
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  h3 {
    font-family: 'Geist', 'Inter', system-ui, sans-serif;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  h1,
  h2,
  h3 {
    padding-left: 7vw;
    margin-top: 0;
  }

  p {
    max-width: 800px;
    text-align: justify;
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: -0.005em;
    font-size: 1.1rem;
    
    @media only screen and (max-width: ${({ theme })=>theme.breakpoints.mobile}) {
      font-size: 1rem;
      text-align: left;
    }
  }

  a,
  a:visited,
  a:hover,
  a:active,
  a:focus {
    text-decoration: none;
    color: ${({ theme })=>theme.colors.primary};
    text-shadow: none;
  }

  a {
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 1px,
      ${({ theme })=>theme.colors.primary} 1px,
      ${({ theme })=>theme.colors.primary} 2px,
      rgba(0, 0, 0, 0) 2px
    );
  }
`;
}}),
"[externals]/@fortawesome/fontawesome-svg-core [external] (@fortawesome/fontawesome-svg-core, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@fortawesome/fontawesome-svg-core");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@fortawesome/free-solid-svg-icons [external] (@fortawesome/free-solid-svg-icons, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@fortawesome/free-solid-svg-icons");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@fortawesome/free-brands-svg-icons [external] (@fortawesome/free-brands-svg-icons, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@fortawesome/free-brands-svg-icons");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/utils/fontawesome.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$fontawesome$2d$svg$2d$core__$5b$external$5d$__$2840$fortawesome$2f$fontawesome$2d$svg$2d$core$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@fortawesome/fontawesome-svg-core [external] (@fortawesome/fontawesome-svg-core, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@fortawesome/free-solid-svg-icons [external] (@fortawesome/free-solid-svg-icons, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@fortawesome/free-brands-svg-icons [external] (@fortawesome/free-brands-svg-icons, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$fontawesome$2d$svg$2d$core__$5b$external$5d$__$2840$fortawesome$2f$fontawesome$2d$svg$2d$core$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$fontawesome$2d$svg$2d$core__$5b$external$5d$__$2840$fortawesome$2f$fontawesome$2d$svg$2d$core$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$fontawesome$2d$svg$2d$core__$5b$external$5d$__$2840$fortawesome$2f$fontawesome$2d$svg$2d$core$2c$__esm_import$29$__["config"].autoAddCss = false;
// Prevent FontAwesome from dynamically adding its CSS since we're importing it above
__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$fontawesome$2d$svg$2d$core__$5b$external$5d$__$2840$fortawesome$2f$fontawesome$2d$svg$2d$core$2c$__esm_import$29$__["config"].keepOriginalSource = false;
// Ensure consistent server/client rendering
__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$fontawesome$2d$svg$2d$core__$5b$external$5d$__$2840$fortawesome$2f$fontawesome$2d$svg$2d$core$2c$__esm_import$29$__["config"].showMissingIcons = false;
__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$fontawesome$2d$svg$2d$core__$5b$external$5d$__$2840$fortawesome$2f$fontawesome$2d$svg$2d$core$2c$__esm_import$29$__["library"].add(__TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__["faAt"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__["faStar"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__["faCodeBranch"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__["faSpinner"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2c$__esm_import$29$__["faExternalLinkAlt"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__["faGithubSquare"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__["faLinkedin"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__["faTwitterSquare"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__["faTwitch"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__["faDiscord"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__["faFacebookSquare"], __TURBOPACK__imported__module__$5b$externals$5d2f40$fortawesome$2f$free$2d$brands$2d$svg$2d$icons__$5b$external$5d$__$2840$fortawesome$2f$free$2d$brands$2d$svg$2d$icons$2c$__esm_import$29$__["faGithub"]);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/_app.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>App)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-components [external] (styled-components, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$theme$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/styles/theme.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$GlobalStyle$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/styles/GlobalStyle.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$fontawesome$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/fontawesome.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$fontawesome$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$fontawesome$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
function App({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$components__$5b$external$5d$__$28$styled$2d$components$2c$__cjs$29$__["ThemeProvider"], {
        theme: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$theme$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["theme"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$GlobalStyle$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["GlobalStyle"], {}, void 0, false, {
                fileName: "[project]/pages/_app.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
                ...pageProps
            }, void 0, false, {
                fileName: "[project]/pages/_app.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/_app.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__c97ef461._.js.map