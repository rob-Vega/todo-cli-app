import inquirer from "inquirer";
import colors from "colors";

const inquirerMenu = async () => {
  console.clear();
  console.log("======================".green);
  console.log("   Select an option   ");
  console.log("======================\n".green);

  const { option } = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "option",
      choices: [
        {
          value: "1",
          name: `${"1.".green} Create task`,
        },
        {
          value: "2",
          name: `${"2.".green} List tasks(s)`,
        },
        {
          value: "3",
          name: `${"3.".green} List completed task(s)`,
        },
        {
          value: "4",
          name: `${"4.".green} List pending task(s)`,
        },
        {
          value: "5",
          name: `${"5.".green} Complete task(s)`,
        },
        {
          value: "6",
          name: `${"6.".green} Delete task`,
        },
        {
          value: "0",
          name: `${"0.".green} Exit`,
        },
      ],
    },
  ]);

  return option;
};

const pause = async () => {
  const { enter } = await inquirer.prompt([
    {
      type: "input",
      message: `Press ${"ENTER".green} to continue`,
      name: "enter",
    },
  ]);

  return enter;
};

const readInput = async (message) => {
  const { description } = await inquirer.prompt([
    {
      type: "input",
      message,
      name: "description",
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ]);

  return description;
};

const listOfTaskToDelete = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    return {
      value: task.id,
      name: `${(index + 1).toString().green} ${task.description}`,
    };
  });

  choices.unshift({ value: "0", name: "0.".green + "Cancel" });

  const { id } = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ]);

  return id;
};

const confirm = async (message) => {
  const { ok } = await inquirer.prompt([
    { type: "confirm", name: "ok", message },
  ]);

  return ok;
};

const showChecklist = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    return {
      value: task.id,
      name: `${(index + 1).toString().green} ${task.description}`,
      checked: task.completedAt ? true : false,
    };
  });

  const { ids } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "ids",
      message: "Selections",
      choices,
    },
  ]);

  return ids;
};

export {
  inquirerMenu,
  pause,
  readInput,
  listOfTaskToDelete,
  confirm,
  showChecklist,
};
