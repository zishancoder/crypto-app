
# Crypto App

This App gives you an inclusive overview of crypto currencies.


## Features

- You can view all the listed crypto currency exchanges according to their ranks.
- You can view all Crypto coins with their current prices.
- Can view detailed analysis of every coin.
- Provided a graph of price fluctuation in 24hrs, 7days, 30days, 180days, 365days.
- You can also see price fluctuation of coin from the date it was created.
- You can view prices in INR, USD, EUR



## API Reference

#### End Point

```http
  GET  https://api.coingecko.com/api/v3/
```

#### Get Exchange Details

```http
  GET /api.coingecko.com/api/v3/exchanges
```

#### Get Coins Details

```http
  GET https://api.coingecko.com/api/v3/coins/markets
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `vs_currency`| `string` | **Required**. you can fecth coins according to currency |
| `per_page`| `number`| Number of coins want to fecth per page|
| `page`| `number` | Page number|


#### Get Chart of a Coin

```http
  GET https://api.coingecko.com/api/v3/coins/{id}/market_chart
```





## Demo Link

Insert gif or link to demo


## Screenshots

![App Screenshot](https://github.com/zishancoder/crypto-app/blob/main/src/screenshots/screenshot_1.png)

