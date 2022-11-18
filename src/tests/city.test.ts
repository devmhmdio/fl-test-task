import City from "../models/City";

describe("Add City", () => {
  it("can add city in db", () => {
    const city = new City({
      cityName: "London",
    });
    city.save();
    expect(city).toHaveProperty("cityName");
  });
});
