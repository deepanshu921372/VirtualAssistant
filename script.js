let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let voices= [];
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
}
function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    const femaleVoice = voices.find(voice => voice.name.includes("Google US English")); 
    if (femaleVoice) {
        text_speak.voice = femaleVoice;
    }
    window.speechSynthesis.speak(text_speak);
}
function wishMe(){
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir!");
    } 
    else if (hours >= 12 && hours < 16){
        speak("Good Afternoon Sir!");
    } 
    else {
        speak("Good Evening Sir!");
    }
}
window.addEventListener('load',()=>{
    wishMe();
})
let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript);
}
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
})
window.speechSynthesis.onvoiceschanged = populateVoices;
const knowledgeBase = {
    "who is the president of the USA": "The current president of the USA is Joe Biden.",
    "what is the capital of France": "The capital of France is Paris.",
    "what is the largest planet": "The largest planet in our solar system is Jupiter.",
    "tell me a joke": "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "what is the meaning of life": "The meaning of life is a philosophical question that has been debated for centuries.",
    "who wrote 'Romeo and Juliet'": "Romeo and Juliet was written by William Shakespeare.",
    "what is photosynthesis": "Photosynthesis is the process by which green plants use sunlight to synthesize foods with the help of chlorophyll.",
    "how many continents are there": "There are seven continents on Earth.",
    "who is the founder of Microsoft": "The founder of Microsoft is Bill Gates.",
    "what is the speed of light": "The speed of light is approximately 299,792 kilometers per second."
};
function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";   
    const lowerCaseMessage = message.toLowerCase(); 
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hey")) {
        speak("Hello Sir, What can I help you?");
    } else if (lowerCaseMessage.includes("who are you")) {
        speak("I am a virtual assistant, created and guided by Deepanshu Sir.");
    } else if (lowerCaseMessage.includes("open youtube")) {
        window.open("http://www.youtube.com");
    } else if (lowerCaseMessage.includes("open stack overflow")) {
        window.open("https://stackoverflow.com/");
    } else if (lowerCaseMessage.includes("open weather")) {
        window.open("https://www.weather-forecast.com/");
    } else if (lowerCaseMessage.includes("open calculator")) {
        window.open("https://www.calculator.net/");
    } else if (lowerCaseMessage.includes("open code editor")) {
        window.open("https://code.visualstudio.com/");
    } else if (lowerCaseMessage.includes("open notepad")) {
        window.open("https://notepad-plus-plus.org/");
    }else if (lowerCaseMessage.includes("time")){
        let time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric", second: "numeric"});
        speak(time) 
    } else if (lowerCaseMessage.includes("date")){
        let date = new Date().toLocaleString(undefined, {day: "numeric", month: "short"});
        speak(date) 
    } 
    else {
        if (knowledgeBase[lowerCaseMessage]) {
            speak(knowledgeBase[lowerCaseMessage]);
        } else {
            speak(`This is what i found on internet regarding ${lowerCaseMessage.replace("nova", "")}`);
            window.open(`https://www.google.com/search?q=${lowerCaseMessage.replace("nova", "")}`);
        }
    }
}

