import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import {
  CreateLocationDto,
  LocationTreeNode,
  UpdateLocationDto,
} from '@app/location/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  findOne(id: number): Promise<Location> {
    return this.locationRepository.findOne({ where: { id } });
  }

  create(location: CreateLocationDto): Promise<Location> {
    return this.locationRepository.save(location);
  }

  async update(id: number, location: UpdateLocationDto): Promise<Location> {
    await this.locationRepository.update(id, location);
    return this.locationRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.locationRepository.delete(id);
  }

  async getLocationTree(): Promise<LocationTreeNode[]> {
    const roots: LocationTreeNode[] = await this.locationRepository.query(
      `SELECT * FROM "location"`,
    );
    const locationMap: { [key: number]: LocationTreeNode } = {};

    roots.forEach((location) => {
      locationMap[location.id] = { ...location, children: [] };
    });

    const tree: LocationTreeNode[] = [];
    roots.forEach((location) => {
      if (location.parentId === null) {
        tree.push(locationMap[location.id]);
      } else {
        locationMap[location.parentId]?.children.push(locationMap[location.id]);
      }
    });

    return tree;
  }
}
