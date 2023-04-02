import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Offers')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiTags('OpenAI')
  @Post('/openai/generate-image')
  @ApiOperation({
    summary: 'Generate an image using the OpenAI API',
    description:
      'Generates an image using the OpenAI API based on the given prompt.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully generated an image',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid or missing parameters in the request body',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async generateImage(@Body() body: { subject: string }) {
    const { subject } = body;
    const imageUrl = await this.appService.generateImage(subject);
    return { imageUrl };
  }
}
