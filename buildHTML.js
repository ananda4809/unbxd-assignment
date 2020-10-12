// function to create dynamic table data 
// params - products details 
const dynamicCreateTable = (products) => {
	return new Promise((res, rej)=> {
		let i = 0;
		let countPerRow = numberOfItemsPerRow;
		let tableData = "<tbody>";
		while(i<products.length) {
			tableData += "<tr>";
			if(products.length - i > countPerRow) {
				for (let j=0; j<countPerRow; j++) {
					let moreInfoUrl = urlForMoreInfo+"pid="+products[i]["sku"];
					tableData += `
					<td>
						<div class="eachImage" align="center">
							<img src="${products[i]["productImage"]}" class="imageCSS"/>
							<a href="${moreInfoUrl}" target="_blank" class="caption">${products[i]["title"].toUpperCase()}</a>
							<span class="price">Price: $${products[i]["sortPrice"]}</span>
						</div>
					</td>`;
					i++;
				}
			}
			else {
				countPerRow = products.length - i;
				for (let j=0; j<countPerRow; j++) {
					let moreInfoUrl = urlForMoreInfo+"pid="+products[i]["sku"];
					tableData += `
					<td>
						<div class="eachImage" align="center">
							<img src="${products[i]["productImage"]}" class="imageCSS"/>
							<a href="${moreInfoUrl}" target="_blank" class="caption">${products[i]["title"].toUpperCase()}</a>
							<span class="price">Price: $${products[i]["sortPrice"]}</span>
						</div>
					</td>`;
					i++;
				}
			}
			tableData += "</tr>";
		}
		tableData += "</tbody>";
		res(tableData);
	})
}


// function to create the facets dat
// params - facets data array 
const buildFacets = (facetsData)=> {
	return new Promise((res, rej)=> {
		let keys = Object.keys(facetsData);
		let editedData = keys.map((eachKey)=> { 	
			return (["neww", "Reviews", "Abhishek_test", "Avinash_category", "Cost"]).includes(facetsData[eachKey]["displayName"]) ? null : facetsData[eachKey]
		}).filter((eachData)=>{ return eachData!=null});

		let editedDataKeys = Object.keys(editedData);
		let newData = editedData.map((eachData)=> {
			let values = eachData["values"].filter((eachValue)=> { return isNaN(eachValue)})
			return values.length > 0 ? {
				"name": eachData["displayName"],
				"values": values
			} : null
		}).filter((eachData)=> { return eachData != null})

		let divData = [...newData].map((eachFacet)=> {
			let checkBoxesHTML = "";
			for(let i=0; i<eachFacet["values"].length; i++) {
				checkBoxesHTML += `<input class="${eachFacet["name"]}" onclick="filterProducts(this, '${eachFacet["name"]}', '${eachFacet["values"][i]}')" type="checkbox" name=${eachFacet["values"][i]} value=${eachFacet["values"][i]} />
				<label for=${eachFacet["values"][i]}> ${eachFacet["values"][i]} </label><br/>`;
			}
			return `
			<div class="filterDiv">
				<div><strong>${eachFacet["name"]}</strong></div>
				<div>${checkBoxesHTML}</div>
			</div>
			<br/>
			`
		}).join("");

		res(divData)
		
	})
}
