var add=document.getElementById("addnote");
var notetext=document.getElementById("display");
var list=document.getElementById("menu");
var data;
var prevdata;
var item_id=0;
var cur_id;
var userToken=localStorage.getItem('note');
console.log("User Token is "+userToken);
var notes={

}

add.addEventListener('click',function(){
    add_note();
    
});

list.addEventListener('click',function(){
    var element=event.target;
    if(element.getAttribute("class")=="fa fa-times-circle"){
        var parent=element.parentElement;
        var index=parent.getAttribute("id");
        list.removeChild(parent);
        if(index==cur_id){
            notetext.value="";
        }
        deleteItem(index);
    }
    else if(element.getAttribute("class")=="note-list"){
        console.log(element.getAttribute("class"));
        var index=element.getAttribute("id");
        notetext.value=notes[index]['data'];
        cur_id=index;

    }
    else{

    }

});

notetext.addEventListener('keyup',function(){
    if(cur_id!=null){
        data=notetext.value;
        write_note(cur_id,data);
        notes[cur_id]={
            "data":data
        }
        let item=document.getElementById(cur_id);
        item.children[1].innerHTML=data.slice(0,10);
        console.log(item.children[1]);
        console.log(notes);
    }

});

function createBlankList(my_id){
       list.innerHTML="<li id="+my_id+" class='note-list'><i class='fa fa-times-circle'></i><div class='title-holder'></div></li>"+list.innerHTML;
}

async function deleteItem(index){
    
    let url="http://192.168.100.162:3000/notes/"+index;
    let updateNoteRequest=await fetch(url,{
        method:"delete",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem('note'),
            "Content-Type":"application/json"
        }
    }); 
    let result = await updateNoteRequest.json();
    console.log(result);
}

async function add_note(){
    let url="http://192.168.100.162:3000/notes";
    let newNoteRequest=await fetch(url,{
        method:"post",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem('note'),
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "description":"",
        })
        }
    ); 
    let result = await newNoteRequest.json();
    // console.log("hai");
    if(result['isSuccess']){
        var id=result['responseBody']['id'];
        console.log(id);
        notetext.value="";
            if(id!=null){
            createBlankList(id);
        cur_id=id;
        notes[cur_id]={
            "data":""
        }
    }
    
    }
    // else{
    //     window.alert("Invalid credentials");
    // }
}
async function displayList()
{
    let url="http://192.168.100.162:3000/notes";
    let newNoteRequest=await fetch(url,{
        method:"get",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem('note'),
            "Content-Type":"application/json"
        }
    });
    let result = await newNoteRequest.json();
    // console.log("hai");
    console.log(result);
    var resultb = result['responseBody'];
    if(result['isSuccess']){
        for(let i =0;i<resultb.length;i++)
        {
            var id = resultb[i]['id'];
            var desc = resultb[i]['description'];
            notes[id]={
                "data" : desc
            }
        }
        console.log(notes);
        displayNodes(notes);
    }
}

async function write_note(id,description){
    let url="http://192.168.100.162:3000/notes/"+id;
    let updateNoteRequest=await fetch(url,{
        method:"put",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem('note'),
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "description":description,
        })
        }
    ); 
    let result = await updateNoteRequest.json();
    console.log(result);
    if(result['isSuccess']){
        for(let i=0;i<result.length;i++)
        {
        var id=result[i]['responseBody']['id'];
        console.log("Updated "+id);
        }
        return id;
    }
    // else{
    //     window.alert("Invalid credentials");
    // }
}

async function displayNodes(mynotes)
{
    for(nte in mynotes){
        console.log(nte,mynotes[nte]['data']);
        list.innerHTML="<li id="+nte+" class='note-list'><i class='fa fa-times-circle'></i><div class='title-holder'>"+mynotes[nte]['data']+"</div></li>"+list.innerHTML;  
    }
}