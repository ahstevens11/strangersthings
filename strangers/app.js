const BASE_URL = 'https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT'

function setToken(token) {
    localStorage.setItem('token', token)
}

async function registerUser(username, password) {
    const url = `${ BASE_URL }/users/register`
    // console.log(url)
    try {
        const response = await fetch(url, {
           method: "POST",
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify( {
               user: {
                   username: username,
                   password: password
               }
           }) 
        })
        const {error, data} = await response.json()
        if (data && data.token) {
            setToken(data.token)
        }
        console.log(error, data)

    } catch (err) {
        console.error(err)
    }
}
// registerUser('username1238', 'password')


$('.register').on('submit', function (event) {
    event.preventDefault()
    let userVal = $('#exampleInputEmail2').val()
    let userPassword = $('#exampleInputPassword2').val()
    registerUser(userVal, userPassword)
})

$('.login').on('submit', function (event) {
    event.preventDefault()
    let userVal = $('#exampleInputEmail1').val()
    let userPassword = $('#exampleInputPassword1').val()
    userLoggedIn(userVal, userPassword)
})


async function userLoggedIn(username, password) {
    if (localStorage.getItem('token')) {
        const myToken = localStorage.getItem('token')
        return myToken
    }
    try {
        const response = await fetch(`${ BASE_URL }/users/login`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password,
                }
            })
        })
        const {data} = await response.json()
        localStorage.setItem('token', JSON.stringify(data.token))
        return data
    } catch (err) {
        console.error(err)
    }
}
// userLoggedIn()
// .empty the log in divs to hide after logging in

async function fetchPosts() {
    try {
        const url = `${ BASE_URL }/posts`
        const response = await fetch(url)
        const {data} = await response.json()
        return data.posts
    } catch (err) {
        console.error(err)
    }
}
fetchPosts()

const createPostHTML = (post) => {
    return `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${ post.title }</h5>
    <p class="card-text">${ post.description }</p>
    <footer class="blockquote-footer">${ post.author.username || ''}</footer>
    </div>
    </div>
    `
}

async function renderPosts() {
    const posts = await fetchPosts()
}

(async function allPostsAtState() {
    const posts = await fetchPosts()
    posts.forEach((post) => {
        const postHTML = createPostHTML(post)
        $('#posts').append(postHTML)
    })
})()

//create new post
//add a comments section on to each post, must be able to add comments
//the posts might need to show prices and pictures
// 


