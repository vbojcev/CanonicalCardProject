import { getTestData } from './testData.js';

const fetchBlogs = async () => {
  const res = await fetch(
    'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json'
  );

  if (res.ok) {
    return await res.json();
  } else {
    return [{}];
  }
};

// Given blog information, create "card" element.
// Input: single blog data
const card = (content) => {
  let newDiv = document.createElement('div');
  newDiv.setAttribute('id', String(content.id));
  newDiv.innerHTML = content.title.rendered;
  return newDiv;
};

// Render all cards given an array of them and the container they should belong to.
// Type of 'container' is a DOM element.
const renderCards = (contentArray, containerID) => {
  const container = document.getElementById(containerID);
  for (let i = 0; i < contentArray.length; i++) {
    container.appendChild(card(contentArray[i]));
  }
};

// Testing Code

const testData = getTestData(); // Will be static local array of example API output

//const container = document.querySelector('cardContainer');

renderCards(testData, 'cardContainer');

//fetchBlogs().then((data) => {});

//console.log(testData);

/*fetchBlogs()
  .then((res) => {
    data = res;
    console.log(data);
  })
  .catch((e) => console.error(e));*/
