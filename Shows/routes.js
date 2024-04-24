import * as dao from "./dao.js";

export default function ShowsRoutes(app) {
    app.get("/api/shows/:showId", async (req, res) => {
        const showId = req.params.showId;
        const show = await dao.findExternalShowId(showId);
        res.send(show);
    });
}
