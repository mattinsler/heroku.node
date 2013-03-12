Rest = require 'rest.node'

Api = {
  Apps: class AppsApi
    constructor: (@client) ->
    list: (cb) -> @client.get('/apps', cb)
    
      #### client.app('app-name').get(callback)
      #### client.app('app-name').maintenance_mode_on(callback)
      #### client.app('app-name').maintenance_mode_off(callback)
      #### client.app('app-name').destroy(callback)
  
  App: class AppApi
    constructor: (@client, @app) ->
      @processes = new Api.Processes(@client, @app)
    get: (cb) -> @client.get("/apps/#{@app}", cb)
    maintenance_mode_on: (cb) -> @client.post("/apps/#{@app}/server/maintenance", {maintenance_mode: 1}, cb)
    maintenance_mode_off: (cb) -> @client.post("/apps/#{@app}/server/maintenance", {maintenance_mode: 0}, cb)
    destroy: (cb) -> @client.delete("/apps/#{@app}", cb)
    
    process: (process) -> new Api.Process(@client, @app, process)
  
  Processes: class ProcessesApi
    constructor: (@client, @app) ->
    list: (cb) -> @client.get("/apps/#{@app}/ps", cb)
    
    restart: (cb) -> @client.post("/apps/#{@app}/ps/restart", cb)
    restart_type: (type, cb) -> @client.post("/apps/#{@app}/ps/restart", {type: type}, cb)
    stop: (cb) -> @client.post("/apps/#{@app}/ps/stop", cb)
    stop_type: (type, cb) -> @client.post("/apps/#{@app}/ps/stop", {type: type}, cb)
    scale: (type, quantity) -> @client.post("/apps/#{@app}/ps/scale", {type: type, qty: quantity}, cb)
  
  Process: class ProcessApi
    constructor: (@client, @app, @process) ->
    restart: (cb) -> @client.post("/apps/#{@app}/ps/restart", {ps: @process}, cb)
    stop: (cb) -> @client.post("/apps/#{@app}/ps/stop", {ps: @process}, cb)
}

class Heroku extends Rest
  @hooks:
    json: (request_opts, opts) ->
      request_opts.headers ?= {}
      request_opts.headers.Accept = 'application/json'
    
    api_key: (api_key) ->
      (request_opts, opts) ->
        request_opts.headers ?= {}
        request_opts.headers.Authorization = 'Basic ' + new Buffer(':' + api_key).toString('base64')
    
    get: (request_opts, opts) ->
      request_opts.qs = opts
    
    post: (request_opts, opts) ->
      request_opts.form = opts
  
  constructor: (@options = {}) ->
    super(base_url: 'https://api.heroku.com')
    
    @hook('pre:request', Heroku.hooks.json)
    @hook('pre:request', Heroku.hooks.api_key(@options.api_key)) if @options.api_key?
    # @hook('pre:get', Github.hooks.get)
    @hook('pre:post', Heroku.hooks.post)
    
    @apps = new Api.Apps(@)
  
  app: (app) -> new Api.App(@, app)
  
module.exports = Heroku
