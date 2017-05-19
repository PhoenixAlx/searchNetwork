class menu{
    constructor(container){
        this.name_container=container;
        this.active=false;
        this.addPrincipalHTML();
        this.addPrincipalCSS();
        this.addPrincipalEvent();
    }
    
    addPrincipalHTML(){
        var botton_menu='<img id="menu_img" src="img/menu.png" class="botton_menu"></img>';
        var navegation='<nav id="nav_menu" ><ul id="nav_ul_menu"></ul></nav>';
        var div_container=document.getElementById(this.name_container);
        div_container.innerHTML=botton_menu+navegation;
        
    }
    addPrincipalCSS(){
        this.addCSSRule(document.styleSheets[0], ".botton_menu", "width: 40px;height:60px",1);
        document.getElementById(this.name_container).classList.add('menu_'+this.name_container);
        this.addCSSRule(document.styleSheets[0], 'summary::-webkit-details-marker', "display: none",1);
        this.addCSSRule(document.styleSheets[0], '.menu_'+this.name_container, "display:block;z-index:1000;position:absolute",1);
        this.addCSSRule(document.styleSheets[0], '.menu_'+this.name_container+" nav", "display:none;width:100%;border: solid 2px #000000; border-radius: 5px;",1);
        this.addCSSRule(document.styleSheets[0], '.menu_'+this.name_container+" nav ul", "overflow:hidden;list-style:none;padding: 0;margin:0;text-align:center",1);
        this.addCSSRule(document.styleSheets[0], '.menu_'+this.name_container+" nav li", "border-bottom: solid 1px #000000;",1);
        
        this.addCSSRule(document.styleSheets[0], '.menu_li_1 p ', "padding:10px;font-size:120%;text-transform: uppercase;font-weight: bold;",1);
        this.addCSSRule(document.styleSheets[0], '.menu_li_2  ', "border-bottom: solid 0px #000000 !important;",1);
        this.addCSSRule(document.styleSheets[0], '.menu_li_1 .menu_li_2 p ', "padding:10px;font-size:60%;font-weight:normal;",1);
        
        
        
    }
    addPrincipalEvent(){
        var botton_menu=document.getElementById("menu_img");
        botton_menu.addEventListener("click", this.activeMenu);
    }
    
    addPrincipalOptions(dict_options){
        //each option is a <li>
        var list_options=Object.keys(dict_options);
        var total_options="";
        var menu_li_2=[];
        var nav_ul_menu=document.getElementById("nav_ul_menu");
        for (var i=0;i<list_options.length;i++){
            total_options=total_options+'<li id="menu_li_option_'+i+'" class="menu_li_1"><details><summary><p><span >'+list_options[i]+'</span></p></summary>';
            if (dict_options[list_options[i]].length>0){
                var suboptions='<ul id="menu_li_option_'+i+'_2">';
                menu_li_2.push("menu_li_option_"+i);
                //this.addCSSRule(document.styleSheets[0], '#'+"menu_li_option_"+i+"_2", "display:none",1);
                for (var j=0;j<dict_options[list_options[i]].length;j++){
                    suboptions=suboptions+'<li id="menu_li_option_'+i+'_'+j+'" class="menu_li_2"><p><span>'+dict_options[list_options[i]][j]+'</span></p>';
                   
                }
                suboptions=suboptions+'</ul>';
                total_options=total_options+suboptions;
            }
            total_options=total_options+'</details></li>';
        }
        nav_ul_menu.innerHTML=total_options;
        /*if (menu_li_2.length>0){
            this.addEventMenus2(menu_li_2)
        }*/
        
    }
    addSecundaryOptions(list_options){
        //each option is a <li>
        var total_options="";
        var nav_ul_menu=document.getElementById("nav_ul_menu");
        for (var i=0;i<list_options.length;i++){
            total_options=total_options+'<li id="menu_li_option_'+i+'" class="menu_li_1"><p><span>'+list_options[i]+'</span></p></li>';
        }
        nav_ul_menu.innerHTML=total_options;
    }
    activeMenu(){
        var navegation=document.getElementById("nav_menu");
        if (this.active){
            navegation.style.display="none";
        }else{
            navegation.style.display="block";
        }
        this.active = !this.active;
    }
    
    addCSSRule(sheet, selector, rules, index) {
        if("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    }

}
