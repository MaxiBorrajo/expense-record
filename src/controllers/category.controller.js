import CategoryService from "../services/Category.service.js";
async function getAll(req, res, next) {
  try {
    const uid = req.user._id;

    const foundCategories = await CategoryService.getAll({
      $or: [{ user_id: uid }, { user_id: null }],
    });

    return res.status(200).json({
      resource: foundCategories,
    });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const uid = req.user._id;

    req.body = { ...req.body, user_id: uid };

    const createdCategory = await CategoryService.create(req.body);

    return res.status(200).json({
      resource: createdCategory,
    });
  } catch (error) {
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const uid = req.user._id;

    const updatedCategory = await CategoryService.updateByFilter(
      {
        user_id: uid,
        _id: req.params.cid,
      },
      req.body
    );

    return res.status(200).json({
      message: "Category updated successfully",
      resource: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const uid = req.user._id;

    await CategoryService.deleteByFilter({
      user_id: uid,
      _id: req.params.cid,
    });

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export { deleteCategory, createCategory, getAll, updateCategory };
