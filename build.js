const fs = require('fs-extra');
const concat = require('concat');
const componentPath = './dist/angular-creatio-visa-cost-component-v2/vlt-summary-visa-cost-component.js';

(async function build() {
    const files = [
        './dist/angular-creatio-visa-cost-component-v2/runtime.js',
        './dist/angular-creatio-visa-cost-component-v2/polyfills.js',
        './dist/angular-creatio-visa-cost-component-v2/main.js',
    ].filter((x) => fs.pathExistsSync(x));
    await fs.ensureFile(componentPath);
    await concat(files, componentPath);
})();
