"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knife4jSetup = knife4jSetup;
const node_path_1 = require("node:path");
const static_1 = require("@fastify/static");
async function knife4jSetup(app, services) {
    const httpAdapter = app.getHttpAdapter().getType();
    if (!['express', 'fastify'].includes(httpAdapter)) {
        throw new Error('http adapter only supported express and fastify');
    }
    if (httpAdapter === 'express') {
        let expressStatic;
        try {
            expressStatic = await Promise.resolve().then(() => require('express')).then((mod) => mod.static);
        }
        catch (error) {
            throw new Error('Express is not installed');
        }
        app.use('/', expressStatic((0, node_path_1.resolve)(__dirname, '../public/')));
        app.use('/services.json', (_, res) => {
            res.send(services);
        });
        return;
    }
    const fastifyInstance = app.getHttpAdapter().getInstance();
    fastifyInstance.register(static_1.default, {
        root: (0, node_path_1.join)(__dirname, '../public'),
        prefix: '/',
        decorateReply: false,
    });
    fastifyInstance.get('/services.json', (_, repl) => {
        repl.send(services);
    });
}
//# sourceMappingURL=index.js.map