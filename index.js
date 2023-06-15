// if (localStorage.getItem("color")) {
//     document.getElementById("myButton").style.color = localStorage.getItem("color")
// }


// document.getElementById("myButton").addEventListener("click", () => {
//     localStorage.setItem("color", "red")
//     document.getElementById("myButton").style.color = "red"
// })

if (localStorage.getItem("text")) {
    document.getElementById("targetParagraph").innerText = localStorage.getItem("text")
}

document.getElementById("input").addEventListener("change", (el) => {
    const inputValue = el.target.value
    localStorage.setItem("text", inputValue)
    document.getElementById("targetParagraph").innerText = inputValue
})

document.getElementById("resetButton").addEventListener("click", () => {
    localStorage.removeItem("text")
    document.getElementById("targetParagraph").innerText = "Hello world!"
})
