const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const { getWeatherByCityName } = require("../../services/serviceWeather");

describe("getWeatherByCityName", () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it("should return weather data for a valid city", async () => {
    const city = "Pune";
    const mockData = {
      main: { temp: 30.5, humidity: 60 },
      weather: [{ description: "clear sky" }],
    };

    mock
      .onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=test-api-key`)
      .reply(200, mockData);

    const result = await getWeatherByCityName(city);

    expect(result).toEqual({
      temperature: 30.5,
      humidity: 60,
      description: "clear sky",
    });
  });

  it("should throw an error for an invalid city", async () => {
    mock.onGet(/weather/).reply(404);

    await expect(getWeatherByCityName("InvalidCity")).rejects.toThrow(
      "Please Enter Valid IP"
    );
  });
});
