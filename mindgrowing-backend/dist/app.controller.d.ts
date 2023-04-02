import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    generateImage(body: {
        subject: string;
    }): Promise<{
        imageUrl: string[];
    }>;
}
