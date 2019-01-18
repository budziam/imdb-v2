import { injectable } from "inversify";
import { Connection, DeepPartial, FindManyOptions, Repository } from "typeorm";
import { Movie } from "../Entities";

@injectable()
export class MovieRepository {
    private readonly movieRepository: Repository<Movie>;

    public constructor(connection: Connection) {
        this.movieRepository = connection.getRepository(Movie);
    }

    public async findOneOrFail(id: number): Promise<Movie> {
        return this.movieRepository.findOneOrFail(id);
    }

    public async findWithCommentsOrFail(id: number): Promise<Movie> {
        return this.movieRepository.findOneOrFail(id, {
            relations: ["comments"],
        });
    }

    public async list(options: FindManyOptions<Movie>): Promise<Movie[]> {
        return this.movieRepository.find(options);
    }

    public async create(attributes: DeepPartial<Movie>): Promise<Movie> {
        return this.movieRepository.save({
            createdAt: new Date(),
            ...attributes,
        });
    }
}
