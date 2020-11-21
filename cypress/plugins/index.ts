// cypress/plugins/index.ts

/// <reference types="cypress" />

const cucumber = require('cypress-cucumber-preprocessor').default;
const browserify = require('@cypress/browserify-preprocessor');
const resolve = require('resolve');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
    const options = {
        ...browserify.defaultOptions,
        typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
    };

    on('file:preprocessor', cucumber(options));
}
