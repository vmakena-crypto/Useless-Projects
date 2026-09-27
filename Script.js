/* =========================================================
   USELESS PROJECTS
   FRONTEND JAVASCRIPT
   ========================================================= */


/* =========================================================
   GOOGLE APPS SCRIPT BACKEND
   ========================================================= */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxswzlUSz3lYKj7LJNVViJzx47aYEevSz9vgKmoSqYRjn5FciToTHMHynNLMC47ciD4/exec";


/* =========================================================
   ELEMENTS
   ========================================================= */

const membersContainer =
  document.getElementById("membersContainer");

const addMemberBtn =
  document.getElementById("addMemberBtn");

const registrationForm =
  document.getElementById("registrationForm");

const submitBtn =
  document.getElementById("submitBtn");

const successScreen =
  document.getElementById("success");


/* =========================================================
   MEMBER COUNT
   ========================================================= */

let memberCount = 1;

const MAX_MEMBERS = 3;


/* =========================================================
   ADD MEMBER
   ========================================================= */

addMemberBtn.addEventListener(
  "click",
  function () {

    if (memberCount >= MAX_MEMBERS) {

      alert(
        "That's enough humans. Maximum 3 members allowed."
      );

      return;

    }


    memberCount++;

    createMemberCard(memberCount);


    /*
    Hide the add button after Member 03
    */

    if (memberCount >= MAX_MEMBERS) {

      addMemberBtn.style.display = "none";

    }

  }
);


/* =========================================================
   CREATE MEMBER CARD
   ========================================================= */

function createMemberCard(number) {

  const memberCard =
    document.createElement("div");


  memberCard.className =
    "member-card member";


  memberCard.innerHTML = `

    <div class="member-header">

      <span class="member-number">
        HUMAN ${String(number).padStart(2, "0")}
      </span>

      <span class="member-status">
        ${number === 3 ? "FINAL HUMAN" : "OPTIONAL"}
      </span>

    </div>


    <div class="member-fields">

      <div class="field-group">

        <label>
          Name
        </label>

        <input
          type="text"
          class="member-name"
          placeholder="Who are you?"
          required
        >

      </div>


      <div class="field-group">

        <label>
          Mobile Number
        </label>

        <input
          type="tel"
          class="member-mobile"
          placeholder="10-digit mobile number"
          maxlength="10"
          inputmode="numeric"
          required
        >

      </div>


      <div class="field-group full-width">

        <label>
          Email ID
        </label>

        <input
          type="email"
          class="member-email"
          placeholder="Where can we send unnecessary emails?"
          required
        >

      </div>

    </div>

  `;


  membersContainer.appendChild(
    memberCard
  );


  /*
  Smoothly scroll to the new member
  */

  setTimeout(
    function () {

      memberCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    },
    100
  );

}


/* =========================================================
   MOBILE NUMBER VALIDATION
   ========================================================= */

document.addEventListener(
  "input",
  function (event) {

    if (
      event.target.classList.contains(
        "member-mobile"
      )
    ) {

      /*
      Allow numbers only
      */

      event.target.value =
        event.target.value
          .replace(/\D/g, "")
          .slice(0, 10);

    }

  }
);


/* =========================================================
   FORM SUBMISSION
   ========================================================= */

registrationForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();


    /*
    Validate the form
    */

    const form =
      document.getElementById(
        "registrationForm"
      );


    /*
    Check native HTML validation
    */

    if (!form.checkValidity()) {

      form.reportValidity();

      return;

    }


    /*
    Get Team Name
    */

    const teamName =
      document
        .getElementById("teamName")
        .value
        .trim();


    if (!teamName) {

      alert(
        "Please give your disaster a name."
      );

      return;

    }


    /*
    Collect members
    */

    const memberCards =
      document.querySelectorAll(
        ".member"
      );


    const members = [];


    memberCards.forEach(
      function (card) {

        const name =
          card
            .querySelector(".member-name")
            .value
            .trim();


        const mobile =
          card
            .querySelector(".member-mobile")
            .value
            .trim();


        const email =
          card
            .querySelector(".member-email")
            .value
            .trim();


        members.push({

          name: name,

          mobile: mobile,

          email: email

        });

      }
    );


    /*
    Final validation
    */

    if (
      members.length < 1 ||
      members.length > 3
    ) {

      alert(
        "A team must have between 1 and 3 members."
      );

      return;

    }


    /*
    Prepare data
    */

    const registrationData = {

      teamName: teamName,

      members: members

    };


    /*
    Change button state
    */

    submitBtn.disabled = true;

    submitBtn.style.opacity =
      "0.6";

    submitBtn.style.cursor =
      "wait";


    submitBtn.querySelector(
      ".submit-main"
    ).textContent =
      "SUBMITTING YOUR USELESSNESS...";


    submitBtn.querySelector(
      ".submit-small"
    ).textContent =
      "PLEASE DO NOT PANIC";


    try {

      /*
      Send data to Google Apps Script
      */

      await fetch(

        SCRIPT_URL,

        {

          method: "POST",

          mode: "no-cors",

          headers: {

            "Content-Type":
              "text/plain;charset=utf-8"

          },

          body:
            JSON.stringify(
              registrationData
            )

        }

      );


      /*
      Because no-cors does not allow us
      to read the response, reaching this
      point means the request was sent.
      */


      /*
      Hide registration form
      */

      document
        .querySelector(
          ".registration-card"
        )
        .querySelectorAll(
          ".section-heading, .field-group, .members-heading, .section-description, #membersContainer, #addMemberBtn, .member-limit, .final-heading, .final-warning, #registrationForm"
        )
        .forEach(
          function (element) {

            element.style.display =
              "none";

          }
        );


      /*
      Show success screen
      */

      successScreen.style.display =
        "block";


      /*
      Scroll to success message
      */

      setTimeout(
        function () {

          successScreen.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        },
        100
      );


    } catch (error) {


      console.error(
        "Registration error:",
        error
      );


      /*
      Restore button
      */

      submitBtn.disabled =
        false;

      submitBtn.style.opacity =
        "1";

      submitBtn.style.cursor =
        "pointer";


      submitBtn.querySelector(
        ".submit-main"
      ).textContent =
        "I ACCEPT THE CONSEQUENCES";


      submitBtn.querySelector(
        ".submit-small"
      ).textContent =
        "& SUBMIT THIS QUESTIONABLE DECISION";


      alert(
        "Something went wrong while submitting. Please try again."
      );

    }

  }
);


/* =========================================================
   LITTLE USELESSNESS
   ========================================================= */

console.log(
  "USELESS PROJECTS loaded successfully."
);

console.log(
  "Purpose: Unknown."
);

console.log(
  "Expected ROI: None."
);
