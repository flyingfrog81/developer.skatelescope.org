   jQuery(function(){
   // override table header defaults for the theme
   var tbstart = "<table class=\"docutils align-default\"  style=\"width: 100%;\"><colgroup>" +
                 "<col style=\"width: 20%;\" /><col style=\"width: 80%;\" /></colgroup><thead>" + 
                 "<tr class=\"row-odd\"><th class=\"head\"  style=\"width: 20%;\"><p>Documentation</p></th>" +
                 "<th class=\"head\"  style=\"width: 80%;\"><p>Gitlab repository</p></th></tr></thead><tbody>" ;
       var pg1 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&page=1";
       var pg2 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&page=2";
       var pg3 = "https://gitlab.com/api/v4/groups/3180705/projects?per_page=100&simple=true&archived=false&page=3";
       var readthedocs_prepend="ska-telescope-" // all the readthedocs projects start with ska-telescope- next to their name
       var list = $("#list-of-non-grouped-projects table");
       if( list.length ){
           list.empty();
           // add all pages
           //
           $.getJSON(pg1, function(data1){
            $.getJSON(pg2, function(data2){
             $.getJSON(pg3, function(data3){
               item = ""
               data = data1.concat(data2,data3);
               data.sort((a, b) => a["name"].localeCompare(b["name"]));      
               $.each(data, function(key, val){
                  if(val["description"])
                      description = val["description"];
                  else
                      description = "";
                  gitlab_url = val["web_url"];
                  name = val["name"];
                  path = val["path"];
                  docs_name = path.replace(/\./g,"");
                  if(name == "developer.skatelescope.org")
                      docs_url = "https://developer.skatelescope.org";
                  else if(name == "web-maxiv-tangogql")
                      docs_url = "https://web-maxiv-tangogql.readthedocs.io";
                  else if(name == "webjive")
                      docs_url = "https://webjive.readthedocs.io";
                  else if(name == "WebJive Dashboards")
                      docs_url = "https://webjive-dashboards.readthedocs.io";
                  else if(name == "WebJive Auth")
                      docs_url = "https://webjive-auth.readthedocs.io";
                   else
                       docs_url = "https://developer.skatelescope.org/projects/" + docs_name;
                  item = item + "<tr>" +
                       "<td >" +"<a href=\"" + docs_url + "/en/latest/?badge=latest\" >" + 
                           "<img src=\"https://readthedocs.org/projects/" + readthedocs_prepend + 
                         docs_name + "/badge/?version=latest\" alt=\"Documentation Status\" style=\"width:100%\" /> " +  "</a></td>" +
                        "<td><a alt=\"repo url on gitlab\" href=\"" + gitlab_url + "\">" + name + "</a><br>" + description +
                       "</td>" +
                        "</tr>";
               }); //end each
                  item = tbstart + item + "</tbody></table></div>";        
                       $(item).appendTo(list);
            }); //end getJSON
           }); //end getJSON
           }); //end getJSON
       }
    });
