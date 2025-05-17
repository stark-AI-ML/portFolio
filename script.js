// import HtmlSvg from "./src/svgsExport"; // module not working... fix this 

var projects = [
    {
        "name": "Saraansh",
        "tech": "Chrome Extension",
        "stack": "HTML CSS JavaScript openAI API",
        "description": "This project helps me to learn best of the dom and Basics of Tabs, Chrome RunTime how internally browser handles things",
        "imgSrc": "src/chromeEx.png",
        "gitLink": "https://github.com/stark-AI-ML/saraansh",
        "liveLink": ""

    },
    {
        "name": "SpoFit(Sports Connect)",
        "stack": "ReactNative CLI(version), Firebase, NPM ",
        "description": "Sports connecting app i am working, Idea is to connect local Atheletic sports person.. added all basic features: workouts, Diet , Analytics and have to add mapping and post features..",
        "imgSrc": "src/spoFit.png",
        "gitLink": "https://github.com/stark-AI-ML/SpoFit",
        "liveLink": ""
    },

];

var skills = [
    {
        HtmlSvg: `<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-html">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
    <path d="M2 21v-6" /><path d="M5 15v6" />
    <path d="M2 18h3" /><path d="M20 15v6h2" />
    <path d="M13 21v-6l2 3l2 -3v6" />
    <path d="M7.5 15h3" /><path d="M9 15v6" />
</svg>`,
        type: "others",
        percentage: 80,
        implementation: "Created my portfolio and almost every webDev project as skelton",
        name: "html"
    },
    {
        HtmlSvg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-cpp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 12h4" /><path d="M20 10v4" /><path d="M11 12h4" /><path d="M13 10v4" /><path d="M9 9a3 3 0 0 0 -3 -3h-.5a3.5 3.5 0 0 0 -3.5 3.5v5a3.5 3.5 0 0 0 3.5 3.5h.5a3 3 0 0 0 3 -3" /></svg>`,
        type: "lang",
        percentage: 80,
        implementation: "Implemented console Typing Game(multiThreading Chrono)...Practising DSA",
        name: "cpp"
    },
    {
        HtmlSvg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-javascript"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" /><path d="M7.5 8h3v8l-2 -1" /><path d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5" /></svg>`,
        type: "lang",
        percentage: 80,
        implementation: "Created Chrome Extension that provides notes and summary for better and fast understanding of the topic, (Learned DOM at best with handeling openAI API Integration)",
        name: "javaScript"
    },
    {
        HtmlSvg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-typescript"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5" /><path d="M9 12h4" /><path d="M11 12v6" /><path d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2z" /></svg>`,
        type: "lang",
        percentage: 70,
        implementation: "Worked in Spofit with TS has to gain much more knowledge about features.. but quite comfortable.",
        name: "typeScript"
    },


    {
        HtmlSvg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-mongodb"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3v19" /><path d="M18 11.227c0 3.273 -1.812 4.77 -6 9.273c-4.188 -4.503 -6 -6 -6 -9.273c0 -4.454 3.071 -6.927 6 -9.227c2.929 2.3 6 4.773 6 9.227z" /></svg>`,
        type: "database",
        percentage: 60,
        implementation: "More of practise thing, but did implemented in practise project.. with mongoose and Node.js, continue to learn more",
        name: "mongoDB"
    },
    {
        HtmlSvg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sql"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z" /><path d="M17 8v8h4" /><path d="M13 15l1 1" /><path d="M3 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1" /></svg>`,
        type: "database",
        percentage: 70,
        implementation: "Implementing in recent project knows all basics queries have past familirity in 12th ",
        name: "SQL"
    },
    {
        HtmlSvg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-react"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" /><path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" /><path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" /><path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" /><path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" /><path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" /><path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" /></svg>`,
        type: "frameworks",
        percentage: 70,
        implementation: "Creating sports-connting app with ReactNative for sports Person in Progress...",
        name: "React Native"
    },

    {
        HtmlSvg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-css"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M8 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" /><path d="M11 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" /><path d="M17 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" /></svg>`,
        type: "others",
        percentage: 80,
        implementation: "Used in my Portfolio, Manga webpage",
        name: "Css",
        link: ""
    },

    {
        HtmlSvg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-powershell"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.887 20h11.868c.893 0 1.664 -.665 1.847 -1.592l2.358 -12c.212 -1.081 -.442 -2.14 -1.462 -2.366a1.784 1.784 0 0 0 -.385 -.042h-11.868c-.893 0 -1.664 .665 -1.847 1.592l-2.358 12c-.212 1.081 .442 2.14 1.462 2.366c.127 .028 .256 .042 .385 .042z" /><path d="M9 8l4 4l-6 4" /><path d="M12 16h3" /></svg>`,
        type: "tools",
        percentage: 70,
        implementation: "Created BashScript to automate my simple tasks from opening yt to creating codes html css js boiler plate with linking to each other, read my docs",
        name: "Bash",
        link: "https://bash-rudresh.hashnode.dev/bash-starter"
    },
    {
        HtmlSvg: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-firebase"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.53 17.05l6.15 -11.72h-.02c.38 -.74 1.28 -1.02 2.01 -.63c.26 .14 .48 .36 .62 .62l1.06 2.01" /><path d="M15.47 6.45c.58 -.59 1.53 -.59 2.11 -.01c.22 .22 .36 .5 .41 .81l1.5 9.11c.1 .62 -.2 1.24 -.76 1.54l-6.07 2.9c-.46 .25 -1.01 .26 -1.46 0l-6.02 -2.92c-.55 -.31 -.85 -.92 -.75 -1.54l1.96 -12.04c.12 -.82 .89 -1.38 1.7 -1.25c.46 .07 .87 .36 1.09 .77l1.24 1.76" /><path d="M4.57 17.18l10.93 -10.68" /></svg>`,
        type: "tools",
        percentage: 50,
        implementation: "Using for authentication and realTime database for Spofit",
        name: "FireBase",
        link: ""
    }
]


