import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;
}
