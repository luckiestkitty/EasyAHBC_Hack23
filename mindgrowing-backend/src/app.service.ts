import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './schema/image.schema';
import Handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class AppService {

  // mongoDB
  constructor(
    // ...
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) { }


  // openai api
  private configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  private openai = new OpenAIApi(this.configuration);

  async generateImage(subject: string) {

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

      // Download the images
      await downloadImages(imageUrls, prompt);


      const image = new this.imageModel({
        prompt,
        imageUrls,
        createdAt: new Date(),
      });
      await image.save();

      return urls;

      // const imageUrls = response.data.data.map((data) => ({
      //   url: data.url,
      // }));
      // const createdImages = await this.imageModel.create(imageUrls);
      // return createdImages;
      // return response.data;
    }
    catch (error) {
      throw new InternalServerErrorException(
        `Failed to generate image: ${error.message}`,
      );
    }
  }



}

const generatePrompt = async (subject: string) => {
  // const subjects = ['dog', 'cat', 'flower', 'mountain', 'ocean'];
  const angles = ['close-up', 'Eye-level', 'Soft focus', 'panoramic', 'side view'];
  const lightings = ['natural', 'warm', 'soft'];
  const locations = ['in a cozy room', 'in a city', 'by the sea'];
  const timesOfDay = ['midday', 'golden hour'];
  const processes = ['digital', 'film', 'polaroid', 'instant film'];
  const years = ['2021', '2010s', '2000s'];
  const lightingTypes = ['soft', 'bright', 'warm', 'white'];
  const backgrounds = ['nature scene', 'Rainbow', 'Confetti', 'Flowers', 'Beach'];

  // const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const lightingType = lightingTypes[Math.floor(Math.random() * lightingTypes.length)];
  const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  const angle = angles[Math.floor(Math.random() * angles.length)];
  const lighting = lightings[Math.floor(Math.random() * lightings.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const timeOfDay = timesOfDay[Math.floor(Math.random() * timesOfDay.length)];
  const process = processes[Math.floor(Math.random() * processes.length)];
  const year = years[Math.floor(Math.random() * years.length)];


  const template = Handlebars.compile('a {{subject}} with {{lightingType}} lighting, set against a {{background}}, taken {{timeOfDay}} {{angle}} in {{location}} in {{year}}, using a {{process}} process');
  const prompt = template({
    subject: subject,
    lightingType: lightingType,
    background: background,
    angle: angle,
    lighting: lighting,
    location: location,
    timeOfDay: timeOfDay,
    process: process,
    year: year
  });

  return prompt;
}

async function downloadImages(imageUrls, prompts) {
  // Create a directory to save the downloaded images
  const directory = './images';
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  // Get the current image number from the existing image files in the directory
  let currentImageNumber = fs.readdirSync(directory).length;

  // Read the existing JSON file and parse its contents
  let images = [];
  if (fs.existsSync('./images.json')) {
    const contents = fs.readFileSync('./images.json', 'utf8');
    images = JSON.parse(contents);
  }

  // Create an array of JSON objects for each downloaded image
  const newImages = [];
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    const prompt = prompts[i];
    try {
      const response = await axios.get(imageUrl.url, { responseType: 'stream' });
      const contentType = response.headers['content-type'];
      const extension = contentType.split('/')[1];
      const filename = `${currentImageNumber}.${extension}`;
      const filepath = `${directory}/${filename}`;

      response.data.pipe(fs.createWriteStream(filepath));
      console.log(`Downloaded ${filename}`);

      const image = {
        name: `Your Collection #${currentImageNumber + 1}`,
        description: prompt,
        image: filename,
      };
      newImages.push(image);

      currentImageNumber++;
    } catch (error) {
      console.error(`Error downloading ${imageUrl.url}: ${error.message}`);
    }
  }

  // Concatenate the new image objects to the existing array
  images = images.concat(newImages);

  // Write the updated array to the JSON file
  const json = JSON.stringify(images, null, 2);
  fs.writeFileSync('./images.json', json);
}

