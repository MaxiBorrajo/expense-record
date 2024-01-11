import expenseService from "../services/Expense.service.js";

async function getExpenses(req, res, next) {
  try {
    const uid = req.user._id;

    const expenses = await expenseService.getAll(uid, req.query);

    return res.status(200).json({
      resource: expenses,
    });
  } catch (error) {
    next(error);
  }
}
async function getAmount(req, res, next) {
  try {
    const uid = req.user._id;

    const amount = await expenseService.getAmount(uid, req.query);

    return res.status(200).json({
      resource: amount,
    });
  } catch (error) {
    next(error);
  }
}

async function getCurrentAmount(req, res, next) {
  try {
    const uid = req.user._id;

    const amount = await expenseService.getCurrentAmount(uid);

    return res.status(200).json({
      resource: amount,
    });
  } catch (error) {
    next(error);
  }
}

async function getExpenseById(req, res, next) {
  try {
    const uid = req.user._id;

    const expense = await expenseService.getByFilter({
      user_id: uid,
      _id: req.params.eid,
    });

    return res.status(200).json({
      resource: expense,
    });
  } catch (error) {
    next(error);
  }
}

async function getStatistics(req, res, next) {
  try {
    const uid = req.user._id;

    const statistics = await expenseService.getStatistics(
      uid,
      req.query.year,
      req.query.month
    );

    return res.status(200).json({
      resource: statistics,
    });
  } catch (error) {
    next(error);
  }
}

async function getProfitPercentage(req, res, next) {
  try {
    const uid = req.user._id;

    const percentage = await expenseService.getProfitPercentage(
      uid,
      req.query.year,
      req.query.month
    );

    return res.status(200).json({
      resource: percentage,
    });
  } catch (error) {
    next(error);
  }
}

async function createExpense(req, res, next) {
  try {
    const uid = req.user._id;

    req.body = { ...req.body, user_id: uid };
    const percentage = await expenseService.create(req.body);

    return res.status(200).json({
      resource: percentage,
    });
  } catch (error) {
    next(error);
  }
}

async function updateExpenseById(req, res, next) {
  try {
    const uid = req.user._id;

    const updatedExpense = await expenseService.updateByFilter(
      {
        user_id: uid,
        _id: req.params.eid,
      },
      req.body
    );

    return res.status(200).json({
      message: "Expense updated successfully",
      resource: updatedExpense,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteExpenseById(req, res, next) {
  try {
    const uid = req.user._id;

    await expenseService.deleteByFilter({
      user_id: uid,
      _id: req.params.eid,
    });

    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function applyConversion(req, res, next) {
  try {
    const uid = req.user._id;

    await expenseService.applyConversion(uid, req.body.old_currency, req.body.new_currency);

    return res.status(200).json({
      message: "Currency changed successfully",
    });
  } catch (error) {
    next(error);
  }
}


export {
  createExpense,
  deleteExpenseById,
  getAmount,
  getExpenseById,
  getExpenses,
  getProfitPercentage,
  getStatistics,
  updateExpenseById,
  applyConversion,
  getCurrentAmount
};
