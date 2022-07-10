const Manager = require("./info/Manager");
const Engineer = require("./info/Engineer");
const Intern = require("./info/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./info/html");


const team = [];


const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Employee name must be entered."
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID number? ",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Employee ID must be entered."
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the employees email address?.",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Employee email must be entered."
            } else {
                return true;
            }
        }
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?.",
        choices: ["manager", "engineer", "intern"]
    }
];


employeeFunc = (name, id, email, role) => {
    if(role === "manager") {
        return new Manager(name, id, email, "");
    } else if (role === "engineer") {
        return new Engineer(name, id, email, "");
    } else {
        return new Intern(name, id, email, "");
    }
};


writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        console.log(err);
    })
    console.log("Team has been successfully created!")
}


createTeam = async() => {
    let addEmployee = true
    console.log("The team builder is running! Please answer the next set of questions.");
    while(addEmployee){
        await inquirer.prompt(employeeQuestions).then(async answers => {
            let employee = employeeFunc(answers.name, answers.id, answers.email, answers.role);
            await employee.employeeQuestions();
            team.push(employee);
        });

        await inquirer.prompt(
            {
                type: "confirm",
                name: "addEmployee",
                message: "Add another employee?"
            }
        ).then(answers => {
            addEmployee = answers.addEmployee;
        });
    }

    const output = render(team);
    writeToFile(outputPath, output);
}


createTeam();