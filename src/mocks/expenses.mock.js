import { faker } from "@faker-js/faker";
import ExpenseService from "../services/Expense.service.js";
import CategoryService from "../services/Categories.service.js";

export default async function executeExpenseMock() {
  try {

    const categories = await CategoryService.getAll('658f5d7af29e79167d15970c');

    const categories_ids = categories.map((category) => category._id);

    const titles = [
      "Tax",
      "Deposit",
      "Transfer",
      "Purchase",
      "Withdraw",
      "Sale",
      "Salary",
      "Dividend",
      "Rent",
      "Groceries",
      "Subscription",
      "Others",
    ];

    for (let index = 0; index < 10; index++) {
      await ExpenseService.create({
        title: faker.helpers.arrayElement(titles),
        amount: 100,
        // faker.finance.amount({ min: -1000000, max: 1000000, dec: 2 }) === 0
        //   ? 100
        //   : faker.finance.amount({ min: -1000000, max: 1000000, dec: 2 }),
        createdAt: faker.date.between({
          from: "2023-11-01T00:00:00.000Z",
          to: "2023-11-31T00:00:00.000Z",
        }),
        user_id: "6591e79943db35ce3c9f5fd9",
        category_id: faker.helpers.arrayElement(categories_ids),
      });
    }

    for (let index = 0; index < 10; index++) {
      await ExpenseService.create({
        title: faker.helpers.arrayElement(titles),
        amount: -100,
        // faker.finance.amount({ min: -1000000, max: 1000000, dec: 2 }) === 0
        //   ? 100
        //   : faker.finance.amount({ min: -1000000, max: 1000000, dec: 2 }),
        createdAt: faker.date.between({
          from: "2024-02-01T00:00:00.000Z",
          to: "2024-02-31T00:00:00.000Z",
        }),
        user_id: "6591e79943db35ce3c9f5fd9",
        category_id: faker.helpers.arrayElement(categories_ids),
      });
    }
  } catch (error) {
    throw error;
  }
}
