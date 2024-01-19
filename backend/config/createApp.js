import mongoose from 'mongoose';
import { configureRoutes } from './route.js';

export function createApp(app,mongo_url) {

  configureRoutes(app);

  function connectToDatabase() {
    return new Promise((resolve, reject) => {
      mongoose.connect(mongo_url);
      const db = mongoose.connection;

      db.on('error', (error) => {
        reject(error);
      });

      db.once('open', () => {
        resolve(true);
      });

      process.on('SIGINT', () => {
        db.close(() => {
          process.exit(0);
        });
      });
    });
  }

  async function startServer() {
    try {
      let has_connected = await connectToDatabase();
      if (has_connected) {
        app.listen(PORT, () => {
          console.log(`http://127.0.0.1:${PORT} started`);
        });
      }
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    }
  }

  startServer();
}
