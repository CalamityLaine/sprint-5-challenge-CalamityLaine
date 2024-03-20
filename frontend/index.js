//async function sprintChallenge5( ) { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

//entry point into cards
//let learner;
//const cards = document.querySelector('.cards')

//creating card element within cards
// const card = document.createElement('div');
// const heading = document.createElement('h3');
// const email = document.createElement('div');
// const mentors = document.createElement('h4');

 //skeleton for card content
// heading.textContent = "learner.fullName";
// email.textContent = "learner.email";
// mentors.textContent = "learner.mentors";
// card.classList.add('card')

// cards.appendChild(card);
// card.appendChild(heading);
// card.appendChild(email);
// card.appendChild(mentors);

 //adding click event to card
// console.log(card)
// card.addEventListener('click',() => {
// card.classList.toggle('selected');
// })

// return card;
//}

async function fetchLearners() {
  try {
    const response = await axios.get('http://localhost:3003/api/learners');
    return response.data;
  } catch (error) {
    console.error('Error fetching learners:', error);
    return [];
  }
}

async function fetchMentors() {
  try {
    const response = await axios.get('http://localhost:3003/api/mentors');
    return response.data;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return [];
  }
}

async function fetchAndCombineData() {
  try {
    const [learnersData, mentorsData] = await Promise.all([
      fetchLearners(),
      fetchMentors()
    ]);

    // Map mentor IDs to mentor names
    const mentorMap = new Map();
    mentorsData.forEach(mentor => {
      mentorMap.set(mentor.id, mentor.fullName);
    });

    // Combine learner and mentor data
    const combinedData = learnersData.map(learner => ({
      id: learner.id,
      email: learner.email,
      fullName: learner.fullName,
      mentors: learner.mentors.map(mentorId => mentorMap.get(mentorId))
    }));

    return combinedData;
  } catch (error) {
    console.error('Error fetching and combining data:', error);
    return [];
  }
}

  function createLearnerCard(learner) {
    const card = document.createElement('div');
    card.classList.add('learner-card');
    card.innerHTML = `
      <h2>${learner.fullName}</h2>
      <p>Email: ${learner.email}</p>
      <p>Mentors:</p>
      <ul>
        ${learner.mentors.map(mentor => `<li>${mentor}</li>`).join('')}
      </ul>
      <button class="toggle-button">Toggle Mentors</button>
    `;
  
    // Add click event listener to the card
    card.addEventListener('click', event => {
      const target = event.target;
  
      // Check if the click target is the toggle button
      if (target.classList.contains('toggle-button')) {
        const ul = card.querySelector('ul');
        ul.classList.toggle('hidden');
      }
    });
  
    return card;
  }
  
  // Function to render learner cards
  async function renderLearnerCards() {
    try {
      const combinedData = await fetchAndCombineData(); // Call fetchAndCombineData
      const container = document.querySelector('.cards');
  
      // Loop over the combined data and generate learner cards
      combinedData.forEach(learner => {
        const learnerCard = createLearnerCard(learner);
        container.appendChild(learnerCard);
      });
    } catch (error) {
      console.error('Error rendering learner cards:', error);
    }
  }
  
  // Call the renderLearnerCards function to render the learner cards
  renderLearnerCards().catch(error => {
    console.error('Error rendering learner cards:', error);
  });



//axios.get('http://localhost:3003/api/learners')
//.then(res => {
//  console.log(res.data);
//})
//.catch(err => {
//console.error(err);
//})
//.finally(() => console.log("fuggin donez"));



 // function buildNav(links) {
  //  const container = document.createElement("nav") 
  //    links.forEach(link => {
  //      let a = document.createElement("a")
  //      a.href = link.href
  //      a.title = link.title
  //      a.textContent = link.textContent
  //      container.appendChild(a)
  //    })
  //    return container 
  

   // let learner = evt.target.valu
  //  let learners =
  //'http://localhost:3003/api/learners'
  //  let mentors = 'the lord'
  // 'http://localhost:3003/api/mentors'

//const learnerP = document.createElement('p')
//learnerP.textContent = learner.fullName
//const learnerId = document.createElement('p')
//learnerId.textContent = learner.id
//const learnerEmail = document.createElement('p')
//learnerEmail.textContent = learner.email
//const learnerMentors = document.createElement('p')
// learnerMentors.textContent = learner.mentors;

//[learnerP, learnerId, learnerEmail, learnerMentors].forEach(p => {
//  entryPoint.appendChild(p)
//})

//return card
//}
//learner.forEach(learner => {
// learnercard = buildLearnerCard(learners, mentors)

//})
//const card = document.createElement("div")
//const fullName = document.createElement("h3")
//const email = document.createElement("div")
//const mentors = document.createElement("h4")
//}
  

// console.log(entryPoint);

//  console.log(learners)

  


//  const res = await axios.get(urlA, urlB)

 // let { data } = res

//catch (err) {
  //    console.log('😔 Promise rejected with an err.message -->', err.message)
  // 👆 WORK WORK ABOVE THIS LINE 👆
//}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
}