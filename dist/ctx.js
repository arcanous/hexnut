"use strict";
var _a = require('./symbols'), SOCKET_SYMBOL = _a.SOCKET_SYMBOL, REQUEST_SYMBOL = _a.REQUEST_SYMBOL;
/**
 * @class
 * Context object representing a HexNut connection
 */
var ctx = {
    /**
     * @private
     */
    _reset: function (message) {
        this.type = 'message';
        this.isComplete = false;
        this.message = message;
    },
    /**
     * Send a message to the client
     * @param {*} data
     * @method
     */
    send: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        (_a = this[SOCKET_SYMBOL]).send.apply(_a, args);
        return this;
    },
    /**
     * Send a message to all connected clients
     * @param {*} data
     */
    sendToAll: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Object.values(this.app.connections).forEach(function (ctx) {
            var _a;
            return (_a = ctx[SOCKET_SYMBOL]).send.apply(_a, args);
        });
        return this;
    },
    /**
     * Short circuit all remaining middleware
     */
    done: function () {
        this.isComplete = true;
        return this;
    },
    /**
     * Throw an error
     * @param {Error} err
     */
    throw: function (err) {
        throw err;
    },
    /**
     * True if this activation of the middlware chain is a new connection
     */
    get isConnection() {
        return this.type === 'connection';
    },
    /**
     * True if this activation of the middlware chain is a new message
     */
    get isMessage() {
        return this.type === 'message';
    },
    /**
     * True if this activation of the middlware chain is a closing connection
     */
    get isClosing() {
        return this.type === 'closing';
    },
    /**
     * Object representing the http(s) headers that began this connection
     */
    get requestHeaders() {
        return this[REQUEST_SYMBOL].headers;
    },
    /**
     * IP Address of the client
     */
    get ip() {
        return this[REQUEST_SYMBOL].connection.remoteAddress;
    },
    /**
     * String URL path that began the connection
     */
    get path() {
        return this[REQUEST_SYMBOL].url;
    },
    /**
     * HTTP method used to begin the connection
     */
    get method() {
        return this[REQUEST_SYMBOL].method;
    }
};
/**
 * @private
 */
module.exports = function (ws, req, app) {
    var _a;
    return Object.assign(Object.create(ctx), (_a = {
            app: app,
            type: 'connection',
            message: null
        },
        _a[SOCKET_SYMBOL] = ws,
        _a[REQUEST_SYMBOL] = req,
        _a));
};
