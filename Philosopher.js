import chalk from "chalk";
import { Semaphore } from "./Semaphore.js";
import { waitFor } from "./util.js";

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

    this._color = chalk.white;
  }

  setColor(color) {
    this._color = color;
  }

  async eat() {
    await this.eatingLock.acquire();
    await this.leftFork.acquire();
    await this.rightFork.acquire();

    this.say('is eating...');

    // Simulating eating
    const eatingTime = Math.floor(Math.random() * 2000);
    await waitFor(eatingTime);

    this.leftFork.release();
    this.rightFork.release();
    this.eatingLock.release();

    this.say('finished eating.');
  }

  async simulate() {
    while (true) {
      this.say('is thinking...');

      // Simulate thinking
      const thinkingTime = Math.floor(Math.random() * 1000);
      await waitFor(thinkingTime);

      await this.eat();
    }
  }

  say(text) {
    console.log(this._color(`${this.name}: `) + text);
  }
}
