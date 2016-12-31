const translate = document.getElementById('translate')
const json = document.getElementById('json')
const result = document.getElementById('result')
const path = document.getElementById('path')
const format = document.getElementById('format')
const JSONPath = require('jsonpath-plus');

let editor
let resultEditor
setTimeout(() => {
  editor = ace.edit('json')
  editor.session.setMode('ace/mode/json')
  resultEditor = ace.edit('result')
  resultEditor.session.setMode('ace/mode/json')
  resultEditor.setReadOnly(true)
})


const exampleJson =   {
    "store": {
        "book": [
            {
                "category": "reference",
                "author": "Nigel Rees",
                "title": "Sayings of the Century",
                "price": 8.95
            },
            {
                "category": "fiction",
                "author": "Evelyn Waugh",
                "title": "Sword of Honour",
                "price": 12.99
            },
            {
                "category": "fiction",
                "author": "Herman Melville",
                "title": "Moby Dick",
                "isbn": "0-553-21311-3",
                "price": 8.99
            },
            {
                "category": "fiction",
                "author": "J. R. R. Tolkien",
                "title": "The Lord of the Rings",
                "isbn": "0-395-19395-8",
                "price": 22.99
            }
        ],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    }
}

json.innerText = JSON.stringify(exampleJson, null, 2)

const examplePath = '$.store.book[*].title'

translate.onclick = () => {
    try {
        JSON.parse(editor.session.getValue())
        if (path.value.trim().length === 0) return
        let res = JSONPath({path: path.value, json: JSON.parse(editor.session.getValue())})
        resultEditor.setValue(formatJSON(JSON.stringify(res)))
    } catch (e) {
      console.error(e)
        alert('Either JSON or Path is invalid')
    }

}

format.onclick = () => {
  editor.session.setValue(formatJSON(editor.session.getValue()))

}

function formatJSON (string) {
  //Remove leading spaces
  let array = string.split(/\n/)
  array[0] = array[0].trim()
  string = array.join("\n")
  //Actual beautify (prettify)
  string = js_beautify(string)
  //Change current text to formatted text
  return string
}
