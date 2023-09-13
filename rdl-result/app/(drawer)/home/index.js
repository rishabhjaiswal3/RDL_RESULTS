import { View, Text, ScrollView, PixelRatio } from "react-native";
import React, { useState, useEffect } from "react";
import Card from "../../component/Card";
import moment from "moment-timezone";
import axios from "axios";

export default function Home() {
  const fontScale = PixelRatio.getFontScale();
  const getFontSize = (size) => size / fontScale;
  const apiKey = "http://rdl-result.com/api";
  const images = [
    {
      Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one1.jpeg",
    },
    {
      Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one2.jpeg",
    },
    {
      Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one3.jpeg",
    },
    {
      Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one4.jpeg",
    },
    {
      Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one5.jpeg",
    },
    {
      Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one6.jpeg",
    },
    {
      Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one7.jpeg",
    },
    {
      Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one8.jpeg",
    },
  ];
  const data = [
    {
      id: 0,
      title: "##",
      timesList: ["##", "##"],
      values: ["##", "##"],
    },
    {
      id: 1,
      title: "##",
      timesList: ["##", "##"],
      values: ["##", "##"],
    },
    {
      id: 2,
      title: "##",
      timesList: ["##", "##"],
      values: ["##", "##"],
    },
    {
      id: 3,
      title: "##",
      timesList: ["##", "##"],
      values: ["##", "##"],
    },
    {
      id: 4,
      title: "##",
      timesList: ["##", "##"],
      values: ["##", "##"],
    },
    {
      id: 5,
      title: "##",
      timesList: ["##", "##"],
      values: ["##", "##"],
    },
    {
      id: 6,
      title: "##",
      timesList: ["##", "##"],
      values: ["##", "##"],
    },
    {
      id: 7,
      title: "##",
      timesList: ["##", "##"],
      values: ["##", "##"],
    },
  ];

  const [items, setItems] = useState(data);

  const [currentDate, setCurrentDate] = useState(
    moment().tz("Asia/Kolkata").format("YYYY/MM/DD")
  );

  const getCardData = async (date) => {
    axios
      .post(apiKey + "/getClientCurrentData", { date: date })
      .then((response) => {
        setItems(response?.data?.logs);
      });
  };

  useEffect(() => {
    const currentNewdate = moment().tz("Asia/Kolkata").format("YYYY/MM/DD");
    setCurrentDate(currentNewdate);
    const data = getCardData(currentNewdate);
  }, []);

  return (
    <ScrollView
      style={{
        height: "auto",
        overflow: "scroll",
        backgroundColor: "#007201",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: "white",
          padding: getFontSize(16),
          textShadowOffset: { width: 1.5, height: 1 },
          textShadowRadius: 5,
          textShadowColor: "yellow",
        }}
      >
        Welcome to RDL Result...
      </Text>
      <View
        style={{
          backgroundColor: "#007201",
          height: "100vh",
          overflow: "scroll",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {items.map((item, index) => {
          return (
            <Card
              col={2}
              key={index}
              data={item}
              description="no need to describe it"
              imageSource={images[index]?.Url}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
