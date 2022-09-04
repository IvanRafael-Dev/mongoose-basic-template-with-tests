import 'dotenv/config';
import app from './app';
import connectToDatabase from './database/connection';

const PORT = process.env.PORT || 3001;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.log('Connection Error');
    console.error(error);
    process.exit(0);
  });