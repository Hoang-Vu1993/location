import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { LocationTreeNode } from "@app/location/location.dto";

@Entity({
  name: 'location',
})
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  building: string;

  @Column()
  locationName: string;

  @Column()
  locationNumber: string;

  @Column({ type: 'float', nullable: true })
  area: number;

  @ManyToOne(() => Location, (location) => location.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: Location;

  @OneToMany(() => Location, (location) => location.parent)
  children: LocationTreeNode[];
}
