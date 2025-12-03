
import express from "express";
import { MongoConnect } from "./configs/MongoDB.config";
import app from "./app";

const PORT = 5000;
MongoConnect();

app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));   