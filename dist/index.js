"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knife4jSetup = knife4jSetup;
const node_path_1 = require("node:path");
async function knife4jSetup(app, services, fastifyStatic) {
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
    if (!fastifyStatic) {
        throw new Error('@fastify/static is not installed please install it first');
    }
    const fastifyInstance = app.getHttpAdapter().getInstance();
    fastifyInstance.register(fastifyStatic, {
        root: (0, node_path_1.join)(__dirname, '../public'),
        prefix: '/',
        decorateReply: false,
    });
    fastifyInstance.get('/services.json', (_, repl) => {
        repl.send(services);
    });
}
//# sourceMappingURL=index.js.map