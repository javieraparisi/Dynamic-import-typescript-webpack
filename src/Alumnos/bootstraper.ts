import persona from "Core.Persona.Persona";

function greeter(person) {
    return "Hello, " + person + persona();
}

var user = "Jane User";

document.body.innerHTML = greeter(user);