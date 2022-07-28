import Koa from "koa";
import koaRouter from "koa-router";
import { config } from "./config";
import generater from "./core/generater";
import { parseModule } from "./utils/parse";

const app = new Koa();
const router = new koaRouter();


app.use(async (ctx, next) => {
  ctx.request.header.port = ctx.host.substring(
    ctx.host.indexOf(":") + 1,
    ctx.host.length
  );
  await next();
});

app.use(async (ctx, next) => {
  ctx.set("Local-Server-Port", String(config.SERVER.BASE.PORT));
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  ctx.set("Access-Control-Allow-Headers", "Content-Type");
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set(
    "Access-Control-Request-Headers",
    "ETag, Accept, Accept-Language, Content-Language, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type"
  );

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return false;
  }

  if (ctx.request.url === "/favicon.ico") {
    ctx.response.status = 204;
    return false;
  }

  // Logs.PointPageView(ctx);
  await next();
});

router.get("/sdk", async (ctx, next) => {
  await next();
  const path = ctx.path.replace(/\//g, "");
  const modules = parseModule(ctx.querystring);
  console.log('modules', modules);

  ctx.set("Content-Type", "text/javascript; charset=UTF-8");
  ctx.body = generater.sdkGen.build(modules);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.SERVER.BASE.PORT, config.SERVER.BASE.HOST, 1, () => {
  console.log(`* listening base server ::: http://${config.SERVER.BASE.PORT}:${config.SERVER.BASE.HOST}`);
});
