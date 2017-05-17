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
        this.datas=null;
    }
    createMenu(){
        
    }
    putLink(i,j){
        var datas=this.datas;
        var force=this.force;
        var link_new={"source":i,"target":j,"weight":3,"type":0}
        datas.links.push(link_new());
        //var link = svg.append("g").selectAll(".link");
        force.start();
        link=link.data(datas.links);
        link.enter().insert("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) { return Math.sqrt(d.weight); });
        link.exit().remove();
        return link_new;
    }

    creatNetwork(datasjson) {
        this.datas=datasjson;
        var force = this.force;
        force
              .nodes(datasjson.nodes)
              .links(datasjson.links)
              .start();
        
        

        var node = this.svg.selectAll(".node")
            .data(datasjson.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(this.force.drag);
        
        node.append("circle")
            .attr("r",function(d) { return d.weigth })
            .style("fill", function(d) { return d.color; })
            .on("click",function(d){
                console.log("d.selected ",d.selected);
                if (d.selected){
                    d3.select(this).style("fill", d.color);
                    console.log("this ",this)
                    //who am i
                    pos_node=0;
                    for (var i=0;i<datasjson.nodes.length;i++){
                        node_b=datasjson.nodes[i];
                        if (node_b.name ==d.name){
                            pos_node = i;
                        }
                    }
                    
                    
                    //found all its links 
                    force.start();
                    link=link.data(datasjson.links);
                    link.exit().remove();
                    var datasjson_links_new = datasjson.links.slice(0);
                    var datasjson_links_remove = [];
                    console.log("datasjson.links.length ",datasjson.links.length);
                    for (var i=0;i<datasjson.links.length;i++){
                        
                        var l=datasjson.links[i];
                        console.log("i antes",i);
                        if (l.source.name==d.name || l.target.name == d.name){
                            var pos_l=datasjson_links_new.indexOf(l)
                            datasjson_links_new.splice(pos_l, 1);
                            datasjson_links_remove.push(l);
                            //if target o source are alone then must link to another node of the network
                            if (datasjson_links_new.length>0){
                                if (l.source.name==d.name){
                                    //then the alone is the target
                                    
                                }else {
                                     //then the alone is the source
                                }
                            }else{
                            }
                            
                        }
                        console.log("datasjson.links.length ",datasjson.links.length);
                    }
                    console.log ("datasjson_links_new ",datasjson_links_new)
                    //save only links with it
                    datasjson.links=datasjson_links_new;
                    
                    link=link.data(datasjson.links);
                    link.enter().insert("line", ".node")
                            .attr("class", "link")
                            .style("stroke-width", function(d) { return Math.sqrt(d.weight); });
                    link.exit().remove();
                    force.start();
                    
                    
                }else{
                    //change color
                    d3.select(this).style("fill", "#ff9780");
                    //search other nodes selected
                    var nodes_selected=[];
                    var pos_node=0;
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
                        this.putLink(pos_node,node_b_chose);

                    }
                }
                d.selected= !d.selected;
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
        var link = this.svg.selectAll(".link");
        link=link.data(datasjson.links);
        
        link.enter().insert("line", ".node")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.weight); });
        link.exit().remove();
        var rectangle = this.svg.append("svg:image")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", 40)
              .attr("height", 60)
              .attr("xlink:href", "img/menu.png");
    }
}
