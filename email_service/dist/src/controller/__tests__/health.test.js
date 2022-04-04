"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
const database_1 = require("../../database");
describe('GET /health - a simple api endpoint', () => {
    beforeAll(async () => {
        await database_1.Database.getInstance().Connect();
    });
    afterAll(async () => {
        await database_1.Database.getInstance().Close();
    });
    it('Health API Request', async () => {
        const result = await (0, supertest_1.default)(server_1.app).get('/api/v1');
        expect(result.statusCode).toEqual(200);
        expect(result.body.status).toBe('OK');
        expect(result.body.data.status).toBe('running');
        expect(result.body.error).toBe(null);
    });
});
//# sourceMappingURL=health.test.js.map