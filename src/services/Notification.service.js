import NotificationRepository from "../repositories/Notification.repository.js";
import BaseService from "./Base.service.js";

class NotificationService extends BaseService {
  constructor() {
    super(NotificationRepository);
  }
}

export default new NotificationService();
