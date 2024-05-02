import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
	const getUser = async () => {
		const user = await AsyncStorage.getItem("user_credentials");

		return user;
	};

	const validate = async () => {
		const user = getUser();
		if (user === null) {
			return false;
		}

		return true;
	};

	const login = (phoneNumber: string) => {};

	return {
		getUser,
		validate,
		login,
	};
}
