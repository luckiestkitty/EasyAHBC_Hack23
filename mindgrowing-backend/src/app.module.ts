import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './schema/image.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://tahenft:fIteoDnoeeDIG0Y0@cluster0.nd4dk2y.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
