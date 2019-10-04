// localStorage

function localStorageCheck() {
  if (window.location.href === "http://localhost:3000/") {
    if (localStorage.getItem("login") !== null && localStorage.getItem("login") !== "undefined") {
      var id = localStorage.getItem("login");
      window.location.replace("/profile/" + id);
    }
  }
}

function clearStorage() {
  localStorage.clear();
  window.location.replace("/login");
}
$("#logoutButton").on("click", clearStorage);

localStorageCheck();
