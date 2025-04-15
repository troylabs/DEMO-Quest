import { UserData } from '@/types/userTypes';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema<UserData>({
    email: { type: String },
    password: { type: String },
    name: { type: String },
}, {
    timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);