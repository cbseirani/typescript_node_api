import mongoose, { Document, Schema } from 'mongoose';

export interface IWeather extends Document {
    location: string;
    temperature: number;
    timestamp: Date;
    latitude: number;
    longitude: number;
    name: string;
    country_code: string;
    timezone: string;
}

const WeatherSchema: Schema = new Schema({
    location: { type: String, required: true },
    temperature: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    name: { type: String, required: true },
    country_code: { type: String, required: true },
    timezone: { type: String, required: true }
});

export const Weather = mongoose.model<IWeather>('Weather', WeatherSchema);
