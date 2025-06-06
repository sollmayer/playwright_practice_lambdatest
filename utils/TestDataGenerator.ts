import { faker } from "@faker-js/faker";

export class TestDataGenerator {
	
    static generateUserData(passwordLength: number = 8) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		return {
			firstName,
			lastName,
			email: this.generateEmail(firstName,lastName),
			telephone: faker.phone.number(),
			password: this.generatePassword(passwordLength),
		};
	}

	static generateEmail(firstName:string, lastName:string): string {
		return faker.internet.email({firstName,lastName});
	}

	static generatePassword(length: number = 8): string {
		return faker.internet.password({ length });
	}
}
