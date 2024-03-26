import notification from "../models/Notification.js";
import BaseRepository from "./Base.repository.js";

class NotificationRepository extends BaseRepository {
  constructor() {
    super(notification);
  }
}

export default new NotificationRepository();
