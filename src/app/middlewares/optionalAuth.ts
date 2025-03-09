import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const optionalAuth = () => {
    return catchAsync(async (req, res, next) => {
        const authHeader = req?.headers?.authorization;

        // If no token is provided, allow the request to continue without authentication
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
            const { email } = decoded;

            // Check if the user exists
            const user = await User.isUserExistByEmail(email);
            if (!user) {
                return next(); // Proceed as an unauthenticated request
            }

            req.user = decoded;
        } catch (error) {
            // If JWT verification fails, proceed as an unauthenticated request
            return next();
        }

        next();
    });
}

export default optionalAuth;
