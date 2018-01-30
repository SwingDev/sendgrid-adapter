var MailAdapter, SMTPConnection, SendgridAdapter, async,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

async = require("async");

MailAdapter = require('mail-worker').MailAdapter;

SMTPConnection = require('smtp-connection');

SendgridAdapter = (function(superClass) {
  extend(SendgridAdapter, superClass);

  function SendgridAdapter(apiKey) {
    this.apiKey = apiKey;
    return;
  }

  SendgridAdapter.prototype.sendMail = function(sender, recipients, mimeBody, cb) {
    this.connection = new SMTPConnection({
      host: "smtp.sendgrid.net",
      port: 587,
      authMethods: ["TLS"]
    });
    return async.series([
      (function(_this) {
        return function(next) {
          return _this.connection.connect(next);
        };
      })(this), (function(_this) {
        return function(next) {
          return _this.connection.login({
            user: 'apikey',
            pass: _this.apiKey
          }, next);
        };
      })(this), (function(_this) {
        return function(next) {
          return _this.connection.send({
            from: sender,
            to: recipients
          }, mimeBody, next);
        };
      })(this)
    ], (function(_this) {
      return function(err) {
        if (!err) {
          _this.connection.quit();
        }
        return cb(err);
      };
    })(this));
  };

  return SendgridAdapter;

})(MailAdapter);

module.exports = SendgridAdapter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLG1EQUFBO0VBQUE7OztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsT0FBUjs7QUFFUixXQUFBLEdBQWMsT0FBQSxDQUFRLGFBQVIsQ0FBc0IsQ0FBQzs7QUFDckMsY0FBQSxHQUFpQixPQUFBLENBQVEsaUJBQVI7O0FBRVg7OztFQUVTLHlCQUFDLE1BQUQ7SUFBQyxJQUFDLENBQUEsU0FBRDtBQUNaO0VBRFc7OzRCQUdiLFFBQUEsR0FBVSxTQUFDLE1BQUQsRUFBUyxVQUFULEVBQXFCLFFBQXJCLEVBQStCLEVBQS9CO0lBQ1IsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxjQUFBLENBQ2hCO01BQUEsSUFBQSxFQUFNLG1CQUFOO01BQ0EsSUFBQSxFQUFNLEdBRE47TUFFQSxXQUFBLEVBQWEsQ0FBQyxLQUFELENBRmI7S0FEZ0I7V0FLbEIsS0FBSyxDQUFDLE1BQU4sQ0FBYTtNQUNYLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxJQUFEO2lCQUFVLEtBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFvQixJQUFwQjtRQUFWO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQURXLEVBR1gsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLElBQUQ7aUJBQVUsS0FBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLENBQWtCO1lBQUUsSUFBQSxFQUFNLFFBQVI7WUFBa0IsSUFBQSxFQUFNLEtBQUMsQ0FBQSxNQUF6QjtXQUFsQixFQUFxRCxJQUFyRDtRQUFWO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUhXLEVBS1gsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLElBQUQ7aUJBQVUsS0FBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCO1lBQUUsSUFBQSxFQUFNLE1BQVI7WUFBZ0IsRUFBQSxFQUFJLFVBQXBCO1dBQWpCLEVBQW1ELFFBQW5ELEVBQTZELElBQTdEO1FBQVY7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBTFc7S0FBYixFQU1HLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxHQUFEO1FBQ0QsSUFBQSxDQUEwQixHQUExQjtVQUFBLEtBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFBLEVBQUE7O2VBQ0EsRUFBQSxDQUFHLEdBQUg7TUFGQztJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FOSDtFQU5ROzs7O0dBTGtCOztBQXFCOUIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJhc3luYyA9IHJlcXVpcmUoXCJhc3luY1wiKVxuXG5NYWlsQWRhcHRlciA9IHJlcXVpcmUoJ21haWwtd29ya2VyJykuTWFpbEFkYXB0ZXJcblNNVFBDb25uZWN0aW9uID0gcmVxdWlyZSgnc210cC1jb25uZWN0aW9uJylcblxuY2xhc3MgU2VuZGdyaWRBZGFwdGVyIGV4dGVuZHMgTWFpbEFkYXB0ZXJcblxuICBjb25zdHJ1Y3RvcjogKEBhcGlLZXkpIC0+XG4gICAgcmV0dXJuXG5cbiAgc2VuZE1haWw6IChzZW5kZXIsIHJlY2lwaWVudHMsIG1pbWVCb2R5LCBjYikgLT5cbiAgICBAY29ubmVjdGlvbiA9IG5ldyBTTVRQQ29ubmVjdGlvblxuICAgICAgaG9zdDogXCJzbXRwLnNlbmRncmlkLm5ldFwiXG4gICAgICBwb3J0OiA1ODdcbiAgICAgIGF1dGhNZXRob2RzOiBbXCJUTFNcIl1cblxuICAgIGFzeW5jLnNlcmllcyBbXG4gICAgICAobmV4dCkgPT4gQGNvbm5lY3Rpb24uY29ubmVjdCBuZXh0XG4gICAgICAsXG4gICAgICAobmV4dCkgPT4gQGNvbm5lY3Rpb24ubG9naW4geyB1c2VyOiAnYXBpa2V5JywgcGFzczogQGFwaUtleSB9LCBuZXh0XG4gICAgICAsXG4gICAgICAobmV4dCkgPT4gQGNvbm5lY3Rpb24uc2VuZCB7IGZyb206IHNlbmRlciwgdG86IHJlY2lwaWVudHMgfSwgbWltZUJvZHksIG5leHRcbiAgICBdLCAoZXJyKSA9PlxuICAgICAgQGNvbm5lY3Rpb24ucXVpdCgpIHVubGVzcyBlcnJcbiAgICAgIGNiIGVyclxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbmRncmlkQWRhcHRlclxuXG4jIFNHLjd1emI2aXBfU1NlUnJFT0dIc0tacGcuUkhzOWhrS1NwWVMzMGlJWmtPNUl0UFJ6SkpVMVd3MlE1ekp3WVI2QkpOUSJdfQ==
