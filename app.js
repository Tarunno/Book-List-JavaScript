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
		const list = document.querySelectorAll("li"),
			ul = document.querySelector("ul")

		list.forEach((item, i) => {
			var tapedTwice = false;
			item.addEventListener("touchstart", function(e){
				if(!tapedTwice) {
					tapedTwice = true;
				    setTimeout(() => {
						tapedTwice = false;
					}, 300);
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
				document.cookie = "books="+JSON.stringify(carry)+";max-age=" + 30*24*60*60;
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
				document.cookie = "books="+JSON.stringify(carry)+";max-age=" + 30*24*60*60;
			})
		});

	}
}

main()

function main(){
	setTimeout(() => {
		getCookieBook()
	}, 3000)
	setDateTime()
	addBookOption(false)
	addingBook()
}
function getCookieBook(){
	var cookieBook = []
	var cookies = document.cookie.split(";");
	cookies.forEach((item, i) => {
		if(item.split("=")[0] == "books"){
			cookieBook = item.split("=")[1];
		}
	});
	setTimeout(() =>{
		cookieBook = JSON.parse(cookieBook);
		var maxId = 1
		console.log(cookieBook);
		cookieBook.forEach((item, i) => {
			maxId = Math.max(maxId, item.id)
		});
		Book.lastId = maxId
		cookieBook.forEach((item, i) => {
			new Book(item.name, item.author, item.time)
		});
	}, 100)
}

function addingBook(){
	const addBtn = document.querySelector("#submit"),
		inputs = document.querySelector(".inputs")

	addBtn.addEventListener('click', function(){
		const bookName = document.querySelector("#book").value,
			  bookAuthor = document.querySelector("#author").value,
			  readingTime = document.querySelector("#time").value
		if(bookName === "" || bookAuthor === "" || readingTime === ""){
			error(true)
		} else{
			new Book(bookName, bookAuthor, readingTime)
			clearFeilds()
			error(false)
			var books = Book.books
			document.cookie = "books="+JSON.stringify(books)+";max-age=" + 30*24*60*60;
		}
	})
}

function setDateTime(){
	const timeHolder = document.querySelector(".time"),
		dateHolder = document.querySelector(".date")

	update(timeHolder, dateHolder)

	setInterval(() => {
		update(timeHolder, dateHolder)
	}, 1000)

	function update(timeHolder, dateHolder){
		var date = new Date()
		timeHolder.innerHTML = (date.getHours() % 12) + ":" + date.getMinutes() + ":" + date.getSeconds()
		var dateFormat = date.toDateString().split(" ")
		var formated = dateFormat[0] + ", " + dateFormat[2] + " " + dateFormat[1]
		dateHolder.innerHTML = formated
	}
}

function addBookOption(flag){
	const addBookBtn = document.querySelector(".add-book-btn"),
		inputs = document.querySelector(".inputs")
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
		clearFeilds()
	})
}

function clearFeilds(){
	document.querySelector("#book").value = ""
	document.querySelector("#author").value = ""
	document.querySelector("#time").value = ""
}

function error(flag){
	if(flag){
		document.querySelector(".error").innerHTML = "Please fill all the fields"
		document.querySelector(".error").style.color = "red"
	} else {
		document.querySelector(".error").innerHTML = "Book added!"
		document.querySelector(".error").style.color = "green"
	}
}
