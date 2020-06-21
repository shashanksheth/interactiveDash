function init(){
    d3.json("./data/samples.json").then((d) => {
        //define names
        var names=d.names;
    
        //select dropdown
        var dropdownMenu=d3.select("#selDataset");
    
        //populate dropdown
        names.forEach(i=>dropdownMenu.append("option").attr("value",i).text(i))

        //run the chart-building functions
        barBuilder(d.samples[0]);
        bubbleBuilder(d.samples[0]);
        metaBuilder(d.metadata[0]);
    
    });

}

//Define the optionChange function that is referred to in the HTML
function optionChanged(selection){
    d3.json("./data/samples.json").then((d) => {
        //define data for the selected individual
        var sampleData = d.samples.filter(subject => subject.id==selection)[0];
        var metaData = d.metadata.filter(subject => subject.id==selection)[0];
        
        //run the chart-building functions
        barBuilder(sampleData);
        bubbleBuilder(sampleData);
        metaBuilder(metaData);
    
    });
}

//Bar Chart Function
function barBuilder(data){
    var ids=data.otu_ids.slice(0,10).map(i => `OTU ${i}`).reverse();
    var values=data.sample_values.slice(0,10).reverse();
    var labels=data.otu_labels.slice(0,10).reverse();

    var barData=[{
        x: values,
        y: ids,
        text: labels,
        type:"bar",
        orientation: "h",
    }];
  
    Plotly.newPlot("bar", barData)
}

//Bubble Chart Function
function bubbleBuilder(data){
    var ids=data.otu_ids;
    var values=data.sample_values;
    var labels=data.otu_labels;

    var bubbleData=[{
        x: ids,
        y: values,
        mode:"markers",
        text: labels,
        marker:{
            size:values,
            color:ids,
        },
    }];
  
    Plotly.newPlot("bubble", bubbleData)

}

//Metadata Display Function
function metaBuilder(data){
    infoBox=d3.select("#sample-metadata");
    infoBox.html("");
    Object.keys(data).forEach(key => {
        infoBox.append("p").text(`${key}: ${data[key]}`)
    });
}

init();
