(function() {
  var Github, Rest,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Rest = require('rest.node');

  Github = (function(_super) {

    __extends(Github, _super);

    Github.hooks = {
      access_token: function(access_token) {
        return function(request_opts, opts, callback, next) {
          var _ref;
          if ((_ref = request_opts.headers) == null) {
            request_opts.headers = {};
          }
          request_opts.headers.Authorization = 'token ' + access_token;
          return next();
        };
      },
      get: function(request_opts, opts, callback, next) {
        request_opts.qs = opts;
        return next();
      }
    };

    function Github(options) {
      var _this = this;
      this.options = options != null ? options : {};
      Github.__super__.constructor.call(this, {
        base_url: 'https://api.github.com'
      });
      if (this.options.access_token != null) {
        this.hook('pre:request', Github.hooks.access_token(this.options.access_token));
      }
      this.hook('pre:get', Github.hooks.get);
      this.user = {
        repositories: {
          list: function(opts, callback) {
            return _this.get('/user/repos', opts, callback);
          }
        }
      };
    }

    Github.prototype.users = function(user) {
      var repos,
        _this = this;
      repos = function(repo) {
        return {
          hooks: {
            list: function(opts, callback) {
              return _this.get("/repos/" + user + "/" + repo + "/hooks", opts, callback);
            },
            get: function(id, opts, callback) {
              return _this.get("/repos/" + user + "/" + repo + "/hooks/" + id, opts, callback);
            },
            create: function(opts, callback) {
              return _this.post("/repos/" + user + "/" + repo + "/hooks", opts, callback);
            }
          }
        };
      };
      repos.list = function(opts, callback) {
        return _this.get('/users/' + user + '/repos', opts, callback);
      };
      return {
        repositories: repos
      };
    };

    return Github;

  })(Rest);

  module.exports = Github;

}).call(this);
