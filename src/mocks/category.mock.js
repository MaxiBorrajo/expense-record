import CategoryService from "../services/Categories.service.js";
export default async function executeCategoryMock() {
  try {
    await CategoryService.create({category_name:'Tax',
    icon_id:'65949d759712967dc6d59ca2',});
    await CategoryService.create({category_name:'Deposit',
    icon_id:'65a15b128dc2be13bb9293f4'});
    await CategoryService.create({category_name:'Transfer',
    icon_id:'65949d759712967dc6d59cb4'});
    await CategoryService.create({category_name:'Purchase',
    icon_id:'65a15b8f8dc2be13bb9293f5'});
    await CategoryService.create({category_name:'Withdraw',
    icon_id:'65a15c078dc2be13bb9293f6'});
    await CategoryService.create({category_name:'Sale',
    icon_id:'65a15c7a8dc2be13bb9293f7'});
    await CategoryService.create({category_name:'Salary',
    icon_id:'65a15cb68dc2be13bb9293f8'});
    await CategoryService.create({category_name:'Dividend',
    icon_id:'65a15ce28dc2be13bb9293f9'});
    await CategoryService.create({category_name:'Rent',
    icon_id:'65a15d588dc2be13bb9293fa'});
    await CategoryService.create({category_name:'Groceries',
    icon_id:'65949d769712967dc6d59cc0'});
    await CategoryService.create({category_name:'Subscription',
    icon_id:'65949d759712967dc6d59cae'});
    await CategoryService.create({category_name:'Others',
    icon_id:'65949d729712967dc6d59c7c'});
    await CategoryService.create({category_name:'Income',
    icon_id:'65a15ece8dc2be13bb9293fb'});
    await CategoryService.create({category_name:'Loss',
    icon_id:'65a15edb8dc2be13bb9293fc'});
    await CategoryService.create({category_name:'Investment',
    icon_id:'65949d769712967dc6d59cbc'});
  } catch (error) {
    throw error;
  }
}
