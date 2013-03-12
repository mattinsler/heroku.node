# heroku.node

[Heroku API](https://api-docs.heroku.com) client for node.js

## Installation
```
npm install heroku.node
```

## Usage

```javascript
var Heroku = require('heroku.node');

var client = new Heroku({api_key: '...'});
// Do something with client
```

## Constructors

#### new Heroku({api_key: '...'})

## Methods

### Apps API

#### client.apps.list(callback)

#### client.app('app-name').get(callback)
#### client.app('app-name').maintenance_mode_on(callback)
#### client.app('app-name').maintenance_mode_off(callback)
#### client.app('app-name').destroy(callback)

### Processes API

#### client.app('app-name').processes.list(callback)
#### client.app('app-name').processes.restart(callback)
#### client.app('app-name').processes.restart_type('process-type', callback)
#### client.app('app-name').processes.stop(callback)
#### client.app('app-name').processes.stop_type('process-type', callback)
#### client.app('app-name').processes.scale('process-type', quantity, callback)

#### client.app('app-name').process('process-id').restart(callback)
#### client.app('app-name').process('process-id').stop(callback)

## License
Copyright (c) 2013 Matt Insler  
Licensed under the MIT license.
