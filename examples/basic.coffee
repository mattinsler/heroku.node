Heroku = require '../lib/heroku'

client = new Heroku(api_key: '')

print = -> console.log arguments

client.app('pagelever-api').processes.list(print)
# client.app('pagelever-api').processes.restart_type('web', print)
