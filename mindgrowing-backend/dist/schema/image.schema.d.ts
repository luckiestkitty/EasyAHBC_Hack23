/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
export type ImageDocument = Image & Document;
export declare class Image {
    prompt: string;
    imageUrls: {
        url: string;
        createdAt: Date;
    }[];
    createdAt: Date;
}
export declare const ImageSchema: import("mongoose").Schema<Image, import("mongoose").Model<Image, any, any, any, Document<unknown, any, Image> & Omit<Image & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Image, Document<unknown, {}, import("mongoose").FlatRecord<Image>> & Omit<import("mongoose").FlatRecord<Image> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
declare const _default: {
    Image: typeof Image;
    ImageSchema: import("mongoose").Schema<Image, import("mongoose").Model<Image, any, any, any, Document<unknown, any, Image> & Omit<Image & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Image, Document<unknown, {}, import("mongoose").FlatRecord<Image>> & Omit<import("mongoose").FlatRecord<Image> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
};
export default _default;
