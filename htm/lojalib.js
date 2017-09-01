var mobile = 'nao';
var baseLoja = '../lojas/00027309/';
var baseId = '27309';
var Juros=new Array(0,0,0);

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	mobile = 'sim'
}

/* Mostrar Estoque */
function MostraEstoque(Cod)
  {
  popup=window.open("/AvisaDispProduto.asp?IDLoja=27309&IDProduto="+Cod+"","Estoque","top=20,left=20,height=360,width=400,scrollbars=no,resizable=no");
  popup.focus();
  return void(0);
  }
  
/* Preço Home e Lista de Produtos */
function MostraPreco(PrecoProd,PrecoOri,IDProd){
if(PrecoProd==0 && PrecoOri==0){document.write("&nbsp;");return void(0);}
if(PrecoProd!=PrecoOri){
 document.write("<font style='font-size:13px; color:#a6a6a6;'>de <strike>"+FormatPrice(PrecoOri,'R$')+"</strike>&nbsp;|&nbsp;</font><font style='font-size:16px; color:#000000;'>por <b>"+FormatPrice(PrecoProd,'R$')+"</b></font>");
 }
 else{
 document.write("<div style='font-size:16px; color:#000000;'>por <b>"+FormatPrice(PrecoProd,'R$')+"</b></div>");
 }
}

/* Preço Detalhe */
function MostraPrecoDet(PrecoProd,PrecoOri,Cod){
if(PrecoProd==0 && PrecoOri==0){document.write("&nbsp;");return void(0);}
if(PrecoProd!=PrecoOri){
    document.write("<div style='font-size:18px; color:#a6a6a6;'>de <strike>"+FormatPrice(PrecoOri,'R$')+"</strike></div><div style='font-size:20px; color:#000000;'>por <font style='font-size:24px;font-weight:700;'>"+FormatPrice(PrecoProd,'R$')+"</font></div>");
  }
  else{
    document.write("<div style='font-size:20px; color:#000000;'>por <font style='font-size:24px;font-weight:700;'>"+FormatPrice(PrecoProd,'R$')+"</font></div>");
  }
}

/* Parcela Home e Lista */ 
function MostraMaxParcela(PrecoProd,MaxParcelas){
  var ComSem;
  if(PrecoProd==0||MaxParcelas==1||Juros.length==0)return;
  if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
  if(Juros[MaxParcelas-1]>0)ComSem=""; else ComSem="sem juros";
  document.write("<div style='font-size:14px; color:#000000;'><b>"+MaxParcelas+"X</b> de <b>"+FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd,MaxParcelas))+"</b> "+ComSem+"</div>");
}

function FormatJuros(num){
  num=num.toString().replace(/\$|\,/g,'');
  if(isNaN(num))num="0";
  sign=(num==(num=Math.abs(num)));
  num=Math.floor(num*100+0.50000000001);
  cents=num%100;
  num=Math.floor(num/100).toString();
  if(cents<10)cents="0"+cents;
  for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
  if(num==0&&cents==0)return '0%'; else return ((sign)?'':'-')+' '+num+','+cents+'%';
}

function FormatNum(num){
num=num.toString().replace(/\$|\,/g,'');
if(isNaN(num))num="0";
sign=(num==(num=Math.abs(num)));
num=Math.floor(num*100+0.50000000001);
num=Math.floor(num/100).toString();
for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
return ((sign)?'':'-')+num;
}

/*Função para mostrar parcelamento*/
function fnMaxInstallmentsGrid(PrecoProd,MaxParcelas){
var ComSem;
if(typeof Juros!="undefined"){
if(PrecoProd==0||MaxParcelas==1||Juros.length==0)return "";
if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
if(Juros[MaxParcelas-1]>0)ComSem=""; else ComSem="sem juros";
return "<div class=EstParc><b>"+MaxParcelas+"X</b> de <b>"+FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd,MaxParcelas))+"</b> "+ComSem+"</div>";
}else{
return "";
}
}

/*Função para mostrar valor formatado*/
function FormatNumber(num){
var num=num.toString().replace(/\$|\,/g,'');
if(isNaN(num))num="0";
sign=(num==(num=Math.abs(num))); num=Math.floor(num*100+0.50000000001); num=Math.floor(num/100).toString();
for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
return ((sign)?'':'-')+num;
}

