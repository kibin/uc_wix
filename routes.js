const path = require('path')

module.exports = [{
  name: 'settings',
  path: '/settings',
  template: path.join(__dirname, 'settings.html'),
}, {
  name: 'widget',
  path: '/widget',
  template: path.join(__dirname, 'widget.html'),
}]
