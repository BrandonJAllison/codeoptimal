//protected routes middleware checked against JWT
//check the secret and make sure it matches

import expressJWT from 'express-jwt'

export const requireSignin = expressJWT({
    getToken: (req, res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});

//if this is valid re.use._id
//otherwise throws an error

