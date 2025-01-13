const request = require("supertest");
const express = require("express");
const { getWeatherByIp } = require('../../controllers/weatherController');
const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const limiter=require("../../middlewares/rateLimmiter")
const app = express();
app.get("/weather-by-ip", limiter, getWeatherByIp);

describe("GET /weather-by-ip", () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock
      .onGet(/ipinfo/)
      .reply(200, { city: "Pune", country: "India" })
      .onGet(/openweathermap/)
      .reply(200, {
        main: { temp: 30.5, humidity: 60 },
        weather: [{ description: "clear sky" }],
      });
  });

  afterAll(() => {
    mock.reset();
  });

  it("should return aggregated weather data", async () => {
    const response = await request(app).get("/weather-by-ip?ip=123.123.123.123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ip: "123.123.123.123",
      location: {
        city: "Pune",
        country: "India",
      },
      weather: {
        temperature: 30.5,
        humidity: 60,
        description: "clear sky",
      },
    });
  });

  it("should handle invalid IP format", async () => {
    const response = await request(app).get("/weather-by-ip?ip=InvalidIP");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid IP address provided.",
    });
  });

  it("should enforce rate limiting", async () => {
    for (let i = 0; i < 5; i++) {
      await request(app).get("/weather-by-ip?ip=123.123.123.123");
    }
    const response = await request(app).get("/weather-by-ip?ip=123.123.123.123");
    expect(response.status).toBe(429);
    expect(response.body).toEqual({
      error: "Too many requests, please try again later.",
    });
  });
});
