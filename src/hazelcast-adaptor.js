class HazelcastAdaptor {
    constructor ({ map, namespace, lifetime }) {
      this.map = map
      this.namespace = namespace
      this.lifetime = lifetime
    }
  
    _withNamespace (key) {
      const namespace = this.namespace
      const keyWithNamespace = namespace
        ? [namespace, ...key]
        : key
  
      return keyWithNamespace.join(':')
    }
  
    set (key, value) {
      return this.map.set(
        this._withNamespace(key),
        JSON.stringify(value),
        this.lifetime
      )
    }
  
    get (key) {
      return this.map.get(this._withNamespace(key))
        .then(data => {
          if (!data) {
            return data
          }
  
          return JSON.parse(data)
        })
    }
  
    del (key) {
      return this.map.delete(this._withNamespace(key))
    }
  }
  
  module.exports = HazelcastAdaptor
  