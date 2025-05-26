// deno-lint-ignore-file no-explicit-any
import { Database } from "@db/sqlite";
import * as oak from "jsr:@oak/oak";
import * as path from "@std/path";
import { Port } from "../lib/utils/index.ts";
import listInsights from "./operations/list-insights.ts";
import lookupInsight from "./operations/lookup-insight.ts";
import createInsight from "./operations/create-insights.ts";
import deleteInsight from "./operations/delete-insight.ts";

console.log("Loading configuration");

const env = {
  port: Port.parse(Deno.env.get("SERVER_PORT")),
};

const dbFilePath = path.resolve("tmp", "db.sqlite3");

console.log(`Opening SQLite database at ${dbFilePath}`);

await Deno.mkdir(path.dirname(dbFilePath), { recursive: true });
const db = new Database(dbFilePath);

console.log("Initialising server");

const router = new oak.Router();

router.get("/_health", (ctx) => {
  ctx.response.body = "OK";
  ctx.response.status = 200;
});

router.get("/insights", (ctx) => {
  const result = listInsights({ db });
  ctx.response.body = JSON.stringify({ insights: result });
  ctx.response.status = result.length > 0 ? 200 : 404;
});

router.get("/insights/:id", (ctx) => {
  const params = ctx.params as Record<string, any>;
  const result = lookupInsight({ db, id: params.id });
  if (result?.id) {
    ctx.response.body = {
      status: 200,
      item: result,
    };
    ctx.response.status = 200;
  } else {
    ctx.response.body = {
      status: 404,
      msg: `Insight not found ${params.id}`,
    };
    ctx.response.status = 404;
  }
});

router.post("/insights/create", async (ctx) => {
  const item = await ctx.request.body.json();
  const result = await createInsight({ db, item });
  if (result.length === 1) {
    ctx.response.body = {
      status: 201,
      msg: `Insight ${result[0].id} created Successfully`,
      item: result[0],
    };
    ctx.response.status = 201;
  } else {
    ctx.response.body = {
      status: 400,
      msg: result,
    };
    ctx.response.status = 400;
  }
});

router.delete("/insights/delete/:id", async (ctx) => {
  const params = ctx.params as Record<string, any>;
  const result = await deleteInsight({ db, id: parseInt(params.id) });
  if (result) {
    ctx.response.body = { status: 200, msg: "Deleted Successfully" };
    ctx.response.status = 200;
  } else {
    ctx.response.body = { status: 500, msg: "Deletion Failed" };
    ctx.response.status = 500;
  }
});

const app = new oak.Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env);
console.log(`Started server on port ${env.port}`);
