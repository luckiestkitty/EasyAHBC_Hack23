"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    };
    app.enableCors(corsOptions);
    const swaggerOptions = new swagger_1.DocumentBuilder()
        .setTitle('zkDELX')
        .setVersion('1.0.0')
        .setDescription('ETHGlobal 2023 zkDELX')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map