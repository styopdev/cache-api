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
}).pre('save', (next) => {
    const Cache = mongoose.model('Cache');
    const limit = config.get('cache_limit');
    // Remove oldest document if limit reached;
    Cache.count({})
        .then((count) => {
            if (count === limit) {
                return Cache.findOne({})
                    .sort({ "createdAt" : 1 })
                    .limit(1);
            } else {
                return next();
            }
        })
        .then((cache) => {
            if (cache instanceof Cache) {
                return cache.remove();
            }
        })
        .then(() => {
           return next(); 
        });
});

mongoose.model('Cache', CacheSchema);