module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    stylesheets: {joinTo: 'app.css'}
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  },

  npm: {
    styles: {
      'normalize.css': ['normalize.css']
    }
  },

  server: {
    command: 'nodemon --ignore app --ignore public server.js'
  }
};
