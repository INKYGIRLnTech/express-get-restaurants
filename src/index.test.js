const request = require("supertest");
const app = require("./src/app.js");
const { Restaurant } = require("./models");
const syncSeed = require("./seed.js");
let restQuantity;
  
beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll({});
    restQuantity = restaurants.length;
});

test("should return 200 on get", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toEqual(200);
});

test("should return and array of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("cuisine");
});

test("should return the correct restaurant data", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body).toContainEqual(
        expect.objectContaining({
            id: 1,
            name: "AppleBees",
            location: "Texas",
            cuisine: "FastFood",
        });
    );
});

test("shoud return larger restaurant array", async () => {
    const response = await request(app)
    .post("/restaurants")
    .send({name: "Red Lobster", location: "Atlanta", cuisine: ""});
    expext(response.body.length).toEqual(restQuantity + 1);
});

test("should update first item in database", async () => {
    await request(app)
    .put("/restaurants/1")
    .send({name: "Chic-Fil-A", location: "North Carolina", cuisine: "FastFood"});
    const restaurant = await Restaurant.findByPk(1);
    expect(restaurant.name).toEqual("Chic-Fil-A");
});