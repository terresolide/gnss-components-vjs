import Vue from 'vue'
import Vuex from 'vuex'

export default function makeStore( config ) {
  var defaultConfig = {
    api: 'http://127.0.0.1:8083/api/',
    solution: null,
    productor: null,
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
      request (state, getters) {
        var rq = {}
        if (state.solution) {
          rq.solution = state.solution
        }
        if (state.productor) {
          rq.productor = state.productor
        }
        return rq
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
      },
      constels (state, getters) {
         if (state.codelists.constels) {
          return state.codelists.constels
        }
        return null
      }
    }
  })
}