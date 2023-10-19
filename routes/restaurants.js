const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant")
const {check, validationResult} = require("express-validator");

//get router

router.get('/', async(req, res)=>{
    try{
        const restaurants = await Restaurant.findAll();
        res.json(restaurants)
    }catch(error){
        res.status(500).json({error: 'An error occured when fetching restaurants'});
    }
})

router.get('/:id', async(req, res, next)=>{
    try{
        const id = req.params.id;
        const restaurants = await Restaurant.findByPk(id);
        res.json(restaurants);
    }catch(err){
        next(err)
    }
});

