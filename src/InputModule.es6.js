class InputModule {
  constructor(eventType) {
    this.eventType = eventType;
    this.listeners = [];
    this.event = [];
    this.promise = null;
    
    // List of the modules this module depends on
    this.parents = [];

    // Indicators about whether the module can provide values or not
    this.isCalculated = false;
    this.isProvided = false;
  }

  init(promiseFun) {
    this.promise = new Promise(promiseFun);
    return this.promise;
  }

  start() {
    // abstract method
  }

  stop() {
    // abstract method
  }

  addListener(listener) {
    this.listeners.push(listener);

    if (this.listeners.length === 1)
      this.start();
  }

  removeListener(listener) {
    let index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);

    if (this.listeners.length === 0)
      this.stop();
  }

  emit(event = this.event) {
    for (let listener of this.listeners)
      listener(event);
  }

  get isValid() {
    return (this.isProvided || this.isCalculated);
  }
}

module.exports = InputModule;