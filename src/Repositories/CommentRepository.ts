import { injectable } from "inversify";
import { Connection, DeepPartial, Repository } from "typeorm";
import { Comment } from "../Entities";

@injectable()
export class CommentRepository {
    private readonly commentRepository: Repository<Comment>;

    public constructor(connection: Connection) {
        this.commentRepository = connection.getRepository(Comment);
    }

    public async create(attributes: DeepPartial<Comment>): Promise<Comment> {
        return this.commentRepository.save({
            createdAt: new Date(),
            ...attributes,
        });
    }
}
