import { injectable } from "inversify";
import { Connection, DeepPartial, FindManyOptions, Repository } from "typeorm";
import { Movie } from "../Entities";
import { AlreadyExistsError } from "../Errors";

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

    public async count(): Promise<number> {
        return this.movieRepository.count();
    }

    public async createOrFail(attributes: DeepPartial<Movie>): Promise<Movie> {
        // TODO Think about running it inside a transaction
        const movie = await this.movieRepository.findOne({title: attributes.title});

        if (movie) {
            throw new AlreadyExistsError(`Movie [${movie.title}] already exists`);
        }

        return this.create(attributes);
    }
}
