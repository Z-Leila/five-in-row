$(function(){
  // HTMLCanvasElement
  // getContext('2d')
  // ctx.beginPath()
  // ctx.rect(x,y,width,height)
  // ctx.arc()
  // ctx.moveTo()
  // ctx.lineTo()
  // ctx.fillRect()
  // ctx.strokeRect()
  // ctx.fill()
  // ctx.stroke()
  // ctx.closePath();
  //
  // ctx.save();
  // ctx.restore();
  // ctx.translate();
  // ctx.rotate( (Math.PI/180)*30 );
  //
  // var LG = ctx.createLinearGradient(x1,x2,y1,y2);
  // LG.addColorStop(0.3,'#855363');
  // LG.addColorStop(0.5,'black');
  // var RG = ctx.createRadialGradient(x1,x2,r,y1,y2,r);
  // RG.addColorStop(0.3,'#855363');
  // RG.addColorStop(0.5,'black');
  //
  // ctx.save();
  // ctx.fillStyle = LG;
  // ctx.strokeStyle = RG;
  // ctx.restore();
  //
  // var IMAGE = new Image();
  // IMAGE.src = './bg.png';
  // $(IMAGE).on('load',function(){
  //   var TA = ctx.createPattern(IMAGE,'no-repeat');
  //   ctx.fillStyle = TA;
  //   ctx.fill();
  // })
  //
  //
  // ctx.lineWidth = 10;
  // ctx.lineJoin = 'inherit';
  // ctx.lineCap =  'round';
  // ctx.setLineDash([10,3]);
  // ctx.lineDashOffset = '-10';
  //
  // ctx.shadowOffsetx = 10;
  // ctx.shadowOffsetY = 10;
  // ctx.shadowBlur =  10;
  // ctx.shadowColor = 'red';
  //
  // ctx.font = '48px san_serif';
  // ctx.textAlign  = 'right';
  //
  // ctx.fillText("xdfadfa",0,0,300);
  // ctx.strokeText('xdadfa',0,0);
  //
  // var I = new Image();
  // I.src = './sprite.png';
  // I.onload = function(){
  //   ctx.drawImage(I,300,300);
  //   ctx.drawImage(I,300,300,200,200);
  //   ctx.drawImage(I,12,20,100,100,300,300,100,100);
  // }

  var canvasS = 600;
  var row = 15;
  var blockS = canvasS/row;
  var ctx = $('#canvas').get(0).getContext('2d');
  var starRadius = 3;

  $('#canvas').get(0).height = canvasS;
  $('#canvas').get(0).width = canvasS;

  var draw = function(){
    var off = blockS/2 + 0.5;
    var lineWidth = canvasS - blockS;
// // 画列 竖线
    ctx.save();
    ctx.beginPath();
    ctx.translate(off,off);
    ctx.strokeStyle = "#B16A0E";
    for(var i = 0; i<row; i++){
      ctx.moveTo(0,0)
      ctx.lineTo(lineWidth,0);
      ctx.translate(0,blockS);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
//  // 画行 横线
    ctx.save();
    ctx.beginPath();
    ctx.translate(off,off);
    ctx.strokeStyle = "#B16A0E";
    for(var i = 0; i<row; i++){
      ctx.moveTo(0,0)
      ctx.lineTo(0,lineWidth);
      ctx.translate(blockS,0);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
// 画四个点
    var points = [3.5*blockS+0.5 , 11.5*blockS + 0.5];
    for(var i = 0; i< 2; i++){
      for( var j=0; j<2; j++){
        var x = points[i];
        var y = points[j];
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.arc(0,0,starRadius,0,(Math.PI/180)*360);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }
  //中心小黑点
    ctx.save();
    ctx.beginPath();
    ctx.translate(7.5*blockS+0.5, 7.5*blockS + 0.5);
    ctx.arc(0,0,starRadius,0,(Math.PI/180)*360);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  draw();

  // {x:1,y:1,color:1}
  // qizi.x
 // qizi.y
 // qizi.color

    // 旗子的样式及落棋的音乐
  var qiziRadius = blockS/2*0.8;
  var drop = function( qizi ){
    ctx.save();
    ctx.beginPath();
    ctx.translate((qizi.x+0.5)*blockS,(qizi.y+0.5)*blockS);
    ctx.arc(0,0,15,0,Math.PI/180*360);
    // 黑棋
    if( qizi.color === 1){
      var  rd = ctx.createRadialGradient(0,0,15,-4,-3,2);
      rd.addColorStop(0, 'black');
      rd.addColorStop(0.9, 'rgba(233,233,233,1)');
      rd.addColorStop(1, 'rgba(244,244,244,1)');
      ctx.fillStyle = rd;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 3;
      ctx.shadowColor = 'rgba(47,47,47,.85)';
      $('#black_play').get(0).play();
    }else{
      // 白棋
       var bz = ctx.createRadialGradient(0,0,15,-4,-3,2)
        bz.addColorStop(0, 'rgba(222,222,222,0.9)');
        bz.addColorStop(0.9, 'rgba(255,255,255,1)');
        bz.addColorStop(1, 'rgba(255,255,255,1)');
        ctx.fillStyle = bz;
      $('#white_play').get(0).play();
    }
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  var kaiguan = true;
  all = {};
  var step = 1;

//字典思想  字符串-键  
judge = function(qizi){
    var shuju = {};
    $.each(all,function(k,v){
      if( v.color === qizi.color ){
        shuju[k] = v;
      }
    })
    var shu = 1,hang=1,zuoxie=1,youxie=1;
    var tx,ty;
// 邮标思想
// // 输赢  x y   x y-1 / x y-2 / x y-3 / x y-4     x-1 y / x-2 y ...
    /*|*/
    tx = qizi.x; ty = qizi.y;
    while ( shuju [ tx + '-' + (ty + 1) ]){
      shu ++;ty++;
    }
    tx = qizi.x; ty = qizi.y;
    while ( shuju [ tx + '-' + (ty - 1) ]){
      shu ++; ty--;
    }

    /*-*/
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx+1) + '-' + ty ] ){
      hang++;tx++;
    }
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx-1) + '-' + ty ] ){
      hang++;tx--;
    }
// 左斜
    tx = qizi.x; ty = qizi.y;
    while( shuju[ (tx-1) + '-' + (ty-1) ] ){
      zuoxie++;tx--;ty--;
    }
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx+1) + '-' + (ty+1) ] ){
      zuoxie++;tx++;ty++;
    }
