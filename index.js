
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager.js');

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
                        team_member = new Manager(answers.name, answers.email, answers.office_number);
                        break;
                    case "Engineer":
                        // TODO change me once class Engineer exists...
                        team_member = new Manager(answers.name, answers.email, answers.github);
                        break;
                    case "Internal":
                        // TODO change me once class Internal exists...
                        team_member = new Manager(answers.name, answers.email, answers.school);
                        break;                        
                }

                resolve({team_member: team_member, next: answers.team});
            })
            .catch(error => reject(error));
    });
}

// starting the app, asking about the maanger
let manager_questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's manager's name?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What's manager's email?"
    },
    {
        type: 'input',
        name: 'office_number',
        message: "What's manager's office numbers?"
    }
];

let engineer_questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's engineer's name?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What's engineer's email?"
    },
    {
        type: 'input',
        name: 'github',
        message: "What's engineer's github?"
    }
];


let internal_questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's internal's name?"
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

createTeam(manager_questions, "Manager").then(async(team_response) => {
    //adding manager into team array...
    team.push(team_response.team_member);

    while(team_response.next != "Done") {
        switch(team_response.next) {
            case "Internal":
                team_response = await createTeam(internal_questions, "Internal");
                break;
            case "Engineer":
                team_response = await createTeam(engineer_questions, "Engineer");
                break;                
        }

        //adding iternal/engineer into team array...
        team.push(team_response.team_member);
    }

    fs.readFile('./template.html', 'utf8', function (error, original_html) {
        if (error) {
            return console.error(error);
        }

        let team_html = "";

        team.forEach(member => {
            switch(member.constructor.name) {
                case "Manager":
                    team_html += "<div class='manager'>Manager Name:" + member.name + "</div>";
                    break;
                case "Internal":
                    team_html += "<div class='internal'>Internal Name:" + member.name + "</div>";
                    break;  
                case "Engineer":
                    team_html += "<div class='engineer'>Engineer Name:" + member.name + "</div>";
                    break;                                
            }
        });
            console.log(team_html);
        fs.writeFile('./index.html', original_html.replace("REPLACE_ME", team_html), error => {
            if (error) {
                console.error(error);
                return false;
            }
        
            console.log("html is ready.");
        });
    });
});