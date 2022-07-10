// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
const inquirer = require("inquirer");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        const role = "Intern";
        return role;
    }

    async employeeQuestions() {
        const question = {
            type: "input",
            name: "school",
            message: "Please enter the school the intern attended.",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "School email cannot be empty."
                } else {
                    return true;
                }
            }
        };
        const inquire = await inquirer.prompt(question);
        this.school = inquire.school
    }
}

module.exports = Intern;