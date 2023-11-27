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
  // Initialize card
  let card = document.createElement('div');
  card.setAttribute('class', 'col-4 col-medium-2 p-card--highlighted');
  card.setAttribute('id', String(content.id));

  // Header for Topic -- Noticed it may not exist!!!
  /*----------------------------------------------------------*/
  let topic = '';
  content.topic.length == 1
    ? (topic = content['_embedded']['wp:term'][2][0].name)
    : (topic = 'General');

  let header = document.createElement('header');
  header.setAttribute('class', 'p-card__header p-card__inner');
  let headerText = document.createElement('h5');
  headerText.innerHTML = topic;
  header.appendChild(headerText);
  /*----------------------------------------------------------*/
  card.appendChild(header);

  // Main card content: Picture, Title, Byline
  /*----------------------------------------------------------*/
  let contentDiv = document.createElement('div');
  contentDiv.setAttribute('class', 'p-card__inner');
  let link = content.link;

  // Image creation
  let imageLink = document.createElement('a');
  imageLink.setAttribute('href', link);
  let imageSource = content.featured_media;
  let image = document.createElement('img');
  image.setAttribute('class', 'p-card__image');
  image.setAttribute('alt', '');
  image.setAttribute('src', imageSource);
  imageLink.appendChild(image);
  contentDiv.appendChild(imageLink);

  // Title creation
  let title = content.title.rendered;
  let titleLink = document.createElement('h4');
  titleLink.innerHTML = `<a href="${link}">${title}</a>`;
  contentDiv.appendChild(titleLink);

  // ByLine creation
  let authorLink = 'authorLink';
  let authorName = content._embedded.author[0].name;
  let date = new Date(content.date);
  let byLine = document.createElement('p');
  let blItalic = document.createElement('em');
  blItalic.innerHTML = `By <a href="${authorLink}">${authorName}</a> on ${date.toLocaleString(
    'en-gb',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  )}`;
  byLine.appendChild(blItalic);
  contentDiv.appendChild(byLine);
  /*----------------------------------------------------------*/
  card.appendChild(contentDiv);

  // Footer
  let category = content['_embedded']['wp:term'][0][0].name;
  let footer = document.createElement('p');
  footer.setAttribute('class', 'p-card__footer p-card__inner');
  footer.innerHTML = category;
  card.appendChild(footer);

  return card;
};

// Render all cards given an array of them and the container they should belong to.
// Limit allows it to render only a select number of cards (mainly for testing purposes).
const renderCards = (contentArray, containerID, limit) => {
  const container = document.getElementById(containerID);

  if (container) {
    for (
      let i = 0;
      i < (contentArray.length < limit ? contentArray.length : limit);
      i++
    ) {
      container.appendChild(card(contentArray[i]));
    }
  } else {
    console.error('Invalid container ID.');
  }
};

// Fetch, then display data.

fetchBlogs()
  .then((data) => {
    data
      ? renderCards(data, 'cardContainer', 3)
      : console.error('No post data.');
  })
  .catch((e) => console.error(e));
