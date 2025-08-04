import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type UserState = {
  user: User;
  loadUser: () => Promise<void>;
  setUser: (user: User) => void;
  saveUser: (user: User) => void;
};

const defaultUser: User = {
  id: "0",
  name: "User",
  extraPayment: 25000,
  joinDate: new Date().toISOString(),
};

export const useUserStore = create<UserState>((set) => ({
  user: defaultUser,
  setUser: (user) => set({ user }),
  loadUser: async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        const user: User = JSON.parse(data);
        set({ user: user });
      }
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  },
  saveUser: async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.error("Error saving user:", e);
    }
  },
}));
