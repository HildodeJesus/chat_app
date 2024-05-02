export default function usePhoneNumber() {
	const getPhoneNumberDigits = (numberPhoneInputed: string) => {
		let phoneNumberInPart = numberPhoneInputed.split(" ");
		if (phoneNumberInPart.length < 2) {
			return numberPhoneInputed;
		}

		let ddd: any = phoneNumberInPart[0].split("(");

		ddd = ddd[1].split(")")[0];

		let numberPhone = phoneNumberInPart[1].split("-");

		return ddd + numberPhone[0] + numberPhone[1];
	};

	const formatPhoneNumber = (numberPhoneInputed: string) => {
		let numberPhoneWithDDD = getPhoneNumberDigits(numberPhoneInputed);
		if (numberPhoneWithDDD.length == 11) {
			const numbers = numberPhoneInputed.split("");
			const ddd = numbers[0] + numbers[1];
			let numberPhone = "";
			for (let i = 2; i < numbers.length; i++) {
				if (i == 6) numberPhone += numbers[i] + "-";
				else numberPhone += numbers[i];
			}

			numberPhoneWithDDD = `(${ddd}) ${numberPhone}`;
		}

		return numberPhoneWithDDD;
	};

	return {
		formatPhoneNumber,
		getPhoneNumberDigits,
	};
}
