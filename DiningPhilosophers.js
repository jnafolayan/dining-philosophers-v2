import chalk from "chalk";
import { Semaphore } from "./Semaphore.js";
import { Philosopher } from "./Philosopher.js";

const NUM_PHILOSOPHERS = 5;

export class DiningPhilosophers {
  static main() {
    // Create the forks/chopsticks
    const forks = Array.from(
      { length: NUM_PHILOSOPHERS },
      () => new Semaphore(1)
    );

    // Allow N-1 philosphers to eat at a time to prevent deadlock
    const eatingLock = new Semaphore(NUM_PHILOSOPHERS);

    const colors = ["magenta", "cyanBright", "red", "green", "yellow"];

    const philosophers = Array.from({ length: NUM_PHILOSOPHERS }, (_, i) => {
      const leftFork = forks[i];
      const rightFork = forks[(i + 1) % NUM_PHILOSOPHERS];
      const p = new Philosopher(
        `Philosopher ${i + 1}`,
        leftFork,
        rightFork,
        eatingLock
      );
      p.setColor(chalk[colors[i]]);

      return p;
    });

    // Start philosophers' eating process
    philosophers.forEach((philosopher) => philosopher.simulate());
  }
}
