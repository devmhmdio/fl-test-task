# Founder + Lightning Test Task

## Weather Api Project build using TypeScript, GraphQL and MongoDB

### Setup
- Clone the repo in your local folder
- For first time, you will need to run ```npm i``` or ```npm install```
- For the next steps you will have to rename the .env.sample file to .env file and fill in the values
- To start the server you will either have to run ```npm run start``` for production server or ```npm run dev``` for development server (Wait for the server to get started and database to get connected)

### Tech Stack Used
- Typescript
- GraphQL - For APIs
- MongoDB - As Database
- Mongoose - ORM
- Jest - Test Case Framework

## GraphQL Queries and Mutations

### Mutation to add cities
```
mutation {
  addCity(cityName: "Beijing"){
    id
    cityName
  }
}
```

### Query to get all cities in database
```
query {
  getCities {
    cityName
  }
}
```

### Query to get weather detail for single city
```
query {
  getFiveDayWeatherForecast(cityName: "Beijing") {
    FiveDayForecastDetail {
      dt_txt
      weather
      wind
    }
    error
  }
}
```

### Query to get weather data for all cities in database
```
query {
  getFiveDayWeatherForecastAllCities {
    City
    FiveDayForecastDetail {
      dt_txt
      weather
      wind
    }
  }
}
```

### Some extra queries and mutations
#### Query to find city by its name
```
query {
  getCityByName(cityName: "Beijing") {
    cityName
  }
}
```
