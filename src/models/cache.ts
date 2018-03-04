import * as mongoose from 'mongoose';
import * as config from 'config';

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
    },
    createdAt: { 
        type: Date,
        expires: config.get('cache_ttl'),
        default: Date.now
    }
});

mongoose.model('Cache', CacheSchema);