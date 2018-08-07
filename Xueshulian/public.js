var api = "http://140.143.244.159:81/"
// var api = "http://192.168.2.191/ScienceAPI/"

// 新增、修改
function ajax(json, url1, url2) {
  $.ajax({
    type: "post",
    url: api+ url1,
    contentType: "application/json",
    data: JSON.stringify(json),
    success: function(data, status) {
      window.location.replace(url2);
      console.log(data)
      console.log(status)
    }
  });
}
//删除
function del(id,url1) {
  $.ajax({
    type: "post",
    url: api + url1,
    contentType: "application/json",
    data: JSON.stringify({
      ID: id
    }),
    success: function(data, status) {
      // console.log(data);
      // console.log(status);
      window.location.reload();
    }
  });
}

// 查询
function page(data, nowPage, useName) {
  // 分页按钮
  var a = "";
  for (var j = 1; j <= data.SumPageCount; j++) {
    a += "<a>" + j + "</a>";
  }
  $(".page").html(a);
  // console.log(data);

  // 显示数量
  var pageSize = 10;
  var start = pageSize * (nowPage - 1) + 1;
  var end = nowPage * pageSize;
  if (end > data.SumDataCount) {
    end = data.SumDataCount;
  }
  $(".pages")
    .find("span:eq(0)")
    .html(start);
  $(".pages")
    .find("span:eq(1)")
    .html(end);
  $(".pages")
    .find("span:eq(2)")
    .html(data.SumDataCount);

  // 分页按钮点击
  $(document).off("click", ".page a");
  $(document).on("click", ".page a", function() {
    $(this).addClass("mo").siblings().removeClass("mo");
    var nowPage = $(this).index() + 1;
    if (nowPage == data.SumPageCount) {
      $(".next").disable = true;
    }
    run(nowPage,useName);
  });

  if (nowPage == 1) {
    $(".prov").disable = true;
  }

  // 上页   下页
  // var nowPage = 1;
  $(".prov").off("click");
  $(".prov").click(function() {
    if (nowPage <= 1) {
      return;
    }
    nowPage -= 1;
    run(nowPage, useName);
  });
  $(".next").off("click");
  $(".next").click(function() {
    if (nowPage >= data.SumPageCount) {
      return;
    }
    nowPage += 1;
    run(nowPage, useName);
  });


}
  
// 上传文件
function files(formData,url1) {
  var file="";
  $.ajax({
    url: api + url1,
    type: "POST",
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(returndata) {
      var str = $("#shiPing_adjunct").val();
      var a = str.split("\\");
      var data = a[a.length - 1];
      file = returndata + "$" + data;
      // console.log(file);
      // file1 = file;
    },
    error: function(returndata) {
      // alert(returndata);
    }
  });
  
  return file;
}


// 调试 增加
function testadd(json, url1, url2) {
  $.ajax({
    type: "post",
    url: "http://192.168.2.191/ScienceAPI/" + url1,
    contentType: "application/json",
    data: JSON.stringify(json),
    success: function(data, status) {
      window.location.replace(url2);
    }
  });
}

// 渲染附件名字
function chai(id,id2){
  var str = id;
  var html = '';
  // console.log(id)
  if(id == null){
  

    html += '未提交任何附件';
    id2.html(html);
    // console.log(html)
    return;
  }else{
    var a = str.split("$");
    var add = a[a.length - 1];
    html += '<a href="#">'+ add+'</a>'
  }
  id2.html(html);

}

//更改附件名字
function editname(){
  var str = $("#shiPing_adjunct").val();
  var a = str.split("\\");
  var data = a[a.length - 1];
  var html = '';
    html += '<a href="#">' + data + '</a>'
    $('.address').html(html);
} 

// 请填写必要字段
function necessary(){
  swal({
    title: "请认真填写必要字段",
    confirmButtonColor: "#  ",
    closeOnConfirm: false
  });
  return;
}