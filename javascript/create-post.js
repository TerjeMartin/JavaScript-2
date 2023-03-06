const user = JSON.parse(localStorage.getItem("user"))

if (!user?.accessToken) {
  window.location.href = "/login.html"
}

const form = document.getElementById("form")
// also get the name, email, password, avatar and banner fields
const title = document.getElementById("title")
const body = document.getElementById("body")
const media = document.getElementById("media")
const tags = document.getElementById("tags")

// add event listener to the form
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  // add validation
  if (title.value === "") {
    return alert("Please fill in all the fields")
  }

  // getting the tags
  const tagsArray = tags.value.split(",").map((value) => value.trim())

  const response = await fetch("https://api.noroff.dev/api/v1/social/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`
    },
    body: JSON.stringify({
      title: title.value,
      body: body.value,
      media: media.value,
      tags: tagsArray
    })
  })

  const data = await response.json()

  console.log(data)

  if (!response.ok) {
    return alert(data.errors[0].message)
  }

  alert("Post added successfully!")
  window.location.href = "/index.html"
})
