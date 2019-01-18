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
import { omdbMovie } from "../Fixtures";
import { makeRequest, setupWithDb, tearDownWithDb } from "../utils";

describe("Movies collection", () => {
    let container: Container;
    let appServer: AppServer;
    let app: Express;
    let res: MockResponse<Response>;
    let omdbRequester: SinonStubbedInstance<OmdbRequester>;
    let movieRepository: MovieRepository;

    beforeEach(async () => {
        container = await setupWithDb();
        appServer = container.get<AppServer>(AppServer);
        app = appServer.app;
        res = httpMocks.createResponse();
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
            const json = res._getData();
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
            const json = res._getData();
            expect(json.message).to.equal("validation failed");
        });
    });

    describe("GET", () => {
        it("returns list of movies", async () => {
            // given
            // TODO Move it to factories
            const movie = await movieRepository.create({
                title: "example",
                year: 2018,
                released: "asdas",
                plot: "blah",
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
                    title: movie.title,
                    plot: movie.plot,
                    released: movie.released,
                    year: movie.year,
                },
            ]);
        });
    });
});
