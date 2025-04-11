const DEBUG = false;
const foodOptions = {
  'weekday-lunch': ['腿庫飯', '炒飯', '雞肉飯'],
  'weekday-dinner': ['自助餐', '雞肉飯', '炒飯', '摩斯', '披薩', '豆漿店', '711/全家', '粥', '涼麵', '虱目魚', '滷味', '鹹酥雞', '鹹水雞', '雞排'],
  'weekend': ['飯糰', '鬆餅', '韓式炸雞']
};

document.addEventListener("DOMContentLoaded", function () {
  var apiUrl = "https://foodlotterybackend-production.up.railway.app/weekend_food";
  if (DEBUG) {
    apiUrl = "http://127.0.0.1:8000/weekend_food";
  }
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched food data:", data);
      foodOptions['weekend'] = data.result
      console.log("Weekend food options:", data.result);

    })
    .catch(error => {
      console.error("Error fetching food data:", error);
    });
});

let currentList = [];
let currentType = '';

function choose(type) {
  // Reset active button state
  document.querySelectorAll('.btn-meal').forEach(btn => {
    btn.classList.remove('btn-active');
  });

  // Set active button
  document.getElementById(`btn-${type}`).classList.add('btn-active');

  // Update state
  if (type !== currentType) {
    currentType = type;
    currentList = foodOptions[type];
    showAllOptions();
  }

  // Hide initial text
  document.getElementById('initial-text').style.display = 'none';

  // Show result
  showResult(draw());

  // Add animation
  const resultContainer = document.getElementById('result-container');
  resultContainer.classList.remove('animated');
  void resultContainer.offsetWidth; // Trigger reflow
  resultContainer.classList.add('animated');
}

function pickAgain() {
  if (!currentType) return;
  showResult(draw());

  // Add animation to result only
  const result = document.getElementById('result');
  result.classList.remove('animated');
  void result.offsetWidth; // Trigger reflow
  result.classList.add('animated');
}

function draw() {
  const list = foodOptions[currentType];
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function showResult(choice) {
  const resultElement = document.getElementById('result');
  document.getElementById('result-food').textContent = choice;
  resultElement.style.display = 'block';
  document.getElementById('pick-again').style.display = 'inline-block';
}

function showAllOptions() {
  const list = foodOptions[currentType];
  const allOptionsContainer = document.getElementById('all-options');

  let tagsHtml = '<div class="mb-2 text-muted"><i class="fas fa-list me-2"></i>選項有：</div><div>';
  list.forEach(option => {
    tagsHtml += `<span class="option-tag">${option}</span> `;
  });
  tagsHtml += '</div>';

  allOptionsContainer.innerHTML = tagsHtml;
  allOptionsContainer.style.display = 'block';
  allOptionsContainer.classList.remove('animated');
  void allOptionsContainer.offsetWidth; // Trigger reflow
  allOptionsContainer.classList.add('animated');
}
