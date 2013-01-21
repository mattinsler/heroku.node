# github.node

Github v3 Client for Node.js

## Installation
```
npm install github.node
```

## Usage

```javascript
var Github = require('github.node');

var client = new Github({access_token: '...'});
client.
```

## Constructors

#### new Github()
#### new Github({access_token: '...'})

## Methods

### Users API

### Authenticated

#### client.user.get(callback)
#### client.user.update(updates, callback)

#### client.user.emails.list(callback)
#### client.user.emails.add(emails, callback)
#### client.user.emails.remove(emails, callback)

#### client.user.followers.list(callback)
#### client.user.following.list(callback)
#### client.user.following.check(username, callback)
#### client.user.following.add(username, callback)
#### client.user.following.remove(username, callback)

### Not Authenticated

#### client.users.list([parameters], callback)
#### client.users(username).get(callback)

#### client.users(username).followers.list(callback)
#### client.users(username).following.list(callback)

### Repos API

### Authenticated

#### client.repos.list([parameters], callback)
#### client.repos.get(repo, callback)
#### client.repos.create(data, callback)
#### client.repos.update(repo, updates, callback)

#### client.orgs(organization).repos.create(data, callback)
#### client.

### Not Authenticated

#### client.repos.list([parameters], callback)
#### client.users(username).repos.list([parameters], callback)
#### client.users(username).repos.get(repo, callback)
#### client.orgs(organization).repos.list([parameters], callback)

## License
Copyright (c) 2013 Matt Insler  
Licensed under the MIT license.