const projectContainer = document.querySelector(".projectContainer");


document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 50,
            behavior: 'smooth'
        });
    });
});





function createProjectCard(data, imgSrc) {

    console.log("createProject is running");

    const projectCard = document.createElement('div');

    projectCard.className = "projectCard"

    // projectCard.style.width = "100px";
    // projectCard.style.height = "100px";
    // projectCard.style.backgroundColor = "red";
    const cardImg = document.createElement('img');

    cardImg.id = "projectsCardImg";
    cardImg.className = "project-card-img";
    cardImg.src = imgSrc;
    cardImg.alt = "image not found";
    projectCard.appendChild(cardImg);

    // i know this is not good to do like applying css within js but these styles only require few things 
    const projectStack = document.createElement('div');
    projectStack.innerText = data.stack;
    projectStack.className = "project-stack";
    projectStack.style.color = "gray";
    projectStack.style.borderBottom = "0.3px solid gray";
    projectCard.appendChild(projectStack);

    const projectContent = document.createElement('div');
    projectContent.className = "project-content";

    const projectName = document.createElement('div');
    projectName.innerText = data.name;
    projectName.className = "project-name";
    projectName.style.fontWeight = "400";
    projectName.style.margin = "10px";
    projectName.style.fontSize = "23px";
    projectCard.appendChild(projectName)


    const projectDescription = document.createElement('div');
    projectDescription.className = "project-description";
    projectDescription.innerText = data.description;
    projectDescription.style.color = "gray";
    projectDescription.style.marginLeft = "10px";
    projectCard.appendChild(projectDescription);

    const projectGitLink = document.createElement('div');
    projectGitLink.className = "project-git-link";
    const goToButton = document.createElement('a');
    goToButton.target = "_blank";
    goToButton.rel = "noopener noreferrer";
    goToButton.className = "git-button";
    goToButton.innerText = "GitHub"
    goToButton.href = data.gitLink;
    projectGitLink.appendChild(goToButton);
    projectCard.appendChild(projectGitLink);

    return projectCard;

}

projects.forEach((item) => {
    let card = createProjectCard(item, item.imgSrc);
    projectContainer.appendChild(card);
})



