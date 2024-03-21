async function sprintChallenge5( ) { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`


let info = document.querySelector('.info')

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
      mentorMap.set(mentor.id, (mentor.firstName + " " + mentor.lastName));
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

  function buildLearnerCard(learner) {
    let card = document.createElement('div');
    card.classList.add('card');
  //  card.textContent = (learnerName, learnerEmail, learnerMentors);

 // const learnerName = document.querySelector('h3');
 // learnerName.textContent = `${learner.fullName}`

//  const learnerEmail = document.querySelector('div');
//  learnerEmail.textContent = `${learner.email}`

// const learnerMentors = document.querySelector('h4');
// learnerMentors.textContent = "▶ Mentors";

//  card.appendChild('learnerName');
//  card.appendChild('learnerEmail');
//  card.appendChild('learnerMentors');



    card.innerHTML = `
     <h3>${learner.fullName}</h3>
     <div>${learner.email}</div>
     <h4>▶ Mentors
      <class="closed"</>
     </h4>
    `;
  
  
    // Add click event listener to the card
    card.addEventListener('click', evt => {
      const cardSelected = card.classList.contains('selected');

      document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected')
        info.textContent = "No learner is selected"
      });
      
     // const target = evt.target;
  
      // Check if the click target is the toggle button
      if (!cardSelected) {
        card.classList.add('selected');
        info.textContent = `The selected learner is ${learner.fullName}`
       
        card.innerHTML = `
     <h3>${learner.fullName}, ID ${learner.id}</h3>
     <div>${learner.email}</div>
     <h4>▼ Mentors
      <class="open"</>
     </h4>
     <ul> ${learner.mentors.map(mentor => `<li>${mentor}</li>`).join('')}</ul>
    `;
    //const ul = card.querySelector('ul');
    //ul.classList.toggle('selected');
        
   }
      
    });
  
    return card;
  }

  // Function to render learner cards
  async function renderLearnerCards() {
    try {
      const combinedData = await fetchAndCombineData(); // Call fetchAndCombineData
      const cards = document.querySelector('.cards');
  
      // Loop over the combined data and generate learner cards
      combinedData.forEach(learner => {
        const card = buildLearnerCard(learner);
        cards.appendChild(card);
      });
    } catch (error) {
      console.error('Error rendering learner cards:', error);
    }
  }
  
  // Call the renderLearnerCards function to render the learner cards
  renderLearnerCards().catch(error => {
    console.error('Error rendering learner cards:', error);
  });
}
  //    console.log('😔 Promise rejected with an err.message -->', err.message)
  // 👆 WORK WORK ABOVE THIS LINE 👆


 //❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
