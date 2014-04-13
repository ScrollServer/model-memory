var fs = require('fs'),
    data = {
      scrolls: []
    };

// return the connect function and models
module.exports = {
  /**
   * Loads in JSON data from disk and makes a successful "connection" for
   * the scroll server.
   * @param connectionString {string} - The location of JSON files to
   * load, if any.
   * @param connected {function()} - The callback to call when a successful
   * connection is made. This is always called for memory storage connections.
   * @param error {function(error)} - The callback to call when a
   * connection error has occured.
   */
  connect: function(connectionString, connected, error) {
    if(connectionString.length > 0) {
      for(var m in data) {
        if(fs.existsSync(connectionString + m + '.json')) {
          data[m] = require(connectionString + m + '.json');
        }
      }
    }

    connected();
  },

  // load the models
  models: {
    scroll: require('./models/scroll')(data)
  }
};
