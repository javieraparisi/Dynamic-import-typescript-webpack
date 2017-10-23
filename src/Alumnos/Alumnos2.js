"use strict";
var Core_Persona_Persona_1 = require("Core.Persona.Persona");
function greeter(person) {
    return "Hello, " + person + Core_Persona_Persona_1["default"]();
}
var user = "Jane User";
document.body.innerHTML = greeter(user);
