import { faker } from "@faker-js/faker";
import ExpenseService from "../services/Expense.service.js";
import CategoryService from "../services/Category.service.js";
export default async function executeExpenseMock() {
  try {
    const categories = await CategoryService.getAll();

    const category_ids = categories.map((category) => category._id);
    
    for (let index = 0; index < 300; index++) {
      await ExpenseService.create({ 
        title: faker.finance.transactionType(),
        amount:
          faker.finance.amount({ min: -1000000, max: 1000000, dec: 2 }) === 0
            ? 100
            : faker.finance.amount({ min: -1000000, max: 1000000, dec: 2 }),
        createdAt: faker.date.anytime(),
        user_id: "658f5d7af29e79167d15970c",
        category_id: faker.helpers.arrayElement(category_ids)
      });
    }
  } catch (error) {
    throw error;
  }
}
