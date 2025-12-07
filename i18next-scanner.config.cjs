const typescriptTransform = require('i18next-scanner-typescript')

module.exports = {
    input: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.{spec,test}.{js,jsx,ts,tsx}',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
    ],
    output: './public/locales',
    options: {
        debug: false,
        removeUnusedKeys: false,
        sort: true,
        attr: {
            list: ['data-i18n'],
            extensions: ['.html', '.htm'],
        },
        func: {
            list: ['t', 'i18next.t', 'i18n.t'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        trans: {
            component: 'Trans',
            i18nKey: 'i18nKey',
            defaultsKey: 'defaults',
            extensions: ['.js', '.jsx'],
            fallbackKey: function(ns, value) {
                return value
            },
        },
        lngs: ['en', 'ru'],
        ns: ['common', 'auth'],
        defaultLng: 'en',
        defaultNs: 'common',
        defaultValue: function(lng, ns, key) {
            return key.split('.').pop() || key
        },
        resource: {
            loadPath: '{{lng}}/{{ns}}.json',
            savePath: '{{lng}}/{{ns}}.json',
            jsonIndent: 2,
            lineEnding: '\n',
        },
        nsSeparator: ':',
        keySeparator: '.',
        interpolation: {
            prefix: '{{',
            suffix: '}}',
        },
    },
    transform: typescriptTransform(
        {
            extensions: [".ts", ".tsx"],
            tsOptions: {
                target: "es2020",
            },
        },
    ),
}
