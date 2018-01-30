async = require("async")

MailAdapter = require('mail-worker').MailAdapter
SMTPConnection = require('smtp-connection')

class SendgridAdapter extends MailAdapter

  constructor: (@apiKey) ->
    return

  sendMail: (sender, recipients, mimeBody, cb) ->
    @connection = new SMTPConnection
      host: "smtp.sendgrid.net"
      port: 587
      authMethods: ["TLS"]

    async.series [
      (next) => @connection.connect next
      ,
      (next) => @connection.login { user: 'apikey', pass: @apiKey }, next
      ,
      (next) => @connection.send { from: sender, to: recipients }, mimeBody, next
    ], (err) =>
      @connection.quit() unless err
      cb err

module.exports = SendgridAdapter