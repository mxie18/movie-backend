import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const register = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already taken" });
        } else {
            const currentUser = await dao.createUser(req.body);
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        }
    };
    app.post("/api/users/register", register);

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const user = await dao.findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"] = user;
            res.json(req.session);
        } else {
            res.status(401).json({
                message: "Username and/or password are incorrect, try again",
            });
        }
    };
    app.post("/api/users/signin", signin);

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    app.get("/api/users", findAllUsers);

    const otherProfile = async (req, res) => {
        console.log(req.params.userId);
        try {
            const profile = await dao.findUserById(req.params.userId);
            res.json(profile);
        } catch (error) {
            res.sendStatus(401);
        }
    };
    app.get("/api/users/profile/:userId", otherProfile);

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }

        res.json(currentUser);
    };
    app.get("/api/users/profile", profile);

    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    app.get("/api/users/signout", signout);

    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        // const user = await dao.findUserById(userId);
        // req.session["currentUser"] = user;
        res.json(status);
    };
    app.put("/api/users/:userId", updateUser);

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    app.delete("/api/users/:userId", deleteUser);

    const createUser = async (req, res) => {
        try {
            console.log(req.body);
            const user = await dao.createUser(req.body);
            res.json(user);
        } catch (err) {
            res.sendStatus(401);
        }
    };
    app.post("/api/users", createUser);
}
