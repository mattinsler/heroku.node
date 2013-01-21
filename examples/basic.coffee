Github = require '../lib/github'

client = new Github(access_token: '1252b5ae7d0e554d72ef5371f7d5edb1854da9bd')

# client.user.repositories.list {type: 'private'}, (err, list) ->
#   return console.error(err) if err?
#   
#   list.forEach (r) ->
#     console.log "#{r.pushed_at}: #{r.full_name}"

# client.users('mattinsler').repositories.list (err, list) ->
# client.users('mattinsler').repositories.list {type: 'all', sort: 'pushed', direction: 'desc'}, (err, list) ->
#   return console.error(err) if err?
#   
#   list.forEach (r) ->
#     console.log "#{r.pushed_at}: #{r.full_name}"


client.users('mattinsler').repositories('caboose').hooks.list (err, list) ->
  return console.error(err) if err?
  
  console.log list
