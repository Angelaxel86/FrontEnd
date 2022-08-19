Array.prototype.multiply = function (index) {
	return this.map( (e) => e * index ) 
}

console.dir(Array);

let arr = [1,2,3,4];

let newArr = arr.multiply(3);

console.log(newArr)