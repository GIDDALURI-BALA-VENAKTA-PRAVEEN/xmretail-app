export const adminLogin = (req, res) => {
    const { email, password } = req.body;
  
    if (email === "admin" && password === "admin") {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  };
  