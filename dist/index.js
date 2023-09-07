"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var post_1 = require("./routes/post");
var user_1 = require("./routes/user");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use('/user', user_1.routerUser);
app.use('/post', post_1.routerPost);
app.listen(PORT, function () {
    console.log("Listening on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map