$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var requestId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:3000/cms?post_id=1, postId is 1
  if (url.indexOf("?request_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var bodyInput = $("#body");
  var reqForm = $("#reqForm");
  var postServiceSelect = $("#service");
  // Giving the postCategorySelect a default value
  postServiceSelect.val("Oil Change");
  // Adding an event listener for when the form is submitted
  $(reqForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    alert("I'm Hit!");
    // Wont submit the post if we are missing a body or a title
    if (!bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newRequest = {
      body: bodyInput.val().trim(),
      service: postServiceSelect.val()
    };

    console.log(newRequest);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newRequest.id = requestId;
      updateRequest(newRequest);
    } else {
      submitRequest(newRequest);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitRequest(Request) {
    $.post("/api/request/", Request, function() {
      window.location.href = "/blog";
    });
  }

  // Gets post data for a post if we're editing
  function getRequestData(id) {
    $.get("/api/requests/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        bodyInput.val(data.body);
        postServiceSelect.val(data.service);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateRequest(post) {
    $.ajax({
      method: "PUT",
      url: "/api/requests",
      data: post
    }).then(function() {
      window.location.href = "/blog";
    });
  }
});
