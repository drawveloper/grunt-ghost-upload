cheerio = require 'cheerio'
querystring = require 'querystring'
fs = require 'fs'
request = require 'request-promise'
request = request.defaults({jar: true})

module.exports = (options) ->
  checkRequiredProperties: (data, exists) ->
    unless data.zip
      throw new Error('zip property with path to template is required.')

    unless exists(data.zip)
      throw new Error("path #{data.zip} apparently doesn\'t exist.")

    unless data.blog
      throw new Error('blog property is required.')

  fetchLoginPage: ->
    requestOptions =
      url: options.loginURL
      resolveWithFullResponse: true
      headers:
        'user-agent': options.userAgent

    return request(requestOptions)

  getLoginFormData: (response) ->
    formData = {}
    $ = cheerio.load(response.body)
    formData['utf'] = '✓'
    formData['authenticity_token'] = $("input[name='authenticity_token']").val()

    return formData

  postCredentials: (formData) ->
    formData['username'] = process.env[options.userEnv]
    formData['password'] = process.env[options.passEnv]

    body = querystring.stringify(formData)

    requestOptions =
      resolveWithFullResponse: true
      followAllRedirects: true
      uri: options.loginFormActionURL
      method: 'POST'
      body: body
      headers:
        'user-agent': options.userAgent
        'origin': 'https://ghost.org'
        'content-type': 'application/x-www-form-urlencoded'
        'content-length': body.length

    return request(requestOptions)

  fetchBlogEditPage: ->
    requestOptions =
      uri: options.blogsURL + options.blog + '/'
      resolveWithFullResponse: true
      headers:
        'user-agent': options.userAgent

    return request(requestOptions)

  getEditFormData: (response) ->
    formData = {}
    $ = cheerio.load(response.body)
    formData['utf'] = '✓'
    formData['authenticity_token'] = $("input[name='authenticity_token']").val()
    formData['_method'] = $("input[name='_method']").val()
    formData['name'] = $("input[name='name']").val()
    formData['subdomain'] = $("input[name='subdomain']").val()
    formData['external_domain'] = $("input[name='external_domain']").val()

    return formData

  uploadTheme: (formData) ->
    formData['custom_theme'] = fs.createReadStream(options.zip)

    requestOptions =
      resolveWithFullResponse: true
      followAllRedirects: true
      uri: options.blogsURL + options.blog + '/'
      method: 'POST'
      formData: formData
      headers:
        'user-agent': options.userAgent
        'origin': 'https://ghost.org'

    return request(requestOptions)

  getResult: (response) ->
    $ = cheerio.load(response.body)
    $('.notification-notice').text()
