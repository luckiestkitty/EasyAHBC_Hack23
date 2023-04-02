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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const openai_1 = require("openai");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const image_schema_1 = require("./schema/image.schema");
const handlebars_1 = require("handlebars");
const fs = require("fs");
let AppService = class AppService {
    constructor(imageModel) {
        this.imageModel = imageModel;
        this.configuration = new openai_1.Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new openai_1.OpenAIApi(this.configuration);
    }
    async generateImage(subject) {
        const prompt = await generatePrompt(subject);
        try {
            const response = await this.openai.createImage({
                prompt,
                n: 1,
                size: '512x512',
            });
            const urls = response.data.data.map((image) => image.url);
            const imageUrls = urls.map((url) => ({
                url,
                createdAt: new Date(),
            }));
            await downloadImages(imageUrls, prompt, subject);
            const image = new this.imageModel({
                prompt,
                imageUrls,
                createdAt: new Date(),
            });
            await image.save();
            return urls;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to generate image: ${error.message}`);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(image_schema_1.Image.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AppService);
exports.AppService = AppService;
const generatePrompt = async (subject) => {
    try {
        let prompt;
        if (subject == "art") {
            const objects = ['dog', 'cat', `Pikachu`];
            const angles = ['close-up', 'Eye-level', 'Soft focus', 'panoramic', 'side view'];
            const lightings = ['natural', 'warm', 'soft'];
            const locations = ['in a cozy room', 'in a city', 'by the sea'];
            const timesOfDay = ['midday', 'golden hour'];
            const processes = ['digital', 'film', 'polaroid', 'instant film'];
            const years = ['2021', '2010s', '2000s'];
            const lightingTypes = ['soft', 'bright', 'warm', 'white'];
            const backgrounds = ['nature scene', 'Rainbow', 'Confetti', 'Flowers', 'Beach'];
            const object = objects[Math.floor(Math.random() * objects.length)];
            const lightingType = lightingTypes[Math.floor(Math.random() * lightingTypes.length)];
            const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
            const angle = angles[Math.floor(Math.random() * angles.length)];
            const lighting = lightings[Math.floor(Math.random() * lightings.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const timeOfDay = timesOfDay[Math.floor(Math.random() * timesOfDay.length)];
            const process = processes[Math.floor(Math.random() * processes.length)];
            const year = years[Math.floor(Math.random() * years.length)];
            const template = handlebars_1.default.compile('a {{object}} with {{lightingType}} lighting, set against a {{background}}, taken {{timeOfDay}} {{angle}} in {{location}} in {{year}}, using a {{process}} process');
            prompt = template({
                object: object,
                lightingType: lightingType,
                background: background,
                angle: angle,
                lighting: lighting,
                location: location,
                timeOfDay: timeOfDay,
                process: process,
                year: year
            });
        }
        else if (subject == "philosophy") {
            const philosophers = ['Plato', 'Aristotle', 'Kant', 'Nietzsche', 'Descartes'];
            const works = ['The Republic', 'Nicomachean Ethics', 'Critique of Pure Reason', 'Thus Spoke Zarathustra', 'Meditations'];
            const philosopher = philosophers[Math.floor(Math.random() * philosophers.length)];
            const work = works[Math.floor(Math.random() * works.length)];
            const adjective1 = ['thought-provoking', 'enlightening', 'insightful', 'philosophical', 'introspective'][Math.floor(Math.random() * 5)];
            const adjective2 = ['detailed', 'illustrative', 'realistic', 'hyperrealistic', 'surreal'][Math.floor(Math.random() * 5)];
            const engine = ['Unreal Engine 5', 'Unity', 'Blender', 'Maya', 'Cinema 4D'][Math.floor(Math.random() * 5)];
            const resolution = ['8K', '4K', '1080p', '720p'][Math.floor(Math.random() * 4)];
            const template = handlebars_1.default.compile('{{philosopher}}, with their famous work {{work}}, in a {{adjective1}} and {{adjective2}} {{engine}} render, at {{resolution}} resolution');
            prompt = template({
                philosopher: philosopher,
                work: work,
                adjective1: adjective1,
                adjective2: adjective2,
                engine: engine,
                resolution: resolution
            });
        }
        return prompt;
    }
    catch (error) {
        console.error('Error generating prompt:', error.message);
        return null;
    }
};
async function downloadImages(imageUrls, prompts, subject) {
    const directory = `./images/${subject}`;
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
    let currentImageNumber = fs.readdirSync(directory).length;
    let images = [];
    const jsonFilePath = `./images/${subject}.json`;
    if (fs.existsSync(jsonFilePath)) {
        const contents = fs.readFileSync(jsonFilePath, 'utf8');
        images = JSON.parse(contents);
    }
    const newImages = [];
    for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const prompt = prompts;
        try {
            const response = await axios_1.default.get(imageUrl.url, { responseType: 'stream' });
            const contentType = response.headers['content-type'];
            const extension = contentType.split('/')[1];
            const filename = `${currentImageNumber}.${extension}`;
            const filepath = `${directory}/${filename}`;
            response.data.pipe(fs.createWriteStream(filepath));
            console.log(`Downloaded ${filename}`);
            const image = {
                name: `${subject} #${currentImageNumber + i + 1}`,
                description: prompt,
                image: `${subject}/${filename}`,
            };
            newImages.push(image);
            currentImageNumber++;
        }
        catch (error) {
            console.error(`Error downloading ${imageUrl.url}: ${error.message}`);
        }
    }
    images = images.concat(newImages);
    const json = JSON.stringify(images, null, 2);
    fs.writeFileSync(jsonFilePath, json);
}
//# sourceMappingURL=app.service.js.map