import categoryService from "../services/Categories.service.js";

async function getCategories(req, res, next) {
  try {
    const uid = req.user._id;
    const foundCategories = await categoryService.getAll(uid, req.query);

    return res.status(200).json({
      resource: foundCategories,
    });
  } catch (error) {
    next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const uid = req.user._id;

    const foundCategory = await categoryService.getByFilter({
      user_id: uid,
      _id: req.params.cid,
    });

    return res.status(200).json({
      resource: foundCategory,
    });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const uid = req.user._id;

    req.body = { ...req.body, user_id: uid };

    const category = await categoryService.create(req.body);

    return res.status(200).json({
      resource: category,
    });
  } catch (error) {
    next(error);
  }
}

async function updateCategoryById(req, res, next) {
  try {
    const uid = req.user._id;

    const updatedCategory = await categoryService.updateByFilter(
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

async function deleteCategoryById(req, res, next) {
  try {
    const uid = req.user._id;

    await categoryService.deleteByFilter({
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

export {
  createCategory,
  deleteCategoryById,
  getCategories,
  updateCategoryById,
  getCategoryById,
};
