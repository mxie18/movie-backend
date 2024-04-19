import * as dao from "./dao.js";

export default function UserRoutes(app) {
    app.post("/api/users", async (req, res) => {
        console.log(req.body);
        const user = await dao.createUser(req.body);
        res.json(user);
    });
    app.get("/api/users", async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    });
}
