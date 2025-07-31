const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');
dotenv.config();
connectDB();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`🔁 ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use('/api/public', require('./routes/publicRoutes'));

app.get("/",(req,res)=>{
  res.send("API running 🚀");
    });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
console.log('✅ profile route mounted');

app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
const PORT = process.env.PORT || 5000 ;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});