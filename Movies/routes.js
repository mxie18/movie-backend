import * as dao from "./dao.js";

export default function MoviesRoutes(app) {
    // app.get("/api/movies/:movieId/recommendations", async (req, res) => {
    //     const movieId = req.params.movieId;
    //     const users = await dao.findUsersWhoLikedMovie(movieId);
    //     res.send(users);
    // });

    app.get("/api/movies/:movieId", async (req, res) => {
        const movieId = req.params.movieId;
        const movies = await dao.findExternalMovieId(movieId);
        res.send(movies);
    });
}
