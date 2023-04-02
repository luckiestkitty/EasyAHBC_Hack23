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
exports.UpdateOffer = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateOffer {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Unique offerID',
        example: 'ID-JDJKVFO',
    }),
    __metadata("design:type", String)
], UpdateOffer.prototype, "offerID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'User (buyer/seller) account of this offer',
        example: '0x4726a2FBcb2844beF75979dcFF50b3AC8F50AC53',
    }),
    __metadata("design:type", String)
], UpdateOffer.prototype, "userAccount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'The max amount of electricity in kWh a buyer wants to buy',
        example: '60',
    }),
    __metadata("design:type", Number)
], UpdateOffer.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'The max price in $/kWh of a buyer wants to pay',
        example: '0.30',
    }),
    __metadata("design:type", Number)
], UpdateOffer.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'The UNIX timestamp when buyer accepts this offer',
        example: '1679183555',
    }),
    __metadata("design:type", Number)
], UpdateOffer.prototype, "updateTime", void 0);
exports.UpdateOffer = UpdateOffer;
//# sourceMappingURL=updateoffer.dto.js.map