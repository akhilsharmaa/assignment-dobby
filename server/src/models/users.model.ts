import { Schema, model, connect } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  
});

export const User = model('Users', UserSchema);