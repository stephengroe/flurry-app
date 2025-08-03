import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [user, setUser] = useState("anonymous user");

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("user", value);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Link href="/settings">
          <Ionicons name="settings-outline" size={24} color="grey" />
        </Link>
        <Card size="lg" variant="elevated" className="m-3">
          <Heading size="lg" className="mb-1">
            Home
          </Heading>
          <Text size="lg">
            This screen will show an overview of debt repayment progress, plus
            gamification (streaks + badges).
          </Text>
        </Card>
        <Button
          size="lg"
          variant="solid"
          action="primary"
          onPress={() => storeData("Alex")}
        >
          <ButtonText>Save Data</ButtonText>
        </Button>
        <Button size="lg" variant="solid" action="primary" onPress={getData}>
          <ButtonText>Retrieve data</ButtonText>
        </Button>
        <Text>{user}</Text>
      </View>
    </SafeAreaView>
  );
}
