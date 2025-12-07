/** @type {import('stylelint').Config} */
export default {
    extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recess-order",
    ],
    plugins: [
        "stylelint-scss",
        "stylelint-order"
    ]
}