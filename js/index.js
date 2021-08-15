const todoObjectList = []

class Todo_Class {
  constructor(item) {
    this.ulElement = item
  }

  add() {
    const todoInput = document.querySelector("#myInput").value

    if (todoInput == "") {
      alert("You did not enter any item!")
    } else {
      let DONE = false
      todoObjectList.forEach((item) => {
        if (item.edit.status) {
          item.todoText = todoInput
          item.edit.status = false
          DONE = true
        }
      })
      if (!DONE) {
        const todoObject = {
          id: todoObjectList.length,
          todoText: todoInput,
          isDone: false,
          edit: {
            status: false,
            indexOfElement: "",
          },
        }
        todoObjectList.unshift(todoObject)
      }
    }
    this.display()
    document.querySelector("#myInput").value = ""
  }

  done_undone(x) {
    const selectedTodoIndex = todoObjectList.findIndex(
      (item) => item.id === Number(x)
    )
    if (todoObjectList[selectedTodoIndex]) {
      todoObjectList[selectedTodoIndex].isDone === false
        ? (todoObjectList[selectedTodoIndex].isDone = true)
        : (todoObjectList[selectedTodoIndex].isDone = false)
    }

    this.display()
  }

  deleteElement(z) {
    const selectedDelIndex = todoObjectList.findIndex(
      (item) => item.id === Number(z)
    )

    todoObjectList.splice(selectedDelIndex, 1)
    this.display()
  }

  editElement(y) {
    const selectedEditIndex = todoObjectList.findIndex(
      (item) => item.id === Number(y)
    )

    if (todoObjectList[selectedEditIndex]) {
      const todoInput = document.querySelector("#myInput")

      todoObjectList.forEach((item) => (item.edit.status = false))

      todoObjectList[selectedEditIndex].edit.status === false
        ? (() => {
            todoObjectList[selectedEditIndex].edit.status = true
            todoObjectList[selectedEditIndex].edit.indexOfElement =
              selectedEditIndex
            todoInput.value = todoObjectList[selectedEditIndex].todoText
          })()
        : (() => {
            todoObjectList[selectedEditIndex].edit.status = false
            todoInput.value = ""
          })()
      console.log(todoObjectList)
    }
  }

  display() {
    this.ulElement.innerHTML = ""

    todoObjectList.forEach((object_item) => {
      const liElement = document.createElement("li")
      const delBtn = document.createElement("i")
      const editBtn = document.createElement("i")

      liElement.innerText = object_item.todoText
      liElement.setAttribute("data-id", object_item.id)

      editBtn.setAttribute("data-id", object_item.id)
      editBtn.classList.add("fas", "fa-pencil-alt")

      delBtn.setAttribute("data-id", object_item.id)
      delBtn.classList.add("far", "fa-trash-alt")

      liElement.appendChild(delBtn)
      liElement.appendChild(editBtn)

      delBtn.addEventListener("click", function (e) {
        const deleteId = e.target.getAttribute("data-id")
        myTodolist.deleteElement(deleteId)
      })

      liElement.addEventListener("click", function (e) {
        const selectedId = e.target.getAttribute("data-id")
        if (e.detail === 2) {
          myTodolist.done_undone(selectedId)
        }
      })
      editBtn.addEventListener("click", function (e) {
        const selectedId = e.target.getAttribute("data-id")
        myTodolist.editElement(selectedId)
      })

      if (object_item.isDone) {
        liElement.classList.add("checked")
      }

      this.ulElement.appendChild(liElement)
    })
  }
}
const listSection = document.querySelector("#myUL")

myTodolist = new Todo_Class(listSection)

document.querySelector(".addBtn").addEventListener("click", function () {
  myTodolist.add()
})
