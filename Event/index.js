const express = require("express");
const port = 8080;
const mongoose = require("mongoose");
const app = express()
const event = require("./scheme")
const url = `mongodb+srv://bharathravi01121999:bharath1999@cluster0.njwnm9b.mongodb.net/?retryWrites=true&w=majority`
mongoose.set("strictQuery", true)
const mongooseStart = async () => {
    await mongoose.connect(url)
    console.log("connected database");
}
mongooseStart()
app.use(express.json())

app.post("/v1/events", async (req, res) => {
    try {
        if(req.body.title.length>1){
            let data = new event(req.body);
            const result = await data.save();
        res.status(200).json({
            status: "success",
            message: "product saved"
        })
        }else{
            res.send("title is required")
        }
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
})

app.get("/v1/events", async (req, res) => {
    try {
        let data = await event.find();
        res.status(200).json({
            status: "success",
            data
        })
    } catch (err) {
        res.status(400).json({
            status: "failure",
            message: err.message
        })
    }
})

app.get("/v1/events/:id", async (req, res) => {
    const _id = req.params.id
    try {
        let data = await event.find({ _id });
        res.status(200).json({
            status: "success",
            data
        })

    } catch (err) {
        res.status(400).json({
            status: "failure",
            message: err.message
        })
    }
})

app.delete("/v1/events/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        let data = await event.deleteOne({ _id })
        res.status(200).json({
            status: "success",
            message: "removed successfully"
        })
    } catch (err) {
        res.status(400).json({
            status: "failure",
            message: err.message
        })
    }
})

app.put("/v1/events/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        if(req.body.title.length>1){
            const data = await event.updateOne({_id,  $set: req.body });
        let datashow = await event.find({ _id })
        res.status(200).json({
            status: "success",
            message: "updated successfully",
            datashow
        })
        }else{
            res.send("title is required")
        }
    } catch (err) {
        res.status(400).json({
            status: "failure",
            message: err.message
        })
    }
})



app.listen(port, () => {
    console.log(`it will start in ${port}`);
})