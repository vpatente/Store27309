// param
var g1='5'; //Quantidade de itens do grupo g1(Termos), Padr�o 5, M�ximo 9, 0 N�o exibe
var g2='3'; //Quantidade de itens do grupo g2(P�ginas), Padr�o 3, M�ximo 9, 0 N�o exibe
var g3='5'; //Quantidade de itens do grupo g3(Produtos), Padr�o 5, M�ximo 9, 0 N�o exibe
var g4='3'; //Quantidade de itens do grupo g4(Not�cias), Padr�o 3, M�ximo 9, 0 N�o exibe

jQuery.noConflict();
jQuery(function (jQuery) {
     				     
						jQuery.widget( "custom.autocomplete", jQuery.ui.autocomplete, {
				        _renderMenu: function( ul, items ) {
				            var self = this,
				                currentCategory = "";
				            jQuery.each( items, function( index, item ) {
				                if ( item.category != currentCategory ) {
					                  ul.append( "<li class='ui-autocomplete-category'><span class='as-categoria'>" + item.category + "</span></li>" );
				                    currentCategory = item.category;
				                }
				                self._renderItem( ul, item );
				            });
				        }
				    });

            jQuery("#autocomplete").autocomplete({
			        select: function( event, ui ) { 
								if (ui.item.q){
									jQuery('#autocomplete-form').submit();
									return false;	         
								}
								if (ui.item.c){
									var idProducts = ui.item.id;
									window.location.href = "ListaProdutos.asp?IDLoja="+FC$.IDLoja+"&IDProduto="+idProducts;
									return false;	         
								}
								if (ui.item.u){
					        window.location.href = ui.item.u.replace("&amp;","&");
					        return false;           
								}
								if(ui.item.s){
									var idNews = ui.item.id;
									window.location.href = "Noticias.asp?IDLoja="+FC$.IDLoja+"&IDNoticia="+idNews;            
									return false;	         
								}
			        },
	            focus: function(event,ui) {
	                jQuery('input#autocomplete').val(ui.item.label
														.replace("&quot;",'"')
														.replace("&apos;","'")
														.replace("&amp;","&")
														.replace("&lt;","<")
														.replace("&gt;",">")
														.replace("&#192;","�")
														.replace("&#193;","�")
														.replace("&#194;","�")
														.replace("&#195;","�")
														.replace("&#196;","�")
														.replace("&#197;","�")
														.replace("&#198;","�")
														.replace("&#199;","�")
														.replace("&#200;","�")
														.replace("&#201;","�")
														.replace("&#202;","�")
														.replace("&#203;","�")
														.replace("&#204;","�")
														.replace("&#205;","�")
														.replace("&#206;","�")
														.replace("&#207;","�")
														.replace("&#208;","�")
														.replace("&#209;","�")
														.replace("&#210;","�")
														.replace("&#211;","�")
														.replace("&#212;","�")
														.replace("&#213;","�")
														.replace("&#214;","�")
														.replace("&#216;","�")
														.replace("&#217;","�")
														.replace("&#218;","�")
														.replace("&#219;","�")
														.replace("&#220;","�")
														.replace("&#221;","�")
														.replace("&#222;","�")
														.replace("&#223;","�")
														.replace("&#224;","�")
														.replace("&#225;","�")
														.replace("&#226;","�")
														.replace("&#227;","�")
														.replace("&#228;","�")
														.replace("&#229;","�")
														.replace("&#230;","�")
														.replace("&#231;","�")
														.replace("&#232;","�")
														.replace("&#233;","�")
														.replace("&#234;","�")
														.replace("&#235;","�")
														.replace("&#236;","�")
														.replace("&#237;","�")
														.replace("&#238;","�")
														.replace("&#239;","�")
														.replace("&#240;","�")
														.replace("&#241;","�")
														.replace("&#242;","�")
														.replace("&#243;","�")
														.replace("&#244;","�")
														.replace("&#245;","�")
														.replace("&#246;","�")
														.replace("&#248;","�")
														.replace("&#249;","�")
														.replace("&#250;","�")
														.replace("&#251;","�")
														.replace("&#252;","�")
														.replace("&#253;","�")
														.replace("&#254;","�")
														.replace("&#255;","�")
	                					);
	                return false;
	            },			                                    
              source: function (request, response) {
                  jQuery.ajax({
                      url: "autosuggest.asp?idloja="+FC$.IDLoja+"&format=1&q="+request.term+"&g1="+g1+"&g2="+g2+"&g3="+g3+"&g4="+g4,
                      dataType: "json",
                      type: "GET",                     
                			success: function (data) {
												var json0 = data.SearchTerms;
												var json1 = data.Products;
												var json2 = data.RelatedPages;
												var json3 = data.News;
												
												
												if(jQuery.isArray(json0)) {
												    json0 = json0;
												}else{
													json0 = [  ];
												};													
												if(jQuery.isArray(json1)) {
												    json1 = json1;
												}else{
													json1 = [  ];
												};													
												if(jQuery.isArray(json2)) {
												    json2 = json2;
												}else{
													json2 = [  ];
												};													
												if(jQuery.isArray(json3)) {
												    json3 = json3;
												}else{
													json3 = [  ];
												};
																																							
												var json = [].concat(json0,json1,json2,json3);
												
																						
													//console.log(json);
												
                        response(jQuery.map(json, function (item) {
                            return {
                                category: item.category,
                            		//Termos
                            		t: item.label,
                            		q: item.q,
                                //Produtos
                                nm: item.label,
                                id: item.id,
                                c: item.c,
                                im: item.im,
                                op: item.op,
                                fp: item.fp,
                                v: item.v,
																//Paginas	
                                p: item.label,
                                u: item.u,
                                //Noticias
                                id: item.id,
                                t:item.label,
                                s: item.s,
                                d: item.d,
                                label: item.label
                                }
                        }))                         

                      },
                      error: function (a, b, c) {
                          debugger;
                      }
                  });
              },
              minLength: 3
            }).data("autocomplete")._renderItem = function(ul, item) {

								jQuery('li.active:even').css('background-color', '#f1efef');

			          		//Termos
					          if (item.q){
					          
					          var sPlural = '';
					          if (item.q >1){sPlural = 's';}else {sPlural = '&nbsp;&nbsp;';}
					         
					         var t = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				   
										return jQuery("<li class='active'></li>")                
                    .data("item.autocomplete", item)
										.append("<a><div class='as-nome-termos'><span>"+t+"</span></div><div class='as-qtd-termos'><span>"+item.q+"&nbsp;Produto"+sPlural+"&nbsp;</span></div></a>")
										.appendTo(ul);										
                }  

			          		//Produtos
					          if (item.c){
					          
					          if (item.fp == 0){
					          	valor = "Consulte-nos";
					          }else{
					          	valor = FormatPrice(item.fp,'R$');
					          }

					          if(item.fp!=item.op){
					            sSale="<div class='as-selo-sale'>"+FormatNum(((item.op-item.fp)/item.op)*100)+"%&nbsp;off</div>";}
					          else{
					            sSale=""
					          }
					          
					          var nm = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				
					          return jQuery("<li class='active'></li>")                
                    .data("item.autocomplete", item)                    
										.append("<a><div id='as-ladosflex'><div class='as-lado1'><img src='"+ FC$.PathPrd  + item.im + "' class='as-img-prod'></div><div class='as-lado2'><div class='as-nome-prod'>" + nm + "</div><div class='as-cat-prod'>" + item.c + "</div><div class='as-selo'>"+ sSale +"</div><div class='as-valor-prod' nowrap='nowrap'>" + valor +"</div></div></div></a>")										
										.appendTo(ul);
                }   
                		//Paginas            
					          if (item.u){           
					          var p = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				   
                    return jQuery("<li class='active'></li>")
                    .data("item.autocomplete", item)
										.append("<a><div class='as-nome-pag'><a href='" + item.u + "'>" + p + "</a></div></a>")
										.appendTo(ul);										
                }
                		//Noticias
					          if (item.s){        
					          var t = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");				   
                    return jQuery("<li class='active'></li>")
                    .data("item.autocomplete", item)
										.append("<a><div class='as-nome-not'>" + t + "</div><div class='as-data-not'>" + item.d + "</div></a>")
										.appendTo(ul);										
                }
              }
        });
