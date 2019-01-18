import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public text: string;

    @Column()
    public createdAt: Date;

    @ManyToOne(type => Movie, (movie: Movie) => movie.comments)
    public movie: Movie;
}
