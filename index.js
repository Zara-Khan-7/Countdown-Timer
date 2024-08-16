#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
const response = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: chalk.blue("\nPlease Enter the Number of Seconds:"),
    validate: (input) => {
        if (isNaN(input)) {
            return chalk.red("\nPlease Enter a Valid Number..!\n");
        }
        else if (input > 60) {
            return chalk.cyan("\nSeconds must be within 60\n");
        }
        else {
            return true;
        }
    }
});
let input = response.userInput;
function startTime(value) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(initialTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, currentTime);
        if (timeDifference <= 0) {
            console.log(chalk.red("\nTimer has Expired..!\n"));
            process.exit();
        }
        const min = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDifference % 60);
        console.log(chalk.yellowBright(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }), 1000);
}
startTime(input);
