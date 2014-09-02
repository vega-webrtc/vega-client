// Generated by CoffeeScript 1.7.1
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (typeof exports !== "undefined" && exports !== null ? exports : window).VegaClient = (function() {
    VegaClient.send = function(websocket, message) {
      var sendMessage;
      message = JSON.stringify(message);
      sendMessage = (function(_this) {
        return function() {
          return websocket.send(message);
        };
      })(this);
      if (websocket.readyState === websocket.CONNECTING) {
        return websocket.onopen = sendMessage;
      } else {
        return sendMessage();
      }
    };

    function VegaClient(url, roomId, badge) {
      this.url = url;
      this.roomId = roomId;
      this.badge = badge;
      this.onmessage = __bind(this.onmessage, this);
      this.onerror = __bind(this.onerror, this);
      if (this.url === void 0) {
        throw new TypeError('url not provided');
      }
      if (this.roomId === void 0) {
        throw new TypeError('roomId not provided');
      }
      if (this.badge === void 0) {
        throw new TypeError('badge not provided');
      }
      this.websocket = new WebSocket(this.url);
      this.callbacks = {};
      this.websocket.onmessage = this.onmessage;
      this.websocket.onerror = this.onerror;
    }

    VegaClient.prototype.onerror = function(error) {};

    VegaClient.prototype.onmessage = function(message) {
      var data, parsedData, payload, type;
      data = message.data;
      parsedData = JSON.parse(data);
      type = parsedData.type;
      payload = parsedData.payload;
      return this.trigger(type, payload);
    };

    VegaClient.prototype.on = function(type, callback) {
      var _base;
      (_base = this.callbacks)[type] || (_base[type] = []);
      return this.callbacks[type].push(callback);
    };

    VegaClient.prototype.trigger = function(type, payload) {
      if (!this.callbacks[type]) {
        return;
      }
      return this.callbacks[type].forEach((function(_this) {
        return function(callback, idx, callbacks) {
          return callback.apply(_this, [payload]);
        };
      })(this));
    };

    VegaClient.prototype.call = function() {
      return VegaClient.send(this.websocket, {
        type: 'call',
        payload: {
          roomId: this.roomId,
          badge: this.badge
        }
      });
    };

    VegaClient.prototype.offer = function(offer, peerId) {
      return VegaClient.send(this.websocket, {
        type: 'offer',
        payload: {
          offer: offer,
          peerId: peerId
        }
      });
    };

    VegaClient.prototype.answer = function(answer, peerId) {
      return VegaClient.send(this.websocket, {
        type: 'answer',
        payload: {
          answer: answer,
          peerId: peerId
        }
      });
    };

    VegaClient.prototype.candidate = function(candidate, peerId) {
      return VegaClient.send(this.websocket, {
        type: 'candidate',
        payload: {
          candidate: candidate,
          peerId: peerId
        }
      });
    };

    VegaClient.prototype.hangUp = function() {
      return VegaClient.send(this.websocket, {
        type: 'hangUp',
        payload: {}
      });
    };

    return VegaClient;

  })();

}).call(this);
