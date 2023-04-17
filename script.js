"use strict";

window.addEventListener("load", initApp);

const endpoint =
  "https://test-d2238-default-rtdb.europe-west1.firebasedatabase.app";

async function initApp() {
  const postList = await getPosts();
  showPosts(postList);
}

async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();

  const posts = preparePostData(data);
  console.log(posts);
  return posts;
}

function preparePostData(dataObject) {
  const postArray = [];

  for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    console.log(post);
    postArray.push(post);
  }
  console.log(postArray);
  return postArray;
}

function showPosts(list) {
  for (const post of list) {
    addPostToDom(post);
  }
}

function addPostToDom(post) {
  const html =
    /*html */
    `<tr id="row">
        <td  > <img id="image" src="${post.image}"></td>
        <td id="title-text">${post.title}</td>
    </tr>`;
  document.querySelector("#table").insertAdjacentHTML("beforeend", html);
}
