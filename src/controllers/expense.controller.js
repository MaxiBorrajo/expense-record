import expenseService from "../services/Expense.service.js";

async function getMonthExpenses(req, res, next) {
  try {
    const uid = req.user._id;

    const monthExpenses = await expenseService.getMonthExpenses(
      uid,
      req.query.month
    );

    return res.status(200).json({
      resource: monthExpenses,
    });
  } catch (error) {
    next(error);
  }
}

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

async function getBalance(req, res, next) {
  try {
    const uid = req.user._id;

    const amount = await expenseService.getBalance(uid);

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

    const statistics = await expenseService.getStatistics(uid, req.query.year);

    return res.status(200).json({
      resource: statistics,
    });
  } catch (error) {
    next(error);
  }
}

async function getStatisticsByCategory(req, res, next) {
  try {
    const uid = req.user._id;

    const statistics = await expenseService.getStatisticsByCategory(
      uid,
      req.query.year,
      req.query.month,
      req.query.type
    );

    return res.status(200).json({
      resource: statistics,
    });
  } catch (error) {
    next(error);
  }
}

async function createExpense(req, res, next) {
  try {
    const uid = req.user._id;
    const expo_token = req.get("ExpoToken");

    req.body = { ...req.body, user_id: uid };

    const expense = await expenseService.create(req.body, expo_token);

    return res.status(200).json({
      resource: expense,
    });
  } catch (error) {
    next(error);
  }
}

async function updateExpenseById(req, res, next) {
  try {
    const uid = req.user._id;
    const expo_token = req.get("ExpoToken");

    const updatedExpense = await expenseService.updateByFilter(
      {
        user_id: uid,
        _id: req.params.eid,
      },
      req.body,
      expo_token
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
    const expo_token = req.get("ExpoToken");

    await expenseService.deleteByFilter(
      {
        user_id: uid,
        _id: req.params.eid,
      },
      expo_token
    );

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

    await expenseService.applyConversion(
      uid,
      req.body.old_currency,
      req.body.new_currency
    );

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
  getStatistics,
  updateExpenseById,
  applyConversion,
  getBalance,
  getStatisticsByCategory,
  getMonthExpenses,
};
