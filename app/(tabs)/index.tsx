import { DebtCard } from "@/components/debt-card";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Debt } from "@/models/Debt";
import { User } from "@/models/User";
import { generateSampleData } from "@/scripts/generateSampleData";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const defaultUser: User = {
    id: "0",
    name: "User",
    joinDate: new Date().toISOString(),
  };

  const [user, setUser] = useState<User>(defaultUser);
  const [defaultData, setDefaultData] = useState(true);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [debts, setDebts] = useState<Debt[]>([]);

  const handleClose = () => setShowAlertDialog(false);

  const fetchUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      if (data !== null) {
        const fetchedUser: User = JSON.parse(data);
        setUser(fetchedUser);
        setDefaultData(false);
      }
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  };

  const fetchDebts = async () => {
    try {
      const data = await AsyncStorage.getItem("debts");
      if (data !== null) {
        const fetchedDebts: Debt[] = JSON.parse(data);
        const adjustedDebts = fetchedDebts
          .filter((debt) => debt.balance > 0)
          .sort((a, b) => a.balance - b.balance);
        setDebts(adjustedDebts);
      }
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  };

  const handleOverwrite = async () => {
    try {
      await generateSampleData();
      await fetchUser();
      setShowAlertDialog(false);
    } catch (e) {
      console.error("Error generating sample data:", e);
    }
  };

  const handleSampleData = async () => {
    if (defaultData) {
      generateSampleData();
      fetchUser();
    } else {
      setShowAlertDialog(true);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchDebts();
  }, []);

  return (
    <SafeAreaView className="overflow-auto">
      <ScrollView>
        <VStack className="m-6 mb-3" space="lg">
          <View className="flex-row justify-between items-center">
            <Heading size="3xl" className="flex-start">
              {user.name === "User" ? "Welcome" : `Welcome, ${user.name}`}
            </Heading>
            <Link href="/settings">
              <Ionicons name="settings-outline" size={24} color="grey" />
            </Link>
          </View>
          <Card size="lg" variant="elevated" className="">
            <Heading size="lg" className="mb-1">
              April 2027
            </Heading>
            <Text>Debt freedom date</Text>
          </Card>
          <View>
            <Button onPress={handleSampleData}>
              <ButtonText>Load sample data</ButtonText>
            </Button>
            <AlertDialog
              isOpen={showAlertDialog}
              onClose={handleClose}
              size="md"
            >
              <AlertDialogBackdrop />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <Heading
                    className="text-typography-950 font-semibold"
                    size="md"
                  >
                    Overwrite existing data?
                  </Heading>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                  <Text size="md">
                    Loading sample data will erase all existing data and replace
                    it with sample data. This cannot be undone.
                  </Text>
                </AlertDialogBody>
                <AlertDialogFooter className="">
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={handleClose}
                    size="sm"
                  >
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                  <Button size="sm" onPress={handleOverwrite}>
                    <ButtonText>Overwrite</ButtonText>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </View>
        </VStack>

        <View>
          <Heading size="xl" className="m-6">
            Debts
          </Heading>
          <VStack space="sm">
            {debts.map((debt) => {
              return <DebtCard key={debt.id} debt={debt} progress={false} />;
            })}
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
