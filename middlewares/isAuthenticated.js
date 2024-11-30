// const jwt = require("jsonwebtoken");

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({
//                 message: "User not authenticated",
//                 success: false,
//             });
//         }
//         const decode = await jwt.verify(token, process.env.SECRET_KEY);
//         if (!decode) {
//             return res.status(401).json({
//                 message: "Invalid token",
//                 success: false
//             });
//         }
//         req.id = decode.userId;
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// };

// module.exports = isAuthenticated;

const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }

    try {
        // Ensure the secret key is properly imported
        const secret = process.env.JWT_PASSWORD || "fallbacksecret";
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};

module.exports = isAuthenticated;

