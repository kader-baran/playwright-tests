import { faker } from "@faker-js/faker";

// Test verilerini dinamik olarak yöneten yardımcı sınıf
export class TestDataHelper {
  // Kullanıcı bilgileri için dinamik veri oluşturma
  static generateUserData() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      dateOfBirth: faker.date.past({ years: 30 }).toISOString().split("T")[0],
      company: faker.company.name(),
      website: faker.internet.url(),
      salary: faker.number.int({ min: 30000, max: 150000 }),
      department: faker.helpers.arrayElement([
        "IT",
        "HR",
        "Finance",
        "Marketing",
        "Sales",
      ]),
      position: faker.person.jobTitle(),
    };
  }

  // Form verileri için dinamik veri oluşturma
  static generateFormData() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      currentAddress: faker.location.streetAddress(),
      permanentAddress: faker.location.streetAddress(),
      phone: faker.phone.number(),
      subject: faker.lorem.sentence(),
      message: faker.lorem.paragraph(),
    };
  }

  // Tablo verileri için dinamik veri oluşturma
  static generateTableData() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
      salary: faker.number.int({ min: 30000, max: 150000 }),
      department: faker.helpers.arrayElement([
        "IT",
        "HR",
        "Finance",
        "Marketing",
        "Sales",
      ]),
    };
  }

  // Dosya yükleme için dinamik dosya adları
  static generateFileData() {
    return {
      imageFile: "test-image.jpg",
      documentFile: "test-document.pdf",
      textFile: "test-file.txt",
      excelFile: "test-data.xlsx",
    };
  }

  // Renk verileri için dinamik seçim
  static generateColorData() {
    return {
      colors: ["Red", "Blue", "Green", "Yellow", "Purple", "Black", "White"],
      getRandomColor: () =>
        faker.helpers.arrayElement([
          "Red",
          "Blue",
          "Green",
          "Yellow",
          "Purple",
          "Black",
          "White",
        ]),
    };
  }

  // Tarih verileri için dinamik oluşturma
  static generateDateData() {
    return {
      today: new Date().toISOString().split("T")[0],
      tomorrow: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      nextWeek: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      pastDate: faker.date.past({ years: 5 }).toISOString().split("T")[0],
      futureDate: faker.date.future({ years: 5 }).toISOString().split("T")[0],
    };
  }

  // Sayısal veriler için dinamik oluşturma
  static generateNumericData() {
    return {
      randomNumber: (min: number, max: number) =>
        faker.number.int({ min, max }),
      randomDecimal: (min: number, max: number, precision: number = 2) =>
        Number(
          faker.number
            .float({ min, max, fractionDigits: precision })
            .toFixed(precision)
        ),
      randomPrice: (min: number = 10, max: number = 1000) =>
        Number(faker.number.float({ min, max, fractionDigits: 2 }).toFixed(2)),
      randomQuantity: (min: number = 1, max: number = 100) =>
        faker.number.int({ min, max }),
    };
  }

  // Metin verileri için dinamik oluşturma
  static generateTextData() {
    return {
      randomWord: () => faker.word.sample(),
      randomSentence: () => faker.lorem.sentence(),
      randomParagraph: () => faker.lorem.paragraph(),
      randomText: (length: number = 50) =>
        faker.lorem.text().substring(0, length),
      randomName: () => faker.person.fullName(),
      randomEmail: () => faker.internet.email(),
      randomPhone: () => faker.phone.number(),
      randomUrl: () => faker.internet.url(),
    };
  }

  // Dropdown seçenekleri için dinamik veri
  static generateDropdownData() {
    return {
      countries: [
        "Turkey",
        "USA",
        "UK",
        "Germany",
        "France",
        "Italy",
        "Spain",
        "Canada",
      ],
      cities: [
        "Istanbul",
        "Ankara",
        "Izmir",
        "Bursa",
        "Antalya",
        "Adana",
        "Konya",
        "Gaziantep",
      ],
      departments: [
        "IT",
        "HR",
        "Finance",
        "Marketing",
        "Sales",
        "Operations",
        "Legal",
      ],
      positions: [
        "Manager",
        "Developer",
        "Analyst",
        "Designer",
        "Engineer",
        "Consultant",
      ],
      getRandomCountry: () =>
        faker.helpers.arrayElement([
          "Turkey",
          "USA",
          "UK",
          "Germany",
          "France",
          "Italy",
          "Spain",
          "Canada",
        ]),
      getRandomCity: () =>
        faker.helpers.arrayElement([
          "Istanbul",
          "Ankara",
          "Izmir",
          "Bursa",
          "Antalya",
          "Adana",
          "Konya",
          "Gaziantep",
        ]),
      getRandomDepartment: () =>
        faker.helpers.arrayElement([
          "IT",
          "HR",
          "Finance",
          "Marketing",
          "Sales",
          "Operations",
          "Legal",
        ]),
      getRandomPosition: () =>
        faker.helpers.arrayElement([
          "Manager",
          "Developer",
          "Analyst",
          "Designer",
          "Engineer",
          "Consultant",
        ]),
    };
  }

  // Checkbox/Radio seçenekleri için dinamik veri
  static generateSelectionData() {
    return {
      hobbies: [
        "Sports",
        "Reading",
        "Music",
        "Travel",
        "Cooking",
        "Gaming",
        "Photography",
      ],
      gender: ["Male", "Female", "Other"],
      experience: ["0-2 years", "3-5 years", "6-10 years", "10+ years"],
      education: ["High School", "Bachelor", "Master", "PhD"],
      getRandomHobby: () =>
        faker.helpers.arrayElement([
          "Sports",
          "Reading",
          "Music",
          "Travel",
          "Cooking",
          "Gaming",
          "Photography",
        ]),
      getRandomGender: () =>
        faker.helpers.arrayElement(["Male", "Female", "Other"]),
      getRandomExperience: () =>
        faker.helpers.arrayElement([
          "0-2 years",
          "3-5 years",
          "6-10 years",
          "10+ years",
        ]),
      getRandomEducation: () =>
        faker.helpers.arrayElement([
          "High School",
          "Bachelor",
          "Master",
          "PhD",
        ]),
    };
  }

  // API test verileri için dinamik oluşturma
  static generateApiTestData() {
    return {
      userId: faker.number.int({ min: 1, max: 1000 }),
      postId: faker.number.int({ min: 1, max: 100 }),
      commentId: faker.number.int({ min: 1, max: 500 }),
      albumId: faker.number.int({ min: 1, max: 100 }),
      photoId: faker.number.int({ min: 1, max: 5000 }),
      todoId: faker.number.int({ min: 1, max: 200 }),
    };
  }

  // Dinamik ID oluşturma
  static generateDynamicId(prefix: string = "test"): string {
    return `${prefix}-${faker.string.alphanumeric(8)}`;
  }

  // Dinamik class adı oluşturma
  static generateDynamicClass(prefix: string = "test"): string {
    return `${prefix}-${faker.string.alphanumeric(6)}`;
  }

  // Test senaryoları için önceden tanımlanmış veriler
  static getPredefinedData() {
    return {
      validUser: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
      },
      invalidUser: {
        firstName: "",
        lastName: "",
        email: "invalid-email",
        phone: "invalid-phone",
      },
      boundaryUser: {
        firstName: "A".repeat(100), // Çok uzun isim
        lastName: "B".repeat(100), // Çok uzun soyisim
        email: "a".repeat(50) + "@" + "b".repeat(50) + ".com", // Çok uzun email
        phone: "1".repeat(20), // Çok uzun telefon
      },
    };
  }
}
