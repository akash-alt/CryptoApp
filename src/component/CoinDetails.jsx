import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, StatUpArrow, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from "../index"
import { useParams } from "react-router-dom"
import ErrorShow from './ErrorShow';
import Chart from "./Chart";

const CoinDetails = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState("24h");
  const [chartArr, setCartArr] = useState([]);

  const params = useParams()
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "120d", "200d", "1y", "max"]

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };


  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoins(data)
        console.log(chartData);
        setCartArr(chartData.prices)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
    fetchCoins()
  }, [params.id, currency, days])

  if (error) return <ErrorShow message={"Error while fetching coin"} />

  return (
    <>
      <Container maxW={"container.xl"}>
        {
          loading ? <Loader /> : (
            <>
              <Box w={"full"} borderWidth={1}>
                <Chart arr={chartArr} currency={currencySymbol} days={days} />
              </Box>

              {/* Buttons */}

              <HStack m={"4"} overflowX={'auto'}>
                {
                  btns.map((i) => (
                    <Button  key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
                  ))
                }
              </HStack>

              <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"}>
                  <Radio value={"inr"}>INR</Radio>
                  <Radio value={"usd"}>USD</Radio>
                  <Radio value={"eur"}>EUR</Radio>
                </HStack>
              </RadioGroup>

              <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
                <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
                  Last Update {Date(coins.market_data.last_update).split("G")[0]}
                </Text>

                <Image
                  src={coins.image.large}
                  objectFit={"contain"}
                  w={"16"}
                  h={"16"}
                />

                <Stat>
                  <StatLabel>{coins.name}</StatLabel>
                  <StatNumber>
                    {currencySymbol}
                    {coins.market_data.current_price[currency]}
                  </StatNumber>

                  <StatHelpText>
                    <StatArrow
                      type={
                        coins.market_data.price_change_percentage_24h > 0
                          ? "increase"
                          : "decrease"
                      }
                    />
                    {coins.market_data.price_change_percentage_24h}%
                  </StatHelpText>
                </Stat>

                <Badge
                  fontSize={"2xl"}
                  bgColor={"blackAlpha.800"}
                  color={"white"}
                >{`#${coins.market_cap_rank}`}</Badge>

                <CustomBar
                  high={`${currencySymbol}${coins.market_data.high_24h[currency]}`}
                  low={`${currencySymbol}${coins.market_data.low_24h[currency]}`}
                />

                <Box w={"full"} p="4">
                  <Item
                    title={"Max Supply"}
                    value={coins.market_data.max_supply}
                  />
                  <Item
                    title={"Circulating Supply"}
                    value={coins.market_data.circulating_supply}
                  />
                  <Item
                    title={"Market Cap"}
                    value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}
                  />
                  <Item
                    title={"All Time Low"}
                    value={`${currencySymbol}${coins.market_data.atl[currency]}`}
                  />
                  <Item
                    title={"All Time High"}
                    value={`${currencySymbol}${coins.market_data.ath[currency]}`}
                  />
                </Box>
              </VStack>
            </>
          )}
      </Container>
    </>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetails