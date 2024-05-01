import { HttpException } from "@/exception/HttpException";
import {
  CommonResponse,
  ResponseWithId,
  TokenData,
  TokenPayload,
} from "@/interfaces";
import { UserInterface } from "@/interfaces/user.interface";
import { UserModel } from "@/models/user.models";

import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export class UserService {
  async createUser(
    userData: UserInterface
  ): Promise<CommonResponse<ResponseWithId>> {
    const isUserExist: UserInterface[] = await UserModel.findOne({
      username: userData.username,
    });
    if (isUserExist) throw new HttpException("User already in", 409);

    const hashPassword = await hash(userData.password, 10);
    userData.password = hashPassword;

    const user = await UserModel.create(userData);

    const response: CommonResponse<ResponseWithId> = {
      statusCode: 201,
      data: { _id: user._id },
      message: "User created successfully",
    };

    return response;
  }

  async userLogin(userData: UserInterface): Promise<CommonResponse<TokenData>> {
    const user = await UserModel.findOne({ username: userData.username });

    const isPassword = await compare(userData.password, user.password);
    if (!isPassword) throw new HttpException("Password Not Match", 409);

    const tokenPayload: TokenPayload = { _id: user._id };

    const expiresIn = 60 * 60;

    const jwt = sign(tokenPayload, "jwt", { expiresIn: expiresIn });

    return {
      statusCode: 200,
      message: "Login success",
      data: { token: jwt, expiresIn },
    };
  }
}
