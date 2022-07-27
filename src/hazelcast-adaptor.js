class HazelcastAdaptor {
  constructor({ map, ttl, maxIdle }) {
    this.map = map
    this.ttl = ttl
    this.maxIdle = maxIdle;
  }

  set(key, value) {
    const keyString = key.join(':');
    return this.map.set(
      keyString,
      JSON.stringify(value),
      this.ttl,
      this.maxIdle
    )
  }

  get(key) {
    const keyString = key.join(':');
    return this.map.get(keyString)
      .then(data => {
        if (!data) {
          return data
        }
        return JSON.parse(data)
      })
  }

  del(key) {
    const keyString = key.join(':');
    return this.map.delete(keyString)
  }
}

module.exports = HazelcastAdaptor
