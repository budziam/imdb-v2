import { injectable } from "inversify";
import { Connection, DeepPartial, FindManyOptions, Repository } from "typeorm";
import { Movie } from "../Entities/Movie";

@injectable()
export class MovieRepository {
    private readonly movieRepository: Repository<Movie>;

    public constructor(connection: Connection) {
        this.movieRepository = connection.getRepository(Movie);
    }

    public async list(options: FindManyOptions<Movie>): Promise<Movie[]> {
        return this.movieRepository.find(options);
    }

    public async create(attributes: DeepPartial<Movie>): Promise<Movie> {
        return this.movieRepository.save(attributes);
    }
}
