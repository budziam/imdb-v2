import { makeRequest, setupWithDb, tearDownWithDb } from "../utils";
import { expect } from "chai";
import { Express, Response } from "express";
import { Container } from "inversify";
import * as httpMocks from "node-mocks-http";
import { MockResponse } from "node-mocks-http";
import * as sinon from "sinon";
import { SinonStubbedInstance } from "sinon";
import { AppServer } from "../../src/AppServer";
import { OmdbRequester } from "../../src/OmdbRequester";
import { MovieRepository } from "../../src/Repositories/MovieRepository";
import { omdbMovie } from "../fixtures";
import { Factory } from "../Factory";

describe("Movies collection", () => {
    let container: Container;
    let appServer: AppServer;
    let app: Express;
    let factory: Factory;
    let res: MockResponse<Response>;
    let omdbRequester: SinonStubbedInstance<OmdbRequester>;
    let movieRepository: MovieRepository;

    beforeEach(async () => {
        container = await setupWithDb();
        appServer = container.get<AppServer>(AppServer);
        app = appServer.app;
        res = httpMocks.createResponse();
        factory = container.get<Factory>(Factory);
        omdbRequester = sinon.createStubInstance(OmdbRequester);
        container.rebind(OmdbRequester).toConstantValue(omdbRequester as any);
        movieRepository = container.get<MovieRepository>(MovieRepository);
    });

    afterEach(async () => {
        await tearDownWithDb(container);
    });

    describe("POST", () => {
        it("creates new movie", async () => {
            // given
            omdbRequester.findByTitle.resolves(omdbMovie);
            const title = "avatar";

            const req = httpMocks.createRequest({
                method: "POST",
                url: "/movies",
                body: {title},
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(201);
            const json = JSON.parse(res._getData());
            expect(json.id).to.be.a("number");
            expect(json.title).to.equal(title);
            expect(json.plot).to.equal(omdbMovie.Plot);
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
            const json = JSON.parse(res._getData());
            expect(json.message).to.equal("validation failed");
        });
    });

    describe("GET", () => {
        it("returns list of movies", async () => {
            // given
            const movie = await factory.movie();

            const req = httpMocks.createRequest({
                method: "GET",
                url: "/movies",
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(200);
            const json = JSON.parse(res._getData());
            expect(json).to.deep.equal([
                {
                    id: movie.id,
                    title: movie.title,
                    plot: movie.plot,
                    released: movie.released,
                    year: movie.year,
                },
            ]);
        });

        it("can be limitted", async () => {
            // given
            await factory.movies(5);

            const req = httpMocks.createRequest({
                method: "GET",
                url: "/movies",
                query: {
                    limit: 2,
                }
            });

            // when
            await makeRequest(app, req, res);

            // then
            expect(res.statusCode).to.equal(200);
            const json = JSON.parse(res._getData());
            expect(json.length).to.equal(2);
        });
    });
});
