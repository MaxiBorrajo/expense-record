import notificationService from "../services/Notification.service.js";

async function getNotifications(req, res, next) {
  try {
    const uid = req.user._id;

    const foundNotifications = await notificationService.getByFilter({
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

async function readNotifications(req, res, next) {
  try {
    const uid = req.user._id;
    const notificationsIds = req.body.notificationsIds;

    await notificationService.updateByFilter(
      {
        user_id: uid,
        _id: { $in: notificationsIds },
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

export { getNotifications, readNotifications, deleteNotification };
