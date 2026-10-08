import User from "../model/User";
import BaseCtrl from "./base";
import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
export default class UserCtrl extends BaseCtrl {
  model = User;
  createUser = async (req:Request, res:Response) => {
    try {
      const { name, email, password } = req.body;
      req.body.id = uuid();

      if (!name || !email || !password) {
        return res.status(400).json({
          message: 'name, email and password are required',
        });
      }

      const existingUser = await this.model.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          message: 'User already exists',
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      // 4️⃣ Create user
      const user = new this.model({
        id: req.body.id,
        name,
        email,
        password: hashedPassword,
        role: 'user',
        isActive: true,
      });

      await user.save();
      return res.status(201).json({
        message: 'User created successfully',
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: 'Error' });
    }
  };

   login = async (req:Request, res:Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await this.model
        .findOne({ email })
        .select('+password');

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (!user.isActive) {
        return res.status(403).json({ message: 'User account is inactive' });
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '1d' }
      );

      return res.status(200).json({
        message: 'Login successful',
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error';
      return res.status(500).json({ error: message });
    }
  };

}
