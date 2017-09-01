if(typeof jQuery=='undefined')FCLib$.fnLoadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',true);

var bT$=(function(){
  "use strict"
  var aProds=[];
  var nSumProdPrices=0;
  var nSumOriProdPrices=0;

  /*Fun��o para mostrar valor formatado*/
  function fnFormatNumber(num){
    num=num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))num="0";
    var sign=(num==(num=Math.abs(num)));
    num=Math.floor(num*100+0.50000000001);
    num=Math.floor(num/100).toString();
    for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
    return ((sign)?'':'-')+num;
  }

  function fnShowEconomyConj(ProdPrice,ProdPriceOri){
    if(ProdPrice!=ProdPriceOri)document.write("<span class='FCfnShowEconomyConj'>Economize: <b>"+FormatPrice(ProdPriceOri-ProdPrice,FC$.Currency)+" ("+fnFormatNumber(((ProdPriceOri-ProdPrice)/ProdPriceOri)*100)+"%)</b></span>");
  }

  function fnRemoveItemCJ(IDProd,oObj){
    var bTModel = document.querySelector('#bTContainer').getAttribute('data-bTModel');
    
    if(oObj.checked){
      
      if (bTModel==1){
        jQuery("#bTItem"+IDProd).animate({
          'opacity':'1'
        });
        jQuery('#bTProdSelect'+IDProd+' label').css('text-decoration','none');
      }
   
      else if(bTModel==3){
        jQuery("#bTItem"+IDProd).fadeIn(400);
        jQuery('#bTProdSelect'+IDProd+' label').css('text-decoration','none');
      }
    
    }else{
      if (bTModel==1) {
        jQuery("#bTItem"+IDProd).animate({
          'opacity':'0.5'
        });
        jQuery('#bTProdSelect'+IDProd+' label').css('text-decoration','none');        
      }
      else if(bTModel==3){
        jQuery("#bTItem"+IDProd).fadeOut(400);
        jQuery('#bTProdSelect'+IDProd+' label').css('text-decoration','line-through');
      }      
    }
    bT$.fnShowPrices();
  }

  function setVarProds(Obj){
    aProds[aProds.length]=Obj;
  }

  function fnShowPrices(){
    nSumProdPrices=0;
    nSumOriProdPrices=0; 
    var bTModel = document.querySelector('#bTContainer').getAttribute('data-bTModel');
    var bTemItem=false;
    if(typeof(aProds)=="object" && aProds.constructor==Array && aProds.length>0){
      for(var i=0;i<aProds.length;i++){
        var oProd=aProds[i];
        var bChecked=document.getElementById("CB"+oProd.id).checked;
        if(bChecked){
          nSumProdPrices=nSumProdPrices+oProd.PrecoNum;
          nSumOriProdPrices=nSumOriProdPrices+oProd.PrecoOri;
          bTemItem=true;
        }
      }
    }
    if(bTemItem){

      if(bTModel==3){
        document.getElementById("PricesCJ").style.display="block";
        document.querySelector(".bTItensContainer").style.display="block";
        document.querySelector(".bTTotalsPrices").style.display="block";
      }
      var nFinalPrice=0;
      if(nSumOriProdPrices==nSumProdPrices){
        nFinalPrice="<p class='bTOriPrice'>por "+FormatPrice(nSumProdPrices,FC$.Currency)+"</p>";
      }
      else{
        nFinalPrice="<span class='bTPriceDe'>de <strike>"+ FormatPrice(nSumOriProdPrices,FC$.Currency) +"</strike></span><p class='bTPricePorCont'><span class='bTPricePor'>por "+ FormatPrice(nSumProdPrices,FC$.Currency) + "</span></p><span class='bTEconomy'>Economize: <b>" + FormatPrice(nSumOriProdPrices-nSumProdPrices,FC$.Currency)+"</b></span>";
      }
      document.getElementById("idProdPrice").innerHTML=nFinalPrice;
    }
    else{
      if(bTModel==3){
        document.getElementById("PricesCJ").style.display="none";
        document.querySelector(".bTItensContainer, .bTActualItem").style.display="none";
        document.querySelector(".bTTotalsPrices").style.display="none";
      }
    }
  }

  function fnComprar(Obj){
    var aProdsComprar=[];
    if(typeof(aProds)=="object" && aProds.constructor==Array && aProds.length>0){
      for(var i=0;i<aProds.length;i++){
        var oProd=aProds[i];
        var bChecked=document.getElementById("CB"+oProd.id).checked;
        if(bChecked){
          aProdsComprar[aProdsComprar.length]=oProd;
        }
      }
      FCLib$.aBuyTogether=aProdsComprar;
      if(FC$.CartOnPage==0)FCLib$.addFormConjBuy(FC$.IDLoja,FCLib$.aBuyTogether);else FCLib$.addConjBuyCartOnPage(FC$.IDLoja,FCLib$.aBuyTogether,Obj);
    }
  }

  function fnMostraPrecoCJ(PrecoProd,PrecoOri){
    if(PrecoProd==PrecoOri){document.write("<p class='bTOriPrice'>por "+FormatPrice(PrecoProd,FC$.Currency)+"</p>");}
    else{
      document.write("<span class='bTPriceDe'>de <strike>"+ FormatPrice(PrecoOri,FC$.Currency) +"</strike></span><p class='bTPricePorCont'><span class='bTPricePor'>por "+ FormatPrice(PrecoProd,FC$.Currency) + "</span></p><span class='bTEconomy'>Economize: <b>"+FormatPrice(PrecoOri-PrecoProd,FC$.Currency)+"</b></span>");
    }
  }

  function fnComprarCJ(id,Obj){
    var aProdsComprar=[];
    if(typeof(aProds)=="object" && aProds.constructor==Array && aProds.length>0){
      for(var i=0;i<aProds.length;i++){
        var oProd=aProds[i];
        if(oProd.id==id || oProd.id==IDProdPrincCJ){
          aProdsComprar[aProdsComprar.length]=oProd;
        }
      }
      FCLib$.aBuyTogether=aProdsComprar;
      if(FC$.CartOnPage==0)FCLib$.addFormConjBuy(FC$.IDLoja,FCLib$.aBuyTogether);else FCLib$.addConjBuyCartOnPage(FC$.IDLoja,FCLib$.aBuyTogether,Obj);
    }
  }

  return{
    fnFormatNumber:fnFormatNumber,
    fnShowEconomyConj:fnShowEconomyConj,
    fnRemoveItemCJ:fnRemoveItemCJ,
    fnShowPrices:fnShowPrices,
    setVarProds:setVarProds,
    fnComprar:fnComprar,
    fnMostraPrecoCJ:fnMostraPrecoCJ,
    fnComprarCJ:fnComprarCJ
  }

})();