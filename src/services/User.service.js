import UserRepository from "../repositories/User.repository.js";
import BaseService from "./Base.service.js";

class UserService extends BaseService{
    constructor(){
        super(UserRepository)
    }
}

export default new UserService();