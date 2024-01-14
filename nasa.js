// const url= "https://api.nasa.gov/planetary/apod?&date=30-12-2023&api_key=DEMO_KEY";

const form= document.getElementById("search-form");
const API_KEY= "6AFbaEa7XoYzY4VAw2PW6Unvk9wgnEOaTgvROgqK";
let current_img_container =document.getElementById("current-image-container");
let search_history= document.getElementById("search-history");
let arr=[];


// Initially, since there is no date this function will execute
function noDateCall(){
    let date = new Date();
        // const yy=date.getFullYear;
        // const mm=date.getMonth;
        // const dd= date.getDate;
        const currentDate= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        let obj={
            date:currentDate
        }
        arr.push(obj);
        saveSearch();
    fetchImage(currentDate);
}
noDateCall();



form.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    // console.log(form.searchDate.value);

    let searchedDate= form.searchDate.value;
    // console.log(searchedDate);
    if(searchedDate){
        let obj={
            date:searchedDate,
        }
        arr.push(obj);
        // console.log(arr);
        saveSearch();
        fetchImage(searchedDate);
        current_img_container.innerHTML="";
    }else{
        alert("Please Select a Date!")
        
    }
    form.reset();
    // calling asynchronous function form here
    
});

async function fetchImage(searchedDate){
    // console.log(searchedDate);

    try{

        let fetchPromise= await fetch(`https://api.nasa.gov/planetary/apod?&date=${searchedDate}&api_key=${API_KEY}`);
        // if I do not write "await" it will give me the promise 
        // but if I write "await" it will return me the "RESPONSE" object;
        // this "RESPONSE" object in return gives me the promise again 
        // and Now this promise is my dataPromise which has my data

        // console.log(fetchPromise.json());
        console.log(fetchPromise);
        
        let responsePromise= fetchPromise.json();
        responsePromise.then((data)=>{
            let dataObject= data;
            console.log(dataObject);
            console.log(dataObject.url);
            
            //  Sending this dataObject to a function to show APOD in my "html current-image-container div";
            displayImage(dataObject,searchedDate);
        }).catch((error)=>{
            console.log(error);
        })
    }
    catch(error){
        console.log("Error Occured: "+error);
    }
}

function displayImage(dataObject,searchedDate){

    // console.log(searchedDate);
    let img_src_url= dataObject.hdurl;
    let img_explanation= dataObject.explanation;
    let img_title= dataObject.title;
    // console.log(img_src_url);
    // console.log(dataObject.explanation);

    current_img_container.innerHTML=`<div id="this_img_div">
                                        <img src="${img_src_url}" alt="">
                                    </div>
                                    <div id="img_expl_div">
                                        <h2>${img_title}</h2>
                                        <p>${img_explanation}</p>
                                    </div>`;
    let li= document.createElement("li");
    li.innerHTML=`${searchedDate}`;
    li.addEventListener("click",(e)=>{
        let targetli=e.target.remove();
        // console.log(targetli);
        fetchImage(li.innerText);
    })
    // console.log(li);
    search_history.append(li);


}

function saveSearch(searchedDate){

    // console.log("saving");
    let stringArr=JSON.stringify(arr);
    console.log(stringArr);
    localStorage.setItem("mySearches",stringArr);
}
