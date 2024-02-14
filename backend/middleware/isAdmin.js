module.exports = (req, res, next) => {
    const isAdmin = req.header("yadokari_admin");

    if (!isAdmin || isAdmin == "false" ) {
        return res.status(403).json("You are not allowed");
    }

    // If authentication is successful, call the next middleware or route handler:
    next();
};