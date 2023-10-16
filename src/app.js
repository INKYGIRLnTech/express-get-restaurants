const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll({});
    res.json(restaurants);
})

app.get("/restaurants/:id", async (req, res) => {
    const number = req.params.id;
    const restaurants = await Restaurant.findByPk(number);
    res.json(restaurants);
})

app.use(express.json());
app.use(express.urlendcoded());


app.get('/restaurants/:id', async(req, res, next)=>{
    try{
        const id = req.params.id;
        const restaurants = await Restaurant.findByPk(id);
        res.json(restaurants);
    }catch(err){
        next(err)
    }
})

app.put('/restaurants/:id', async(req, res, next)=>{
    try{
        const restaurants = await Restaurant.findByPk(req.params.id)
        const updated = await restaurants.update(req.body)
        console.log(updated);
        res.json(updated);
    }
    catch(err){
        next(err);
    }
})

app.put('/restaurants/:id', async(req, res, next)=>{
    try{
        const restaurants = await Restaurant.findByPk(req.params.id)
        const updated = await restaurants.update(req.body)
        console.log(updated);
        res.json(updated);
    }
    catch(err){
        next(err);
    }
})

app.delete('/restaurants/:id', async (req, res, next)=>{
    try{
     
     await Restaurant.destroy({
         where: {id: req.params.id}});
     res.sendStatus(200);
    }
    catch(err){
     next(err);
    }
     
 })



module.exports = app;