import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('health')
@Controller()
export class AppController {
  @Get('/health')
  @ApiOperation({ summary: 'Health endpoint for the api service' })
  @ApiResponse({
    status: 200,
    description: 'ok message to show the api is running'
  })
  health(): string {
    return "ok"
  }
}