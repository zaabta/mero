(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__0-coz6q._.js",
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n.ts [middleware-edge] (ecmascript)");
;
;
function middleware(request) {
    const pathname = request.nextUrl.pathname;
    if (pathname === '/') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["defaultLocale"]}`, request.url));
    const locale = pathname.split('/')[1];
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["isLocale"])(locale)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    const headers = new Headers(request.headers);
    headers.set('x-locale', locale);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers
        }
    });
}
const config = {
    matcher: [
        '/((?!_next|api|favicon.ico).*)'
    ]
};
}),
"[project]/src/lib/i18n.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultLocale",
    ()=>defaultLocale,
    "dictionaries",
    ()=>dictionaries,
    "getDictionary",
    ()=>getDictionary,
    "isLocale",
    ()=>isLocale
]);
const defaultLocale = 'ar';
function isLocale(value) {
    return value === 'ar' || value === 'en';
}
const dictionaries = {
    ar: {
        products: 'المنتجات',
        about: 'من نحن',
        brands: 'العلامات التجارية',
        contact: 'تواصل معنا',
        home: 'الرئيسية',
        language: 'اللغة'
    },
    en: {
        products: 'Products',
        about: 'About',
        brands: 'Brands',
        contact: 'Contact',
        home: 'Home',
        language: 'Language'
    }
};
function getDictionary(locale = 'ar') {
    return dictionaries[locale];
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0-coz6q._.js.map