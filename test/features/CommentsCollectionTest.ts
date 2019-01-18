import { makeRequest, setupWithDb, tearDownWithDb } from "../utils";
import { expect } from "chai";
import { Express, Response } from "express";
import { Container } from "inversify";
import * as httpMocks from "node-mocks-http";
import { MockResponse } from "node-mocks-http";
import { AppServer } from "../../src/AppServer";
import { CommentRepository } from "../../src/Repositories/CommentRepository";
import { MovieRepository } from "../../src/Repositories/MovieRepository";

describe("Comments collection", () => {
    let container: Container;
    let appServer: AppServer;
    let app: Express;
    let res: MockResponse<Response>;
    let movieRepository: MovieRepository;
    let commentRepository: CommentRepository;

    beforeEach(async () => {
        container = await setupWithDb();
        appServer = container.get<AppServer>(AppServer);
        app = appServer.app;
        res = httpMocks.createResponse();
        movieRepository = container.get<MovieRepository>(MovieRepository);
        commentRepository = container.get<CommentRepository>(CommentRepository);
    });

    afterEach(async () => {
        await tearDownWithDb(container);
    });

    describe("POST", () => {
        it("creates new comment", async () => {
            // given
            // TODO Move it to factories
            const movie = await movieRepository.create({
                title: "example",
                year: 2018,
                released: "asdas",
                plot: "blah",
            });

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
            const json = res._getData();
            expect(json.id).to.be.a("number");
            expect(json.text).to.equal(text);
        });

        it("returns 422 when invalid body given", async () => {
            // given
            // TODO Move it to factories
            const movie = await movieRepository.create({
                title: "example",
                year: 2018,
                released: "asdas",
                plot: "blah",
            });

            const req = httpMocks.createRequest({
                method: "POST",
                url: `/movies/${movie.id}/comments`,
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(422);
            const json = res._getData();
            expect(json.message).to.equal("validation failed");
        });
    });

    describe("GET", () => {
        it("returns list of comments", async () => {
            // given
            // TODO Move it to factories
            const movie = await movieRepository.create({
                title: "example",
                year: 2018,
                released: "asdas",
                plot: "blah",
            });

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
            expect(res._getData()).to.deep.equal([
                {
                    id: comment.id,
                    text: comment.text,
                    date: comment.createdAt,
                },
            ]);
        });
    });
});
