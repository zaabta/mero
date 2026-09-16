module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var e = new Error("Could not parse module '[project]/src/app/page.tsx', file not found");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/i18n.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dictionaries",
    ()=>dictionaries,
    "getDictionary",
    ()=>getDictionary
]);
const dictionaries = {
    ar: {
        products: 'المنتجات',
        about: 'من نحن',
        brands: 'العلامات التجارية',
        contact: 'تواصل معنا'
    },
    en: {
        products: 'Products',
        about: 'About',
        brands: 'Brands',
        contact: 'Contact'
    }
};
function getDictionary(locale = 'ar') {
    return dictionaries[locale];
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1n13swk._.js.map