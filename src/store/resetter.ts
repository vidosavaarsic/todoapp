const resetter = (function () {
  let instance: ReturnType<typeof createInstance>;

  const resetters = [] as Array<() => void>;

  function createInstance() {
    // your code to create a new instance of the object goes here
    return {
      addResetter(resetFn: () => void) {
        resetters.push(resetFn);
      },
      resetAll() {
        for (const resetFn of resetters) {
          resetFn();
        }
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export default resetter.getInstance();
