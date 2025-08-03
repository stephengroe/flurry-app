import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { User } from "@/models/User";
import { generateSampleData } from "@/scripts/generateSampleData";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const defaultUser: User = {
    id: "0",
    name: "User",
    joinDate: new Date().toISOString(),
  };

  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await AsyncStorage.getItem("user");
        if (data !== null) {
          const fetchedUser: User = JSON.parse(data);
          setUser(fetchedUser);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);

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
          onPress={generateSampleData}
        >
          <ButtonText>Load sample data</ButtonText>
        </Button>
        <Text>Welcome, {user.name}!</Text>
      </View>
    </SafeAreaView>
  );
}
