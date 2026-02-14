import express from 'express';
import v1Routes from '../routes/v1.routes';
const app = express();
app.use(express.json());


app.use('/v1', v1Routes);



app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});

export default app;
