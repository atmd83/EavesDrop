import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ApiService} from "./api.service";

@ApiTags('api')
@Controller('api')
export class ApiController {
    constructor(private readonly service: ApiService) {}

    @Get("/")
    @ApiOperation({ summary: 'Get all transactions' })
    @ApiResponse({
        status: 200,
        description: 'records returned'
    })
    getList() {
        return this.service.getAllTransactions();
    }

    @Get("/top-ten")
    @ApiOperation({ summary: 'Get all transactions' })
    @ApiResponse({
        status: 200,
        description: 'records returned'
    })
    getTopTen() {
        return this.service.getTopTen();
    }
}
