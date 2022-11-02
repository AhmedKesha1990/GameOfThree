"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_1 = require("http");
const routing_controllers_1 = require("routing-controllers");
const socket_io_1 = require("socket.io");
const controllers_1 = require("@src/controllers");
const app_data_source_1 = require("@src/app-data-source");
const socket_controllers_1 = require("socket-controllers");
app_data_source_1.DB.initialize();
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [controllers_1.PlayerController, controllers_1.GameController],
    validation: true
});
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
(0, socket_controllers_1.useSocketServer)(io, {
    controllers: [controllers_1.PlayerController, controllers_1.GameController],
});
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map