import notificationService from "../services/Notification.service.js";

async function getNotifications(req, res, next) {
  try {
    const uid = req.user._id;

    const foundNotifications = await notificationService.getAll({
      user_id: uid,
      read: false,
    });

    return res.status(200).json({
      resource: foundNotifications,
    });
  } catch (error) {
    next(error);
  }
}

async function readNotification(req, res, next) {
  try {
    const uid = req.user._id;
    const nid = req.params.nid;

    await notificationService.updateByFilter(
      {
        user_id: uid,
        _id: nid,
      },
      {
        read: true,
      }
    );

    return res.status(200).json({
      message: "Notifications updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function deleteNotification(req, res, next) {
  try {
    const uid = req.user._id;
    const nid = req.params.nid;

    await notificationService.deleteByFilter({
      user_id: uid,
      _id: nid,
    });

    return res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export { getNotifications, readNotification, deleteNotification };
