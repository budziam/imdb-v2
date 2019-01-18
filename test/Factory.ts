import { MovieRepository } from "../src/Repositories/MovieRepository";
import * as faker from "faker";
import { DeepPartial } from "typeorm";
import { Movie } from "../src/Entities";
import { injectable } from "inversify";

// TODO Use some library for creating tests entities instead of reinventing a wheel
@injectable()
export class Factory {
    public constructor(private readonly movieRepository: MovieRepository) {
        //
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
}
