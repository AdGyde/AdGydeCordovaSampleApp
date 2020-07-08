cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.adgyde.sdk.AdGydeTracker",
      "file": "plugins/com.adgyde.sdk/www/AdGydeTracker.js",
      "pluginId": "com.adgyde.sdk",
      "clobbers": [
        "AdGydeTracker"
      ]
    },
    {
      "id": "cordova-plugin-x-toast.Toast",
      "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
      "pluginId": "cordova-plugin-x-toast",
      "clobbers": [
        "window.plugins.toast"
      ]
    }
  ];
  module.exports.metadata = {
    "com.adgyde.sdk": "1.2.0",
    "cordova-plugin-x-toast": "2.7.2"
  };
});