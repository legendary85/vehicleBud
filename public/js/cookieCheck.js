// localStorage

function localStorageCheck() {
  if (window.location.href === "http://localhost:3000/") {
    if (localStorage.getItem("login") !== null) {
      var id = localStorage.getItem("login");
      window.location.replace("/profile/" + id);
    }
  }
}

function clearStorage() {
  localStorage.clear();
  window.location.replace("/");
}
$("#logoutButton").on("click", clearStorage);

localStorageCheck();
