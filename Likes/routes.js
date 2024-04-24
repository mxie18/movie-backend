import * as dao from "./dao.js";

export default function LikesRoutes(app) {
    app.post("/api/likes/movies", async (req, res) => {
        const currentUser = req.session["currentUser"];
        const movie = req.body;
        const userId = currentUser._id;
        const updated = await dao.userLikesMovie(userId, movie);
        req.session["currentUser"] = updated;
        res.send("liked");
    });

    app.post("/api/likes/shows", async (req, res) => {
        const currentUser = req.session["currentUser"];
        const show = req.body;
        const userId = currentUser._id;
        const updated = await dao.userLikesShow(userId, show);
        req.session["currentUser"] = updated;
        res.send("liked");
    });

    app.delete("/api/likes/movies/:movieId", async (req, res) => {
        const currentUser = req.session["currentUser"];
        const userId = currentUser._id;
        const movieId = req.params.movieId;
        const updated = await dao.userUnlikesMovie(userId, movieId);
        req.session["currentUser"] = updated;
        res.send("unliked");
    });

    app.delete("/api/likes/shows/:showId", async (req, res) => {
        const currentUser = req.session["currentUser"];
        const userId = currentUser._id;
        const showId = req.params.showId;
        const updated = await dao.userUnlikesShow(userId, showId);
        req.session["currentUser"] = updated;
        res.send("unliked");
    });

    app.get("/api/users/:userId/movies/likes", async (req, res) => {
        const userId = req.params.userId;
        const movies = await dao.findMoviesLikedByUser(userId);
        res.send(movies);
    });

    app.get("/api/users/:userId/shows/likes", async (req, res) => {
        const userId = req.params.userId;
        const shows = await dao.findShowsLikedByUser(userId);
        res.send(shows);
    });

    app.get("/api/movies/:movieId/likes", async (req, res) => {
        const movieId = req.params.movieId;
        const users = await dao.findUsersWhoLikedMovie(movieId);
        res.send(users);
    });

    app.get("/api/shows/:showId/likes", async (req, res) => {
        const showId = req.params.showId;
        const users = await dao.findUsersWhoLikedShow(showId);
        res.send(users);
    });
}
