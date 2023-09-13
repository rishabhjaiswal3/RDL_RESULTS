import { useLocalSearchParams } from "expo-router/src/hooks";
import { SafeAreaView } from "react-native";
import { View, StyleSheet, Text, FlatList } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import moment from "moment-timezone";
import axios from "axios";
import { convertTo12HourFormat } from "../../service/service";
import { ScrollView } from "react-native-gesture-handler";
import CustomDatePicker from "../../component/CustomDatePicker";

const City = ({ route }) => {
  const myDate = useRef(null);
  const [currentState, setCurrentState] = useState(myDate.current);
  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState();
  const params = useLocalSearchParams();
  const { cityData } = params;

  if (currentState !== cityData?.title) {
    myDate.current = moment(new Date()).tz("Asia/Kolkata").format("YYYY/MM/DD");
    setCurrentState(cityData?.title);
  }

  let HeadTable = ["Head1", "Head2"];
  let DataTable = [];

  const TableRow = (data) => {
    return (
      <View style={styles.table}>
        <View style={styles.row0}>
          <View style={styles.cell0}>
            <Text style={styles.cellText}>Time/Date</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Number</Text>
          </View>
        </View>
        <ScrollView>
          {data.map((res) => {
            return (
              <View style={styles.row}>
                <View style={styles.cell0}>
                  <Text style={styles.cellText}>{res[0]}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.cellText}>{res[1]}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const getCardData = () => {
    const apiKey = "http://rdl-result.com/api";
    console.log(
      "date before calling api ================================================",
      currentDate,
      myDate.current
    );
    if (myDate?.current) {
      axios
        .post(apiKey + "/getClientSideData", { date: myDate.current })
        .then((response) => {
          // console.log("response is", response);
          if (items != response?.data?.logs) {
            setItems(response?.data?.logs);
          }
        });
    }
  };

  const setMyCurrentDate = (date) => {
    setCurrentDate(date);
    getCardData();
    myDate.current = date;
  };

  useEffect(() => {
    console.log("my current date is", currentDate);
    setInterval(() => {
      getCardData();
    }, 20000);
  }, []);

  useEffect(() => {
    setCurrentDate(moment(new Date()).tz("Asia/Kolkata").format("YYYY/MM/DD"));
    myDate.current = moment(new Date()).tz("Asia/Kolkata").format("YYYY/MM/DD");
  }, [currentState]);

  useEffect(() => {
    getCardData();
  }, [myDate?.current]);

  HeadTable = ["Time/Date", "Number"];
  let currentData = items.filter((item) => {
    return item?.title === cityData?.title;
  });

  if (currentData.length > 0) {
    DataTable = currentData[0]?.values.map((val, index) => {
      // val %= 100;
      if (isNaN(val)) {
        return [
          convertTo12HourFormat(currentData[0]?.timesList[index]),
          // index == currentData.length ? val : val > 10 ? val : `0${val}`,
          val,
        ];
      } else {
        val = val >= 100 ? 0 : val;
        return [
          convertTo12HourFormat(currentData[0]?.timesList[index]),
          // index == currentData.length ? val : ,
          val >= 10 ? val : `0${val}`,
        ];
      }
    });
    DataTable.reverse();
  }
  // currentData = currentData.reverse();
  console.log(
    "my current Date is",
    currentDate,
    "my useRef Date is",
    currentData
  );
  return (
    <View
      style={{
        backgroundColor: "#FEC200",
        flex: 1,
        minHeight: 200,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 12,
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        <View style={{ height: 50, width: 210 }}>
          <Text
            style={{
              color: "green",
              fontSize: 30,
              marginLeft: 10,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
              textAlign: "Left",
              height: 50,
              marginRight: 10, // Add some spacing between the two Text elements
            }}
          >
            {cityData?.title}
          </Text>
        </View>

        <SafeAreaView style={{ backgroundColor: "green", padding: 6 }}>
          <CustomDatePicker date={myDate} setDate={setMyCurrentDate} />
        </SafeAreaView>
      </View>

      {TableRow(DataTable)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: "#ffffff",
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  headText: {
    marginLeft: 25,
    fontSize: 18,
  },
  text: {
    marginLeft: 36,
    fontSize: 18,
  },
  HeadTableTextData: {
    // marginTop: 10,
    marginRight: 3,
  },
  dataWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TableTextData: {
    marginTop: 10,
    display: "flex",
    borderWidth: 1,
    borderBottomColor: "grey",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    fontSize: "50px",
  },
  datePicker: {
    backgroundColor: "red",
    color: "red",
  },
  table: {
    flexDirection: "column",
    marginBottom: 100,
  },
  row0: {
    flexDirection: "row",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  cell0: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 25,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    textAlign: "center",
    fontSize: 17,
  },
});

export default City;
