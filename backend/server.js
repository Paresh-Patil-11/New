import dotenv from 'dotenv';
import { httpServer } from './src/app.js';
import { connectDB } from './src/config/database.js';
import seedDoctor from './src/utils/seedDoctor.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDoctor();

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`🔌 Socket.IO server is ready`);
    });
  } catch (error) {
    console.error(`❌ Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
