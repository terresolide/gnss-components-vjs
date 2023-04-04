import Vue from 'vue'
import Vuex from 'vuex'

export default function makeStore( config ) {
  var defaultConfig = {
    frost: 'http://localhost:8080/FROST-Server/v1.1/',
    api: 'http://127.0.0.1:8083/api/',
    query: {},
    codelists: {}
  }
  var finalConfig = Object.assign(defaultConfig, config)
  return new Vuex.Store( {
    state: finalConfig,
    mutations: {
      setQuery (state, query) {
        state.query = query
      },
      setCodeList(state, codelists){
        console.log(codelists)
        state.codelists = codelists
      }
    },
    getters: {
      frost (state, getters) {
        return state.frost
      },
      api (state, getters) {
        return state.api
      },
      networks (state, getters) {
        if (state.codelists.networks) {
          return state.codelists.networks
        }
        return null
      },
      productors (state, getters) {
         if (state.codelists.productors) {
          return state.codelists.productors
        }
        return null
      },
      solutions (state, getters) {
         if (state.codelists.solutions) {
          return state.codelists.solutions
        }
        return null
      },
      productTypes (state, getters) {
         if (state.codelists.productTypes) {
          return state.codelists.productTypes
        }
        return null
      }
    }
  })
}