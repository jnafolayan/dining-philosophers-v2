const Semaphore = require("./Semaphore");
const Philosopher = require("./Philosopher");

const NUM_PHILOSOPHERS = 5;

class DiningPhilosophers {
  static main() {
    // Create the forks/chopsticks
    const forks = Array.from(
      { length: NUM_PHILOSOPHERS },
      () => new Semaphore(1)
    );

    // Allow N-1 philosphers to eat at a time to prevent deadlock
    const eatingLock = new Semaphore(NUM_PHILOSOPHERS);

    const philosophers = Array.from({ length: NUM_PHILOSOPHERS }, (_, i) => {
      const leftFork = forks[i];
      const rightFork = forks[(i + 1) % NUM_PHILOSOPHERS];
      return new Philosopher(
        `Philosopher ${i + 1}`,
        leftFork,
        rightFork,
        eatingLock
      );
    });

    // Start philosophers' eating process
    philosophers.forEach((philosopher) => philosopher.simulate());
  }
}

module.exports = DiningPhilosophers;
