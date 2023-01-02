const Koa = require("koa");
const { koaBody } = require("koa-body");
const cors = require("@koa/cors");
const { faker } = require("@faker-js/faker");

const app = new Koa();
app.use(koaBody());
app.use(cors());

// Logger
app.use(async (ctx, next) => {
  await next();

  console.log(`Method: ${ctx.method}  URL: ${ctx.url} `);
  console.log(ctx.request);
});

app.use(async (ctx) => {
  if (ctx.url === "/messages/unread" && ctx.method === "GET") {
    
    const count = faker.datatype.number({ min: 1, max: 3 });
    const messages = Array.from({ length: count }, generateMessage);

    ctx.response.body = {
      status: "ok",
      timestamp: new Date().getTime(),
      messages,
    };
  } else {
    ctx.response.status = 404;
  }
});

app.listen(3000);

const generateMessage = () => ({
  id: faker.datatype.uuid(),
  from: faker.internet.email(),
  subject: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  received: faker.date.past(),
});
