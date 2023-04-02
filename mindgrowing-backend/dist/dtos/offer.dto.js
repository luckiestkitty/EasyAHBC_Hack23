"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const swagger_1 = require("@nestjs/swagger");
class Offer {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Unique offerID',
        example: 'ID-JDJKVFO',
    }),
    __metadata("design:type", String)
], Offer.prototype, "offerID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Account address of the seller',
        example: '0x0160ceDB6cae2EAd33F5c2fa25FE078485a07b63',
    }),
    __metadata("design:type", String)
], Offer.prototype, "sellerAccount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'The max amount of electricity in kWh a seller can offer',
        example: '100',
    }),
    __metadata("design:type", Number)
], Offer.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'The price in $/kWh of this offer',
        example: '0.35',
    }),
    __metadata("design:type", Number)
], Offer.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'The location/address of this offer',
        example: '13021 20 Ave SW, Edmonton, Alberta, Canada',
    }),
    __metadata("design:type", String)
], Offer.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'The UNIX timestamp when seller submit this offer',
        example: '1679183555',
    }),
    __metadata("design:type", Number)
], Offer.prototype, "submitTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Current status of this offer. Values: Listing | Pending | Complete',
        example: 'Listing',
    }),
    __metadata("design:type", String)
], Offer.prototype, "status", void 0);
exports.Offer = Offer;
//# sourceMappingURL=offer.dto.js.map