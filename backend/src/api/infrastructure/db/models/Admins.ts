import mongoose from "mongoose"; 

const adminSchema = new mongoose.Schema({

    email: String,
    password: String,
 
});

export const Admins = mongoose.model("Admin", adminSchema);