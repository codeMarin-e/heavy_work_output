/******/
(function () {
  // webpackBootstrap

  /******/
  var __webpack_modules__ = {
    /***/
    "./node_modules/can-namespace/can-namespace.js":
    /*!*****************************************************!*\
      !*** ./node_modules/can-namespace/can-namespace.js ***!
      \*****************************************************/

    /***/
    function node_modulesCanNamespaceCanNamespaceJs(module) {
      module.exports = {};
      /***/
    },

    /***/
    "./node_modules/can-ndjson-stream/can-ndjson-stream.js":
    /*!*************************************************************!*\
      !*** ./node_modules/can-ndjson-stream/can-ndjson-stream.js ***!
      \*************************************************************/

    /***/
    function node_modulesCanNdjsonStreamCanNdjsonStreamJs(module, __unused_webpack_exports, __webpack_require__) {
      "use strict";
      /*exported ndjsonStream*/

      var namespace = __webpack_require__(
      /*! can-namespace */
      "./node_modules/can-namespace/can-namespace.js");

      var ndjsonStream = function ndjsonStream(response) {
        // For cancellation
        var is_reader,
            cancellationRequest = false;
        return new ReadableStream({
          start: function start(controller) {
            var reader = response.getReader();
            is_reader = reader;
            var decoder = new TextDecoder();
            var data_buf = "";
            reader.read().then(function processResult(result) {
              if (result.done) {
                if (cancellationRequest) {
                  // Immediately exit
                  return;
                }

                data_buf = data_buf.trim();

                if (data_buf.length !== 0) {
                  try {
                    var data_l = JSON.parse(data_buf);
                    controller.enqueue(data_l);
                  } catch (e) {
                    controller.error(e);
                    return;
                  }
                }

                controller.close();
                return;
              }

              var data = decoder.decode(result.value, {
                stream: true
              });
              data_buf += data;
              var lines = data_buf.split("\n");

              for (var i = 0; i < lines.length - 1; ++i) {
                var l = lines[i].trim();

                if (l.length > 0) {
                  try {
                    var data_line = JSON.parse(l);
                    controller.enqueue(data_line);
                  } catch (e) {
                    controller.error(e);
                    cancellationRequest = true;
                    reader.cancel();
                    return;
                  }
                }
              }

              data_buf = lines[lines.length - 1];
              return reader.read().then(processResult);
            });
          },
          cancel: function cancel(reason) {
            console.log("Cancel registered due to ", reason);
            cancellationRequest = true;
            is_reader.cancel();
          }
        });
      };

      module.exports = namespace.ndjsonStream = ndjsonStream;
      /***/
    }
    /******/

  };
  /************************************************************************/

  /******/
  // The module cache

  /******/

  var __webpack_module_cache__ = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/
    // Check if module is in cache

    /******/
    var cachedModule = __webpack_module_cache__[moduleId];
    /******/

    if (cachedModule !== undefined) {
      /******/
      return cachedModule.exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = __webpack_module_cache__[moduleId] = {
      /******/
      // no module.id needed

      /******/
      // no module.loaded needed

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/

    /******/
    // Return the exports of the module

    /******/


    return module.exports;
    /******/
  }
  /******/

  /************************************************************************/

  /******/

  /* webpack/runtime/compat get default export */

  /******/


  (function () {
    /******/
    // getDefaultExport function for compatibility with non-harmony modules

    /******/
    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
      /******/
      function () {
        return module['default'];
      } :
      /******/
      function () {
        return module;
      };
      /******/

      __webpack_require__.d(getter, {
        a: getter
      });
      /******/


      return getter;
      /******/
    };
    /******/

  })();
  /******/

  /******/

  /* webpack/runtime/define property getters */

  /******/


  (function () {
    /******/
    // define getter functions for harmony exports

    /******/
    __webpack_require__.d = function (exports, definition) {
      /******/
      for (var key in definition) {
        /******/
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/

      }
      /******/

    };
    /******/

  })();
  /******/

  /******/

  /* webpack/runtime/hasOwnProperty shorthand */

  /******/


  (function () {
    /******/
    __webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/

  })();
  /******/

  /******/

  /* webpack/runtime/make namespace object */

  /******/


  (function () {
    /******/
    // define __esModule on exports

    /******/
    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

  })();
  /******/

  /************************************************************************/


  var __webpack_exports__ = {}; // This entry need to be wrapped in an IIFE because it need to be in strict mode.

  (function () {
    "use strict";
    /*!***************************!*\
      !*** ./private/worker.js ***!
      \***************************/

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var can_ndjson_stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! can-ndjson-stream */
    "./node_modules/can-ndjson-stream/can-ndjson-stream.js");
    /* harmony import */


    var can_ndjson_stream__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(can_ndjson_stream__WEBPACK_IMPORTED_MODULE_0__);

    self.onmessage = function (e) {
      var workerMe = self;
      fetch(e.data).then(function (response) {
        return can_ndjson_stream__WEBPACK_IMPORTED_MODULE_0___default()(response.body); //ndjsonStream parses the response.body
      }).then(function (exampleStream) {
        var reader = exampleStream.getReader();

        var _read;

        reader.read().then(_read = function read(result) {
          if (result.done) {
            return;
          }

          var data = result.value;

          if (data.type && data.type != 'nothing') {
            workerMe.postMessage(result.value);
          }

          reader.read().then(_read);
        });
      });
    };
  })();
  /******/

})();
