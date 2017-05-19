
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
        this.datas={"nodes":[],"links":[]};
    }
    posNode(node_name){
        for (var i=0;i<this.datas.nodes.length;i++){
            if (this.datas.nodes[i].name ==node_name){
                return i;
            }
        }
        return -1;
    }
    addDatas(){
        this.force.nodes(this.datas.nodes).links(this.datas.links).start();
    }
    forceTicks(){
        this.addDatas();
        var nodes = this.svg.selectAll(".node");
        this.force.on("tick", ()=> {
                this.svg.selectAll(".link").attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
                nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
    }
    putNode(data_node){
        var name_node=data_node.name;
        var node_exist = document.getElementsByClassName(name_node);
        var node=null;
        if (node_exist.length==0){
            this.datas.nodes.push(data_node);
            node = this.svg.selectAll("."+name_node).data([data_node]).enter().append("g").attr("class", "node "+name_node).call(this.force.drag);
            node.append("circle").attr("r",function(d) { return d.weigth }).style("fill", function(d) { return d.color; });
            this.addTextNode(name_node);
            this.forceTicks();
        }
        return node;
    }
    removeNode(name_node){
        var node=this.svg.selectAll("."+name_node);
        node.remove();
        var pos_node=this.posNode(name_node);
        this.datas.nodes.splice(pos_node, 1);
        this.forceTicks();
    }
    addTextNode(name_node){
        var node = this.svg.selectAll("."+name_node);
        node.append("text").attr("dx", function(d) { return (-d.weigth)+"px" }).attr("dy", function(d) { return (10+d.weigth)+"px" }).text(function(d) { return d.name });
        return node;
    }
    putLink(i,j){
        var link_new={"source":i,"target":j,"weight":3,"type":0}
        this.datas.links.push(link_new);
        //var link = svg.append("g").selectAll(".link");
        this.force.start();
        var link=this.link.data(datas.links);
        link.enter().insert("line")
                    .attr("class", "link")
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; })
                    .style("stroke-width", function(d) { console.log("line ",d);return Math.sqrt(d.weight); });
        link.exit().remove();
        return link_new;
    }
    removeLink(d){
        var datas=this.datas;
        var li= this.svg.selectAll(".link");
        this.force.start();
                    var li=this.link.data(this.datas.links);
                    li.exit().remove();
        var datasjson_links_new = datas.links.slice(0);
        var datasjson_links_remove = [];
        console.log("this.datas ",this.datas)
        console.log("datasjson.links.length antes",datas.links.length);
        for (var i=0;i<datas.links.length;i++){
            
            var l=datas.links[i];
            
            if (l.source.name==d.name || l.target.name == d.name){
                console.log("d ",d);
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
            
        }
       
        console.log ("datasjson_links_new ",datasjson_links_new)
        //save only links with it
        datas.links=datasjson_links_new;
        console.log("datasjson.links.length despres ",datas.links.length);
        //var link=this.link;
         console.log("link ",li);
        var li_data=li.data(datas.links);
        li_data.enter().insert("line", ".node")
                .attr("class", "link")
                .style("stroke-width", function(a) { console.log("a ",a);return Math.sqrt(a.weight); });
        li_data.exit().remove();
        this.force.start();
        
    }
    creatNetwork(datasjson) {
        this.addDatas();
        for (var i=0;i<datasjson.nodes.length;i++){
            var node_new = this.putNode(datasjson.nodes[i]);
            this.addDatas();         
        }

        //node.on("click",(d,i)=>{
                //if (d.selected){
                    //d3.select(node[0][i].childNodes[0]).style("fill", d.color);
                    
                    
                    
                    ////found all its links 

                    //this.removeLink(d);
                    //console.log("datasjson.links.length ",datasjson.links.length);

                    
                    
                //}else{
                    ////change color
                    //d3.select(node[0][i].childNodes[0]).style("fill", "#ff9780");
                    ////search other nodes selected
                    //var nodes_selected=[];
                    //var pos_node=0;
                    //for (var i=0;i<datasjson.nodes.length;i++){
                        //var node_b=datasjson.nodes[i];
                        //if (node_b.selected && node_b.name !=d.name ){
                            ////add node to list
                            //nodes_selected.push(i)
                        //}
                        //if (node_b.name ==d.name){
                            //pos_node = i;
                        //}
                    //}
                    
                    ////chose a node of list nodes_selected and link both
                    
                    //if (nodes_selected.length>0){
                        //var node_b_chose=nodes_selected[Math.floor(Math.random() * nodes_selected.length)];
                        //this.putLink(pos_node,node_b_chose);

                    //}
                //}
                //d.selected= !d.selected;
            //});
            //node.append("text")
                //.attr("dx", function(d) { return (-d.weigth)+"px" })
                //.attr("dy", function(d) { return (10+d.weigth)+"px" })
                //.text(function(d) { return d.name });

            //var svg=this.svg;
            //this.force.on("tick", function() {
                //svg.selectAll(".link").attr("x1", function(d) { return d.source.x; })
                //.attr("y1", function(d) { return d.source.y; })
                //.attr("x2", function(d) { return d.target.x; })
                //.attr("y2", function(d) { return d.target.y; });
                //node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            //});
        //var link = this.svg.selectAll(".link");
        //this.link=link;
        //link=link.data(datasjson.links);
        
        //link.enter().insert("line", ".node")
            //.attr("class", "link")
            //.style("stroke-width", function(d) { return Math.sqrt(d.weight); });
        //link.exit().remove();
        //var rectangle = this.svg.append("svg:image")
              //.attr("x", 0)
              //.attr("y", 0)
              //.attr("width", 40)
              //.attr("height", 60)
              //.attr("xlink:href", "img/menu.png");
    }
}
