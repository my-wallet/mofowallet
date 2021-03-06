/**
 * The MIT License (MIT)
 * Copyright (c) 2016 Krypto Fin ry and the FIMK Developers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * */
(function () {
'use strict';
var module = angular.module('fim.base');
module.run(function (plugins, modals, $q, $rootScope, nxt) {

  var plugin = plugins.get('transaction');

  plugin.add({
    label: 'Set Alias',
    id: 'setAlias',
    exclude: $rootScope.TRADE_UI_ONLY,
    execute: function (senderRS, args) {
      args = args||{};
      return plugin.create(angular.extend(args, {
        title: 'Set Alias',
        message: 'Set or update an alias',
        senderRS: senderRS,
        requestType: 'setAlias',
        canHaveRecipient: false,
        createArguments: function (items) {
          return {
            aliasName: items.aliasName,
            aliasURI: items.aliasURI
          }
        },
        fields: [{
          label: 'Alias Name',
          name: 'aliasName',
          type: 'text',
          value: args.aliasName||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if ( ! plugin.ALPHABET.test(text)) { this.errorMsg = 'Invalid character'; }
            else if (plugin.getByteLen(text) > 100) { this.errorMsg = 'To much characters'; }
            return ! this.errorMsg;
          },
          required: true
        }, {
          label: 'Alias Value',
          name: 'aliasURI',
          type: 'textarea',
          value: args.aliasURI||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if (plugin.getByteLen(text) > 1000) { this.errorMsg = 'To much characters'; }
            return ! this.errorMsg;
          },
          required: true
        }]
      }));
    }
  });

  plugin.add({
    label: 'Sell Alias',
    id: 'sellAlias',
    exclude: true,
    execute: function (senderRS, args) {
      args = args||{};
      return plugin.create(angular.extend(args, {
        title: 'Sell Alias',
        message: "Please enter the Alias <b>name</b> or it's <b>identifier</b>. " +
                 "If a recipient is provided only the recipient can buy the alias, " +
                 "leave the recipient field blank to allow anyone to buy the alias.<br><br>" +
                 "<b>Note:</b> An alias can be transferred rather than sold by setting price to zero. " +
                 "A pending sale can be canceled by selling again to self for a price of zero.",
        senderRS: senderRS,
        requestType: 'sellAlias',
        canHaveRecipient: true,
        editRecipient: true,
        recipient: args.recipient||'',
        createArguments: function (items) {
          var args = { priceNQT: nxt.util.convertToNQT(items.priceNXT) };
          if (items.alias) { args.alias = items.alias; }
          if (items.aliasName) { args.aliasName = items.aliasName; }
          if (items.recipient) { args.recipient = nxt.util.convertRSAddress(items.recipient); }
          return args;
        },
        fields: [{
          label: 'Identifier',
          name: 'alias',
          type: 'text',
          value: args.alias||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if ( ! plugin.ALPHABET.test(text)) { this.errorMsg = 'Invalid character'; }
            return ! this.errorMsg;
          },
          required: false
        }, {
          label: 'Alias Name',
          name: 'aliasName',
          type: 'text',
          value: args.aliasName||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if ( ! plugin.ALPHABET.test(text)) { this.errorMsg = 'Invalid character'; }
            else if (plugin.getByteLen(text) > 100) { this.errorMsg = 'To much characters'; }
            return ! this.errorMsg;
          },
          required: false
        }, {
          label: 'Price',
          name: 'priceNXT',
          type: 'money',
          value: args.priceNXT||'',
          required: true
        }]
      }));
    }
  });

  plugin.add({
    label: 'Buy Alias',
    id: 'buyAlias',
    exclude: true,
    execute: function (senderRS, args) {
      args = args||{};
      return plugin.create(angular.extend(args, {
        title: 'Buy Alias',
        message: "Buy an alias. Please enter the Alias <b>name</b> or it's <b>identifier</b>.",
        senderRS: senderRS,
        requestType: 'buyAlias',
        canHaveRecipient: false,
        createArguments: function (items) {
          var args = { amountNQT: nxt.util.convertToNQT(items.amountNXT) };
          if (items.alias) { args.alias = items.alias; }
          if (items.aliasName) { args.aliasName = items.aliasName; }
          return args;
        },
        fields: [{
          label: 'Identifier',
          name: 'alias',
          type: 'text',
          value: args.alias||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if ( ! plugin.ALPHABET.test(text)) { this.errorMsg = 'Invalid character'; }
            return ! this.errorMsg;
          },
          required: false
        }, {
          label: 'Alias Name',
          name: 'aliasName',
          type: 'text',
          value: args.aliasName||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if ( ! plugin.ALPHABET.test(text)) { this.errorMsg = 'Invalid character'; }
            else if (plugin.getByteLen(text) > 100) { this.errorMsg = 'To much characters'; }
            return ! this.errorMsg;
          },
          required: false
        }, {
          label: 'Amount',
          name: 'amountNXT',
          type: 'money',
          value: (args.amountNXT||'').replace(',',''),
          required: true
        }]
      }));
    }
  });

  /* Transfer alias */
  plugin.add({
    label: 'Transfer Alias',
    id: 'transferAlias',
    exclude: true,
    execute: function (senderRS, args) {
      args = args||{};
      return plugin.create(angular.extend(args, {
        title: 'Transfer Alias',
        message: "Please enter the <b>recipient</b>.",
        senderRS: senderRS,
        requestType: 'sellAlias',
        canHaveRecipient: true,
        editRecipient: true,
        recipient: args.recipient||'',
        createArguments: function (items) {
          var args = { priceNQT: '0' };
          if (items.alias) { args.alias = items.alias; }
          if (items.aliasName) { args.aliasName = items.aliasName; }
          if (items.recipient) { args.recipient = nxt.util.convertRSAddress(items.recipient); }
          return args;
        },
        fields: [{
          label: 'Identifier',
          name: 'alias',
          type: 'text',
          value: args.alias||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if ( ! plugin.ALPHABET.test(text)) { this.errorMsg = 'Invalid character'; }
            return ! this.errorMsg;
          },
          required: false
        }, {
          label: 'Alias Name',
          name: 'aliasName',
          type: 'text',
          value: args.aliasName||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if ( ! plugin.ALPHABET.test(text)) { this.errorMsg = 'Invalid character'; }
            else if (plugin.getByteLen(text) > 100) { this.errorMsg = 'To much characters'; }
            return ! this.errorMsg;
          },
          required: false
        }]
      }));
    }
  });

  /* Delete alias */
  // plugins.add();

  /* Note: An alias can be transferred rather than sold by setting priceNQT to zero.
     A pending sale can be canceled by selling again to self for a price of zero. */

  /* Cancel sell */
  plugin.add({
    label: 'Cancel Sell Alias',
    id: 'cancelSellAlias',
    exclude: true,
    execute: function (senderRS, args) {
      args = args||{};
      return plugin.create(angular.extend(args, {
        title: 'Cancel Sell Alias',
        message: "Please enter the Alias <b>name</b> or it's <b>identifier</b>. ",
        senderRS: senderRS,
        requestType: 'sellAlias',
        canHaveRecipient: false,
        createArguments: function (items) {
          var args = { priceNQT: '0', recipient: nxt.util.convertRSAddress(senderRS) };
          if (items.alias) { args.alias = items.alias; }
          if (items.aliasName) { args.aliasName = items.aliasName; }
          return args;
        },
        fields: [{
          label: 'Identifier',
          name: 'alias',
          type: 'text',
          value: args.alias||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if ( ! plugin.ALPHABET.test(text)) { this.errorMsg = 'Invalid character'; }
            return ! this.errorMsg;
          },
          required: false
        }, {
          label: 'Alias Name',
          name: 'aliasName',
          type: 'text',
          value: args.aliasName||'',
          validate: function (text) {
            this.errorMsg = null;
            if (!text) { this.errorMsg = null; }
            else if ( ! plugin.ALPHABET.test(text)) { this.errorMsg = 'Invalid character'; }
            else if (plugin.getByteLen(text) > 100) { this.errorMsg = 'To much characters'; }
            return ! this.errorMsg;
          },
          required: false
        }]
      }));
    }
  });

});
})();