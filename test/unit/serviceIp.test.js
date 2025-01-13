const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const { getLocationByIp } = require("../../services/serviceIp");

describe("getLocationByIp", () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it("should return location data for a valid IP", async () => {
    const ip = "123.123.123.123";
    const mockData = { city: "Pune", country: "India" };

    mock.onGet(`https://ipinfo.io/${ip}/json?token=test-token`).reply(200, mockData);

    const result = await getLocationByIp(ip);

    expect(result).toEqual({
      city: "Pune",
      country: "India",
    });
  });

  it("should return null for an invalid IP", async () => {
    mock.onGet(/ipinfo/).reply(404);

    const result = await getLocationByIp("InvalidIP");
    expect(result).toBeNull();
  });
});
