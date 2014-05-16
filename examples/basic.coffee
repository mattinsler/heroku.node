Heroku = require '../lib/heroku'

client = new Heroku(email: 'matt.insler@gmail.com', api_key: '65d112c8-0e9a-4d7b-8704-3ba69d6c8b13')

print = -> console.log arguments

# client.app('awesometalk-api-staging').processes.list(print)
# client.app('pagelever-api').processes.restart_type('web', print)

client.app('awesometalk-api-staging').dynos.list()
.then (dynos) ->
  client.app('awesometalk-api-staging').dyno(dynos[0].id).restart()
.then ->
  console.log arguments
.catch (err) ->
  console.log err.stack
