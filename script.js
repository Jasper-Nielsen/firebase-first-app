"use strict";

window.addEventListener("load", initApp);

const endpoint =
  "https://test-d2238-default-rtdb.europe-west1.firebasedatabase.app";

async function initApp() {
  const postList = await getPosts();
  const posts = showPosts(postList);
  //   giveDifferentBackgroundColorDependingOnId(posts)
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

function showPosts(posts) {
  for (const post of posts) {
    addPostToDom(post);
    giveDifferentBackgroundColorDependingOnId(post);
  }
}
//class="grid-item ${pokemon.type.toLowerCase()}"
function addPostToDom(post) {
  const html =
    /*html */
    `<tr id="row" >
        <td> ${post.id} </td>
        <td  > <img id="image" src="${post.image}"></td>
        <td id="title-text">${post.title}</td>
    </tr>`;
  document.querySelector("#table").insertAdjacentHTML("beforeend", html);
}

function giveDifferentBackgroundColorDependingOnId(post) {
  const idNumber = `${post.id}`;
  if (idNumber % 2 === 0) {
    document.querySelector("#row").classList.add("even");
  } else {
    document.querySelector("#row").classList.add("odd");
  }
  console.log(`idNumber: ${post.id} remainder: ${post.id % 2}`);
}
