$(document).ready(function(){

var questions = [
	{question: "What is the first Book in the Bible?",
	choices: ["Matthew", "Revelation", "Exodus", "Genesis"],
	correctAns: 3},

	{question: "Who was the first official king of Israel?",
	choices: ["Rehoboam", "Saul", "Ahab", "David"],
	correctAns: 1},


	{ question: "Who led the children of Israel out of Egypt?",
	choices: ["Noah", "Joash", "Moses", "Jehu"],
	correctAns: 2},

	{ question: "Who built the walls of Jerusalem after the Babylonian captivity?",
	choices: ["Nehemiah", "Hiram", "Solomon", "Joshua"], 
	correctAns: 0},

	{ question: "How does one obtain salvation?",
	choices: ["By baptism", "By works", "By repentance of sin", "By faith"],
	correctAns: 3},

	];


//create some global variables

var questionNumber = 0; 
var correctAnswers = 0;
var counter = 0;
var userAnswers = new Array (); 
//what happens when you restart
$("button#restart").on("click", function(){
	restart();
});

//restart function
function restart(){
	questionNumber = 0; 
	correctAnswers = 0; 
	counter = 0; 
	userAnswers = new Array();
	$("#reviewSection").css("display", "none");
	$("#score").text("");
	$("#writtenQuestion").text(questions[questionNumber].question);//create a variable that isolates the choices
var questionData=$.each(questions[questionNumber].choices, function(index, value){value});
//take out the entire "mainsection" label
$("fieldset#mainSection label").remove();
//put in the new label
$.each(questionData, function(index, value){
$("fieldset#mainSection").append("<label class='radio'><input type='radio' name='check' data-ans=" + index +">" + value + "</label>");
});

}

//what happens on the submit button 

$("button#submission").on("click",function(){ 
seeIfAnswerRight();		 	
 questionNumber++;
if (questionNumber === questions.length){
	$("#reviewSection").css("display", "block");
}

else {
nextQuestion();
}; 
});

//what happens on the review button
$("button#review").on("click",function(){
	$("#score").append("<h4>" + correctAnswers + " of 5 <h4>" );
	$("#reviewSection").css("display", "block");
}

);

//create the next question function
//put next question in the written question
function nextQuestion(){
$("#writtenQuestion").text(questions[questionNumber].question);

//create a variable that isolates the choices
var questionData=$.each(questions[questionNumber].choices, function(index, value){value});
//take out the entire "mainsection" label
$("fieldset#mainSection label").remove();
//put in the new label
$.each(questionData, function(index, value){
$("fieldset#mainSection").append("<label class='radio'><input type='radio' name='check' data-ans=" + index +">" + value + "</label>");
});
}

//create another function to collect the amount of right answers
function seeIfAnswerRight(){
var userAns = $("input[type=radio]:checked").data("ans");
userAnswers.push(userAns);
if (userAns===questions[counter].correctAns){
	correctAnswers++;
}
counter++;

console.log(correctAnswers);
}


});



