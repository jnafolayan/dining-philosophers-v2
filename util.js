import chalk from "chalk";

export const waitFor = async (delayMS) =>
  new Promise((resolve) => setTimeout(resolve, delayMS));

export const randomColorHex = () =>
  Math.floor(Math.random() * 16777215).toString(16);

/**
 * @param {string} text The text to log
 * @param {import("chalk").ChalkInstance} color
 */
export const log = (text, color = chalk.white) => console.log(color(text));
