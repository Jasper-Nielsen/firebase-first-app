"use strict";

window.addEventListener("load", initApp);

const endpoint =
  "https://test-d2238-default-rtdb.europe-west1.firebasedatabase.app";

function initApp() {
  updatePostsGrid();

  //   createPost("laa", "text");
  //   const userList = await getUsers();
  //   showUsers(userList);

  //   console.log(stringify(user));
}

async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  const posts = preparePostData(data);
  //   console.log(posts);
  return posts;
}

async function updatePostsGrid() {
  const postList = await getPosts();
  showPosts(postList);
}
async function getUsers() {
  const response = await fetch(`${endpoint}/users.json`);
  const data = await response.json();
  const users = preparePostData(data);
  //   console.log(`users: ${users}`);
  return users;
}

// === CREATE (POST) === //
async function createPost(title, image, body) {
  const newPost = {
    title: title,
    body: body,
    image: image,
  };

  //indhold som creates. gjort til strengform og JSON format
  const postAsJson = JSON.stringify(newPost);

  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: postAsJson,
  });

  const data = await response.json();
  console.log(data);
}

// === UPDATE (PUT) === //
async function updatePost(id, title, image) {
  const postToUpdate = { title, image };
  const postAsJson = JSON.stringify(postToUpdate);
  const url = `${endpoint}/posts/${id}.json`;

  const res = await fetch(url, { method: "PUT", body: postAsJson });
  const data = await res.json();
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

// function parseJSONString(object) {
//   const jsonParsed = JSON.parse(object);
//   return jsonParsed;
// }

// function stringify(object) {
//   const jsonString = JSON.stringify(object);
//   console.log(jsonString);
//   return jsonString;
// }

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
//class="grid-item ${pokemon.type.toLowerCase()}"
function addPostToDom(post) {
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
           
    </tr>`;
  document.querySelector("#posts").insertAdjacentHTML("beforeend", html);

  document
    .querySelector("#posts tr:last-child .btn-delete")
    .addEventListener("click", deleteClicked);

  document
    .querySelector("#posts tr:last-child .btn-update")
    .addEventListener("click", updateClicked);

  function deleteClicked() {
    deletePost(post.id);
  }

  function updateClicked() {
    updatePost(post.id, title, body, image);
  }
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
