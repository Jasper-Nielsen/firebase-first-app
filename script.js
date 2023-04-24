"use strict";

window.addEventListener("load", initApp);

const endpoint =
  "https://test-d2238-default-rtdb.europe-west1.firebasedatabase.app";

function initApp() {
  updatePostsGrid();

  document.querySelector("#btn-create").addEventListener("click", createPost);
}
async function updatePostsGrid() {
  const postList = await getPosts();
  showPosts(postList);
}

async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  const posts = preparePostData(data);
  //   console.log(posts);

  return posts;
}

async function getUsers() {
  const response = await fetch(`${endpoint}/users.json`);
  const data = await response.json();
  const users = preparePostData(data);
  //   console.log(`users: ${users}`);
  return users;
}

// function createPostClicked(){
//   document.querySelector("#btn-create").addEventListener("click",createPost);
//   console.log("Create clicked")
// }

// === CREATE (POST) === //
async function createPost() {
  const elements = document.querySelector("#form-create").elements;
  const newPost = {
    image: elements.namedItem("image").value,
    title: elements.namedItem("title").value,
    body: elements.namedItem("body").value,
    uid: elements.namedItem("uid").value,
  };

  //indhold som creates. gjort til strengform og JSON format
  const postAsJson = JSON.stringify(newPost);
  console.log(`jason data: ${postAsJson}`);
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: postAsJson,
  });

  const data = await response.json();
  // updatePostsGrid(); ????
  console.log(data);
}

// === DELETE (DELETE) === //

async function deletePost(id) {
  const url = `${endpoint}/posts/${id}.json`;
  const response = await fetch(url, { method: "DELETE" });
  console.log(response);
  if (response.ok) {
    updatePostsGrid();
  }
}

function preparePostData(dataObject) {
  const postArray = [];

  for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    // console.log(post);
    postArray.push(post);
  }
  //   console.log(postArray);
  return postArray;
}

function showPosts(posts) {
  document.querySelector("#posts").innerHTML = "";
  for (const post of posts) {
    addPostToDom(post);
  }
}

function addPostToDom(post) {
  //moving the whole dialog inside this method specifically in the const html fixes issue. now it only changes the one i choose
  const html =
    /*html */
    `<tr class="row" >
        <td> <img id="image" src="${post.image}"></td>
        <td id="title-text">${post.title}</td>
        <td> ${post.body}</td>
        <td id="btns">
            <button class="btn-delete">Delete</button>
            <button class="btn-update">Update</button>
        </td>
           <td>
    <dialog id="update">
      <form method="dialog" id="form-update">
        <fieldset>
          <legend>Update post</legend>
          <label for="image">Update Image</label>
          <input type="url" name="image" id="input-img" /> <br />
          <label for="title">Update Title</label>
          <input type="text" name="title" id="input-title" /> <br />
          <label for="body">Update Body</label>
          <input type="text" name="body" id="input-body" />
        </fieldset>

        <button id="close-buttton">Close</button>
        <button type="submit" id="btn-submit">Submit</button>
      </form>
    </dialog>
           </td>
    </tr>`;
  document.querySelector("#posts").insertAdjacentHTML("beforeend", html);

  //makes delebutton clickable
  document
    .querySelector("#posts tr:last-child .btn-delete")
    .addEventListener("click", deleteClicked);

  //makes update button clickable
  document
    .querySelector("#posts tr:last-child .btn-update")
    .addEventListener("click", updateClicked);

  function deleteClicked() {
    deletePost(post.id);
  }

  function updateClicked(event) {
    // event.preventDefault();

    //resets content of form so input fields are blank
    document.querySelector("#form-update").reset();

    //shows modal dialog window
    document.querySelector("#update").showModal();

    //submits info in form when submit is cliked
    document
      .querySelector("#form-update")
      .addEventListener("submit", submitClicked);

    //makes closbutton in dialog clickable
    document
      .querySelector("#close-buttton")
      .addEventListener("click", closeDialogClicked);
  }

  function closeDialogClicked(event) {
    //prevent default stops the button from submitting
    event.preventDefault();
    //closes the dialog without submitting data
    document.querySelector("#update").close();

    console.log("close clicked");
  }

  function submitClicked(event) {
    event.preventDefault();
    document.querySelector("#update").close();

    console.log(event);
    updatePost(post.id);
  }
}

// === UPDATE (PUT) === //
async function updatePost(id) {
  const elements = document.querySelector("#form-update").elements;

  const postToUpdate = {
    image: elements.namedItem("image").value,
    title: elements.namedItem("title").value,
    body: elements.namedItem("body").value,
  };
  const postAsJson = JSON.stringify(postToUpdate);
  // const url = `${endpoint}/posts/${id}.json`;

  const response = await fetch(`${endpoint}/posts/${id}.json`, {
    method: "PUT",
    body: postAsJson,
  });
  const data = await response.json();

  //is this right?
  if (response.ok) {
    updatePostsGrid();
  }
  console.log(data);
}

function showUsers(users) {
  for (const user of users) {
    addUserToDom(user);
  }
}

function addUserToDom(user) {
  const html =
    /*html */
    `<tr class="row">
        <td id="user-image"> <img src="${user.image}"></td>
        <td id="user-mail"> ${user.mail}</td>
        <td id="user-name">${user.name}</td>
        <td id="user-phone">${user.phone}</td>
        <td id="user-title">${user.title}</td>
    </tr>

   `;

  document.querySelector("#users").insertAdjacentHTML("beforeend", html);
}
