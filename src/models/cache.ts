import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CacheSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: String,
        required: true
    }
});

mongoose.model('Cache', CacheSchema);