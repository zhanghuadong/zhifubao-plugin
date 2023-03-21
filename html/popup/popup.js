function onClickExport() {
    document.getElementById('export-btn').disabled = true;
    const filename = document.getElementById('filename').value
    const cb = (tab) => {
        chrome.tabs.sendMessage(tab.id, { action: "CHANGE_POPUP_ALLOW_DOWNLOAD", filename });
    }
    chrome.tabs.getSelected(null, cb);
}
document.getElementById('export-btn').onclick = onClickExport


/*function appendInfo(data,event){
    var ele = "<tr>\
                  <td><button class='del'>删除</button></td>\
                  <td><input class='sectionname' type='text' value="+data.sectionname+"><button class='sectionBtn'>提交修改</button></td>\
                  <td><img height='50' src="+data.pic+" /></td>\
                  <td><a href="+data.url+" target='_blank'>"+data.title+"</a></td>\
                  <td><textarea>"+data.sellad+"</textarea><button class='introBtn'>提交修改</button></td>\
                  <td>"+data.price+"</td>\
                  <td>"+data.discount_price+"</td>\
                  <td>"+data.stock+"</td>\
                  <td>"+data.url+"</td>\
               </tr>";
    event == "prepend" ?  $("tbody").prepend(ele) : $("tbody").append(ele);
}*/

//appendInfo(datas,"append");