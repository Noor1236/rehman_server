import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ensure the correct path to your User model

const SECRET_KEY = "your-secret-key"; // Replace with your actual secret key

// Signup API
export const SignUp = async (request, response) => {
    try {
        const { first_name, last_name, email, password } = request.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ msg: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            // image: request.file?.filename || null, // Optional image
        });

        await newUser.save();
        response.status(201).json({ msg: "User signed up successfully" });
    } catch (error) {
        response.status(500).json({ msg: "Internal server error", error });
    }
};

// Get All Users API
export const getAllUser = async (request, response) => {
    try {
        const allUsers = await User.find({});
        response.status(200).json(allUsers);
    } catch (error) {
        response.status(500).json({ msg: "Internal server error", error });
    }
};

// Login API
export const Login = async (request, response) => {
    try {
        const { email, password } = request.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ msg: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ msg: "Invalid password" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        response.status(200).json({
            msg: "Login successful",
            token,
            userData: user,
        });
    } catch (error) {
        response.status(500).json({ msg: "Internal server error", error });
    }
};

// Edit user profile
export const editUserProfile = async (req, res) => {
    try {
      const { id } = req.params; // Get user id from route
      const { first_name, last_name, email, password } = req.body;
  
      // Prepare data for update
      const updatedData = {
        first_name,
        last_name,
        email,
      };
  
      // Hash the password if provided
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }
  
      // Update user profile by ID
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
