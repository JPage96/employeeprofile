// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
const inquirer = require("inquirer");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber
    }

    getRole() {
        const role = "Manager";
        return role;
    }

    // the questions that is asked based on the input role
    async employeeQuestions() {
        const question = {
            type: "input",
            name: "officeNumber",
            message: "Please enter manager's office number.",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "Office number cannot be empty."
                } else {
                    return true;
                }
            }
        };
        const inquire = await inquirer.prompt(question);
        this.officeNumber = inquire.officeNumber
    }
}

module.exports = Manager;