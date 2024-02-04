import userService from "../services/User.service.js";
import { UserDto } from "../dto/UserDto.js";
async function getCurrentUser(req, res, next) {
  try {
    const uid = req.user._id;

    const foundUser = await userService.getById(uid);

    return res.status(200).json({
      resource: new UserDto(foundUser),
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const uid = req.user._id;

    const updateUser = await userService.updateById(uid, req.body);

    return res.status(200).json({
      message: "User updated successfully",
      resource: new UserDto(updateUser),
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const uid = req.user._id;

    await userService.deleteById(uid);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export { updateUser, deleteUser, getCurrentUser };
