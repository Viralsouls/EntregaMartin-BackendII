import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import { createHash, isValidPassword } from "../utils/hash.js";
import UserModel from "../models/User.model.js";
import dotenv from "dotenv";
import CartModel from "../models/Cart.model.js";

dotenv.config();

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  // REGISTER
  passport.use(
    "register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const userExists = await UserModel.findOne({ email });
          if (userExists) return done(null, false, { message: "User already exists" });

          // 🔹 Crear carrito vacío
          const newCart = await CartModel.create({ products: [] });

          const newUser = await UserModel.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email,
            password: createHash(password),
            age: req.body.age,
            cart: newCart._id, // asociamos el carrito
          });

          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // LOGIN
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) return done(null, false, { message: "User not found" });

        if (!isValidPassword(user, password)) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // JWT
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([
          (req) => req?.cookies?.jwt || null,
        ]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;