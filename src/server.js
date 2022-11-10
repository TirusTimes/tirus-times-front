import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', { name: 'Bob' });
      server.create('user', { name: 'Alice' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', schema => {
        return schema.users.all();
      });

      this.post('/signup', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.users.create({ ...attrs });
        return user;
      });
    },
  });

  return server;
}
