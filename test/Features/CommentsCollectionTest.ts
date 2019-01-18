import { makeRequest, setupWithDb, tearDownWithDb } from "../utils";
import { expect } from "chai";
import { Express, Response } from "express";
import { Container } from "inversify";
import * as httpMocks from "node-mocks-http";
import { MockResponse } from "node-mocks-http";
import { AppServer } from "../../src/AppServer";
import { CommentRepository } from "../../src/Repositories/CommentRepository";
import { MovieRepository } from "../../src/Repositories/MovieRepository";
import * as moment from "moment";
import { DATETIME } from "../../src/Constants";
import { Factory } from "../Factory";

describe("Comments collection", () => {
    let container: Container;
    let appServer: AppServer;
    let app: Express;
    let factory: Factory;
    let res: MockResponse<Response>;
    let movieRepository: MovieRepository;
    let commentRepository: CommentRepository;

    beforeEach(async () => {
        container = await setupWithDb();
        appServer = container.get<AppServer>(AppServer);
        app = appServer.app;
        res = httpMocks.createResponse();
        factory = container.get<Factory>(Factory);
        movieRepository = container.get<MovieRepository>(MovieRepository);
        commentRepository = container.get<CommentRepository>(CommentRepository);
    });

    afterEach(async () => {
        await tearDownWithDb(container);
    });

    describe("POST", () => {
        it("creates new comment", async () => {
            // given
            const movie = await factory.movie();

            const text = "Blah blah blah";

            const req = httpMocks.createRequest({
                method: "POST",
                url: `/movies/${movie.id}/comments`,
                body: {text},
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(201);
            const json = JSON.parse(res._getData());
            expect(json.id).to.be.a("number");
            expect(json.text).to.equal(text);
        });

        it("returns 422 when invalid body given", async () => {
            // given
            const movie = await factory.movie();

            const req = httpMocks.createRequest({
                method: "POST",
                url: `/movies/${movie.id}/comments`,
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(422);
            const json = JSON.parse(res._getData());
            expect(json.message).to.equal("validation failed");
        });
    });

    describe("GET", () => {
        it("returns list of comments", async () => {
            // given
            const movie = await factory.movie();

            const comment = await commentRepository.create({
                movie,
                text: "foobar text",
            });

            const req = httpMocks.createRequest({
                method: "GET",
                url: `/movies/${movie.id}/comments`,
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(200);
            const json = JSON.parse(res._getData());
            expect(json).to.deep.equal([
                {
                    id: comment.id,
                    text: comment.text,
                    date: moment(comment.createdAt).format(DATETIME),
                },
            ]);
        });

        it("returns 404 if movie was not found", async () => {
            // given
            const req = httpMocks.createRequest({
                method: "GET",
                url: "/movies/30/comments",
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(404);
        });
    });
});
