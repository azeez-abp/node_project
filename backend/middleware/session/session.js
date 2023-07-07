import MongoDBStore from 'connect-mongodb-session';
import session from 'express-session'
const MongoDBStoreSession = MongoDBStore(session);
export const sessionMiddleware   = ()=>{
    session({
        secret: process.env.MONGO_SESSION,
        resave: false,
        saveUninitialized: false,
        store:  new MongoDBStoreSession({
        uri: process.env.MONGO_URL,
        collection: 'sessions', /// will  create collection sessions
    })
      })

}