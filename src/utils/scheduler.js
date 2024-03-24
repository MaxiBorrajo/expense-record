import schedule from "node-schedule";
import { errors } from "./errorDictionary.js";
import ExpenseRepository from "../repositories/Expense.repository.js";
const jobs = {};

export function programAutomaticRegister(cron, action, object, expenseId) {
  if (!jobs[expenseId]) {
    const job = schedule.scheduleJob(
      cron,
      async function (expense) {
        const newExpense = {
          title: expense.title,
          amount: expense.amount,
          user_id: expense.user_id,
          isAutomaticallyCreated: expense.isAutomaticallyCreated,
          cron: expense.cron,
          jobId: expense.jobId,
        };
        const expenseCreated = await action(newExpense);
      }.bind(null, object)
    );

    jobs[expenseId] = job;
  }
}

export function removeAutomaticRegister(id) {
  if (jobs[id]) {
    jobs[id].cancel();
    delete jobs[id];
  }
}

export async function recoverJobs() {
  try {
    const expenseJobs = await ExpenseRepository.getAll({
      isAutomaticallyCreated: true,
    });

    if (expenseJobs && expenseJobs.length > 0) {
      expenseJobs.forEach((job) => {
        programAutomaticRegister(
          job.cron,
          ExpenseRepository.create,
          job,
          job.jobId
        );
      });
    }

    if (Object.keys(jobs).length > 0) {
      console.log("Jobs recovered successfully");
    } else {
      console.log("Jobs were not found");
    }
  } catch (error) {
    throw new errors.JOBS_COULD_NOT_BE_LOADED("Job");
  }
}
