async function sprintChallenge5( ) { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`


const info = document.querySelector('.info');
info.textContent = "No learner is selected"

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

    const mentorMap = new Map();
    mentorsData.forEach(mentor => {
      mentorMap.set(mentor.id, (mentor.firstName + " " + mentor.lastName));
    });

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

  const h3 = document.createElement('h3');
  h3.textContent = `${learner.fullName}`

  const emailDiv = document.createElement('div');
  emailDiv.textContent = `${learner.email}`

  let h4 = document.createElement('h4');
    h4.classList = "closed"
    h4.textContent = "Mentors"

  const ul = document.createElement('ul')
  learner.mentors.forEach(mentor => {
  const li = document.createElement('li')
  li.textContent = mentor;
  ul.appendChild(li)
  });
  
  card.appendChild(h3);
  card.appendChild(emailDiv);
  card.appendChild(h4);
  card.appendChild(ul)
  

    card.addEventListener('click', evt => {
      const cardSelected = card.classList.contains('selected');
      document.querySelectorAll('.card').forEach(card => {
      card.classList.remove('selected')
      info.textContent = "No learner is selected"

      });
      
      if (!cardSelected) {
        card.classList.add('selected');
        info.textContent = `The selected learner is ${learner.fullName}`
        h3.textContent = `${learner.fullName}, ID ${learner.id}`
   } else {
    h3.textContent = `${learner.fullName}`
   }
      
   });
  
    h4.addEventListener('click', evt => {
    const parentCard = h4.closest('.card')
    
    if (parentCard && parentCard.classList.contains('selected')) {
    h4.classList.toggle('closed')
    h4.classList.toggle('open')

    evt.stopPropagation()
    }
  });

    return card;
  }
  
  async function renderLearnerCards() {
    try {
      const combinedData = await fetchAndCombineData();
      const cards = document.querySelector('.cards');
  
      combinedData.forEach(learner => {
        const card = buildLearnerCard(learner);
        cards.appendChild(card);
      });
    } catch (error) {
      console.error('Error rendering learner cards:', error);
    }
  }
  
  renderLearnerCards().catch(error => {
    console.error('Error rendering learner cards:', error);
  });
}

  // 👆 WORK WORK ABOVE THIS LINE 👆


 //❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
