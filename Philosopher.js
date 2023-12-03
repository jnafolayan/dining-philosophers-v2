import chalk from "chalk";
import { Semaphore } from "./Semaphore.js";
import { waitFor, randomColorHex, log } from "./util.js";

export class Philosopher {
  /**
   *
   * @param {string} name The name of the philosopher
   * @param {Semaphore} leftFork Lock for the fork on the left of this philosopher
   * @param {Semaphore} rightFork Lock for the fork on the right of this philosopher
   * @param {Semaphore} eatingLock Lock for eating
   */
  constructor(name, leftFork, rightFork, eatingLock) {
    this.name = name;
    this.leftFork = leftFork;
    this.rightFork = rightFork;
    this.eatingLock = eatingLock;

    this._color = chalk.hex(randomColorHex());
  }

  async eat() {
    await this.eatingLock.acquire();
    await this.leftFork.acquire();
    await this.rightFork.acquire();

    log(`${this.name} is eating...`, this._color);

    // Simulating eating
    const eatingTime = Math.floor(Math.random() * 2000);
    await waitFor(eatingTime);

    this.leftFork.release();
    this.rightFork.release();
    this.eatingLock.release();

    log(`${this.name} finished eating.`, this._color);
  }

  async simulate() {
    while (true) {
      log(`${this.name} is thinking...`, this._color);

      // Simulate thinking
      const thinkingTime = Math.floor(Math.random() * 1000);
      await waitFor(thinkingTime);

      await this.eat();
    }
  }
}
