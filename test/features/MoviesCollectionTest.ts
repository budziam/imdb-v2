import { expect } from "chai";
import { Express, Response } from "express";
import { Container } from "inversify";
import * as httpMocks from "node-mocks-http";
import { MockResponse } from "node-mocks-http";
import { AppServer } from "../../src/AppServer";
import { MovieRepository } from "../../src/Repositories/MovieRepository";
import { makeRequest, setupWithDb, tearDownWithDb } from "../utils";

describe("Movies collection", () => {
    let container: Container;
    let appServer: AppServer;
    let app: Express;
    let res: MockResponse<Response>;
    let movieRepository: MovieRepository;

    beforeEach(async () => {
        container = await setupWithDb();
        appServer = container.get<AppServer>(AppServer);
        app = appServer.app;
        res = httpMocks.createResponse();
        movieRepository = container.get<MovieRepository>(MovieRepository);
    });

    afterEach(async () => {
        await tearDownWithDb(container);
    });

    describe("POST", () => {
        it("creates new movie", async () => {
            // given
            const name = "test";

            const req = httpMocks.createRequest({
                method: "POST",
                url: "/movies",
                body: {name},
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(201);
            const json = res._getData();
            expect(json.id).to.be.a("number");
            expect(json.name).to.equal(name);
        });

        it("returns 422 when invalid body given", async () => {
            // given
            const req = httpMocks.createRequest({
                method: "POST",
                url: "/movies",
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
        it("returns list of movies", async () => {
            // given
            const movie = await movieRepository.create({
                name: "example",
            });

            const req = httpMocks.createRequest({
                method: "GET",
                url: "/movies",
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(200);
            expect(res._getData()).to.deep.equal([
                {
                    id: movie.id,
                    name: movie.name,
                },
            ]);
        });
    });
});
