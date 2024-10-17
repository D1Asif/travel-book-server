import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.util";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistByEmail(payload.email);

    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "User not found");
    }

    // password match check
    if (!(await User.isPasswordMatched(payload.password, user.password))) {
        throw new AppError(httpStatus.FORBIDDEN, "Credentials do not match");
    }

    const jwtPayload = {
        email: user.email,
        role: user.role
    }

    const token = createToken(jwtPayload, config.jwt_secret as string, config.jwt_expires_in as string);

    const { password, ...userWithoutPassword } = user;

    return {
        token,
        user: userWithoutPassword
    }
}

export const AuthServices = {
    loginUser
}