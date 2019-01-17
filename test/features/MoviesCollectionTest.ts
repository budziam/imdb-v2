import { expect } from "chai";
import { Express, Response } from "express";
import { Container } from "inversify";
import * as httpMocks from "node-mocks-http";
import { MockResponse } from "node-mocks-http";
import { AppServer } from "../../src/AppServer";
import { setup } from "../utils";

describe("Movies collection", () => {
    let container: Container;
    let appServer: AppServer;
    let app: Express;
    let response: MockResponse<Response>;

    beforeEach(() => {
        container = setup();
        appServer = container.get<AppServer>(AppServer);
        app = appServer.app;
        response = httpMocks.createResponse();
    });

    describe("POST", () => {
        it("creates new movie", () => {
            // given
            const request = httpMocks.createRequest({
                method: "POST",
                url: "/movies",
            });

            // when
            app(request, response);

            // then
            expect(response.statusCode).to.equal(201);
            expect(Object.keys(response._getData())).to.deep.equal(["id"]);
        });
    });

    describe("GET", () => {
        it("returns list of movies", () => {
            // given
            const request = httpMocks.createRequest({
                method: "GET",
                url: "/movies",
            });

            // when
            app(request, response);

            // then
            expect(response.statusCode).to.equal(200);
            expect(response._getData()).to.deep.equal([
                {id: "test"},
            ]);
        });
    });
});
