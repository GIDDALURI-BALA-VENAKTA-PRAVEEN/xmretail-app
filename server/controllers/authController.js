import User from "../models/User.js";
import { createTransport } from "nodemailer";

const otpStore = {}; // Temporary storage for OTPs (Replace with DB in production)

// ✅ Configure Nodemailer
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "mcsushma90@gmail.com", // Replace with your email
    pass: "uwqv vmdd wnxa btzg",  // Use app password
  },
});

// ✅ Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    console.log(`✅ Sending OTP ${otp} to ${email}`);

    await transporter.sendMail({
      from: "mcsushma90@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

// ✅ Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  console.log(`🔍 Verifying OTP for ${email}: Received ${otp}, Stored ${otpStore[email]}`);

  if (!otpStore[email]) return res.status(400).json({ message: "OTP expired or not found" });

  if (otpStore[email].toString() === otp) {
    delete otpStore[email];

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    return res.status(200).json({ message: "OTP verified successfully", user });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};
