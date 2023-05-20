'use strict';

const className = {
    classNames: {
        'normal': '',
        'error': 'error',
    },

    getClassName: function(type = 'normal') {
        return this.classNames[type];
    }
};

module.exports = className;
