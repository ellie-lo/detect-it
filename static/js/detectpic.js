// javascript get query string
$(document).ready(()=>{
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(window.location.search)
    console.log(params)
    $("#detect_pic").attr("src",`../ImageOriginalAction?filename=${params["file"]}`)
})