import { expect } from "chai";
import { Container } from "inversify";
import { OmdbRequester } from "../../src/OmdbRequester";
import { omdbMovie } from "../Fixtures";
import { mockAxios, setup } from "../utils";

describe("Omdb requester", () => {
    let container: Container;
    let axios: any;

    beforeEach(() => {
        container = setup();
        axios = mockAxios();
    });

    it("finds movie by a title", async () => {
        // given
        axios.get.resolves({data: omdbMovie});
        const omdbRequester = new OmdbRequester(axios);

        // when
        const movie = await omdbRequester.findByTitle("avatar");

        // then
        expect(movie.Title).to.equal(omdbMovie.Title);
        expect(movie.Plot).to.equal(omdbMovie.Plot);
    });
});
