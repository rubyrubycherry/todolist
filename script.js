// 1) Lấy các element từ HTML
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");

// 2) Dữ liệu chính: mảng chứa các task
// Mỗi task là 1 object: { id, text, done }
let todos = [];
const STORAGE_KEY = "my_todos";

// 3) Hàm tạo ID đơn giản (đủ dùng cho mini project)
function createId() {
  return Date.now() + Math.random();
}

// 4) Hàm render: vẽ lại danh sách từ mảng todos
function renderTodos() {
  // Xóa danh sách cũ
  todoList.innerHTML = "";

  // Lặp qua mảng todos để tạo HTML
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    if (todo.done) {
      li.classList.add("done");
    }

    // Text
    const span = document.createElement("span");
    span.className = "todo-text";
    span.innerText = todo.text;

    // Actions
    const actions = document.createElement("div");
    actions.className = "actions";

    // Done button
    const doneBtn = document.createElement("button");
    doneBtn.innerText = todo.done ? "Undo" : "Done";

    doneBtn.addEventListener("click", () => {
      toggleTodo(todo.id);
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    actions.appendChild(doneBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    todoList.appendChild(li);
  });
}

// 5) Hàm thêm task
function addTodo(text) {
  const newTodo = {
    id: createId(),
    text: text,
    done: false,
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
}


// 6) Hàm xóa task
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}


// 7) Hàm toggle done/undo
function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, done: !todo.done };
    }
    return todo;
  });

  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (data) {
    todos = JSON.parse(data);
  } else {
    todos = [];
  }
}

// 8) Bắt sự kiện submit form (Enter hoặc click Add)
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (text === "") return;

  addTodo(text);
  todoInput.value = "";
  todoInput.focus();
});

// 9) Render lần đầu (hiện danh sách rỗng), load dữ liệu khi mở trang
loadTodos();
renderTodos();

