/*
	名字:	神木村
	地圖:	天空地區1
	描述:	240080100
*/

function enter(pi) {
	switch (pi.getPlayer().getMap().getId()) {
	case 240080100:
		if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
			pi.warpMap(240080200, 1); //天空地區2
			return true;
			}
			pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("You must eliminate all the monsters in this field before you can move onto the next map."));
			pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Please eliminate all the monsters in this field first."));
			return false;
			break;
	case 240080200:
		if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
			pi.warpMap(240080300, 2); //天空地區頂部
			return true;
			}
			pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("You must eliminate all the monsters in this field before you can move onto the next map."));
			pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Please eliminate all the monsters in this field first."));
			return false;
			break;
	case 240080300:
		if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
			pi.warpMap(240080400, 2); //天空的巢穴入口
			return true;
			}
			pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.CWvsContext.getTopMsg("You must eliminate all the monsters in this field before you can move onto the next map."));
			pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "Please eliminate all the monsters in this field first."));
			return false;
			break;
	case 240080400:
			for (var i = 0; i < pi.getMap().getCharacters().size(); i++)
		if (pi.getMap().getCharacters().get(i).getPosition().x < 1240) {
			pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(6, "Your entire party must navigate through the obstacles and meet in front of the portal to progress to the next stage."));
			return false;
			}
			pi.warpMap(240080500, 1); //天空的巢穴
			return true;
}
}