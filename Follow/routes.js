import * as dao from "./dao.js";

export default function FollowRoutes(app) {
    app.post("/api/users/follow", async (req, res) => {
        const currentUser = req.session["currentUser"];
        const user = req.body;
        const updated = await dao.followUser(currentUser._id, user._id);
        req.session["currentUser"] = updated;

        // console.log("UPDATED", req.session["currentUser"]);
        res.send("followed");
    });

    app.delete("/api/users/unfollow/:userId", async (req, res) => {
        const currentUser = req.session["currentUser"];
        const updated = await dao.unfollowUser(
            currentUser._id,
            req.params.userId
        );
        req.session["currentUser"] = updated;
        res.send("unfollowed");
    });

    app.get("/api/users/:userId/followers", async (req, res) => {
        const userId = req.params.userId;
        const followers = await dao.findFollowers(userId);
        res.send(followers);
    });

    app.get("/api/users/:userId/following", async (req, res) => {
        const userId = req.params.userId;
        const following = await dao.findFollowing(userId);
        res.send(following);
    });
}
