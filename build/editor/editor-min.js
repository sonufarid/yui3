YUI.add("frame",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{_ready:null,_rendered:null,_iframe:null,_instance:null,_create:function(){var E,D,C;this._iframe=B.Node.create(A.HTML);this._iframe.setStyle("visibility","hidden");this._iframe.set("src",this.get("src"));this.get("container").append(this._iframe);C=this._resolveWinDoc();E=C.win;D=C.doc;return{win:E,doc:D};},_resolveWinDoc:function(D){var C=(D)?D:{};C.win=B.Node.getDOMNode(this._iframe.get("contentWindow"));C.doc=B.Node.getDOMNode(this._iframe.get("contentWindow.document"));return C;},_onDomEvent:function(E){var D=this._iframe.getXY(),C=this._instance.one("win");E.frameX=D[0]+E.pageX-C.get("scrollLeft");E.frameY=D[1]+E.pageY-C.get("scrollTop");E.frameTarget=E.target;E.frameCurrentTarget=E.currentTarget;E.frameEvent=E;this.publish(E.type,{emitFacade:true,stoppedFn:B.bind(function(G,F){G.halt();},this,E),preventedFn:B.bind(function(G,F){G.preventDefault();},this,E)});this.fire(E.type,E);},initializer:function(){this.publish("ready",{emitFacade:true,defaultFn:this._defReadyFn});},_defReadyFn:function(){var D=this.getInstance(),C=B.bind(this._onDomEvent,this);B.each(B.Node.DOM_EVENTS,function(F,E){if(F===1){D.on(E,C,D.config.doc);}});D._use=D.use;D.use=B.bind(this.use,this);this._iframe.setStyle("visibility","visible");},use:function(){var E=this.getInstance(),D=B.Array(arguments),C=false;if(B.Lang.isFunction(D[D.length-1])){C=D.pop();}if(C){D.push(function(){C.apply(E,arguments);});}E._use.apply(E,D);},_onContentReady:function(E){if(!this._ready){this._ready=true;var D=this.getInstance(),C=B.clone(this.get("use"));this.fire("contentready");if(E){D.config.doc=B.Node.getDOMNode(E.target);}C.push(B.bind(function(){this.fire("ready");},this));D.use.apply(D,C);D.one("doc").get("documentElement").addClass("yui-js-enabled");}},_instanceLoaded:function(D){this._instance=D;this._instance.on("contentready",B.bind(this._onContentReady,this),"body");var C="",F=this._instance.config.doc;C=B.substitute(A.PAGE_HTML,{DIR:this.get("dir"),LANG:this.get("lang"),TITLE:this.get("title"),META:A.META,CONTENT:this.get("content"),BASE_HREF:this.get("basehref"),DEFAULT_CSS:A.DEFAULT_CSS});if(B.config.doc.compatMode!="BackCompat"){C=A.DOC_TYPE+"\n"+C;}else{}F.open();F.write(C);F.close();if(this.get("designMode")){F.designMode="on";if(!B.UA.ie){try{F.execCommand("styleWithCSS",false,false);F.execCommand("insertbronreturn",false,false);}catch(E){}}}},delegate:function(E,D,C,G){var F=this.getInstance();if(!F){return false;}if(!G){G=C;C="body";}return F.delegate(E,D,C,G);},getInstance:function(){return this._instance;},render:function(H){if(this._rendered){return this;}this._rendered=true;if(H){this.set("container",H);}var I,F=this._create(),C=B.bind(function(J){this._instanceLoaded(J);},this),E=B.clone(this.get("use")),D={debug:false,bootstrap:false,win:F.win,doc:F.doc},G=B.bind(function(){D=this._resolveWinDoc(D);I=YUI(D);I.use("node-base",C);},this);E.push(G);B.use.apply(B,E);return this;},_resolveBaseHref:function(C){if(!C||C===""){C=B.config.doc.location.href;if(C.indexOf("?")!==-1){C=C.substring(0,C.indexOf("?"));}C=C.substring(0,C.lastIndexOf("/"))+"/";}return C;},_getHTML:function(C){if(this._ready){var D=this.getInstance();C=D.one("body").get("innerHTML");}return C;},_setHTML:function(C){if(this._ready){var D=this.getInstance();D.one("body").set("innerHTML",C);}else{this.on("contentready",B.bind(function(E,G){var F=this.getInstance();F.one("body").set("innerHTML",E);},this,C));}return C;},focus:function(){this.getInstance().config.win.focus();return this;}},{DEFAULT_CSS:"html { height: 95%; } body { padding: 7px; background-color: #fff; font: 13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } img { cursor: pointer !important; border: none; }",HTML:'<iframe border="0" frameBorder="0" marginWidth="0" marginHeight="0" leftMargin="0" topMargin="0" allowTransparency="true" width="100%" height="100%"></iframe>',PAGE_HTML:'<html dir="{DIR}" lang="{LANG}"><head><title>{TITLE}</title>{META}<base href="{BASE_HREF}"/><style id="editor_css">{DEFAULT_CSS}</style></head><body>{CONTENT}</body></html>',DOC_TYPE:'<!DOCTYPE HTML PUBLIC "-/'+"/W3C/"+"/DTD HTML 4.01/"+'/EN" "http:/'+'/www.w3.org/TR/html4/strict.dtd">',META:'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>',NAME:"frame",ATTRS:{title:{value:"Blank Page"},dir:{value:"ltr"},lang:{value:"en-US"},src:{value:"javascript"+((B.UA.ie)?":false":":")+";"},designMode:{writeOnce:true,value:false},content:{value:"<br>",setter:"_setHTML",getter:"_getHTML"},basehref:{value:false,getter:"_resolveBaseHref"},use:{writeOnce:true,value:["substitute","node","selector-css3"]},container:{value:"body",setter:function(C){return B.one(C);}},id:{writeOnce:true,getter:function(C){if(!C){C="iframe-"+B.guid();}return C;}}}});B.Frame=A;},"@VERSION@",{requires:["base","node","selector-css3","substitute"],skinnable:false});YUI.add("selection",function(B){var A="textContent",D="innerHTML",C="fontFamily";B.Selection=function(){var I,H,E,G,F;if(B.config.win.getSelection){I=B.config.win.getSelection();}else{if(B.config.doc.selection){I=B.config.doc.selection.createRange();}}this._selection=I;if(I.pasteHTML){A="nodeValue";this.isCollapsed=(I.compareEndPoints("StartToEnd",I))?false:true;if(this.isCollapsed){this.anchorNode=this.focusNode=B.one(I.parentElement());}}else{this.isCollapsed=I.isCollapsed;this.anchorNode=B.Selection.resolve(I.anchorNode);this.focusNode=B.Selection.resolve(I.focusNode);this.anchorOffset=I.anchorOffset;this.focusOffset=I.focusOffset;this.anchorTextNode=B.one(I.anchorNode);this.focusTextNode=B.one(I.focusNode);}if(B.Lang.isString(I.text)){this.text=I.text;}else{this.text=I.toString();}};B.Selection.filter=function(){var F=B.all(B.Selection.ALL),G=B.all("strong,em"),E;F.each(function(I){if(I.getStyle(C)){var H=new B.StyleSheet("editor");
H.set("."+I._yuid,{fontFamily:I.getStyle(C)});I.addClass(I._yuid);I.removeAttribute("face");I.setStyle(C,"");if(I.getAttribute("style")===""){I.removeAttribute("style");}}});G.each(function(K,H){var I=K.get("tagName").toLowerCase(),J="i";if(I==="strong"){J="b";}B.Selection.prototype._swap(G.item(H),J);});E=B.all("ol,ul");E.each(function(I,H){var J=I.all("li");if(!J.size()){I.remove();}});};B.Selection.unfilter=function(){var F=B.all("body [class]"),G="",E,H;F.each(function(I){if(I.hasClass(I._yuid)){I.setStyle(C,I.getStyle(C));I.removeClass(I._yuid);if(I.getAttribute("class")===""){I.removeAttribute("class");}}});E=B.all(".yui-non");E.each(function(I){if(I.get("innerHTML")===""){I.remove();}});H=B.all("body [id]");H.each(function(I){if(I.get("id").indexOf("yui_3_")===0){I.removeAttribute("id");I.removeAttribute("_yuid");}});G=B.one("body").get("innerHTML");F.each(function(I){I.addClass(I._yuid);I.setStyle(C,"");if(I.getAttribute("style")===""){I.removeAttribute("style");}});return G;};B.Selection.resolve=function(E){if(E&&E.nodeType===3){E=E.parentNode;}return B.one(E);};B.Selection.ALL="[style],font[face]";B.Selection.TMP="yui-tmp";B.Selection.DEFAULT_TAG="span";B.Selection.prototype={text:null,isCollapsed:null,anchorNode:null,anchorOffset:null,anchorTextNode:null,focusNode:null,focusOffset:null,focusTextNode:null,_selection:null,_wrap:function(G,E){var F=B.Node.create("<"+E+"></"+E+">");F.set(D,G.get(D));G.set(D,"");G.append(F);return B.Node.getDOMNode(F);},_swap:function(G,E){var F=B.Node.create("<"+E+"></"+E+">");F.set(D,G.get(D));G.replace(F,G);return B.Node.getDOMNode(F);},getSelected:function(){B.Selection.filter();B.config.doc.execCommand("fontname",null,B.Selection.TMP);var F=B.all(B.Selection.ALL),E=[];F.each(function(H,G){if(H.getStyle(C,B.Selection.TMP)){H.setStyle(C,"");H.removeAttribute("face");if(H.getAttribute("style")===""){H.removeAttribute("style");}E.push(B.Node.getDOMNode(F.item(G)));}});return B.all(E);},insertContent:function(E){return this.insertAtCursor(E,this.anchorTextNode,this.anchorOffset,true);},insertAtCursor:function(K,F,H,L){var N=B.Node.create("<"+B.Selection.DEFAULT_TAG+' class="yui-non"></'+B.Selection.DEFAULT_TAG+">"),E,I,G,M,J=this.createRange();if(J.pasteHTML){M=B.Node.create(K);J.pasteHTML('<span id="rte-insert"></span>');E=B.one("#rte-insert");E.set("id","");E.replace(M);return M;}else{E=F.get(A);I=B.one(B.config.doc.createTextNode(E.substr(0,H)));G=B.one(B.config.doc.createTextNode(E.substr(H)));F.replace(I,F);M=B.Node.create(K);I.insert(M,"after");M.insert(N,"after");N.insert(G,"after");this.selectNode(N,L);}return M;},wrapContent:function(F){F=(F)?F:B.Selection.DEFAULT_TAG;if(!this.isCollapsed){var H=this.getSelected(),K=[],G,I,J,E;H.each(function(N,L){var M=N.get("tagName").toLowerCase();if(M==="font"){K.push(this._swap(H.item(L),F));}else{K.push(this._wrap(H.item(L),F));}},this);G=this.createRange();J=K[0];I=K[K.length-1];if(this._selection.removeAllRanges){G.setStart(K[0],0);G.setEnd(I,I.childNodes.length);this._selection.removeAllRanges();this._selection.addRange(G);}else{G.moveToElementText(B.Node.getDOMNode(J));E=this.createRange();E.moveToElementText(B.Node.getDOMNode(I));G.setEndPoint("EndToEnd",E);G.select();}K=B.all(K);return K;}else{return B.all([]);}},replace:function(K,I){var F=this.createRange(),J,E,G,H;if(F.getBookmark){G=F.getBookmark();E=this.anchorNode.get("innerHTML").replace(K,I);this.anchorNode.set("innerHTML",E);F.moveToBookmark(G);H=B.one(F.parentElement());}else{J=this.anchorTextNode;E=J.get(A);G=E.indexOf(K);E=E.replace(K,"");J.set(A,E);H=this.insertAtCursor(I,J,G,true);}return H;},remove:function(){this._selection.removeAllRanges();return this;},createRange:function(){if(B.config.doc.selection){return B.config.doc.selection.createRange();}else{return B.config.doc.createRange();}},selectNode:function(G,I,E){E=E||0;G=B.Node.getDOMNode(G);var F=this.createRange();if(F.selectNode){F.selectNode(G);this._selection.removeAllRanges();this._selection.addRange(F);if(I){try{this._selection.collapse(G,E);}catch(H){this._selection.collapse(G,0);}}}else{F.moveToElementText(G);F.select();if(I){F.collapse(((E)?false:true));}}return this;},setCursor:function(){return this.insertContent(B.Selection.CURSOR);},getCursor:function(){return B.one("#"+B.Selection.CURID);},toString:function(){return"Selection Object";}};},"@VERSION@",{requires:["node"],skinnable:false});YUI.add("exec-command",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{_inst:null,command:function(E,D){var C=A.COMMANDS[E];if(C){return C.call(this,E,D);}else{return this._command(E,D);}},_command:function(E,D){var C=this.getInstance();try{C.config.doc.execCommand(E,false,D);}catch(F){}},getInstance:function(){if(!this._inst){this._inst=this.get("host").getInstance();}return this._inst;},initializer:function(){B.mix(this.get("host"),{execCommand:function(D,C){return this.exec.command(D,C);},_execCommand:function(D,C){return this.exec._command(D,C);}});}},{NAME:"execCommand",NS:"exec",ATTRS:{host:{value:false}},COMMANDS:{wrap:function(E,C){var D=this.getInstance();return(new D.Selection()).wrapContent(C);},inserthtml:function(E,C){var D=this.getInstance();return(new D.Selection()).insertContent(C);},insertimage:function(D,C){return this.command("inserthtml",'<img src="'+C+'">');},addclass:function(E,C){var D=this.getInstance();return(new D.Selection()).getSelected().addClass(C);},removeclass:function(E,C){var D=this.getInstance();return(new D.Selection()).getSelected().removeClass(C);},bidi:function(){var F=this.getInstance(),E=new F.Selection(),D,C,G="p,div,li,body";if(E.anchorNode){D=E.anchorNode;if(!E.anchorNode.test(G)){D=E.anchorNode.ancestor(G);}C=D.getAttribute("dir");if(C===""){C=F.one("html").getAttribute("dir");}if(C==="rtl"){C="ltr";}else{C="rtl";}D.setAttribute("dir",C);}return D;},backcolor:function(C,D){if(B.UA.gecko||B.UA.opera){C="hilitecolor";}if(!B.UA.ie){this._command("styleWithCSS","true");}this._command(C,D);if(!B.UA.ie){this._command("styleWithCSS",false);
}},hilitecolor:function(){A.COMMANDS.backcolor.apply(this,arguments);}}});B.namespace("Plugin");B.Plugin.ExecCommand=A;},"@VERSION@",{requires:["frame"],skinnable:false});YUI.add("editor-tab",function(C){var B=function(){B.superclass.constructor.apply(this,arguments);},A="host";C.extend(B,C.Base,{_onNodeChange:function(E){var D="indent";if(E.changedType==="tab"){if(!E.changedNode.test("li, li *")){E.changedEvent.halt();E.preventDefault();if(E.changedEvent.shiftKey){D="outdent";}this.get(A).execCommand(D,"");}}},initializer:function(){this.get(A).on("nodeChange",C.bind(this._onNodeChange,this));}},{NAME:"editorTab",NS:"tab",ATTRS:{host:{value:false}}});C.namespace("Plugin");C.Plugin.EditorTab=B;},"@VERSION@",{requires:["editor-base"],skinnable:false});YUI.add("createlink-base",function(B){var A={};A.STRINGS={PROMPT:"Please enter the URL for the link to point to:",DEFAULT:"http://"};B.namespace("Plugin");B.Plugin.CreateLinkBase=A;B.mix(B.Plugin.ExecCommand.COMMANDS,{createlink:function(G){var F=this.get("host").getInstance(),E,C,D=prompt(A.STRINGS.PROMPT,A.STRINGS.DEFAULT);if(D){this.get("host")._execCommand(G,D);E=(new F.Selection()).getSelected();C=E.item(0).one("a");E.item(0).replace(C);}return C;}});},"@VERSION@",{requires:["editor-base"],skinnable:false});YUI.add("editor-base",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{frame:null,initializer:function(){var C=new B.Frame({designMode:true,title:A.STRINGS.title,use:A.USE,dir:this.get("dir")}).plug(B.Plugin.ExecCommand);C.after("ready",B.bind(this._afterFrameReady,this));C.addTarget(this);this.frame=C;this.publish("nodeChange",{emitFacade:true,bubbles:true,defaultFn:this._defNodeChangeFn});},_defNodeChangeFn:function(G){switch(G.changedType){case"enter":break;case"tab":if(!G.changedNode.test("li, li *")&&!G.changedEvent.shiftKey){this.execCommand("inserthtml","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");G.changedEvent.halt();}break;}var H=this.getDomPath(G.changedNode),D={},F,C,E=[];H.each(function(N){var I=N.get("tagName").toLowerCase(),M=A.TAG2CMD[I],L=B.Node.getDOMNode(N);if(M){D[M]=1;}var K=L.style;if(K.fontWeight.toLowerCase()=="bold"){D.bold=1;}if(K.fontStyle.toLowerCase()=="italic"){D.italic=1;}if(K.textDecoration.toLowerCase()=="underline"){D.underline=1;}if(K.textDecoration.toLowerCase()=="line-through"){D.strikethrough=1;}F=N.getStyle("fontFamily").split(",")[0].toLowerCase();C=N.getStyle("fontSize");var J=N.get("className").split(" ");B.each(J,function(O){if(O!==""&&(O.substr(0,4)!=="yui_")){E.push(O);}});});G.dompath=H;G.fontFamily=F;G.fontSize=C;G.classNames=E;G.commands=D;},getDomPath:function(C){var D=[];while(C!==null){if(!C.inDoc()){C=null;break;}if(C.get("nodeName")&&C.get("nodeType")&&(C.get("nodeType")==1)){D.push(B.Node.getDOMNode(C));}if(C.test("body")){C=null;break;}C=C.get("parentNode");}if(D.length===0){D[0]=B.confg.doc.body;}return B.all(D.reverse());},_afterFrameReady:function(){var C=this.frame.getInstance();this.frame.on("mousedown",B.bind(this._onFrameMouseDown,this));this.frame.on("keyup",B.bind(this._onFrameKeyUp,this));this.frame.on("keydown",B.bind(this._onFrameKeyDown,this));C.Selection.filter();},_onFrameMouseDown:function(C){this.fire("nodeChange",{changedNode:C.frameTarget,changedType:"mousedown",changedEvent:C});},_onFrameKeyUp:function(E){if(A.NC_KEYS[E.keyCode]){var D=this.frame.getInstance(),C=new D.Selection();if(C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keyup",selection:C,changedEvent:E});}}},_onFrameKeyDown:function(E){if(A.NC_KEYS[E.keyCode]){var D=this.frame.getInstance(),C=new D.Selection();this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode],changedEvent:E});}},execCommand:function(C,D){return this.frame.execCommand(C,D);},getInstance:function(){return this.frame.getInstance();},destructor:function(){},render:function(C){this.frame.set("content",this.get("content"));this.frame.render(C);return this;},focus:function(){this.frame.getInstance().one("win").focus();return this;},getContent:function(){var C=this.getInstance().Selection.unfilter();C=C.replace(/ _yuid="([^>]*)"/g,"");return C;}},{TAG2CMD:{"b":"bold","strong":"bold","i":"italic","em":"italic","u":"underline","sup":"superscript","sub":"subscript","img":"insertimage","a":"createlink","ul":"insertunorderedlist","ol":"insertorderedlist"},NC_KEYS:{8:"backspace",9:"tab",13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",46:"delete"},USE:["substitute","node","selector-css3","selection","stylesheet"],NAME:"editorBase",STRINGS:{title:"Rich Text Editor"},ATTRS:{content:{value:"<br>",setter:function(C){if(C.substr(0,1)==="\n"){C=C.substr(1);}return this.frame.set("content",C);},getter:function(){return this.frame.get("content");}},dir:{writeOnce:true,value:"ltr"}}});B.EditorBase=A;},"@VERSION@",{requires:["base","frame","node","exec-command"],skinnable:false});YUI.add("editor-lists",function(F){var E=function(){E.superclass.constructor.apply(this,arguments);},B="li",C="ol",D="ul",A="host";F.extend(E,F.Base,{_onNodeChange:function(K){var J=this.get(A).getInstance(),G,N,O,H,I,L,M=false,P;if(F.UA.ie&&K.changedType==="enter"){K.changedEvent.halt();K.preventDefault();N=K.changedNode;O=J.Node.create("<"+B+">"+E.NON+"</"+B+">");if(!N.test(B)){N=N.ancestor(B);}N.insert(O,"after");G=new J.Selection();G.selectNode(O.get("firstChild"));}if(K.changedType==="tab"){if(K.changedNode.test(B+", "+B+" *")){K.changedEvent.halt();K.preventDefault();N=K.changedNode;I=K.changedEvent.shiftKey;L=N.ancestor(C+","+D);P=D;if(L.get("tagName").toLowerCase()===C){P=C;}if(!N.test(B)){N=N.ancestor(B);}if(I){if(N.ancestor(B)){N.ancestor(B).insert(N,"after");M=true;}}else{if(N.previous(B)){H=J.Node.create("<"+P+"></"+P+">");N.previous(B).append(H);H.append(N);M=true;}}}if(M){N.all(E.REMOVE).remove();if(F.UA.ie){N=N.append(E.NON).one(E.NON_SEL);}(new J.Selection()).selectNode(N,true,true);}}},initializer:function(){this.get(A).on("nodeChange",F.bind(this._onNodeChange,this));
}},{NON:'<span class="yui-non">&nbsp;</span>',NON_SEL:"span.yui-non",REMOVE:"br",NAME:"editorLists",NS:"lists",ATTRS:{host:{value:false}}});F.namespace("Plugin");F.Plugin.EditorLists=E;F.mix(F.Plugin.ExecCommand.COMMANDS,{insertunorderedlist:function(I){var H=this.get("host").getInstance(),G;this.get("host")._execCommand(I,"");G=(new H.Selection()).getSelected();return G;},insertorderedlist:function(I){var H=this.get("host").getInstance(),G;this.get("host")._execCommand(I,"");G=(new H.Selection()).getSelected();return G;}});},"@VERSION@",{requires:["editor-base"],skinnable:false});YUI.add("editor",function(A){},"@VERSION@",{use:["frame","selection","exec-command","editor-base"],skinnable:false});