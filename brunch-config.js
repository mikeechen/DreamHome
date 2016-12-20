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
    babel: {
      presets: [
      'es2015',
      'stage-1',
      'react'
      ],
      plugins: ['transform-decorators-legacy']
    }
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
