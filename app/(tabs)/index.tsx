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
import { generateSampleData } from "@/scripts/generateSampleData";
import { useDebtStore } from "@/stores/useDebtStore";
import { User } from "@/types/User";
import { getFreedomDate } from "@/utils/freedom-date";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const defaultUser: User = {
    id: "0",
    name: "User",
    joinDate: new Date().toISOString(),
    extraPayment: 0,
  };

  const [user, setUser] = useState<User>(defaultUser);
  const [defaultData, setDefaultData] = useState(true);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const { debts, loadDebts } = useDebtStore();
  const filteredDebts = useMemo(() => {
    return debts.filter((d) => d.balance > 0);
  }, [debts]);

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
    loadDebts();
  }, [loadDebts]);

  if (!debts) return null;

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <VStack className="m-6 mb-3" space="xl">
            <View className="flex-row justify-between items-center">
              <Heading size="3xl" className="flex-start">
                {user.name === "User" ? "Welcome" : `Welcome, ${user.name}`}
              </Heading>
              <Link href="../settings-modal">
                <Ionicons name="settings-outline" size={24} color="grey" />
              </Link>
            </View>
            <Card
              size="lg"
              variant="elevated"
              className="items-center flex-row gap-4"
            >
              <Ionicons name="today-outline" size={24} color="grey" />
              <View>
                <Text className="text-xl font-bold text-black">
                  {new Date(
                    getFreedomDate(filteredDebts, user.extraPayment)
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <Text className="text-lg center">Debt freedom date</Text>
              </View>
            </Card>
            <Card
              size="lg"
              variant="elevated"
              className="flex-row items-center gap-4"
            >
              <Ionicons name="flame-outline" size={24} color="grey" />
              <View>
                <Text className="text-xl font-bold text-black">17 months</Text>
                <Text className="text-lg center">Payment streak</Text>
              </View>
            </Card>
          </VStack>

          <View>
            <Heading size="xl" className="m-6">
              Debts
            </Heading>
            {filteredDebts.length > 0 ? (
              <VStack space="sm">
                {filteredDebts.map((debt) => {
                  return (
                    <DebtCard key={debt.id} debt={debt} progress={false} />
                  );
                })}
              </VStack>
            ) : (
              <View className="gap-6 p-6 mx-6 items-center">
                <Text className="text-center">
                  No data yet. Add some, or load sample data to start. You can
                  always load sample data in Settings.
                </Text>
                <Button onPress={handleSampleData}>
                  <ButtonText>Load sample data</ButtonText>
                </Button>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              Overwrite existing data?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="md">
              Loading sample data will erase all existing debts, payments, and
              user data and replace it with sample data. This cannot be undone.
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
    </>
  );
}
