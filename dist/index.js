"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knife4jSetup = knife4jSetup;
const express_1 = require("express");
const fastify = require("fastify");
const node_path_1 = require("node:path");
function knife4jSetup(app, services) {
    const httpAdapter = app.getHttpAdapter().getType();
    if (!['express', 'fastify'].includes(httpAdapter)) {
        throw new Error('http adapter only supported express and fastify');
    }
    if (httpAdapter === 'express') {
        app.use('/', (0, express_1.static)((0, node_path_1.resolve)(__dirname, '../public/')));
        app.use('/services.json', (_, res) => {
            res.send(services);
        });
        return;
    }
    const fastifyInstance = fastify();
    fastifyInstance.register(require('@fastify/static'), {
        root: (0, node_path_1.join)(__dirname, 'public'),
        prefix: '/',
    });
    fastifyInstance.get('/services.json', (_, repl) => {
        repl.send(services);
    });
}
//# sourceMappingURL=index.js.map