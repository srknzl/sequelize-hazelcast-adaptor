# Hazelcast Sequelize Cache Adaptor

Hazelcast adaptor for [sequelize-transparent-cache](https://www.npmjs.com/package/sequelize-transparent-cache). This package uses a [Hazelcast Node.js Client](https://github.com/hazelcast/hazelcast-nodejs-client) instance behind the scenes to store sequelize objects in Hazelcast.

## Example usage

```javascript
const { Client } = require('hazelcast-client');

const client = await Client.newHazelcastClient();
const map = await client.getMap('sequelizeMap');

const HazelcastAdaptor = require('sequelize-transparent-cache-hazelcast')
const hazelcastAdaptor = new HazelcastAdaptor({
  map: map,
  namespace: 'model', // optional
  ttl: 60 * 60, // optional
})
```

## Constructor arguments

| Param       | Type                                     | Required | Description                   |
|-------------|------------------------------------------|----------|-------------------------------|
| `map`       | IMap proxy obtained via Hazelcast Client | yes      | Configured hazelcast map proxy|
| `namespace` | string                                   | no       | Prefix for all keys           |
| `ttl`       | integer                                  | no       | Keys time to live, seconds    |

## Storing format
Each object stored as single JSON string.
Namespace delimeter is ":".

| Key                                  | Value           |
|--------------------------------------|-----------------|
| `<namespace>:<modelName>:<objectId>` | `{JSON string}` |

For more info see [sequelize-transparent-cache](https://www.npmjs.com/package/sequelize-transparent-cache)