import mongoose, { Document, Schema } from 'mongoose';
import { IWeather } from './weather'; // Adjust the import path as needed

export interface IWeatherCollection extends Document {
    userGuid: string;
    weathers: IWeather[];
}

const WeatherCollectionSchema: Schema = new Schema({
    userGuid: { type: String, required: true },
    weathers: [{ type: Schema.Types.ObjectId, ref: 'Weather' }]
});

export const WeatherCollection = mongoose.model<IWeatherCollection>('WeatherCollection', WeatherCollectionSchema);