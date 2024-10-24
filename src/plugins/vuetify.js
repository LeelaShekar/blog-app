// src/plugins/vuetify.js

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// Optionally import icons
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  // You can customize Vuetify options here
})
