// script to get DynamicURLs.

var month = (new Date()).getMonth(); // gets month, 0 is january
var year = (new Date().getFullYear()); // gets full year
var day = (new Date().getDay()); // gets day, 0 is Sunday
var term;


switch (month) {
  case 0: // jan
  case 1: // feb
  case 2: // mar
  case 3: // apr
    term = "semester 1";
    break;
  case 4: // may
  case 5: // jun
  case 6: // jul
    term = "semester 2";
    break;
  case 7: //aug
  case 8: //sept
  case 9: //oct
  case 10: //nov
  case 11: //dec
    term = "semester 3";
    break;
}

let link = 'https://www.coursera.org/learn/';
let home = '/home/';


document.getElementById("overview_591").href = link+'cybersecurity'+home; 
document.getElementById("overview_592").href = link+'machine-learning'+home;
document.getElementById("overview_593").href = link+'python'+home;
document.getElementById("overview_594").href = link+'javascript'+home;
document.getElementById("overview_595").href = link+'financial-markets-global'+home;
document.getElementById("overview_596").href = link+'ai-for-everyone'+home;
document.getElementById("overview_549").href = link+'what-is-datascience'+home;
document.getElementById("overview_581").href = link+'computer-networking'+home;
document.getElementById("overview_547").href = link+'computational-thinking-problem-solving'+home;
document.getElementById("overview_515").href = link+'user-experience-design'+home;

