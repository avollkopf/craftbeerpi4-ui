import axios from "axios";

export const move = (id, direction, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
      .put("/step2/move", {id, direction})
      .then(function (response) {
        callback_susscess();
      })
      .catch(function (error) {
        callback_failed();
      });
  };

  export const add = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
      .post("/step2", data)
      .then(function (response) {
        callback_susscess();
      })
      .catch(function (error) {
        callback_failed();
      });
  };

  export const save = (id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
      .put("/step2/"+id, data)
      .then(function (response) {
        callback_susscess();
      })
      .catch(function (error) {
        callback_failed();
      });
  };

  export const start = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
      .post("/step2/start")
      .then(function (response) {
        callback_susscess();
      })
      .catch(function (error) {
        callback_failed();
      });
  };

  export const reset = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
      .post("/step2/reset")
      .then(function (response) {
        callback_susscess();
      })
      .catch(function (error) {
        callback_failed();
      });
  };

  export const stop = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
      .post("/step2/stop")
      .then(function (response) {
        callback_susscess();
      })
      .catch(function (error) {
        callback_failed();
      });
  };
  
  export const remove = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
      .delete("/step2/"+id)
      .then(function (response) {
        callback_susscess();
      })
      .catch(function (error) {
        callback_failed();
      });
  };
  
  export const save_basic = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
      .put("/step2/basic", data)
      .then(function (response) {
        callback_susscess();
      })
      .catch(function (error) {
        callback_failed();
      });
  };
  

  export const stepapi = {
    move,
    add,
    save_basic,
    save,
    stop,
    start,
    remove,
    reset
  }