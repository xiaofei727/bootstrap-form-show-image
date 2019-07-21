    
    function ValidateEmail(mail) 
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        return (false)
    }
    
    function validate()
        {
            $("#email").removeClass("invalid")
            $("#firstname").removeClass("invalid")
            $("#lastname").removeClass("invalid")
            $("#company").removeClass("invalid")

            var str = $("#email").val();
            if(str === "" || !ValidateEmail(str)) {
                $("#email").addClass("invalid");
            }
            if(str != "")
            {
                var firstname = "";
                var lastname = "";
                var company = "";

                var array1 = str.split(/[@]/);
                var array2 = array1[1].split(/[.-_]/);
                company = array2[0];

                var array3 = array1[0].split(/[.-_]/);
                firstname = array3[0];
                lastname = "";
                if(array3.length > 1)
                     lastname = array3[1];
                
                if(firstname === "") {
                    $("#firstname").addClass("invalid");
                }
                if(lastname === "") {
                    $("#lastname").addClass("invalid");
                }
                if(company === "") {
                    $("#company").addClass("invalid");
                }
                $("#firstname").val(firstname);
                $("#lastname").val(lastname);
                $("#company").val(company);
                
            }
            else {
                $("#firstname").addClass("invalid");
                $("#lastname").addClass("invalid");
                $("#company").addClass("invalid");
            }
        }
        function handleFileSelect(evt) {
                var files = evt.target.files; // FileList object

                // Loop through the FileList and render image files as thumbnails.
                for (var i = 0, f; f = files[i]; i++) {

                // Only process image files.
                if (!f.type.match('image.*')) {
                    continue;
                }

                var reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    return function(e) {
                        // Render thumbnail.
                        var content = ['<img class="thumb" src="', e.target.result,
                                            '" title="', escape(theFile.name), '"/>'].join('');

                        $(".avatar").html(content);
                    
                        };
                    })(f);

                    // Read in the image file as a data URL.
                    reader.readAsDataURL(f);
                }
            }

        $(document).ready(function(){
            const urlParams = new URLSearchParams(window.location.search);
            const imageUrl = urlParams.get('imageUrl');

            if(imageUrl != null)
            {
                $(".avatar img").attr('src',imageUrl);
            }

            $(document).on('keypress',function(e) {
                if(e.which == 13) {
                    validate();
                }
            });

            document.getElementById('customFile').addEventListener('change', handleFileSelect, false);

        });