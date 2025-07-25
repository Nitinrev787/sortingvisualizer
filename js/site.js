var unsorted;

function randomize()
{
    //Gets number of bars, initializes an array of size barAmount, and gets bars div
    //Resets inner htm so multiple arrays are not displayed or created
    let barAmount = document.getElementById("arraySize").value;
    let array = new Array(parseInt(barAmount));
    let bars = document.getElementById("bars");
    bars.innerHTML = "";
    //Runs a for loop and adds random number at erach index in array
    //Displays bar after giving it the height and background color by adding it to bars
    for(let x = 0; x < barAmount; x++)
    {
        array[x] = Math.floor(Math.random() * 400);
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = (array[x] * 1.75 + 100) + "px";
        bar.style.backgroundColor = "rgb(4, 40, 82)";
        bars.appendChild(bar);
    }
    unsorted = array;
}

function sort()
{
    //Gets selected sort and calls appropriate sort using the selectedSort as a switch
    let selectedSort = document.getElementById("selectedSort").value;
    let speed = document.getElementById("speed").value;
    switch(selectedSort)
    {
        case "bubble":
            bubbleSort(speed);
            break;
        case "insertion":
            insertionSort(speed);
            break;
        case "merge":
            mergeSort(unsorted, speed);
            break;
        //case "quick":
            //quickSort(unsorted, 0, unsorted.length - 1, speed);
            //break;
    }
}

function sleep(speed)
{
    //Delays sort by given speed
    return new Promise((resolve) => setTimeout(resolve, speed));
}

async function bubbleSort(speed)
{
    //Gets all bars
    let bars = document.getElementsByClassName("bar");
    //For loop goes through all indexes
    for(let x = 0; x < unsorted.length; x++)
    {   
        let y = 0;
        //y goes up to one less index each time, as after each loop the last index is in its final position
        while(y < unsorted.length - x)
        {
            // Swaps indexes and colors them lightgreen
            if(unsorted[y] > unsorted[y+1])
            {
                // All indexes not being switched are original color
                for(let z = 0; z < bars.length; z++)
                {
                    if(z !== y && z !== y+1)
                    {
                        bars[z].style.backgroundColor = "rgb(4, 40, 82)"
                    }
                }
                temp = unsorted[y];
                unsorted[y] = unsorted[y+1];
                unsorted[y + 1] = temp;
                bars[y].style.height = (unsorted[y] * 1.75 + 100) + "px";
                bars[y].style.backgroundColor = "lightgreen";
                bars[y+1].style.height = (unsorted[y+1] * 1.75 + 100) + "px";
                bars[y+1].style.backgroundColor = "lightgreen";
                await sleep(speed);
            }
            y++;
        }
        await sleep(speed);
    }
    return unsorted;
}

async function insertionSort(speed)
{
    //Gets all bars
    let bars = document.getElementsByClassName("bar");
    // Runs for loop through all values in array, key equals the value at x
    for(let x = 0; x < unsorted.length; x++)
    {
        let key = unsorted[x];
        let y = x - 1;
        // While the value at y is less than the key, switches the indexes and bumps all indexes up by 1
        while(y >= 0 && unsorted[y] > key)
        {
            unsorted[y+1] = unsorted[y];
            bars[y+1].style.height = (unsorted[y+1]*1.75+100)+"px";
            bars[y+1].style.backgroundColor = "lightgreen";
            await sleep(speed);
            for(let z = 0; z < bars.length;z++)
            {
                if(z != y+1)
                {
                    bars[z].style.backgroundColor = "rgb(4, 40, 82)";
                }
            }
            y -= 1;
        }
        unsorted[y+1] = key;
        bars[y+1].style.height = (unsorted[y+1]*1.75+100)+"px";
        await sleep(speed);
    }
    // Sets all bars back to original
    for(let z = 0; z < bars.length;z++)
    {
        bars[z].style.backgroundColor = "rgb(4, 40, 82)";
    }
    return unsorted;           
}

async function mergeSort(unsorted, speed)
{
    //Gets all bars
    let bars = document.getElementsByClassName("bar");
    // Base case
    if(unsorted.length < 2)
    {
        return unsorted;
    }
    // Sets the middle value of the array and splits the array into two halves
    // Recursively calls itself until base case is reached
    const middle = Math.floor(unsorted.length/2);
    const leftHalf = unsorted.slice(0, middle);
    const rightHalf = unsorted.slice(middle);
    let half = await mergeSort(leftHalf, speed);
    await mergeSort(rightHalf, speed);
    let leftIndex = 0;
    let rightIndex = 0;
    let mergedIndex = 0;
    //While the left index is in the left half and the right index is in the right half
    //If the value in the left index is less than the right index, the value at the merged index is the left index value
    //Else the value at the merged is the right index value
    while(leftIndex < leftHalf.length && rightIndex < rightHalf.length)
    {
        if(leftHalf[leftIndex] < rightHalf[rightIndex])
        {
            unsorted[mergedIndex] = leftHalf[leftIndex];
            leftIndex++;
        }
        else
        {
            unsorted[mergedIndex] = rightHalf[rightIndex];
            rightIndex++;
        }
        // Left half is lightgreen
        bars[mergedIndex].style.height = (unsorted[mergedIndex] * 1.75 + 100)+"px";
        bars[mergedIndex].style.backgroundColor = "lightgreen";
        //Right half is yellow
        if(mergedIndex + unsorted.length < bars.length)
        {
            bars[mergedIndex + unsorted.length].style.height = (unsorted[mergedIndex] * 1.75 + 100)+"px";
            bars[mergedIndex + unsorted.length].style.backgroundColor = "yellow";
        }
        await sleep(speed);
        mergedIndex ++;
    }
    //Sets the heights for both halves
    while(leftIndex < leftHalf.length)
    {
        unsorted[mergedIndex] = leftHalf[leftIndex];
        bars[mergedIndex].style.height = (unsorted[mergedIndex] * 1.75 + 100) + "px";
        bars[mergedIndex].style.backgroundColor = "lightgreen";
        await sleep(speed);
        leftIndex ++;
        mergedIndex ++;
    }
    while(rightIndex < rightHalf.length)
    {
        unsorted[mergedIndex] = rightHalf[rightIndex];
        bars[mergedIndex].style.height = (unsorted[mergedIndex] * 1.75 + 100) + "px";
        bars[mergedIndex].style.backgroundColor = "lightgreen";
        await sleep(speed);
        rightIndex ++;
        mergedIndex ++;
    }
    //Resets all bars to original color
    for(let x = 0; x < bars.length; x++)
    {
        bars[x].style.backgroundColor = "rgb(4, 40, 82)";
    }
    return unsorted;
}