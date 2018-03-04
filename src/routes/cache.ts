import { Router } from 'express';

const cache: Router = Router();

/* GET home page. */
cache.get('/', (req, res) => {
  res.send('List');
});

cache.get('/:id', (req, res) => {
  res.send('Single');
});

cache.post('/:id', (req, res) => {
  res.send('Add new');
});

cache.post('/delete', (req, res) => {
  res.send('Delete all');
});

cache.delete('/:id', (req, res) => {
  res.send('Delete one');
});

export default cache;
