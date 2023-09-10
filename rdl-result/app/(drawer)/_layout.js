import { Drawer } from "expo-router/drawer";
import Header from "../component/Header";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import City from "./city";
export function CustomDrawerContent({ navigation, items }) {
  const data = [
    {
      id: 1,
      title: "RDL Delhi",
    },
    { id: 2, title: "RDL Mumbai" },
    {
      id: 3,
      title: "RDL Kolkata",
    },
    { id: 4, title: "RDL Haryana" },
    {
      id: 5,
      title: "Faridabad",
    },
    { id: 6, title: "Ghaziabad" },
    {
      id: 7,
      title: "Gali",
    },
    { id: 8, title: "Deshawar" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10, height: 200, backgroundColor: "#007201" }}>
        <View style={{ marginTop: 20, marginLeft: 4 }}>
          <Pressable onPress={() => navigation.navigate("home")}>
            <Image
              source={require("../../assets/icon1.png")}
              style={{
                height: 120,
                width: 90,
                marginBottom: 4,
                marginLeft: 2,
              }}
            />
          </Pressable>
          <Text
            style={{ color: "white" }}
            onPress={() => navigation.navigate("home")}
          >
            RDL Results
          </Text>
          <Text
            style={{ color: "white" }}
            onPress={() => navigation.navigate("home")}
          >
            RDL@gmail.com
          </Text>
        </View>
      </View>

      {data.map((temp) => {
        return (
          <TouchableOpacity
            style={{ padding: 14, marginVertical: 2 }}
            onPress={() =>
              navigation.navigate("city", {
                cityData: temp,
              })
            }
            key={temp?.id}
          >
            <Text style={{ fontWeight: "bold" }}>{temp.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          header: () => <Header />,
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="city"
        options={{
          drawerLabel: "City",
          title: "City",
          header: () => <Header />,
        }}
      ></Drawer.Screen>
    </Drawer>
  );
}
