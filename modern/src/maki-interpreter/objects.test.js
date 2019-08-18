import { getClass } from "./objects";
import runtime from "../runtime";

const getMakiMethods = obj =>
  Object.getOwnPropertyNames(obj).filter(name => {
    return (
      typeof obj[name] === "function" &&
      !name.startsWith("js_") &&
      name !== "constructor"
    );
  });

for (const [key, Klass] of Object.entries(runtime)) {
  const obj = getClass(key);
  describe(`${obj.name}`, () => {
    test("implements getclassname()", () => {
      expect(Klass.prototype.getclassname()).toBe(obj.name);
    });
    test("has the correct parent", () => {
      const Parent = Object.getPrototypeOf(Klass);
      if (Klass.prototype.getclassname() === "Object") {
        expect(Parent.prototype).toBe(undefined);
        return;
      }
      expect(Parent.prototype.getclassname()).toBe(obj.parent);
    });
  });
}

describe("Maki classes", () => {
  const runtimeMethods = new Set();
  const objectMethods = new Set();
  for (const [key, Klass] of Object.entries(runtime)) {
    const obj = getClass(key);
    getMakiMethods(Klass.prototype).forEach(methodName => {
      runtimeMethods.add(`${obj.name}.${methodName}`);
    });
    obj.functions.forEach(func => {
      objectMethods.add(`${obj.name}.${func.name.toLowerCase()}`);
    });
  }

  test("have no extra methods", () => {
    // getclassname _should_ be implemented on Object and let each class inherit
    // it. However it's far easier to implement it on each class directly, so
    // we'll allow that.
    function isntGetClassname(method) {
      return !/\.getclassname$/.test(method);
    }

    function isntMakiMethod(method) {
      return !objectMethods.has(method);
    }

    const extra = [...runtimeMethods]
      .filter(isntMakiMethod)
      .filter(isntGetClassname);

    expect(extra).toEqual([]);
  });

  test("Track all missing methods", () => {
    const missing = [...objectMethods]
      .filter(x => !runtimeMethods.has(x))
      .sort();

    expect(missing).toMatchInlineSnapshot(`
Array [
  "AnimatedLayer.getautoreplay",
  "AnimatedLayer.getcurframe",
  "AnimatedLayer.getdirection",
  "AnimatedLayer.getendframe",
  "AnimatedLayer.getlength",
  "AnimatedLayer.getstartframe",
  "AnimatedLayer.gotoframe",
  "AnimatedLayer.ispaused",
  "AnimatedLayer.isplaying",
  "AnimatedLayer.isstopped",
  "AnimatedLayer.onframe",
  "AnimatedLayer.onpause",
  "AnimatedLayer.onplay",
  "AnimatedLayer.onresume",
  "AnimatedLayer.onstop",
  "AnimatedLayer.pause",
  "AnimatedLayer.play",
  "AnimatedLayer.setautoreplay",
  "AnimatedLayer.setendframe",
  "AnimatedLayer.setrealtime",
  "AnimatedLayer.setspeed",
  "AnimatedLayer.setstartframe",
  "AnimatedLayer.stop",
  "Browser.back",
  "Browser.forward",
  "Browser.home",
  "Browser.navigateurl",
  "Browser.onbeforenavigate",
  "Browser.ondocumentcomplete",
  "Browser.refresh",
  "Browser.settargetname",
  "Browser.stop",
  "Button.getactivated",
  "Button.leftclick",
  "Button.onactivate",
  "Button.onleftclick",
  "Button.onrightclick",
  "Button.rightclick",
  "Button.setactivated",
  "Button.setactivatednocallback",
  "CfgGroup.cfggetfloat",
  "CfgGroup.cfggetguid",
  "CfgGroup.cfggetint",
  "CfgGroup.cfggetname",
  "CfgGroup.cfggetstring",
  "CfgGroup.cfgsetfloat",
  "CfgGroup.cfgsetint",
  "CfgGroup.cfgsetstring",
  "CfgGroup.oncfgchanged",
  "CheckBox.gettext",
  "CheckBox.ischecked",
  "CheckBox.ontoggle",
  "CheckBox.setchecked",
  "CheckBox.settext",
  "Component.getcontent",
  "Component.getguid",
  "Component.getwac",
  "Component.ongetwac",
  "Component.ongiveupwac",
  "Component.setacceptwac",
  "Component.setregion",
  "Component.setregionfrommap",
  "ComponentBucket.enumchildren",
  "ComponentBucket.getmaxheight",
  "ComponentBucket.getmaxwidth",
  "ComponentBucket.getnumchildren",
  "ComponentBucket.getscroll",
  "ComponentBucket.setscroll",
  "Container.close",
  "Container.enumlayout",
  "Container.getcurlayout",
  "Container.getnumlayouts",
  "Container.isdynamic",
  "Container.onbeforeswitchtolayout",
  "Container.onhidelayout",
  "Container.onshowlayout",
  "Container.onswitchtolayout",
  "Container.setname",
  "Container.setxmlparam",
  "Container.switchtolayout",
  "Container.toggle",
  "DropDownList.additem",
  "DropDownList.closelist",
  "DropDownList.deleteallitems",
  "DropDownList.delitem",
  "DropDownList.finditem",
  "DropDownList.getcustomtext",
  "DropDownList.getitemselected",
  "DropDownList.getitemtext",
  "DropDownList.getnumitems",
  "DropDownList.getselected",
  "DropDownList.getselectedtext",
  "DropDownList.onselect",
  "DropDownList.openlist",
  "DropDownList.selectitem",
  "DropDownList.setitems",
  "DropDownList.setlistheight",
  "DropDownList.setnoitemtext",
  "Edit.enter",
  "Edit.getautoenter",
  "Edit.getidleenabled",
  "Edit.gettext",
  "Edit.onabort",
  "Edit.oneditupdate",
  "Edit.onenter",
  "Edit.onidleeditupdate",
  "Edit.selectall",
  "Edit.setautoenter",
  "Edit.setidleenabled",
  "Edit.settext",
  "Group.enumobject",
  "Group.getmouseposx",
  "Group.getmouseposy",
  "Group.getnumobjects",
  "Group.islayout",
  "Group.oncreateobject",
  "GroupList.enumitem",
  "GroupList.getnumitems",
  "GroupList.instantiate",
  "GroupList.removeall",
  "GroupList.scrolltopercent",
  "GuiList.addcolumn",
  "GuiList.additem",
  "GuiList.deleteallitems",
  "GuiList.deletebypos",
  "GuiList.deselectall",
  "GuiList.end",
  "GuiList.ensureitemvisible",
  "GuiList.getcolumnlabel",
  "GuiList.getcolumnnumeric",
  "GuiList.getcolumnwidth",
  "GuiList.getfirstitemselected",
  "GuiList.getfirstitemvisible",
  "GuiList.getfontsize",
  "GuiList.getheaderheight",
  "GuiList.getitemcount",
  "GuiList.getitemfocused",
  "GuiList.getitemlabel",
  "GuiList.getitemselected",
  "GuiList.getlastaddeditempos",
  "GuiList.getlastitemvisible",
  "GuiList.getnextitemselected",
  "GuiList.getnumcolumns",
  "GuiList.getnumitems",
  "GuiList.getpreventmultipleselection",
  "GuiList.getsortcolumn",
  "GuiList.getsortdirection",
  "GuiList.getsubitemtext",
  "GuiList.getwantautodeselect",
  "GuiList.home",
  "GuiList.insertitem",
  "GuiList.invalidatecolumns",
  "GuiList.invalidateitem",
  "GuiList.invertselection",
  "GuiList.iscolumndynamic",
  "GuiList.isitemfocused",
  "GuiList.jumptonext",
  "GuiList.moveitem",
  "GuiList.next",
  "GuiList.oncolumndblclick",
  "GuiList.oncolumnlabelclick",
  "GuiList.ondelete",
  "GuiList.ondoubleclick",
  "GuiList.onitemselection",
  "GuiList.onleftclick",
  "GuiList.onrightclick",
  "GuiList.onsecondleftclick",
  "GuiList.onselectall",
  "GuiList.onsetvisible",
  "GuiList.pagedown",
  "GuiList.pageup",
  "GuiList.previous",
  "GuiList.reset",
  "GuiList.resort",
  "GuiList.scrollabsolute",
  "GuiList.scrolldown",
  "GuiList.scrollleft",
  "GuiList.scrollrelative",
  "GuiList.scrollright",
  "GuiList.scrolltoitem",
  "GuiList.scrollup",
  "GuiList.selectall",
  "GuiList.selectcurrent",
  "GuiList.selectfirstentry",
  "GuiList.setautosort",
  "GuiList.setcolumndynamic",
  "GuiList.setcolumnlabel",
  "GuiList.setcolumnwidth",
  "GuiList.setfontsize",
  "GuiList.setitemfocused",
  "GuiList.setitemlabel",
  "GuiList.setminimumsize",
  "GuiList.setpreventmultipleselection",
  "GuiList.setselected",
  "GuiList.setselectionend",
  "GuiList.setselectionstart",
  "GuiList.setsortcolumn",
  "GuiList.setsortdirection",
  "GuiList.setsubitem",
  "GuiList.setwantautodeselect",
  "GuiList.toggleselection",
  "GuiObject.bringabove",
  "GuiObject.bringbelow",
  "GuiObject.bringtoback",
  "GuiObject.bringtofront",
  "GuiObject.canceltarget",
  "GuiObject.clienttoscreenh",
  "GuiObject.clienttoscreenw",
  "GuiObject.clienttoscreenx",
  "GuiObject.clienttoscreeny",
  "GuiObject.endmodal",
  "GuiObject.findobjectxy",
  "GuiObject.getalpha",
  "GuiObject.getautoheight",
  "GuiObject.getautowidth",
  "GuiObject.getenabled",
  "GuiObject.getguih",
  "GuiObject.getguirelath",
  "GuiObject.getguirelatw",
  "GuiObject.getguirelatx",
  "GuiObject.getguirelaty",
  "GuiObject.getguiw",
  "GuiObject.getguix",
  "GuiObject.getguiy",
  "GuiObject.getinterface",
  "GuiObject.getname",
  "GuiObject.getparentlayout",
  "GuiObject.gettopparent",
  "GuiObject.gototarget",
  "GuiObject.isactive",
  "GuiObject.isgoingtotarget",
  "GuiObject.ismouseover",
  "GuiObject.ismouseoverrect",
  "GuiObject.isvisible",
  "GuiObject.onaccelerator",
  "GuiObject.onaction",
  "GuiObject.onchar",
  "GuiObject.onenable",
  "GuiObject.onenterarea",
  "GuiObject.ongetfocus",
  "GuiObject.onkeydown",
  "GuiObject.onkeyup",
  "GuiObject.onkillfocus",
  "GuiObject.onleavearea",
  "GuiObject.onleftbuttondblclk",
  "GuiObject.onleftbuttondown",
  "GuiObject.onleftbuttonup",
  "GuiObject.onmousemove",
  "GuiObject.onresize",
  "GuiObject.onrightbuttondblclk",
  "GuiObject.onrightbuttondown",
  "GuiObject.onrightbuttonup",
  "GuiObject.onsetvisible",
  "GuiObject.onstartup",
  "GuiObject.ontargetreached",
  "GuiObject.reversetarget",
  "GuiObject.runmodal",
  "GuiObject.screentoclienth",
  "GuiObject.screentoclientw",
  "GuiObject.screentoclientx",
  "GuiObject.screentoclienty",
  "GuiObject.sendaction",
  "GuiObject.setalpha",
  "GuiObject.setenabled",
  "GuiObject.setfocus",
  "GuiObject.settargeta",
  "GuiObject.settargeth",
  "GuiObject.settargetspeed",
  "GuiObject.settargetw",
  "GuiObject.settargetx",
  "GuiObject.settargety",
  "GuiTree.addtreeitem",
  "GuiTree.canceleditlabel",
  "GuiTree.collapseitem",
  "GuiTree.collapseitemdeferred",
  "GuiTree.deleteallitems",
  "GuiTree.delitemdeferred",
  "GuiTree.edititemlabel",
  "GuiTree.ensureitemvisible",
  "GuiTree.enumallitems",
  "GuiTree.enumrootitem",
  "GuiTree.enumvisiblechilditems",
  "GuiTree.enumvisibleitems",
  "GuiTree.expanditem",
  "GuiTree.expanditemdeferred",
  "GuiTree.getautoedit",
  "GuiTree.getbylabel",
  "GuiTree.getcontentsheight",
  "GuiTree.getcontentswidth",
  "GuiTree.getcuritem",
  "GuiTree.getfontsize",
  "GuiTree.getitemfrompoint",
  "GuiTree.getitemrecth",
  "GuiTree.getitemrectw",
  "GuiTree.getitemrectx",
  "GuiTree.getitemrecty",
  "GuiTree.getnumrootitems",
  "GuiTree.getnumvisiblechilditems",
  "GuiTree.getnumvisibleitems",
  "GuiTree.getsibling",
  "GuiTree.getsorted",
  "GuiTree.hiliteitem",
  "GuiTree.hittest",
  "GuiTree.jumptonext",
  "GuiTree.movetreeitem",
  "GuiTree.onchar",
  "GuiTree.oncontextmenu",
  "GuiTree.onitemdeselected",
  "GuiTree.onitemrecvdrop",
  "GuiTree.onitemselected",
  "GuiTree.onlabelchange",
  "GuiTree.onmousewheeldown",
  "GuiTree.onmousewheelup",
  "GuiTree.onwantautocontextmenu",
  "GuiTree.removetreeitem",
  "GuiTree.selectitem",
  "GuiTree.selectitemdeferred",
  "GuiTree.setautocollapse",
  "GuiTree.setautoedit",
  "GuiTree.setfontsize",
  "GuiTree.setsorted",
  "GuiTree.sorttreeitems",
  "GuiTree.unhiliteitem",
  "Layer.fx_getalphamode",
  "Layer.fx_getbgfx",
  "Layer.fx_getbilinear",
  "Layer.fx_getclear",
  "Layer.fx_getenabled",
  "Layer.fx_getlocalized",
  "Layer.fx_getrealtime",
  "Layer.fx_getrect",
  "Layer.fx_getspeed",
  "Layer.fx_getwrap",
  "Layer.fx_onframe",
  "Layer.fx_ongetpixela",
  "Layer.fx_ongetpixeld",
  "Layer.fx_ongetpixelr",
  "Layer.fx_ongetpixelx",
  "Layer.fx_ongetpixely",
  "Layer.fx_oninit",
  "Layer.fx_restart",
  "Layer.fx_setalphamode",
  "Layer.fx_setbgfx",
  "Layer.fx_setbilinear",
  "Layer.fx_setclear",
  "Layer.fx_setenabled",
  "Layer.fx_setgridsize",
  "Layer.fx_setlocalized",
  "Layer.fx_setrealtime",
  "Layer.fx_setrect",
  "Layer.fx_setspeed",
  "Layer.fx_setwrap",
  "Layer.fx_update",
  "Layer.onbeginresize",
  "Layer.onendresize",
  "Layer.setregion",
  "Layer.setregionfrommap",
  "Layout.beforeredock",
  "Layout.center",
  "Layout.getdesktopalpha",
  "Layout.getscale",
  "Layout.getsnapadjustbottom",
  "Layout.getsnapadjustleft",
  "Layout.getsnapadjustright",
  "Layout.getsnapadjusttop",
  "Layout.islayoutanimationsafe",
  "Layout.istransparencysafe",
  "Layout.ondock",
  "Layout.onendmove",
  "Layout.onmouseenterlayout",
  "Layout.onmouseleavelayout",
  "Layout.onmove",
  "Layout.onscale",
  "Layout.onsnapadjustchanged",
  "Layout.onundock",
  "Layout.onuserresize",
  "Layout.redock",
  "Layout.setdesktopalpha",
  "Layout.setredrawonresize",
  "Layout.setscale",
  "Layout.snapadjust",
  "LayoutStatus.callme",
  "List.additem",
  "List.enumitem",
  "List.finditem",
  "List.getnumitems",
  "List.removeall",
  "List.removeitem",
  "Map.getheight",
  "Map.getregion",
  "Map.getvalue",
  "Map.getwidth",
  "Map.inregion",
  "Map.loadmap",
  "MenuButton.closemenu",
  "MenuButton.onclosemenu",
  "MenuButton.onopenmenu",
  "MenuButton.onselectitem",
  "MenuButton.openmenu",
  "MouseRedir.getredirection",
  "MouseRedir.setredirection",
  "MouseRedir.setregion",
  "MouseRedir.setregionfrommap",
  "Object.onnotify",
  "PopupMenu.addsubmenu",
  "PopupMenu.disablecommand",
  "PopupMenu.getnumcommands",
  "PopupMenu.popatxy",
  "QueryList.onresetquery",
  "Region.add",
  "Region.copy",
  "Region.getboundingboxh",
  "Region.getboundingboxw",
  "Region.getboundingboxx",
  "Region.getboundingboxy",
  "Region.loadfrombitmap",
  "Region.loadfrommap",
  "Region.offset",
  "Region.stretch",
  "Region.sub",
  "Slider.getposition",
  "Slider.lock",
  "Slider.onpostedposition",
  "Slider.onsetfinalposition",
  "Slider.onsetposition",
  "Slider.setposition",
  "Slider.unlock",
  "System.acos",
  "System.activateapplication",
  "System.asin",
  "System.atan",
  "System.atan2",
  "System.chr",
  "System.cos",
  "System.datetolongtime",
  "System.datetotime",
  "System.ddesend",
  "System.debugstring",
  "System.eject",
  "System.enumcontainer",
  "System.floattostring",
  "System.formatdate",
  "System.formatlongdate",
  "System.frac",
  "System.getatom",
  "System.getcurappheight",
  "System.getcurappleft",
  "System.getcurapptop",
  "System.getcurappwidth",
  "System.getdate",
  "System.getdateday",
  "System.getdatedow",
  "System.getdatedoy",
  "System.getdatedst",
  "System.getdatehour",
  "System.getdatemin",
  "System.getdatemonth",
  "System.getdatesec",
  "System.getdateyear",
  "System.geteq",
  "System.geteqband",
  "System.geteqpreamp",
  "System.getextension",
  "System.getextfamily",
  "System.getidealvideoheight",
  "System.getidealvideowidth",
  "System.getmainbrowser",
  "System.getmouseposx",
  "System.getmouseposy",
  "System.getnumcontainers",
  "System.getpath",
  "System.getplayitemdisplaytitle",
  "System.getplayitemmetadatastring",
  "System.getplayitemstring",
  "System.getplaylistindex",
  "System.getplaylistlength",
  "System.getposition",
  "System.getprivatestring",
  "System.getpublicint",
  "System.getpublicstring",
  "System.getskinname",
  "System.getsonginfotext",
  "System.getstatus",
  "System.gettimeofday",
  "System.getviewportheightfrompoint",
  "System.getviewportleft",
  "System.getviewportleftfrompoint",
  "System.getviewporttop",
  "System.getviewporttopfrompoint",
  "System.getviewportwidthfrompoint",
  "System.getvisband",
  "System.getwac",
  "System.hidenamedwindow",
  "System.hidewindow",
  "System.integer",
  "System.integertolongtime",
  "System.integertotime",
  "System.invokedebugger",
  "System.isappactive",
  "System.isdesktopalphaavailable",
  "System.iskeydown",
  "System.isloadingskin",
  "System.isminimized",
  "System.isnamedwindowvisible",
  "System.isobjectvalid",
  "System.istransparencyavailable",
  "System.isvideo",
  "System.isvideofullscreen",
  "System.lockui",
  "System.minimizeapplication",
  "System.navigateurl",
  "System.newdynamiccontainer",
  "System.newgroup",
  "System.newgroupaslayout",
  "System.next",
  "System.onaccelerator",
  "System.oncreatelayout",
  "System.oneqbandchanged",
  "System.oneqchanged",
  "System.oneqpreampchanged",
  "System.ongetcancelcomponent",
  "System.onhidelayout",
  "System.oninfochange",
  "System.onkeydown",
  "System.onlookforcomponent",
  "System.onpause",
  "System.onplay",
  "System.onquit",
  "System.onresume",
  "System.onscriptloaded",
  "System.onscriptunloading",
  "System.onseek",
  "System.onsetxuiparam",
  "System.onshowlayout",
  "System.onshownotification",
  "System.onstatusmsg",
  "System.onstop",
  "System.ontitle2change",
  "System.ontitlechange",
  "System.onvolumechanged",
  "System.pause",
  "System.play",
  "System.playfile",
  "System.popmainbrowser",
  "System.pow",
  "System.previous",
  "System.random",
  "System.removepath",
  "System.restoreapplication",
  "System.selectfile",
  "System.setatom",
  "System.setclipboardtext",
  "System.seteq",
  "System.seteqband",
  "System.seteqpreamp",
  "System.setmenutransparency",
  "System.setprivatestring",
  "System.setpublicint",
  "System.setpublicstring",
  "System.showwindow",
  "System.sin",
  "System.sqr",
  "System.sqrt",
  "System.stop",
  "System.stringtofloat",
  "System.stringtointeger",
  "System.strleft",
  "System.strlen",
  "System.strlower",
  "System.strmid",
  "System.strright",
  "System.strsearch",
  "System.strupper",
  "System.switchskin",
  "System.systemmenu",
  "System.tan",
  "System.triggeraction",
  "System.unlockui",
  "System.urlencode",
  "System.windowmenu",
  "TabSheet.getcurpage",
  "TabSheet.setcurpage",
  "Text.gettext",
  "Text.gettextwidth",
  "Text.ontextchanged",
  "Text.setalternatetext",
  "Text.settext",
  "Timer.getdelay",
  "Timer.getskipped",
  "Timer.isrunning",
  "Timer.ontimer",
  "Timer.setdelay",
  "Timer.start",
  "Timer.stop",
  "ToggleButton.getcurcfgval",
  "ToggleButton.ontoggle",
  "TreeItem.collapse",
  "TreeItem.editlabel",
  "TreeItem.ensurevisible",
  "TreeItem.expand",
  "TreeItem.getchild",
  "TreeItem.getchildsibling",
  "TreeItem.getlabel",
  "TreeItem.getnthchild",
  "TreeItem.getnumchildren",
  "TreeItem.getparent",
  "TreeItem.getsibling",
  "TreeItem.gettree",
  "TreeItem.hassubitems",
  "TreeItem.invalidate",
  "TreeItem.iscollapsed",
  "TreeItem.isexpanded",
  "TreeItem.ishilited",
  "TreeItem.isselected",
  "TreeItem.issorted",
  "TreeItem.onbeginlabeledit",
  "TreeItem.onchar",
  "TreeItem.oncollapse",
  "TreeItem.oncontextmenu",
  "TreeItem.ondeselect",
  "TreeItem.onendlabeledit",
  "TreeItem.onexpand",
  "TreeItem.onleftdoubleclick",
  "TreeItem.onrightdoubleclick",
  "TreeItem.onselect",
  "TreeItem.ontreeadd",
  "TreeItem.ontreeremove",
  "TreeItem.setchildtab",
  "TreeItem.sethilited",
  "TreeItem.setlabel",
  "TreeItem.setsorted",
  "Vis.getmode",
  "Vis.getrealtime",
  "Vis.nextmode",
  "Vis.onframe",
  "Vis.setmode",
  "Vis.setrealtime",
  "Wac.getguid",
  "Wac.getname",
  "Wac.getstatusbar",
  "Wac.hide",
  "Wac.isvisible",
  "Wac.onhide",
  "Wac.onnotify",
  "Wac.onshow",
  "Wac.sendcommand",
  "Wac.setstatusbar",
  "Wac.show",
]
`);
  });
});