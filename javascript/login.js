const user = JSON.parse(localStorage.getItem("user"))

if (user?.accessToken) {
  window.location.href = "/index.html"
}

const form = document.getElementById("form")
// also get the name, email, password, avatar and banner fields
const email = document.getElementById("email")
const password = document.getElementById("password")

// add event listener to the form
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  // check if the name, email, password, avatar and banner fields are empty
  if (email.value === "" || password.value === "") {
    return alert("Please fill in all the fields")
  }

  const response = await fetch(
    "https://api.noroff.dev/api/v1/social/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    return alert(data.errors[0].message)
  }
  localStorage.setItem("user", JSON.stringify(data))

  alert("Logged in successfully!")
  window.location.href = "/index.html"
})
