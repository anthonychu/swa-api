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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDb = void 0;
var mongodb_1 = require("mongodb");
var constants_1 = __importDefault(require("./constants"));
var MongoDb = /** @class */ (function () {
    function MongoDb() {
    }
    MongoDb.getConnectionString = function () {
        return process.env[constants_1.default.mongoConnectionStringSettingName];
    };
    MongoDb.initializeClient = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, databaseName, database;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Initializing database...");
                        connectionString = this.getConnectionString();
                        if (!connectionString) {
                            throw "MongoDB connection string is missing.";
                        }
                        this.client = new mongodb_1.MongoClient(connectionString, { useUnifiedTopology: true });
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _b.sent();
                        databaseName = (_a = process.env[constants_1.default.mongoDatabaseNameSettingName]) !== null && _a !== void 0 ? _a : constants_1.default.mongoDefaultDatabaseName;
                        database = this.client.db(databaseName);
                        console.log("Database initialized");
                        return [2 /*return*/, database];
                }
            });
        });
    };
    MongoDb.getClient = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.skipDatabase)
                            return [2 /*return*/];
                        if (!this.getConnectionString()) {
                            this.skipDatabase = true;
                            console.warn("No connection string found. Skipping database.");
                            return [2 /*return*/];
                        }
                        if (!this.initializeTask) {
                            this.initializeTask = this.initializeClient();
                        }
                        _a = SimpleMongoDatabase.bind;
                        return [4 /*yield*/, this.initializeTask];
                    case 1: return [2 /*return*/, new (_a.apply(SimpleMongoDatabase, [void 0, _b.sent(), user]))()];
                }
            });
        });
    };
    MongoDb.skipDatabase = false;
    return MongoDb;
}());
exports.MongoDb = MongoDb;
var SimpleMongoDatabase = /** @class */ (function () {
    function SimpleMongoDatabase(mongoDb, user) {
        this.mongoDb = mongoDb;
        this.user = user;
    }
    SimpleMongoDatabase.prototype.collection = function (name) {
        return new SimpleMongoCollection(this.mongoDb.collection(name), this.user);
    };
    return SimpleMongoDatabase;
}());
var SimpleMongoCollection = /** @class */ (function () {
    function SimpleMongoCollection(mongoCollection, user) {
        this.mongoCollection = mongoCollection;
        this.user = user;
    }
    SimpleMongoCollection.prototype.insertDocument = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (doc._id) {
                            doc._id = new mongodb_1.ObjectId(doc._id);
                        }
                        this.addAuditInfo(doc);
                        return [4 /*yield*/, this.mongoCollection.insertOne(doc)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.insertedId.toString()];
                }
            });
        });
    };
    SimpleMongoCollection.prototype.replaceDocument = function (doc) {
        return __awaiter(this, void 0, void 0, function () {
            var _id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!doc._id) {
                            throw new Error("Replacement document must contain _id.");
                        }
                        _id = new mongodb_1.ObjectId(doc._id);
                        this.addAuditInfo(doc);
                        delete doc._id;
                        return [4 /*yield*/, this.mongoCollection.replaceOne({ _id: _id }, doc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SimpleMongoCollection.prototype.deleteDocument = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mongoCollection.deleteOne({ _id: new mongodb_1.ObjectId(_id) })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SimpleMongoCollection.prototype.getDocument = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mongoCollection.findOne({ _id: new mongodb_1.ObjectId(_id) })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SimpleMongoCollection.prototype.findDocuments = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoQuery, cursor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongoQuery = query !== null && query !== void 0 ? query : {};
                        return [4 /*yield*/, this.mongoCollection.find(mongoQuery, options)];
                    case 1:
                        cursor = _a.sent();
                        return [2 /*return*/, cursor.toArray()];
                }
            });
        });
    };
    SimpleMongoCollection.prototype.addAuditInfo = function (doc) {
        var _a, _b;
        doc._userId = (_a = this.user) === null || _a === void 0 ? void 0 : _a.userId;
        doc._userDetails = (_b = this.user) === null || _b === void 0 ? void 0 : _b.userDetails;
        doc._updated = new Date().getTime();
    };
    return SimpleMongoCollection;
}());
