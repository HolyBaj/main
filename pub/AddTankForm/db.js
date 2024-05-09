const firebaseConfig = {
  apiKey: "AIzaSyB46bALbbnAAY5pgtuk8BQAvc-_Lnhy3qg",
    authDomain: "auth-7dd0a.firebaseapp.com",
    databaseURL: "https://auth-7dd0a-default-rtdb.firebaseio.com",
    projectId: "auth-7dd0a",
    storageBucket: "auth-7dd0a.appspot.com",
    messagingSenderId: "963879432363",
    appId: "1:963879432363:web:3c7c860eba5b84bc4047ee"
};
  firebase.initializeApp(firebaseConfig);
  


  var database = firebase.database();

// Reference to a single node for all tanks
var tanksInfoDB = database.ref("tanksInfo");

// Set up listener for tank information
tanksInfoDB.on('child_added', function(snapshot) {
    var brand = snapshot.val();
    addBrandToTable(brand);
});

// Function to add brand to the table
function addBrandToTable(brand) {
    var table = document.getElementById('brandsTableBody');
    var row = table.insertRow();
    var cell = row.insertCell();
    cell.innerHTML = brand;
}

// Form submission handler
document.getElementById('tanksInfo').addEventListener('submit', function(event) {
    event.preventDefault();

    var typeoftank = document.getElementById('typeoftank').value;

    // Get current user
    var user = firebase.auth().currentUser;

    if (user) {
        // Save tank information under the email of the user
        var userEmail = user.email;
        var userTanksInfoDB = tanksInfoDB.child(userEmail.replace('.', ','));

        // Set the tank information with key as "brand"
        userTanksInfoDB.set({
            brand: typeoftank
        }).then(function() {
            console.log("Tank info saved under user's email node.");
        }).catch(function(error) {
            console.error("Error saving tank info:", error);
        });

        // Clear the input field after submission
        document.getElementById('typeoftank').value = '';
    } else {
        console.log("User not logged in.");
    }
});