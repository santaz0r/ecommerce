const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });

router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимум 8 символов").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({
          error: {
            message: "IVALID_DATA",
            code: 400,
            // errors: errors.array()
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ id: newUser.id });
      await tokenService.save(newUser.id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser.id });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка",
      });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Email не корректный").normalizeEmail().isEmail(),
  check("password", "пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ id: existingUser.id });
      await tokenService.save(existingUser.id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: existingUser.id });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка",
      });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data.id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);

    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const tokens = await tokenService.generate({
      id: data.id, //dbToken.user.toString()
    });
    await tokenService.save(data.id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data.id });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка",
    });
  }
});
module.exports = router;
