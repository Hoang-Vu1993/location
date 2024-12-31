import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  building: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  locationName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  locationNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  area: number;

  @ApiProperty()
  @IsOptional()
  parentId: number;
}

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}

export interface LocationTreeNode {
  id: number;
  building: string;
  locationName: string;
  locationNumber: string;
  area: number;
  parentId?: number;
  children?: LocationTreeNode[];
}

export interface LocationTreeDto {
  id?: number;
}
