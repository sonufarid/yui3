YUI.add("button-base",function(d){var a=function(f){var g,e;this._srcNode=d.one(f.srcNode);g=this._srcNode;g.addClass("yui3-button");g.setAttribute("role","button");e={label:{setter:function(i){var h=this.getDOMNode();h.set(h.test("input")?"value":"text",i);}},type:{value:"push",validator:function(h){return d.Array.indexOf(["push","toggle"],h);},setter:function(i){if(i==="toggle"){var h=this.getDOMNode();h.on("click",function(){var j=this;j.set("selected",!this.get("selected"));},this);}}},disabled:{value:false,validator:function(h){return d.Lang.isBoolean(h);},setter:function(i){var h=this.getDOMNode();if(i===true){h.setAttribute("disabled","true");h.addClass("yui3-button-disabled");}else{h.removeAttribute("disabled");h.removeClass("yui3-button-disabled");}}},selected:{value:false,setter:function(i){var h=this.getDOMNode();if(i){h.set("aria-selected","true");h.addClass("yui3-button-selected");}else{h.set("aria-selected","false");h.removeClass("yui3-button-selected");}},validator:function(h){return d.Lang.isBoolean(h);}},backgroundColor:{setter:function(h){var j,i;j=a._getContrastYIQ(a._colorToHex(h));i=this.getDOMNode();i.setStyle("backgroundColor",h);i.setStyle("color",j);}}};this.addAttrs(e,f);g.on({mousedown:function(h){h.target.setAttribute("aria-pressed","true");},mouseup:function(h){h.target.setAttribute("aria-pressed","false");},focus:function(h){h.target.addClass("yui3-button-focused");},blur:function(h){h.target.removeClass("yui3-button-focused");}});g.on("click",function(h){if(this.onClickfn){this.onClickfn(h);}},this);this.on("selectedChange",function(h){if(h.propagate===false){h.stopImmediatePropagation();}},this);if(f.onClick){this.onClickfn=f.onClick;}};a.prototype.onClick=function(e){this.onClickfn=e;};a.prototype.getDOMNode=function(){return this._srcNode;};a._colorToHex=function(f){var i,j,h,e,g;if(f.substr(0,1)==="#"){return f;}i=/(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(f);j=parseInt(i[2],10);h=parseInt(i[3],10);e=parseInt(i[4],10);g=e|(h<<8)|(j<<16);return i[1]+"#"+g.toString(16);};a._getContrastYIQ=function(j){var h,f,e,i;h=parseInt(j.substr(1,2),16);f=parseInt(j.substr(3,2),16);e=parseInt(j.substr(5,2),16);i=((h*299)+(f*587)+(e*114))/1000;return(i>=128)?"black":"white";};var c=function(e){var f;e.srcNode=d.Node.create("<button>"+e.label+"</button>");f=new d.Button(e);return f;};var b=function(e){var f=[];e.srcNodes.each(function(h){var g=new d.Button({type:e.type,srcNode:h});f.push(g);});return f;};d.augment(a,d.Attribute);d.Button=a;d.Buttons=b;d.ButtonGenerator=c;},"@VERSION@",{requires:["yui-base","attribute","node","array-extras"]});