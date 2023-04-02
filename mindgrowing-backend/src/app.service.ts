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
      await downloadImages(imageUrls, prompt, subject);


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


      const template = Handlebars.compile('a {{object}} with {{lightingType}} lighting, set against a {{background}}, taken {{timeOfDay}} {{angle}} in {{location}} in {{year}}, using a {{process}} process');
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
    } else if (subject == "philosophy") {
      const philosophers = ['Plato', 'Aristotle', 'Kant', 'Nietzsche', 'Descartes'];
      const works = ['The Republic', 'Nicomachean Ethics', 'Critique of Pure Reason', 'Thus Spoke Zarathustra', 'Meditations'];

      const philosopher = philosophers[Math.floor(Math.random() * philosophers.length)];
      const work = works[Math.floor(Math.random() * works.length)];
      const adjective1 = ['thought-provoking', 'enlightening', 'insightful', 'philosophical', 'introspective'][Math.floor(Math.random() * 5)];
      const adjective2 = ['detailed', 'illustrative', 'realistic', 'hyperrealistic', 'surreal'][Math.floor(Math.random() * 5)];
      const engine = ['Unreal Engine 5', 'Unity', 'Blender', 'Maya', 'Cinema 4D'][Math.floor(Math.random() * 5)];
      const resolution = ['8K', '4K', '1080p', '720p'][Math.floor(Math.random() * 4)];

      const template = Handlebars.compile('{{philosopher}}, with their famous work {{work}}, in a {{adjective1}} and {{adjective2}} {{engine}} render, at {{resolution}} resolution');
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
  } catch (error) {
    console.error('Error generating prompt:', error.message);
    return null;
  }
};


async function downloadImages(imageUrls, prompts, subject) {
  // Create a directory for the subject if it doesn't exist
  const directory = `./images/${subject}`;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Get the current image number from the existing image files in the directory
  let currentImageNumber = fs.readdirSync(directory).length;

  // Read the existing JSON file and parse its contents
  let images = [];
  const jsonFilePath = `./images/${subject}.json`;
  if (fs.existsSync(jsonFilePath)) {
    const contents = fs.readFileSync(jsonFilePath, 'utf8');
    images = JSON.parse(contents);
  }

  // Create an array of JSON objects for each downloaded image
  const newImages = [];
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    const prompt = prompts;
    try {
      const response = await axios.get(imageUrl.url, { responseType: 'stream' });
      const contentType = response.headers['content-type'];
      const extension = contentType.split('/')[1];
      const filename = `${currentImageNumber}.${extension}`;
      const filepath = `${directory}/${filename}`;

      response.data.pipe(fs.createWriteStream(filepath));
      console.log(`Downloaded ${filename}`);

      const image = {
        name: `${subject} #${currentImageNumber + i + 1}`,
        description: prompt,
        image: `${subject}/${filename}`, // include the subject folder in the image path
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
  fs.writeFileSync(jsonFilePath, json);
}

