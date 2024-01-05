const express = require("express");
const connectToDB = require("./db");
const cors = require("cors");
const auth_route = require("./routes/auth_route");
const bank_route = require("./routes/bank_route");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth/", auth_route);
app.use("/api/account/", bank_route);

const port = process.env.PORT || 5000;
connectToDB();
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});
