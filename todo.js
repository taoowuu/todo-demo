// 添加 todo 到页面
var bindAdd = function() {
    var add = e('.todo-add')
    bindEvent(add, 'click', function() {
        var input = e('.todo-input')
        var value = input.value
        var t = todoTemplate(value)
        appendHtml('.todo-container', t)
        saveTodos()
    })
}

// todo 模板
var todoTemplate = function(value) {
    var t = `
        <div class="todo-cell">
            <i class="todo-done fa fa-check-circle-o" style="font-size:30px;color:#51c7ae"></i>
            <i class="todo-delete fa fa-times-circle-o" style="font-size:30px;color:#51c7ae"></i>
            <span class="todo-content"> ${value} ${now()} </span>
        </div>
    `
    return t
}

// 删除 todo
var bindDelete = function() {
    var container = e('.todo-container')
    bindEvent(container, 'click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-delete')) {
            var todoDiv = self.parentElement
            todoDiv.remove()
        }
        saveTodos()
    })
}

// 完成 todo
var bindDone = function() {
    var container = e('.todo-container')
    bindEvent(container, 'click', function(event) {
        var self = event.target
        if (self.classList.contains('todo-done')) {
            var todoDiv = self.parentElement
            taggleClass(todoDiv, 'done')
        }
        saveTodos()
    })
}

// 存入 localStorage
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}

// 从 localStorage 返回
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}

// 把所有 todo 存入 localStorage
var saveTodos = function() {
    var contents = es('.todo-container')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var todo = c.innerHTML
        todos.push(todo)
    }
    save(todos)
}

// 从 localStorage 返回所有 todo
var loadTodos = function() {
    var todos = load()
    for (var i = 0; i < todos.length; i++) {
        var t = todos[i]
        appendHtml('.todo-container', t)
    }
}

// 点击 输入框按钮 显示输入框
var bindInput = function() {
    var input = e('#input')
    bindEvent(input, 'click', function() {
        showInput()
        removeClassAll('button-active')
        taggleClass(input, 'button-active')
        var id = input.dataset.id
        pushState(id)
    })
}

// 点击 内容框按钮 显示内容框
var bindList = function() {
    var list = e('#list')
    bindEvent(list, 'click', function() {
        showList()
        removeClassAll('button-active')
        taggleClass(list, 'button-active')
        var id = list.dataset.id
        pushState(id)
    })
}

var pushState = function(id) {
    var state = id
    var url = 'todo-spa.html?page=' + state
    history.pushState(state, 'title', url)
    document.title = state
}

// 根据 popstate 的 state 显示不同页面
var showPage = function(id) {
    if(id == 'list') {
        showList()
    } else if (id == 'input') {
        showInput()
    }
}

var showList = function() {
    removeClassAll('hide')
    var todo = e('.todo')
    todo.classList.add('hide')
}

var showInput = function() {
    removeClassAll('hide')
    var cell = e('.todo-container')
    cell.classList.add('hide')
}

var now = function() {
    var d = new Date()
    var nm = d.getFullYear()
    var yt = d.getMonth() + 1
    var ri = d.getDate()
    var ui = d.getHours()
    var ff = d.getMinutes()

    return `${nm}/${yt}/${ri} ${ui}:${ff}`
}

// 浏览器点击前进后退时改变页面
window.addEventListener("popstate", function(e) {
    var id = e.state
    showPage(id)
})

var bindEvents = function() {
    bindAdd()
    bindDone()
    bindDelete()
    bindInput()
    bindList()
}

var __main = function() {
    bindEvents()
    loadTodos()
    saveTodos()
}

__main()
