import { Container } from "inversify";
import { setup } from "../utils";

it("Movies collection", () => {
    let container: Container;

    beforeEach(() => {
        container = setup();
    });

    it("POST", () => {
        it("creates new movie", () => {
            // given

            // when

            // then
        });
    });

    it("GET", () => {
        it("returns list of movies", () => {
            // given

            // when

            // then
        });
    });
});
