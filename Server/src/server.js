import { createServer } from "node:http";
import app from "./app.js";
import DbConnection from "./config/database.js";
import connectToSocket from "./config/socket.js";
import repoify from "repoify";

// const PORT = process.env.PORT || 3000;

const PORT = 4622;
const server = createServer(app);
connectToSocket(server);

repoify();

server.listen(PORT, async () => {
  console.log(`Server is running at localhost:${PORT}`);
  await DbConnection();
});
