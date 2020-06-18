const form = document.querySelector(".comments__input-info-form");
const apiKey = "9c3db58b-4bbe-45f7-b0cf-882039feca9651111";

//CREATING A FUNCTION TO CREATE NEW COMMENT DOM ELEMENTS
function displayComments(arr) {
  const commentDiv = document.querySelector(".comments__section");
  commentDiv.innerHTML = "";
  for (let key in arr) {
    // TIME STAMP
    let m = new Date(arr[key]["timestamp"]);
    let dateString =
      m.getUTCMonth() + 1 + "/" + m.getUTCDate() + "/" + m.getUTCFullYear();
    //ADDS THE PARENT DIV FOR THE NEW COMMENT
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("comments__new");
    //ADDS THE IMG TO THE PARENT DIV
    const mainImg = document.createElement("div");
    mainImg.classList.add("comments__new-image");
    mainDiv.appendChild(mainImg);
    //DIV FOR BELOW. FLEX REASONS
    const subDiv = document.createElement("div");
    subDiv.classList.add("comments__container");
    mainDiv.appendChild(subDiv);
    //ADDS THE NAME TO THE PARENT DIV
    const mainName = document.createElement("h2");
    mainName.innerText = arr[key]["name"];
    mainName.classList.add("comments__new-name");
    subDiv.appendChild(mainName);
    //ADDS THE TIME STAMP TO THE PARENT DIV
    const mainTime = document.createElement("aside");
    mainTime.innerText = dateString;
    mainTime.classList.add("comments__new-time");
    subDiv.appendChild(mainTime);

    //REMOVE COMMENT BUTTON AND ADD ID TO ELEMENT OF THE ID OF THE COMMENT
    // const removeButton = document.createElement("button")
    // removeButton.addEventListener("click", event => {
    //     let commentID = event.target.id;
    //     removePost(commentID)
    // });
    // removeButton.classList.add("comments__new-remove");
    // removeButton.id = arr[key]["id"];
    // mainDiv.appendChild(removeButton);

    //ADDS THE COMMENT TO THE PARENT DIV
    const mainP = document.createElement("p");
    mainP.innerText = arr[key]["comment"];
    mainP.classList.add("comments__new-comment");
    subDiv.appendChild(mainP);

    commentDiv.appendChild(mainDiv);
  }
}

//ON CLICK NEW COMMENT
form.addEventListener("submit", newPost => {
  newPost.preventDefault();

  //POSTING THE FORM RESULTS TO HEROKU SERVER
  let newAdd = axios.post(
    "https://project-1-api.herokuapp.com/comments?api_key=9c3db58b-4bbe-45f7-b0cf-882039feca9651111",
    {
      name: newPost.target.name.value,
      comment: newPost.target.comment.value
    }
  );
  newAdd.then(() => {
    //AFTER POSTING THE FORM INFO, GRABBING THE UPDATED HEROKU COMMENT DATA TO POST THE NEWEST COMMENT ON THE SITE
    let arrComment = axios
      .get(
        "https://project-1-api.herokuapp.com/comments?api_key=9c3db58b-4bbe-45f7-b0cf-882039feca9651111"
      )
      .then(response => {
        //USING THE DOM DISPLAY FUNCTION TO CREATE THE ELEMENTS TO DISPLAY COMMENTS AND SORTING BY THE NEWEST TIME STAMP AT THE TOP
        displayComments(
          response.data.sort(function(a, b) {
            return b.timestamp - a.timestamp;
          })
        );
      });
  });
  //CLEARS INPUT ON SUBMIT
  let formInput = document.querySelector(".comments__input-info-form");
  formInput.reset();
});

//GETTING THE DATA FROM HEROKU TO POST ON PAGE LOAD-UP
const arrComment = axios.get(
  "https://project-1-api.herokuapp.com/comments?api_key=9c3db58b-4bbe-45f7-b0cf-882039feca9651111"
);
arrComment.then(response => {
  //CALLING DOM FUNCTION TO POST THE DATA AND SORT IT BY NEWEST TIMESTAMP AT TOP
  displayComments(
    response.data.sort(function(a, b) {
      return b.timestamp - a.timestamp;
    })
  );
});

// DELETE COMMENT BUTTON

// function removePost(id){
//     axios.delete(`https://project-1-api.herokuapp.com/comments/${id}?api_key=9c3db58b-4bbe-45f7-b0cf-882039feca9651111`)
//     .then(response => {
//         axios.get("https://project-1-api.herokuapp.com/comments?api_key=9c3db58b-4bbe-45f7-b0cf-882039feca9651111")
//         arrComment.then(response => {
//             //CALLING DOM FUNCTION TO POST THE DATA AND SORT IT BY NEWEST TIMESTAMP AT TOP
//             displayComments(
//                 response.data.sort(function(a, b) {
//                     return b.timestamp - a.timestamp;
//                 })
//             )
//         });
//     });
// }