/*Função para mostrar valor economizado em produtos em promoção*/
function fnShowEconomyGrid(ProdPrice,ProdPriceOri){
if(ProdPrice!=ProdPriceOri && typeof FormatNumber == 'function' && typeof FormatPrice == 'function' ){
return "<div class=Economize>Economize <b>"+ FormatPrice(ProdPriceOri-ProdPrice,'R$') +"</b> ("+ FormatNumber(((ProdPriceOri-ProdPrice)/ProdPriceOri)*100)+"%)";
return "</div>";
}
else{
return "";
}
}

/* Menu Esquerdo Loja */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
/* Fim Menu Esquerdo Loja */

/* ZipCode Grid FC - CEP - Begin */
function fnShowCEPGrid(IDProd){
if(FC$.TypeFrt==3){
var sNumCEP=fnGetCookie('CEP'+FC$.IDLoja);
if(sNumCEP==null)sNumCEP="";
sCEP="<div id='idDivCEPBg'>";
sCEP+=" <div id='idDivCEPFC'>";
sCEP+="   <div id='idDivTitCEP'><img src='"+ FC$.PathImg +"icon_frete.svg' alt='Calcule o Frete' align='absmiddle' /><span>Calcule o Valor do Frete</span></div>";
sCEP+="   <div id='idDivContentCEP'>";
sCEP+="   <div id='idDivContentFieldsCEP'>";
sCEP+="   <div id='idDivCEPCalc'>";
sCEP+="   <div class='FieldCEP FieldCEPQty'><label>Qtd.&nbsp;</label><input type='number' id='idQtdZip"+ IDProd +"' value='1' maxlength='4'></div>";
sCEP+="   <div class='FieldCEP FieldCEPNum'><input type='text' placeholder='CEP' id='idZip"+ IDProd +"' value='"+ sNumCEP +"' maxlength='9'></div>";
sCEP+="   <img src='"+ FC$.PathImg +"iconnewsletter.svg' id='idCEPButton' class='FieldCEPBtn' onclick='fnGetShippingValuesProdGrid("+ IDProd +")'>";
sCEP+="   </div>";
sCEP+="   </div>";
sCEP+="   <div id='idDivImgLoadingCEPFC'><img src='"+ FC$.PathImg +"loadingcep.gif' vspace=3 style='display:none;' id=ImgLoadingCEP></div>";
sCEP+="   <div id='idShippingValues"+ IDProd +"'></div></div>";
sCEP+="   </div>";
sCEP+=" </div>";
sCEP+="</div>";
var oShowCEP=document.getElementById("ShowCEP"+IDProd);
if(oShowCEP)oShowCEP.innerHTML=sCEP;
}
}
function fnGetShippingValuesProdGrid(IDProd){
sCEP=document.getElementById("idZip"+ IDProd).value;
fnSetCookie('CEP'+FC$.IDLoja,sCEP);
if(sCEP==""){document.getElementById("idShippingValues"+IDProd).innerHTML="<span class='freightResult'>Informe o CEP</span>";return;}
document.getElementById("idShippingValues"+IDProd).innerHTML="";
document.getElementById("ImgLoadingCEP").style.display='';
var iQty=document.getElementById("idQtdZip"+IDProd).value;
if(IDProd)var sParamProd="&idproduto="+ IDProd;
else var sParamProd="";
AjaxExecFC("/XMLShippingCEP.asp","IDLoja="+ FC$.IDLoja +"&qty="+ iQty +"&cep="+ sCEP + sParamProd,false,processXMLCEPGrid,IDProd);
}
function processXMLCEPGrid(obj,IDProd){
var sShipping="";
var oShippingValues=document.getElementById("idShippingValues"+IDProd);
var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
if(iErr!="0"){
document.getElementById("ImgLoadingCEP").style.display='none';
oShippingValues.innerHTML="<span class='freightResult'>"+ ReadXMLNode(obj,"msg") +"</span>";
return;
}
oShippingValues.innerHTML="";
var UseCart=ReadXMLNode(obj,"UseCart");
if(UseCart=="False"){
var ProdName=ReadXMLNode(obj,"ProdName");
var ProdRef=ReadXMLNode(obj,"ProdRef");
}
sShipping+="<div class='ZipOptions'>";
var iOpt=ReadXMLNode(obj,"OptQt");
for(var i=1;i<=iOpt;i++){
var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");
if(OptObs==null)OptObs="";
sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
if(sValorFrete=="R$ 0,00")sValorFrete="FRETE GRÁTIS";
sShipping+="<div class='ZipOption'>";
sShipping+=" <div class='ZipNameObs'>";
sShipping+=" <div class='ZipName'>"+ OptName +"</div>";
sShipping+=" <div class='ZipObsVal'>"+ OptObs +"</div>";
sShipping+=" </div>";
sShipping+=" <div class='ZipValue'>"+ sValorFrete +"</div>";
sShipping+="</div>";
}
oShippingValues.innerHTML=sShipping;
oShippingValues.style.display="block";
sShipping+="</div>";
document.getElementById("ImgLoadingCEP").style.display='none';
}
/* ZipCode Grid FC - CEP - End */


