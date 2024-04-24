import * as dao from "./dao.js";

export default function MoviesRoutes(app) {
    app.get("/api/movies/:movieId", async (req, res) => {
        const movieId = req.params.movieId;
        const movies = await dao.findExternalMovieId(movieId);
        res.send(movies);
    });
}
