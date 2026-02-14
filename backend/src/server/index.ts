import express from 'express';
import '../config/env';  // Load .env variables first
import v1Routes from '../routes/v1.routes';
import { errorHandler } from '../errors/errorHandler';

const app = express();
app.use(express.json());

app.use('/v1', v1Routes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});

export default app;
