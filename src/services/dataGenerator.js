import { Faker, en, en_US, pl, ka_GE } from "@faker-js/faker";

const applyErrors = (user, errorCount) => {
  const applyError = (str) => {
    const rand = Math.random();
    if (rand < 0.33) {
      // Delete a character
      const index = Math.floor(Math.random() * str.length);
      return str.slice(0, index) + str.slice(index + 1);
    } else if (rand < 0.66) {
      // Add a random character
      const index = Math.floor(Math.random() * str.length);
      const char = new Faker({ locale: en_US }).string.alpha({ count: 1 });
      return str.slice(0, index) + char + str.slice(index);
    } else {
      // Swap two characters
      if (str.length < 2) return str;
      const index = Math.floor(Math.random() * (str.length - 1));
      return (
        str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2)
      );
    }
  };

  for (let i = 0; i < errorCount; i++) {
    const randField = Math.floor(Math.random() * 3);
    if (randField === 0) user.name = applyError(user.name);
    if (randField === 1) user.address = applyError(user.address);
    if (randField === 2) user.phone = applyError(user.phone);
  }
};

export const generateUserData = (region, errorCount, seed, page) => {
  let fakerInstance;
  switch (region) {
    case "USA":
      fakerInstance = new Faker({ locale: [en_US, en] });
      break;
    case "Poland":
      fakerInstance = new Faker({ locale: [pl, en] });
      break;
    case "Georgia":
      fakerInstance = new Faker({ locale: [ka_GE, en] });
      break;
    default:
      fakerInstance = new Faker({ locale: [en_US, en] });
      break;
  }

  fakerInstance.seed(Number(seed) + Number(page));

  const users = [];
  for (let i = 0; i < 20; i++) {
    const user = {
      index: i + 1 + (page - 1) * 20,
      id: fakerInstance.string.uuid(),
      name: fakerInstance.person.fullName(),
      address: `${fakerInstance.location.streetAddress()}, ${fakerInstance.location.city()}, ${fakerInstance.location.state()}`,
      phone: fakerInstance.phone.number(),
    };

    applyErrors(user, errorCount);
    users.push(user);
  }

  return users;
};
