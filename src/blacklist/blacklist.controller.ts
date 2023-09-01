import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {BlacklistService} from "./blacklist.service";
import {EntryDto} from "./dto/entry";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('blacklist')
@Controller('blacklist')
export class BlacklistController {
    constructor(private readonly service: BlacklistService) {}

    @Get("/")
    @ApiOperation({ summary: 'Get all entries in the blacklist' })
    @ApiResponse({
        status: 200,
        description: 'records returned'
    })
    getList() {
        return this.service.getBlacklist();
    }

    @Post("/")
    @UseGuards(AuthGuard('basic'))
    @ApiOperation({ summary: 'Create a new entry in the blacklist' })
    @ApiResponse({
        status: 200,
        description: 'record created'
    })
    createEntry(@Body() body: EntryDto) {
        return this.service.createEntry(body);
    }

    @Delete("/:id")
    @ApiOperation({ summary: 'Delete a blacklist entry' })
    @ApiResponse({
        status: 200,
        description: 'record deleted'
    })
    removeEntry(@Param('id') id: string) {
        return this.service.removeEntry(parseInt(id));
    }

}
