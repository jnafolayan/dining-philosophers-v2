class Semaphore {
  /**
   * @param {number} initialCount The number of 'processes' allowed at a time.
   */
  constructor(initialCount) {
    /**
     * @private
     * @type {number}
     */
    this._count = initialCount;
    /**
     * @private
     * @type {Promise[]}
     */
    this._queue = [];
  }

  async acquire() {
    return new Promise((resolve) => {
      if (this._count > 0) {
        this._count--;
        resolve();
      } else {
        this._queue.push(resolve);
      }
    });
  }

  release() {
    this._count++;
    const next = this._queue.shift();
    if (next) {
      this._count--;
      next();
    }
  }
}

module.exports = Semaphore;
