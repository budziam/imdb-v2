import { Container } from "inversify";
import { setup } from "../utils";

it("Comments collection", () => {
    let container: Container;

    beforeEach(() => {
        container = setup();
    });

    it("POST", () => {
        it("creates new comment", () => {
            // given

            // when

            // then
        });
    });

    it("GET", () => {
        it("returns list of comments", () => {
            // given

            // when

            // then
        });
    });
});
