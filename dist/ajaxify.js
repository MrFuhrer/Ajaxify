'use strict';
var functions = {};
if(typeof jQuery != 'undefined') {
    functions.serialize = function(form) {
        return jQuery(form).serialize();
    }
} else {
    functions.serialize = function(form) {
        var formData = new FormData(form);
        var entries = formData.entries();
        var data = [];
        var next;
        next = entries.next();
        while(!next.done) {
            if(typeof next.value[1] == 'string') {
                data.push(next.value[0] + "=" + next.value[1]);
            }
            next = entries.next();
        }
        return data.join('&');
    };
}

window.ajaxify = function(form,options) {
    form.onsubmit = function (e) {
        e.stopPropagation();
        e.preventDefault();

        if(options && options.validation) {
            if(!options.validation(form)) {
                return;
            }
        }

        var method, action;
        method = form.hasAttribute('method') ? form.getAttribute('method') : 'GET';
        action = form.hasAttribute('action') ? form.getAttribute('action') : '';

        var data = null;

        if (method.toLowerCase() != 'post' && method.toLowerCase() != 'put') {
            if(action.indexOf('?')!=-1 && action.indexOf('=')!=-1) {
                action += '&' + functions.serialize(form);
            } else {
                action += '?' + functions.serialize(form);
            }
        } else {
            data = new FormData(form);
        }

        var xhr = new XMLHttpRequest();


        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var data;
                if(xhr.getResponseHeader('Content-Type') && xhr.getResponseHeader('Content-Type').indexOf('application/json')!=-1) {
                    try {
                        data = JSON.parse(xhr.responseText);
                    } catch(e) {
                        data = xhr.responseText;
                    }
                } else {
                    data = xhr.responseText;
                }
                if(options && options.callback) {
                    options.callback(data,xhr.status);
                }
            }
        };



        xhr.open(method.toUpperCase(), action, true);

        xhr.send(data);

    }
};
if(typeof jQuery != 'undefined') {
    jQuery.fn.ajaxify = function() {
        var options = {};
        if(arguments.length) {
            if(typeof arguments[0] == 'object') {
                options = arguments[0];
            } else {
                options['callback']=arguments[0];
                if(arguments[1]) options['validation'] = arguments[1];
            }
        }
        this.each(function(i,e) {
            ajaxify(e,options);
        });
    }
}