import Vue from 'vue'
import Vuex from 'vuex'

export default function makeStore( config ) {
  var defaultConfig = {
    frost: 'http://localhost:8080/FROST-Server/v1.1/',
    api: 'http://127.0.0.1:8083/api/',
    query: {}
  }
  var finalConfig = Object.assign(defaultConfig, config)
  return new Vuex.Store( {
    state: finalConfig,
    mutation: {
      setQuery (state, query) {
        state.query = query
      }
    },
    getters: {
      frost (state, getters) {
        return state.frost
      },
      api (state, getters) {
        return state.api
      }
    }
  })
}