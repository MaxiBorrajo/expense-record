import CategoryService from "../services/Category.service.js";
export default async function executeCategoryMock() {
  try {
    await CategoryService.create({category_name:'Tax'});
    await CategoryService.create({category_name:'Deposit'});
    await CategoryService.create({category_name:'Transfer'});
    await CategoryService.create({category_name:'Purchase'});
    await CategoryService.create({category_name:'Withdraw'});
    await CategoryService.create({category_name:'Sale'});
    await CategoryService.create({category_name:'Salary'});
    await CategoryService.create({category_name:'Dividend'});
    await CategoryService.create({category_name:'Rent'});
    await CategoryService.create({category_name:'Groceries'});
    await CategoryService.create({category_name:'Subscription'});
    await CategoryService.create({category_name:'Others'});
  } catch (error) {
    throw error;
  }
}
