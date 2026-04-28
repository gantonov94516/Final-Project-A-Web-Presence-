// Created by Gleb Antonov (Firey)
// This file builds the GPU comparison table using a loop

// This array holds all the GPU data
// Each object is one row: name, brand, vram, tflops, msrp, currentPrice, tier
var gpuData = [
    // NVIDIA RTX 40 Series
    { name: "RTX 4090",       brand: "NVIDIA", vram: "24GB GDDR6X", tflops: "82.6",  tdp: "450W", msrp: 1599, current: 2755, tier: "Flagship"    },
    { name: "RTX 4080 Super", brand: "NVIDIA", vram: "16GB GDDR6X", tflops: "52.2",  tdp: "320W", msrp: 999,  current: 1597, tier: "High-End"     },
    { name: "RTX 4070 Super", brand: "NVIDIA", vram: "12GB GDDR6X", tflops: "35.5",  tdp: "220W", msrp: 599,  current: 752,  tier: "RECOMMENDED"  },
    { name: "RTX 4070",       brand: "NVIDIA", vram: "12GB GDDR6X", tflops: "29.1",  tdp: "200W", msrp: 549,  current: 703,  tier: "Mid-Range"    },
    { name: "RTX 4060 Ti",    brand: "NVIDIA", vram: "8GB GDDR6",   tflops: "22.1",  tdp: "165W", msrp: 399,  current: 435,  tier: "Mid-Range"    },
    { name: "RTX 4060",       brand: "NVIDIA", vram: "8GB GDDR6",   tflops: "15.1",  tdp: "115W", msrp: 299,  current: 417,  tier: "Budget"       },

    // AMD RX 7000 Series
    { name: "RX 7900 XTX",   brand: "AMD",    vram: "24GB GDDR6",  tflops: "61.4",  tdp: "355W", msrp: 999,  current: 1334, tier: "High-End"     },
    { name: "RX 7900 XT",    brand: "AMD",    vram: "20GB GDDR6",  tflops: "51.5",  tdp: "315W", msrp: 899,  current: 1129, tier: "High-End"     },
    { name: "RX 7800 XT",    brand: "AMD",    vram: "16GB GDDR6",  tflops: "37.3",  tdp: "263W", msrp: 499,  current: 579,  tier: "RECOMMENDED"  },
    { name: "RX 7600",       brand: "AMD",    vram: "8GB GDDR6",   tflops: "21.5",  tdp: "165W", msrp: 269,  current: 279,  tier: "Budget"       },

    // Intel Arc
    { name: "Arc B580",      brand: "Intel",  vram: "12GB GDDR6",  tflops: "24.6",  tdp: "190W", msrp: 249,  current: 309,  tier: "RECOMMENDED"  }
];

// This array defines what the column headers say
var columnHeaders = [
    "GPU Name", "Brand", "VRAM", "TFLOPs", "TDP", "Tier", "MSRP", "Current Price (Apr 2026)", "vs MSRP"
];

// This function calculates the price difference and returns a formatted string
function getPriceDiff(msrp, current) {
    // This subtracts the MSRP from the current price to find the difference
    var diff = current - msrp;
    // This calculates what percentage the difference is of the MSRP
    var pct = Math.round((diff / msrp) * 100);

    // This checks if the current price is higher than MSRP
    if (diff > 0) {
        // Returns a string showing how much above MSRP it is
        return { text: "+" + pct + "% (+$" + diff + ")", css: "priceAbove" };
    }
    // This checks if the current price is lower than MSRP
    else if (diff < 0) {
        // Returns a string showing how much below MSRP it is
        return { text: pct + "% (-$" + Math.abs(diff) + ")", css: "priceBelow" };
    }
    // This handles the case where it is exactly at MSRP
    else {
        return { text: "At MSRP", css: "priceAt" };
    }
}

// This function builds the whole table and injects it into the page
function buildTable() {

    // This creates the outer table HTML element
    var table = document.createElement("table");

    // This creates the thead element to hold the header row
    var thead = document.createElement("thead");

    // This creates the single header row
    var headerRow = document.createElement("tr");

    // This loop goes through every column header and creates a th cell for it
    for (var h = 0; h < columnHeaders.length; h++) {

        // This creates a th cell
        var th = document.createElement("th");

        // This puts the column name text into the cell
        th.innerHTML = columnHeaders[h];

        // This adds the th into the header row
        headerRow.appendChild(th);
    }

    // This puts the header row inside the thead
    thead.appendChild(headerRow);

    // This puts the thead inside the table
    table.appendChild(thead);

    // This creates the tbody to hold all the data rows
    var tbody = document.createElement("tbody");

    // This is the main loop — it creates one row for each GPU in the data array
    for (var i = 0; i < gpuData.length; i++) {

        // This grabs the current GPU object from the array
        var gpu = gpuData[i];

        // This creates a new table row for this GPU
        var row = document.createElement("tr");

        // This calls the helper function to calculate the price difference
        var diffResult = getPriceDiff(gpu.msrp, gpu.current);

        // This builds the ordered list of values for each column in this row
        var rowValues = [
            gpu.name,
            gpu.brand,
            gpu.vram,
            gpu.tflops + " TFLOPS",
            gpu.tdp,
            gpu.tier,
            "$" + gpu.msrp,
            "$" + gpu.current,
            diffResult.text
        ];

        // This inner loop creates one td cell for each value in the row
        for (var j = 0; j < rowValues.length; j++) {

            // This creates a td cell
            var td = document.createElement("td");

            // This puts the value text into the cell
            td.innerHTML = rowValues[j];

            // This checks if this is the "vs MSRP" column (last column, index 8)
            if (j === 8) {
                // This adds the correct color class based on above/below/at MSRP
                td.classList.add(diffResult.css);
            }

            // This checks if the tier is RECOMMENDED to color it green
            if (j === 5 && rowValues[j] === "RECOMMENDED") {
                td.classList.add("recommended");
            }

            // This adds the finished td cell to the row
            row.appendChild(td);
        }

        // This adds the finished row to the tbody
        tbody.appendChild(row);
    }

    // This adds the tbody into the table
    table.appendChild(tbody);

    // This grabs the container div from the HTML page
    var container = document.getElementById("tableContainer");

    // This puts the finished table into the container on the page
    container.appendChild(table);

    // This updates the row count message below the table using innerHTML
    document.getElementById("rowCount").innerHTML =
        gpuData.length + " GPUs shown. Prices sourced from Amazon and Tom\'s Hardware as of April 2026.";
}

// This calls the function immediately when the JS file loads
buildTable();