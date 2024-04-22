import * as dao from "./dao.js";

export default function LikesRoutes(app) {
    app.post("/api/likes", async (req, res) => {
        const currentUser = req.session["currentUser"];
        const movie = req.body;
        const userId = currentUser._id;
        await dao.userLikesMovie(userId, movie);
        res.send("liked");
    });

    app.delete("/api/likes/:movieId", async (req, res) => {
        const currentUser = req.session["currentUser"];
        const userId = currentUser._id;
        const movieId = req.params.movieId;
        await dao.userUnlikesMovie(userId, movieId);
        res.send("unliked");
    });

    app.get("/api/users/:userId/likes", async (req, res) => {
        const userId = req.params.userId;
        const movies = await dao.findMoviesLikedByUser(userId);
        res.send(movies);
    });

    app.get("/api/movies/:movieId/likes", async (req, res) => {
        const movieId = req.params.movieId;
        const users = await dao.findUsersWhoLikedMovie(movieId);
        res.send(users);
    });
}
