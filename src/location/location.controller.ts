import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.entity';
import {
  CreateLocationDto, LocationTreeNode,
  UpdateLocationDto
} from "@app/location/location.dto";
import {
  ApiTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Location')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all locations.' })
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Location found.' })
  @ApiNotFoundResponse({ description: 'Location not found.' })
  findOne(@Param('id') id: number) {
    return this.locationService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The location has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  create(@Body() location: CreateLocationDto) {
    return this.locationService.create(location);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Location has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'Location not found.' })
  update(@Param('id') id: number, @Body() location: UpdateLocationDto) {
    return this.locationService.update(id, location);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Location has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Location not found.' })
  remove(@Param('id') id: number) {
    return this.locationService.remove(id);
  }

  @Get('select/tree')
  async getTree(): Promise<LocationTreeNode[]> {
    return this.locationService.getLocationTree();
  }
}
