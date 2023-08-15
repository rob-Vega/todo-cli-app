import colors from "colors";

import {
  inquirerMenu,
  pause,
  readInput,
  listOfTaskToDelete,
  confirm,
  showChecklist,
} from "./helpers/inquirer.js";
import { Tasks } from "./models/tasks.js";
import { saveFile, readFile } from "./helpers/fileManager.js";

const main = async () => {
  let option = "";
  const tasks = new Tasks();

  const tasksData = readFile();

  if (tasksData) {
    tasks.loadTasksFromArray(tasksData);
  }

  do {
    option = await inquirerMenu();

    switch (option) {
      case "1":
        const description = await readInput("Description: ");
        tasks.createTask(description);
        break;

      case "2":
        tasks.fullList();
        break;

      case "3":
        tasks.listCompletedOrPending(true);
        break;

      case "4":
        tasks.listCompletedOrPending(false);
        break;

      case "5":
        const ids = await showChecklist(tasks.arrayList);
        tasks.toggleCompleted(ids);
        break;

      case "6":
        const id = await listOfTaskToDelete(tasks.arrayList);

        if (id !== " 0") {
          const ok = await confirm("Are you sure?");

          if (ok) {
            tasks.deleteTask(id);
          }
        }

        break;
    }

    saveFile(tasks.arrayList);

    console.log("\n");
    await pause();
  } while (option !== "0");
};

main();
