import { Model } from 'mongoose';
import { ImageDocument } from './schema/image.schema';
export declare class AppService {
    private readonly imageModel;
    constructor(imageModel: Model<ImageDocument>);
    private configuration;
    private openai;
    generateImage(subject: string): Promise<string[]>;
}
