var app = {
    init : function(){
       /* console.log("init");
        var x = new XMLHttpRequest();
        x.open("GET", "http://kde.link/test/get_field_size.php", true);
        x.onload = function (){
            console.log(x.responseText);
        }
        x.setRequestHeader('Access-Control-Allow-Origin', '*')
        x.setRequestHeader("Content-Type", "text/html");
        x.send(null);*/

        $.ajax({
            url: 'http://kde.link/test/get_field_size.php',
            xhrFields: {
               withCredentials: true
            }
         });

    }
}
