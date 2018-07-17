function index(req, res) {
  res.json({
    message: 'Welcome to exBook!',
    documentation_url: 'https://github.com/RP2/exBook',
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/api', description: 'Describes available endpoints'
      }
    ]
  });
}

module.exports = {
  index: index
}
