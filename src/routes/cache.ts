import { Router } from 'express';
import * as mongoose from 'mongoose';
import * as uuid from 'uuid/v4';

const Cache = mongoose.model('Cache');

const cache: Router = Router();

const generateHash = (key?) => {
  return {
    key: key || uuid(),
    data: uuid()
  }
};

const toResponse = (cache) => {
  console.log('cache 17', cache);
  return {
    key: cache.key,
    data: cache.data
  }
};

/* GET home page. */
cache.get('/', (req, res) => {
  Cache.find({})
    .select({ _id: 0, __v: 0, createdAt: 0 })
    .then((caches) => res.send(caches))
    .catch((err) => {
      res.status(500);
      return res.send('Internal server error');
    });
});

cache.get('/:key', (req, res) => {
  const key = req.params.key;
  Cache.findOne({ key })
    .then((cache) => {
      if (cache) {
        console.log('Cache hit', cache);
        return res.send(cache.data);
      } else {
        console.log('Cache miss');
        return Cache.create(generateHash(key));
      }
    })
    .then((cache) => {
      if (cache instanceof Cache) {
        res.status(201);
        return res.send(cache.data);
      }
    })
    .catch((err) => {
      res.status(500);
      return res.send(`Error "${err.message}" occurred`);
    });
});

cache.post('/', (req, res) => {
  const key = req.body.key;
  const data = req.body.data;
  if (!key || !data) {
    res.status(400);
    return res.send('Invalid request, please specify valid `key` and `data`');
  }
  
  const cache = new Cache();
  cache.key = key;
  cache.data = data;
  cache.save()
    .then(() => {
      res.send(toResponse(cache));
    })
    .catch((err) => {
      res.status(500);
      res.send(`Error "${err.message}" occurred`);
    });
});

cache.put('/:key', (req, res) => {
  const key = req.params.key;
  const data = req.body.data;

  Cache.update({ key }, { $set: { key, data} })
    .then((updated) => {
      if (updated.nModified) {
        return res.status(200).end();
      } else {
        res.status(404);
        return res.send('Cache not found');
      }
    })
    .catch((err) => {
      res.status(500);
      return res.send(`Error "${err.message}" occurred`);
    });
});

cache.post('/delete', (req, res) => {
  Cache.remove({})
    .then(() => {
      return res.end();
    })
    .catch(() => {
      res.status(500);
      return res.send('Internal server error');
    });
});

cache.delete('/:key', (req, res) => {
  Cache.remove({})
    .then(() => res.end())
    .catch(() => {
      res.status(500);
      return res.send('Internal server error');
    });
});

export default cache;
