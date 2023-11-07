import http from 'http';
import mongoose from 'mongoose'
import { normalizePort, errorHandlerPort } from './src/helpers';
import express from "./src/services/express";
import { PORT, root, MONGODB_URL } from "./src/config";
import routes from "./src/routes";

const port = normalizePort(PORT);
const app = express(root, routes);
const server = http.createServer(app);

mongoose.connect(MONGODB_URL, {})
mongoose.Promise = Promise

setImmediate(() => {
    server.listen(port, () => console.log(`Listening on ${port}`))
})

export default app