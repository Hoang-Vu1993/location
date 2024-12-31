import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import {
  CreateLocationDto, LocationTreeDto,
  LocationTreeNode,
  UpdateLocationDto
} from "@app/location/location.dto";

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

  //A > B, B > C, C > D
  //A < D
  async update(id: number, location: UpdateLocationDto) {
    //check update parrentId
    if (location.parentId) {
      const data = await this.locationRepository.findOne({
        where: { id: id },
        relations: ['children'],
      });
      if (data) {
        const arr = this.buildLocationTree(data);
        if (arr) {
          const canUpdate = await this.findIdInArray(id, arr);
          if (!canUpdate) {
            return [
              {
                status: 400,
                message: 'Không thể cập nhật',
              },
            ];
          }
        }
        return arr;
      }
    }
    await this.locationRepository.update(id, location);
    return this.locationRepository.findOne({ where: { id } });
  }

  private async findIdInArray(id: number, array): Promise<boolean> {
    return array.some(
      (item) =>
        item.id === id ||
        (item.children && this.findIdInArray(id, item.children)),
    );
  }

  private async buildLocationTree(
    node: LocationTreeNode,
  ): Promise<LocationTreeNode> {
    const children = await this.locationRepository.find({
      where: { parent: { id: node.id } },
      relations: ['children'],
    });

    return {
      ...node,
      children: await Promise.all(
        children.map((child) => this.buildLocationTree(child)),
      ),
    };
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
