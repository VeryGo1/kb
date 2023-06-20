/**
 * 对元素进行排序
 * @param num_div 	容器对象
 * @param type		排序方法，desc：反序 asc：正序
 * @returns
 */
function sortNum(num_div, type="desc") {
	var divTestJQ = num_div; //取得容器对象
    var divJQ = $(">li.sort_div", divTestJQ); //取容器需要重排的对象
    var EntityList = []; //定义一个数组用于存放要排序的对象
    divJQ.each(function () {
        var thisJQ = $(this);
        EntityList.push({ Name: parseInt(thisJQ.attr("data-sort")), JQ: thisJQ }); //把要排序的对象和排序的值一起放到一个新的对象里，并存入到数组
    });
    EntityList.sort(function (a, b) { //利用数组的排序方法重新排序对象
    	if(type == "desc") {
            return b.Name - a.Name; //从大到小
    	} else {
            return a.Name - b.Name; //从小到大
    	}
    });
    for (var i = 0; i < EntityList.length; i++) {
        EntityList[i].JQ.appendTo(divTestJQ); //把排序完的对象重新插入到容器对象
    };
}