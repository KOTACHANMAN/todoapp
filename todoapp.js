document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const company = document.getElementById('company').value;
    const position = document.getElementById('position').value;
    const applyDate = document.getElementById('apply-date').value;
    const interviewDate = document.getElementById('interview-date').value;
    const platform = document.getElementById('platform').value;
    const status = document.getElementById('status').value;
    const memo = document.getElementById('memo').value;
  
    const task = {
      company,
      position,
      applyDate,
      interviewDate,
      platform,
      status,
      memo
    };
  
    addTaskToDOM(task);
    saveTask(task);
    this.reset();
  });
  
  function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
  
    const card = document.createElement('div');
    card.className = 'task-card';
  
    card.innerHTML = `
      <p><strong>企業名:</strong> ${task.company}</p>
      <p><strong>職種:</strong> ${task.position}</p>
      <p><strong>応募日:</strong> ${task.applyDate || '未入力'}</p>
      <p><strong>面接日:</strong> ${task.interviewDate || '未入力'}</p>
      <p><strong>媒体:</strong> ${task.platform}</p>
      <p><strong>ステータス:</strong> ${task.status}</p>
      <p><strong>メモ:</strong> ${task.memo || 'なし'}</p>
      <button class="delete-btn">削除</button>
    `;
  
    card.querySelector('.delete-btn').addEventListener('click', function() {
      card.remove();
      deleteTask(task);
    });
  
    taskList.appendChild(card);
  }
  
  function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToDOM);
  }
  
  function deleteTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !(task.company === taskToDelete.company && task.position === taskToDelete.position));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  loadTasks();
  