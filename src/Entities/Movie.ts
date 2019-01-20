import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Comment } from "./Comment";

@Entity()
@Unique(["title"])
export class Movie {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public year: number;

    @Column()
    public released: string;

    @Column()
    public plot: string;

    @Column()
    public createdAt: Date;

    @OneToMany(type => Comment, (comment: Comment) => comment.movie)
    public comments: Comment[];
}
