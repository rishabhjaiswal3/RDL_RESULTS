import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import { useRouter } from "expo-router";
import { convertTo12HourFormat } from "../service/service";
const { width } = Dimensions.get("window"); // Get the screen width
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Card = ({ imageSource, col, data }) => {
  const fontScale = PixelRatio.getFontScale();
  const getFontSize = (size) => size / fontScale;
  const navigation = useNavigation();

  const { title, timesList, values, id } = data;

  const previousDate = timesList[timesList.length - 2] ?? "##";
  const previousValue = values[timesList.length - 2] ?? "##";
  const currentDate = timesList[timesList.length - 1] ?? "##";

  return (
    <View
      onTouchEndCapture={(data) => {
        navigation.navigate("city", {
          cityData: { id, title },
        });
      }}
      style={{
        width: 100 / col + "%",
        position: "relative", // Parent container needs relative positioning
      }}
    >
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: imageSource }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "400",
              fontSize: getFontSize(55),
            }}
          >
            {isNaN(previousValue) || previousValue >= 10
              ? previousValue
              : `0${previousValue}`}
          </Text>
          <Text style={styles.normalText}>{title}</Text>
          <Text style={styles.normalText}>
            {convertTo12HourFormat(previousDate) ?? "##"}
          </Text>
          <Text style={styles.stripText}>
            Next Result - {convertTo12HourFormat(currentDate) ?? "##"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 4,
    height: 130,
    width: width / 2 - 20, // Calculate width based on screen width and desired margins
    backgroundColor: "#FEC200",
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  cardImage: {
    height: "100%", // Cover the entire container height
    width: "100%", // Cover the entire container width
  },
  textContainer: {
    alignContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  normalText: {
    textAlign: "center",
    color: "white",
    marginBottom: 1,
    fontSize: 14,
  },
  stripText: {
    backgroundColor: "#FEC200",
    textAlign: "center",
    marginBottom: 7,
    marginHorizontal: 2,
    fontSize: 13,
    // margin: 2,
    // marginTop: 2,
  },
  cardDescription: {
    color: "#555",
    marginTop: 5,
  },
});

export default Card;
