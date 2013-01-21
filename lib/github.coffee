Rest = require 'rest.node'

class Github extends Rest
  @hooks:
    access_token: (access_token) ->
      (request_opts, opts, callback, next) ->
        request_opts.headers ?= {}
        request_opts.headers.Authorization = 'token ' + access_token
        next()
    
    get: (request_opts, opts, callback, next) ->
      request_opts.qs = opts
      next()
  
  constructor: (@options = {}) ->
    super(base_url: 'https://api.github.com')
    
    @hook('pre:request', Github.hooks.access_token(@options.access_token)) if @options.access_token?
    @hook('pre:get', Github.hooks.get)
    
    @user = {
      repositories: {
        list: (opts, callback) => @get('/user/repos', opts, callback)
      }
    }
  
  users: (user) ->
    repos = (repo) =>
      {
        hooks: {
          list: (opts, callback) => @get("/repos/#{user}/#{repo}/hooks", opts, callback)
          get: (id, opts, callback) => @get("/repos/#{user}/#{repo}/hooks/#{id}", opts, callback)
          create: (opts, callback) => @post("/repos/#{user}/#{repo}/hooks", opts, callback)
        }
      }
    
    repos.list = (opts, callback) => @get('/users/' + user + '/repos', opts, callback)
    
    {
      repositories: repos
    }

module.exports = Github
