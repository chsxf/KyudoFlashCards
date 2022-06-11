let gameManager = new GameManager();
let waitForAnswer = false;

$.getJSON("card_database.json", function (data) {
  gameManager.setCardDatabase(data);

  $("#message-container").hide();

  const start = $("#start-button");
  start.click(nextCard);
  start.show();

  const next = $("#next-button");
  next.click(nextCard);

  $("#solution-options button").click(submitSolution);
});

function nextCard(event) {
  event.preventDefault();
  $(this).hide();

  let elements = gameManager.pickElements();
  $("#main-card p").html(elements.concept);
  $("#main-card").show();

  let solutionButtons = $("#solution-options button");
  for (let i = 0; i < 4; i++) {
    let button = $(solutionButtons[i]);
    button.removeClass("right wrong");
    button.html(elements.solutions[i]);
  }
  $("#solution-options").show();

  waitForAnswer = true;
}

function submitSolution(event) {
  event.preventDefault();
  if (!waitForAnswer) {
    return;
  }

  waitForAnswer = false;
  $("#solution-options button").each(function () {
    let button = $(this);
    let answer = button.html();
    let isValid = gameManager.isValidSolution(answer);
    button.addClass(isValid ? "right" : "wrong");
  });

  $("#next-button").show();
}
