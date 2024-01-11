import { faker } from "@faker-js/faker";
import ExpenseService from "../services/Expense.service.js";
import IconService from "../services/Icon.service.js";
export default async function executeExpenseMock() {
  try {
    const icons = await IconService.getAll();

    const icon_ids = icons.map((icon) => icon._id);

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
          from: "2023-12-01T00:00:00.000Z",
          to: "2023-12-31T00:00:00.000Z",
        }),
        user_id: "658f5d7af29e79167d15970c",
        icon_id: faker.helpers.arrayElement(icon_ids),
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
          from: "2024-01-01T00:00:00.000Z",
          to: "2024-01-31T00:00:00.000Z",
        }),
        user_id: "658f5d7af29e79167d15970c",
        icon_id: faker.helpers.arrayElement(icon_ids),
      });
    }
  } catch (error) {
    throw error;
  }
}
