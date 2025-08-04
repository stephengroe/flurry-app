import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { generateSampleData } from "@/scripts/generateSampleData";
import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertReason, setalertReason] = useState<"delete" | "overwrite">(
    "delete"
  );
  const handleClose = () => setShowAlertDialog(false);
  const defaultUser: User = {
    id: "0",
    name: "User",
    joinDate: new Date().toISOString(),
    extraPayment: 0,
  };

  const [user, setUser] = useState<User>(defaultUser);
  const [defaultData, setDefaultData] = useState(true);

  const overwriteData = async () => {
    try {
      await generateSampleData();
      await fetchUser();
      setShowAlertDialog(false);
    } catch (e) {
      console.error("Error generating sample data:", e);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Cannot clear data:", e);
    }
  };

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

  const handleSampleData = async () => {
    if (defaultData) {
      generateSampleData();
      fetchUser();
    } else {
      setalertReason("overwrite");
      setShowAlertDialog(true);
    }
  };

  const handleClearData = async () => {
    setalertReason("delete");
    setShowAlertDialog(true);
  };

  return (
    <>
      <SafeAreaView className="p-6 relative">
        <View>
          <Button variant="link" onPress={router.back} className="justify-end">
            <ButtonText className="text-xl">Done</ButtonText>
          </Button>
          <VStack space="xl">
            <Heading className="text-3xl">Settings</Heading>
          </VStack>
        </View>
      </SafeAreaView>

      <View className="m-6 gap-3">
        <Button onPress={handleSampleData}>
          <ButtonText>Load sample data</ButtonText>
        </Button>
        <Button onPress={handleClearData} action="negative">
          <ButtonText>Clear all data</ButtonText>
        </Button>
      </View>

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
              {alertReason === "delete"
                ? "Loading sample data will erase all existing debts, payments, and user data and replace it with sample data. This cannot be undone."
                : "Clearing data will erase all existing debts, payments, and user data. This cannot be undone."}
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
            <Button
              size="sm"
              onPress={alertReason === "delete" ? clearData : overwriteData}
            >
              <ButtonText>
                {alertReason === "delete" ? "Delete" : "Overwrite"}
              </ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
