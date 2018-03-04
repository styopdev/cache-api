## Cache REST API
-------------------
### Installation

* npm i
* edit your configurations in src/config/(dev|prod) file
* npm start

### REST documentation
* `GET - /cache` list of caches.
* `GET - /cache/:key` get or create and get if not exists.
* `POST - /cache/delete` delete all caches.
* `DELETE - /cache/:key` delete a cache by key.
* `POST - /cache` body `{ key: <STRING>, data: <STRING> }` add new.
* `PUT - /cache/:key` body `{ data: <STRING> }` update cache.
