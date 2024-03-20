async function sprintChallenge5( ) { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

//entry point into cards
const cards = document.querySelector('.cards')

//creating card element within cards
 const card = document.createElement('div');
 const heading = document.createElement('h3');
 const email = document.createElement('div');
 const mentor = document.createElement('h4');

 //skeleton for card content
 heading.textContent = 'learner name here';
 email.textContent = 'email goes here';
 mentor.textContent = 'mentors: dropdown here'
 card.classList.add('card')

 cards.appendChild(card);
 card.appendChild(heading);
 card.appendChild(email);
 card.appendChild(mentor);

 //adding click event to card
 console.log(card)
 card.addEventListener('click',() => {
 card.classList.toggle('selected');
 })

 return card;

function getLearners(count) {
axios.get('http://localhost:3003/api/learners')
.then(res => {
  res.data.forEach(learner => {
  const card = cardMaker({learner: res.data, mentors: mentors});
  cards.appendChild(card);
  })
})
.catch(err => {
console.error(err);
})
.finally(() => console.log("fuggin donez"));

}

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
