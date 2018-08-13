var e = function(selector) {
    return document.querySelector(selector)
}

var log = function() {
    console.log.apply(console, arguments)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}

var appendHtml = function(selector, html) {
    var element = e(selector)
    element.insertAdjacentHTML('beforeend', html)
}

var taggleClass = function(element, className) {
    if(element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    log(elements)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}
