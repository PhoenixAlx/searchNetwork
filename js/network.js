class searcher{
    constructor(container){
        //this.datas = JSON.parse(data);
        this.width = 960//maybe responsive?
        this.height = 500;
        this.svg = d3.select(container).append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
        this.force = d3.layout.force()
            .gravity(.01)
            .distance(100)
            .charge(-100)
            .size([this.width, this.height]);
    }
    creatNetwork(datasjson) {
        var force = this.force;
        force
              .nodes(datasjson.nodes)
              .links(datasjson.links)
              .start();

        var link = this.svg.selectAll(".link");
        link=link.data(datasjson.links);
        link.exit().remove();
        link=link.enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

        var node = this.svg.selectAll(".node")
            .data(datasjson.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(this.force.drag);
        
        node.append("circle")
            .attr("r",function(d) { return d.weigth })
            .style("fill", function(d) { return d.color; })
            .on("click",function(d){
                if (d.selected){
                d3.select(this).style("fill", d.color);
                //who am i
                pos_node=0;
                for (var i=0;i<datasjson.nodes.length;i++){
                    node_b=datasjson.nodes[i];
                    if (node_b.name ==d.name){
                        pos_node = i;
                    }
                }
                //found all its links 
                datasjson_links_new = datasjson.links;
                //save only links with it
                datasjson.links=datasjson_links_new;
                this.force.start();
                link=link.data(datasjson.links);
                //link.exit().remove();
                link=link.enter().insert("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) { return Math.sqrt(d.weight); });
                }else{
                    //change color
                    d3.select(this).style("fill", "#ff9780");
                    //search other nodes selected
                    var nodes_selected=[];
                    var pos_node=0;
                    console.log("hasta aquí bien antes del for")
                    for (var i=0;i<datasjson.nodes.length;i++){
                        var node_b=datasjson.nodes[i];
                        if (node_b.selected && node_b.name !=d.name ){
                            //add node to list
                            nodes_selected.push(i)
                        }
                        if (node_b.name ==d.name){
                            pos_node = i;
                        }
                    }
                    //chose a node of list nodes_selected and link both
                    
                    if (nodes_selected.length>0){
                        var node_b_chose=nodes_selected[Math.floor(Math.random() * nodes_selected.length)];
                        datasjson.links.push({"source":pos_node,"target":node_b_chose,"weight":3});
                        //var link = svg.append("g").selectAll(".link");
                        force.start();
                        link=link.data(datasjson.links);
                        //link.exit().remove();
                        link=link.enter().insert("line")
                            .attr("class", "link")
                            .style("stroke-width", function(d) { return Math.sqrt(d.weight); });
                            
                            
                            

                    }
                }
                d.selected= ! d.selected;
            });
            node.append("text")
                .attr("dx", function(d) { return (-d.weigth)+"px" })
                .attr("dy", function(d) { return (10+d.weigth)+"px" })
                .text(function(d) { return d.name });

            var svg=this.svg;
            this.force.on("tick", function() {
                svg.selectAll(".link").attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
                node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            });
    }
}
