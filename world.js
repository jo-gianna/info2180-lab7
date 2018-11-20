window.onload = function(){
    var country = document.getElementById("country");
    country.after("<label for='all'>Select all countries</label><input type='checkbox' name='all' id='all'/>");
    var button = document.getElementById("lookup");
    button.addEventListener("click", function(){search();}, false);
    
    function search(){
        var all = document.getElementById('all');
        if(all[0].checked)
            ajax_request("all=true");
        else
            ajax_request("country="+document.getElementById("country").value.trim());
    }
    
    function ajax_request(request){
        let requestObject = new XMLHttpRequest();
        var url = "/world.php?"+request;
        var result = document.getElementById("result");
        
        requestObject.onreadystatechange = function(){
            if(this.readyState == XMLHttpRequest.DONE){
                if(this.status == 200){
                    result[0].innerHTML = "<p>"+this.responseText+"<\p>";
                }else{
                    result[0].innerHTML = "Internal Error";
                }
            }
        }
        requestObject.open("GET", url, true);
        requestObject.send();
    }
}