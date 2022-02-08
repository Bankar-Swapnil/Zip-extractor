let file = document.getElementById("file");
let code = document.getElementById("code");
let list = document.getElementById("list");
file.addEventListener('change', function (event) {
    // document.getElementById('item').style.display= "contents";
    // document.getElementById("item").style.cssText = "display: contents; backgroun-colour: black";
    document.getElementById('btn').style.visibility='visible';
    document.getElementById("btn").innerHTML = "Download all"
    document.getElementById('item').style.visibility='visible';
    document.getElementById("item").innerHTML = "> Single click to download individual file <br/> >Double click to view data of individual file";
    var filesInput = file.files[0];
    console.log(filesInput)
    zip.createReader(new zip.BlobReader(filesInput), function (reader) {
        let res = '';
        let i = 0;
        
        reader.getEntries(function (entries) {
            
            if (entries.length) {
                entries.forEach((e) => {

                    
                    if (e.directory == false) {
                        
                        res += ` <li  ondblclick="getData(${i})" onclick="download(${i})" ><img src="image/folder.png" alt="" width="30" height="25" class='mx-2'>${e.filename}</li>`;
                        // res += `<li onclick="download(${i})">${e.filename}</li>`;
                    }
                    i++;
                })
                document.getElementById('list').style.visibility='visible';
                list.innerHTML = res;
            }
        });
    }, function (error) {

    });

})


function getData(i) {
    document.getElementById('items').style.visibility='visible';
    document.getElementById("items").innerHTML = "Available Data of your file";
    var filesInput = file.files[0];  
    
    zip.createReader(new zip.BlobReader(filesInput), function (reader) {
        reader.getEntries(function (entries) {
            entries[i].getData(new zip.TextWriter(), function (text) {
                code.innerText = '';    
                CodeMirror(code, {
                    lineNumbers: true,    
                    mode: 'text/x-java',
                    theme: 'icecoder',
                    readOnly: "nocursor",
                    value: text
                });
            });
        })
    })
}


function download(i) {
    var filesInput = file.files[0];    
    var name=filesInput.name.slice(0,filesInput.name.length-4);
    zip.createReader(new zip.BlobReader(filesInput), function (reader) {
        reader.getEntries(function (entries) {
            entries[i].getData(new zip.TextWriter(), function (text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download',name);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            })
        })
    })
}







let btn = document.getElementById("btn");
var filesInput = file.files[0];

btn.addEventListener('click', function (event) {
var filesInput = file.files[0];


    zip.createReader(new zip.BlobReader(filesInput), function (reader) {
        let i = 0;
        
        reader.getEntries(function (entries) {
            
            if (entries.length) {
                entries.forEach((e) => {
                    
                    if (e.directory == false) {
                        download(i)
                    }
                    i++;
                })

            }
        });
    }, function (error) {

    });

}

)