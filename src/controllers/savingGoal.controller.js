import savingGoalService from "../services/SavingGoal.service.js";

async function getSavingGoal(req, res, next) {
  try {
    const uid = req.user._id;

    const foundSavingGoal = await savingGoalService.getByFilter({
      user_id: uid,
    });

    return res.status(200).json({
      resource: foundSavingGoal,
    });
  } catch (error) {
    next(error);
  }
}

async function createSavingGoal(req, res, next) {
  try {
    const uid = req.user._id;

    req.body = { ...req.body, user_id: uid };

    const savingGoal = await savingGoalService.create(req.body);

    return res.status(200).json({
      resource: savingGoal,
    });
  } catch (error) {
    next(error);
  }
}

async function updateSavingGoal(req, res, next) {
  try {
    const uid = req.user._id;

    const updatedSavingGoal = await savingGoalService.updateByFilter(
      {
        user_id: uid,
      },
      req.body
    );

    return res.status(200).json({
      message: "Saving goal updated successfully",
      resource: updatedSavingGoal,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteSavingGoal(req, res, next) {
  try {
    const uid = req.user._id;

    await savingGoalService.deleteByFilter({
      user_id: uid,
    });

    return res.status(200).json({
      message: "Saving goal deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export { createSavingGoal, updateSavingGoal, getSavingGoal, deleteSavingGoal };
