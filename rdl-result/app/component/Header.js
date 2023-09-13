import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Share,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { getShareUrl } from "../service/city";

const Header = () => {
  // const navigation = useNavigation();
  // const [currentURL, setCurrentURL] = useState("");

  // const getShareUrl = () => {
  //   try {
  //     const apiKey = "https://rdl-result.com/api";
  //     axios.get(apiKey + "/getSharingData").then((response) => {
  //       const data = response?.data;
  //       setCurrentURL(`${data.message} ${data.url}`);
  //       // setCurrentURL();
  //     });
  //   } catch (e) {
  //     console.log("error is", e);
  //   }
  // };

  // useEffect(() => {
  //   getShareUrl();
  // }, []);

  // const onShare = async () => {
  //   try {
  //     await Share.share({
  //       message: currentURL,
  //     });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // return (
  //   <View style={styles.headerContainer}>
  //     <View style={styles.headerContent}>
  //       <Ionicons
  //         onPress={() => navigation.openDrawer()}
  //         name="menu"
  //         size={32}
  //         color="white"
  //       />
  //       <Text style={styles.headerTitle}>RDL Results</Text>
  //       <TouchableOpacity onPress={} style={styles.shareButton}>
  //         <Image
  //           source={require("../../assets/icon1.png")}
  //           style={styles.headerIcon}
  //         />
  //       </TouchableOpacity>
  //       <TouchableOpacity onPress={() => onShare()} style={styles.shareButton}>
  //         <Text style={styles.shareButtonText}>SHARE</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
  const navigation = useNavigation();
  const [currentURL, setCurrentURL] = useState("");
  const [refreshCounter, setRefreshCounter] = useState(0);

  const getShareUrl = () => {
    try {
      const apiKey = "http://rdl-result.com/api";
      axios.get(apiKey + "/getSharingData").then((response) => {
        const data = response?.data;
        setCurrentURL(`${data.message} ${data.url}`);
      });
    } catch (e) {
      console.log("error is", e);
    }
  };

  useEffect(() => {
    getShareUrl();
  }, []);

  const onShare = async () => {
    try {
      await Share.share({
        message: currentURL,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const refreshPage = () => {
    // Increment the refresh counter to trigger a re-render of the component
    setRefreshCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Ionicons
          onPress={() => navigation.openDrawer()}
          name="menu"
          size={32}
          color="white"
        />
        <Text style={styles.headerTitle}>RDL Results</Text>
        <TouchableOpacity onPress={refreshPage} style={styles.shareButton}>
          <Image
            source={require("../../assets/icon1.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onShare()} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>SHARE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    backgroundColor: "#007201",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    marginLeft: 0,
  },
  headerIcon: {
    width: 40,
    height: 40,
  },
  shareButton: {
    padding: 5,
  },
  shareButtonText: {
    color: "white",
  },
});

export default Header;
