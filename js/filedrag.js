$(document).ready(function() {
    var myFile;
    var fileContent;
    var dDelay;
    var dropdiv = document.getElementById('dropDiv');
    var errorDiv = $('#uploadError');
    var textDiv = $('#textReader');
    var file;
    $('#dropDiv').click(function(e) {
        e.preventDefault();
        $('#hiddenUpload').trigger('click');
        myFile = $('#hiddenUpload').prop('files');
    });
    $('#hiddenUpload').change(function(e) {
        myFile = document.getElementById('hiddenUpload').files[0];
        var extension = myFile.name.split('.').pop();
        if (extension == "txt") {
            var x = readfile(myFile);
        } else {
            errorDiv.switchClass('uploadErrors', 'button-error pure-button', 1000, "easeInOutQuad");
            errorDiv.html('Cannot load the file. Please check if you are uploading a .txt file.');
        }
    });
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

    function displayWithDelay(elementToDisplay, dDelay) {
        setTimeout(function() {
            if (elementToDisplay.indexOf('†') >= 0) {
                menuDisplay = displayUploadMenu();
            }
            textDiv.html(elementToDisplay);
        }, dDelay);
    };

    function displayUploadMenu() {
        $('body').removeClass('monokaiBody', 500, 'easeInExpo');
        $('#playerWrapper').addClass('hidden', 600, "easeInExpo");
        $('#ribbon').removeClass('hidden');
        $('#uploadWrapper').removeClass('hidden');
    }

    function displayPlayer() {
        $('#uploadWrapper').addClass('hidden', 200, 'easeInExpo');
        $('#ribbon').addClass('hidden', 200, 'easeInExpo');
        $('body').addClass('monokaiBody', 500, "easeInExpo");
        $('#playerWrapper').removeClass('hidden', 600, "easeInExpo");
    };
    $('#startDisplayingButton').click(function() {
        var startDisplayLoop = displayTextField(fileContent);
    });

    function displayTextField(f) {
        $('#playerDiv').removeClass('hidden', 600, "easeInExpo");
        $('#controlGroup').addClass('hidden', 100, "easeInExpo");
        if (dDelay = $('#wpm').val()) {
            dDelay = 60000 / dDelay;
        } else {
            dDelay = 60000 / 60;
        }
        var textSplit = f.split(/[ ,]+/);
        textSplit.push('†');
        jQuery.each(textSplit, function(i) {
            var el = this;
            var whichLetter = Math.floor(el.length / 2);
            var elementToDisplay = '';
            elementToDisplay = this.substring(0, whichLetter) + "<span class='middleLetter'>" + this.substring(whichLetter, whichLetter + 1) + '</span>' + this.substring(whichLetter + 1);
            var displayText = displayWithDelay(elementToDisplay, i * dDelay);
        });
        return false;
    };
    /* funkcja czytająca txt */
    function readfile(f) {
        if (f) {
            var reader = new FileReader();
            reader.onload = function(e) {
                fileContent = e.target.result;
                var playerOn = displayPlayer();
            }
            reader.readAsText(f);
        } else {
            alert("Nie można załadować pliku. Upwnij się, że jego format jest poprawny.");
        }
    };
});