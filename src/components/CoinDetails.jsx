import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Chart from "./Chart";

function CoinDetails() {
  const [currency, setCurrency] = useState("inr");
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const param = useParams();
  const btns = ['24h','7d','30d','180d','365d','max']

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

  const changeDays = (item) => {
      setLoading(true);
      setDays(item);
  }
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${server}/coins/${param.id}`);
      const { data: chartData } = await axios.get(
        `${server}/coins/${param.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setCoin(data);
      setLoading(false);
      setChartArray(chartData.prices);
    };
    fetchData();
  }, [param.id, currency, days]);

  return loading ? (
    <Loader />
  ) : (
    <Container maxW={"container.xl"}>
      <Box w={"full"} display={"flex"}>
        <Chart
          chartArray={chartArray}
          currencySymbol={currencySymbol}
          days={days}
        />
      </Box>
      <HStack wrap={'wrap'} p={'4'}>
      {
        btns.map((item,idx)=>(<Button onClick={()=>changeDays(item)} key={idx}>{item}</Button>))
      }
      </HStack>
      <RadioGroup
        value={currency}
        onChange={setCurrency}
        display={"flex"}
        gap={"1rem"}
        m={"1rem 0"}
      >
        <Radio value="inr">INR</Radio>
        <Radio value="usd">USD</Radio>
        <Radio value="eur">EUR</Radio>
      </RadioGroup>
      <VStack alignItems={"flex-start"} p={"16"} spacing={"4"}>
        <Text
          fontSize={"sm"}
          opacity={"0.7"}
          alignSelf={"center"}
          padding={"2rem 0"}
        >
          Last Updated On {Date().split("G")[0]}
        </Text>
        <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} />
        <Stat>
          <StatLabel>{coin.name}</StatLabel>
          <StatNumber fontSize={"md"}>
            {currencySymbol}
            {coin.market_data.current_price[currency]}
          </StatNumber>
          <StatHelpText>
            <StatArrow
              type={
                coin.market_data.price_change_percentage_24h > 0
                  ? "increase"
                  : "decrease"
              }
            />
            {coin.market_data.price_change_percentage_24h}%
          </StatHelpText>
        </Stat>
        <Badge fontSize={"xl"} bgColor={"blackAlpha.800"} color={"white"}>
          #{coin.market_cap_rank}
        </Badge>
        <Custombar
          high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
          low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
        />
        <VStack w={"full"}>
          <Item title={"max supply"} value={coin.market_data.max_supply} />
          <Item
            title={"circulating supply"}
            value={coin.market_data.circulating_supply}
          />
          <Item
            title={"market cap"}
            value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}
          />
          <Item
            title={"all time low"}
            value={`${currencySymbol} ${coin.market_data.atl[currency]}`}
          />
          <Item
            title={"all time high"}
            value={`${currencySymbol} ${coin.market_data.ath[currency]}`}
          />
        </VStack>
      </VStack>
    </Container>
  );
}

export default CoinDetails;

const Custombar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} w={"full"} />
    <HStack width={"full"} justifyContent={"space-between"}>
      <Badge children={low} fontSize={"md"} colorScheme={"red"} />
      <Text fontSize={"sm"} color={"blackAlpha.700"}>
        24H Range
      </Text>
      <Badge children={high} fontSize={"md"} colorScheme={"green"} />
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"}>
    <Text
      fontSize={{ base: "smaller", lg: "md" }}
      letterSpacing={"widest"}
      textTransform={"capitalize"}
      fontWeight={"semibold"}
    >
      {title}
    </Text>
    <Text
      fontSize={{ base: "smaller", lg: "md" }}
      letterSpacing={"widest"}
      fontWeight={"semibold"}
    >
      {value}
    </Text>
  </HStack>
);
