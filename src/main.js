"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const config_1 = require("./core/config");
const generater_1 = __importDefault(require("./core/generater"));
const parse_1 = require("./static_sdk/utils/parse");
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.request.header.port = ctx.host.substring(ctx.host.indexOf(":") + 1, ctx.host.length);
    yield next();
}));
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.set("Local-Server-Port", String(config_1.config.SERVER.BASE.PORT));
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    ctx.set("Access-Control-Allow-Headers", "Content-Type");
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Access-Control-Request-Headers", "ETag, Accept, Accept-Language, Content-Language, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type");
    if (ctx.request.method === "OPTIONS") {
        ctx.response.status = 204;
        return false;
    }
    if (ctx.request.url === "/favicon.ico") {
        ctx.response.status = 204;
        return false;
    }
    // Logs.PointPageView(ctx);
    yield next();
}));
router.get("/sdk", (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield next();
    // await loadCtrltrols(ctx)
    const path = ctx.path.replace(/\//g, "");
    const modules = (0, parse_1.parseModule)(ctx.querystring);
    ctx.set("Content-Type", "text/javascript; charset=UTF-8");
    ctx.body = generater_1.default.JsGen.build(modules);
}));
app.use(router.routes()).use(router.allowedMethods());
app.listen(config_1.config.SERVER.BASE.PORT, config_1.config.SERVER.BASE.HOST, 1, () => {
    console.log(`* listening base server ::: http://${config_1.config.SERVER.BASE.PORT}:${config_1.config.SERVER.BASE.HOST}`);
});
