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
  ttl: 60 * 60, // optional
  maxIdle: 60 * 60, // optional
})
```

## Constructor arguments

| Param       | Type                                     | Required | Description                   |
|-------------|------------------------------------------|----------|-------------------------------|
| `map`       | IMap proxy obtained via Hazelcast Client | yes      | Configured hazelcast map proxy|
| `ttl`       | integer                                  | no       | Keys time to live, seconds    |
| `maxIdle`   | integer                                  | no       | Keys max idle time, seconds   |

For detailed explanation of `ttl` and `maxIdle`, see Hazelcast Node.js Client's `IMap.set` method in
[API documentation](https://hazelcast.github.io/hazelcast-nodejs-client/).

## Storing format
Each object stored as single JSON string.
Namespace delimeter is ":".

| Key                                  | Value           |
|--------------------------------------|-----------------|
| `<modelName>:<objectId>`             | `{JSON string}` |

For more info see [sequelize-transparent-cache](https://www.npmjs.com/package/sequelize-transparent-cache)