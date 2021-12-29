$(document).ready(function () {

    var fileList = [];
    const limit = 1;
    const cutType = "oneshot"; //1切4圖
    var loadImgByFile = function (file, loadHandler) {
        const filetype = file.type.split("/")[0];
        //video upload
        if (filetype === "video") {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                loadImgByFile(xhr.response, loadHandler)
            };
            xhr.open('GET', "img/icons/video.png");
            xhr.responseType = 'blob';
            xhr.send();
        } else {
            const reader = new FileReader();

            reader.addEventListener("load", loadHandler, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }

    var render = function () {
        $(".bg-fileicon").hide()

        var renderDiv = $("#idtable");
        // renderDiv.html("");
        var count = 0;

        var existElement = $(".btn-remove").toArray().map(e => $(e).data("file-index"));

        var noExistElement = fileList.map((e, index) => {
            return {
                file: e,
                index: index,
            };
        }).filter((e, index) => existElement.indexOf(index) === -1);


        noExistElement.forEach((element) => {
            loadImgByFile(element.file, (img) => {
                count++;
                var imageSrc = img.target.result;
                var fileSize = calculateFileSize(element.file.size);
                renderDiv.append(`
                                    <div class="data-row show" style="animation-delay:${count / 2}s;">
                                        <div class="d-flex">
                                            <div class="img-title">
                                                <img style="background-image: url('${imageSrc}');" />
                                            </div>
                                            <div class="d-inline-block img-info">
                                                <label>${element.file.name}</label>
                                                <br>
                                                <label class="file-size">${fileSize}</label>
                                            </div>
                                            <a class="btn-remove" data-file-index="${element.index}"><i class="fas fa-minus"></i></a>
                                        </div>
                                    </div>
                                    `);

                //判斷最後一個
                if (count === noExistElement.length) {
                    $(".btn-remove").off("click").on("click", (e) => {
                        var index = $(e.currentTarget).data("file-index");
                        fileList.splice(index, 1);
                        // console.log(e.currentTarget);
                        // console.log(e.target);
                        $(e.currentTarget.parentNode.parentNode).remove()
                        renderIndex(index);
                        if (fileList.length == 0) {
                            $(".bg-fileicon").show()
                        }

                    })
                }
            })
        })
    }
    //remove btn
    var renderIndex = function (removeIndex) {
        var removeBtn = $(".btn-remove");
        for (var i = 0; i < removeBtn.length; i++) {
            var originIndex = $(removeBtn[i]).data("file-index");
            if (removeIndex < originIndex) {
                $(removeBtn[i]).data("file-index", originIndex - 1);
            }
        }
    }
    //file size
    var calculateFileSize = function (filesize) {
        var sizeUnit = ['B', 'KB', 'MB', 'GB'];
        var round = 0;
        for (var i = 0; i <= round; i++) {
            if (filesize >= 1024) {
                round += 1;
                filesize = filesize / 1024;
            }
        }

        return `${Math.ceil(filesize * 100) / 100}${sizeUnit[round]}`
    }

    $('#upload').on('change', function (e) {
        var files = e.target.files;
        if ((limit-fileList.length)>=files.length && fileList.length != limit) {
            for (var i = 0; i < files.length; i++) {
                fileList.push(files[i]);
            }

            render();
        } else {
            alert("超過上傳限制");
        }

        e.target.value = '';
        
    })

    $('#buttonAdd').click(function () {
        $('#upload').click();
    });

    $("body").on("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();
    })

    $("body").on("drop", function (e) {

        e.preventDefault();
        // event.stopPropagation();
        var files = e.originalEvent.dataTransfer.files;
        if ((limit-fileList.length)>=files.length && fileList.length != limit) {
            for (var i = 0; i < files.length; i++) {
                fileList.push(files[i]);
            }

            render();
        } else {
            alert("超過上傳限制");
        }

       
    })

    $("#uploadFile").on("click", function () {
        if (fileList.length == limit) {
            var formdata = new FormData();
            formdata.append("type", cutType);

            fileList.forEach((file) => {
                formdata.append("file", file);
            })

            $.ajax({
                url: "../UploadFiles_aiot",
                data: formdata,
                processData: false,
                contentType: false,
                type: "POST",
            }).done(function (res) {
                if(res==='success'){
                    location.href=`../InsertDetectByDectDate`;
                }else{
                	alert("上傳失敗")
                }
            });
        }else{
            alert("請選擇圖檔")
        }
    })
})