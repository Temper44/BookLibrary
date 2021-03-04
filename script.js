initApp();

function initApp(){
books = [];
document.querySelector("#submitButton").addEventListener("click", receiveInput);
document.querySelector(".books-grid").addEventListener("click", cardInteraction);
document.querySelector("#removeAllButton").addEventListener("click", removeAll);
}

//Book class
class Book{
  constructor(name,author,page,genre,read){
      this.name=name;
      this.author=author;
      this.page=page;
      this.genre=genre;
      this.read=read;
  };

  toString(){
      return this.name+" "+this.author+" "+this.page+" "+this.genre+" "+this.read;
  }    
}


//handle Inputs
function receiveInput(e){
    let name = document.querySelector("#bookInput").value;
    let author = document.querySelector("#authorInput").value;
    let page = document.querySelector("#pageNumberInput").value;
    let genre = document.querySelector("#genreInput").value;
    let read = document.querySelector("#readInput").checked;
    
    //check if valid
    if(checkValid(name,author,page,genre,read)){
        //check if duplicate Name
        if(checkDuplicate(name)){ /* checkDuplicate(name) === undefined) */
            createNewBook(name,author,page,genre,read);
         // clearFields();
            displayBooks();
            updateNumbers();
        }else{
            alert(`The Book: ${name} is already stored!`);
            clearFields();
        }      
    }else{
        alert("Please fill out the text inputs!");
    }
}

//check Valid Input Function 
function checkValid(name,author,page,genre){
    return name!=="" && author!=="" && page !=="" && genre !=="" ? true:false;
}

function checkDuplicate(name){
   /*  let res = books.find(function(item){
       return item.name === name;
    })
    console.log(res);
    return res; */
    let res=false;
    if(books.length>=1){
        books.forEach((item) =>{
            if(item.name===name){
                res=false;
                return res;
            }else{
                res=true;
            }
         })
    }else{
        res=true; 
    }
    console.log(res);
    return res;
}

// create new Book an store it in array
function createNewBook(name,author,page,genre,read){
    let book = new Book(name,author,page,genre,read);
    addBook(book);
}



// Add Book to Array
 function addBook(book){
    books.push(book);
   // console.log(books);
} 

 // Clears Input Fields
function clearFields(){
    document.querySelector("#bookInput").value="";
    document.querySelector("#authorInput").value="";
    document.querySelector("#pageNumberInput").value="";
    document.querySelector("#genreInput").value="";
    document.querySelector("#readInput").checked=false;
} 

//display books of array
function displayBooks(){
    let str = "";
    let grid = document.querySelector(".books-grid");
     books.forEach(function(item){
        let readH = readStatus(item);
        let btnTheme = btnThemeColor(item);
       // console.log(readH);
        str+=
        `
        <div class="card">
        <div class="card-content">
          <div class="media">          
            <div class="media-content">
              <p class="title is-4" id="bookName">${item.name}</p>
            </div>
          </div>
          <div class="content">
            <div class="container block">
              <p class="title is-6">
                <span class="has-text-weight-medium">Author: </span>
                <span>${item.author}</span>
              </p>
              <p class="title is-6">
                <strong>Pages: </strong><span>${item.page}</span>
              </p>
              <p class="title is-6">
                <strong>Genre: </strong><span>${item.genre}</span>
              </p>
            </div>
            <div class="field is-grouped">
              <p class="control">
                <button class="button is-${btnTheme}" id="readButton">
                  ${readH}
                </button>
              </p>
              <p class="control">
                <button class="button is-danger removeButton">remove</button>
              </p>
            </div>
          </div>
        </div>
      </div>
   
        `
        grid.innerHTML=str;
    });
}

function readStatus(item){
    return item.read===true?"read":"not read";
}

function btnThemeColor(item){
    return item.read===true?"success":"primary";
}

//decide what to do with given interaction
function cardInteraction(e){
   // console.log(e.target.closest(".card"));
   console.log(e.target);
      if(e.target.id=="readButton"){
          //toggle
          let currentBookName = e.target.closest(".card-content").firstElementChild.firstElementChild.firstElementChild.textContent
          toggleRead(e.target,currentBookName);
          updateNumbers();
      }else if(e.target.className=="button is-danger removeButton"){
          //delete
          let currentBookName = e.target.closest(".card-content").firstElementChild.firstElementChild.firstElementChild.textContent
          e.target.closest(".card").remove();
          removeBookOfArray(currentBookName)
          displayBooks();
          updateNumbers();
      }
}
//Remove book from array
 function removeBookOfArray(book){
   books.forEach(function(item){
        if(item.name === book){
            var index = books.indexOf(item);
             if (index !== -1) {
                books.splice(index, 1);
            }          
        }
    }); 
} 

//Toggle read/not read
function toggleRead(readButton,currentBookName){
    status = readButton.textContent.trim();
    if(status === "read"){
        //console.log("change to not read");
        changeReadStatusOfArray(false,currentBookName);   

        readButton.textContent="not read";
        readButton.classList.remove("is-success");
        readButton.classList.add("is-primary");
    }else if(status === "not read"){
       // console.log("change to read");
        changeReadStatusOfArray(true,currentBookName);        

        readButton.textContent="read";
        readButton.classList.remove("is-primary");
        readButton.classList.add("is-success");
    }
}

//change Ready Status of Books in Array
function changeReadStatusOfArray(bool,currentBookName){
    books.forEach(function(item){
        if(item.name===currentBookName){
            bool? item.read = true : item.read = false;
        }
    });
}

// Update the book Numbers
function updateNumbers(){
    let totalBooksNumber=document.querySelector("#totalBooksNumber");
    let readNumber=document.querySelector("#readNumber");
    let notReadNumber=document.querySelector("#notReadNumber");
    
    totalBooksNumber.textContent=books.length;
    let count=0;
    for(let item of books){
      if(item.read===true){
        count++;      
      }       
    }
    readNumber.textContent=count;
    notReadNumber.textContent=books.length-count;
}

//Remove All books from Array and  HTML
function removeAll(){
  document.querySelector(".books-grid").innerHTML="";
  books=[];
  displayBooks();
  updateNumbers();
}