// Funções específicas para a Espiadinha
var oDivShowCartOnPage=null;
var iLastCartOnPage=0;

function ShowCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
  var oPos=getPos(este);
  if(oDivShowCartOnPage==null){
    var oNewElement=document.createElement("div");
    oNewElement.setAttribute("id","DivShowCartOnPage"); 
    oDivShowCartOnPage=este.parentNode.insertBefore(oNewElement,este);
  }
  oDivShowCartOnPage.style.backgroundColor="#c3aa6b";
  oDivShowCartOnPage.style.border="1px solid #c3aa6b";
  oDivShowCartOnPage.style.borderRadius="3px";
  oDivShowCartOnPage.style.MozBorderRadius="3px";
  oDivShowCartOnPage.style.color="#ffffff";
  oDivShowCartOnPage.style.width="200px";
  oDivShowCartOnPage.style.height="auto";
  oDivShowCartOnPage.style.marginTop="0px";
  oDivShowCartOnPage.style.marginLeft="0px";
  oDivShowCartOnPage.style.position="absolute";
  oDivShowCartOnPage.style.zIndex="1";
  oDivShowCartOnPage.style.visibility="visible";
  if(iErr==0)sBackColor="c3aa6b"; else sBackColor="c3aa6b"
  var sHTML="<div style='width:100%;'>";
     sHTML+="<div style='background-color:#"+ sBackColor +";color:#ffffff;font-size:13px;line-height:13px;padding:5px 0;text-align:center;cursor:pointer'>"+ sMsg +"</div>";
     if(iErr==0){
       sHTML+="<div style='text-align:center'><a href='/addproduto.asp?idloja="+ IDLoja +"' target='_top' style='color:#000;text-decoration:none;text-align:center;font-size:14px;font-weight:700;text-transform:uppercase'>"+ sCheckoutText +"</a><img src='images/cancel_off.png' style='cursor:pointer;margin-left:5px;' onclick=oDivShowCartOnPage.style.visibility='hidden'></div>";
     }
     else{
       sHTML+="<div style='text-align:center'><img src='images/cancel_off.png' style='cursor:pointer;margin-left:5px;' onclick=oDivShowCartOnPage.style.visibility='hidden'></div>";
     }
     sHTML+="</div>";
  oDivShowCartOnPage.style.top="-45px";
  oDivShowCartOnPage.style.left="0";
  oDivShowCartOnPage.innerHTML=sHTML;
  iLastCartOnPage++;
  setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",5000);
}


// Função Cookie //
function fnGetCookie(name){
var arg=name+"=";
var alen=arg.length;
var clen=document.cookie.length;
var i=0;
while (i<clen){
var j=i+alen;
if(document.cookie.substring(i,j)==arg)return fnGetCookieVal(j);
i=document.cookie.indexOf(" ",i)+1;
if(i==0)break;
}
return null;
}
function fnGetCookieVal(offset){
var endstr=document.cookie.indexOf(";",offset);
if (endstr==-1)endstr=document.cookie.length;
return unescape(document.cookie.substring(offset,endstr));
}
function fnSetCookie(name,value){
var argv=fnSetCookie.arguments;
var argc=fnSetCookie.arguments.length;
var expires=(argc>2)?argv[2]:null;
var path=(argc>3)?argv[3]:null;
var domain=(argc>4)?argv[4]:null;
var secure=(argc>5)?argv[5]:false;
document.cookie=name+"="+escape(value)+((expires==null)?"":(";expires=" + expires.toGMTString()))+((path==null)?"":(";path="+path))+((domain==null)?"":(";domain="+domain))+((secure==true)?"; secure":"");
}