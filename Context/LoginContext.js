import { createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginContext = createContext({
  user:null,
  setUser: (auth) => {}
});
