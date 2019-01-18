import { MovieRepository } from "../src/Repositories/MovieRepository";
import * as faker from "faker";
import { DeepPartial } from "typeorm";
import { Comment, Movie } from "../src/Entities";
import { injectable } from "inversify";
import { CommentRepository } from "../src/Repositories/CommentRepository";

// TODO Use some library for creating tests entities instead of reinventing a wheel
@injectable()
export class Factory {
    public constructor(
        private readonly commentRepository: CommentRepository,
        private readonly movieRepository: MovieRepository
    ) {
        //
    }

    public async movies(count: number, attributes?: DeepPartial<Movie>): Promise<Movie[]> {
        return this.many(count, this.movie.bind(this, attributes));
    }

    public async movie(attributes?: DeepPartial<Movie>): Promise<Movie> {
        const date = faker.date.past();

        return this.movieRepository.create({
            title: faker.name.title(),
            year: date.getFullYear(),
            released: date.toDateString(),
            plot: faker.lorem.paragraph(),
            ...attributes,
        });
    }

    public async comments(count: number, attributes?: DeepPartial<Comment>): Promise<Comment[]> {
        return this.many(count, this.comment.bind(this, attributes));
    }

    public async comment(attributes?: DeepPartial<Comment>): Promise<Comment> {
        return await this.commentRepository.create({
            text: faker.lorem.paragraph(),
            ...attributes,
        });
    }

    private async many<T>(count: number, callback: () => Promise<T>): Promise<T[]> {
        const promises = [];

        for (let i = 0; i < count; i += 1) {
            promises.push(callback());
        }

        return Promise.all(promises);
    }
}
