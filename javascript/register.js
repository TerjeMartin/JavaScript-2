const user = JSON.parse(localStorage.getItem("user"))

if (user?.accessToken) {
  window.location.href = "/index.html"
}

const form = document.getElementById("form")
// also get the name, email, password, avatar and banner fields
const name = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const avatar = document.getElementById("avatar")
const banner = document.getElementById("banner")

// add event listener to the form
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  // check if the name, email, password, avatar and banner fields are empty
  if (
    name.value === "" ||
    email.value === "" ||
    password.value === "" ||
    avatar.value === "" ||
    banner.value === ""
  ) {
    return alert("Please fill in all the fields")
  }

  // if all the fields are filled in, then send a POST request to the server
  // also use async await by sending a request to https://api.noroff.dev/api/v1/social/auth/register
  // and send the data as a JSON object
  // error handling

  const response = await fetch(
    "https://api.noroff.dev/api/v1/social/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        avatar: avatar.value,
        banner: banner.value
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    console.log(data)
    return alert(data.errors[0].message)
  }

  alert("Registered successfully!")

  window.location.href = "/login.html"
})