// this is for skills 
function updateSkills(type, icons, percentage, implementation, link) {

    console.log("update Skill is running");
    const cardIcon = document.createElement('div');
    cardIcon.id = "skillCardIcon";
    cardIcon.src = icons;
    cardIcon.alt = "image not found";

    const cardContainer = document.createElement('div');


    switch (type.toLowerCase()) {

        case "lang": {
            const parent = document.querySelector(".languageContainer");
            console.log("inside lang....");
            cardContainer.className = "langContainer";

            const iconImg = document.createElement("div")
            iconImg.innerHTML = icons;
            iconImg.className = "icons"

            const progress = document.createElement('progress');
            progress.value = percentage;
            progress.max = 100;
            // iconImg.setAttribute("style", "height: 40px; width: 40px; background-color: black; border-radius: 50%");
            const details = document.createElement("div");
            details.innerText = implementation;


            cardContainer.appendChild(iconImg);
            cardContainer.appendChild(progress);
            cardContainer.appendChild(details);
            if (link) {
                const goTo = document.createElement('a')
                goTo.href = link;
                goTo.innerText = "GoTo  ->"
                goTo.className = "goTo";
                cardContainer.appendChild(goTo);
            }
            console.log(iconImg.style.cssText);
            parent.appendChild(cardContainer)
            break;
        }
        case "database": {
            const parent = document.querySelector(".databaseContainer");
            parent.style.animation = 'cardRise 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards';
            console.log("inside lang....");
            cardContainer.className = "langContainer"; // because i want same styling 

            const iconImg = document.createElement("div")
            iconImg.innerHTML = icons;
            iconImg.className = "icons"

            const progress = document.createElement('progress');
            // const progressVal = document.createElement('p');
            // progressVal.innerText = percentage;

            // progress.innerHTML = progressVal;
            progress.value = percentage;
            progress.max = 100;
            // iconImg.setAttribute("style", "height: 40px; width: 40px; background-color: black; border-radius: 50%");
            const details = document.createElement("div");
            details.innerText = implementation;


            cardContainer.appendChild(iconImg);
            cardContainer.appendChild(progress);
            cardContainer.appendChild(details);
            if (link) {
                const goTo = document.createElement('a')
                goTo.href = link;
                goTo.innerText = "GoTo  ->"
                goTo.className = "goTo";
                cardContainer.appendChild(goTo);
            }
            console.log(iconImg.style.cssText);
            parent.appendChild(cardContainer)
            break;
        }
        case "tools": {
            const parent = document.querySelector(".toolsContainer");
            parent.style.animation = 'cardRise 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards';
            cardContainer.className = "langContainer"; // because i want same styling 

            const iconImg = document.createElement("div")
            iconImg.innerHTML = icons;
            iconImg.className = "icons"

            const progress = document.createElement('progress');
            progress.value = percentage;
            progress.max = 100;
            // iconImg.setAttribute("style", "height: 40px; width: 40px; background-color: black; border-radius: 50%");
            const details = document.createElement("div");
            details.innerText = implementation;



            cardContainer.appendChild(iconImg);
            cardContainer.appendChild(progress);
            cardContainer.appendChild(details);
            if (link) {
                const goTo = document.createElement('a')
                goTo.href = link;
                goTo.innerText = "GoTo  ->"
                goTo.className = "goTo";
                cardContainer.appendChild(goTo);
            }
            console.log(iconImg.style.cssText);
            parent.appendChild(cardContainer)
            break;
        }
        case "others": {
            const parent = document.querySelector(".othersContainer");
            parent.style.animation = 'cardRise 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards';
            console.log("inside lang....");
            cardContainer.className = "langContainer"; // because i want same styling 

            const iconImg = document.createElement("div")
            iconImg.innerHTML = icons;
            iconImg.className = "icons"

            const progress = document.createElement('progress');
            progress.value = percentage;
            progress.max = 100;
            // iconImg.setAttribute("style", "height: 40px; width: 40px; background-color: black; border-radius: 50%");
            const details = document.createElement("div");
            details.innerText = implementation;


            cardContainer.appendChild(iconImg);
            cardContainer.appendChild(progress);
            cardContainer.appendChild(details);
            if (link) {
                const goTo = document.createElement('a')
                goTo.href = link;
                goTo.innerText = "GoTo ->"
                goTo.className = "goTo";
                cardContainer.appendChild(goTo);
            }
            console.log(iconImg.style.cssText);
            parent.appendChild(cardContainer)
            break;

        }
        case "frameworks": {

            const parent = document.querySelector(".frameWorkContainer");
            cardContainer.className = "langContainer"; // because i want same styling 

            const iconImg = document.createElement("div")
            iconImg.innerHTML = icons;
            iconImg.className = "icons"

            const progress = document.createElement('progress');
            progress.value = percentage;
            progress.max = 100;
            // iconImg.setAttribute("style", "height: 40px; width: 40px; background-color: black; border-radius: 50%");
            const details = document.createElement("div");
            details.innerText = implementation;


            cardContainer.appendChild(iconImg);
            cardContainer.appendChild(progress);
            cardContainer.appendChild(details);
            if (link) {
                const goTo = document.createElement('a')
                goTo.href = link;
                goTo.innerText = "GoTo ->"
                goTo.className = "goTo";
                cardContainer.appendChild(goTo);
            }
            console.log(iconImg.style.cssText);
            cardContainer.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
            parent.appendChild(cardContainer)
            break;
        }
    }
}


// function createSkillsCards(iconSrc, name, percentage, implementation, type) {

//     console.log("update Skill is running0");
//     const skillCard = document.createElement('div');
//     skillCard.className = "skillCard"
//     const updatedSkill = updateSkills(type, iconSrc, percentage, implementation);

//     // projectCard.appendChild(projectStack);
//     const returnF = skillCard.appendChild(updatedSkill);
//     return returnF;

// }


const skillsContainer = document.querySelector(".skillsContainer");


// skills.forEach((item) => {
//   const skills =   createSkillsCards(item.HtmlSvg, item.name, item.percentage, item.implementation, item.type);
//   skillsContainer.appendChild(skills);
// })

skills.forEach((item) => {
    const skills = updateSkills(item.type, item.HtmlSvg, item.percentage, item.implementation, item.link)
})

// For hamBurg   -- 
document.querySelector('.hamburger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('#navRight').classList.toggle('active');
});


document.addEventListener('click', function (event) {
    const navRight = document.querySelector('#navRight');
    const hamburger = document.querySelector('.hamburger');

    if (!navRight.contains(event.target) && !hamburger.contains(event.target)) {
        navRight.classList.remove('active');
        hamburger.classList.remove('active');
    }
});



// Add scroll effect
window.addEventListener('scroll', () => {
    const navBar = document.querySelector('.navBar');
    if (window.scrollY > 50) {
        navBar.classList.add('scrolled');
    } else {
        navBar.classList.remove('scrolled');
    }
});


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navLinks');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// projects 

document.querySelectorAll('.projectCard').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});








