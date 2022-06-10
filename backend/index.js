const express = require('express');
const app = express();
require('./db/conn.js');
const PORT = process.env.PORT || 8000
const cors = require('cors');
const authRouter = require('./routers/auth.js');
const userRouter = require('./routers/user.js');
const messageRouter = require('./routers/messages.js');
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(messageRouter);


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})