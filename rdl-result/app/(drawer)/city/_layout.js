// import { Stack } from "expo-router";
// import { useLocalSearchParams } from "expo-router/src/hooks";

// export default function CityLayout(param) {
//   const params = useLocalSearchParams();
//   console.log("my params are in _layout", param, params);

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//         props: { params },
//       }}
//     ></Stack>
//   );
// }

import React from "react";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/src/hooks";
import Index from "./index"; // Import the index component

export default function CityLayout() {
  const params = useLocalSearchParams();
  return <Index params={params} />;
}
