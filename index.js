const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Internal = require('./lib/Internal.js');

// function to create the team through questions prompt...
function createTeam(questions, type) {
    return new Promise((resolve, reject) => {
        let team_member = null;

        questions.push({
            type: 'rawlist',
            name: 'team',
            message: "What are the other team's members?",
            choices: ["Engineer", "Internal", "Done"],
        });

        inquirer
            .prompt(questions)
            .then(answers => {
                switch (type) {
                    case "Manager":
                        team_member = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                        break;

                    case "Engineer":
                        team_member = new Engineer(answers.name, answers.id, answers.email, answers.github);
                        break;

                    case "Internal":
                        team_member = new Internal(answers.name, answers.id, answers.email, answers.school);
                        break;
                }

                resolve({ team_member: team_member, next: answers.team });
            })
            .catch(error => reject(error));
    });
}

// starting the app, asking about the manager...
let manager_questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's manager's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What's manager's ID?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What's manager's email?"
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What's manager's office number?"
    }
];

// questions for engineers...
let engineer_questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's engineer's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What's engineer's ID?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What's engineer's email?"
    },
    {
        type: 'input',
        name: 'github',
        message: "What's engineer's github username?"
    }
];

// questions for interns...
let internal_questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's internal's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What's internal's ID?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What's internal's email?"
    },
    {
        type: 'input',
        name: 'school',
        message: "What's internal's school?"
    }
];

let team = [];

createTeam(manager_questions, "Manager").then(async (team_response) => {
    // adding manager into team array...
    team.push(team_response.team_member);

    // asynchronous responses for Intern and Engineer questions...
    while (team_response.next != "Done") {
        switch (team_response.next) {
            case "Internal":
                team_response = await createTeam(internal_questions, "Internal");
                break;
            case "Engineer":
                team_response = await createTeam(engineer_questions, "Engineer");
                break;
        }

        // adding internal/engineer into team array...
        team.push(team_response.team_member);
    }

    fs.readFile('./template.html', 'utf8', function (error, original_html) {
        if (error) {
            return console.error(error);
        }

        let team_html = "";

        team.forEach(member => {
            switch (member.constructor.name) {
                case "Manager":
                    team_html += "<div class='card mb-4 box-shadow'>" +
                        "<div class='card-header'>" +
                        "<h4 class='my-0 font-weight-normal'>Manager</h4>" +
                        "</div>" +
                        "<div class='card-body'>" +
                        "<h1 class='card-title'>" + member.name + "</h1>" +
                        "<ul class='list-unstyled mt-3 mb-4'>" +
                        "<li>Email: " + "<a href=mailto:" + member.email + ">" + member.email + "</a>" + "</li>" +
                        "<li>Office Number: " + member.officeNumber + "</li>" +
                        "<li>ID: " + member.id + "</li>" +
                        "</ul>" +
                        "</div>";
                    break;

                case "Internal":
                    team_html += "<div class='card mb-4 box-shadow'>" +
                        "<div class='card-header'>" +
                        "<h4 class='my-0 font-weight-normal'>Intern</h4>" +
                        "</div>" +
                        "<div class='card-body'>" +
                        "<h1 class='card-title'>" + member.name + "</h1>" +
                        "<ul class='list-unstyled mt-3 mb-4'>" +
                        "<li>Email: " + "<a href=mailto:" + member.email + ">" + member.email + "</a>" + "</li>" +
                        "<li>Graduating from: " + member.school + "</li>" +
                        "<li>ID: " + member.id + "</li>" +
                        "</ul>" +
                        "</div>";
                    break;

                case "Engineer":
                    team_html += "<div class='card mb-4 box-shadow'>" +
                        "<div class='card-header'>" +
                        "<h4 class='my-0 font-weight-normal'>Engineer</h4>" +
                        "</div>" +
                        "<div class='card-body'>" +
                        "<h1 class='card-title'>" + member.name + "</h1>" +
                        "<ul class='list-unstyled mt-3 mb-4'>" +
                        "<li>Email: " + "<a href=mailto:" + member.email + ">" + member.email + "</a>" + "</li>" +
                        "<li>Github Username: " + "<a href='https://www.github.com/" + member.github + "' " + "target='_blank' " + "rel='noopener noreferrer'" + ">" + member.github + "</a>" + "</li>" +
                        "<li>ID: " + member.id + "</li>" +
                        "</ul>" +
                        "</div>";
                    break;
            }
            console.log(team_html);
        });
        fs.writeFile('./index.html', original_html.replace("REPLACE_ME", team_html), error => {
            if (error) {
                console.error(error);
                return false;
            }

            console.log("html is ready.");
        });
    });
});