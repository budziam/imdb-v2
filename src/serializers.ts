import * as moment from "moment";
import { Comment, Movie } from "./Entities";
import { DATETIME } from "./Constants";

// TODO Use some library for serialization instead of reinventing a wheel

export const serializeMovie = (movie: Movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.year,
    released: movie.released,
    plot: movie.plot,
});

export const serializeComment = (comment: Comment) => ({
    id: comment.id,
    text: comment.text,
    date: moment(comment.createdAt).format(DATETIME),
});
