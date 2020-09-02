import Vue from 'vue'
import Vuex from 'vuex'

import cnode from './cnode'
import user from './user'
import tabs from './tabs'
import contract from '../pages/admin/contract/store'
import monitoringSupervision from '../pages/admin/monitoringSupervision/store'
import deal from '../pages/admin/monitoringSupervision/statistic/deal/store'
import track from '../pages/admin/monitoringSupervision/track/followUpTrackOperation/store'
// import index from '../index'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        cnode,
        user,
        tabs,
        contract,
        monitoringSupervision,
        deal,
        track
        // index
    }
})