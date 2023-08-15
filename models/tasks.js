import { Task } from "./task.js";

export class Tasks {
  _list = {};

  get arrayList() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
    console.log(this._list);
  }

  createTask(description = "") {
    const task = new Task(description);

    this._list[task.id] = task;
  }

  fullList() {
    console.log();

    this.arrayList.forEach((task, index) => {
      const { description, completedAt } = task;
      const state = completedAt ? "Completed".green : "Pending".red;

      console.log(`${(index + 1).toString().green} ${description} :: ${state}`);
    });
  }

  listCompletedOrPending(completedList = true) {
    console.log();

    let count = 0;
    this.arrayList.forEach((task) => {
      const { description, completedAt } = task;
      const state = completedAt ? "Completed".green : "Pending".red;

      if (completedList && completedAt) {
        count += 1;
        console.log(`${(count + ".").green} ${description} :: ${state}`);
      } else if (!completedList && !completedAt) {
        count += 1;
        console.log(`${(count + ".").green} ${description} :: ${state}`);
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];

      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    // if ids doesn't include the id of task
    this.arrayList.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}
