import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IUser } from "../interface/User";

export default function useAuth() {
	const getUser = async () => {
		const user = await AsyncStorage.getItem("user");

		return user;
	};

	const validate = async () => {
		// const userToken = await AsyncStorage.getItem("user_token");
		// axios.get(`/validate`, {headers: {Authorization: `Bearer ${userToken}`}}).then(res => {
		// 	if(res.status > 199 && res.status < 300) {

		// 	}
		// })
		

		return true;
	};
	const signUp = (user: IUser) => {};

	const signIn = (email: string, password: string) => {
		// axios.post("/api/login", {email, password}).then(res => {
		// 	if(res.status <300 && res.status > 199) 
		// 		AsyncStorage.setItem("user_token", JSON.stringify(res.data))
		// }).catch(console.log)

		AsyncStorage.setItem("user_token", "sdfhjj")
	};

	return {
		getUser,
		validate,
		signIn,
	};
}
