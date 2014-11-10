$(document).ready(function(){
    var dropdiv = document.getElementById('dropDiv');
    var file;
        if(typeof jquery != 'undefined'){
        	alert('mam jquery');
        }
    dropdiv.ondragover = function() {
        this.className = 'dropDivClass dragover';
        return false;
    };
    dropdiv.ondragleave = function() {
        this.className = 'dropDivClass';
        return false;
    };
    dropdiv.ondrop = function(e) {
        e.preventDefault();
        this.className = 'dropDivClass';
        file = e.dataTransfer.files[0];
        if (file) {
            var x = readfile(file);
        } else {
            alert('nope');
        }
        return false;
    };

    /* funkcja czytająca txt */
    function readfile(f) {
        if (f) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var contents = e.target.result;

            }
            reader.readAsText(f);
        } else {
            alert("Nie można załadować pliku. Upwnij się, że jego format jest poprawny.");
        }
    }
});