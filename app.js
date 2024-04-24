firebase.initializeApp({
    apiKey: "AIzaSyDBH6XblfrcB-UyymjDt7Ci8eBct3GPOpo",
  authDomain: "plp-apps-1bee2.firebaseapp.com",
  projectId: "plp-apps-1bee2",
  storageBucket: "plp-apps-1bee2.appspot.com",
  messagingSenderId: "37930120512",
  appId: "1:37930120512:web:ceb20153f6db4aa14836a5"
});

const db = firebase.firestore();

function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();

    if(task !== ""){
     // add to our database
     db.collection("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
     });
     taskInput.value = "";
     console.log("Task added");
    }
}

// Function to render tasks
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);

}

// Real-time listener for tasks
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// Function to delete a task

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
}