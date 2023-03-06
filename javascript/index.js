const postsContainer = document.getElementById("postsContainer")
const logout = document.getElementById("logout")
const user = JSON.parse(localStorage.getItem("user"))

if (!user?.accessToken) {
  window.location.href = "/login.html"
}

const getPosts = async () => {
  const response = await fetch("https://api.noroff.dev/api/v1/social/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`
    }
  })

  const data = await response.json()

  console.log(data)

  if (!response.ok) {
    return alert(data.errors[0].message)
  }

  data.forEach((post) => {
    const postDiv = document.createElement("div")
    postDiv.classList.add("post")

    const postTitle = document.createElement("h2")
    postTitle.classList.add("post-title")
    postTitle.innerText = post.title

    const postBody = document.createElement("p")
    postBody.classList.add("post-body")
    postBody.innerText = post.body

    const postMedia = document.createElement("img")
    postMedia.classList.add("post-media")
    postMedia.src = post.media

    const postTags = document.createElement("div")
    postTags.classList.add("post-tags")

    post.tags.forEach((tag) => {
      const postTag = document.createElement("span")
      postTag.classList.add("post-tag")
      postTag.innerText = tag

      postTags.appendChild(postTag)
    })

    postDiv.appendChild(postTitle)
    postDiv.appendChild(postBody)
    postDiv.appendChild(postMedia)
    postDiv.appendChild(postTags)

    postsContainer.appendChild(postDiv)
  })
}

getPosts()

const logoutUser = () => {
  localStorage.removeItem("user")
  window.location.href = "/login.html"
}

logout.addEventListener("click", logoutUser)
