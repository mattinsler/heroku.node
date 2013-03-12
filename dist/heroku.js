(function() {
  var Api, AppApi, AppsApi, Heroku, ProcessApi, ProcessesApi, Rest,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Rest = require('rest.node');

  Api = {
    Apps: AppsApi = (function() {

      function AppsApi(client) {
        this.client = client;
      }

      AppsApi.prototype.list = function(cb) {
        return this.client.get('/apps', cb);
      };

      return AppsApi;

    })(),
    App: AppApi = (function() {

      function AppApi(client, app) {
        this.client = client;
        this.app = app;
        this.processes = new Api.Processes(this.client, this.app);
      }

      AppApi.prototype.get = function(cb) {
        return this.client.get("/apps/" + this.app, cb);
      };

      AppApi.prototype.maintenance_mode_on = function(cb) {
        return this.client.post("/apps/" + this.app + "/server/maintenance", {
          maintenance_mode: 1
        }, cb);
      };

      AppApi.prototype.maintenance_mode_off = function(cb) {
        return this.client.post("/apps/" + this.app + "/server/maintenance", {
          maintenance_mode: 0
        }, cb);
      };

      AppApi.prototype.destroy = function(cb) {
        return this.client["delete"]("/apps/" + this.app, cb);
      };

      AppApi.prototype.process = function(process) {
        return new Api.Process(this.client, this.app, process);
      };

      return AppApi;

    })(),
    Processes: ProcessesApi = (function() {

      function ProcessesApi(client, app) {
        this.client = client;
        this.app = app;
      }

      ProcessesApi.prototype.list = function(cb) {
        return this.client.get("/apps/" + this.app + "/ps", cb);
      };

      ProcessesApi.prototype.restart = function(cb) {
        return this.client.post("/apps/" + this.app + "/ps/restart", cb);
      };

      ProcessesApi.prototype.restart_type = function(type, cb) {
        return this.client.post("/apps/" + this.app + "/ps/restart", {
          type: type
        }, cb);
      };

      ProcessesApi.prototype.stop = function(cb) {
        return this.client.post("/apps/" + this.app + "/ps/stop", cb);
      };

      ProcessesApi.prototype.stop_type = function(type, cb) {
        return this.client.post("/apps/" + this.app + "/ps/stop", {
          type: type
        }, cb);
      };

      ProcessesApi.prototype.scale = function(type, quantity) {
        return this.client.post("/apps/" + this.app + "/ps/scale", {
          type: type,
          qty: quantity
        }, cb);
      };

      return ProcessesApi;

    })(),
    Process: ProcessApi = (function() {

      function ProcessApi(client, app, process) {
        this.client = client;
        this.app = app;
        this.process = process;
      }

      ProcessApi.prototype.restart = function(cb) {
        return this.client.post("/apps/" + this.app + "/ps/restart", {
          ps: this.process
        }, cb);
      };

      ProcessApi.prototype.stop = function(cb) {
        return this.client.post("/apps/" + this.app + "/ps/stop", {
          ps: this.process
        }, cb);
      };

      return ProcessApi;

    })()
  };

  Heroku = (function(_super) {

    __extends(Heroku, _super);

    Heroku.hooks = {
      json: function(request_opts, opts) {
        var _ref;
        if ((_ref = request_opts.headers) == null) {
          request_opts.headers = {};
        }
        return request_opts.headers.Accept = 'application/json';
      },
      api_key: function(api_key) {
        return function(request_opts, opts) {
          var _ref;
          if ((_ref = request_opts.headers) == null) {
            request_opts.headers = {};
          }
          return request_opts.headers.Authorization = 'Basic ' + new Buffer(':' + api_key).toString('base64');
        };
      },
      get: function(request_opts, opts) {
        return request_opts.qs = opts;
      },
      post: function(request_opts, opts) {
        return request_opts.form = opts;
      }
    };

    function Heroku(options) {
      this.options = options != null ? options : {};
      Heroku.__super__.constructor.call(this, {
        base_url: 'https://api.heroku.com'
      });
      this.hook('pre:request', Heroku.hooks.json);
      if (this.options.api_key != null) {
        this.hook('pre:request', Heroku.hooks.api_key(this.options.api_key));
      }
      this.hook('pre:post', Heroku.hooks.post);
      this.apps = new Api.Apps(this);
    }

    Heroku.prototype.app = function(app) {
      return new Api.App(this, app);
    };

    return Heroku;

  })(Rest);

  module.exports = Heroku;

}).call(this);
