const APIURL = 'https://api.github.com/users/'
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')




async function getUser(username){
    try {
        console.log('reached getUSer')
        
        const {data} = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch (error) {
        console.log(error)
        console.log(error.response)
        if(error.response.status ===404){

            createErrorCard('user not found')
        }
    }
    

}


async function getRepos(username){
    try {
        console.log('reached getRepos')
        const {data} = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch (error) {
        console.log(error)
     

            createErrorCard('Problem fetching Repos')
        
    }
}



function createUserCard(user){
    console.log('reached createUSerCard')
    const cardHtml = `<div class="card">
    <div><img src="${user.avatar_url}" alt="${user.name}" class="avatar" /></div>

    <div class="user-info">
      <h2>${user.name}</h2>
      <p>
      ${user.bio}
      </p>

      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>
      <div class="repos" id="repos">
      </div>
    </div>
  </div>`

  main.innerHTML = cardHtml

}
function addReposToCard(repos){
    console.log('reached addReposToCard')
    const reposEl = document.getElementById('repos')
    repos
    .slice(0,10)
    .forEach(repo=>{
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repo.target = '_blank'
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    })
}

function createErrorCard(message){
    console.log('reached Error')
    const cardHtml = `<div class="card">
    <h1>${message}</h1>
    </div>
    `

    main.innerHTML = cardHtml
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('reached form event listener')
    console.log(search.value)
    const user = search.value

    if (user){
        console.log('reached and user exists in form event')
        getUser(user)
        search.value = ''
    }
})