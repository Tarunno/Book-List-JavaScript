class Book{
	constructor(name, author, time){
		this.id = this.constructor.lastId
		this.name = name
		this.author = author
		this.time = time

		this.constructor.books.push({
			id: this.id,
			name: this.name,
			author: this.author,
			time: this.time
		})

		this.constructor.showBooks()
		this.constructor.removingBook()
		this.constructor.lastId += 1
	}

	static books = []
	static lastId = 1
	static showBooks(){
		document.querySelector("ul").innerHTML = null
		Book.books.map((item) => {
			document.querySelector("ul").innerHTML +=
				`<li data-id="${item.id}">
					<h1> ${item.id} </h1>
					<div class="book-info">
						<h2> ${item.name} </h2>
						<h5> ${item.author} </h5>
					</div>
					<h1> ${item.time} </h1>
				</li>
				`
		})
	}
	static removingBook(){
		const list = document.querySelectorAll("li")
		const ul = document.querySelector("ul")
		list.forEach((item, i) => {
			var tapedTwice = false;
			item.addEventListener("touchstart", function(e){
				if(!tapedTwice) {
					tapedTwice = true;
				    setTimeout( function() { tapedTwice = false; }, 300 );
					return false;
				}
			 	event.preventDefault();
				ul.removeChild(item)
				var carry = new Array()
				Book.books.forEach((item2) => {
					if(item2.id != item.dataset.id){
						carry.push(item2)
					}
				});
				Book.books = carry
			})
			item.addEventListener("dblclick", function(){
				ul.removeChild(item)
				var carry = new Array()
				Book.books.forEach((item2) => {
					if(item2.id != item.dataset.id){
						carry.push(item2)
					}
				});
				Book.books = carry
			})
		});

	}
}

__main()


function __main(){
	setDateTime()
	addBookOption(false)
	addingBook()
}

function addingBook(){
	const addBtn = document.querySelector("#submit")
	const inputs = document.querySelector(".inputs")
	addBtn.addEventListener('click', function(){
		const bookName = document.querySelector("#book").value,
			  bookAuthor = document.querySelector("#author").value,
			  readingTime = document.querySelector("#time").value
		if(bookName === "" || bookAuthor === "" || readingTime === ""){
			document.querySelector(".error").innerHTML = "Please fill all the fields"
			document.querySelector(".error").style.color = "red"
		} else{
			document.querySelector(".error").innerHTML = "Book added!"
			document.querySelector(".error").style.color = "green"
			new Book(bookName, bookAuthor, readingTime)
		}
	})
}

function setDateTime(){
	const timeHolder = document.querySelector(".time")
	const dateHolder = document.querySelector(".date")
	update(timeHolder, dateHolder)

	setInterval(() => {
		update(timeHolder, dateHolder)
	}, 1000)

	function update(timeHolder, dateHolder){
		var date = new Date()
		timeHolder.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
		var dateFormat = date.toDateString().split(" ")
		var formated = dateFormat[0] + ", " + dateFormat[2] + " " + dateFormat[1]
		dateHolder.innerHTML = formated
	}
}

function addBookOption(flag){
	const addBookBtn = document.querySelector(".add-book-btn")
	const inputs = document.querySelector(".inputs")
	var addBookOpen = flag
	addBookBtn.addEventListener("click", function(){
		if(!addBookOpen){
			inputs.classList.add("show")
			addBookOpen = true
		} else {
			inputs.classList.remove("show")
			addBookOpen = false
		}
		document.querySelector(".error").innerHTML = null
		document.querySelector(".error").style.color = "green"
		document.querySelector("#book").value = ""
		document.querySelector("#author").value = ""
		document.querySelector("#time").value = ""
	})
}
