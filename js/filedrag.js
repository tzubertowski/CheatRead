$(document).ready(function(){
    var dropdiv = document.getElementById('dropDiv');
    var errorDiv = $('#uploadError');
    var file;
    dropdiv.ondragover = function() {
        errorDiv.switchClass('button-error pure-button', 'uploadErrors', 1000, "easeInOutQuad");
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
        var extension = file.name.split('.').pop();
        if (extension == "txt") {
            var x = readfile(file);
        } else {
            errorDiv.switchClass('uploadErrors', 'button-error pure-button', 1000, "easeInOutQuad");
            errorDiv.html('Cannot load the file. Please check if you are uploading a .txt file.');
        }
        return false;
    };
    function displayPlayer(f) {
        $('#uploadWrapper').addClass('hidden', 200, 'easeInExpo');
        $('body').addClass('monokaiBody', 500, "easeInExpo");
        $('#playerWrapper').removeClass('hidden', 600, "easeInExpo");
        return false;
    };
    /* funkcja czytająca txt */
    function readfile(f) {
        if (f) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var contents = e.target.result;
                var playerOn = displayPlayer(contents);
            }
            reader.readAsText(f);
        } else {
            alert("Nie można załadować pliku. Upwnij się, że jego format jest poprawny.");
        }
    };


});