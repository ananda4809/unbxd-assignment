// function to load all clothes (without filtering)
// params - (none)
const getProductList = () => {
	return new Promise((res, rej)=> {
		var xhr = new XMLHttpRequest();
		// xhr.withCredentials = true;
		xhr.addEventListener("readystatechange", function() {
			if(this.readyState === 4) {
		    	// console.log(this.responseText);
		    	res(this.responseText)
			}
		});
		xhr.open("GET", searchProductURL+"&q=*");
		xhr.send();
	})
}

// function to search selected products
// params - Tops, Dresses, Express
const searchForSelectedData = (value) => {
	return new Promise((res, rej)=> {
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", function() {
			if(this.readyState === 4) {
		    	// console.log(this.responseText);
		    	res(this.responseText)
			}
		});
		xhr.open("GET", searchProductURL+"&q="+value);
		xhr.send();
	})
}

function filterData() {
	console.log("Asdasd")
}