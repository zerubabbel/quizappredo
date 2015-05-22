$(document).ready(function(){

	var questions = [
	{question: "What is the first Book in the Bible?",
	choices: ["Matthew", "Revelation", "Exodus", "Genesis"],
	quesNum: 1, 
	correctAns: 3},

{question: "Who was the first official king of Israel?",
	choices: ["Rehoboam", "Saul", "Ahab", "David"],
	quesNum: 2, 
	correctAns: 1},


	{ question: "Who led the children of Israel out of Egypt?",
	choices: ["Noah", "Joash", "Moses", "Jehu"],
	quesNum: 3, 
	correctAns: 2},

	{ question: "Who built the walls of Jerusalem after the Babylonian captivity?",
	choices: ["Nehemiah", "Hiram", "Solomon", "Joshua"],
	quesNum: 4, 
	correctAns: 0},

	{ question: "How does one obtain salvation?",
	choices: ["By baptism", "By works", "By repentance of sin", "By faith"],
	quesNum: 5, 
	correctAns: 3},

	];

	//Question Number
 $("div#main p:first").text("Question " + questions[0].quesNum + " of " + questions.length);

 //Global Variables
 var questionNumber = 0;
 var correctAnswers = 0;
 var counter = 0;
 var userAnswers = new Array();



 //On Submit Button
 $("button#submission").on("click",function(){ 		 	
 	checkAnswer();
 	questionNumber++;
//on the final submit, the array "questionNumber" is going to equal, since it will have added up to 5 clicks, and thus equal the length of the variable "questions." When that happens, the questions over, and the opportunity to see how you did will come up by switching the display of the review button in css from none to block. 
 	if(questionNumber === questions.length){
 	 	$("div#main p:first").css("display","none");
 	 	$("button#submit").css("display","none");
 	 	$("#review").css("display","block"); 	 	
	}
	else {
		nextQuestion();	
	};	
 });

 //On Review Button
//refer to the fade function below. refer to the review questions function below. 
$("button#review").on("click",function(){
 	fade("#main","slow","#revSection", "slow");
	reviewQuestions(); 	
 });

//Done to restart the quiz, refer to the restart function below for more details 
$("button#restart").on("click",function(){	
 	restart();
})

//An object created for fading
function fade(sectionOut, speed1, sectionIn, speed2){
	$(sectionOut).fadeOut(speed1);
	$(sectionIn).fadeIn(speed2);
}

//Move to next question - update question & answers
function nextQuestion(){
	$("div#main p:first").text("Question " + questions[questionNumber].quesNum + " of " + questions.length);

//display the writing of the quesiton
	$("#writtenQuestion").text(questions[questionNumber].question);

//replace each value in the quiz with the value of the next question. 
//going to take the multiple choice questions and apply the jquery index value signature. takes the question number as the index, the actual answer of the question of the value for each choice of the new question.

//in turn you will take out all the labels, and then add each of them back 
	var questionData = $.each(questions[questionNumber].choices,function(index,value){value});
//remove old question
	$("fieldset#mainSec label").remove();
//will put in the new questions

	$.each(questionData,function(index,value){
		$("fieldset#mainSec").append("<label class='radio'><input type='radio' name='check' data-ans=" + index +">"+value+"</label>");
		});	

}

//Check user answer against correct answer - store user answer & keep count fo right or wrong answers
function checkAnswer(){
	var userAns = $("input[type=radio]:checked").data("ans");
	userAnswers.push(userAns);
	
 	if(userAns === questions[counter].correctAns) {
 		correctAnswers++;
 	} 
	counter++;
	}

//first clear out all of the rev section h1, p, and label, then 
function reviewQuestions(){
	$("#revSection h1,#revSection p,#revSection label").remove();
	$("#revSection").append("<h1>You Got " + correctAnswers + " Out Of " + questions.length + " Questions Correct</h1>").show();

	//for loop to 

	for(var i = 0; i < questions.length; i++){
		$("#revSection").append("<p class='revQuest'>Question " + questions[i].quesNum +"</p>" + 
			"<p id='q" + i + "'" + "><span class='wrong'>&#10008;</span><span class='right'>&#10004;</span>" +
			questions[i].question + "<span id='rightAns'>&nbsp;&nbsp;The right answer is " 
			+ questions[i].choices[questions[i].correctAns] + "." + "</p>");
		
		var multChoice = $.each(questions[i].choices,function(index,value){value});
		$.each(multChoice,function(index,value){
			$("#revSection").append("<label class='radio'><input type='radio' name='check' data-ans=" + index +">"+value+"</label>");
			});

//shows and hides correct answers respectively
		if(userAnswers[i] === questions[i].correctAns){
			$("#q"+i+" span.right").show();
		}else {
			$("#q"+i+" span.wrong").show();
			}
		}
	}

	//Restart Quiz
function restart(){
	questionNumber = 0;
 	correctAnswers = 0;
 	counter = 0;
 	userAnswers = new Array();	
 	$("#submission").css("display","block");
 	$("#review").css("display","none");
 	fade("#revSection",50,"#main",1000);
 }









})