// 右斜
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx+1) + '-' + (ty-1) ] ){
      youxie++;tx++;ty--;
    }
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx-1) + '-' + (ty+1) ] ){
      youxie++;tx--;ty++;
    }

    if( shu >=5  || hang>=5 || zuoxie>=5 || youxie>=5){
      return true;
    }
  }

  $('#canvas').on('click',function(e){
    var x = Math.floor(e.offsetX/blockS);
    var y = Math.floor(e.offsetY/blockS);

    if( all[ x + '-' + y ]){
      return;
    }

    var qizi;
    if(kaiguan){
      qizi = {x:x,y:y,color:1,step:step};
      drop(qizi);
      if( judge(qizi) ){
        $('.cartel').show().find('#tishi').text('黑棋赢');
      };
    }else{
      qizi = {x:x,y:y,color:0,step:step};
      drop(qizi);
      if( judge(qizi) ){
       $('.cartel').show().find('#tishi').text('白棋赢');
      };
    }
    step += 1;
    kaiguan = !kaiguan;
    all[ x + '-' + y ] = qizi;

  });
  $("#restart").on('click',function(){
    $('.cartel').hide();
    ctx.clearRect(0,0,600,600);
    draw();
    kaiguan = true;
    all = {};
    step = 1;
  })

  $('#qipu').on('click',function(){
    $('.cartel').hide();
    $('#save').show();
    ctx.save();
    ctx.font = "20px consolas";
    for( var i in all){
      if( all[i].color === 1){
          ctx.fillStyle = '#fff';
      }else{
        ctx.fillStyle = 'black';
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(all[i].step,
        (all[i].x+0.5)*blockS,
        (all[i].y+0.5)*blockS);
    }
    ctx.restore();
    var image = $('#canvas').get(0).toDataURL('image/jpg',1);
    $('#save').attr('href',image);
    $('#save').attr('download','qipu.png');
  })

  $('.tips').on('click',false);
  $('#close').on('click',function(){
      $('.cartel').hide();
  })
  $('.cartel').on('click',function(){
    $(this).hide();
  })

})
