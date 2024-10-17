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
exports.SlotServices = void 0;
var http_status_1 = __importDefault(require("http-status"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
var service_model_1 = require("../service/service.model");
var slot_util_1 = require("./slot.util");
var slot_model_1 = require("./slot.model");
var QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
var createSlotsIntoDB = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var service, existingSlots, slots, slotDocs, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, service_model_1.Service.findById(payload.service)];
            case 1:
                service = _a.sent();
                if (!service) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found!");
                }
                return [4 /*yield*/, slot_model_1.Slot.find({
                        service: payload.service,
                        date: payload.date
                    })];
            case 2:
                existingSlots = _a.sent();
                if ((0, slot_util_1.convertTimeToMinutes)(payload.startTime) > (0, slot_util_1.convertTimeToMinutes)(payload.endTime)) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Start time cannot be later than end time");
                }
                existingSlots.forEach(function (existingSlot) {
                    if ((0, slot_util_1.convertTimeToMinutes)(existingSlot.startTime) < (0, slot_util_1.convertTimeToMinutes)(payload.endTime) && (0, slot_util_1.convertTimeToMinutes)(existingSlot.endTime) > (0, slot_util_1.convertTimeToMinutes)(payload.startTime)) {
                        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Slot(s) already exists in the given interval");
                    }
                });
                slots = (0, slot_util_1.createSlots)(payload.startTime, payload.endTime, service.duration);
                slotDocs = slots.map(function (slot) { return ({
                    service: payload.service,
                    date: payload.date,
                    startTime: slot.start,
                    endTime: slot.end,
                    isBooked: 'available'
                }); });
                return [4 /*yield*/, slot_model_1.Slot.insertMany(slotDocs)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getAvailableSlotsFromDB = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var availableSlotsQuery, availableSlots, refinedAvailableSlots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                availableSlotsQuery = new QueryBuilder_1.default(slot_model_1.Slot.find({ isBooked: 'available' }).populate('service'), query).filter();
                return [4 /*yield*/, availableSlotsQuery.modelQuery];
            case 1:
                availableSlots = _a.sent();
                refinedAvailableSlots = availableSlots.filter(function (slot) { return slot.service !== null; });
                return [2 /*return*/, refinedAvailableSlots];
        }
    });
}); };
var getAllSlotsFromDB = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var slotsQuery, slots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slotsQuery = new QueryBuilder_1.default(slot_model_1.Slot.find(), query).filter();
                return [4 /*yield*/, slotsQuery.modelQuery];
            case 1:
                slots = _a.sent();
                return [2 /*return*/, slots];
        }
    });
}); };
var getSlotByIdFromDB = function (slotId) { return __awaiter(void 0, void 0, void 0, function () {
    var slot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, slot_model_1.Slot.findById(slotId).populate('service')];
            case 1:
                slot = _a.sent();
                return [2 /*return*/, slot];
        }
    });
}); };
var updateSlotStatusIntoDB = function (slotId, status) { return __awaiter(void 0, void 0, void 0, function () {
    var slot, updatedSlot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, slot_model_1.Slot.findById(slotId)];
            case 1:
                slot = _a.sent();
                if (!slot) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot not found");
                }
                if (slot.isBooked === 'booked') {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Booked slot status cannot be changed");
                }
                return [4 /*yield*/, slot_model_1.Slot.findByIdAndUpdate(slotId, { isBooked: status }, { new: true })];
            case 2:
                updatedSlot = _a.sent();
                return [2 /*return*/, updatedSlot];
        }
    });
}); };
exports.SlotServices = {
    createSlotsIntoDB: createSlotsIntoDB,
    getAvailableSlotsFromDB: getAvailableSlotsFromDB,
    getAllSlotsFromDB: getAllSlotsFromDB,
    getSlotByIdFromDB: getSlotByIdFromDB,
    updateSlotStatusIntoDB: updateSlotStatusIntoDB
};
