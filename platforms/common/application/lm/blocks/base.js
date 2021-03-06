"use strict";
var prime   = require('prime'),
    Options = require('prime-util/prime/options'),
    Bound    = require('prime-util/prime/bound'),
    Emitter = require('prime/emitter'),
    guid    = require('mout/random/guid'),
    zen     = require('elements/zen'),
    trim    = require('mout/string/trim'),
    $       = require('elements'),

    get     = require('mout/object/get'),
    has     = require('mout/object/has'),
    set     = require('mout/object/set');

require('elements/traversal');

var Base = new prime({
    mixin: [Bound, Options],
    inherits: Emitter,
    options: {
        subtype: false,
        attributes: {}
    },
    constructor: function(options) {
        this.setOptions(options);

        this.fresh = !this.options.id;
        this.id = this.options.id || this.guid();
        this.attributes = this.options.attributes || {};

        this.block = zen('div').html(this.layout()).firstChild();

        this.on('rendered', this.bound('onRendered'));

        return this;
    },

    guid: function() {
        return guid();
    },

    getId: function() {
        return this.id || (this.id = this.guid());
    },

    getType: function() {
        return this.options.type || '';
    },

    getSubType: function() {
        return this.options.subtype || '';
    },

    getTitle: function() {
        return trim(this.options.title || 'Untitled');
    },

    setTitle: function(title) {
        this.options.title = trim(title || 'Untitled');
        return this;
    },

    getKey: function() {
        return '';
    },

    getPageId: function() {
        var root = $('[data-lm-root]');
        if (!root) return 'data-root-not-found';

        return root.data('lm-page');
    },

    getAttribute: function(key) {
        return get(this.attributes, key);
    },

    getAttributes: function() {
        return this.attributes || {};
    },

    updateTitle: function() {
        return this;
    },

    setAttribute: function(key, value) {
        set(this.attributes, key, value);
        return this;
    },

    setAttributes: function(attributes) {
        this.attributes = attributes;

        return this;
    },

    hasAttribute: function(key) {
        return has(this.attributes, key);
    },

    disable: function() {
        this.block.title('This particle has been disabled and it won\'t be rendered on front-end. You can still configure, move and delete.');
        this.block.addClass('particle-disabled');
    },

    enable: function() {
        this.block.removeAttribute('title');
        this.block.removeClass('particle-disabled');
    },

    insert: function(target, location) {
        this.block[location || 'after'](target);
        return this;
    },

    adopt: function(element) {
        element.insert(this.block);
        return this;
    },

    isNew: function(fresh) {
        if (typeof fresh !== 'undefined') {
            this.fresh = !!fresh;
        }
        return this.fresh;
    },

    dropzone: function() {
        return 'data-lm-dropzone';
    },

    addDropzone: function(){
        this.block.data('lm-dropzone', true);
    },

    removeDropzone: function(){
        this.block.data('lm-dropzone', null);
    },

    layout: function() {},

    onRendered: function(){},

    setLayout: function(layout) {
        this.block = layout;
        return this;
    }
});

module.exports = Base;
