export const waitFor = async (delayMS) =>
  new Promise((resolve) => setTimeout(resolve, delayMS));

export const randomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);
