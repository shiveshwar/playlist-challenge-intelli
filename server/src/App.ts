import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';

import AppSchema from './graphql/AppSchema';
import ObjectFactory from './util/ObjectFactory';

class App {
  public app
  private objectFactory: ObjectFactory;

  constructor () {
    this.app = express();
    this.app.use(bodyParser.json());
    this.objectFactory = new ObjectFactory();

    this.app.use('/songPlaylist', expressGraphQL({
      schema: new AppSchema(this.objectFactory).getSchema(),
      graphiql: true
    }));

    this.mountRoutes();
  }

  private mountRoutes (): void {

    this.app.get('',(req, res)=>{
      res.send('Hello Welcome to playlist challenge.');
    })

    this.app.post('/login',(req, res) => {
      const username = parseInt(req.body.username);
      const password =  req.body.password;

      res.setHeader('Content-Type','application/json');

      this.objectFactory.getUsersDao().getUserByIdPassword(username, password).then(data => {
         if ( data && typeof data === 'object' && data.id === req.body.username ) {
            res.end(JSON.stringify(data));
         } else {
            res.statusCode = 401;
            res.end( JSON.stringify({ message: 'Invalid Username and password' }))
         }
       }).catch( err => {
          res.statusCode = 503;
          res.end( JSON.stringify({ message: 'Internal server error'}))
       });
      })
  }
}

export default App;