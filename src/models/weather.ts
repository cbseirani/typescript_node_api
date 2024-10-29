import mongoose, { Document, Schema } from 'mongoose';

export interface IWeather extends Document {
    location: string;
    temperature: number;
    timestamp: Date;
}

const WeatherSchema: Schema = new Schema({
    location: { type: String, required: true },
    temperature: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const Weather = mongoose.model<IWeather>('Weather', WeatherSchema);